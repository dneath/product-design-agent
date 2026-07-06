# Deck Template — HTML/React Slide Deck

> Used by `/deck` and the presentation module. Part 1: the slide-by-slide outline (fill it in
> before building). Part 2: the minimal React deck scaffold. Styling follows
> `design-data/references/styling.md` resolution — a deck about a product uses that product's tokens.

## Part 1 — Slide outline (mandatory order)

Fill this in first; every slide title states its takeaway, not its category.

| # | Slide | Content | Register notes |
|---|---|---|---|
| 1 | **Context** | Where we are, in one slide. Project, timeframe, who's involved. | Same for both audiences |
| 2 | **Problem** | Who hurts, how much, evidence. Title = the problem statement. | Stakeholders: cost/impact. Designers: observed behavior |
| 3 | **Constraints** | What bounds the solution space: tech, brand, time, platform. | Keep to the constraints that shaped decisions |
| 4+ | **Explorations** | The 2–3 directions considered — INCLUDING rejected ones, each with its bet and why it lost. One slide per direction. | Stakeholders: the bet + tradeoff. Designers: show the actual screens |
| n | **Recommendation** | The direction + the reasoning chain problem → constraints → choice. | Stakeholders: outcome language. Designers: + key craft decisions |
| n+1 | **Evidence** | Research, prototype results, metrics, screenshots. Every claim traces to evidence or is labeled opinion. | Same discipline for both |
| n+2 | **Next steps** | Who does what by when; open decisions with owners. | End on the ask |

Checklist before building:
- [ ] Audience named; register chosen (business language vs craft detail)
- [ ] Rejected explorations present with reasons
- [ ] Each slide = one idea; titles are takeaways
- [ ] No raw notes pasted onto slides

## Part 2 — React scaffold (dependency-light: Vite + React, no deck library)

```
<output dir>/deck/
├── index.html · package.json · vite.config.js
└── src/
    ├── main.jsx
    ├── Deck.jsx          # below
    ├── slides.jsx        # one exported component per slide, in order
    └── tokens.css        # resolved styling as CSS variables
```

```jsx
// Deck.jsx — arrow keys / click / URL-hash navigation, slide counter, print-friendly
import { useEffect, useState } from 'react';
import { SLIDES } from './slides';

export default function Deck() {
  const fromHash = () => {
    const n = parseInt(window.location.hash.replace('#slide-', ''), 10);
    return Number.isInteger(n) && n >= 1 && n <= SLIDES.length ? n - 1 : 0;
  };
  const [i, setI] = useState(fromHash);

  const go = (next) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
    setI(clamped);
    window.location.hash = `slide-${clamped + 1}`;
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    };
    const onHash = () => setI(fromHash());
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('hashchange', onHash); };
  }, [i]);

  const Slide = SLIDES[i];
  return (
    <div className="deck" onClick={() => go(i + 1)}>
      <main className="slide"><Slide /></main>
      <footer className="deck-footer">
        <span className="deck-counter">{i + 1} / {SLIDES.length}</span>
      </footer>
    </div>
  );
}
```

```jsx
// slides.jsx — one component per slide; export in presentation order
export function Context() {
  return (
    <>
      <h1>Support queue redesign — where we are</h1>
      <p>…</p>
    </>
  );
}
// … Problem, Constraints, ExplorationA, ExplorationB, Recommendation, Evidence, NextSteps
export const SLIDES = [Context /*, Problem, … */];
```

```css
/* tokens.css essentials — resolved styling variables + deck chrome */
.deck { min-height: 100vh; display: flex; flex-direction: column; background: var(--bg); color: var(--text-1); }
.slide { flex: 1; max-width: 72rem; margin: 0 auto; padding: var(--space-16) var(--space-8); }
.slide h1 { font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.01em; text-wrap: balance; }
.deck-footer { padding: var(--space-4) var(--space-8); color: var(--text-3); }
.deck-counter { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
@media print { .deck-footer { display: none; } .slide { page-break-after: always; } }
```

Verification: same rules as any prototype (`agent/modules/environment.md`) — render it, arrow
through every slide, screenshot, or deliver labeled UNVERIFIED with run instructions.
