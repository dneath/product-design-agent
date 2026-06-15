# Installation Guide

Install the Product Design Partner for **Claude Code**, **Cursor**, **Codex**, **OpenCode**, or a custom path.

**macOS (detailed per platform):**

| Platform | Guide |
|----------|--------|
| Claude Code | [installation-claude-code-macos.md](installation-claude-code-macos.md) |
| Cursor | [installation-cursor-macos.md](installation-cursor-macos.md) |
| Codex | [installation-codex-macos.md](installation-codex-macos.md) |
| OpenCode | [installation-opencode-macos.md](installation-opencode-macos.md) |
| Hub | [installation-macos.md](installation-macos.md) |

**Designers:** [Quick start](designer-quick-start.md) · [Handoff guide](handoff-guide.md) · [Doc index](README.md)

---

## Platform comparison

| Platform | Install command | Identity | Commands | Gate enforcement |
|----------|-----------------|----------|----------|------------------|
| **Claude Code** | `./install.sh --target claude --yes` or `/plugin` | Subagents + hook | `~/.claude/commands/` | Hook nudge + validator |
| **Cursor** | `./install.sh --target cursor --yes` | Project `.mdc` rule | `~/.cursor/commands/` | Rule + validator |
| **Codex** | `./install.sh --target codex --yes` | `~/.codex/AGENTS.md` | `~/.codex/prompts/` | AGENTS.md + validator |
| **OpenCode** | `./install.sh --target opencode --yes` | `@product-design-partner` | `~/.config/opencode/command/` | **Plugin auto-block** |

Only **OpenCode** runs automatic gate validation on every response. All platforms can run `node plugins/design-validator.mjs <file>` manually.

Full comparison: [platform-adaptation.md](../agent/modules/platform-adaptation.md)

---

## Prerequisites

| Requirement | Claude Code | Cursor | Codex | OpenCode |
|-------------|-------------|--------|-------|----------|
| AI app installed | ✓ | ✓ | ✓ | ✓ |
| git | ✓ | ✓ | ✓ | ✓ |
| Node 18+ | Optional (validator) | Optional | Optional | **Required** (plugins) |

**macOS:** [installation-macos.md](installation-macos.md) — Xcode CLT, Homebrew Node, clone repo.

---

## Quick install (all platforms)

```bash
git clone https://github.com/Syclipse/product-design-agent.git
cd product-design-agent
chmod +x install.sh scripts/test.sh

./install.sh --target claude --yes    # Claude Code
./install.sh --target cursor --yes    # Cursor
./install.sh --target codex --yes     # Codex
./install.sh --target opencode --yes  # OpenCode
./install.sh --target custom --path /your/path --yes
```

The script copies files, validates paths, and prints next steps.

---

## Claude Code

**macOS detail:** [installation-claude-code-macos.md](installation-claude-code-macos.md)

### Install Claude Code (if needed)

```bash
curl -fsSL https://claude.ai/install.sh | bash
# or: brew install --cask claude-code
```

### Install the design agent

**Plugin (recommended):**

1. Run `claude`
2. `/plugin` → add `https://github.com/Syclipse/product-design-agent`

Enables 16 commands, 4 subagents, UserPromptSubmit hook. See [.claude-plugin/README.md](../.claude-plugin/README.md).

**Script alternative:**

```bash
./install.sh --target claude --yes
```

Installs `~/.claude/commands/`, `~/.claude/agents/`, `~/.product-design-partner/`.

### Verify

- `/interface` autocompletes in Claude Code
- `ls ~/.claude/agents/interface-design.md`
- Smoke: `/interface` with finance-admin reconciliation brief → 2–3 directions

### Figma MCP

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

---

## Cursor

**macOS detail:** [installation-cursor-macos.md](installation-cursor-macos.md)

### Install Cursor

Download from [cursor.com](https://cursor.com).

### Install the design agent

```bash
./install.sh --target cursor --yes
```

### Attach rule per project (required for gates)

```bash
mkdir -p /path/to/project/.cursor/rules
cp cursor/rules/product-design-partner.mdc /path/to/project/.cursor/rules/
```

Open that project in Cursor → new chat → type `/interface`.

### Verify

- `ls ~/.cursor/commands/interface.md`
- `ls ~/.cursor/agents/interface-design.md`
- Rule file exists in **your project**, not only globally

### Figma MCP

Cursor → Settings → MCP → add `https://mcp.figma.com/mcp`

---

## Codex

**macOS detail:** [installation-codex-macos.md](installation-codex-macos.md)

### Install Codex CLI

Per OpenAI Codex documentation for your OS.

### Install the design agent

```bash
./install.sh --target codex --yes
```

If `~/.codex/AGENTS.md` already exists:

```bash
cat codex/AGENTS.md >> ~/.codex/AGENTS.md
```

### Verify

- `ls ~/.codex/prompts/interface.md`
- `/brainstorm` or `/interface` in a Codex session
- For heavy UI: new task + `/interface` + manual validator before handoff

### Figma MCP

In `~/.codex/config.toml`:

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
```

---

## OpenCode

**macOS detail:** [installation-opencode-macos.md](installation-opencode-macos.md)

### Install OpenCode v1.0+

Per your OpenCode documentation.

### Install the design agent

```bash
./install.sh --target opencode --yes
```

Installs agent, modules, plugins, commands, and reference data under `~/.config/opencode/`.

### Verify

```bash
opencode
@product-design-partner Help me design a dashboard
```

Plugin should block generic “clean modern dashboard for users” output.

### Manual install (reference)

```bash
cp agent/product-design-partner.md ~/.config/opencode/agents/
cp -r agent/modules ~/.config/opencode/agents/product-design-partner/
cp plugins/*.js plugins/*.mjs ~/.config/opencode/plugins/
cp opencode/command/*.md ~/.config/opencode/command/
cp design-data/references/* ~/.config/opencode/design-data/references/
```

---

## Custom path (any LLM)

```bash
./install.sh --target custom --path /your/custom/path --yes
```

Load `agent/product-design-partner.md` as system prompt; keep `design-data/` readable; validate with:

```bash
node /your/custom/path/plugins/design-validator.mjs output.md
```

Or paste `prompts/goal-mode.md` (≤4000 chars) into ChatGPT/Gemini custom instructions.

---

## Verification

### Full smoke suite

```bash
./scripts/test.sh
```

Checks plugin syntax, 16-command sync, goal-mode size, hooks, validator fixture.

### Per-platform smoke test

| Platform | Test |
|----------|------|
| **Claude Code** | `/interface` → gates + 2–3 variants |
| **Cursor** | `/` lists commands; rule attached → intent first |
| **Codex** | `/brainstorm` → ≥15 ideas |
| **OpenCode** | `@product-design-partner` responds; plugin loads |

### Standalone validator

```bash
node plugins/design-validator.mjs examples/dashboard-design.md
# exit 0 = pass
```

---

## Configuration

### Path resolution

Order (via `plugins/path-resolver.mjs`):

1. `DESIGN_DATA_DIR` env var
2. Workspace `design-data/`
3. `~/.product-design-partner/design-data/`
4. `~/.config/opencode/design-data/`

### Environment variables

```bash
export DESIGN_DATA_DIR="$HOME/my-design-data"
```

Copy `.env.example` to `.env` locally — never commit secrets.

---

## Figma MCP (optional)

Required for live `/figma-export`. Without it, agent delivers token JSON + build specs.

| Platform | Setup |
|----------|--------|
| Claude Code | `claude mcp add --transport http figma https://mcp.figma.com/mcp` |
| Cursor | Settings → MCP → `https://mcp.figma.com/mcp` |
| Codex | `mcp_servers.figma` in `~/.codex/config.toml` |
| OpenCode | Add server in OpenCode MCP config |

---

## Troubleshooting

| Problem | Platform | Fix |
|---------|----------|-----|
| Commands missing | All | Re-run `./install.sh --target <platform> --yes`; restart app |
| Gates ignored | Cursor | Copy rule to project `.cursor/rules/` |
| Gates ignored | Codex | Merge `codex/AGENTS.md` into `~/.codex/AGENTS.md` |
| Hook missing | Claude Code | Use plugin install, not script-only |
| Plugin not blocking | OpenCode | Check `~/.config/opencode/plugins/product-design.js` |
| References missing | OpenCode | `ls ~/.config/opencode/design-data/references/` |

Designer-friendly fixes: [troubleshooting-for-designers.md](troubleshooting-for-designers.md)

---

## Updating

```bash
cd product-design-agent && git pull
./install.sh --target <platform> --yes
```

**OpenCode:** backup `~/.config/opencode/design-data/projects/` first.

**Claude plugin:** `/plugin` → update repository.

**Cursor:** re-copy `product-design-partner.mdc` if the rule changed.

---

## Uninstalling

See platform-specific guides for exact file lists, or:

```bash
rm -rf ~/.product-design-partner
# Plus platform dirs — see installation-*-macos.md
```

---

## Next steps

1. [Designer handoff guide](handoff-guide.md)
2. [Workflows by task](workflows-by-task.md)
3. [Examples](../examples/getting-started.md)
4. [Architecture](architecture.md) (maintainers)
