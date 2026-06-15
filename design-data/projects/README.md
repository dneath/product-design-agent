# Your design projects

This folder holds **your generated work** — research plans, prototypes, handoff specs, case studies, and diagrams. It is intentionally empty in the repository; each designer or team fills it in over time.

## Folder convention

Create one directory per product or initiative:

```
design-data/projects/
└── billing-dashboard/
    ├── concept.md           # Mentor / strategy output
    ├── research-plan.md     # §1 User Research
    ├── flows.md             # §10 UX Flows
    ├── diagrams/
    │   └── checkout-flow.mmd
    ├── variants.md          # Variant comparison (A/B/C)
    ├── prototypes/
    │   ├── prototype-a.html
    │   ├── prototype-b.html
    │   └── prototype-c.html
    ├── system.md            # Design system / tokens for this product
    ├── annotations.md       # §17 callouts
    ├── ux-rationale.md      # Decision records
    └── handoff.md           # §6 developer spec
```

You do not need every file on day one. Follow the artifact chain in `design-data/references/product-design-process.md`.

## Git

Everything under `design-data/projects/` (except this README) is **gitignored** by default so personal client work and drafts stay off the remote. To version a specific project with your team, remove that project's path from `.gitignore` or use a separate private repo for deliverables.

## Validate before handoff to engineering

```bash
node plugins/design-validator.mjs design-data/projects/billing-dashboard/handoff.md
```

Exit code `0` means all five quality gates passed.
