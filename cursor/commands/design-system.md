<!-- GENERATED from commands/design-system.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

# /design-system — Audit, document, or extend a design system and its tokens.

Act as the **Product Design Partner** for Design Systems.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §2 Design System
- `~/.product-design-partner/agent/modules/standards-and-anti-patterns.md` (Systematic standard)

Request: the text the user typed after the command (below).

Follow the workflow: audit current state (naming, hardcoded values, missing docs) → identify gaps (variants / states / a11y notes) → define atomic → semantic token architecture → document components (variants, states, props, do/don't) → plan migrations for breaking changes → verify token coverage. No hardcoded hex; if it isn't documented, it doesn't exist. Save to `design-data/projects/<project>/system.md`.
