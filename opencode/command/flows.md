---
description: Map user journeys, task flows, and information architecture; produce Mermaid diagrams and typed annotations.
agent: product-design-partner
---

<!-- GENERATED from commands/flows.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Flows mode.

**First**: run the Thinking Protocol from `agents/product-design-partner.md` — all 5 boxes, recorded in the design doc.

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `product-design-partner/modules/design-process.md` (§1 steps 1–3, §6)
- `design-data/references/flow-patterns.md`

Brief: $ARGUMENTS

Steps:
1. Pick the artifact for the job (flow-patterns.md): task flow vs user flow vs journey map vs IA/sitemap vs diagram type.
2. Map the happy path AND the failure paths; entry and exit points explicit.
3. IA: depth ≤3 levels, labels in user vocabulary, most frequent job one step away.
4. Diagrams: Mermaid source following the syntax constraints checklist. If a Figma/FigJam MCP is available, load its diagram skill first and export; otherwise deliver the fenced Mermaid block.
5. Annotations on request: numbered typed callouts (INT/STA/MOT/CON/A11Y/LOG), append-only numbering, tokens not raw px.

Save to the project's working directory (`flows.md`, `diagrams/`), referenced by path.
