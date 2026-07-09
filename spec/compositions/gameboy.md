---
name: Game Boy
id: gameboy
components: [dot-matrix, d-pad, rubber-button, push-button, led-dots, volume-slider]
materials: [glossy-polycarbonate, rubber]
new: true
---

# Game Boy

## Description

The face of an original Nintendo Game Boy (DMG-01) handheld. Portrait orientation. A large dot-matrix LCD screen occupies the upper half; the lower half is dominated by the D-pad on the left and the A/B action buttons on the right, angled 30° as on the physical device. Start and Select sit as flat oval insets between them. A power LED and volume slider complete the hardware face.

## Reference Devices

Nintendo Game Boy DMG-01 (1989), Nintendo Game Boy Pocket MGB-001 (1996), Nintendo Game Boy Color CGB-001 (1998).

## Layout

```
┌───────────────────────────────┐
│  ● BATT                       │
│  ┌─────────────────────────┐  │
│  │                         │  │
│  │    [  DOT-MATRIX  ]     │  │
│  │    [     LCD       ]    │  │
│  │    [               ]    │  │
│  └─────────────────────────┘  │
│  ░░░░░░░░░░░░░░░░  (speaker)  │
│                               │
│  ┌──────┐          (B)  (A)   │
│  │      │                     │
│  │ DPAD │     [SEL]  [STA]    │
│  │      │                     │
│  └──────┘                     │
│  VOL ──●──────────────────    │
└───────────────────────────────┘
```

## Assembly Rules

1. **Container**: Use `.panel` with `.variant-glossy` on the outer chassis. Portrait orientation: `width: 260px`. Background `var(--bg-panel)`. `border-radius: 16px 16px 40px 16px` — the original DMG-01 has a distinctive angled bottom-right corner. `padding: 16px 16px 20px`.

2. **Power LED**: Single `led-dot` in `.green` positioned in the top-left above the screen. Label `BATTERY` in 6px mono. LED blinks amber when battery is low — show as `.green` by default, add `.amber` class variant note for low-battery state.

3. **Screen housing**: A `<div>` wrapper with `background: var(--bg-inset); border: 3px solid var(--border-deep); border-radius: 4px; padding: 8px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.8)`. Inner content: `dot-matrix` component sized to fill — `width: 100%`. The screen housing reproduces the thick plastic bezel of the DMG-01. Screen content: scrolling text `PUDGE / UI ` on repeat.

4. **Speaker grille**: A purely decorative element below the screen. A `<div>` with `background: repeating-linear-gradient(90deg, var(--border-subtle) 0, var(--border-subtle) 1px, transparent 1px, transparent 5px); height: 8px; border-radius: 1px; margin: 8px 0`. Positioned right-of-center to match the DMG-01's asymmetric speaker placement.

5. **Controls section**: A horizontal flex row: D-pad left, action buttons right, `justify-content: space-between; align-items: center; padding: 8px 4px`.
   - Left: `d-pad` component at default 110x110px. Material: `.variant-rubber`. Arms are darker than the chassis (physical rubber vs. painted plastic).
   - Right: Two `rubber-button` components in a diagonal row — B button (lower-left) and A button (upper-right) — angled `transform: rotate(-30deg)` on their containing wrapper to match the DMG-01's 30° diagonal button layout. Button labels: `B` (left) and `A` (right). Size: `40x40px` (slightly smaller than default to fit the panel).

6. **Start / Select row**: A horizontal flex row between the d-pad and A/B section: `justify-content: center; gap: 24px`. Two `push-button` components styled as flat oval insets — `height: 16px; border-radius: var(--radius-pill); width: 48px; background: var(--bg-inset); font-size: 7px; letter-spacing: 1px`. Labels: `SELECT` (left) and `START` (right). These are recessed flush buttons, NOT raised — use `box-shadow: inset 0 1px 3px rgba(0,0,0,0.5)` only, no upward shadow.

7. **Volume slider**: `volume-slider` at the bottom of the panel, full width. Label `VOL` at 7px mono above-left. Thumb at 60% position (default volume). This represents the physical side-mounted volume dial — adapted to a horizontal slider for UI interaction.

8. **Chassis color**: The original DMG-01 is `#B8B8B8` (light gray). Apply via `background: #b0aea8` on the outer panel — a warm gray. Screen housing border is `#3a3835`. A/B buttons are dark burgundy on the original (`#6b2b3a`) — apply `background: linear-gradient(155deg, #7a3040, #4a1e28)` on the rubber-button elements.

## Component Configuration

| Component | Position | Config |
|-----------|----------|--------|
| led-dots (×1) | Top-left above screen | `.green`, label `BATTERY`, 6px mono |
| dot-matrix | Screen area | Full-width inside screen housing, scrolling `PUDGE / UI ` |
| d-pad | Controls row left | Default size 110x110px, `.variant-rubber` |
| rubber-button (×2) | Controls row right | A and B, 40x40px, diagonal layout, DMG burgundy tint |
| push-button (×2) | Center between controls | SELECT and START, flat oval, 48x16px, recessed |
| volume-slider | Bottom | Full width, thumb at 60%, label VOL |

## Constraints

1. MUST use portrait orientation — the Game Boy is a tall device, never landscape.
2. A/B buttons MUST be rendered in a diagonal row at ~30° — the parallel layout is a visual error that no real Game Boy has.
3. Start and Select MUST be flat / recessed, never raised — they are membrane buttons, not dome switches.
4. The outer border-radius MUST use `16px 16px 40px 16px` — the asymmetric cut of the bottom-right corner is the DMG-01's most distinctive silhouette feature.
5. MUST NOT use a glossy-clean white background — the DMG-01 is warm gray, slightly aged; pure white reads as a fake or modern redesign.
6. Speaker grille MUST be rendered right-of-center, not centered — the asymmetric placement is a physical constraint of the DMG-01's internal speaker position.

## Interactivity

1. **D-pad arms**: Clicking any arm (UP/DOWN/LEFT/RIGHT) shows a pressed state (`translateY(1px)` or `translateX` for left/right) and triggers a brief highlight on the dot-matrix display text direction.
2. **A/B buttons**: Click to show press animation (scale down). The dot-matrix display responds — pressing A speeds up the scrolling text, pressing B reverses scroll direction.
3. **START/SELECT**: Click feedback (inset shadow deepens). START toggles the dot-matrix display between two "game states" (normal scroll vs. flashing "GAME OVER" text).
4. **Volume slider**: Draggable thumb — updates fill width on drag.
5. **Screen animation**: The dot-matrix text scrolls continuously. D-pad presses briefly pause and resume scroll.
