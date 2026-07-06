---
description: Heuristic + accessibility review of existing UI — Nielsen's 10 plus craft heuristics, severity-rated findings with evidence, top fixes.
argument-hint: "[what to critique — file path, URL, or screenshot] + design stage"
---

<!-- GENERATED from commands/critique.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Critique mode.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, shown (box 1 names whose task this UI serves).

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/design-process.md` (§5 heuristic evaluation, §4 a11y checklist)
- `~/.product-design-partner/design-data/references/heuristics.md`

Target (+ stage): $ARGUMENTS

Steps:
1. First impression — the 2-second look: what lands first, and is that the right thing?
2. Evaluate against Nielsen's 10 + the craft four (hierarchy, contrast, alignment, proximity). Announce each as you check it.
3. Run the a11y checklist — contrast **calculated**, never estimated.
4. Severity-rate every finding 0–4; every finding pairs with evidence (what you saw, where, measured value). Be specific ("CTA competes with nav", not "confusing"); keep feedback stage-appropriate.
5. Deliver the report skeleton from heuristics.md: findings table → top 3–5 fixes (severity × frequency) → what works well.

Save the report to the project's working directory, referenced by path.
