---
name: Toggle Switch
id: toggle-track
class: .toggle-track
category: toggles
index: 1
materials: [panel, chrome]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Toggle Switch

## Physical Analog
**Reference devices**: Nikon lens VR switch (ON/OFF), Sony Alpha AF/MF toggle, Canon EOS stabilizer switch.
**Mechanism**: SPDT slide switch (Single Pole, Double Throw). Plastic or metal slider moves linearly along a track between two positions. Metal wiper contact bridges different PCB trace pairs. Ball-and-spring detent mechanism holds slider in each position with positive click.

## Geometry

| Property | Value |
|----------|-------|
| Track | 46x22px, milled rectangular channel, 2-3mm deep |
| Thumb | 16px diameter, 4-5mm protruding above track |
| Travel | 24px (left: 2px to left: 26px) |
| Detent force | 100-200gf |

## CSS Recipe

### Track (Container)
```css
.toggle-track {
  width: 46px; height: 22px; border-radius: 11px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  position: relative; transition: background 0.2s, border-color 0.2s;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.4);
}
```

### Track ON State
```css
.toggle-track.on { background: #0d1a0d; border-color: #1a4a1a; }
[data-theme="light"] .toggle-track.on { background: #d0f0d0; border-color: #88cc88; }
```

### Thumb (Slider Knob)
```css
.toggle-thumb {
  position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px; border-radius: 50%;
  background: linear-gradient(155deg, #585858, #2a2a2a);
  box-shadow: 0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 #686868;
  transition: left 0.15s var(--snap-fast), background 0.2s, box-shadow 0.2s;
}
```

### Thumb Light Theme
```css
[data-theme="light"] .toggle-thumb {
  background: linear-gradient(155deg, #eee, #ccc);
  box-shadow: 0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 #fff;
}
```

### Thumb ON State
```css
.toggle-track.on .toggle-thumb {
  left: 26px;
  background: linear-gradient(155deg, var(--green-hi), var(--green-on));
  box-shadow: 0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 #aaff99, 0 0 8px var(--green-glow);
}
```

### Label
```css
.toggle-label {
  font-size: 8px; letter-spacing: 2px; color: var(--text-muted);
  transition: color 0.2s; text-transform: uppercase;
  font-family: var(--font-ui); font-weight: 500;
}
.toggle-track.on ~ .toggle-label { color: var(--green-on); }
```

### Wrapper
```css
.toggle-wrap {
  display: flex; flex-direction: column; align-items: center;
  gap: 6px; cursor: pointer;
}
```

## HTML Structure
```html
<div class="toggle-wrap" data-toggle>
  <div class="toggle-track">
    <div class="toggle-thumb"></div>
  </div>
  <span class="toggle-label">OFF</span>
</div>

<!-- ON state -->
<div class="toggle-wrap" data-toggle>
  <div class="toggle-track on">
    <div class="toggle-thumb"></div>
  </div>
  <span class="toggle-label">STAB</span>
</div>
```

## Size Variants
No explicit size variants defined.

## Material Variants
- Track: Recessed panel material
- Thumb OFF: Metallic gradient (dome catching light from upper-left)
- Thumb ON: Green gradient with green glow (embedded status LED)

## Theme Behavior
- Dark OFF thumb: `linear-gradient(155deg, #585858, #2a2a2a)` with strong shadow
- Light OFF thumb: `linear-gradient(155deg, #eee, #ccc)` with softer shadow
- Dark ON track: `#0d1a0d` (dark green)
- Light ON track: `#d0f0d0` (light green)

## Constraints
1. Thumb travel MUST be exactly `left: 2px` (OFF) to `left: 26px` (ON) -- 24px travel.
2. Detent snap MUST use `--snap-fast` easing (overshoot simulates detent spring).
3. ON state thumb MUST include green glow (`0 0 8px var(--green-glow)`) for LED effect.
4. Track border-radius MUST be half of height (11px) for capsule shape.
5. Inset shadow on track MUST be `rgba(0,0,0,0.4)` -- shallow recess.

## Accessibility
- Add `tabindex="0"` and `role="switch"` with `aria-checked` on toggle-wrap
- Keyboard: Space to toggle
- Requires JS to toggle `.on` class on track
