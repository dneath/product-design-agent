# Motion — When, How Fast, and How to Review It

> Load whenever UI moves: `/design`, `/prototype`, `/design-system` (motion primitives),
> `/critique` when the target animates.
> Floor rules live in styling.md Part B; this file is the full doctrine.

**Motion is a budget, not a garnish.** Every animation spends user attention — spend it only
where it pays, and spend less the more often the moment repeats.

---

## 1. Should it move at all? — the frequency gate

Frequency decides the budget before any craft question:

| How often the user triggers it | Motion budget |
|---|---|
| 100+×/day, or keyboard-initiated (shortcuts, command palettes, typing) | **NEVER animate** |
| Tens/day (hover, list navigation, tab switches) | Minimal or none |
| Occasional (modals, drawers, toasts) | Standard doctrine below |
| Rare / first-run (onboarding, success moments) | Delight allowed |

- Every animation MUST serve one purpose: **indicate state**, **preserve spatial continuity**,
  **give feedback**, or **prevent a jarring change**. "Looks cool" on a frequently seen element = cut it.
- **No page-load choreography in product UI** — a tool loads into a task, not a performance.
- Context menus animate **exit only, never entrance** — the user asked for it; show it instantly.

## 2. The one-question router

**"Is this motion reacting to the user, or is the system speaking?"**

| Origin | Mechanism | Why |
|---|---|---|
| User-driven (drag, flick, gesture, press-and-hold) | **Spring** — stiffness 500, damping 30, bounce 0 | Preserves velocity; survives interruption |
| System-driven (state change, open/close, feedback) | **Easing** (curves in §4) | Clear start and end; predictable |
| Time representation (progress, spinner, marquee) | **Linear** | 1:1 time↔progress — the only linear use |
| High-frequency (typing, keyboard nav, rapid toggles) | **None** | Animation adds noise and feels slower |

## 3. Durations

| Element | Duration |
|---|---|
| Button press / toggle feedback | 100–160ms |
| Tooltip, small popover | 125–200ms |
| Dropdown, select, popover | 150–250ms |
| Modal, drawer, accordion | 200–300ms |

- **Hard cap: 300ms for UI.** Escape hatch: page-level transitions and rare first-run moments
  may reach ~400ms — nothing else.
- **Exits ≈ 75% of enter duration** — leaving is faster than arriving.
- If a motion feels slow, **shorten the duration before touching the curve**.

## 4. Easing

- **Ease-out for enters AND exits. NEVER ease-in on UI** — it delays movement at the exact
  moment the user is watching closest.
- Built-in CSS keywords are too weak. Define custom curves as tokens:

```css
:root {
  --ease-enter:  cubic-bezier(0.23, 1, 0.32, 1);   /* enters and exits */
  --ease-move:   cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement, morphs */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* drawers, sheets */
}
```

- Linear ONLY for time representation (§2). Decorative bounce/elastic is banned; overshoot
  happens only via springs on gesture-driven motion.

## 5. Physicality

- **Nothing appears from nothing**: enter at `scale(0.95–0.97)` + `opacity: 0` — NEVER `scale(0)`.
- Press = `scale(0.97)` on `:active` (range 0.95–0.98), 100–160ms ease-out, on every pressable element.
- **Origin-aware**: popovers, dropdowns, and tooltips scale from the trigger — set
  `transform-origin` to the trigger side. **Modals are exempt: centered, center origin.**
- Deformation stays within 0.95–1.05 — beyond that reads as cartoon.
- Stagger list/section enters **30–80ms per item**. Stagger is decorative: NEVER block
  interaction while it plays; cap the staggered count on long lists.

## 6. Interruptibility

- Rapid-trigger UI (toasts, toggles, hovers, dropdowns) uses **CSS transitions** — they retarget
  from the current state. Keyframes restart from zero; reserve them for one-shot sequences.
- Springs for gestures — an interrupted spring keeps its velocity.
- **Interrupted motion continues from where it is. It never restarts.**

## 7. Performance

- Animate **transform and opacity only** — width/height/top/left/margin/padding trigger layout.
- **`transition: all` is banned** — enumerate exact properties.
- NEVER drive animation from scroll events — use IntersectionObserver (unobserve after it fires)
  or CSS scroll timelines.
- Blur: ≤2px in transit as a crossfade mask; blur animation ≤8px, one-shot only, never on
  large surfaces.
- NEVER animate a parent CSS variable to move children — it recalculates every child each frame.
  Set the transform on the element directly.
- `will-change` only while animating, only `transform`/`opacity`/`filter`; remove it after.
- Looping animations pause when off-screen.

## 8. Perception

- **~80ms reads as instant.** Below it, show the result and skip the transition — this is the
  basis for optimistic UI (never optimistic for destructive or payment actions).
- Waits longer than that follow the loading ladder in `hardening.md` §6.

## 9. Reduced motion + input gates — mandatory

- `prefers-reduced-motion: reduce` = **gentler, not zero**: keep opacity/color changes, drop
  movement (translate/scale). A blank cut is not an accessibility win.
- Hover effects only behind `@media (hover: hover) and (pointer: fine)` — otherwise touch
  screens get stuck hover states.

## 10. Motion review (critique path)

Bias: **default to flagging — approval is earned.** A transition that "works" but is sluggish,
launches from the wrong origin, or fires too often is a regression, not a pass.

Fix in this order — stop at the first step that resolves the finding:
1. **Delete** (frequency gate says no) → 2. **Reduce** (shorter, smaller) → 3. Fix easing →
4. Fix origin/physicality → 5. Make interruptible → 6. Move to transform/opacity →
7. Asymmetric enter/exit timing → 8. Polish (stagger, crossfade mask) → 9. Reduced-motion + gates.

Flag on sight: `transition: all` · `scale(0)` entry · ease-in anywhere · animation on a
keyboard-initiated action · UI duration >300ms · center origin on a trigger-anchored popover ·
keyframes on rapid-trigger UI · layout-property animation · missing reduced-motion ·
ungated hover · all-at-once entrance that needed a stagger.

**Review output: a Before/After/Why table, one row per proposed change.**

---

## Motion checklist

- [ ] Frequency gate applied — nothing high-frequency or keyboard-initiated animates
- [ ] Every animation has a stated purpose (state / continuity / feedback / anti-jarring)
- [ ] Mechanism matches origin: spring=user · easing=system · linear=time · none=high-frequency
- [ ] Durations within §3 tables, ≤300ms; exits ≈75% of enters; ease-out both directions
- [ ] Enters ≥`scale(0.95)`; popovers origin-aware; press `scale(0.97)`; stagger 30–80ms
- [ ] transform/opacity only; properties enumerated; no scroll-event-driven animation
- [ ] Reduced-motion gentler-not-zero; hover gated behind hover/pointer media query
