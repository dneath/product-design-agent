# Plan 002: Unify OpenCode plugin with standalone validator

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ea5405f..HEAD -- plugins/product-design.js plugins/design-validator.mjs`
> Compare excerpts before proceeding; mismatch → STOP.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/001-fix-dashboard-validator-example.md
- **Category**: tech-debt
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

Gate enforcement exists in two places: `plugins/design-validator.mjs` (CLI, recently fixed for markdown labels) and inline regex in `plugins/product-design.js` `tui.before-response` (lines ~678–784). They diverge — OpenCode users can pass the plugin while CLI fails, or vice versa. One validation module prevents drift and makes plan 001's fixture meaningful everywhere.

## Current state

- `plugins/design-validator.mjs` exports `async function validateDesign(artifact, workspaceDir)` returning `{ passed, gates: [...] }`.
- `plugins/product-design.js:16` already imports `varianceHistoryPath, referencePath` from `./path-resolver.mjs`.
- `plugins/product-design.js:678-784` — duplicate gate checks with older patterns, e.g. gate 3 uses `/swap test:/i` only; gate 1 forbidden scan uses `(who|what|feel):[^\\n]*term` without markdown flexibility.
- OpenCode hook signature: `'tui.before-response': async (input, output) => { ... output.block = true; output.blockReason = '...' }`

Repo convention: ESM `.js` / `.mjs`, Node built-ins only, no bundler.

## Commands you will need

| Purpose | Command | Expected |
|---------|---------|----------|
| Syntax | `node --check plugins/product-design.js` | exit 0 |
| Syntax | `node --check plugins/design-validator.mjs` | exit 0 |
| CLI validate | `node plugins/design-validator.mjs examples/dashboard-design.md` | exit 0 (requires plan 001) |
| Smoke | `./scripts/test.sh` | exit 0 |

## Scope

**In scope**:
- `plugins/product-design.js`
- `plugins/design-validator.mjs` (only if exporting helpers or adjusting for plugin use)

**Out of scope**:
- Rewriting `detectDesignIntent`, variance history, DesignPrompts loading, or `tui.prompt.append`
- `hooks/inject-design-context.mjs`
- Changing gate rules themselves

## Git workflow

- Branch: `advisor/002-unify-gate-validation`
- Commit: `refactor: delegate OpenCode gate enforcement to validateDesign`

## Steps

### Step 1: Import validateDesign in product-design.js

At top of `plugins/product-design.js`, add:

```javascript
import { validateDesign, formatValidationReport } from './design-validator.mjs';
```

**Verify**: `node --check plugins/product-design.js` → exit 0

### Step 2: Replace inline gate checks in tui.before-response

In `'tui.before-response'`, keep the existing **design output detection** block:

```javascript
const isDesignOutput = /```(jsx|tsx|css|html)|design|mockup|prototype|interface/i.test(responseText);
if (!isDesignOutput) return;
```

Remove the sequential gate 1–5 inline regex blocks (approximately lines 686–784). Replace with:

```javascript
const results = await validateDesign(responseText, directory);
if (!results.passed) {
  output.block = true;
  output.blockReason = formatValidationReport(results);
  return;
}
```

Keep **after** successful validation:
- Variance history `add()` logic if present below the gate checks (do not drop variance tracking on pass).
- Ban-list **user override** behavior (`use ${ban.name} anyway`) — if this existed only in inline gate 5, re-implement override by checking `input.prompt` before calling `validateDesign`, or extend `validateDesign` with an optional `{ allowBanOverrides: string[] }` — prefer minimal change: check override in plugin before block.

**Verify**: `node --check plugins/product-design.js` → exit 0

### Step 3: Confirm formatValidationReport is suitable for blockReason

Read `formatValidationReport` in `design-validator.mjs`. If output is too long for OpenCode UI, truncate to failed gates only (add a small helper in design-validator.mjs exporting `formatValidationFailures(results)` — in scope if needed).

**Verify**: `grep -c 'validateDesign' plugins/product-design.js` → ≥ 2 (import + call)

### Step 4: Remove dead duplicate helpers in product-design.js

Delete any gate-validation helper functions in `product-design.js` that are now unused (only if truly unreachable — run a quick grep before deleting).

**Verify**: `node --check plugins/product-design.js` → exit 0

### Step 5: Full verification

**Verify**:
- `node plugins/design-validator.mjs examples/dashboard-design.md` → exit 0
- `./scripts/test.sh` → exit 0

## Test plan

- Manual: craft a minimal markdown snippet missing `**Who**:` → `validateDesign` returns `passed: false` for gate Intent.
- Manual: same snippet through plugin hook logic is not easily unit-tested without OpenCode; rely on shared `validateDesign` + syntax checks.

Optional: add to `scripts/test.sh` (plan 003) a node one-liner importing `validateDesign` on a failing snippet — defer to plan 003 if timeboxed.

## Done criteria

- [ ] `product-design.js` calls `validateDesign` for `tui.before-response` gate enforcement
- [ ] No duplicate gate 1–5 regex blocks remain in `tui.before-response` (grep for `GATE 1 FAILED` inline messages — should be 0 unless moved to formatter)
- [ ] `node --check plugins/product-design.js` exits 0
- [ ] `./scripts/test.sh` exits 0
- [ ] `plans/README.md` row 002 → DONE

## STOP conditions

- OpenCode hook API differs from assumed `output.block` / `output.blockReason` shape — stop with file excerpt.
- Circular import between `product-design.js` and `design-validator.mjs` — extract shared gate functions to `plugins/gate-rules.mjs` (in scope only if required).
- `validateDesign` async import breaks OpenCode plugin loader — stop with error message.

## Maintenance notes

- All future gate rule changes go in `design-validator.mjs` only.
- Reviewers should confirm variance history still updates on successful pass and ban overrides still work.
