---
name: Gauge Semicircular
id: gauge-semi
class: .gauge-semi
category: meters
index: 12
materials: [panel, chrome]
sizes: [md]
interactive: false
requires_js: true
canvas: false
---

# Gauge Semicircular

## Physical Analog
**Reference devices**: Analog VU meters (Dorrough, Sifam), vintage radio signal strength meters, ammeter/voltmeter panel meters.
**Mechanism**: D'Arsonval moving-coil galvanometer. Lightweight coil in permanent magnet field. Current through coil creates rotation. Needle attached to coil moves across calibrated scale. Hairspring provides restoring force. Jeweled bearing (sapphire) at pivot.

## Geometry

| Property | Value |
|----------|-------|
| Container | 160x90px semicircle |
| Needle | 2px wide x 70px tall |
| Pivot | 10px diameter at bottom center |
| Scale arc | 90-120 degrees |
| Needle range | -60deg to +60deg |

## CSS Recipe

### Container (Faceplate)
```css
.gauge-semi {
  width: 160px; height: 90px; position: relative;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  border-radius: 80px 80px 0 0; overflow: hidden;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.5);
}
```

### Scale Arc
```css
.gauge-semi-scale {
  position: absolute; inset: 8px; inset-block-end: 0; border-radius: 72px 72px 0 0;
  border: 1px solid var(--border-mid); border-bottom: none;
}
```

### Needle
```css
.gauge-semi-needle {
  position: absolute; bottom: 0; left: 50%; width: 2px; height: 70px;
  background: linear-gradient(0deg, var(--red-alert), transparent 20%, var(--text-primary) 20%);
  transform-origin: bottom center; transform: rotate(-60deg);
  transition: transform 0.5s var(--spring);
  z-index: 2;
}
```

### Pivot Bearing
```css
.gauge-semi-pivot {
  position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
  width: 10px; height: 10px; border-radius: 50%;
  background: radial-gradient(circle, #666, #222);
  z-index: 3;
}
```

### Scale Labels
```css
.gauge-semi-labels {
  position: absolute; bottom: 6px; left: 10px; right: 10px;
  display: flex; justify-content: space-between;
  font-family: var(--font-ui); font-size: 7px; color: var(--text-muted);
}
```

## HTML Structure
```html
<div class="gauge-semi">
  <div class="gauge-semi-scale"></div>
  <div class="gauge-semi-needle" style="transform:rotate(-20deg)"></div>
  <div class="gauge-semi-pivot"></div>
  <div class="gauge-semi-labels"><span>-20</span><span>VU</span><span>+3</span></div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Faceplate: Recessed panel
- Needle: Red-tipped indicator
- Pivot: Metallic radial gradient (jeweled bearing)

## Theme Behavior
- Faceplate adapts via tokens
- Needle tip red and body color adapt via `--red-alert` and `--text-primary`
- Pivot metallic gradient is fixed

## Constraints
1. Needle MUST use `transform-origin: bottom center` for pivot rotation.
2. Needle rotation range is -60deg to +60deg (set via `transform: rotate(Ndeg)`).
3. Transition MUST use `--spring` easing for ballistic needle movement (overshoot).
4. Needle gradient has red tip at bottom 20% -- the visible tip of the pointer.
5. Pivot is positioned at `bottom: -4px` to appear as center pivot point.

## Accessibility
- Use `role="meter"` with `aria-valuenow`
- `aria-label` should describe the measured value
- Requires JS to update needle rotation
