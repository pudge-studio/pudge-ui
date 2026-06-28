---
name: Drawer
id: drawer
class: .drawer-demo
category: navigation
index: 11
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Drawer

## Physical Analog
**Reference devices**: Sliding tray mechanisms on CD players, cassette deck tape compartment doors, rack-mount equipment sliding rails.
**Mechanism**: A panel that slides linearly from a hidden position to a visible one, typically from the right edge. Derived from the sliding tray mechanism in optical disc players -- a motorized tray extends from the device chassis on linear bearings. The transition uses `--snap-soft` easing to simulate the damped slide-and-settle motion of a tray reaching its stop position.

## Geometry

| Property | Value |
|----------|-------|
| Demo container | 280x160px |
| Panel width | 180px |
| Panel padding | 12px |
| Title font size | 9px |
| Slide duration | 0.3s |
| Easing | `--snap-soft` |

## CSS Recipe

### Container (`.drawer-demo`)
```css
.drawer-demo {
  position: relative; width: 280px; height: 160px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md); overflow: hidden;
}
```

### Panel (`.drawer-panel`)
```css
.drawer-panel {
  position: absolute; top: 0; right: -180px; width: 180px; height: 100%;
  background: var(--bg-raised); border-left: 1px solid var(--border-mid);
  box-shadow: -4px 0 12px rgba(0,0,0,0.3);
  transition: right 0.3s var(--snap-soft); padding: 12px; z-index: 2;
}
```

### Open state
```css
.drawer-demo.open .drawer-panel { right: 0; }
```

### Title (`.drawer-panel-title`)
```css
.drawer-panel-title { font-family: var(--font-ui); font-size: 9px; font-weight: 600; letter-spacing: 2px; color: var(--text-muted); margin-bottom: 10px; }
```

## HTML Structure
```html
<div class="drawer-demo" id="drawerDemo">
  <div style="padding:12px">
    <button class="push-btn xs" onclick="document.getElementById('drawerDemo').classList.toggle('open')">OPEN</button>
  </div>
  <div class="drawer-panel">
    <div class="drawer-panel-title">SETTINGS</div>
    <div class="flex-col" style="gap:8px">
      <!-- drawer content here -->
    </div>
  </div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Panel uses raised surface, container uses recessed inset.

## Theme Behavior
- Container background uses `--bg-inset` (recessed cavity)
- Panel background uses `--bg-raised` (sliding tray surface)
- Shadow on panel left edge provides depth separation
- Shadow reduces in light mode

## Constraints
1. MUST slide from right edge using `right` property animation
2. MUST use `--snap-soft` easing (damped slide, not linear or bouncy)
3. Transition duration MUST be 0.3s (250-350ms range for larger movements)
4. Panel MUST have left border and left shadow for edge definition
5. MUST use `overflow: hidden` on container to clip the hidden panel
6. Panel MUST be at z-index 2 to overlay container content
7. MUST toggle via `.open` class on the container element

## Accessibility
- Drawer trigger should indicate expanded state: `aria-expanded="true/false"`
- Drawer panel should have `role="dialog"` or `role="complementary"`
- Focus should move to drawer content when opened
- Escape key should close the drawer
- Focus should return to trigger when drawer closes
