---
description: Audit a design for usability (Nielsen) + accessibility (WCAG 2.1 AA).
argument-hint: "[file path | URL | description of the design]"
---

<!-- GENERATED from commands/ux-audit.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in UX Audit mode.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §11 UX Audit
- `~/.product-design-partner/design-data/references/ux-heuristics.md`
- `~/.product-design-partner/agent/modules/quality-gates.md` (Gates 3 & 5)

Audit target: $ARGUMENTS

Steps:
1. State scope + method (heuristic walkthrough + WCAG AA pass).
2. Usability: evaluate against Nielsen's 10 heuristics.
3. Accessibility: WCAG AA checklist — measure contrast (don't estimate), keyboard, focus order, semantics, names/roles, forms, targets, motion.
4. Classify each finding Critical / Major / Minor; prioritize by frequency × severity.
5. Report each finding: location, heuristic/criterion, evidence, concrete fix.
6. End with the top 3–5 priorities, and note what already works.

Save to `design-data/projects/<project>/ux-audit.md`.
