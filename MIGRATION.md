# Migration: v1.x → v2.0

v2.0 is a full teardown and rebuild. This note records what was deleted, what was kept, and why.

## Why v2.0

v1.x enforced quality through machinery: a 5-gate system (Intent/Domain/Validation/Variance/Ban-list),
a 407-line Node validator, a 792-line OpenCode plugin that pattern-matched output, and ~350KB of
style/palette datasets feeding a "variance" gate. That worked best on one harness (OpenCode) and
degraded on weaker models, which lost the thread in the long, mixed-topic module files (a 552-line
workflows file, a 300-line router).

v2.0 replaces enforcement machinery with **instructions weak models can execute**: a mandatory
Thinking Protocol (a literal 5-box checklist run before any pixels or code), ten short
single-concern modules (each under ~150 lines with a routing summary), and explicit MUST/NEVER
checklists per deliverable. No harness-specific feature is load-bearing — everything degrades
gracefully ("if sub-agents are available… otherwise…").

## Removed (and why)

| Removed | Why |
|---|---|
| 5-gate system + `plugins/design-validator.mjs` + `plugins/product-design.js` | Pattern-match enforcement was brittle, OpenCode-only, and heavy to maintain; replaced by the Thinking Protocol + per-module checklists |
| `designprompts-*.json` datasets (~350KB, 9k lines) | Fed the removed Variance gate; styling is now context-resolved, not sampled from style libraries |
| `plugins/design-migrator.js`, `plugins/csv-converter.mjs` | One-time scripts, already run |
| `agent/modules/{INDEX,quality-gates,workflows,standards-and-anti-patterns,frameworks-and-artifacts,platform-adaptation}.md` | Replaced by the 9 single-concern modules; the router is now the single routing source (no INDEX) |
| Commands `/interface` `/ux-audit` `/mentor` `/strategy` `/diagram` `/annotate` `/portfolio` `/design-converter` `/ux-flows` | Consolidated into `/design`, `/critique`, `/research`, `/flows`, `/deck` (see table below) |
| Subagent `interface-design` | Renamed/rebuilt as `design` |
| 13 docs (per-platform macOS guides, designer quick-start, troubleshooting, workflows indexes, contributing) + `docs/superpowers/` | Consolidated into `docs/install.md` + `docs/architecture.md` to stop doc drift |
| `plans/` (9 archival DONE plans), `examples/dashboard-design.md` | Historical artifacts of the v1 gate format |
| `design-data/{components,tokens,validation-history}` dirs | Output now lives per-project under `design-data/projects/<project>/` |

## Renamed / absorbed

| v1.x | v2.0 |
|---|---|
| `/interface`, `/design-converter` | `/design` |
| `/ux-audit` (+ `/critique`) | `/critique` |
| `/mentor`, `/strategy` (+ `/research`) | `/research` |
| `/ux-flows`, `/diagram`, `/annotate` | `/flows` |
| `/portfolio` | `/deck` (case studies are one deck/narrative type) |
| — | `/deck` (new: HTML/React presentation decks) |
| Subagent `interface-design` | Subagent `design` |
| `references/styling-resolution.md` | `references/styling.md` (+ craft standards + bans folded in) |
| `references/{ux-heuristics}` | `references/heuristics.md` |
| `references/{ux-flow-patterns,diagram-guide,annotation-guide}` | `references/flow-patterns.md` |
| `references/{research-templates,design-research-sources,mentorship-frameworks}` | `references/research-methods.md` |
| `references/brainstorming-playbook.md` | `references/brainstorm-techniques.md` |
| `plugins/{sync-commands,sync-agents,path-resolver}.mjs` | moved to `scripts/` |

## Kept (proven in v1.x)

- `scripts/dev-server.mjs` — project-scoped dev-server check/start/stop (lockfile + PID matching), unchanged.
- The sync-generation workflow: edit `commands/`+`agents/`, run `scripts/sync-commands.mjs` +
  `scripts/sync-agents.mjs`, commit the generated opencode/cursor/codex sets (CI asserts clean regen).
- Context-driven styling with the same resolution order and OKLCH fallback tokens (monochrome, 4px, Inter + Fragment Mono).
- The variant protocol (structurally distinct, tab-switchable, browser-verified, STOP for the user's pick) and the UNVERIFIED honesty rules.
- The Sonnet-class compensations (evidence-on-disk, steps-in-order, checklists-over-prose, no sub-agent nesting), now generalized as "Cross-model rules" in the entry file.
- install.sh/uninstall.sh skeleton — rewritten for the new layout; uninstall now also strips the
  Codex AGENTS.md marker block, sweeps legacy v1.x names, and detects plugin-route installs.

## Upgrading an existing v1.x install

```bash
git pull                              # get v2.0
./uninstall.sh --target all --yes     # removes v2 AND legacy v1.x artifacts
./install.sh --target <your-harness> --yes
```

OpenCode users: confirm `~/.config/opencode/plugins/product-design.js` is gone (the installer also
sweeps it). Claude Code plugin users: update/reinstall via `/plugin`.
