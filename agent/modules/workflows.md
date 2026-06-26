# Design Workflows

Complete workflow specifications for all 17 design capabilities.

---

## 0. Process Router (start here when scope is unclear)

Before picking a workflow, identify the **phase** (see `design-data/references/product-design-process.md`):

| Phase | Workflows |
|-------|-----------|
| **Discover** | §1 Research, §4 Strategy, §9 Mentor |
| **Define** | §9 Mentor, §10 UX Flows, §16 Diagrams |
| **Develop** | §4 Brainstorm, §3 Interface, §15 Prototype, §12 Design Converter |
| **Deliver** | §2 Design System, §17 Annotations, §6 Handoff, §13 Figma Export |
| **Validate** | §5 Critique, §7 Accessibility, §11 UX Audit |

**Greenfield feature chain**: concept/research → flows/diagrams → variants (§15) or gated interface (§3) → annotations → handoff.

**Research-first (applies to every Develop/Define workflow)**: before designing a new screen, flow, component, or solving a specific UX problem, pull real references + published evidence and synthesize them — don't rely on memory or generic patterns. See `design-data/references/design-research-sources.md`. Save research artifacts to the working directory and cite by path.

**Platform note**: Load `./modules/platform-adaptation.md` when paths or gate enforcement differ by LLM (OpenCode plugin vs Cursor/Codex instruction-only). On long/multi-step tasks load `./modules/context-management.md` (compaction, scratch file, sub-agent isolation, output hygiene).

---

## 1. User Research Workflow

**When**: User asks about research planning, interview guides, usability tests, surveys

**Steps**:
1. **Frame Research Questions**: 3-5 specific questions this research will answer
2. **Map Assumptions First**: List what the team believes; rank by impact × uncertainty — the riskiest assumption picks the method (see assumption map template)
3. **Select Method**: Match method to question type (interviews for "why", surveys for "how many")
4. **Plan Execution**: Participant criteria + screener, sample size, timeline, materials — build the discussion guide from the templates (funnel structure: context → behavior → pain → magic wand)
5. **Conduct Research**: Follow discussion guide, observe behavior, capture verbatim quotes; ask about the last time, not the average time
6. **Analyze & Synthesize**: Thematic analysis (6 steps), affinity mapping, triangulation
7. **Deliver Insights**: Themes with evidence, confidence levels, JTBD statements, priority recommendations

**Key Standards**:
- Behavioral observation > stated preferences; "tell me about the last time…" > "would you…"
- Quote attribution: participant type, not name
- Confidence levels: High (5+ sources), Medium (3-4), Low (1-2)
- Frequency × severity = priority

**Reference**: `design-data/references/research-templates.md` (discussion guide, screener, assumption map, JTBD profile, synthesis wall)

**Output**: Save research plan to `design-data/projects/[project-name]/research-plan.md`

---

## 2. Design System Workflow

**When**: User mentions design system audit, component documentation, token coverage

**Steps**:
1. **Audit Current State**: Naming inconsistencies, hardcoded values, missing docs
2. **Identify Gaps**: Component completeness (variants, states, accessibility notes)
3. **Define Token Architecture**: Atomic → semantic tokens (colors, typography, spacing)
4. **Document Components**: Variants, states, props, usage guidelines, do's/don'ts
5. **Plan Migration**: Breaking changes need migration paths
6. **Verify Coverage**: Token usage across codebase, eliminate hardcoded values

**Key Standards**:
- Consistency > creativity: system exists so teams don't reinvent
- If not documented, doesn't exist
- Token-based architecture (no hardcoded hex values)
- Breaking changes = migration paths required

**Tools**: design-system skill

**Output**: Save to `design-data/projects/[project-name]/system.md`

---

## 3. Interface Design Workflow

**When**: Dashboards, admin panels, SaaS apps, data-heavy interfaces

**STRICT ENFORCEMENT ACTIVE**: All 5 gates must pass before showing output.

**Steps**:

1. **[GATE 1] Frame Intent** (MANDATORY - BLOCK if skipped):
   - Who: [Specific human in context]
   - What: [Specific task with verb]
   - Feel: [Specific not generic]
   - **Verification**: Read intent aloud. If it could apply to any product, REJECT and refine.

2. **Research first** (research-first — do this before exploring/designing):
   - Pull real references + published evidence for this problem: how shipping products solve it (Mobbin, Page Flows, real apps) + the UX "why" (NN/g, Baymard, Laws of UX, WCAG). Use 3–5 sources across categories; prefer evidence over opinion.
   - **Verify sources in the browser** (delegate heavy browsing to a sub-agent that returns links + notes + screenshots — not raw pages).
   - Save the research artifact to `design-data/projects/[project-name]/research/` and cite it by path; it feeds the domain exploration below.
   - Full method + source list: `design-data/references/design-research-sources.md`

3. **[GATE 2] Domain Exploration** (MANDATORY - BLOCK if skipped):
   - Domain: [5+ concepts from product's world]
   - Color world: [5+ natural colors FROM DOMAIN]
   - Signature: [1 unique element, must appear 5+ times]
   - Defaults to reject: [3 with alternatives] — grounded in the research above
   - **Verification**: Signature must appear in final output 5+ times or REJECT.

4. **[GATE 4] Variance Check** (MANDATORY - consult plugin):
   - Query plugin: "Check variance history for [interface type]"
   - Pick **2–3 distinct Vibe + Layout pairings** — one per variant (see step 5); none may repeat the last 2 outputs
   - Document choices: "Variant A — Vibe: [X], Layout: [Y]; Variant B — …"

5. **[VARIANT PROTOCOL] Generate 2–3 Variants** (MANDATORY for new UI):
   - Produce **2–3 genuinely distinct directions** (default 3; 2 if the brief is tightly constrained), labeled **A / B / C**
   - Distinct means different Vibe + Layout pairing, different signature element, and (where it matters) different IA emphasis — NOT a palette swap of one design
   - Each variant gets a name, a one-line concept ("Variant B 'Control Tower' — Dark Technical × Terminal Grid; signature: live SLA tick-rail"), and a structure sketch
   - Present a **comparison table**: intent fit · hierarchy approach · signature · strongest screen · main trade-off — then give YOUR recommendation with rationale
   - **STOP and let the user choose.** Refine only the chosen variant from here on
   - Skip ONLY when the user explicitly asks for one direction or is iterating on an already-chosen variant
   - Full protocol: `design-data/references/prototype-variants-guide.md`

6. **Establish Foundations** (chosen variant):
   - **Resolve styling from context** (quality-gates.md → Visual Foundations): existing repo tokens → Figma variables → user-specified → fallback (monochrome OKLCH, never `#000`/`#fff`; 4px spacing scale; Inter + Fragment Mono). Record the source in `system.md`.
   - Apply **Craft Principles**: whisper-quiet elevation (shift lightness only), concentric radius, four text levels + border progression, ease-out motion (cubic-bezier, transform/opacity only), tabular numbers, ≥40×40px hit areas
   - Apply the chosen variant's [Vibe Archetype] + [Layout Archetype]
   - Optional craft techniques (nested containment, button-in-button) only if the resolved style calls for them — never by reflex

7. **[GATE 5] Ban List Check** (MANDATORY - BLOCK if violated):
   - Scan output for banned patterns
   - If found, REJECT and redesign (or allow user override)

8. **[GATE 3] Validation Tests** (MANDATORY - ALL must pass):
   - Swap test: [Pass/Fail + evidence]
   - Squint test: [Pass/Fail + evidence]
   - Signature test: [Pass/Fail + evidence]
   - Token test: [Pass/Fail + evidence]
   - **If ANY test fails, REJECT and iterate**

9. **Document System**:
   - Save to `design-data/projects/[project-name]/system.md`
   - Include: Intent, Research references, Domain exploration, all variants considered + the chosen one, Validation results
   - Add to variance history via plugin

**Key Standards**:
- Intent-first: no code before answering who/what/feel
- New UI = variants first: never present a single take as the only option
- Avoid generic defaults: "clean and modern" is meaningless
- Subtle layering: whisper-quiet elevation changes
- Every choice must be a choice: explain why

**Required Modules**: Load `quality-gates.md` for complete gate specifications
**Reference**: `design-data/references/prototype-variants-guide.md`

**Tools**: interface-design skill, ui-ux-pro-max skill

---

## 4. Product Strategy Workflow

**When**: Brainstorming, problem exploration, opportunity identification

**Steps**:
1. **Identify Mode**: Problem exploration, solution ideation, assumption testing, strategy exploration
2. **Frame Problem**: HMW questions (5-10 reframings)
3. **Diverge — quota enforced**: Generate **≥15 raw ideas using ≥3 different techniques** (rotate: constraint removal → analogies → inversion → SCAMPER → extreme users). Quantity before quality; no evaluating mid-divergence
4. **Provoke**: Challenge assumptions, test extremes, invert problem, force a "bad idea" round (worst ideas often hide a reversible insight)
5. **Converge**: Cluster into themes, then score top candidates on **impact × feasibility × novelty** (1-5 each); show the scoring table, not just the winner
6. **Capture**: Key ideas, assumptions to test, questions to research, next steps

**Key Standards**:
- Frame problem before exploring solutions
- Divergence quota: <15 ideas or <3 techniques = not a brainstorm, it's a first guess
- Brainstorm ≠ decision-making (generates options, not final choice)
- Avoid feature parity trap: copying competitors without understanding needs
- Test assumptions explicitly: user, problem, solution, business, feasibility

**Reference**: `design-data/references/brainstorming-playbook.md` (technique cards, provocations, convergence rubric)
**Tools**: product-brainstorming skill

---

## 5. Design Critique Workflow

**When**: Design review, mockup feedback, usability assessment

**Steps**:
1. **First Impression** (2 seconds): Emotional reaction, purpose clarity, visual draw
2. **Usability**: Can user accomplish core task? Error states handled?
3. **Visual Hierarchy**: What draws eye? Reading flow? Emphasis appropriate?
4. **Consistency**: Matches design system? Token usage? Spacing/typography?
5. **Accessibility**: Contrast ratios, keyboard navigation, touch targets, semantic HTML
6. **Prioritize**: Top 3-5 most impactful changes with rationale

**Key Standards**:
- Stage-appropriate feedback: exploration ≠ final polish
- Positive acknowledgment: note what works well
- Specific, not vague: "CTA competes with navigation" not "layout is confusing"
- With rationale: explain why + how to fix

**Reference**: Load `quality-gates.md` for validation tests (Gate 3) and ban list (Gate 5)

**Tools**: design-critique skill

---

## 6. Design Handoff Workflow

**When**: Design ready for engineering, needs implementation spec

**Steps**:
1. **Overview**: Purpose, user flow, key interactions
2. **Layout**: Grid, spacing, responsive breakpoints
3. **Tokens**: Reference semantic tokens (spacing-md not 16px)
4. **Components**: List with variants, props, states
5. **States**: Default, hover, active, focus, disabled, loading, error, empty
6. **Edge Cases**: Empty data, long text, overflow, errors
7. **Animation**: Triggers, durations, easing (cubic-bezier only)
8. **Accessibility**: ARIA labels, keyboard nav, focus order, semantic HTML

**Key Standards**:
- Token references: use spacing-md not 16px
- State exhaustiveness: cover all 8 states
- Describe the why: rationale helps developers make judgment calls
- Edge case coverage: empty, long text, overflow, errors

**Output**: Save to `design-data/projects/[project-name]/handoff.md`

**Tools**: design-handoff skill

---

## 7. Accessibility Audit Workflow

**When**: WCAG compliance check, accessibility review

**Steps**:
1. **Contrast Calculation**: Measure precisely (4.5:1 text, 3:1 UI components)
2. **Keyboard Navigation**: Tab order, focus indicators, all interactive elements reachable
3. **Semantic HTML**: Proper landmarks, heading hierarchy, button/link distinction
4. **Screen Reader Testing**: Predict announcements from HTML/ARIA structure
5. **Touch Targets**: Minimum 44×44pt (iOS) or 48×48dp (Android)
6. **Severity Classification**: Critical (blocks tasks), Major (impairs), Minor (reduces usability)

**Key Standards**:
- WCAG 2.1 AA compliance: 4.5:1 contrast text, 3:1 UI components
- Calculate contrast - don't estimate
- Semantic HTML > styled divs
- All interactive = keyboard accessible

**Tools**: accessibility-audit skill

---

## 8. Figma Integration Workflow (Context-Aware)

**When**: User provides Figma URL or requests design collaboration

**Detection Pattern**:
```
https://www.figma.com/design/[fileKey]/[fileName]
https://www.figma.com/file/[fileKey]/[fileName]
```

### Collaboration Mode (URL Present)

**Steps**:
1. **Fetch Design**:
   - Use `figma_get_design_context` tool with extracted fileKey
   - Extract design properties (colors, typography, spacing)

2. **Run Gate 3 Validation Tests**:
   - Swap test: Are choices specific to this product?
   - Squint test: Is hierarchy visible without harsh lines?
   - Signature test: Can you point to 5 instances of signature element?
   - Token test: Do CSS variable names belong to product's world?

3. **Check Gate 5 Ban List**:
   - Scan for side-stripe borders, gradient text, glassmorphism, etc.
   - Flag violations with alternatives

4. **Provide Structured Critique**:
   - First impression (2 seconds)
   - Usability assessment
   - Visual hierarchy analysis
   - Consistency with design system
   - Accessibility (contrast, touch targets, semantic structure)
   - Priority recommendations (top 3-5)

5. **Generate Handoff Spec** (if requested):
   - Save to `design-data/projects/[project-name]/handoff.md`
   - Include layout, tokens, component states, responsive behavior, edge cases, animations, a11y notes

**Reference**: Load `quality-gates.md` for validation tests and ban list

### Plan Mode (No URL)

**Steps**:
1. **Generate Specs/Wireframes**:
   - Follow Interface Design Workflow (Gates 1-5)
   - Create low-fidelity specs for user to implement in Figma
   - Save to `design-data/projects/[project-name]/wireframes.md`

2. **Provide Figma-Ready Tokens**:
   - Export tokens in Figma-compatible format
   - Color styles: OKLCH → hex conversion
   - Text styles: hierarchy mapping (display/heading/body/caption)
   - Spacing styles: tight/medium/wide/vast scale
   - Save to `design-data/tokens/[project-name].json`

**Reference**: Load `quality-gates.md` for complete interface design workflow

---

## 9. AI Mentor Workflow

**When**: User has an idea and wants to reach a product concept — "mentor me", "help me think through this", "is this a good idea", "what should I build"

**Steps**:
1. **Frame the problem**: Restate the idea as 5–10 How-Might-We questions (the idea is a hypothesis, not the answer)
2. **Find the job (JTBD)**: "When [situation], I want to [motivation], so I can [outcome]"
3. **Surface the riskiest assumption**: What must be true? Rank by impact × uncertainty
4. **Diverge**: Generate 5+ genuinely distinct concept directions
5. **Converge**: Score by impact × feasibility × desirability
6. **Write the concept brief**: Job, person-in-context, problem + evidence, the concept, riskiest assumption + test, success signal, explicit out-of-scope

**Key Standards**:
- Mentor by asking, not answering — surface assumptions before converging
- Problem before solution; no one-idea "brainstorm"
- Every concept needs a riskiest-assumption test and an explicit "not now"

**Reference**: `design-data/references/mentorship-frameworks.md`
**Also load**: `frameworks-and-artifacts.md` (brainstorming techniques)
**Output**: Save to `design-data/projects/[project-name]/concept.md`

---

## 10. UX Flows Workflow

**When**: User journeys, user/task flows, information architecture, sitemaps — "map the flow", "product structure"

**Steps**:
1. **Identify the primary job + entry points**
2. **Choose artifact**: task flow (one path), user flow (all paths), or journey map (end-to-end experience)
3. **Map the happy path**, then add error and edge branches (empty / first-run / offline / permission-denied)
4. **Define IA**: sitemap (depth ≤ 3), navigation model, domain-language labels
5. **Journey map** (if experience-level): stages → actions → thoughts → emotions → opportunities; plot the emotion curve
6. **Validate**: token test on nav labels; flag dead ends with no recovery

**Key Standards**:
- Happy path first, but never ship without error/edge branches
- Labels in the user's domain language, not internal jargon
- Avoid deep nesting (>3) and modal-first flows
- Mark moments of truth and the lowest emotional dip (highest leverage)

**Reference**: `design-data/references/ux-flow-patterns.md`
**Tools**: figma-generate-diagram skill (Mermaid → FigJam)
**Output**: Save to `design-data/projects/[project-name]/flows.md`

---

## 11. UX Audit Workflow

**When**: "UX audit", "usability review", "heuristic evaluation" — a combined usability + accessibility check

**Steps**:
1. **Scope & method**: what's reviewed; heuristic walkthrough + WCAG 2.1 AA pass
2. **Usability**: evaluate against Nielsen's 10 heuristics
3. **Accessibility**: WCAG AA checklist — measure contrast, keyboard, focus order, semantics, names/roles, forms, targets, motion
4. **Classify severity**: Critical / Major / Minor
5. **Prioritize**: frequency × severity → top 3–5
6. **Report**: per finding — location, heuristic/criterion, evidence, concrete fix

**Key Standards**:
- Calculate contrast — never estimate
- Every finding has a severity and a concrete fix; name the element and the heuristic
- Note what works, not only what's broken; keep feedback stage-appropriate

**Reference**: `design-data/references/ux-heuristics.md`
**Also reference**: `quality-gates.md` (Gates 3 & 5) and Accessibility Audit Workflow (§7)
**Output**: Save to `design-data/projects/[project-name]/ux-audit.md`

---

## 12. Design Converter Workflow

**When**: A sketch, wireframe, or screenshot is provided — "turn this into UI", "convert this design", image attached

**STRICT ENFORCEMENT ACTIVE**: Reverse-engineering an image does NOT skip the gates.

**Steps**:
1. **Observe** the image precisely (regions, repetition, alignment, density, evident hierarchy)
2. **[Gate 1] Infer intent** (Who/What/Feel) — ask one question if genuinely ambiguous
3. **[Gate 2] Infer domain** — derive color world + signature from the domain, not the screenshot's arbitrary colors
4. **Extract structure** → layout grid + regions + component list
5. **Map to tokens** (spacing 4/8pt, type roles, semantic domain-named colors, radius/elevation)
6. **Complete states** the static image can't show (all 8)
7. **[Gates 3 & 5] Validation tests + ban list** before emitting code
8. **Emit** semantic, accessible markup + token sheet + an explicit list of assumptions

**Key Standards**:
- Don't copy the screenshot's arbitrary palette as "the design"
- Improve banned patterns; don't pixel-match them
- Tokens, not hardcoded values; always list assumptions

**Reference**: `design-data/references/design-converter-guide.md`
**Required Modules**: `quality-gates.md` (all 5 gates)
**Output**: Save to `design-data/projects/[project-name]/converted.md`

---

## 13. Figma Export Workflow (Write Direction)

**When**: "export to Figma", "push this to Figma", "build this in Figma", create designs/components in a Figma file. Complements §8 Figma Integration, which reads FROM Figma.

**Steps**:
1. **Confirm Figma MCP is connected** (and a target file/page exists or should be created)
2. **Prepare the source**: a gates-passing design (from Interface Design / Design Converter) or design-system tokens
3. **Load the Figma skill FIRST**: `figma:figma-generate-design` (a page/view) or `figma:figma-generate-library` (a design system) — MANDATORY before any use_figma / generate_figma_design call
4. **Map tokens → Figma**: color/text/spacing styles or variables (OKLCH → hex) from the project's **resolved** styling (existing repo / source Figma / user-specified; fallback monochrome + 4px + Inter & Fragment Mono) — never a fixed brand
5. **Assemble** section-by-section using design-system components/variables, not hardcoded values
6. **Verify** against Gates 3 & 5 in the generated file; report the file URL

**Key Standards**:
- Always load the relevant `figma-*` skill before calling Figma write tools
- Use variables/styles, not hardcoded values; preserve the project's resolved tokens (no fixed brand)
- Re-run validation tests on the exported result

**No Figma MCP connected?** Don't dead-end. Deliver the fallback bundle instead: (a) tokens as Figma-importable JSON (`design-data/tokens/[project-name].json`), (b) a frame-by-frame build spec (`figma-build-spec.md`: frames, auto-layout settings, styles per node), and (c) the platform-specific connection step — Claude Code: `claude mcp add --transport http figma https://mcp.figma.com/mcp`; Cursor: Settings → MCP → add `https://mcp.figma.com/mcp`; Codex: add an `mcp_servers.figma` entry in `~/.codex/config.toml`; OpenCode: add the server in `opencode.json`.

**Tools**: Figma MCP (`generate_figma_design`, `use_figma`, `create_new_file`); skills `figma:figma-generate-design`, `figma:figma-generate-library`
**Output**: Figma file URL + token mapping → `design-data/tokens/[project-name].json`

---

## 14. Portfolio Builder Workflow

**When**: "case study", "portfolio", "write up this project", "show this work"

**Steps**:
1. **Gather artifacts** from `design-data/projects/[project-name]/` (research, system, handoff, flows)
2. **Structure (CRP-PDSI)**: Context · Role · Problem · Process · Decisions · Solution · Impact
3. **Frame pivotal decisions (STAR-D)**: situation → task → action → result → rationale
4. **Establish impact**: relative/directional metrics + mechanism, or qualitative evidence — never invented
5. **Before/after**: show the prior state, its problem, and the change
6. **Assemble** the narrative; lead with problem + decisions, not screenshots

**Key Standards**:
- Show judgment and trade-offs, not a screenshot gallery
- Honest role attribution (you vs. team); no invented metrics
- Include the messy middle and what you'd do next

**Reference**: `design-data/references/portfolio-frameworks.md`
**Also reference**: `standards-and-anti-patterns.md` (Evidence-Based standard)
**Output**: Save to `design-data/projects/[project-name]/case-study.md`

---

## 15. Prototype Variants Workflow

**When**: "prototype", "make it real", "show me options", "build 2-3 versions", or any request for a NEW interface where the user wants something they can open and click

**STRICT ENFORCEMENT ACTIVE**: All 5 gates apply. The Variant Protocol is the point of this workflow — never deliver a single prototype for new UI.

**Build in React.** Prototypes are real, interactive React so full functionality is visible (state, validation, transitions, real interactions), not static mockups. The variants live in **one app** with a **tab group / toggle at the top to switch between Variant A / B / C**, so the user compares them side by side in a single running app rather than juggling files.

**Steps**:
1. **Research first** (research-first): pull real references + evidence for this UI (shipping-product patterns via Mobbin/Page Flows, plus NN/g/Baymard/Laws of UX for the "why"); verify sources in the browser (delegate); save to `design-data/projects/<project>/research/` and cite by path. It grounds the domain and the variant directions. (`design-data/references/design-research-sources.md`)
2. **Run Gates 1-2** (intent, domain) once — they're shared across variants; domain is grounded in the research above
3. **Resolve styling** (quality-gates.md → Visual Foundations): existing repo tokens → Figma → user-specified → fallback (monochrome OKLCH, 4px spacing, Inter + Fragment Mono). If the repo is already a React/Vite/Next project, build inside it and reuse its setup + tokens.
4. **[Gate 4] Pick 2-3 distinct Vibe + Layout pairings** — one per variant, none repeating recent history
5. **Define each variant**: name, one-line concept, signature element, IA emphasis — verify distinctness (different pairing + different signature, not a reskin)
6. **Scaffold one React app** in the project working directory (Vite + React if standalone; reuse the repo's stack if inside one):
   - A **`<VariantSwitcher>`** tab group / segmented control renders `<VariantA/>`, `<VariantB/>`, `<VariantC/>`; remembers selection (e.g. URL hash `#variant-b`)
   - Each variant is a real interactive component — working state, inputs, validation, transitions; real domain content, never lorem ipsum
   - Representative data states reachable per variant: default, hover, focus, loading, error, empty (a small in-app state toggle)
   - Tokens as CSS variables with domain names; fonts from the resolved styling (repo `@font-face`/`next/font`, else Inter + Fragment Mono)
7. **Run Gates 5 + 3 per variant** (ban list, validation tests) — each variant must pass independently
8. **Verify in the browser (delegate to a sub-agent for isolation)**: start the project's dev server via the detection script (`node scripts/dev-server.mjs ...` — never assume a port; see Dev Server, below), drive it with the browser/Playwright skill, switch through every tab, exercise the interactions and states, screenshot each variant. The sub-agent returns only a short pass/fail + screenshot paths + any console errors — not the raw logs. Fix anything that doesn't render or behave correctly before presenting.
9. **Present the comparison**: table (intent fit · hierarchy · signature · strongest moment · trade-off) + your recommendation + **the one command to run the app** + screenshot paths. **STOP — the user picks**
10. **Refine the winner**: fold in feedback, optionally borrow the best detail from a losing variant, then document

**Key Standards**:
- Variants differ in structure and character, not hue — see distinctness axes in the guide
- Real interactive React, one app, tab-switchable — the user runs `npm run dev` once and clicks between directions
- Verify it actually renders and behaves in a real browser before claiming it works (evidence, not assertion)
- Losing variants are kept (they're cheap insurance and portfolio evidence)

**Reference**: `design-data/references/prototype-variants-guide.md`
**Required Modules**: `quality-gates.md` (all 5 gates), `context-management.md` (sub-agent isolation, output hygiene)
**Dev server**: `scripts/dev-server.mjs` (project-scoped detect/start — see workflow §0 note and README)
**Output**: a runnable React app at `design-data/projects/[project-name]/prototype/` (or inside the repo when working in one) + `variants.md` (comparison + decision) + `screenshots/` from browser verification

---

## 16. Diagram Workflow

**When**: "diagram", "flowchart", "visualize the flow/architecture", "sequence diagram", "state machine", "ERD", "sitemap diagram" — or any §10 flow that should be rendered visually

**Steps**:
1. **Pick the type from the question, not habit**: flowchart (decision logic), sequence (who-talks-to-whom over time), state (lifecycle of one thing), journey (experience + emotion), ER (data shape), architecture/C4-style (system structure) — chooser table in the guide
2. **Draft the structure in text first**: nodes/actors/states as a list; agree on scope before drawing (≤ ~20 nodes per diagram; split if bigger)
3. **Write Mermaid source** following the syntax constraints in the guide (quote labels, no raw parentheses/HTML in node text, direction chosen for the reading flow)
4. **Self-check**: every decision has all branches; no dead ends without recovery; labels in domain language (token test applies to node labels)
5. **Render where the user lives**: Mermaid renders natively in GitHub/GitLab markdown previews; offer **FigJam export** via the Figma MCP `generate_diagram` (load `figma:figma-generate-diagram` skill FIRST) when visual collaboration is wanted
6. **Save the source** so it stays editable and diffable

**Key Standards**:
- One diagram = one question answered; don't merge architecture + flow + data into one graph
- Mermaid source is the artifact; rendered images are disposable
- Wireframe-level layout sketches use the ASCII conventions in the guide, not Mermaid

**Reference**: `design-data/references/diagram-guide.md`
**Tools**: Figma MCP `generate_diagram` (FigJam); skill `figma:figma-generate-diagram` first
**Output**: `design-data/projects/[project-name]/diagrams/[name].mmd` (+ FigJam URL if exported)

---

## 17. UX Annotations & Write-ups Workflow

**When**: "annotate this design", "add annotations", "redlines", "explain the UX decisions", "write up the rationale", "spec the interactions"

**Steps**:
1. **Pick the artifact**: annotation layer (numbered callouts on a design), redline spec (measurements + tokens), or UX rationale write-up (decisions + evidence) — often the deliverable is annotations + write-up together
2. **Inventory what needs explaining**: walk the design and tag every element whose behavior, state logic, motion, content rule, or accessibility treatment is not self-evident
3. **Annotate with the 6-type taxonomy** (each callout numbered `A1, A2…` and typed):
   - **INT** interaction (click/drag/keyboard behavior) · **STA** state (all 8 states + transitions) · **MOT** motion (trigger, duration, easing) · **CON** content (voice, truncation, localization, empty copy) · **A11Y** accessibility (roles, labels, focus order, contrast) · **LOG** logic (visibility rules, permissions, data dependencies)
4. **Write each annotation as behavior, not appearance**: "A3 [STA]: table shows skeleton rows ≤1s, then empty-state with primary CTA if 0 results" — not "table looks empty"
5. **For redlines**: reference tokens, never raw values (`spacing-md`, not `16px`); cover spacing, type roles, hit areas, breakpoints
6. **For the write-up**: per decision — what was decided → evidence/reason → trade-off accepted → how we'll know it works (decision-record format in the guide)
7. **Cross-link**: annotations reference the write-up's decision IDs; handoff spec (§6) references both

**Key Standards**:
- Annotate the non-obvious; numbering must survive design iterations (never renumber, append)
- Every interactive element has INT + STA + A11Y coverage before handoff
- Write-ups argue from evidence (research, heuristics, constraints), not taste

**Reference**: `design-data/references/annotation-guide.md`
**Also reference**: Design Handoff Workflow (§6) — annotations feed the handoff spec
**Output**: `design-data/projects/[project-name]/annotations.md` + `ux-rationale.md`

---

## Cross-References

**All workflows reference:**
- `quality-gates.md` - For gate specifications, brand identity, premium patterns
- `standards-and-anti-patterns.md` - For quality standards and anti-patterns to avoid
- `frameworks-and-artifacts.md` - For decision frameworks and output templates

**Workflow-specific modules:**
- Interface Design / Prototype Variants → Require `quality-gates.md` (all 5 gates mandatory) + `prototype-variants-guide.md`
- Research → Uses `frameworks-and-artifacts.md` (research methods, analysis frameworks) + `research-templates.md`
- Strategy → Uses `frameworks-and-artifacts.md` (brainstorming techniques) + `brainstorming-playbook.md`
- Handoff → Uses `frameworks-and-artifacts.md` (handoff template) + `annotation-guide.md`
- Diagrams → Uses `diagram-guide.md`
- Annotations & Write-ups → Uses `annotation-guide.md`
