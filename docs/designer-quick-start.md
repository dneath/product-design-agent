# Quick start for designers

You do **not** need to be an engineer to use this tool. You need an AI app, a one-time setup, and the habit of describing **who** you're designing for—not "users who want a clean UI."

## What this is (in one sentence)

An AI design partner that runs inside your editor or terminal and walks you through research, flows, screens, prototypes, critiques, and dev handoff—while pushing back on generic AI-looking design.

## Pick your tool — install guide

Use the guide for **your** platform (Mac). Each guide has the same depth: prerequisites, install, verify, first prompt, troubleshooting.

| If your team uses… | Install guide (macOS) |
|--------------------|------------------------|
| **Cursor** | [Cursor on macOS](installation-cursor-macos.md) |
| **Claude Code** | [Claude Code on macOS](installation-claude-code-macos.md) |
| **Codex** | [Codex on macOS](installation-codex-macos.md) |
| **OpenCode** | [OpenCode on macOS](installation-opencode-macos.md) |
| **Not sure / all platforms** | [macOS hub](installation-macos.md) · [All platforms](installation.md) |

**Not on Mac?** See [Installation (all platforms)](installation.md).

---

## Shared setup (all platforms)

If terminal commands feel uncomfortable, send the **install guide for your tool** to IT—they run the clone + `./install.sh` block once.

### 1. Clone the agent (once)

```bash
git clone https://github.com/Syclipse/product-design-agent.git
cd product-design-agent
chmod +x install.sh
```

### 2. Install for your platform (once)

```bash
./install.sh --target claude --yes    # Claude Code
./install.sh --target cursor --yes    # Cursor
./install.sh --target codex --yes     # Codex
./install.sh --target opencode --yes  # OpenCode
```

**Claude Code teams:** plugin install via `/plugin` is often easier — see [Claude Code guide](installation-claude-code-macos.md).

**Cursor teams:** also copy the rule into each project — see [Cursor guide](installation-cursor-macos.md).

### 3. Check that it worked

In your AI app, type `/` — you should see `/interface`, `/research`, `/prototype`.

### Removing it (later)

Same repo, mirror command — it keeps your saved design work by default:

```bash
./uninstall.sh --target claude    # or cursor | codex | opencode
```

Add `--dry-run` to preview, or `--purge` to also delete generated output. Full detail: [Installation](installation.md#uninstalling).

---

## Your first real task (5 minutes)

```
/interface A settings page where finance admins reconcile Stripe payouts before month-end close. They need confidence nothing is missed.
```

**What should happen:**

1. **Who / What / Feel** — specific person, task, emotion (not "modern users")
2. **Domain** — ideas from finance/reconciliation, not template SaaS
3. **2–3 different layout directions** — you pick one
4. **Refinement** — states, accessibility, handoff detail

If it jumps to one generic screen: *"Follow the Variant Protocol—show me three distinct directions first."*

---

## Daily cheat sheet

| I want to… | Type this in chat |
|------------|-------------------|
| Explore ideas early | `/brainstorm` or `/mentor` |
| Plan interviews | `/research` |
| Map a journey or flow | `/ux-flows` or `/diagram` |
| Design a new screen | `/interface` |
| See clickable options | `/prototype` (see note below) |
| Review a mockup | `/critique` or `/ux-audit` |
| Write specs for dev | `/handoff` |
| Push to Figma | `/figma-export` (optional MCP) |

More: [workflows-by-task.md](workflows-by-task.md)

**About `/prototype`:** you get an **interactive React app** — one app with **A/B/C tabs** to switch directions, opened in your **browser** (not a double-click HTML file). Running it needs Node + npm: `npm install && npm run dev` in the prototype folder (or `node scripts/dev-server.mjs`). Ask a teammate or IT if the terminal part is unfamiliar.

**About styling:** there is **no fixed brand**. The agent derives colors and type from your context — existing repo tokens, a Figma file, or what you specify. With nothing to go on it falls back to a restrained monochrome scheme (OKLCH greys, never pure `#000`/`#fff`), 4px spacing, and Inter (UI/text) + Fragment Mono (code), then adapts from there.

---

## Where your work is saved

> Save this under design-data/projects/billing-dashboard/

Stays on **your machine** by default (not uploaded to git). See [Saving your work](handoff-guide.md#4-save-your-work-5-min).

---

## Get unstuck

| Problem | Doc |
|---------|-----|
| Install | Your platform guide above or [troubleshooting](troubleshooting-for-designers.md) |
| Generic output | [Quality gates](quality-gates-for-designers.md) |
| Which command? | [Workflows by task](workflows-by-task.md) |

---

## Read next

- [Handoff guide](handoff-guide.md) — team rollout  
- [Quality gates for designers](quality-gates-for-designers.md)
