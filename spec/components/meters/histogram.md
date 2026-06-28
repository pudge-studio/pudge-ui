---
name: Histogram
id: histogram-wrap
class: .histogram-wrap
category: meters
index: 5
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: true
canvas: true
---

# Histogram

## Physical Analog
**Reference devices**: Sony camera histogram overlay, Final Cut Pro waveform monitor, DaVinci Resolve parade scope.
**Mechanism**: Shows distribution of brightness values in an image. X-axis = brightness (black to white), Y-axis = pixel count at that brightness. Used by camera operators to judge exposure.

## Geometry

| Property | Value |
|----------|-------|
| Canvas | 200x80px |
| Container padding | 2px |
| Border-radius | var(--radius-sm) |

## CSS Recipe

### Container
```css
.histogram-wrap {
  background: #0a0a0a; border: 1px solid #1e1e1e;
  border-radius: var(--radius-sm); padding: 2px;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.6);
}
```

### Canvas
```css
.histogram-canvas { display: block; border-radius: 2px; }
```

## HTML Structure
```html
<div class="histogram-wrap">
  <canvas class="histogram-canvas" width="200" height="80" id="histCanvas"></canvas>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
Single material: Phosphor screen with deep black background.

## Theme Behavior
- Container uses hardcoded dark colors (monitor displays are always dark)
- Canvas content rendered by JS

## Constraints
1. Canvas renders 200x80px luminance distribution.
2. For each x pixel, calculate height using sine-based curve with random variation.
3. Draw 1px-wide vertical bars with amber gradient (`rgba(245,166,35,0.1)` to `rgba(245,166,35,0.6)`).
4. Container background MUST be near-black (`#0a0a0a`).
5. Requires JS for canvas rendering.

## Accessibility
- Use `role="img"` on canvas with `aria-label` describing the histogram
- Provide text fallback for screen readers
