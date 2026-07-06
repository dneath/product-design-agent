# Product Thinking — Brainstorming, Ideation, Research

> **When to use:** Brainstorming, ideation, "what should X contain", prioritization, product
> questions. Also: research planning, interviews, synthesis, JTBD, validating an idea or concept.
> Commands: `/brainstorm`, `/research`. Deep method: `design-data/references/brainstorm-techniques.md`,
> `design-data/references/research-methods.md`.

Run the Thinking Protocol (entry file) first. Then follow the workflow for the task type below.

---

## 1. Brainstorming — diverge, then converge

**MUST diverge before judging. NEVER present the first idea as the answer.**

1. **Frame** the problem as a How-Might-We statement (reframe the user's wording if it embeds a solution).
2. **Diverge** — generate **≥10 distinct ideas using ≥2 techniques** before any evaluation.
   Fewer than that is a first guess with confidence, not a brainstorm.
   Default techniques: HMW reframing + Crazy 8s (8 one-line concepts, timeboxed thinking).
   On request or when stuck: SCAMPER, JTBD lens, journey-stage ideation, affinity grouping.
   Technique cards: `design-data/references/brainstorm-techniques.md`.
3. **Group** ideas into ≥3 clusters (affinity) and name each cluster by the bet it makes.
4. **Converge** with explicit criteria — score each cluster/idea on **user value / feasibility /
   effort** (1–5 each). Ties break toward the option whose riskiest assumption is cheapest to test.
5. **Exit** with the mandatory output contract (below).

## 2. Product questions ("what should the settings page contain?")

Never answer with a generic list. Reason through, in order:

1. **Users' mental model** — what categories do users already think in? (Their vocabulary, not the org chart.)
2. **Information architecture** — group by task frequency and relatedness; depth ≤3 levels;
   the most frequent job reachable in one step.
3. **Precedent** — how do 2–3 well-designed shipping products structure this, and why does that
   fit (or not fit) this product's context?
4. **Constraints** — platform conventions, existing nav patterns in the repo, technical limits.

State each step's conclusion with its reason before proposing the answer.

## 3. Research

**Research-first rule: MUST research before designing anything unfamiliar** — how shipping
products solve it + published UX evidence — then synthesize, then design. NEVER design from
memory or generic patterns alone. Sources, templates, and interview method:
`design-data/references/research-methods.md`.

- Plan: assumption map → pick the cheapest method that tests the riskiest assumption.
- Interviews: behavior-based screeners; anchor questions to the LAST TIME it happened, never hypotheticals.
- Synthesis: themes with evidence (quote + participant count) and confidence labels (strong/moderate/weak).
- Idea validation: idea → concept ladder (problem framing → riskiest assumption → cheapest test →
  concept brief).

## 4. Prioritization

Score candidates on user value / feasibility / effort (1–5 each) in a table. State the scoring
rationale for any score that drives the ranking. Flag any item whose score rests on an untested
assumption.

---

## Output contract — every brainstorm/product-thinking deliverable MUST end with:

```markdown
## Options
| Option | Core bet | User value | Feasibility | Effort | Main tradeoff |
|---|---|---|---|---|---|
| ... | one line | 1–5 | 1–5 | 1–5 | one line |

## Recommendation
<option> — because <rationale tied to user value and the scoring>.

## Open questions
- <what must be answered before committing>
```

- [ ] ≥10 ideas from ≥2 techniques were generated before converging (list them, compressed)
- [ ] Every option in the table has a named tradeoff — no free lunches
- [ ] The recommendation states a reason, not just a pick
- [ ] Open questions name who/what can answer them

**NEVER** output a wall of unranked bullets as a "brainstorm". **NEVER** score without showing criteria.
