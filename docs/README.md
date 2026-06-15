# Documentation

Product Design Partner — find the right doc for your role.

## Designers (start here)

| Doc | Best for | Time |
|-----|----------|------|
| **[Quick start for designers](designer-quick-start.md)** | First day; pick your platform | 10 min |
| **[Handoff guide](handoff-guide.md)** | Team onboarding + rollout | 20 min |
| **[Workflows by task](workflows-by-task.md)** | Which `/command` do I use? | 5 min |
| **[Quality gates (plain English)](quality-gates-for-designers.md)** | Why Who/What/Feel | 10 min |
| **[Troubleshooting](troubleshooting-for-designers.md)** | By platform | 5 min |

### Install on macOS (detailed per platform)

| Platform | Guide |
|----------|--------|
| **[Claude Code](installation-claude-code-macos.md)** | Plugin, subagents, hook, verify |
| **[Cursor](installation-cursor-macos.md)** | Commands, project rule, agents |
| **[Codex](installation-codex-macos.md)** | Prompts, AGENTS.md, fresh tasks |
| **[OpenCode](installation-opencode-macos.md)** | Agent, plugin auto-gates |
| [macOS hub](installation-macos.md) | Shared prerequisites |
| [All platforms](installation.md) | Linux, Windows, manual, compare |

## Daily reference

| Doc | Purpose |
|-----|---------|
| [Workflows by task](workflows-by-task.md) | Commands → design jobs |
| [Workflow index (technical)](workflows.md) | § numbers, output filenames |
| [Saving project files](../design-data/projects/README.md) | Where specs live |
| [Ban list](../design-data/references/ban-list.md) | Patterns the agent avoids |

## Maintainers

| Doc | Purpose |
|-----|---------|
| [Architecture](architecture.md) | Modules, plugins, sync |
| [Contributing](contributing.md) | Extend workflows |
| [Platform adaptation](../agent/modules/platform-adaptation.md) | Per-LLM behavior |
| [Changelog](../CHANGELOG.md) | Version history |

## Verify install

```bash
./scripts/test.sh
```

In your app: `/interface` with a specific brief → 2–3 layout directions.

## Paths after install

| Platform | Commands | Identity |
|----------|----------|----------|
| Claude Code | `~/.claude/commands/` | `~/.claude/agents/` + plugin |
| Cursor | `~/.cursor/commands/` | project `.cursor/rules/` |
| Codex | `~/.codex/prompts/` | `~/.codex/AGENTS.md` |
| OpenCode | `~/.config/opencode/command/` | `@product-design-partner` |

Shared bundle (Claude/Cursor/Codex): `~/.product-design-partner/`

Your work (gitignored): `design-data/projects/` on your machine
