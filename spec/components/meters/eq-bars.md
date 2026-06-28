---
name: Equalizer Bars
id: eq-bars
class: .eq-bars
category: meters
index: 4
materials: [phosphor-screen]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Equalizer Bars

## Physical Analog
**Reference devices**: Winamp visualization, Windows Media Player EQ display, car stereo graphic EQ.
**Mechanism**: Graphic equalizer showing gain/cut per frequency band. Unlike VU (signal level), EQ shows frequency response curve. Bars represent fixed bands (60Hz, 250Hz, 1kHz, 4kHz, 16kHz). Height = boost/cut applied.

## Geometry

| Property | Value |
|----------|-------|
| Container height | 90px |
| Band width | 14px |
| Band gap | 3px |

## CSS Recipe

### Wrapper
```css
.eq-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
```

### Container
```css
.eq-bars { display: flex; align-items: flex-end; gap: 3px; height: 90px; }
```

### Band (Default: Blue)
```css
.eq-band {
  width: 14px; border-radius: 2px 2px 0 0;
  background: linear-gradient(180deg, var(--blue-info), #2255aa);
  min-height: 4px;
}
```

### Color Variants
```css
.eq-band.warm { background: linear-gradient(180deg, var(--pink-action), #994466); }
.eq-band.bright { background: linear-gradient(180deg, var(--gold-warm), #997722); }
```

## HTML Structure
```html
<div class="eq-wrap">
  <div class="eq-bars">
    <div class="eq-band warm" style="height:30%"></div>
    <div class="eq-band warm" style="height:50%"></div>
    <div class="eq-band" style="height:70%"></div>
    <div class="eq-band" style="height:90%"></div>
    <div class="eq-band" style="height:75%"></div>
    <div class="eq-band bright" style="height:55%"></div>
    <div class="eq-band bright" style="height:35%"></div>
    <div class="eq-band bright" style="height:20%"></div>
  </div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants

| Color Variant | Frequency Range |
|---------------|----------------|
| `.warm` (pink) | Low/mid frequencies |
| default (blue) | Mid frequencies |
| `.bright` (gold) | High frequencies |

## Theme Behavior
- Band colors are fixed accent colors
- No theme-dependent changes

## Constraints
1. Color variants MUST distinguish frequency ranges: warm=low, default=mid, bright=high.
2. Bands are narrower than VU bars (14px vs 12px) with tighter gap (3px vs 4px).
3. Each band gradient runs lighter at top, darker at bottom.

## Accessibility
- Decorative visualization
- Use `aria-hidden="true"` or `role="img"` with `aria-label`
