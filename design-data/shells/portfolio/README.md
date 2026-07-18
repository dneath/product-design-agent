# Shell: portfolio

Personal site — intro, selected-work grid, MDX case studies, about page.
Prose styling shares the token-driven `app/docs.css` (`.docs-prose`).

- **Run**: `npm install && npm run dev`
- **Rebrand**: rewrite `app/tokens.css` only (fonts: `app/layout.tsx`)
- **Content**: `lib/fixtures.ts` (owner, work list) + `app/(site)/**.mdx`
  (case studies — add a folder + `page.mdx` + a `work` entry)
- **Variants**: for layout variants wrap page content in `VariantSwitcher`
  (see blank shell for the pattern)
- **Add components**: `npx shadcn@latest add <component>` (review what lands)
- **Dev overlays**: react-scan + agentation always; mesurer on M
