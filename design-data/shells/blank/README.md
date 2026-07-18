# Shell: blank

Bare prototype shell — no archetype furniture. Use when no archetype fits or for
focused component/single-screen prototypes.

- **Run**: `npm install && npm run dev` (or the dev-server script)
- **Rebrand**: rewrite `app/tokens.css` only (fonts: `app/layout.tsx`)
- **Variants**: replace the placeholder variants in `app/page.tsx`; the
  `VariantSwitcher` (tabs, bet labels, hash persistence) and the
  `useProtoState()` data-state toggle (default/loading/empty/error) are the
  contract — keep them
- **Fixtures**: `lib/fixtures.ts` — swap the domain, keep the extremes
- **Dark mode**: add `className="dark"` to `<html>` when the scene calls for it
- **Add components**: `npx shadcn@latest add <component>` (review what lands).
  The `components/ui/` baseline kit may be partly unused until variants use it —
  that's intentional; don't delete it to satisfy static scans
- **Dev overlays** (dev-only, `components/dev-tools.tsx`): react-scan
  (re-renders), mesurer (press M — measure/align), agentation (annotate → paste
  to your agent)
