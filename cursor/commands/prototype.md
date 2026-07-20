<!-- GENERATED from commands/prototype.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

# /prototype — Build 2–4 runnable, structurally distinct React prototype variants in one tab-switchable app, verify them in a browser, and let the user pick the winner.

Act as the **Product Design Partner** in Prototype mode. **Never deliver a single prototype for new UI** — the point is choice. All variants live in **one React app with a tab group**, each tab labeled with its one-line bet.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, recorded in the design doc, before building.

**Delegation:** if sub-agents are available (e.g. a `prototype-variants` agent), give it the brief below — it builds and verifies inline and does NOT spawn further sub-agents. Otherwise do everything in this session, one step at a time.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/prototyping.md`
- `~/.product-design-partner/agent/modules/environment.md`
- `~/.product-design-partner/agent/modules/frontend-quality.md`
- `~/.product-design-partner/design-data/references/shells.md`
- `~/.product-design-partner/design-data/references/styling.md`
- `~/.product-design-partner/design-data/references/motion.md`
- `~/.product-design-partner/design-data/references/design-references.md`

Brief: the text the user typed after the command (below).

Steps:
1. **Pick the starting point (shells.md ladder — stop at the first match):** inside an existing React/Vite/Next repo → build there on its stack and tokens (shells are never copied into a repo). No codebase → copy the matching app shell from `~/.product-design-partner/design-data/shells/` (`blank/` when no archetype fits); `npm install`. Shells unusable → the from-scratch fallback (shells.md §5) — announce why.
2. Resolve styling (styling.md Part A) and write it into the shell's `app/tokens.css` only — components stay on semantic utilities.
3. Define 2–4 variants BEFORE building (prototyping.md §2) — each with a one-line bet label, differing in layout/IA/interaction model. Ground the interaction models in real flows via the Mobbin MCP (design-references.md; ask-first setup if it isn't connected, else web fallback with the source labeled). Run the reskin check.
4. Build the variants in the shell's `<VariantSwitcher>` against the checklist in prototyping.md §3 — one requirement at a time, skip nothing. Fixtures live in `lib/fixtures.ts` and include the extremes from `~/.product-design-partner/design-data/references/hardening.md` §1; missing components come from the shadcn registries (shells.md §3), reviewed on landing; interactions follow motion.md.
5. Verify in the browser (prototyping.md §4):
   - Start the dev server: `node ~/.product-design-partner/scripts/dev-server.mjs start --dir <app>` (project-scoped detection; **never assume a port**). If `${CLAUDE_PLUGIN_ROOT}` is unset, use the repo's `scripts/dev-server.mjs` or `~/.product-design-partner/scripts/dev-server.mjs`.
   - If a browser tool is available: open the printed URL, click every tab and state toggle, exercise real interactions, screenshot each variant to `<app>/screenshots/`.
   - Run axe scoped to `[data-proto-root]` per variant and `npx react-doctor@latest --no-telemetry <app>` (shells.md §4).
   - Fix failures, then stop the server: `node ~/.product-design-partner/scripts/dev-server.mjs stop --dir <app>`.

**Definition of Done — verification (check every box before presenting):**
- [ ] dev-server JSON returned `"running": true` with a URL (paste it)
- [ ] opened that URL, clicked every variant tab, exercised inputs/states
- [ ] a screenshot **file exists on disk** for each variant under `<app>/screenshots/` (confirm with a file listing)
- [ ] console errors listed (or "none")
- [ ] axe violations listed per variant (or "none"); react-doctor run (or the skip reason named)

If any box is unchecked, label the prototype **UNVERIFIED — built, not yet run**, name the step that failed, quote the actual error text, and give both run paths:
- `cd <app> && npm install && npm run dev`
- `node ~/.product-design-partner/scripts/dev-server.mjs start --dir <app>`

**Never** write "verified" / "it works" / "renders correctly" without screenshot file paths that exist. Evidence before assertions.

6. Present the comparison table (bet · hierarchy · strongest moment · trade-off per variant) + recommendation with rationale + run command + screenshot paths (or the UNVERIFIED notice). **Then STOP — the user picks.** Do not refine or choose for them until they reply.
7. After selection: refine the winner only; keep losing variants in the app; record the decision in `variants.md`.
8. **Self-QA (optional):** run `/critique` on the recommended variant (product principles + a11y) before further build-out.

Save the app to the project's working directory (default `design-data/projects/<project>/prototype/`, or inside the repo when working in one).
