---
name: Rotary Encoder
id: rotary
class: .rotary
category: dials
index: 1
materials: [panel, chrome]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Rotary Encoder

## Physical Analog
**Reference devices**: Behringer DJX700 browse knob, Akai MPC2000 data wheel, Roland SP-404 volume, Mackie mixer pan/aux knobs.
**Mechanism**: Incremental optical or mechanical rotary encoder. Unlike a potentiometer, can rotate infinitely. Slotted disc generates quadrature pulses, typically 16-24 detents per revolution. Ball bearing on spring presses against machined notches for click-click-click feel.

## Geometry

| Property | Value |
|----------|-------|
| Knob body | 100x100px, machined aluminum or molded plastic |
| Knurled edge | 8px ring around body (repeating-conic-gradient) |
| Center cap | inset 22px from all sides |
| Indicator notch | 4x20px amber bar at 12 o'clock |
| Detent per revolution | 16-24 clicks |

## CSS Recipe

### Wrapper
```css
.rotary-wrap { display: flex; align-items: center; gap: 24px; }
```

### Knob Body
```css
.rotary {
  width: 100px; height: 100px; border-radius: 50%;
  position: relative; cursor: pointer;
  background: radial-gradient(circle at 35% 30%, #4b4b4b, #1b1b1b 70%);
  border: 2px solid #0c0c0c;
  box-shadow: 0 4px 0 #090909, inset 0 1px 0 #666, 0 8px 20px rgba(0,0,0,0.4);
  transition: transform 220ms var(--snap-fast);
}
```

### Hover (One Detent Click)
```css
.rotary:hover { transform: rotate(8deg); }
```

### Knurled Edge Ring
```css
.rotary::before {
  content: ''; position: absolute; inset: -8px; border-radius: 50%;
  background: repeating-conic-gradient(#202020 0deg 4deg, #0d0d0d 4deg 8deg);
  z-index: -1;
}
```

### Position Indicator Notch
```css
.rotary-notch {
  position: absolute; top: 10px; left: 50%;
  width: 4px; height: 20px; transform: translateX(-50%);
  border-radius: 10px;
  background: linear-gradient(180deg, #ffc14d, #b56b00);
  box-shadow: 0 0 14px var(--amber-glow);
}
```

### Center Cap (Shaft Nut Cover)
```css
.rotary-center {
  position: absolute; inset: 22px; border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #2c2c2c, #141414);
  display: flex; align-items: center; justify-content: center;
  border: 1px solid #2c2c2c;
}
.rotary-text { font-family: var(--font-display); color: var(--amber); font-size: 14px; }
```

## HTML Structure
```html
<div class="rotary-wrap">
  <div class="rotary">
    <div class="rotary-notch"></div>
    <div class="rotary-center"><div class="rotary-text">AUX</div></div>
  </div>
</div>
```

## Size Variants
No explicit size variants defined. Fixed at 100x100px.

## Material Variants
- Body: Machined aluminum look (radial-gradient with off-center highlight)
- Knurled edge: Conic gradient simulating diamond-pattern cut
- Center cap: Recessed metallic cap

## Theme Behavior
- Knob body uses hardcoded dark grays (metal is always dark/reflective)
- Amber indicator and glow are fixed
- Shadow depths may need lightening in light theme

## Constraints
1. Off-center highlight (`circle at 35% 30%`) is REQUIRED -- simulates domed/convex top catching light.
2. Knurled edge MUST use `repeating-conic-gradient` at 4deg intervals.
3. Hover rotation of 8deg simulates one detent click -- provides immediate feedback.
4. Position indicator (notch) MUST be at 12 o'clock position, rotated via JS.
5. Shadow stack MUST include both bottom edge (`0 4px 0`) AND ambient (`0 8px 20px`).

## Accessibility
- Add `tabindex="0"` and `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Keyboard: Arrow keys to rotate (increment/decrement)
- Requires JS for rotation interaction and value updates
