---
name: EV Meter
id: ev-meter
class: .ev-meter
category: meters
index: 2
materials: [panel]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# EV Meter

## Physical Analog
**Reference devices**: Camera viewfinder exposure meter (present in every DSLR/mirrorless since 1960s).
**Mechanism**: Shows difference between metered light level and selected exposure settings. Zero (center) = correct exposure. Positive = overexposure, negative = underexposure. Originally a moving-coil galvanometer needle in film-era cameras.

## Geometry

| Property | Value |
|----------|-------|
| Track | 18px wide x 120px tall |
| Zero line | 1px at vertical center |
| Fill bar | Extends from center (up or down) |
| Readout | 10px Michroma below |

## CSS Recipe

### Container
```css
.ev-meter { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.ev-sign { font-size: 10px; color: var(--text-muted); letter-spacing: 1px; font-family: var(--font-ui); }
```

### Track
```css
.ev-track {
  width: 18px; height: 120px; background: var(--bg-inset);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);
  position: relative; overflow: hidden; box-shadow: inset 1px 0 3px rgba(0,0,0,0.4);
}
```

### Zero Line
```css
.ev-zero-line { position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #555; z-index: 2; }
```

### Fill Bar
```css
.ev-fill-bar {
  position: absolute; left: 3px; right: 3px;
  background: var(--amber); border-radius: 1px; z-index: 1;
}
```

### Readout
```css
.ev-readout { font-family: var(--font-display); font-size: 10px; color: var(--amber); letter-spacing: 1px; }
```

## HTML Structure
```html
<div class="ev-meter">
  <span class="ev-sign">+</span>
  <div class="ev-track">
    <div class="ev-zero-line"></div>
    <div class="ev-fill-bar" style="top:30%;height:20%"></div>
  </div>
  <span class="ev-sign">&minus;</span>
  <span class="ev-readout">+0.7</span>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Track: Recessed panel
- Fill: Solid amber

## Theme Behavior
- Track adapts via tokens
- Amber fill and readout are fixed

## Constraints
1. Zero line MUST be at exact vertical center (50%).
2. Fill bar extends from center upward (overexposure) or downward (underexposure).
3. Fill position uses `top` and `height` percentages.
4. + sign at top, - sign at bottom (standard photographic convention).

## Accessibility
- Use `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `aria-label="Exposure compensation"`
