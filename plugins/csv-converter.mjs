/**
 * CSV to JSON Converter for DesignPrompts.dev Data
 * 
 * Converts ui-ux-pro-max CSV files to JSON for faster queries:
 * - styles.csv → designprompts-styles.json
 * - colors.csv → designprompts-colors.json
 * - typography.csv → designprompts-typography.json
 * 
 * Usage:
 *   node csv-converter.js [workspace-dir]
 */

import fs from 'fs';
import path from 'path';
import { resolveDesignDataRoot } from './path-resolver.mjs';

/**
 * Parse CSV file
 */
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));
    
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row);
    }
  }
  
  return rows;
}

/**
 * Convert styles.csv
 */
function convertStyles(csvPath) {
  const csv = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csv);
  
  return rows.map(row => ({
    id: row['No'],
    style: row['Style Category'],
    category: row['Type'],
    keywords: row['Keywords'] ? row['Keywords'].split(',').map(k => k.trim()) : [],
    primaryColors: row['Primary Colors'],
    secondaryColors: row['Secondary Colors'],
    effectsAnimation: row['Effects & Animation'],
    bestFor: row['Best For'],
    doNotUseFor: row['Do Not Use For'],
    lightMode: row['Light Mode'],
    darkMode: row['Dark Mode'],
    performance: row['Performance'],
    accessibility: row['Accessibility'],
    mobileFriendly: row['Mobile-Friendly'],
    conversionFocused: row['Conversion-Focused'],
    frameworkCompatibility: row['Framework Compatibility'],
    era: row['Era/Origin'],
    complexity: row['Complexity'],
    aiPromptKeywords: row['AI Prompt Keywords'] ? row['AI Prompt Keywords'].split(',').map(k => k.trim()) : [],
    cssTechnicalKeywords: row['CSS/Technical Keywords'] ? row['CSS/Technical Keywords'].split(',').map(k => k.trim()) : [],
    implementationChecklist: row['Implementation Checklist'],
    designSystemVariables: row['Design System Variables']
  }));
}

/**
 * Convert colors.csv
 */
function convertColors(csvPath) {
  const csv = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csv);
  
  return rows.map(row => ({
    id: row['No'],
    productType: row['Product Type'],
    primary: row['Primary'],
    onPrimary: row['On Primary'],
    secondary: row['Secondary'],
    onSecondary: row['On Secondary'],
    accent: row['Accent'],
    onAccent: row['On Accent'],
    background: row['Background'],
    foreground: row['Foreground'],
    card: row['Card'],
    cardForeground: row['Card Foreground'],
    muted: row['Muted'],
    mutedForeground: row['Muted Foreground'],
    border: row['Border'],
    destructive: row['Destructive'],
    onDestructive: row['On Destructive'],
    ring: row['Ring'],
    notes: row['Notes']
  }));
}

/**
 * Convert typography.csv
 */
function convertTypography(csvPath) {
  const csv = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csv);
  
  return rows.map(row => ({
    id: row['No'],
    pairingName: row['Font Pairing Name'],
    category: row['Category'],
    headingFont: row['Heading Font'],
    bodyFont: row['Body Font'],
    moodStyleKeywords: row['Mood/Style Keywords'] ? row['Mood/Style Keywords'].split(',').map(k => k.trim()) : [],
    bestFor: row['Best For'],
    googleFontsUrl: row['Google Fonts URL'],
    cssImport: row['CSS Import'],
    tailwindConfig: row['Tailwind Config'],
    notes: row['Notes']
  }));
}

/**
 * Run conversion
 */
export async function convertCSVData(workspaceDir = process.cwd()) {
  console.log('\n📊 Converting CSV data to JSON...\n');
  
  const sourceDir = path.join(workspaceDir, '.agents', 'skills', 'ui-ux-pro-max', 'data');
  const destDir = path.join(resolveDesignDataRoot({ workspaceDir }), 'references');
  
  // Check source directory
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }
  
  // Ensure destination directory
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const conversions = [];
  
  // Convert styles.csv
  const stylesPath = path.join(sourceDir, 'styles.csv');
  if (fs.existsSync(stylesPath)) {
    console.log('📄 Converting styles.csv...');
    const styles = convertStyles(stylesPath);
    const destPath = path.join(destDir, 'designprompts-styles.json');
    fs.writeFileSync(destPath, JSON.stringify(styles, null, 2));
    console.log(`✓ Created ${destPath} (${styles.length} entries)\n`);
    conversions.push({ file: 'styles', count: styles.length });
  }
  
  // Convert colors.csv
  const colorsPath = path.join(sourceDir, 'colors.csv');
  if (fs.existsSync(colorsPath)) {
    console.log('📄 Converting colors.csv...');
    const colors = convertColors(colorsPath);
    const destPath = path.join(destDir, 'designprompts-colors.json');
    fs.writeFileSync(destPath, JSON.stringify(colors, null, 2));
    console.log(`✓ Created ${destPath} (${colors.length} entries)\n`);
    conversions.push({ file: 'colors', count: colors.length });
  }
  
  // Convert typography.csv
  const typographyPath = path.join(sourceDir, 'typography.csv');
  if (fs.existsSync(typographyPath)) {
    console.log('📄 Converting typography.csv...');
    const typography = convertTypography(typographyPath);
    const destPath = path.join(destDir, 'designprompts-typography.json');
    fs.writeFileSync(destPath, JSON.stringify(typography, null, 2));
    console.log(`✓ Created ${destPath} (${typography.length} entries)\n`);
    conversions.push({ file: 'typography', count: typography.length });
  }
  
  // Create summary
  const summary = {
    timestamp: new Date().toISOString(),
    conversions: conversions,
    total: conversions.reduce((sum, c) => sum + c.count, 0)
  };
  
  const summaryPath = path.join(destDir, 'designprompts-conversion-log.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  console.log('✅ Conversion complete!');
  console.log(`Total entries: ${summary.total}\n`);
  
  return summary;
}

// CLI support
if (import.meta.url === `file://${process.argv[1]}`) {
  const workspaceDir = process.argv[2] || process.cwd();
  
  try {
    await convertCSVData(workspaceDir);
    process.exit(0);
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    process.exit(1);
  }
}
