# Cursor on macOS — Installation Guide

Complete setup for **Product Design Partner** on **Cursor** (macOS Sonoma and later, Intel and Apple Silicon).

**Other platforms:** [Claude Code](installation-claude-code-macos.md) · [Codex](installation-codex-macos.md) · [OpenCode](installation-opencode-macos.md) · [All platforms hub](installation-macos.md)

**Designers:** [Quick start for designers](designer-quick-start.md)

---

## What you get on Cursor

| Component | Purpose |
|-----------|---------|
| **16 slash commands** | Global `~/.cursor/commands/` |
| **Project rule** | `.cursor/rules/product-design-partner.mdc` — gate enforcement per project |
| **4 agents** | `~/.cursor/agents/` — optional focused chats for heavy UI |
| **Reference bundle** | `~/.product-design-partner/` |

Gate enforcement on Cursor is **instruction-only** via the project rule (plus your review). OpenCode is the only platform with automatic plugin blocking.

---

## Prerequisites (Mac)

### 1. Install Cursor

Download from [cursor.com](https://cursor.com) and install the Mac app (Apple Silicon or Intel build).

Sign in and open at least one project folder once so Cursor creates `~/.cursor/`.

### 2. Xcode Command Line Tools

```bash
xcode-select --install
```

### 3. Node.js 18+ (optional validator)

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

## Install (two steps)

### Step 1 — Run the installer

```bash
./install.sh --target cursor --yes
```

**Copies:**

| Destination | Contents |
|-------------|----------|
| `~/.cursor/commands/` | 16 slash commands |
| `~/.cursor/agents/` | 4 agent definitions |
| `~/.cursor/rules/` | Global rule (optional) |
| `~/.product-design-partner/` | Router, modules, references, validator |

### Step 2 — Attach the rule to each design project

The install puts commands on your **Mac**. Gate behavior attaches **per project**:

```bash
mkdir -p /path/to/your/design-project/.cursor/rules
cp cursor/rules/product-design-partner.mdc /path/to/your/design-project/.cursor/rules/
```

Or in Finder: copy `product-design-partner.mdc` into your project’s `.cursor/rules/` folder.

**Restart Cursor** or open a **new chat** in that project folder.

---

## Verify installation

1. Open your design project in Cursor
2. Open Chat (`Cmd+L` or agent panel)
3. Type `/` — see `/interface`, `/prototype`, `/research`, …
4. Run:

   ```
   /interface A settings page where finance admins reconcile Stripe payouts before month-end. They need confidence nothing was missed.
   ```

5. Confirm: Who/What/Feel → domain → **2–3 directions** → your pick

**File checks:**

```bash
ls ~/.cursor/commands/interface.md
ls ~/.cursor/agents/interface-design.md
ls ~/.product-design-partner/agent/product-design-partner.md
```

**Smoke suite (IT):**

```bash
./scripts/test.sh
```

---

## Daily usage

### Slash commands

Cursor **appends your message** after the command — write the full brief on the same line or in the next message:

```
/interface Billing dashboard for finance admins during month-end close — calm control, not panic
```

Task index: [workflows-by-task.md](workflows-by-task.md)

### Focused agents (optional)

| Task | Command | Agent |
|------|---------|-------|
| New screen | `/interface` | `interface-design` |
| HTML variants | `/prototype` | `prototype-variants` |
| Figma export | `/figma-export` | `figma-export` |

Select from Cursor’s agent menu or use the slash command alone.

### Save work

> Save under design-data/projects/my-project/

Use the project repo’s `design-data/projects/` when the rule is attached there.

---

## Optional: Figma MCP

1. Cursor → **Settings** → **MCP**
2. Add server URL: `https://mcp.figma.com/mcp`
3. Authenticate with Figma when prompted

Without MCP, `/figma-export` returns token JSON + manual build specs.

---

## Troubleshooting

### No slash commands

```bash
./install.sh --target cursor --yes
```

Quit and reopen Cursor. Check `ls ~/.cursor/commands/interface.md`.

### Agent ignores gates / skips variants

- Confirm `.cursor/rules/product-design-partner.mdc` is in **the project you have open**, not only in the agent repo
- Start a **new** chat

### Commands work globally but gates don’t apply

Copy the rule into the project (Step 2 above).

More: [troubleshooting-for-designers.md](troubleshooting-for-designers.md)

---

## Updating

```bash
cd product-design-agent && git pull
./install.sh --target cursor --yes
```

Re-copy `product-design-partner.mdc` into active projects if the rule file changed.

---

## Uninstall

```bash
rm -rf ~/.product-design-partner
rm -f ~/.cursor/commands/{interface,prototype,brainstorm,diagram,annotate,mentor,research,strategy,ux-flows,ux-audit,design-converter,figma-export,portfolio,critique,handoff,design-system}.md
rm -f ~/.cursor/agents/{product-design-partner,interface-design,prototype-variants,figma-export}.md
rm -f ~/.cursor/rules/product-design-partner.mdc
# Also remove project copies: your-project/.cursor/rules/product-design-partner.mdc
```

---

## Next steps

- [Handoff guide](handoff-guide.md)
- [Quality gates for designers](quality-gates-for-designers.md)
- [Installation (all platforms)](installation.md)
