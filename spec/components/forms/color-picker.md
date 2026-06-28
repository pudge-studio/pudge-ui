---
name: Color Picker
id: color-picker
class: .color-bar-picker
category: forms
index: 5
materials: [phosphor-screen]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Color Picker

## Physical Analog
**Reference devices**: SMPTE/EBU color bar test pattern, broadcast monitor calibration, chroma key color selectors.
**Mechanism**: Derived from the SMPTE color bar test signal -- a standardized video test pattern used since 1978 to calibrate broadcast monitors. The seven vertical bars (white, yellow, cyan, green, magenta, red, blue) are arranged in a specific order representing decreasing luminance. In this UI, each bar is selectable -- clicking a bar selects that color, shown by a white dot indicator at the bottom.

## Geometry

| Property | Value |
|----------|-------|
| Height | 40px |
| Border radius | `--radius-sm` (4px) |
| Bars | 7 equal-width columns |
| Selection dot | 6x6px circle |

## CSS Recipe

### Container (`.color-bar-picker`)
```css
.color-bar-picker {
  display: flex; height: 40px; border-radius: var(--radius-sm);
  overflow: hidden; border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-inset); cursor: pointer;
}
```

### Swatch (`.color-bar-swatch`)
```css
.color-bar-swatch {
  flex: 1; transition: opacity 0.15s; position: relative;
}
```

### Swatch hover
```css
.color-bar-swatch:hover { opacity: 0.8; }
```

### Swatch selected
```css
.color-bar-swatch.selected::after {
  content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
  width: 6px; height: 6px; background: #fff; border-radius: 50%;
  box-shadow: 0 0 6px rgba(255,255,255,0.5);
}
```

## HTML Structure
```html
<div class="color-bar-picker" style="width:210px">
  <div class="color-bar-swatch" style="background:#fff"></div>
  <div class="color-bar-swatch selected" style="background:#ffff00"></div>
  <div class="color-bar-swatch" style="background:#00ffff"></div>
  <div class="color-bar-swatch" style="background:#00ff00"></div>
  <div class="color-bar-swatch" style="background:#ff00ff"></div>
  <div class="color-bar-swatch" style="background:#ff0000"></div>
  <div class="color-bar-swatch" style="background:#0000ff"></div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses recessed inset styling to simulate a display/monitor cavity.

## Theme Behavior
- Border swaps via `--border-subtle`
- Inset shadow adapts by theme
- SMPTE colors are absolute (do not change with theme)
- Selection dot is always white with white glow

## Constraints
1. MUST use SMPTE color bar order: white, yellow, cyan, green, magenta, red, blue
2. MUST use recessed styling (inset shadow) to simulate a monitor display
3. Selected bar MUST show a white dot with glow at the bottom
4. Hover MUST reduce opacity to 0.8 (light leaking through pressed key)
5. Only ONE bar can be `.selected` at a time
6. Bars MUST be equal width (`flex: 1`)
7. MUST use `overflow: hidden` to clip bar corners to the container radius

## Accessibility
- Container should have `role="radiogroup"` with `aria-label="Color picker"`
- Each swatch should have `role="radio"` with `aria-checked`
- Include `aria-label` on each swatch with the color name
- Support Left/Right arrow key navigation between swatches
