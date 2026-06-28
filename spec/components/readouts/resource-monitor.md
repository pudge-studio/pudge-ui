---
name: Resource Monitor
id: resource
class: .resource
category: readouts
index: 5
materials: [panel]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Resource Monitor

## Physical Analog
**Reference devices**: Mac OS X Activity Monitor (circa 2003-2005), Windows Task Manager resource graphs, server rack front-panel status displays.
**Mechanism**: Derived from analog panel meters on rack-mounted server equipment displaying CPU load, memory usage, or network activity as bar graphs.

## Geometry

| Property | Value |
|----------|-------|
| Grid | 2 columns |
| Gap | 14px |
| Bar height | 6px |
| Value font | 24px Michroma |
| Name font | 9px Rajdhani |

## CSS Recipe

### Grid Container
```css
.resource-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
```

### Individual Resource Card
```css
.resource {
  background: linear-gradient(180deg, var(--bg-panel), var(--bg-inset));
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;
}
```

### Name Label
```css
.resource-name { font-size: 9px; color: var(--text-muted); letter-spacing: 2px; font-family: var(--font-ui); font-weight: 500; }
```

### Value
```css
.resource-value { margin-top: 8px; color: var(--amber); font-family: var(--font-display); font-size: 24px; }
```

### Progress Bar
```css
.resource-bar { margin-top: 10px; height: 6px; border-radius: 99px; overflow: hidden; background: var(--bg-inset); }
.resource-fill { height: 100%; background: linear-gradient(90deg, var(--green-hi), var(--green-on)); border-radius: 99px; }
```

## HTML Structure
```html
<div class="resource-grid" style="width:240px">
  <div class="resource">
    <div class="resource-name">CPU</div>
    <div class="resource-value">74%</div>
    <div class="resource-bar"><div class="resource-fill" style="width:74%"></div></div>
  </div>
  <div class="resource">
    <div class="resource-name">MEM</div>
    <div class="resource-value">52%</div>
    <div class="resource-bar"><div class="resource-fill" style="width:52%"></div></div>
  </div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Card: Panel gradient (bg-panel to bg-inset)
- Bar track: Recessed (bg-inset)
- Bar fill: Green gradient

## Theme Behavior
- Card background and borders adapt via tokens
- Amber value and green bar fill are fixed accent colors

## Constraints
1. Grid MUST be 2 columns for compact dashboard layout.
2. Bar fill width is set via inline style (percentage).
3. Bar uses full pill radius (99px) for rounded ends.
4. Value font is Michroma display, name font is Rajdhani UI.

## Accessibility
- Read-only display
- Each resource card should have `role="meter"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- `aria-label` should describe the resource (e.g., "CPU usage")
