# Shell: dashboard

Admin/ops dashboard — sidebar + topbar chrome, KPI cards, charts
(Tremor-pattern wrappers over recharts, colored via `--chart-*` tokens only),
and a data table.

- **Run**: `npm install && npm run dev`
- **Rebrand**: rewrite `app/tokens.css` only (fonts: `app/layout.tsx`)
- **Chrome**: `components/app-shell.tsx` — swap nav items/product name there
- **Charts**: `components/charts.tsx`; KPI stat: `components/kpi-card.tsx`
- **Variants**: replace the demo variants in `app/page.tsx` (Pulse/Triage show
  the intended composition); keep `VariantSwitcher` + `useProtoState()`
- **Fixtures**: `lib/fixtures.ts` (fulfillment ops) — swap domain, keep extremes
- **Add components**: `npx shadcn@latest add <component>`; more chart/block
  patterns: `@tremor` registry (review what lands)
- **Dev overlays**: react-scan + agentation always; mesurer on M
