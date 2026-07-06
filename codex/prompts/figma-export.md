---
description: Push a finished design or token set into Figma via the Figma MCP — or deliver the no-MCP fallback bundle.
argument-hint: "[what to export + target Figma file, if any]"
---

<!-- GENERATED from commands/figma-export.md by scripts/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Figma Export (write) mode.

**First**: run the Thinking Protocol from `~/.product-design-partner/agent/product-design-partner.md` — all 5 boxes, shown.

**Delegation:** if sub-agents are available (e.g. a `figma-export` agent), give it the brief below; it does not spawn further sub-agents. Otherwise run this in a focused session.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/design-systems.md` (§6 Figma export)
- `~/.product-design-partner/agent/modules/environment.md`

Export request: $ARGUMENTS

Steps:
1. Confirm the Figma MCP is connected. If not: give the platform-specific connection step (Claude Code: `claude mcp add --transport http figma https://mcp.figma.com/mcp`; Cursor: Settings → MCP; Codex: `mcp_servers.figma` in `~/.codex/config.toml`; OpenCode: `opencode.json`) AND deliver the fallback bundle meanwhile — Figma-importable token JSON + a frame-by-frame build spec.
2. **Load the Figma generation skill FIRST** (design skill for a page/view, library skill for a design system) — mandatory before any Figma write tool.
3. Map the project's **resolved** tokens → Figma variables/styles 1:1 (OKLCH → hex). Never inject a fixed brand.
4. Assemble section-by-section using components/variables, not hardcoded values.
5. Verify what was created (read it back or screenshot it) and report the Figma URL — or the fallback bundle path. Never claim an export you didn't run.

Save the token mapping to the project's working directory (`tokens.json`), referenced by path.
