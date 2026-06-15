# Designer handoff guide

For **designers and design leads** receiving this as a team tool. Use **Claude Code, Cursor, Codex, or OpenCode** — whatever your org standardizes on.

**Brand new?** [Quick start for designers](designer-quick-start.md)

## What you're getting

A **structured AI design partner** that:

- Covers research, flows, screens, prototypes, critique, handoff, portfolio
- Pushes back on generic AI UI ("clean, modern, for users")
- Shows **2–3 real options** for new screens before you commit

Client work stays in `design-data/projects/` on your laptop. The shared repo is the **tool**, not your deliverables.

## Glossary

| Term | Plain meaning |
|------|----------------|
| **Slash command** | Shortcut in chat, e.g. `/interface` |
| **Quality gates** | Five checks — [plain English](quality-gates-for-designers.md) |
| **Variant Protocol** | 2–3 layout directions; you pick the winner |
| **Rule file** | Cursor only: `.cursor/rules/product-design-partner.mdc` in your project |
| **Subagent** | Claude Code / Cursor: separate chat for big UI tasks |

---

## 30-minute onboarding (pick your platform)

Each path has the same steps: **install tool → install agent → verify → first `/interface` → save work**.

| Platform | Detailed install guide |
|----------|------------------------|
| **Claude Code** | [Claude Code on macOS](installation-claude-code-macos.md) |
| **Cursor** | [Cursor on macOS](installation-cursor-macos.md) |
| **Codex** | [Codex on macOS](installation-codex-macos.md) |
| **OpenCode** | [OpenCode on macOS](installation-opencode-macos.md) |

**Linux / Windows / manual:** [Installation (all platforms)](installation.md)

---

### 1. Install (10 min) — you or IT

**All platforms — clone once:**

```bash
git clone https://github.com/Syclipse/product-design-agent.git
cd product-design-agent
chmod +x install.sh
```

**Then one command for your tool:**

```bash
./install.sh --target claude --yes     # Claude Code
./install.sh --target cursor --yes     # Cursor
./install.sh --target codex --yes      # Codex
./install.sh --target opencode --yes   # OpenCode
```

**Platform-specific extras:**

| Platform | Also do |
|----------|---------|
| **Claude Code** | `/plugin` → add repo (recommended), or use script only — [guide](installation-claude-code-macos.md) |
| **Cursor** | Copy `cursor/rules/product-design-partner.mdc` → `your-project/.cursor/rules/` |
| **Codex** | If `~/.codex/AGENTS.md` exists, append `codex/AGENTS.md` |
| **OpenCode** | Start `opencode`; use `@product-design-partner` or `/interface` |

**Verify:** Type `/` in chat — see design commands.

---

### 2. Attach identity (5 min)

| Platform | What “identity” means |
|----------|------------------------|
| **Claude Code** | Plugin or subagents in `~/.claude/agents/` — automatic after install |
| **Cursor** | **Required:** rule file in each project’s `.cursor/rules/` |
| **Codex** | `~/.codex/AGENTS.md` loaded every session |
| **OpenCode** | `@product-design-partner` agent + plugins |

---

### 3. First workflow (10 min)

```
/interface A settings page where finance admins reconcile Stripe payouts before month-end close. They need confidence nothing is missed.
```

**Expect:** Who/What/Feel → domain → **2–3 directions** → your choice → refinement.

**If it skips variants:** *"Show three distinct directions first, then stop for my pick."*

Examples: [getting-started.md](../examples/getting-started.md) · [workflows-by-task.md](workflows-by-task.md)

---

### 4. Save your work (5 min)

> Save artifacts under design-data/projects/billing-dashboard/

| File | When |
|------|------|
| `concept.md` | Early mentor/strategy |
| `research-plan.md` | After `/research` |
| `flows.md` | After `/ux-flows` |
| `variants.md` + `prototypes/` | After `/prototype` |
| `system.md` | After `/interface` |
| `handoff.md` | Before dev (`/handoff`) |

[Project folder guide](../design-data/projects/README.md)

---

## Daily cheat sheet

| I want to… | Command |
|------------|---------|
| Early ideation | `/brainstorm` or `/mentor` |
| Research | `/research` |
| Flows / diagrams | `/ux-flows` or `/diagram` |
| **New screen** | `/interface` |
| **Clickable options** | `/prototype` |
| Sketch → spec | `/design-converter` |
| Design system audit | `/design-system` |
| Review mockup | `/critique` or `/ux-audit` |
| Dev spec | `/handoff` |
| Figma | `/figma-export` |
| Case study | `/portfolio` |

[Workflows by task](workflows-by-task.md)

---

## Big tasks (Claude Code & Cursor)

| Task | Command | Agent |
|------|---------|-------|
| New screen | `/interface` | `interface-design` |
| HTML prototypes | `/prototype` | `prototype-variants` |
| Figma export | `/figma-export` | `figma-export` |

Codex: use `/interface` in a fresh task. OpenCode: `@product-design-partner` + plugin.

---

## Quality gates (summary)

[Full plain-English guide](quality-gates-for-designers.md)

1. Who / What / Feel  
2. Domain + signature element  
3. Swap, squint, signature, token tests  
4. Not same vibe+layout as last two screens  
5. Ban list (no glass-everywhere clichés)

**Optional validator** (any platform, ask IT once):

```bash
node plugins/design-validator.mjs design-data/projects/my-app/handoff.md
```

---

## Team rollout checklist

**Design lead**

- [ ] Pin release tag and share [designer-quick-start.md](designer-quick-start.md)
- [ ] Share **platform-specific install guide** for your standard tool
- [ ] Confirm Figma MCP if using `/figma-export`

**Each designer**

- [ ] Completed install for **their** platform (see table above)
- [ ] Cursor only: rule copied into each active project
- [ ] `/interface` smoke test passed
- [ ] Knows save path: `design-data/projects/<name>/`

---

## Getting help

| Question | Where |
|----------|-------|
| Install Claude Code Mac | [installation-claude-code-macos.md](installation-claude-code-macos.md) |
| Install Cursor Mac | [installation-cursor-macos.md](installation-cursor-macos.md) |
| Install Codex Mac | [installation-codex-macos.md](installation-codex-macos.md) |
| Install OpenCode Mac | [installation-opencode-macos.md](installation-opencode-macos.md) |
| Something broke | [troubleshooting-for-designers.md](troubleshooting-for-designers.md) |
| Which command? | [workflows-by-task.md](workflows-by-task.md) |

## Maintainers

Run `./scripts/test.sh` before pinning a release. [Architecture](architecture.md) · [Contributing](contributing.md)
