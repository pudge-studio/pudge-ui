---
name: Crossfader
id: crossfader-track
class: .crossfader-track
category: sliders
index: 5
materials: [chrome, panel]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# Crossfader

## Physical Analog
**Reference devices**: Technics SH-DJ1200 crossfader, Pioneer DJM-800/900 crossfader, Numark DM1050.
**Mechanism**: Specialized linear potentiometer for DJ mixers. Blends between two audio sources (Deck A left, Deck B right). Extremely low-friction tracks (Teflon-coated or magnetic non-contact) for rapid "scratch" movements.

## Geometry

| Property | Value |
|----------|-------|
| Track | 100% width x 10px height (wider than standard fader) |
| Thumb | 28x16px rectangular (wider than standard fader's 22x14px) |
| Center line | 1px vertical line at midpoint |
| Labels | "DECK A" / "DECK B" at ends |
| Container width | 200px |

## CSS Recipe

### Wrapper & Labels
```css
.crossfader-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 200px; }
.crossfader-labels { display: flex; justify-content: space-between; width: 100%; font-family: var(--font-ui); font-size: 8px; font-weight: 600; color: var(--text-muted); letter-spacing: 1px; }
```

### Track
```css
.crossfader-track {
  width: 100%; height: 10px; border-radius: 5px;
  background: var(--bg-inset); border: 1px solid var(--border-subtle);
  position: relative; box-shadow: var(--shadow-inset);
}
```

### Center Line
```css
.crossfader-center { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: var(--border-mid); }
```

### Thumb (Wide Fader Cap)
```css
.crossfader-thumb {
  position: absolute; top: 50%; width: 28px; height: 16px;
  border-radius: 4px; transform: translate(-50%,-50%);
  background: linear-gradient(180deg, #777, #444);
  box-shadow: 0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 #999;
  cursor: grab; z-index: 2;
}
.crossfader-thumb::before, .crossfader-thumb::after {
  content: ''; position: absolute; top: 4px; bottom: 4px; width: 1px; background: #999;
}
.crossfader-thumb::before { left: 8px; }
.crossfader-thumb::after { right: 8px; }
```

## HTML Structure
```html
<div class="crossfader-wrap">
  <div class="crossfader-labels"><span>DECK A</span><span>DECK B</span></div>
  <div class="crossfader-track">
    <div class="crossfader-center"></div>
    <div class="crossfader-thumb" style="left:50%"></div>
  </div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Track: Recessed panel
- Thumb: Chrome/metallic gradient with two grip lines

## Theme Behavior
- Track adapts via tokens
- Thumb metallic gradient is fixed
- Center line uses `--border-mid`

## Constraints
1. Deck labels ("DECK A" / "DECK B") at each end are ESSENTIAL for crossfader concept.
2. Center line on track marks the visual balance point.
3. Thumb is WIDER than standard fader (28x16px vs 22x14px) with TWO grip lines (via `::before` and `::after`).
4. Track is 10px (wider than standard fader's 8px).
5. No fill element -- crossfader shows position only, not a level.

## Accessibility
- Add `role="slider"` with `aria-valuenow` (0=Deck A, 50=center, 100=Deck B)
- `aria-label="Crossfader"`
- Keyboard: Arrow Left/Right to slide
- Requires JS for drag interaction
