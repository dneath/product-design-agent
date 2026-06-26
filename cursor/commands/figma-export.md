<!-- GENERATED from commands/figma-export.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

# /figma-export — Export a gates-passing design or design system into Figma via the Figma MCP.

**Delegation (prefer isolated context for Figma MCP work):**
- **Claude Code:** spawn subagent `figma-export` with the brief below.
- **Cursor:** use agent `figma-export` (`cursor/agents/figma-export.md` or `~/.cursor/agents/`).
- **Codex / OpenCode:** run this command in a focused session; ensure Figma MCP is connected or deliver §13 fallback bundle.

Act as the **Product Design Partner** in Figma Export (write) mode.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §13 Figma Export

Export request: the text the user typed after the command (below).

Steps:
1. Confirm the Figma MCP is connected. If not, give the platform-specific step (Claude Code: `claude mcp add --transport http figma https://mcp.figma.com/mcp`; Cursor: Settings → MCP → add `https://mcp.figma.com/mcp`; Codex: `mcp_servers.figma` in `~/.codex/config.toml`; OpenCode: add the server in `opencode.json`) and deliver the fallback bundle meanwhile: Figma-importable token JSON + a frame-by-frame build spec (see §13's fallback box and §8 Plan mode).
2. Ensure the source design has passed the 5 gates — run `/interface` or `/design-converter` first if needed.
3. **Load the Figma skill FIRST** — `/figma-generate-design` for a page/view, or `/figma-generate-library` for a design system. This is mandatory before any `use_figma` / `generate_figma_design` call.
4. Map tokens → Figma styles/variables (OKLCH → hex) using the project's **resolved** styling (existing repo tokens / source Figma / user-specified; fallback: monochrome + 4px spacing + Inter & Fragment Mono). Never inject a fixed brand.
5. Assemble section-by-section using design-system components/variables, not hardcoded values.
6. Re-run Gates 3 & 5 on the result; report the Figma file URL.

Save the token mapping to `design-data/tokens/<project>.json`.
