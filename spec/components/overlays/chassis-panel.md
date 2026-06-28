---
name: Chassis Panel
id: chassis-panel
class: .chassis-panel
category: overlays
index: 2
materials: [brushed-metal]
sizes: [default]
interactive: false
requires_js: false
canvas: true
---

# Chassis Panel

## Physical Analog
**Reference devices**: Removable/swappable sections of device enclosures -- like a side panel on a PC case or a battery door on a camera.
**Mechanism**: The removable section of a device chassis. Lighter shadow than Panel (I1) because chassis panels are attached, not freestanding. Used for secondary grouping of controls and indicators.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 16px |
| Border radius | `--radius-lg` (14px) |
| Header padding-bottom | 8px |
| Title font size | 10px |

## CSS Recipe

### Container (`.chassis-panel`)
```css
.chassis-panel {
  background: linear-gradient(180deg, var(--bg-raised), var(--bg-surface));
  border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);
  padding: 16px; box-shadow: var(--shadow-deep);
}
```

### Header (`.cpanel-header`)
```css
.chassis-panel .cpanel-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px; padding-bottom: 8px;
  border-bottom: 1px solid var(--border-subtle);
}
```

### Title (`.cpanel-title`)
```css
.chassis-panel .cpanel-title {
  font-family: var(--font-ui); font-size: 10px; font-weight: 600;
  letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase;
}
```

## HTML Structure
```html
<div class="chassis-panel" style="width:200px">
  <div class="cpanel-header">
    <span class="cpanel-title">AUDIO OUT</span>
    <span style="font-size:8px;color:var(--text-muted);font-family:var(--font-ui)">v2.1</span>
  </div>
  <div class="led-cluster">
    <div class="led-dot green"></div>
    <div class="led-dot green"></div>
    <div class="led-dot off"></div>
    <div class="led-dot red"></div>
  </div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses raised-to-surface gradient (lighter than I1 Panel).

## Theme Behavior
- Background gradient: `--bg-raised` to `--bg-surface` (adapts to theme)
- Shadow adapts via `--shadow-deep` token
- Border and header separator adapt via `--border-subtle`

## Constraints
1. MUST use lighter gradient than Panel (I1) -- `--bg-raised` to `--bg-surface` instead of `--bg-surface` to `--bg-panel`
2. MUST use `--shadow-deep` (standard deep shadow, not custom Tier 3)
3. Header MUST have bottom border separator
4. Header MUST use flex with `justify-content: space-between` for title + version
5. Title MUST be uppercase with 2px letter-spacing

## Accessibility
- Use `role="region"` or `<section>` with `aria-label`
- Header should describe the panel's function
- Version info is supplementary (can use `aria-label` on the version span)
