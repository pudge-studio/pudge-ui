---
name: Dual Range Slider
id: dual-range-track
class: .dual-range-track
category: sliders
index: 4
materials: [panel, glossy]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Dual Range Slider

## Physical Analog
**Reference devices**: Parametric EQ frequency range selectors, audio compressor attack/release range, frequency crossover points.
**Mechanism**: Two independent fader wiper contacts on a single resistive track, defining a range (low/high bound). Fill between thumbs represents selected range. Rare in physical hardware -- UI innovation compressing two controls into one.

## Geometry

| Property | Value |
|----------|-------|
| Track | 100% width x 6px height |
| Thumbs | 14px diameter circles (two of them) |
| Fill | Blue, positioned between thumbs |
| Container width | 180px |

## CSS Recipe

### Wrapper
```css
.dual-range-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 180px; }
```

### Track
```css
.dual-range-track {
  width: 100%; height: 6px; border-radius: 3px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  position: relative; box-shadow: var(--shadow-inset);
}
```

### Fill (Range Between Thumbs)
```css
.dual-range-fill {
  position: absolute; top: 0; height: 100%; border-radius: 2px;
  background: var(--blue-info);
}
```

### Thumbs
```css
.dual-range-thumb {
  position: absolute; top: 50%; width: 14px; height: 14px;
  border-radius: 50%; transform: translate(-50%,-50%);
  background: linear-gradient(155deg, var(--bg-surface), var(--bg-panel));
  box-shadow: 0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 var(--glossy-hi);
  cursor: grab; z-index: 2;
}
```

## HTML Structure
```html
<div class="dual-range-wrap">
  <div class="dual-range-track">
    <div class="dual-range-fill" style="left:25%;width:40%"></div>
    <div class="dual-range-thumb" style="left:25%"></div>
    <div class="dual-range-thumb" style="left:65%"></div>
  </div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Track: Recessed panel
- Thumbs: Glossy panel surface
- Fill: Solid blue

## Theme Behavior
- Track and thumbs adapt via tokens
- Blue fill is fixed

## Constraints
1. Two thumbs MUST be independently draggable.
2. Fill MUST span between the two thumbs (set via `left` and `width`).
3. Thumbs MUST NOT cross each other (low bound cannot exceed high bound).
4. Both thumbs use identical styling.

## Accessibility
- Each thumb should have `role="slider"` with separate `aria-valuenow`
- `aria-label` should distinguish "Range minimum" and "Range maximum"
- Keyboard: Arrow keys to adjust focused thumb
- Requires JS for dual drag interaction
