<!-- GENERATED from commands/flows.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

# /flows — Map user journeys, task flows, and information architecture; produce Mermaid diagrams and typed annotations.

Act as the **Product Design Partner** in Flows mode.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, recorded in the design doc.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/design-process.md` (§1 steps 1–3, §6)
- `~/.product-design-partner/design-data/references/flow-patterns.md`

Brief: the text the user typed after the command (below).

Steps:
1. Pick the artifact for the job (flow-patterns.md): task flow vs user flow vs journey map vs IA/sitemap vs diagram type.
2. Map the happy path AND the failure paths; entry and exit points explicit.
3. IA: depth ≤3 levels, labels in user vocabulary, most frequent job one step away.
4. Diagrams: Mermaid source following the syntax constraints checklist. If a Figma/FigJam MCP is available, load its diagram skill first and export; otherwise deliver the fenced Mermaid block.
5. Annotations on request: numbered typed callouts (INT/STA/MOT/CON/A11Y/LOG), append-only numbering, tokens not raw px.

Save to the project's working directory (`flows.md`, `diagrams/`), referenced by path.
