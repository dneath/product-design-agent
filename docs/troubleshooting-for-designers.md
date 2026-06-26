# Troubleshooting for designers

Fixes by **platform**. Install details: see your platform guide below.

| Platform | Install guide |
|----------|---------------|
| Claude Code (Mac) | [installation-claude-code-macos.md](installation-claude-code-macos.md) |
| Cursor (Mac) | [installation-cursor-macos.md](installation-cursor-macos.md) |
| Codex (Mac) | [installation-codex-macos.md](installation-codex-macos.md) |
| OpenCode (Mac) | [installation-opencode-macos.md](installation-opencode-macos.md) |

---

## Setup — all platforms

### I don't see `/interface` when I type `/`

**Fix:**

1. Clone repo and run install for **your** platform:

   ```bash
   ./install.sh --target claude --yes    # or cursor | codex | opencode
   ```

2. **Claude Code:** prefer `/plugin` → add repository — [guide](installation-claude-code-macos.md)

3. Quit and reopen your AI app.

4. IT can verify command files exist:

   | Platform | Check |
   |----------|-------|
   | Claude Code | `ls ~/.claude/commands/interface.md` |
   | Cursor | `ls ~/.cursor/commands/interface.md` |
   | Codex | `ls ~/.codex/prompts/interface.md` |
   | OpenCode | `ls ~/.config/opencode/command/interface.md` |

### Install script says "permission denied"

```bash
chmod +x install.sh scripts/test.sh
./install.sh --target <claude|cursor|codex|opencode> --yes
```

---

## Setup — Cursor only

### Agent doesn't follow the design process

**Cause:** Rule file not in **your project**.

**Fix:**

1. Create `your-project/.cursor/rules/`
2. Copy `cursor/rules/product-design-partner.mdc` there
3. New chat in that project

---

## Setup — Claude Code only

### Hook doesn't suggest slash commands

**Cause:** Script-only install (Method B) does not install the hook.

**Fix:** Use plugin install: `/plugin` → add repository — [guide](installation-claude-code-macos.md)

### Subagents missing

```bash
./install.sh --target claude --yes
ls ~/.claude/agents/interface-design.md
```

---

## Setup — Codex only

### Gates ignored

**Cause:** `~/.codex/AGENTS.md` missing Product Design Partner section.

**Fix:**

```bash
cat codex/AGENTS.md >> ~/.codex/AGENTS.md
```

Start a new Codex session.

---

## Setup — OpenCode only

### `@product-design-partner` not found

```bash
./install.sh --target opencode --yes
ls ~/.config/opencode/agents/product-design-partner.md
```

Restart OpenCode.

### Generic UI not blocked

Confirm plugin loaded: `ls ~/.config/opencode/plugins/product-design.js`

---

## Using the agent (all platforms)

### Output is generic

Add Who/What/Feel. See [quality-gates-for-designers.md](quality-gates-for-designers.md).

### One design instead of 2–3 options

> Follow the Variant Protocol: three distinct directions with a comparison table, then stop for my choice.

Use `/interface` or `/prototype`.

### Prototype won't open

`/prototype` now creates an **interactive React app** (variants A/B/C in one tab-switchable app), not a double-click HTML file — so you have to run a dev server:

```bash
cd design-data/projects/<project>/prototype
npm install && npm run dev    # then open the printed http://localhost URL
```

Or let the helper start/stop it for that project:

```bash
node scripts/dev-server.mjs
```

Needs Node 18+ and npm. If `npm` is missing, install Node ([nodejs.org](https://nodejs.org/) or `brew install node`).

### Don't know where files saved

> Save everything under design-data/projects/[name]/ and list paths.

[Project folder guide](../design-data/projects/README.md)

---

## Figma export (all platforms)

| Platform | MCP setup |
|----------|-----------|
| Claude Code | `claude mcp add --transport http figma https://mcp.figma.com/mcp` |
| Cursor | Settings → MCP → `https://mcp.figma.com/mcp` |
| Codex | `~/.codex/config.toml` |
| OpenCode | OpenCode MCP config |

Without MCP, agent still gives token JSON + manual build specs.

---

## After an update

```bash
cd product-design-agent && git pull
./install.sh --target <your-platform> --yes
```

- **Claude plugin:** `/plugin` → update
- **Cursor:** re-copy rule if changed
- **Codex:** merge `codex/AGENTS.md` if changed

[CHANGELOG.md](../CHANGELOG.md)

---

## Uninstall / start clean

From the cloned repo, the uninstaller mirrors the installer and **keeps your saved design work** (`design-data/projects/`) by default:

```bash
./uninstall.sh --target <claude|cursor|codex|opencode>
./uninstall.sh --target all --dry-run   # preview removal for every target
```

Add `--dry-run` to preview or `--purge` to also delete generated output + the bundle. To start completely fresh, uninstall then re-run `./install.sh` for your platform. Detail: [Installation](installation.md#uninstalling).

---

## Still stuck?

| Topic | Doc |
|-------|-----|
| Full onboarding | [handoff-guide.md](handoff-guide.md) |
| First prompts | [designer-quick-start.md](designer-quick-start.md) |
| All platforms | [installation.md](installation.md) |
