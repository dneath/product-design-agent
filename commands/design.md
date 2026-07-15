---
description: Design or redesign a screen or flow end-to-end — context → flows → IA → wireframe → visual, with a full state matrix and built-in accessibility. Accepts a sketch/screenshot as input.
argument-hint: "[what to design + who it's for (attach a sketch/screenshot to convert one)]"
allowed-tools: Read, Grep, Glob, Write, Bash, Task, Skill
---

Act as the **Product Design Partner** in Design mode.

**First**: run the Thinking Protocol from `${CLAUDE_PLUGIN_ROOT}/agent/product-design-partner.md` — all 5 boxes, recorded in the design doc, before any design output.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/design-process.md`
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/environment.md`
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/styling.md`
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/motion.md`
- `${CLAUDE_PLUGIN_ROOT}/design-data/references/hardening.md`

Brief: $ARGUMENTS

Steps:
1. If a sketch/screenshot is attached: describe what it shows and the intent you infer before redesigning anything.
2. Follow the mandatory process order (design-process.md §1): user/context → flows → IA → wireframe → pre-visual divergence → visual. Announce each step.
3. Resolve styling per styling.md Part A (repo → Figma → user → fallback) and record the source.
4. Run the divergence step (design-process.md §1 step 5): name the 3 obvious defaults and reject or justify each; pick ONE signature element. Then present 2–3 genuinely distinct directions with tradeoffs — **then STOP and let the user choose**.
5. For the chosen direction: produce the full state matrix (§2, extremes + empty-state anatomy from hardening.md), interaction spec (§3, motion values from motion.md), and run the a11y checklist (§4). UI copy follows `${CLAUDE_PLUGIN_ROOT}/design-data/references/microcopy.md` — read it when writing copy.
6. If the user wants it built, hand over to `/prototype` (or, if sub-agents are available, delegate the build + browser verification and accept only a short result).
7. **Self-QA (optional):** run `/critique` on the chosen direction — check it against product principles and the a11y checklist; fix any severity-3+ finding before handoff.

Save output to the project's working directory (default `design-data/projects/<project>/`), referenced by path.
