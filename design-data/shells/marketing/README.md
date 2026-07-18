# Shell: marketing

Marketing/landing site — nav, hero, feature grid, logo row, stats,
testimonial, CTA, footer. Scroll-in motion via doctrine-compliant primitives
(`components/motion-primitives.tsx`: ease-out, ≤300ms, transform/opacity,
40–60ms stagger, reduced-motion aware).

- **Run**: `npm install && npm run dev`
- **Rebrand**: rewrite `app/tokens.css` only (fonts: `app/layout.tsx`)
- **Copy**: `lib/fixtures.ts` — positioning, features, testimonial, stats
- **Sections**: `components/sections.tsx` — compose/reorder per variant
- **Variants**: replace the demo variants in `app/page.tsx` (section-order
  bets); keep `VariantSwitcher`
- **Add blocks**: `npx shadcn@latest add <component>`; marketing blocks from
  the `@magicui` / `@aceternity` registries (review what lands — tokens only)
- **Dev overlays**: react-scan + agentation always; mesurer on M
