---
name: Popover
id: popover
class: .popover
category: overlays
index: 11
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Popover

## Physical Analog
**Reference devices**: Equipment info panels, camera setting detail popups, expanded parameter displays.
**Mechanism**: A floating content panel that appears near a trigger element to show additional information or controls. Unlike tooltips (read-only, small), popovers can contain interactive content and are larger. Distinguished from dialogs by not requiring a backdrop overlay.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 10px 14px |
| Border radius | `--radius-md` (8px) |
| Max width | 180px |
| Font size | 10px |
| Line height | 1.6 |
| Shadow | 0 4px 16px rgba(0,0,0,0.3) |

## CSS Recipe

### Container (`.popover`)
```css
.popover {
  padding: 10px 14px; background: var(--bg-raised);
  border: 1px solid var(--border-mid); border-radius: var(--radius-md);
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  font-family: var(--font-ui); font-size: 10px; color: var(--text-secondary);
  max-width: 180px; line-height: 1.6;
}
```

## HTML Structure
```html
<div class="popover">
  Additional details and controls appear here. This panel can contain interactive elements.
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses standard raised surface with floating shadow.

## Theme Behavior
- Background swaps via `--bg-raised`
- Border adapts via `--border-mid`
- Text uses `--text-secondary` (slightly muted, secondary reading)
- Shadow reduces in light mode

## Constraints
1. MUST use `--radius-md` (between tooltip's sm and panel's lg)
2. Max width MUST be 180px (compact, not a full panel)
3. Shadow MUST be 0 4px 16px (floating above surface, between tooltip and modal depth)
4. Text MUST use `--text-secondary` (secondary information context)
5. MUST NOT use backdrop overlay (popovers are non-modal)

## Accessibility
- Trigger should have `aria-haspopup="true"` and `aria-expanded="true/false"`
- Popover should have `role="dialog"` (if interactive) or an appropriate role
- Popover should be dismissible with Escape key
- If interactive, focus should move to popover content
- Clicking outside should dismiss the popover
