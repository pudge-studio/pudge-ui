---
name: Focus Brackets
id: focus-brackets
class: .focus-box
category: overlays
index: 7
materials: []
sizes: [default]
interactive: false
requires_js: true
canvas: true
---

# Focus Brackets

## Physical Analog
**Reference devices**: Every autofocus camera since the Nikon F5 (1996) -- Sony, Canon, Nikon, Fujifilm.
**Mechanism**: The camera's autofocus system overlays bracket indicators on the viewfinder/EVF image at the position of detected subjects. Each bracket is formed from four L-shaped corner marks that define a bounding rectangle. Three states: Searching/acquiring (brackets pulse with opacity oscillation), Locked (brackets turn solid green), and Face/Eye AF labels (text labels below brackets).

## Geometry

| Property | Value |
|----------|-------|
| Demo container | 200x140px |
| Corner mark size | 12x12px |
| Corner border width | 2px |
| Label font size | 9px |
| Label offset | -18px below box |
| Pulse animation | 0.6s |

## CSS Recipe

### Demo container (`.focus-demo`)
```css
.focus-demo {
  width: 200px; height: 140px; background: #222;
  border-radius: var(--radius-sm); position: relative; overflow: hidden;
  border: 1px solid #1e1e1e;
}
```

### Focus box (`.focus-box`)
```css
.focus-box { position: absolute; border: none; }
```

### Corner marks (`.focus-corner`)
```css
.focus-corner {
  position: absolute; width: 12px; height: 12px;
  border-color: var(--amber); border-style: solid; opacity: 0.9;
}
.focus-corner.tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
.focus-corner.tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
.focus-corner.bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
.focus-corner.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }
```

### Acquiring (searching) animation
```css
@keyframes focusPulse { to{opacity:0.3} }
.focus-box.acquiring .focus-corner { opacity: 0.7; animation: focusPulse 0.6s ease-in-out infinite alternate; }
```

### Locked state
```css
.focus-box.locked .focus-corner { border-color: var(--green-hi); }
```

### Label (`.focus-label`)
```css
.focus-label {
  position: absolute; bottom: -18px; left: 0;
  font-size: 9px; color: var(--amber); letter-spacing: 1px; white-space: nowrap;
  font-family: var(--font-ui);
}
.focus-box.locked .focus-label { color: var(--green-hi); }
```

## HTML Structure
```html
<div class="focus-demo" style="background:#333">
  <!-- Acquiring state -->
  <div class="focus-box" style="top:20px;left:30px;width:60px;height:60px">
    <div class="focus-corner tl"></div>
    <div class="focus-corner tr"></div>
    <div class="focus-corner bl"></div>
    <div class="focus-corner br"></div>
    <div class="focus-label">FACE</div>
  </div>
  <!-- Locked state -->
  <div class="focus-box locked" style="top:40px;left:120px;width:40px;height:40px">
    <div class="focus-corner tl"></div>
    <div class="focus-corner tr"></div>
    <div class="focus-corner bl"></div>
    <div class="focus-corner br"></div>
    <div class="focus-label">EYE AF</div>
  </div>
</div>
```

## Size Variants
No size variants defined. Box size is determined by detected subject.

## Material Variants
No material variants. Pure HUD overlay element.

## Theme Behavior
- Bracket colors are fixed (amber for acquiring, green-hi for locked) regardless of theme
- Demo container background is fixed dark (#222/#333) to simulate viewfinder

## Constraints
1. MUST use four L-shaped corner marks (not a full border)
2. Corner marks MUST be 12x12px with 2px border
3. Acquiring state MUST pulse between 0.7 and 0.3 opacity at 0.6s cycle
4. Locked state MUST use `--green-hi` (#66ff66) for confirmed focus
5. Default/acquiring color MUST be `--amber`
6. Labels MUST appear below the bracket box
7. Label color MUST match bracket color (amber or green)

## Accessibility
- Focus brackets are visual-only overlays (decorative in the UI context)
- If used to convey status, add `aria-live="polite"` region with text description
- State changes should be announced: "Focus acquired", "Focus locked on [subject]"
