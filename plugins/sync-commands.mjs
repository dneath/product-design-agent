#!/usr/bin/env node
/**
 * sync-commands.mjs — generate per-platform slash commands from the canonical set.
 *
 * Source of truth: commands/*.md (Claude Code format).
 * Targets:
 *   opencode/command/*.md  — OpenCode commands (agent: product-design-partner)
 *   cursor/commands/*.md   — Cursor commands (plain markdown, no $ARGUMENTS substitution)
 *   codex/prompts/*.md     — Codex custom prompts (supports $ARGUMENTS)
 *
 * Usage: node plugins/sync-commands.mjs   (run from the repo root; commit the output)
 * Never edit generated files directly — edit commands/*.md and re-run.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(repoRoot, 'commands');

const PLUGIN_ROOT = '${CLAUDE_PLUGIN_ROOT}/';
const READ_LINE_CLAUDE =
  'Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):';

function parse(file) {
  const raw = readFileSync(join(srcDir, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, '');
  }
  return { name: basename(file, '.md'), fm, body: raw.slice(m[0].length).trim() };
}

const banner = (name) =>
  `<!-- GENERATED from commands/${name}.md by plugins/sync-commands.mjs — edit the source, then re-run. -->`;

function toOpencode({ name, fm, body }) {
  let b = body
    .replace(READ_LINE_CLAUDE, 'Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):')
    .replaceAll(`${PLUGIN_ROOT}agent/modules/`, 'agents/product-design-partner/modules/')
    .replaceAll(`${PLUGIN_ROOT}design-data/`, 'design-data/')
    // Executables are run with `node` from the user's project cwd, so they need an
    // absolute path (like the Cursor/Codex bundle paths) — not a bare relative one.
    .replaceAll(`${PLUGIN_ROOT}scripts/`, '~/.config/opencode/scripts/')
    .replaceAll(`${PLUGIN_ROOT}plugins/`, '~/.config/opencode/plugins/')
    .replaceAll(PLUGIN_ROOT, '');
  return `---\ndescription: ${fm.description}\nagent: product-design-partner\n---\n\n${banner(name)}\n\n${b}\n`;
}

function toCursor({ name, fm, body }) {
  let b = body
    .replace(READ_LINE_CLAUDE, 'Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):')
    .replaceAll(PLUGIN_ROOT, '~/.product-design-partner/')
    // Cursor appends the user's typed text after the command; there is no $ARGUMENTS substitution.
    .replaceAll(/^(.*): \$ARGUMENTS$/gm, '$1: the text the user typed after the command (below).')
    .replaceAll('$ARGUMENTS', 'the text the user typed after the command');
  return `${banner(name)}\n\n# /${name} — ${fm.description}\n\n${b}\n`;
}

function toCodex({ name, fm, body }) {
  let b = body
    .replace(READ_LINE_CLAUDE, 'Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):')
    .replaceAll(PLUGIN_ROOT, '~/.product-design-partner/');
  const hint = fm['argument-hint'] ? `argument-hint: "${fm['argument-hint']}"\n` : '';
  return `---\ndescription: ${fm.description}\n${hint}---\n\n${banner(name)}\n\n${b}\n`;
}

const targets = [
  { dir: join(repoRoot, 'opencode', 'command'), render: toOpencode },
  { dir: join(repoRoot, 'cursor', 'commands'), render: toCursor },
  { dir: join(repoRoot, 'codex', 'prompts'), render: toCodex },
];

const files = readdirSync(srcDir).filter((f) => f.endsWith('.md'));
for (const { dir } of targets) mkdirSync(dir, { recursive: true });
for (const file of files) {
  const cmd = parse(file);
  if (!cmd.fm.description) throw new Error(`${file}: missing description`);
  for (const { dir, render } of targets) writeFileSync(join(dir, file), render(cmd));
}
console.log(`Synced ${files.length} commands → ${targets.map((t) => t.dir.replace(repoRoot + '/', '')).join(', ')}`);
