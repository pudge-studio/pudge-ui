---
name: Status Chips
id: status-chips
class: .status-chip
category: indicators
index: 1
materials: [glossy-polycarbonate]
sizes: [default]
interactive: false
requires_js: false
canvas: false
---

# Status Chips

## Physical Analog
**Reference devices**: Camera status indicators (REC, CONNECTED, GPS), iPod genre/playlist tags.
**Mechanism**: Small labeled indicator lights on equipment front panels. Status chips are read-only indicators -- they reflect system state (CONNECTED = amber border glow, STANDBY = dim). The pill shape with colored border comes from the physical form factor of panel-mounted indicator LEDs with silk-screened labels.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 4px 10px |
| Border radius | `--radius-sm` (4px) |
| Font size | 9px |
| Letter spacing | 2px |

## CSS Recipe

### Default state
```css
.status-chip {
  padding: 4px 10px; border-radius: var(--radius-sm);
  font-family: var(--font-ui); font-size: 9px; font-weight: 500;
  letter-spacing: 2px; background: var(--bg-panel);
  border: 1px solid var(--border-mid); color: var(--text-muted);
  transition: all 0.12s;
}
```

### Active state
```css
.status-chip.active { color: var(--amber); border-color: var(--amber-dim); box-shadow: 0 0 8px var(--amber-glow); }
```

### Row container
```css
.chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
```

## HTML Structure
```html
<div class="chip-row">
  <div class="status-chip active">CONNECTED</div>
  <div class="status-chip">STANDBY</div>
  <div class="status-chip active">REC</div>
  <div class="status-chip">REMOTE</div>
</div>
```

## Size Variants
No size variants defined. Single small size.

## Material Variants
No material variants. Uses Tier 1 (flush) depth model.

## Theme Behavior
- Background swaps via `--bg-panel`
- Border swaps via `--border-mid`
- Inactive text uses `--text-muted`
- Active chip always uses amber with amber glow (constant across themes)

## Constraints
1. MUST be read-only (no interactive states like hover/click)
2. Active state MUST use amber color with amber-dim border AND amber glow shadow
3. Glow radius MUST be 8px (active indicator standard)
4. MUST use `--radius-sm` (4px), not pill shape (status chips are rectangular)
5. Letter spacing MUST be 2px (equipment label convention)
6. Font size MUST be 9px (small indicator label)

## Accessibility
- Use `role="status"` for dynamic status indicators
- Include `aria-label` with expanded status description if abbreviation is used
- Active/inactive state should be conveyed via `aria-current` or similar
