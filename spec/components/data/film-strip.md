---
name: Film Strip
id: film-strip
class: .film-strip
category: data
index: 3
materials: []
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Film Strip

## Physical Analog
**Reference devices**: Camera filmstrip playback view, video editing timeline, 35mm film strip.
**Mechanism**: A horizontal row of image thumbnails with sprocket hole borders -- the perforations along the edges of 35mm motion picture film. In real film, these holes engage with the camera/projector's claw mechanism to advance the film one frame at a time. The `::before` and `::after` pseudo-elements with `repeating-linear-gradient` create the sprocket hole pattern along the top and bottom edges of the strip.

## Geometry

| Property | Value |
|----------|-------|
| Frame size | 60x40px |
| Frame gap | 4px |
| Strip padding | 8px |
| Sprocket strip width | 8px |
| Frame border radius | 2px |
| Background | #0a0a0a (film base color) |

## CSS Recipe

### Strip container (`.film-strip`)
```css
.film-strip {
  display: flex; gap: 4px; padding: 8px;
  background: #0a0a0a; border: 1px solid #1e1e1e;
  border-radius: var(--radius-sm); overflow-x: auto;
}
```

### Sprocket holes
```css
.film-strip::before, .film-strip::after {
  content: ''; flex-shrink: 0; width: 8px;
  background: repeating-linear-gradient(0deg, transparent 0px, transparent 6px, #333 6px, #333 8px);
}
```

### Frame (`.film-frame`)
```css
.film-frame {
  flex-shrink: 0; width: 60px; height: 40px;
  background: var(--bg-surface); border: 1px solid #333;
  border-radius: 2px; display: flex; align-items: center; justify-content: center;
  font-size: 9px; color: var(--text-muted); cursor: pointer;
  transition: border-color 0.12s;
}
```

### Frame hover
```css
.film-frame:hover { border-color: var(--amber); }
```

### Frame selected
```css
.film-frame.selected { border-color: var(--amber); box-shadow: 0 0 6px var(--amber-glow); }
```

## HTML Structure
```html
<div class="film-strip" style="width:320px">
  <div class="film-frame">F01</div>
  <div class="film-frame selected">F02</div>
  <div class="film-frame">F03</div>
  <div class="film-frame">F04</div>
  <div class="film-frame">F05</div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses fixed film-base colors (dark, non-themed).

## Theme Behavior
- Film strip background is FIXED (#0a0a0a) -- does not change with theme
- Film base border is FIXED (#1e1e1e)
- Frame borders are FIXED (#333)
- Frame content area uses `--bg-surface` for placeholder backgrounds
- Selected glow always uses amber

## Constraints
1. MUST include sprocket hole strips via `::before` and `::after` pseudo-elements
2. Sprocket pattern MUST use `repeating-linear-gradient` with 6px transparent + 2px colored
3. Film base MUST be near-black (#0a0a0a) regardless of theme
4. Frames MUST use fixed-width (`flex-shrink: 0`) to prevent squishing
5. MUST support horizontal scrolling (`overflow-x: auto`) for many frames
6. Frame border-radius MUST be minimal (2px) to match film frame corners
7. Selected frame MUST use amber border with amber glow (6px radius)
8. Hover MUST highlight frame border in amber

## Accessibility
- Container should have `role="listbox"` or similar with `aria-label="Film strip"`
- Frames should have `role="option"` with `aria-selected`
- Support Left/Right arrow key navigation
- Support keyboard scrolling
- Include descriptive `aria-label` on each frame
