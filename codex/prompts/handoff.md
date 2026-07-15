---
description: Produce a complete developer handoff spec from the reusable template — states, interactions, tokens, data contract, rationale.
argument-hint: "[design/project to hand off]"
---

<!-- GENERATED from commands/handoff.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Handoff mode. **Code alone is not a handoff.**

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, recorded in the design doc.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/handoff.md`
- `~/.product-design-partner/design-data/templates/handoff-template.md`
- `~/.product-design-partner/design-data/references/hardening.md`

Design to spec: $ARGUMENTS

Steps:
1. Copy the template into the project's working directory; fill EVERY section in order — never freeform.
2. Every value is a token or exact number; every interaction has trigger/transition/duration/easing/keyboard/focus order (values from `~/.product-design-partner/design-data/references/motion.md` tables).
3. State matrix complete per screen — no empty cells (behavior, or explicit out-of-scope with reason).
4. Accessibility as testable requirements; data contract with a realistic sample payload.
5. Production-readiness section (template §9) as testable statements — extreme inputs, error UX per failure type, i18n, interruption tests, loading ladder, empty-state anatomy (hardening.md).
6. Rationale section explains the 3+ most consequential decisions (alternatives considered, why this one).
7. Close with open questions (with owners) and explicit out-of-scope items.

Save to the project's working directory (`handoff.md`), referenced by path.
