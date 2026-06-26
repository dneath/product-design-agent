# Codex on macOS — Installation Guide

Complete setup for **Product Design Partner** on **OpenAI Codex CLI** (macOS Sonoma and later, Intel and Apple Silicon).

**Other platforms:** [Claude Code](installation-claude-code-macos.md) · [Cursor](installation-cursor-macos.md) · [OpenCode](installation-opencode-macos.md) · [All platforms hub](installation-macos.md)

---

## What you get on Codex

| Component | Purpose |
|-----------|---------|
| **16 custom prompts** | `~/.codex/prompts/` — invoked as `/interface`, `/prototype`, … |
| **Global identity** | `~/.codex/AGENTS.md` — design partner rules every session |
| **Reference bundle** | `~/.product-design-partner/` |

Codex has **no subagent files**. For heavy UI, start a **fresh task** with `/interface`, `/prototype`, or `/figma-export`. Gates are **instruction-only** — run the validator manually before handoff.

---

## Prerequisites (Mac)

### 1. Install Codex CLI

Follow OpenAI’s current Codex installation docs for macOS (requires an OpenAI account with Codex access).

After install, confirm:

```bash
codex --version
```

First run `codex` and complete authentication if prompted.

### 2. Xcode Command Line Tools

```bash
xcode-select --install
```

### 3. Node.js 18+

Required for the validator:

```bash
brew install node
node --version
```

### 4. Clone the agent repo

```bash
git clone https://github.com/Syclipse/product-design-agent.git
cd product-design-agent
chmod +x install.sh scripts/test.sh
```

---

## Install

```bash
./install.sh --target codex --yes
```

**Copies:**

| Destination | Contents |
|-------------|----------|
| `~/.codex/prompts/` | 16 prompt files (`interface.md`, …) |
| `~/.codex/AGENTS.md` | Agent identity (created if missing) |
| `~/.product-design-partner/` | Router, modules, references, validator |

To reverse this, run `./uninstall.sh --target codex` (see [Uninstall](#uninstall) below).

### If you already have `~/.codex/AGENTS.md`

The installer **does not overwrite** your file. Append the design partner block:

```bash
cat codex/AGENTS.md >> ~/.codex/AGENTS.md
```

Review the merge for duplicate sections.

---

## Verify installation

```bash
ls ~/.codex/prompts/interface.md
ls ~/.product-design-partner/agent/product-design-partner.md
grep -i "Product Design Partner" ~/.codex/AGENTS.md
```

In Codex:

```
/brainstorm Onboarding ideas for a B2B analytics tool — ops managers, not generic users
```

Expect divergence quota (many ideas, named techniques) per the brainstorm workflow.

For UI:

```
/interface Settings page for finance admins reconciling payouts — confidence nothing was missed
```

Run validator on saved output:

```bash
node ~/.product-design-partner/plugins/design-validator.mjs design-data/projects/my-app/system.md
```

---

## Daily usage

### Custom prompts

Codex supports `$ARGUMENTS` in prompt files — your text after the command is substituted.

```
/interface Dashboard for on-call engineers during incidents — calm urgency
```

Full command list: [workflows-by-task.md](workflows-by-task.md)

### Heavy UI without subagents

1. Start a **new Codex task** (clean context)
2. Run `/interface` or `/prototype` with a full brief
3. Before `/handoff`, run the validator on the spec file

`/prototype` builds a runnable Vite + React app under `design-data/projects/<project>/prototype/` — variants A/B/C in one tab-switchable app (browser-verified), not separate HTML files. Run it with `npm install && npm run dev` (Node 18+), or use `node scripts/dev-server.mjs`.

### Save work

> Save under design-data/projects/my-app/

Paths resolve to repo `design-data/` when Codex runs inside a checkout, else `~/.product-design-partner/design-data/`.

---

## Optional: Figma MCP

Edit `~/.codex/config.toml`:

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
```

Restart Codex. Without MCP, use manual Figma build specs from `/figma-export`.

---

## Troubleshooting

### `/interface` not recognized

- Re-run `./install.sh --target codex --yes`
- Confirm files in `~/.codex/prompts/`
- Restart Codex session

### AGENTS.md ignored

- Ensure `~/.codex/AGENTS.md` contains the Product Design Partner section
- Append `codex/AGENTS.md` if missing

### Generic UI output

Enforce Variant Protocol in the prompt. See [quality-gates-for-designers.md](quality-gates-for-designers.md).

---

## Updating

```bash
cd product-design-agent && git pull
./install.sh --target codex --yes
# Manually merge AGENTS.md if codex/AGENTS.md changed
```

---

## Uninstall

**Recommended — use the uninstaller** (mirrors the install; keeps your design output by default):

```bash
./uninstall.sh --target codex           # remove prompts/bundle, keep your design output
./uninstall.sh --target codex --dry-run    # preview exactly what would be removed
./uninstall.sh --target codex --purge      # also delete generated output (design-data/projects) + bundle
```

Add `--yes` to skip prompts. Then edit `~/.codex/AGENTS.md` and remove the Product Design Partner section if you appended it.

**Manual fallback:**

```bash
rm -rf ~/.product-design-partner
rm -f ~/.codex/prompts/{interface,prototype,brainstorm,diagram,annotate,mentor,research,strategy,ux-flows,ux-audit,design-converter,figma-export,portfolio,critique,handoff,design-system}.md
# Edit ~/.codex/AGENTS.md and remove the Product Design Partner section
```

---

## Next steps

- [Handoff guide](handoff-guide.md)
- [Platform adaptation](../agent/modules/platform-adaptation.md)
- [Installation (all platforms)](installation.md)
