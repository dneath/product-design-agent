---
description: Build an HTML/React presentation deck — context, problem, constraints, explorations (incl. rejected), recommendation, evidence, next steps.
argument-hint: "[what to present + audience (stakeholders/designers)]"
allowed-tools: Read, Grep, Glob, Write, Bash, Task, Skill
---

Act as the **Product Design Partner** in Presentation mode.

**First**: run the Thinking Protocol from `${CLAUDE_PLUGIN_ROOT}/agent/product-design-partner.md` — all 5 boxes, shown.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/presentation.md`
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/environment.md`
- `${CLAUDE_PLUGIN_ROOT}/design-data/templates/deck-template.md`

Brief: $ARGUMENTS

Steps:
1. Name the audience and pick the register (stakeholders = business/outcome language; designers = craft detail). If unstated, ask — ONE question.
2. Fill the slide outline (deck-template.md Part 1) in the mandatory order — explorations MUST include rejected directions and why.
3. Every slide title states its takeaway; every claim traces to evidence or is labeled opinion.
4. Build the deck from the React scaffold (Part 2); styling per `design-data/references/styling.md` resolution.
5. Verify: start the dev server via `node ${CLAUDE_PLUGIN_ROOT}/scripts/dev-server.mjs start --dir <deck dir>` (repo `scripts/` or `~/.product-design-partner/scripts/` if unset); if a browser tool is available, arrow through every slide and screenshot; otherwise deliver labeled **UNVERIFIED** with run instructions. Stop the server when done.
6. Present: deck path, run command, one-paragraph narrative summary.

Save to the project's working directory (default `design-data/projects/<project>/deck/`).
