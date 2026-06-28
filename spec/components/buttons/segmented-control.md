---
name: Segmented Control
id: segmented
class: .segmented
category: buttons
index: 9
materials: [panel, glossy]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Segmented Control

## Physical Analog
**Reference devices**: Camera mode selector (Photo/Video/Slow), audio input selector (Mic/Line/Phono), Sony MiniDisc player play-mode switch.
**Mechanism**: DIP switch bank or slide-selector switch. Row of mechanically interlocked buttons where pressing one releases the previously pressed button (mutually exclusive). Each button pushes a metal leaf contact onto a bus bar. Interlock mechanism ensures only one circuit is closed at a time.

## Geometry

| Property | Value |
|----------|-------|
| Track | Recessed (bg-inset with inset shadow) |
| Segment padding | 6px 14px |
| Border-radius | var(--radius-md) outer, -2px inner |
| Active segment | Raised with shadow and glossy highlight |

## CSS Recipe

### Container (Track)
```css
.segmented {
  display: inline-flex; background: var(--bg-inset);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  padding: 3px; box-shadow: var(--shadow-inset);
}
```

### Segment Item
```css
.segmented-item {
  padding: 6px 14px; border: none; background: transparent;
  font-family: var(--font-ui); font-size: 10px; font-weight: 500;
  letter-spacing: 1px; color: var(--text-muted); cursor: pointer;
  border-radius: calc(var(--radius-md) - 2px);
  transition: all 0.15s var(--snap-fast);
}
```

### Hover State
```css
.segmented-item:hover { color: var(--text-primary); }
```

### Active (Selected) State
```css
.segmented-item.active {
  background: var(--bg-surface); color: var(--amber);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 var(--glossy-hi);
}
```

## HTML Structure
```html
<div class="segmented">
  <button class="segmented-item active">PHOTO</button>
  <button class="segmented-item">VIDEO</button>
  <button class="segmented-item">SLOW</button>
</div>
```

## Size Variants
No explicit size variants defined.

## Material Variants
- Track: Recessed panel (phosphor screen cavity)
- Active segment: Raised glossy surface with specular highlight

## Theme Behavior
- `--bg-inset` provides the recessed track color per theme
- `--shadow-inset` adapts shadow intensity per theme
- Active segment surface and shadow adapt via tokens

## Constraints
1. Only ONE item can be `.active` at a time (radio behavior, NOT multi-select).
2. Active item MUST look physically raised relative to the track -- use shadow and highlight to create depth differential.
3. Track padding (3px) creates the visible gap between segment buttons and track walls.
4. Inner border-radius MUST be `calc(var(--radius-md) - 2px)` to nest correctly inside outer radius.

## Accessibility
- Uses native `<button>` elements
- Keyboard: Arrow keys to navigate between segments, Enter to select
- ARIA: Container should use `role="radiogroup"`, items should use `role="radio"` with `aria-checked`
- Requires JS to toggle `.active` class between items (mutual exclusion)
