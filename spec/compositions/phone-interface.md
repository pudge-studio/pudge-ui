---
name: Phone Interface
id: phone-interface
components: [status-bar, menu-grid, keypad-button, dialog, toast, d-pad, signal-bars, battery-icon]
materials: [glossy-polycarbonate, rubber]
---

# Phone Interface

## Description

A Nokia-era feature phone interface. Combines the status bar, app menu grid, numeric keypad, and notification elements into a complete device screen experience.

## Reference Devices

Nokia 6600, Nokia 3310, Sony Ericsson T610, Motorola RAZR V3, Samsung SGH-D500.

## Layout

```
┌──────────────────────────┐
│ 12:45    3G  ▂▄▆█  [██] │  ← status-bar
├──────────────────────────┤
│                          │
│  📞  ✉  ⚙               │
│  PHONE MSG SET           │  ← menu-grid (3x3)
│  ♪  📷  🌐              │
│  MUSIC CAM WEB           │
│                          │
├──────────────────────────┤
│  [1] [2] [3]             │
│  [4] [5] [6]             │  ← keypad (3x4 grid)
│  [7] [8] [9]             │
│  [*] [0] [#]             │
├──────────────────────────┤
│  OPTIONS          BACK   │  ← softkeys
└──────────────────────────┘
```

## Assembly Rules

1. **Container**: Use `.device-bezel` for the outer phone frame. Inner content area uses `bg-inset` background.

2. **Status bar**: Full width, compact variant. Contains time (left), network indicator text (center-left), signal bars (right), battery icon (far right).

3. **Menu grid**: `.menu-grid-wrap` centered in the screen area. 3x3 layout. Each item has an emoji icon (or Unicode symbol) and a label. Active item highlighted with blue tint.

4. **Keypad**: `.keypad` container below the screen. Full 3x4 grid with T9 letter labels on keys 2-9. Special keys (* and #) use `.special` variant. Optional `.call` key variant for green answer key.

5. **Softkeys**: A flex row below the keypad with `justify-content: space-between`. Two text labels (OPTIONS, BACK) styled as `.softkey` — small, muted text that responds to hover.

6. **Toast notification**: When shown, appears at the top of the screen area, overlaying the menu grid. Uses slide-down animation.

7. **Dialog**: When shown, centers over the screen area with the standard phone dialog pattern (title, body, two action buttons).

## Component Configuration

| Component | Variant | Notes |
|-----------|---------|-------|
| status-bar | compact (4px padding) | Width: full container |
| signal-bars | 3 of 5 active | `.off` on bars 4-5 |
| battery-icon | 70% fill, green | default variant |
| menu-grid | 3x3, one `.active` | Unicode icons for phone apps |
| keypad-button | T9 labels on 2-9 | One `.call` key optional |
| dialog | centered overlay | `max-width: 220px` |
| toast | top of screen | LED dot + text + timestamp |
