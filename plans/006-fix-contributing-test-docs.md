# Plan 006: Align contributing.md with scripts/test.sh

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ea5405f..HEAD -- docs/contributing.md`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/003-extend-smoke-tests.md
- **Category**: docs
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

`docs/contributing.md` still says "There is no npm/Jest harness yet" and lists manual `node --check` steps, while `scripts/test.sh` is the canonical verification entrypoint (and plan 004 adds CI). Contributors and executor models get conflicting instructions.

## Current state

- `docs/contributing.md` § Testing (~line 497) — outdated harness language.
- `docs/contributing.md` § Local Testing Environment — references manual validator only.
- `scripts/test.sh` — canonical smoke suite after plan 003.
- `docs/architecture.md` — may already reference `./scripts/test.sh` (align if contradictory).

## Scope

**In scope**:
- `docs/contributing.md`

**Out of scope**:
- Rewriting the entire contributing guide
- Adding jest/npm unless explicitly requested elsewhere

## Git workflow

- Branch: `advisor/006-fix-contributing-test-docs`
- Commit: `docs: document scripts/test.sh as verification entrypoint`

## Steps

### Step 1: Replace Testing section

Find the section starting with "## Testing" and replace the "Verifying Changes" / "No test harness" language with:

```markdown
## Testing

Run the smoke suite before opening a PR:

```bash
./scripts/test.sh
```

This checks plugin/hook syntax, command sync (16 commands), goal-mode size (≤4000 chars), hook routing, validator fixtures, and `examples/dashboard-design.md`.

Individual checks (optional):

```bash
node plugins/design-validator.mjs examples/dashboard-design.md
node plugins/sync-commands.mjs
wc -c prompts/goal-mode.md   # must be ≤ 4000
```

GitHub Actions runs the same `./scripts/test.sh` on push/PR to `main` (see `.github/workflows/test.yml`).
```

Remove contradictory sentence: "There is no npm/Jest harness yet."

Keep the optional Jest example block only if labeled "Future: if you add node --test..."

### Step 2: Update Local Testing Environment section

Replace the four-step manual install block with:

```bash
./install.sh --target custom --path /tmp/pda-test --yes
./scripts/test.sh
node /tmp/pda-test/plugins/design-validator.mjs examples/dashboard-design.md
rm -rf /tmp/pda-test
```

### Step 3: Update PR checklist

Ensure checklist includes:

```markdown
- [ ] `./scripts/test.sh` passes
```

Remove duplicate contradictory items.

**Verify**: `grep 'no npm/Jest harness' docs/contributing.md` → no matches

**Verify**: `grep 'scripts/test.sh' docs/contributing.md` → ≥ 2 matches

## Done criteria

- [ ] contributing.md documents `./scripts/test.sh` as primary verification
- [ ] No claim that no test harness exists
- [ ] PR checklist references smoke script
- [ ] `plans/README.md` row 006 → DONE

## STOP conditions

- Plan 003 not merged and script lacks dashboard check — still document script but note dashboard check pending; prefer completing 003 first.

## Maintenance notes

- When smoke script gains checks, update this section in the same PR.
