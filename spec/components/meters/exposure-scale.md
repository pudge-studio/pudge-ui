---
name: Exposure Scale
id: exp-scale
class: .exp-scale
category: meters
index: 11
materials: [panel]
sizes: [md]
interactive: false
requires_js: false
canvas: false
---

# Exposure Scale

## Physical Analog
**Reference devices**: Bottom-of-viewfinder EV ruler in SLR/DSLR cameras (since Nikon F3, ~1980).
**Mechanism**: Horizontal tick ruler showing exposure compensation scale (-2 to +2 EV). Tick marks at 1/3-stop increments. Floating dot indicator shows current EV compensation. Major ticks (full-stop) taller than minor ticks (1/3-stop).

## Geometry

| Property | Value |
|----------|-------|
| Width | 200px |
| Track height | 12px |
| Major tick | 8px height |
| Minor tick | 4-5px height |
| Indicator dot | 6px diameter |

## CSS Recipe

### Container
```css
.exp-scale { display: flex; flex-direction: column; align-items: center; gap: 2px; width: 200px; }
```

### Track
```css
.exp-track { width: 100%; height: 12px; position: relative; display: flex; align-items: center; }
```

### Ruler Line
```css
.exp-ruler { width: 100%; height: 1px; background: #333; position: absolute; }
```

### Tick Marks
```css
.exp-ticks { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 2px; }
.exp-tick { width: 1px; background: #333; }
.exp-tick.major { height: 8px; background: #555; }
.exp-tick.minor { height: 5px; }
```

### Indicator Dot
```css
.exp-indicator {
  position: absolute; bottom: 0; width: 6px; height: 6px;
  background: var(--amber); border-radius: 50%; transform: translateX(-50%);
  box-shadow: 0 0 6px var(--amber-glow);
}
```

### Labels
```css
.exp-labels { width: 100%; display: flex; justify-content: space-between; padding: 0 2px; }
.exp-labels span { font-size: 7px; color: var(--text-muted); letter-spacing: 1px; font-family: var(--font-ui); }
```

## HTML Structure
```html
<div class="exp-scale">
  <div class="exp-track">
    <div class="exp-ruler"></div>
    <div class="exp-ticks">
      <div class="exp-tick major" style="height:8px"></div>
      <div class="exp-tick minor" style="height:4px"></div>
      <div class="exp-tick minor" style="height:4px"></div>
      <div class="exp-tick major" style="height:8px"></div>
      <!-- ... repeat for -2 to +2 range -->
      <div class="exp-tick major" style="height:8px"></div>
    </div>
    <div class="exp-indicator" style="left:62%"></div>
  </div>
  <div class="exp-labels"><span>-2</span><span>-1</span><span>0</span><span>+1</span><span>+2</span></div>
</div>
```

## Size Variants
No explicit size variants.

## Material Variants
- Ruler and ticks: Subtle gray lines
- Indicator: Amber dot with glow

## Theme Behavior
- Tick and ruler colors are fixed subtle grays
- Amber indicator and glow are fixed
- Labels use `--text-muted`

## Constraints
1. Major ticks MUST be taller than minor ticks (8px vs 4-5px).
2. Tick spacing represents 1/3-stop increments between major full-stop marks.
3. Indicator position set via `left` percentage.
4. Labels MUST show -2, -1, 0, +1, +2 at equal spacing.
5. Labels are 7px font (very small, viewfinder annotation style).

## Accessibility
- Use `role="img"` with `aria-label` describing current EV value
- Or `role="meter"` if interactive
