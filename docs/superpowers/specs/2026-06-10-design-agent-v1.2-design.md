# Product Design Partner v1.2 — Audit & Enhancement Design

Date: 2026-06-10
Goal: Greatly improve brainstorming, UX, user research, prototyping (2–3 variants per new UI), diagrams, Figma export, and UX write-ups/annotations. Make the suite compatible with Claude Code, Cursor, Codex, and OpenCode.

## Audit Findings

### What works (keep)
- Modular router architecture (core agent + 5 modules + references) keeps context small.
- 5 quality gates with plugin/standalone enforcement; variance engine (6 vibes × 6 layouts).
- Claude Code plugin packaging (`.claude-plugin/`, `commands/`, `agents/`, `hooks/`) and OpenCode commands.
- Reference library style (compact, tool-agnostic, template-driven).

### Gaps against the goal
1. **Prototyping variants (biggest gap)**: Interface Design (§3) produces exactly one design. No protocol for generating 2–3 distinct directions, comparing them, and refining a winner. No runnable-prototype output.
2. **Diagrams**: only a one-line mention in UX Flows (§10). No diagram workflow, no Mermaid guidance, no dedicated command.
3. **UX write-ups & annotations**: absent entirely. No annotation taxonomy, redline conventions, or rationale write-up template.
4. **Brainstorming**: §4 Product Strategy lists techniques by name only; no divergence quotas, technique rotation, worked prompts, or convergence rubric. No `/brainstorm` command (the hook even routes "brainstorm" to `/strategy`).
5. **User research**: workflow exists but no concrete artifacts — discussion guide, screener, assumption map, JTBD/persona profile templates.
6. **Figma export**: solid workflow, but no per-platform MCP setup notes and no explicit fallback when MCP is absent.
7. **Platform coverage**: Claude Code + OpenCode only. **Cursor and Codex are missing** (no `.cursor/commands`, no `.cursor/rules`, no `~/.codex/prompts`, no AGENTS.md). install.sh has no cursor/codex targets, and its `claude` target points only at the macOS Claude Desktop path (useless on Linux; Claude Code uses `~/.claude`).
8. **Coherence debt**: counts ("14 workflows", "12 commands") hardcoded across README/INDEX/agent files; output paths inconsistently prefixed `.config/opencode/…` (OpenCode-specific) in portable modules; README tree typo (`product-design--agent`).

## Approaches Considered

1. **Minimal patch** — bolt variants onto §3, add two commands, hand-copy Cursor/Codex files. Fast, but four hand-maintained command sets will drift, and brainstorming/research stay shallow.
2. **Full restructure** — rewrite around a platform-neutral AGENTS.md core with per-platform build. Cleanest long-term but discards a working architecture and churns every file.
3. **Targeted enhancement (chosen)** — keep the architecture; add 3 workflows + 5 references + 4 commands; make `commands/` the single source of truth with a generator emitting OpenCode/Cursor/Codex sets; extend installer + docs; one coherence pass.

## Design

### A. Workflows (`agent/modules/workflows.md`)
- **§3 Interface Design — Variant Protocol (mandatory)**: for any *new* UI, after Gates 1–2 produce **2–3 genuinely distinct variants** (each with its own Vibe + Layout pairing from Gate 4 and its own signature element), label A/B/C, present a comparison table (intent fit, hierarchy, signature, trade-offs) plus a recommendation, let the user choose, then refine only the winner through Gates 5+3. Single-variant output allowed only when the user explicitly asks for one direction or is iterating on an already-chosen variant.
- **§15 Prototype Variants**: runnable single-file HTML/CSS (vanilla, no build step) prototypes — one file per variant — with brand fonts via system fallback note, all 8 states represented, and a selection step.
- **§16 Diagrams**: pick type (flowchart, sequence, state, journey, ER, architecture) from the question being answered → Mermaid source (validated syntax) → optional FigJam export via the Figma MCP `generate_diagram` (load `figma:figma-generate-diagram` skill first) → save source to project folder.
- **§17 UX Annotations & Write-ups**: annotation taxonomy (interaction, state, motion, content, accessibility, logic), numbered-callout conventions, redline spec format, and a UX rationale write-up template (decision → evidence → trade-off → outcome).
- **§1 User Research**: reference new `research-templates.md` (discussion guide, screener, assumption map, JTBD profile).
- **§4 Product Strategy**: divergence quota (≥15 ideas across ≥3 techniques), technique rotation, cluster → score (impact × feasibility × novelty) convergence rubric; reference `brainstorming-playbook.md`.
- Normalize output paths to portable `design-data/projects/<project>/…` (no `.config/opencode` prefix).

### B. References (`design-data/references/`)
New files, matching existing reference style (compact, templated):
- `prototype-variants-guide.md` — what makes variants *genuinely* distinct (vibe/layout/signature/IA axes, not palette swaps); comparison rubric; selection + refinement loop; single-file prototype conventions.
- `diagram-guide.md` — diagram-type chooser; Mermaid patterns per type with syntax constraints; ASCII wireframe conventions; FigJam export path.
- `annotation-guide.md` — 6 annotation types; callout numbering; redline format; UX write-up template.
- `research-templates.md` — discussion guide, screener, assumption map, JTBD/persona profile, synthesis wall.
- `brainstorming-playbook.md` — technique cards with worked one-line examples; divergence quotas; provocation prompts; convergence scoring; brainstorm anti-patterns.

### C. Commands — single source + generator
- `commands/` (Claude format) is canonical. Add `/prototype`, `/diagram`, `/annotate`, `/brainstorm` (16 total). Update `/interface` for the Variant Protocol.
- `plugins/sync-commands.mjs` transforms `commands/*.md` →
  - `opencode/command/*.md`: frontmatter `description` + `agent: product-design-partner`; module paths relative to the OpenCode install; keeps `$ARGUMENTS`.
  - `cursor/commands/*.md`: plain markdown (Cursor appends the user's typed text after the command, no `$ARGUMENTS` substitution — body says "Brief: the text following this command"); paths under `~/.product-design-partner/`.
  - `codex/prompts/*.md`: frontmatter `description` + `argument-hint`; keeps `$ARGUMENTS`; paths under `~/.product-design-partner/`.
- Generated files are committed; the generator header marks them "GENERATED — edit commands/ and re-run".

### D. Platform packaging
- `cursor/rules/product-design-partner.mdc` — always-on rule: identity, gates summary, router pointer.
- `codex/AGENTS.md` — global instruction file for `~/.codex/AGENTS.md` (same content shape as the Cursor rule).
- `install.sh`: targets `opencode | claude | cursor | codex | custom`. `claude` = Claude Code (`~/.claude/{commands,agents}` + bundle at `~/.product-design-partner`); `cursor` = `~/.cursor/commands` + `~/.cursor/rules` (global) with note for per-project `.cursor/`; `codex` = `~/.codex/prompts` + AGENTS.md merge note; cursor/codex also copy the bundle to `~/.product-design-partner/`.
- `hooks/inject-design-context.mjs`: add routes for prototype/diagram/annotate/brainstorm; retarget "brainstorm" away from `/strategy`.

### E. Coherence pass
- Router (`agent/product-design-partner.md`): capabilities list + routes for §15–§17; Variant Protocol note on §3.
- `agents/product-design-partner.md` description; `prompts/goal-mode.md` gains variants/diagrams/annotations while staying ≤4000 chars.
- `INDEX.md`, `README.md` (features, command table, tree, changelog v1.2.0), `docs/installation.md` (+Cursor/Codex), `docs/architecture.md` counts, `.claude-plugin/plugin.json` → 1.2.0.
- `plugins/product-design.js`: extend intent-trigger lists for the four new capabilities (additive only).

## Error handling / fallbacks
- Figma MCP absent → emit Mermaid/spec/token-JSON fallbacks and say exactly what to connect per platform.
- Cursor/Codex lack hooks and plugin enforcement → gates enforced by instruction (rule/AGENTS.md) + optional `design-validator.mjs`; documented honestly in installation.md.

## Testing
- `node --check` on all .js/.mjs; run generator and diff for stability; `python3 -m json.tool` on plugin.json; goal-mode `wc -c` ≤ 4000; grep for stale counts and `.config/opencode` paths in portable files; pipe sample prompts through the hook.

## Out of scope
- Rewriting `product-design.js` validation engine; OpenCode plugin ports for Cursor/Codex (no plugin API parity); marketplace publishing.
