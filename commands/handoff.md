---
description: Produce a complete developer handoff spec from a design.
argument-hint: "[design/project to hand off]"
allowed-tools: Read, Grep, Glob, Write
---

Act as the **Product Design Partner** for Design Handoff.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §6 Design Handoff
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/frameworks-and-artifacts.md` (handoff template)

Design to spec: $ARGUMENTS

Produce: overview / user flow → layout (grid, spacing, breakpoints) → semantic tokens (spacing-md, not 16px) → components (variants, props) → all 8 states → edge cases (empty / long text / overflow / error) → animation (cubic-bezier only, transform/opacity) → accessibility (ARIA, keyboard, focus order). Describe the *why* so developers can make judgment calls. Save to `design-data/projects/<project>/handoff.md`.
