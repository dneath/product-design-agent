/**
 * Cross-platform design-data path resolution.
 *
 * Two distinct concerns:
 *   - READ reference data / agent operational state (variance + validation history):
 *     resolveDesignDataRoot() — may point at the installed bundle.
 *   - WRITE task output (prototypes, system.md, tokens, screenshots):
 *     resolveProjectOutputRoot() — ALWAYS the working project, NEVER the agent's own bundle.
 *
 * Read search order (resolveDesignDataRoot):
 *   1. DESIGN_DATA_DIR env var (explicit override)
 *   2. <workspace>/design-data/ (repo checkout or project-local)
 *   3. <workspace>/.config/opencode/design-data/ (OpenCode per-project)
 *   4. ~/.product-design-partner/design-data/ (Cursor/Codex/Claude bundle)
 *   5. ~/.config/opencode/design-data/ (OpenCode global)
 *
 * macOS, Linux, and Windows (~ expands via os.homedir()).
 */

import fs from 'fs';
import os from 'os';
import path from 'path';

/**
 * @param {Object} [options]
 * @param {string} [options.workspaceDir]
 * @param {string} [options.explicitRoot] — full path to design-data directory
 * @returns {string} Absolute path to design-data root (may not exist yet)
 */
export function resolveDesignDataRoot(options = {}) {
  const workspaceDir = options.workspaceDir || process.cwd();

  if (options.explicitRoot) return path.resolve(options.explicitRoot);
  if (process.env.DESIGN_DATA_DIR) return path.resolve(process.env.DESIGN_DATA_DIR);

  const candidates = [
    path.join(workspaceDir, 'design-data'),
    path.join(workspaceDir, '.config', 'opencode', 'design-data'),
    path.join(os.homedir(), '.product-design-partner', 'design-data'),
    path.join(os.homedir(), '.config', 'opencode', 'design-data'),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'references'))) return dir;
  }

  return path.join(workspaceDir, 'design-data');
}

/**
 * Resolve where TASK OUTPUT (design artifacts the agent creates for the user) is WRITTEN.
 *
 * Unlike resolveDesignDataRoot — which may resolve to the read-only installed bundle —
 * this NEVER returns a path inside the agent's own bundle (`~/.product-design-partner`)
 * or a global config dir. Task output belongs in the user's working project.
 *
 * Order:
 *   1. DESIGN_OUTPUT_DIR env var (explicit override)
 *   2. <workspace>/design-data/  (the current working project)
 *
 * @param {Object} [options]
 * @param {string} [options.workspaceDir]
 * @param {string} [options.explicitRoot]
 * @returns {string} Absolute path to the output design-data root (caller creates it)
 */
export function resolveProjectOutputRoot(options = {}) {
  if (options.explicitRoot) return path.resolve(options.explicitRoot);
  if (process.env.DESIGN_OUTPUT_DIR) return path.resolve(process.env.DESIGN_OUTPUT_DIR);

  const workspaceDir = path.resolve(options.workspaceDir || process.cwd());
  const bundle = path.resolve(path.join(os.homedir(), '.product-design-partner'));

  // Guard: never let task output land inside the installed bundle (the agent's own files).
  const base = workspaceDir.startsWith(bundle) ? path.resolve(process.cwd()) : workspaceDir;
  const safeBase = base.startsWith(bundle) ? os.homedir() : base;
  return path.join(safeBase, 'design-data');
}

/**
 * Absolute path to a single project's output directory. Caller is responsible for mkdir.
 * @param {string} workspaceDir
 * @param {string} projectName
 * @returns {string}
 */
export function projectOutputDir(workspaceDir, projectName) {
  return path.join(resolveProjectOutputRoot({ workspaceDir }), 'projects', projectName);
}

/** @param {string} workspaceDir @returns {string} */
export function varianceHistoryPath(workspaceDir) {
  return path.join(resolveDesignDataRoot({ workspaceDir }), 'variance-history.json');
}

/** @param {string} workspaceDir @returns {string} */
export function validationHistoryDir(workspaceDir) {
  return path.join(resolveDesignDataRoot({ workspaceDir }), 'validation-history');
}

/** @param {string} workspaceDir @param {string} filename @returns {string} */
export function referencePath(workspaceDir, filename) {
  return path.join(resolveDesignDataRoot({ workspaceDir }), 'references', filename);
}
