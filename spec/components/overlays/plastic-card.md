---
name: Plastic Card
id: plastic-card
class: .plastic-card
category: overlays
index: 3
materials: [glossy-polycarbonate]
sizes: [default]
interactive: false
requires_js: false
canvas: false
---

# Plastic Card

## Physical Analog
**Reference devices**: CompactFlash card, memory stick, ID badge.
**Mechanism**: A credit-card-sized or smaller component -- injection-molded polycarbonate with a thickness of 1-2mm. The glossy catch-light highlight and subtle depth shadow simulate the material properties of a thin plastic card.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 14px |
| Border radius | `--radius-md` (8px) |
| Label font size | 8px |
| Value font size | 20px |
| Sub font size | 9px |

## CSS Recipe

### Container (`.plastic-card`)
```css
.plastic-card {
  background: linear-gradient(180deg, var(--bg-raised), var(--bg-surface));
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  padding: 14px;
  box-shadow: 0 2px 0 var(--border-deep), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 var(--glossy-hi);
}
```

### Label (`.card-label`)
```css
.plastic-card .card-label {
  font-family: var(--font-ui); font-size: 8px; font-weight: 500;
  letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;
}
```

### Value (`.card-value`)
```css
.plastic-card .card-value { font-family: var(--font-mono); font-size: 20px; color: var(--text-primary); letter-spacing: 1px; }
```

### Sub-text (`.card-sub`)
```css
.plastic-card .card-sub { font-family: var(--font-ui); font-size: 9px; color: var(--text-secondary); margin-top: 2px; }
```

## HTML Structure
```html
<div class="plastic-card" style="width:160px">
  <div class="card-label">STORAGE</div>
  <div class="card-value">32<span style="font-size:12px;color:var(--text-muted)">GB</span></div>
  <div class="card-sub">CF Card -- Slot 1</div>
</div>
```

## Size Variants
No size variants defined. Width set by parent or inline style.

## Material Variants
No material variants. Uses glossy polycarbonate depth model (2px edge + glossy inset highlight).

## Theme Behavior
- Background gradient adapts via `--bg-raised` / `--bg-surface`
- Glossy highlight (`--glossy-hi`) adapts to theme
- Shadow ambient component (0.1 opacity) is subtle in both themes
- Text colors swap via tokens

## Constraints
1. MUST use `--glossy-hi` inset highlight (polycarbonate catch-light)
2. MUST use `--radius-md` (not lg -- card is smaller than a panel)
3. Shadow MUST be lighter than Panel -- 2px hard edge + 2px 8px ambient (not 10px 28px)
4. Value MUST use monospace font at 20px for prominent data display
5. Label MUST be uppercase with 2px letter-spacing
6. Units should be smaller font size and muted color

## Accessibility
- Use appropriate semantic elements for label/value pairs
- Consider `role="group"` with `aria-label` for the card
- Value should be readable by screen readers (include units in text)
