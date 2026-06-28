# Accessibility

Accessibility requirements for all pudge-ui components — color contrast ratios, focus management, screen reader support, and keyboard interaction patterns.

---

## Color Contrast

All text/background combinations meet WCAG AA minimum (4.5:1 for normal text):
- `--text-primary` on `--bg-base`: 11.2:1 (dark), 12.8:1 (light)
- `--text-secondary` on `--bg-base`: 5.1:1 (dark), 5.8:1 (light)
- `--amber` on `--bg-inset`: 6.3:1

## Focus Management

- Use native `<button>` elements for all interactive controls
- Browser default focus rings are preserved (not overridden)
- For custom controls (toggles, dials), add `tabindex="0"` and `role` attributes

## Screen Reader Text

```html
<span class="sr-only">Description for screen readers</span>
```
Uses the standard visually-hidden technique (1x1px, overflow hidden, clip rect).

## Keyboard Interaction Patterns

- **Buttons**: Enter/Space to activate
- **Toggles**: Space to toggle
- **Tabs**: Arrow keys to navigate, Enter to select
- **Steppers**: Arrow keys to increment/decrement
- **Accordion**: Enter/Space to expand/collapse
