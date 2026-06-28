---
name: Toast
id: toast
class: .toast
category: overlays
index: 6
materials: [glossy-polycarbonate]
sizes: [default]
interactive: false
requires_js: true
canvas: false
---

# Toast

## Physical Analog
**Reference devices**: Nokia SMS arrival notification, iPod song change notification, camera "image saved" confirmation.
**Mechanism**: A transient notification bar that appears briefly and then dismisses automatically. The entry animation (`toastIn`) slides the element down from above with a slight scale-up -- simulating the way early phone notifications would "slide down" from the top of the screen. The animation uses `--snap-soft` easing for a damped settling effect.

## Geometry

| Property | Value |
|----------|-------|
| Min width | 180px |
| Padding | 8px 12px |
| Border radius | `--radius-md` (8px) |
| Element gap | 8px |
| Text font size | 10px |
| Time font size | 9px |
| Animation duration | 0.3s |

## CSS Recipe

### Container (`.toast`)
```css
.toast {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-raised); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); padding: 8px 12px; min-width: 180px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  animation: toastIn 0.3s var(--snap-soft);
}
```

### Entry animation
```css
@keyframes toastIn { from{opacity:0;transform:translateY(-8px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
```

### Text (`.toast-text`)
```css
.toast-text { font-family: var(--font-ui); font-size: 10px; font-weight: 500; color: var(--text-primary); letter-spacing: 0.5px; }
```

### Time (`.toast-time`)
```css
.toast-time { font-family: var(--font-mono); font-size: 9px; color: var(--text-muted); margin-left: auto; flex-shrink: 0; }
```

## HTML Structure
```html
<div class="toast">
  <div class="led-dot green"></div>
  <span class="toast-text">File saved successfully</span>
  <span class="toast-time">12:45</span>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses standard raised surface.

## Theme Behavior
- Background swaps via `--bg-raised`
- Shadow reduces in light mode (0.2 ambient)
- Text colors adapt via tokens
- LED dot follows its own color rules

## Constraints
1. MUST use `toastIn` animation on appearance
2. Animation MUST use `--snap-soft` easing (damped settle)
3. MUST include status LED dot on the left for type indication
4. Time MUST use monospace font and be pushed to the right via `margin-left: auto`
5. MUST auto-dismiss after a timeout (JS responsibility, typically 3-5s)
6. Animation MUST include both translateY and scale for natural appearance

## Accessibility
- Use `role="alert"` or `role="status"` with `aria-live="polite"`
- If auto-dismissing, provide sufficient time to read (min 5 seconds)
- Should not interrupt screen reader announcements in progress
- Consider providing a way to pause auto-dismiss on hover/focus
