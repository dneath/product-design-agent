# Context & Token Management

Long design tasks fail not from weak ideas but from a polluted context window — raw build logs, full file dumps, and stale intermediate state crowd out the thread. Load this module on any task that spans several steps, produces large artifacts, or starts to near a token threshold. Four disciplines: **summarize & compact**, **persistent memory files**, **sub-agent isolation**, **output hygiene**.

---

## 1. Summarization & Compaction

Keep the live context to *decisions and current state*, not the raw material that produced them.

- **Summarize each completed sub-task in 2–5 lines** — what was decided, where the artifact lives, what's next — then drop the verbose working detail. A finished domain exploration becomes "Domain locked: support-desk; signature = SLA ring; tokens in system.md," not the full transcript.
- **Discard raw intermediate output** once you've extracted the conclusion: build logs, `npm install` output, full file reads, dependency trees, large search dumps. Keep the *result* ("build passed, 0 errors" / "found the token block at src/tokens.css:12"), not the stream.
- **Auto-compact near the threshold.** When the conversation approaches the model's context limit, replace verbose history with a **condensed state summary** and continue from it. A good state summary captures: the goal, gates passed, styling source resolved, decisions made, artifacts written (by path), open questions, and the immediate next step. Everything needed to resume; nothing else.
- On platforms with native compaction (OpenCode `experimental.session.compacting`), let it run — the design-context hook preserves gate/decision state through compression. On platforms without it, do the compaction manually before context fills.

**Compaction state-summary template** (write this, then continue):

```markdown
## State summary — <project>
- Goal: <one line>
- Gates: G1 ✓ G2 ✓ G4 ✓ (styling source: existing repo tokens)
- Decisions: <variant B chosen; dark theme; ...>
- Artifacts: design-data/projects/<project>/{system.md, prototype/, variants.md}
- Open: <accessibility pass on the data table>
- Next: <run browser verification on variant B>
```

---

## 2. Persistent Context Files (the AGENTS.md pattern)

Split durable knowledge from volatile task state. Two files, two lifetimes.

### Lean project memory (durable)

Maintain **one curated memory file** for facts that stay true across sessions — the equivalent of `AGENTS.md` / `system.md` for the project being designed:

- Stack & conventions (framework, styling source resolved, token location, component library)
- Structure (where things live)
- Design defaults in force (the resolved palette/spacing/type, depth strategy, signature)
- Hard constraints (brand rules from the repo/Figma, a11y target, do-not-touch areas)

**Curate it — don't let it grow unbounded.** Prune on every visit: delete superseded decisions, collapse redundancy, keep it scannable. A memory file no one can read in 30 seconds has failed. This file is *read often, written rarely.*

For the design work itself, that file is `design-data/projects/<project>/system.md`. (When operating inside a host repo, its own `AGENTS.md` / `DESIGN.md` is the durable memory — read it, extend it, keep it lean.)

### Scratch file (volatile)

Keep task-specific, in-flight state in a **separate** `design-data/projects/<project>/scratch.md`:

- The current to-do list and what's done
- Working notes, dead-ends tried, things to verify
- Temporary measurements, candidate values not yet committed

Scratch is *written often, read often, and safe to delete* when the task ships. Never let scratch contents leak into the durable memory file — promote only settled facts.

> **Never write task output, scratch state, or memory into the agent's own instruction/config files** (`agent/`, `commands/`, `agents/`, `AGENTS.md` in this repo, or the installed `~/.product-design-partner/` bundle). Those are the agent; project state belongs in the project. See Output Hygiene.

---

## 3. Sub-Agent / Task Isolation

Delegate self-contained steps to a sub-agent with its own fresh context, so their noise never touches the main thread. The sub-agent does the work and returns **only a short result**.

**Delegate (each returns a few lines, not a transcript):**

| Step | Sub-agent returns |
|---|---|
| Browser verification of a prototype | pass/fail per variant + screenshot paths + console errors |
| Dev-server check / start | running? + URL + pid (from `scripts/dev-server.mjs`) |
| Repo token/convention discovery | the resolved tokens + file paths, not the files |
| Large-codebase search | the matching locations, not the dumps |
| Reading long reference data | the 3 relevant facts, not the document |

**Rules:**
- Give the sub-agent a tight brief and the exact return contract ("return only X").
- Heavy design workflows already isolate via the `interface-design`, `prototype-variants`, and `figma-export` subagents — use them; they read the modules themselves, so don't paste module text into the brief.
- One self-contained job per sub-agent; don't chain unrelated work through one.
- The main thread keeps the conclusion and the artifact path — never the raw output.

---

## 4. Output Hygiene

What enters the context window is a budget. Spend it on signal.

- **Write large artifacts to the working directory, reference them by path.** Prototypes, token JSON, research transcripts, generated components, system docs go to `design-data/projects/<project>/...` (or into the host repo). In the conversation, link the path and summarize — don't paste the file.
- **Truncate / stream verbose tool output.** For build output, test runs, logs, and large reads, keep only the relevant slice: the error and its location, the pass/fail line, the specific block you needed. Use `head`/ranges/grep rather than dumping whole files; ask for the line range you need.
- **Reference, don't re-read.** Once a file's relevant facts are summarized in memory, cite the path instead of re-reading it.
- **Default output location** when none is specified: the **project's working directory** (`design-data/projects/<project>/`), never the agent's own files.

---

## Quick Checklist

- [ ] Completed sub-tasks summarized to a few lines; raw logs/dumps discarded
- [ ] Approaching the token limit → wrote a state summary and continued from it
- [ ] Durable facts in a lean, pruned memory file (`system.md` / host `AGENTS.md`)
- [ ] Volatile task state in a separate `scratch.md`, not in memory or config files
- [ ] Isolated steps (browser, dev-server, search, long reads) delegated to sub-agents returning short results
- [ ] Large artifacts written to the working dir and referenced by path, not inlined
- [ ] Verbose tool output truncated to the relevant slice
- [ ] Nothing written into the agent's own instruction/config files
