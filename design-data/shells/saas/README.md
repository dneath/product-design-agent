# Shell: saas

SaaS product app — mock login, org/profile settings, members table with
role management, billing page (plans + invoices, **pure UI — no payment
provider**). Auth is a mock session: the topbar **RoleSwitcher** flips
admin/member/viewer live, gating nav and actions.

- **Run**: `npm install && npm run dev` (login → Continue enters as admin)
- **Rebrand**: rewrite `app/tokens.css` only (fonts: `app/layout.tsx`)
- **Session/roles**: `lib/session.tsx` — `useSession().can` gates UI; swap for
  real auth when the prototype graduates
- **Pages**: `app/page.tsx` (login), `app/(app)/{settings,members,billing}`
- **Variants**: `members` shows the `VariantSwitcher` pattern (single demo
  variant — build 2–4 real ones when prototyping); other pages are chrome
- **Fixtures**: `lib/fixtures.ts` — org, members, invoices, plans
- **Add components**: `npx shadcn@latest add <component>` (review what lands)
- **Dev overlays**: react-scan + agentation always; mesurer on M
