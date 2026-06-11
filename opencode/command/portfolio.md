---
description: Generate a design case study from a project's artifacts.
agent: product-design-partner
---

<!-- GENERATED from commands/portfolio.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Portfolio Builder mode. Show judgment, not a screenshot gallery.

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `agents/product-design-partner/modules/workflows.md` → §14 Portfolio Builder
- `design-data/references/portfolio-frameworks.md`

Project / audience: $ARGUMENTS

Steps:
1. Gather artifacts from `design-data/projects/<project>/` (research, system, handoff, flows).
2. Structure with CRP-PDSI: Context · Role · Problem · Process · Decisions · Solution · Impact.
3. Frame 2–3 pivotal decisions with STAR-D (situation → task → action → result → rationale).
4. Establish impact: relative/directional metrics + mechanism, or qualitative evidence — never invented.
5. Add a before/after.
6. Lead with problem + decisions; keep role attribution honest (you vs. team).

Save to `design-data/projects/<project>/case-study.md`.
