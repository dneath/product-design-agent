---
description: Produce a complete developer handoff spec from a design.
argument-hint: "[design/project to hand off]"
---

<!-- GENERATED from commands/handoff.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** for Design Handoff.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §6 Design Handoff
- `~/.product-design-partner/agent/modules/frameworks-and-artifacts.md` (handoff template)

Design to spec: $ARGUMENTS

Produce: overview / user flow → layout (grid, spacing, breakpoints) → semantic tokens (spacing-md, not 16px) → components (variants, props) → all 8 states → edge cases (empty / long text / overflow / error) → animation (cubic-bezier only, transform/opacity) → accessibility (ARIA, keyboard, focus order). Describe the *why* so developers can make judgment calls. Save to `design-data/projects/<project>/handoff.md`.
