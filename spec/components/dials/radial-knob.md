---
name: Radial Knob
id: radial-knob
class: .radial-knob
category: dials
index: 3
materials: [rubber, brushed-metal, glossy]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Radial Knob

## Physical Analog
**Reference devices**: Technics SL-1200 pitch control, Pioneer DJM mixer EQ knobs, Mackie mixer gain/pan knobs, hi-fi amplifier volume knobs.
**Mechanism**: Rotary potentiometer with fixed rotation range (270-300 degrees). Carbon film or cermet resistive element with wiper contact. Dead zone at bottom (60-90 degrees). Three material variants: rubber (DJ/studio), brushed aluminum (hi-fi), glossy polycarbonate (consumer).

## Geometry

| Property | Value |
|----------|-------|
| Knob body | 80x80px |
| Rotation range | 270-300 degrees with hard stops |
| Indicator | 3x12px amber bar, rotates from center |
| Center cap | 24x24px recessed circle |

## CSS Recipe

### Container
```css
.radial-dial { display: flex; flex-direction: column; align-items: center; gap: 12px; }
```

### Knob Body (Default: Rubber)
```css
.radial-knob {
  width: 80px; height: 80px; border-radius: 50%;
  position: relative; cursor: grab; user-select: none;
  background: linear-gradient(145deg, #3a3835, #1a1816);
  border: 2px solid var(--border-mid);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
}
.radial-knob:active { cursor: grabbing; }
```

### Indicator
```css
.radial-indicator {
  position: absolute; width: 3px; height: 12px; border-radius: 2px;
  top: 6px; left: 50%; margin-left: -1.5px;
  background: var(--amber); transform-origin: 50% 34px;
  box-shadow: 0 0 6px var(--amber-glow);
}
```

### Center Cap
```css
.radial-knob .knob-center {
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
}
```

### Metal Variant
```css
.radial-knob.variant-metal {
  background: linear-gradient(145deg, #d8d6d0, #b8b6b0);
  border-color: #a8a6a0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5);
}
```

### Glossy Variant
```css
.radial-knob.variant-glossy {
  background: linear-gradient(145deg, var(--bg-surface), var(--bg-panel));
  border-color: var(--border-mid);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 var(--glossy-hi);
}
```

### Value Label
```css
.radial-value {
  font-family: var(--font-display); font-size: 12px;
  color: var(--text-primary); letter-spacing: 1px;
}
```

## HTML Structure
```html
<!-- Rubber (default) -->
<div class="radial-dial">
  <div class="radial-knob">
    <div class="radial-indicator"></div>
    <div class="knob-center"></div>
  </div>
  <span class="radial-value">RUBBER</span>
</div>

<!-- Metal variant -->
<div class="radial-dial">
  <div class="radial-knob variant-metal">
    <div class="radial-indicator"></div>
    <div class="knob-center"></div>
  </div>
  <span class="radial-value">METAL</span>
</div>

<!-- Glossy variant -->
<div class="radial-dial">
  <div class="radial-knob variant-glossy">
    <div class="radial-indicator"></div>
    <div class="knob-center"></div>
  </div>
  <span class="radial-value">GLOSSY</span>
</div>
```

## Size Variants
No explicit size variants. Fixed at 80x80px.

## Material Variants

| Variant | Background | Border | Highlight Opacity |
|---------|-----------|--------|-------------------|
| default (rubber) | `linear-gradient(145deg, #3a3835, #1a1816)` | `var(--border-mid)` | 0.08 |
| `.variant-metal` | `linear-gradient(145deg, #d8d6d0, #b8b6b0)` | `#a8a6a0` | 0.5 |
| `.variant-glossy` | `linear-gradient(145deg, bg-surface, bg-panel)` | `var(--border-mid)` | 0.14 |

## Theme Behavior
- Rubber and metal variants use hardcoded gradients
- Glossy variant adapts via surface tokens
- Amber indicator is fixed across themes

## Constraints
1. Indicator MUST rotate via `transform-origin` set to knob center (`50% 34px`).
2. Three material variants MUST use the Material Recipes from Section 3.
3. Cursor MUST change from `grab` to `grabbing` on `:active`.
4. Center cap represents shaft nut / set-screw cover.
5. Highlight opacity MUST match material: rubber=0.08, metal=0.5, glossy=0.14.

## Accessibility
- Add `tabindex="0"` and `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Keyboard: Arrow keys to rotate
- Requires JS for rotation interaction
