---
name: Stepper
id: stepper
class: .stepper
category: sliders
index: 6
materials: [panel, glossy]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Stepper

## Physical Analog
**Reference devices**: iPod scroll wheel numeric entry, Nokia phone volume steps, Roland TR-808 tempo control.
**Mechanism**: Digitized increment/decrement control. Pair of momentary buttons (+ and -) flanking a numeric display. Each press changes value by one step. Values are discrete (integers or predefined steps), distinct from continuous sliders.

## Geometry

| Property | Value |
|----------|-------|
| Container | Inline-flex with inset background |
| Buttons | 24px diameter circles |
| Value display | 40px min-width, centered |
| Font size | 18px mono for value |

## CSS Recipe

### Wrapper
```css
.stepper-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; }
```

### Container
```css
.stepper {
  display: flex; align-items: center; gap: 4px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); padding: 4px;
  box-shadow: var(--shadow-inset);
}
```

### Increment/Decrement Buttons
```css
.stepper-btn {
  width: 24px; height: 24px; border-radius: 50%;
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(155deg, var(--bg-surface), var(--bg-panel));
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  color: var(--text-primary); font-size: 12px; font-family: var(--font-ui); font-weight: 700;
  transition: transform 0.07s;
}
.stepper-btn:active { transform: scale(0.9); }
```

### Value Display
```css
.stepper-value {
  font-family: var(--font-mono); font-size: 18px;
  color: var(--blue-info); letter-spacing: 1px;
  min-width: 40px; text-align: center;
}
```

### Label
```css
.stepper-label { font-family: var(--font-ui); font-size: 9px; font-weight: 500; color: var(--text-muted); letter-spacing: 1px; }
```

## HTML Structure
```html
<div class="stepper-wrap">
  <div class="stepper">
    <button class="stepper-btn" data-stepper-dec>&minus;</button>
    <span class="stepper-value" id="stepperVal">12</span>
    <button class="stepper-btn" data-stepper-inc>+</button>
  </div>
  <span class="stepper-label">CHANNEL</span>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Container: Recessed panel (bg-inset)
- Buttons: Glossy panel surface (raised within recessed track)

## Theme Behavior
- Container and buttons adapt via tokens
- Value color (blue-info) is fixed

## Constraints
1. Buttons are CIRCULAR (24px, border-radius: 50%) -- not rectangular.
2. Press feedback MUST be `scale(0.9)`, not `translateY`.
3. Value display MUST use `--font-mono` for tabular numeric alignment.
4. Container is RECESSED (bg-inset with inset shadow) -- buttons sit raised within it.

## Accessibility
- Uses native `<button>` elements for +/-
- Value display should use `aria-live="polite"` for screen reader updates
- Keyboard: Enter/Space on buttons, or Arrow keys when value is focused
- Requires JS to update value on button press
