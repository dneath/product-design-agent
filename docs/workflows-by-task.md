# Workflows by task

**"Which command do I use?"** — pick the row that matches what you're trying to do today.

| I'm trying to… | Command | What you'll get |
|----------------|---------|-----------------|
| Generate lots of early ideas | `/brainstorm` | 15+ ideas, techniques used, shortlist |
| Shape a raw idea into a product concept | `/mentor` | Concept brief, assumptions, next steps |
| Plan interviews or synthesize research | `/research` | Plan, discussion guide, themes |
| Frame a problem or strategy | `/strategy` | Problem framing, opportunities |
| Map journeys, flows, or IA | `/ux-flows` | Flow steps, IA notes |
| Draw a flowchart or architecture diagram | `/diagram` | Mermaid diagram (editable text) |
| **Design a new screen** | `/interface` | Who/what/feel → 2–3 directions → refined spec |
| **Build clickable variants** | `/prototype` | One runnable React app with A/B/C tabs to switch directions (browser-verified) |
| Turn a sketch or screenshot into UI | `/design-converter` | Structured UI spec from your image |
| Audit tokens and components | `/design-system` | Coverage gaps, token recommendations |
| Review a mockup (peers or self) | `/critique` | Prioritized feedback |
| Check usability + accessibility | `/ux-audit` | Nielsen + WCAG findings |
| Add callouts and rationale for dev | `/annotate` | Numbered annotations, decision notes |
| Write the dev handoff doc | `/handoff` | Layout, states, tokens, edge cases |
| Send work to Figma | `/figma-export` | Figma file or build spec if Figma isn't connected |
| Write a portfolio case study | `/portfolio` | Case study from project files |

## By project phase

| Phase | Typical commands |
|-------|------------------|
| **Discover** | `/research`, `/strategy`, `/mentor`, `/brainstorm` |
| **Define** | `/mentor`, `/ux-flows`, `/diagram` |
| **Develop** | `/interface`, `/prototype`, `/design-converter`, `/brainstorm` |
| **Deliver** | `/design-system`, `/annotate`, `/handoff`, `/figma-export` |
| **Validate** | `/critique`, `/ux-audit` |

More on phases: [product-design-process.md](../design-data/references/product-design-process.md)

## Heavy tasks (long outputs)

For big screen work, Cursor and Claude can use **focused agents** so your main chat stays readable:

| Task | Command | Also available as agent |
|------|---------|-------------------------|
| New screen | `/interface` | `interface-design` |
| Clickable variants | `/prototype` | `prototype-variants` |
| Figma export | `/figma-export` | `figma-export` |

In Cursor: pick the agent from the agent menu if your team installed them. Otherwise the slash command alone is enough.

## Example prompts

Copy and edit the bracketed parts:

```
/research Plan 5 user interviews for [role] who [job-to-be-done]. We need to validate [assumption].
```

```
/interface [Screen name] for [specific role] who [task]. They should feel [emotion], not [anti-pattern].
```

```
/handoff Turn the chosen variant in design-data/projects/[name]/ into a developer-ready spec with states and a11y.
```

```
/critique Review this settings page [paste Figma link or describe]. Focus on hierarchy and consistency.
```

## Full technical index

Workflow numbers and file outputs: [workflows.md](workflows.md) · [agent/modules/workflows.md](../agent/modules/workflows.md)
