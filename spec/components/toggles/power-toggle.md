---
name: Power Toggle
id: power-toggle
class: .power-toggle
category: toggles
index: 4
materials: [chrome, panel]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Power Toggle

## Physical Analog
**Reference devices**: Rack-mount audio equipment power switches, synthesizer on/off, industrial equipment main power.
**Mechanism**: Heavy-duty slide switch rated for higher current than signal-level switches. Larger than camera toggles, with more substantial detent mechanism. Integrated status LED. Silver-plated contacts rated for 1-3A.

## Geometry

| Property | Value |
|----------|-------|
| Track | 72x34px (much larger than standard toggle) |
| Thumb | 24px diameter |
| Border-radius | 20px |
| ON travel | left: 4px to left: 42px |

## CSS Recipe

### Track
```css
.power-toggle {
  width: 72px; height: 34px; border-radius: 20px;
  position: relative; background: #0b0b0b;
  border: 1px solid #303030; box-shadow: inset 0 2px 8px rgba(0,0,0,0.8);
}
```

### Thumb
```css
.power-toggle-thumb {
  position: absolute; top: 4px; left: 4px;
  width: 24px; height: 24px; border-radius: 50%;
  background: linear-gradient(180deg, #666, #2a2a2a);
  box-shadow: 0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.35);
  transition: left 180ms var(--snap-fast), background 180ms;
}
```

### ON State
```css
.power-toggle.on { background: #0d1a0d; }
.power-toggle.on .power-toggle-thumb {
  left: 42px;
  background: linear-gradient(180deg, #88ff88, #287128);
  box-shadow: 0 0 12px var(--green-glow);
}
```

## HTML Structure
```html
<div class="power-toggle on" data-power-toggle>
  <div class="power-toggle-thumb"></div>
</div>
<span style="font-size:11px;color:var(--green-on);">ONLINE</span>
```

## Size Variants
No explicit size variants. Fixed at 72x34px to represent industrial-grade switch.

## Material Variants
- Track: Deep black recessed surface (nearly black `#0b0b0b`)
- Thumb OFF: Chrome/metallic gradient
- Thumb ON: Green gradient with green glow (power indicator LED)

## Theme Behavior
- Track background is hardcoded dark (`#0b0b0b`) -- industrial power switches are always dark
- ON state track shifts to dark green `#0d1a0d`
- Thumb metallic gradient is fixed
- Green glow on ON state is fixed

## Constraints
1. Track MUST be 72x34px -- significantly larger than standard toggle to convey "main power" weight.
2. Inset shadow MUST be `rgba(0,0,0,0.8)` -- deeper recess than standard toggle (0.4).
3. ON state thumb MUST have prominent green glow (`0 0 12px var(--green-glow)`).
4. Transition timing is 180ms (longer than toggle's 150ms) for heavier feel.
5. Thumb MUST be 24px (larger than toggle's 16px and slide-switch's 20px).

## Accessibility
- Add `tabindex="0"` and `role="switch"` with `aria-checked`
- Keyboard: Space to toggle
- Requires JS to toggle `.on` class
