# Architecture Overview

This document explains how the Product Design Partner agent works internally.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                         │
│  (@product-design-partner or conversation reference)        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Core Agent Router (~240 lines)                  │
│           product-design-partner.md                          │
│  • Analyzes request                                          │
│  • Routes to appropriate workflow                            │
│  • Loads necessary modules on-demand                         │
└────────────────────────┬────────────────────────────────────┘
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
         │  • Ban list (284 ln)   │
         │  • Brand ID (336 ln)   │
         │  • Patterns (326 ln)   │
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

#### INDEX.md
- System map of all modules
- Loading priorities
- Module dependencies

#### quality-gates.md
- 5 mandatory validation gates
- Brand identity guidelines
- Enforcement rules

#### workflows.md
- 14 complete workflow templates
- Step-by-step procedures
- Output formats

#### standards-and-anti-patterns.md
- Banned pattern definitions
- Premium pattern templates
- Quality criteria

#### frameworks-and-artifacts.md
- Design deliverable templates
- Documentation formats
- Handoff specifications

### 3. Plugin System (OpenCode)

**Location**: `plugins/`

#### product-design.js (856 lines)
**Purpose**: Primary validation plugin for OpenCode

**What it does**:
- Runs all 5 quality gates and blocks output that fails them
- Scans for forbidden (ban-list) patterns
- Tracks variance to prevent repetitive vibe+layout combinations
- Injects context-aware guidance based on detected design intent

**Hooks** (OpenCode):
```javascript
return {
  // Append intent-aware guidance + skill suggestions to the prompt
  'tui.prompt.append': async (input, output) => { /* ... */ },

  // Validate design output against all 5 gates before it's shown (blocks on failure)
  'tui.before-response': async (input, output) => { /* ... */ },

  // Preserve design context (intent, tokens, variance) across compaction
  'experimental.session.compacting': async (input, output) => { /* ... */ }
};
```

#### design-validator.mjs (394 lines)
**Purpose**: Standalone validator for any LLM (no OpenCode required)

**Usage**:
```bash
node design-validator.mjs design-output.md
```

**Output**:
- Pass/fail for each gate
- Detailed violation reports
- Suggestions for fixes
- Validation history entry

#### design-migrator.js (297 lines)
**Purpose**: One-time migration of legacy design data into the current `design-data/` structure

#### csv-converter.mjs
**Purpose**: Convert DesignPrompts.dev CSV exports to JSON

**Usage**:
```bash
node csv-converter.mjs styles.csv > designprompts-styles.json
```

### 3.5 Distribution Surfaces

Beyond the agent and plugins, the suite ships several ways to invoke the same system:

- **Slash commands** — `commands/` (Claude Code) and `opencode/command/` (OpenCode), 12 each: the 6 new capabilities (`/mentor`, `/ux-flows`, `/ux-audit`, `/design-converter`, `/figma-export`, `/portfolio`) plus 6 wrapping existing workflows (`/research`, `/design-system`, `/interface`, `/critique`, `/handoff`, `/strategy`).
- **Goal-mode prompt** — `prompts/goal-mode.md`, a portable, self-contained ≤4000-char system prompt for any single instruction field.
- **Claude Code packaging** — `.claude-plugin/plugin.json` (manifest), `agents/product-design-partner.md` (subagent), and `hooks/` (a `UserPromptSubmit` intent nudge mirroring the OpenCode `tui.prompt.append` hook).

### 4. Reference Data System

**Location**: `design-data/references/`

#### ban-list.md (284 lines)
Forbidden patterns that signal generic AI output:
- "Modern" / "Clean" / "User-friendly"
- Generic gradients (#667eea to #764ba2)
- Default shadows (0 10px 15px rgba(0,0,0,0.1))
- Predictable layouts (centered hero, 3-card grid)
- 10 total patterns with detection rules

#### brand-identity.md (336 lines)
Agent's own design system (demonstrates principles):
- Typography: Inter + Fragment Mono
- Color: Deep plum #501E60 (brand) + violet #7C3AED (accent)
- Architecture: Double-Bezel, Button-in-Button, Whisper-Quiet Elevation
- Motion: Custom easing curves

#### premium-patterns.md (326 lines)
High-quality alternatives to banned patterns:
- 15 premium architecture patterns
- Evidence-based color palettes
- Intent-driven typography systems
- Accessibility-first layouts

#### Capability reference files
Domain knowledge backing the 6 newer workflows:
- **mentorship-frameworks.md** — idea → concept (JTBD, riskiest assumption, concept brief)
- **ux-flow-patterns.md** — user flows, journey maps, information architecture
- **ux-heuristics.md** — Nielsen's 10 heuristics + WCAG 2.1 AA checklist + severity
- **design-converter-guide.md** — sketch/screenshot → tokens → UI (gates enforced)
- **portfolio-frameworks.md** — CRP-PDSI case-study structure

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
User-generated project files. Each project contains:
```
projects/
  project-name/
    brief.md          [Initial requirements]
    research.md       [User research findings]
    design-system.md  [Token definitions]
    screens/          [Interface designs]
    handoff/          [Developer specs]
```

#### components/
Reusable component definitions:
```
components/
  ButtonPrimary.md
  DashboardCard.md
  NavigationSidebar.md
```

#### tokens/
Design token definitions (JSON):
```json
{
  "color": {
    "primary": "#501E60",
    "secondary": "#7C3F92"
  },
  "typography": {
    "heading": "Inter",
    "body": "Inter",
    "mono": "Fragment Mono"
  }
}
```

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

There is no `npm`/Jest harness yet; verification uses Node's built-in checks and the standalone validator.

### Syntax Checks
```bash
node --check plugins/product-design.js
node --check plugins/design-validator.mjs
node --check hooks/inject-design-context.mjs
```

### Gate Validation
```bash
# Validate a design artifact against all 5 gates
node plugins/design-validator.mjs examples/dashboard-design.md
# Inspect the result under design-data/validation-history/
```

### Install Smoke Test
```bash
echo y | ./install.sh --target custom --path /tmp/pda-test
find /tmp/pda-test -type f | sort   # agent, plugins, commands, prompts, data
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

- [Workflow Reference](../agent/modules/workflows.md) - All 17 workflows in detail
- [Contributing Guide](contributing.md) - Extend the system
- [Examples](../examples/) - Learn from real usage
