---
name: Tab Bar
id: tab-bar
class: .tab-bar
category: navigation
index: 3
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Tab Bar

## Physical Analog
**Reference devices**: Nokia Symbian UI tabs, Sony Ericsson media player mode tabs, camera menu section tabs.
**Mechanism**: Derived from physical tabbed dividers in filing cabinets and ring binders. Each tab represents a category. The active tab appears "in front of" the others (connected to the content below), while inactive tabs appear recessed or separated. In hardware devices, this was often a row of physical buttons with a mode indicator LED above each.

## Geometry

| Property | Value |
|----------|-------|
| Layout | Flex row, equal-width items (`flex: 1`) |
| Border radius | `--radius-md` (8px) |
| Item padding | 8px 14px |
| Font size | 10px |
| Active indicator height | 2px |
| Bottom shadow | 2px |

## CSS Recipe

### Container (`.tab-bar`)
```css
.tab-bar {
  display: flex; background: var(--bg-raised);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  overflow: hidden; box-shadow: 0 2px 0 var(--border-deep);
}
```

### Tab Item (`.tab-item`)
```css
.tab-item {
  flex: 1; padding: 8px 14px; text-align: center;
  font-family: var(--font-ui); font-size: 10px; font-weight: 500;
  color: var(--text-muted); letter-spacing: 1px; cursor: pointer;
  transition: all 0.15s; position: relative; user-select: none;
  border-right: 1px solid var(--border-subtle); background: transparent;
  border-top: none; border-bottom: none;
}
.tab-item:last-child { border-right: none; }
```

### Hover
```css
.tab-item:hover { color: var(--text-primary); }
```

### Active
```css
.tab-item.active { color: var(--blue-info); background: linear-gradient(180deg, var(--glow-color), transparent); }
.tab-item.active::after {
  content: ''; position: absolute; bottom: 0; left: 4px; right: 4px;
  height: 2px; background: var(--blue-info); border-radius: 1px;
}
```

## HTML Structure
```html
<div class="tab-bar">
  <button class="tab-item active">PHOTO</button>
  <button class="tab-item">VIDEO</button>
  <button class="tab-item">AUDIO</button>
  <button class="tab-item">FILES</button>
</div>
```

## Size Variants
No size variants defined. Width is typically set by parent container.

## Material Variants
No material variants. Uses standard raised surface.

## Theme Behavior
- Background swaps via `--bg-raised` token
- Active indicator always uses `--blue-info`
- Separator borders swap via `--border-subtle`
- Bottom shadow adjusts via `--border-deep`

## Constraints
1. MUST use `flex: 1` on items so all tabs are equal width
2. MUST include 2px blue indicator bar on active tab via `::after`
3. MUST include vertical separators between tabs (`border-right`)
4. Only ONE tab can be `.active` at a time (radio behavior)
5. MUST use `overflow: hidden` on container to clip radius corners
6. MUST NOT use more than 5-6 tabs (becomes unreadable)

## Accessibility
- Container should have `role="tablist"`
- Each tab should be a `<button>` with `role="tab"`
- Active tab: `aria-selected="true"`
- Associated panel: `aria-controls="panel-id"` and `role="tabpanel"` on content
- Support Left/Right arrow key navigation
