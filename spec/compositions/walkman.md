---
name: Sony Walkman Deck
id: walkman
components: [transport-controls, seven-segment, lcd-readout, led-dots, toggle-switch, segmented-control, volume-slider]
materials: [brushed-metal, rubber]
new: true
---

# Sony Walkman Deck

## Description

A portable cassette deck control panel in the style of the Sony WM-D6C Professional Walkman. Landscape orientation with a status row, transport controls, tape configuration switches, and output level slider. Designed to feel like holding a journalist's field recorder — matte black brushed aluminum, amber readouts, rubber keys with deliberate tactile weight.

## Reference Devices

Sony WM-D6C (1984 Professional Walkman), Sony WM-R202, Sony WM-600C, Aiwa HS-J7 Walkman.

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  ● PWR  ● REC  ● BATT     ┌─ SIDE ─┐  ┌─ 0  0  8 ─┐   │
│                            │   A    │  │  COUNTER   │   │
│                            └────────┘  └────────────┘   │
├──────────────────────────────────────────────────────────┤
│  [◀◀]  [▶▶]  [■]  [▶]  [⏸]  [⏺]                        │
│                                                          │
│              TRANSPORT                                   │
├──────────────────────────────────────────────────────────┤
│  DOLBY NR ┌──────────────┐   HOLD ┌──┐                  │
│           │  B · OFF · C │        │  │                  │
│           └──────────────┘        └──┘                  │
│  OUTPUT ─────────────●───────────────────────            │
└──────────────────────────────────────────────────────────┘
```

## Assembly Rules

1. **Container**: Use `.chassis-panel` with brushed-metal material. Landscape orientation: `min-width: 360px`. Three horizontal rows separated by subtle `border-top: 1px solid var(--border-subtle)`. `padding: 12px 16px`.

2. **Status row (top)**: Horizontal flex with `justify-content: space-between; align-items: center`. Left group: three `led-dot` indicators in a cluster — `.green` for PWR, `.red` for REC, `.amber` for BATT LOW — each labeled in 7px mono below. Right group: two `lcd-readout` components side by side. SIDE readout shows `A` or `B` at 20px, counter readout uses `seven-segment` at compact 28px for 3 digits (000–999).

3. **SIDE lcd-readout**: `padding: 6px 10px`. Label text `SIDE`, value `A`. Width: `52px`.

4. **COUNTER seven-segment**: 3 digits, amber color (`var(--amber)`). `font-size: 28px`. `padding: 6px 12px`.

5. **Transport row (middle)**: `.transport-wrap` centered horizontally. Standard transport controls — REW, FF, STOP, PLAY, PAUSE, REC — in a single horizontal pill container. Padding `10px 0`. The REC button (●) uses `.transport-btn` with `color: var(--red-alert)` to distinguish it from playback controls.

6. **Config row (bottom)**: Two flex groups side by side, `justify-content: space-between; align-items: flex-start`.
   - Left: DOLBY NR `segmented-control` with three segments: `B` / `OFF` / `C`. Label in 7px mono above: `DOLBY NR`. Default active segment: `OFF`.
   - Right: HOLD `toggle-switch` in the OFF position. Label in 7px mono above: `HOLD`.

7. **OUTPUT volume-slider**: Full-width below the config row. Label `OUTPUT` at 7px mono left. Container width: `100%`. Thumb at 40% position (moderate volume).

8. **LED indicator labels**: Each led-dot has a `<span>` label beneath at `font-size: 7px; letter-spacing: 1px; color: var(--text-muted); font-family: var(--font-mono)`. PWR / REC / BATT LOW.

9. **Material**: `.variant-metal` on the chassis container gives the brushed-aluminum body. Transport buttons inherit rubber-dome feel from `.transport-btn` default. The HOLD toggle uses rubber-surface styling.

## Component Configuration

| Component | Position | Config |
|-----------|----------|--------|
| led-dots (×3) | Status row left | `.green` PWR, `.red` REC, `.amber` BATT LOW, 7px labels below |
| lcd-readout | Status row right | SIDE: value `A`, `padding: 6px 10px`, `font-size: 20px` value |
| seven-segment | Status row right | 3 digits, amber, `font-size: 28px`, `padding: 6px 12px` |
| transport-controls | Middle row | Standard pill, 6 buttons: REW FF STOP PLAY PAUSE REC |
| segmented-control | Config row left | 3 segments: B / OFF / C, active: OFF, label: DOLBY NR |
| toggle-switch | Config row right | OFF position, label: HOLD |
| volume-slider | Bottom | Full width, thumb at 40%, label: OUTPUT |

## Constraints

1. MUST render in landscape orientation — portrait breaks the transport button row into two lines.
2. MUST NOT place the REC button adjacent to PLAY without a visual separator — on real hardware these are protected against accidental press.
3. The DOLBY NR segmented control MUST have three segments (B, OFF, C) in that order — this matches the physical switch travel on WM-D6C.
4. SIDE readout MUST show only `A` or `B` — no other values are valid for a cassette tape.
5. COUNTER seven-segment MUST use 3 digits padded with leading zeros (008, not 8).
6. MUST NOT use a circular or glossy treatment on the chassis — brushed-metal only; the WM-D6C's body is matte and functional, not consumer-glossy.

## Interactivity

1. **Transport buttons**: Each button responds to click with a `translateY(1px)` press animation. The PLAY button toggles a playing state — when active, the REC LED pulses and the COUNTER increments every 2 seconds via `setInterval`.
2. **DOLBY NR segmented control**: Clicking any segment activates it (moves `.active` class). Reflects the current noise-reduction mode.
3. **HOLD toggle**: Click toggles the switch on/off. When ON, all transport buttons are visually disabled (reduced opacity, no pointer events).
4. **OUTPUT slider**: Draggable — `mousedown` on thumb, `mousemove` on document updates fill width and thumb position, `mouseup` releases.
5. **COUNTER**: Automatically increments (000–999) while playing. Reset to `000` when STOP is pressed.
