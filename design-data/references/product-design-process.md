# Product Design Process — Routing Guide

Use this reference to place any request in the right phase before jumping to pixels. The agent's 17 workflows map onto industry-standard process models — pick the phase first, then the workflow.

## Master model: Double Diamond + Delivery

| Phase | Question | Typical workflows | Exit criteria |
|-------|----------|-------------------|---------------|
| **Discover** | What is happening? What do we not know? | §1 Research, §4 Strategy, §9 Mentor | Research questions answered; riskiest assumptions named |
| **Define** | What problem are we solving, for whom? | §9 Mentor, §4 Strategy, §10 UX Flows | JTBD statement, scope, success metrics, out-of-scope list |
| **Develop** | What could we build? | §4 Brainstorm, §15 Prototype, §3 Interface (variants) | 2–3 distinct directions compared; user picks a winner |
| **Deliver** | How do we ship it well? | §6 Handoff, §17 Annotations, §13 Figma Export, §2 Design System | Gates pass; dev-ready spec; tokens documented |
| **Validate** (continuous) | Did it work? | §5 Critique, §7/§11 Audit, §1 Research (evaluative) | Findings prioritized; next iteration scoped |

**Rule**: If the user is in Discover/Define, do not skip to Interface Design. If they ask for UI but intent is unclear, run Gate 1 (or §9 Mentor) first.

## Complementary frameworks (when to use which)

### Design Thinking (5 steps)
Empathize → Define → Ideate → Prototype → Test. Maps 1:1 to Discover → Define → Develop → Develop → Validate. Use when the team speaks "design thinking" language.

### Continuous Discovery (Teresa Torres)
Weekly touchpoints + Opportunity Solution Tree (outcome → opportunity → solution → experiment). Use for ongoing product work:
- **Outcome** → §4 Strategy
- **Opportunity** → §1 Research synthesis + §10 UX Flows
- **Solution** → §3/§15 variants
- **Experiment** → §1 usability test plan or §15 clickable prototype

### Design Sprint (5 days)
Mon Map → Tue Sketch → Wed Decide → Thu Prototype → Fri Test. Compress with:
- Day 1–2: §4 Brainstorm + §10 UX Flows + §16 Diagrams
- Day 3: Variant Protocol (§3/§15) — user picks
- Day 4: §15 runnable prototype of winner
- Day 5: §1 usability test script + §5 Critique

### Jobs-to-be-Done
"When [situation], I want to [motivation], so I can [outcome]." Required before §3 Interface. Template in `research-templates.md`.

### Design Ops / Design System lifecycle
Audit (§2) → Token architecture → Component docs → Migration → Governance. Run §2 when hardcoded values appear or teams diverge.

## Request → phase → workflow (quick router)

| User says… | Likely phase | Start with |
|------------|--------------|------------|
| "I have an idea" | Discover/Define | §9 Mentor |
| "Interview users" | Discover | §1 Research |
| "Brainstorm features" | Develop | §4 Brainstorm (≥15 ideas) |
| "Design a dashboard" | Develop | §3 Interface (Variant Protocol) |
| "Show me options" | Develop | §15 Prototype |
| "Map the flow" | Define | §10 UX Flows + §16 Diagram |
| "Review this" | Validate | §5 Critique or §11 UX Audit |
| "Ready for dev" | Deliver | §17 Annotations → §6 Handoff |
| "Push to Figma" | Deliver | §13 Figma Export |

## Artifact chain (recommended order)

For a greenfield product feature:

1. `concept.md` (§9) or `research-plan.md` (§1)
2. `flows.md` + `diagrams/*.mmd` (§10, §16)
3. `variants.md` + `prototypes/*.html` (§15) OR gated interface spec (§3)
4. `system.md` (§2) when patterns repeat
5. `annotations.md` + `ux-rationale.md` (§17)
6. `handoff.md` (§6)
7. `case-study.md` (§14) when documenting for portfolio

Save under `design-data/projects/<project-name>/`.

## Anti-patterns in process

- **Solution-first**: UI before problem definition → stop, run §9 or Gate 1
- **Single-variant default**: one mockup without comparison → Variant Protocol
- **Research theater**: interviews without synthesis → require themes + evidence
- **Handoff without annotations**: dev guesses at behavior → §17 before §6
- **Audit as polish**: WCAG only at the end → §11 in parallel with §3

## Confidence & evidence by phase

| Phase | Evidence type | Confidence bar |
|-------|---------------|----------------|
| Discover | Quotes, observations, analytics | High = 5+ sources on a theme |
| Define | JTBD, scope doc, assumption map | Medium acceptable for hypotheses |
| Develop | Variant comparison, heuristic rationale | Must pass Gates 1–5 for UI |
| Deliver | Token refs, annotated specs | Every interactive = INT+STA+A11Y |
| Validate | Test results, audit findings | Severity × frequency prioritization |
