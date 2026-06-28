---
name: Signal Meter
id: signal-meter
class: .signal-meter
category: meters
index: 1
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Signal Meter

## Physical Analog
**Reference devices**: Graphic equalizer displays (Pioneer, Kenwood car stereos), Winamp visualization, broadcast spectrum analyzers.
**Mechanism**: LED bar graph array. Each bar is a vertical column of LEDs (8-16 per column, 4-16 columns). Column height represents amplitude of a frequency band. LEDs light bottom-to-top. Green-to-red gradient via different colored LEDs at different heights.

## Geometry

| Property | Value |
|----------|-------|
| Container height | 100px |
| Bar width | 16px |
| Bar gap | 6px |
| Bar radius | 3px top corners |

## CSS Recipe

### Container
```css
.signal-meter { display: flex; align-items: flex-end; gap: 6px; height: 100px; }
```

### Individual Bar
```css
.signal-bar {
  width: 16px; border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, var(--green-hi), var(--green-on));
  box-shadow: 0 0 8px rgba(102,255,102,0.15);
  animation: fluctuate 2s infinite ease-in-out;
}
```

### Fluctuation Animation
```css
@keyframes fluctuate { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.25)} }
```

## HTML Structure
```html
<div class="signal-meter">
  <div class="signal-bar" style="height:28%"></div>
  <div class="signal-bar" style="height:55%"></div>
  <div class="signal-bar" style="height:80%"></div>
  <div class="signal-bar" style="height:42%"></div>
  <div class="signal-bar" style="height:64%"></div>
  <div class="signal-bar" style="height:35%"></div>
  <div class="signal-bar" style="height:72%"></div>
  <div class="signal-bar" style="height:50%"></div>
</div>
```

## Size Variants
No explicit size variants. Heights set per bar via inline style.

## Material Variants
Single material: LED bars with green gradient and glow.

## Theme Behavior
- LED colors and glow are fixed (LEDs emit their own light)
- Container has no background (transparent)

## Constraints
1. Bars MUST align to bottom (`align-items: flex-end`).
2. Bar heights are set individually per bar via inline `style`.
3. `fluctuate` animation simulates continuous signal variation.
4. Border-radius only on top corners (bars grow from bottom).
5. Subtle glow (`0 0 8px rgba(102,255,102,0.15)`) simulates LED light spill.

## Accessibility
- Decorative visualization; use `aria-hidden="true"` if purely decorative
- If informational, use `role="img"` with `aria-label` describing the signal levels
