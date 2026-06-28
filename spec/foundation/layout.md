# Layout Patterns

Page structure, grid system, and responsive breakpoints used to compose pudge-ui components into full layouts.

---

## Page Structure

```
[Sticky Nav]           — .dir-nav, position: sticky, top: 0, z-index: 100
[Page Header]          — .page-header, 48px padding
[Section]              — .section, 48px left/right padding
  [Section Header]     — .section-header, flex baseline, bottom border
  [Component Row]      — .component-row, flex wrap, 36px gap
    [Component Block]  — .component-block, flex column, 10px gap
      [Label]          — .component-label, uppercase eyebrow
      [Component]      — the actual component
      [Spec Table]     — .spec-table, annotation
[Divider]              — .divider, 1px line
```

## Grid System

Panels use CSS Grid with `auto-fit` and `minmax`:
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 24px;
```

## Responsive Breakpoints

- **720px and below**: Padding reduces to 16px, title shrinks, component rows reflow to column
