---
name: Volume Slider
id: slider-track
class: .slider-track
category: sliders
index: 1
materials: [panel, glossy]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Volume Slider

## Physical Analog
**Reference devices**: iPod touch volume bar, iPhone media volume slider, Creative Zen player.
**Mechanism**: Linear potentiometer adapted for touch-screen interaction. Fill color shows "active" portion (resistance before wiper), empty portion shows remaining range.

## Geometry

| Property | Value |
|----------|-------|
| Track | 100% width x 6px height, recessed |
| Thumb | 16px diameter circle |
| Fill | Blue-to-green gradient |
| Container width | 160px |

## CSS Recipe

### Wrapper
```css
.slider-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; width: 160px; }
```

### Track
```css
.slider-track {
  width: 100%; height: 6px; border-radius: 3px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  position: relative; cursor: pointer; box-shadow: var(--shadow-inset);
}
```

### Fill
```css
.slider-fill {
  position: absolute; top: 0; left: 0; height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--blue-info), var(--green-on));
  transition: width 0.1s var(--ease-out);
}
```

### Thumb
```css
.slider-thumb {
  position: absolute; top: 50%; width: 16px; height: 16px;
  border-radius: 50%; transform: translate(-50%,-50%);
  background: linear-gradient(155deg, var(--bg-surface), var(--bg-panel));
  box-shadow: 0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 var(--glossy-hi);
  cursor: grab; z-index: 2;
}
```

### Labels
```css
.slider-label { font-family: var(--font-ui); font-size: 10px; font-weight: 500; color: var(--text-muted); letter-spacing: 1px; }
.slider-value { font-family: var(--font-display); font-size: 11px; color: var(--blue-info); letter-spacing: 1px; }
```

## HTML Structure
```html
<div class="slider-wrap">
  <div class="slider-track">
    <div class="slider-fill" style="width:60%"></div>
    <div class="slider-thumb" style="left:60%"></div>
  </div>
  <div style="display:flex;justify-content:space-between;width:100%">
    <span class="slider-label">VOL</span>
    <span class="slider-value">60</span>
  </div>
</div>
```

## Size Variants
No explicit size variants. Track height is fixed at 6px.

## Material Variants
- Track: Recessed panel
- Thumb: Glossy panel surface with specular highlight
- Fill: Blue-to-green gradient

## Theme Behavior
- Track uses `--bg-inset` and `--shadow-inset` (adapt per theme)
- Thumb uses surface tokens
- Fill gradient colors are fixed (accent colors)

## Constraints
1. Track MUST be recessed (inset shadow + bg-inset).
2. Fill transition MUST use `--ease-out` for smooth deceleration.
3. Thumb MUST use `transform: translate(-50%, -50%)` for center positioning.
4. Fill and thumb position are set via inline `style` and updated by JS.

## Accessibility
- Add `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`
- Keyboard: Arrow Left/Right to adjust
- Requires JS for drag interaction
