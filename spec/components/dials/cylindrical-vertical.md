---
name: Cylindrical Dial Vertical
id: dial-v-body
class: .dial-v-body
category: dials
index: 6
materials: [panel, brushed-metal]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Cylindrical Dial Vertical

## Physical Analog
**Reference devices**: Sony Alpha rear thumb wheel, Fujifilm X-T series rear wheel, some Blackmagic camera controls.
**Mechanism**: Same encoder mechanism as horizontal cylindrical dial but oriented vertically and operated by thumb. Thinner profile (8-12mm wide physical) to fit comfortably under thumb pad.

## Geometry

| Property | Value |
|----------|-------|
| Body | 44x120px (narrow and tall) |
| Knurl pattern | Diagonal crosshatch at +/-20 degrees |
| Badge | Centered value display |

## CSS Recipe

### Wrapper
```css
.dial-v-wrap { display: flex; flex-direction: column; align-items: center; position: relative; padding-bottom: 22px; }
.dial-v-label { font-family: var(--font-ui); font-size: 7px; font-weight: 700; letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase; position: absolute; bottom: 0; }
```

### Body
```css
.dial-v-body {
  width: 44px; height: 120px; border-radius: 6px;
  position: relative; cursor: ns-resize; user-select: none;
  background: linear-gradient(90deg, #4a4845, #2a2826);
  border: 1px solid var(--border-mid);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3); overflow: hidden;
}
[data-theme="light"] .dial-v-body { background: linear-gradient(90deg, #d0cec8, #b0aea8); }
```

### Knurl Pattern
```css
.dial-v-body .knurl-cross {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient(20deg, transparent 0px, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px, transparent 3px, transparent 6px),
    repeating-linear-gradient(-20deg, transparent 0px, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px, transparent 3px, transparent 6px);
}
```

### Value Badge
```css
.dial-v-body .dial-badge {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
  font-family: var(--font-display); font-size: 10px; color: var(--text-primary);
  z-index: 3; pointer-events: none;
  background: var(--bg-surface); padding: 2px 6px; border-radius: 3px;
  border: 1px solid var(--border-subtle);
}
```

## HTML Structure
```html
<div class="dial-v-wrap">
  <div class="dial-v-body">
    <div class="knurl-cross"></div>
    <div class="dial-badge">50</div>
  </div>
  <div class="dial-v-label">ISO</div>
</div>
```

## Size Variants
No explicit size variants. Fixed at 44x120px.

## Material Variants
Default metallic surface. No explicit variant classes, but gradient direction is 90deg (horizontal) to simulate curvature of vertical barrel.

## Theme Behavior
- Dark: `linear-gradient(90deg, #4a4845, #2a2826)` -- gradient runs left-to-right for vertical barrel curvature
- Light: `linear-gradient(90deg, #d0cec8, #b0aea8)`
- Badge adapts via surface tokens

## Constraints
1. Gradient MUST run 90deg (horizontal) -- this creates curvature illusion on a vertical barrel.
2. Knurl pattern angles are +/-20deg (shallower than horizontal dial's +/-75deg) for vertical orientation.
3. Cursor MUST be `ns-resize` (vertical scroll interaction).
4. Label is positioned absolutely at bottom of wrapper.

## Accessibility
- Add `tabindex="0"` and `role="slider"`
- Keyboard: Arrow Up/Down to adjust value
- Requires JS for interaction
