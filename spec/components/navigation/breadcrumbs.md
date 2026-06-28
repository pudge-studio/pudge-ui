---
name: Breadcrumbs
id: breadcrumbs
class: .breadcrumbs
category: navigation
index: 7
materials: []
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Breadcrumbs

## Physical Analog
**Reference devices**: Channel strip label chains on mixing desks.
**Mechanism**: Represents a navigation path -- derived from the channel routing labels on mixing console signal chains (INPUT -> PREAMP -> EQ -> COMP -> BUS). Each segment represents a level in the navigation hierarchy, with separators indicating signal flow direction.

## Geometry

| Property | Value |
|----------|-------|
| Gap | 6px |
| Font size | 10px |
| Separator font size | 8px |
| Letter spacing | 1px |

## CSS Recipe

### Container (`.breadcrumbs`)
```css
.breadcrumbs {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-ui); font-size: 10px; font-weight: 500;
  color: var(--text-muted); letter-spacing: 1px;
}
```

### Item (`.breadcrumb-item`)
```css
.breadcrumb-item { cursor: pointer; transition: color 0.12s; }
```

### Hover
```css
.breadcrumb-item:hover { color: var(--text-primary); }
```

### Active (current location)
```css
.breadcrumb-item.active { color: var(--amber); }
```

### Separator (`.breadcrumb-sep`)
```css
.breadcrumb-sep { color: var(--text-muted); opacity: 0.5; font-size: 8px; }
```

## HTML Structure
```html
<div class="breadcrumbs">
  <span class="breadcrumb-item">HOME</span>
  <span class="breadcrumb-sep">&#9654;</span>
  <span class="breadcrumb-item">SETTINGS</span>
  <span class="breadcrumb-sep">&#9654;</span>
  <span class="breadcrumb-item active">DISPLAY</span>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Text-only component.

## Theme Behavior
- Text colors swap via `--text-muted`, `--text-primary` tokens
- Active item always uses `--amber`
- Separator opacity remains constant

## Constraints
1. MUST use right-pointing triangle (&#9654;) as separator to indicate signal flow direction
2. Separator MUST be at 50% opacity to maintain visual hierarchy
3. Current/active item MUST be amber colored
4. Previous items MUST be clickable (navigable)
5. MUST use uppercase text (mixing desk convention)

## Accessibility
- Container should have `role="navigation"` and `aria-label="Breadcrumb"`
- Use `<nav>` element as wrapper
- Use `<ol>` with `<li>` for semantic list structure
- Current item should have `aria-current="page"`
- Separators should be decorative (`aria-hidden="true"`)
