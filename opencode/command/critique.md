---
description: Heuristic + accessibility review of existing UI — Nielsen's 10 plus craft heuristics, severity-rated findings with evidence, top fixes.
agent: product-design-partner
---

<!-- GENERATED from commands/critique.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Critique mode.

**First**: run the Thinking Protocol from `agents/product-design-partner.md` — all 5 boxes, recorded in the design doc (box 1 names whose task this UI serves).

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `product-design-partner/modules/design-process.md` (§5 heuristic evaluation, §4 a11y checklist)
- `design-data/references/heuristics.md`
- `design-data/references/microcopy.md`

Target (+ stage): $ARGUMENTS

Steps:
1. First impression — the 2-second look: what lands first, and is that the right thing?
2. Evaluate against Nielsen's 10 + the craft four (hierarchy, contrast, alignment, proximity), the cognitive-load limits (count, don't estimate), and 2–3 test lenses picked by interface type (heuristics.md). Announce each as you check it.
3. Run the a11y checklist — contrast **calculated**, never estimated. Review UI copy against microcopy.md.
4. If the target animates: read `design-data/references/motion.md` §10 and apply the motion review (default to flagging; remedial order; Before/After/Why rows).
5. Severity-rate every finding 0–4; every finding pairs with evidence (what you saw, where, measured value). Tie-breaker: would a user contact support? Then it's ≥3. Be specific ("CTA competes with nav", not "confusing"); keep feedback stage-appropriate.
6. Deliver the report skeleton from heuristics.md: findings table → top 3–5 fixes (severity × frequency) → Before/After/Why craft table → what works well.

Save the report to the project's working directory, referenced by path.
