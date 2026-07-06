# Styling — Resolution, Fallback Tokens, Craft Standards

> Load whenever visual design happens: `/design`, `/prototype`, `/design-system`, `/deck`.
> Part A: where styling comes from. Part B: the craft bar that applies on top of ANY source.
> Part C: banned patterns.

**There is no fixed brand or house style — ever.** Styling is resolved from context every time.

---

## Part A — Resolution order

Stop at the first source that applies. Record which source won (and why) in the project's `system.md`.

### 1. Existing codebase (highest priority)

**MUST look before styling anything.** Read, in order:

| Where to look | What it tells you |
|---|---|
| `tailwind.config.{js,ts,cjs,mjs}` | Colors, spacing scale, radius, fonts, breakpoints |
| `:root` / `@theme` blocks in `*.css` | Live CSS custom properties |
| `theme.{js,ts}`, `tokens.{json,ts}`, `design-tokens.*` | Exported token definitions |
| `components.json` (shadcn/ui), Chakra/MUI theme, `panda.config.*` | Component-library config |
| `<head>` font links, `@font-face`, `next/font` | Typefaces in use |
| `system.md`, `DESIGN.md`, `PRODUCT.md` | Previously recorded decisions |
| Existing components | Real spacing, radius, elevation, state patterns in practice |

Match what exists exactly. **NEVER introduce a second system beside the one that exists** — extend it.

### 2. Figma source

Pull variables/styles (via the Figma MCP: variable definitions + design context) and follow them.
Map Figma variables → CSS variables 1:1. The Figma file is the token source of truth.

### 3. User-specified

A named palette/font/brand is used exactly. It overrides the fallback, but loses to an existing
codebase you're working inside unless the user says otherwise.

### 4. Fallback defaults (ONLY when 1–3 give nothing)

- **Color: monochrome** — tinted OKLCH neutrals (scale below). At most ONE accent, only if the
  domain needs one.
- **Spacing: 4px-based scale** — 4 8 12 16 24 32 48 64. Every gap a multiple of 4.
- **Fonts: Inter** (UI/text) + **Fragment Mono** (code, data, IDs, timestamps).

### Fallback token set

Never `#000`/`#fff`. Tint every neutral toward one hue (chroma 0.004–0.01); pick the hue from the
product's domain (250 cool / 60 warm are starting points).

```css
:root {
  --hue: 250;
  /* Light surfaces — whisper-quiet elevation: shift lightness only, same hue */
  --bg: oklch(98.5% 0.004 var(--hue));
  --surface-1: oklch(97% 0.004 var(--hue));
  --surface-2: oklch(94.5% 0.005 var(--hue));
  --surface-3: oklch(91% 0.006 var(--hue));
  /* Text — four levels, never two */
  --text-1: oklch(22% 0.01 var(--hue));   /* primary */
  --text-2: oklch(40% 0.01 var(--hue));   /* secondary */
  --text-3: oklch(55% 0.008 var(--hue));  /* tertiary / metadata */
  --text-4: oklch(68% 0.006 var(--hue));  /* muted / placeholder */
  /* Borders — low-opacity progression, never solid hex */
  --border-soft:   oklch(22% 0.01 var(--hue) / 0.06);
  --border:        oklch(22% 0.01 var(--hue) / 0.10);
  --border-strong: oklch(22% 0.01 var(--hue) / 0.16);
  /* Optional single accent — include ONLY if the domain needs one */
  --accent: oklch(55% 0.15 var(--hue));
  --accent-hover: oklch(50% 0.16 var(--hue));
  --on-accent: oklch(99% 0.003 var(--hue));
  /* Semantic */
  --success: oklch(62% 0.15 150); --warning: oklch(72% 0.15 75); --danger: oklch(58% 0.20 25);
  /* Spacing */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  /* Radius — concentric scale */
  --radius-sm: 6px;   /* inputs, buttons */
  --radius-md: 10px;  /* cards */
  --radius-lg: 16px;  /* modals, large surfaces */
  /* Type */
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fragment Mono', ui-monospace, monospace;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: oklch(17% 0.006 var(--hue));
    --surface-1: oklch(20% 0.007 var(--hue)); /* higher = lighter in dark */
    --surface-2: oklch(23% 0.008 var(--hue));
    --surface-3: oklch(26% 0.009 var(--hue));
    --text-1: oklch(96% 0.006 var(--hue)); --text-2: oklch(80% 0.008 var(--hue));
    --text-3: oklch(66% 0.008 var(--hue)); --text-4: oklch(52% 0.006 var(--hue));
    --border-soft: oklch(96% 0.006 var(--hue) / 0.07);
    --border: oklch(96% 0.006 var(--hue) / 0.12);
    --border-strong: oklch(96% 0.006 var(--hue) / 0.20);
  }
}
```

Type scale (works with any typeface): steps ≥1.25 apart; body 16px capped at 65–75ch; data/labels
in the mono face with `tabular-nums`; headings `text-wrap: balance`, prose `text-wrap: pretty`.

---

## Part B — Craft standards (apply on top of WHATEVER source won)

### Color
- Work in **OKLCH**; reduce chroma as lightness nears 0 or 100. **NEVER `#000`, `#fff`, or pure gray**
  — tint neutrals toward one hue (chroma 0.004–0.015).
- **Gray builds structure; color communicates** (status, action, emphasis). Budget by visual weight:
  ~60% neutral surfaces / 30% secondary / ≤10% accent. Accents work because they're rare.
- **NEVER gray text on colored backgrounds** — use a darker shade of that background or transparency.
- Theme (light vs dark) is decided by the usage scene ("SRE at 2am in a dim room" ⇒ dark), never by
  default. Dark mode: dark-gray surfaces, depth via surface lightness not shadows, semantic colors
  slightly desaturated.

### Typography
- Hierarchy through **size + weight + letter-spacing combined — NEVER size alone**; ≥1.25 ratio
  between steps; fewer sizes with more contrast.
- **Four text-color levels** (primary/secondary/tertiary/muted) — two levels means the hierarchy is flat.
- Body ≥16px, 65–75ch line length. All-caps labels get `letter-spacing: 0.05–0.12em`.
- **`tabular-nums` on any number that updates or aligns** — counters, prices, timers, table columns.
- One family in multiple weights beats two typefaces; never pair similar-but-different fonts.

### Space, surfaces, depth
- 4px-based spacing; symmetrical padding unless content demands otherwise; tight within groups
  (8–12px), generous between sections (48–96px). Uniform padding everywhere is monotony.
- **Pick ONE depth strategy and commit**: borders-only (dense/technical) · one subtle shadow ·
  layered shadows · surface-lightness shifts. **NEVER mix strategies.**
- Elevation is whisper-quiet: each level a few percent lightness apart, same hue. You feel the
  hierarchy more than see it — run the **squint test** (blurred, hierarchy reads; nothing jumps out).
- Borders are low-opacity (0.05–0.12 alpha), in a progression (soft/default/strong). If borders are
  the first thing you see, they're too strong.
- **Concentric radii: outer = inner + padding.** Mismatched nested corners are the #1 "feels off".
- Sidebars share the canvas background + a border, never a different color. Dropdowns sit one
  elevation level above their parent. Inputs slightly darker than surroundings (inset = "type here").
- Images get a 1px inset outline — pure `rgba(0,0,0,0.1)` light / `rgba(255,255,255,0.1)` dark,
  never a tinted neutral (reads as dirt).

### Motion
- Duration by size of change: **100–150ms** instant feedback (press, toggle) · **150–250ms** most
  product transitions (hover, menus, tooltips) · **300–500ms** layout changes (modal, drawer,
  accordion). Never >500ms for feedback.
- **Exits ≈ 75% of enter duration**, ease-in, small fixed distance (~12px) — softer and faster than enters.
- **NEVER plain `ease`, NEVER bounce/spring/elastic in product UI.** Defaults:
  `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart) or `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint).
- Enter = `opacity 0→1` + `translateY 12px→0` (+ optional `blur 4px→0`); stagger semantic chunks
  ~100ms apart, total ≤500ms; skip enter animations on initial page load.
- Press = `scale(0.96)` (never below 0.95), ~150ms ease-out; hover lift 1.02–1.05.
- **Animate transform/opacity/filter only; NEVER layout properties; NEVER `transition: all`** —
  name exact properties. `prefers-reduced-motion` support is mandatory.

### Detail
- All **8 interaction states** on every interactive element; loading/empty/error on every data view.
- Focus: never remove an outline without a replacement; `:focus-visible` ring 2–3px, offset 2px,
  ≥3:1 contrast, identical across the product.
- Hit areas ≥40×40px (44 touch) — extend small controls with a pseudo-element; hit areas never overlap.
- Contrast floors: 4.5:1 body text (placeholders included), 3:1 large text + UI components — calculated.
- **Align optically, not geometrically**: icon-side button padding ≈ text-side − 2px; play triangles
  nudge right; fix lopsided icons in the SVG.
- Icons clarify, never decorate — if removing it loses nothing, remove it. One icon set per product.
- Everything traces to a token — no orphan hex values.

### The bar
If another agent given the same prompt would produce substantially the same screen, it's generic —
return to the domain and intent. If the palette is guessable from the product category alone
("observability ⇒ dark blue"), rework it. Every choice answers "why this, not the common alternative?"

---

## Part C — Banned patterns (match and refuse; propose the alternative)

1. **Side-stripe borders** — colored `border-left` >1px as an accent on cards/alerts. Use surface
   tint or a leading icon instead.
2. **Gradient text** (`background-clip: text`) — use weight and size for emphasis.
3. **Glassmorphism as default** — translucent blur panels without a layering reason.
4. **The hero-metric template** — big number + small label + gradient accent card. Design the data's
   actual shape instead.
5. **Identical card grids** — rows of same-size icon-title-text cards. Vary by content importance.
6. **Modal as first thought** — prefer inline expansion, drawers, or dedicated pages; modals only
   for true interruptions.

---

## Adopt-vs-fallback checklist

- [ ] Styling source determined (repo / Figma / user / fallback) and recorded in `system.md`
- [ ] Repo: tokens read and matched — no parallel system. Figma: variables mapped 1:1
- [ ] Fallback: monochrome OKLCH, 4px spacing, Inter + Fragment Mono, ≤1 domain-justified accent
- [ ] No `#000`/`#fff`; four text levels; border progression; whisper-quiet elevation
- [ ] ONE depth strategy; concentric radii; motion within the tables above
- [ ] No banned patterns
