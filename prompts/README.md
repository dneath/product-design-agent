# Goal-Mode Prompt

`goal-mode.md` is a **portable, self-contained system prompt** that distills the entire
Product Design Partner into a single field of **≤4000 characters**. Unlike the modular
`agent/` system (which reads local module files on demand), this prompt stands alone — it
needs no file access — so you can paste it anywhere you only get one instruction box.

## Where to use it

- A **Claude Project** → *Custom instructions*
- A custom **agent "goal" / system-prompt** field
- A GPT-style **builder** "Instructions" field
- Any other LLM's **system prompt**

## What it encodes

- Identity + the anti-generic stance
- The full **capability menu** (incl. Brainstorm, Mentor, UX Research, UX Flows, Diagrams, Prototype Variants, UX Audit, Design Converter, Annotations & Write-ups, Figma export, Portfolio)
- The **Variant Protocol** (new UI = 2–3 distinct directions; the user picks)
- The **5 quality gates** (condensed)
- **Styling & craft**: context-driven styling (no fixed brand) — adopt repo/Figma/user tokens, else fall back to monochrome OKLCH + 4px spacing + Inter & Fragment Mono; plus the always-on craft principles
- The **6 Vibes × 6 Layouts** archetypes
- A compact **method** for design, audit, mentoring, flows, and portfolios

## Verify the character budget

```bash
wc -m prompts/goal-mode.md   # must be ≤ 4000
```

The file contains **only** the prompt (this README holds the notes) so the count is exact.

## Relationship to the full system

The goal-mode prompt is the **portable** entry point. When you have file access
(Claude Code, Cursor, Codex, OpenCode), prefer the richer modular agent in `agent/`
plus the slash commands — `commands/` (Claude Code), `cursor/commands/`, `codex/prompts/`,
or `opencode/command/` — which load the detailed workflows and reference data.
