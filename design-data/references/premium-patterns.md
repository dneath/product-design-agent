# Craft Patterns (Optional Techniques)

A toolkit of techniques you **may** reach for — **never a required house style and never applied by reflex.** This agent has no fixed brand or visual identity; styling is resolved from context (see `styling-resolution.md`). Use these only when the *resolved* style genuinely calls for them, and skip them for dense/flat tools where they'd add noise.

Two parts of this file are **always-on**, regardless of style, because they're craft rather than aesthetics — they're folded into the Craft Principles in `quality-gates.md`:
- **Whisper-quiet elevation** — OKLCH surfaces that shift lightness only (same hue), a few percent per step.
- **Ease-out motion** — named cubic-bezier curves; animate `transform`/`opacity`/`filter` only, never layout properties, never `transition: all`.

Everything else below (nested containment, button-in-button) is **opt-in**.

## 1. Double-Bezel Architecture (optional)

Nested containment creates premium feel through layered depth.

### Pattern
Outer shell + inner core with calculated radius relationship.

### Code Example

```css
/* Outer shell */
.outer-bezel {
  padding: clamp(20px, 3vw, 40px);
  background: var(--surface-elevation-1);
  border-radius: 24px;
}

/* Inner core (outer radius - 8px) */
.inner-core {
  padding: clamp(16px, 2.5vw, 32px);
  background: var(--surface-elevation-2);
  border-radius: 16px; /* 24px - 8px */
}
```

### Usage
- Card containers
- Modal dialogs
- Feature sections
- Dashboard panels

### Variables
```css
:root {
  --bezel-outer-radius: 24px;
  --bezel-inner-radius: calc(var(--bezel-outer-radius) - 8px);
  --bezel-outer-padding: clamp(20px, 3vw, 40px);
  --bezel-inner-padding: clamp(16px, 2.5vw, 32px);
}
```

---

## 2. Button-in-Button Pattern

Nested CTA with icon wrapper creates tactile, premium feel.

### Pattern
Outer button + inner content wrapper + nested icon container.

### Code Example

```css
.cta-outer {
  padding: 16px 24px;
  background: var(--primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-outer:hover {
  transform: scale(1.02);
}

.cta-inner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-wrapper {
  padding: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 16px;
  height: 16px;
}
```

### HTML Structure
```html
<button class="cta-outer">
  <div class="cta-inner">
    <span>Create Project</span>
    <div class="icon-wrapper">
      <Icon name="plus" class="icon" />
    </div>
  </div>
</button>
```

### Usage
- Primary CTAs
- Hero actions
- Important form submissions
- Feature launch buttons

---

## 3. Whisper-Quiet Elevation

Surface jumps by 3-5% lightness—subtle, not harsh.

### Pattern
OKLCH color space for precise lightness control. Dark mode: progressively lighter. Light mode: progressively darker.

### Code Example

```css
/* Dark mode */
:root {
  --surface-base: oklch(20% 0.01 240);
  --surface-elevated-1: oklch(23% 0.01 240); /* +3% */
  --surface-elevated-2: oklch(26% 0.01 240); /* +3% */
  --surface-elevated-3: oklch(29% 0.01 240); /* +3% */
  --surface-elevated-4: oklch(32% 0.01 240); /* +3% */
}

/* Light mode */
:root {
  --surface-base-light: oklch(98% 0.01 240);
  --surface-elevated-1-light: oklch(95% 0.01 240); /* -3% */
  --surface-elevated-2-light: oklch(92% 0.01 240); /* -3% */
  --surface-elevated-3-light: oklch(89% 0.01 240); /* -3% */
  --surface-elevated-4-light: oklch(86% 0.01 240); /* -3% */
}
```

### Elevation Scale
- **Base**: Page background, canvas
- **Elevated-1**: Cards, panels, primary containers
- **Elevated-2**: Dropdowns, popovers, tooltips
- **Elevated-3**: Modals, dialogs, overlays
- **Elevated-4**: Notifications, toasts, alerts

### Generator Function (JavaScript)
```javascript
function generateElevationScale(baseColor, steps = 5, jump = 3) {
  const { l, c, h } = parseOKLCH(baseColor);
  const isDark = l < 50;
  
  return Array.from({ length: steps }, (_, i) => {
    const newL = isDark ? l + (i * jump) : l - (i * jump);
    return `oklch(${newL}% ${c} ${h})`;
  });
}

// Usage
const darkScale = generateElevationScale('oklch(20% 0.01 240)', 5, 3);
const lightScale = generateElevationScale('oklch(98% 0.01 240)', 5, 3);
```

---

## 4. Custom Motion (Cubic-Bezier Only)

Premium easing curves that feel refined, not cartoony.

### Standard Curves

```css
:root {
  /* Exponential out: Sharp start, smooth finish */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Quart out: Moderate deceleration */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  
  /* Back out: Slight overshoot (use sparingly) */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Circ in-out: Smooth throughout */
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  
  /* Quad out: Subtle deceleration */
  --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);
  
  /* Cubic out: Balanced deceleration */
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
  
  /* Sine out: Gentle, natural */
  --ease-out-sine: cubic-bezier(0.61, 1, 0.88, 1);
}
```

### Durations

```css
:root {
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-base: 300ms;
  --duration-moderate: 500ms;
  --duration-slow: 700ms;
  --duration-deliberate: 1000ms;
}
```

### Scroll Entry Animation

```css
.fade-up-in {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(4px);
  transition: 
    opacity var(--duration-slow) var(--ease-out-expo),
    transform var(--duration-slow) var(--ease-out-expo),
    filter var(--duration-slow) var(--ease-out-expo);
}

.fade-up-in.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
```

### Interaction States

```css
.button {
  transform: scale(1);
  transition: transform var(--duration-fast) var(--ease-out-quart);
}

.button:hover {
  transform: scale(1.05);
}

.button:active {
  transform: scale(0.95);
  transition-duration: var(--duration-instant);
}
```

### Performance Rules
1. **Only animate transform and opacity** (hardware accelerated)
2. **Never animate width/height/top/left** (causes layout thrashing)
3. **Use will-change sparingly** (only when animation imminent)
4. **Prefer IntersectionObserver over scroll listeners**

```css
/* ✅ GOOD */
.element {
  transition: transform 300ms, opacity 300ms;
}

/* ❌ BAD */
.element {
  transition: width 300ms, height 300ms, top 300ms;
}
```

---

## Integration Checklist

Always-on (apply regardless of style):

- [ ] **Whisper-Quiet Elevation**: Surfaces shift lightness only (same hue), a few percent per step
- [ ] **Custom Motion**: No linear/ease-in-out, only cubic-bezier ease-out
- [ ] **Performance**: Only transform/opacity/filter animations; never `transition: all`

Opt-in (only when the resolved style calls for it — skip for dense/flat tools):

- [ ] **Double-Bezel**: nested containment where layered framing genuinely helps
- [ ] **Button-in-Button**: an icon wrapper inside a primary CTA, for sparing emphasis
- [ ] **Consistency**: whichever opt-in patterns you use, apply them consistently

---

## Anti-Patterns to Avoid

1. **Mixing patterns randomly**: Pick 2-3 patterns and apply consistently
2. **Over-animating**: Not everything needs motion
3. **Ignoring performance**: Animating non-transform properties kills mobile performance
4. **Inconsistent easing**: Use same curve family for related animations
5. **Generic timing**: 300ms is not always right—match duration to distance/importance

---

## Design Tokens Structure

```json
{
  "motion": {
    "easing": {
      "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)"
    },
    "duration": {
      "instant": "100ms",
      "fast": "200ms",
      "base": "300ms",
      "slow": "700ms"
    }
  },
  "elevation": {
    "dark": {
      "base": "oklch(20% 0.01 240)",
      "1": "oklch(23% 0.01 240)",
      "2": "oklch(26% 0.01 240)",
      "3": "oklch(29% 0.01 240)"
    }
  },
  "radius": {
    "outer-bezel": "24px",
    "inner-bezel": "16px",
    "button": "12px",
    "icon-wrapper": "6px"
  }
}
```
