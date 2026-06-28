---
name: Modal
id: modal
class: .modal-overlay
category: overlays
index: 10
materials: [glass, glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Modal

## Physical Analog
**Reference devices**: Device screen overlay, camera settings overlay, phone OS modal sheets.
**Mechanism**: A full-screen backdrop with a centered content panel. The backdrop uses semi-transparent black with backdrop-filter blur to dim and defocus the underlying content, simulating a device screen that has been partially obscured by a system-level overlay.

## Geometry

| Property | Value |
|----------|-------|
| Overlay size | 300x200px (demo) |
| Overlay background | rgba(0,0,0,0.6) |
| Blur | 4px |
| Content max-width | 240px |
| Content padding | 20px |
| Content border radius | `--radius-lg` (14px) |
| Content shadow | 0 8px 32px rgba(0,0,0,0.4) |

## CSS Recipe

### Overlay (`.modal-overlay`)
```css
.modal-overlay {
  width: 300px; height: 200px; position: relative;
  background: rgba(0,0,0,0.6); border-radius: var(--radius-lg);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(4px);
}
```

### Content (`.modal-content`)
```css
.modal-content {
  background: var(--bg-raised); border: 1px solid var(--border-mid);
  border-radius: var(--radius-lg); padding: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  max-width: 240px; width: 100%;
}
```

## HTML Structure
```html
<div class="modal-overlay">
  <div class="modal-content">
    <!-- modal content here -->
  </div>
</div>
```

## Size Variants
No size variants defined. Content panel sizes to content.

## Material Variants
- Overlay: glass material (backdrop-filter blur)
- Content panel: standard raised surface

## Theme Behavior
- Overlay background is fixed rgba(0,0,0,0.6) in both themes
- Content panel background swaps via `--bg-raised`
- Content shadow is stronger than standard panels (0.4 opacity)

## Constraints
1. Overlay MUST use `backdrop-filter: blur(4px)` for frosted glass effect
2. Overlay MUST be 60% opaque black
3. Content panel MUST use elevated shadow (0 8px 32px, stronger than standard)
4. Content MUST be centered via flex
5. Content MUST use `--radius-lg` corners
6. In production, overlay should cover full viewport with `position: fixed; inset: 0`

## Accessibility
- Overlay should have `role="dialog"` and `aria-modal="true"`
- Include `aria-labelledby` for the modal title
- Focus MUST be trapped within the modal
- Escape key should close the modal
- Background content should have `aria-hidden="true"` and `inert` while modal is open
- Focus returns to trigger element on close
