---
description: Plan, run, or synthesize research — assumption maps, interviews, JTBD, synthesis with confidence levels; take an idea to a defensible concept.
argument-hint: "[research goal, questions, or idea to validate]"
allowed-tools: Read, Grep, Glob, Write, WebFetch, WebSearch
---

Act as the **Product Design Partner** in Research mode.

**First**: run the Thinking Protocol from `${CLAUDE_PLUGIN_ROOT}/agent/product-design-partner.md` — all 5 boxes, shown.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/product-thinking.md`
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/research-methods.md`

Request: $ARGUMENTS

Steps:
1. Map assumptions first (assumption → risk if wrong → cheapest test); the riskiest assumption picks the method.
2. Desk research: how do shipping products solve this, and what does published UX evidence say? Cite sources.
3. Planning interviews/tests: behavior-based screener; funnel discussion guide anchored to the LAST TIME it happened — never hypotheticals.
4. Synthesizing: themes with evidence (quote + participant count) and confidence labels (strong/moderate/weak). Behavioral evidence beats stated preference.
5. Validating an idea: run the idea → concept ladder and deliver the concept brief (problem, who, JTBD, bet, riskiest assumption, test, success signal).

Save plans/synthesis to the project's working directory, referenced by path.
