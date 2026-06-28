---
name: Push Button
id: push-btn
class: .push-btn
category: buttons
index: 1
materials: [panel, rubber, glossy]
sizes: [xs, sm, md, lg, xl]
interactive: true
requires_js: false
canvas: false
---

# Push Button

## Physical Analog
**Reference devices**: Sony Alpha rear panel buttons, Nikon D-series function buttons, Canon EOS rear controls.
**Mechanism**: Tactile dome switch (phosphor-bronze or stainless steel dome over PCB contact pad). Dome collapses at 160-260gf, creating an abrupt click and closing the circuit. Dome spring memory restores shape on release.

## Geometry

| Property | Value |
|----------|-------|
| Keycap | Injection-molded ABS or polycarbonate, 6-12mm wide, 2-3mm proud |
| Surface | Slightly convex (domed) so finger naturally centers |
| Chamfer | 30-45 degree CNC-milled bevel |
| Travel | 0.3-0.5mm (extremely short) |
| Gap beneath | 1-2mm proud of panel surface |

## CSS Recipe

### Default State
```css
.push-btn {
  display: inline-flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 2px;
  font-family: var(--font-mono); font-size: 10px; font-weight: 500;
  letter-spacing: 1px; color: var(--text-primary);
  background: linear-gradient(180deg, var(--bg-surface), var(--bg-panel));
  border: none; border-radius: var(--radius-md); cursor: pointer;
  position: relative; outline: none; user-select: none;
  height: 36px; min-width: 64px; padding: 0 16px;
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 var(--border-hi), inset 0 -1px 0 #111;
  transition: transform 0.07s ease, box-shadow 0.07s ease, color 0.12s ease;
}
```

### Hover State
```css
.push-btn:hover { color: #fff; }
```

### Active / Pressed State
```css
.push-btn:active, .push-btn.pressed {
  transform: translateY(1px);
  box-shadow: 0 1px 0 var(--border-deep), inset 0 1px 0 #1a1a1a, inset 0 -1px 0 #111;
}
```

### Active (Selected) State
```css
.push-btn.active { color: var(--amber); }
.push-btn.active::after {
  content: ''; position: absolute; bottom: 5px;
  left: 50%; transform: translateX(-50%);
  width: 20px; height: 2px; background: var(--amber);
  border-radius: 1px; box-shadow: 0 0 6px var(--amber-glow);
}
```

### Disabled State
```css
.push-btn.disabled, .push-btn[disabled] { opacity: 0.35; pointer-events: none; }
```

### Error & Special States
```css
.push-btn.state-amber { color: var(--amber); border-top: 1px solid rgba(245,166,35,0.2); }
.push-btn.error { color: var(--red-alert); border-top: 1px solid rgba(204,34,0,0.2); }
.push-btn.round { border-radius: 50%; width: 44px; height: 44px; min-width: auto; padding: 0; }
```

### Light Theme Override
```css
[data-theme="light"] .push-btn {
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 var(--border-mid);
}
```

## HTML Structure
```html
<!-- Basic -->
<button class="push-btn">LABEL</button>

<!-- With size -->
<button class="push-btn sm">SM</button>

<!-- Active state -->
<button class="push-btn active">ACTIVE</button>

<!-- Round variant -->
<button class="push-btn round">Fn</button>

<!-- Disabled -->
<button class="push-btn disabled">DISABLED</button>
```

## Size Variants

| Size | Analog | Height | Min-Width | Font-Size | Padding |
|------|--------|--------|-----------|-----------|---------|
| `.xs` | Tiny Fn buttons on Sony A7 shoulder | 26px | 36px | 9px | 0 10px |
| `.sm` | Standard rear panel button | 32px | 48px | 10px | 0 12px |
| default | Main function button | 36px | 64px | 10px | 0 16px |
| `.lg` | Menu/Play button | 40px | 80px | 11px | 0 20px |
| `.xl` | Large labeled button (pro video cameras) | 44px | 96px | 12px | 0 24px |

## Material Variants
Default material is panel (linear-gradient from bg-surface to bg-panel). No explicit material variant classes on this component.

## Theme Behavior
- Dark: `box-shadow` uses `var(--border-deep)` + `var(--border-hi)` + `#111`
- Light: `box-shadow` uses `var(--border-deep)` + `rgba(255,255,255,0.6)` + `var(--border-mid)`
- All surface colors swap via CSS custom properties

## Constraints
1. Travel MUST be 1-2px maximum (`translateY(1px)`). More feels like a keyboard key, not a camera button.
2. Bottom shadow MUST be hard-edged `0 Npx 0` (no blur) -- the gap between keycap and chassis is a sharp physical edge.
3. On press, bottom shadow MUST collapse to `0 1px 0` -- the gap nearly closes as the dome compresses.
4. Hover state MUST subtly brighten text to white, simulating finger shadow changing light on keycap.
5. The three-plane shadow stack (bottom edge + top chamfer + bottom chamfer) MUST NOT be simplified.

## Accessibility
- Uses native `<button>` element
- Keyboard: Enter/Space to activate
- Focus: Browser default focus ring preserved
- Disabled state uses `pointer-events: none` and `opacity: 0.35`
- ARIA: No additional ARIA needed (native button semantics)
