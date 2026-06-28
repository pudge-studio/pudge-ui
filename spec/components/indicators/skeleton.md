---
name: Skeleton Loading
id: skeleton
class: .skeleton-wrap
category: indicators
index: 8
materials: []
sizes: [default]
interactive: false
requires_js: false
canvas: false
---

# Skeleton Loading

## Physical Analog
**Reference devices**: Device boot sequences (Palm, iPod, early smartphones showing "loading" bars during startup).
**Mechanism**: Derived from the boot sequence of embedded devices. During startup, the device shows progressive loading indicators as each subsystem initializes. The pulsing animation (`skeletonPulse`) indicates active processing -- the system is working but content is not yet ready to display.

## Geometry

| Property | Value |
|----------|-------|
| Container width | 200px |
| Container padding | 16px |
| Line height | 8px (text lines), 28px (block) |
| Line border-radius | 4px |
| Line gap | 10px |
| Pulse animation | 1.5s |
| Lines 2 width | 70% |
| Lines 3 width | 50% |

## CSS Recipe

### Container (`.skeleton-wrap`)
```css
.skeleton-wrap {
  width: 200px; padding: 16px; display: flex; flex-direction: column; gap: 10px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}
```

### Lines (`.skeleton-line`)
```css
.skeleton-line {
  height: 8px; border-radius: 4px; background: var(--bg-surface);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}
.skeleton-line:nth-child(2) { width: 70%; }
.skeleton-line:nth-child(3) { width: 50%; }
.skeleton-line:nth-child(4) { height: 28px; }
```

### Pulse animation
```css
@keyframes skeletonPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
```

## HTML Structure
```html
<div class="skeleton-wrap">
  <div class="skeleton-line"></div>
  <div class="skeleton-line"></div>
  <div class="skeleton-line"></div>
  <div class="skeleton-line"></div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses recessed inset container with surface-colored lines.

## Theme Behavior
- Container background uses `--bg-inset` (recessed)
- Lines use `--bg-surface` (slightly lighter than container)
- Both adapt automatically via theme tokens
- Pulse animation opacity range (0.4 to 0.8) is constant

## Constraints
1. MUST use pulsing opacity animation (0.4 to 0.8 at 1.5s cycle)
2. Lines MUST vary in width to simulate varied content (100%, 70%, 50%)
3. Last line SHOULD be taller (28px) to simulate a content block
4. Container MUST use recessed styling (`--bg-inset`)
5. Lines MUST use 4px border-radius for rounded appearance
6. Gap between lines MUST be 10px
7. Animation MUST use `ease-in-out` for smooth breathing effect

## Accessibility
- Container should have `role="status"` and `aria-label="Content loading"`
- Or use `aria-busy="true"` on the parent content region
- Consider `prefers-reduced-motion` to reduce or stop the pulse animation
