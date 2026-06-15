# Plan 009: Commit, merge to main, tag v1.3.0 for designer handoff

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git status` — ensure plans 001–008 changes are present; `git diff --stat ea5405f..HEAD`

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans 001 through 008
- **Category**: direction
- **Planned at**: commit `ea5405f`, 2026-06-15

## Why this matters

`main` is still at v1.0 (`8810770`); all v1.1–v1.3 work lives on `enhance-design-agent-suite` with a large uncommitted delta (handoff guide, CHANGELOG, path-resolver, docs, scripts). Designers cloning `main` or an untagged branch get the wrong product. A tagged v1.3.0 release completes handoff.

## Current state

- Branch: `enhance-design-agent-suite` at `ea5405f` (v1.2 committed).
- Uncommitted work (~26 paths): v1.3 features, docs, plans/, `.gitignore`, etc.
- `main` lacks: 16 commands, Cursor/Codex, Variant Protocol, handoff docs, CI (after plan 004).
- `docs/handoff-guide.md` uses placeholder `git clone <repo-url>` — operator must substitute real URL before external handoff.
- `.gitignore` should exclude `design-data/projects/*`, `.config/`, validation history (verify before commit).

## Commands you will need

| Purpose | Command | Expected |
|---------|---------|----------|
| Smoke | `./scripts/test.sh` | exit 0 |
| Status | `git status` | no unintended secrets; no `design-data/projects/*` deliverables staged |
| Tag | `git tag -l 'v1.3*'` | shows v1.3.0 after tagging |

## Scope

**In scope**:
- Git: stage, commit, merge/rebase to `main`, tag `v1.3.0`
- Replace placeholder repo URL in `docs/handoff-guide.md` if operator provides URL
- `plans/README.md` — mark plans 001–009 DONE

**Out of scope**:
- `git push` / GitHub release (unless operator explicitly requests)
- npm publish
- Force push to `main`

## Git workflow

Follow user git safety rules:
- NEVER force push main
- NEVER amend unless operator requests and conditions met
- Commit message via HEREDOC

Suggested commits (operator may squash):
1. `feat: v1.3 platform adaptation, path resolver, and designer handoff docs`
2. `test: smoke suite, CI, and gate validation unification` (if split)
3. `docs: implementation plans from improve audit`

Or single commit if preferred.

Example message:

```
Release v1.3.0 designer handoff baseline.

Adds platform adaptation, cross-platform path resolver, handoff documentation,
smoke tests, CI, unified gate validation, and AGENTS.md for clone workflows.
```

## Steps

### Step 1: Pre-flight verification

**Verify**:
```bash
./scripts/test.sh
git status
git check-ignore -v design-data/validation-history/*.json .config 2>/dev/null | head -3
```

Ensure NOT staged:
- `.env` (only `.env.example`)
- `design-data/projects/*` except `README.md` / `.gitkeep`
- `.config/` test artifacts

**Verify**: `./scripts/test.sh` → exit 0

### Step 2: Stage intentional files

Stage all product files including:
- `plans/` directory
- `AGENTS.md` (if plan 007 done)
- `.github/workflows/test.yml` (if plan 004 done)
- Updated examples, plugins, docs, scripts, `.gitignore`, `CHANGELOG.md`

**Verify**: `git diff --cached --stat` — review for secrets and client data

### Step 3: Commit on enhance-design-agent-suite

```bash
git commit -m "$(cat <<'EOF'
Release v1.3.0 designer handoff baseline.

Unifies gate validation, adds smoke tests and CI, documents designer
onboarding, and completes cross-platform install paths for Cursor, Codex,
Claude Code, and OpenCode.
EOF
)"
```

**Verify**: `git log -1 --oneline` shows new commit

### Step 4: Merge to main

```bash
git checkout main
git merge enhance-design-agent-suite --no-edit
```

If merge conflicts — stop and report; do not force.

**Verify**: `git branch --show-current` → `main`; `./scripts/test.sh` → exit 0 on main

### Step 5: Tag release

```bash
git tag -a v1.3.0 -m "$(cat <<'EOF'
Product Design Partner v1.3.0

Designer handoff release: platform adaptation, handoff guide, path resolver,
smoke tests, CI, unified validation, repo AGENTS.md.
EOF
)"
```

**Verify**: `git tag -l 'v1.3.0'` → v1.3.0

### Step 6: Update handoff placeholder (operator input)

If operator provides GitHub URL, replace `<repo-url>` in:
- `docs/handoff-guide.md`
- `README.md` clone examples (if any)

If URL unknown, add to handoff guide:

> Replace `<repo-url>` with your fork or org remote before sharing.

Commit amend **only if** operator explicitly allows and commit not pushed.

### Step 7: Update plans index

Set all plan rows 001–009 to DONE in `plans/README.md`; commit if changed after tag (new commit, not amend, unless operator prefers amend pre-push).

## Test plan

- Fresh clone simulation (optional): `git archive` or `git clone` to temp dir, run `./scripts/test.sh` — operator action.

## Done criteria

- [ ] All plans 001–008 verified DONE before merge
- [ ] `./scripts/test.sh` passes on `main`
- [ ] `main` contains v1.3 feature set (grep `platform-adaptation.md` exists)
- [ ] Tag `v1.3.0` points at merge commit
- [ ] No secrets or gitignored runtime data in history of this commit
- [ ] `plans/README.md` row 009 → DONE
- [ ] Operator informed: push with `git push origin main --tags` when ready

## STOP conditions

- `./scripts/test.sh` fails on main after merge — do not tag; fix forward on branch.
- Merge conflicts — stop for human resolution.
- Operator has not authorized merge to main — stop after commit on feature branch; deliver tag on branch only (`v1.3.0-rc` alternative).

## Maintenance notes

- Share with designers: `docs/handoff-guide.md`, tag `v1.3.0`, and `./install.sh --target <platform> --yes`
- Future releases: bump `.claude-plugin/plugin.json`, `CHANGELOG.md`, and tag semver accordingly
