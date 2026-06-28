---
name: LCD Readout
id: lcd-readout
class: .lcd-readout
category: readouts
index: 3
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# LCD Readout

## Physical Analog
**Reference devices**: iPod Classic now-playing display, Nokia phone main screen, Casio G-Shock watch display, Game Boy screen.
**Mechanism**: STN or TN LCD with LED backlight. Characteristic color tint from backlight. Visible pixel grid at close inspection. Slow response time (40-80ms) causing ghosting.

## Geometry

| Property | Value |
|----------|-------|
| Value font | 28px VT323 (pixel LCD font) |
| Label font | 8px Rajdhani UI |
| Padding | 8px 14px 10px |

## CSS Recipe

### Default
```css
.lcd-readout {
  display: inline-flex; flex-direction: column; gap: 3px;
  padding: 8px 14px 10px; background: var(--bg-inset);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  box-shadow: var(--shadow-inset);
}
```

### Label
```css
.lcd-label { font-family: var(--font-ui); font-size: 8px; font-weight: 500; letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase; }
```

### Value (Default: Blue)
```css
.lcd-value { font-family: var(--font-lcd); font-size: 28px; color: var(--blue-info); line-height: 1; letter-spacing: 1px; }
```

### Unit
```css
.lcd-unit { font-family: var(--font-ui); font-size: 10px; font-weight: 500; color: var(--text-muted); margin-left: 2px; }
```

### Color Variants (Backlight Colors)
```css
.lcd-readout.green .lcd-value { color: var(--green-on); }
.lcd-readout.amber .lcd-value { color: var(--amber); }
.lcd-readout.pink .lcd-value { color: var(--pink-action); }
.lcd-readout.red .lcd-value { color: var(--red-alert); }
```

## HTML Structure
```html
<!-- Default (blue) -->
<div class="lcd-readout">
  <div class="lcd-label">TRACKS</div>
  <div class="lcd-value">42</div>
</div>

<!-- Green variant -->
<div class="lcd-readout green">
  <div class="lcd-label">SIGNAL</div>
  <div class="lcd-value">OK</div>
</div>

<!-- Amber with unit -->
<div class="lcd-readout amber">
  <div class="lcd-label">TEMP</div>
  <div class="lcd-value">72<span class="lcd-unit">&deg;F</span></div>
</div>

<!-- Pink variant -->
<div class="lcd-readout pink">
  <div class="lcd-label">BPM</div>
  <div class="lcd-value">128</div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants

| Color Variant | Backlight Era/Device |
|---------------|---------------------|
| default (blue) | iPod Classic, Nokia 6600 |
| `.green` | Game Boy, early Nokia |
| `.amber` | Car stereo displays, clock radios |
| `.pink` | Sony Ericsson, RAZR accent |
| `.red` | Alert/error states |

## Theme Behavior
- Background and shadow adapt via tokens (`--bg-inset`, `--shadow-inset`)
- Color variants are fixed accent colors

## Constraints
1. Value font MUST be `--font-lcd` (VT323) -- simulates pixel grid of low-res LCDs.
2. Color variants represent different backlight colors, NOT states.
3. Unit text uses `--font-ui` (not LCD font) as it's supplementary info.
4. No text-shadow glow (unlike signal-display) -- LCDs don't emit like OLEDs.

## Accessibility
- Read-only display
- Use `aria-live="polite"` for dynamic values
- Color alone should not convey meaning; pair with labels
