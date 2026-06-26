# Design Research Sources & Method

**Research before designing.** When tackling a design or UX task, pull real-world references and evidence first, then synthesize them into clear recommendations. Do not rely on memory or generic patterns — that is exactly how generic output happens. This reference lists *where* to look, *how* to look well, and the *output* shape. It runs **before** Gate 2 (domain) and the Variant Protocol so designs are grounded in how real products and real evidence solve the problem.

---

## When to Research

- Starting a new screen, flow, component, or feature.
- Solving a specific UX problem (onboarding drop-off, complex forms, empty states, dense tables).
- Validating a pattern or interaction before committing to it.
- Resolving a technical / implementation question.

Skip or go light only when iterating on an already-grounded direction, or when the user has supplied the references themselves.

---

## Where to Research (use the right source for the job)

### Real product UI & flows — *how shipping products actually solve it*
- **Mobbin** — searchable real mobile/web app screens and full flows
- **UILand** — categorized UI screenshots and patterns
- **Page Flows** — recorded real user flows (onboarding, checkout, etc.)
- **Screenlane / Pttrns** — pattern libraries by use case

### Visual & motion inspiration — *raise the craft bar*
- **Behance** — portfolio-grade visual and brand design
- **Call to Inspiration** — curated UI inspiration gallery
- **60fps** — interaction and motion design references
- **Dribbble** — UI concept shots (treat as inspiration, not gospel)
- **Awwwards / Godly** — high-craft web design and landing pages

### Code, components & interactions — *how to actually build it*
- **GitHub** — open-source components, libraries, real implementations
- **CodePen** — front-end snippets, CSS/JS interactions, live demos
- **Stack Overflow** — technical Q&A and implementation problems
- **MDN Web Docs** — authoritative web platform / API reference
- **Can I Use** — browser / feature support before relying on something

### Evidence-based UX research — *the "why"*
- **Nielsen Norman Group (NN/g)** — usability research and heuristics
- **Baymard Institute** — e-commerce / checkout / form UX benchmarks
- **Laws of UX** — core UX principles and mental models
- **WCAG / W3C** — accessibility requirements and guidance

### Real user pain points & discussion — *what actually frustrates people*
- **Reddit** — r/userexperience, r/web_design, r/UI_Design for real complaints and debate
- **Hacker News** — technical / product discussion and critique

### Platform & system guidelines — *when targeting a platform*
- **Apple Human Interface Guidelines** & **Material Design**
- **Figma Community** — components, kits, and references

---

## How to Research Well

- **Start from the problem, not a solution** — define the user, the task, and the failure mode first.
- **Use 3–5 sources across categories** (pattern + evidence + implementation), not one. One source is an anecdote.
- **Prefer evidence over opinion** — when NN/g or Baymard conflicts with a Dribbble shot, the evidence wins.
- **Capture concrete references** — link, screenshot, and a one-line note on *why it's relevant* to this problem.
- **Note tradeoffs** — record at least one counter-example or alternative pattern, not just the favorite.
- **Verify, don't guess** — use the agent browser (or the Playwright skill) to open and read sources rather than assuming their contents. Delegate heavy browsing to a sub-agent that returns only the findings (links + notes + screenshot paths), keeping the main thread clean.

---

## Output

Summarize findings as:

1. **The problem** — user, task, failure mode (one or two lines).
2. **2–3 patterns observed** — each with its source/link and a one-line note on relevance.
3. **Supporting evidence** — the "why" from NN/g, Baymard, Laws of UX, WCAG, etc., with confidence (High/Med/Low).
4. **Recommended direction** — with rationale, plus the tradeoff or counter-example you noted.

**Save the research artifact to the working directory** — `design-data/projects/<project>/research/<topic>.md` (or the host repo's docs) — and **reference it by path** in the conversation rather than pasting it. Screenshots go alongside it. The downstream workflow (domain exploration, variants, build) then cites this artifact.

---

## Referenced By

- **Interface Design** (§3), **Prototype Variants** (§15), **Design Converter** (§12), **UX Flows** (§10) — research feeds Gate 2 and variant direction.
- **User Research** (§1) covers *primary* research (your own users); this reference covers *secondary* research (how the world solves it + published evidence). Use both.
