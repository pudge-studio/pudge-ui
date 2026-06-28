---
name: Progress Bar
id: progress-track
class: .progress-track
category: meters
index: 7
materials: [panel]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Progress Bar

## Physical Analog
**Reference devices**: iPod file transfer progress, Windows XP file copy dialog, CD burning progress.
**Mechanism**: Linear indicator showing completion percentage of time-bound process. Track = total work, fill = completed work.

## Geometry

| Property | Value |
|----------|-------|
| Track | 100% width x 8px height |
| Fill gradient | Blue-to-green |
| Container width | 180px |

## CSS Recipe

### Wrapper
```css
.progress-wrap { display: flex; flex-direction: column; gap: 4px; width: 180px; }
```

### Track
```css
.progress-track {
  width: 100%; height: 8px; border-radius: 4px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  overflow: hidden; box-shadow: var(--shadow-inset);
}
```

### Fill
```css
.progress-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--blue-info), var(--green-on)); transition: width 0.3s var(--ease-out); }
```

### Label
```css
.progress-label {
  display: flex; justify-content: space-between;
  font-family: var(--font-ui); font-size: 9px; font-weight: 500;
  color: var(--text-muted); letter-spacing: 1px;
}
```

## HTML Structure
```html
<div class="progress-wrap">
  <div class="progress-track"><div class="progress-fill" style="width:65%"></div></div>
  <div class="progress-label"><span>TRANSFER</span><span>65%</span></div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Track: Recessed panel
- Fill: Blue-to-green gradient

## Theme Behavior
- Track adapts via tokens
- Fill gradient colors are fixed

## Constraints
1. Fill transition MUST use `--ease-out` with 0.3s duration for smooth progress animation.
2. Track has `overflow: hidden` to clip the fill at edges.
3. Label row shows description on left, percentage on right.

## Accessibility
- Use `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- `aria-label` should describe the process
