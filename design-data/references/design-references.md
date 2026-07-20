# Design References — real screens & flows via the Mobbin MCP

Load when brainstorming, researching, designing, prototyping, or critiquing and you need **real,
shipping-product references** — how good products actually solve a problem, not how you remember
them solving it. Primary source: the **Mobbin MCP**. Used by all commands and by
`agent/modules/product-thinking.md`, `design-process.md`, `prototyping.md`. Pairs with
`research-methods.md` (§1 Research-First Rule, §2 Where to Research).

---

## 1. What the Mobbin MCP gives you

Real screens and recorded flows from shipping apps — the "how products actually solve it" column of
`research-methods.md` §2, queried directly instead of browsed by hand. Three tools:

| Tool | Returns | Reach for it when |
|---|---|---|
| `mcp__mobbin__search_flows` | End-to-end recorded flows (onboarding, checkout, invite…) | Mapping a journey or task flow; comparing how products sequence a multi-step job |
| `mcp__mobbin__search_screens` | Individual screens matching a pattern | "How do shipping products lay out a settings / empty / pricing screen?" |
| `mcp__mobbin__search_sections` | Section/component patterns within screens | A specific component or section (filters, nav, upload, comparison table…) |

Query by the **job or pattern** ("expense approval queue", "passwordless sign-in"), not by brand.

## 2. When to pull references

Pull references whenever the Research-First Rule applies — before designing anything unfamiliar
(`research-methods.md` §1). Go light only when iterating on an already-grounded direction, or when
the user supplied the references themselves.

- **Brainstorm** — precedent (`product-thinking.md` §2 step 3): how 2–3 shipping products structure this.
- **Research** — desk research (`/research` step 2): populate the "shipping UI patterns" row with real screens.
- **Design** — the pre-step-1 pattern audit (`design-process.md` §1): how products solve it before you diverge.
- **Prototype** — before defining variants (`prototyping.md`): ground each variant's interaction model in real flows.
- **Flows** — `search_flows` for real end-to-end journeys. **Critique** — check a finding against shipping-product convention.

## 3. If the Mobbin MCP isn't connected — ask first

If the `mcp__mobbin__*` tools aren't available and references would materially sharpen the work:

1. **Ask the user first** — one sharp question: "Real references from Mobbin would ground this — it
   isn't connected. Want me to set it up?" **NEVER** install anything unasked.
2. **On yes — set it up:**
   - If you have a shell (e.g. under `/design`, `/prototype`): offer to run
     `claude mcp add --transport http mobbin https://api.mobbin.com/mcp`, then tell the user to
     **restart the session** so the server connects — it is not callable mid-session.
   - No shell available: print that one-liner for them to run. Other harnesses → point at
     `docs/install.md` (Cursor: Settings → MCP; Codex: `~/.codex/config.toml`).
3. **On no, or still unavailable — degrade honestly** (entry cross-model rule 9): fall back to
   `WebSearch` / `WebFetch` for shipping-product references plus published UX evidence, and **label
   the source** ("via web search", not "via Mobbin"). Announce the skip in one line. **NEVER**
   fabricate references or claim a Mobbin lookup you didn't run.

## 4. Using what you find

- **Cite** the product + screen/flow for every reference you lean on — link its `mobbin_url` so the
  user can open it.
- **Synthesize the pattern — never wholesale-copy.** References inform the decision; they don't make it.
- **Evidence outranks inspiration:** when published UX evidence conflicts with a nice-looking shot,
  the evidence wins (`research-methods.md` §2).
- 3–5 references across different products beat one — a single screen is an anecdote, not a pattern.
