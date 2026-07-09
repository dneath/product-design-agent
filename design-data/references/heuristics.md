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

## Cognitive-Load Limits (numeric — count, don't estimate)

Working memory holds ~4 items. Check every screen against these caps:

- ≤4 items per visual group; chunk anything longer.
- ≤5 top-level navigation items; 6+ get grouped.
- ONE primary CTA per view + 1–2 secondary; everything else into a menu.
- ≤3 pricing tiers; ≤4 metrics above the fold.
- **No working-memory bridges**: the user never carries information from one screen to the next
  in their head — restate it where it's needed.

Named violations (problem → fix):

| Violation | Fix |
|---|---|
| Wall of options — 10+ undifferentiated choices | Group, rank, or progressive-disclose |
| Memory bridge — screen N needs a value from screen N−1 | Show the value where it's used |
| Hidden navigation — key paths behind unlabeled icons | Label or surface them |
| Jargon barrier — system terms the user must translate | Use the user's vocabulary |
| Visual noise floor — decoration competing with content | Delete until only signal remains |
| Inconsistent pattern — same action, different look | One component vocabulary everywhere |

Score by failure count: 0–1 low load · 2–3 moderate · 4+ critical.

---

## Test Lenses — pick 2–3 per critique

Walk the interface as each selected lens; report the red flags it catches.

| Lens | What it checks |
|---|---|
| **Impatient power user** | Core task done in <60s? Keyboard shortcuts? Esc dismisses overlays? Bulk actions exist? |
| **Confused first-timer** | First action obvious within 5 seconds? Icons labeled? Zero unexplained jargon? |
| **Accessibility-dependent** | Full flow keyboard-only? Focus always visible? Contrast ≥4.5:1? State changes announced? Usable at 200% zoom? |
| **Stress tester** | 0 items and 1,000+ items? Emoji/RTL input? Refresh mid-flow? Two tabs at once? (matrix: `hardening.md`) |
| **Distracted mobile user** | Primary actions in thumb reach? State survives interruption? Usable on a slow connection? Targets ≥44px? |

Selection by interface type: dashboard/tool → power user + accessibility-dependent · forms/checkout →
first-timer + accessibility-dependent + mobile · onboarding → first-timer + mobile · data views →
power user + stress tester.

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

Calibration: **most real interfaces land mid-band** — a clean bill means genuinely excellent,
not merely "nothing jumped out". Tie-breaker: *would a user contact support about this?*
If yes, it is at least severity 3.

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

## Craft Fixes (Before / After / Why — one row per proposed change)
| Before | After | Why |
|---|---|---|
| [current value/pattern] | [proposed value/pattern] | [the rule or evidence behind it] |

## What Works Well (keep)
- [Strength worth preserving — name the element and why.]
```

Cognitive-load count and the chosen test lenses (with their red flags) go in Scope & Method.
