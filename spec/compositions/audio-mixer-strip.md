---
name: Audio Mixer Strip
id: audio-mixer-strip
components: [radial-knob, vu-meter, vertical-fader, led-dots, mode-badge]
materials: [default, metal]
---

# Audio Mixer Strip

## Description

A vertical channel strip from a mixing console. Multiple strips are placed side by side to form a mixer bank. Each strip contains a pan knob, VU meter, channel fader, channel label, and solo/mute LED indicator.

## Reference Devices

Mackie 1604-VLZ Pro, SSL Duality, Neve 5088, Yamaha 02R, Behringer X32 (channel strip section).

## Layout

```
┌──────┐  ┌──────┐  ┌──────┐
│ (PAN)│  │ (PAN)│  │ (PAN)│    ← radial-knob (40x40px)
│      │  │      │  │      │
│ ██   │  │ ██   │  │ ██   │    ← vu-meter (2 bars per channel)
│ ██   │  │ ██   │  │ ██   │
│      │  │      │  │      │
│ ┃━┃  │  │ ┃━┃  │  │ ┃━┃  │    ← vertical-fader (100px track)
│ ┃━┃  │  │ ┃━┃  │  │ ┃━┃  │
│ ┃━┃  │  │ ┃━┃  │  │ ┃━┃  │
│      │  │      │  │      │
│ CH1  │  │ CH2  │  │ MST  │    ← channel label
│  ●   │  │  ●   │  │  ●   │    ← led-dot (status)
└──────┘  └──────┘  └──────┘
```

## Assembly Rules

1. **Container**: Use `.panel` with default material. `display: flex; gap: 16px; align-items: flex-end; padding: 16px`.

2. **Each channel strip**: Vertical flex column (`flex-direction: column; align-items: center; gap: 6px`).

3. **Pan knob**: `.radial-knob` at 40x40px (smaller than default). Indicator transform-origin adjusted for the smaller size (`transform-origin: 50% 16px`). Default material for regular channels, `.variant-metal` for master.

4. **Pan label**: `font-size: 7px; letter-spacing: 1px; color: var(--text-muted)`.

5. **VU meter**: 2 bars per channel, 50px height, 2px gap, 6px bar width. Compact sizing.

6. **Channel fader**: `.fader-v-track` at 100px height, 8px width. Thumb at 16x8px (smaller than default). Each channel at different fill heights for visual variety.

7. **Channel label**: `font-family: var(--font-display); font-size: 8px; color: var(--amber)`. Master channel in `color: var(--red-alert)`.

8. **Status LED**: `.led-dot.green` for regular channels, `.led-dot.red` for master.

## Component Configuration

| Component | Channel Config | Master Config |
|-----------|---------------|---------------|
| radial-knob | 40x40px, default material | 40x40px, `.variant-metal` |
| vu-meter | 2 bars, 50px height | 2 bars, 50px height, higher levels |
| vertical-fader | 100px track, varied fills | 100px track, high fill (80%) |
| channel label | `color: var(--amber)` | `color: var(--red-alert)` |
| led-dot | `.green` | `.red` |
