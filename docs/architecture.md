# Architecture Overview

How the Product Design Partner fits together. For day-to-day use, designers should start with [designer-quick-start.md](designer-quick-start.md), [handoff-guide.md](handoff-guide.md), and [workflows-by-task.md](workflows-by-task.md).

**Version:** 1.3.1 · **Workflows:** 17 · **Modules:** 7 · **Slash commands:** 16 · **Subagents:** 4 · **Platforms:** OpenCode, Claude Code, Cursor, Codex

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                         │
│  (@product-design-partner or conversation reference)        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Core Agent Router (~270 lines)                  │
│           product-design-partner.md                          │
│  • Analyzes request + process phase (§0)                       │
│  • Routes to workflow; loads modules on demand                 │
│  • Delegates heavy work to specialized subagents (optional)   │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌────────────────┐ ┌────────────┐ ┌────────────┐
│ Heavy subagents│ │ Workflow   │ │  Quality   │
│ interface-design│ │  Module    │ │   Gates    │
│ prototype-variants│ │            │ │   Module   │
│ figma-export   │ │            │ │            │
└───────┬────────┘ └─────┬──────┘ └─────┬──────┘
        │                │               │
        └────────────────┼───────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌────────────┐  ┌────────────┐  ┌────────────┐
│ Workflow   │  │  Quality   │  │ Standards  │
│  Module    │  │   Gates    │  │   Module   │
│            │  │   Module   │  │            │
└─────┬──────┘  └─────┬──────┘  └─────┬──────┘
      │               │               │
      └───────────────┼───────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │   Reference Data       │
         │  • Ban list (292 ln)   │
         │  • Styling resolution  │
         │  • Patterns (optional)  │
         │  • Research sources    │
         │  • UX/mentor/portfolio │
         │  • DesignPrompts JSON  │
         └────────────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │  Runtime Validation    │
         │  (OpenCode Plugin)     │
         │  • Gate enforcement    │
         │  • Variance tracking   │
         │  • History logging     │
         └────────────────────────┘
```

## Core Components

### 1. Core Agent Router

**Location**: `agent/product-design-partner.md`
**Size**: ~240 lines
**Purpose**: Lightweight router that analyzes requests and loads modules dynamically

**Key Responsibilities**:
- Parse user intent from natural language
- Determine which workflow(s) to activate
- Load only necessary modules to minimize context usage
- Coordinate between workflows when multiple apply

**Example Routing Logic**:
```
"Design a dashboard" → Interface Design Workflow
"Plan user interviews" → User Research Workflow
"Review this mockup" → Design Critique Workflow
"Audit accessibility" → Accessibility / UX Audit Workflow
"Mentor my idea" → AI Mentor Workflow
"Turn this screenshot into UI" → Design Converter Workflow
"Write a case study" → Portfolio Builder Workflow
```

### 2. Module System

**Location**: `agent/modules/`
**Purpose**: Specialized subagents loaded on-demand
**Count**: 7 modules — INDEX, workflows, quality-gates, standards-and-anti-patterns, frameworks-and-artifacts, platform-adaptation, context-management

#### INDEX.md
- System map of all modules
- Loading priorities
- Module dependencies

#### quality-gates.md
- 5 mandatory validation gates
- Visual Foundations (context-driven) — no fixed brand; styling resolved from context
- Craft Principles (always-on quality bar) + Optional Craft Techniques (opt-in)
- Enforcement rules

#### workflows.md
- 17 workflow templates + §0 Process Router (research-first routing)
- Variant Protocol for all new UI
- Step-by-step procedures and output paths under `design-data/projects/`

#### platform-adaptation.md
- Per-platform paths, enforcement, and model compensations
- Cursor / Codex / Claude Code / OpenCode / generic LLM

#### standards-and-anti-patterns.md
- Banned pattern definitions
- Optional craft techniques (opt-in, not a required architecture)
- Quality criteria

#### frameworks-and-artifacts.md
- Design deliverable templates
- Documentation formats
- Handoff specifications

#### context-management.md
- Compaction / summarization guidance
- Lean memory file + per-project `scratch.md`
- Sub-agent isolation and output hygiene

### 3. Plugin & tooling (`plugins/`)

#### product-design.js
OpenCode plugin: gate enforcement, variance tracking, intent detection, DesignPrompts integration. Uses `path-resolver.mjs` for data paths.

#### design-validator.mjs
Standalone validator for any platform. Accepts markdown gate fields (`**Who**:`). CLI: `node plugins/design-validator.mjs <file>`.

#### path-resolver.mjs
Resolves `design-data/` across repo, `~/.product-design-partner/`, OpenCode config, and `DESIGN_DATA_DIR`. Also exposes `resolveProjectOutputRoot()` and `projectOutputDir(workspaceDir, projectName)` — these resolve where generated work is written (the project working directory) and **never** resolve into the agent's own instruction/config files or the installed bundle.

#### sync-commands.mjs
Generates `opencode/command/`, `cursor/commands/`, `codex/prompts/` from canonical `commands/`.

#### sync-agents.mjs
Generates `cursor/agents/` from canonical `agents/` (path rewrites for bundle install).

#### design-migrator.js / csv-converter.mjs
One-time migration and DesignPrompts CSV conversion.

### 3.5 Distribution surfaces

- **16 slash commands** — canonical set in `commands/`; generated copies for OpenCode, Cursor, Codex
- **Goal-mode prompt** — `prompts/goal-mode.md` (≤4000 chars, no file dependencies)
- **Claude Code** — `.claude-plugin/plugin.json`, 4 subagents, UserPromptSubmit hook
- **Cursor** — `cursor/rules/product-design-partner.mdc` + commands + agents
- **Codex** — `codex/AGENTS.md` + prompts
- **Smoke tests** — `scripts/test.sh`
- **Dev server** — `scripts/dev-server.mjs` (project-scoped check/start/stop/url for prototype apps; no false matches across unrelated ports)
- **Install / uninstall** — `install.sh` and `uninstall.sh` (mirrored: `--target opencode|claude|cursor|codex|custom|all`, `--purge`, `--dry-run`, `--yes`)

### 4. Reference Data System

**Location**: `design-data/references/`

#### ban-list.md (284 lines)
Forbidden patterns that signal generic AI output:
- "Modern" / "Clean" / "User-friendly"
- Generic gradients (#667eea to #764ba2)
- Default shadows (0 10px 15px rgba(0,0,0,0.1))
- Predictable layouts (centered hero, 3-card grid)
- 10 total patterns with detection rules

#### styling-resolution.md (189 lines)
Context-driven styling guide — **there is no fixed brand or house style**. Styling is resolved from context every time, in priority order:
1. **Existing repo tokens** (Tailwind config, CSS `:root`/`@theme`, token files, shadcn/MUI/Chakra theme) — adopt and extend, never replace.
2. **Figma variables** — pull variables/styles and map them 1:1 to CSS variables.
3. **User-specified** palette / font / brand / reference — use exactly.
4. **Fallback defaults** (only when none of the above applies): monochrome tinted-neutral grayscale in **OKLCH** (never `#000`/`#fff`); a **4px** spacing scale; **Inter** (UI/text) + **Fragment Mono** (mono). The single accent (if any) comes from the product's domain.

(Formerly `brand-identity.md`; the previous fixed brand palette was removed in favor of context-driven styling.)

#### premium-patterns.md (335 lines)
**Optional** craft techniques — opt-in, not a required architecture. Patterns like Double-Bezel and Button-in-Button are available when a design calls for them, but are never mandatory. Always-on craft (whisper-quiet elevation, ease-out motion) lives in the Craft Principles of `quality-gates.md`, not here.

#### design-research-sources.md (83 lines)
Research-first methodology — where and how to gather real references and published evidence **before** designing (real product UI, visual/motion inspiration, code/component sources, evidence-based UX research), plus the expected output shape. Feeds §0 routing and the Interface (§3) and Prototype (§15) workflows.

#### Capability reference files (14 markdown + 3 JSON)
Includes: ban-list, styling-resolution, premium-patterns, design-research-sources, prototype-variants-guide, diagram-guide, annotation-guide, research-templates, brainstorming-playbook, product-design-process, mentorship, ux-flows, ux-heuristics, design-converter, portfolio — plus DesignPrompts JSON (~350KB).

#### DesignPrompts.dev JSON Files (350KB total)

**designprompts-styles.json** (191KB)
- 83 visual style definitions
- Usage contexts
- Technical specifications

**designprompts-colors.json** (91KB)
- 161 color palettes
- Hex codes + names
- Psychology + associations

**designprompts-typography.json** (68KB)
- 72 font pairing recommendations
- Usage guidelines
- Platform availability

### 5. Runtime Data System

**Location**: `design-data/`

#### projects/
User-generated work — **gitignored** except `README.md`. See [design-data/projects/README.md](../design-data/projects/README.md).

Typical layout per project:

```
projects/my-product/
  concept.md · research-plan.md · flows.md · variants.md
  prototype/        runnable Vite + React app (tabs A/B/C) + screenshots/
  annotations.md · handoff.md · case-study.md
```

Generated work is always written to the project working directory (resolved via
`projectOutputDir()` / `resolveProjectOutputRoot()`), never into the agent's own
instruction/config files or the installed bundle.

#### components/
Reusable component definitions:
```
components/
  ButtonPrimary.md
  DashboardCard.md
  NavigationSidebar.md
```

#### tokens/
Design token definitions (JSON). Tokens are resolved from context (existing repo →
Figma → user-specified → fallback). The example below shows the **fallback** set: a
monochrome OKLCH neutral ramp (never `#000`/`#fff`) on a 4px spacing scale.
```json
{
  "color": {
    "surface": "oklch(0.98 0.004 250)",
    "foreground": "oklch(0.20 0.01 250)",
    "accent": "oklch(0.55 0.13 250)"
  },
  "spacing": [4, 8, 12, 16, 24, 32, 48, 64],
  "typography": {
    "heading": "Inter",
    "body": "Inter",
    "mono": "Fragment Mono"
  }
}
```
When working inside a repo or from Figma, mirror that system's tokens instead.

#### validation-history/
JSON logs of all validation runs:
```json
{
  "timestamp": "2026-05-31T12:00:00Z",
  "file": "dashboard-design.md",
  "gates": {
    "intent": {"pass": true},
    "domain": {"pass": true},
    "validation": {"pass": false, "reason": "Failed squint test"},
    "variance": {"pass": true},
    "banlist": {"pass": true}
  }
}
```

#### variance-history.json
Array of recent design outputs to prevent repetition:
```json
[
  {
    "timestamp": "2026-05-31T11:00:00Z",
    "vibe": "minimalist-editorial",
    "layout": "left-sidebar-primary",
    "palette": "warm-monochrome"
  }
]
```

## Data Flow

### Design Request Flow

```
1. User Request
   "Design a dashboard for monitoring API usage"
   
2. Core Router Analysis
   - Identifies: Interface Design workflow
   - Checks: Needs quality gates module
   - Loads: workflows.md + quality-gates.md
   
3. Workflow Execution
   [Intent Declaration]
   - Who: DevOps engineers
   - What: Monitor API health + investigate errors
   - Feel: Confident + in control
   
   [Domain Exploration]
   - 5+ concepts: Control room, medical dashboard, flight deck...
   - 5+ colors: Cool blues, warning yellows, error reds...
   - Signature: Real-time status timeline
   
4. Design Generation
   Agent produces design with:
   - Component specifications
   - Layout definitions
   - Token references
   - Interaction patterns
   
5. Validation (OpenCode Plugin)
   Gate 1: Intent - ✓ Pass
   Gate 2: Domain - ✓ Pass (6 concepts, 7 colors, signature present)
   Gate 3: Validation Tests - ✓ Pass (all 4 tests)
   Gate 4: Variance - ✓ Pass (different from last 2 outputs)
   Gate 5: Ban List - ✓ Pass (no forbidden patterns)
   
6. Output to User
   Validated design with confidence levels and source references
```

### Validation Flow (Standalone)

```
1. Design Output Saved
   user-dashboard.md
   
2. Manual Validation
   $ node plugins/design-validator.mjs user-dashboard.md
   
3. Validator Reads
   - Design output content
   - Ban list from references/ban-list.md
   - Variance history from variance-history.json
   
4. Gate Checks
   [5 gates run sequentially]
   
5. Results Written
   - Console output (human-readable)
   - validation-history/2026-05-31T12-00-00.json (machine-readable)
   
6. Variance Update
   If all gates pass:
   - Extract vibe + layout + palette
   - Append to variance-history.json
```

## Module Loading Strategy

**Problem**: Loading all modules upfront uses too much context

**Solution**: Lazy loading with caching

```javascript
// Pseudocode
onUserRequest(request) {
  const workflow = determineWorkflow(request);
  
  if (!cache.has(workflow.modules)) {
    loadModules(workflow.modules);  // Load only what's needed
    cache.set(workflow.modules);
  }
  
  executeWorkflow(workflow, cache);
}
```

**Typical Load Patterns**:
- Simple critique: Core + quality-gates.md (~500 lines)
- Interface design: Core + workflows.md + quality-gates.md (~800 lines)
- Full research → design → handoff: Core + all modules (~1200 lines)

## Extension Points

### Adding New Workflows

1. Add workflow template to `agent/modules/workflows.md`
2. Update routing logic in `agent/product-design-partner.md`
3. Add any new reference data to `design-data/references/`
4. Add a matching slash command in `commands/` and `opencode/command/`
5. Add trigger terms to `plugins/product-design.js` and `hooks/inject-design-context.mjs`

### Adding New Quality Gates

1. Define gate in `agent/modules/quality-gates.md`
2. Implement validation in `plugins/product-design.js` (OpenCode)
3. Implement validation in `plugins/design-validator.mjs` (standalone)
4. Add test cases in `examples/`

### Adding New Ban Patterns

1. Identify pattern in real outputs
2. Add to `design-data/references/ban-list.md` with:
   - Pattern description
   - Detection rule (regex or keyword)
   - Why it's banned
   - Better alternatives
3. Update validator logic if new detection method needed

### Custom Reference Data

Create additional JSON files in `design-data/references/`:
```json
{
  "category": "custom-patterns",
  "items": [
    {
      "name": "Pattern Name",
      "description": "What it is",
      "when": "When to use",
      "examples": ["Example 1", "Example 2"]
    }
  ]
}
```

Then reference in workflows:
```markdown
Consider these custom patterns from custom-patterns.json...
```

## Performance Considerations

### Context Usage
- **Core agent**: ~240 lines (~1KB)
- **Single workflow**: ~300-500 lines (~2-3KB)
- **Full system**: ~1500 lines (~8KB)
- **Reference data**: Loaded on-demand, not in context

### Validation Speed
- **OpenCode plugin**: <100ms per response (async)
- **Standalone validator**: <500ms per file

### Variance Tracking
- Stores last 10 designs (configurable)
- Checks 3 dimensions: vibe, layout, palette
- Allows 2 unique outputs before flagging repetition

## Security Considerations

### File Permissions
All files are user-readable only by default:
```bash
chmod 644 design-data/references/*
chmod 755 design-data/{projects,components,tokens,validation-history}
```

### Plugin Sandboxing
OpenCode plugins run in isolated context with:
- No network access
- File system access limited to design-data/
- No shell execution

### Data Privacy
- All processing is local
- No data sent to external services
- Validation history stored locally only

## Testing

```bash
./scripts/test.sh
```

Individual checks:

```bash
node --check plugins/design-validator.mjs
node plugins/sync-commands.mjs
node plugins/design-validator.mjs examples/dashboard-design.md
wc -c prompts/goal-mode.md   # must be ≤ 4000
```

Install smoke test:

```bash
./install.sh --target custom --path /tmp/pda-test --yes
./scripts/test.sh
rm -rf /tmp/pda-test
```

## Debugging

### Enable Debug Logging
```bash
# OpenCode
DEBUG=product-design:* opencode

# Standalone validator
DEBUG=true node plugins/design-validator.mjs file.md
```

### Check Module Loading
```bash
# See which modules loaded for a request
DEBUG=product-design:router opencode
@product-design-partner Design a dashboard
# Output shows: Loaded workflows.md, quality-gates.md
```

### Inspect Validation History
```bash
# View recent validations
cat design-data/validation-history/*.json | jq '.gates'

# Find failures
grep -r "pass.*false" design-data/validation-history/
```

## Next Steps

**Designers:** [Quick start](designer-quick-start.md) · [Workflows by task](workflows-by-task.md) · [Handoff guide](handoff-guide.md)

**Maintainers:** [Workflow reference](workflows.md) · [Contributing](contributing.md) · [Examples](../examples/README.md)
