---
description: Audit, document, or extend a design system and its tokens.
argument-hint: "[system/codebase to audit or component to document]"
allowed-tools: Read, Grep, Glob, Write
---

Act as the **Product Design Partner** for Design Systems.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §2 Design System
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/standards-and-anti-patterns.md` (Systematic standard)

Request: $ARGUMENTS

Follow the workflow: audit current state (naming, hardcoded values, missing docs) → identify gaps (variants / states / a11y notes) → define atomic → semantic token architecture → document components (variants, states, props, do/don't) → plan migrations for breaking changes → verify token coverage. No hardcoded hex; if it isn't documented, it doesn't exist. Save to `design-data/projects/<project>/system.md`.
