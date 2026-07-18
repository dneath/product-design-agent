#!/usr/bin/env bash
# Product Design Partner — smoke tests (run from repo root)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "== Syntax checks =="
node --check scripts/dev-server.mjs
node --check scripts/path-resolver.mjs
node --check scripts/sync-commands.mjs
node --check scripts/sync-agents.mjs
node --check hooks/inject-design-context.mjs
node -e "JSON.parse(require('fs').readFileSync('.claude-plugin/plugin.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('hooks/hooks.json','utf8'))"
bash -n install.sh
bash -n uninstall.sh
if command -v shellcheck >/dev/null 2>&1; then
  shellcheck -S warning install.sh uninstall.sh scripts/test.sh
else
  echo "  (shellcheck not installed — skipped locally, enforced in CI)"
fi

echo "== File counts =="
test "$(ls commands/*.md | wc -l)" -eq 7
test "$(ls agents/*.md | wc -l)" -eq 3
test "$(ls agent/modules/*.md | wc -l)" -eq 7
test "$(ls design-data/references/*.md | wc -l)" -eq 9
test "$(ls design-data/templates/*.md | wc -l)" -eq 1

echo "== Prototype shells =="
SHELLS="blank dashboard marketing ai-chat saas docs portfolio"
test "$(find design-data/shells -mindepth 1 -maxdepth 1 -type d | wc -l)" -eq 7
for s in $SHELLS; do
  d="design-data/shells/$s"
  test -f "$d/package.json"    || { echo "ERROR: $d/package.json missing"; exit 1; }
  test -f "$d/app/tokens.css"  || { echo "ERROR: $d/app/tokens.css missing"; exit 1; }
  test -f "$d/README.md"       || { echo "ERROR: $d/README.md missing"; exit 1; }
  test -f "$d/components/variant-switcher.tsx" || { echo "ERROR: $d variant-switcher missing"; exit 1; }
  node -e "JSON.parse(require('fs').readFileSync('$d/package.json','utf8'))"
  # Versions must be pinned exact — no ranges.
  if grep -E '"[~^][0-9]' "$d/package.json" >/dev/null; then
    echo "ERROR: $d/package.json has unpinned versions"; exit 1
  fi
  # Default tooling present in every shell.
  for dep in react-scan mesurer agentation axe-core; do
    grep -q "\"$dep\"" "$d/package.json" || { echo "ERROR: $d missing $dep"; exit 1; }
  done
  # Nothing generated may be committed.
  for junk in node_modules .next package-lock.json .dev-server.json; do
    test ! -e "$d/$junk" || { echo "ERROR: $d/$junk must not be committed"; exit 1; }
  done
done
test -f design-data/shells/LICENSES.md
test -f design-data/references/shells.md

echo "== Line budgets (short modules keep weaker models on track) =="
test "$(wc -l < agent/product-design-partner.md)" -lt 150
for f in agent/modules/*.md; do
  lines=$(wc -l < "$f")
  if [ "$lines" -gt 170 ]; then
    echo "ERROR: $f is $lines lines (budget: 170)"; exit 1
  fi
done

echo "== Command conventions (sync-generator coupling) =="
READ_LINE='Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`; if unset, use the repo checkout or the bundle at `~/.product-design-partner/`):'
for f in commands/*.md; do
  grep -qF "$READ_LINE" "$f" || { echo "ERROR: $f missing the exact 'Read for method' line"; exit 1; }
  grep -qE '^[^:]+: \$ARGUMENTS$' "$f" || { echo "ERROR: $f missing a ': \$ARGUMENTS' line"; exit 1; }
done

echo "== Command + agent sync =="
node scripts/sync-commands.mjs
node scripts/sync-agents.mjs
test "$(ls opencode/command/*.md | wc -l)" -eq 7
test "$(ls cursor/commands/*.md | wc -l)" -eq 7
test "$(ls codex/prompts/*.md | wc -l)" -eq 7
test "$(ls cursor/agents/*.md | wc -l)" -eq 3

echo "== Generated files committed and in sync =="
if ! git diff --quiet opencode/command cursor/commands cursor/agents codex/prompts; then
  echo "ERROR: sync generators produced diffs — commit regenerated files or fix the sources"
  git diff --stat opencode/command cursor/commands cursor/agents codex/prompts
  exit 1
fi

echo "== Hook routing =="
out=$(echo '{"prompt":"prototype the settings page"}' | node hooks/inject-design-context.mjs)
echo "$out" | grep -q '/prototype' || { echo "ERROR: hook missed /prototype"; exit 1; }
out=$(echo '{"prompt":"journey map for onboarding"}' | node hooks/inject-design-context.mjs)
echo "$out" | grep -q '/flows' || { echo "ERROR: hook missed /flows (absorbed trigger)"; exit 1; }
out=$(echo '{"prompt":"heuristic evaluation of this form"}' | node hooks/inject-design-context.mjs)
echo "$out" | grep -q '/critique' || { echo "ERROR: hook missed /critique (absorbed trigger)"; exit 1; }
out=$(echo '{"prompt":"what is 2+2"}' | node hooks/inject-design-context.mjs)
test -z "$out" || { echo "ERROR: hook fired on a non-design prompt"; exit 1; }
# Hook must only ever emit v2 command names.
all_hook_cmds=$(grep -oE '→ /[a-z-]+' hooks/inject-design-context.mjs | sort -u | tr -d '→ ')
for c in $all_hook_cmds; do
  test -f "commands/${c#/}.md" || { echo "ERROR: hook routes to $c but commands/${c#/}.md does not exist"; exit 1; }
done

echo "== No references to deleted v1 files =="
if git grep -nE 'quality-gates\.md|workflows\.md|design-validator|designprompts|frameworks-and-artifacts|platform-adaptation\.md|standards-and-anti-patterns|styling-resolution\.md|prototype-variants-guide|brainstorming-playbook|ux-heuristics\.md|ux-flow-patterns|diagram-guide|annotation-guide|research-templates\.md|design-research-sources|mentorship-frameworks|portfolio-frameworks|premium-patterns|ban-list\.md|product-design-process\.md|/interface\b|/ux-audit|/mentor\b|/strategy\b|/annotate\b|/portfolio\b|/design-converter|/ux-flows|/diagram\b' \
    -- '*.md' '*.mjs' '*.sh' '*.mdc' '*.json' ':!CHANGELOG.md' ':!MIGRATION.md' ':!install.sh' ':!uninstall.sh' ':!scripts/test.sh'; then
  echo "ERROR: stale references to deleted v1 files/commands found (above)"
  exit 1
fi

echo "== No references to removed v2.1 features (deck / design-system / figma-export / goal-mode) =="
if git grep -nE '/deck\b|/design-system\b|/figma-export\b|design-systems\.md|presentation\.md|deck-template|goal-mode' \
    -- '*.md' '*.mjs' '*.sh' '*.mdc' '*.json' ':!CHANGELOG.md' ':!MIGRATION.md' ':!install.sh' ':!uninstall.sh' ':!scripts/test.sh'; then
  echo "ERROR: references to removed features found (above) — these were cut in v2.2"
  exit 1
fi

echo "== Install/uninstall roundtrip =="
T=$(mktemp -d)
./install.sh --target custom --path "$T/bundle" --yes > /dev/null
test -f "$T/bundle/agent/product-design-partner.md"
test -f "$T/bundle/agent/modules/prototyping.md"
test -f "$T/bundle/design-data/templates/handoff-template.md"
test -f "$T/bundle/design-data/references/shells.md"
test -f "$T/bundle/design-data/shells/blank/app/tokens.css"
test -f "$T/bundle/design-data/shells/dashboard/package.json"
test ! -d "$T/bundle/design-data/shells/blank/node_modules"
test -f "$T/bundle/scripts/dev-server.mjs"
test ! -d "$T/bundle/plugins"
./uninstall.sh --target custom --path "$T/bundle" --dry-run --yes > /dev/null
test -d "$T/bundle"   # dry-run must not delete
./uninstall.sh --target custom --path "$T/bundle" --purge --yes > /dev/null
test ! -d "$T/bundle"
rm -rf "$T"

echo "== No-target behavior: menu on a TTY, hard failure otherwise (never a silent default) =="
if ./install.sh --yes < /dev/null > /dev/null 2>&1; then
  echo "ERROR: install.sh without --target must not proceed non-interactively"; exit 1
fi
if ./uninstall.sh --yes --dry-run < /dev/null > /dev/null 2>&1; then
  echo "ERROR: uninstall.sh without --target must not proceed non-interactively"; exit 1
fi

echo ""
echo "All tests passed."
