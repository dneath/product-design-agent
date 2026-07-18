# App Shells — Prototype Starting Points

> Load for `/prototype` when there is **no existing codebase** to build in.
> Shells live in `design-data/shells/` (resolve the root per the entry file:
> `${CLAUDE_PLUGIN_ROOT}` → repo checkout → `~/.product-design-partner/`).

**Selection ladder — MUST follow in order, stop at the first match:**

1. **Existing codebase → build there.** Its stack, tokens, and conventions win.
   Shells are NEVER copied into or imposed on an existing repo.
2. **No codebase + archetype match → copy that shell** (table below).
3. **No codebase, no archetype fit → copy `blank/`.**
4. **Shells unavailable** (no Node, install missing) → from-scratch fallback (§5).

---

## 1. Pick the shell

| Shell | Use when the brief sounds like… |
|---|---|
| `dashboard/` | admin panel, ops console, metrics, KPI, monitoring, data table, charts |
| `marketing/` | landing page, homepage, launch site, pricing page, campaign |
| `ai-chat/` | assistant, copilot, chatbot, conversation, prompt UI, streaming replies |
| `saas/` | login, accounts, roles/permissions, settings, members, plans/billing screens |
| `docs/` | documentation, developer docs, help center, guides, API reference |
| `portfolio/` | personal site, case studies, work showcase, MDX blog |
| `blank/` | single component/screen, or nothing above fits |

Copy and rename (never work inside the agent install):

```bash
cp -r <root>/design-data/shells/<shell>/ <project dir>/prototype/
cd <project dir>/prototype && npm install
npm pkg set name=proto-<project>
```

Node ≥ 20 required. Start/stop the dev server via `scripts/dev-server.mjs`
(environment.md) — never by hand.

## 2. What every shell guarantees (the contract)

- **Stack**: Next.js App Router + React + Tailwind v4 + TypeScript + shadcn/ui
  (`components.json` present, style `new-york`); versions pinned exact.
- **Theming seam — `app/tokens.css` is the ONLY place brand lives.** Rebrand =
  rewrite that file from the resolved styling source (styling.md Part A);
  fonts swap in `app/layout.tsx`. Components use semantic utilities
  (`bg-background`, `text-muted-foreground`…) — **NEVER raw colors/spacing.**
  Dark mode = `class="dark"` on `<html>`; the usage scene decides, never a default.
- **`components/variant-switcher.tsx`**: tablist + bet labels + URL-hash
  persistence + the `useProtoState()` data-state toggle
  (default/loading/empty/error). Build variants inside it; `embedded` prop
  when it sits inside app chrome. If a variant's bet changes the chrome
  itself, wrap at the layout level instead.
- **`lib/fixtures.ts`**: realistic domain data incl. hardening extremes —
  swap the domain, keep the extremes.
- **Fully mocked**: no env vars, no database, no auth library, no payment
  provider. Mock seams are labeled in each shell's README (mock streaming,
  mock session/roles) — swap them only when a prototype graduates.
- **Dev overlays** (`components/dev-tools.tsx`, dev-only): react-scan
  (re-render highlights), agentation (annotate → agent-readable markdown),
  mesurer (press **M** — kept opt-in because its toolbar covers top-left UI).
- Each shell's `README.md` lists its furniture and swap points. The baseline
  `components/ui/` kit may be partly unused until variants use it — that is
  intentional; don't delete it to satisfy static scans.

## 3. Missing a component? Registry first — NEVER hand-roll

```bash
npx shadcn@latest add <component>              # official registry
npx shadcn@latest add @<registry>/<component>  # community registries
```

| Registry | Strength |
|---|---|
| `@shadcn` (default) | primitives: dialog, select, tabs, form, sheet, … |
| `@tremor` | charts, KPI blocks, data views — tremor.so |
| `@magicui` | marketing motion blocks — magicui.design |
| `@aceternity` | hero/feature effects — ui.aceternity.com |
| `@originui` | large input/control collection — originui.com |
| Shadcn Studio | marketing/dashboard/e-commerce blocks — shadcnstudio.com |

Directory of registries: ui.shadcn.com/docs/directory.

**Registry code review — MUST, before use** (community registries are
third-party): read what landed; re-point hardcoded colors/radii at the
tokens; check the 8 interaction states and focus rings; confirm no network
calls or telemetry snuck in. Hand-roll only what no registry provides.

## 4. Verify (extends prototyping.md §4)

- **axe (WCAG)**: with the browser open on each variant, inject
  `node_modules/axe-core/axe.min.js` and run
  `axe.run(document.querySelector('[data-proto-root]'))` — scoped so dev
  overlays don't pollute results. Report violations per variant (or "none").
- **react-doctor (static)**: `npx react-doctor@latest --no-telemetry <app dir>`
  — report the findings that are yours (the baseline-kit "unused" notes are
  expected). Fix real bugs it finds before presenting.
- react-scan runs live — glance for unexpected re-render storms while
  clicking through variants.

## 5. From-scratch fallback (emergency only — announce the reason)

Only when shells can't be used at all: hand-roll minimal Vite + React
(`index.html`, `package.json`, `vite.config.js`, `src/` with `main.jsx`,
`App.jsx`, `tokens.css`, `data.js`, `VariantSwitcher.jsx`, one file per
variant), tokens as CSS variables per styling.md, states + bets per
prototyping.md. Name the missing capability that forced the fallback.
