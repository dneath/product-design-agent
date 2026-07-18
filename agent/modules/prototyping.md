# Prototyping — Interactive React Variants

> **When to use:** Interactive React prototypes and variant exploration — "prototype", "make it
> real", "show me options", any new UI build. Command: `/prototype`.
> Also load: `agent/modules/environment.md` (dev server, output), `agent/modules/frontend-quality.md`,
> `design-data/references/shells.md` (app shells, registries, tooling).

Run the Thinking Protocol (entry file) first. **New UI is never presented as a single take.**

---

## 1. Hard rules

- **MUST be real, working interactivity** — state, inputs that validate, transitions you can trigger.
  NEVER static mockups exported as code, never hover-only CSS pretending to be interaction.
- **Variants are first-class: build 2–4 meaningfully different variants** (default 3; 2 only when
  tightly constrained). Variants MUST differ in **layout, IA, or interaction model** — not cosmetics.
  **Reskin check:** remove color and font — if you can't tell them apart, rebuild.
- **Every variant gets a one-line bet label**, e.g. `V2 — inline editing, no modal`.
- **Realistic data only.** Plausible domain names, awkwardly long values, edge-case counts.
  **NEVER** lorem ipsum, **NEVER** `Item 1/2/3`, **NEVER** placeholder-person names, invented
  generic company names, fake-precise vanity numbers (99.99%, perfectly round counts), or filler
  marketing verbs. Fixtures include the extremes from `design-data/references/hardening.md` §1
  (0 / 1 / typical / 1,000+ items; 100+ chars; emoji/RTL). Keep fixtures in the shell's
  `lib/fixtures.ts` (or `data.js` in the fallback scaffold).
- **Start from what exists — NEVER re-scaffold what a shell or registry provides:**
  1. **Existing codebase → build there**, on its stack and tokens. Shells are never copied into a repo.
  2. **No codebase → copy the matching app shell** from `design-data/shells/` (selection table,
     copy commands, and the shell contract: `design-data/references/shells.md`).
  3. **No archetype fit → the `blank/` shell.**
  4. **Shells unusable → minimal from-scratch scaffold** (shells.md §5) — announce why.
- **Missing components come from the shadcn registries** (`npx shadcn@latest add …` — registry
  table in shells.md §3), reviewed on landing (tokens, states, focus). Hand-roll only what no
  registry provides. Bulk UI-kit installs stay banned — add what the variants need, nothing more.

## 2. Define each variant BEFORE building

```markdown
### Variant B — "Control Tower"
- **Bet**: <one line — what this variant wagers is true about the user>
- **Layout/IA**: <what's promoted, what's demoted>
- **Interaction model**: <inline edit / drawer / dedicated page / search-first…>
- **Trade-off**: <who this is worse for>
```

## 3. Build — one app, tab-switchable variants

In a shell: rebrand `app/tokens.css` from the resolved styling source, swap `lib/fixtures.ts` to
the prototype's domain (keep the extremes), replace the placeholder variants in `app/page.tsx`.
Inside a repo: follow its conventions; port the `VariantSwitcher` pattern into its stack.

Build checklist — one requirement at a time, skip nothing:

- [ ] `<VariantSwitcher>` tab group (`role="tablist"`) renders each variant; selection persists via
      URL hash (`#variant-b`) so refresh keeps the tab; `embedded` prop inside app chrome; a bet
      that changes the chrome itself wraps at layout level instead
- [ ] Each tab shows the variant's one-line bet label
- [ ] Each variant is genuinely interactive — working state, validating inputs, transitions
- [ ] Every data state reachable via the built-in state toggle (`useProtoState()`): default always;
      loading/error/empty switchable
- [ ] Styling resolved per `design-data/references/styling.md` (repo → Figma → user → fallback),
      written into `app/tokens.css` ONLY — components stay on semantic utilities
- [ ] Interactions animate per `design-data/references/motion.md` — frequency gate, router,
      duration tables
- [ ] Realistic data everywhere, including the awkwardly long ones

## 4. Verify — MANDATORY before presenting

1. Start the dev server via the project-scoped script (**never assume a port, never hand-pick one**):
   `node <root>/scripts/dev-server.mjs start --dir <prototype dir>` — root resolution per the entry
   file. It reuses this project's running server or starts one and prints the URL.
2. **If a browser tool is available** (e.g. a Playwright skill): open the URL, click every tab,
   exercise inputs/validation/state toggles in each variant, screenshot each variant to
   `<prototype dir>/screenshots/`, note console errors. Fix failures, re-verify.
3. **Run the built-in checks** (details: shells.md §4):
   - axe on each variant, scoped to `[data-proto-root]` — report violations or "none".
   - `npx react-doctor@latest --no-telemetry <dir>` — fix real bugs; baseline-kit
     "unused" notes are expected.
4. Stop the server when done: `node <root>/scripts/dev-server.mjs stop --dir <prototype dir>`.

**Definition of Done — verification (check every box):**
- [ ] dev-server reported `"running": true` with a URL (paste it)
- [ ] every variant tab opened; interactions exercised
- [ ] a screenshot file **exists on disk** per variant (confirm with a file listing)
- [ ] console errors listed (or "none")
- [ ] axe violations listed per variant (or "none"); react-doctor run (or skip reason named)

**If any box is unchecked or no browser tool exists:** label the work **UNVERIFIED — built, not yet
run**, quote the actual error/note text, and give both run paths:
`cd <prototype dir> && npm install && npm run dev` and the dev-server script command — plus a
self-check list (open URL → click each tab → try each state toggle → watch the console).
**NEVER** write "verified" / "it works" / "renders correctly" without screenshot paths that exist.

## 5. Present, then STOP

Deliver: comparison table (bet · hierarchy · strongest moment · main trade-off per variant) →
recommendation with rationale → run command + screenshot paths (or UNVERIFIED notice).
**Then STOP — the user picks.** Do not refine, extend, or choose for them until they reply.
After selection: refine the winner only (cross-pollinating named details on request); keep losing
variants in the app; record the decision and reasons in `variants.md`.

---

**Delegation:** if sub-agents are available, run build + verification in one isolated sub-agent that
returns only pass/fail per variant + paths (it does NOT spawn further sub-agents). Otherwise do it
inline, summarizing each step.
