# Claude Code on macOS — Installation Guide

Complete setup for **Product Design Partner** on **Claude Code** (macOS Sonoma and later, Intel and Apple Silicon).

**Other platforms:** [Cursor](installation-cursor-macos.md) · [Codex](installation-codex-macos.md) · [OpenCode](installation-opencode-macos.md) · [All platforms hub](installation-macos.md)

**Designers:** after install, read [Quick start for designers](designer-quick-start.md) (works for any tool, not just Cursor).

---

## What you get on Claude Code

| Component | Purpose |
|-----------|---------|
| **16 slash commands** | `/interface`, `/prototype`, `/research`, … |
| **4 subagents** | `product-design-partner`, `interface-design`, `prototype-variants`, `figma-export` |
| **UserPromptSubmit hook** | Nudges design prompts toward the right workflow |
| **Reference bundle** | Playbooks at `~/.product-design-partner/` |
| **Optional validator** | `node plugins/design-validator.mjs` before dev handoff |

Gate enforcement on Claude Code is **hook + instruction** (not automatic blocking like OpenCode). The hook and subagents read the same rules as every other platform.

---

## Prerequisites (Mac)

### 1. Install Claude Code itself

Claude Code is Anthropic’s terminal-based coding agent (not Claude Desktop chat).

**Recommended — native installer:**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Alternative — Homebrew:**

```bash
brew install --cask claude-code
```

**Verify:**

```bash
claude --version
```

First launch: run `claude` and sign in with your Anthropic account (Pro, Max, Teams, Enterprise, or Console/API as required by your org).

Official reference: [code.claude.com setup](https://code.claude.com/docs/en/setup)

### 2. Xcode Command Line Tools (git)

```bash
xcode-select --install
```

### 3. Node.js 18+ (for the optional quality checker)

Claude Code’s native installer does **not** require Node. You still need Node to run `design-validator.mjs`:

```bash
brew install node
node --version   # v18 or higher
```

Or download LTS from [nodejs.org](https://nodejs.org/).

### 4. Clone the Product Design Partner repo

```bash
git clone https://github.com/Syclipse/product-design-agent.git
cd product-design-agent
chmod +x install.sh scripts/test.sh
```

---

## Install the design agent (choose one method)

### Method A — Plugin (recommended)

Best for teams: one step in Claude Code, includes hook + all subagents.

1. Start Claude Code in any directory:

   ```bash
   claude
   ```

2. Add the plugin:

   ```
   /plugin
   ```

3. Add this repository:

   - **GitHub URL:** `https://github.com/Syclipse/product-design-agent`
   - Or a local path if your org mirrors the repo internally

4. Confirm the plugin **product-design-partner** appears in the plugin list.

**What the plugin installs (by convention):**

| Component | Source in repo |
|-----------|----------------|
| Commands | `commands/*.md` (16 files) |
| Subagents | `agents/*.md` (4 files) |
| Hook | `hooks/hooks.json` → `inject-design-context.mjs` |
| Router | `agent/product-design-partner.md` |

Details: [.claude-plugin/README.md](../.claude-plugin/README.md)

### Method B — Personal directories (script)

Use when you cannot use plugins or want files under `~/.claude/` directly:

```bash
cd product-design-agent
./install.sh --target claude --yes
```

**This copies:**

| Destination | Contents |
|-------------|----------|
| `~/.claude/commands/` | 16 slash command files |
| `~/.claude/agents/` | 4 subagent definitions |
| `~/.product-design-partner/` | Full bundle (router, modules, references, plugins) |

---

## Verify installation

### Check files on disk (Method B or after plugin)

```bash
ls ~/.claude/commands/interface.md
ls ~/.claude/agents/interface-design.md
ls ~/.product-design-partner/agent/product-design-partner.md
```

### Check in Claude Code

1. Open Claude Code: `claude`
2. Type `/` — you should see `/interface`, `/prototype`, `/research`, etc.
3. Run a smoke prompt:

   ```
   /interface A settings page where finance admins reconcile Stripe payouts before month-end. They need confidence nothing was missed.
   ```

**Expected behavior:**

1. Who / What / Feel (specific role, not “users”)
2. Domain ideas from finance/reconciliation
3. **2–3 distinct layout directions** with a comparison table
4. Stops for your choice before polishing one direction

### Run the repo smoke suite (optional, for IT)

From the cloned repo:

```bash
./scripts/test.sh
```

### Run the validator on a sample file

```bash
node plugins/design-validator.mjs examples/dashboard-design.md
echo $?   # 0 = passed
```

---

## Daily usage

### Slash commands

Same 16 commands on every platform:

```
/interface …
/prototype …
/research …
/handoff …
```

Full task index: [workflows-by-task.md](workflows-by-task.md)

### Subagents (heavy work)

| Task | Command | Subagent |
|------|---------|----------|
| New screen | `/interface` | `interface-design` |
| HTML variants | `/prototype` | `prototype-variants` |
| Figma export | `/figma-export` | `figma-export` |
| Everything else | any command | `product-design-partner` |

In Claude Code, pick a subagent from the agent menu or say: *“Use the interface-design subagent to …”*

### Save your work

In chat:

> Save artifacts under design-data/projects/billing-dashboard/

If you opened Claude Code **inside a project repo**, files save to that repo’s `design-data/projects/`. Otherwise the agent uses `~/.product-design-partner/design-data/projects/`.

---

## Optional: Figma MCP

Required for live `/figma-export` (optional for all other workflows).

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Without MCP, `/figma-export` still delivers token JSON + frame-by-frame build specs you can paste into Figma manually.

---

## Gate enforcement on Claude Code

| Mechanism | What it does |
|-----------|----------------|
| **Subagent stubs** | Point at `quality-gates.md` + `workflows.md` |
| **UserPromptSubmit hook** | Suggests the right slash command when you describe design work |
| **You + validator** | Review output; run `node plugins/design-validator.mjs handoff.md` before engineering |

Plain-English gate guide: [quality-gates-for-designers.md](quality-gates-for-designers.md)

---

## Troubleshooting

### `/interface` does not autocomplete

1. Confirm plugin is enabled: `/plugin` in Claude Code
2. Or re-run: `./install.sh --target claude --yes`
3. Restart Claude Code
4. Check: `ls ~/.claude/commands/interface.md`

### Agent output is generic

Add Who/What/Feel to your prompt. Say: *“Follow the Variant Protocol — three distinct directions first.”*

See [quality-gates-for-designers.md](quality-gates-for-designers.md).

### Hook does not fire

- Plugin install required for the hook (Method A)
- Method B (script only) does **not** install the hook — use slash commands explicitly

### `claude: command not found`

Re-run the native installer or add Claude to PATH per [Anthropic setup docs](https://code.claude.com/docs/en/setup).

### Validator errors

```bash
node --version          # need 18+
chmod +x install.sh
./install.sh --target claude --yes
```

More fixes: [troubleshooting-for-designers.md](troubleshooting-for-designers.md)

---

## Updating

```bash
cd product-design-agent
git pull
./install.sh --target claude --yes
```

If using the plugin: `/plugin` → update or re-add the repository.

---

## Uninstall

**Plugin:** `/plugin` → remove **product-design-partner**

**Personal files:**

```bash
rm -rf ~/.product-design-partner
rm -f ~/.claude/commands/{interface,prototype,brainstorm,diagram,annotate,mentor,research,strategy,ux-flows,ux-audit,design-converter,figma-export,portfolio,critique,handoff,design-system}.md
rm -f ~/.claude/agents/{product-design-partner,interface-design,prototype-variants,figma-export}.md
```

Review `~/.claude/commands/` before deleting — you may have other custom commands.

---

## Next steps

- [Handoff guide](handoff-guide.md) — team rollout
- [Workflows by task](workflows-by-task.md) — which command when
- [Installation (all platforms)](installation.md)
