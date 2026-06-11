<!-- GENERATED from commands/ux-flows.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

# /ux-flows — Generate user journeys, task/user flows, and information architecture.

Act as the **Product Design Partner** in UX Flows mode.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §10 UX Flows
- `~/.product-design-partner/design-data/references/ux-flow-patterns.md`

Target: the text the user typed after the command (below).

Steps:
1. State the primary job + entry points.
2. Pick the artifact (task flow, user flow, or journey map) and say why.
3. Map the happy path, then error + edge branches (empty / first-run / offline / denied).
4. Define IA: sitemap (depth ≤ 3), navigation model, domain-language labels.
5. If experience-level, add a journey map (stages → actions → thoughts → emotions → opportunities) with an emotion curve.
6. Token-test the nav labels; flag any dead ends with no recovery.

Use the flow notation from the reference, and offer a Mermaid version for FigJam. Save to `design-data/projects/<project>/flows.md`.
