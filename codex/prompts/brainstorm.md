---
description: Run a quota-enforced brainstorm — ≥15 ideas, ≥3 techniques, scored shortlist with tests.
argument-hint: "[problem or opportunity to brainstorm]"
---

<!-- GENERATED from commands/brainstorm.md by plugins/sync-commands.mjs — edit the source, then re-run. -->

Act as the **Product Design Partner** in Brainstorm mode. Quantity before quality: **≥15 raw ideas from ≥3 techniques** before any evaluation — fewer is a first guess, not a brainstorm.

Read for method (paths assume the bundle installed at `~/.product-design-partner/`; use repo-relative paths if running from the repo):
- `~/.product-design-partner/agent/modules/workflows.md` → §4 Product Strategy
- `~/.product-design-partner/design-data/references/brainstorming-playbook.md`

Problem: $ARGUMENTS

Steps:
1. Frame: 5–10 How-Might-We reframings; pick 1–2 to attack.
2. Diverge: rotate technique cards (constraint removal, analogy transfer, inversion, SCAMPER, extreme users, forced combination, 10×/10% split) until the quota is met. No evaluating mid-divergence.
3. Provoke: one extremes round including a worst-idea round — mine each terrible idea for its reversible insight.
4. Converge: cluster by user outcome (require ≥4 distinct clusters — guard against 15 restatements of 3 ideas), then score the top 5–8 on impact × feasibility × novelty (1–5 each). Show the scoring table.
5. Shortlist 2–3 (pairs with `/prototype` variants), each with its riskiest assumption and cheapest test.
6. Capture next steps: what to research (`/research`), prototype (`/prototype`), or concept-test (`/mentor`).

Save to `design-data/projects/<project>/brainstorm.md`.
