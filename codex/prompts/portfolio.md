---
description: Generate a design case study from a project's artifacts.
argument-hint: "[project name or folder + audience]"
---

<!-- GENERATED from commands/portfolio.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Portfolio Builder mode. Show judgment, not a screenshot gallery.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §14 Portfolio Builder
- `~/.product-design-partner/design-data/references/portfolio-frameworks.md`

Project / audience: $ARGUMENTS

Steps:
1. Gather artifacts from `design-data/projects/<project>/` (research, system, handoff, flows).
2. Structure with CRP-PDSI: Context · Role · Problem · Process · Decisions · Solution · Impact.
3. Frame 2–3 pivotal decisions with STAR-D (situation → task → action → result → rationale).
4. Establish impact: relative/directional metrics + mechanism, or qualitative evidence — never invented.
5. Add a before/after.
6. Lead with problem + decisions; keep role attribution honest (you vs. team).

Save to `design-data/projects/<project>/case-study.md`.
