# UX Annotation & Write-up Guide

Reference for the **UX Annotations & Write-ups** workflow (§17). Annotations explain the
**non-obvious behavior** of a design; write-ups explain the **reasoning behind it**. Both
feed the handoff spec (§6) and the portfolio case study (§14).

---

## The 6 Annotation Types

Every callout is numbered AND typed. The type forces completeness; the number makes it
referenceable in handoff, critique, and tickets.

| Code | Type | Must answer |
|---|---|---|
| **INT** | Interaction | What happens on click/drag/hover/keyboard? What's the affordance? |
| **STA** | State | Which of the 8 states (default/hover/active/focus/disabled/loading/error/empty) and what transitions between them? |
| **MOT** | Motion | Trigger → what animates (transform/opacity only) → duration → cubic-bezier |
| **CON** | Content | Voice, max length, truncation rule, localization risk, empty/error copy |
| **A11Y** | Accessibility | Role, accessible name, focus order, contrast value, touch target |
| **LOG** | Logic | Visibility/permission rules, data dependencies, edge conditions |

**Coverage rule**: every interactive element ships with at least INT + STA + A11Y before
handoff. Static informational elements need CON at minimum.

---

## Writing Annotations

Format: `[ID] [TYPE] — behavior statement`

- ✅ `A3 [STA] — Table shows skeleton rows for ≤1s; if 0 results, swap to empty state with "Import tickets" primary CTA`
- ✅ `A7 [A11Y] — Countdown ring: role="timer", aria-label "2h 14m until SLA breach", also rendered as text — color is never the only signal`
- ❌ `A3 — the table can look empty sometimes` (appearance, no behavior, no type)

Rules:
- **Behavior, not appearance** — describe what it *does*, under what condition
- **Numbering is append-only** — never renumber after a design iteration; retired callouts are struck through, new ones continue the sequence (numbering must survive iteration)
- Reference tokens, not raw values; reference decision IDs (below) for the *why*
- Place annotations on a numbered region map (ASCII wireframe with region numbers, a screenshot with callout markers, or a Figma annotation layer)

---

## Annotation Document Template

`design-data/projects/[project-name]/annotations.md`

```markdown
# [Screen/Flow] — Annotations
Artifact under annotation: [link/file + version/date]

## Region map
[ASCII sketch or image with numbered markers]

## Callouts
| ID | Type | Element | Annotation | Decision |
|----|------|---------|------------|----------|
| A1 | INT  | Queue row | Click anywhere opens detail drawer (not modal); middle-click opens new tab | D2 |
| A2 | STA  | SLA ring | 8 states; <30min remaining switches to crimson + 1Hz opacity pulse | D4 |
| A3 | A11Y | SLA ring | role="timer"; text twin "2h 14m"; contrast 6.2:1 on slate | D4 |

## Open questions
- [unresolved behavior, owner, by-when]
```

---

## Redline Specs (measurement layer)

When engineering needs pixel-truth, add a redline section — tokens first, raw values in
parentheses only as a convenience:

```markdown
## Redlines — Queue card
- Padding: spacing-md (16px) all sides; spacing-sm (8px) between title and meta row
- Title: type-heading-sm / Inter 600 / 16px / lh 1.2; truncate 1 line, ellipsis, full text in tooltip
- SLA ring: 28×28px, stroke 3px; hit area 44×44px (transparent expansion)
- Breakpoints: <768px ring moves inline with title; meta row wraps
```

Redline coverage: spacing, type roles, sizes + hit areas, radii/elevation, breakpoints.
All from tokens — a redline with raw-only values fails the token test.

---

## UX Rationale Write-up (decision records)

`design-data/projects/[project-name]/ux-rationale.md` — one block per significant
decision, referenced from annotations (`D#`):

```markdown
## D4 — SLA countdown ring instead of timestamp column
- **Decision**: persistent radial countdown on every ticket surface (signature element)
- **Evidence**: 6/8 interviewed managers compute "time left" mentally from timestamps
  (synthesis-report.md, Theme 2, confidence High); Gate 1 feel = "calm urgency"
- **Alternatives considered**: deadline timestamp column (rejected: requires mental math),
  red row highlight (rejected: color-only signal, fails A11Y; panic over calm)
- **Trade-off accepted**: rings cost ~36px horizontal space per row at high density
- **How we'll know it works**: time-to-first-triage-action in usability test ≤ 5s;
  zero "when is this due?" support questions in pilot
```

Write-up standards:
- Argue from **evidence** (research themes, heuristics, constraints, gate results) — never taste ("felt cleaner" is not a rationale)
- Name the **rejected alternatives** — a decision with no alternatives was a default
- Every decision states the **trade-off accepted** and a **falsifiable success signal**
- Confidence labels follow research standards: High (5+ sources) / Medium (3-4) / Low (1-2)

---

## How the Pieces Connect

```
research synthesis ──evidence──▶ ux-rationale.md (D1…Dn)
                                      ▲
annotations.md (A1…An) ──"why"──┘
        │
        └──behavior──▶ handoff.md (§6) ──▶ engineering
```

- Annotations cite decisions (`A2 → D4`); handoff cites annotations; the case study (§14)
  quotes decision records as its "pivotal decisions" (STAR-D).
- During critique (§5), findings reference callout IDs — "A7 fails 4.5:1" beats "the ring
  is low contrast somewhere".

---

## Anti-Patterns

- ❌ Annotating the obvious ("this is a button, click it")
- ❌ Appearance-only annotations with no condition or behavior
- ❌ Renumbering callouts between iterations (breaks every downstream reference)
- ❌ Rationale by authority or taste ("best practice", "cleaner") with no evidence or trade-off
- ❌ Annotations that duplicate the handoff spec instead of feeding it
