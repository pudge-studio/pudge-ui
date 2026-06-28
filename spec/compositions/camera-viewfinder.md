---
name: Camera Viewfinder HUD
id: camera-viewfinder
components: [camera-readout, mode-badge, status-chips, battery-icon, focus-brackets, grid-overlay, exposure-scale, timecode-display]
materials: [phosphor-screen]
---

# Camera Viewfinder HUD

## Description

Full-frame camera electronic viewfinder overlay. Components are positioned absolutely over a dark background, simulating the heads-up display (HUD) seen through a mirrorless camera EVF (Electronic Viewfinder). All readouts float over the live image without obscuring it.

## Reference Devices

Sony Alpha A7 III/IV EVF, Nikon Z6/Z8 EVF, Canon EOS R5 EVF, Fujifilm X-T4 EVF.

## Layout

```
┌─────────────────────────────────────────────┐
│ [mode-badge:M] [readout:SS] [readout:F] [readout:ISO]  [status-chip:REC] [battery] │
│                                             │
│                                             │
│              [focus-brackets]               │
│                  [grid-overlay]             │
│                                             │
│                                             │
│ [exposure-scale ─────●─────]  [timecode:00:12:34] │
└─────────────────────────────────────────────┘
```

## Assembly Rules

1. **Container**: Use `.panel` with phosphor-screen material (`background: linear-gradient(180deg, #080808, #111)`). Padding: 0. Overflow: hidden.

2. **Top status bar**: Horizontal flex row with `justify-content: space-between`. Contains:
   - Left group: mode badge (compact, `padding: 3px 8px`), camera readouts (`.inline` variant, `padding: 3px 8px`)
   - Right group: status chip (`.active`, small font `8px`), battery icon
   - Separated by `border-bottom: 1px solid #222`

3. **Viewfinder area**: Relative positioned div, minimum height 180px, `background: #1a1a1a`. Contains:
   - Grid overlay lines at 33.3% and 66.6% (vertical and horizontal)
   - Grid center dot
   - Focus brackets positioned within the area

4. **Bottom bar**: Horizontal flex row with `justify-content: space-between`. Contains:
   - Exposure scale (compact, `width: 120px`)
   - Timecode display (compact, `padding: 3px 10px`, `font-size: 14px`)
   - Separated by `border-top: 1px solid #222`

5. **All readouts use `.inline` variant** — horizontal layout for compact display

6. **Focus brackets default to one acquiring + one locked** for visual variety

## Component Configuration

| Component | Variant | Size Override |
|-----------|---------|--------------|
| mode-badge | compact | `font-size: 16px` on mode letter, `padding: 3px 8px` |
| camera-readout | `.inline` | `font-size: 12px` on value, `font-size: 7px` on label |
| status-chip | `.active` | `font-size: 8px`, `padding: 2px 6px` |
| battery-icon | default | `width: 20px`, `height: 10px` on body |
| exposure-scale | compact | `width: 120px` |
| timecode-display | compact | `font-size: 14px` on segments, `padding: 3px 10px` |
| focus-brackets | mixed | One `.acquiring`, one `.locked` |
