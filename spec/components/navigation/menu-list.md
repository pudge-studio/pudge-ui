---
name: Menu List
id: menu-list
class: .menu-list-wrap
category: navigation
index: 2
materials: [glossy-polycarbonate, glass]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Menu List

## Physical Analog
**Reference devices**: iPod Classic menu system, iPod Nano list navigation.
**Mechanism**: A scrolling list with arrow indicators -- the core navigation pattern of the iPod. Items are listed vertically with right-pointing chevrons indicating that selecting the item will navigate to a sub-menu. The currently selected item is highlighted with a blue/translucent bar. The Click Wheel scrolls the selection highlight up and down; the center button selects.

## Geometry

| Property | Value |
|----------|-------|
| Min width | 200px |
| Title padding | 8px 14px |
| Item padding | 8px 14px |
| Border radius | `--radius-lg` (14px) |
| Title font size | 9px |
| Item font size | 11px |

## CSS Recipe

### Wrapper (`.menu-list-wrap`)
```css
.menu-list-wrap {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);
  overflow: hidden; box-shadow: var(--shadow-deep); min-width: 200px;
}
```

### Light theme override
```css
[data-theme="light"] .menu-list-wrap { background: var(--bg-raised); }
```

### Title (`.menu-list-title`)
```css
.menu-list-title {
  padding: 8px 14px;
  background: linear-gradient(180deg, var(--bg-surface), var(--bg-panel));
  border-bottom: 1px solid var(--border-subtle);
  font-family: var(--font-ui); font-size: 9px; font-weight: 600;
  letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase;
}
```

### Item (`.menu-list-item`)
```css
.menu-list-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 14px; cursor: pointer;
  border-bottom: 1px solid rgba(128,128,128,0.06); transition: background 0.1s;
}
.menu-list-item:last-child { border-bottom: none; }
```

### Hover
```css
.menu-list-item:hover { background: var(--glow-color); }
```

### Active
```css
.menu-list-item.active {
  background: linear-gradient(90deg, rgba(68,119,204,0.12), transparent);
  color: var(--blue-info);
}
```

### Sub-elements
```css
.mli-label { font-family: var(--font-ui); font-size: 11px; font-weight: 500; color: var(--text-primary); letter-spacing: 0.5px; }
.mli-arrow { color: var(--text-muted); font-size: 10px; }
```

## HTML Structure
```html
<div class="menu-list-wrap">
  <div class="menu-list-title">MUSIC</div>
  <div class="menu-list-item active">
    <span class="mli-label">Now Playing</span>
    <span class="mli-arrow">&#9654;</span>
  </div>
  <div class="menu-list-item">
    <span class="mli-label">Artists</span>
    <span class="mli-arrow">&#9654;</span>
  </div>
  <div class="menu-list-item">
    <span class="mli-label">Albums</span>
    <span class="mli-arrow">&#9654;</span>
  </div>
  <div class="menu-list-item">
    <span class="mli-label">Playlists</span>
    <span class="mli-arrow">&#9654;</span>
  </div>
</div>
```

## Size Variants
No size variants defined. Single default size.

## Material Variants
No material variants. Uses subtle translucent gradient in dark mode, solid raised surface in light mode.

## Theme Behavior
- Dark mode: translucent gradient background (`rgba(255,255,255,0.04)` to `0.02`)
- Light mode: solid `--bg-raised` background
- Active item uses blue-tinted left gradient in both themes
- Shadow depth reduces in light mode

## Constraints
1. MUST include right-pointing chevron arrow on each navigable item
2. MUST use horizontal blue gradient for active/selected item (iPod selection style)
3. MUST NOT use opaque backgrounds in dark mode -- the subtle translucency is key
4. MUST include a title bar with raised gradient background
5. Item separators MUST be very subtle (`rgba(128,128,128,0.06)`)

## Accessibility
- Container should have `role="menu"` or `role="listbox"`
- Items should have `role="menuitem"` or `role="option"`
- Active item should have `aria-selected="true"`
- Support Up/Down arrow key navigation
- Support Enter to select
