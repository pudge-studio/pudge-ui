---
name: Grid Overlay
id: grid-overlay
class: .grid-overlay-demo
category: overlays
index: 8
materials: []
sizes: [default]
interactive: false
requires_js: false
canvas: true
---

# Grid Overlay

## Physical Analog
**Reference devices**: Camera viewfinder grid display (rule-of-thirds, crosshair).
**Mechanism**: A composition guide overlay. The rule-of-thirds grid divides the viewfinder into a 3x3 grid with two vertical and two horizontal lines. Intersection points are suggested focal points for subject placement. The center crosshair (dot) marks the exact frame center. Lines are rendered at very low opacity (12%) so they are visible but do not interfere with viewing the image.

## Geometry

| Property | Value |
|----------|-------|
| Demo container | 240x160px |
| Grid lines | 1px wide |
| Line opacity | 12% white |
| Center dot | 6x6px circle |
| Vertical lines at | 33.3% and 66.6% |
| Horizontal lines at | 33.3% and 66.6% |

## CSS Recipe

### Container (`.grid-overlay-demo`)
```css
.grid-overlay-demo {
  width: 240px; height: 160px; background: #1a1a1a;
  border: 1px solid #2a2a2a; border-radius: var(--radius-sm);
  position: relative; overflow: hidden;
}
```

### Vertical lines (`.grid-line-v`)
```css
.grid-line-v { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(255,255,255,0.12); }
```

### Horizontal lines (`.grid-line-h`)
```css
.grid-line-h { position: absolute; left: 0; right: 0; height: 1px; background: rgba(255,255,255,0.12); }
```

### Center dot (`.grid-center-dot`)
```css
.grid-center-dot {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 6px; height: 6px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2);
}
```

## HTML Structure
```html
<div class="grid-overlay-demo">
  <div class="grid-line-v" style="left:33.3%"></div>
  <div class="grid-line-v" style="left:66.6%"></div>
  <div class="grid-line-h" style="top:33.3%"></div>
  <div class="grid-line-h" style="top:66.6%"></div>
  <div class="grid-center-dot"></div>
</div>
```

## Size Variants
No size variants defined. Overlay scales to parent container.

## Material Variants
No material variants. Pure HUD overlay element.

## Theme Behavior
- Grid lines use fixed rgba values (do not change with theme)
- Container background is fixed dark (#1a1a1a) to simulate viewfinder
- Center dot border uses fixed 20% white opacity

## Constraints
1. Grid lines MUST be at exactly 33.3% and 66.6% positions (rule of thirds)
2. Line opacity MUST be 12% (visible but non-interfering)
3. Lines MUST be exactly 1px wide
4. Center dot MUST be a circle (border-radius: 50%) with border only (no fill)
5. Center dot MUST use 20% white opacity border
6. Container MUST use `position: relative` and `overflow: hidden`

## Accessibility
- Grid overlay is entirely decorative
- All elements should be hidden from assistive technology
- Use `aria-hidden="true"` on the container
