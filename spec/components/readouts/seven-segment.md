---
name: Seven-Segment Display
id: seven-seg
class: .seven-seg
category: readouts
index: 6
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Seven-Segment Display

## Physical Analog
**Reference devices**: Alarm clock displays (Sony Dream Machine), microwave oven timers, synthesizer BPM displays (Roland TR-909), digital scales.
**Mechanism**: Seven LED segment bars in figure-8 pattern. Each segment is independent LED (red, green, or amber). LEDs behind tinted diffuser window. Glow/bleed from LED light scattering through diffuser. Ghost of unlit segments faintly visible.

## Geometry

| Property | Value |
|----------|-------|
| Digit font | 42px VT323 |
| Digit min-width | 24px |
| Gap between digits | 4px |
| Padding | 10px 16px |

## CSS Recipe

### Container
```css
.seven-seg {
  display: inline-flex; gap: 4px; padding: 10px 16px;
  background: var(--bg-inset); border: 1px solid #1e1e1e;
  border-radius: var(--radius-md);
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.7);
}
```

### Digit (Default: Red)
```css
.seven-seg-digit {
  font-family: var(--font-lcd); font-size: 42px; line-height: 1;
  color: var(--red-alert); text-shadow: 0 0 12px var(--red-glow);
  min-width: 24px; text-align: center;
}
```

### Colon
```css
.seven-seg-colon { font-family: var(--font-lcd); font-size: 42px; color: var(--red-alert); opacity: 0.7; line-height: 1; }
```

### Green Variant
```css
.seven-seg.green .seven-seg-digit { color: var(--green-hi); text-shadow: 0 0 12px var(--green-glow); }
.seven-seg.green .seven-seg-colon { color: var(--green-hi); }
```

### Amber Variant
```css
.seven-seg.amber .seven-seg-digit { color: var(--amber); text-shadow: 0 0 12px var(--amber-glow); }
.seven-seg.amber .seven-seg-colon { color: var(--amber); }
```

## HTML Structure
```html
<!-- Red (default) -->
<div class="seven-seg">
  <span class="seven-seg-digit">1</span><span class="seven-seg-digit">2</span>
  <span class="seven-seg-colon">:</span>
  <span class="seven-seg-digit">4</span><span class="seven-seg-digit">5</span>
</div>

<!-- Green variant -->
<div class="seven-seg green">
  <span class="seven-seg-digit">0</span><span class="seven-seg-digit">3</span>
  <span class="seven-seg-colon">:</span>
  <span class="seven-seg-digit">2</span><span class="seven-seg-digit">1</span>
</div>
```

## Size Variants
No explicit size variants. Fixed at 42px digit size.

## Material Variants

| Color Variant | LED Color |
|---------------|-----------|
| default (red) | Red GaAsP LED |
| `.green` | Green GaP LED |
| `.amber` | Amber AlGaInP LED |

## Theme Behavior
- Container background adapts via `--bg-inset`
- LED colors and glow are fixed (LEDs are LEDs regardless of ambient light)
- Inset shadow at 0.7 opacity (deep recess)

## Constraints
1. Font MUST be `--font-lcd` (VT323) for segmented character shapes.
2. `text-shadow` with accent glow is REQUIRED -- simulates LED light scattering through diffuser.
3. Colon opacity is 0.7 (slightly dimmer than digits).
4. Each digit MUST have `min-width: 24px` and `text-align: center` for stable layout.
5. Inset shadow at 0.7 opacity represents deep diffuser window recess.

## Accessibility
- Read-only display
- Use `aria-label` to describe the displayed value (e.g., "Time: 12:45")
- `aria-live="polite"` for updating displays
