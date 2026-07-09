---
name: DJ Controller Deck
id: dj-controller
components: [rotary-encoder, vertical-fader, radial-knob, vu-meter, push-button, crossfader, led-dots]
materials: [brushed-metal, rubber]
new: true
---

# DJ Controller Deck

## Description

A single deck section from a two-channel DJ controller in the style of Pioneer DDJ-series hardware. Landscape orientation showing the jog wheel platter, pitch fader, channel fader, four EQ/gain radial knobs, VU meter, cue/play buttons, and crossfader. Two of these decks placed side-by-side with a shared crossfader produce a complete mixer layout.

## Reference Devices

Pioneer DDJ-SX2, Pioneer DDJ-400, Numark Mixtrack Pro 3, Native Instruments Traktor Kontrol S2 MK3.

## Layout

```
┌────────────────────────────────────────────────────┐
│                                              ████  │
│  (GAIN) (HI)  (MID)  (LO)           ●SYNC   ████  │
│                                      ●CUE    ████  │ ← radial-knobs + led-dots + vu-meter
│                                      ●LOAD   ██    │
├──────────────────────────────────────────────────  │
│                                                    │
│         ╔═══════════════════╗      ┃━┃             │
│         ║                  ║      ┃━┃  PITCH       │
│         ║   JOG WHEEL      ║      ┃━┃              │
│         ║    PLATTER        ║      ┃━┃              │
│         ║                  ║      ┃━┃              │
│         ╚═══════════════════╝      ┃━┃             │
│                                              ┃━┃   │
│   [CUE]      [SYNC]      [▶ PLAY]       CH ┃━┃   │
├────────────────────────────────────────────────────┤
│        ──────────────●──────────────               │
│        DECK A      XFADER      DECK B              │
└────────────────────────────────────────────────────┘
```

## Assembly Rules

1. **Container**: Use `.chassis-panel` with `.variant-metal`. Landscape: `min-width: 420px`. `padding: 14px 16px`. `background: linear-gradient(180deg, #1e1c1a, #161412)`. The Pioneer DDJ chassis is nearly black with subtle warm-dark brushed metal.

2. **Top knob row**: Horizontal flex row, `align-items: flex-end; gap: 12px`. Four `radial-knob` components at 56x56px (compact — `transform: scale(0.56)` applied to the default 100px knob, or set via CSS custom property). Knobs from left to right: GAIN, HI, MID, LO. Labels in 7px mono below each: `GAIN` / `HI` / `MID` / `LO`. `letter-spacing: 1px; color: var(--text-muted)`. This EQ section sits in the left two-thirds of the row.

3. **Status LEDs**: Three `led-dots` stacked vertically, right side of the top row. Spacing `gap: 4px`. Colors and labels: `.green` LOAD (track is loaded), `.amber` CUE (cue point set), `.amber` SYNC (BPM-synced to other deck). Labels at 6px mono, right-aligned.

4. **VU meter**: `vu-meter` component to the right of LED cluster. 2 bars, height `80px`. Bars animate to show current track level — show bars at 60% and 50% to simulate typical track headroom with one channel peaking.

5. **Platter section**: Horizontal flex row, `align-items: center; gap: 16px`. Contains:
   - Left (wide): `rotary-encoder` component, centered. This serves as the jog wheel platter. The rotary encoder at 100x100px is slightly undersized vs. a real jog wheel — render it at 150x150px by applying `width: 150px; height: 150px` and scaling the internal gradients proportionally via a wrapper `transform: scale(1.5)`. Surround with a thin `border: 2px solid var(--border-mid); border-radius: 50%` outer ring labeled `JOG WHEEL` at 7px mono centered below.
   - Right (narrow): `vertical-fader` at default 140px height, labeled `PITCH` at 7px mono above. Thumb at center (0% pitch shift). This is the BPM pitch fader — narrower than a channel fader.

6. **Transport row**: Horizontal flex below the platter section, `justify-content: flex-start; gap: 10px; padding-top: 12px`. Three `push-button` components: CUE (default styling), SYNC (default styling), PLAY (`.variant-glossy` on the button body, larger at 48x36px, label `▶ PLAY`). PLAY button uses `color: var(--green-on)` for the text/icon to distinguish it.

7. **Channel fader**: A second `vertical-fader` component positioned at the far right of the platter row, labeled `CH` at 7px mono above. Thumb at 80% (channel is open, mixing in). Height: 100px (shorter than the pitch fader).

8. **Crossfader row**: Full-width `crossfader` component at the bottom, spanning the full panel width. Labels: `DECK A` (left) and `DECK B` (right). Thumb centered at 50% — equal mix. `margin-top: 12px; border-top: 1px solid var(--border-subtle); padding-top: 12px`.

9. **Knob scale**: To achieve 56x56px radial knobs without modifying the component source, wrap each knob in `<div style="transform: scale(0.56); transform-origin: center center; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center;">`.

## Component Configuration

| Component | Position | Config |
|-----------|----------|--------|
| radial-knob (×4) | Top row | 56px effective size via scale, labels: GAIN HI MID LO |
| led-dots (×3) | Top row right | `.green` LOAD, `.amber` CUE, `.amber` SYNC |
| vu-meter | Top row far-right | 2 bars at 80px height, bars at 60% and 50% |
| rotary-encoder | Platter section | 150px via wrapper scale, outer ring border, label JOG WHEEL |
| vertical-fader (pitch) | Platter section right | 140px, thumb center, label PITCH |
| vertical-fader (channel) | Platter section far-right | 100px, thumb at 80%, label CH |
| push-button (×3) | Transport row | CUE / SYNC / PLAY — PLAY uses green text + larger size |
| crossfader | Bottom strip | Full width, thumb centered, labels DECK A / DECK B |

## Constraints

1. MUST render in landscape — the jog wheel and pitch fader require horizontal space to read correctly.
2. Platter (rotary-encoder) MUST be visually larger than the knobs — the jog wheel is the dominant physical element of any DJ deck.
3. Pitch fader and channel fader MUST be distinct in height — pitch fader is taller (140px) for fine BPM adjustment; channel fader is shorter (100px) for volume sweeps.
4. MUST NOT place PLAY adjacent to CUE without SYNC between them — CUE→SYNC→PLAY is the Pioneer DDJ physical button order and prevents accidental playback triggering.
5. Crossfader MUST span the full panel width — it is a shared element that conceptually bridges two decks; a short crossfader breaks the mixer metaphor.
6. EQ knobs MUST appear in order GAIN → HI → MID → LO from left to right — reversing frequency order is a common mis-spec that DJs immediately notice.

## Interactivity

1. **Radial knobs (GAIN, HI, MID, LO)**: Click and drag vertically to rotate — dragging up rotates clockwise, down counterclockwise. Indicator dot angle updates in real-time via `transform: rotate(Xdeg)` on the wrapper div.
2. **Jog wheel platter**: Click and drag to rotate — rotates the conic-gradient disc visually. Drag left/right spins the wheel, updating a CSS `transform: rotate` on the platter div.
3. **PITCH fader**: Click and drag vertically to move thumb — updates fill height. Center position = 0% pitch shift.
4. **Channel fader (CH)**: Drag vertically, updates fill height and thumb position.
5. **Crossfader**: Drag horizontally — moves thumb left/right across the track.
6. **VU meter**: CSS animation pulses the bar heights periodically to simulate live levels.
7. **Transport buttons**: Click feedback — CUE highlights green briefly, SYNC highlights blue, PLAY toggles playing state (green glow).
