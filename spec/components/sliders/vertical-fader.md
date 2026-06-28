---
name: Vertical Fader
id: fader-v-track
class: .fader-v-track
category: sliders
index: 7
materials: [chrome, panel]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Vertical Fader

## Physical Analog
**Reference devices**: Mixing console channel faders (SSL, Neve, Mackie), synthesizer ADSR sliders, graphic EQ sliders.
**Mechanism**: Identical to horizontal fader (linear slide potentiometer), oriented vertically. On mixing consoles, vertical faders represent channel volume/level arranged side by side in a fader bank.

## Geometry

| Property | Value |
|----------|-------|
| Track | 10px wide x 140px tall (very narrow and tall) |
| Thumb | 20px wide x 10px tall (wider than track) |
| Fill | Green-to-amber gradient (bottom up) |
| Center groove | 1px vertical line on thumb cap |

## CSS Recipe

### Wrapper
```css
.fader-v-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
```

### Track
```css
.fader-v-track {
  width: 10px; height: 140px; border-radius: 5px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  position: relative; box-shadow: var(--shadow-inset);
}
```

### Fill
```css
.fader-v-fill {
  position: absolute; bottom: 0; left: 0; width: 100%; border-radius: 4px;
  background: linear-gradient(0deg, var(--green-on), var(--amber));
}
```

### Thumb (Fader Cap)
```css
.fader-v-thumb {
  position: absolute; left: 50%; width: 20px; height: 10px;
  border-radius: 2px; transform: translate(-50%,-50%);
  background: linear-gradient(90deg, #555, #888, #555);
  box-shadow: 0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 #aaa;
  cursor: grab; z-index: 2;
}
.fader-v-thumb::after {
  content: ''; position: absolute; left: 50%; top: 3px; bottom: 3px;
  width: 1px; background: #ccc; transform: translateX(-50%);
}
```

### Labels
```css
.fader-v-label { font-family: var(--font-ui); font-size: 8px; font-weight: 600; letter-spacing: 1px; color: var(--text-muted); }
.fader-v-value { font-family: var(--font-display); font-size: 10px; color: var(--amber); }
```

## HTML Structure
```html
<div class="fader-v-wrap">
  <div class="fader-v-track">
    <div class="fader-v-fill" style="height:70%"></div>
    <div class="fader-v-thumb" style="bottom:70%"></div>
  </div>
  <span class="fader-v-label">CH 1</span>
  <span class="fader-v-value">+3</span>
</div>

<!-- Multiple faders in a bank -->
<div class="flex-row" style="gap:16px">
  <div class="fader-v-wrap"><!-- CH 1 --></div>
  <div class="fader-v-wrap"><!-- CH 2 --></div>
  <div class="fader-v-wrap"><!-- MASTER --></div>
</div>
```

## Size Variants
No explicit size variants. Fixed at 10x140px track.

## Material Variants
- Track: Recessed panel
- Thumb: Triple-stop metallic gradient (`#555, #888, #555`) simulating brushed metal cap
- Fill: Green-to-amber gradient

## Theme Behavior
- Track adapts via tokens
- Thumb metallic gradient is fixed
- Fill gradient colors are fixed accents

## Constraints
1. Thumb MUST be wider than track (20px vs 10px) for horizontal finger placement.
2. Center groove (`::after`) is a vertical line on the thumb, helping engineer feel position.
3. Fill grows from BOTTOM (`position: absolute; bottom: 0`).
4. Thumb position uses `bottom` percentage (not `top`).
5. Track is very narrow (10px) -- mixing console aesthetic.

## Accessibility
- Add `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-orientation="vertical"`
- Keyboard: Arrow Up/Down to adjust
- Requires JS for drag interaction
