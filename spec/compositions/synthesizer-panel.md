---
name: Synthesizer Panel
id: synthesizer-panel
components: [mode-dial, radial-knob, range-fader, segmented-control, vertical-fader, led-dots, toggle-switch]
materials: [default, metal]
new: true
---

# Synthesizer Panel

## Description

An analog monophonic synthesizer control panel in the tradition of the Roland SH-101 and Moog Minimoog Model D. Three functional sections — VCO (oscillator), VCF (filter), and ENVELOPE — are laid out left-to-right as on physical hardware. A VCA output level and LFO sync control sit at the far right. Panel color is the Roland SH-101's characteristic warm gray with amber indicators.

## Reference Devices

Roland SH-101 (1982), Moog Minimoog Model D (1970/2016 reissue), Korg MS-20 (1978), Arturia Minibrute 2 (2018).

## Layout

```
┌─ VCO ─────────────────┐ ┌─ VCF ─────────────────┐ ┌─ ENV ──────────────────────┐
│  WAVE       OCT        │ │ CUTOFF   RESO   ENV MOD │ │  A ──●─  D ──●─  S ──●─  │
│  ╔════════╗ [-1·0·+1] │ │  (○)      (○)     (○)   │ │                R ──●─     │
│  ║  ◢  ◻  ║            │ │                          │ └────────────────────────────┘
│  ║  ∿  ⊓  ║            │ │  KBD ┌═══┐  LFO         │
│  ╚════════╝            │ │ SYNC │OFF│ SYNC          │ ┌─ VCA ───┐  ● MIDI
│                        │ │      └═══┘  [──]         │ │ LVL ┃━┃ │  ● PWR
└────────────────────────┘ └───────────────────────────┘ └─────────┘  ● GATE
```

## Assembly Rules

1. **Container**: Use `.panel` with default material. Landscape: `min-width: 580px`. `padding: 16px 20px`. `background: linear-gradient(180deg, var(--bg-raised), var(--bg-surface))`. The SH-101's face is a warm off-white in the original, but for dark-mode-first pudge-ui, use the standard dark surface. A thin `border-top: 3px solid var(--amber)` at the very top edge evokes the Roland brand stripe.

2. **Section layout**: Three side-by-side `chassis-panel` containers with `display: flex; gap: 16px`. Each section has a `.cpanel-header` with title in 9px mono uppercase. Sections: `VCO`, `VCF`, and `ENVELOPE`.

3. **VCO section** (`chassis-panel` left):
   - **Waveform selector**: `mode-dial` component. The SH-101 has 4 waveforms: SAW (◢), SQUARE (□), SINE (∿), PULSE (⊓). Set `mode-dial-label` to cycle: `◢` (SAW) / `□` (SQR) / `∿` (SIN) / `⊓` (PLS). Default selected: `◢` SAW. Size: 96px effective (the mode-dial default is 120px; apply `transform: scale(0.8)` to reduce to 96x96px). Label `WAVE` at 7px mono above.
   - **Octave selector**: `segmented-control` below the dial. Three segments: `-1` / `0` / `+1`. Active: `0`. Label `OCT` at 7px mono above. `margin-top: 12px`.

4. **VCF section** (`chassis-panel` center):
   - Three `radial-knob` components in a horizontal row: CUTOFF (largest functional role, standard 80px), RESO (80px), ENV MOD (80px). Labels at 7px mono below: `CUTOFF` / `RESO` / `ENV MOD`.
   - **KBD SYNC toggle**: `toggle-switch` in the OFF position, label `KBD` above and `SYNC` below at 7px mono. Toggles keyboard tracking of the filter.
   - **LFO SYNC toggle**: A second `toggle-switch` beside the KBD SYNC, label `LFO` above and `SYNC` below.
   - Both toggles sit in a horizontal row below the knobs, `gap: 16px; margin-top: 10px`.

5. **ENVELOPE section** (`chassis-panel` right):
   - Four `range-fader` components in a horizontal row: A (Attack), D (Decay), S (Sustain), R (Release). Each fader width: `36px` (compact — set `width: 36px` on the `.fader-h-wrap`, which compresses the track). Labels at 7px mono above: `A` / `D` / `S` / `R`. Default positions: A=20% (fast attack), D=40% (medium decay), S=70% (sustained hold), R=30% (moderate release).
   - The SH-101 ADSR uses vertical faders, not horizontal sliders. Render these as **vertical** by rotating the range-fader: wrap each in a container with `transform: rotate(-90deg); transform-origin: center`. Container height becomes the original width. This produces the characteristic vertical ADSR sliders of analog synthesizers.

6. **VCA + status section**: A narrow fourth `chassis-panel` to the right of ENVELOPE. Contains:
   - `vertical-fader` labeled `LVL` at 7px mono above. Thumb at 80% (output level nearly open). Height: 80px.
   - Three `led-dots` stacked vertically to the right of the fader: `.blue` MIDI IN, `.green` PWR, `.amber` GATE. Labels at 6px mono.

7. **ADSR vertical variant note**: Because `range-fader` is natively horizontal, wrapping in `transform: rotate(-90deg)` requires careful sizing. The fader track becomes the vertical axis. Set each `range-fader` track to `width: 80px` (this becomes the vertical height after rotation). The container div must be `width: 16px; height: 80px` post-rotation. Position: `display: flex; align-items: center; justify-content: center`. If the fader track appears horizontal after applying the rotation, add explicit `height: 80px; width: 16px` to the wrapper div and verify that `transform-origin: center` is set.

8. **Section panel spacing**: `gap: 12px` between all chassis-panel sections. Each section background: `var(--bg-raised)` with `border: 1px solid var(--border-subtle)`.

## Component Configuration

| Component | Section | Config |
|-----------|---------|--------|
| mode-dial | VCO | 4 modes: SAW SQR SIN PLS, default SAW, scale 0.8 |
| segmented-control | VCO | 3 segments: -1 / 0 / +1, active: 0, label: OCT |
| radial-knob (×3) | VCF | CUTOFF / RESO / ENV MOD, 80px, labels at 7px mono |
| toggle-switch (×2) | VCF | KBD SYNC (OFF) + LFO SYNC (OFF), side-by-side |
| range-fader (×4) | ENVELOPE | A D S R, rotated vertical, width 80px (height post-rotate) |
| vertical-fader | VCA | LVL, 80px height, thumb at 80% |
| led-dots (×3) | VCA | `.blue` MIDI, `.green` PWR, `.amber` GATE |

## Constraints

1. MUST render in landscape and be wider than it is tall — a portrait synthesizer panel is physically impossible; the ADSR section alone requires horizontal space.
2. ADSR sliders MUST be rendered vertically (rotated `range-fader`) — horizontal ADSR is not how any hardware synthesizer is built and immediately reads as wrong to musicians.
3. MUST render sections in order: VCO → VCF → ENVELOPE → VCA — this is the signal flow (oscillator → filter → amp) which is universal across all analog synthesizers. Reversing it is a non-starter.
4. VCF cutoff knob MUST be visually prominent — on real hardware it is the largest or most central control; demoting it reads as a misunderstanding of synthesis.
5. MUST NOT combine ADSR into a single stepper or selector — the four independent ADSR controls are the mechanical identity of envelope shaping; collapsing them defeats the hardware metaphor.
6. Waveform selector (mode-dial) MUST show waveform symbols, not names — SAW / SQR / SIN / PLS as symbols (◢ □ ∿ ⊓) match the engravings on physical hardware panels.

## Interactivity

1. **Mode dial (WAVE)**: Click to cycle through the 4 waveforms: SAW (◢) → SQR (□) → SIN (∿) → PLS (⊓). The center symbol updates and the notch rotates to indicate the current selection (0°, 90°, 180°, 270°).
2. **OCT segmented control**: Click any segment (-1 / 0 / +1) to activate it.
3. **VCF radial knobs (CUTOFF, RESO, ENV MOD)**: Drag vertically to rotate — indicator dot angle updates in real-time. Range: −135° to +135°.
4. **KBD SYNC / LFO SYNC toggles**: Click to toggle on/off. When ON, the toggle thumb slides and turns amber.
5. **ADSR faders**: Drag vertically to move — updates fill height and thumb position for each of A, D, S, R.
6. **VCA LVL fader**: Drag vertically to set output level.
7. **Gate LED**: Pulses amber when VCA is above 50% — use a CSS animation conditioned on the fader position.
