# Getting Started with Product Design Partner

Sample prompts and the kind of responses you should expect.

**Designers:** start with [Quick start for designers](../docs/designer-quick-start.md) if you want setup steps without code-heavy examples. Use `/interface` in Cursor instead of `@product-design-partner` when slash commands are installed.

## Try this first (Cursor)

```
/interface A settings page where finance admins reconcile payouts before month-end. They need confidence nothing was missed.
```

Expect: Who/What/Feel questions → domain ideas from finance (not generic SaaS) → **2–3 layout directions** → your pick → refined spec.

## Example 1: Simple Button Component

**Request**:
```
@product-design-partner Design a primary button component for a project management app
```

**Agent Response** (abbreviated):

### Intent
- **Who**: Project managers creating new tasks and milestones
- **What**: Confirm creation actions (Create Task, Save, Add Member)
- **Feel**: Confident the action will succeed, clear about what happens next

### Domain Exploration
- Air traffic control "cleared for takeoff" buttons
- Hospital "confirm medication" buttons (high stakes)
- ATM "confirm withdrawal" buttons (clear + reversible)
- Space shuttle launch buttons (deliberate press required)

Colors: Command blue #0066CC, safety green #00AA44, alert orange #FF8800

**Signature**: Subtle press-depth animation (2px translateY) + scale (0.98) gives tactile feedback

### Component Spec
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

**Visual**:
- Background: #0066CC
- Text: White #FFFFFF (7.8:1 contrast ✓)
- Border-radius: 6px
- Padding: 12px 24px
- Font: Inter SemiBold 15px (fallback default — Inter is used only when no repo, Figma, or
  user-specified type system exists; the command-blue color above is domain-derived, not a
  fixed brand)

**Interaction**:
- Hover: Darken 10%, scale 1.02
- Press: translateY(2px), scale(0.98), duration 100ms
- Disabled: Opacity 0.4, cursor not-allowed

---

## Example 2: Design System Audit

**Request**:
```
@product-design-partner Audit my button components for design token coverage
```

**Agent Response** (abbreviated):

### Scope
Auditing: Button, ButtonPrimary, ButtonSecondary, ButtonDanger

### Token Inventory

**Colors** (found 8 unique values):
- Uses tokens ✓: `color-primary-500`, `color-neutral-50`
- Hardcoded ✗: `#0066CC`, `rgba(0,0,0,0.1)`

**Typography** (found 4 unique values):
- Uses tokens ✓: `font-heading-sm`, `font-body-md`
- Hardcoded ✗: `15px`, `600`

**Spacing** (found 6 unique values):
- Uses tokens ✓: `space-md`, `space-lg`
- Hardcoded ✗: `12px`, `24px`

### Gap Analysis

**Should be tokens**:
- `#0066CC` → Suggest: `color-interactive-primary`
- `15px` → Suggest: `font-size-md`
- `12px` → Suggest: `space-sm`

**Intentionally hardcoded**:
- `rgba(0,0,0,0.1)` → Shadow opacity, varies per component

### Recommendations

**P0** (blocks consistency):
- Add missing color tokens for interactive states

**P1** (high-impact):
- Unify font sizes (15px vs 16px both used for "medium")
- Create spacing tokens for button padding

**P2** (nice-to-have):
- Document when hardcoded shadows are acceptable

**Token Coverage**: 68% (target: >90%)

---

## Example 3: Accessibility Audit

**Request**:
```
@product-design-partner Check accessibility for this form [attach screenshot]
```

**Agent Response** (abbreviated):

### WCAG 2.1 AA Audit Results

**Color Contrast**:
- Label text (#666 on #FFF): 5.7:1 ✓ Pass
- Error text (#CC0000 on #FFF): 7.9:1 ✓ Pass
- Placeholder (#999 on #FFF): 3.8:1 ✗ **FAIL** (need 4.5:1)

**Keyboard Navigation**:
- Tab order ✓: Follows visual layout
- Focus indicators ✓: Visible 2px blue outline
- Form submission ✗: **MISSING** - Can't submit with Enter from text input

**Screen Reader Support**:
- Labels ✓: All inputs have `<label>` elements
- Error messages ✗: **MISSING** `aria-describedby` link to error text
- Required fields ✗: **MISSING** `aria-required` or `required` attribute

**ARIA**:
- Landmark roles ✓: Form wrapped in `<form role="form">`
- Live regions ✗: **MISSING** - Errors should announce when they appear

### Remediation Plan

**Critical Issues** (3 found):
1. Increase placeholder contrast to #757575 (4.5:1)
2. Add Enter key handler: `onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}`
3. Link error messages: `<input aria-describedby="email-error" />`

**Code Fix**:
```tsx
<div>
  <label htmlFor="email">Email *</label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-describedby="email-error"
    aria-invalid={hasError}
  />
  <span id="email-error" role="alert">
    {error}
  </span>
</div>
```

**Testing**:
- Run axe DevTools: Should show 0 violations after fixes
- Test with NVDA: Errors should announce immediately
- Keyboard-only: Should be able to complete form without mouse

---

## Example 4: Design Critique

**Request**:
```
@product-design-partner Review this settings page design [Figma link]
```

**Agent Response** (abbreviated):

### Critique: Settings Page

#### Visual Hierarchy (6/10)
**Issues**:
- Section headings same size as input labels (15px)
- Primary action (Save) no more prominent than Cancel

**Fixes**:
- Section headings: 18px SemiBold
- Save button: Primary color, larger hit target
- Cancel: Secondary style (ghost or outline)

#### Information Architecture (7/10)
**Issues**:
- 12 settings mixed together, no grouping
- Advanced options visible by default (cognitive load)

**Fixes**:
- Group into 3 sections: Account, Privacy, Notifications
- Collapse "Advanced" by default with expand toggle

#### Consistency (5/10)
**Issues**:
- Checkboxes for some toggles, switches for others
- Mix of inline labels and top labels

**Fixes**:
- Use switches consistently for all on/off settings
- Use top labels consistently (better for responsive)

#### Accessibility (4/10)
**Issues**:
- Switch components have no visible labels
- Small hit targets (24px) for checkboxes
- No keyboard shortcut hints

**Fixes**:
- Add `aria-label` to all switches
- Increase hit targets to 44×44px (touch-friendly)
- Show keyboard shortcuts in tooltips (e.g., "Cmd+S to save")

### Overall Score: 5.5/10

**Strengths**:
- Clear layout, easy to scan
- Good use of whitespace

**Weaknesses**:
- Hierarchy issues make it hard to prioritize
- Inconsistent patterns confuse mental model
- Accessibility barriers for keyboard/SR users

**Priority Fixes**:
1. Group settings into collapsible sections
2. Make Save button prominent
3. Fix accessibility issues (aria labels, hit targets)

---

## Example 5: UX Copy

**Request**:
```
@product-design-partner Write an empty state for a project with no tasks yet
```

**Agent Response** (abbreviated):

### Empty State Copy

**Headline**: Your first task awaits

**Body**: Projects start with a single task. What's the first thing your team needs to do?

**CTA Button**: Create First Task

**Visual**: Illustration of checklist with one empty checkbox

---

**Why This Works**:

**Not generic**:
- ❌ Avoid: "No tasks yet. Get started by creating one!" (boring, obvious)
- ✓ Instead: "Your first task awaits" (inviting, forward-looking)

**Motivating**:
- "Awaits" implies potential, not absence
- "What's the first thing" prompts specific thinking

**Action-oriented**:
- "Create First Task" more specific than "Get Started"
- Emphasizes "first" to lower activation energy

**Tone Match**:
- Professional but friendly
- Confident (not apologetic like "Oops, no tasks!")

---

## Common Patterns

### Pattern: Dashboard Design
1. Intent: Who uses it, what they're monitoring, how they should feel
2. Domain: Control rooms, command centers, monitoring contexts
3. Signature: Usually a unique visualization or real-time element
4. Layout: Status-first (not sidebar-first for monitoring)

### Pattern: Form Design
1. Intent: Who's filling it, what they're trying to accomplish, anxiety level
2. Domain: Paper forms, application processes, familiar input patterns
3. Signature: Progressive disclosure, smart defaults, or inline validation
4. Layout: Single-column (rarely multi-column unless short)

### Pattern: Settings Page
1. Intent: User is configuring preferences (not daily task)
2. Domain: Control panels, preferences panes, configuration UIs
3. Signature: Often search/filter or smart grouping
4. Layout: Left sidebar nav or collapsible sections

## Tips for Success

### 1. Be Specific in Intent
- ❌ Bad: "Who: Users"
- ✓ Good: "Who: Marketing managers aged 30-45 creating quarterly reports"

### 2. Use Real Domain Examples
- ❌ Bad: "Inspired by modern dashboards"
- ✓ Good: "Inspired by air traffic control tower status boards"

### 3. Define Your Signature Element
- ❌ Bad: "It's clean and intuitive"
- ✓ Good: "Real-time status timeline showing 4-hour health history"

### 4. Validate Against Gates
Before considering design done:
- [ ] Intent declaration has who/what/feel
- [ ] Domain exploration has 5+ concepts, 5+ colors, signature
- [ ] Passes swap/squint/signature/token tests
- [ ] Different from last 2 designs (variance)
- [ ] No banned patterns from ban-list.md

### 5. Optional quality check (before dev handoff)

If a teammate can run Terminal, they can verify a saved spec includes all five gates:

```bash
node plugins/design-validator.mjs design-data/projects/my-app/handoff.md
```

Exit code `0` = good. Plain-English gate guide: [quality-gates-for-designers.md](../docs/quality-gates-for-designers.md).

## Next Steps

- [Quick start for designers](../docs/designer-quick-start.md)
- [Workflows by task](../docs/workflows-by-task.md)
- [Designer handoff guide](../docs/handoff-guide.md)
- [Documentation index](../docs/README.md)
