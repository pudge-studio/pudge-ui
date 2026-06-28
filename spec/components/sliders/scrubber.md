---
name: Scrubber
id: scrubber-track
class: .scrubber-track
category: sliders
index: 2
materials: [panel, glossy]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Scrubber

## Physical Analog
**Reference devices**: iPod Classic now-playing timeline, Winamp playback bar, Creative NOMAD player.
**Mechanism**: Time-position indicator derived from mechanical tape counter on cassette decks/reel-to-reel. Position = time, elapsed on left, total/remaining on right.

## Geometry

| Property | Value |
|----------|-------|
| Track | 100% width x 6px height, recessed |
| Thumb | 14px diameter (slightly smaller than volume slider) |
| Fill | Blue-to-pink gradient (distinguishes time from level) |
| Container width | 200px |

## CSS Recipe

### Wrapper
```css
.scrubber-wrap { display: flex; flex-direction: column; gap: 4px; width: 200px; }
```

### Track
```css
.scrubber-track {
  width: 100%; height: 6px; border-radius: 3px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  position: relative; cursor: pointer; box-shadow: var(--shadow-inset);
}
```

### Fill
```css
.scrubber-fill {
  position: absolute; top: 0; left: 0; height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--blue-info), var(--pink-action));
}
```

### Thumb
```css
.scrubber-thumb {
  position: absolute; top: 50%; width: 14px; height: 14px;
  border-radius: 50%; transform: translate(-50%,-50%);
  background: linear-gradient(155deg, var(--bg-surface), var(--bg-panel));
  box-shadow: 0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 var(--glossy-hi);
  z-index: 2; cursor: pointer;
}
```

### Time Labels
```css
.scrubber-time {
  display: flex; justify-content: space-between;
  font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);
}
```

## HTML Structure
```html
<div class="scrubber-wrap">
  <div class="scrubber-track">
    <div class="scrubber-fill" style="width:35%"></div>
    <div class="scrubber-thumb" style="left:35%"></div>
  </div>
  <div class="scrubber-time"><span>1:24</span><span>4:02</span></div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Track: Recessed panel
- Thumb: Glossy panel surface
- Fill: Blue-to-pink gradient (different from volume's blue-to-green)

## Theme Behavior
- Track and thumb adapt via tokens
- Fill gradient colors are fixed accent colors

## Constraints
1. Fill gradient MUST be blue-to-pink (NOT blue-to-green like volume slider) to distinguish time from level.
2. Timestamp labels MUST use `--font-mono` for aligned numeric display.
3. Thumb is 14px (slightly smaller than volume slider's 16px).

## Accessibility
- Add `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `aria-label="Playback position"`
- Keyboard: Arrow Left/Right to scrub
- Requires JS for drag and time update
