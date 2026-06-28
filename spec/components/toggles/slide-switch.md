---
name: Slide Switch
id: slide-track
class: .slide-track
category: toggles
index: 2
materials: [panel, glossy]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Slide Switch

## Physical Analog
**Reference devices**: iPod Classic hold switch, iPhone original silent/ring switch, Sony Walkman play/hold slider.
**Mechanism**: Functionally identical to toggle switch (SPDT wiper contact) but with larger, more ergonomic sliding element designed for finger operation (not thumbnail). iPod hold switch used gold-colored metal slider in milled aluminum channel.

## Geometry

| Property | Value |
|----------|-------|
| Track | 52x26px (larger than toggle's 46x22px) |
| Thumb | 20px diameter (larger than toggle's 16px) |
| Border-radius | 13px (half of height) |
| Travel | 26px (left: 2px to left: 28px) |

## CSS Recipe

### Container
```css
.slide-switch { display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; user-select: none; }
```

### Track
```css
.slide-track {
  width: 52px; height: 26px; border-radius: 13px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  position: relative; transition: background 0.2s, border-color 0.2s;
  box-shadow: var(--shadow-inset);
}
```

### Track ON State
```css
.slide-track.on { background: linear-gradient(180deg, #1a2a1a, #0d1a0d); border-color: var(--green-on); }
[data-theme="light"] .slide-track.on { background: linear-gradient(180deg, #c0e8c0, #a0d8a0); border-color: #66bb66; }
```

### Thumb
```css
.slide-thumb {
  position: absolute; top: 2px; left: 2px;
  width: 20px; height: 20px; border-radius: 50%;
  background: linear-gradient(155deg, var(--bg-surface), var(--bg-panel));
  box-shadow: 0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 var(--glossy-hi);
  transition: left 0.18s var(--snap-fast), background 0.2s;
}
```

### Thumb ON State
```css
.slide-track.on .slide-thumb {
  left: 28px;
  background: linear-gradient(155deg, #66ff66, #228833);
  box-shadow: 0 1px 3px rgba(0,0,0,0.3), 0 0 8px var(--green-glow);
}
```

### Label
```css
.slide-label {
  font-family: var(--font-ui); font-size: 9px; font-weight: 500;
  letter-spacing: 1px; color: var(--text-muted);
}
.slide-track.on ~ .slide-label { color: var(--green-on); }
```

## HTML Structure
```html
<div class="slide-switch" data-toggle>
  <div class="slide-track">
    <div class="slide-thumb"></div>
  </div>
  <span class="slide-label">SILENT</span>
</div>

<!-- ON state -->
<div class="slide-switch" data-toggle>
  <div class="slide-track on">
    <div class="slide-thumb"></div>
  </div>
  <span class="slide-label">RING</span>
</div>
```

## Size Variants
No explicit size variants defined. Key difference from toggle-switch is the larger default size.

## Material Variants
- Track: Recessed panel
- Thumb OFF: Panel surface gradient with glossy highlight
- Thumb ON: Bright green gradient with glow

## Theme Behavior
- Dark ON track: `linear-gradient(180deg, #1a2a1a, #0d1a0d)` with green border
- Light ON track: `linear-gradient(180deg, #c0e8c0, #a0d8a0)` with lighter green border
- Thumb uses surface tokens, adapting automatically

## Constraints
1. Track MUST be 52x26px -- larger than toggle for thumb/finger operation.
2. Thumb MUST be 20px (not 16px like toggle) for ergonomic blind operation.
3. Slide transition MUST be 0.18s (slightly slower than toggle's 0.15s).
4. ON state track MUST use a gradient (not flat color) unlike the simpler toggle.

## Accessibility
- Add `tabindex="0"` and `role="switch"` with `aria-checked`
- Keyboard: Space to toggle
- Requires JS to toggle `.on` class
