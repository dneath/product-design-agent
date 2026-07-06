# Prototyping — Interactive React Variants

> **When to use:** Interactive React prototypes and variant exploration — "prototype", "make it
> real", "show me options", any new UI build. Command: `/prototype`.
> Also load: `agent/modules/environment.md` (dev server, output), `agent/modules/frontend-quality.md`.

Run the Thinking Protocol (entry file) first. **New UI is never presented as a single take.**

---

## 1. Hard rules

- **MUST be real, working interactivity** — state, inputs that validate, transitions you can trigger.
  NEVER static mockups exported as code, never hover-only CSS pretending to be interaction.
- **Variants are first-class: build 2–4 meaningfully different variants** (default 3; 2 only when
  tightly constrained). Variants MUST differ in **layout, IA, or interaction model** — not cosmetics.
  **Reskin check:** remove color and font — if you can't tell them apart, rebuild.
- **Every variant gets a one-line bet label**, e.g. `V2 — inline editing, no modal`.
- **Realistic data only.** Plausible domain names, awkwardly long values, edge-case counts.
  **NEVER** lorem ipsum, **NEVER** `Item 1/2/3`. Keep fixtures in a small `data.js`.
- **Dependency-light.** Inside a repo: use its stack and tokens. Standalone: smallest viable
  Vite + React. **NEVER** add UI libraries for a prototype.

## 2. Define each variant BEFORE building

```markdown
### Variant B — "Control Tower"
- **Bet**: <one line — what this variant wagers is true about the user>
- **Layout/IA**: <what's promoted, what's demoted>
- **Interaction model**: <inline edit / drawer / dedicated page / search-first…>
- **Trade-off**: <who this is worse for>
```

## 3. Build — one app, tab-switchable variants

Scaffold (standalone case; inside a repo, follow its conventions):

```
<output dir>/prototype/
├── index.html · package.json · vite.config.js
└── src/
    ├── main.jsx · App.jsx
    ├── tokens.css        # resolved styling as CSS variables, domain-named (--sla-critical, not --red-500)
    ├── data.js           # realistic fixtures incl. edge cases
    ├── VariantSwitcher.jsx
    └── VariantA.jsx · VariantB.jsx · VariantC.jsx
```

Build checklist — one requirement at a time, skip nothing:

- [ ] `<VariantSwitcher>` tab group (`role="tablist"`) renders each variant; selection persists via
      URL hash (`#variant-b`) so refresh keeps the tab
- [ ] Each tab shows the variant's one-line bet label
- [ ] Each variant is genuinely interactive — working state, validating inputs, transitions
- [ ] Every data state reachable via an in-app toggle: default always; loading/error/empty switchable
- [ ] Styling resolved per `design-data/references/styling.md` (repo → Figma → user → fallback)
- [ ] Realistic data everywhere, including the awkwardly long ones

## 4. Verify — MANDATORY before presenting

1. Start the dev server via the project-scoped script (**never assume a port, never hand-pick one**):
   `node <root>/scripts/dev-server.mjs start --dir <prototype dir>` — root resolution per the entry
   file. It reuses this project's running server or starts one and prints the URL.
2. **If a browser tool is available** (e.g. a Playwright skill): open the URL, click every tab,
   exercise inputs/validation/state toggles in each variant, screenshot each variant to
   `<prototype dir>/screenshots/`, note console errors. Fix failures, re-verify.
3. Stop the server when done: `node <root>/scripts/dev-server.mjs stop --dir <prototype dir>`.

**Definition of Done — verification (check every box):**
- [ ] dev-server reported `"running": true` with a URL (paste it)
- [ ] every variant tab opened; interactions exercised
- [ ] a screenshot file **exists on disk** per variant (confirm with a file listing)
- [ ] console errors listed (or "none")

**If any box is unchecked or no browser tool exists:** label the work **UNVERIFIED — built, not yet
run**, quote the actual error/note text, and give both run paths:
`cd <prototype dir> && npm install && npm run dev` and the dev-server script command — plus a
self-check list (open URL → click each tab → try each state toggle → watch the console).
**NEVER** write "verified" / "it works" / "renders correctly" without screenshot paths that exist.

## 5. Present, then STOP

Deliver: comparison table (bet · hierarchy · strongest moment · main trade-off per variant) →
recommendation with rationale → run command + screenshot paths (or UNVERIFIED notice).
**Then STOP — the user picks.** Do not refine, extend, or choose for them until they reply.
After selection: refine the winner only (cross-pollinating named details on request); keep losing
variants in the app; record the decision and reasons in `variants.md`.

---

**Delegation:** if sub-agents are available, run build + verification in one isolated sub-agent that
returns only pass/fail per variant + paths (it does NOT spawn further sub-agents). Otherwise do it
inline, summarizing each step.
