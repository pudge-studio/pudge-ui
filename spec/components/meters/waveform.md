---
name: Waveform
id: waveform-wrap
class: .waveform-wrap
category: meters
index: 6
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: true
canvas: true
---

# Waveform

## Physical Analog
**Reference devices**: Final Cut Pro waveform monitor, DaVinci Resolve parade scope, broadcast waveform monitors.
**Mechanism**: Shows brightness value for each horizontal position in image. Y-axis = luma level (0-100 IRE). Used in broadcast to ensure legal signal levels.

## Geometry

| Property | Value |
|----------|-------|
| Canvas | 200x80px |
| Container padding | 2px |
| Border-radius | var(--radius-sm) |

## CSS Recipe

### Container
```css
.waveform-wrap {
  background: #0a0a0a; border: 1px solid #1e1e1e;
  border-radius: var(--radius-sm); padding: 2px;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.6);
}
```

### Canvas
```css
.waveform-canvas { display: block; border-radius: 2px; }
```

## HTML Structure
```html
<div class="waveform-wrap">
  <canvas class="waveform-canvas" width="200" height="80" id="waveCanvas"></canvas>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
Single material: Phosphor screen.

## Theme Behavior
- Container uses hardcoded dark colors
- Canvas content rendered by JS

## Constraints
1. Canvas renders 200x80px audio waveform.
2. Single stroke path using compound sine waves (`sin(x*0.08)` + `sin(x*0.03)`) with random jitter.
3. Stroke color: `rgba(102,255,102,0.6)`, 1px line width.
4. Container MUST match histogram container styling.
5. Requires JS for canvas rendering.

## Accessibility
- Use `role="img"` on canvas with `aria-label`
- Provide text fallback for screen readers
