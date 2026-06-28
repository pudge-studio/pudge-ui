---
name: D-Pad
id: d-pad
class: .dpad
category: navigation
index: 4
materials: [rubber]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# D-Pad

## Physical Analog
**Reference devices**: Game Boy Advance, Nintendo DS, Sony PSP, Nokia N-Gage.
**Mechanism**: A cross-shaped rocker pad (directional pad). The D-pad is a single injection-molded plastic cross that sits over four individual dome switches arranged at the cardinal points. The cross pivots on a central post -- pressing one arm tilts the cross to actuate the dome switch beneath that arm. The other arms lift slightly. Only one dome switch can be activated at a time in a pure D-pad design (some allow diagonals by pressing two adjacent arms).

## Geometry

| Property | Value |
|----------|-------|
| Container | 110x110px, position relative |
| Arm width (up/down) | 26x22px |
| Arm width (left/right) | 22x26px |
| Center button | 24x24px, circular |
| Travel | 1px in pressed direction |
| Cross span | ~20mm arm-to-arm |
| Arm material | Rubber (matte) |

## CSS Recipe

### Container (`.dpad`)
```css
.dpad { width: 110px; height: 110px; position: relative; }
```

### Arms (`.dpad-arm`)
```css
.dpad-arm {
  position: absolute; border: none; cursor: pointer;
  background: linear-gradient(180deg, var(--rubber-hi), var(--rubber-bg));
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted); font-size: 12px;
  transition: transform 0.05s, box-shadow 0.05s, color 0.1s;
}
```

### Active (pressed)
```css
.dpad-arm:active { box-shadow: 0 1px 0 var(--border-deep); color: var(--blue-info); }
```

### Directional positioning
```css
.dpad-arm.up { top: 0; left: 50%; transform: translateX(-50%); width: 26px; height: 22px; border-radius: 4px 4px 0 0; }
.dpad-arm.down { bottom: 0; left: 50%; transform: translateX(-50%); width: 26px; height: 22px; border-radius: 0 0 4px 4px; }
.dpad-arm.left { left: 0; top: 50%; transform: translateY(-50%); width: 22px; height: 26px; border-radius: 4px 0 0 4px; }
.dpad-arm.right { right: 0; top: 50%; transform: translateY(-50%); width: 22px; height: 26px; border-radius: 0 4px 4px 0; }
```

### Directional press animations
```css
.dpad-arm.up:active { transform: translateX(-50%) translateY(1px); }
.dpad-arm.down:active { transform: translateX(-50%) translateY(-1px); }
.dpad-arm.left:active { transform: translateY(-50%) translateX(1px); }
.dpad-arm.right:active { transform: translateY(-50%) translateX(-1px); }
```

### Center button (`.dpad-center`)
```css
.dpad-center {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 24px; height: 24px; border-radius: 50%;
  background: linear-gradient(155deg, var(--bg-surface), var(--bg-panel));
  box-shadow: 0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 var(--glossy-hi);
  border: none; cursor: pointer; z-index: 2;
  transition: transform 0.07s var(--snap-fast);
}
.dpad-center:active { transform: translate(-50%,-50%) scale(0.9); }
```

## HTML Structure
```html
<div class="dpad">
  <button class="dpad-arm up">&#9650;</button>
  <button class="dpad-arm down">&#9660;</button>
  <button class="dpad-arm left">&#9664;</button>
  <button class="dpad-arm right">&#9654;</button>
  <button class="dpad-center"></button>
</div>
```

## Size Variants
No size variants defined. Single default size matching Game Boy proportions.

## Material Variants
- Arms use rubber material (matte, `--rubber-hi`/`--rubber-bg` gradient)
- Center button uses glossy polycarbonate (brighter highlight, `--glossy-hi`)

## Theme Behavior
- Rubber tokens swap: dark `#3a3835`/`#2a2826`, light `#d8d4cc`/`#c8c4bc`
- Center button adapts via surface/panel tokens
- Shadow depth reduces in light mode

## Constraints
1. MUST press in the direction of the arrow (up arm moves down 1px, etc.)
2. MUST use rubber material gradient on arms (matte, low highlight opacity 0.08)
3. Center button MUST be circular and use glossy material
4. Center button MUST sit at z-index 2 above the arms
5. Arms MUST have rounded corners only on their outward-facing edges
6. MUST NOT allow more than one arm to appear pressed simultaneously (pure D-pad)
7. Travel MUST be exactly 1px in the pressed direction

## Accessibility
- Each arm should be a `<button>` element
- Arms should have `aria-label` describing direction ("Up", "Down", "Left", "Right")
- Center button should have `aria-label="Select"`
- Support keyboard arrow keys mapped to corresponding arm actions
