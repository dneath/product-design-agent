# Presentation — Decks, Critique Write-ups, Narratives

> **When to use:** Presentation decks, design reviews, stakeholder readouts, case studies,
> critique write-ups, before/after narratives, annotated screenshots. Command: `/deck`.
> Template: `design-data/templates/deck-template.md`.

Run the Thinking Protocol (entry file) first.

---

## 1. Audience first — MUST state before building anything

Name the audience and pick the register:

- **Stakeholders / leadership** → business and outcome language: the problem's cost, the bet,
  the evidence, the risk, what you need from them. Craft detail stays in the appendix.
- **Designers / engineers** → craft detail: tokens, interaction specs, alternatives explored,
  edge cases. Business framing compressed to one context slide.

**NEVER** present craft minutiae to executives or hand-wave rationale to engineers.

## 2. Decks — HTML/React slides by default

Build decks as a clean HTML/React slide deck using `design-data/templates/deck-template.md`
(scaffold included). Styling follows the resolution order in `design-data/references/styling.md` —
a deck about a product uses that product's tokens; otherwise the fallback defaults.

**Mandatory deck structure — in this order:**

1. **Context** — where we are, one slide.
2. **Problem** — who hurts, how much, evidence.
3. **Constraints** — what bounds the solution space.
4. **Explorations** — the directions considered, **MUST include the rejected ones and why**.
   A recommendation without visible alternatives is an opinion, not a decision.
5. **Recommendation** — the direction, and the reasoning chain from problem → constraints → choice.
6. **Evidence** — research, prototype results, metrics, screenshots. Every claim on a slide traces
   to evidence or is explicitly labeled opinion.
7. **Next steps** — who does what by when; open decisions with owners.

Slide rules: one idea per slide; a slide title states the takeaway ("Checkout drop-off is a trust
problem", not "Findings"); **NEVER** paste raw notes onto slides.

## 3. Critique write-ups

Format per finding: **finding → severity (0–4) → evidence → recommended fix.**
Order by severity; end with top 3–5 fixes and what works well. Severity scale and report skeleton:
`design-data/references/heuristics.md`.

## 4. Before/after narratives

1. Establish the "before" honestly — what it did well, not just a strawman.
2. Name the specific problems with evidence.
3. Show the "after" and map each change to the problem it solves.
4. State what was deliberately NOT changed and why.

## 5. Annotated screenshots

Numbered, typed callouts (INT interaction / STA state / MOT motion / CON content / A11Y
accessibility / LOG logic); numbering append-only. Taxonomy detail:
`design-data/references/flow-patterns.md`. Every callout says what happens, not just what it is.

---

## Definition of done (this module)

- [ ] Audience named and register chosen before writing a single slide
- [ ] Deck follows the 7-part structure; rejected explorations are IN the deck with reasons
- [ ] Every claim traces to evidence or is labeled opinion
- [ ] Deck is runnable (HTML/React) and verified to render — or delivered with run instructions
      and labeled UNVERIFIED per the entry-file rules
- [ ] Written to the project's working directory, referenced by path
