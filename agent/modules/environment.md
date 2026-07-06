# Environment — File Output, Dev Servers, Verification

> **When to use:** Any task that writes files or runs a dev server. Loaded alongside the routed
> module. These are hard rules — MUST/NEVER, no judgment calls.

---

## 1. File output — where things go

- **MUST write task output to the project's working directory.** Default when none is specified:
  `design-data/projects/<project>/` in the current working project; inside a host repo, follow its
  conventions for where generated code lives.
- **NEVER write task output into the agent's own instruction/config files** — `agent/`, `commands/`,
  `agents/`, `hooks/`, this repo's `AGENTS.md`, or any installed copy
  (`~/.product-design-partner/`, `~/.claude/`, `~/.config/opencode/`, `~/.cursor/`, `~/.codex/`).
  Those files ARE the agent. Project data belongs in the project.
- Read-root vs write-root: reference data (styling, templates, methods) is READ from the agent's
  install; artifacts are WRITTEN to the project. The two never mix.
- Reference large artifacts by path; never inline them into the conversation.

## 2. Dev servers — check before start, match by project

- **MUST check whether THIS project's server is already running before starting one:**
  `node <root>/scripts/dev-server.mjs check --dir <app>`
  The script matches by **project path** (lockfile + PID + cwd), never by "something is on port 3000".
  **NEVER assume a port is yours; NEVER hand-pick a port; NEVER treat an unrelated server on a
  familiar port as this project's.**
- Reuse a matching running server. Otherwise `start` — the script records what it started
  (`<app>/.dev-server.json`) so it can be cleaned up.
- **MUST stop servers you started when the task ends:** `node <root>/scripts/dev-server.mjs stop --dir <app>`.
  Leave servers you did NOT start untouched.
- `<root>` resolution order: `${CLAUDE_PLUGIN_ROOT}` → repo checkout → `~/.product-design-partner/`
  → `~/.config/opencode/`. **NEVER** run a bare `node scripts/...` assuming cwd.

## 3. Verification — work is not done until verified

- **Done = rendered in a browser, interactions clicked through, variants toggled, console checked.**
- Evidence lives on disk: screenshot files, command output. A claim without an artifact is not a claim.
- **If verification cannot run** (no browser tool, no node, server won't start): label the work
  **UNVERIFIED**, quote the actual error, provide exact run instructions + a self-check list.
  **NEVER fabricate a pass.**

## 4. Cleanup & uninstall discipline

- Anything you start (servers, watchers), you stop. Anything you create for scratch, you delete
  when the task ships (`scratch.md`, temp dirs).
- The agent's own installer maintains a full uninstall (`uninstall.sh`). If you add a new installed
  artifact class to this repo, you MUST add its removal to `uninstall.sh` in the same change.

---

## Quick checklist (before ending any build task)

- [ ] All output in the project's working dir; nothing written into agent/config files
- [ ] Dev server: checked before start; reused or started via the script; stopped if I started it
- [ ] Verified in browser with evidence on disk — or labeled UNVERIFIED with exact commands
- [ ] Scratch files deleted; servers stopped; artifacts referenced by path
