---
name: Accordion
id: accordion
class: .accordion
category: indicators
index: 9
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Accordion

## Physical Analog
**Reference devices**: Camera menu subsections, audio equipment nested parameter groups, phone settings menus.
**Mechanism**: A vertically stacking fold mechanism -- like the bellows of an accordion or a folding display. Each section header is clickable; clicking it expands the body content below (revealing hidden settings) while other sections remain collapsed. The chevron arrow rotates 90 degrees to indicate the expanded state.

## Geometry

| Property | Value |
|----------|-------|
| Min width | 200px |
| Header padding | 8px 12px |
| Body padding (open) | 4px 12px 10px |
| Header font size | 10px |
| Body font size | 9px |
| Arrow font size | 8px |
| Max body height | 80px |
| Expand duration | 0.25s |
| Easing | `--ease-out` |

## CSS Recipe

### Container (`.accordion`)
```css
.accordion {
  background: var(--bg-raised); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); overflow: hidden; min-width: 200px;
}
```

### Item (`.accordion-item`)
```css
.accordion-item { border-bottom: 1px solid var(--border-subtle); }
.accordion-item:last-child { border-bottom: none; }
```

### Header (`.accordion-header`)
```css
.accordion-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; cursor: pointer;
  font-family: var(--font-ui); font-size: 10px; font-weight: 500;
  color: var(--text-primary); letter-spacing: 1px; transition: background 0.12s;
}
.accordion-header:hover { background: var(--glow-color); }
```

### Arrow (`.acc-arrow`)
```css
.acc-arrow { font-size: 8px; color: var(--text-muted); transition: transform 0.2s; }
.accordion-item.open .acc-arrow { transform: rotate(90deg); }
```

### Body (`.accordion-body`)
```css
.accordion-body {
  padding: 0 12px; max-height: 0; overflow: hidden;
  transition: max-height 0.25s var(--ease-out), padding 0.25s var(--ease-out);
}
.accordion-item.open .accordion-body { max-height: 80px; padding: 4px 12px 10px; }
.accordion-body p { font-family: var(--font-ui); font-size: 9px; color: var(--text-secondary); line-height: 1.6; }
```

## HTML Structure
```html
<div class="accordion">
  <div class="accordion-item open">
    <div class="accordion-header" onclick="this.parentElement.classList.toggle('open')">
      <span>Display Settings</span>
      <span class="acc-arrow">&#9654;</span>
    </div>
    <div class="accordion-body">
      <p>Brightness, contrast, and color temperature controls for the main display output.</p>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header" onclick="this.parentElement.classList.toggle('open')">
      <span>Audio Settings</span>
      <span class="acc-arrow">&#9654;</span>
    </div>
    <div class="accordion-body">
      <p>Master volume, channel balance, and output routing configuration.</p>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header" onclick="this.parentElement.classList.toggle('open')">
      <span>Network</span>
      <span class="acc-arrow">&#9654;</span>
    </div>
    <div class="accordion-body">
      <p>Wi-Fi, Bluetooth, and wired connection settings.</p>
    </div>
  </div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses standard raised surface.

## Theme Behavior
- Background swaps via `--bg-raised`
- Separators swap via `--border-subtle`
- Hover highlight uses `--glow-color`
- Body text uses `--text-secondary`
- Arrow uses `--text-muted`

## Constraints
1. MUST use `max-height` animation for expand/collapse (not display toggle)
2. Arrow MUST rotate 90 degrees when open (right-pointing to down-pointing)
3. Transition MUST use `--ease-out` easing for smooth deceleration
4. Multiple items CAN be open simultaneously
5. Items MUST be separated by `--border-subtle` borders
6. Last item MUST NOT have a bottom border
7. Body max-height when open is 80px (adjust for content needs)

## Accessibility
- Use `<details>` and `<summary>` for native behavior, or implement ARIA:
- Headers: `role="button"`, `aria-expanded="true/false"`, `aria-controls="body-id"`
- Body: `role="region"`, `aria-labelledby="header-id"`
- Support Enter/Space to toggle on focused header
- Support Up/Down to navigate between headers
