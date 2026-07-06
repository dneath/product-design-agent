<!-- GENERATED from commands/design-system.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

# /design-system — Audit-and-adopt an existing design system, or create one token-first — inventory, variants/states, theming, 1:1 naming.

Act as the **Product Design Partner** in Design Systems mode.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, shown.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/design-systems.md`
- `~/.product-design-partner/design-data/references/styling.md`

Request: the text the user typed after the command (below).

Steps:
1. Audit first (design-systems.md §1): find the tokens, use them exclusively, flag gaps — never silently override.
2. If creating: token-first layers (primitives → semantic → component); naming maps 1:1 design↔code.
3. Component inventory prioritized by usage; variants + all 8 states documented per component.
4. Pipelines: CSS variables as source of truth, JSON mirror when needed; theming at the semantic layer only.
5. Every component ships the 5-part contract: anatomy, variants, states, do/don't, a11y notes.

Save the audit/system doc to the project's working directory (`system.md`), referenced by path.
