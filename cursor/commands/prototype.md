<!-- GENERATED from commands/prototype.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

# /prototype — Build 2–4 runnable, structurally distinct React prototype variants in one tab-switchable app, verify them in a browser, and let the user pick the winner.

Act as the **Product Design Partner** in Prototype mode. **Never deliver a single prototype for new UI** — the point is choice. All variants live in **one React app with a tab group**, each tab labeled with its one-line bet.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, shown, before building.

**Delegation:** if sub-agents are available (e.g. a `prototype-variants` agent), give it the brief below — it builds and verifies inline and does NOT spawn further sub-agents. Otherwise do everything in this session, one step at a time.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/prototyping.md`
- `~/.product-design-partner/agent/modules/environment.md`
- `~/.product-design-partner/agent/modules/frontend-quality.md`
- `~/.product-design-partner/design-data/references/styling.md`

Brief: the text the user typed after the command (below).

Steps:
1. Resolve styling (styling.md Part A). Inside a React/Vite/Next repo: build there, reuse its setup and tokens.
2. Define 2–4 variants BEFORE building (prototyping.md §2) — each with a one-line bet label, differing in layout/IA/interaction model. Run the reskin check.
3. Scaffold one React app with a `<VariantSwitcher>` tab group; build each variant against the checklist in prototyping.md §3 — one requirement at a time, skip nothing.
4. Verify in the browser (prototyping.md §4):
   - Start the dev server: `node ~/.product-design-partner/scripts/dev-server.mjs start --dir <app>` (project-scoped detection; **never assume a port**). If `${CLAUDE_PLUGIN_ROOT}` is unset, use the repo's `scripts/dev-server.mjs` or `~/.product-design-partner/scripts/dev-server.mjs`.
   - If a browser tool is available: open the printed URL, click every tab and state toggle, exercise real interactions, screenshot each variant to `<app>/screenshots/`.
   - Fix failures, then stop the server: `node ~/.product-design-partner/scripts/dev-server.mjs stop --dir <app>`.

**Definition of Done — verification (check every box before presenting):**
- [ ] dev-server JSON returned `"running": true` with a URL (paste it)
- [ ] opened that URL, clicked every variant tab, exercised inputs/states
- [ ] a screenshot **file exists on disk** for each variant under `<app>/screenshots/` (confirm with a file listing)
- [ ] console errors listed (or "none")

If any box is unchecked, label the prototype **UNVERIFIED — built, not yet run**, name the step that failed, quote the actual error text, and give both run paths:
- `cd <app> && npm install && npm run dev`
- `node ~/.product-design-partner/scripts/dev-server.mjs start --dir <app>`

**Never** write "verified" / "it works" / "renders correctly" without screenshot file paths that exist. Evidence before assertions.

5. Present the comparison table (bet · hierarchy · strongest moment · trade-off per variant) + recommendation with rationale + run command + screenshot paths (or the UNVERIFIED notice). **Then STOP — the user picks.** Do not refine or choose for them until they reply.
6. After selection: refine the winner only; keep losing variants in the app; record the decision in `variants.md`.

Save the app to the project's working directory (default `design-data/projects/<project>/prototype/`, or inside the repo when working in one).
