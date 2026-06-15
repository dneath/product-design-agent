# Workflow Reference

Quick index of all 17 workflows. Full step-by-step specs: [`agent/modules/workflows.md`](../agent/modules/workflows.md).

**Designers:** see [handoff-guide.md](handoff-guide.md) for onboarding and the slash-command cheat sheet.

## Process phases

Use [`design-data/references/product-design-process.md`](../design-data/references/product-design-process.md) to pick the right phase before executing a workflow.

| Phase | Workflows |
|-------|-----------|
| Discover | Research, Strategy, AI Mentor |
| Define | Mentor, UX Flows, Diagrams |
| Develop | Brainstorm, Interface, Prototype, Design Converter |
| Deliver | Design System, Annotations, Handoff, Figma Export |
| Validate | Critique, Accessibility, UX Audit |

## Workflow index

| § | Workflow | Command | Key output |
|---|----------|---------|------------|
| 1 | User Research | `/research` | `research-plan.md`, synthesis |
| 2 | Design System | `/design-system` | `system.md`, tokens |
| 3 | Interface Design | `/interface` | Gated UI + **Variant Protocol** (2–3 directions) |
| 4 | Product Strategy | `/strategy`, `/brainstorm` | Ideas, assumption map |
| 5 | Design Critique | `/critique` | Prioritized feedback |
| 6 | Design Handoff | `/handoff` | `handoff.md` |
| 7 | Accessibility Audit | `/ux-audit` | WCAG findings |
| 8 | Figma Integration | (URL detected) | Critique or wireframes |
| 9 | AI Mentor | `/mentor` | `concept.md` |
| 10 | UX Flows | `/ux-flows` | `flows.md` |
| 11 | UX Audit | `/ux-audit` | Nielsen + WCAG report |
| 12 | Design Converter | `/design-converter` | `converted.md` |
| 13 | Figma Export | `/figma-export` | Figma file + tokens |
| 14 | Portfolio Builder | `/portfolio` | `case-study.md` |
| 15 | Prototype Variants | `/prototype` | `prototype-{a,b,c}.html` |
| 16 | Diagrams | `/diagram` | `diagrams/*.mmd` |
| 17 | UX Annotations | `/annotate` | `annotations.md`, `ux-rationale.md` |

## Quality gates (all UI workflows)

1. **Intent** — Who / What / Feel (no generic words)
2. **Domain** — 5+ concepts, 5+ colors, signature ×5
3. **Validation** — swap, squint, signature, token tests
4. **Variance** — unique Vibe + Layout pairing
5. **Ban list** — 10 forbidden AI-default patterns

OpenCode enforces automatically; other platforms use rules/AGENTS.md + optional `node plugins/design-validator.mjs`.

## Platform notes

See [`agent/modules/platform-adaptation.md`](../agent/modules/platform-adaptation.md) for OpenCode, Claude Code, Cursor, Codex, and generic LLM differences.

## Examples

- [`examples/getting-started.md`](../examples/getting-started.md)
- [`examples/dashboard-design.md`](../examples/dashboard-design.md)
