# Product Design Partner - Complete System Map

## Architecture Overview

The Product Design Partner agent is a modular design system with strict quality enforcement. It consists of:

- **Core Agent** (~270 lines): Identity, workflow router, quick references
- **6 Modules**: workflows, quality-gates, standards, frameworks, platform-adaptation, INDEX
- **5 Plugins/utilities**: validation, variance, sync-commands, path-resolver, migration, CSV conversion
- **Reference Data**: Ban lists, brand guidelines, premium patterns, design prompt libraries

**Flow**: User request → Core agent routes → Loads relevant modules → Follows workflow → Plugin validates output

---

## File Structure

```
~/.config/opencode/agents/
├── product-design-partner.md              [~240 lines - Core Agent / Router]
└── modules/
    ├── INDEX.md                           [~240 lines - This File]
    ├── quality-gates.md                   [~290 lines - Gates 1-5, Brand, Patterns]
    ├── workflows.md                       [~580 lines - 17 Workflows + Process Router §0]
    ├── platform-adaptation.md             [LLM-specific paths, enforcement, optimizations]
    ├── standards-and-anti-patterns.md     [~135 lines - Quality + Anti-patterns]
    └── frameworks-and-artifacts.md        [~215 lines - Frameworks + Templates]

~/.config/opencode/plugins/
├── product-design.js                      [856 lines - Core Plugin]
├── design-validator.mjs                   [394 lines - Standalone Validator]
├── design-migrator.js                     [297 lines - Data Migration]
└── csv-converter.mjs                      [222 lines - CSV to JSON]

~/.config/opencode/design-data/
├── references/
│   ├── ban-list.md                        [284 lines - Forbidden Patterns]
│   ├── brand-identity.md                  [336 lines - Brand Guidelines, two-tone color]
│   ├── premium-patterns.md                [326 lines - Architecture Patterns]
│   ├── mentorship-frameworks.md           [AI Mentor - idea → concept]
│   ├── ux-flow-patterns.md                [UX Flows - journeys, IA]
│   ├── ux-heuristics.md                   [UX Audit - Nielsen + WCAG]
│   ├── design-converter-guide.md          [Design Converter - image → UI]
│   ├── portfolio-frameworks.md            [Portfolio - case studies]
│   ├── prototype-variants-guide.md        [Prototype Variants - 2-3 distinct directions]
│   ├── diagram-guide.md                   [Diagrams - Mermaid, ASCII wireframes, FigJam]
│   ├── annotation-guide.md                [Annotations - callouts, redlines, decision records]
│   ├── research-templates.md              [Research - screener, discussion guide, JTBD]
│   ├── brainstorming-playbook.md          [Brainstorm - technique cards, convergence rubric]
│   ├── designprompts-styles.json          [191 KB - Style Reference Data]
│   ├── designprompts-colors.json          [91 KB - Color Palettes]
│   └── designprompts-typography.json      [68 KB - Typography Systems]
├── projects/[project-name]/
│   ├── system.md                          [Design System Documentation]
│   ├── research-plan.md                   [Research Planning]
│   ├── synthesis-report.md                [Research Synthesis]
│   ├── handoff.md                         [Developer Handoff Specs]
│   └── wireframes.md                      [Figma Wireframes]
├── components/[component-name]/
│   └── design.md                          [Component Documentation]
├── tokens/[project-name].json             [Design Tokens Export]
├── variance-history.json                  [Last 10 Outputs Tracking]
└── validation-history/*.json              [Gate Validation Logs]
```

---

## Distribution Artifacts (repo)

Beyond the installed agent/plugin/data, the repository ships interface and packaging files:

- **`commands/*.md`** (16, canonical) — Claude Code slash commands (`/mentor`, `/ux-flows`, `/ux-audit`, `/design-converter`, `/figma-export`, `/portfolio`, `/research`, `/design-system`, `/interface`, `/critique`, `/handoff`, `/strategy`, `/prototype`, `/diagram`, `/annotate`, `/brainstorm`)
- **`opencode/command/*.md`** (16) — OpenCode format (`agent: product-design-partner`), GENERATED
- **`cursor/commands/*.md`** (16) + **`cursor/rules/*.mdc`** — Cursor commands (GENERATED) + always-available rule
- **`codex/prompts/*.md`** (16) + **`codex/AGENTS.md`** — Codex custom prompts (GENERATED) + global instructions
- **`plugins/sync-commands.mjs`** — generates the OpenCode/Cursor/Codex sets from `commands/` (single source of truth)
- **`plugins/sync-agents.mjs`** — generates `cursor/agents/` from `agents/` (single source of truth)
- **`prompts/goal-mode.md`** — portable, self-contained ≤4000-char system prompt
- **`agents/*.md`** (4) — Claude Code subagents: `product-design-partner`, `interface-design`, `prototype-variants`, `figma-export`
- **`cursor/agents/*.md`** (4) — Cursor subagents (GENERATED from `agents/`)
- **`.claude-plugin/plugin.json`** — Claude Code plugin manifest
- **`hooks/`** — `hooks.json` + `inject-design-context.mjs` (UserPromptSubmit intent nudge)

## Module Dependencies

### quality-gates.md
**Used by:**
- Interface Design Workflow (mandatory - all 5 gates)
- Design Critique Workflow (references gates 3 & 5)
- Figma Integration Workflow (validates gates 3 & 5)

**Contains:**
- Gate 1: Intent Declaration (Who/What/Feel)
- Gate 2: Domain Exploration (Domain/Color/Signature/Defaults)
- Gate 3: Validation Tests (Swap/Squint/Signature/Token)
- Gate 4: Variance Check (Vibe + Layout archetypes)
- Gate 5: Ban List (10 forbidden patterns)
- Brand Identity (Inter + Fragment Mono; plum #501E60 brand + violet #7C3AED accent)
- Premium Architecture Patterns (Double-Bezel, Button-in-Button, Whisper-Quiet, Custom Motion)

### workflows.md
**Used by:** All user requests (router determines which workflow)

**Contains:**
1. User Research Workflow (+ research-templates.md)
2. Design System Workflow
3. Interface Design Workflow (requires quality-gates.md; Variant Protocol — 2-3 directions for new UI)
4. Product Strategy Workflow (divergence quota; + brainstorming-playbook.md)
5. Design Critique Workflow
6. Design Handoff Workflow
7. Accessibility Audit Workflow
8. Figma Integration Workflow (context-aware: collaborate vs. plan mode)
9. AI Mentor Workflow (idea → product concept)
10. UX Flows Workflow (journeys, task flows, IA)
11. UX Audit Workflow (usability + WCAG)
12. Design Converter Workflow (sketch/screenshot → UI; all 5 gates)
13. Figma Export Workflow (write direction via Figma MCP; no-MCP fallback bundle)
14. Portfolio Builder Workflow (case studies)
15. Prototype Variants Workflow (2-3 runnable single-file prototypes; user picks)
16. Diagram Workflow (Mermaid flow/sequence/state/journey/ER/architecture; FigJam export)
17. UX Annotations & Write-ups Workflow (typed callouts, redlines, decision records)

### standards-and-anti-patterns.md
**Used by:** All workflows (referenced for quality checks)

**Contains:**
- 6 Quality Standards: Evidence-based, Systematic, Craft-focused, Accessible, Documented, Performant
- 7 Anti-pattern Categories: Research, Design System, Interface Design, Product Strategy, Critique, Accessibility, UX Copy

### frameworks-and-artifacts.md
**Used by:**
- Research Workflow (research methods, analysis frameworks)
- Strategy Workflow (brainstorming techniques)
- All workflows (output artifact templates)

**Contains:**
- 5 Decision Framework Categories: Research Methods, Analysis, Brainstorming, Design Principles, Critique
- 5 Output Artifact Templates: System Documentation, Research Plan, Synthesis Report, Component Docs, Handoff Spec

---

## Plugin Integration Points

### product-design.js (856 lines)
**Integration:** Hook-based, no file dependencies

**Functionality:**
- `tui.prompt.append`: Injects context-aware guidance based on 240+ trigger terms across 22 domains
- `tui.before-response`: Validates all 5 gates before output (blocks if gates fail)
- `experimental.session.compacting`: Preserves design context during compression

**Key Features:**
- Variance tracking (6 vibes × 6 layouts = 36 combinations, prevents repetition in last 2 outputs)
- Design intent detection (matches user message to workflows)
- Ban list enforcement (scans for 10 forbidden patterns)
- Brand font validation (flags non-Inter/Fragment Mono)
- DesignPrompts.dev integration (loads style reference data)
- Figma URL detection (activates collaboration mode)

**Data Files:**
- Reads: `design-data/variance-history.json`
- Reads: `design-data/references/designprompts-styles.json`
- Writes: `design-data/variance-history.json`

### design-validator.mjs (394 lines)
**Integration:** Standalone script, callable from agent/plugin/CLI

**Functionality:**
- Validates all 5 gates independently
- Returns structured results: `{ passed: boolean, gates: [...], timestamp }`
- Can be invoked manually for design artifact validation

**Data Files:**
- Reads: `design-data/variance-history.json`
- Writes: `design-data/validation-history/*.json`

### design-migrator.js (297 lines)
**Integration:** One-time migration script

**Functionality:**
- Migrates legacy `design-system/MASTER.md` → `design-data/projects/*/system.md`
- Migrates `.interface-design/references/` → new structure
- Creates `.migrated` marker to prevent re-runs

### csv-converter.mjs (222 lines)
**Integration:** One-time conversion script

**Functionality:**
- Converts DesignPrompts.dev CSV files to JSON
- `styles.csv` → `designprompts-styles.json`
- `colors.csv` → `designprompts-colors.json`
- `typography.csv` → `designprompts-typography.json`

---

## Quick Navigation

| Need | Module | Section |
|------|--------|---------|
| **Intent declaration rules** | quality-gates.md | Gate 1 |
| **Domain exploration** | quality-gates.md | Gate 2 |
| **Validation tests** | quality-gates.md | Gate 3 |
| **Variance check** | quality-gates.md | Gate 4 |
| **Ban list** | quality-gates.md | Gate 5 |
| **Brand fonts/colors** | quality-gates.md | Brand Identity |
| **Premium patterns** | quality-gates.md | Architecture Patterns |
| **Research workflow** | workflows.md | Section 1 |
| **Design system workflow** | workflows.md | Section 2 |
| **Interface design workflow** | workflows.md | Section 3 |
| **Strategy workflow** | workflows.md | Section 4 |
| **Critique workflow** | workflows.md | Section 5 |
| **Handoff workflow** | workflows.md | Section 6 |
| **Accessibility workflow** | workflows.md | Section 7 |
| **Figma workflow** | workflows.md | Section 8 |
| **AI Mentor workflow** | workflows.md | Section 9 |
| **UX Flows workflow** | workflows.md | Section 10 |
| **UX Audit workflow** | workflows.md | Section 11 |
| **Design Converter workflow** | workflows.md | Section 12 |
| **Figma Export workflow** | workflows.md | Section 13 |
| **Portfolio Builder workflow** | workflows.md | Section 14 |
| **Prototype Variants workflow** | workflows.md | Section 15 |
| **Diagram workflow** | workflows.md | Section 16 |
| **Annotations & Write-ups workflow** | workflows.md | Section 17 |
| **Quality standards** | standards-and-anti-patterns.md | Quality Standards |
| **Anti-patterns list** | standards-and-anti-patterns.md | Anti-Patterns |
| **Research methods** | frameworks-and-artifacts.md | Research Methods |
| **Analysis frameworks** | frameworks-and-artifacts.md | Analysis Frameworks |
| **Brainstorming techniques** | frameworks-and-artifacts.md | Brainstorming |
| **Output templates** | frameworks-and-artifacts.md | Output Artifacts |

---

## Loading Sequence Example

**User Request:** "I need to design a dashboard for support managers"

**Agent Flow:**
1. **Main agent loads** (200 lines)
2. **Detects workflow:** Interface Design
3. **Loads modules:**
   - `quality-gates.md` (gates 1-5 + brand + patterns)
   - `workflows.md` → Interface Design Workflow
4. **Follows workflow:**
   - Step 1: Gate 1 - Frame Intent (Who/What/Feel)
   - Step 2: Gate 2 - Domain Exploration
   - Step 3: Gate 4 - Variance Check (consults plugin)
   - Step 4: Establish Foundations (premium patterns)
   - Step 5: Gate 5 - Ban List Check
   - Step 6: Gate 3 - Validation Tests
   - Step 7: Document System
5. **Plugin validates:**
   - `product-design.js` runs `tui.before-response` hook
   - Checks all gates dynamically via pattern matching
   - Blocks output if any gate fails
   - Adds to variance history if passes
6. **Output delivered** (if all gates pass)

---

## Version History

- **2026-06-15**: v1.3 — Platform adaptation module, product-design-process reference, path-resolver.mjs (cross-platform design-data paths), validator markdown-field fix, macOS install guide, scripts/test.sh smoke suite, docs/workflows.md
- **2026-06-10**: v1.2 — Variant Protocol (2-3 distinct directions for all new UI) + 3 new workflows (Prototype Variants §15, Diagrams §16, UX Annotations & Write-ups §17), 5 new reference files (prototype-variants, diagram, annotation, research-templates, brainstorming-playbook), 4 new commands (/prototype, /diagram, /annotate, /brainstorm), Cursor + Codex packaging with `sync-commands.mjs` generator, install.sh targets for all 4 platforms
- **2026-05-31**: Added 6 capabilities (AI Mentor, UX Flows, UX Audit, Design Converter, Figma Export, Portfolio Builder), 5 reference files, slash commands (Claude Code + OpenCode), `.claude-plugin/` packaging, portable goal-mode prompt, and two-tone brand (plum #501E60 / violet #7C3AED)
- **2026-05-27**: Modular restructure - split 881-line agent into 6 files (1 core + 5 modules)
- **2026-05-27**: Original system - single 881-line agent file with 4 plugins

---

*This document is the complete system map for the Product Design Partner agent. For daily workflow usage, start with the main agent file (`product-design-partner.md`) which will route you to relevant modules.*
