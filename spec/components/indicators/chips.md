---
name: Selectable Chips
id: chips
class: .chip
category: indicators
index: 2
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Selectable Chips

## Physical Analog
**Reference devices**: iPod genre/playlist tags, camera filter selectors.
**Mechanism**: Interactive chip elements that the user can toggle to filter or select options. Distinguished from status chips (J1) by being interactive. The pill shape with optional colored dot comes from the physical form factor of panel-mounted indicator LEDs with silk-screened labels.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 4px 10px |
| Border radius | `--radius-pill` (100px) |
| Font size | 9px |
| Letter spacing | 1px |
| Dot size | 6x6px |
| Dot-label gap | 4px |

## CSS Recipe

### Default state
```css
.chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: var(--radius-pill);
  font-family: var(--font-ui); font-size: 9px; font-weight: 500;
  letter-spacing: 1px; background: var(--bg-surface);
  border: 1px solid var(--border-subtle); color: var(--text-secondary);
  cursor: pointer; transition: all 0.15s;
}
```

### Hover
```css
.chip:hover { border-color: var(--border-mid); }
```

### Active (selected)
```css
.chip.active { background: rgba(68,119,204,0.1); border-color: var(--blue-info); color: var(--blue-info); }
```

### Dot indicator (`.chip-dot`)
```css
.chip .chip-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
```

## HTML Structure
```html
<div class="flex-row" style="gap:6px">
  <div class="chip active"><span class="chip-dot" style="background:var(--blue-info)"></span>4K</div>
  <div class="chip">1080p</div>
  <div class="chip">720p</div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses surface background with subtle border.

## Theme Behavior
- Background swaps via `--bg-surface`
- Border swaps via `--border-subtle`
- Active state uses blue with blue-tinted background (constant across themes)
- Dot color is set inline or via accent color classes

## Constraints
1. MUST use pill border-radius (`--radius-pill`, 100px) -- distinguishes from status chips
2. Active state MUST use `--blue-info` (not amber like status chips)
3. Active background MUST be semi-transparent blue (10% opacity)
4. MUST be interactive (cursor pointer, hover state)
5. Optional dot indicator MUST be 6x6px circle
6. Multiple chips CAN be active simultaneously (multi-select, unlike segmented control)

## Accessibility
- Each chip should be a `<button>` or have `role="checkbox"` / `role="option"`
- Active state: `aria-pressed="true"` (for toggle) or `aria-selected="true"` (for selection)
- If used as filter group, container should have `role="group"` with `aria-label`
- Support Space/Enter to toggle
