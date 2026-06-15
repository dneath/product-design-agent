# Plan 005: Wire path-resolver into migrator and csv-converter

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ea5405f..HEAD -- plugins/design-migrator.js plugins/csv-converter.mjs plugins/path-resolver.mjs`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (path-resolver may be uncommitted — include it if missing)
- **Category**: tech-debt
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

v1.3 introduced `plugins/path-resolver.mjs` for validator and OpenCode plugin, but `design-migrator.js` and `csv-converter.mjs` still hardcode `path.join(workspaceDir, '.config', 'opencode', 'design-data', ...)`. Designers on Cursor/Codex bundles (`~/.product-design-partner/`) or `DESIGN_DATA_DIR` overrides get broken migration and CSV conversion paths.

## Current state

- `plugins/path-resolver.mjs` exports `resolveDesignDataRoot({ workspaceDir, explicitRoot })`.
- `plugins/design-migrator.js:20-21` — `markerPath` and `designDir` use `.config/opencode/design-data`.
- `plugins/csv-converter.mjs:148` — `destDir` uses `.config/opencode/design-data/references`.
- `plugins/product-design.js` already uses `referencePath()` / `varianceHistoryPath()`.

## Commands you will need

| Purpose | Command | Expected |
|---------|---------|----------|
| Syntax migrator | `node --check plugins/design-migrator.js` | exit 0 |
| Syntax converter | `node --check plugins/csv-converter.mjs` | exit 0 |
| Smoke | `./scripts/test.sh` | exit 0 |

## Scope

**In scope**:
- `plugins/design-migrator.js`
- `plugins/csv-converter.mjs`

**Out of scope**:
- Rewriting migration UX or CSV parsing logic
- Running destructive migrations in CI

## Git workflow

- Branch: `advisor/005-path-resolver-utility-scripts`
- Commit: `fix: resolve design-data paths in migrator and csv-converter`

## Steps

### Step 1: Update design-migrator.js

Add import:

```javascript
import { resolveDesignDataRoot } from './path-resolver.mjs';
```

Replace hardcoded design-data root construction with:

```javascript
const designDir = resolveDesignDataRoot({ workspaceDir });
const markerPath = path.join(designDir, '.migrated');
```

Find all other occurrences of `path.join(workspaceDir, '.config', 'opencode', 'design-data'` in this file and replace with `resolveDesignDataRoot({ workspaceDir })` + relative suffix (e.g. `projects`, `backup-*`).

Update user-facing console strings that say `~/.config/opencode/design-data/` to say "your design-data directory" or mention `DESIGN_DATA_DIR` / bundle path generically.

**Verify**: `node --check plugins/design-migrator.js` → exit 0

### Step 2: Update csv-converter.mjs

Add import and replace line ~148:

```javascript
import { resolveDesignDataRoot } from './path-resolver.mjs';
// ...
const destDir = path.join(resolveDesignDataRoot({ workspaceDir }), 'references');
```

**Verify**: `node --check plugins/csv-converter.mjs` → exit 0

### Step 3: Smoke tests

**Verify**: `./scripts/test.sh` → exit 0

## Test plan

- Manual: `DESIGN_DATA_DIR=/tmp/pda-data node plugins/csv-converter.mjs` (with dummy CSV if needed) writes under `/tmp/pda-data/references` — only if csv-converter accepts workspace arg; read file header for CLI usage first.

## Done criteria

- [ ] No `.config/opencode/design-data` string literals remain in migrator/converter path construction (grep)
- [ ] Both files import `resolveDesignDataRoot`
- [ ] `node --check` passes on both files
- [ ] `./scripts/test.sh` passes
- [ ] `plans/README.md` row 005 → DONE

## STOP conditions

- `path-resolver.mjs` missing from repo — add it from v1.3 work first (file is part of this product); stop if content unknown.
- Migrator uses ESM but repo loads it as CJS in OpenCode — verify export style matches `product-design.js` (ESM default export).

## Maintenance notes

- Any new utility writing to `design-data/` must use `path-resolver.mjs`.
