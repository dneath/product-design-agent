# Plan 004: Add GitHub Actions CI running smoke tests

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ea5405f..HEAD -- .github/ scripts/test.sh`

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/003-extend-smoke-tests.md
- **Category**: dx
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

Multi-designer handoff requires regressions to fail on PR/merge without relying on someone remembering to run `./scripts/test.sh` locally. The repo has no `.github/` workflows today.

## Current state

- Verification entrypoint: `./scripts/test.sh` (bash, Node 18+, python3 for plugin.json).
- No `package.json` — CI should not run npm install.
- Repo uses MIT license; standard GitHub Actions is appropriate.

## Commands you will need

| Purpose | Command | Expected |
|---------|---------|----------|
| Local smoke | `./scripts/test.sh` | exit 0 |
| YAML valid | `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/test.yml'))"` | exit 0 (if PyYAML available) or visual review |

## Scope

**In scope**:
- `.github/workflows/test.yml` (create)

**Out of scope**:
- Publishing to marketplace
- Matrix testing every OS (optional single ubuntu-latest is enough)
- npm publish

## Git workflow

- Branch: `advisor/004-add-ci`
- Commit: `ci: run smoke tests on push and pull_request`

## Steps

### Step 1: Create workflow file

Create `.github/workflows/test.yml`:

```yaml
name: Smoke tests

on:
  push:
    branches: [main, enhance-design-agent-suite]
  pull_request:
    branches: [main]

jobs:
  smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install Python (json.tool for plugin manifest)
        run: sudo apt-get update && sudo apt-get install -y python3

      - name: Run smoke tests
        run: chmod +x scripts/test.sh && ./scripts/test.sh
```

Adjust branch list if `main` is the only long-lived branch after plan 009.

**Verify**: File exists and triggers on `push` + `pull_request`.

### Step 2: Document CI in docs

Add a short "Continuous integration" subsection to `docs/contributing.md` (plan 006 may overlap — if 006 not done, add here; otherwise skip duplicate):

```markdown
## Continuous integration

GitHub Actions runs `./scripts/test.sh` on every push and PR to `main`. Run the same command locally before opening a PR.
```

Only add if not already present after plan 006.

**Verify**: `grep -r 'scripts/test.sh' docs/contributing.md` → match

### Step 3: Local verification

**Verify**: `./scripts/test.sh` → exit 0

## Test plan

- Push branch to GitHub (operator action) and confirm workflow runs green — note in plan completion comment if operator must push.

## Done criteria

- [ ] `.github/workflows/test.yml` exists
- [ ] Workflow runs `./scripts/test.sh` on Node 20 ubuntu
- [ ] `./scripts/test.sh` passes locally
- [ ] `plans/README.md` row 004 → DONE

## STOP conditions

- Repository has no GitHub remote — stop; deliver workflow file only and note operator must enable Actions.
- Smoke test requires secrets or network beyond checkout — stop (it should not).

## Maintenance notes

- If new checks are added to `scripts/test.sh`, CI picks them up automatically.
- Add branch names when new release branches are created.
