---
name: VU Meter
id: vu-meter
class: .vu-meter
category: meters
index: 3
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# VU Meter

## Physical Analog
**Reference devices**: Tascam 424 cassette portastudio, Mackie mixer channel meters, Yamaha mixer LED meters.
**Mechanism**: Volume Unit meter displaying audio signal level. Standardized ballistic response (300ms integration time) representing perceived loudness. Green-to-amber-to-red gradient: green = safe, amber = approaching 0dBVU, red = clipping.

## Geometry

| Property | Value |
|----------|-------|
| Container height | 80px |
| Bar width | 12px |
| Bar gap | 4px |
| Bar gradient | Red top, amber middle, green bottom |

## CSS Recipe

### Wrapper
```css
.vu-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
```

### Container
```css
.vu-meter { display: flex; align-items: flex-end; gap: 4px; height: 80px; }
```

### Bar
```css
.vu-bar {
  width: 12px; border-radius: 2px 2px 0 0;
  background: linear-gradient(180deg, #ff4444, #ffaa00 50%, #44cc66);
  min-height: 4px;
}
```

### Label
```css
.vu-label { font-family: var(--font-ui); font-size: 8px; font-weight: 500; letter-spacing: 2px; color: var(--text-muted); }
```

## HTML Structure
```html
<div class="vu-wrap">
  <div class="vu-meter">
    <div class="vu-bar" style="height:55%"></div>
    <div class="vu-bar" style="height:75%"></div>
    <div class="vu-bar" style="height:90%"></div>
    <div class="vu-bar" style="height:60%"></div>
    <div class="vu-bar" style="height:40%"></div>
    <div class="vu-bar" style="height:70%"></div>
  </div>
  <span class="vu-label">L CHANNEL</span>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
Single gradient bar style. The tri-color gradient automatically shows correct color at any height.

## Theme Behavior
- Bar gradient colors are fixed (LED colors)
- Label adapts via `--text-muted`

## Constraints
1. Bar gradient MUST be `linear-gradient(180deg, #ff4444, #ffaa00 50%, #44cc66)` -- single gradient per bar automatically creates correct color at any height.
2. Bars align to bottom (`flex-end`).
3. Minimum height of 4px ensures bars are always visible.
4. Border-radius only on top corners.

## Accessibility
- Use `role="img"` with `aria-label` describing the levels
- Or `aria-hidden="true"` if paired with numeric readout
