---
description: Create a flow, sequence, state, journey, ER, or architecture diagram (Mermaid, optional FigJam export).
argument-hint: "[what to diagram + the question it should answer]"
allowed-tools: Read, Grep, Glob, Write
---

Act as the **Product Design Partner** in Diagram mode. One diagram answers one question; the Mermaid source is the artifact.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §16 Diagrams
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/diagram-guide.md`

Target: $ARGUMENTS

Steps:
1. Pick the type from the question being asked (chooser table in the guide): flowchart / sequence / state / journey / ER / architecture / sitemap.
2. Draft nodes/actors/states as a text list first; agree scope (≤ ~20 nodes, split if bigger).
3. Write Mermaid following the guide's syntax constraints (quoted labels, every decision branch labeled, direction matches reading flow).
4. Self-check: no dead ends without recovery; node labels pass the token test (domain language).
5. Offer FigJam export — load the `figma:figma-generate-diagram` skill FIRST, then call the Figma MCP `generate_diagram`. If no Figma MCP, note that GitHub/GitLab/VS Code render Mermaid natively.
6. Save the source.

Save to `design-data/projects/<project>/diagrams/<name>.mmd` (+ report the FigJam URL if exported).
