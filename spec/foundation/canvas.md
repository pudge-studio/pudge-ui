# Canvas-Based Components

Rendering algorithms for components drawn directly to HTML5 Canvas — histogram, waveform, and oscilloscope visualizations that simulate phosphor-screen displays.

---

## Histogram (F5)

Renders 200x80px luminance distribution. For each x pixel, calculate a height value using a sine-based curve with random variation, then draw a 1px-wide vertical bar with an amber gradient (`rgba(245,166,35,0.1)` to `rgba(245,166,35,0.6)`).

## Waveform (F6)

Renders 200x80px audio waveform. Single stroke path using compound sine waves (`sin(x*0.08)` + `sin(x*0.03)`) with random jitter. Stroke color: `rgba(102,255,102,0.6)`, 1px line width.

## Oscilloscope (F14)

Animated 200x80px trace. Uses `requestAnimationFrame` loop. Each frame:
1. Draw semi-transparent background (creates trail effect)
2. Calculate sine wave with time offset: `sin(x*0.06 + t)` + harmonics
3. Stroke with green `rgba(102,255,102,0.8)` and `shadowBlur: 4` for phosphor glow
