---
name: Level Indicator
id: level-bar
class: .level-bar
category: meters
index: 10
materials: [panel]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Level Indicator

## Physical Analog
**Reference devices**: Camera electronic level/horizon indicator (Sony Alpha, Nikon Z series).
**Mechanism**: Derived from spirit level / bubble level. Accelerometer data drives bar indicator where center mark = level (0 degrees). Fill represents current tilt angle and direction.

## Geometry

| Property | Value |
|----------|-------|
| Bar | 160px wide x 8px height |
| Center mark | 1px at 50% |
| Fill | Amber, positioned relative to center |
| Border-radius | pill (100px) |

## CSS Recipe

### Wrapper
```css
.level-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
```

### Bar
```css
.level-bar {
  width: 160px; height: 8px; background: var(--bg-inset);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-pill);
  position: relative; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);
}
```

### Fill
```css
.level-fill {
  position: absolute; top: 1px; bottom: 1px;
  background: var(--amber); border-radius: var(--radius-pill);
  transition: left 0.1s, width 0.1s;
}
```

### Center Mark
```css
.level-center-mark { position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background: #444; z-index: 2; }
```

### Text Label
```css
.level-text { font-size: 8px; color: var(--text-muted); letter-spacing: 2px; font-family: var(--font-ui); }
```

## HTML Structure
```html
<div class="level-wrap">
  <div class="level-bar">
    <div class="level-center-mark"></div>
    <div class="level-fill" style="left:45%;width:10%"></div>
  </div>
  <span class="level-text">HORIZON &mdash; +2&deg;</span>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Bar: Recessed panel with pill shape
- Fill: Solid amber

## Theme Behavior
- Bar adapts via tokens
- Amber fill is fixed
- Center mark is fixed at `#444`

## Constraints
1. Center mark MUST be at exact 50% horizontal position.
2. Fill uses `left` and `width` to show position and magnitude of tilt.
3. Pill border-radius (100px) for level-instrument aesthetic.
4. Fill transitions use 0.1s for responsive feedback.

## Accessibility
- Use `role="meter"` with `aria-valuenow` for tilt angle
- `aria-label="Horizon level"`
