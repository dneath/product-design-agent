# Product Design Partner Agent

A systematic, evidence-based product design agent for AI coding assistants — **Claude Code, Cursor, Codex, and OpenCode** — with strict quality enforcement gates.

**Designers:** → [Quick start](docs/designer-quick-start.md) · [Handoff guide](docs/handoff-guide.md) · [Which command?](docs/workflows-by-task.md)  
**Install (macOS):** → [Claude Code](docs/installation-claude-code-macos.md) · [Cursor](docs/installation-cursor-macos.md) · [Codex](docs/installation-codex-macos.md) · [OpenCode](docs/installation-opencode-macos.md)  
**All platforms:** → [Documentation index](docs/README.md) · [Install](docs/installation.md)

## Features

- **17 Specialized Workflows**: User research, design systems, interface design, product strategy, design critique, handoff specs, accessibility audits, Figma integration, AI mentor, UX flows, UX audit, design converter, Figma export, portfolio builder — plus prototype variants, diagrams, and UX annotations & write-ups
- **Variant Protocol**: every new UI is delivered as **2–3 genuinely distinct directions** (own vibe+layout pairing and signature element each) with a comparison table and recommendation — you pick the winner, the agent refines it
- **5 Quality Gates**: Mandatory validation for intent declaration, domain exploration, validation tests, variance tracking, and ban list enforcement
- **Evidence-Based**: Every recommendation traces to sources with confidence levels; UX decisions documented as decision records
- **Research-First**: Researches real references + published evidence before designing (curated sources in `design-data/references/design-research-sources.md`)
- **Craft-Focused**: Intent-first design with self-critique mandate to avoid generic AI defaults; context-driven styling with no fixed brand
- **WCAG 2.1 AA**: Accessibility built in as core requirement, not afterthought
- **Variance Tracking**: Prevents repetitive design patterns across outputs
- **Reference Libary**: 350KB reference library of styles, colors, and typography
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
- **Prototype Variants**: 2–3 interactive React directions in one app (tab group/toggle to switch A/B/C), verified in a real browser — you choose the best one
- **Diagrams**: Flowcharts, sequence/state/journey/ER/architecture diagrams (Mermaid, optional FigJam export)
- **UX Annotations & Write-ups**: Numbered typed callouts (interaction/state/motion/content/a11y/logic), redlines, and design-rationale decision records

## Architecture

```
product-design-agent/
├── agent/
│   ├── product-design-partner.md      [Core agent definition]
│   └── modules/                       [7 focused modules]
│       ├── INDEX.md                   [System map]
│       ├── quality-gates.md           [5 gates + context-driven visual foundations]
│       ├── workflows.md               [17 complete workflows + process router]
│       ├── platform-adaptation.md     [OpenCode, Claude, Cursor, Codex, generic LLM]
│       ├── context-management.md      [summarization, lean memory + scratch.md, sub-agent isolation]
│       ├── standards-and-anti-patterns.md
│       └── frameworks-and-artifacts.md
│
├── plugins/
│   ├── product-design.js              [Core validation plugin for OpenCode]
│   ├── design-validator.mjs           [Standalone validator (any LLM)]
│   ├── path-resolver.mjs              [Cross-platform design-data paths]
│   ├── sync-commands.mjs              [Generates OpenCode/Cursor/Codex commands]
│   ├── design-migrator.js             [Legacy data migration]
│   └── csv-converter.mjs              [DesignPrompts.dev converter]
│
├── design-data/
│   └── references/                    [reference data]
│       ├── ban-list.md                [forbidden patterns]
│       ├── styling-resolution.md      [context-driven styling resolution order]
│       ├── premium-patterns.md        [optional craft techniques]
│       ├── design-research-sources.md [curated research sources + how to research]
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
│       ├── product-design-process.md  [Double Diamond, phase routing]
│       └── designprompts-*.json       [350KB - styles, colors, typography]
│
├── commands/                          [16 canonical slash commands (Claude Code)]
├── opencode/command/                  [16 OpenCode commands — generated]
├── cursor/                            [16 Cursor commands + rule — generated]
├── codex/                             [16 Codex prompts + AGENTS.md — generated]
├── prompts/                           [portable goal-mode prompt]
├── agents/                            [Claude Code subagent]
├── hooks/                             [UserPromptSubmit intent nudge]
├── scripts/
│   ├── dev-server.mjs                 [project-scoped dev-server: check/start/stop/url]
│   └── test.sh                        [smoke tests]
├── install.sh / uninstall.sh          [install + clean uninstall (mirrored flags)]
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

**macOS (Intel & Apple Silicon):** see **[docs/installation-macos.md](docs/installation-macos.md)** for Homebrew Node setup, per-app paths, and `--yes` non-interactive install.

```bash
./install.sh --target cursor --yes   # skip confirmation prompt
./scripts/test.sh                    # verify syntax, sync, validator, hook
```

### Uninstall

`uninstall.sh` mirrors `install.sh` — same `--target` values (`opencode | claude | cursor | codex | custom | all`):

```bash
./uninstall.sh --target claude                # remove a single target's install
./uninstall.sh --target all --dry-run         # preview what would be removed
./uninstall.sh --target all --purge --yes     # remove everything, incl. generated output
```

Uninstall preserves your generated design output (`design-data/projects/`) by default; `--purge` removes it too.

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
| `/prototype` | 2–3 interactive React variants in one app (browser-verified) — you pick the winner |
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

`prompts/goal-mode.md` is a system prompt that distills the whole agent into a single field. 

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

| Doc | Audience |
|-----|----------|
| **[Quick start for designers](docs/designer-quick-start.md)** | First day; minimal jargon |
| **[Handoff guide](docs/handoff-guide.md)** | Team onboarding + rollout |
| **[Workflows by task](docs/workflows-by-task.md)** | Which `/command` when |
| **[Quality gates (plain English)](docs/quality-gates-for-designers.md)** | Why the agent asks Who/What/Feel |
| **[Troubleshooting](docs/troubleshooting-for-designers.md)** | Common fixes |
| **[Documentation index](docs/README.md)** | Full doc map |
| [Claude Code on macOS](docs/installation-claude-code-macos.md) | Claude Code install |
| [Cursor on macOS](docs/installation-cursor-macos.md) | Cursor install |
| [Codex on macOS](docs/installation-codex-macos.md) | Codex install |
| [OpenCode on macOS](docs/installation-opencode-macos.md) | OpenCode install |
| [Installation](docs/installation.md) | All platforms + comparison |
| [macOS hub](docs/installation-macos.md) | Shared Mac prerequisites |
| [Workflow reference](docs/workflows.md) | Technical § index |
| [Architecture](docs/architecture.md) | Maintainers |
| [Contributing](docs/contributing.md) | Extending the agent |
| [Changelog](CHANGELOG.md) | Version history |
| [Examples](examples/README.md) | Sample prompts |

## Visual Foundations (context-driven styling)

The agent has **no fixed brand** and never defaults to one. Visual style is resolved from context, in order:

1. **Existing repo tokens** — Tailwind config, CSS variables, theme files, component library, fonts already in the project
2. **Figma variables** — pulled via the Figma MCP when available
3. **User-specified** — any brand, palette, or type you provide
4. **Fallback defaults** (only when nothing above exists): monochrome OKLCH neutrals (never pure `#000`/`#fff`), a 4px-based spacing scale, Inter for UI/text + Fragment Mono for mono

Defaults are paired with craft principles — OKLCH color, whisper-quiet elevation, concentric border radius, optical alignment, ease-out motion (transform/opacity only), tabular numbers, image outlines, scale-on-press, ≥40×40px hit areas, and balanced/pretty text wrapping.

See `design-data/references/styling-resolution.md` for the full resolution order, and `design-data/references/premium-patterns.md` for optional craft techniques.

## How It Works

**Modular Loading**: The core router loads seven modules on demand (workflows, quality-gates, standards, frameworks, platform-adaptation, context-management, INDEX). See [architecture](docs/architecture.md).

**Research-First**: Before designing, the agent researches real-world references and published evidence — see `design-data/references/design-research-sources.md` for curated sources, research method, and output format.

**File Output**: Task output is always written to the active project working directory (default `design-data/projects/<project>/`); large artifacts are referenced by path. The agent never writes output into its own instruction/config files or the installed bundle.

**Dev-Server Detection**: `scripts/dev-server.mjs` reliably finds, starts, stops, and reports the URL of a project's dev server (`check` / `start` / `stop` / `url`), scoped to the specific project so it never false-matches unrelated ports.

**Context Management**: The `context-management` module keeps sessions lean — summarization/compaction, a lean project-memory file plus a per-project `scratch.md`, sub-agent isolation for browser and dev-server checks, and output hygiene.

**Plugin Validation** (OpenCode): The product-design.js plugin runs automatically on every design output, blocking responses that violate quality gates. It also tracks variance history and suggests skills proactively.

**Standalone Validation** (Other LLMs): Use design-validator.mjs to validate design artifacts manually. Results are saved to validation-history/ for review.

**Reference Data**: The agent includes 350KB of curated reference data covering:
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

Contributions welcome — see [docs/contributing.md](docs/contributing.md). Version history lives in [CHANGELOG.md](CHANGELOG.md).
