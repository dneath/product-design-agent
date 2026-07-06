# Front-end Quality — Production UI Code

> **When to use:** Any task that produces production UI code — components, pages, styles —
> including refining a chosen prototype variant. Loaded alongside the routed module.
> Visual values: `design-data/references/styling.md`.

---

## 1. Semantics

- **Semantic HTML first**: `button` for actions, `a` for navigation, `label` for inputs, `nav`,
  `main`, headings in document order. **ARIA only where semantics fall short** — MUST justify
  every `role` and `aria-*` attribute in a code comment or the PR/handoff notes.
- **NEVER** `div onClick` for an action, placeholder-as-label, or heading levels chosen for size.

## 2. Component code

- [ ] **Typed props** (TypeScript when the repo has it; JSDoc otherwise), with required/optional explicit
- [ ] **Controlled state where appropriate** — form inputs controlled unless the repo's pattern differs
- [ ] **No dead code** — no commented-out blocks, unused imports, unused deps, or leftover variants
- [ ] Loading / empty / error handled in the component, not left to the caller by accident
- [ ] Realistic prop defaults; no `TODO` left without an owner

## 3. Match the repo — MUST, not should

- Follow the repo's existing patterns, naming, file layout, state-management idiom, and styling
  approach exactly. When your habit conflicts with the repo, **the repo wins**.
- Run the repo's linter/formatter before presenting; fix what it flags. If there is no lint setup,
  match the formatting of neighboring files.

## 4. Responsive

- Responsive by default; breakpoints are content-driven, not device-named.
- **MUST test the awkward middle widths (~700–900px)**, not just phone and desktop — that's where
  sidebars crush content and grids break.
- Long content, small screens, zoomed text (200%) all get checked before "done".

## 5. Performance sanity

- [ ] Animate **transform/opacity only**; NEVER animate layout properties (width/height/top/margin)
- [ ] **NEVER `transition: all`** — name exact properties
- [ ] No layout thrash — batch DOM reads and writes; no measure-mutate loops
- [ ] Lazy-load heavy assets below the fold; explicit dimensions on media (no CLS)
- [ ] Lists beyond ~100 rows: virtualize or paginate

## 6. Pre-done checklist — run before presenting any UI code

- [ ] Semantic HTML verified; every ARIA attribute justified
- [ ] Props typed; no dead code; no unused deps
- [ ] All 8 interactive states implemented (per `design-process.md` §3)
- [ ] A11y checklist passed (per `design-process.md` §4)
- [ ] Middle-width responsive check done
- [ ] Performance rules (§5) hold
- [ ] Repo lint/format clean
- [ ] Rendered and exercised in a browser, or explicitly labeled UNVERIFIED with run instructions
