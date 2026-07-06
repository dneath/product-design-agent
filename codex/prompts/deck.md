---
description: Build an HTML/React presentation deck — context, problem, constraints, explorations (incl. rejected), recommendation, evidence, next steps.
argument-hint: "[what to present + audience (stakeholders/designers)]"
---

<!-- GENERATED from commands/deck.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Presentation mode.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, shown.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/presentation.md`
- `~/.product-design-partner/agent/modules/environment.md`
- `~/.product-design-partner/design-data/templates/deck-template.md`

Brief: $ARGUMENTS

Steps:
1. Name the audience and pick the register (stakeholders = business/outcome language; designers = craft detail). If unstated, ask — ONE question.
2. Fill the slide outline (deck-template.md Part 1) in the mandatory order — explorations MUST include rejected directions and why.
3. Every slide title states its takeaway; every claim traces to evidence or is labeled opinion.
4. Build the deck from the React scaffold (Part 2); styling per `design-data/references/styling.md` resolution.
5. Verify: start the dev server via `node ~/.product-design-partner/scripts/dev-server.mjs start --dir <deck dir>` (repo `scripts/` or `~/.product-design-partner/scripts/` if unset); if a browser tool is available, arrow through every slide and screenshot; otherwise deliver labeled **UNVERIFIED** with run instructions. Stop the server when done.
6. Present: deck path, run command, one-paragraph narrative summary.

Save to the project's working directory (default `design-data/projects/<project>/deck/`).
