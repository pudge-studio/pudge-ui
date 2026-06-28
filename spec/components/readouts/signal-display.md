---
name: Signal Display
id: signal-display
class: .signal-display
category: readouts
index: 1
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Signal Display

## Physical Analog
**Reference devices**: Industrial OLED status panels, Akai MPC Live main display, synthesizer patch displays, broadcast router status panels.
**Mechanism**: Recessed OLED or VFD (Vacuum Fluorescent Display) module behind protective window. Display sits 3-5mm below panel surface in milled rectangular cavity. OLED pixels emit own light (no backlight), creating high contrast against black background.

## Geometry

| Property | Value |
|----------|-------|
| Recess depth | 0.9 opacity inset shadow (deepest in system) |
| Value font | 34px Michroma display font |
| Label font | 9px Rajdhani UI font |
| Inner ring | 1px `#181818` additional depth layer |

## CSS Recipe

### Default (Dark Theme)
```css
.signal-display {
  background: linear-gradient(180deg, #080808, #111);
  border: 1px solid #1f1f1f; border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: inset 0 1px 8px rgba(0,0,0,0.9), inset 0 0 0 1px #181818;
}
```

### Light Theme
```css
[data-theme="light"] .signal-display {
  background: linear-gradient(180deg, var(--bg-inset), #ddd);
  border-color: var(--border-mid);
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.1);
}
```

### Label
```css
.signal-display-label { font-size: 9px; color: var(--text-muted); letter-spacing: 3px; font-family: var(--font-ui); font-weight: 500; margin-bottom: 8px; }
```

### Value
```css
.signal-display-value {
  font-family: var(--font-display); font-size: 34px; color: var(--amber);
  text-shadow: 0 0 14px var(--amber-glow);
}
```

## HTML Structure
```html
<div class="signal-display">
  <div class="signal-display-label">PRIMARY OUTPUT</div>
  <div class="signal-display-value">87.4%</div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
Single material: Phosphor Screen (LCD/OLED Display Cavity). Nearly black background with heavy inset shadow.

## Theme Behavior
- Dark: Deep black gradient (`#080808` to `#111`) with 0.9 opacity inset shadow
- Light: Light inset background with much softer shadow (0.1 opacity)
- Value amber color and glow remain fixed
- Inner ring (`inset 0 0 0 1px #181818`) removed in light theme

## Constraints
1. Inset shadow MUST be 0.9 opacity -- the strongest in the system (deep recess).
2. Double inset (shadow + ring) creates the "sunken screen" look.
3. Value text MUST have `text-shadow` with accent glow = phosphor bleed simulation.
4. Background MUST be nearly black gradient (not flat) to simulate cavity depth.
5. Label uses wide letter-spacing (3px) for equipment label aesthetic.

## Accessibility
- Read-only display, no interaction needed
- Values should use `aria-live="polite"` if they update dynamically
- Color contrast: amber on near-black exceeds WCAG AA (6.3:1)
