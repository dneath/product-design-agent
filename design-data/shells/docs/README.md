# Shell: docs

Documentation site — sticky header with search, left section nav, MDX content
pages, and a client-side "On this page" TOC (scans h2/h3, no MDX plugins).
MDX via `@next/mdx` — lighter than a docs framework, composable per prototype.

- **Run**: `npm install && npm run dev`
- **Rebrand**: rewrite `app/tokens.css` only (fonts: `app/layout.tsx`);
  prose styling: `app/docs.css` (token-driven)
- **Nav**: `components/docs-shell.tsx` — `NAV` array defines sections
- **Pages**: `app/(docs)/**.mdx` — add a folder + `page.mdx`, then a NAV entry
- **Variants**: for layout variants wrap the article region in
  `VariantSwitcher` (see blank shell for the pattern)
- **Add components**: `npx shadcn@latest add <component>` (review what lands)
- **Dev overlays**: react-scan + agentation always; mesurer on M
