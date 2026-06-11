# Product Design Partner Agent

A systematic, evidence-based product design agent for AI coding assistants — **Claude Code, Cursor, Codex, and OpenCode** — with strict quality enforcement gates.

## Features

- **17 Specialized Workflows**: User research, design systems, interface design, product strategy, design critique, handoff specs, accessibility audits, Figma integration, AI mentor, UX flows, UX audit, design converter, Figma export, portfolio builder — plus prototype variants, diagrams, and UX annotations & write-ups
- **Variant Protocol**: every new UI is delivered as **2–3 genuinely distinct directions** (own vibe+layout pairing and signature element each) with a comparison table and recommendation — you pick the winner, the agent refines it
- **5 Quality Gates**: Mandatory validation for intent declaration, domain exploration, validation tests, variance tracking, and ban list enforcement
- **Evidence-Based**: Every recommendation traces to sources with confidence levels; UX decisions documented as decision records
- **Craft-Focused**: Intent-first design with self-critique mandate to avoid generic AI defaults
- **WCAG 2.1 AA**: Accessibility built in as core requirement, not afterthought
- **Variance Tracking**: Prevents repetitive design patterns across outputs
- **DesignPrompts.dev Integration**: 350KB reference library of styles, colors, and typography
- **16 Slash Commands on 4 Platforms**: `/brainstorm`, `/prototype`, `/diagram`, `/annotate`, `/mentor`, `/ux-flows`, `/ux-audit`, `/design-converter`, `/figma-export`, `/portfolio`, `/research`, `/design-system`, `/interface`, `/critique`, `/handoff`, `/strategy` — Claude Code, Cursor, Codex, and OpenCode (generated from one canonical set)
- **Portable Goal-Mode Prompt**: a self-contained ≤4000-char prompt for any single instruction field
- **Claude Code Plugin**: `.claude-plugin/plugin.json` packaging with commands, a subagent, and a prompt hook

## What This Agent Does

The Product Design Partner helps with:

- **User Research**: Planning studies, conducting interviews, synthesizing findings
- **Design Systems**: Auditing token coverage, documenting components, ensuring consistency
- **Interface Design**: Dashboards, admin panels, SaaS apps, data-heavy tools
- **Product Strategy**: Brainstorming, opportunity identification, assumption testing
- **Design Critique**: Structured feedback on usability, hierarchy, consistency
- **Design Handoff**: Complete developer specs with layout, tokens, states, edge cases
- **UX Copy**: Microcopy, error messages, empty states, CTAs
- **Accessibility**: WCAG audits and remediation guidance
- **AI Mentor**: Guiding an idea to a defensible product concept
- **UX Flows**: User journeys, task flows, and information architecture
- **UX Audit**: Combined usability (Nielsen) + accessibility (WCAG) review
- **Design Converter**: Turning sketches or screenshots into UI
- **Figma Export**: Pushing designs and design systems into Figma
- **Portfolio Builder**: Generating case studies from project artifacts
- **Prototype Variants**: 2–3 runnable, distinct single-file prototypes per new UI — you choose the best one
- **Diagrams**: Flowcharts, sequence/state/journey/ER/architecture diagrams (Mermaid, optional FigJam export)
- **UX Annotations & Write-ups**: Numbered typed callouts (interaction/state/motion/content/a11y/logic), redlines, and design-rationale decision records

## Architecture

```
product-design-agent/
├── agent/
│   ├── product-design-partner.md      [Core agent definition]
│   └── modules/                       [5 modular subagents]
│       ├── INDEX.md                   [System map]
│       ├── quality-gates.md           [5 gates + brand identity]
│       ├── workflows.md               [17 complete workflows]
│       ├── standards-and-anti-patterns.md
│       └── frameworks-and-artifacts.md
│
├── plugins/
│   ├── product-design.js              [Core validation plugin for OpenCode]
│   ├── design-validator.mjs           [Standalone validator (any LLM)]
│   ├── sync-commands.mjs              [Generates OpenCode/Cursor/Codex commands]
│   ├── design-migrator.js             [Legacy data migration]
│   └── csv-converter.mjs              [DesignPrompts.dev converter]
│
├── design-data/
│   └── references/                    [reference data]
│       ├── ban-list.md                [forbidden patterns]
│       ├── brand-identity.md          [brand guidelines + two-tone color]
│       ├── premium-patterns.md        [architecture patterns]
│       ├── mentorship-frameworks.md   [AI mentor: idea → concept]
│       ├── ux-flow-patterns.md        [UX flows & IA]
│       ├── ux-heuristics.md           [UX audit: Nielsen + WCAG]
│       ├── design-converter-guide.md  [sketch/screenshot → UI]
│       ├── portfolio-frameworks.md    [portfolio case studies]
│       ├── prototype-variants-guide.md [2-3 distinct directions per new UI]
│       ├── diagram-guide.md           [Mermaid patterns + ASCII wireframes]
│       ├── annotation-guide.md        [callouts, redlines, decision records]
│       ├── research-templates.md      [screener, discussion guide, JTBD]
│       ├── brainstorming-playbook.md  [technique cards + convergence rubric]
│       └── designprompts-*.json       [350KB - styles, colors, typography]
│
├── commands/                          [16 canonical slash commands (Claude Code)]
├── opencode/command/                  [16 OpenCode commands — generated]
├── cursor/                            [16 Cursor commands + rule — generated]
├── codex/                             [16 Codex prompts + AGENTS.md — generated]
├── prompts/                           [portable goal-mode prompt]
├── agents/                            [Claude Code subagent]
├── hooks/                             [UserPromptSubmit intent nudge]
└── .claude-plugin/                    [Claude Code plugin manifest]
```

## Installation

### Option A: Automated (recommended)

```bash
# Run install script (auto-detects environment)
./install.sh

# Or specify installation target
./install.sh --target claude      # Claude Code  (~/.claude + ~/.product-design-partner bundle)
./install.sh --target cursor      # Cursor       (~/.cursor/commands + rule + bundle)
./install.sh --target codex       # Codex        (~/.codex/prompts + AGENTS.md + bundle)
./install.sh --target opencode    # OpenCode     (~/.config/opencode — agent, plugins, commands)
./install.sh --target custom --path /your/custom/path
```

The install script detects your environment, copies files to the right locations, validates the install, and prints usage instructions.

### Option B: Manual

**Claude Code** (best experience — gates hook + subagent):
install as a plugin via `/plugin` (this repo contains `.claude-plugin/plugin.json`), or copy `commands/*.md` → `~/.claude/commands/` and `agents/product-design-partner.md` → `~/.claude/agents/`, with the bundle at `~/.product-design-partner/`.

**Cursor:**
```bash
cp cursor/commands/*.md ~/.cursor/commands/        # or a project's .cursor/commands/
cp cursor/rules/product-design-partner.mdc <project>/.cursor/rules/
./install.sh --target cursor                       # also installs the bundle
```

**Codex:**
```bash
cp codex/prompts/*.md ~/.codex/prompts/
cat codex/AGENTS.md >> ~/.codex/AGENTS.md          # or copy, if you have none
./install.sh --target codex                        # also installs the bundle
```

**OpenCode:**
```bash
cp agent/product-design-partner.md ~/.config/opencode/agents/
cp -r agent/modules ~/.config/opencode/agents/product-design-partner/
cp plugins/*.js plugins/*.mjs ~/.config/opencode/plugins/
cp opencode/command/*.md ~/.config/opencode/command/
cp -r design-data ~/.config/opencode/
```

## Quick Start

### OpenCode

1. After installation, start OpenCode in your project:
   ```bash
   opencode
   ```

2. Invoke the agent:
   ```
   @product-design-partner Help me design a dashboard for monitoring API usage
   ```

3. The agent will route to the appropriate workflow and guide you through:
   - Intent declaration (who/what/feel)
   - Domain exploration
   - Validation tests
   - Final output with all gates passed

### Claude Code

```
/interface a triage dashboard for support managers drowning in SLA deadlines
/prototype the same brief        # 2-3 runnable variants to choose from
```
Or address the subagent: "Use the product-design-partner agent to audit my design system."

### Cursor

Type `/` and pick any of the 16 commands (installed in `~/.cursor/commands/`). Attach the `product-design-partner` rule (`.cursor/rules/`) for always-on gate enforcement.

### Codex

Type `/prototype`, `/brainstorm`, etc. (custom prompts in `~/.codex/prompts/`). `~/.codex/AGENTS.md` keeps the agent identity active in every session.

### Other LLMs

1. Paste `prompts/goal-mode.md` (≤4000 chars) as the system prompt, or load `agent/product-design-partner.md` + modules
2. For validation without plugins:
   ```bash
   node plugins/design-validator.mjs your-design-artifact.md
   ```

## Slash Commands

Available on all four platforms (Claude Code plugin / Cursor / Codex / OpenCode):

| Command | Does |
|---------|------|
| `/brainstorm` | Quota-enforced ideation: ≥15 ideas, ≥3 techniques, scored shortlist |
| `/prototype` | 2–3 runnable, distinct prototype variants — you pick the winner |
| `/diagram` | Flow / sequence / state / journey / ER / architecture diagram (Mermaid → FigJam) |
| `/annotate` | Numbered typed callouts + redlines + UX rationale decision records |
| `/mentor` | Guide an idea → product concept |
| `/ux-flows` | User journeys, task flows, information architecture |
| `/ux-audit` | Usability (Nielsen) + accessibility (WCAG 2.1 AA) |
| `/design-converter` | Sketch / screenshot → UI |
| `/figma-export` | Push a design or system into Figma (Figma MCP) |
| `/portfolio` | Generate a case study from project artifacts |
| `/research` | Plan or synthesize user research (screener, discussion guide, JTBD) |
| `/design-system` | Audit / document a design system + tokens |
| `/interface` | Design an interface (all 5 gates + Variant Protocol) |
| `/critique` | Structured design critique |
| `/handoff` | Developer handoff spec |
| `/strategy` | Problem framing + ideation |

`commands/` (Claude Code) is the canonical set; `opencode/command/`, `cursor/commands/`, and `codex/prompts/` are generated from it — edit the source and run `node plugins/sync-commands.mjs`.

## Goal-Mode Prompt

`prompts/goal-mode.md` is a portable, self-contained **≤4000-character** system prompt that distills the whole agent into a single field — paste it into a Claude Project, an agent "goal" field, or any LLM's system prompt. See `prompts/README.md` for usage.

## Usage Examples

### User Research
```
@product-design-partner I need to plan user interviews for understanding
how data analysts use our dashboard
```

### Interface Design
```
@product-design-partner Design a settings page for a SaaS analytics platform.
Users are data team leads who need to manage team permissions and API keys.
```

### Design Critique
```
@product-design-partner Review this dashboard design [attach screenshot or Figma URL]
```

### Accessibility Audit
```
@product-design-partner Run a WCAG 2.1 AA audit on this component
```

## Quality Gates

All design output passes through 5 mandatory gates:

1. **Intent Declaration**: Who (specific human) / What (specific task) / Feel (specific emotion)
2. **Domain Exploration**: 5+ domain concepts, 5+ natural colors, 1 signature element
3. **Validation Tests**: Swap test, squint test, signature test, token test
4. **Variance Check**: No repeat vibe+layout combos in last 2 outputs
5. **Ban List**: 10 forbidden patterns that signal generic AI output

**Plugins automatically enforce these gates in OpenCode.**  
**For other LLMs, use the standalone validator:**

```bash
node plugins/design-validator.mjs design-output.md
```

## Documentation

- [Installation Guide](docs/installation.md) - Detailed installation for all environments
- [Architecture Overview](docs/architecture.md) - System design and module dependencies
- [Workflow Reference](agent/modules/workflows.md) - All 17 workflows
- [Contributing](docs/contributing.md) - How to extend and improve the agent

## Brand Identity

The agent uses its own design system as a demonstration:

- **Fonts**: Inter (headings/body), Fragment Mono (code/labels/data)
- **Color**: Deep plum #501E60 (primary brand) + violet #7C3AED (interactive accent)
- **Architecture**: Double-Bezel, Button-in-Button, Whisper-Quiet Elevation, Custom Motion

See `design-data/references/brand-identity.md` for complete guidelines.

## How It Works

**Modular Loading**: The core agent (product-design-partner.md) is a lightweight router (~200 lines) that dynamically loads specialized modules as needed. This keeps context usage low while providing comprehensive guidance.

**Plugin Validation** (OpenCode): The product-design.js plugin runs automatically on every design output, blocking responses that violate quality gates. It also tracks variance history and suggests skills proactively.

**Standalone Validation** (Other LLMs): Use design-validator.mjs to validate design artifacts manually. Results are saved to validation-history/ for review.

**DesignPrompts.dev Integration**: The agent includes 350KB of curated reference data from DesignPrompts.dev, covering:
- 83 visual styles
- 161 color palettes
- 72 font pairings

## Requirements

- **Claude Code**: any recent version (plugin or personal commands/agents)
- **Cursor**: commands + project rules support
- **Codex**: custom prompts (`~/.codex/prompts`) + AGENTS.md support
- **OpenCode**: v1.0+ with plugin support (only platform with automatic gate *enforcement*; others enforce by instruction + the standalone validator)
- **Figma features**: the Figma MCP (`https://mcp.figma.com/mcp`) connected on your platform
- **Other LLMs**: custom system prompt (required), file reading (recommended), tool calling for validation (optional)

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

Contributions welcome! See [CONTRIBUTING.md](docs/contributing.md) for guidelines.

Key areas for contribution:
- Additional workflow templates
- More banned pattern detection
- Integration with other design tools
- Translations for international teams

## Changelog

### v1.2.0 (2026-06-10)
- **Variant Protocol**: new UI is always delivered as 2–3 genuinely distinct directions (own vibe+layout + signature each) with comparison table + recommendation; the user picks
- 3 new workflows: Prototype Variants (§15, runnable single-file prototypes), Diagrams (§16, Mermaid + FigJam), UX Annotations & Write-ups (§17, typed callouts + redlines + decision records)
- Deeper brainstorming (divergence quota, technique cards, convergence rubric) and research (assumption map, screener, discussion guide, JTBD profiles)
- 4 new commands: `/prototype`, `/diagram`, `/annotate`, `/brainstorm` (16 total)
- **Cursor + Codex support**: `cursor/` (commands + rule) and `codex/` (prompts + AGENTS.md), generated from the canonical `commands/` by `plugins/sync-commands.mjs`
- `install.sh` targets for claude (Claude Code), cursor, codex, opencode, custom
- Figma export fallback bundle + per-platform MCP connection steps; portable `design-data/` paths

### v1.1.0 (2026-05-31)
- 6 new capabilities: AI mentor, UX flows, UX audit, design converter, Figma export, portfolio builder
- 12 slash commands for Claude Code (`commands/`) and OpenCode (`opencode/command/`)
- Claude Code plugin packaging (`.claude-plugin/plugin.json`) + CC subagent
- Portable goal-mode prompt (`prompts/goal-mode.md`, ≤4000 chars)
- 5 new reference files (mentorship, UX flows, UX heuristics, design converter, portfolio)
- Two-tone brand: deep plum #501E60 (brand) + violet #7C3AED (accent); corrected OKLCH values

### v1.0.0 (2026-05-31)
- Initial release
- 8 complete workflows
- 5 quality gates with automatic enforcement
- OpenCode plugin with variance tracking
- DesignPrompts.dev reference data (350KB)
- Standalone validator for any LLM

## Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Share usage patterns and feedback via GitHub Discussions
- **Documentation**: Full docs at [docs/](docs/)

## Credits

Built by Dan for evidence-based, craft-focused product design with AI assistance.

Inspired by:
- DesignPrompts.dev (style reference data)
- WCAG 2.1 AA standards
- Double Diamond design process
- Jobs-to-be-Done framework
