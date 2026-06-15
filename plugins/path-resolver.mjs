/**
 * Cross-platform design-data path resolution.
 *
 * Search order:
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
