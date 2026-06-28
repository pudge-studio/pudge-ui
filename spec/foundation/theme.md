# Theme System

How light and dark themes work in pudge-ui — the switching mechanism, what properties change between themes, and which components need explicit overrides beyond token swaps.

---

## Mechanism

Theme is controlled by `data-theme` attribute on `<html>`:
```html
<html lang="en" data-theme="dark">
```

Toggle via JS:
```javascript
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
```

## What Changes Between Themes

| Property | Dark | Light |
|----------|------|-------|
| Surface colors | Dark warm grays | Cream/white warm tones |
| Text colors | Light on dark | Dark on light |
| Border colors | Subtle dark lines | Subtle light lines |
| Shadows | High opacity (0.5+) | Low opacity (0.08) |
| Rubber material | Dark `#2a2826` | Light `#c8c4bc` |
| Clear glass | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.5)` |
| Inset shadow | Strong `rgba(0,0,0,0.6)` | Subtle `rgba(0,0,0,0.08)` |
| Toggle on-state | Dark green `#0d1a0d` | Light green `#d0f0d0` |

## Components with Theme-Specific Overrides

Some components need explicit `[data-theme="light"]` overrides beyond token swaps:
- **Cylindrical dials**: Light backgrounds need reduced knurl opacity
- **Dial vignettes**: Must match the cylinder background color
- **Toggle thumbs**: Need brighter gradients in light mode
- **Rubber buttons**: Active state needs light green tones
