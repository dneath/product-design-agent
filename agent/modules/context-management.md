# Context & Token Management

> **When to use:** Any multi-step task, any task producing large artifacts, or when the context
> window nears its limit. Loaded alongside the routed module. Four disciplines:
> summarize & compact · persistent files · delegation · output hygiene.

---

## 1. Summarize & compact

- **MUST summarize each completed sub-task in ≤5 lines** — what was decided, where the artifact
  lives, what's next — then discard the verbose working detail.
- **MUST discard raw intermediate output** once the conclusion is extracted: build logs,
  `npm install` output, full file reads, search dumps. Keep "build passed, 0 errors", not the stream.
- **Near the token limit: write a state summary and continue from it**, replacing verbose history:

```markdown
## State summary — <project>
- Goal: <one line>
- Styling source: <repo tokens / Figma / user / fallback>
- Decisions: <variant B chosen; dark theme; …>
- Artifacts: <paths>
- Open: <unresolved items>
- Next: <immediate next step>
```

On harnesses with native compaction, let it run; on those without, compact manually before the
window fills.

## 2. Persistent files — two files, two lifetimes

- **Durable project memory** — `design-data/projects/<project>/system.md` (or the host repo's
  `AGENTS.md`/`DESIGN.md`): stack, conventions, resolved styling source, structure, hard
  constraints. Read often, written rarely. **MUST prune on every visit** — delete superseded
  decisions; a memory file that can't be read in 30 seconds has failed.
- **Volatile scratch** — a separate `scratch.md` in the same project dir: current to-dos, working
  notes, dead ends, candidate values. Written constantly, **MUST be deleted when the task ships.**
- **NEVER** let scratch leak into memory (promote only settled facts). **NEVER** write either into
  the agent's own instruction/config files (see `environment.md`).

## 3. Delegation

**If sub-agents are available**, delegate self-contained steps with a tight brief and an exact
return contract — the sub-agent's noise never touches the main thread:

| Step | Sub-agent returns (≤5 lines) |
|---|---|
| Browser verification of a prototype | pass/fail per variant + screenshot paths + console errors |
| Dev-server check/start | running? + URL + pid |
| Repo token/convention discovery | resolved tokens + file paths, not the files |
| Large search or long reference read | the conclusions, not the dumps |

One job per sub-agent; sub-agents do not spawn sub-agents.
**If sub-agents are NOT available**, do these steps sequentially and summarize each to ≤5 lines
immediately (rule 1) before continuing.

## 4. Output hygiene

- **MUST write large artifacts to disk and reference by path** — never inline prototypes, token
  JSON, transcripts, or generated components into the conversation.
- **The Thinking Protocol answers, decisions, and rationale go into the project design doc, not the
  chat.** In the terminal, return only a short summary — decisions + artifact paths + open questions
  — and reference the doc by path. Chat is a pointer to the work, not the work.
- Truncate verbose tool output to the relevant slice (the error + location, the pass/fail line).
- Once a file's facts are summarized, cite the path instead of re-reading it.

---

## Quick checklist

- [ ] Completed sub-tasks summarized ≤5 lines; raw output discarded
- [ ] Near the limit → state summary written, continued from it
- [ ] Durable facts in a pruned `system.md`; task state in `scratch.md`; scratch deleted at ship
- [ ] Self-contained steps delegated (or summarized immediately when solo)
- [ ] Artifacts on disk, referenced by path; tool output truncated
- [ ] Thinking Protocol + rationale written to the design doc; chat is a short summary + paths
