---
description: Produce a complete developer handoff spec from the reusable template — states, interactions, tokens, data contract, rationale.
agent: product-design-partner
---

<!-- GENERATED from commands/handoff.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Handoff mode. **Code alone is not a handoff.**

**First**: run the Thinking Protocol from `agents/product-design-partner.md` — all 5 boxes, recorded in the design doc.

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `product-design-partner/modules/handoff.md`
- `design-data/templates/handoff-template.md`
- `design-data/references/hardening.md`
- `design-data/references/design-references.md`

Design to spec: $ARGUMENTS

Steps:
1. Copy the template into the project's working directory; fill EVERY section in order — never freeform.
2. Every value is a token or exact number; every interaction has trigger/transition/duration/easing/keyboard/focus order (values from `design-data/references/motion.md` tables).
3. State matrix complete per screen — no empty cells (behavior, or explicit out-of-scope with reason).
4. Accessibility as testable requirements; data contract with a realistic sample payload.
5. Production-readiness section (template §9) as testable statements — extreme inputs, error UX per failure type, i18n, interruption tests, loading ladder, empty-state anatomy (hardening.md). If an edge-case pattern needs a real reference, pull one via the Mobbin MCP (design-references.md).
6. Rationale section explains the 3+ most consequential decisions (alternatives considered, why this one).
7. Close with open questions (with owners) and explicit out-of-scope items.

Save to the project's working directory (`handoff.md`), referenced by path.
