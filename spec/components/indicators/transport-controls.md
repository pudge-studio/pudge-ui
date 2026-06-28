---
name: Transport Controls
id: transport-controls
class: .transport
category: indicators
index: 10
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Transport Controls

## Physical Analog
**Reference devices**: iPod transport bar, Sony Walkman controls, MiniDisc player controls, CD player front panel.
**Mechanism**: The tape/disc transport mechanism controls -- the most standardized icon set in consumer electronics. Skip backward, rewind, play, fast forward, skip forward. The play button is visually distinct (larger, blue background) because it is the primary transport action. On real devices, the play button often had a different color cap or a larger physical button.

## Geometry

| Property | Value |
|----------|-------|
| Button size | 32x32px (standard), 36x36px (play) |
| Button gap | 6px |
| Container padding | 4px |
| Container border-radius | `--radius-pill` (100px) |
| Bottom shadow | 2px |
| Icon font size | 12px (standard), 14px (play) |

## CSS Recipe

### Wrapper (`.transport-wrap`)
```css
.transport-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; }
```

### Container (`.transport`)
```css
.transport {
  display: flex; align-items: center; gap: 6px;
  background: var(--bg-raised); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill); padding: 4px;
  box-shadow: 0 2px 0 var(--border-deep);
}
```

### Standard button (`.transport-btn`)
```css
.transport-btn {
  width: 32px; height: 32px; border-radius: 50%;
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(155deg, var(--bg-surface), var(--bg-panel));
  box-shadow: 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 var(--glossy-hi);
  color: var(--text-primary); font-size: 12px;
  transition: transform 0.07s var(--snap-fast);
}
```

### Button press
```css
.transport-btn:active { transform: scale(0.92); box-shadow: 0 1px 0 rgba(0,0,0,0.2); }
```

### Play button (`.transport-btn.play`)
```css
.transport-btn.play {
  width: 36px; height: 36px;
  background: linear-gradient(155deg, var(--blue-info), #335599);
  color: #fff; font-size: 14px;
}
```

## HTML Structure
```html
<div class="transport-wrap">
  <div class="transport">
    <button class="transport-btn">&#9198;</button>
    <button class="transport-btn">&#9664;&#9664;</button>
    <button class="transport-btn play">&#9654;</button>
    <button class="transport-btn">&#9654;&#9654;</button>
    <button class="transport-btn">&#9197;</button>
  </div>
  <span style="font-family:var(--font-ui);font-size:9px;font-weight:500;color:var(--text-muted);letter-spacing:1px">NOW PLAYING</span>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
- Standard buttons: glossy polycarbonate (surface-to-panel gradient with glossy highlight)
- Play button: blue polycarbonate (blue gradient)

## Theme Behavior
- Container background swaps via `--bg-raised`
- Button gradients swap via surface/panel tokens
- Play button always uses blue gradient (constant)
- Shadow depths adapt via tokens

## Constraints
1. Play button MUST be visually distinct: larger (36px vs 32px), blue background, white icon
2. All buttons MUST be circular (border-radius: 50%)
3. Press interaction MUST use `scale(0.92)` not translateY (round buttons scale, don't translate)
4. Container MUST use pill border-radius (capsule shape, like a Walkman transport bar)
5. Standard button order: skip-back, rewind, play, fast-forward, skip-forward
6. Icon set: &#9198; &#9664;&#9664; &#9654; &#9654;&#9654; &#9197;
7. MUST use `--snap-fast` easing for press animation (mechanical feel)

## Accessibility
- Each button should have `aria-label` describing the action ("Play", "Pause", "Skip forward", etc.)
- Play/Pause should toggle between states with updated label
- Support keyboard operation (Space/Enter to activate)
- Consider grouping with `role="toolbar"` and `aria-label="Media controls"`
