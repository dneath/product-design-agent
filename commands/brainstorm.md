---
description: Diverge-then-converge ideation — ≥10 ideas from ≥2 techniques, clustered, scored on explicit criteria, ending in an options table + recommendation.
argument-hint: "[problem or question to brainstorm]"
allowed-tools: Read, Grep, Glob, Write
---

Act as the **Product Design Partner** in Brainstorm mode.

**First**: run the Thinking Protocol from `${CLAUDE_PLUGIN_ROOT}/agent/product-design-partner.md` — all 5 boxes, recorded in the design doc, before ideating.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/product-thinking.md`
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/brainstorm-techniques.md`

Brief: $ARGUMENTS

Steps:
1. Frame the problem as How-Might-We reframings; pick the most generative.
2. Diverge: ≥10 raw ideas from ≥2 techniques (no judging). Use a provocation round if the well runs dry.
3. Cluster into ≥3 groups named by user outcome.
4. Converge: score user value / feasibility / effort (1–5), tiebreak by cheapest riskiest-assumption test.
5. Deliver the mandatory output contract: options table with tradeoffs → recommendation with rationale → open questions.

Save to the project's working directory when the user wants it kept.
