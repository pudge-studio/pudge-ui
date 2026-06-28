---
name: Radio Button
id: radio-wrap
class: .radio-wrap
category: toggles
index: 7
materials: [panel, phosphor]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Radio Button

## Physical Analog
**Reference devices**: Camera drive mode selector (single/continuous/timer), tape deck speed selector (3.75/7.5 IPS), synthesizer waveform selector.
**Mechanism**: Rotary detented selector adapted to linear layout. Mutually exclusive options with circular indicator dot within recessed ring -- resembling sighting dot on a rotary selector's face that aligns with position markings.

## Geometry

| Property | Value |
|----------|-------|
| Outer ring | 18x18px, circular |
| Inner dot | 8x8px, circular |
| Border width | 2px on outer ring |
| Gap to label | 8px |

## CSS Recipe

### Container
```css
.radio-wrap { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; }
```

### Outer Ring (Selector Housing)
```css
.radio-dot-outer {
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--bg-inset); border: 2px solid var(--border-mid);
  display: flex; align-items: center; justify-content: center;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);
  transition: border-color 0.15s, box-shadow 0.15s;
}
```

### Inner Dot (Indicator)
```css
.radio-dot-inner {
  width: 8px; height: 8px; border-radius: 50%;
  background: transparent; transition: background 0.15s, box-shadow 0.15s;
}
```

### Selected State
```css
.radio-dot-outer.selected { border-color: var(--amber); box-shadow: inset 0 1px 2px rgba(0,0,0,0.2), 0 0 6px var(--amber-glow); }
.radio-dot-outer.selected .radio-dot-inner { background: var(--amber); box-shadow: 0 0 6px var(--amber-glow); }
```

### Label
```css
.radio-label { font-family: var(--font-ui); font-size: 11px; font-weight: 500; color: var(--text-secondary); letter-spacing: 0.5px; }
```

## HTML Structure
```html
<div data-radio-group>
  <label class="radio-wrap">
    <div class="radio-dot-outer selected"><div class="radio-dot-inner"></div></div>
    <span class="radio-label">Single Shot</span>
  </label>
  <label class="radio-wrap">
    <div class="radio-dot-outer"><div class="radio-dot-inner"></div></div>
    <span class="radio-label">Continuous Hi</span>
  </label>
  <label class="radio-wrap">
    <div class="radio-dot-outer"><div class="radio-dot-inner"></div></div>
    <span class="radio-label">Timer 10s</span>
  </label>
</div>
```

## Size Variants
No explicit size variants defined.

## Material Variants
- Outer ring: Recessed selector housing (bg-inset)
- Inner dot: Illuminated indicator (amber when selected, transparent when not)

## Theme Behavior
- Outer ring background and border swap via tokens
- Selected state amber glow is fixed across themes
- Inset shadow adapts via tokens

## Constraints
1. Only ONE radio in a group can be `.selected` at a time (mutually exclusive).
2. Inner dot MUST be transparent when not selected.
3. Selected state MUST include amber glow on both outer ring and inner dot.
4. Outer ring uses 2px border (thicker than checkbox's 1px) for circular housing.

## Accessibility
- Wrap group in `[data-radio-group]` with `role="radiogroup"`
- Each option uses `role="radio"` with `aria-checked`
- Keyboard: Arrow keys to navigate within group, Space to select
- Requires JS to manage mutual exclusion (toggle `.selected` between items)
