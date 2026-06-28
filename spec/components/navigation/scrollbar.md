---
name: Custom Scrollbar
id: scrollbar
class: .custom-scrollbar-demo
category: navigation
index: 10
materials: []
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Custom Scrollbar

## Physical Analog
**Reference devices**: Any scrollable display on equipment with limited real estate -- function lists on synthesizers, parameter pages on digital mixing consoles.
**Mechanism**: The scrollbar thumb represents the viewport's position within the total content, proportional to the ratio of visible content to total content. Derived from mechanical scroll mechanisms on typewriters and early plotters.

## Geometry

| Property | Value |
|----------|-------|
| Container width | 180px |
| Container height | 120px |
| Scrollbar width | 8px |
| Thumb border-radius | 4px |
| Track border-radius | 4px |
| Thumb border | 1px solid `--bg-inset` |

## CSS Recipe

### Container (`.custom-scrollbar-demo`)
```css
.custom-scrollbar-demo {
  width: 180px; height: 120px; overflow-y: auto;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); padding: 10px;
  font-family: var(--font-ui); font-size: 10px; color: var(--text-secondary);
  line-height: 1.8;
}
```

### Scrollbar track
```css
.custom-scrollbar-demo::-webkit-scrollbar { width: 8px; }
.custom-scrollbar-demo::-webkit-scrollbar-track { background: var(--bg-inset); border-radius: 4px; }
```

### Scrollbar thumb
```css
.custom-scrollbar-demo::-webkit-scrollbar-thumb {
  background: var(--border-mid); border-radius: 4px;
  border: 1px solid var(--bg-inset);
}
```

### Thumb hover
```css
.custom-scrollbar-demo::-webkit-scrollbar-thumb:hover { background: var(--border-hi); }
```

## HTML Structure
```html
<div class="custom-scrollbar-demo">
  System log entries from diagnostic output. Channel 1 calibrated.
  Channel 2 calibrated. Channel 3 online. Master bus active.
  Signal routing complete. Buffer latency: 12ms. Sample rate: 48kHz.
  Bit depth: 24-bit. Monitoring enabled. Output routed to main speakers.
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses recessed inset styling.

## Theme Behavior
- Container background uses `--bg-inset` (recessed area)
- Scrollbar thumb uses `--border-mid` (adapts to theme)
- Thumb hover uses `--border-hi` (brighter in both themes)
- Text color adapts via `--text-secondary`

## Constraints
1. MUST use 8px scrollbar width (narrow but usable)
2. Thumb MUST have 1px border matching track background for inset effect
3. Track MUST use recessed background (`--bg-inset`)
4. MUST use WebKit scrollbar pseudo-elements (CSS-only, no JS needed)
5. Thumb MUST brighten on hover via `--border-hi`
6. MUST use 4px border-radius on both track and thumb

## Accessibility
- Scrollable content should have `tabindex="0"` for keyboard access
- Use `role="region"` with `aria-label` describing content area
- Ensure content is reachable via keyboard (Tab, then arrow keys)
- Consider `scrollbar-width: thin` for Firefox compatibility
