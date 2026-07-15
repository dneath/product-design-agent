# Architecture & Contributing

How the Product Design Partner v2 fits together, how to change it safely, and how to release.

## Design philosophy

v2 has **no enforcement machinery** — no output validators, no blocking plugins. v1.x proved that
pattern-match enforcement is brittle, single-harness, and expensive to maintain. Instead, quality
comes from instructions weak models can execute deterministically:

1. A mandatory **Thinking Protocol** (literal checklist, shown before output) in the entry file.
2. **Short, single-concern modules** — one topic each, ~50–150 lines, numbered steps, `- [ ]`
   checklists, MUST/NEVER language. Long mixed-topic files are what degrade Sonnet-class models.
3. **Routing summaries**: every module starts with a 2–4 line "When to use" block matching the
   entry file's routing table, so a model can route without reading everything.
4. **Harness-gated features**: sub-agents, browser tools, Figma MCP are always "if available, X;
   otherwise Y". Nothing load-bearing is harness-specific.

## File map

```
agent/product-design-partner.md   ENTRY: identity, Thinking Protocol, routing table, cross-model rules (<150 lines)
agent/modules/                    7 modules: product-thinking, design-process, prototyping, handoff,
                                  frontend-quality, environment, context-management
design-data/references/           8 references: styling, motion, hardening, microcopy, heuristics,
                                  flow-patterns, research-methods, brainstorm-techniques
                                  (loaded on demand by modules/commands)
design-data/templates/            handoff-template.md (filled in per task)
design-data/projects/             per-user workspace (gitignored) — task output goes HERE, never into agent files

commands/*.md                     7 canonical slash commands (Claude Code format) — SOURCE OF TRUTH
agents/*.md                       3 canonical subagents (product-design-partner, design, prototype-variants)
hooks/                            Claude Code UserPromptSubmit hook (plugin route only)
.claude-plugin/                   plugin manifest (discovery is by convention: commands/, agents/, hooks/hooks.json)

opencode/command/                 GENERATED from commands/ (agent frontmatter + config-dir paths)
cursor/commands/, cursor/agents/  GENERATED (bundle paths, no $ARGUMENTS)
codex/prompts/                    GENERATED (bundle paths, keeps $ARGUMENTS)
cursor/rules/*.mdc                hand-maintained Cursor rule
codex/AGENTS.md                   hand-maintained Codex identity, wrapped in marker comments

scripts/dev-server.mjs            project-scoped dev server check/start/stop (lockfile + PID + cwd match)
scripts/path-resolver.mjs         read-root (reference data) vs write-root (project output) resolution
scripts/sync-commands.mjs         commands/ → opencode/cursor/codex generation
scripts/sync-agents.mjs           agents/ → cursor/agents generation
scripts/test.sh                   smoke tests (see contract below)
install.sh / uninstall.sh         copy-based install; full uninstall incl. legacy v1.x sweep
```

## The sync workflow (single source of truth)

`commands/` and `agents/` are canonical. The per-harness sets are **generated and committed**:

```bash
# edit commands/foo.md or agents/bar.md, then:
node scripts/sync-commands.mjs
node scripts/sync-agents.mjs
git add -A && git commit
```

CI fails if the generated files don't match their sources (`git diff --quiet` after regen).

Two conventions in command files are **load-bearing** (the generator rewrites around them):
1. The exact sentence
   `Read for method (use \`${CLAUDE_PLUGIN_ROOT}/...\`; if unset, use the repo checkout or the bundle at \`~/.product-design-partner/\`):`
2. Arguments on their own line matching `: $ARGUMENTS` at end of line.

The generator throws if a command uses `${CLAUDE_PLUGIN_ROOT}` without convention 1, and deletes
generated files whose source was removed.

## Path resolution (runtime)

- **Read root** (modules, references, templates, scripts): `${CLAUDE_PLUGIN_ROOT}` → repo checkout
  → `~/.product-design-partner/` → `~/.config/opencode/`.
- **Write root** (task output): ALWAYS the working project (`design-data/projects/<project>/` or
  the host repo) — never the agent's install. See `scripts/path-resolver.mjs` and
  `agent/modules/environment.md`.

## How to add or change things

**A module**: keep it single-concern and ≤170 lines (test-enforced). Start with a "When to use"
block copied from the entry file's routing table; add a row there if it's routable. Use numbered
steps + checklists + MUST/NEVER; gate any harness feature.

**A command**: create `commands/<name>.md` with frontmatter (`description`, `argument-hint`,
`allowed-tools`), the Thinking Protocol pointer, convention 1 + a short module list, `Brief:
$ARGUMENTS`, ≤8 steps. Run both sync scripts. Update: entry-file routing table (if routed), the
hook routes (`hooks/inject-design-context.mjs`), `cursor/rules/*.mdc` and `codex/AGENTS.md`
command lists, README table, and `scripts/test.sh` counts.

**A subagent**: create `agents/<name>.md` (frontmatter: name, description, tools, `model:
inherit`). Point at modules — never restate rules. Include the no-nesting line and a ≤5-line
return contract. Run `scripts/sync-agents.mjs`; update test counts.

**An installed artifact class**: if `install.sh` starts copying something new, add its removal to
`uninstall.sh` **in the same change** (both the mirrored path and the fallback name lists).

## test.sh contract

`./scripts/test.sh` must pass before any commit. It checks: JS/JSON/shell syntax (+shellcheck in
CI), file counts (7 commands / 3 agents / 7 modules / 8 references / 1 template), line budgets
(entry <150, modules ≤170), the two command conventions, clean sync regeneration, hook routing
(incl. absorbed triggers + silence on non-design prompts + every routed command exists), stale-
reference greps against deleted v1 filenames/commands and removed v2.1 features, and a full
install → dry-run → purge roundtrip in a temp dir.

## Release checklist

1. `./scripts/test.sh` green.
2. Bump `.claude-plugin/plugin.json` version; add a CHANGELOG entry (SemVer).
3. If commands/modules changed: regenerate sync targets; check README table + docs still match.
4. If install layout changed: update `docs/install.md` and MIGRATION notes.
5. Tag and push; CI runs the same test.sh.
