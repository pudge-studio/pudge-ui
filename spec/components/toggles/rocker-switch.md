---
name: Rocker Switch
id: rocker
class: .rocker
category: toggles
index: 3
materials: [panel]
sizes: [md]
interactive: true
requires_js: false
canvas: false
---

# Rocker Switch

## Physical Analog
**Reference devices**: Nokia phone side volume rocker, iPod volume buttons, Sony Ericsson volume control.
**Mechanism**: SPST momentary rocker switch -- elongated button pivots around central fulcrum. Pressing top tilts forward, pressing bottom tilts backward. Each end sits over its own dome switch. Momentary action -- springs back to center when released.

## Geometry

| Property | Value |
|----------|-------|
| Body | 36x52px, elongated rectangle |
| Split | Central dividing line between halves |
| Pivot | Internal see-saw with spring-loaded center pivot |
| Travel | 1-2 degrees from center each direction |
| Mounting | Side-mounted, flush or slightly proud |

## CSS Recipe

### Container
```css
.rocker {
  display: flex; flex-direction: column;
  width: 36px; height: 52px; border-radius: var(--radius-sm);
  overflow: hidden; border: 1px solid var(--border-deep);
  box-shadow: 0 1px 0 var(--glossy-hi);
}
```

### Button Halves
```css
.rocker-btn {
  flex: 1; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(180deg, var(--bg-surface), var(--bg-panel));
  border: none; cursor: pointer; color: var(--text-muted); font-size: 10px;
  transition: background 0.1s;
}
```

### Active (Pressed) State
```css
.rocker-btn:active { background: var(--bg-inset); color: var(--text-primary); }
```

### Split Line (Plus Half)
```css
.rocker-btn.plus { border-bottom: 1px solid var(--border-deep); }
```

## HTML Structure
```html
<div class="rocker">
  <button class="rocker-btn plus">+</button>
  <button class="rocker-btn minus">&minus;</button>
</div>
```

## Size Variants
No explicit size variants defined.

## Material Variants
Default panel material for both halves.

## Theme Behavior
- Surface gradients swap via tokens
- Border colors swap via `--border-deep`
- Pressed state uses `--bg-inset` (recessed appearance)

## Constraints
1. Two halves MUST be separate `<button>` elements stacked vertically.
2. Split line (`border-bottom: 1px solid border-deep`) on top half creates visible pivot point.
3. Each half MUST press independently (`:active` on each).
4. Rocker is MOMENTARY -- no persistent state, springs back to neutral.
5. `overflow: hidden` is required to clip the border-radius to the container.

## Accessibility
- Uses native `<button>` elements for each half
- Keyboard: Enter/Space to activate focused half
- ARIA: Container could use `role="group"` with `aria-label="Volume"`
- Each button should have `aria-label` ("Volume up", "Volume down")
