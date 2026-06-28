---
name: Search Bar
id: search-bar
class: .search-bar
category: forms
index: 3
materials: [phosphor-screen]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Search Bar

## Physical Analog
**Reference devices**: iPod search (introduced in iPod Photo), camera image search/filter.
**Mechanism**: A text input combined with a magnifying glass icon, contained in a pill-shaped housing. The pill shape (full border-radius) distinguishes it from standard text inputs and signals a "find/filter" action rather than data entry. Derived from the physical "search" button on remote controls and CD/DVD players.

## Geometry

| Property | Value |
|----------|-------|
| Width | 220px |
| Height | 36px |
| Padding | 0 12px |
| Border radius | `--radius-pill` (100px) |
| Icon-input gap | 8px |
| Font size | 11px |
| Icon font size | 14px |

## CSS Recipe

### Container (`.search-bar`)
```css
.search-bar {
  display: flex; align-items: center; gap: 8px;
  width: 220px; height: 36px; padding: 0 12px;
  background: var(--bg-inset); border: 1px solid var(--border-mid);
  border-radius: var(--radius-pill); box-shadow: var(--shadow-inset);
}
```

### Icon (`.search-bar-icon`)
```css
.search-bar-icon { color: var(--text-muted); font-size: 14px; flex-shrink: 0; }
```

### Input
```css
.search-bar input {
  flex: 1; background: transparent; border: none; outline: none;
  color: var(--text-primary); font-family: var(--font-ui); font-size: 11px;
  font-weight: 500; letter-spacing: 0.5px;
}
.search-bar input::placeholder { color: var(--text-muted); }
```

### Focus
```css
.search-bar:focus-within { border-color: var(--amber); }
```

## HTML Structure
```html
<div class="search-bar">
  <span class="search-bar-icon">&#128269;</span>
  <input type="text" placeholder="Search files...">
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses phosphor screen (recessed) styling with pill shape.

## Theme Behavior
- Background uses `--bg-inset` (recessed cavity)
- Inset shadow adapts by theme
- Focus-within border always amber
- Icon and placeholder use `--text-muted`

## Constraints
1. MUST use pill border-radius (`--radius-pill`, 100px) to distinguish from text inputs
2. MUST include magnifying glass icon on the left
3. MUST use `focus-within` on the container (not `:focus` on the input) for border highlight
4. Input inside MUST be transparent background with no border
5. MUST use recessed styling (inset shadow + `--bg-inset`)
6. MUST use UI font (`--font-ui`), not monospace, for search queries

## Accessibility
- Use `role="search"` on the container or wrap in a `<search>` element
- Input should have `type="search"` for proper semantics
- Include `aria-label="Search"` if no visible label
- Support Enter to submit and Escape to clear
