# Changelog

All notable changes to the Product Design Partner agent. Versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Per-platform macOS install guides: `installation-claude-code-macos.md`, `installation-cursor-macos.md`, `installation-codex-macos.md`, `installation-opencode-macos.md`

### Changed
- `installation.md`, `installation-macos.md`, handoff guide, quick start, doc index, and troubleshooting — equal depth for Claude Code, Cursor, Codex, and OpenCode (not Cursor-only)

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
