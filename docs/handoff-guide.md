# Designer handoff guide

This document is for **designers and design leads** receiving the Product Design Partner as a team tool. No engineering background required beyond installing Node.js once.

## What you're getting

A **structured AI design partner** that:

- Runs inside **Cursor**, **Claude Code**, **Codex**, or **OpenCode** (pick what your org uses)
- Follows **17 workflows** — research through handoff, prototypes, diagrams, annotations
- Enforces **5 quality gates** so outputs stay specific, accessible, and non-generic
- Delivers **2–3 distinct UI directions** for new screens (Variant Protocol) instead of one AI-default layout

The repo is the **source of truth**. Installation copies a bundle to your home directory; your project work stays in `design-data/projects/`.

## 30-minute onboarding

### 1. Install (10 min)

**macOS:**

```bash
brew install node
git clone https://github.com/Syclipse/product-design-agent.git product-design-agent && cd product-design-agent
chmod +x install.sh scripts/test.sh
./install.sh --target cursor --yes    # or claude | codex | opencode
./scripts/test.sh
```

See [installation-macos.md](installation-macos.md) or [installation.md](installation.md) for other platforms.

### 2. Attach the agent to your project (5 min)

**Cursor (recommended for most design teams):**

```bash
mkdir -p /path/to/your-project/.cursor/rules
cp cursor/rules/product-design-partner.mdc /path/to/your-project/.cursor/rules/
```

Open the project in Cursor. Type `/` to see commands like `/interface`, `/prototype`, `/research`.

**Clone-only workflow:** open this repo in Cursor or Codex — root `AGENTS.md` applies agent identity without global install. For slash commands, still run `./install.sh --target cursor --yes` or copy `cursor/commands/` into the project.

**Claude Code:** add this repo as a plugin (`/plugin`) or run `./install.sh --target claude --yes`. See [.claude-plugin/README.md](../.claude-plugin/README.md) for the component map.

### 3. Run your first workflow (10 min)

In Cursor or Claude Code:

```
/interface A settings page where finance admins reconcile Stripe payouts before month-end close. They need confidence nothing is missed.
```

Expect:

1. **Intent** — Who / What / Feel (specific, not "users" or "clean")
2. **Domain exploration** — concepts and colors from finance/reconciliation, not generic SaaS purple
3. **2–3 variants** — comparison table, recommendation, then your choice
4. **Refinement** of the winner through validation tests

### 4. Save your work (5 min)

Ask the agent to save artifacts under:

```
design-data/projects/<your-project-name>/
```

See [design-data/projects/README.md](../design-data/projects/README.md) for the recommended file layout.

## Slash commands cheat sheet

| When you need… | Command |
|----------------|---------|
| Early ideation | `/brainstorm` or `/mentor` |
| Research planning | `/research` |
| User flows / IA | `/ux-flows` or `/diagram` |
| New screen (gated) | `/interface` |
| Clickable options | `/prototype` |
| Sketch → spec | `/design-converter` |
| Design system audit | `/design-system` |
| Review a mockup | `/critique` or `/ux-audit` |
| Explain decisions | `/annotate` |
| Dev-ready spec | `/handoff` |
| Figma | `/figma-export` |
| Case study | `/portfolio` |

Full index: [workflows.md](workflows.md).

## Quality gates (non-negotiable for UI)

Every interface, prototype, or converted screen must document:

1. **Who / What / Feel** — a specific person, task, and emotional outcome
2. **Domain** — 5+ domain concepts, 5+ domain-native colors, one **signature** element used 5+ times
3. **Validation tests** — swap, squint, signature, token (each with pass/fail + evidence)
4. **Variance** — a Vibe + Layout pairing not repeated from your last two outputs
5. **Ban list** — no glassmorphism-by-default, hero-metric trios, gradient text, etc.

**Validate locally:**

```bash
node plugins/design-validator.mjs design-data/projects/my-app/handoff.md
```

On OpenCode, the plugin blocks bad output automatically. On Cursor/Codex/Claude, the rule and your review are the enforcement — run the validator before sending specs to engineering.

## What stays out of git

Your deliverables are **private by default**:

| Ignored | Why |
|---------|-----|
| `design-data/projects/*` | Client work, drafts, prototypes |
| `design-data/validation-history/` | Local gate run logs |
| `design-data/variance-history.json` | Your repetition tracker |
| `.config/` | Accidental local OpenCode install in repo |

The shared repo keeps agent logic, references, and commands only. See [.gitignore](../.gitignore).

## Customizing for your brand

The agent ships a **demo brand** (Inter, Fragment Mono, plum `#501E60`, violet `#7C3AED`) in `design-data/references/brand-identity.md`.

For client work:

1. Keep the **gate structure** — change domain tokens and signature, not the process
2. Add client tokens under `design-data/projects/<client>/system.md`
3. Do **not** delete ban-list entries; they prevent generic AI UI

For a team-wide rebrand of the agent itself, edit `brand-identity.md` and the brand lines in `cursor/rules/product-design-partner.mdc` / `codex/AGENTS.md`, then re-run `./scripts/test.sh`.

## Team rollout checklist

- [ ] Each designer ran `./install.sh --target <platform> --yes`
- [ ] Each project repo has `.cursor/rules/product-design-partner.mdc` (Cursor) or equivalent
- [ ] Team agreed on `design-data/projects/<naming-convention>/`
- [ ] Figma MCP configured if using `/figma-export` ([installation.md](installation.md#figma-mcp-optional))
- [ ] Design lead ran `./scripts/test.sh` on main before pinning a release tag
- [ ] Optional: pin git tag `v1.3.0` for stable handoff

## Getting help

| Question | Where |
|----------|-------|
| How do I install? | [installation.md](installation.md) |
| Which workflow for my task? | [product-design-process.md](../design-data/references/product-design-process.md) |
| Why was my output rejected? | [quality-gates.md](../agent/modules/quality-gates.md), [ban-list.md](../design-data/references/ban-list.md) |
| How do I extend the agent? | [contributing.md](contributing.md) |
| Something broke after update | [CHANGELOG.md](../CHANGELOG.md), re-run `./install.sh` |

## Maintainer handoff (giving this to another team)

1. Tag a release: `git tag v1.3.0 && git push origin v1.3.0`
2. Share this file + [docs/README.md](README.md)
3. Confirm `.gitignore` excludes `design-data/projects/` (no client data in transfer)
4. Include Node 18+ in team prerequisites
5. Point design leads to `scripts/test.sh` for smoke verification
