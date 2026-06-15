# Platform Adaptation — LLM Optimization Guide

The Product Design Partner runs on four first-class platforms plus generic LLMs. Behavior is identical; **enforcement and path resolution differ**. Load this module when the user's environment is unclear or when output fails validation on a non-OpenCode platform.

## Platform comparison

| Platform | Identity | Commands | Gate enforcement | Design-data root |
|----------|----------|----------|------------------|------------------|
| **OpenCode** | `@product-design-partner` agent | `/interface` in `~/.config/opencode/command/` | **Automatic** — `product-design.js` plugin | `~/.config/opencode/design-data/` or project `.config/opencode/` |
| **Claude Code** | Subagent + plugin | `~/.claude/commands/` or plugin `commands/` | **Hook nudge** — UserPromptSubmit; manual validator | Plugin: project `design-data/`; personal: `~/.product-design-partner/` |
| **Cursor** | Rule `.mdc` + commands | `~/.cursor/commands/` or project `.cursor/commands/` | **Instruction-only** (rule) + optional validator | `~/.product-design-partner/design-data/` or repo `design-data/` |
| **Codex** | `~/.codex/AGENTS.md` | `~/.codex/prompts/` | **Instruction-only** + optional validator | Same as Cursor bundle |
| **Generic LLM** | `prompts/goal-mode.md` or agent markdown | None (paste prompt) | Manual — run `design-validator.mjs` | Repo `design-data/` or `DESIGN_DATA_DIR` |

## Path resolution (all platforms)

Resolve paths in this order:

1. `DESIGN_DATA_DIR` environment variable (override)
2. Repo / workspace `design-data/` (development or project-local)
3. `~/.product-design-partner/design-data/` (Cursor, Codex, Claude personal install)
4. `~/.config/opencode/design-data/` (OpenCode)

Plugins use `plugins/path-resolver.mjs`. Agents should prefer **repo-relative** `design-data/` when working inside a checkout; use `~/.product-design-partner/` when installed globally.

## Per-platform optimizations

### OpenCode
- **Strength**: Plugin blocks gate violations before response ships; variance history persists automatically.
- **Load strategy**: Keep context lean — router first, load one workflow module + one reference file.
- **Tools**: `@product-design-partner` routes; plugins handle validation.
- **Validate manually**: `node ~/.config/opencode/plugins/design-validator.mjs artifact.md`

### Claude Code (macOS, Linux, Windows)
- **Preferred install**: Plugin from repo (`.claude-plugin/plugin.json`) — enables 16 commands, subagent, and hook.
- **Personal install**: `./install.sh --target claude` → `~/.claude/commands/` + bundle at `~/.product-design-partner/`.
- **Paths in commands**: `${CLAUDE_PLUGIN_ROOT}/agent/modules/...` when plugin-mounted; else `~/.product-design-partner/agent/modules/...`.
- **Context**: Use subagent for long interface/prototype work to preserve main thread.
- **macOS note**: Same paths on Intel and Apple Silicon; home is `/Users/<you>/`.

### Cursor (macOS, Linux, Windows)
- **Rule attachment**: Copy `cursor/rules/product-design-partner.mdc` into **project** `.cursor/rules/` for gate enforcement on that repo.
- **Commands**: Global `~/.cursor/commands/` or project `.cursor/commands/`. Cursor **appends** user text after the command — there is no `$ARGUMENTS` substitution.
- **Context**: Rule is short; **Read** the full router (`agent/product-design-partner.md`) when a slash command fires.
- **MCP**: Figma MCP via Settings → MCP → `https://mcp.figma.com/mcp`. Without MCP, deliver Mermaid + token JSON fallbacks.
- **macOS**: Install with `./install.sh --target cursor`; bundle at `~/.product-design-partner/`.

### Codex
- **Global identity**: `~/.codex/AGENTS.md` (append `codex/AGENTS.md` if file exists).
- **Prompts**: `~/.codex/prompts/*.md` — supports `$ARGUMENTS`.
- **MCP**: `~/.codex/config.toml` → `mcp_servers.figma` → `https://mcp.figma.com/mcp`.
- **Optimization**: Codex sessions are often task-focused — lead with the matched slash prompt, then load only the workflow section needed.

### Generic / other LLMs (ChatGPT, Gemini, local models)
- Paste `prompts/goal-mode.md` into the system/custom-instructions field (≤4000 chars).
- For full capability, paste `agent/product-design-partner.md` + load modules on demand.
- **Always** run `node plugins/design-validator.mjs output.md` before treating UI output as final.
- Set `DESIGN_DATA_DIR=/path/to/design-data` if not using default locations.

## Model-type optimizations

| Model tendency | Compensating instruction |
|----------------|-------------------------|
| **Verbose / over-explains** | State deliverable upfront (e.g. "3 variants + comparison table, then stop") |
| **Skips process** | Name the phase (Discover/Define/Develop/Deliver) and required workflow § |
| **Generic visual defaults** | Enforce Gate 1 forbidden words + Gate 5 ban list explicitly |
| **Single solution** | Variant Protocol — refuse single UI for new screens |
| **Weak structured output** | Use templates from `frameworks-and-artifacts.md` verbatim |
| **Small context window** | `goal-mode.md` only; one workflow section; one reference file |
| **Strong coding, weak UX** | Run Gates 3–5 before any HTML/CSS; require annotation pass (§17) |

## Validation without plugins

```bash
# From repo root or with DESIGN_DATA_DIR set
node plugins/design-validator.mjs design-data/projects/my-app/system.md
echo $?   # 0 = all gates passed
```

Validator accepts markdown field labels: `**Who**:`, `- **Swap Test**:`, etc.

## macOS quick install

```bash
# Prerequisites (once)
xcode-select --install          # if git/node missing
brew install node               # Node 18+ for validator

# Install for your tool
git clone <repo> && cd product-design-agent
chmod +x install.sh scripts/test.sh
./install.sh --target cursor --yes   # or claude | codex | opencode
./scripts/test.sh
```

See `docs/installation-macos.md` for full macOS paths and troubleshooting.
