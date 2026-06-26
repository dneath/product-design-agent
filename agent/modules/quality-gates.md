# Quality Gates, Visual Foundations & Craft Patterns

Before ANY design output (mockups, prototypes, wireframes, components), you MUST pass all 5 gates. Plugin validates automatically.

---

## Gate 1: Intent Declaration (MANDATORY - BLOCKS OUTPUT)

**Required before any code/design:**
1. **Who**: Specific human (role + context + mood + environment) - NOT "users"
2. **What**: Specific task (verb + object + success state)
3. **Feel**: Specific emotion/tone - NOT "clean", "modern", "professional"

**Forbidden Terms**: "clean", "modern", "intuitive", "professional", "sleek", "users", "people", "customers"

**Example PASS:**
```markdown
**Who**: Sarah, support manager reviewing 50+ tickets/day in noisy call center, stressed about SLA deadlines
**What**: Triage incoming tickets by urgency without reading full content
**Feel**: Calm urgency - hierarchy obvious at a glance, no visual noise competing for attention
```

**Example FAIL:**
```markdown
**Who**: Users managing tasks
**What**: View and organize their work
**Feel**: Clean and modern interface
```

**Enforcement**: Plugin blocks output if intent uses forbidden terms or abstract descriptions.

---

## Gate 2: Domain Exploration (MANDATORY - BLOCKS OUTPUT)

**Required before implementation:**
1. **Domain** (5+ concepts from product's world - NOT generic tech terms)
2. **Color world** (5+ natural colors FROM DOMAIN - NOT arbitrary palettes)
3. **Signature element** (1 unique element that appears 5+ times in design)
4. **Defaults to reject** (3 specific common patterns with alternatives)

**Example PASS:**
```markdown
**Domain**: Support desk, ticket lifecycle, SLA countdown, queue management, escalation paths
**Color world**: Amber (caution), Crimson (critical), Forest (resolved), Slate (neutral), Frost (inactive)
**Signature**: "SLA Countdown Ring" - circular progress indicator at card corner
**Defaults to reject**:
- Standard card grid → Use varied heights based on ticket complexity
- Blue/purple tech gradient → Use domain-driven amber/crimson for urgency
- List view only → Add kanban swimlanes for queue stages
```

**Example FAIL:**
```markdown
**Domain**: Software, technology, data, cloud
**Color world**: Blue, purple, teal, gray, white
**Signature**: Rounded corners
```

**Enforcement**: Plugin blocks if <5 domain concepts, <5 colors, no signature, or <3 defaults rejected.

---

## Gate 3: Validation Tests (MANDATORY - BLOCKS OUTPUT)

**Run before showing design - ALL must pass:**

1. **Swap test**: If you swapped choices for common alternatives, would it feel different?
   - PASS: "Color system emerges from support domain (amber/crimson), not arbitrary blue/purple"
   - FAIL: "Used primary blue because it's common"

2. **Squint test**: Blur eyes - hierarchy still visible without harsh lines?
   - PASS: "Hierarchy visible through scale contrast (48px → 14px), not color alone"
   - FAIL: "Relies on red text for importance"

3. **Signature test**: Can you point to 5 instances where signature appears?
   - PASS: "SLA ring appears: list cards, detail view, queue summary, dashboard widget, mobile nav"
   - FAIL: "Signature appears twice"

4. **Token test**: Read CSS variable names aloud - do they belong to this product's world?
   - PASS: "--sla-critical", "--queue-active", "--escalation-urgent"
   - FAIL: "--primary-500", "--blue-600", "--color-1"

**Enforcement**: Plugin blocks if any test explicitly fails or tests not documented.

---

## Gate 4: Variance Check (MANDATORY - CONSULTS PLUGIN)

**Before generating similar artifacts** (dashboards, cards, forms):
1. Query plugin variance history: "Check variance for [interface type]"
2. If last 2 outputs used same **Vibe + Layout** combo, BLOCK and force new selection
3. Document choice: "Vibe: [X], Layout: [Y]"

**Vibe Archetypes** (pick 1):
- **Ethereal Glass**: Translucent layers, soft gradients, floating elements
- **Editorial Luxury**: High contrast, serif headlines, generous whitespace
- **Soft Structuralism**: Rounded corners, pastel depth, gentle shadows
- **Dark Technical**: OLED blacks, neon accents, terminal aesthetics
- **Warm Minimalism**: Cream backgrounds, brown accents, flat depth
- **Industrial Monochrome**: Pure black/white, mechanical typography, technical motifs

**Layout Archetypes** (pick 1):
- **Asymmetrical Bento**: Varied card sizes, organic grid, visual tension
- **Z-Axis Cascade**: Stacked layers, scroll-triggered reveals, depth parallax
- **Editorial Split**: 60/40 content/space, vertical rhythm, chapter-like sections
- **Terminal Grid**: Fixed-width, monospace, console-style layout
- **Magazine Flow**: Multi-column, pull quotes, image-led composition
- **Dashboard Radial**: Circular arrangements, arc navigation, orbital content

**Enforcement**: Plugin tracks last 10 outputs, blocks if vibe+layout combo repeated in last 2.

---

## Gate 5: Ban List Enforcement (ABSOLUTE - BLOCKS OUTPUT)

**These patterns are FORBIDDEN. User override possible with "use [pattern] anyway":**

1. **Side-stripe borders on cards**
   - ❌ `border-left: 4px solid #primary`
   - ✅ Alternative: Full border with subtle color, or no border with shadow

2. **Gradient text as default style**
   - ❌ `background: linear-gradient(...); -webkit-background-clip: text;`
   - ✅ Alternative: Solid color with opacity variation

3. **Glassmorphism as default aesthetic**
   - ❌ `backdrop-filter: blur(10px); background: rgba(...)`
   - ✅ Alternative: Reserve for specific moments, not entire UI

4. **Hero-metric template** (big number + label + icon grid)
   - ❌ Three cards: "1,234 Users", "5,678 Revenue", "90% Satisfaction"
   - ✅ Alternative: Design unique dashboard layout from domain exploration

5. **Identical card grids** (3-across, same height, same spacing)
   - ❌ Uniform grid with `.grid-cols-3` and identical cards
   - ✅ Alternative: Asymmetrical bento, varied heights, or magazine flow

6. **Modal-first thinking** (every action opens a modal)
   - ❌ Click edit → modal opens
   - ✅ Alternative: Inline editing, slide-out drawers, expand-in-place

7. **Defaulting type without thought** (reaching for the same system sans every time)
   - ❌ Roboto, Arial, Helvetica, "generic sans-serif" chosen because they're there
   - ✅ Alternative: a typeface chosen for the product and context — or inherited from the repo/Figma. When nothing specifies type, the fallback default is Inter (UI/text) + Fragment Mono (mono)

8. **Spring/bounce easing**
   - ❌ `transition: all 300ms ease-in-out;` or `spring` physics
   - ✅ Alternative: Custom cubic-bezier curves only

9. **Animating non-transform properties**
   - ❌ `transition: width 300ms, height 300ms, top 300ms;`
   - ✅ Alternative: Only animate transform and opacity

10. **"Clean and modern" as design descriptor**
    - ❌ "I designed a clean and modern dashboard"
    - ✅ Alternative: Use specific descriptors from intent/domain

**Override Protocol**: If user explicitly requests banned pattern:
```
"[Pattern] is on ban list because [reason]. Alternative: [specific better approach]. 
Proceeding with your override, but recommend reconsidering."
```

**Enforcement**: Plugin scans output for banned patterns, blocks and suggests alternatives.

---

## Visual Foundations (Context-Driven)

**There is no fixed brand or house style. Never default to one.** Styling is resolved from context, in this priority order — stop at the first that applies:

1. **Existing codebase.** Working in a repo? Adopt its system. Read its design tokens *before* writing any UI: `tailwind.config.*`, CSS custom properties (`:root` blocks), `theme.*` files, a project `system.md` or `.interface-design/system.md`, shadcn/ui or other component-library config, and font imports (`<head>` / `@font-face`). Match the existing colors, spacing scale, radius, type, and component patterns. Do not stand up a second system beside theirs.
2. **Figma source.** A Figma URL or file in play? Pull its variables and styles (`get_variable_defs`, `get_design_context`) and follow them — colors, type, spacing, components. The Figma file is the source of truth.
3. **User-specified.** The user named a palette, font, or brand? Use it exactly.
4. **Fallback defaults** — only when none of the above provides a system:
   - **Color: monochrome.** A tinted-neutral grayscale built in OKLCH. Add at most one accent, and only if the domain genuinely needs one (status, a single CTA emphasis). Never `#000` / `#fff` — tint every neutral a hair toward one hue (chroma 0.005–0.01).
   - **Spacing: a 4px-based scale** — 4, 8, 12, 16, 24, 32, 48, 64. Every gap, pad, and margin is a multiple of 4.
   - **Fonts: Inter** (UI/text) + **Fragment Mono** (mono — code, data, IDs, timestamps). These are the *fallback*, not a brand — replace them the moment context provides type.

Whatever the source, the **color world still comes from the product's domain** (Gate 2). Resolution decides the *system*; domain exploration decides the *meaning* of colors within it. Record what won and why in the project's `system.md`.

**Enforcement**: Plugin flags hardcoded `#000`/`#fff` and a missing styling-source decision; it no longer mandates any specific font or color.

---

## Craft Principles (Default Quality Bar)

These raise every default from "generic" to "considered." Apply regardless of which styling source won above. Full detail: `design-data/references/premium-patterns.md`.

**Color** — Work in OKLCH; reduce chroma as lightness nears 0 or 100. Pick a *strategy* before colors: restrained (tinted neutrals + one accent ≤10% — the product default), committed (one saturated color across 30–60%), full palette (3–4 named roles), or drenched. Color carries meaning (status, action, emphasis); gray builds structure. Never add color without a reason.

**Theme (light vs. dark)** — Never a default. Write one sentence of physical scene (who, where, ambient light, mood) concrete enough to force the answer. "SRE glancing at severity on a 27″ monitor at 2am in a dim room" forces dark; "a dashboard" forces nothing.

**Typography** — Hierarchy through scale + weight, ≥1.25 ratio between steps; never size alone. Cap body line length at 65–75ch. `tabular-nums` for any number that updates. `text-wrap: balance` on headings, `text-wrap: pretty` on body.

**Depth — commit to ONE strategy** — borders-only (dense tools), subtle shadows (approachable products), layered shadows (cards with presence), or surface-color shifts. Don't mix. Where you use shadows, layer several low-opacity `box-shadow`s rather than one hard border — shadows adapt to any background. Surface elevation is whisper-quiet: each step a few percent of lightness, same hue, shift only lightness; you feel the hierarchy more than see it. Sidebars share the canvas background with a border, not a different color.

**Border radius** — Concentric: outer radius = inner radius + padding. Mismatched nested radii are the most common thing that makes UI feel "off." Build a scale (small inputs/buttons → medium cards → large modals); don't mix sharp and soft at random.

**Spacing & alignment** — Vary spacing for rhythm; identical padding everywhere is monotony. Keep padding symmetrical unless content demands otherwise. Align optically when geometric centering looks off (icons in buttons, play triangles, asymmetric glyphs).

**Motion** — Ease-out curves only (quart/quint/expo); no spring, bounce, or elastic in product UI. Animate only `transform`/`opacity`/`filter` — never layout properties, never `transition: all` (name exact properties). Fast micro-interactions (~150–200ms), longer for larger transitions; `scale(0.96)` on press. Split and stagger enter animations (~100ms apart); keep exits subtler than enters.

**Detail** — Interactive targets ≥40×40px hit area (extend with a pseudo-element if the visual is smaller). Subtle 1px image outline (`rgba(0,0,0,.1)` light / `rgba(255,255,255,.1)` dark — pure black/white, never a tinted neutral, or it reads as dirt on the edge). One icon set; icons clarify, never decorate. Every interactive element needs all states (default/hover/active/focus/disabled); data needs loading/empty/error.

**The bar** — if another agent given the same prompt would produce substantially the same screen, it's generic; return to domain and intent. Every choice must answer "why this, not the common alternative?"

---

## Optional Craft Techniques (NOT defaults)

Techniques you *may* reach for when the resolved style calls for them — never a required house style, never applied by reflex. Full detail: `design-data/references/premium-patterns.md`.

- **Nested containment** ("double-bezel") — an outer shell wrapping an inner core with concentric radii (inner = outer − padding). Use when a surface genuinely benefits from layered framing; skip for dense/flat tools.
- **Button-in-button** — an icon wrapper nested inside a CTA, for sparing emphasis.
- **Custom motion curves** — named cubic-bezier ease-out tokens (expo/quart) instead of `ease-in-out`.

The always-on pieces from that reference (OKLCH elevation generation, ease-out tokens, transform/opacity-only performance rules) are already folded into the Craft Principles above.

**Enforcement**: animating layout properties, `transition: all`, or spring/bounce in product UI still BLOCKS (ban list #8–9).

---

## Referenced By

- **Interface Design Workflow** (workflows.md) - Requires all 5 gates
- **Design Critique Workflow** (workflows.md) - References gates 3 & 5
- **Figma Integration Workflow** (workflows.md) - Validates gates 3 & 5

## See Also

- **Ban List Details**: `design-data/references/ban-list.md` (complete rationale)
- **Styling Resolution**: `design-data/references/styling-resolution.md` (context-driven styling + fallback defaults)
- **Craft Patterns**: `design-data/references/premium-patterns.md` (optional advanced techniques)
- **Anti-Patterns**: `standards-and-anti-patterns.md` (interface design anti-patterns)
