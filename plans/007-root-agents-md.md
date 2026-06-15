# Plan 007: Add repo-root AGENTS.md for clone-and-work flows

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ea5405f..HEAD -- AGENTS.md cursor/rules/product-design-partner.mdc codex/AGENTS.md`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

Designers who clone the repo into Cursor/Codex without running global `./install.sh` get no agent identity. A repo-root `AGENTS.md` (Cursor/Codex convention) lets them work from the checkout using repo-relative paths to `agent/` and `design-data/references/`.

## Current state

- `cursor/rules/product-design-partner.mdc` — project rule pointing at `~/.product-design-partner/` with repo fallback note.
- `codex/AGENTS.md` — Codex global install template, not at repo root.
- No root `AGENTS.md` or `CLAUDE.md`.

Product vocabulary (from agent): 5 gates, Variant Protocol, brand plum `#501E60` + violet `#7C3AED`.

## Scope

**In scope**:
- `AGENTS.md` (create at repo root)
- `docs/handoff-guide.md` — one paragraph noting repo-root AGENTS.md for clone-only workflow
- `docs/README.md` — link under Platform setup

**Out of scope**:
- Duplicating full 270-line router into AGENTS.md
- Replacing global install docs

## Git workflow

- Branch: `advisor/007-root-agents-md`
- Commit: `docs: add repo-root AGENTS.md for clone-and-work in Cursor/Codex`

## Steps

### Step 1: Create AGENTS.md

Create `/AGENTS.md` (~40–60 lines) with:

```markdown
# Product Design Partner (repo checkout)

When working **inside this repository**, act as the Product Design Partner.

## Operating manual

Read and follow: `agent/product-design-partner.md` — router for 17 workflows and 5 quality gates.

Load modules from `agent/modules/` and references from `design-data/references/` as the router directs.

## Non-negotiables

1. Five quality gates before UI output (intent, domain, validation tests, variance, ban list).
2. Variant Protocol: new UI = 2–3 distinct directions; user picks; refine winner only.
3. WCAG 2.1 AA; evidence-based recommendations; no generic "clean/modern/users".
4. Brand demo: Inter + Fragment Mono; plum #501E60; violet #7C3AED.

## Slash commands

If installed globally: see `commands/` (Claude), `cursor/commands/`, or `codex/prompts/`.
From repo only: invoke workflows via natural language; the router selects the workflow.

## Validate artifacts

node plugins/design-validator.mjs <artifact.md>

## Full install

./install.sh --target cursor --yes   # or claude | codex | opencode
See docs/handoff-guide.md
```

Adapt wording to match `cursor/rules/product-design-partner.mdc` non-negotiables without copying `$ARGUMENTS` or platform-specific paths incorrectly.

**Verify**: `wc -l AGENTS.md` → between 35 and 80 lines

### Step 2: Cross-link in handoff guide

In `docs/handoff-guide.md` § "Attach the agent to your project", add:

> **Clone-only workflow:** open this repo in Cursor/Codex — root `AGENTS.md` applies agent identity without global install. For slash commands, still run `./install.sh --target cursor --yes` or copy `cursor/commands/` into the project.

### Step 3: Index in docs/README.md

Add row: `AGENTS.md` | Repo-root identity for Cursor/Codex clone workflows |

**Verify**: `test -f AGENTS.md` → exit 0

## Done criteria

- [ ] `AGENTS.md` exists at repo root
- [ ] handoff-guide and docs/README mention it
- [ ] Content consistent with quality gates and Variant Protocol
- [ ] `plans/README.md` row 007 → DONE

## STOP conditions

- Repo policy forbids root AGENTS.md — stop and use `docs/AGENTS.md` with README pointer instead (document deviation).

## Maintenance notes

- When non-negotiables change in `.mdc` / codex AGENTS, update root AGENTS.md in same PR.
