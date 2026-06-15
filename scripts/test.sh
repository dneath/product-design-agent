#!/usr/bin/env bash
# Product Design Partner — smoke tests (run from repo root)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "== Syntax checks =="
node --check plugins/design-validator.mjs
node --check plugins/path-resolver.mjs
node --check plugins/sync-commands.mjs
node --check plugins/sync-agents.mjs
node --check plugins/product-design.js
node --check hooks/inject-design-context.mjs
python3 -m json.tool .claude-plugin/plugin.json > /dev/null

echo "== Command sync =="
node plugins/sync-commands.mjs
test "$(ls commands/*.md | wc -l)" -eq 16

echo "== Generated commands in sync =="
if ! git diff --quiet opencode/command cursor/commands codex/prompts; then
  echo "ERROR: sync-commands.mjs produced diffs — commit regenerated files or fix commands/"
  git diff --stat opencode/command cursor/commands codex/prompts
  exit 1
fi

echo "== Agent sync =="
node plugins/sync-agents.mjs
test "$(ls agents/*.md | wc -l)" -ge 4

echo "== Generated agents in sync =="
if ! git diff --quiet cursor/agents; then
  echo "ERROR: sync-agents.mjs produced diffs — commit regenerated files or fix agents/"
  git diff --stat cursor/agents
  exit 1
fi

echo "== Goal-mode size =="
BYTES=$(wc -c < prompts/goal-mode.md | tr -d ' ')
test "$BYTES" -le 4000

echo "== Hook routing =="
echo '{"prompt":"brainstorm onboarding ideas"}' | node hooks/inject-design-context.mjs | grep -q '/brainstorm'
echo '{"prompt":"what is 2+2"}' | node hooks/inject-design-context.mjs; test $? -eq 0

echo "== Validator (passing fixture) =="
FIXTURE="$ROOT/design-data/projects/.test-fixture-pass.md"
mkdir -p "$(dirname "$FIXTURE")"
cat > "$FIXTURE" << 'EOF'
# Dashboard Design

## Intent Declaration
**Who**: Priya, a support ops lead at a 40-person SaaS company, checking queue health during morning standup on a laptop in a bright open office
**What**: Triage the highest-priority tickets and reassign overflow before the 9am sync
**Feel**: In control without alarm — urgent items are obvious but the screen does not scream

## Domain Exploration
**Domain**: ticket queue, SLA breach, agent capacity, escalation ladder, customer sentiment, handoff notes
**Color world**: queue amber, breach coral, calm slate, resolved green, neutral paper, alert rust
**Signature**: severity rail — severity rail in header, severity rail on rows, severity rail in filters, severity rail in detail, severity rail in legend

## Variance Selection
**Vibe Archetype**: Dark Technical
**Layout Archetype**: Terminal Grid

## Validation Results
- **Swap Test**: PASS — swapping to light editorial layout would lose the ops-floor density cue
- **Squint Test**: PASS — severity rail and row bands remain visible when blurred
- **Signature Test**: PASS — severity rail in five regions listed above
- **Token Test**: PASS — tokens named queue-amber, breach-coral, paper-slate belong to support ops domain
EOF
node plugins/design-validator.mjs "$FIXTURE"
rm -f "$FIXTURE"

echo "== Validator (public example) =="
node plugins/design-validator.mjs examples/dashboard-design.md

echo "== validateDesign failure wiring =="
node --input-type=module -e "
import { validateDesign } from './plugins/design-validator.mjs';
const { passed } = await validateDesign('# Bad\nno gates');
if (passed) process.exit(1);
"

echo ""
echo "All tests passed."
