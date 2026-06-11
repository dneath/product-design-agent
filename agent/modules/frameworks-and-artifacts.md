# Decision Frameworks & Output Artifacts

## Decision Frameworks

### Research Methods
- **User interviews** (5-8 participants, 2-4 weeks): Deep understanding of needs
- **Usability testing** (5-8 participants, 1-2 weeks): Evaluating specific designs
- **Surveys** (100+ respondents, 1-2 weeks): Quantifying attitudes
- **Card sorting** (15-30 participants, 1 week): Information architecture
- **Diary studies** (10-15 participants, 2-8 weeks): Behavior over time
- **A/B testing** (statistical significance, 1-4 weeks): Comparing design choices

### Analysis Frameworks
- **Thematic analysis**: Familiarization → Coding → Theme development → Review → Refinement → Report
- **Affinity mapping**: Capture observations → Cluster → Label → Organize → Identify themes
- **Triangulation**: Methodological, source, temporal
- **Impact/effort matrix**: Prioritize by (Users × Frequency × Severity) vs. Feasibility
- **Jobs-to-be-done**: "When [situation], I want to [motivation] so I can [outcome]"
- **Opportunity solution trees**: Outcome → Opportunity → Solution → Experiment

### Brainstorming Techniques
- **Constraint removal**: What if no technical/budget/political constraints?
- **Analogies**: How does [another industry] solve this?
- **Inversion**: How would we make this problem worse? (then reverse)
- **Decomposition**: Break into subproblems, solve independently, recombine
- **User hat-switching**: Power user, new user, admin perspectives
- **SCAMPER**: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse
- **OODA Loop**: Observe → Orient → Decide → Act (cycle faster than competition)

### Design Principles
- **Consistency over creativity** (design systems exist so teams don't reinvent)
- **Flexibility within constraints** (composable, not rigid)
- **Document everything** (if not documented, doesn't exist)
- **Intent must be systemic** (every token reinforces intent, not just stated)
- **Sameness is failure** (designs must emerge from specific context)
- **Every choice must be a choice** (must explain why, not "it's common")

### Critique Frameworks
- **First impression** (2 seconds): What draws eye? Emotional reaction? Purpose clear?
- **5 dimensions**: Usability, Visual Hierarchy, Consistency, Accessibility, [Context-specific]
- **Swap test**: If you swapped choices for common alternatives, would it feel different?
- **Squint test**: Blur eyes - can you still perceive hierarchy without harsh lines?
- **Signature test**: Can you point to 5 specific elements where signature appears?
- **Token test**: Read CSS variables aloud - do they belong to this product's world?

---

## Output Artifacts

All artifacts save to the `design-data/` structure (resolve relative to the install root — OpenCode: `~/.config/opencode/design-data/`; Claude Code plugin: project-local `design-data/`; Cursor/Codex bundle: `~/.product-design-partner/design-data/`):

### Project System Documentation
**Location**: `design-data/projects/[project-name]/system.md`

```markdown
# [Project Name] Design System

## Intent Declaration
**Who**: [Specific human in context]
**What**: [Specific task]
**Feel**: [Specific emotion/tone]

## Domain Exploration
**Domain**: [5+ concepts]
**Color World**: [5+ natural colors from domain]
**Signature**: [Unique element + 5+ instances]
**Defaults Rejected**: [3 with alternatives]

## Variance Selection
**Vibe Archetype**: [selected vibe]
**Layout Archetype**: [selected layout]

## Validation Results
- **Swap Test**: ✅ PASS - [evidence]
- **Squint Test**: ✅ PASS - [evidence]
- **Signature Test**: ✅ PASS - [evidence]
- **Token Test**: ✅ PASS - [evidence]

## Token Architecture
[Color, typography, spacing, motion tokens]

## Component Inventory
[List of components with variants/states]
```

### Research Plan
**Location**: `design-data/projects/[project-name]/research-plan.md`

```markdown
## Research Objectives
[3-5 specific questions]

## Method
[Interviews/Surveys/Usability Testing/etc.]

## Participants
- Criteria: [who]
- Sample size: [number]
- Recruitment: [how]

## Timeline
[dates and milestones]

## Materials
[interview guide, survey, prototype, consent forms]
```

### Synthesis Report
**Location**: `design-data/projects/[project-name]/synthesis-report.md`

```markdown
## Key Findings

### Theme 1: [Name]
**Evidence**: [5 participants], [3 data sources]
**Confidence**: High/Medium/Low
**Quote**: "[participant type]: [quote]"
**Impact**: [frequency × severity]

[Repeat for 5-8 themes]

## Priority Recommendations
1. [Specific, actionable recommendation with rationale]
2. [...]
```

### Component Documentation
**Location**: `design-data/components/[component-name]/design.md`

```markdown
## [Component Name]

**Description**: [what it is, when to use]

**Variants**:
| Variant | Props | Use Case |
|---------|-------|----------|
| Primary | color="primary" | Main actions |

**States**: Default, Hover, Active, Focus, Disabled, Loading, Error

**Accessibility**:
- ARIA labels: [...]
- Keyboard: [...]
- Touch target: 44×44pt minimum

**Do's**:
- ✅ [...]

**Don'ts**:
- ❌ [...]

**Code Example**:
```jsx
<Button variant="primary">Create Account</Button>
```
```

### Handoff Spec
**Location**: `design-data/projects/[project-name]/handoff.md`

```markdown
## Overview
[Purpose, user flow, key interactions]

## Layout
- Grid: 12-column
- Spacing: spacing-md (16px)
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)

## Design Tokens
| Token | Value | Usage |
|-------|-------|-------|
| spacing-md | 16px | Component spacing |

## Components
| Component | Variant | Props | States |
|-----------|---------|-------|--------|
| Button | primary | label, onClick | default, hover, active, disabled |

## Responsive Behavior
| Breakpoint | Changes |
|------------|---------|
| Mobile | Stack vertically |

## Edge Cases
- Empty data: Show empty state
- Long text: Truncate with ellipsis
- Error: Display error message

## Animation
| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Modal | Open | Fade + scale | 200ms | cubic-bezier(0.25, 1, 0.5, 1) |

## Accessibility Notes
- ARIA labels: [...]
- Keyboard navigation: Tab order [...]
- Focus order: [...]
```

---

## Referenced By

- **User Research Workflow** (workflows.md) - Uses research methods, analysis frameworks
- **Product Strategy Workflow** (workflows.md) - Uses brainstorming techniques
- **Design Critique Workflow** (workflows.md) - Uses critique frameworks
- **Design Handoff Workflow** (workflows.md) - Uses handoff template
- **All Workflows** - Use output artifact templates for documentation

## See Also

- **Quality Gates**: `quality-gates.md` (validation tests are a critique framework)
- **Workflows**: `workflows.md` (workflow steps that use these frameworks)
