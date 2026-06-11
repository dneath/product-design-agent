# Prototype Variants Guide

Reference for the **Prototype Variants** workflow (§15) and the Variant Protocol inside
**Interface Design** (§3). Core rule: **new UI is never presented as a single take.**
Generate 2–3 genuinely distinct directions, let the human choose, then refine the winner.

---

## Why Variants

- A single design is a hypothesis presented as a conclusion; variants make the decision visible.
- Choosing between concrete options surfaces the user's real priorities faster than critique of one option.
- The variance engine (Gate 4) already forces distinct Vibe + Layout pairings — variants put that to work.

**Default count: 3.** Use 2 when the brief is tightly constrained (fixed design system, small component). Never more than 3 — beyond that, distinctness collapses and choice quality drops.

---

## Distinctness Axes (what makes a variant a variant)

A variant must differ on **at least the first two** axes. A palette swap is a reskin, not a variant.

| Axis | Variant A vs. B should differ in… |
|---|---|
| **Vibe + Layout pairing** | Different Gate-4 archetype pairing per variant (e.g., Warm Minimalism × Editorial Split vs. Dark Technical × Terminal Grid) |
| **Signature element** | Each variant has its OWN signature, appearing 5+ times |
| **IA emphasis** | What is promoted to the top level: overview-first vs. task-first vs. timeline-first |
| **Density & rhythm** | Calm/spacious vs. dense/operational |
| **Interaction model** | Inline edit vs. drawer vs. dedicated page; browse vs. search-first |

**Reskin check** (run before presenting): if you removed colors and fonts from the
screenshots, could you still tell the variants apart at a squint? If no — rebuild.

---

## Variant Definition Block

Define each variant BEFORE building it:

```markdown
### Variant B — "Control Tower"
- **Pairing**: Dark Technical × Terminal Grid
- **Concept**: the queue is an air-traffic console; nothing decorative, everything monitored
- **Signature**: live SLA tick-rail running the left edge of every panel
- **IA emphasis**: breach-risk first, totals demoted to footer
- **Trade-off**: powerful for daily operators, colder for occasional visitors
```

---

## Build Standards (runnable prototypes)

- **One self-contained HTML file per variant** — inline CSS, vanilla JS only if interaction demands it, zero build steps. If the user can't double-click it, it's not a prototype.
- **Real domain content** — never lorem ipsum, never `Item 1/2/3`. Invent plausible domain data.
- **States visible**: default + hover/focus styles always; loading/error/empty reachable via a small state-toggle control in a corner (`?state=` param or buttons).
- **Tokens as CSS variables with domain names** (`--sla-critical`, not `--red-500`) — Gate 3 token test applies per variant.
- **Brand fonts**: Google Fonts `<link>` for Inter + Fragment Mono with system fallbacks.
- **Each variant passes Gates 5 and 3 independently.** A variant that fails its own validation is not offered.

File names: `prototype-a.html`, `prototype-b.html`, `prototype-c.html` in
`design-data/projects/[project-name]/prototypes/`.

---

## Comparison & Selection

Present all variants with this table, then a recommendation, then **stop and ask**:

```markdown
| | A "Ledger" | B "Control Tower" | C "Field Notes" |
|---|---|---|---|
| Pairing | Warm Minimalism × Editorial Split | Dark Technical × Terminal Grid | Soft Structuralism × Asymmetrical Bento |
| Intent fit | calm review ✓✓ | rapid triage ✓✓✓ | exploratory ✓ |
| Hierarchy | type scale | luminance + position | card weight |
| Signature | margin ledger-line | SLA tick-rail | sticky field-tab |
| Strongest moment | weekly summary | breach countdown | first-run |
| Main trade-off | slow for power users | cold for newcomers | weak at high density |

**Recommendation**: B — the intent is triage under time pressure (Gate 1), and B's
luminance hierarchy survives the squint test best. A is the fallback if the audience
skews occasional users.

Which direction should I develop? (You can also mix: e.g., "B with A's summary header.")
```

Selection rules:
- The user picks; the recommendation is advice, not a default. If the user says "you pick," document the choice and reason in `variants.md`.
- **Cross-pollination is encouraged** — fold one or two named details from losing variants into the winner if asked, then re-run validation.
- Keep losing variants on disk; record the decision in `variants.md` (chosen, why, what was borrowed). They are portfolio evidence (§14) and insurance against direction changes.

---

## Refinement Loop (after selection)

1. Apply feedback to the chosen variant only.
2. Re-run Gate 5 (ban list) and Gate 3 (validation tests) after structural changes.
3. Promote the result through Interface Design §3 documentation (system.md) and, when wanted, Figma Export (§13) or Handoff (§6).

---

## Anti-Patterns

- ❌ Three palette swaps of one layout ("variants")
- ❌ A favorite plus two strawmen built to lose
- ❌ Presenting variants without a recommendation (abdicating judgment)
- ❌ Continuing to develop all variants after selection (split effort, no depth)
- ❌ Prototypes that require `npm install`
