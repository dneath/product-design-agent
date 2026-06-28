<!-- GENERATED from commands/prototype.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

# /prototype — Build 2–3 runnable, distinct React prototype variants in one tab-switchable app, verify them in a browser, and let the user pick the winner.

**Delegation (prefer isolated context for the React build + browser verification):**
- **Claude Code:** spawn subagent `prototype-variants` with the brief below. That subagent has its own `Bash` + browser skill and verifies **inline** — it does not spawn a further sub-agent.
- **Cursor:** use agent `prototype-variants` (`cursor/agents/prototype-variants.md` or `~/.cursor/agents/`).
- **Codex / OpenCode:** run this command in a focused session; load only the modules listed below and do the build + verification inline.

Act as the **Product Design Partner** in Prototype Variants mode. **Never deliver a single prototype for new UI** — the point is choice. **Prototypes are interactive React**, all variants in **one app with a tab group to switch between A / B / C**, so full functionality is visible and comparable.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §15 Prototype Variants
- `~/.product-design-partner/design-data/references/prototype-variants-guide.md`
- `~/.product-design-partner/agent/modules/quality-gates.md` (all 5 gates)
- `~/.product-design-partner/agent/modules/context-management.md` (sub-agent isolation, output hygiene)

Brief: the text the user typed after the command (below).

Steps:
1. Run Gates 1–2 once (intent, domain) — shared across variants.
2. **Resolve styling** (quality-gates.md → Visual Foundations): existing repo tokens → Figma → user-specified → fallback (monochrome OKLCH, 4px spacing, Inter + Fragment Mono). If already inside a React/Vite/Next repo, build there and reuse its setup + tokens.
3. [Gate 4] Pick 2–3 distinct Vibe + Layout pairings — one per variant (default 3; 2 only if tightly constrained).
4. Define each variant before building: name, one-line concept, own signature element, IA emphasis. Run the reskin check — variants must differ in structure, not hue.
5. Scaffold **one React app** (Vite + React if standalone) with a `<VariantSwitcher>` tab group rendering `<VariantA/>` / `<VariantB/>` / `<VariantC/>`. Build each variant against this checklist — one requirement at a time, skip nothing:
   - [ ] Tab group remembers the selection via the URL hash (`#variant-b`)
   - [ ] Each variant is a **real interactive** component — working state, inputs that validate, transitions (not hover-only CSS)
   - [ ] Real domain content — never lorem ipsum, never `Item 1/2/3`
   - [ ] Every data state reachable via an in-app toggle: default + hover/focus always; loading / error / empty switchable
   - [ ] Tokens are CSS variables with **domain names** (`--sla-critical`, not `--red-500`)
6. Run Gates 5 + 3 on each variant independently — a variant that fails its own validation is rebuilt, not offered.
7. **Verify in the browser** (on Claude Code the spawned `prototype-variants` subagent does this inline — no further nesting):
   - Start the dev server: `node ~/.product-design-partner/scripts/dev-server.mjs start --dir <app>` (project-scoped detection; **never assume a port**). If `${CLAUDE_PLUGIN_ROOT}` is unset, use `~/.product-design-partner/scripts/dev-server.mjs` or the repo's `scripts/dev-server.mjs`.
   - Open the printed URL with the `playwright-cli` skill, click through every tab and state, exercise the real interactions.
   - Screenshot each variant to `<app>/screenshots/`.
   - Fix anything that fails to render or misbehaves, then stop the server: `node ~/.product-design-partner/scripts/dev-server.mjs stop --dir <app>`.

**Definition of Done — verification (check every box before you present):**
- [ ] dev-server JSON returned `"running": true` with a URL (paste it)
- [ ] opened that URL, clicked every A/B/C tab, exercised inputs/states
- [ ] a screenshot **file exists on disk** for each variant under `<app>/screenshots/` (confirm with Glob/`ls`)
- [ ] console errors listed (or "none")

If any box is unchecked, label the prototype **UNVERIFIED**, name the step that failed, and give the user the exact run command. **Never** write "verified" / "it works" / "renders correctly" without screenshot file paths that exist. Evidence before assertions.

**If verification can't run** (no Bash, `node`/`npm` missing, no `playwright-cli` skill, or the dev server won't start): do not fabricate a result. Present the variants labeled **UNVERIFIED — built, not yet run**, quote the dev-server script's own `error`/`note` text, and give the user both ways to run it:
- `cd <app> && npm install && npm run dev`
- `node ~/.product-design-partner/scripts/dev-server.mjs start --dir <app>`

Then continue to the comparison and STOP as normal.

8. Present the comparison table (intent fit · hierarchy · signature · strongest moment · trade-off) + your recommendation with rationale + the single command to run the app + screenshot paths (or the UNVERIFIED notice). **Then STOP — present and yield. Do not refine, scaffold changes, or pick for the user until they reply** (mixing details across variants is allowed once they choose).
9. Refine only the winner after the user picks; keep losing variants in the app.

Save the runnable app to `design-data/projects/<project>/prototype/` (or inside the repo when working in one), record the decision in `variants.md`, and keep verification screenshots in `screenshots/`.
