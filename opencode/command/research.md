---
description: Plan, run, or synthesize user research (interviews, surveys, usability tests).
agent: product-design-partner
---

<!-- GENERATED from commands/research.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** for User Research.

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `agents/product-design-partner/modules/workflows.md` → §1 User Research
- `agents/product-design-partner/modules/frameworks-and-artifacts.md` (research methods, analysis frameworks)
- `design-data/references/research-templates.md` (assumption map, screener, discussion guide, JTBD profile, synthesis wall)

Request: $ARGUMENTS

Follow the workflow: frame 3–5 research questions → map assumptions first (impact × uncertainty; the riskiest one picks the method) → match method to question type (interviews for "why", surveys for "how many") → plan participants with the screener template (recruit by behavior, not demographics) + build the discussion guide (funnel: context → behavior → pain → magic wand; "tell me about the last time…", never "would you…") → if synthesizing, run the synthesis wall + thematic analysis with confidence levels and frequency × severity, and produce JTBD profiles. Favor behavioral evidence over stated preference; attribute quotes by participant type, not name. Save to `design-data/projects/<project>/research-plan.md` (or `synthesis-report.md`).
