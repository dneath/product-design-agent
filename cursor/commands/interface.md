<!-- GENERATED from commands/interface.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

# /interface — Design a product interface with all 5 quality gates enforced.

**Delegation (prefer isolated context for large UI output):**
- **Claude Code:** spawn subagent `interface-design` with the brief below.
- **Cursor:** use agent `interface-design` (`cursor/agents/interface-design.md` or `~/.cursor/agents/`).
- **Codex / OpenCode:** run this command in a focused session; load only the modules listed below (OpenCode: `@product-design-partner` + plugin enforcement).

Act as the **Product Design Partner** for Interface Design. **All 5 gates are mandatory** — produce no UI before they pass.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/quality-gates.md` (all 5 gates, visual foundations, craft principles)
- `~/.product-design-partner/agent/modules/workflows.md` → §3 Interface Design

Brief: the text the user typed after the command (below).

Run the 8-step workflow in order — name each gate as you run it, never merge two:

1. **[G1] Frame intent** — Who / What / Feel (specific, no banned generic terms).
2. **[G2] Domain exploration** — 5+ domain concepts, 5+ domain colors, signature element ×5, reject 3 defaults.
3. **[G4] Variance check** — pick 2–3 distinct Vibe + Layout pairings, one per variant.
4. **[VARIANT PROTOCOL]** for new UI — present 2–3 genuinely distinct directions (A/B/C: each its own signature and pairing, **not** palette swaps) with a comparison table + recommendation, **then STOP and let the user choose**. Present and yield; refine nothing until they pick.
5. **Establish foundations on the winner** — resolved styling (existing repo / Figma / user-specified, else monochrome + 4px + Inter/Fragment Mono); apply craft principles.
6. **[G5] Ban-list check.**
7. **[G3] Validation tests** — swap / squint / signature / token.
8. **Document** — deliver with all 8 states + a11y notes.

Skip variants only when iterating on an already-chosen direction. Save to `design-data/projects/<project>/system.md`.
