---
name: Oscilloscope
id: oscilloscope
class: .oscilloscope
category: meters
index: 14
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: true
canvas: true
---

# Oscilloscope

## Physical Analog
**Reference devices**: Tektronix analog oscilloscopes, audio test equipment, synthesizer waveform monitors.
**Mechanism**: Cathode ray tube (CRT) display. Electron beam deflected by input signal (vertical) while swept horizontally at constant rate. Beam strikes P31 phosphor screen which glows briefly, creating trailing afterglow effect.

## Geometry

| Property | Value |
|----------|-------|
| Container | 200x80px |
| Center line | 1px at 50% height (zero-voltage reference) |
| Canvas | Full container size |

## CSS Recipe

### Container
```css
.oscilloscope {
  width: 200px; height: 80px; background: var(--bg-inset);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.5); position: relative; overflow: hidden;
}
```

### Zero Reference Line
```css
.oscilloscope-line {
  position: absolute; top: 50%; left: 0; right: 0; height: 1px;
  background: rgba(102,255,102,0.15);
}
```

### Canvas
```css
.oscilloscope canvas { display: block; width: 100%; height: 100%; }
```

## HTML Structure
```html
<div class="oscilloscope">
  <div class="oscilloscope-line"></div>
  <canvas width="200" height="80" id="oscCanvas"></canvas>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
Single material: Phosphor screen (CRT display).

## Theme Behavior
- Container adapts via tokens
- Phosphor green color is fixed
- Center line green tint is fixed

## Constraints
1. Background fade (`rgba(14,12,10,0.3)` fill each frame) simulates phosphor decay -- previous trace fades gradually.
2. Trace color MUST be green (`rgba(102,255,102,0.8)`) matching P31 phosphor.
3. Canvas `shadowBlur` of 4px green simulates phosphor glow/bloom.
4. Center reference line is ALWAYS faintly visible (zero-voltage reference), even with no signal.
5. Animation uses `requestAnimationFrame` loop.
6. Waveform: `sin(x*0.06 + t)` + harmonics with time offset.

## Accessibility
- Use `role="img"` with `aria-label` on the canvas
- Provide text description of the waveform if informational
- Consider `prefers-reduced-motion` to pause animation
- Requires JS for canvas animation
