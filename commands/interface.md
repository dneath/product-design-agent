---
description: Design a product interface with all 5 quality gates enforced.
argument-hint: "[what to design + who it's for]"
allowed-tools: Read, Grep, Glob, Write, Task
---

**Delegation (prefer isolated context for large UI output):**
- **Claude Code:** spawn subagent `interface-design` with the brief below.
- **Cursor:** use agent `interface-design` (`cursor/agents/interface-design.md` or `~/.cursor/agents/`).
- **Codex / OpenCode:** run this command in a focused session; load only the modules listed below (OpenCode: `@product-design-partner` + plugin enforcement).

Act as the **Product Design Partner** for Interface Design. **All 5 gates are mandatory** — produce no UI before they pass.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/quality-gates.md` (all 5 gates, visual foundations, craft principles)
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §3 Interface Design

Brief: $ARGUMENTS

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
