---
name: Rack Panel
id: rack-panel
class: .rack-panel
category: navigation
index: 6
materials: [brushed-metal]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Rack Panel

## Physical Analog
**Reference devices**: 19-inch rack-mount audio equipment front panels (Mackie, PreSonus, Behringer), modular synthesizer panels.
**Mechanism**: Derived from the 19-inch equipment rack standard (EIA-310). Audio, broadcast, and server equipment is mounted in standardized racks where each device occupies 1-4 "rack units" (1U = 1.75 inches / 44.45mm). The front panel of each device has controls and indicators arranged in a vertical strip. When multiple devices are stacked, they form a vertical sidebar of labeled modules.

## Geometry

| Property | Value |
|----------|-------|
| Width | 200px |
| Border radius | `--radius-lg` (14px) |
| Slot padding | 10px 14px |
| Indicator width | 4px |
| Indicator height | 20px |
| Font size | 10px |

## CSS Recipe

### Container (`.rack-panel`)
```css
.rack-panel {
  width: 200px; background: var(--bg-raised);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);
  box-shadow: var(--shadow-deep); overflow: hidden;
}
```

### Slot (`.rack-slot`)
```css
.rack-slot {
  padding: 10px 14px; border-bottom: 1px solid var(--border-subtle);
  cursor: pointer; transition: background 0.12s;
  display: flex; align-items: center; gap: 8px;
}
.rack-slot:last-child { border-bottom: none; }
```

### Hover
```css
.rack-slot:hover { background: var(--glow-color); }
```

### Active
```css
.rack-slot.active { background: var(--glow-color); }
```

### Indicator (`.rack-slot-indicator`)
```css
.rack-slot-indicator { width: 4px; height: 20px; border-radius: 2px; background: var(--border-mid); flex-shrink: 0; }
.rack-slot.active .rack-slot-indicator { background: var(--amber); box-shadow: 0 0 6px var(--amber-glow); }
```

### Label (`.rack-slot-label`)
```css
.rack-slot-label { font-family: var(--font-ui); font-size: 10px; font-weight: 500; color: var(--text-secondary); letter-spacing: 1px; }
.rack-slot.active .rack-slot-label { color: var(--amber); }
```

## HTML Structure
```html
<div class="rack-panel">
  <div class="rack-slot active">
    <div class="rack-slot-indicator"></div>
    <span class="rack-slot-label">CHANNEL 1</span>
  </div>
  <div class="rack-slot">
    <div class="rack-slot-indicator"></div>
    <span class="rack-slot-label">CHANNEL 2</span>
  </div>
  <div class="rack-slot">
    <div class="rack-slot-indicator"></div>
    <span class="rack-slot-label">CHANNEL 3</span>
  </div>
  <div class="rack-slot">
    <div class="rack-slot-indicator"></div>
    <span class="rack-slot-label">AUX SEND</span>
  </div>
  <div class="rack-slot">
    <div class="rack-slot-indicator"></div>
    <span class="rack-slot-label">MASTER</span>
  </div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses standard raised surface with deep shadow.

## Theme Behavior
- Background swaps via `--bg-raised` token
- Active indicator always uses `--amber` with amber glow
- Inactive indicator uses `--border-mid` (adapts to theme)
- Label color swaps between `--text-secondary` (inactive) and `--amber` (active)

## Constraints
1. MUST include 4px vertical LED indicator on left edge of each slot
2. Active channel indicator MUST glow amber (`0 0 6px var(--amber-glow)`)
3. Inactive indicators MUST show as dim lines (`--border-mid`), not hidden
4. Slots MUST be separated by `--border-subtle` bottom borders
5. MUST use fixed 200px width (rack module standard proportion)
6. MUST NOT use horizontal scroll -- content is vertical-only

## Accessibility
- Container should have `role="navigation"` or `role="tablist"` with `aria-orientation="vertical"`
- Slots should have `role="tab"` or be `<button>` elements
- Active slot: `aria-selected="true"` or `aria-current="true"`
- Support Up/Down arrow key navigation
