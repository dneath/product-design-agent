---
description: Annotate a design (numbered, typed callouts + redlines) and write up the UX rationale.
agent: product-design-partner
---

<!-- GENERATED from commands/annotate.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in UX Annotations & Write-ups mode. Annotate the non-obvious; argue from evidence.

Read for method (paths relative to your OpenCode config dir, `~/.config/opencode/`):
- `agents/product-design-partner/modules/workflows.md` → §17 UX Annotations & Write-ups
- `design-data/references/annotation-guide.md`

Target: $ARGUMENTS

Steps:
1. Pick the artifact: annotation layer, redline spec, rationale write-up — or annotations + write-up together (the default).
2. Walk the design; tag every element whose behavior, states, motion, content rules, a11y treatment, or logic is not self-evident.
3. Annotate with numbered, typed callouts — `A1 [INT|STA|MOT|CON|A11Y|LOG] — behavior statement` — on a numbered region map. Behavior under condition, never appearance. Numbering is append-only across iterations.
4. Coverage rule: every interactive element gets INT + STA + A11Y before handoff.
5. Redlines reference tokens (`spacing-md`), never raw-only values; cover spacing, type roles, hit areas, breakpoints.
6. Write the rationale as decision records (D#): decision → evidence → alternatives rejected → trade-off accepted → falsifiable success signal. Cross-link annotations to decisions.

Save to `design-data/projects/<project>/annotations.md` + `ux-rationale.md`.
