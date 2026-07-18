# Getting started — one prompt per command

Paste these as-is (adjust the product to yours). Each shows the shape of a good brief: a specific
human, a job-to-be-done, and a constraint. Vague briefs get you one sharp clarifying question
before any work starts — that's by design.

## /brainstorm

```
/brainstorm Our onboarding email course has a 12% completion rate. How might we get new users to their first "aha" without email?
```

Expect: ≥10 ideas from ≥2 techniques, ≥3 clusters, a scored options table (user value /
feasibility / effort), one recommendation with a reason, open questions.

## /research

```
/research Founders say they want usage-based billing, but nobody switches when we offer it. Plan the cheapest research to find out why.
```

Expect: an assumption map, the riskiest assumption, a method matched to it, a behavior-based
screener and a discussion guide anchored to "the last time…", not hypotheticals.

## /design

```
/design A settings page where finance admins reconcile payouts before month-end. They need confidence nothing was missed.
```

Expect: Thinking Protocol first, then context → flows → IA → wireframe → visual in that order,
2–3 direction options (you pick), a full state matrix (empty/loading/error/partial/overflow/
first-run/success), and a completed accessibility checklist.

## /prototype

```
/prototype The payout-reconciliation table from the settings design — one variant for scanning, one for line-by-line audit, one search-first.
```

Expect: one runnable Next.js + Tailwind app started from the matching shell in
`design-data/shells/` (your own repo's stack if you're in one), tabs A/B/C each labeled with its
bet, realistic data (including the awkwardly long vendor names), every state reachable via in-app
toggles, browser verification with screenshots on disk plus axe and react-doctor checks — or an
honest UNVERIFIED label with run commands. Then it stops and you choose.

## /critique

```
/critique ./src/pages/Billing.tsx — pre-launch review; we ship Friday.
```

Expect: severity-rated findings (0–4), each with evidence, mapped to named heuristics; the top
3–5 fixes ranked by severity × frequency; what already works.

## /handoff

```
/handoff The chosen payout-reconciliation variant (B) — spec it for the platform team.
```

Expect: the full handoff template filled in — flow overview, per-screen spec in tokens and exact
numbers, complete state matrix, interaction table (trigger/duration/easing/keyboard/focus), data
contract with a realistic payload, and the rationale behind key decisions.

## /flows

```
/flows Map the first-run journey from signup to first successful payout, including the failure paths.
```

Expect: the right artifact for the question (task flow vs journey map), happy AND failure paths,
IA no deeper than 3 levels in user vocabulary, Mermaid source (FigJam export if the Figma MCP is
connected).

---

## What you'll always see

1. **The Thinking Protocol answers, recorded in the design doc** — problem restated, non-goals,
   risky assumptions, approach options — before any output; the chat gets a short summary.
2. **Styling resolved from context** — your repo's tokens or Figma variables when they exist; the
   neutral fallback only when nothing else applies.
3. **Evidence** — verification screenshots on disk, or an UNVERIFIED label with exact run commands.
4. Output written to `design-data/projects/<project>/` (or your repo), referenced by path.
