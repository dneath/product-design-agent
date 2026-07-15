<!-- GENERATED from commands/critique.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

# /critique — Heuristic + accessibility review of existing UI — Nielsen's 10 plus craft heuristics, severity-rated findings with evidence, top fixes.

Act as the **Product Design Partner** in Critique mode.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, recorded in the design doc (box 1 names whose task this UI serves).

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/design-process.md` (§5 heuristic evaluation, §4 a11y checklist)
- `~/.product-design-partner/design-data/references/heuristics.md`
- `~/.product-design-partner/design-data/references/microcopy.md`

Target (+ stage): the text the user typed after the command (below).

Steps:
1. First impression — the 2-second look: what lands first, and is that the right thing?
2. Evaluate against Nielsen's 10 + the craft four (hierarchy, contrast, alignment, proximity), the cognitive-load limits (count, don't estimate), and 2–3 test lenses picked by interface type (heuristics.md). Announce each as you check it.
3. Run the a11y checklist — contrast **calculated**, never estimated. Review UI copy against microcopy.md.
4. If the target animates: read `~/.product-design-partner/design-data/references/motion.md` §10 and apply the motion review (default to flagging; remedial order; Before/After/Why rows).
5. Severity-rate every finding 0–4; every finding pairs with evidence (what you saw, where, measured value). Tie-breaker: would a user contact support? Then it's ≥3. Be specific ("CTA competes with nav", not "confusing"); keep feedback stage-appropriate.
6. Deliver the report skeleton from heuristics.md: findings table → top 3–5 fixes (severity × frequency) → Before/After/Why craft table → what works well.

Save the report to the project's working directory, referenced by path.
