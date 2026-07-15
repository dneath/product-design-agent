# Your design projects

This folder is **your workspace** — research notes, prototypes, handoff specs. It starts
empty on purpose; you fill it as you work. Nothing here is committed to git by default.

## One folder per product

Pick a short name (e.g. `billing-dashboard`) and stick with it. This project folder is the
**working directory** — the agent writes all task output here (never into its own config files):

```
design-data/projects/billing-dashboard/
├── system.md          # durable memory: resolved styling source, tokens, locked decisions
├── scratch.md         # volatile task state — deleted when the task ships
├── research/          # research notes & findings          (/research)
├── flows.md           # journeys, task flows, IA           (/flows)
├── variants.md        # prototype direction comparison + decision (/prototype)
├── prototype/         # runnable Vite + React app, tab-switchable variants (/prototype)
│   └── screenshots/   # browser-verification captures
└── handoff.md         # engineering handoff spec           (/handoff)
```

Tell the agent: *"Save under design-data/projects/billing-dashboard/"* — or just work inside your
product's repo and the agent follows that repo's conventions instead.

## Sharing

Files stay local by default. To share: copy to Notion/Drive/Figma, or version a specific project
folder in a private repo.
