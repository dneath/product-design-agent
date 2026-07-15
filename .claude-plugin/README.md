# Claude Code plugin — Product Design Partner

This directory holds the Claude Code plugin manifest. Components are discovered by convention from
the repo root when you add this repository as a plugin (`/plugin`).

## Component map

| Component | Path | Purpose |
|-----------|------|---------|
| Commands | `../commands/*.md` | 7 slash commands (design, prototype, brainstorm, critique, handoff, research, flows) |
| Agents | `../agents/*.md` | 3 subagents — router + 2 heavy-workflow specialists |
| Hooks | `../hooks/hooks.json` | UserPromptSubmit intent nudge |
| Hook script | `../hooks/inject-design-context.mjs` | Routes design prompts to slash commands + the Thinking Protocol |
| Entry file | `../agent/product-design-partner.md` | Identity, Thinking Protocol, routing table |
| Modules | `../agent/modules/` | 7 single-concern method modules |
| References & templates | `../design-data/` | Styling, heuristics, methods, handoff template |

### Subagents

| Agent | Use for |
|-------|---------|
| `product-design-partner` | Routing, light workflows, ambiguous scope |
| `design` | Screen/flow design, deep critique |
| `prototype-variants` | 2–4 interactive React variants in one app, browser-verified |

Rules live in the entry file and modules — subagents read those files; they do not duplicate them.

## Install

1. In Claude Code: `/plugin` → add this repository.
2. Verify: `/design` autocompletes; typing "design a dashboard" triggers the hook nudge; subagents
   appear in the agent picker.

## Manifest

`plugin.json` carries name, version, and metadata only. Claude Code resolves commands, hooks, and
agents from repo layout — do not add speculative manifest keys that break discovery.

Repository: https://github.com/Syclipse/product-design-agent
