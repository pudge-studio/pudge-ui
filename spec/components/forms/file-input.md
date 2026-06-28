---
name: File Input
id: file-input
class: .file-input
category: forms
index: 6
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# File Input

## Physical Analog
**Reference devices**: CompactFlash card slot on Nikon cameras, SD card slot on Sony cameras, Memory Stick slot on Sony devices.
**Mechanism**: A spring-loaded card slot with an eject mechanism. The user pushes a memory card into a recessed slot until it clicks (a spring-loaded catch engages). To remove, the user pushes the card again (push-push release mechanism) or presses an adjacent eject button. The dashed border in the UI represents the card slot opening, and the eject button icon represents the physical eject mechanism.

## Geometry

| Property | Value |
|----------|-------|
| Width | 220px |
| Padding | 10px 14px |
| Border | 2px dashed |
| Border radius | `--radius-md` (8px) |
| Icon font size | 18px |
| Text font size | 10px |
| Eject button | 24x24px |
| Element gap | 10px |

## CSS Recipe

### Container (`.file-input`)
```css
.file-input {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; background: var(--bg-surface);
  border: 2px dashed var(--border-mid); border-radius: var(--radius-md);
  cursor: pointer; transition: border-color 0.15s;
  width: 220px;
}
```

### Hover
```css
.file-input:hover { border-color: var(--amber); }
```

### Icon (`.file-input-icon`)
```css
.file-input-icon { font-size: 18px; color: var(--text-muted); }
```

### Text (`.file-input-text`)
```css
.file-input-text { font-family: var(--font-ui); font-size: 10px; font-weight: 500; color: var(--text-muted); letter-spacing: 1px; }
```

### Eject button (`.file-input-eject`)
```css
.file-input-eject {
  margin-left: auto; width: 24px; height: 24px; border-radius: var(--radius-sm);
  background: var(--bg-panel); border: 1px solid var(--border-subtle);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; color: var(--text-muted); cursor: pointer;
}
```

## HTML Structure
```html
<div class="file-input">
  <span class="file-input-icon">&#128190;</span>
  <span class="file-input-text">INSERT CARD</span>
  <div class="file-input-eject">&#9166;</div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses raised surface background with dashed border for the slot opening.

## Theme Behavior
- Background swaps via `--bg-surface`
- Border color swaps via `--border-mid`
- Hover border always uses `--amber`
- Eject button adapts via panel/subtle tokens

## Constraints
1. MUST use dashed border (2px) to represent the card slot opening
2. MUST include eject button on the right side
3. Hover MUST highlight border in amber (card slot LED indicator)
4. MUST use `margin-left: auto` on eject to push it to the right
5. Label text MUST use uppercase with letter-spacing (equipment labeling convention)
6. Eject button MUST be 24x24px square with `--radius-sm` corners

## Accessibility
- Should wrap a hidden `<input type="file">` element
- Container should be labelled with `aria-label="File upload"` or associated label
- Eject button should have `aria-label="Remove file"` and `role="button"`
- Support keyboard activation (Enter/Space to open file dialog)
- After file is selected, display filename in the text area
