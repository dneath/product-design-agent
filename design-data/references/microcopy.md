# Microcopy — Labels, Errors, Tone

> Load when writing or reviewing any UI text: `/design`, `/critique`, `/handoff`, `/prototype`.

**Vague copy creates support tickets; specific copy gets users through the task.** Good UX
writing is invisible — users notice only when it fails.

---

## 1. Buttons & actions

- **Verb + object, always**: "Save changes", "Create account", "Download PDF". NEVER
  OK / Submit / Yes / No / Click here.
- **Cancel says what it does**: "Keep editing", "Discard draft" — "Cancel" next to a
  destructive action is ambiguous.
- **Delete ≠ Remove**: Delete is permanent; Remove implies recoverable. Pick by the truth.
- **Show counts**: "Delete 5 items", never "Delete selected".
- **An action keeps its name through the flow**: button "Publish" → toast "Published" — never
  "Publish" → "Your post is live!".

## 2. Errors — the formula

Every error answers three questions: **what happened + why + how to fix it**, with an example
where a format is involved.

| Situation | Template |
|---|---|
| Format | "[Field] needs to be [format]. Example: [example]" |
| Missing required | "[Field] is required to [what it enables]" |
| Permission | "You don't have access to [thing]. [How to get it]" |
| Network | "Couldn't reach the server. Check your connection and try again." |
| Server | "Something went wrong on our end. [Alternative action or retry]" |

- NEVER blame the user ("This field is required", not "You entered it wrong").
- **NEVER humor in errors** — users are already frustrated; be helpful, not cute.
- NEVER bare codes ("Error 403") without the plain-language sentence.

## 3. Tone by moment — voice constant, tone shifts

| Moment | Tone |
|---|---|
| Success | Celebratory, brief ("Settings saved. Changes take effect immediately.") |
| Error | Empathetic, helpful — formula above |
| Loading | Reassuring + expectation-setting ("Analyzing… usually takes 30–60 seconds") |
| Destructive confirm | Serious, specific — name the object and the consequence |

## 4. One term per concept

Pick one word per action and enforce it everywhere — record the glossary in the project's
`system.md`:

| Use | Never alongside |
|---|---|
| Delete | Remove, Trash, Erase |
| Settings | Preferences, Options |
| Sign in | Log in, Login, Enter |
| Create | Add, New (as verbs for the same act) |

## 5. Structure rules

- **Placeholder ≠ label.** Placeholders disappear on input; the label persists. Placeholder =
  format example, ending with `…`.
- Numerals, not words: "8 deployments", never "eight deployments".
- Real typographic characters: `…` never `...`; curly quotes; non-breaking space between value
  and unit ("10 MB"). No decorative em-dashes in UI copy — ranges use a hyphen.
- Links carry standalone meaning — never "click here".
- Alt text describes the information, not the artifact: "Revenue up 40% in Q4", not "Chart".
  Decorative images get `alt=""`.
- Active voice; sentence case for labels; no filler ("Please note that…", "Simply…").

## 6. Confirmation philosophy

**Most confirmation dialogs are design failures — prefer undo.** When a confirmation is truly
needed (irreversible + high-stakes): name the object ("Delete 'Project Alpha'?"), state the
consequence ("This can't be undone."), and label the buttons with the actions ("Delete project" /
"Keep project").

---

## Copy checklist

- [ ] Every button is verb+object; Cancel renamed to its actual effect; counts shown
- [ ] Every error: what + why + how-to-fix (+ example); no blame, no humor, no bare codes
- [ ] Loading copy sets expectations; destructive confirms name object + consequence
- [ ] One term per concept — glossary recorded in `system.md`
- [ ] Placeholders are format examples, labels persist; numerals; real `…` and quotes
- [ ] Undo considered before every confirmation dialog
