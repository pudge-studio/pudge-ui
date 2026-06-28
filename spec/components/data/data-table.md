---
name: Data Table
id: data-table
class: .data-table
category: data
index: 1
materials: [phosphor-screen]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Data Table

## Physical Analog
**Reference devices**: Diagnostic readout grids on server equipment, oscilloscope measurement tables, BIOS setup tables.
**Mechanism**: Tabular data arranged in a monospace font within a recessed display area. The header row uses a separate background (equipment panels often had a silk-screened label strip above the data area). Hover highlighting simulates the movable cursor/indicator on hardware diagnostic screens.

## Geometry

| Property | Value |
|----------|-------|
| Width | 100% |
| Header padding | 8px 12px |
| Cell padding | 6px 12px |
| Header font size | 9px |
| Cell font size | 11px |
| Value font size | 12px (`.val` cells) |
| Border radius | `--radius-md` (8px) |

## CSS Recipe

### Table (`.data-table`)
```css
.data-table {
  width: 100%; border-collapse: collapse;
  font-family: var(--font-mono); font-size: 11px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); overflow: hidden;
}
```

### Header cells
```css
.data-table th {
  padding: 8px 12px; text-align: left;
  font-family: var(--font-ui); font-size: 9px; font-weight: 600;
  letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase;
  background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle);
}
```

### Data cells
```css
.data-table td {
  padding: 6px 12px; color: var(--text-primary);
  border-bottom: 1px solid rgba(128,128,128,0.06);
}
.data-table tr:last-child td { border-bottom: none; }
```

### Row hover
```css
.data-table tr:hover td { background: var(--glow-color); }
```

### Value cells (`.val`)
```css
.data-table td.val { color: var(--amber); font-family: var(--font-display); font-size: 12px; }
```

## HTML Structure
```html
<table class="data-table" style="width:360px">
  <thead>
    <tr><th>PARAMETER</th><th>VALUE</th><th>STATUS</th></tr>
  </thead>
  <tbody>
    <tr><td>CPU Temp</td><td class="val">72&deg;C</td><td><div class="led-dot green"></div></td></tr>
    <tr><td>Fan Speed</td><td class="val">2400</td><td><div class="led-dot green"></div></td></tr>
    <tr><td>Voltage</td><td class="val">12.1V</td><td><div class="led-dot amber"></div></td></tr>
    <tr><td>Clock</td><td class="val">3.6GHz</td><td><div class="led-dot green"></div></td></tr>
  </tbody>
</table>
```

## Size Variants
No size variants defined. Width is 100% of parent container.

## Material Variants
No material variants. Uses phosphor screen (recessed) background with surface-colored header.

## Theme Behavior
- Table background uses `--bg-inset` (recessed data display area)
- Header uses `--bg-surface` (raised label strip above data)
- Row separators are very subtle (`rgba(128,128,128,0.06)`)
- Hover highlight uses `--glow-color`
- Value cells use `--amber` (constant across themes)

## Constraints
1. MUST use monospace font (`--font-mono`) for data cells
2. Header MUST use UI font (`--font-ui`) with uppercase, 2px letter-spacing
3. Header MUST have distinct background (`--bg-surface`) from data area
4. Value cells (`.val`) MUST use amber color and display font
5. MUST use `border-collapse: collapse` for clean grid lines
6. MUST use `overflow: hidden` to clip border-radius
7. Row separators MUST be very subtle (6% opacity)
8. Hover MUST highlight entire row

## Accessibility
- Use semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` elements
- Include `<caption>` or `aria-label` on table for screen readers
- `<th>` elements should have `scope="col"` attribute
- Ensure sufficient color contrast for all text
- LED dots in cells should have `aria-label` describing status
