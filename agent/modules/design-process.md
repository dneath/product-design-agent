# Design Process — Screens, Flows, Critique

> **When to use:** Designing or redesigning a screen or flow (including from a sketch/screenshot);
> critiquing or auditing existing UI; user journeys, task flows, IA, sitemaps, diagrams, annotations.
> Commands: `/design`, `/critique`, `/flows`. Deep method: `design-data/references/heuristics.md`,
> `design-data/references/flow-patterns.md`, `design-data/references/styling.md`.

Run the Thinking Protocol (entry file) first.

---

## 1. Mandatory process order

Work through these in order. **NEVER start at visual design. NEVER polish before structure.**

**Before step 1, in an existing product/repo:** audit for functionally similar patterns — where
they're used, which components/terminology/states they rely on, and whether this work can reuse
them. Introduce a new pattern only when existing ones can't serve; note any inconsistencies you find.
For an unfamiliar pattern, also research how shipping products solve it via the Mobbin MCP
(`design-data/references/design-references.md`) before you diverge.

1. **User & context** — who, where, on what device, in what state of mind (from the Thinking Protocol).
2. **Flows** — what the user is trying to do; entry and exit points; the happy path and the failure paths.
3. **Information architecture** — what lives on this screen vs elsewhere; grouping; hierarchy of jobs.
4. **Wireframe / structure** — layout, zones, reading order, responsive strategy. Text or ASCII sketch is fine.
5. **Pre-visual divergence** — name the 3 obvious defaults for THIS interface type and reject or
   justify each; pick ONE signature element; mine the domain for color and type voice. Gate:
   `design-data/references/styling.md` Part D (the generic-design failure test).
6. **Visual design** — apply the resolved styling (`design-data/references/styling.md`) on top of the structure.

For sketch/screenshot input: first describe what the source shows and what intent you infer
(step 1–3 from the image), THEN redesign — never trace it pixel-for-pixel without questioning structure.

## 2. State matrix — MUST produce explicitly for every screen

Fill this table per screen. **NEVER leave a cell as "n/a" without a one-line reason.**

```markdown
| State | What the user sees | How they recover / proceed |
|---|---|---|
| Empty (no data yet) | | |
| Loading | | |
| Error (fetch/save failed) | | |
| Partial data (some fields missing) | | |
| Overflow (long names, large counts, many items) | | |
| First run (never used this feature) | | |
| Success / done | | |
```

Depth per state — extreme-input values (0/1/typical/1,000+; 100+ chars; emoji/RTL), empty-state
anatomy + taxonomy, error UX by failure type, and the loading ladder:
`design-data/references/hardening.md`.

## 3. Interaction spec

- [ ] Every interactive element defines **all 8 states**: default, hover, focus, active, disabled,
      loading, error, success (data views: loading/empty/error minimum).
- [ ] Motion has durations + easing **with rationale** — frequency gate, one-question router,
      and value tables from `design-data/references/motion.md`.
- [ ] All UI text (labels, errors, empty states, confirmations) follows
      `design-data/references/microcopy.md`.
- [ ] Async actions choose **optimistic vs pessimistic** UI and say why: optimistic for low-stakes,
      instantly-reversible actions (toggle, favorite); pessimistic for destructive, costly, or
      failure-prone ones (payment, delete, publish).
- [ ] Keyboard path and focus order stated for every flow.

## 4. Accessibility checklist — run before presenting ANY deliverable

- [ ] Contrast **calculated** (never estimated): ≥4.5:1 body text, ≥3:1 large text and UI components
- [ ] Visible focus state on every interactive element (`:focus-visible` ring, 2–3px, ≥3:1 contrast)
- [ ] Full keyboard navigation — every action reachable and operable without a mouse
- [ ] Semantic HTML first (`button`, `nav`, `label`, headings in order); ARIA only where semantics fall short
- [ ] Touch targets ≥44×44px (≥40px desktop pointer)
- [ ] `prefers-reduced-motion` respected — motion collapses to fades or none
- [ ] Labels are real `<label>`s, not placeholders; errors identified in text, not color alone

## 5. Heuristic evaluation (critique path)

For `/critique` and any audit request:

1. **First impression** — 2-second look: what draws the eye first, and is that the right thing?
2. **Evaluate against named heuristics** — Nielsen's 10 plus the craft four (hierarchy, contrast,
   alignment, proximity), the cognitive-load limits, and 2–3 test lenses. Full lists + report
   skeleton: `design-data/references/heuristics.md`.
3. **Severity-rate every finding** 0–4. **MUST pair each finding with evidence** (what you saw, where).
4. **Run the a11y checklist** (§4) as part of every critique.
5. **Deliver**: findings table → top 3–5 fixes prioritized by severity × effort → what works well (keep).

## 6. Flows, IA, diagrams, annotations

For `/flows`: notation, journey template, IA rules, Mermaid constraints, and the annotation callout
taxonomy live in `design-data/references/flow-patterns.md`. Key rules:

- IA depth ≤3 levels; labels use user vocabulary, not internal jargon.
- Diagrams ship as Mermaid source; if a Figma/FigJam MCP is available, load its diagram skill
  before exporting — otherwise deliver the fenced Mermaid block.
- Annotations use typed, numbered callouts (INT/STA/MOT/CON/A11Y/LOG); numbering is append-only.

---

## Definition of done (this module)

- [ ] Process order followed 1→6, each step's conclusion stated with rationale
- [ ] Divergence step done: 3 defaults named and rejected/justified; ONE signature element chosen
- [ ] State matrix filled for every screen
- [ ] Interaction spec (§3) complete
- [ ] A11y checklist (§4) all boxes checked — failures fixed, not annotated away
- [ ] Every design decision has a stated reason
