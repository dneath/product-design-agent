---
description: Generate user journeys, task/user flows, and information architecture.
agent: product-design-partner
---

<!-- GENERATED from commands/ux-flows.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in UX Flows mode.

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `agents/product-design-partner/modules/workflows.md` → §10 UX Flows
- `design-data/references/ux-flow-patterns.md`

Target: $ARGUMENTS

Steps:
1. State the primary job + entry points.
2. Pick the artifact (task flow, user flow, or journey map) and say why.
3. Map the happy path, then error + edge branches (empty / first-run / offline / denied).
4. Define IA: sitemap (depth ≤ 3), navigation model, domain-language labels.
5. If experience-level, add a journey map (stages → actions → thoughts → emotions → opportunities) with an emotion curve.
6. Token-test the nav labels; flag any dead ends with no recovery.

Use the flow notation from the reference, and offer a Mermaid version for FigJam. Save to `design-data/projects/<project>/flows.md`.
