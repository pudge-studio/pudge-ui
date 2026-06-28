---
name: Clear/Glass Button
id: clear-btn
class: .clear-btn
category: buttons
index: 4
materials: [glass]
sizes: [md]
interactive: true
requires_js: false
canvas: false
---

# Clear/Glass Button

## Physical Analog
**Reference devices**: iMac G3 (1998) power button, clear PSP UMD door latch, transparent phone cases (2003-2006 era).
**Mechanism**: Dome switch underneath with optically clear or frosted PMMA (acrylic) / polycarbonate keycap. Chemically etched or bead-blasted surface scatters light creating translucent diffusion effect.

## Geometry

| Property | Value |
|----------|-------|
| Material | Clear or frosted PMMA / polycarbonate |
| Surface | Transparent with light scattering |
| Shadow | None (glass sits flush, minimal edge profile) |
| Blur | 4px backdrop-filter for frosted glass effect |

## CSS Recipe

### Default State
```css
.clear-btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-ui); font-size: 10px; font-weight: 500;
  letter-spacing: 1px; color: var(--text-secondary);
  background: var(--clear-glass);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  cursor: pointer; backdrop-filter: blur(4px);
  height: 36px; min-width: 60px; padding: 0 12px;
  transition: background 0.15s, border-color 0.15s;
}
```

### Hover State
```css
.clear-btn:hover { background: var(--glossy-md); border-color: var(--border-mid); }
```

### Active (Pressed) State
```css
.clear-btn:active { transform: translateY(1px); }
```

### Active (Selected) State
```css
.clear-btn.active { border-color: var(--blue-info); color: var(--blue-info); }
```

## HTML Structure
```html
<!-- Basic -->
<button class="clear-btn">CLEAR</button>

<!-- Active -->
<button class="clear-btn active">ACTIVE</button>
```

## Size Variants
No explicit size variants defined. Default only.

## Material Variants
Single material: glass (translucent). No gradient, flat transparency with `backdrop-filter`.

## Theme Behavior
- Dark: `--clear-glass: rgba(255,255,255,0.08)` -- mostly transparent
- Light: `--clear-glass: rgba(255,255,255,0.5)` -- more opaque frosted effect
- Border colors swap via `--border-subtle` token

## Constraints
1. Background MUST be flat `rgba` (no gradient). Glass does not have gradient appearance.
2. `backdrop-filter: blur(4px)` is REQUIRED for the frosted glass effect.
3. MUST NOT have a bottom-edge shadow (`0 Npx 0`). Glass does not cast the same hard edge as plastic.
4. Border MUST be subtle (1px solid border-subtle). Glass edges are thin.

## Accessibility
- Uses native `<button>` element
- Keyboard: Enter/Space to activate
- Focus: Browser default focus ring preserved
