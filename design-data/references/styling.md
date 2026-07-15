# Styling — Resolution, Fallback Tokens, Craft Standards

> Load whenever visual design happens: `/design`, `/prototype`, `/handoff`, `/critique`.
> Part A: where styling comes from. Part B: the craft bar that applies on top of ANY source.
> Part C: banned patterns. Part D: the generic-design failure test.

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

**Token discipline (prevents design-system erosion, applies on top of any source):**
- **NEVER** hardcode a raw color, spacing, radius, shadow, or font size when a token exists — use the token.
- **Reuse an existing component before creating a new one.** A new component or variant must state,
  in one line, why existing ones cannot serve the requirement.
- Keep feature-specific styles out of shared components; report any needed token/component additions
  separately from the feature work, not smuggled in.
- If the project ships its own principles/patterns docs (e.g. `PRODUCT_PRINCIPLES.md`, `UX_PATTERNS.md`),
  read and honor them rather than a generic default.

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
- Opacity ladder is a valid alternative to a gray ramp: primary 100% / secondary 70% /
  tertiary 40% / disabled-placeholder 25% of the text color.
- Micro-details: real ellipsis `…` (never `...`), curly quotes, non-breaking space between value
  and unit ("10 MB"); `-webkit-font-smoothing: antialiased` on the root.

### Space, surfaces, depth
- 4px-based spacing; symmetrical padding unless content demands otherwise; tight within groups
  (8–12px), generous between sections (48–96px). Uniform padding everywhere is monotony.
- **Pick ONE depth strategy and commit**: borders-only (dense/technical) · one subtle shadow ·
  layered shadows · surface-lightness shifts. **NEVER mix strategies.** Layered-shadow recipe:
  `0 0 0 1px rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.06), 0 2px 4px 0 rgba(0,0,0,.04)` light
  (hover: each alpha +0.02) · `0 0 0 1px rgba(255,255,255,.08)` ring dark. Shadows are never dividers.
- Elevation is whisper-quiet: each level a few percent lightness apart, same hue (dark mode:
  each level 7–12% lighter than the one beneath). You feel the hierarchy more than see it —
  run the **squint test** (blurred, hierarchy reads; nothing jumps out).
- Borders are low-opacity (0.05–0.12 alpha), in a progression (soft/default/strong). If borders are
  the first thing you see, they're too strong.
- **Concentric radii: outer = inner + padding.** Mismatched nested corners are the #1 "feels off".
  Escape hatch: padding >24px — treat the layers independently instead of forcing the math.
- Sidebars share the canvas background + a border, never a different color. Dropdowns sit one
  elevation level above their parent. Inputs slightly darker than surroundings (inset = "type here").
- Images get a 1px inset outline — pure `rgba(0,0,0,0.1)` light / `rgba(255,255,255,0.1)` dark,
  never a tinted neutral (reads as dirt).

### Motion (floor — full doctrine in `design-data/references/motion.md`)
- **Hard cap 300ms for UI**; most transitions 150–250ms; feedback 100–160ms. **Exits ≈ 75% of
  enter duration.** If it feels slow, shorten the duration before touching the curve.
- **Ease-out for enters AND exits — NEVER ease-in on UI.** Decorative bounce/elastic banned;
  springs (stiffness 500, damping 30) are for gesture-driven motion only.
- Enter = `opacity 0→1` + small translate — never from `scale(0)`, start ≥0.95. Press =
  `scale(0.97)` (range 0.95–0.98), 100–160ms ease-out; hover lift 1.02–1.05.
- Stagger 30–80ms per item, never blocking interaction; skip enter animations on initial page load.
- **Animate transform/opacity only; NEVER layout properties; NEVER `transition: all`** —
  name exact properties. `prefers-reduced-motion` = gentler, not zero.

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

---

## Part C — Banned patterns (match and refuse; propose the alternative — every ban names its override)

1. **Side-stripe borders** — colored `border-left` >1px as an accent on cards/alerts. Use surface
   tint or a leading icon instead.
2. **Gradient text** (`background-clip: text`) — use weight and size for emphasis.
3. **Glassmorphism as default** — translucent blur panels without a layering reason.
4. **The hero-metric template** — big number + small label + gradient accent card. Design the data's
   actual shape instead.
5. **Identical card grids** — rows of same-size icon-title-text cards. Vary by content importance.
6. **Modal as first thought** — prefer inline expansion, drawers, or dedicated pages; modals only
   for true interruptions.
7. **Purple/multicolor gradients + glow affordances** — the loudest generic tell. Override: the
   brand demonstrably uses them.
8. **Warm-cream + high-contrast-serif + terracotta** (and its beige/brass/espresso cousins) — a
   default costume, not a decision. Override: an explicit brief asking for it.
9. **Uppercase tracked eyebrow labels over every section** — ration to ≤1 per 3 sections
   (mechanically countable). Override: the labels encode a true taxonomy.
10. **01/02/03 numbered section scaffolding** — decoration unless order carries information.
    Override: the content is a genuine sequence.

---

## Part D — The generic-design failure test

**If another agent given the same prompt would produce substantially the same screen, the design
has failed** — difference must come from this product, not from decoration.

- **Mine the domain**: pull color, type voice, and one signature element from the product's actual
  world (its materials, vocabulary, artifacts). If the palette is guessable from the product
  category alone ("observability ⇒ dark blue"), rework it.
- **Spend boldness in one place**: ONE signature element, quiet disciplined surroundings.
  Boldness everywhere is noise; boldness nowhere is a template.
- Every choice answers "why this, not the common alternative?"

Four self-tests — run before presenting:

| Test | Pass condition |
|---|---|
| Squint | Blurred, the hierarchy still reads; one focal point wins |
| Swap | Replace your typeface/layout with a stock default — if the swap costs nothing, you defaulted |
| Signature | You can point to the one element only THIS product would have |
| Token-name | CSS variable names read aloud belong to this product's world, not to any project |

---

## Adopt-vs-fallback checklist

- [ ] Styling source determined (repo / Figma / user / fallback) and recorded in `system.md`
- [ ] Repo: tokens read and matched — no parallel system. Figma: variables mapped 1:1
- [ ] Fallback: monochrome OKLCH, 4px spacing, Inter + Fragment Mono, ≤1 domain-justified accent
- [ ] No `#000`/`#fff`; four text levels; border progression; whisper-quiet elevation
- [ ] ONE depth strategy; concentric radii; motion within the floor above (doctrine: motion.md)
- [ ] No banned patterns (all 10)
- [ ] Part D passes: squint / swap / signature / token-name; boldness spent in one place
