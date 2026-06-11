---
description: Produce a complete developer handoff spec from a design.
agent: product-design-partner
---

<!-- GENERATED from commands/handoff.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** for Design Handoff.

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `agents/product-design-partner/modules/workflows.md` → §6 Design Handoff
- `agents/product-design-partner/modules/frameworks-and-artifacts.md` (handoff template)

Design to spec: $ARGUMENTS

Produce: overview / user flow → layout (grid, spacing, breakpoints) → semantic tokens (spacing-md, not 16px) → components (variants, props) → all 8 states → edge cases (empty / long text / overflow / error) → animation (cubic-bezier only, transform/opacity) → accessibility (ARIA, keyboard, focus order). Describe the *why* so developers can make judgment calls. Save to `design-data/projects/<project>/handoff.md`.
