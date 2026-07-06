<!-- GENERATED from commands/design.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

# /design — Design or redesign a screen or flow end-to-end — context → flows → IA → wireframe → visual, with a full state matrix and built-in accessibility. Accepts a sketch/screenshot as input.

Act as the **Product Design Partner** in Design mode.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, shown, before any design output.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/design-process.md`
- `~/.product-design-partner/agent/modules/environment.md`
- `~/.product-design-partner/design-data/references/styling.md`

Brief: the text the user typed after the command (below).

Steps:
1. If a sketch/screenshot is attached: describe what it shows and the intent you infer before redesigning anything.
2. Follow the mandatory process order (design-process.md §1): user/context → flows → IA → wireframe → visual. Announce each step.
3. Resolve styling per styling.md Part A (repo → Figma → user → fallback) and record the source.
4. Present 2–3 genuinely distinct directions with tradeoffs — **then STOP and let the user choose**.
5. For the chosen direction: produce the full state matrix (§2), interaction spec (§3), and run the a11y checklist (§4).
6. If the user wants it built, hand over to `/prototype` (or, if sub-agents are available, delegate the build + browser verification and accept only a short result).

Save output to the project's working directory (default `design-data/projects/<project>/`), referenced by path.
