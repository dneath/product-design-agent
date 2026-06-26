# Ban List

These patterns are FORBIDDEN in design output. They signal AI-generated work and reduce craft quality.

## 1. Side-Stripe Borders on Cards

**Pattern**: `border-left: 4px solid #primary` or `border-right: 4px solid #primary`

**Why it's banned**: Overused AI pattern. Looks like a template, not thoughtful design.

**Alternative**: Full border with subtle color, or no border with shadow.

```css
/* ❌ BANNED */
.card {
  border-left: 4px solid #7C3AED;
}

/* ✅ ALTERNATIVE 1: Full border */
.card {
  border: 1px solid rgba(124, 62, 237, 0.3);
}

/* ✅ ALTERNATIVE 2: Shadow instead */
.card {
  box-shadow: 0 2px 8px rgba(124, 62, 237, 0.1);
}
```

---

## 2. Gradient Text as Default Style

**Pattern**: `background: linear-gradient(...); -webkit-background-clip: text;`

**Why it's banned**: Reduces readability, signals "trying too hard" aesthetic.

**Alternative**: Solid color with opacity variation for hierarchy.

```css
/* ❌ BANNED */
.heading {
  background: linear-gradient(90deg, #7C3AED, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ✅ ALTERNATIVE: Solid with hierarchy */
.heading {
  color: oklch(54.1% 0.247 293); /* Purple */
}

.subheading {
  color: oklch(54.1% 0.247 293 / 0.7); /* 70% opacity */
}
```

---

## 3. Glassmorphism as Default Aesthetic

**Pattern**: `backdrop-filter: blur(10px); background: rgba(...)`

**Why it's banned**: Performance cost, overused trend, reduces clarity.

**Alternative**: Reserve for specific moments (modals, overlays), not entire UI.

```css
/* ❌ BANNED (everywhere) */
.card, .sidebar, .header {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}

/* ✅ ALTERNATIVE: Specific moments only */
.modal-overlay {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);
}

.card {
  background: oklch(23% 0.01 240); /* Solid surface */
}
```

---

## 4. Hero-Metric Template

**Pattern**: Three cards with big number + label + icon

**Why it's banned**: Generic dashboard pattern. Every AI generates this.

**Alternative**: Design unique layout from domain exploration.

```html
<!-- ❌ BANNED -->
<div class="metrics-grid">
  <div class="metric-card">
    <div class="big-number">1,234</div>
    <div class="label">Users</div>
    <Icon name="users" />
  </div>
  <div class="metric-card">
    <div class="big-number">5,678</div>
    <div class="label">Revenue</div>
    <Icon name="dollar" />
  </div>
</div>

<!-- ✅ ALTERNATIVE: Domain-driven design -->
<!-- Example for support desk: SLA countdown rings, ticket flow diagram -->
```

---

## 5. Identical Card Grids

**Pattern**: `.grid-cols-3` with same height/spacing/content structure

**Why it's banned**: Monotonous, signals template thinking, no hierarchy.

**Alternative**: Asymmetrical bento, varied heights, or magazine flow.

```css
/* ❌ BANNED */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.card {
  height: 200px; /* All same height */
}

/* ✅ ALTERNATIVE 1: Asymmetrical bento */
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
}

.card-large {
  grid-column: span 2;
}

/* ✅ ALTERNATIVE 2: Varied heights */
.card {
  height: auto; /* Content-driven */
}
```

---

## 6. Modal-First Thinking

**Pattern**: Every action opens a modal dialog

**Why it's banned**: Disruptive, blocks content, mobile-unfriendly.

**Alternative**: Inline editing, slide-out drawers, expand-in-place.

```jsx
{/* ❌ BANNED */}
<Button onClick={() => setModalOpen(true)}>Edit</Button>
<Modal open={modalOpen}>...</Modal>

{/* ✅ ALTERNATIVE 1: Inline editing */}
<EditableField onSave={handleSave} />

{/* ✅ ALTERNATIVE 2: Slide-out drawer */}
<Button onClick={() => setDrawerOpen(true)}>Edit</Button>
<Drawer open={drawerOpen}>...</Drawer>
```

---

## 7. Defaulting Type Without Thought

**Pattern**: `font-family: 'Roboto', 'Arial', 'Helvetica', sans-serif` — reaching for the same system sans every time because it's there.

**Why it's banned**: Typography is not a container, it IS the design — type chosen by reflex is the loudest tell of generic output. There is **no fixed brand here**: the right typeface comes from context.

**Alternative**: Resolve type from context, in order —
1. **Existing repo** → use the fonts already loaded (`next/font`, `@font-face`, `<link>`).
2. **Figma source** → use its text styles.
3. **User-specified** → use what they named.
4. **Fallback only** → Inter (UI/text) + Fragment Mono (mono).

In every case the choice must be deliberate and recorded in `system.md`.

```css
/* ❌ BANNED: chosen by reflex, no resolution */
body {
  font-family: 'Roboto', sans-serif;
}

/* ✅ Fallback (when no repo / Figma / user system specifies type) */
body {
  font-family: 'Inter', system-ui, sans-serif;
}

code, .data-label {
  font-family: 'Fragment Mono', ui-monospace, monospace;
}
```

See `design-data/references/styling-resolution.md` for the full resolution order.

---

## 8. Spring/Bounce Easing

**Pattern**: `ease-in-out`, `linear`, or spring physics

**Why it's banned**: Feels cartoony, not premium. Custom cubic-bezier is more refined.

**Alternative**: Use custom cubic-bezier curves.

```css
/* ❌ BANNED */
.element {
  transition: all 300ms ease-in-out;
}

/* ✅ ALTERNATIVE */
.element {
  transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 700ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 9. Animating Non-Transform Properties

**Pattern**: `transition: width 300ms, height 300ms, top 300ms`

**Why it's banned**: Performance cost. Causes layout thrashing.

**Alternative**: Only animate transform and opacity.

```css
/* ❌ BANNED */
.element {
  transition: width 300ms, height 300ms, top 300ms, left 300ms;
}

/* ✅ ALTERNATIVE */
.element {
  transition: transform 300ms, opacity 300ms;
}

.element.expanded {
  transform: scale(1.5);
}
```

---

## 10. "Clean and Modern" Descriptor

**Pattern**: Using generic terms to describe design

**Why it's banned**: Meaningless. Doesn't communicate intent or decisions.

**Alternative**: Use specific descriptors from intent/domain exploration.

```markdown
❌ BANNED:
"I designed a clean and modern dashboard for managing tasks."

✅ ALTERNATIVE:
"I designed a support desk dashboard with calm urgency—
SLA countdown rings provide at-a-glance priority without
reading ticket content. Amber/crimson color system emerges
from domain (caution/critical states)."
```

---

## Override Protocol

If user explicitly requests a banned pattern:

1. **Warning message**: "[Pattern] is on ban list because [reason]."
2. **Alternative suggestion**: "Alternative: [specific better approach]."
3. **Proceed with override**: "Proceeding with your override, but recommend reconsidering."

Do NOT silently comply. Always educate about why the pattern is problematic.
