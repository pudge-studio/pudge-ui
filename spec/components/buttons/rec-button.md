---
name: REC Button
id: rec-btn
class: .rec-btn
category: buttons
index: 6
materials: [polycarbonate-red]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# REC Button

## Physical Analog
**Reference devices**: Sony FX6/FX9 record button, Canon C300 REC, Panasonic GH5 video record.
**Mechanism**: Momentary push switch (not a toggle -- each press toggles recording state in firmware). Physically distinct: concave surface (dished inward), red-dyed polycarbonate, guard ring prevents accidental activation.

## Geometry

| Property | Value |
|----------|-------|
| Diameter | 12-16mm real / 52px UI |
| Surface | Concave (center 1-2mm lower than rim) |
| Guard ring | Two concentric rings separated by dark gap |
| Radial gradient offset | 38% 32% (upper-left, not centered) |
| Stop square (recording) | 18x18px white square inside |

## CSS Recipe

### Default State
```css
.rec-btn {
  width: 52px; height: 52px; border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, #e83300, #7a0000 75%);
  border: none; outline: none; cursor: pointer; position: relative;
  box-shadow: 0 0 0 3px var(--bg-raised), 0 0 0 5px #333,
              0 3px 0 var(--border-deep), inset 0 1px 0 #ff4422;
  transition: transform 0.07s, box-shadow 0.07s;
}
```

### Active (Pressed) State
```css
.rec-btn:active {
  transform: scale(0.94);
  box-shadow: 0 0 0 3px var(--bg-raised), 0 0 0 5px #333,
              0 1px 0 var(--border-deep), inset 0 1px 0 #881100;
}
```

### Recording State
```css
.rec-btn.recording {
  box-shadow: 0 0 0 3px var(--bg-raised), 0 0 0 5px rgba(204,34,0,0.4),
              0 3px 0 var(--border-deep), inset 0 1px 0 #ff4422, 0 0 18px rgba(204,34,0,0.4);
}
```

### Inner Stop Square
```css
.rec-btn .rec-inner {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%,-50%) scale(0);
  width: 18px; height: 18px; background: #fff;
  border-radius: 3px; transition: transform 0.15s ease; opacity: 0.9;
}
.rec-btn.recording .rec-inner {
  transform: translate(-50%,-50%) scale(1);
  border-radius: 4px; background: #ffdddd;
}
```

## HTML Structure
```html
<button class="rec-btn" id="recBtn">
  <div class="rec-inner"></div>
</button>
<span>STANDBY</span>
```

## Size Variants
No size variants. Fixed at 52x52px.

## Material Variants
Single material: red-dyed polycarbonate with concave radial gradient.

## Theme Behavior
- Guard ring uses `var(--bg-raised)` for the dark gap, adapting to theme
- Red gradient and glow colors are fixed regardless of theme
- `--border-deep` adapts the bottom edge shadow per theme

## Constraints
1. Surface MUST be concave (radial-gradient at 38% 32%, not centered). Concave surfaces reflect light from off-axis.
2. Guard ring MUST use two concentric `box-shadow` rings: `0 0 0 3px bg-raised` (dark gap) then `0 0 0 5px #333` (chrome ring).
3. Press feedback is `scale(0.94)`, NOT `translateY`. Round buttons depress, not shift.
4. Recording glow MUST be 18px radius red glow on the guard ring.
5. Stop square appears via `transform: scale(0 -> 1)` transition, not opacity.

## Accessibility
- Uses native `<button>` element
- Keyboard: Enter/Space to toggle recording state
- ARIA: Should include `aria-pressed` to indicate recording state
- Requires JS to toggle `.recording` class
