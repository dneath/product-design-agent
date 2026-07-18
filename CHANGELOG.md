# Changelog

All notable changes to the Product Design Partner agent. Versioning follows [Semantic Versioning](https://semver.org/).

## [2.3.0] - 2026-07-17

Prototypes stop rebuilding scaffolding: seven vendored app shells become the default starting
point when there is no codebase to work in, with a standard dev-tooling suite preinstalled.
**Inside an existing repo nothing changes — its stack and tokens always win; shells are never
copied into a codebase.**

### Added
- **`design-data/shells/`** — 7 runnable Next.js App Router + Tailwind v4 + TypeScript +
  shadcn/ui (`new-york`) prototype shells: `blank`, `dashboard` (sidebar/topbar, KPI cards,
  Tremor-pattern charts on recharts, data table), `marketing` (hero/features/stats/testimonial/CTA
  with doctrine-compliant `motion` primitives), `ai-chat` (thread sidebar, mock token streaming
  with a working Stop, model picker), `saas` (mock login, settings, members with live
  role-switching gates, billing pages — pure UI, no payment provider), `docs` (@next/mdx +
  remark-gfm, client TOC), `portfolio` (work grid + MDX case studies). All fully mocked: zero env
  vars, no database, no auth libraries. Versions pinned exact; no lockfiles; per-shell README
  documents swap points; `LICENSES.md` covers adapted MIT registry code
- **One theming seam per shell** — `app/tokens.css` maps the OKLCH fallback scale onto the
  shadcn CSS-variable names (+ `@theme` bindings); rebrand = rewrite that file. Semantic tokens
  meet the 4.5:1 floor as small text on light surfaces (muted-foreground 51% L; success 50%;
  destructive 51%; warning 52%); `--faint-foreground` is documented disabled/decorative-only
- **`components/variant-switcher.tsx` contract** — tablist with bet labels, URL-hash persistence,
  arrow-key navigation, `useProtoState()` data-state toggle (default/loading/empty/error),
  `embedded` mode for use inside app chrome (renders a non-banner bar there), `[data-proto-root]`
  scope marker for verification
- **Default prototype tooling in every shell** (dev-only `components/dev-tools.tsx`): react-scan
  (re-render highlighting; toolbar off — it steals bottom-edge clicks), agentation (annotation →
  agent-readable markdown), mesurer (opt-in on **M** — its toolbar covers top-left UI), axe-core
  (run scoped to `[data-proto-root]` in verification), plus `npx react-doctor@latest
  --no-telemetry` as a verification-step static scan
- **`design-data/references/shells.md`** (references 8 → 9) — selection ladder (existing codebase
  first, always), archetype table, shell contract, copy/run commands, theming-swap procedure,
  shadcn registry list (`@shadcn`/`@tremor`/`@magicui`/`@aceternity`/`@originui`/Shadcn Studio)
  with the add-via-CLI + review-what-lands rule, tooling suite, from-scratch emergency fallback
- test.sh: shells section (structure, JSON validity, exact pins, tooling deps present, no
  node_modules/.next/lockfiles committed) + bundle-roundtrip shell checks

### Changed
- **`/prototype` starting point** (prototyping.md, command, subagent, entry routing, hook nudge):
  existing repo → matching shell → `blank/` → from-scratch as announced emergency fallback.
  "NEVER add UI libraries" is replaced by the registry rule: missing components come from the
  shadcn registries via CLI, reviewed on landing; bulk kit installs stay banned
- Prototype verification DoD adds axe (scoped) + react-doctor checkboxes
- `scripts/dev-server.mjs` serves `localhost` URLs (Next.js 16 rejects HMR websockets from
  origins it doesn't consider its own)
- install.sh/uninstall.sh copy and remove `design-data/shells/` (junk-file exclusion on copy);
  .gitignore adds `.next/`, `next-env.d.ts`, dev-server artifacts, `.playwright-cli/`

### Fixed (audit pass)
- `styling.md` fallback tokens now obey their own contrast floor (text-3 55%→51%; text-4 and the
  25% opacity rung documented disabled/decorative-only — placeholders stay ≥4.5:1), with a note
  mapping the primitives onto the shells' shadcn variable names
- Stale prerequisites and docs: Node 18+→20+ (`docs/install.md`), projects-README prototype tree
  Vite→shell-based Next.js, plugin README component map gains the shells row

## [2.2.0] - 2026-07-15

Trimmed scope to the core design workflows, fixed the OpenCode subagent clutter, and folded in
sharper pre-design discipline.

### Removed
- **`/deck`** (presentation decks) — command, `agent/modules/presentation.md`, and `design-data/templates/deck-template.md`
- **`/design-system`** — command and `agent/modules/design-systems.md`. Per-screen token resolution/craft and the reuse/no-raw-values discipline are preserved in `design-data/references/styling.md`
- **`/figma-export`** — command **and** the `figma-export` subagent. Figma as a *styling source* (resolution step 2) and Figma/FigJam **diagram** export in `/flows` are unaffected
- **`prompts/goal-mode.md`** portable prompt. For non-plugin LLMs, `./install.sh --target custom` copies the full bundle to load as a system prompt

### Fixed
- **OpenCode phantom subagents** — the installer copied the 9 modules into `~/.config/opencode/agents/product-design-partner/modules/`, inside OpenCode's agent-scanned tree, so every module showed up as a subagent. Modules now install to `~/.config/opencode/product-design-partner/modules/`, outside `agents/`; only `product-design-partner` remains an agent

### Added
- **Audit before inventing** (operating principle 1): in an existing product/repo, search for and reuse existing patterns/components/tokens before adding new ones; a new pattern must justify itself
- **Competing interpretations** in Thinking Protocol box 1: enumerate the ways an ambiguous term could be read instead of silently picking one
- **Token-discipline guardrails** in `styling.md`: never hardcode a raw color/spacing/radius/shadow/font-size when a token exists; reuse a component before creating one; honor a project's own principles/patterns docs
- Optional **`/critique` self-QA** step in `/design` and `/prototype`

### Changed
- **Chat stays short.** The Thinking Protocol answers, decisions, and rationale are recorded in the project design doc, not dumped into the terminal; chat returns a brief summary + artifact paths. When exploring flows/IA, Mermaid diagrams are embedded in that markdown doc
- Counts: 10→7 commands, 4→3 subagents, 9→7 modules, 2→1 templates. `test.sh` gains a guard against re-introducing the removed features

## [2.1.0] - 2026-07-08

Absorbed design-engineering doctrine — deeper motion, hardening, and copy standards distilled from a broad research pass, written as house rules.

### Added
- **`design-data/references/motion.md`** — full motion doctrine: frequency gate (100+×/day or keyboard-initiated = never animate), the one-question router (user→spring / system→easing / time→linear / high-frequency→none), duration tables with a 300ms hard cap, custom easing tokens, origin-aware physicality (never from `scale(0)`; popovers scale from trigger, modals exempt), interruptibility, compositor-only performance rules, gentler-not-zero reduced motion, and a review protocol (default-to-flagging, remedial order, Before/After/Why output)
- **`design-data/references/hardening.md`** — extreme-input matrix (0/1/typical/1,000+; 100+ chars; emoji/RTL/CJK), error UX per failure type (400/401/403/404/429/500/offline), i18n budgets (+30% expansion, logical properties, Intl APIs), empty-state anatomy + taxonomy, interruption/concurrency tests, the loading ladder, and an action-based verify list
- **`design-data/references/microcopy.md`** — verb+object button labels, the error formula (what + why + how-to-fix + example), tone-by-moment, one-term-per-concept glossaries, placeholder≠label, prefer-undo-over-confirmation
- **Pre-visual divergence step** in the design process: name the 3 obvious defaults and reject or justify each; pick ONE signature element; mine the domain
- **styling.md Part D — the generic-design failure test** with four self-tests (squint / swap / signature / token-name) and "spend boldness in one place"
- **Critique rigor** in heuristics.md: cognitive-load numeric limits with named violations, five test lenses selected by interface type, severity calibration + support-ticket tie-breaker, Before/After/Why craft table
- **Handoff production-readiness section** (template §9) — hardening categories as testable statements
- Entry file: operating principle 7 (**assert, then confirm**) and cross-model rule 9 (**skips are announced**)

### Changed
- Motion doctrine corrected to researched consensus: exits use **ease-out** (was ease-in); **300ms hard cap** (was 500ms); springs now required for gesture-driven motion (decorative bounce still banned); stagger 30–80ms/item (was ~100ms); press scale 0.97 at 100–160ms (was 0.96 at ~150ms)
- styling.md banned patterns 6 → 10 (purple gradients/glows, cream+serif+terracotta default trio, eyebrow-label rationing, numbered section scaffolding) — every ban now names its override condition
- Prototype fixtures must include hardening extremes; fake-precise vanity numbers and placeholder-person/company names banned
- frontend-quality: `dvh` over `vh`, safe-area insets, `min-width: 0` truncation fix, no scroll-event-driven animation, gated hover, `will-change` discipline
- References 5 → 8; routing table and `/design` `/prototype` `/critique` `/handoff` commands load the new references

## [2.0.0] - 2026-07-06

Full teardown and rebuild. See [MIGRATION.md](MIGRATION.md) for the complete deleted/kept/renamed record.

### Added
- **Thinking Protocol** — a mandatory 5-box checklist (restate the problem; what's NOT asked; riskiest assumptions; 2–3 approaches with tradeoffs; rationale on every decision) run before any pixels or code, in `agent/product-design-partner.md`
- **10 single-concern modules** with routing summaries: entry file + product-thinking, design-process, design-systems, prototyping, handoff, presentation, frontend-quality, environment, context-management
- **Presentation capability** (`/deck`): HTML/React slide decks with a mandatory structure (context → problem → constraints → explorations incl. rejected → recommendation → evidence → next steps) + `design-data/templates/deck-template.md`
- **Reusable handoff template** `design-data/templates/handoff-template.md` (flow, per-screen spec, state matrix, interaction table, a11y, data contract, rationale, open questions)
- **State matrix requirement**: every screen covers empty/loading/error/partial/overflow/first-run/success explicitly
- Cross-model rules (evidence-on-disk verification, steps-in-order, checklists-over-prose, no sub-agent nesting, harness-gated features) baked into the entry file for Sonnet-class/Opus/OpenCode/Codex portability
- Codex install now appends/replaces a marker-delimited block in `~/.codex/AGENTS.md` idempotently; uninstall strips only that block
- Uninstall sweeps legacy v1.x artifacts (old command names, OpenCode enforcement plugin) and detects Claude Code plugin-route installs

### Changed
- Commands consolidated 16 → 10: `/design` `/prototype` `/brainstorm` `/critique` `/design-system` `/handoff` `/deck` `/research` `/flows` `/figma-export`
- Subagent `interface-design` → `design`; all four subagents rebuilt against the new modules
- References consolidated 16 files + 3 datasets → 5 files: styling, heuristics, flow-patterns, research-methods, brainstorm-techniques
- Docs consolidated to `docs/install.md` + `docs/architecture.md`; `README.md` rewritten
- Sync generators moved `plugins/` → `scripts/`, now remove stale generated files and assert the "Read for method" convention
- `prompts/goal-mode.md` rewritten around the Thinking Protocol (≤4000 bytes, enforced by tests)

### Removed
- The 5-gate system, `plugins/design-validator.mjs`, and the OpenCode enforcement plugin `plugins/product-design.js` — replaced by the Thinking Protocol + per-module checklists
- `designprompts-*.json` style datasets (~350KB), variance tracking, vibe/layout archetypes
- One-time scripts (`design-migrator.js`, `csv-converter.mjs`), `plans/`, 13 docs, `examples/dashboard-design.md`

## [Unreleased-1.x]

### Added
- Per-platform macOS install guides: `installation-claude-code-macos.md`, `installation-cursor-macos.md`, `installation-codex-macos.md`, `installation-opencode-macos.md`

### Changed
- `installation.md`, `installation-macos.md`, handoff guide, quick start, doc index, and troubleshooting — equal depth for Claude Code, Cursor, Codex, and OpenCode (not Cursor-only)

## [1.4] - 2026-06-25

### Added
- Context-driven styling: agent has **no fixed brand** and never defaults to one — resolves repo tokens (Tailwind/CSS vars/theme/component lib/fonts) → Figma variables → user-specified → fallback defaults (monochrome OKLCH neutrals, never `#000`/`#fff`; 4px spacing scale; Inter for UI/text + Fragment Mono for mono). Renamed `design-data/references/brand-identity.md` → `styling-resolution.md`
- Research-first methodology: agent researches real references + published evidence before designing; new reference `design-data/references/design-research-sources.md` (curated sources + how to research + output format) and a new "Research-First" core principle
- Context/token management module `agent/modules/context-management.md` (summarization/compaction, lean project-memory file + per-project `scratch.md`, sub-agent isolation for browser/dev-server checks, output hygiene) — now 7 modules (was 6)
- Project-scoped dev-server detection script `scripts/dev-server.mjs` (`check` / `start` / `stop` / `url`; targets the correct server for a project, no false matches on unrelated ports)
- Clean uninstall script `uninstall.sh` mirroring `install.sh` (`--target opencode|claude|cursor|codex|custom|all`, `--purge`, `--dry-run`, `--yes`); preserves generated design output by default, `--purge` removes everything
- Raised craft defaults: OKLCH color, whisper-quiet elevation, concentric border radius, optical alignment, ease-out motion (transform/opacity only), tabular numbers, image outlines, scale-on-press, ≥40×40px hit areas, text-wrap balance/pretty

### Changed
- Prototypes are now interactive React in one app with a tab group/toggle to switch variants A/B/C (was separate self-contained HTML files); verified in a real browser before presenting; output to `design-data/projects/<project>/prototype/` (runnable Vite+React app) + `variants.md` + `screenshots/`
- File output rule: task output is always written to the project working directory (default `design-data/projects/<project>/`); large artifacts referenced by path; the agent never writes output into its own instruction/config files or the installed bundle
- `agent/modules/quality-gates.md`: "Brand Identity" + "Premium Architecture Patterns" sections replaced by "Visual Foundations (Context-Driven)" + "Craft Principles" + "Optional Craft Techniques"; `premium-patterns.md` is now optional techniques, not mandatory

### Removed
- Locked brand: deep plum `#501E60`, violet `#7C3AED`, "two-tone", and the mandatory Double-Bezel / Button-in-Button / Whisper-Quiet architecture (whisper-quiet elevation survives only as a general craft principle)

## [1.3.1] - 2026-06-15

### Added
- Targeted subagents for heavy workflows: `interface-design`, `prototype-variants`, `figma-export` (stubs in `agents/`; gate rules remain in `quality-gates.md` + `workflows.md` only)
- `plugins/sync-agents.mjs` — generates `cursor/agents/` from canonical `agents/`
- Delegation blocks in `/interface`, `/prototype`, `/figma-export` commands; router and hook nudges updated

### Changed
- `install.sh` installs all subagents for Claude Code and Cursor; bundle includes `agents/`
- Docs: platform-adaptation, handoff guide, architecture, INDEX, AGENTS.md, Codex AGENTS.md
- Designer-facing docs: `designer-quick-start.md`, `workflows-by-task.md`, `quality-gates-for-designers.md`, `troubleshooting-for-designers.md`; rewritten handoff guide and doc index for non-technical readers

## [1.3.0] - 2026-06-15

### Added
- Platform adaptation module (`agent/modules/platform-adaptation.md`)
- Product design process reference (`design-data/references/product-design-process.md`)
- Cross-platform path resolver (`plugins/path-resolver.mjs`)
- macOS installation guide (`docs/installation-macos.md`)
- Designer handoff guide (`docs/handoff-guide.md`) and documentation index (`docs/README.md`)
- Workflow reference (`docs/workflows.md`)
- Smoke test suite (`scripts/test.sh`)
- Project folder README for designers (`design-data/projects/README.md`)

### Changed
- Validator accepts markdown field labels (`**Who**:`, `- **Swap Test**:`)
- `install.sh` supports `--yes` / `-y` for non-interactive install
- Refined `.gitignore` for designer handoff (runtime output, local installs, secrets)

### Fixed
- Validator false failures on well-formed markdown artifacts
- Plugin and validator path resolution outside OpenCode-only directories

## [1.2.0] - 2026-06-10

### Added
- Variant Protocol — 2–3 distinct UI directions per new screen
- Workflows §15 Prototype Variants, §16 Diagrams, §17 UX Annotations & Write-ups
- Reference files: prototype-variants, diagram, annotation, research-templates, brainstorming-playbook
- Commands: `/prototype`, `/diagram`, `/annotate`, `/brainstorm` (16 total)
- Cursor + Codex packaging via `plugins/sync-commands.mjs`
- `install.sh` targets: claude, cursor, codex, opencode, custom

### Changed
- Portable `design-data/` paths (no OpenCode-only prefix in modules)
- Figma export fallback bundle + per-platform MCP setup notes

## [1.1.0] - 2026-05-31

### Added
- AI Mentor, UX Flows, UX Audit, Design Converter, Figma Export, Portfolio Builder
- 12 slash commands; Claude Code plugin packaging
- Goal-mode prompt (`prompts/goal-mode.md`, ≤4000 chars)
- Two-tone brand: plum `#501E60` + violet `#7C3AED`

## [1.0.0] - 2026-05-31

### Added
- Initial release: 8 workflows, 5 quality gates, OpenCode plugin, DesignPrompts.dev reference data
