# Your design projects

This folder is **your workspace**—research notes, prototypes, handoff specs, and case studies. The empty repo is intentional; you fill it in as you work.

Nothing here is uploaded to git by default (good for client confidentiality).

## One folder per product

Pick a short name (e.g. `billing-dashboard`, `onboarding-v2`) and stick with it. This
project folder is the **working directory** — the agent writes all task output here (never
into its own config files):

```
design-data/projects/billing-dashboard/
├── system.md          # locked design direction & tokens (context-resolved, no fixed brand)
├── research/          # research notes & findings
├── variants.md        # notes comparing the prototype directions A/B/C
├── prototype/         # runnable Vite + React app: one tab-switchable UI (variants A/B/C)
├── screenshots/       # browser-verified captures of each variant
└── handoff.md         # engineering handoff spec
```

Tell the agent: *"Save under design-data/projects/billing-dashboard/"*

## Files you'll collect over time

You don't need all of these on day one—add files as the project matures.

| File or folder | Created when you… |
|----------------|-------------------|
| `concept.md` | Shape an idea (`/mentor`, `/strategy`) |
| `research-plan.md` | Plan research (`/research`) |
| `research/` | Capture research notes & findings (`/research`) |
| `flows.md` | Map journeys (`/ux-flows`) |
| `diagrams/` | Draw flows (`/diagram`) |
| `variants.md` | Notes comparing the prototype directions A/B/C |
| `prototype/` | Build clickables (`/prototype`) — a runnable Vite + React app: one tab-switchable UI with variants A/B/C, browser-verified |
| `screenshots/` | Browser-verified captures of each prototype variant |
| `system.md` | Lock design direction (`/interface`) — context-resolved tokens, no fixed brand |
| `annotations.md` | Spec interactions (`/annotate`) |
| `handoff.md` | Hand to engineering (`/handoff`) |
| `case-study.md` | Portfolio piece (`/portfolio`) |

## Sharing with teammates

**Default:** Files stay on your laptop only.

To share with the team:

- Export from Cursor chat, copy files to Notion/Drive/Figma, or
- Ask your lead about versioning a specific project folder in a private repo

## Optional quality check before dev handoff

If someone on your team runs Terminal, they can verify a spec file passes all five gates:

```bash
node plugins/design-validator.mjs design-data/projects/billing-dashboard/handoff.md
```

"No news is good news" — exit code `0` means the doc includes everything the gates require. See [quality-gates-for-designers.md](../../docs/quality-gates-for-designers.md).

## What to read next

- [Workflows by task](../../docs/workflows-by-task.md) — which command creates which file  
- [Product design process](../references/product-design-process.md) — phase order
