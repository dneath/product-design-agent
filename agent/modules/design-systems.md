# Design Systems — Tokens, Components, Theming

> **When to use:** Design systems work — tokens, component libraries, theming, style guides,
> system audits. Also loaded for Figma export. Commands: `/design-system`, `/figma-export`.
> Deep method: `design-data/references/styling.md`.

Run the Thinking Protocol (entry file) first.

---

## 1. When a design system EXISTS — audit and adopt

**MUST audit before creating anything. NEVER silently override or stand up a parallel system.**

1. **Find the tokens.** Look for and read, in this order:

   | Where to look | What it tells you |
   |---|---|
   | `tailwind.config.{js,ts,cjs,mjs}` | Colors, spacing, radius, fonts, breakpoints |
   | `:root` / `@theme` blocks in `*.css` | Live CSS custom properties |
   | `theme.{js,ts}`, `tokens.{json,ts}`, `design-tokens.*` | Exported token definitions |
   | `components.json` (shadcn/ui), Chakra/MUI theme, `panda.config.*` | Component-library config |
   | `<head>` font links, `@font-face`, `next/font` | Typefaces in use |
   | `system.md`, `DESIGN.md`, `PRODUCT.md` | Previously recorded decisions |
   | Existing components | Real spacing, radius, elevation, state patterns in practice |

2. **Use its tokens and components exclusively.** Extend the system; don't replace it.
3. **Flag gaps and inconsistencies explicitly** — "the system has no `danger` token; buttons use
   3 different radii" — and propose fixes. **NEVER** paper over a gap with an ad-hoc value.
4. Record the audit result (source, token map, gaps) in the project's `system.md`.

## 2. When creating a system — token-first architecture

Build in three layers, in order. Components consume ONLY semantic/component tokens — never primitives directly.

1. **Primitives** — raw scales: color ramps (OKLCH), spacing (4px-based), type scale (≥1.25 ratio),
   radius, motion durations/easings, z-index.
2. **Semantic tokens** — meaning-named: `--bg-surface`, `--text-secondary`, `--border-strong`,
   `--accent`, `--danger`. Theming happens HERE.
3. **Component tokens** — per-component where variants demand it: `--button-radius`, `--input-bg`.

**Naming MUST map 1:1 between design and code** — the Figma variable, the CSS variable, and the
docs use the same name. If the names diverge, fix the names before shipping anything.

## 3. Component inventory (when building out a system)

1. Inventory what the product actually uses, **prioritized by usage frequency** — build the
   button/input/table before the carousel.
2. For each component, document **variants and states** before styling: which variants exist
   (primary/secondary/ghost…), and all 8 interaction states per variant.

## 4. Token pipelines & theming

- **Export tokens as CSS variables** (source of truth) and mirror to JSON when a build pipeline
  or Figma sync needs it. One generator, two outputs — never hand-maintain both.
- **Theming (light/dark/high-contrast) switches at the semantic layer only.** Primitives never
  change per theme; components never reference theme-conditional values directly.
- Dark mode is designed, not inverted: dark-gray surfaces (never pure black), depth via surface
  lightness instead of shadows, semantic colors slightly desaturated. Values: `styling.md`.

## 5. Component documentation contract

Every new or changed component MUST ship with all five:

- [ ] **Anatomy** — named parts and their tokens (container, label, icon slot…)
- [ ] **Variants** — each with its one-line purpose ("ghost: low-emphasis actions in dense toolbars")
- [ ] **States** — all 8, with the token/value that changes per state
- [ ] **Do / Don't** — at least one concrete pair with reasons
- [ ] **Accessibility notes** — role/semantics, keyboard behavior, focus handling, contrast, labels

## 6. Figma export (`/figma-export`)

1. **If a Figma MCP is available:** load the Figma design/library generation skill FIRST, before any
   Figma write tool. Map code tokens → Figma variables 1:1; build components with proper variants.
2. **If not:** deliver the fallback bundle — token JSON + a frame-by-frame spec (layout, tokens,
   states per screen) the user can rebuild from — and say exactly what to do with it.
3. Return the Figma URL (or bundle path) and what was created. Never claim an export you didn't run.

---

## Definition of done (this module)

- [ ] Existing system audited first; gaps flagged, not overridden
- [ ] Tokens layered primitive → semantic → component; 1:1 naming design↔code
- [ ] Components documented with the 5-part contract
- [ ] Theming isolated to the semantic layer
- [ ] Decisions + rationale recorded in `system.md`
