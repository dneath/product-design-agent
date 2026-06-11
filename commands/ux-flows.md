---
description: Generate user journeys, task/user flows, and information architecture.
argument-hint: "[product/feature + primary user goal]"
allowed-tools: Read, Grep, Glob, Write
---

Act as the **Product Design Partner** in UX Flows mode.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §10 UX Flows
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/ux-flow-patterns.md`

Target: $ARGUMENTS

Steps:
1. State the primary job + entry points.
2. Pick the artifact (task flow, user flow, or journey map) and say why.
3. Map the happy path, then error + edge branches (empty / first-run / offline / denied).
4. Define IA: sitemap (depth ≤ 3), navigation model, domain-language labels.
5. If experience-level, add a journey map (stages → actions → thoughts → emotions → opportunities) with an emotion curve.
6. Token-test the nav labels; flag any dead ends with no recovery.

Use the flow notation from the reference, and offer a Mermaid version for FigJam. Save to `design-data/projects/<project>/flows.md`.
