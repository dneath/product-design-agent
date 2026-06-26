# Quality gates (plain English)

The agent uses **five checks** before treating UI output as done. Think of them as a critique rubric that stops "clean, modern dashboard for users" from shipping.

You don't need to memorize the technical names. The agent applies them when you use `/interface`, `/prototype`, or `/design-converter`.

## Gate 1 — Who, what, feel

**Question:** Do we know the actual human, task, and emotional outcome?

| Weak (rejected) | Strong (accepted) |
|-----------------|-------------------|
| "Users who want a clean dashboard" | "Finance admins reconciling payouts before month-end; they need confidence nothing was missed" |
| "Modern, intuitive settings" | "Ops lead toggling alerts at 6am; calm urgency—not alarm" |

**Banned vague words:** clean, modern, intuitive, professional, users, people.

## Gate 2 — Domain world

**Question:** Does the design come from *this product's* world—not default tech aesthetics?

The agent lists:

- **Domain concepts** — e.g. for a clinic app: triage queue, vitals strip, handoff note (not "cards" and "widgets")
- **Colors from that world** — e.g. queue amber, stable green, breach coral (not random hex from Dribbble)
- **One signature element** used repeatedly — e.g. a severity rail in the header, rows, filters, detail panel, legend

> **No fixed brand.** Styling is context-driven: the agent reads existing repo tokens first, then a Figma file, then anything you specify. With no signal it falls back to a restrained monochrome scheme (OKLCH greys, never pure `#000`/`#fff`), 4px spacing, and Inter (UI/text) + Fragment Mono (code) — then adapts to the domain. There is no single locked palette or typeface to memorize.

## Gate 3 — Four quick tests

Before handoff, the agent documents four sanity checks:

| Test | Plain meaning |
|------|----------------|
| **Swap** | If we swapped to a cliché layout, would we lose something important? |
| **Squint** | Blur your eyes—is hierarchy still obvious? |
| **Signature** | Can you point to 5+ places the signature element appears? |
| **Token** | Do color/spacing names belong to this product—not `primary-500` everywhere? |

## Gate 4 — Not the same screen twice

**Question:** Is this visually distinct from your last couple of big UI outputs?

The agent tracks **vibe** (e.g. editorial vs control-room) and **layout** (e.g. sidebar-first vs status-first). Repeating the same combo triggers a nudge to try something else.

## Gate 5 — Ban list

**Question:** Does it look like template AI UI?

Common rejections: glass blur on everything, gradient text, side-stripe accent borders, hero metric trio, identical card grids, "clean and modern" copy.

Full list with reasons: [ban-list.md](../design-data/references/ban-list.md)

## Variant Protocol (new screens)

For **new** UI, the agent should show **2–3 genuinely different directions** (not color swaps), with a comparison table and recommendation—then **you pick** before polish.

Commands: `/interface` and `/prototype`.

## Do I need to run a checker myself?

| Tool | Who enforces the gates |
|------|------------------------|
| **Cursor / Claude / Codex** | The agent + your review. Optional checker before dev handoff (ask IT once). |
| **OpenCode** | Automatic blocking in the app |

**Optional quality check** (after saving a spec file):

```bash
node plugins/design-validator.mjs design-data/projects/your-project/handoff.md
```

If that sentence is unfamiliar, ask a teammate to run it—or skip until handoff week; the agent still follows the gates in conversation.

Technical spec for all gates: [quality-gates.md](../agent/modules/quality-gates.md)
