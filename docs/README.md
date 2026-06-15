# Documentation

Product Design Partner v1.3 — documentation index for designers, design leads, and maintainers.

## Start here (designers)

| Doc | Who it's for | Time |
|-----|--------------|------|
| **[Designer handoff guide](handoff-guide.md)** | New team members receiving this repo | 15 min |
| **[Getting started](../examples/getting-started.md)** | First prompts and expected output | 10 min |
| **[Installation](installation.md)** | Install on your machine | 10 min |
| **[macOS installation](installation-macos.md)** | Mac-specific paths and Homebrew setup | 5 min |

## Daily use

| Doc | Purpose |
|-----|---------|
| **[Workflow reference](workflows.md)** | All 17 workflows + slash commands |
| **[Quality gates](../agent/modules/quality-gates.md)** | Intent, domain, validation, variance, ban list |
| **[Product design process](../design-data/references/product-design-process.md)** | Double Diamond, phase routing, artifact chain |
| **[Brand identity](../design-data/references/brand-identity.md)** | Typography, color, motion (agent demo system) |
| **[Ban list](../design-data/references/ban-list.md)** | Patterns the agent refuses (and why) |

## Platform setup

| Doc | Platform |
|-----|----------|
| [AGENTS.md](../AGENTS.md) | Repo-root identity for Cursor/Codex clone workflows |
| [Installation](installation.md) | All platforms |
| [macOS installation](installation-macos.md) | macOS (Intel & Apple Silicon) |
| [Platform adaptation](../agent/modules/platform-adaptation.md) | Cursor, Claude Code, Codex, OpenCode, generic LLMs |
| [Goal-mode prompt](../prompts/README.md) | Single-field system prompt (≤4000 chars) |

## For maintainers

| Doc | Purpose |
|-----|---------|
| [Architecture](architecture.md) | How modules, plugins, and data connect |
| [Contributing](contributing.md) | Extend workflows, gates, and references |
| [Changelog](../CHANGELOG.md) | Version history |
| [v1.2 design spec](superpowers/specs/2026-06-10-design-agent-v1.2-design.md) | Original enhancement design notes |

## Verify your install

```bash
./scripts/test.sh
```

## Repo map (what to read, what to ignore)

| Path | Commit to git? | Notes |
|------|----------------|-------|
| `agent/` | Yes | Router + modules — the brain |
| `commands/` | Yes | Canonical slash commands (edit these) |
| `cursor/`, `codex/`, `opencode/command/` | Yes | Generated — run `node plugins/sync-commands.mjs` after editing `commands/` |
| `design-data/references/` | Yes | Shared playbooks and ban list |
| `design-data/projects/` | No (except README) | Your deliverables — gitignored |
| `plugins/` | Yes | Validator and OpenCode plugin |
| `examples/` | Yes | Sample prompts and outputs |
