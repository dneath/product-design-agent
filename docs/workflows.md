# Workflow Reference

Technical index of all 17 workflows. **Designers:** use [workflows-by-task.md](workflows-by-task.md) instead—it matches commands to everyday jobs without § numbers.

**Onboarding:** [handoff-guide.md](handoff-guide.md) · [designer-quick-start.md](designer-quick-start.md)

Full step-by-step specs live in [`agent/modules/workflows.md`](../agent/modules/workflows.md) (maintainers).

## Process phases

| Phase | Workflows |
|-------|-----------|
| Discover | Research, Strategy, AI Mentor |
| Define | Mentor, UX Flows, Diagrams |
| Develop | Brainstorm, Interface, Prototype, Design Converter |
| Deliver | Design System, Annotations, Handoff, Figma Export |
| Validate | Critique, Accessibility, UX Audit |

Phase guide: [product-design-process.md](../design-data/references/product-design-process.md)

## Workflow index

| § | Workflow | Command | Typical output |
|---|----------|---------|----------------|
| 1 | User Research | `/research` | Research plan, synthesis |
| 2 | Design System | `/design-system` | Token audit, `system.md` |
| 3 | Interface Design | `/interface` | Research refs → gated UI + 2–3 directions (context-driven styling) |
| 4 | Product Strategy | `/strategy`, `/brainstorm` | Ideas, assumption map |
| 5 | Design Critique | `/critique` | Prioritized feedback |
| 6 | Design Handoff | `/handoff` | `handoff.md` for engineering |
| 7 | Accessibility Audit | `/ux-audit` | WCAG findings |
| 8 | Figma Integration | (Figma link in chat) | Critique or wireframes |
| 9 | AI Mentor | `/mentor` | `concept.md` |
| 10 | UX Flows | `/ux-flows` | `flows.md` |
| 11 | UX Audit | `/ux-audit` | Usability + a11y report |
| 12 | Design Converter | `/design-converter` | UI spec from sketch/screenshot |
| 13 | Figma Export | `/figma-export` | Figma file or build spec |
| 14 | Portfolio Builder | `/portfolio` | `case-study.md` |
| 15 | Prototype Variants | `/prototype` | Runnable Vite+React app (tabs A/B/C), `variants.md`, `screenshots/` |
| 16 | Diagrams | `/diagram` | Mermaid source files |
| 17 | UX Annotations | `/annotate` | Annotations, rationale |

## Research-first & context-driven styling

Before designing, the §0 Process Router and the Interface (§3) and Prototype (§15) workflows run a **research step** — pulling real product references and published UX evidence ([design-research-sources.md](../design-data/references/design-research-sources.md)) so output is grounded rather than generic.

Styling is **never a fixed brand**. It is resolved from context in priority order — existing repo tokens → Figma variables → user-specified → monochrome OKLCH fallback (4px scale, Inter + Fragment Mono). See [styling-resolution.md](../design-data/references/styling-resolution.md).

Prototype output is a single runnable Vite + React app with a tab group to switch variants A/B/C (browser-verified), written to `design-data/projects/<project>/prototype/` alongside `variants.md` and `screenshots/` — not separate self-contained HTML files.

## Quality gates (UI workflows)

Plain English: [quality-gates-for-designers.md](quality-gates-for-designers.md).  
Full rules: [quality-gates.md](../agent/modules/quality-gates.md).

## Examples

- [getting-started.md](../examples/getting-started.md)
- [dashboard-design.md](../examples/dashboard-design.md)
