# User Research Templates

Concrete artifacts for the **User Research** workflow (§1). Method-selection guidance
lives in `frameworks-and-artifacts.md`; these are the fill-in templates.

---

## Assumption Map (do this BEFORE picking a method)

List what the team believes, then rank. The top-right cell (high impact × high
uncertainty) is what the research must test.

```markdown
| # | Assumption | Type | Impact if wrong | Uncertainty | Test via |
|---|------------|------|-----------------|-------------|----------|
| 1 | Managers triage by SLA, not by customer tier | user | High | High | interviews |
| 2 | CSV import is the main onboarding path | behavior | High | Medium | analytics |
| 3 | Teams will pay per-seat | business | High | High | pricing interviews |
```

Types: user / problem / solution / business / feasibility. If no assumption is high/high,
question whether research is needed at all.

---

## Participant Screener

Recruit by **behavior, not demographics**. 5-8 participants per segment for qualitative work.

```markdown
# Screener — [study name]
Target: [role] who [behavior] at least [frequency]

Q1. Which best describes your role? [list incl. distractors] → DISQUALIFY if not target
Q2. In the last month, how often did you [target behavior]?
    Never → DISQUALIFY · 1-2× → maybe · Weekly+ → QUALIFY
Q3. Walk me through the last time you [behavior]. [open — disqualify vague answers]
Q4. Do you work for / have you worked for [us or competitors]? → DISQUALIFY (bias)
Quota: [n] per segment · Incentive: [amount] · Length: [45-60 min]
```

---

## Discussion Guide (semi-structured interview, funnel shape)

Context → behavior → pain → magic wand. Past behavior, never hypotheticals.

```markdown
# Discussion Guide — [study name]
Research questions this answers: [RQ1, RQ2, …]

## Warm-up (5 min)
- Tell me about your role. What does a normal Tuesday look like?

## Context (10 min)
- Where does [task area] fit in your week? Who else touches it?

## Behavior — anchor to the LAST TIME (20 min)
- Walk me through the last time you [task]. Start from what triggered it.
- [Probe] What did you do next? What were you looking at?
- [Probe] What did you expect to happen there?
- What tools/spreadsheets/workarounds were involved? Can you show me?

## Pain & workarounds (10 min)
- Where does this go wrong? Tell me about the last time it did.
- What have you tried? What did you give up on?

## Magic wand (5 min)
- If you could change one thing about this whole process, what — and why that one?

## Close
- What should I have asked that I didn't? Who else should I talk to?
```

Facilitation rules:
- Ask "tell me about the last time…", never "would you use…"
- Silence is a probe; 5 seconds of it beats a leading follow-up
- Capture verbatim quotes with participant type tags (P3, support lead)
- "Can you show me?" > any description of a workflow

---

## Synthesis Wall (from raw notes to themes)

1. One observation per line, tagged `[P# | quote/behavior/workaround | task area]`
2. Affinity-cluster bottom-up (don't pre-bucket by your questions)
3. Name each cluster as an insight sentence, not a topic: "Managers trust the queue only
   after manually re-sorting it" — not "Trust issues"
4. Per theme: evidence count, sources, confidence (High 5+ / Medium 3-4 / Low 1-2)
5. Contradictions are findings — segment or flag them, never average them
6. Output via the Synthesis Report template (`frameworks-and-artifacts.md`)

---

## JTBD Profile (persona, behavior-first)

Replaces demographic personas. One per distinct job, not per distinct person.

```markdown
# JTBD Profile — [job nickname, e.g., "The Queue Keeper"]
**Job**: When [situation], I want to [motivation], so I can [outcome].
**Context**: [environment, time pressure, interruptions, tools open]
**Hiring criteria**: [what makes them adopt a solution for this job]
**Firing triggers**: [what makes them abandon one]
**Current workarounds**: [observed, with evidence refs]
**Success in their words**: "[verbatim quote]" (P#)
**Evidence**: [n] interviews, [sources]; Confidence: High/Med/Low
```

---

## Research Quality Bar

- Every claim traces to a tagged observation; every theme has a confidence level
- Behavioral evidence outranks stated preference whenever they conflict
- Findings forced into pre-existing buckets = synthesis failure (see anti-patterns module)
- Recommendations name the design decision they should drive (link to D# records, §17)
