# Plan 001: Fix gate-compliant dashboard example

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ea5405f..HEAD -- examples/dashboard-design.md examples/README.md`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

Eight docs point designers at `examples/dashboard-design.md` as the canonical validator fixture. Today it fails gate 2 because it uses narrative headings (`**5+ Domain Concepts**`) instead of the field labels the validator expects (`**Domain**:`, `**Color world**:`, `**Signature**:`). Designers who run the documented command get exit code 1 and lose trust in the quality gates.

## Current state

- `examples/dashboard-design.md` — long narrative example; intent section uses `**Who**:` (passes gate 1); domain section at lines 30–50 uses non-standard labels; validation section at lines 325–329 uses `**Swap Test**:` (passes gate 3 with current validator).
- `examples/README.md:8` — claims "Full gate-compliant dashboard artifact (validator fixture)" — **false today**.
- `plugins/design-validator.mjs:20-32` — `hasField()` matches labels like `**Domain**:` (case-insensitive field name).
- Verified failure: `node plugins/design-validator.mjs examples/dashboard-design.md` → exit 1, gate 2 missing `domain`, `color world`, `signature`.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Validate example | `node plugins/design-validator.mjs examples/dashboard-design.md` | exit 0, "ALL GATES PASSED" |
| Smoke suite | `./scripts/test.sh` | exit 0 |

## Scope

**In scope**:
- `examples/dashboard-design.md`
- `examples/README.md` (only if wording needs tightening after fix)

**Out of scope**:
- `plugins/design-validator.mjs` — do not change validator rules to accept old headings
- Other example files
- Shortening the narrative example (keep content; add/rename gate fields only)

## Git workflow

- Branch: `advisor/001-fix-dashboard-example`
- Commit message style: `fix: make dashboard example pass all five quality gates` (matches repo imperative style)
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add compliant gate field blocks

In `examples/dashboard-design.md`, after the existing Step 2 narrative (or integrated at the start of Step 2), add **machine-checkable** fields the validator requires. Use this exact label format:

```markdown
## Intent Declaration
**Who**: DevOps engineers at a SaaS company managing 20+ microservices during on-call rotation
**What**: Monitor API health across all services and drill into specific errors when alerts fire
**Feel**: Confident and in control — not anxious, not overwhelmed

## Domain Exploration
**Domain**: air traffic control tower, ICU monitor, NOC wall, manufacturing QC line, trading floor ticker, submarine control panel
**Color world**: status green, warning amber, critical red, neutral slate, ocean blue, deep charcoal, highlight yellow
**Signature**: status timeline — the status timeline appears in the header rail, each service row, the drill-down panel, the legend, and the empty-state preview

## Variance Selection
**Vibe Archetype**: Control-room-technical
**Layout Archetype**: Status-primary
```

Requirements:
- Keep existing narrative sections if useful; do not delete the worked example content.
- The signature phrase (`status timeline` or your chosen phrase) must appear **5+ times** in the full file (validator counts occurrences).
- Domain line must have **5+ comma-separated concepts**; color world **5+ colors**.

**Verify**: `grep -c -i 'status timeline' examples/dashboard-design.md` → count ≥ 5

### Step 2: Align validation test labels

Ensure the Validation Results section uses labels the validator recognizes (already mostly correct):

```markdown
- **Swap Test**: PASS — ...
- **Squint Test**: PASS — ...
- **Signature Test**: PASS — ...
- **Token Test**: PASS — ...
```

Each value should include `PASS` (not `Fail`). Remove contradictory gate summary lines that claim pass while validator would fail.

**Verify**: `grep -E '^\*\*(Swap|Squint|Signature|Token) Test\*\*:' examples/dashboard-design.md | wc -l` → 4

### Step 3: Update examples README if needed

In `examples/README.md`, keep the "gate-compliant fixture" claim only if step verifications pass. Optionally add one line: "Must exit 0 when run through `design-validator.mjs`."

**Verify**: `node plugins/design-validator.mjs examples/dashboard-design.md` → exit 0

### Step 4: Run smoke suite

**Verify**: `./scripts/test.sh` → exit 0 (dashboard may not be in smoke yet — that's plan 003)

## Test plan

- No new test files; verification is the validator CLI on the updated markdown.
- Regression: the file must still read as a coherent dashboard design walkthrough, not only a gate checklist.

## Done criteria

- [ ] `node plugins/design-validator.mjs examples/dashboard-design.md` exits 0
- [ ] Signature phrase appears 5+ times in `examples/dashboard-design.md`
- [ ] `examples/README.md` no longer overclaims if validator fails
- [ ] `./scripts/test.sh` exits 0
- [ ] Only in-scope files modified
- [ ] `plans/README.md` status row for 001 updated to DONE

## STOP conditions

- Validator logic in `design-validator.mjs` differs from excerpts (drift) — stop and report.
- After edits, gate 5 ban list fails due to banned CSS patterns embedded in the example — fix violations or report; do not weaken ban list.
- Validator still fails gate 2 after two reasonable restructuring attempts — stop with the validator output attached.

## Maintenance notes

- Any future change to gate field names in `design-validator.mjs` must update this example and docs that reference it (plan 003 adds CI enforcement).
- Reviewers should confirm the example still teaches designers, not only satisfies regex checks.
