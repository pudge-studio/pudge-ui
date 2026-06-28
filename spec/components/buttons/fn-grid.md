---
name: Function Grid
id: fn-btn
class: .fn-btn
category: buttons
index: 7
materials: [panel]
sizes: [md]
interactive: true
requires_js: false
canvas: false
---

# Function Grid

## Physical Analog
**Reference devices**: Sony Alpha custom button matrix (C1-C4), Fujifilm X-T4 Fn button grid, Nikon Z9 illuminated button panel.
**Mechanism**: Identical dome switches to push-btn, arranged in a 2x2 or 2x3 grid on a sub-panel. Each button has a printed icon and label. On pro cameras, buttons often have backlit legends -- a small LED behind translucent legend text illuminates the active function.

## Geometry

| Property | Value |
|----------|-------|
| Grid layout | 2 or 3 columns |
| Button height | 52px |
| Gap | 8px |
| Icon size | 20x20px SVG |
| Label font | 8px, 1.5px letter-spacing |

## CSS Recipe

### Grid Container
```css
.fn-grid { display: grid; gap: 8px; }
.fn-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.fn-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
```

### Button Default State
```css
.fn-btn {
  height: 52px; background: var(--bg-surface);
  border: 1px solid var(--border-deep); border-radius: var(--radius-md);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 4px;
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 var(--border-hi);
  transition: transform 0.07s, box-shadow 0.07s, background 0.1s;
  color: var(--text-secondary); outline: none;
}
```

### Active (Pressed) State
```css
.fn-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 0 var(--border-deep); background: var(--bg-panel);
}
```

### Active (Selected/Backlit) State
```css
.fn-btn.fn-active { background: #1c1a14; border-color: #3a3000; color: var(--amber); }
```

### Child Elements
```css
.fn-btn svg { width: 20px; height: 20px; flex-shrink: 0; }
.fn-btn span { font-size: 8px; letter-spacing: 1.5px; color: inherit; text-transform: uppercase; }
```

## HTML Structure
```html
<div class="fn-grid cols-3" style="width:180px">
  <button class="fn-btn fn-active"><span>WB</span></button>
  <button class="fn-btn"><span>ISO</span></button>
  <button class="fn-btn"><span>AF</span></button>
  <button class="fn-btn"><span>DR</span></button>
  <button class="fn-btn"><span>EV</span></button>
  <button class="fn-btn"><span>MF</span></button>
</div>
```

## Size Variants
No explicit size variants. Button height is fixed at 52px; grid width is set by container.

## Material Variants
Default material is panel surface. Active state uses a warm dark background with amber border.

## Theme Behavior
- Surface colors swap via `--bg-surface` token
- Active state uses hardcoded dark tones (`#1c1a14`, `#3a3000`) -- may need light theme override
- Text color inherits, swapping with theme

## Constraints
1. Grid MUST use CSS Grid with explicit column count classes (`.cols-2`, `.cols-3`).
2. Active button legend MUST turn amber to simulate backlit LED.
3. Label text MUST be uppercase, 8px, with wide letter-spacing.
4. Icons and labels stack vertically (flex-direction: column).

## Accessibility
- Uses native `<button>` elements
- Keyboard: Enter/Space to activate, Tab to navigate between buttons
- Focus: Browser default focus ring preserved
- Grid semantics could use `role="group"` on container
