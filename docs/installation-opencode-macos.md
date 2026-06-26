# OpenCode on macOS — Installation Guide

Complete setup for **Product Design Partner** on **OpenCode** (macOS Sonoma and later, Intel and Apple Silicon).

**Other platforms:** [Claude Code](installation-claude-code-macos.md) · [Cursor](installation-cursor-macos.md) · [Codex](installation-codex-macos.md) · [All platforms hub](installation-macos.md)

---

## What you get on OpenCode

| Component | Purpose |
|-----------|---------|
| **Agent** | `@product-design-partner` |
| **16 slash commands** | `~/.config/opencode/command/` |
| **Validation plugin** | **Automatic gate blocking** on UI output |
| **Variance tracking** | Persists in `design-data/variance-history.json` |
| **Reference data** | `~/.config/opencode/design-data/references/` |

OpenCode is the **only** platform where the plugin **blocks** responses that violate quality gates before they ship.

---

## Prerequisites (Mac)

### 1. Install OpenCode

Install OpenCode v1.0+ per your org’s OpenCode documentation. Confirm:

```bash
opencode --version
```

### 2. Xcode Command Line Tools + Node.js 18+

```bash
xcode-select --install
brew install node
node --version
```

Node is required for OpenCode plugins and the validator.

### 3. Clone the agent repo

```bash
git clone https://github.com/Syclipse/product-design-agent.git
cd product-design-agent
chmod +x install.sh scripts/test.sh
```

---

## Install

```bash
./install.sh --target opencode --yes
```

**Copies:**

| Destination | Contents |
|-------------|----------|
| `~/.config/opencode/agents/product-design-partner.md` | Router |
| `~/.config/opencode/agents/product-design-partner/modules/` | 6 modules |
| `~/.config/opencode/plugins/` | `product-design.js`, validators |
| `~/.config/opencode/command/` | 16 slash commands |
| `~/.config/opencode/design-data/references/` | Playbooks |

To reverse this, run `./uninstall.sh --target opencode` (see [Uninstall](#uninstall) below).

---

## Verify installation

```bash
ls ~/.config/opencode/agents/product-design-partner.md
ls ~/.config/opencode/command/interface.md
ls ~/.config/opencode/plugins/product-design.js
```

Start OpenCode:

```bash
opencode
```

In session:

```
@product-design-partner Help me design a monitoring dashboard for on-call engineers
```

Or:

```
/interface Dashboard for on-call engineers — calm urgency during incidents
```

**Plugin test:** Ask for generic UI (“clean modern dashboard for users”) — the agent should refuse or rewrite per Gate 1.

**Smoke suite:**

```bash
./scripts/test.sh
```

---

## Daily usage

### Agent vs slash commands

| Invoke | When |
|--------|------|
| `@product-design-partner …` | Open-ended design work; router picks workflow |
| `/interface …` | Specific workflow with full module load |

Task index: [workflows-by-task.md](workflows-by-task.md)

### Save work

```
design-data/projects/my-app/
```

Default root: `~/.config/opencode/design-data/projects/` (or project-local `.config/opencode/` if present).

`/prototype` builds a runnable Vite + React app under `design-data/projects/<project>/prototype/` — variants A/B/C in one tab-switchable app (browser-verified), not separate HTML files. Run it with `npm install && npm run dev` (Node 18+ is already required for OpenCode), or use `node scripts/dev-server.mjs`.

### Validation history

Failed/passed gate runs log to:

```
~/.config/opencode/design-data/validation-history/
```

Manual check still works:

```bash
node ~/.config/opencode/plugins/design-validator.mjs design-data/projects/my-app/handoff.md
```

---

## Optional: Figma MCP

Add the Figma MCP server in your OpenCode config (`opencode.json` or equivalent):

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

Exact schema may vary by OpenCode version — see your OpenCode MCP docs.

Without MCP, `/figma-export` delivers fallback token JSON + build specs.

---

## Troubleshooting

### `@product-design-partner` does not autocomplete

1. Verify agent file path (see above)
2. Restart OpenCode
3. Re-run `./install.sh --target opencode --yes`

### Reference files not found

```bash
ls ~/.config/opencode/design-data/references/ban-list.md
chmod 644 ~/.config/opencode/design-data/references/*
```

### Plugin not blocking bad output

- Confirm `product-design.js` is in `~/.config/opencode/plugins/`
- Check OpenCode logs for plugin load errors
- Restart OpenCode after install

### Variance repeats

```bash
ls -la ~/.config/opencode/design-data/
echo '[]' > ~/.config/opencode/design-data/variance-history.json
```

---

## Updating

```bash
# Backup projects first
cp -r ~/.config/opencode/design-data/projects ~/backup-pdp-projects

cd product-design-agent && git pull
./install.sh --target opencode --yes
```

---

## Uninstall

**Recommended — use the uninstaller** (mirrors the install; keeps your design output by default):

```bash
./uninstall.sh --target opencode        # remove agent/plugins/commands/references, keep your design output
./uninstall.sh --target opencode --dry-run   # preview exactly what would be removed
./uninstall.sh --target opencode --purge     # also delete generated output (design-data/projects) + bundle
```

Add `--yes` to skip prompts. By default your generated work in `design-data/projects/` is preserved; `--purge` removes it.

**Manual fallback:**

```bash
rm ~/.config/opencode/agents/product-design-partner.md
rm -r ~/.config/opencode/agents/product-design-partner/
rm ~/.config/opencode/plugins/product-design.js
rm ~/.config/opencode/plugins/design-validator.mjs
rm ~/.config/opencode/plugins/design-migrator.js
rm ~/.config/opencode/plugins/csv-converter.mjs
rm -r ~/.config/opencode/design-data/references/
# Optional — deletes all local design work:
# rm -r ~/.config/opencode/design-data/
```

---

## Next steps

- [Handoff guide](handoff-guide.md)
- [Quality gates for designers](quality-gates-for-designers.md)
- [Installation (all platforms)](installation.md)
