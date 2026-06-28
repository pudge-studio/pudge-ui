---
name: Gel Button
id: gel-btn
class: .gel-btn
category: buttons
index: 2
materials: [glossy-polycarbonate]
sizes: [xs, sm, md, lg]
interactive: true
requires_js: false
canvas: false
---

# Gel Button

## Physical Analog
**Reference devices**: iPod Nano 3rd gen click buttons, Sony Ericsson W800i keys, PSP face buttons.
**Mechanism**: Dome-switch mechanism with transparent/translucent polycarbonate (Lexan) keycap, injection-molded with high-gloss finish. 2-3mm thick, slightly convex. Strong specular highlight from Fresnel reflection at air-plastic interface.

## Geometry

| Property | Value |
|----------|-------|
| Keycap material | Transparent/translucent polycarbonate |
| Surface | High-gloss, slightly convex |
| Catch-light | Concentrated bright reflection on upper third, fading to transparent |
| Thickness | 2-3mm polycarbonate |
| Shadow depth | 3px (taller than push-btn's 2px) |

## CSS Recipe

### Default State
```css
.gel-btn {
  display: inline-flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 2px;
  font-family: var(--font-ui); font-size: 11px; font-weight: 500;
  letter-spacing: 1px; color: var(--text-primary);
  background: linear-gradient(180deg, var(--clear-glass), transparent 50%),
              linear-gradient(180deg, var(--bg-surface), var(--bg-panel));
  border: none; border-radius: var(--radius-md); cursor: pointer;
  position: relative; outline: none; user-select: none;
  height: 38px; min-width: 64px; padding: 0 16px;
  box-shadow: 0 3px 0 var(--border-deep), inset 0 1px 0 var(--glossy-hi);
  transition: transform 0.07s var(--snap-fast), box-shadow 0.07s var(--snap-fast);
}
```

### Active (Pressed) State
```css
.gel-btn:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 var(--border-deep), inset 0 1px 0 transparent;
}
```

### Selected State
```css
.gel-btn.active { color: var(--blue-info); }
.gel-btn.active::after {
  content: ''; position: absolute; bottom: 5px;
  left: 50%; transform: translateX(-50%);
  width: 18px; height: 2px; background: var(--blue-info); border-radius: 1px;
}
```

### Color Variants
```css
.gel-btn.blue { color: var(--blue-info); }
.gel-btn.green { color: var(--green-on); }
.gel-btn.pink { color: var(--pink-action); }
```

### Disabled State
```css
.gel-btn[disabled] { opacity: 0.4; pointer-events: none; }
```

## HTML Structure
```html
<!-- Basic -->
<button class="gel-btn">GEL</button>

<!-- Color variants -->
<button class="gel-btn blue">BLUE</button>
<button class="gel-btn green">GREEN</button>
<button class="gel-btn pink">PINK</button>

<!-- Selected -->
<button class="gel-btn active">SELECTED</button>

<!-- Sizes -->
<button class="gel-btn xs">XS</button>
<button class="gel-btn lg">LARGE</button>
```

## Size Variants

| Size | Height | Min-Width | Font-Size | Padding |
|------|--------|-----------|-----------|---------|
| `.xs` | 28px | 44px | 9px | 0 10px |
| `.sm` | 32px | 52px | 10px | 0 12px |
| default | 38px | 64px | 11px | 0 16px |
| `.lg` | 44px | 80px | 13px | 0 20px |

## Material Variants
Single material: glossy polycarbonate. The two-layer background is the defining characteristic.

## Theme Behavior
- `--clear-glass` swaps: dark = `rgba(255,255,255,0.08)`, light = `rgba(255,255,255,0.5)`
- `--glossy-hi` remains constant at `rgba(255,255,255,0.14)`
- Surface colors swap via tokens

## Constraints
1. The two-layer background is MANDATORY. A single gradient cannot produce the gel look.
2. The catch-light MUST fade to `transparent` (not to a color) so the underlying body gradient shows through.
3. `glossy-hi` MUST be `0.14` opacity, not `0.06`. This is the primary differentiator from rubber buttons.
4. Bottom shadow MUST be 3px (not 2px) because polycarbonate buttons sit taller than panel buttons.
5. Press travel is 2px (not 1px like push-btn) due to the thicker keycap.

## Accessibility
- Uses native `<button>` element
- Keyboard: Enter/Space to activate
- Focus: Browser default focus ring preserved
- Color variants are decorative; do not rely on color alone for state
