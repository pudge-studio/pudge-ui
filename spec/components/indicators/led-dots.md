---
name: LED Dots
id: led-dots
class: .led-dot
category: indicators
index: 4
materials: []
sizes: [default]
interactive: false
requires_js: false
canvas: false
---

# LED Dots

## Physical Analog
**Reference devices**: Panel-mounted LED indicators on every piece of electronic equipment from this era.
**Mechanism**: A through-hole LED (Light Emitting Diode) mounted in a front-panel hole with a clear or diffused lens cap. Standard sizes were 3mm and 5mm diameter. The LED emits light in a specific color determined by the semiconductor material: red (GaAsP), green (GaP), blue (GaN), amber (AlGaInP). The `box-shadow` glow simulates the LED light illuminating the surrounding panel surface. The `.off` state shows the LED's dark body (visible but not illuminated) -- real unlit LEDs appear as a dark gray/brown disc.

## Geometry

| Property | Value |
|----------|-------|
| Size | 8x8px (default), 6x6px (in clusters) |
| Border radius | 50% (circular) |
| Glow radius | 6px |

## CSS Recipe

### Base (`.led-dot`)
```css
.led-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; vertical-align: middle; }
```

### Color variants
```css
.led-dot.green { background: var(--green-on); box-shadow: 0 0 6px var(--green-on); }
.led-dot.red { background: var(--red-alert); box-shadow: 0 0 6px var(--red-alert); }
.led-dot.blue { background: var(--blue-info); box-shadow: 0 0 6px var(--blue-info); }
.led-dot.amber { background: var(--amber); box-shadow: 0 0 6px var(--amber); }
```

### Off state
```css
.led-dot.off { background: var(--text-muted); opacity: 0.3; box-shadow: none; }
```

### LED Cluster container
```css
.led-cluster { display: flex; gap: 6px; padding: 6px 10px; background: var(--bg-inset); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); }
.led-cluster .led-dot { width: 6px; height: 6px; }
```

## HTML Structure
```html
<!-- Individual LEDs -->
<div class="led-dot green"></div>
<div class="led-dot red"></div>
<div class="led-dot blue"></div>
<div class="led-dot amber"></div>
<div class="led-dot off"></div>

<!-- LED Cluster -->
<div class="led-cluster">
  <div class="led-dot green"></div>
  <div class="led-dot green"></div>
  <div class="led-dot off"></div>
  <div class="led-dot red"></div>
</div>
```

## Size Variants
- Default: 8x8px
- In cluster: 6x6px (automatically smaller)

## Material Variants

| Variant | Class | Color | Glow |
|---------|-------|-------|------|
| Green | `.led-dot.green` | `--green-on` (#33cc66) | Same color, 6px |
| Red | `.led-dot.red` | `--red-alert` (#cc2200) | Same color, 6px |
| Blue | `.led-dot.blue` | `--blue-info` (#4477cc) | Same color, 6px |
| Amber | `.led-dot.amber` | `--amber` (#f5a623) | Same color, 6px |
| Off | `.led-dot.off` | `--text-muted` at 30% | None |

## Theme Behavior
- LED colors are constant across themes (accent colors don't change)
- Off state uses `--text-muted` which swaps between themes
- Glow effect remains constant (LEDs emit light regardless of ambient)

## Constraints
1. MUST be perfectly circular (border-radius: 50%)
2. Active LEDs MUST have matching-color glow at 6px radius
3. Off LEDs MUST be visible (30% opacity muted) -- not hidden
4. Off LEDs MUST NOT have glow (box-shadow: none)
5. Glow uses the LED color directly (not a glow token with reduced opacity)
6. MUST use `vertical-align: middle` for inline alignment with text

## Accessibility
- Include `aria-label` describing the LED state and meaning
- Example: `aria-label="Channel 1: active"` for a green LED
- Color alone must not be the only indicator -- provide context via adjacent labels
- Off LEDs should have `aria-label` indicating the off state
