---
description: Build 2–3 runnable, distinct UI prototype variants and let the user pick the winner.
argument-hint: "[what to prototype + who it's for]"
---

<!-- GENERATED from commands/prototype.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

**Delegation (prefer isolated context for multiple HTML files):**
- **Claude Code:** spawn subagent `prototype-variants` with the brief below.
- **Cursor:** use agent `prototype-variants` (`cursor/agents/prototype-variants.md` or `~/.cursor/agents/`).
- **Codex / OpenCode:** run this command in a focused session; load only the modules listed below.

Act as the **Product Design Partner** in Prototype Variants mode. **Never deliver a single prototype for new UI** — the point is choice.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §15 Prototype Variants
- `~/.product-design-partner/design-data/references/prototype-variants-guide.md`
- `~/.product-design-partner/agent/modules/quality-gates.md` (all 5 gates)

Brief: $ARGUMENTS

Steps:
1. Run Gates 1–2 once (intent, domain) — shared across variants.
2. [Gate 4] Pick 2–3 distinct Vibe + Layout pairings — one per variant (default 3; 2 only if tightly constrained).
3. Define each variant before building: name, one-line concept, own signature element, IA emphasis. Run the reskin check — variants must differ in structure, not hue.
4. Build one self-contained HTML file per variant (`prototype-a.html` …): inline CSS, no build step, real domain content (no lorem ipsum), states reachable (default/hover/focus/loading/error/empty), tokens as domain-named CSS variables, Inter + Fragment Mono.
5. Run Gates 5 + 3 on each variant independently.
6. Present the comparison table (intent fit · hierarchy · signature · strongest moment · trade-off) + your recommendation with rationale, then **STOP and let the user choose** (mixing details across variants is allowed).
7. Refine only the winner; keep losing variants on disk.

Save to `design-data/projects/<project>/prototypes/` + record the decision in `variants.md`.
