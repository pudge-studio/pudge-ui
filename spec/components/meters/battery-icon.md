---
name: Battery Icon
id: battery-icon
class: .battery-icon
category: meters
index: 9
materials: [panel]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Battery Icon

## Physical Analog
**Reference devices**: Every mobile phone, camera, and portable device from the era.
**Mechanism**: Miniaturized bar gauge shaped like physical battery (rectangular body + positive terminal nub on right). Fill level = remaining charge. Three color states: green (>40%), amber (20-40%), red (<20%).

## Geometry

| Property | Value |
|----------|-------|
| Body | 28x14px |
| Border | 2px solid |
| Terminal nub | 3x6px on right side |
| Fill padding | 2px inside body |

## CSS Recipe

### Container
```css
.battery-icon { display: inline-flex; align-items: center; gap: 2px; }
```

### Body
```css
.battery-body {
  width: 28px; height: 14px; border: 2px solid var(--border-mid);
  border-radius: 3px; padding: 2px; position: relative;
}
```

### Terminal Nub (Pseudo-element)
```css
.battery-body::after {
  content: ''; position: absolute; right: -5px; top: 50%; transform: translateY(-50%);
  width: 3px; height: 6px; background: var(--border-mid); border-radius: 0 1px 1px 0;
}
```

### Fill
```css
.battery-fill { height: 100%; border-radius: 1px; background: var(--green-on); transition: width 0.3s, background 0.3s; }
```

### Charge Level Variants
```css
.battery-fill.medium { background: var(--amber); }
.battery-fill.low { background: var(--red-alert); }
```

## HTML Structure
```html
<!-- Full -->
<div class="battery-icon">
  <div class="battery-body"><div class="battery-fill" style="width:80%"></div></div>
</div>

<!-- Medium -->
<div class="battery-icon">
  <div class="battery-body"><div class="battery-fill medium" style="width:40%"></div></div>
</div>

<!-- Low -->
<div class="battery-icon">
  <div class="battery-body"><div class="battery-fill low" style="width:15%"></div></div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants

| Charge Level | Class | Color |
|-------------|-------|-------|
| >40% | default | Green (`--green-on`) |
| 20-40% | `.medium` | Amber (`--amber`) |
| <20% | `.low` | Red (`--red-alert`) |

## Theme Behavior
- Border color adapts via `--border-mid`
- Fill colors are fixed accent colors

## Constraints
1. Terminal nub on RIGHT side via `::after` pseudo-element.
2. Fill color classes MUST match charge thresholds: green > amber > red.
3. Fill width set via inline style as percentage.
4. Body border is 2px (thicker than most borders) for icon visibility.

## Accessibility
- Use `role="img"` with `aria-label` (e.g., "Battery: 80%")
- Color state should be supplemented with text for accessibility
