---
name: Signal Bars
id: signal-bars
class: .signal-bars
category: meters
index: 8
materials: [panel]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Signal Bars

## Physical Analog
**Reference devices**: Nokia phone signal indicator (universally adopted since ~1998).
**Mechanism**: Received signal strength indication (RSSI) from cellular radio. 5-bar ascending staircase standardized by Nokia. Each bar = one step of signal quality. Bars light left-to-right as signal improves. Unlit bars shown as dim outlines.

## Geometry

| Property | Value |
|----------|-------|
| Container height | 24px |
| Bar width | 4px |
| Bar gap | 3px |
| Bar heights | 6px, 10px, 14px, 18px, 22px (ascending) |

## CSS Recipe

### Container
```css
.signal-bars { display: flex; align-items: flex-end; gap: 3px; height: 24px; }
```

### Bars
```css
.signal-strength-bar { width: 4px; border-radius: 1px; background: var(--green-on); transition: opacity 0.2s; }
.signal-strength-bar:nth-child(1) { height: 6px; }
.signal-strength-bar:nth-child(2) { height: 10px; }
.signal-strength-bar:nth-child(3) { height: 14px; }
.signal-strength-bar:nth-child(4) { height: 18px; }
.signal-strength-bar:nth-child(5) { height: 22px; }
```

### Off State (Dim)
```css
.signal-strength-bar.off { opacity: 0.15; background: var(--text-muted); }
```

## HTML Structure
```html
<div class="signal-bars">
  <div class="signal-strength-bar"></div>
  <div class="signal-strength-bar"></div>
  <div class="signal-strength-bar"></div>
  <div class="signal-strength-bar off"></div>
  <div class="signal-strength-bar off"></div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Active: Solid green
- Off: Muted at 15% opacity

## Theme Behavior
- Green bar color is fixed
- Off state uses `--text-muted` (adapts per theme)

## Constraints
1. Bars MUST ascend left-to-right (6, 10, 14, 18, 22px).
2. Off bars MUST use `.off` class with `opacity: 0.15` and muted color.
3. Always 5 bars total (Nokia convention).
4. Bar border-radius is 1px (minimal rounding).

## Accessibility
- Use `role="img"` with `aria-label` (e.g., "Signal strength: 3 of 5 bars")
