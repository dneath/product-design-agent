# Installation Guide

This guide covers installation for Claude Code, Cursor, Codex, OpenCode, and other LLM environments.

## Prerequisites

| Platform | Needs |
|---|---|
| **Claude Code** | any recent version (plugin support preferred) |
| **Cursor** | commands (`.cursor/commands`) + rules support |
| **Codex** | custom prompts (`~/.codex/prompts`) + AGENTS.md support |
| **OpenCode** | v1.0+ with plugin support |
| **Other LLMs** | custom system prompt (required), file reading (recommended) |

> **Enforcement note**: only OpenCode runs the gate-validation plugin automatically. On Claude Code the UserPromptSubmit hook (plugin install) nudges the gates; on Cursor/Codex the gates are enforced by instruction (rule / AGENTS.md). Any platform can validate artifacts manually with `node plugins/design-validator.mjs <file>`.

## Quick Start

### Automated Installation (Recommended)

```bash
# Clone or download the repository
cd product-design-agent

# Run installer (auto-detects environment)
./install.sh

# Or specify target explicitly
./install.sh --target claude      # Claude Code
./install.sh --target cursor
./install.sh --target codex
./install.sh --target opencode
./install.sh --target custom --path /your/path
```

The script will:
1. Detect your environment
2. Create necessary directories
3. Copy all files (agent, plugins, slash commands, rules/AGENTS.md, goal-mode prompt, reference data)
4. Validate the installation
5. Display usage instructions

Cursor, Codex, and Claude Code installs also place the full bundle (agent + modules + reference data) at `~/.product-design-partner/`, which the commands reference.

### Manual Installation

#### Claude Code

Preferred: install as a plugin — run `/plugin` in Claude Code and add this repo (it ships `.claude-plugin/plugin.json`, the 16 commands, the subagent, and the UserPromptSubmit hook).

Personal-directory alternative:

```bash
cp commands/*.md ~/.claude/commands/
cp agents/product-design-partner.md ~/.claude/agents/
./install.sh --target claude     # installs the ~/.product-design-partner bundle
```

#### Cursor

```bash
# Global commands (all projects)
mkdir -p ~/.cursor/commands && cp cursor/commands/*.md ~/.cursor/commands/

# Per-project rule (gate enforcement + identity)
mkdir -p <project>/.cursor/rules
cp cursor/rules/product-design-partner.mdc <project>/.cursor/rules/

# Bundle (modules + reference data the commands point at)
./install.sh --target cursor
```

#### Codex

```bash
mkdir -p ~/.codex/prompts && cp codex/prompts/*.md ~/.codex/prompts/

# Global agent identity — append if you already have an AGENTS.md
cat codex/AGENTS.md >> ~/.codex/AGENTS.md   # or: cp codex/AGENTS.md ~/.codex/AGENTS.md

./install.sh --target codex                  # installs the bundle
```

#### OpenCode

```bash
# 1. Copy agent files
cp agent/product-design-partner.md ~/.config/opencode/agents/
cp -r agent/modules ~/.config/opencode/agents/product-design-partner/

# 2. Copy plugins (enables automatic validation)
cp plugins/*.js plugins/*.mjs ~/.config/opencode/plugins/

# 3. Copy slash commands
cp opencode/command/*.md ~/.config/opencode/command/

# 4. Copy reference data
mkdir -p ~/.config/opencode/design-data/references
cp design-data/references/*.md ~/.config/opencode/design-data/references/
cp design-data/references/*.json ~/.config/opencode/design-data/references/

# 5. Create runtime directories
mkdir -p ~/.config/opencode/design-data/{projects,components,tokens,validation-history}
touch ~/.config/opencode/design-data/{projects,components,tokens,validation-history}/.gitkeep
```

#### Custom Path (Any LLM)

```bash
# Set your installation path
INSTALL_PATH="/your/custom/path"

# 1. Copy agent files
mkdir -p $INSTALL_PATH/agents/product-design-partner
cp agent/product-design-partner.md $INSTALL_PATH/agents/
cp -r agent/modules $INSTALL_PATH/agents/product-design-partner/

# 2. Copy plugins
mkdir -p $INSTALL_PATH/plugins
cp plugins/*.js plugins/*.mjs $INSTALL_PATH/plugins/

# 3. Copy reference data
mkdir -p $INSTALL_PATH/design-data/references
cp design-data/references/* $INSTALL_PATH/design-data/references/

# 4. Create runtime directories
mkdir -p $INSTALL_PATH/design-data/{projects,components,tokens,validation-history}
```

## Verification

### Test OpenCode Installation

```bash
# Start OpenCode
opencode

# In OpenCode, type:
@product-design-partner Hello
```

If installed correctly, the agent will respond and be ready to work.

### Test Claude Code Installation

1. Open Claude Code and type `/prototype a pricing page for a developer tool`
2. The agent should run Gates 1-2, then present 2-3 distinct variant concepts

### Test Cursor Installation

1. Open Cursor chat and type `/interface` — it should autocomplete from `~/.cursor/commands/`
2. With the rule attached, any design request should start with intent (Who/What/Feel)

### Test Codex Installation

1. Run `codex` and type `/brainstorm onboarding ideas`
2. The session should follow the divergence quota (≥15 ideas, ≥3 techniques)

### Test Standalone Validator

```bash
# Create a test file
echo "Test design output" > test-design.md

# Run validator
node plugins/design-validator.mjs test-design.md

# Should output validation results
```

## Configuration

### Path Dependencies

The plugins reference paths like:
```javascript
path.join(directory, '.config', 'opencode', 'design-data', ...)
```

If you install to a custom location, you may need to update these paths in:
- `plugins/product-design.js`
- `plugins/design-validator.mjs`

### Environment Variables (Optional)

You can set these to customize behavior:

```bash
# Override default data directory
export DESIGN_DATA_DIR="/custom/design-data"

# Disable variance tracking (not recommended)
export DISABLE_VARIANCE_TRACKING=true
```

## Troubleshooting

### Agent Not Found (OpenCode)

**Problem**: `@product-design-partner` doesn't autocomplete

**Solutions**:
1. Verify file location: `~/.config/opencode/agents/product-design-partner.md`
2. Restart OpenCode
3. Check OpenCode logs for errors

### Reference Data Not Loading

**Problem**: Agent can't access ban-list.md or other references

**Solutions**:
1. Verify files exist: `ls ~/.config/opencode/design-data/references/`
2. Check file permissions: `chmod 644 ~/.config/opencode/design-data/references/*`
3. Ensure path matches what plugins expect

### Plugin Validation Errors

**Problem**: Validator fails with "Cannot find module"

**Solutions**:
1. Ensure Node.js is installed: `node --version`
2. Check plugin paths are correct
3. Run from the plugins directory: `cd ~/.config/opencode/plugins && node design-validator.mjs`

### Variance History Not Saving

**Problem**: Repeated designs with same patterns

**Solutions**:
1. Check write permissions: `ls -la ~/.config/opencode/design-data/`
2. Manually create variance-history.json: `echo '[]' > ~/.config/opencode/design-data/variance-history.json`
3. Verify plugin is loaded by OpenCode

## Updating

To update to a new version:

```bash
# Backup your runtime data first
cp -r ~/.config/opencode/design-data/projects ~/backup-projects
cp -r ~/.config/opencode/design-data/components ~/backup-components

# Run install script again
./install.sh --target opencode

# Restore your data
cp -r ~/backup-projects/* ~/.config/opencode/design-data/projects/
cp -r ~/backup-components/* ~/.config/opencode/design-data/components/
```

## Uninstalling

### OpenCode

```bash
rm ~/.config/opencode/agents/product-design-partner.md
rm -r ~/.config/opencode/agents/product-design-partner/
rm ~/.config/opencode/plugins/product-design.js
rm ~/.config/opencode/plugins/design-validator.mjs
rm ~/.config/opencode/plugins/design-migrator.js
rm ~/.config/opencode/plugins/csv-converter.mjs

# Optional: Remove reference data (keeps your generated content)
rm -r ~/.config/opencode/design-data/references/

# Optional: Remove ALL design data (deletes your projects/components)
rm -r ~/.config/opencode/design-data/
```

### Claude Code / Cursor / Codex

```bash
# Shared bundle
rm -rf ~/.product-design-partner

# Claude Code
cd ~/.claude/commands && rm -f interface.md prototype.md brainstorm.md diagram.md annotate.md \
  mentor.md ux-flows.md ux-audit.md design-converter.md figma-export.md portfolio.md \
  research.md design-system.md critique.md handoff.md strategy.md
rm -f ~/.claude/agents/product-design-partner.md

# Cursor
cd ~/.cursor/commands && rm -f <same 16 files>
rm -f ~/.cursor/rules/product-design-partner.mdc   # and any project .cursor/rules copies

# Codex
cd ~/.codex/prompts && rm -f <same 16 files>
# Remove the Product Design Partner section from ~/.codex/AGENTS.md
```

## Next Steps

After installation:
1. Read the [Architecture Overview](architecture.md) to understand how the system works
2. Review the [Workflow Reference](../agent/modules/workflows.md) for usage patterns
3. Try the [Examples](../examples/) to see the agent in action
4. Check [Contributing Guide](contributing.md) if you want to extend functionality
