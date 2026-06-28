---
name: Camera Readout
id: readout
class: .readout
category: readouts
index: 2
materials: [phosphor-screen]
sizes: [sm, md, lg]
interactive: false
requires_js: false
canvas: false
---

# Camera Readout

## Physical Analog
**Reference devices**: Sony Alpha viewfinder overlay data, Nikon D850 top LCD panel, Canon EOS viewfinder display.
**Mechanism**: Two display technologies: (1) Top LCD panel -- monochrome segmented LCD, reflective, LED-illuminated in dark. (2) Electronic viewfinder overlay -- data superimposed on EVF OLED microdisplay.

## Geometry

| Property | Value |
|----------|-------|
| Default value | 24px Michroma |
| Small value | 16px |
| Large value | 32px |
| Inline value | 14px |
| Label | 8px IBM Plex Mono |
| Recess | 0.6 opacity inset shadow |

## CSS Recipe

### Default
```css
.readout {
  background: var(--bg-inset); border: 1px solid #1e1e1e;
  border-radius: var(--radius-md); padding: 8px 14px 10px;
  display: inline-flex; flex-direction: column; gap: 3px;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.6), inset 0 0 0 1px #181818;
}
[data-theme="light"] .readout { border-color: var(--border-mid); box-shadow: var(--shadow-inset); }
```

### Label
```css
.readout-label { font-family: var(--font-mono); font-size: 8px; letter-spacing: 3px; color: var(--text-muted); text-transform: uppercase; }
```

### Value
```css
.readout-value {
  font-family: var(--font-display); font-size: 24px; font-weight: 400;
  color: var(--amber); line-height: 1; letter-spacing: 1px;
  text-shadow: 0 0 16px var(--amber-glow);
}
```

### Unit
```css
.readout-unit { font-family: var(--font-display); font-size: 12px; color: var(--amber-dim); margin-left: 3px; }
```

### Size & Layout Variants
```css
.readout.sm .readout-value { font-size: 16px; }
.readout.lg .readout-value { font-size: 32px; }
.readout.wide { min-width: 200px; }
.readout.timecode .readout-value { font-size: 20px; letter-spacing: 2px; }
.readout.inline { flex-direction: row; align-items: baseline; gap: 8px; padding: 5px 10px; }
.readout.inline .readout-label { font-size: 8px; }
.readout.inline .readout-value { font-size: 14px; }
```

## HTML Structure
```html
<!-- Default -->
<div class="readout">
  <div class="readout-label">SHUTTER</div>
  <div class="readout-value">1/250</div>
</div>

<!-- Small -->
<div class="readout sm">
  <div class="readout-label">ISO</div>
  <div class="readout-value">800</div>
</div>

<!-- Inline -->
<div class="readout inline">
  <div class="readout-label">F</div>
  <div class="readout-value">2.8</div>
</div>
```

## Size Variants

| Variant | Value Font-Size | Analog |
|---------|----------------|--------|
| `.sm` | 16px | Secondary parameters (white balance, drive mode) |
| default | 24px | Primary parameters (shutter speed, aperture) |
| `.lg` | 32px | Main hero display (top LCD panel) |
| `.inline` | 14px | Viewfinder bottom status row |
| `.timecode` | 20px | SMPTE timecode on video cameras |

## Material Variants
Single material: Phosphor screen with recessed cavity.

## Theme Behavior
- Dark: `bg-inset` background, strong inset shadow (0.6), inner ring at `#181818`
- Light: Lighter background, softer shadow, no inner ring
- Amber value and glow are fixed

## Constraints
1. Inset shadow is 0.6 opacity -- standard recess depth (between shallow 0.4 and deep 0.9).
2. Label MUST use `--font-mono` (IBM Plex Mono) with wide letter-spacing (3px).
3. Value MUST use `--font-display` (Michroma) with `text-shadow` glow.
4. Inner ring (`inset 0 0 0 1px #181818`) creates double-depth effect.
5. Inline variant switches to horizontal layout (row, baseline alignment).

## Accessibility
- Read-only display
- Use `aria-live="polite"` for dynamically updating values
- Labels provide context for the numeric values
