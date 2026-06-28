---
name: Rubber Button
id: rubber-btn
class: .rubber-btn
category: buttons
index: 3
materials: [rubber]
sizes: [xs, sm, md]
interactive: true
requires_js: false
canvas: false
---

# Rubber Button

## Physical Analog
**Reference devices**: Game Boy Advance Start/Select, Nokia 3310 side buttons, Sony Walkman transport controls.
**Mechanism**: Conductive rubber dome (vulcanized silicone). Single piece with conductive carbon pill inside. Silicone deforms progressively, pushing carbon pill onto PCB traces. No sharp click -- soft, damped tactile feel. Silicone elasticity provides return force.

## Geometry

| Property | Value |
|----------|-------|
| Surface finish | Matte (naturally low specular reflection) |
| Shape | Pill-shaped (oblong with fully rounded ends) |
| Travel | 0.5-1.0mm (more than metal dome switches) |
| Highlight opacity | 0.06 (vs 0.14 for glossy) |

## CSS Recipe

### Default State
```css
.rubber-btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-ui); font-size: 10px; font-weight: 600;
  letter-spacing: 1px; color: var(--text-secondary);
  background: linear-gradient(180deg, var(--rubber-hi), var(--rubber-bg));
  border: none; border-radius: var(--radius-pill); cursor: pointer;
  height: 34px; min-width: 56px; padding: 0 14px;
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 rgba(255,255,255,0.08);
  transition: transform 0.07s var(--snap-fast), box-shadow 0.07s var(--snap-fast);
}
```

### Active (Pressed) State
```css
.rubber-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 0 var(--border-deep);
}
```

### Active (Selected) State
```css
.rubber-btn.active { color: var(--green-on); background: linear-gradient(180deg,#2a3a2a,#1a2a1a); }
```

### Light Theme Overrides
```css
[data-theme="light"] .rubber-btn.active { background: linear-gradient(180deg,#c0dcc0,#a0cca0); }
```

## HTML Structure
```html
<!-- Basic -->
<button class="rubber-btn">RUBBER</button>

<!-- Active -->
<button class="rubber-btn active">ACTIVE</button>

<!-- Small -->
<button class="rubber-btn xs">XS</button>
```

## Size Variants

| Size | Height | Min-Width | Font-Size | Padding |
|------|--------|-----------|-----------|---------|
| `.xs` | 24px | 40px | 8px | 0 8px |
| `.sm` | 28px | 48px | 9px | 0 10px |
| default | 34px | 56px | 10px | 0 14px |

## Material Variants
Single material: rubber (soft-touch matte). Uses `--rubber-hi` and `--rubber-bg` tokens.

## Theme Behavior
- Dark: `--rubber-bg: #2a2826`, `--rubber-hi: #3a3835`
- Light: `--rubber-bg: #c8c4bc`, `--rubber-hi: #d8d4cc`
- Active state uses different green gradients per theme

## Constraints
1. Highlight opacity MUST be `0.06-0.08`, not `0.14`. Matte surface = minimal specular reflection.
2. Gradient delta between stops MUST be very small (nearly flat). Rubber has no dome catch-light.
3. Border-radius MUST be `100px` (pill shape). Rectangular rubber buttons look wrong.
4. Press uses `--snap-fast` easing with slight overshoot to simulate silicone squish.

## Accessibility
- Uses native `<button>` element
- Keyboard: Enter/Space to activate
- Focus: Browser default focus ring preserved
