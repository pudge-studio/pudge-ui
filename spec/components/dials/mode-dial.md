---
name: Mode Dial
id: mode-dial-body
class: .mode-dial-body
category: dials
index: 2
materials: [panel, chrome]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Mode Dial

## Physical Analog
**Reference devices**: Nikon D850 mode dial (P/S/A/M), Canon EOS 5D mode dial, Sony Alpha PASM dial.
**Mechanism**: Detented rotary selector switch with fixed number of positions (typically 6-12 modes). Mechanically limited to defined arc with hard stops. Wiper contact rotates across circular array of fixed contacts on PCB. More assertive detent than encoder (larger ball bearing, stiffer spring).

## Geometry

| Property | Value |
|----------|-------|
| Outer ring | 120x120px, stationary reference with tick marks |
| Inner rotor | 96x96px, rotating knurled element |
| Center cap | inset 20px, displays mode letter |
| Amber notch | 4x18px at top, pointer to selected mode |
| Detent spacing | 360/N degrees (N = number of modes) |

## CSS Recipe

### Wrapper
```css
.mode-dial-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; }
```

### Outer Ring (Stationary Reference)
```css
.mode-dial-outer {
  width: 120px; height: 120px; border-radius: 50%;
  background: #111; border: 2px solid #0a0a0a;
  box-shadow: 0 4px 0 #080808, 0 6px 12px rgba(0,0,0,0.6);
  position: relative; display: flex; align-items: center; justify-content: center;
}
```

### Rotating Inner Body
```css
.mode-dial-body {
  width: 96px; height: 96px; border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, #363636, #1a1a1a 70%);
  border: 2px solid #0a0a0a; position: relative; cursor: pointer;
  box-shadow: 0 2px 0 #0a0a0a, inset 0 1px 0 #444;
}
```

### Position Pointer (Amber Notch)
```css
.mode-dial-notch {
  position: absolute; top: 6px; left: 50%;
  width: 4px; height: 18px;
  background: linear-gradient(to bottom, var(--amber), var(--amber-dim));
  border-radius: 2px; transform: translateX(-50%);
  box-shadow: 0 0 8px var(--amber-glow);
  transition: transform 0.35s var(--spring);
  z-index: 2;
}
```

### Center Cap (Mode Display)
```css
.mode-dial-center {
  position: absolute; inset: 20px; border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #2e2e2e, #161616);
  border: 2px solid #111;
  box-shadow: inset 0 1px 0 #3a3a3a, 0 1px 3px #000;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.mode-dial-label { font-family: var(--font-display); font-size: 13px; color: var(--amber); letter-spacing: 1px; line-height: 1; }
.mode-dial-sub { font-size: 7px; letter-spacing: 1px; color: var(--text-muted); margin-top: 2px; font-family: var(--font-ui); }
```

## HTML Structure
```html
<div class="mode-dial-wrap">
  <div class="mode-dial-outer">
    <div class="mode-dial-body">
      <div class="mode-dial-notch"></div>
      <div class="mode-dial-center">
        <div class="mode-dial-label">M</div>
        <div class="mode-dial-sub">MANUAL</div>
      </div>
    </div>
  </div>
</div>
```

## Size Variants
No explicit size variants. Fixed at 120px outer / 96px inner.

## Material Variants
- Outer ring: Dark recessed housing
- Inner rotor: Lathe-turned surface (radial-gradient with off-center highlight)
- Center cap: Recessed with sunken gradient

## Theme Behavior
- Uses hardcoded dark colors (camera mode dials are always dark metal)
- Amber indicator is fixed
- May need light theme overrides for outer ring contrast

## Constraints
1. Notch transition MUST use `--spring` easing at 0.35s -- overshoot mimics spring-loaded detent snap.
2. Notch is rotated via JS by increments of `360/N` degrees where N = number of modes.
3. Center cap MUST display the current mode letter (updated via JS).
4. Outer ring is STATIONARY -- only the inner body and notch rotate.
5. Off-center highlight at `38% 32%` simulates lathe-turned surface.

## Accessibility
- Add `tabindex="0"` and `role="listbox"` or custom role
- Keyboard: Arrow keys to rotate between modes
- `aria-label` should indicate current mode
- Requires JS for rotation and mode switching
