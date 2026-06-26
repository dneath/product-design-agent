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

## Build Standards (runnable React prototypes)

Prototypes are **real, interactive React** — full functionality is visible (working state, inputs, validation, transitions, real interactions), not static mockups. All variants live in **one app** behind a **tab group / toggle** so the user compares them side by side in a single running app.

- **One React app, tab-switchable variants.** A `<VariantSwitcher>` renders `<VariantA/>` / `<VariantB/>` / `<VariantC/>`; it remembers the selection (URL hash like `#variant-b`) so a refresh keeps the tab. Vite + React when standalone; reuse the repo's stack (Next, CRA, etc.) when working inside one.
- **Genuinely interactive** — each variant is a working component: real state, inputs that validate, transitions, optimistic updates where they matter. "Interactive" means you can actually use it, not hover-only CSS.
- **Real domain content** — never lorem ipsum, never `Item 1/2/3`. Invent plausible domain data (a small in-file fixture module is fine).
- **Data states reachable per variant** via an in-app toggle: default + hover/focus always; loading / error / empty switchable.
- **Styling is resolved from context** (no fixed brand): existing repo tokens → Figma → user-specified → fallback (monochrome OKLCH, never `#000`/`#fff`; 4px spacing; Inter + Fragment Mono). Tokens are CSS variables with **domain names** (`--sla-critical`, not `--red-500`) — Gate 3 token test applies per variant.
- **Each variant passes Gates 5 and 3 independently.** A variant that fails its own validation is not offered.

### Minimal scaffold

```
design-data/projects/<project>/prototype/   (or inside the repo when working in one)
├── index.html
├── package.json            # vite + react + react-dom; script: "dev": "vite"
├── vite.config.js
└── src/
    ├── main.jsx            # mounts <App/>
    ├── App.jsx             # <VariantSwitcher/>
    ├── tokens.css          # domain-named CSS variables (resolved styling)
    ├── data.js             # plausible domain fixtures + state fixtures
    ├── VariantSwitcher.jsx
    ├── VariantA.jsx
    ├── VariantB.jsx
    └── VariantC.jsx
```

```jsx
// VariantSwitcher.jsx — tab group to switch directions
import { useState } from 'react';
import VariantA from './VariantA';
import VariantB from './VariantB';
import VariantC from './VariantC';

const VARIANTS = [
  { id: 'a', label: 'A · Ledger',        Component: VariantA },
  { id: 'b', label: 'B · Control Tower', Component: VariantB },
  { id: 'c', label: 'C · Field Notes',   Component: VariantC },
];

export default function VariantSwitcher() {
  const initial = window.location.hash.replace('#variant-', '') || 'a';
  const [active, setActive] = useState(VARIANTS.some(v => v.id === initial) ? initial : 'a');
  const Active = VARIANTS.find(v => v.id === active).Component;

  return (
    <>
      <div role="tablist" aria-label="Prototype variants" className="variant-tabs">
        {VARIANTS.map(v => (
          <button
            key={v.id}
            role="tab"
            aria-selected={active === v.id}
            onClick={() => { setActive(v.id); window.location.hash = `variant-${v.id}`; }}
          >
            {v.label}
          </button>
        ))}
      </div>
      <main><Active /></main>
    </>
  );
}
```

Each variant component owns its own state toggle for default/loading/error/empty.

---

## Browser Verification (mandatory before presenting)

A prototype you haven't run is a claim, not a result. **Delegate verification to a sub-agent** (fresh context) so build noise never reaches the main thread.

1. **Start the project's dev server** with the detection script — never assume a port, never hand-pick one that might collide:
   ```bash
   node scripts/dev-server.mjs start --dir design-data/projects/<project>/prototype
   ```
   It detects whether *this project's* server is already running (matching dir + port), reuses it if so, otherwise starts it and prints the exact URL.
2. **Drive it with the browser / Playwright skill**: open the URL, click through **every** tab, exercise the real interactions (type into inputs, submit, trigger validation), and switch through each variant's data states.
3. **Screenshot each variant** to `design-data/projects/<project>/prototype/screenshots/`.
4. **Fix anything** that fails to render or misbehaves (console errors, broken state, layout breakage) before presenting.
5. The sub-agent returns only: pass/fail per variant, screenshot paths, and any console errors — **not** the raw dev-server log.
6. Stop the server when done: `node scripts/dev-server.mjs stop --dir <app>`.

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

Run all three in one app: `cd <prototype dir> && npm install && npm run dev`, then switch tabs A/B/C.
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
- ❌ Separate files the user must open one by one (variants belong in one tab-switchable app)
- ❌ Static mockups with no real interaction, or presenting without running it in a browser first
- ❌ Hand-picking a dev-server port instead of using `scripts/dev-server.mjs` (false matches, collisions)
