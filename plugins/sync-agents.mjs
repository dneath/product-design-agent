#!/usr/bin/env node
/**
 * sync-agents.mjs — generate Cursor subagent copies from the canonical set.
 *
 * Source of truth: agents/*.md (Claude Code + plugin format).
 * Target: cursor/agents/*.md (path rewrites for Cursor bundle install).
 *
 * Usage: node plugins/sync-agents.mjs   (run from repo root; commit the output)
 * Never edit generated files directly — edit agents/*.md and re-run.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(repoRoot, 'agents');
const destDir = join(repoRoot, 'cursor', 'agents');

const PLUGIN_ROOT = '${CLAUDE_PLUGIN_ROOT}/';
const BUNDLE_ROOT = '~/.product-design-partner/';

function syncAgent(filename) {
  let content = readFileSync(join(srcDir, filename), 'utf8');
  content = content.replaceAll(PLUGIN_ROOT, BUNDLE_ROOT);
  const banner = `<!-- GENERATED from agents/${filename} by plugins/sync-agents.mjs — edit the source, then re-run. -->\n\n`;
  writeFileSync(join(destDir, filename), banner + content);
}

mkdirSync(destDir, { recursive: true });
const files = readdirSync(srcDir).filter((f) => f.endsWith('.md'));
for (const file of files) syncAgent(file);
console.log(`Synced ${files.length} agents → cursor/agents/`);
