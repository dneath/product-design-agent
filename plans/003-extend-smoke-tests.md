# Plan 003: Extend smoke tests for public example and sync cleanliness

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ea5405f..HEAD -- scripts/test.sh`

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-fix-dashboard-validator-example.md
- **Category**: tests
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

`scripts/test.sh` validates an ephemeral fixture but not `examples/dashboard-design.md`, which is the file linked across installation and architecture docs. CI (plan 004) needs a single script that catches example rot and command-sync drift.

## Current state

- `scripts/test.sh` — runs syntax checks, `sync-commands.mjs`, goal-mode size, hook routing, ephemeral `.test-fixture-pass.md` validator test.
- `examples/dashboard-design.md` — must pass validator after plan 001.
- `sync-commands.mjs` rewrites generated command files; smoke test runs it but does not assert git clean afterward.

## Commands you will need

| Purpose | Command | Expected |
|---------|---------|----------|
| Smoke | `./scripts/test.sh` | exit 0 |
| Dashboard | `node plugins/design-validator.mjs examples/dashboard-design.md` | exit 0 |
| Git clean | `git diff --quiet opencode/command cursor/commands codex/prompts` | exit 0 after sync |

## Scope

**In scope**:
- `scripts/test.sh`

**Out of scope**:
- Adding npm/jest
- Changing validator logic

## Git workflow

- Branch: `advisor/003-extend-smoke-tests`
- Commit: `test: assert dashboard example and sync output in smoke suite`

## Steps

### Step 1: Add dashboard example validation section

After the existing "Validator (passing fixture)" block in `scripts/test.sh`, add:

```bash
echo "== Validator (public example) =="
node plugins/design-validator.mjs examples/dashboard-design.md
```

**Verify**: `./scripts/test.sh` → exit 0 (requires plan 001 complete)

### Step 2: Assert generated commands match committed files

After the "Command sync" section, add:

```bash
echo "== Generated commands in sync =="
if ! git diff --quiet opencode/command cursor/commands codex/prompts; then
  echo "ERROR: sync-commands.mjs produced diffs — commit regenerated files or fix commands/"
  git diff --stat opencode/command cursor/commands codex/prompts
  exit 1
fi
```

**Verify**: `./scripts/test.sh` → exit 0; if sync produces changes, run `node plugins/sync-commands.mjs` and commit generated files separately before re-running.

### Step 3: Optional — minimal validateDesign failure check

Add a short inline Node check (heredoc or `-e`) that imports `validateDesign` from `plugins/design-validator.mjs` on the string `"# Bad\nno gates"` and asserts `passed === false`. Keeps shared module wired.

**Verify**: `./scripts/test.sh` → exit 0

## Test plan

- Run `./scripts/test.sh` twice in a row — both pass.
- Temporarily break `examples/dashboard-design.md` (remove `**Domain**:`) — script must fail; revert.

## Done criteria

- [ ] `./scripts/test.sh` validates `examples/dashboard-design.md`
- [ ] `./scripts/test.sh` fails if generated command dirs drift after sync
- [ ] `./scripts/test.sh` exits 0 on clean tree after plan 001
- [ ] `plans/README.md` row 003 → DONE

## STOP conditions

- Plan 001 not done and dashboard example still fails — stop; complete 001 first.
- `git diff --quiet` fails on every run because sync intentionally rewrites each time — investigate `sync-commands.mjs` idempotency before disabling the check.

## Maintenance notes

- Any new canonical example added to docs should be listed in `scripts/test.sh`.
- CI workflow (plan 004) runs this script verbatim — keep it bash-portable (no macOS-only flags).
