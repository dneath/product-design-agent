# Claude Code plugin — Product Design Partner

This directory holds the Claude Code plugin manifest. Components are discovered by convention from the repo root when you add this repository as a plugin (`/plugin`).

## Component map

| Component | Path | Purpose |
|-----------|------|---------|
| Commands | `../commands/*.md` | 16 slash commands (interface, audit, brainstorm, …) |
| Agents | `../agents/*.md` | 4 subagents — generalist + 3 heavy-workflow specialists |
| Hooks | `../hooks/hooks.json` | UserPromptSubmit intent nudge |
| Hook script | `../hooks/inject-design-context.mjs` | Routes design prompts to slash commands |
| Router | `../agent/product-design-partner.md` | Full operating manual |
| References | `../design-data/references/` | Playbooks |

### Subagents

| Agent | Use for |
|-------|---------|
| `product-design-partner` | Routing, light workflows, ambiguous scope |
| `interface-design` | Dashboards, admin panels, gated UI (workflows §3) |
| `prototype-variants` | 2–3 interactive React variants in one app, browser-verified (workflows §15) |
| `figma-export` | Push gated design to Figma (workflows §13) |

Gate rules live in `agent/modules/quality-gates.md` and `workflows.md` — subagents read those files; they do not duplicate gates.

## Install

1. In Claude Code: `/plugin` → add this repository.
2. Verify: `/interface` autocompletes; typing "design a dashboard" triggers the hook nudge; subagents appear in the agent picker.

## Manifest

`plugin.json` carries name, version, and metadata only. Claude Code resolves commands, hooks, and agents from repo layout — do not add speculative manifest keys that break discovery.

Repository: https://github.com/Syclipse/product-design-agent
