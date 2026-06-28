---
name: Context Menu (Radial)
id: context-menu
class: .radial-menu
category: navigation
index: 9
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Context Menu (Radial)

## Physical Analog
**Reference devices**: Pro camera "quick menu" (Sony Alpha quick-access dial), Wacom tablet radial menu, video game weapon wheels.
**Mechanism**: A radial/pie menu that appears around a point of activation. Items are arranged in a circle at equal angular intervals, each accessible by moving in that direction from center. Derived from military heads-up display (HUD) target-designator patterns. Faster than linear menus for small numbers of items (4-8) because the user only needs to specify a direction, not navigate a list.

## Geometry

| Property | Value |
|----------|-------|
| Container | 140x140px, circular |
| Container border | 2px solid |
| Item size | 36x36px, circular |
| Item border | 1px solid |
| Shadow | 0 4px 20px rgba(0,0,0,0.4) |

## CSS Recipe

### Container (`.radial-menu`)
```css
.radial-menu {
  width: 140px; height: 140px; border-radius: 50%;
  background: var(--bg-raised); border: 2px solid var(--border-mid);
  box-shadow: 0 4px 20px rgba(0,0,0,0.4); position: relative;
}
```

### Item (`.radial-menu-item`)
```css
.radial-menu-item {
  position: absolute; width: 36px; height: 36px; border-radius: 50%;
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: var(--text-secondary); cursor: pointer;
  transition: background 0.12s, color 0.12s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
```

### Hover
```css
.radial-menu-item:hover { background: var(--bg-panel); color: var(--amber); }
```

## HTML Structure
```html
<div class="radial-menu">
  <div class="radial-menu-item" style="top:8px;left:50%;transform:translateX(-50%)">&#9733;</div>
  <div class="radial-menu-item" style="top:50%;right:8px;transform:translateY(-50%)">&#9998;</div>
  <div class="radial-menu-item" style="bottom:8px;left:50%;transform:translateX(-50%)">&#128465;</div>
  <div class="radial-menu-item" style="top:50%;left:8px;transform:translateY(-50%)">&#128269;</div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses standard raised surface with elevated shadow.

## Theme Behavior
- Background swaps via `--bg-raised`
- Item backgrounds swap via `--bg-surface`
- Hover always uses amber accent
- Shadow reduces in light mode

## Constraints
1. MUST use circular container (border-radius: 50%)
2. Items MUST be positioned at cardinal/ordinal points using absolute positioning
3. MUST support 4-8 items maximum (more becomes unusable)
4. Items MUST be circular buttons (border-radius: 50%)
5. Hover MUST highlight item in amber
6. MUST use elevated shadow to indicate floating overlay context
7. Container border MUST be 2px (thicker than standard 1px to define the ring)

## Accessibility
- Container should have `role="menu"`
- Items should have `role="menuitem"` with descriptive `aria-label`
- Support arrow key navigation between items (mapped to positions)
- Escape key should dismiss the menu
- Menu should trap focus while open
