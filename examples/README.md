# Examples

Sample prompts you can paste into Cursor or Claude Code (with the design partner installed).

| File | Best for |
|------|----------|
| [getting-started.md](getting-started.md) | Everyday scenarios — buttons, audits, critique, copy |
| [dashboard-design.md](dashboard-design.md) | Full dashboard walkthrough (technical reference) |

**New to the tool?** [Quick start for designers](../docs/designer-quick-start.md)

## Try a prompt (Cursor)

```
/interface Monitoring dashboard for DevOps engineers during incident response — calm urgency, not panic
```

## Optional: validate a file (IT / maintainers)

```bash
node plugins/design-validator.mjs examples/dashboard-design.md
```

## Save your own examples

Team-specific examples can live in `examples/team/` (create the folder). Keep client-confidential work in `design-data/projects/` instead — that path is gitignored and is the working directory where the agent writes task output (specs, `system.md`, research, and a runnable React `prototype/` with A/B/C variant tabs). See [design-data/projects/README.md](../design-data/projects/README.md) for the per-project structure.
