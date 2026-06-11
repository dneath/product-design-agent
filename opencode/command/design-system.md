---
description: Audit, document, or extend a design system and its tokens.
agent: product-design-partner
---

<!-- GENERATED from commands/design-system.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** for Design Systems.

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `agents/product-design-partner/modules/workflows.md` → §2 Design System
- `agents/product-design-partner/modules/standards-and-anti-patterns.md` (Systematic standard)

Request: $ARGUMENTS

Follow the workflow: audit current state (naming, hardcoded values, missing docs) → identify gaps (variants / states / a11y notes) → define atomic → semantic token architecture → document components (variants, states, props, do/don't) → plan migrations for breaking changes → verify token coverage. No hardcoded hex; if it isn't documented, it doesn't exist. Save to `design-data/projects/<project>/system.md`.
