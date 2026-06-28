---
name: Timecode Display
id: timecode-display
class: .timecode-display
category: readouts
index: 4
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Timecode Display

## Physical Analog
**Reference devices**: Sony BVM broadcast monitors, SMPTE timecode generators, Tascam DA-88 tape machines, video editing decks.
**Mechanism**: Dedicated timecode readout in SMPTE format (HH:MM:SS:FF). VFD or custom LED segment display. Colons blink at 1Hz during recording/playback as visual "heartbeat" confirming timecode is running.

## Geometry

| Property | Value |
|----------|-------|
| Segment font | 22px Michroma display |
| Colon font | 18px Michroma |
| Layout | Inline-flex, baseline-aligned |
| Padding | 6px 16px |

## CSS Recipe

### Container
```css
.timecode-display {
  background: var(--bg-inset); border: 1px solid #1e1e1e;
  border-radius: var(--radius-md); padding: 6px 16px;
  display: inline-flex; align-items: baseline;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.6);
}
```

### Segments
```css
.tc-segment {
  font-family: var(--font-display); font-size: 22px;
  color: var(--amber); letter-spacing: 2px;
  text-shadow: 0 0 12px var(--amber-glow);
  font-variant-numeric: tabular-nums;
}
```

### Colons
```css
.tc-colon { font-family: var(--font-display); font-size: 18px; color: var(--amber-dim); padding: 0 1px; position: relative; top: -1px; }
```

### Blink Animation
```css
@keyframes tcBlink { 0%,49%{opacity:1} 50%,100%{opacity:0.15} }
.tc-blink { animation: tcBlink 1s step-end infinite; }
```

## HTML Structure
```html
<div class="timecode-display">
  <span class="tc-segment">01</span><span class="tc-colon tc-blink">:</span>
  <span class="tc-segment">23</span><span class="tc-colon">:</span>
  <span class="tc-segment">45</span><span class="tc-colon">:</span>
  <span class="tc-segment">12</span>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
Single material: Phosphor screen display cavity.

## Theme Behavior
- Background and shadow adapt via tokens
- Amber segment color and glow are fixed
- Colon uses `--amber-dim` for secondary emphasis

## Constraints
1. Blink animation MUST use `step-end` timing -- instant on/off, not gradual fade. Matches discrete LED behavior.
2. Blink rate MUST be 1Hz (1s cycle) -- standard broadcast heartbeat.
3. Only the FIRST colon blinks (`.tc-blink`) -- others are static.
4. `font-variant-numeric: tabular-nums` is REQUIRED for stable digit widths.
5. Segments use `--font-display` (Michroma), NOT `--font-lcd` (VT323).

## Accessibility
- Read-only display
- Use `aria-label` on container describing the timecode value
- `aria-live="polite"` if timecode updates in real-time
- Blink animation respects `prefers-reduced-motion` (should be paused)
