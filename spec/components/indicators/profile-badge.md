---
name: Profile Badge
id: profile-badge
class: .pp-badge
category: indicators
index: 6
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Profile Badge

## Physical Analog
**Reference devices**: Sony cameras display the active picture profile (PP1-PP11, S-Log3, HLG) as a small rectangular indicator.
**Mechanism**: Compact key-value pair display. This component replicates the small rectangular indicator showing the active picture profile on Sony camera displays.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 4px 10px |
| Border radius | `--radius-sm` (4px) |
| Key font size | 7px |
| Value font size | 12px |
| Gap | 1px |

## CSS Recipe

### Container (`.pp-badge`)
```css
.pp-badge {
  display: inline-flex; flex-direction: column; align-items: center;
  background: var(--bg-panel); border: 1px solid var(--border-mid);
  border-radius: var(--radius-sm); padding: 4px 10px;
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 var(--border-hi);
  gap: 1px; cursor: pointer; transition: background 0.1s;
}
```

### Hover
```css
.pp-badge:hover { background: var(--bg-surface); }
```

### Key label (`.pp-key`)
```css
.pp-key { font-size: 7px; letter-spacing: 2px; color: var(--text-muted); font-family: var(--font-ui); }
```

### Value (`.pp-val`)
```css
.pp-val { font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); letter-spacing: 1px; }
```

### Active state
```css
.pp-badge.active-pp .pp-val { color: var(--amber); }
```

## HTML Structure
```html
<div class="pp-badge active-pp">
  <span class="pp-key">PP</span>
  <span class="pp-val">S-Log3</span>
</div>
<div class="pp-badge">
  <span class="pp-key">PP</span>
  <span class="pp-val">HLG</span>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses Tier 2 raised depth model.

## Theme Behavior
- Background swaps via `--bg-panel`
- Hover background uses `--bg-surface`
- Active value uses `--amber` (constant across themes)
- Shadow stack adapts via tokens

## Constraints
1. Layout MUST be vertical column (key above, value below)
2. MUST use `--radius-sm` (4px), smaller than mode badge
3. Key label MUST be 7px with 2px letter-spacing
4. Value MUST use monospace font (`--font-mono`) for data consistency
5. Active profile MUST highlight value in amber
6. MUST be interactive (cursor: pointer, hover state)
7. Gap between key and value MUST be minimal (1px)

## Accessibility
- Should have `role="radio"` if part of a selection group, or `role="button"` for standalone
- Active state: `aria-pressed="true"` or `aria-selected="true"`
- Include `aria-label` with full description: "Picture Profile: S-Log3 (active)"
