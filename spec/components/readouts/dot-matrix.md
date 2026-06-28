---
name: Dot Matrix Display
id: dot-matrix
class: .dot-matrix
category: readouts
index: 7
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Dot Matrix Display

## Physical Analog
**Reference devices**: LED ticker tape displays (stock exchanges, sports arenas), synthesizer patch name scrollers (Korg M1, Roland JV-1080), bus destination signs.
**Mechanism**: Grid of individual LEDs (5x7 or 8x8 per character cell). Displays arbitrary text by selectively lighting pixels. Text wider than display scrolls horizontally (marquee) via shift register at fixed rate (20-50ms per column shift).

## Geometry

| Property | Value |
|----------|-------|
| Text font | 20px VT323 |
| Letter-spacing | 3px |
| Scroll animation | 8s linear infinite |
| Padding | 8px 16px |

## CSS Recipe

### Container
```css
.dot-matrix {
  padding: 8px 16px; background: var(--bg-inset);
  border: 1px solid #1e1e1e; border-radius: var(--radius-md);
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.7); overflow: hidden;
}
```

### Scrolling Text
```css
.dot-matrix-text {
  font-family: var(--font-lcd); font-size: 20px; letter-spacing: 3px;
  color: var(--green-hi); text-shadow: 0 0 8px var(--green-glow);
  white-space: nowrap;
  animation: marquee 8s linear infinite;
}
```

### Marquee Animation
```css
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
```

## HTML Structure
```html
<div class="dot-matrix" style="width:200px">
  <div class="dot-matrix-text">NOW PLAYING: TRACK 07 -- MIDNIGHT CITY</div>
</div>
```

## Size Variants
No explicit size variants. Width set by container.

## Material Variants
Single material: Phosphor screen with LED grid. Default color is green (most common dot-matrix color).

## Theme Behavior
- Container adapts via `--bg-inset`
- Green LED color and glow are fixed
- Inset shadow at 0.7 opacity

## Constraints
1. Animation MUST use `linear` timing function -- dot matrix scrolling is uniform speed (clock-driven), NOT eased.
2. `white-space: nowrap` is REQUIRED to prevent text wrapping.
3. `overflow: hidden` on container clips the scrolling text.
4. Font MUST be `--font-lcd` (VT323) for pixel-grid appearance.
5. `text-shadow` with green glow simulates LED light bleeding.
6. Width MUST be set on container to define the visible "window".

## Accessibility
- Use `aria-label` on container with the full text content
- `role="marquee"` or `role="status"` for the scrolling region
- Consider `prefers-reduced-motion` to pause animation
- Text content should be accessible even when partially scrolled off-screen
