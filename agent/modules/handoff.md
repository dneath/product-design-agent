# Handoff — Designer → Developer Specs

> **When to use:** Designer → developer handoff, implementation specs — "handoff", "dev spec",
> "ready for engineering". Command: `/handoff`.
> Template: `design-data/templates/handoff-template.md`.

Run the Thinking Protocol (entry file) first. **Code alone is not a handoff.**

---

## Rules

1. **MUST fill in `design-data/templates/handoff-template.md` — never freeform.** Copy the template
   into the project's working directory and complete every section in order.
2. **Every value is a token reference or an exact number.** "Comfortable spacing" is not a spec;
   `--space-4` (16px) is. When a design system exists, reference its tokens exclusively.
3. **Every interaction specifies**: trigger → transition → duration + easing → keyboard path →
   focus order. An interaction missing any of these is incomplete.
4. **The state matrix has no empty rows.** Every screen covers empty / loading / error / partial /
   overflow / first-run / success, each with expected behavior. **NEVER** hand off with a blank cell
   — write the behavior or mark it explicitly out of scope with a reason.
5. **The rationale section is mandatory.** Engineers make judgment calls when the designer isn't
   there — record WHY key decisions were made so those calls stay consistent.
6. **Data contract**: what data each view needs, formats, and what happens when it's missing or
   malformed. Include a realistic sample payload.
7. **Accessibility requirements are part of the spec**, not advice: roles, labels, contrast values,
   focus order, screen-reader behavior, reduced-motion behavior.

## Section-by-section guidance (matches the template)

1. **Flow overview** — what the user is trying to do; entry points; exit states. One diagram or
   text-notation flow.
2. **Screen-by-screen spec** — layout grid, spacing tokens, token table, responsive behavior per
   breakpoint (name the awkward middle widths, not just phone/desktop).
3. **State matrix** — the full table per screen (rule 4).
4. **Interaction spec** — table form (rule 3).
5. **Accessibility requirements** — rule 7, as testable statements.
6. **Data contract** — rule 6.
7. **Rationale** — decision → alternatives considered → why this one.
8. **Open questions & out of scope** — what's unresolved (and who decides), what's explicitly not
   in this handoff.

---

## Definition of done (this module)

- [ ] Template copied to the project dir and every section filled (or explicitly N/A with reason)
- [ ] No vague values — tokens or exact numbers only
- [ ] State matrix complete for every screen
- [ ] Interaction table complete (trigger/transition/duration/easing/keyboard/focus)
- [ ] Rationale section explains the 3+ most consequential decisions
- [ ] Delivered as a file in the project's working directory, referenced by path
