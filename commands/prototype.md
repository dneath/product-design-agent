---
description: Build 2–3 runnable, distinct React prototype variants in one tab-switchable app, verify them in a browser, and let the user pick the winner.
argument-hint: "[what to prototype + who it's for]"
allowed-tools: Read, Grep, Glob, Write
---

**Delegation (prefer isolated context for the React build + browser verification):**
- **Claude Code:** spawn subagent `prototype-variants` with the brief below.
- **Cursor:** use agent `prototype-variants` (`cursor/agents/prototype-variants.md` or `~/.cursor/agents/`).
- **Codex / OpenCode:** run this command in a focused session; load only the modules listed below.

Act as the **Product Design Partner** in Prototype Variants mode. **Never deliver a single prototype for new UI** — the point is choice. **Prototypes are interactive React**, all variants in **one app with a tab group to switch between A / B / C**, so full functionality is visible and comparable.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §15 Prototype Variants
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/prototype-variants-guide.md`
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/quality-gates.md` (all 5 gates)
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/context-management.md` (sub-agent isolation, output hygiene)

Brief: $ARGUMENTS

Steps:
1. Run Gates 1–2 once (intent, domain) — shared across variants.
2. **Resolve styling** (quality-gates.md → Visual Foundations): existing repo tokens → Figma → user-specified → fallback (monochrome OKLCH, 4px spacing, Inter + Fragment Mono). If already inside a React/Vite/Next repo, build there and reuse its setup + tokens.
3. [Gate 4] Pick 2–3 distinct Vibe + Layout pairings — one per variant (default 3; 2 only if tightly constrained).
4. Define each variant before building: name, one-line concept, own signature element, IA emphasis. Run the reskin check — variants must differ in structure, not hue.
5. Scaffold **one React app** (Vite + React if standalone) with a `<VariantSwitcher>` tab group rendering `<VariantA/>` / `<VariantB/>` / `<VariantC/>` (remember selection via URL hash). Each variant is a real interactive component — working state, inputs, validation, transitions; real domain content (no lorem ipsum); data states reachable via an in-app toggle (default/hover/focus/loading/error/empty); domain-named CSS-variable tokens.
6. Run Gates 5 + 3 on each variant independently.
7. **Verify in the browser** — delegate to a sub-agent: start the dev server with `node scripts/dev-server.mjs start --dir <app>` (project-scoped detection; never assume a port), drive it with the browser/Playwright skill, click through every tab and state, screenshot each variant, and return only a short pass/fail + screenshot paths + console errors. Fix anything broken before presenting.
8. Present the comparison table (intent fit · hierarchy · signature · strongest moment · trade-off) + your recommendation with rationale + the single command to run the app + screenshots, then **STOP and let the user choose** (mixing details across variants is allowed).
9. Refine only the winner; keep losing variants in the app.

Save the runnable app to `design-data/projects/<project>/prototype/` (or inside the repo when working in one), record the decision in `variants.md`, and keep verification screenshots in `screenshots/`.
