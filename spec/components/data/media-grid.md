---
name: Media Grid
id: media-grid
class: .media-grid
category: data
index: 2
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Media Grid

## Physical Analog
**Reference devices**: Camera image review grid (3x3 or 4x4 thumbnail view), contact sheet from film photography.
**Mechanism**: Derived from the photographic contact sheet -- a print made by placing developed negatives directly on photographic paper and exposing. The resulting sheet shows small positive images in a grid, each representing one frame from the roll. The selected image (`.selected`) has an amber border glow representing the loupe highlight used to examine a specific frame on a light table.

## Geometry

| Property | Value |
|----------|-------|
| Columns | 4 (via `repeat(4, 1fr)`) |
| Gap | 4px |
| Thumbnail aspect ratio | 1:1 (square) |
| Border radius | `--radius-sm` (4px) |
| Selection glow radius | 8px |

## CSS Recipe

### Grid (`.media-grid`)
```css
.media-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
```

### Thumbnail (`.media-thumb`)
```css
.media-thumb {
  aspect-ratio: 1; background: var(--bg-surface);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);
  cursor: pointer; transition: border-color 0.12s;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; color: var(--text-muted);
}
```

### Hover
```css
.media-thumb:hover { border-color: var(--border-mid); }
```

### Selected
```css
.media-thumb.selected { border-color: var(--amber); box-shadow: 0 0 8px var(--amber-glow); }
```

## HTML Structure
```html
<div class="media-grid" style="width:240px">
  <div class="media-thumb">01</div>
  <div class="media-thumb selected">02</div>
  <div class="media-thumb">03</div>
  <div class="media-thumb">04</div>
  <div class="media-thumb">05</div>
  <div class="media-thumb">06</div>
  <div class="media-thumb selected">07</div>
  <div class="media-thumb">08</div>
</div>
```

## Size Variants
No size variants defined. Grid columns and thumbnail size adapt to container width.

## Material Variants
No material variants. Uses surface background for placeholder thumbnails.

## Theme Behavior
- Thumbnail backgrounds swap via `--bg-surface`
- Border colors swap via `--border-subtle`
- Selected glow always uses amber (constant across themes)
- Hover border brightens via `--border-mid`

## Constraints
1. MUST use 4-column grid (standard contact sheet layout)
2. Thumbnails MUST be square (`aspect-ratio: 1`)
3. Selected thumbnails MUST have amber border AND amber glow
4. Glow radius MUST be 8px (standard active indicator glow)
5. Gap MUST be 4px (tight spacing like a real contact sheet)
6. Multiple thumbnails CAN be selected simultaneously
7. MUST use `--radius-sm` for small, film-frame-like corners

## Accessibility
- Each thumbnail should be a `<button>` or have `role="gridcell"`
- Grid container should have `role="grid"` with `aria-label="Image gallery"`
- Selected items: `aria-selected="true"`
- Support arrow key navigation within the grid
- Include `aria-label` or `alt` text describing each image
