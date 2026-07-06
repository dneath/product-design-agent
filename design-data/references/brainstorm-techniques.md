# Brainstorm Techniques

Load when running structured ideation. Used by /brainstorm and the product-thinking
module (`agent/modules/product-thinking.md`).

## Session Shape

1. **Frame** — write 3-5 How-Might-We reframings of the problem; pick 1-2 to attack.
2. **Diverge** — generate ideas fast; quantity over quality, log everything, no judgment.
3. **Provoke** — one deliberate round of extremes to push past the obvious.
4. **Converge** — cluster, then score against explicit criteria (rubric below).
5. **Exit** — one recommendation with rationale, plus open questions to resolve.

**MUST** diverge before judging — evaluation during idea generation kills the long tail.
**NEVER** present the first idea as the conclusion; the first ideas are everyone's
obvious ideas.

## Divergence Quota

- [ ] ≥10 raw ideas logged before any convergence
- [ ] Ideas drawn from ≥2 distinct techniques below
- [ ] Every idea written down verbatim — no editing, no "yes but"

Fewer than 10 ideas from 2 techniques is a first guess with confidence, not a brainstorm.

## Technique Cards

**How-Might-We reframing** — restate the problem as 3-5 "How might we…" questions at
different altitudes (broader, narrower, inverted). Each reframe opens a different idea
space; pick the one or two that feel generative, not just familiar.
> "Users miss deadlines" → "HMW make deadlines impossible to forget?" vs. "HMW make
> missing a deadline recoverable?"

**Crazy 8s** — 8 sketches/directions in 8 timeboxed slots. Adapted for text: write
8 one-line concepts back to back, no pausing to evaluate. Speed forces past the
obvious; concepts 6-8 are usually where the interesting ones live.
> Slot 7: "the dashboard is an inbox — every metric change arrives as a triageable item."

**SCAMPER** — sweep the concept through Substitute, Combine, Adapt, Modify,
Put-to-other-use, Eliminate, Reverse. One idea per letter, fast; Eliminate and
Reverse tend to produce the boldest candidates.
> Eliminate: what if tickets auto-resolved unless claimed within 48 hours?

**JTBD lens** — ideate against the job the user is hiring the product for, not the
feature being discussed. Write the job statement ("When [situation], I want to
[motivation], so I can [outcome]"), then generate ideas that serve the job — including
ones that delete the feature entirely.
> Job: "know my team is on track without asking" → a weekly auto-digest beats a
> richer status page.

**Journey mapping** — lay out the user's journey stage by stage (discover → decide →
first use → habit → churn risk), then ideate per stage. Forces coverage: most teams
over-ideate on first use and ignore the habit and churn stages.
> Churn-risk stage idea: detect 14 days of silence and offer a one-click "pare back
> to essentials" mode instead of a re-engagement email.

**Affinity grouping** — after diverging, cluster the raw ideas into ≥3 groups named
by user outcome, not feature. Fewer than 3 clusters means the ideas are restatements
of one idea — go back and diverge with a different technique.
> 12 ideas collapse into: "reduce time-to-answer", "make state self-explaining",
> "remove the need to check at all."

## Provocation Prompts

Use when the well runs dry — one round, then return to converging:

- **Invert it** — how would we make this problem worse? Reverse each answer.
- **10x it** — what would 10x the outcome, ignoring effort? What's the 10% version?
- **Remove the UI** — what would we build if this had to work with zero interface?
- **Competitor taboo** — what would a competitor never do here? What does that reveal?
- **Delete a sacred feature** — which existing feature would we cut if starting today?
- **Extreme user** — design for the 1% (power user, first day, offline); what generalizes?

## Convergence Rubric

1. Cluster raw ideas (affinity grouping above); carry the top 3-5 clusters/ideas forward.
2. Score each 1-5 on **user value**, **feasibility**, and **effort** (5 = least effort).
3. Show the table — the scoring is the argument, not just the winner.
4. Break ties toward the idea whose riskiest assumption is **cheapest to test**
   (an interview or fake door beats a build). See
   `design-data/references/research-methods.md` for test methods.

| Option | User value | Feasibility | Effort | Σ | Riskiest assumption |
|--------|-----------|-------------|--------|---|---------------------|
| Auto-digest | 4 | 4 | 3 | 11 | users trust a summary they didn't compose |

## Output Template

**MUST** end every brainstorm with these blocks, in this order:

```markdown
## HMW statement
[chosen reframing + why this one]

## Options
| Option | Core bet | User value | Feasibility | Effort | Main tradeoff |
|--------|----------|-----------|-------------|--------|---------------|
| ...    | ...      | 1-5       | 1-5         | 1-5    | ...           |

## Recommendation
[option + rationale grounded in the scores and the riskiest-assumption tiebreak]

## Open questions
- [what must be true / what to test next, and the cheapest way to test it]
```
