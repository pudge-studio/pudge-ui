---
name: Spinners
id: spinners
class: .spinner
category: indicators
index: 7
materials: [glossy-polycarbonate, chrome]
sizes: [default]
interactive: false
requires_js: false
canvas: false
---

# Spinners

## Physical Analog
**Reference devices**: Loading indicators on iPod, "please wait" indicators on cameras during write operations.
**Mechanism**: Two variants. Ring spinner: a circular ring with one segment highlighted, rotating continuously (derived from the spinning hourglass/watch cursor). CD spinner: a disc that spins continuously, resembling a compact disc rotating in a player with center hole and disc texture.

## Geometry

| Property | Value |
|----------|-------|
| Ring spinner size | 32x32px |
| Ring border width | 3px |
| CD spinner size | 40x40px |
| CD border width | 2px |
| CD center hole | 6x6px |
| CD inner ring | 4px inset |

## CSS Recipe

### Ring Spinner (`.spinner`)
```css
.spinner { width: 32px; height: 32px; border-radius: 50%; border: 3px solid var(--border-subtle); border-top-color: var(--blue-info); animation: spin 0.8s linear infinite; }
```

### CD Spinner (`.cd-spinner`)
```css
.cd-spinner {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, var(--bg-surface), var(--bg-panel));
  border: 2px solid var(--border-mid); position: relative;
  animation: spin 3s linear infinite;
  box-shadow: inset 0 0 0 4px var(--bg-inset);
}
.cd-spinner::after {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted);
}
```

### Spin animation
```css
@keyframes spin { to{transform:rotate(360deg)} }
```

## HTML Structure
```html
<!-- Ring spinner -->
<div class="spinner"></div>

<!-- CD spinner -->
<div class="cd-spinner"></div>
```

## Size Variants
No size variants defined.

## Material Variants

| Variant | Class | Analog | Speed |
|---------|-------|--------|-------|
| Ring | `.spinner` | Digital loading cursor | 0.8s/revolution |
| CD | `.cd-spinner` | Compact disc in player | 3s/revolution |

## Theme Behavior
- Ring spinner: track uses `--border-subtle`, active segment uses `--blue-info`
- CD spinner: disc surface adapts via `--bg-surface`/`--bg-panel` gradient
- CD center hole uses `--bg-inset`
- Both animate continuously with CSS `@keyframes`

## Constraints
1. Ring spinner MUST rotate at 0.8s/revolution (fast, urgent indicator)
2. CD spinner MUST rotate at 3s/revolution (slow, leisurely like a real CD)
3. Ring spinner MUST use `border-top-color` for the active segment
4. CD spinner MUST include center hole via `::after` pseudo-element
5. CD spinner MUST include inner ring via `inset 0 0 0 4px` box-shadow
6. Both MUST use `animation: spin linear infinite` (constant speed, no easing)
7. MUST use circular shape (border-radius: 50%)

## Accessibility
- Include `role="status"` and `aria-label="Loading"`
- Or use `role="progressbar"` with `aria-busy="true"` for indeterminate loading
- Consider `prefers-reduced-motion` media query to pause or slow animations
