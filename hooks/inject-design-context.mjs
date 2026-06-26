#!/usr/bin/env node
/**
 * Product Design Partner — Claude Code UserPromptSubmit hook.
 *
 * Mirrors the OpenCode `tui.prompt.append` nudge: when a design intent is
 * detected in the user's prompt, inject a short reminder of the matching
 * workflow/command and the 5 quality gates. Stays silent (no output) when no
 * design intent is detected, so it never adds noise to non-design prompts.
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

  // Order matters: more specific intents first.
  const ROUTES = [
    { rx: /(mentor|idea to concept|product concept|what should i build|riskiest assumption|concept brief)/, msg: 'AI Mentor → /mentor (workflows.md §9 + mentorship-frameworks.md)' },
    { rx: /(user flow|user journey|journey map|task flow|sitemap|information architecture|product structure)/, msg: 'UX Flows → /ux-flows (workflows.md §10 + ux-flow-patterns.md)' },
    { rx: /(ux audit|usability review|usability audit|heuristic|nielsen)/, msg: 'UX Audit → /ux-audit (workflows.md §11 + ux-heuristics.md)' },
    { rx: /(convert this|sketch to ui|screenshot to ui|wireframe to ui|image to ui|design converter)/, msg: 'Design Converter → /design-converter (workflows.md §12 — all 5 gates)' },
    { rx: /((export|push|send|sync|build|create)[^.]{0,40}(to|in|into) figma|figma export)/, msg: 'Figma Export → /figma-export or subagent figma-export (workflows.md §13 — load figma-generate-design skill first)' },
    { rx: /(case study|portfolio|project writeup)/, msg: 'Portfolio → /portfolio (workflows.md §14 + portfolio-frameworks.md)' },
    { rx: /(annotat|redline|red-line|ux rationale|design rationale|design decision record|callout)/, msg: 'UX Annotations & Write-ups → /annotate (workflows.md §17 + annotation-guide.md)' },
    { rx: /(diagram|flowchart|flow chart|sequence diagram|state machine|state diagram|erd\b|entity relationship|mermaid|figjam)/, msg: 'Diagrams → /diagram (workflows.md §16 + diagram-guide.md)' },
    { rx: /(prototype|proof of concept|show me (some )?options|2-3 (versions|variants|options)|couple of (versions|directions)|variants)/, msg: 'Prototype Variants → /prototype or subagent prototype-variants (workflows.md §15 — 2-3 distinct variants, user picks)' },
    { rx: /(accessibility|wcag|a11y|contrast ratio|screen reader)/, msg: 'Accessibility / UX Audit → /ux-audit (workflows.md §7 & §11 + ux-heuristics.md)' },
    { rx: /(dashboard|admin panel|interface|mockup|wireframe|ui design)/, msg: 'Interface Design → /interface or subagent interface-design (workflows.md §3 — all 5 gates + Variant Protocol)' },
    { rx: /(design system|design token|component library|style guide)/, msg: 'Design System → /design-system (workflows.md §2)' },
    { rx: /(user research|interview guide|usability test|survey|synthesize research|screener|discussion guide)/, msg: 'User Research → /research (workflows.md §1 + research-templates.md)' },
    { rx: /(critique|design review|feedback on this design|review this design)/, msg: 'Design Critique → /critique (workflows.md §5)' },
    { rx: /(handoff|developer spec|implementation spec)/, msg: 'Design Handoff → /handoff (workflows.md §6)' },
    { rx: /(brainstorm|ideation|ideate|divergent thinking)/, msg: 'Brainstorm → /brainstorm (workflows.md §4 + brainstorming-playbook.md — ≥15 ideas, ≥3 techniques)' },
    { rx: /(how might we|product strategy|opportunity)/, msg: 'Product Strategy → /strategy (workflows.md §4)' }
  ];

  const hit = ROUTES.find((r) => r.rx.test(prompt));
  if (!hit) process.exit(0);

  process.stdout.write(
    `Product Design Partner: ${hit.msg}\n` +
    'Before any UI output, pass all 5 gates — Intent (Who/What/Feel, no generic words), ' +
    'Domain (5+ concepts/colors + 1 signature ×5), Validation tests (swap/squint/signature/token), ' +
    'Variance (new Vibe+Layout), Ban list. New UI = Variant Protocol: 2-3 distinct directions, ' +
    'user picks. Styling is context-driven (no fixed brand): adopt repo/Figma/user tokens, ' +
    'else fall back to monochrome OKLCH + 4px spacing + Inter & Fragment Mono. WCAG 2.1 AA; document decisions.\n'
  );
  process.exit(0);
});
