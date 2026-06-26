# Quality Standards & Anti-Patterns

## Quality Standards

### Evidence-Based
- Trace every recommendation to source (quote, data, participant)
- Distinguish stated preferences from observed behavior
- Mark confidence levels (High/Medium/Low)
- Transparent about assumptions and limitations
- Report contradictions honestly - don't hide or force-fit

### Systematic
- Token-based design systems (not hardcoded values); styling resolved from context (repo → Figma → user → fallback), no fixed brand
- Consistent spacing scale (adopt the repo's; else a 4px base)
- Defined elevation/shadow systems
- Text hierarchy (primary, secondary, tertiary, muted)
- Border progression (standard, softer, emphasis, maximum)
- State completeness (default, hover, active, focus, disabled, loading, error, empty)

### Craft-Focused
- Intent-first (who/what/feel before any code)
- Self-critique mandate (catch defaults before showing)
- Craft checks (swap, squint, signature, token tests)
- Subtle layering (whisper-quiet elevation changes)
- Signature elements (unique to this product, not generic)
- Systemic application (every token reinforces intent)

### Accessible
- WCAG 2.1 AA compliance (4.5:1 text, 3:1 UI components)
- Semantic HTML (landmarks, heading hierarchy, proper roles)
- Keyboard navigation completeness
- Screen reader compatibility (alt text, ARIA labels, logical focus order)
- Touch target minimums (44×44pt iOS, 48×48dp Android)
- Reduced motion respect, dynamic type support

### Documented
- Structured markdown with tables
- Evidence attribution (quotes with participant type, not name)
- Visual aids (matrices, diagrams, flowcharts)
- System persistence (save to `design-data/projects/[project-name]/system.md`)
- Version control (track decisions over time)

### Performant
- WebP/AVIF images with lazy loading
- Font-display: swap/optional
- Reserve space for async content (prevent CLS)
- Virtualized lists (50+ items)
- Debounce/throttle high-frequency events
- Transform/opacity animations only (not width/height)

### Output-Hygienic & Context-Aware
- Write task output to the project working directory (default `design-data/projects/[project-name]/`); never into the agent's own instruction/config files or the installed bundle
- Reference large artifacts by path; don't inline them into the conversation
- Summarize completed sub-tasks; discard raw build logs and file dumps; compact near the token limit
- Durable facts in a lean project memory file; volatile task state in a separate `scratch.md`
- Delegate self-contained steps (browser verification, dev-server checks, long reads) to sub-agents that return short results
- Full guidance: `context-management.md`

---

## Anti-Patterns (What to Avoid)

### Research Anti-Patterns
- ❌ Solutioning before framing problem
- ❌ Assuming users want X without evidence
- ❌ Demographic personas (age/gender) instead of behavioral
- ❌ Too many personas (>5)
- ❌ Fictional personas not based on research
- ❌ Static personas never updated
- ❌ Forcing findings into predetermined narrative
- ❌ Over-synthesizing (20 weak findings vs. 5-8 strong)

### Design System Anti-Patterns
- ❌ Inconsistent naming across components
- ❌ Hardcoded hex values instead of tokens
- ❌ Incomplete component documentation (missing states, variants)
- ❌ Breaking changes without migration paths
- ❌ Documenting one-off components (not reusable patterns)
- ❌ Random spacing increments (no system)

### Interface Design Anti-Patterns (Ban List - See Gate 5)
- ❌ "Clean and modern" (meaningless generic descriptor)
- ❌ Side-stripe borders on cards
- ❌ Gradient text as default style
- ❌ Glassmorphism as default aesthetic
- ❌ Hero-metric template (big number + label + icon grid)
- ❌ Identical card grids (3-across, same height)
- ❌ Modal-first thinking
- ❌ Defaulting type without resolving from context (repo/Figma/user → Inter + Fragment Mono fallback)
- ❌ Imposing a fixed brand/palette instead of resolving styling from context
- ❌ Spring/bounce easing
- ❌ Animating width/height/top/left
- ❌ Defaulting on typography, navigation, data presentation
- ❌ Harsh borders, dramatic surface jumps
- ❌ Mixed depth strategies (borders + shadows randomly)
- ❌ Missing interaction states (hover, focus, disabled)
- ❌ Pure white cards on colored backgrounds
- ❌ Multiple accent colors diluting focus
- ❌ Emoji as structural icons (use SVG)

**Reference**: See `quality-gates.md` → Gate 5 for complete ban list with alternatives

### Product Strategy Anti-Patterns
- ❌ Feature parity trap (copying competitors blindly)
- ❌ One-idea brainstorm (calling one solution "brainstorming")
- ❌ Analysis paralysis (endless exploration, no convergence)
- ❌ Anchoring on constraints during divergent thinking
- ❌ Brainstorming when should be researching (need data, not ideas)
- ❌ Confusing brainstorming with decision-making

### Design Critique Anti-Patterns
- ❌ Vague feedback ("layout is confusing" not "CTA competes with navigation")
- ❌ No positive acknowledgment (all criticism, no recognition)
- ❌ Stage-inappropriate feedback (final polish critique on early exploration)
- ❌ Missing rationale (identify problem but no explanation or solution)

### Accessibility Anti-Patterns
- ❌ Estimating contrast (must calculate precisely)
- ❌ Divs with click handlers without tabindex and role
- ❌ Placeholder-only forms (placeholders disappear when typing)
- ❌ No visible focus indicator
- ❌ Decorative images with descriptive alt text (should be alt="")
- ❌ Icon-only buttons without labels
- ❌ Color-only information conveyance (no icon/text)

### UX Copy Anti-Patterns
- ❌ Placeholder-only labels
- ❌ Generic CTAs ("Submit" instead of "Create account")
- ❌ Error messages without recovery path
- ❌ Overly formal or robotic tone
- ❌ Relying on color alone for error indication

### Output & Context Anti-Patterns
- ❌ Writing task output into the agent's own instruction/config files or the installed bundle
- ❌ No specified location → writing somewhere other than the project working directory
- ❌ Inlining large artifacts (full files, build logs) into the conversation instead of referencing by path
- ❌ Carrying raw intermediate output (logs, dumps) forward instead of summarizing
- ❌ Letting the project memory file grow unpruned, or mixing volatile scratch state into it
- ❌ Static prototypes, or presenting a prototype without verifying it in a real browser

---

## Referenced By

All workflows reference this module for quality checks and anti-pattern awareness.

## See Also

- **Gate 5 Ban List**: `quality-gates.md` → Gate 5 (complete list with alternatives and CSS examples)
- **Ban List Details**: `design-data/references/ban-list.md` (detailed rationale for each pattern)
- **Craft Principles**: `quality-gates.md` → Craft Principles + Optional Craft Techniques (what to do instead)
- **Styling Resolution**: `design-data/references/styling-resolution.md` (context-driven styling + fallback defaults)
- **Context Management**: `context-management.md` (compaction, memory/scratch, sub-agents, output hygiene)
