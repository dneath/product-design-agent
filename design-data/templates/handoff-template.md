# Handoff — <feature/flow name>

> Fill every section in order. Replace every `<…>` slot. No section may be deleted — mark
> genuinely inapplicable ones `N/A — <reason>`. Values are token references or exact numbers.

## 1. Flow overview

- **User goal**: <what the user is trying to accomplish, one sentence>
- **Entry points**: <where users arrive from — nav item, deep link, email, empty state CTA…>
- **Exit states**: <success exit(s), abandonment points, error exits>
- **Flow**: <Mermaid diagram or text notation: step → decision → branch>

## 2. Screen-by-screen spec

<!-- Repeat this block per screen -->
### Screen: <name>

- **Purpose**: <the one job this screen does>
- **Layout**: <grid/structure — columns, zones, reading order>
- **Spacing**: <key gaps as tokens, e.g. section gap --space-8, card padding --space-4>
- **Tokens used**:

| Element | Token(s) |
|---|---|
| <background> | <--bg / --surface-1> |
| <primary text> | <--text-1> |
| <…> | <…> |

- **Responsive behavior**:

| Range | Behavior |
|---|---|
| <«640px» | <single column, nav collapses to …> |
| <640–1024px (test ~700–900px!)> | <…> |
| <»1024px> | <…> |

## 3. State matrix

<!-- Repeat per screen. NO EMPTY CELLS — write the behavior or `Out of scope — <reason>`. -->

| State | What the user sees | How they recover / proceed |
|---|---|---|
| Empty (no data yet) | | |
| Loading | | |
| Error (fetch/save failed) | | |
| Partial data | | |
| Overflow (long values, many items) | | |
| First run | | |
| Success / done | | |

## 4. Interaction spec

| Element | Trigger | Transition | Duration / easing | Keyboard | Focus behavior |
|---|---|---|---|---|---|
| <save button> | <click / Enter> | <state → saving → saved> | <150ms / ease-out-quart> | <Enter submits, Esc cancels> | <focus returns to …> |
| <…> | | | | | |

- **Focus order** (per screen): <1. …, 2. …, 3. …>
- **Optimistic vs pessimistic** (per async action): <action — choice — why>

## 5. Accessibility requirements

- **Roles & semantics**: <native elements used; each ARIA attribute and its justification>
- **Labels**: <every input's label text; icon-button aria-labels>
- **Contrast**: <calculated pairs, e.g. --text-2 on --surface-1 = 7.1:1>
- **Screen reader**: <what is announced on state changes — live regions, alerts>
- **Reduced motion**: <what motion collapses to>
- **Keyboard**: <full path through the flow without a mouse>

## 6. Data contract

<!-- Repeat per view -->
### View: <name>

| Field | Type / format | Required | When missing/malformed |
|---|---|---|---|
| <user.name> | <string ≤120ch> | <yes> | <show — placeholder, log warning> |
| <…> | | | |

**Sample payload** (realistic, includes an awkward case):

```json
{ }
```

## 7. Rationale — why key decisions were made

<!-- ≥3 entries. This is what lets engineers make consistent judgment calls without a designer. -->

| Decision | Alternatives considered | Why this one |
|---|---|---|
| <inline editing, no modal> | <modal editor; separate page> | <editing is high-frequency + low-risk; modal breaks scanning flow> |
| <…> | | |

## 8. Open questions & out of scope

- **Open**: <question — who decides — by when>
- **Out of scope**: <explicitly not in this handoff — so no one assumes it's coming>
