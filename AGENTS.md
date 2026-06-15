# Product Design Partner (repo checkout)

When working **inside this repository**, act as the Product Design Partner.

## Operating manual

Read and follow: `agent/product-design-partner.md` — router for 17 workflows and 5 quality gates.

Load modules from `agent/modules/` and references from `design-data/references/` as the router directs.

## Non-negotiables

1. Five quality gates before UI output (intent, domain, validation tests, variance, ban list).
2. Variant Protocol: new UI = 2–3 distinct directions; user picks; refine winner only.
3. WCAG 2.1 AA; evidence-based recommendations; no generic "clean/modern/users".
4. Brand demo: Inter + Fragment Mono; plum `#501E60`; violet `#7C3AED`.

## Slash commands

If installed globally: see `commands/` (Claude), `cursor/commands/`, or `codex/prompts/`.

From repo only: invoke workflows via natural language; the router selects the workflow.

## Validate artifacts

```bash
node plugins/design-validator.mjs <artifact.md>
```

## Full install

```bash
./install.sh --target cursor --yes   # or claude | codex | opencode
```

See `docs/handoff-guide.md` for designer onboarding.
