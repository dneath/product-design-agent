# Goal-Mode Prompt

`goal-mode.md` is a **portable, self-contained system prompt** distilling the Product Design
Partner into ≤4000 bytes. Unlike the modular `agent/` system (which reads module files on demand),
it stands alone — paste it anywhere you only get one instruction box:

- A **Claude Project** → Custom instructions
- A custom agent "goal" / system-prompt field
- A GPT-style builder "Instructions" field
- Any other LLM's system prompt

It encodes: the Thinking Protocol, operating rules (process order, state matrix, variants,
verification honesty, WCAG AA), context-driven styling with the monochrome/4px/Inter fallback and
craft standards, and per-task method (brainstorm, critique, systems, handoff, decks).

Verify the budget: `wc -c prompts/goal-mode.md` must be ≤ 4000 (enforced by `scripts/test.sh`).

When you have file access (Claude Code, Cursor, Codex, OpenCode), prefer the modular agent in
`agent/` plus the slash commands — they load the full method and templates.
