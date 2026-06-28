---
name: Device Bezel
id: device-bezel
class: .device-bezel
category: overlays
index: 4
materials: [brushed-metal, glass]
sizes: [default]
interactive: false
requires_js: false
canvas: true
---

# Device Bezel

## Physical Analog
**Reference devices**: iPod face bezel, Game Boy front frame, Nokia phone screen bezel.
**Mechanism**: The frame surrounding a display or touch surface. The bezel is typically a plastic or metal frame that covers the gap between the display glass and the device chassis. The bezel protects the display edges and provides structural support. The double-border styling (outer solid border + inner glossy ring via `inset 0 0 0 1px glossy-hi`) represents the stepped profile of a real bezel: outer wall -> step down -> inner wall -> display surface.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 16px |
| Border | 2px solid |
| Border radius | `--radius-lg` (14px) |

## CSS Recipe

### Default (`.device-bezel`)
```css
.device-bezel {
  padding: 16px; border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--bg-raised), var(--bg-surface));
  border: 2px solid var(--border-mid);
  box-shadow: var(--shadow-deep), inset 0 0 0 1px var(--glossy-hi);
}
```

### Translucent variant (`.device-bezel.translucent`)
```css
.device-bezel.translucent {
  background: rgba(255,255,255,0.04); backdrop-filter: blur(8px);
  border: 1px solid var(--border-subtle);
}
```

## HTML Structure
```html
<div class="device-bezel" style="width:160px;height:100px;display:flex;align-items:center;justify-content:center">
  <span style="font-family:var(--font-display);font-size:9px;color:var(--text-muted);letter-spacing:2px">DISPLAY AREA</span>
</div>
```

## Size Variants
No size variants defined. Dimensions set by content or parent.

## Material Variants

| Variant | Class | Description |
|---------|-------|-------------|
| Default | `.device-bezel` | Opaque metal/plastic bezel with gradient |
| Translucent | `.device-bezel.translucent` | Frosted glass bezel with backdrop-filter |

## Theme Behavior
- Background gradient adapts via theme tokens
- Border adapts via `--border-mid`
- Inner glossy ring adapts via `--glossy-hi`
- Shadow adapts via `--shadow-deep`
- Translucent variant uses fixed rgba values

## Constraints
1. MUST use 2px border (thicker than standard 1px to represent the physical bezel lip)
2. MUST include inner glossy ring (`inset 0 0 0 1px glossy-hi`) for the stepped profile
3. MUST use `--shadow-deep` for elevation
4. MUST use `--radius-lg` for device-proportioned corner radius
5. Translucent variant MUST use `backdrop-filter: blur(8px)` and semi-transparent background
6. Translucent variant MUST reduce border to 1px and change to `--border-subtle`

## Accessibility
- Use as a container element with `role="region"` or `<section>`
- Add `aria-label` describing the display area
- Content within the bezel should be independently accessible
