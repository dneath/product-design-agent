/**
 * Design Migrator
 * 
 * Automatically migrates existing design artifacts to new design-data/ structure.
 * Runs once on first session, creates marker file to prevent re-running.
 * 
 * Migrates:
 * - design-system/MASTER.md → design-data/projects/[inferred-name]/system.md
 * - .interface-design/references/system.md → design-data/projects/[inferred-name]/system.md
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline/promises';
import { resolveDesignDataRoot } from './path-resolver.mjs';

/**
 * Check if migration needed
 */
export function needsMigration(workspaceDir) {
  const designDir = resolveDesignDataRoot({ workspaceDir });
  const markerPath = path.join(designDir, '.migrated');
  
  // If marker exists, migration already done
  if (fs.existsSync(markerPath)) {
    return false;
  }
  
  // If design-data doesn't exist, need to set up
  if (!fs.existsSync(designDir)) {
    return true;
  }
  
  // Check for old artifacts
  const oldPaths = [
    path.join(workspaceDir, 'design-system', 'MASTER.md'),
    path.join(workspaceDir, '.interface-design', 'references', 'system.md')
  ];
  
  return oldPaths.some(p => fs.existsSync(p));
}

/**
 * Prompt user for migration approval
 */
export async function promptForMigration() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('\n📦 Design Artifact Migration');
  console.log('━'.repeat(50));
  console.log('Found existing design artifacts. Migrate to new design-data/ structure?');
  console.log('\nOld locations:');
  console.log('  - design-system/MASTER.md');
  console.log('  - .interface-design/references/system.md');
  console.log('\nNew location:');
  console.log('  - your design-data directory/projects/[project-name]/system.md');
  console.log('    (repo checkout, DESIGN_DATA_DIR, or platform bundle — see path-resolver)');
  console.log('\nOriginal files will be preserved (not deleted).');
  console.log('Backups saved to design-data/backup-[timestamp]/\n');
  
  const answer = await rl.question('Proceed with migration? (yes/no): ');
  rl.close();
  
  return answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y';
}

/**
 * Infer project name from file path or content
 */
function inferProjectName(filePath, content) {
  // Try to extract from path
  const pathParts = filePath.split(path.sep);
  
  // Look for meaningful directory names
  for (const part of pathParts) {
    if (part && 
        part !== '.' && 
        part !== 'design-system' && 
        part !== '.interface-design' &&
        part !== 'references' &&
        !part.endsWith('.md')) {
      return part;
    }
  }
  
  // Try to extract from content (look for # [Project Name])
  const titleMatch = content.match(/^#\s+([^\n]+)/m);
  if (titleMatch) {
    return titleMatch[1]
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // Default
  return 'default-project';
}

/**
 * Migrate a single artifact
 */
function migrateArtifact(sourcePath, workspaceDir) {
  if (!fs.existsSync(sourcePath)) {
    return null;
  }
  
  const content = fs.readFileSync(sourcePath, 'utf8');
  const projectName = inferProjectName(sourcePath, content);
  
  // Create destination directory
  const designDir = resolveDesignDataRoot({ workspaceDir });
  const destDir = path.join(designDir, 'projects', projectName);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Add migration metadata header
  const timestamp = new Date().toISOString();
  const migratedContent = `<!-- Migrated from: ${sourcePath} -->
<!-- Migration date: ${timestamp} -->

${content}`;
  
  // Write to new location
  const destPath = path.join(destDir, 'system.md');
  fs.writeFileSync(destPath, migratedContent);
  
  return {
    source: sourcePath,
    destination: destPath,
    projectName: projectName
  };
}

/**
 * Create backup of original files
 */
function createBackup(filePaths, workspaceDir) {
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
  const designDir = resolveDesignDataRoot({ workspaceDir });
  const backupDir = path.join(designDir, `backup-${timestamp}`);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const backed = [];
  for (const filePath of filePaths) {
    if (fs.existsSync(filePath)) {
      const filename = path.basename(filePath);
      const backupPath = path.join(backupDir, filename);
      fs.copyFileSync(filePath, backupPath);
      backed.push({ original: filePath, backup: backupPath });
    }
  }
  
  return { backupDir, files: backed };
}

/**
 * Run full migration
 */
export async function runMigration(workspaceDir, options = {}) {
  const { interactive = true } = options;
  
  // Check if needed
  if (!needsMigration(workspaceDir)) {
    return { skipped: true, reason: 'Already migrated or no artifacts found' };
  }
  
  // Prompt user (if interactive)
  if (interactive) {
    const approved = await promptForMigration();
    if (!approved) {
      return { skipped: true, reason: 'User declined migration' };
    }
  }
  
  console.log('\n🔄 Starting migration...\n');
  
  // Ensure design-data structure exists
  const designDir = resolveDesignDataRoot({ workspaceDir });
  if (!fs.existsSync(designDir)) {
    fs.mkdirSync(designDir, { recursive: true });
  }
  
  const subDirs = ['references', 'tokens', 'components', 'projects', 'validation-history'];
  for (const dir of subDirs) {
    const dirPath = path.join(designDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
  
  // Identify artifacts to migrate
  const artifacts = [
    path.join(workspaceDir, 'design-system', 'MASTER.md'),
    path.join(workspaceDir, '.interface-design', 'references', 'system.md')
  ];
  
  const existing = artifacts.filter(p => fs.existsSync(p));
  
  if (existing.length === 0) {
    console.log('✓ No existing artifacts found to migrate');
  } else {
    // Create backups
    console.log(`📋 Creating backups of ${existing.length} file(s)...`);
    const backup = createBackup(existing, workspaceDir);
    console.log(`✓ Backups saved to: ${backup.backupDir}\n`);
    
    // Migrate each artifact
    const migrated = [];
    for (const artifactPath of existing) {
      console.log(`📦 Migrating: ${artifactPath}`);
      const result = migrateArtifact(artifactPath, workspaceDir);
      if (result) {
        migrated.push(result);
        console.log(`✓ Migrated to: ${result.destination}`);
        console.log(`  Project name: ${result.projectName}\n`);
      }
    }
    
    // Create migration log
    const logPath = path.join(designDir, 'MIGRATION-LOG.md');
    const logContent = `# Design Artifact Migration Log

**Date**: ${new Date().toISOString()}
**Workspace**: ${workspaceDir}

## Migrated Artifacts

${migrated.map(m => `
### ${m.projectName}
- **Source**: \`${m.source}\`
- **Destination**: \`${m.destination}\`
`).join('\n')}

## Backups

Backups saved to: \`${backup.backupDir}\`

${backup.files.map(f => `- \`${f.original}\` → \`${f.backup}\``).join('\n')}

## Notes

- Original files preserved (not deleted)
- Migration metadata added to migrated files
- Re-run migration by deleting the \`.migrated\` marker in your design-data directory
`;
    
    fs.writeFileSync(logPath, logContent);
    console.log(`📝 Migration log saved: ${logPath}\n`);
  }
  
  // Create marker file
  const markerPath = path.join(designDir, '.migrated');
  fs.writeFileSync(markerPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    workspace: workspaceDir
  }, null, 2));
  
  console.log('✅ Migration complete!\n');
  
  return {
    success: true,
    migrated: existing.length,
    backupDir: existing.length > 0 ? path.join(designDir, `backup-${new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '')}`) : null
  };
}

// CLI support
if (import.meta.url === `file://${process.argv[1]}`) {
  const workspaceDir = process.argv[2] || process.cwd();
  
  console.log(`\n🔍 Checking workspace: ${workspaceDir}\n`);
  
  if (!needsMigration(workspaceDir)) {
    console.log('✓ No migration needed (already migrated or no artifacts found)\n');
    process.exit(0);
  }
  
  try {
    const result = await runMigration(workspaceDir, { interactive: true });
    
    if (result.skipped) {
      console.log(`⏭️  ${result.reason}\n`);
      process.exit(0);
    }
    
    if (result.success) {
      console.log(`🎉 Successfully migrated ${result.migrated} artifact(s)\n`);
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}
