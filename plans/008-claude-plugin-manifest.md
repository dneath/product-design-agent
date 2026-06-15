# Plan 008: Document Claude Code plugin components in manifest

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ea5405f..HEAD -- .claude-plugin/plugin.json hooks/ commands/ agents/`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: MED
- **Risk note**: Wrong manifest keys may break Claude Code plugin discovery — verify against current Claude Code plugin docs in STOP if install fails.
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

`.claude-plugin/plugin.json` currently contains only name, version, author, keywords — no explicit component paths. Claude Code discovers `commands/`, `hooks/`, `agents/` by convention when the repo is added as a plugin, but handoff to other maintainers is clearer with documented structure and a README in `.claude-plugin/`.

## Current state

- `.claude-plugin/plugin.json` — version `1.3.0` (may be uncommitted).
- Repo root has: `commands/` (16), `hooks/hooks.json` + `inject-design-context.mjs`, `agents/product-design-partner.md`.
- `hooks/hooks.json` references `${CLAUDE_PLUGIN_ROOT}/hooks/inject-design-context.mjs`.
- Cursor plugin quality gates (workspace rule) require valid `plugin.json` name — already present.

## Scope

**In scope**:
- `.claude-plugin/plugin.json` (add metadata fields if supported)
- `.claude-plugin/README.md` (create — component map and install steps)
- `docs/handoff-guide.md` — link to plugin README under Claude Code section

**Out of scope**:
- Marketplace submission
- Changing hook behavior

## Git workflow

- Branch: `advisor/008-claude-plugin-manifest`
- Commit: `docs: document Claude Code plugin layout and bump manifest metadata`

## Steps

### Step 1: Research Claude Code plugin.json schema

Read Claude Code / Cursor plugin docs for supported keys (e.g. `commands`, `hooks`, `agents` paths). If schema is convention-only, document that in README instead of adding invalid JSON keys.

**Verify**: Note chosen approach in `.claude-plugin/README.md`

### Step 2: Create .claude-plugin/README.md

Document:

| Component | Path | Purpose |
|-----------|------|---------|
| Commands | `../commands/*.md` | 16 slash commands |
| Agent | `../agents/product-design-partner.md` | Subagent stub |
| Hooks | `../hooks/hooks.json` | UserPromptSubmit intent nudge |
| Router | `../agent/product-design-partner.md` | Full operating manual |
| References | `../design-data/references/` | Playbooks |

Install: `/plugin` → add this repo. Verify: `/interface` autocompletes; hook fires on "design a dashboard".

### Step 3: Extend plugin.json safely

Add only schema-valid fields, for example:

```json
{
  "name": "product-design-partner",
  "version": "1.3.0",
  "description": "...",
  "author": { ... },
  "license": "MIT",
  "keywords": [ ... ]
}
```

If docs support `"repository"` URL, add when operator provides real GitHub URL — use placeholder comment in README if URL unknown: `"repository": "https://github.com/OWNER/product-design-agent"`.

Do NOT add invalid keys that break plugin load.

**Verify**: `python3 -m json.tool .claude-plugin/plugin.json` → exit 0

### Step 4: handoff guide cross-link

In `docs/handoff-guide.md` Claude Code section, add link to `.claude-plugin/README.md`.

**Verify**: `./scripts/test.sh` → exit 0

## Done criteria

- [ ] `.claude-plugin/README.md` exists with component table
- [ ] `plugin.json` validates as JSON
- [ ] handoff-guide references plugin README
- [ ] No invalid manifest keys (operator confirms plugin loads if possible)
- [ ] `plans/README.md` row 008 → DONE

## STOP conditions

- Adding manifest keys causes Claude Code plugin load failure — revert keys, README-only documentation.
- Cannot confirm schema — stop after README + JSON validation without speculative keys.

## Maintenance notes

- Bump `version` in plugin.json with CHANGELOG releases (plan 009).
