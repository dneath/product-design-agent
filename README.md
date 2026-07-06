# Product Design Partner

A **senior product designer who codes**, packaged as portable instructions for LLM coding agents —
Claude Code, Cursor, Codex, and OpenCode, plus a paste-anywhere prompt for everything else.

Not a code generator with taste bolted on: before any pixels or code it runs a mandatory
**Thinking Protocol** — restate the problem (user, job-to-be-done, success, constraints), state
what's NOT being asked, name the riskiest assumptions, propose 2–3 approaches with tradeoffs, and
commit to a rationale for every decision.

## What it does

| Command | Capability |
|---|---|
| `/design` | Screen/flow design end-to-end: context → flows → IA → wireframe → visual, full state matrix, built-in WCAG AA. Converts sketches/screenshots too. |
| `/prototype` | 2–4 structurally distinct **interactive React variants** in one tab-switchable app, realistic data, browser-verified with screenshots — then you pick. |
| `/brainstorm` | Diverge-then-converge ideation: ≥10 ideas, clustered, scored on explicit criteria, options table + recommendation. |
| `/critique` | Heuristic + accessibility review — Nielsen's 10 + craft heuristics, severity-rated findings with evidence. |
| `/design-system` | Audit-and-adopt an existing system, or create one token-first (primitives → semantic → component, 1:1 naming, theming). |
| `/handoff` | Complete developer spec from a reusable template: states, interactions, tokens, data contract, rationale. |
| `/deck` | HTML/React presentation decks: context → problem → constraints → explorations (incl. rejected) → recommendation → evidence → next steps. |
| `/research` | Research plans, interviews, synthesis with confidence labels, JTBD, idea → concept validation. |
| `/flows` | User journeys, task flows, IA, Mermaid diagrams, typed annotations. |
| `/figma-export` | Push designs/tokens into Figma via MCP (with a no-MCP fallback bundle). |

## Design stance

- **No locked-in brand — ever.** Styling resolves from context: existing repo tokens → Figma
  variables → your specification → only then a neutral fallback (monochrome OKLCH, 4px spacing,
  Inter + Fragment Mono). Working in your codebase, it adopts *your* conventions.
- **Structure before polish.** Visual design never precedes flows and information architecture.
- **Variants, not takes.** New UI always arrives as 2–4 genuinely different directions you can
  flip between live.
- **Evidence before assertions.** "Verified" means screenshots on disk; anything else is labeled
  UNVERIFIED with exact run instructions.

## How it's built

```
agent/product-design-partner.md   entry file: identity + Thinking Protocol + routing table
agent/modules/                    9 single-concern modules (~50–150 lines each)
design-data/references/           styling, heuristics, flow patterns, research methods, brainstorm techniques
design-data/templates/            handoff template · deck template
design-data/projects/             your workspace (gitignored)
commands/ + agents/ + hooks/      Claude Code interface (canonical)
opencode/ cursor/ codex/          generated per-harness variants (scripts/sync-*.mjs)
prompts/goal-mode.md              ≤4000-byte portable prompt for any LLM
scripts/dev-server.mjs            project-scoped dev-server check/start/stop
```

Short, single-purpose files with routing summaries keep weaker models (Sonnet-class) reliable; no
harness feature is load-bearing — sub-agents, browser tools, and Figma MCP are all "use if
available, degrade honestly if not".

## Install

```bash
git clone https://github.com/Syclipse/product-design-agent && cd product-design-agent

./install.sh --target claude    # Claude Code  (or: /plugin → add this repo — enables the hook)
./install.sh --target cursor    # Cursor
./install.sh --target codex     # Codex
./install.sh --target opencode  # OpenCode
```

Any other LLM: paste `prompts/goal-mode.md` into its system-prompt/instructions field.

Full walkthroughs, verification steps, and troubleshooting: **[docs/install.md](docs/install.md)**.

## Uninstall

```bash
./uninstall.sh --target all        # removes everything the installer created (v2 and legacy v1.x)
./uninstall.sh --target all --purge  # also deletes generated design output + the bundle
```

`--dry-run` previews. Your `design-data/projects/` work is preserved unless you `--purge`.

## Repo docs

- [docs/install.md](docs/install.md) — per-platform install/uninstall + troubleshooting
- [docs/architecture.md](docs/architecture.md) — how the pieces fit, how to extend, release checklist
- [MIGRATION.md](MIGRATION.md) — v1.x → v2.0: what was deleted, kept, renamed, and why
- [examples/](examples/) — prompts to try
- [CHANGELOG.md](CHANGELOG.md)

## Development

```bash
./scripts/test.sh                 # smoke tests: syntax, counts, budgets, sync, hook, install roundtrip
node scripts/sync-commands.mjs    # regenerate opencode/cursor/codex commands after editing commands/
node scripts/sync-agents.mjs      # regenerate cursor/agents after editing agents/
```

MIT licensed.
