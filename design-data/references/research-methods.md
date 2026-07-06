# Research Methods & Concept Frameworks

Load for research planning, interviews, synthesis, JTBD, and taking an idea to a defensible
concept. Used by /research and the product-thinking module (`agent/modules/product-thinking.md`).

---

## 1. Research-First Rule

Before designing anything unfamiliar, you **MUST**:

1. Research how shipping products solve it (real screens, real flows).
2. Pull the published UX evidence (usability research, benchmarks, accessibility guidance).
3. Synthesize findings into a recommendation with tradeoffs — only then design.

**NEVER** design from memory or generic patterns — that is exactly how generic output happens.
Go light only when iterating on an already-grounded direction or when the user supplied the
references themselves.

---

## 2. Where to Research

| Need | Sources | Good for |
|---|---|---|
| Shipping UI patterns | Mobbin, Page Flows | Real app screens and recorded flows — how products actually solve it |
| UX evidence | NN/g, Baymard, Laws of UX, WCAG | The "why" — usability research, e-commerce/form benchmarks, principles, accessibility |
| User pain points | Reddit, forums, app reviews | What actually frustrates people, in their own words |
| Platform conventions | Apple HIG, Material Design | Platform-native expectations when targeting iOS/Android/web |

Use 3–5 sources across categories (pattern + evidence + pain) — one source is an anecdote.
When evidence conflicts with an inspiration shot, the evidence wins.

---

## 3. Assumption Map

Do this before picking a method. High-risk rows are what the research must test first.

```markdown
| # | Assumption | Risk if wrong | Cheapest test |
|---|------------|---------------|---------------|
| 1 | Managers triage by SLA, not customer tier | H | 5 interviews |
| 2 | CSV import is the main onboarding path | M | analytics pull |
| 3 | Teams will pay per-seat | H | pricing probe |
```

If no assumption rates High, question whether research is needed at all.

---

## 4. Participant Screener

Recruit by **behavior, never demographics-only**. 5–8 participants per segment for qualitative work.

- [ ] Target defined as: [role] who [behavior] at least [frequency]
- [ ] Role question with distractor options → disqualify non-targets
- [ ] Frequency: "In the last month, how often did you [behavior]?" — Never → disqualify
- [ ] Open check: "Walk me through the last time you [behavior]" → disqualify vague answers
- [ ] Exclusion: works for us or a competitor → disqualify (bias)
- [ ] Quota per segment, incentive, and session length stated up front

---

## 5. Discussion Guide (funnel)

Funnel shape: warm-up → context → behavior → pain → magic wand → close.

1. **Warm-up (5 min)** — role; what a normal Tuesday looks like.
2. **Context (10 min)** — where the task fits their week; who else touches it.
3. **Behavior (20 min)** — anchor to the **LAST TIME it happened, not hypotheticals**:
   "Walk me through the last time you [task], starting from what triggered it."
4. **Pain & workarounds (10 min)** — "Where does this go wrong? Tell me about the last time it did."
5. **Magic wand (5 min)** — "If you could change one thing, what — and why that one?"
6. **Close** — "What should I have asked that I didn't? Who else should I talk to?"

Facilitation: **NEVER** ask "would you use…" — ask "tell me about the last time…".
Silence is a probe; "Can you show me?" beats any description. Tag verbatim quotes with P#.

---

## 6. Synthesis

1. One observation per line, tagged `[P# | quote/behavior/workaround | task area]`.
2. Affinity-cluster bottom-up — do not pre-bucket by your research questions.
3. Name clusters as insight sentences ("Managers trust the queue only after re-sorting it"),
   not topics ("Trust issues").
4. Evidence per theme = verbatim quote + participant count.
5. Confidence labels: **strong** (5+ participants) / **moderate** (3–4) / **weak** (1–2).
6. Contradictions are findings — segment or flag them, **NEVER** average them.

Behavioral evidence outranks stated preference whenever the two conflict.

---

## 7. JTBD Profile

One profile per distinct job, not per distinct person. Replaces demographic personas.

```markdown
# JTBD Profile — [job nickname]
**Job**: When [situation], I want to [motivation], so I can [outcome].
**Forces**: push [today's frustration] · pull [what attracts them] ·
habit [inertia] · anxiety [what makes them hesitate]
**Current workarounds**: [observed, with evidence refs]
**Success in their words**: "[verbatim quote]" (P#)
**Evidence**: [n] interviews · Confidence: strong/moderate/weak
```

**PASS**: "When a ticket SLA is about to breach, I want to see which to grab next without
reading each one, so I can avoid penalties." **FAIL**: "Millennials want a modern task app."

---

## 8. Idea → Concept Ladder

1. **Frame the problem** — restate the idea as 5–10 How-Might-We questions; the idea is a
   hypothesized solution, find the problem underneath it.
2. **Find the job** — write the JTBD (§7). Concepts that don't serve a real job die.
3. **Riskiest assumption** — rank by (impact if wrong) × (uncertainty); test the top one first.
4. **Cheapest test** — desirability: interviews / landing-page smoke test · viability: pricing
   probe · feasibility: technical spike · usability: 5-user test.
5. **Diverge, then converge** — 5+ genuinely different directions, scored impact ×
   feasibility × desirability. One idea dressed up as "options" doesn't count.
6. **Write the concept brief** — the deliverable:

```markdown
# [Concept Name]
**Problem**: [the HMW it answers + why we believe it's real]
**Who**: [specific human in context — role, environment; NOT "users"]
**JTBD**: When [situation], I want to [motivation], so I can [outcome].
**The bet**: [1 paragraph — what it is and why it fits the job]
**Riskiest assumption**: [the one thing that must be true]
**Test**: [cheapest way to test it next]
**Success signal**: [the single metric/behavior that says it's working]
```

**NEVER** solve before framing the problem. **NEVER** present a concept without a
riskiest-assumption test and an explicit success signal.
