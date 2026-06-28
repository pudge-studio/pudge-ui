---
name: Tooltip
id: tooltip
class: .tooltip
category: overlays
index: 9
materials: [glossy-polycarbonate]
sizes: [default]
interactive: false
requires_js: true
canvas: false
---

# Tooltip

## Physical Analog
**Reference devices**: Camera HUD floating labels, broadcast graphics lower-thirds, military HUD callout boxes.
**Mechanism**: A small pop-up information panel that appears near a point of interest to provide context. The triangular tail (created via `::after` rotated 45 degrees) points toward the source element, derived from the callout line patterns in engineering drawings and military head-up display overlays.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 6px 12px |
| Border radius | `--radius-sm` (4px) |
| Font size | 10px |
| Tail size | 8x8px rotated 45deg |
| Tail offset | 5px below |
| Shadow | 0 2px 8px rgba(0,0,0,0.3) |

## CSS Recipe

### Container (`.tooltip`)
```css
.tooltip {
  position: relative; display: inline-flex; padding: 6px 12px;
  background: var(--bg-raised); border: 1px solid var(--border-mid);
  border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  font-family: var(--font-ui); font-size: 10px; font-weight: 500;
  color: var(--text-primary); letter-spacing: 0.5px;
}
```

### Tail (pointing down)
```css
.tooltip::after {
  content: ''; position: absolute; bottom: -5px; left: 50%;
  width: 8px; height: 8px; background: var(--bg-raised);
  border-right: 1px solid var(--border-mid); border-bottom: 1px solid var(--border-mid);
  transform: translateX(-50%) rotate(45deg);
}
```

## HTML Structure
```html
<div class="tooltip">ISO 800 -- Auto</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses standard raised surface.

## Theme Behavior
- Background swaps via `--bg-raised`
- Border adapts via `--border-mid`
- Tail background matches container background
- Shadow reduces in light mode
- Text adapts via `--text-primary`

## Constraints
1. MUST include triangular tail via `::after` pseudo-element
2. Tail MUST be an 8x8px square rotated 45 degrees
3. Tail MUST inherit container background and border colors
4. MUST use `--radius-sm` (small, callout-proportioned)
5. MUST use `position: relative` for tail positioning
6. Shadow MUST be moderate (0 2px 8px) -- tooltip is close to surface

## Accessibility
- Use `role="tooltip"` on the element
- Trigger element should have `aria-describedby` pointing to tooltip id
- Tooltip should appear on hover AND focus of the trigger
- Tooltip should dismiss on Escape key
- Tooltip must not contain interactive elements
