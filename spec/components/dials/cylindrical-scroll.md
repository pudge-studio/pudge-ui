---
name: Cylindrical Scroll Dial
id: dial-cylinder
class: .dial-cylinder
category: dials
index: 4
materials: [panel, chrome]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Cylindrical Scroll Dial

## Physical Analog
**Reference devices**: Sony Alpha rear command dial (vertical barrel), Nikon sub-command dial, Canon quick control dial.
**Mechanism**: Incremental encoder packaged as cylindrical barrel rolled with thumb/finger. Textured cylinder partially recessed into camera body. Linear rolling motion on barrel surface, not twisting. Internal mechanism identical to rotary encoder.

## Geometry

| Property | Value |
|----------|-------|
| Barrel | 92x110px |
| Knurl strips | 13px wide on left and right edges |
| Knurl pattern | Longitudinal grip ribs at 5px pitch |
| Value ticks | 28px height each |
| Center bar | 1px amber line at vertical center |

## CSS Recipe

### Wrapper
```css
.dial-cyl-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.dial-cyl-title { font-size: 8px; letter-spacing: 3px; color: var(--text-muted); text-transform: uppercase; font-family: var(--font-ui); font-weight: 600; }
```

### Barrel Body
```css
.dial-cylinder {
  width: 92px; height: 110px; background: #1e1e1e;
  border-radius: var(--radius-sm); border: 1px solid #111;
  overflow: hidden; position: relative; cursor: ns-resize; user-select: none;
  box-shadow: inset 10px 0 16px rgba(0,0,0,0.5), inset -10px 0 16px rgba(0,0,0,0.5),
              0 2px 0 var(--border-deep), inset 0 1px 0 #2a2a2a;
}
[data-theme="light"] .dial-cylinder { background: #e0dcd4; box-shadow: inset 10px 0 16px rgba(0,0,0,0.08), inset -10px 0 16px rgba(0,0,0,0.08), 0 2px 0 var(--border-deep); }
```

### Knurl Grip Strips
```css
.dial-knurl {
  position: absolute; top: 0; bottom: 0; width: 13px; z-index: 3; pointer-events: none;
  background: repeating-linear-gradient(to bottom, #252525 0px, #252525 2px, #0d0d0d 2px, #0d0d0d 5px);
  border: 1px solid #0a0a0a;
}
[data-theme="light"] .dial-knurl { background: repeating-linear-gradient(to bottom, #ccc 0px, #ccc 2px, #aaa 2px, #aaa 5px); border-color: #999; }
.dial-knurl.left { left: 0; border-radius: var(--radius-sm) 0 0 var(--radius-sm); box-shadow: inset -1px 0 4px rgba(0,0,0,0.4); }
.dial-knurl.right { right: 0; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; box-shadow: inset 1px 0 4px rgba(0,0,0,0.4); }
```

### Inner Value List
```css
.dial-inner {
  position: absolute; width: 100%; display: flex; flex-direction: column;
  align-items: center; will-change: top;
}
.dial-tick {
  height: 28px; width: 100%; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 13px; font-weight: 400;
  letter-spacing: 1px; color: var(--text-muted); flex-shrink: 0;
  transition: color 0.1s, font-size 0.1s; padding: 0 16px;
}
.dial-tick.near { color: var(--text-secondary); }
.dial-tick.active { color: var(--amber); font-size: 15px; font-weight: 500; }
```

### Center Selection Bar
```css
.dial-center-bar {
  position: absolute; top: calc(50% - 1px); left: 14px; right: 14px;
  height: 1px; background: var(--amber); opacity: 0.7; z-index: 4;
  pointer-events: none; box-shadow: 0 0 8px var(--amber-glow);
}
```

### Vignette (Top/Bottom Fade)
```css
.dial-vignette {
  position: absolute; inset: 0; z-index: 5; pointer-events: none;
  background: linear-gradient(to bottom, #1e1e1ef0 0%, transparent 35%, transparent 65%, #1e1e1ef0 100%);
}
[data-theme="light"] .dial-vignette { background: linear-gradient(to bottom, #e0dcd4f0 0%, transparent 35%, transparent 65%, #e0dcd4f0 100%); }
```

## HTML Structure
```html
<div class="dial-cyl-wrap">
  <div class="dial-cyl-title">SHUTTER</div>
  <div class="dial-cylinder">
    <div class="dial-knurl left"></div>
    <div class="dial-knurl right"></div>
    <div class="dial-inner" style="top: -28px;">
      <div class="dial-tick">1/30</div>
      <div class="dial-tick">1/60</div>
      <div class="dial-tick near">1/125</div>
      <div class="dial-tick active">1/250</div>
      <div class="dial-tick near">1/500</div>
      <div class="dial-tick">1/1000</div>
      <div class="dial-tick">1/2000</div>
    </div>
    <div class="dial-center-bar"></div>
    <div class="dial-vignette"></div>
  </div>
</div>
```

## Size Variants
No explicit size variants. Fixed at 92x110px.

## Material Variants
Default barrel material with knurled grip strips.

## Theme Behavior
- Dark: `#1e1e1e` barrel, dark knurl pattern, dark vignette
- Light: `#e0dcd4` barrel, light knurl pattern, light vignette
- Vignette gradient MUST exactly match barrel background color for seamless fade
- Side shadow intensity drops from 0.5 to 0.08 in light theme

## Constraints
1. Curvature illusion DEPENDS on side inset shadows. Without them the barrel looks flat. Shadow intensity MUST be 50%+ opacity in dark theme.
2. Vignette gradient MUST exactly match cylinder body background color for seamless fade.
3. Distance-based text hierarchy: `.active` = amber full size, `.near` = secondary, default = muted smaller.
4. Center bar is a FIXED selection indicator (does not scroll with values).
5. Values scroll by moving `.dial-inner` `top` property via JS.

## Accessibility
- Add `tabindex="0"` and `role="slider"` with `aria-valuenow`
- Keyboard: Arrow Up/Down to scroll values
- Cursor: `ns-resize` indicates vertical scroll interaction
- Requires JS for scroll interaction
