---
name: Gauge Full Circle
id: gauge-full
class: .gauge-full
category: meters
index: 13
materials: [panel, chrome]
sizes: [md]
interactive: false
requires_js: true
canvas: false
---

# Gauge Full Circle

## Physical Analog
**Reference devices**: Compass (ship/aircraft), RPM tachometer, clock face, radio tuning dial.
**Mechanism**: Full 360-degree rotating indicator. Magnetic compass: magnetized needle aligns with Earth's magnetic field. Tachometer: moving-coil meter with extended angular range or servo-driven indicator.

## Geometry

| Property | Value |
|----------|-------|
| Container | 120x120px circle |
| Needle | 2px wide x 48px tall |
| Pivot | 8px diameter at center |
| Cardinal labels | N/S/E/W at four positions |

## CSS Recipe

### Container
```css
.gauge-full {
  width: 120px; height: 120px; border-radius: 50%;
  background: var(--bg-inset); border: 2px solid var(--border-mid);
  position: relative;
  box-shadow: inset 0 1px 6px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
}
```

### Needle
```css
.gauge-full-needle {
  position: absolute; top: 12px; left: 50%; width: 2px; height: 48px;
  background: linear-gradient(180deg, var(--red-alert), transparent);
  transform-origin: bottom center;
  margin-left: -1px; z-index: 2;
}
```

### Pivot
```css
.gauge-full-pivot {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 8px; height: 8px; border-radius: 50%;
  background: radial-gradient(circle, #888, #333);
  z-index: 3;
}
```

### Cardinal Labels
```css
.gauge-full-label {
  position: absolute; font-family: var(--font-ui); font-size: 7px; font-weight: 600;
  color: var(--text-muted); letter-spacing: 1px;
}
```

## HTML Structure
```html
<div class="gauge-full">
  <div class="gauge-full-needle" style="transform:rotate(45deg)"></div>
  <div class="gauge-full-pivot"></div>
  <span class="gauge-full-label" style="top:8px;left:50%;transform:translateX(-50%)">N</span>
  <span class="gauge-full-label" style="right:8px;top:50%;transform:translateY(-50%)">E</span>
  <span class="gauge-full-label" style="bottom:8px;left:50%;transform:translateX(-50%)">S</span>
  <span class="gauge-full-label" style="left:8px;top:50%;transform:translateY(-50%)">W</span>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Container: Recessed panel with thick border
- Needle: Red-to-transparent gradient
- Pivot: Metallic radial gradient

## Theme Behavior
- Container adapts via tokens
- Needle red and text colors adapt via accent tokens

## Constraints
1. Needle rotates full 360 degrees from center point.
2. Cardinal labels (N/S/E/W) are positioned absolutely at four compass points.
3. Needle uses `transform-origin: bottom center` -- tip points outward.
4. Needle gradient fades from red tip to transparent tail.
5. Pivot is centered with `translate(-50%,-50%)`.

## Accessibility
- Use `role="img"` with `aria-label` (e.g., "Compass heading: 45 degrees NE")
- Requires JS to update needle rotation
