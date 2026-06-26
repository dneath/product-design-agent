# Styling Resolution

**There is no fixed brand or house style.** This agent must never impose a default visual identity. Styling is *resolved from context* every time, in the priority order below. Stop at the first source that applies, record the decision in the project's `system.md`, and apply it consistently.

---

## Resolution Order

### 1. Existing codebase (highest priority)

If you are working inside a repository, **adopt its design system**. Before writing any UI, look for and read:

| Where to look | What it tells you |
|---|---|
| `tailwind.config.{js,ts,cjs,mjs}` | Colors, spacing scale, radius, fonts, breakpoints |
| `:root` / `@theme` blocks in `*.css` | CSS custom properties (the live token set) |
| `theme.{js,ts}`, `tokens.{json,ts}`, `design-tokens.*` | Exported token definitions |
| `<project>/system.md`, `.interface-design/system.md`, `PRODUCT.md`, `DESIGN.md` | Previously-recorded design decisions |
| `components.json` (shadcn/ui), Chakra/MUI theme, `panda.config.*` | Component-library config and base scale |
| `<head>` `<link>` font imports, `@font-face`, `next/font` usage | Typefaces already in use |
| Existing components | Real spacing, radius, elevation, and state patterns in practice |

Match the existing colors, spacing scale, radius, type, and component patterns. **Do not introduce a second system beside the one that exists.** Extend it; don't replace it.

### 2. Figma source

If a Figma URL or file is in play, pull its variables and styles and follow them:

- `get_variable_defs` → color / spacing / radius / type variables
- `get_design_context` / `get_screenshot` → component structure and visual treatment

The Figma file is the source of truth for tokens. Map Figma variables → CSS variables 1:1.

### 3. User-specified

If the user names a palette, font, brand, or reference, use it exactly. A named brand overrides the fallback defaults below (but still loses to an existing codebase you're working inside, unless the user says otherwise).

### 4. Fallback defaults (only when none of the above provides a system)

Use these **only** when there is no repo system, no Figma, and no user direction. They are deliberately neutral so the design can be carried by domain, hierarchy, and craft — not by a borrowed brand.

- **Color: monochrome.** A tinted-neutral grayscale in OKLCH (see scale below). Add **at most one** accent, and only if the domain needs one (status, a single CTA emphasis).
- **Spacing: a 4px-based scale** — `4 8 12 16 24 32 48 64`. Every gap, pad, and margin is a multiple of 4.
- **Fonts: Inter** (UI/text) + **Fragment Mono** (mono — code, data, IDs, timestamps).

> The color *world* still comes from the product's domain (Gate 2) even under the fallback — domain exploration decides which neutral temperature and which single accent (if any) carry meaning.

---

## Fallback Default Tokens

These are the *fallback* token set. When a repo or Figma system wins, mirror that system's tokens instead.

### Color — monochrome, OKLCH, tinted neutrals

Never `#000` / `#fff`. Tint every neutral a hair toward one hue (`H` below, chroma `0.004–0.01`) so the grayscale feels intentional rather than flat. Pick `H` from the domain; `250` (cool) and `60` (warm) are reasonable starting points.

```css
:root {
  --hue: 250;            /* domain-chosen neutral temperature */

  /* Light mode surfaces — whisper-quiet elevation (shift lightness only) */
  --bg:        oklch(98.5% 0.004 var(--hue));
  --surface-1: oklch(97%   0.004 var(--hue));
  --surface-2: oklch(94.5% 0.005 var(--hue));
  --surface-3: oklch(91%   0.006 var(--hue));

  /* Text hierarchy — four levels, not two */
  --text-1: oklch(22% 0.01 var(--hue));   /* primary */
  --text-2: oklch(40% 0.01 var(--hue));   /* secondary */
  --text-3: oklch(55% 0.008 var(--hue));  /* tertiary / metadata */
  --text-4: oklch(68% 0.006 var(--hue));  /* muted / placeholder */

  /* Border progression — low-opacity, findable but quiet */
  --border:        oklch(22% 0.01 var(--hue) / 0.10);
  --border-soft:   oklch(22% 0.01 var(--hue) / 0.06);
  --border-strong: oklch(22% 0.01 var(--hue) / 0.16);

  /* Optional single accent — include ONLY if the domain needs one */
  --accent:       oklch(55% 0.15 var(--hue));
  --accent-hover: oklch(50% 0.16 var(--hue));
  --on-accent:    oklch(99% 0.003 var(--hue));

  /* Semantic — desaturate slightly in dark mode */
  --success: oklch(62% 0.15 150);
  --warning: oklch(72% 0.15 75);
  --danger:  oklch(58% 0.20 25);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:        oklch(17%   0.006 var(--hue));
    --surface-1: oklch(20%   0.007 var(--hue));  /* higher = lighter in dark */
    --surface-2: oklch(23%   0.008 var(--hue));
    --surface-3: oklch(26%   0.009 var(--hue));
    --text-1: oklch(96% 0.006 var(--hue));
    --text-2: oklch(80% 0.008 var(--hue));
    --text-3: oklch(66% 0.008 var(--hue));
    --text-4: oklch(52% 0.006 var(--hue));
    --border:        oklch(96% 0.006 var(--hue) / 0.12);
    --border-soft:   oklch(96% 0.006 var(--hue) / 0.07);
    --border-strong: oklch(96% 0.006 var(--hue) / 0.20);
  }
}
```

### Spacing — 4px base

```css
:root {
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-6: 24px;  --space-8: 32px;  --space-12: 48px; --space-16: 64px;
}
```

### Radius — concentric scale

```css
:root {
  --radius-sm: 6px;    /* inputs, buttons */
  --radius-md: 10px;   /* cards */
  --radius-lg: 16px;   /* modals, large surfaces */
}
/* Nested elements: outer radius = inner radius + padding */
```

### Fonts — fallback typefaces

```css
:root {
  --font-ui:   'Inter', system-ui, sans-serif;           /* headings, body, labels */
  --font-mono: 'Fragment Mono', ui-monospace, monospace; /* code, data, IDs, timestamps */

  --weight-regular: 400; --weight-medium: 500;
  --weight-semibold: 600; --weight-bold: 700;

  --line-display: 1.1; --line-heading: 1.2; --line-body: 1.5; --line-ui: 1.0;

  --tracking-tight: -0.02em; --tracking-snug: -0.01em;
  --tracking-normal: 0;      --tracking-wide: 0.01em;
}
```

```css
/* Load fallback fonts only when you are actually using them */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'Fragment Mono';
  src: url('/fonts/FragmentMono-Regular.woff2') format('woff2');
  font-weight: 400 500;
  font-display: optional;
}
```

---

## Typography Scale (works with any typeface)

Use scale **and** weight for hierarchy — ≥1.25 ratio between steps, never size alone. Numbers that update get `tabular-nums`.

```css
.text-display { font-family: var(--font-ui); font-size: clamp(40px, 5vw, 64px); font-weight: var(--weight-bold); line-height: var(--line-display); letter-spacing: var(--tracking-tight); }
.text-h1      { font-family: var(--font-ui); font-size: clamp(30px, 4vw, 44px); font-weight: var(--weight-semibold); line-height: var(--line-heading); letter-spacing: var(--tracking-snug); }
.text-h2      { font-family: var(--font-ui); font-size: clamp(22px, 3vw, 32px); font-weight: var(--weight-semibold); line-height: var(--line-heading); }
.text-h3      { font-family: var(--font-ui); font-size: clamp(18px, 2.4vw, 24px); font-weight: var(--weight-medium); line-height: var(--line-heading); }
.text-body    { font-family: var(--font-ui); font-size: 16px; font-weight: var(--weight-regular); line-height: var(--line-body); max-width: 70ch; }
.text-sm      { font-family: var(--font-ui); font-size: 14px; line-height: var(--line-body); }
.text-data    { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-size: 13px; line-height: 1.2; }
.text-label   { font-family: var(--font-mono); font-size: 12px; font-weight: var(--weight-medium); letter-spacing: 0.01em; text-transform: uppercase; }
```

---

## Adopting vs. Falling Back — Checklist

- [ ] Determined the styling source (repo / Figma / user / fallback) and recorded it in `system.md`
- [ ] If a repo: read its tokens (Tailwind/CSS vars/theme) and matched them — no parallel system introduced
- [ ] If Figma: pulled variables and mapped them 1:1 to CSS variables
- [ ] If fallback: monochrome OKLCH neutrals, 4px spacing, Inter + Fragment Mono; at most one domain-justified accent
- [ ] No `#000` / `#fff` anywhere — neutrals are tinted toward one hue
- [ ] Color world traced to the product's domain (Gate 2), not arbitrary
- [ ] Four text levels and a border progression in use, not just "text" and "gray text"
- [ ] Whisper-quiet elevation (shift lightness only, same hue)
- [ ] Type hierarchy via scale + weight; body capped at 65–75ch; updating numbers use `tabular-nums`
