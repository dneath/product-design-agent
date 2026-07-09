# Hardening — Extreme Inputs, Errors, i18n, Interruption

> Load for state-matrix depth (`/design`), edge-case fixtures (`/prototype`),
> production-readiness spec (`/handoff`), and the stress-test lens (`/critique`).

**A design that only works with perfect data is not done.** Real users bring empty accounts,
thousand-row lists, 100-character names, flaky networks, and mid-task refreshes.

---

## 1. Extreme-input matrix

Design and test every data view against ALL of these — not just the typical row:

| Dimension | Test values |
|---|---|
| Collection size | 0 · 1 · typical · 1,000+ |
| String length | empty · 1 char · typical · 100+ chars with no spaces |
| Characters | emoji · RTL scripts · CJK · accents · paste-from-spreadsheet |
| Numbers | 0 · negative · millions/billions · high-precision decimals |

CSS survival kit — every text container gets one of these deliberately:
- Single line: `text-overflow: ellipsis` — plus `min-width: 0` on flex children (flex refuses
  to shrink below content size without it).
- Multi-line: `-webkit-line-clamp`.
- Long unbroken strings: `overflow-wrap: break-word` + `hyphens: auto`.
- Media: explicit `width`/`height` so nothing shifts when it loads.

## 2. Error UX by failure type

| Failure | Required UI response |
|---|---|
| 400 / validation | Field-level errors inline next to the field; focus the first error |
| 401 | Re-authenticate WITHOUT losing the user's work |
| 403 | Explain why + how to get access — never a dead end |
| 404 | Designed not-found state with a way back |
| 429 | Rate-limit message with wait guidance |
| 500 | Plain-language error + retry + support path |
| Offline / timeout | Detect it, say so, queue or offer retry |

- **NEVER wipe user input on error.** Preserving the form is the floor, not a feature.
- One component failing NEVER blanks the whole interface — contain the error.
- Error copy follows the formula in `microcopy.md` §2.

## 3. i18n budgets

- Text expands ~+30% in longer languages — **no fixed text widths**; containers grow, or
  truncate deliberately (§1).
- RTL: CSS logical properties (`margin-inline-start`, `padding-inline`, `inset-inline-end`),
  never hardcoded left/right.
- Dates, numbers, currency via `Intl.DateTimeFormat` / `Intl.NumberFormat` — never hand-formatted.
- Plurals via an i18n library — NEVER `count !== 1 ? "s" : ""`.
- Keep numbers separate from sentence strings ("New messages: 3" translates; "You have 3 new
  messages" breaks).

## 4. Empty states — anatomy and taxonomy

Every empty state has all three parts: **what will be here** · **why it matters** · **a CTA
that fills it**. "No items" is a bug, not a state.

| Empty type | Treatment |
|---|---|
| First use | Teach: what goes here, why, one-click starter or template |
| User cleared it | Light touch — confirm done-ness, easy way to add more |
| No search/filter results | Suggest a query change; one-click clear filters |
| No permission | Why it's hidden + how to request access |
| Load error | What failed + retry |

## 5. Interruption & concurrency

Design the response to each of these, then test them:
- **Refresh mid-flow** → state survives or restores.
- **Spam-click submit** → disabled while pending; exactly one request fires.
- **Close a panel while it's opening** → motion retargets (motion.md §6); no stuck states.
- **Tab away and back** → nothing lost.
- **Optimistic updates** roll back visibly on failure — never optimistic for destructive or
  payment actions.
- **Unmount cleans up**: listeners, timers, subscriptions, pending requests.

## 6. Loading ladder

| Wait | Show |
|---|---|
| 0–100ms | Nothing — an indicator here adds flicker |
| 100ms–1s | Subtle inline indicator |
| 1s+ | Skeleton matching the final layout + expectation copy ("usually takes 30–60 seconds") |
| 10s+ | Move to background; notify on completion |

Skeletons mirror the real layout. A generic centered spinner is a last resort, not a default.

## 7. Verify — test actions, not properties

- [ ] Paste 100+ characters (no spaces) into every text field and title
- [ ] Switch a text sample to an RTL script; check layout and truncation
- [ ] Load the view with 0 items and with 1,000+ items
- [ ] Kill the network mid-task; watch what the UI says
- [ ] Click submit 10× rapidly — count the requests
- [ ] Refresh mid-save; confirm state recovery
- [ ] Remove all data — every empty state shows its anatomy (§4)
