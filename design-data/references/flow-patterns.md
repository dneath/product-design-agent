# Flows, IA, Diagrams & Annotations

Load for user journeys, task flows, information architecture, sitemaps, Mermaid diagrams,
and annotated specs. Used by /flows and the design-process module (`agent/modules/design-process.md`).

---

## Flow Types

1. **Task flow** — one goal, one path; answers "what are the exact steps to do X?" Use for a single, linear procedure.
2. **User flow** — one goal, all paths; answers "where can they branch, fail, or exit?" Use when designing decisions, errors, and recovery.
3. **Journey map** — end-to-end experience across time and channels; answers "how does this feel?" Use for strategy and prioritizing fixes.

**MUST** define the happy path first, then error and edge branches. **NEVER** ship a flow that only handles success.

---

## Text-First Flow Notation

Compact, reviewable, and maps cleanly to Mermaid later:

```
1. [Entry] → (Action) → <Decision?>
2.    <Decision?> --yes--> (Action) → [End: success]
3.    <Decision?> --no---> (Recover) → back to (Action)
```

- `[ ]` screen/state · `( )` user or system action · `< >` decision · `--label-->` branch
- **MUST** number steps so they are referenceable in critique and handoff.
- **MUST** label every decision branch; dead ends without recovery are defects.

---

## Journey Map Template

```markdown
# [Product] Journey — [Persona]

| Stage       | Doing | Thinking | Feeling | Opportunities |
|-------------|-------|----------|---------|---------------|
| Awareness   | …     | …        | 😐      | …             |
| Onboarding  | …     | …        | 😟      | …             |
| First value | …     | …        | 🙂      | …             |
| Habit       | …     | …        | 😀      | …             |
```

- Plot the emotion curve across stages — the lowest dip is the highest-leverage fix.
- Mark moments of truth: where the relationship is won or lost.

---

## IA Rules

- [ ] Depth ≤ 3 levels — deeper nesting buries core tasks
- [ ] Labels match user vocabulary, **NEVER** the org chart or internal jargon
- [ ] One primary action per screen
- [ ] Navigation reflects frequency of use, not fashion (hub-and-spoke for mobile tasks, nested doll for linear, tabs for parallel sections, dashboard for monitoring)
- [ ] Read the nav labels aloud — they belong to this product's world, not any app
- [ ] Every path has a "back" or recovery; no dead ends

---

## Diagram Type Chooser

| Need | Diagram type | Mermaid keyword |
|---|---|---|
| Steps and decisions | Flowchart | `flowchart TD` / `LR` |
| Who talks to whom, in what order | Sequence | `sequenceDiagram` |
| States an object can be in | State machine | `stateDiagram-v2` |
| Data shape and relations | ERD | `erDiagram` |
| Experience + emotion over time | Journey | `journey` |
| Parts of the system | Architecture | `flowchart` + `subgraph` |
| Product structure (sitemap) | Tree | `flowchart TD` |

**MUST** answer one question per diagram; split anything beyond ~20 nodes into linked diagrams.

---

## Mermaid Constraints

Checklist that avoids most render failures:

- [ ] Quote any label containing spaces + punctuation: `A["SLA breached?"]`
- [ ] **NEVER** put raw parentheses, brackets, or HTML inside node text — quote or rewrite
- [ ] Node IDs: short alphanumerics (`triage1`), never digit-only
- [ ] Declare direction: `TD` for hierarchies/sitemaps, `LR` for processes/pipelines
- [ ] One statement per line; comments with `%%`
- [ ] Decision nodes `{"Question?"}` with every branch labeled (`-->|yes|`, `-->|no|`)
- [ ] Stadium nodes `([ ])` for entry/exit, rectangles for screens, diamonds for decisions
- [ ] Minimal styling — `classDef` for at most 2–3 semantic classes (e.g., error states)

If a Figma/FigJam MCP is available, load the Figma diagram skill before exporting;
otherwise deliver Mermaid source in a fenced block (renders natively in GitHub/GitLab/VS Code).

---

## Annotation Callouts

Every callout is numbered AND typed — format: `[ID] [TYPE] — behavior statement`.

| Prefix | Marks | Example |
|---|---|---|
| **INT** | Interaction | `A1 [INT] — Click row opens detail drawer; middle-click opens new tab` |
| **STA** | State | `A2 [STA] — Skeleton rows ≤1s; 0 results swaps to empty state with primary CTA` |
| **MOT** | Motion | `A3 [MOT] — On open: drawer slides in, transform/opacity only, 240ms ease-out` |
| **CON** | Content | `A4 [CON] — Title truncates at 1 line with ellipsis; full text in tooltip` |
| **A11Y** | Accessibility | `A5 [A11Y] — Ring: role="timer", text twin "2h 14m", contrast 6.2:1` |
| **LOG** | Logic | `A6 [LOG] — Delete visible only to owners; hidden, not disabled, for viewers` |

Rules:

1. **MUST** describe behavior under a condition, **NEVER** appearance alone.
2. Numbering is append-only — **NEVER** renumber between iterations; strike retired callouts, continue the sequence.
3. Every interactive element ships with at least INT + STA + A11Y; static content needs CON at minimum.
4. Redlines reference tokens, **NEVER** raw px, when a token system exists — e.g., `spacing-md (16px)`; see `design-data/references/styling.md`.
