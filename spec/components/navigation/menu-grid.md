---
name: Menu Grid
id: menu-grid
class: .menu-grid
category: navigation
index: 1
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Menu Grid

## Physical Analog
**Reference devices**: Nokia Series 40 app menu, Sony Ericsson main menu, Samsung SGH series phone menus.
**Mechanism**: A matrix navigation pattern originating from feature phone operating systems. The 3x3 grid (or 3x4) maps to the phone's numeric keypad -- press 1 for the top-left app, 2 for top-center, etc. Each cell contains an icon and a short label. The grid is navigated via the D-pad with a visual highlight showing the currently selected cell.

## Geometry

| Property | Value |
|----------|-------|
| Grid | 3-column via `repeat(3, 1fr)` |
| Gap | 6px |
| Wrapper max-width | 200px |
| Wrapper padding | 12px |
| Item padding | 10px 6px |
| Icon size | 24x24px |

## CSS Recipe

### Wrapper (`.menu-grid-wrap`)
```css
.menu-grid-wrap {
  display: flex; flex-direction: column;
  background: var(--bg-raised); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: 12px;
  box-shadow: var(--shadow-deep); max-width: 200px;
}
```

### Grid (`.menu-grid`)
```css
.menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
```

### Item (`.menu-grid-item`)
```css
.menu-grid-item {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; padding: 10px 6px; border-radius: var(--radius-md);
  cursor: pointer; transition: background 0.12s;
  font-family: var(--font-ui); font-size: 8px; font-weight: 500;
  color: var(--text-muted); letter-spacing: 1px;
}
```

### Hover
```css
.menu-grid-item:hover { background: var(--glow-color); }
```

### Active
```css
.menu-grid-item.active { background: var(--glow-color); color: var(--blue-info); }
```

### Icon (`.mgi-icon`)
```css
.menu-grid-item .mgi-icon {
  width: 24px; height: 24px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center; font-size: 14px;
}
```

## HTML Structure
```html
<div class="menu-grid-wrap">
  <div class="menu-grid">
    <div class="menu-grid-item active"><div class="mgi-icon">&#9742;</div>PHONE</div>
    <div class="menu-grid-item"><div class="mgi-icon">&#9993;</div>MSG</div>
    <div class="menu-grid-item"><div class="mgi-icon">&#9881;</div>SET</div>
    <div class="menu-grid-item"><div class="mgi-icon">&#9835;</div>MUSIC</div>
    <div class="menu-grid-item"><div class="mgi-icon">&#128247;</div>CAM</div>
    <div class="menu-grid-item"><div class="mgi-icon">&#127760;</div>WEB</div>
  </div>
</div>
```

## Size Variants
No size variants defined. Single default size.

## Material Variants
No material variants. Uses standard raised panel surface (`--bg-raised`).

## Theme Behavior
- Wrapper background swaps via `--bg-raised` token (dark: `#1c1a18`, light: `#ffffff`)
- Shadow depth reduces in light mode via `--shadow-deep` token
- Text and border colors swap via theme tokens

## Constraints
1. MUST use 3-column grid layout to match phone keypad mapping
2. MUST NOT exceed 200px max-width (phone screen proportion)
3. MUST use `--radius-lg` on wrapper to match device bezel curvature
4. MUST show hover background highlight using `--glow-color`
5. Active item MUST use `--blue-info` color (iPod-era selection blue)

## Accessibility
- Each grid item should be a `<button>` or have `role="menuitem"`
- Container should have `role="menu"` or `role="grid"`
- Support arrow key navigation between grid items
- Active item should have `aria-current="true"`
