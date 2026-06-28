---
name: LED Checkbox
id: led-checkbox
class: .led-checkbox
category: toggles
index: 6
materials: [panel, phosphor]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# LED Checkbox

## Physical Analog
**Reference devices**: Audio mixer channel solo/mute indicators, camera menu checkbox items, synthesizer parameter enable LEDs.
**Mechanism**: PCB-mounted LED indicators with integrated tactile switches. On mixing desks, small square LEDs (3mm x 3mm) double as buttons -- pressing the LED toggles the function. Standard through-hole or SMD LED behind translucent diffuser cap.

## Geometry

| Property | Value |
|----------|-------|
| Checkbox box | 18x18px |
| Check mark (LED) | 8x8px |
| Border-radius | 3px (box), 2px (mark) |
| Gap to label | 8px |

## CSS Recipe

### Container
```css
.led-checkbox {
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none;
}
```

### Checkbox Box (Diffuser Cap)
```css
.led-check-box {
  width: 18px; height: 18px; border-radius: 3px;
  background: var(--bg-inset); border: 1px solid var(--border-mid);
  display: flex; align-items: center; justify-content: center;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
}
```

### Checked State
```css
.led-check-box.checked {
  background: rgba(245,166,35,0.15); border-color: var(--amber);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2), 0 0 8px var(--amber-glow);
}
```

### Check Mark (LED Element)
```css
.led-check-mark {
  width: 8px; height: 8px; border-radius: 2px;
  background: transparent; transition: background 0.15s;
}
.led-check-box.checked .led-check-mark { background: var(--amber); box-shadow: 0 0 6px var(--amber-glow); }
```

### Label
```css
.led-check-label { font-family: var(--font-ui); font-size: 11px; font-weight: 500; color: var(--text-secondary); letter-spacing: 0.5px; }
```

## HTML Structure
```html
<!-- Checked -->
<label class="led-checkbox" data-checkbox>
  <div class="led-check-box checked"><div class="led-check-mark"></div></div>
  <span class="led-check-label">Face Detection</span>
</label>

<!-- Unchecked -->
<label class="led-checkbox" data-checkbox>
  <div class="led-check-box"><div class="led-check-mark"></div></div>
  <span class="led-check-label">Eye AF</span>
</label>
```

## Size Variants
No explicit size variants defined.

## Material Variants
- Box: Recessed cavity (bg-inset with inset shadow) representing diffuser cap
- Check mark: LED element (transparent when off, glowing amber when checked)

## Theme Behavior
- Box background, borders swap via tokens
- Checked state amber glow is fixed across themes
- Inset shadow opacity reduces in light theme via `--shadow-inset`

## Constraints
1. Check mark MUST be invisible when unchecked (background: transparent).
2. Checked state MUST include amber glow on both box AND mark -- simulates LED illumination.
3. Box inset shadow represents the cavity the LED sits within.
4. Border changes to amber on checked state to simulate illuminated housing.

## Accessibility
- Uses `<label>` wrapper for click-to-toggle behavior
- Add hidden `<input type="checkbox">` for form semantics, or use `role="checkbox"` with `aria-checked`
- Keyboard: Space to toggle when focused
- Requires JS to toggle `.checked` class
