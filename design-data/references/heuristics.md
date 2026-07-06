# Heuristics & Audit Reference

Load when running a heuristic evaluation, UX audit, or accessibility review.
Used by /critique and the design-process module (`agent/modules/design-process.md`).

---

## Nielsen's 10 Usability Heuristics

Ask each question against the actual screen, not the intended design.

1. **Visibility of system status** — does every action produce timely, visible feedback?
2. **Match with the real world** — does it speak the user's language, in the user's natural order?
3. **User control and freedom** — can the user undo, cancel, or exit at any point?
4. **Consistency and standards** — same word, same thing; does it follow platform conventions?
5. **Error prevention** — are slips and mistakes prevented before they can happen?
6. **Recognition over recall** — are options shown, or must the user remember them?
7. **Flexibility and efficiency** — are there accelerators for experts without burdening novices?
8. **Aesthetic and minimalist design** — does anything on screen compete without earning its place?
9. **Error recovery** — are errors explained in plain language, with a stated way out?
10. **Help and documentation** — if help is needed, is it findable, task-focused, and concise?

---

## Craft Heuristics

1. **Visual hierarchy** — squint test: blurred, does the hierarchy still read? What lands first, second, third?
2. **Contrast** — do differences in size/weight/color signal real differences in importance, or are they decoration?
3. **Alignment** — does every element share an edge or axis with something else? Stray edges are visual noise.
4. **Proximity / grouping** — are related items closer to each other than to unrelated ones? Does spacing alone convey the grouping?

For token, spacing, and type specifics, see `design-data/references/styling.md`.

---

## WCAG 2.1 AA Checklist (high-frequency items)

- [ ] Contrast: body text ≥ 4.5:1; large text and UI components ≥ 3:1. **MUST** be calculated — **NEVER** estimated by eye.
- [ ] Focus states are visible on every interactive element.
- [ ] Full keyboard navigation: everything reachable and operable, no traps, logical order.
- [ ] Semantic HTML first (`button`, `a`, `label`, headings, landmarks) — ARIA only where semantics fall short.
- [ ] Labels are persistent — **NEVER** placeholder-only.
- [ ] Touch targets ≥ 44px.
- [ ] `prefers-reduced-motion` honored for all animation.
- [ ] Images have `alt` text (decorative images: `alt=""`).
- [ ] Errors identified in text — **NEVER** by color alone.

---

## Severity Scale

| Sev | Meaning | Action |
|---|---|---|
| 0 | Not a usability problem | No action; note only if asked. |
| 1 | Cosmetic | Fix only if time allows within existing work. |
| 2 | Minor usability problem | Fix; low priority in the queue. |
| 3 | Major usability problem | Fix before ship; high priority. |
| 4 | Usability catastrophe — blocks task completion | Stop; fix before anything else ships. |

Priority within a level = frequency × impact: a severity 2 on the most-used
screen can outrank a severity 3 on a rarely-seen one.

---

## Audit Report Skeleton

Every finding **MUST** pair severity with evidence (measured value, reproduction
steps, or screenshot reference). Findings without evidence are not findings.

```markdown
# Audit: [target]

## Scope & Method
[What was reviewed; heuristic walkthrough + WCAG 2.1 AA pass.]

## Findings
| # | Heuristic / Criterion | Severity (0–4) | Evidence | Recommendation |
|---|---|---|---|---|
| 1 | [e.g. Contrast, WCAG 1.4.3] | 3 | [measured 2.8:1 on body text] | [specific, actionable fix] |

## Top Fixes (3–5, prioritized)
1. [Finding #] — [why it is first: severity × frequency]

## What Works Well (keep)
- [Strength worth preserving — name the element and why.]
```
