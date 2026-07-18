#!/usr/bin/env node
/**
 * Product Design Partner — Claude Code UserPromptSubmit hook.
 *
 * When a design intent is detected in the user's prompt, inject a short pointer
 * to the matching command/module plus the Thinking Protocol reminder. Stays
 * silent (no output) on non-design prompts, so it never adds noise.
 *
 * Self-contained: Node built-ins only. Output on stdout is added to context.
 */

let raw = '';
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let prompt = '';
  try {
    prompt = (JSON.parse(raw || '{}').prompt || '').toLowerCase();
  } catch {
    prompt = (raw || '').toLowerCase();
  }
  if (!prompt) process.exit(0);

  // Order matters: more specific intents first. Emit ONLY v2 command names.
  const ROUTES = [
    { rx: /(user flow|user journey|journey map|task flow|sitemap|information architecture|product structure|diagram|flowchart|flow chart|sequence diagram|state machine|state diagram|erd\b|entity relationship|mermaid|figjam|annotat|redline|red-line|callout)/, msg: 'Flows / IA / diagrams / annotations → /flows (design-process.md + flow-patterns.md)' },
    { rx: /(ux audit|usability review|usability audit|heuristic|nielsen|critique|design review|feedback on this design|review this design|accessibility|wcag|a11y|contrast ratio|screen reader)/, msg: 'Critique / audit → /critique (design-process.md §4–5 + heuristics.md, severity-rated findings with evidence)' },
    { rx: /(prototype|proof of concept|make it real|show me (some )?options|2-3 (versions|variants|options)|couple of (versions|directions)|variants)/, msg: 'Prototype variants → /prototype (prototyping.md — 2–4 structurally distinct variants in one tab-switchable React app; no codebase ⇒ start from a design-data/shells/ template, never scaffold from scratch; browser-verified, user picks)' },
    { rx: /(user research|interview guide|usability test|survey|synthesize research|screener|discussion guide|idea to concept|what should i build|riskiest assumption|concept brief|is this a good idea)/, msg: 'Research / concept → /research (product-thinking.md + research-methods.md)' },
    { rx: /(handoff|developer spec|implementation spec|ready for engineering)/, msg: 'Handoff → /handoff (handoff.md + handoff-template.md — states, interactions, data contract, rationale)' },
    { rx: /(brainstorm|ideation|ideate|divergent thinking|how might we|product strategy|opportunity)/, msg: 'Brainstorm → /brainstorm (product-thinking.md — diverge ≥10 ideas before converging)' },
    { rx: /(convert this|sketch to ui|screenshot to ui|wireframe to ui|image to ui|dashboard|admin panel|interface|mockup|wireframe|ui design|design (a|the|this) (screen|page|flow|settings|form))/, msg: 'Screen/flow design → /design (design-process.md — context → flows → IA → wireframe → visual; 2–3 directions, user picks)' }
  ];

  const hit = ROUTES.find((r) => r.rx.test(prompt));
  if (!hit) process.exit(0);

  process.stdout.write(
    `Product Design Partner: ${hit.msg}\n` +
    'Run the Thinking Protocol FIRST (agent/product-design-partner.md): restate the problem ' +
    '(user, job, success, constraints); state what is NOT asked; list 2-3 riskiest assumptions; ' +
    'propose 2-3 approaches with tradeoffs for non-trivial work; rationale on every decision. ' +
    'Styling is context-driven (no fixed brand): repo tokens -> Figma -> user-specified, else ' +
    'monochrome OKLCH + 4px spacing + Inter & Fragment Mono. WCAG 2.1 AA. Evidence before ' +
    'assertions: verification claims need artifacts on disk, else label UNVERIFIED.\n'
  );
  process.exit(0);
});
