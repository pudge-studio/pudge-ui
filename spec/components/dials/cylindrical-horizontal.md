---
name: Cylindrical Dial Horizontal
id: dial-h-body
class: .dial-h-body
category: dials
index: 5
materials: [panel, brushed-metal, chrome]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Cylindrical Dial Horizontal

## Physical Analog
**Reference devices**: Nikon D850 front/rear command dials, Sony Alpha front dial, Canon EOS main dial (landscape orientation).
**Mechanism**: Identical encoder mechanism to cylindrical scroll, but oriented horizontally. Main command dial on camera grip, operated by index finger. User rolls barrel forward/backward to change values.

## Geometry

| Property | Value |
|----------|-------|
| Barrel | 168x44px (wide and short) |
| Knurl pattern | Diamond crosshatch (two sets of diagonal grooves at 60-75 degrees) |
| Top bevel cap | 13px bright-to-transparent gradient |
| Badge | Centered value display |

## CSS Recipe

### Wrapper
```css
.dial-h { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%; max-width: 190px; }
.dial-h-label { font-family: var(--font-ui); font-size: 7px; font-weight: 700; letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase; }
```

### Body
```css
.dial-h-body {
  width: 168px; height: 44px; border-radius: 6px;
  position: relative; cursor: ew-resize; user-select: none;
  background: linear-gradient(180deg, #4a4845, #2a2826);
  border: 1px solid var(--border-mid);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3); overflow: hidden;
}
[data-theme="light"] .dial-h-body { background: linear-gradient(180deg, #d0cec8, #b0aea8); border-color: #aaa; }
```

### Diamond Knurl Pattern
```css
.dial-h-body .knurl-cross {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient(75deg, transparent 0px, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px, transparent 3px, transparent 6px),
    repeating-linear-gradient(-75deg, transparent 0px, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px, transparent 3px, transparent 6px);
}
```

### Top Bevel Cap
```css
.dial-h-body .dial-cap {
  position: absolute; top: 0; left: 0; right: 0; height: 13px;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%);
  border-bottom: 1px solid rgba(0,0,0,0.12); pointer-events: none;
  border-radius: 6px 6px 0 0;
}
```

### Value Badge
```css
.dial-h-body .dial-badge {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
  font-family: var(--font-display); font-size: 11px; letter-spacing: 1px;
  color: var(--text-primary); z-index: 3; pointer-events: none;
  background: var(--bg-surface); padding: 2px 8px; border-radius: 3px;
  border: 1px solid var(--border-subtle);
}
```

### Material Variants
```css
.dial-h-body.variant-silver {
  background: linear-gradient(180deg, #d8d6d0, #b8b6b0);
  border-color: #a8a6a0;
}
.dial-h-body.variant-chrome {
  background: linear-gradient(180deg, #5a5855, #3a3835);
  border-color: #666;
}
```

## HTML Structure
```html
<div class="dial-h">
  <div class="dial-h-label">EXPOSURE COMP</div>
  <div class="dial-h-body">
    <div class="knurl-cross"></div>
    <div class="dial-cap"></div>
    <div class="dial-badge">+0.7</div>
  </div>
</div>
```

## Size Variants
No explicit size variants. Fixed at 168x44px.

## Material Variants

| Variant | Background | Border |
|---------|-----------|--------|
| default | `linear-gradient(180deg, #4a4845, #2a2826)` | `var(--border-mid)` |
| `.variant-silver` | `linear-gradient(180deg, #d8d6d0, #b8b6b0)` | `#a8a6a0` |
| `.variant-chrome` | `linear-gradient(180deg, #5a5855, #3a3835)` | `#666` |

## Theme Behavior
- Dark default: dark metallic gradient
- Light default: light metallic gradient (`#d0cec8` to `#b0aea8`)
- Silver and chrome variants are fixed (metal doesn't change with theme)
- Badge uses surface tokens for adaptive background

## Constraints
1. Diamond knurl MUST use two overlapping `repeating-linear-gradient` at +75deg and -75deg.
2. Top bevel cap provides the bright line where barrel enters camera body.
3. Cursor MUST be `ew-resize` (horizontal scroll interaction).
4. Badge is centered and positioned above the knurl texture (z-index: 3).

## Accessibility
- Add `tabindex="0"` and `role="slider"`
- Keyboard: Arrow Left/Right to adjust value
- Requires JS for interaction
