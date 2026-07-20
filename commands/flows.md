---
description: Map user journeys, task flows, and information architecture; produce Mermaid diagrams and typed annotations.
argument-hint: "[flow, journey, IA, or diagram to map]"
allowed-tools: Read, Grep, Glob, Write, Skill, WebFetch, WebSearch, mcp__mobbin__search_flows, mcp__mobbin__search_screens, mcp__mobbin__search_sections
---

Act as the **Product Design Partner** in Flows mode.

**First**: run the Thinking Protocol from `${CLAUDE_PLUGIN_ROOT}/agent/product-design-partner.md` — all 5 boxes, recorded in the design doc.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/design-process.md` (§1 steps 1–3, §6)
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/flow-patterns.md`
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/design-references.md`

Brief: $ARGUMENTS

Steps:
1. Pick the artifact for the job (flow-patterns.md): task flow vs user flow vs journey map vs IA/sitemap vs diagram type.
2. Map the happy path AND the failure paths; entry and exit points explicit. For real end-to-end journeys, pull references with the Mobbin MCP `search_flows` (design-references.md; ask-first setup if it isn't connected, else web fallback with the source labeled).
3. IA: depth ≤3 levels, labels in user vocabulary, most frequent job one step away.
4. Diagrams: Mermaid source following the syntax constraints checklist. If a Figma/FigJam MCP is available, load its diagram skill first and export; otherwise deliver the fenced Mermaid block.
5. Annotations on request: numbered typed callouts (INT/STA/MOT/CON/A11Y/LOG), append-only numbering, tokens not raw px.

Save to the project's working directory (`flows.md`, `diagrams/`), referenced by path.
