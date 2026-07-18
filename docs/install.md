# Install & Uninstall

One guide for all platforms. Prerequisites: `git`, and Node 20+ (`node --version`) — Node is used
by the dev-server helper, the sync/test scripts, and the prototype shells (Next.js).

```bash
git clone https://github.com/Syclipse/product-design-agent
cd product-design-agent
chmod +x install.sh uninstall.sh scripts/test.sh   # once, if needed
```

The installer copies files (no symlinks, no settings edits). Claude Code / Cursor / Codex share a
bundle at `~/.product-design-partner/` (modules + references + templates + prototype shells +
scripts); OpenCode gets everything inside `~/.config/opencode/`.

---

## Claude Code

**Option A — plugin (preferred; enables the prompt hook):**
1. In Claude Code run `/plugin` → add this repository (manifest: `.claude-plugin/plugin.json`).
2. Commands, subagents, and the UserPromptSubmit hook are discovered from the repo layout.

**Option B — personal install:**
```bash
./install.sh --target claude --yes
```
Copies: 7 commands → `~/.claude/commands/`, 3 subagents → `~/.claude/agents/`, bundle →
`~/.product-design-partner/`. (The hook only runs under the plugin route.)

**Verify:** type `/design` — it should autocomplete; ask "design a dashboard" — the subagents
appear in the agent picker (plugin route also shows the hook nudge).

**Figma MCP (optional):** `claude mcp add --transport http figma https://mcp.figma.com/mcp`

## Cursor

```bash
./install.sh --target cursor --yes
```
Copies: 7 commands → `~/.cursor/commands/`, rule → `~/.cursor/rules/product-design-partner.mdc`,
3 agents → `~/.cursor/agents/`, bundle → `~/.product-design-partner/`.

For per-project attachment, also copy the rule into that project:
`cp cursor/rules/product-design-partner.mdc <project>/.cursor/rules/`

Note: Cursor appends your typed text after a command — the generated Cursor commands are worded
for that (no `$ARGUMENTS`).

**Figma MCP (optional):** Cursor Settings → MCP → add `https://mcp.figma.com/mcp`.

## Codex

```bash
./install.sh --target codex --yes
```
Copies: 7 prompts → `~/.codex/prompts/`, bundle → `~/.product-design-partner/`, and manages a
marker-delimited block in `~/.codex/AGENTS.md`:

- No file → creates it.
- Existing file → **appends** the block between
  `<!-- >>> product-design-partner v2 >>> -->` … `<!-- <<< product-design-partner v2 <<< -->`.
- Re-install → **replaces** the block in place (idempotent; your own content is never touched).

**Figma MCP (optional):** add to `~/.codex/config.toml`:
```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
```

## OpenCode

```bash
./install.sh --target opencode --yes
```
Copies into `~/.config/opencode/`: agent entry → `agents/product-design-partner.md`, modules →
`product-design-partner/modules/` (kept **out** of `agents/` so OpenCode doesn't list each module
as a phantom subagent), 7 commands → `command/`, references/templates → `design-data/`, helpers →
`scripts/`. Also **removes** any legacy v1.x enforcement plugin files from `plugins/` (the v2 agent
uses no plugins).

Use it as `@product-design-partner …` or via the slash commands.

## Any other LLM (local models, file-access setups…)

`./install.sh --target custom --path <dir>` copies the full bundle anywhere. Load
`agent/product-design-partner.md` as the system prompt and keep `design-data/` readable.

---

## Uninstall

```bash
./uninstall.sh --target <claude|cursor|codex|opencode|custom|all>
```

| Flag | Effect |
|---|---|
| `--dry-run` | Print everything that would be removed; delete nothing |
| `--purge` | Also delete generated design output and the whole bundle |
| `--yes` | Skip the confirmation prompt |
| `--path <dir>` | With `--target custom` |

What it covers:
- All v2 files **and legacy v1.x artifacts** (old command names like `interface.md`, the OpenCode
  enforcement plugin, the old `interface-design` agent).
- Codex: strips only the marker block from `~/.codex/AGENTS.md` (removes the file only if it is
  byte-identical to the shipped one, or empty after stripping).
- Claude Code plugin route: detected and reported with the exact removal command
  (`claude plugin uninstall product-design-partner`); cached plugin dirs removed under `--purge`.
- Empty directories the installer created are cleaned up; shared dirs (`~/.claude/commands/` etc.)
  are never deleted.
- Your work in `design-data/projects/` is preserved unless `--purge`.

Manual leftovers to check: project-level `.cursor/rules/product-design-partner.mdc` copies, and
any Figma MCP registration you added (remove via the same UI/CLI you used to add it).

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `/design` doesn't autocomplete | Command files missing — re-run `./install.sh --target <t> --yes`; on Claude Code plugin route check `/plugin` shows the plugin enabled |
| Agent ignores its method / freelances | Make sure the entry file is loaded: commands read `agent/product-design-partner.md` first. On generic LLMs, install the bundle with `--target custom` and load `agent/product-design-partner.md` as the system prompt |
| `node: command not found` during `/prototype` | Install Node 20+ (`brew install node` / `apt install nodejs`); the agent will otherwise deliver UNVERIFIED with run instructions |
| Dev server "busy by another project" | Correct behavior — another project owns that port. The script matches by project path; just re-run, it picks a free port |
| Old v1.x commands still showing | Run `./uninstall.sh --target all` from the v2 repo — it sweeps legacy names — then reinstall |
