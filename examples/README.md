# Examples

Runnable examples and sample prompts. Copy the request text into your AI tool (with the Product Design Partner rule or agent loaded).

| File | Demonstrates |
|------|--------------|
| [getting-started.md](getting-started.md) | Five common scenarios: component, design-system audit, a11y, critique, UX copy |
| [dashboard-design.md](dashboard-design.md) | Full gate-compliant dashboard artifact (validator fixture) — must exit 0 when run through `design-validator.mjs` |

## Try a prompt

**Cursor / Claude Code:**

```
/interface Monitoring dashboard for DevOps engineers during incident response — calm urgency, not panic
```

**Validate an output file:**

```bash
node plugins/design-validator.mjs examples/dashboard-design.md
```

## Save your own examples

Team-specific examples can live in `examples/team/` (create the folder). Keep client-confidential work in `design-data/projects/` instead — that path is gitignored.
