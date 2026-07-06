# Changelog

All notable changes to the Product Design Partner agent. Versioning follows [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-07-06

Full teardown and rebuild. See [MIGRATION.md](MIGRATION.md) for the complete deleted/kept/renamed record.

### Added
- **Thinking Protocol** — a mandatory 5-box checklist (restate the problem; what's NOT asked; riskiest assumptions; 2–3 approaches with tradeoffs; rationale on every decision) run before any pixels or code, in `agent/product-design-partner.md`
- **10 single-concern modules** with routing summaries: entry file + product-thinking, design-process, design-systems, prototyping, handoff, presentation, frontend-quality, environment, context-management
- **Presentation capability** (`/deck`): HTML/React slide decks with a mandatory structure (context → problem → constraints → explorations incl. rejected → recommendation → evidence → next steps) + `design-data/templates/deck-template.md`
- **Reusable handoff template** `design-data/templates/handoff-template.md` (flow, per-screen spec, state matrix, interaction table, a11y, data contract, rationale, open questions)
- **State matrix requirement**: every screen covers empty/loading/error/partial/overflow/first-run/success explicitly
- Cross-model rules (evidence-on-disk verification, steps-in-order, checklists-over-prose, no sub-agent nesting, harness-gated features) baked into the entry file for Sonnet-class/Opus/OpenCode/Codex portability
- Codex install now appends/replaces a marker-delimited block in `~/.codex/AGENTS.md` idempotently; uninstall strips only that block
- Uninstall sweeps legacy v1.x artifacts (old command names, OpenCode enforcement plugin) and detects Claude Code plugin-route installs

### Changed
- Commands consolidated 16 → 10: `/design` `/prototype` `/brainstorm` `/critique` `/design-system` `/handoff` `/deck` `/research` `/flows` `/figma-export`
- Subagent `interface-design` → `design`; all four subagents rebuilt against the new modules
- References consolidated 16 files + 3 datasets → 5 files: styling, heuristics, flow-patterns, research-methods, brainstorm-techniques
- Docs consolidated to `docs/install.md` + `docs/architecture.md`; `README.md` rewritten
- Sync generators moved `plugins/` → `scripts/`, now remove stale generated files and assert the "Read for method" convention
- `prompts/goal-mode.md` rewritten around the Thinking Protocol (≤4000 bytes, enforced by tests)

### Removed
- The 5-gate system, `plugins/design-validator.mjs`, and the OpenCode enforcement plugin `plugins/product-design.js` — replaced by the Thinking Protocol + per-module checklists
- `designprompts-*.json` style datasets (~350KB), variance tracking, vibe/layout archetypes
- One-time scripts (`design-migrator.js`, `csv-converter.mjs`), `plans/`, 13 docs, `examples/dashboard-design.md`

## [Unreleased-1.x]

### Added
- Per-platform macOS install guides: `installation-claude-code-macos.md`, `installation-cursor-macos.md`, `installation-codex-macos.md`, `installation-opencode-macos.md`

### Changed
- `installation.md`, `installation-macos.md`, handoff guide, quick start, doc index, and troubleshooting — equal depth for Claude Code, Cursor, Codex, and OpenCode (not Cursor-only)

## [1.4] - 2026-06-25

### Added
- Context-driven styling: agent has **no fixed brand** and never defaults to one — resolves repo tokens (Tailwind/CSS vars/theme/component lib/fonts) → Figma variables → user-specified → fallback defaults (monochrome OKLCH neutrals, never `#000`/`#fff`; 4px spacing scale; Inter for UI/text + Fragment Mono for mono). Renamed `design-data/references/brand-identity.md` → `styling-resolution.md`
- Research-first methodology: agent researches real references + published evidence before designing; new reference `design-data/references/design-research-sources.md` (curated sources + how to research + output format) and a new "Research-First" core principle
- Context/token management module `agent/modules/context-management.md` (summarization/compaction, lean project-memory file + per-project `scratch.md`, sub-agent isolation for browser/dev-server checks, output hygiene) — now 7 modules (was 6)
- Project-scoped dev-server detection script `scripts/dev-server.mjs` (`check` / `start` / `stop` / `url`; targets the correct server for a project, no false matches on unrelated ports)
- Clean uninstall script `uninstall.sh` mirroring `install.sh` (`--target opencode|claude|cursor|codex|custom|all`, `--purge`, `--dry-run`, `--yes`); preserves generated design output by default, `--purge` removes everything
- Raised craft defaults: OKLCH color, whisper-quiet elevation, concentric border radius, optical alignment, ease-out motion (transform/opacity only), tabular numbers, image outlines, scale-on-press, ≥40×40px hit areas, text-wrap balance/pretty

### Changed
- Prototypes are now interactive React in one app with a tab group/toggle to switch variants A/B/C (was separate self-contained HTML files); verified in a real browser before presenting; output to `design-data/projects/<project>/prototype/` (runnable Vite+React app) + `variants.md` + `screenshots/`
- File output rule: task output is always written to the project working directory (default `design-data/projects/<project>/`); large artifacts referenced by path; the agent never writes output into its own instruction/config files or the installed bundle
- `agent/modules/quality-gates.md`: "Brand Identity" + "Premium Architecture Patterns" sections replaced by "Visual Foundations (Context-Driven)" + "Craft Principles" + "Optional Craft Techniques"; `premium-patterns.md` is now optional techniques, not mandatory

### Removed
- Locked brand: deep plum `#501E60`, violet `#7C3AED`, "two-tone", and the mandatory Double-Bezel / Button-in-Button / Whisper-Quiet architecture (whisper-quiet elevation survives only as a general craft principle)

## [1.3.1] - 2026-06-15

### Added
- Targeted subagents for heavy workflows: `interface-design`, `prototype-variants`, `figma-export` (stubs in `agents/`; gate rules remain in `quality-gates.md` + `workflows.md` only)
- `plugins/sync-agents.mjs` — generates `cursor/agents/` from canonical `agents/`
- Delegation blocks in `/interface`, `/prototype`, `/figma-export` commands; router and hook nudges updated

### Changed
- `install.sh` installs all subagents for Claude Code and Cursor; bundle includes `agents/`
- Docs: platform-adaptation, handoff guide, architecture, INDEX, AGENTS.md, Codex AGENTS.md
- Designer-facing docs: `designer-quick-start.md`, `workflows-by-task.md`, `quality-gates-for-designers.md`, `troubleshooting-for-designers.md`; rewritten handoff guide and doc index for non-technical readers

## [1.3.0] - 2026-06-15

### Added
- Platform adaptation module (`agent/modules/platform-adaptation.md`)
- Product design process reference (`design-data/references/product-design-process.md`)
- Cross-platform path resolver (`plugins/path-resolver.mjs`)
- macOS installation guide (`docs/installation-macos.md`)
- Designer handoff guide (`docs/handoff-guide.md`) and documentation index (`docs/README.md`)
- Workflow reference (`docs/workflows.md`)
- Smoke test suite (`scripts/test.sh`)
- Project folder README for designers (`design-data/projects/README.md`)

### Changed
- Validator accepts markdown field labels (`**Who**:`, `- **Swap Test**:`)
- `install.sh` supports `--yes` / `-y` for non-interactive install
- Refined `.gitignore` for designer handoff (runtime output, local installs, secrets)

### Fixed
- Validator false failures on well-formed markdown artifacts
- Plugin and validator path resolution outside OpenCode-only directories

## [1.2.0] - 2026-06-10

### Added
- Variant Protocol — 2–3 distinct UI directions per new screen
- Workflows §15 Prototype Variants, §16 Diagrams, §17 UX Annotations & Write-ups
- Reference files: prototype-variants, diagram, annotation, research-templates, brainstorming-playbook
- Commands: `/prototype`, `/diagram`, `/annotate`, `/brainstorm` (16 total)
- Cursor + Codex packaging via `plugins/sync-commands.mjs`
- `install.sh` targets: claude, cursor, codex, opencode, custom

### Changed
- Portable `design-data/` paths (no OpenCode-only prefix in modules)
- Figma export fallback bundle + per-platform MCP setup notes

## [1.1.0] - 2026-05-31

### Added
- AI Mentor, UX Flows, UX Audit, Design Converter, Figma Export, Portfolio Builder
- 12 slash commands; Claude Code plugin packaging
- Goal-mode prompt (`prompts/goal-mode.md`, ≤4000 chars)
- Two-tone brand: plum `#501E60` + violet `#7C3AED`

## [1.0.0] - 2026-05-31

### Added
- Initial release: 8 workflows, 5 quality gates, OpenCode plugin, DesignPrompts.dev reference data
