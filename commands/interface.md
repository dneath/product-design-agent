---
description: Design a product interface with all 5 quality gates enforced.
argument-hint: "[what to design + who it's for]"
allowed-tools: Read, Grep, Glob, Write
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

Run the 8-step workflow: [G1] frame intent (Who/What/Feel) → [G2] domain exploration (5+ concepts, 5+ domain colors, signature ×5, reject 3 defaults) → [G4] variance check (pick 2–3 distinct Vibe + Layout pairings, one per variant) → **[VARIANT PROTOCOL] for new UI, present 2–3 genuinely distinct directions (A/B/C: own signature, own pairing — not palette swaps) with a comparison table + recommendation, then STOP and let the user choose** → establish foundations on the winner (resolved styling — existing repo/Figma/user, else monochrome + 4px + Inter/Fragment Mono; apply craft principles) → [G5] ban-list check → [G3] validation tests (swap/squint/signature/token) → document. Deliver with all 8 states + a11y notes. Skip variants only when iterating on an already-chosen direction. Save to `design-data/projects/<project>/system.md`.
