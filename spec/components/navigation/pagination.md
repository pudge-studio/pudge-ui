---
name: Pagination
id: pagination
class: .pagination
category: navigation
index: 8
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Pagination

## Physical Analog
**Reference devices**: Track/channel number selectors on tape machines, CD changers.
**Mechanism**: Numbered buttons resembling track select buttons on multi-track tape machines or CD changers. Each button represents a page/track, with the active one highlighted.

## Geometry

| Property | Value |
|----------|-------|
| Button size | 28x28px |
| Gap | 4px |
| Border radius | `--radius-sm` (4px) |
| Font size | 11px |
| Bottom shadow | 1px |

## CSS Recipe

### Container (`.pagination`)
```css
.pagination { display: flex; gap: 4px; }
```

### Page Button (`.page-btn`)
```css
.page-btn {
  width: 28px; height: 28px; border-radius: var(--radius-sm);
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary);
  cursor: pointer; transition: all 0.12s;
  box-shadow: 0 1px 0 var(--border-deep);
}
```

### Hover
```css
.page-btn:hover { color: var(--text-primary); border-color: var(--border-mid); }
```

### Active (pressed)
```css
.page-btn:active { transform: translateY(1px); box-shadow: none; }
```

### Active (selected page)
```css
.page-btn.active { color: var(--amber); border-color: var(--amber-dim); background: rgba(245,166,35,0.08); }
```

## HTML Structure
```html
<div class="pagination">
  <button class="page-btn">&#9664;</button>
  <button class="page-btn">1</button>
  <button class="page-btn active">2</button>
  <button class="page-btn">3</button>
  <button class="page-btn">4</button>
  <button class="page-btn">&#9654;</button>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses Tier 1 (flush) raised depth model.

## Theme Behavior
- Button backgrounds swap via `--bg-surface`
- Border colors swap via `--border-subtle`
- Active page uses amber tint in both themes
- Shadow depth adapts via `--border-deep`

## Constraints
1. MUST use monospace font for page numbers (data readout convention)
2. Active page MUST use amber color with amber-dim border and amber-tinted background
3. Buttons MUST be square (28x28px)
4. Press travel MUST be 1px with shadow collapse (Tier 1 depth model)
5. MUST include prev/next arrow buttons (&#9664; / &#9654;)
6. MUST use `--radius-sm` (not pill or round) to match small hardware buttons

## Accessibility
- Container should have `role="navigation"` and `aria-label="Pagination"`
- Active page: `aria-current="page"`
- Previous/Next buttons: `aria-label="Previous page"` / `aria-label="Next page"`
- Disabled nav buttons should have `aria-disabled="true"`
