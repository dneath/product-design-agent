# Claude Code plugin — Product Design Partner

This directory holds the Claude Code plugin manifest. Components are discovered by convention from the repo root when you add this repository as a plugin (`/plugin`).

## Component map

| Component | Path | Purpose |
|-----------|------|---------|
| Commands | `../commands/*.md` | 16 slash commands (interface, audit, brainstorm, …) |
| Agent | `../agents/product-design-partner.md` | Subagent stub |
| Hooks | `../hooks/hooks.json` | UserPromptSubmit intent nudge |
| Hook script | `../hooks/inject-design-context.mjs` | Routes design prompts to slash commands |
| Router | `../agent/product-design-partner.md` | Full operating manual |
| References | `../design-data/references/` | Playbooks and DesignPrompts JSON |

## Install

1. In Claude Code: `/plugin` → add this repository.
2. Verify: `/interface` autocompletes; typing "design a dashboard" triggers the hook nudge.

## Manifest

`plugin.json` carries name, version, and metadata only. Claude Code resolves commands, hooks, and agents from repo layout — do not add speculative manifest keys that break discovery.

Repository: https://github.com/Syclipse/product-design-agent
