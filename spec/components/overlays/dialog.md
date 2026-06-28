---
name: Dialog
id: dialog
class: .phone-dialog
category: overlays
index: 5
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Dialog

## Physical Analog
**Reference devices**: Nokia phone confirmation dialogs, iPod "delete song?" prompt, camera "format card?" dialog.
**Mechanism**: A modal dialog box styled to match the device's design language -- rounded corners matching the phone's screen shape, soft-key button row at the bottom matching the physical soft-key buttons below the phone's screen. The elevated shadow (`shadow-deep`) makes the dialog appear to "float" above the underlying content.

## Geometry

| Property | Value |
|----------|-------|
| Max width | 220px |
| Padding | 16px |
| Border radius | `--radius-lg` (14px) |
| Content gap | 12px |
| Title font size | 11px |
| Body font size | 10px |
| Action button height | 32px |

## CSS Recipe

### Container (`.phone-dialog`)
```css
.phone-dialog {
  background: var(--bg-raised); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: 16px;
  box-shadow: var(--shadow-deep); max-width: 220px;
  display: flex; flex-direction: column; gap: 12px;
}
```

### Title (`.dialog-title`)
```css
.dialog-title { font-family: var(--font-ui); font-size: 11px; font-weight: 600; color: var(--text-primary); letter-spacing: 1px; text-align: center; }
```

### Body (`.dialog-body`)
```css
.dialog-body { font-family: var(--font-ui); font-size: 10px; color: var(--text-secondary); text-align: center; line-height: 1.6; }
```

### Actions (`.dialog-actions`)
```css
.dialog-actions { display: flex; gap: 8px; margin-top: 4px; }
.dialog-actions .gel-btn { flex: 1; height: 32px; min-width: 0; font-size: 9px; }
```

## HTML Structure
```html
<div class="phone-dialog">
  <div class="dialog-title">DELETE FILE?</div>
  <div class="dialog-body">This action cannot be undone. The file will be permanently removed.</div>
  <div class="dialog-actions">
    <button class="gel-btn">CANCEL</button>
    <button class="gel-btn pink">DELETE</button>
  </div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses standard raised surface with elevated shadow.

## Theme Behavior
- Background swaps via `--bg-raised`
- Shadow depth reduces in light mode via `--shadow-deep`
- Text colors adapt via tokens
- Action buttons (gel-btn) follow their own theme behavior

## Constraints
1. MUST use `--radius-lg` corners (matching phone screen shape)
2. MUST center-align title and body text
3. MUST use `flex-direction: column` with gap for consistent spacing
4. Action buttons MUST use `flex: 1` for equal-width buttons
5. MUST use `--shadow-deep` for floating elevation
6. Max width MUST be 220px (phone-proportioned)
7. Destructive action button MUST use `.pink` variant

## Accessibility
- Use `role="dialog"` and `aria-modal="true"`
- Include `aria-labelledby` pointing to the title element
- Include `aria-describedby` pointing to the body text
- Focus MUST be trapped within the dialog while open
- Escape key should dismiss (if cancellable)
- Focus should move to the first action button when dialog opens
- On close, focus returns to the trigger element
