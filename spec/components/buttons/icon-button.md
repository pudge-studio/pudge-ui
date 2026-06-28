---
name: Icon Button
id: icon-btn
class: .icon-btn
category: buttons
index: 8
materials: [panel]
sizes: [sm, md, lg]
interactive: true
requires_js: false
canvas: false
---

# Icon Button

## Physical Analog
**Reference devices**: Toolbar buttons on audio equipment (Tascam portastudio, Roland SP-404 sampler), camera viewfinder controls.
**Mechanism**: Small tactile buttons with a single icon/symbol instead of text label. Typically smaller than labeled buttons (8-10mm). Round variants appear on devices where the button also serves as an indicator light (LED underneath translucent cap).

## Geometry

| Property | Value |
|----------|-------|
| Default size | 36x36px |
| Small size | 28x28px |
| Large size | 44x44px |
| Icon font-size | 14px (default) |
| Border-radius | var(--radius-md) or 50% for round |

## CSS Recipe

### Default State
```css
.icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: var(--radius-md);
  background: var(--bg-surface); border: 1px solid var(--border-subtle);
  cursor: pointer; color: var(--text-secondary); font-size: 14px;
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 var(--glossy-hi);
  transition: transform 0.07s var(--snap-fast), box-shadow 0.07s, color 0.12s;
}
```

### Hover State
```css
.icon-btn:hover { color: var(--text-primary); }
```

### Active (Pressed) State
```css
.icon-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 0 var(--border-deep);
}
```

### Active (Selected) State
```css
.icon-btn.active { color: var(--amber); border-color: rgba(245,166,35,0.3); }
```

### Round Variant
```css
.icon-btn.round { border-radius: 50%; }
```

## HTML Structure
```html
<!-- Default -->
<button class="icon-btn">&#9632;</button>

<!-- Small -->
<button class="icon-btn sm">&#9654;</button>

<!-- Active -->
<button class="icon-btn active">&#9733;</button>

<!-- Large round -->
<button class="icon-btn lg round">&#9881;</button>
```

## Size Variants

| Size | Width/Height | Font-Size |
|------|-------------|-----------|
| `.sm` | 28px | 12px |
| default | 36px | 14px |
| `.lg` | 44px | 18px |

## Material Variants
Default panel material. No explicit material variant classes.

## Theme Behavior
- Surface and border colors swap via tokens
- `--glossy-hi` remains constant
- Text colors swap via `--text-secondary` and `--text-primary`

## Constraints
1. MUST be square (width equals height).
2. Icon MUST be centered both horizontally and vertically.
3. Shadow stack follows standard Tier 2 pattern.
4. Round variant uses `border-radius: 50%` for circular shape.

## Accessibility
- Uses native `<button>` element
- Keyboard: Enter/Space to activate
- ARIA: Should include `aria-label` since there is no visible text
- Focus: Browser default focus ring preserved
