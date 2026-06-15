# macOS Installation Guide

Install **Product Design Partner** on **macOS Sonoma and later** (Intel and Apple Silicon) for **Claude Code, Cursor, Codex, or OpenCode**.

Pick the guide that matches **your AI tool** — each platform has its own detailed walkthrough:

| Platform | Detailed guide | Best for |
|----------|----------------|----------|
| **Claude Code** | **[Claude Code on macOS](installation-claude-code-macos.md)** | Terminal workflow, plugin + subagents + hook |
| **Cursor** | **[Cursor on macOS](installation-cursor-macos.md)** | IDE chat, project rules, design teams |
| **Codex** | **[Codex on macOS](installation-codex-macos.md)** | OpenAI Codex CLI, global AGENTS.md |
| **OpenCode** | **[OpenCode on macOS](installation-opencode-macos.md)** | Automatic gate enforcement via plugin |

**Designers:** [Quick start for designers](designer-quick-start.md) · [Handoff guide](handoff-guide.md)  
**All OS / manual paths:** [Installation (all platforms)](installation.md)

---

## Shared prerequisites (all platforms)

Do these once before any platform-specific install.

### 1. Xcode Command Line Tools

```bash
xcode-select --install
```

Provides `git` and build tools.

### 2. Node.js 18+ (validator + OpenCode plugins)

```bash
brew install node
node --version   # v18+
```

Or download LTS from [nodejs.org](https://nodejs.org/).

**Note:** Claude Code’s native installer does not require Node for Claude itself — Node is still needed for `design-validator.mjs` and OpenCode.

### 3. Clone the repository

```bash
git clone https://github.com/Syclipse/product-design-agent.git
cd product-design-agent
chmod +x install.sh scripts/test.sh
```

---

## One-command install (by platform)

Run **one** of these from the cloned repo:

```bash
./install.sh --target claude --yes     # Claude Code
./install.sh --target cursor --yes     # Cursor
./install.sh --target codex --yes      # Codex
./install.sh --target opencode --yes   # OpenCode
```

Auto-detect (if you already have `~/.claude`, `~/.cursor`, etc.):

```bash
./install.sh --yes
```

Then complete **platform-specific steps** in the linked guide above (e.g. Cursor project rule, Claude Code plugin via `/plugin`).

---

## Where files land on Mac

| Platform | Commands / prompts | Identity | Bundle / data |
|----------|-------------------|----------|---------------|
| **Claude Code** | `~/.claude/commands/` | `~/.claude/agents/` + plugin hook | `~/.product-design-partner/` |
| **Cursor** | `~/.cursor/commands/` | `.cursor/rules/*.mdc` per project | `~/.product-design-partner/` |
| **Codex** | `~/.codex/prompts/` | `~/.codex/AGENTS.md` | `~/.product-design-partner/` |
| **OpenCode** | `~/.config/opencode/command/` | `@product-design-partner` agent | `~/.config/opencode/design-data/` |

Shared bundle layout (Claude / Cursor / Codex):

```
~/.product-design-partner/
├── agent/product-design-partner.md
├── agent/modules/
├── agents/                    # subagent stubs (Claude personal install)
├── design-data/references/
└── plugins/design-validator.mjs
```

---

## Verify any install

```bash
./scripts/test.sh
node plugins/design-validator.mjs examples/dashboard-design.md
```

**In your AI app:** type `/interface` with a specific Who/What/Feel brief — expect 2–3 layout directions before polish.

---

## Gate enforcement by platform

| Platform | Enforcement |
|----------|-------------|
| **OpenCode** | Plugin blocks invalid UI automatically |
| **Claude Code** | Hook nudge + subagents + manual validator |
| **Cursor** | Project rule + manual validator |
| **Codex** | AGENTS.md + manual validator |

Details: [quality-gates-for-designers.md](quality-gates-for-designers.md)

---

## Figma MCP (optional, all platforms)

| Platform | Setup |
|----------|--------|
| **Claude Code** | `claude mcp add --transport http figma https://mcp.figma.com/mcp` |
| **Cursor** | Settings → MCP → `https://mcp.figma.com/mcp` |
| **Codex** | `[mcp_servers.figma]` in `~/.codex/config.toml` |
| **OpenCode** | Figma server in OpenCode MCP config |

Without MCP, `/figma-export` still returns token JSON + manual build specs.

---

## macOS troubleshooting (all platforms)

### `permission denied` on install.sh

```bash
chmod +x install.sh scripts/test.sh
```

### Node not found after Homebrew (Apple Silicon)

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Add that line to `~/.zprofile` if needed.

### Claude Desktop vs Claude Code

This agent targets **Claude Code** (`claude` in Terminal). Claude Desktop uses separate custom instructions — paste `prompts/goal-mode.md` manually if needed.

### Still stuck?

[troubleshooting-for-designers.md](troubleshooting-for-designers.md)

---

## Next steps

- [Documentation index](README.md)
- [Workflows by task](workflows-by-task.md)
- [Architecture](architecture.md) (maintainers)
