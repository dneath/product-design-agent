# Brainstorming Playbook

Reference for the **Product Strategy** workflow (§4) and the `/brainstorm` command.
Framework names live in `frameworks-and-artifacts.md`; this is how to actually run them.

**The quota**: a brainstorm produces **≥15 raw ideas from ≥3 techniques** before any
evaluation. Fewer than that isn't a brainstorm — it's a first guess with confidence.

---

## Session Shape (diverge → provoke → converge)

1. **Frame** — 5-10 How-Might-We reframings of the problem; pick 1-2 to attack
2. **Diverge** — rotate technique cards below; log every idea, no editing, no "but"
3. **Provoke** — one deliberate round of extremes (incl. a worst-idea round)
4. **Converge** — cluster, score, shortlist; capture assumptions per shortlisted idea
5. **Exit** — next steps: what to research (§1), prototype (§15), or mentor-test (§9)

Never evaluate during divergence. The first 5 ideas are everyone's obvious ideas; the
quota exists to get past them.

---

## Technique Cards (each card: prompt → worked one-liner)

**Constraint removal** — "What if [budget/tech/policy] didn't exist?"
> No latency limits → precompute every manager's morning triage before they wake up.

**Analogy transfer** — "How does [unrelated industry] solve this shape of problem?"
> Air-traffic control handles 100 simultaneous urgencies → a single 'tower view' with
> altitude = time-to-breach.

**Inversion** — "How would we make this problem WORSE?" then reverse each answer.
> Worse: hide ticket age entirely → Reverse: age is the most physically prominent signal.

**SCAMPER sweep** — Substitute · Combine · Adapt · Modify · Put-to-other-use · Eliminate ·
Reverse; one idea per letter, fast.
> Eliminate: what if tickets auto-resolved unless claimed in 48h?

**Extreme users** — design for the 1% (500 tickets/day; first day on the job; offline;
screen-reader-only), then check what generalizes.
> First-day agent → every queue state explains itself; no tribal knowledge required.

**Worst idea round** — propose 3 genuinely terrible ideas, then mine each for the
reversible insight.
> "Auto-reply 'we got it, calm down'" → terrible; insight: customers mainly need proof
> of receipt with a real time estimate.

**Forced combination** — smash the concept against a random domain noun (garden, casino,
orchestra, kitchen…).
> Kitchen → ticket "stations" with prep/cook/plate stages and a pass where leads QA.

**10×/10% split** — one batch of ideas that would 10× the outcome, one batch achievable
in a week. The 10× batch exposes ambition; the 10% batch exposes momentum.

---

## Provocation Prompts (when the well runs dry)

- What would the **villain** version of this product do? What does that reveal?
- What if users could only interact **once per day**? Only by **voice**? Only **together**?
- What would we build if this had to work **with zero UI**?
- Which sacred feature would we **delete** if we started today?

---

## Convergence Rubric

1. **Cluster** raw ideas into themes; name clusters by the user outcome, not the feature
2. **Score** the top 5-8 candidates, 1-5 each — show the table, not just the winner:

```markdown
| Idea | Impact | Feasibility | Novelty | Σ | Riskiest assumption |
|------|--------|-------------|---------|---|---------------------|
| Tower view (altitude = breach time) | 5 | 3 | 4 | 12 | managers parse altitude metaphor instantly |
| 48h auto-release of unclaimed tickets | 4 | 4 | 3 | 11 | leads accept loss of manual control |
```

3. **Shortlist 2-3** (not 1 — pairs naturally with variant prototyping, §15)
4. Per shortlisted idea: riskiest assumption + cheapest test (interview? fake door?
   prototype variant?) — route to §1 research or §9 mentor for the concept brief

Scoring notes: Impact = effect on the framed problem for the target human (not revenue
hand-waving) · Feasibility = this team, this quarter · Novelty = differentiation vs. the
default everyone would build. Ties break toward the idea with the **cheapest test**.

---

## Brainstorm Anti-Patterns

- ❌ **One-idea brainstorm**: arriving with a favorite and decorating it with two strawmen
- ❌ **Mid-divergence evaluation**: "yes but…" during idea generation kills the long tail
- ❌ **Feature parity trap**: competitor-copying as ideation (it's research, not ideas)
- ❌ **Vague winners**: shortlisted ideas with no riskiest assumption or test attached
- ❌ **Quota theater**: 15 restatements of 3 ideas — clusters reveal this; require ≥4 distinct clusters
- ❌ **Skipping the capture**: ideas not written into next steps are ideas lost

---

## Output Template

`design-data/projects/[project-name]/brainstorm.md`

```markdown
# Brainstorm — [problem]
## Frame
HMW chosen: [1-2 reframings + why]
## Raw ideas ([n ≥ 15], techniques: [list ≥ 3])
1. …
## Clusters
- [Outcome-named cluster]: ideas #2,#7,#11
## Scoring
[rubric table]
## Shortlist & next steps
- [Idea] — riskiest assumption: […] — test: [method, owner, by-when]
```
