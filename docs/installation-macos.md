# macOS Installation Guide

Complete install instructions for **macOS Sonoma and later** (Intel and Apple Silicon). For the full onboarding path, read **[Designer handoff guide](handoff-guide.md)** first.

## Prerequisites

### 1. Xcode Command Line Tools (git, make)

```bash
xcode-select --install
```

### 2. Node.js 18+ (for the standalone validator)

**Homebrew (recommended):**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
node --version   # should be v18+
```

**Alternative:** download the LTS installer from [nodejs.org](https://nodejs.org/).

### 3. Clone the repository

```bash
git clone https://github.com/YOUR_ORG/product-design-agent.git
cd product-design-agent
chmod +x install.sh scripts/test.sh
```

## One-command install

The installer auto-detects your environment (`~/.cursor`, `~/.claude`, `~/.codex`, or `~/.config/opencode`):

```bash
./install.sh --yes
```

Or pick a target explicitly:

```bash
./install.sh --target cursor --yes    # Cursor IDE
./install.sh --target claude --yes    # Claude Code CLI
./install.sh --target codex --yes     # OpenAI Codex CLI
./install.sh --target opencode --yes  # OpenCode
```

`--yes` skips the confirmation prompt (useful for scripts and CI).

## macOS install paths

| Platform | What gets installed | Path |
|----------|---------------------|------|
| **Cursor** | Slash commands | `~/.cursor/commands/` |
| | Global rule (optional) | `~/.cursor/rules/product-design-partner.mdc` |
| | Full bundle | `~/.product-design-partner/` |
| **Claude Code** | Commands + subagent | `~/.claude/commands/`, `~/.claude/agents/` |
| | Plugin (preferred) | Add repo via `/plugin` in Claude Code |
| | Bundle | `~/.product-design-partner/` |
| **Codex** | Custom prompts | `~/.codex/prompts/` |
| | Global instructions | `~/.codex/AGENTS.md` |
| | Bundle | `~/.product-design-partner/` |
| **OpenCode** | Agent + plugins + commands | `~/.config/opencode/` |

All platforms share the bundle layout:

```
~/.product-design-partner/
├── agent/product-design-partner.md
├── agent/modules/
├── design-data/references/
└── plugins/design-validator.mjs
```

## Per-app setup on Mac

### Cursor

1. Run `./install.sh --target cursor --yes`
2. **Attach the rule to your project** (recommended):

   ```bash
   mkdir -p /path/to/your/project/.cursor/rules
   cp cursor/rules/product-design-partner.mdc /path/to/your/project/.cursor/rules/
   ```

3. In Cursor, type `/interface` (or any of the 16 commands) and describe your task.
4. **Figma MCP** (optional): Cursor → Settings → MCP → add server URL `https://mcp.figma.com/mcp`

### Claude Code

**Plugin (recommended):**

1. In Claude Code, run `/plugin` and add this repository.
2. Enables 16 commands, the subagent, and the UserPromptSubmit hook.

**Personal directories:**

```bash
./install.sh --target claude --yes
```

Then use `/prototype`, `/research`, etc.

### Codex

```bash
./install.sh --target codex --yes
```

If you already have `~/.codex/AGENTS.md`:

```bash
cat codex/AGENTS.md >> ~/.codex/AGENTS.md
```

Configure Figma MCP in `~/.codex/config.toml`:

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
```

### OpenCode

```bash
./install.sh --target opencode --yes
opencode
@product-design-partner Help me design a dashboard
```

OpenCode runs automatic gate validation via the plugin.

## Verify installation

```bash
./scripts/test.sh
```

Manual validator check:

```bash
node ~/.product-design-partner/plugins/design-validator.mjs examples/dashboard-design.md
```

## Environment override

Point all plugins and validators at a custom data directory:

```bash
export DESIGN_DATA_DIR="$HOME/my-design-data"
```

Add to `~/.zshrc` or `~/.bash_profile` to persist.

## macOS troubleshooting

### `permission denied` on install.sh

```bash
chmod +x install.sh scripts/test.sh
```

### Node not found after Homebrew on Apple Silicon

Ensure Homebrew is on your PATH (installer prints the lines to add to `~/.zprofile`):

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Cursor commands don't appear

- Restart Cursor after install.
- Check files exist: `ls ~/.cursor/commands/interface.md`
- Project-level commands: copy into `<project>/.cursor/commands/`

### Claude Desktop vs Claude Code

This agent targets **Claude Code** (`~/.claude/`). Claude Desktop custom instructions are separate; paste `prompts/goal-mode.md` or load `agent/product-design-partner.md` manually.

### Gate validation on Cursor/Codex

Plugins do not run automatically. The rule/AGENTS.md enforces gates by instruction. Validate artifacts with:

```bash
node plugins/design-validator.mjs your-output.md
```

## Uninstall (macOS)

```bash
rm -rf ~/.product-design-partner
rm -f ~/.cursor/commands/{interface,prototype,brainstorm,diagram,annotate,mentor,research,strategy,ux-flows,ux-audit,design-converter,figma-export,portfolio,critique,handoff,design-system}.md
rm -f ~/.cursor/rules/product-design-partner.mdc
rm -f ~/.claude/commands/*.md   # review before deleting — may include other commands
rm -f ~/.codex/prompts/{interface,prototype,brainstorm,diagram,annotate,mentor,research,strategy,ux-flows,ux-audit,design-converter,figma-export,portfolio,critique,handoff,design-system}.md
rm -rf ~/.config/opencode/agents/product-design-partner*
```

## Next steps

- [Designer handoff guide](handoff-guide.md)
- [Documentation index](README.md)
- [Installation Guide](installation.md) — all platforms
- [Architecture](architecture.md) — how modules and plugins connect
- [Workflow Reference](workflows.md) — all 17 workflows
