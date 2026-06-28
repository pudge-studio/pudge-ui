---
name: Range Fader
id: fader-h-track
class: .fader-h-track
category: sliders
index: 3
materials: [chrome, panel]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Range Fader

## Physical Analog
**Reference devices**: Mackie mixer channel faders, Behringer mixer faders, SSL console faders.
**Mechanism**: Linear slide potentiometer. Wiper moves in straight line along conductive plastic track. Rectangular thumb grip with horizontal groove for tactile feedback. Fader body has 8-12mm x 4-6mm cross-section.

## Geometry

| Property | Value |
|----------|-------|
| Track | 100% width x 8px height (thicker than volume slider) |
| Thumb | 22x14px rectangular (NOT circular) |
| Thumb radius | 3px (rounded rectangle) |
| Fill | Amber (solid, not gradient) |
| Container width | 180px |

## CSS Recipe

### Wrapper
```css
.fader-h-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 180px; }
```

### Track
```css
.fader-h-track {
  width: 100%; height: 8px; border-radius: 4px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  position: relative; box-shadow: var(--shadow-inset);
}
```

### Fill
```css
.fader-h-fill {
  position: absolute; top: 0; left: 0; height: 100%; border-radius: 3px;
  background: var(--amber); transition: width 0.1s;
}
```

### Thumb (Fader Cap)
```css
.fader-h-thumb {
  position: absolute; top: 50%; width: 22px; height: 14px;
  border-radius: 3px; transform: translate(-50%,-50%);
  background: linear-gradient(180deg, #666, #333);
  box-shadow: 0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 #888;
  cursor: grab; z-index: 2;
}
.fader-h-thumb::after {
  content: ''; position: absolute; top: 50%; left: 4px; right: 4px;
  height: 1px; background: #999; transform: translateY(-50%);
}
```

## HTML Structure
```html
<div class="fader-h-wrap">
  <div class="fader-h-track">
    <div class="fader-h-fill" style="width:45%"></div>
    <div class="fader-h-thumb" style="left:45%"></div>
  </div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Track: Recessed panel
- Thumb: Chrome/metallic gradient with center groove line (`::after`)

## Theme Behavior
- Track adapts via tokens
- Thumb metallic gradient is fixed (metal fader cap)
- Amber fill is fixed

## Constraints
1. Thumb MUST be rectangular (22x14px, border-radius: 3px), NOT circular. This is a console fader, not a touch slider.
2. Center groove line (`::after`) on thumb is REQUIRED for finger positioning reference.
3. Fill MUST be solid amber (not gradient) -- represents the active signal level.
4. Track is 8px (thicker than volume slider's 6px) -- fader tracks are wider.

## Accessibility
- Add `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Keyboard: Arrow Left/Right to adjust
- Requires JS for drag interaction
