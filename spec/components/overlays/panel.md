---
name: Panel
id: panel
class: .panel
category: overlays
index: 1
materials: [brushed-metal]
sizes: [default]
interactive: false
requires_js: false
canvas: true
---

# Panel

## Physical Analog
**Reference devices**: 19-inch rack-mount equipment modules (PreSonus, Mackie, MOTU), modular synthesizer panels (Eurorack).
**Mechanism**: A CNC-milled aluminum or stamped steel panel that forms the front face of a rack-mount module. The panel has chamfered edges (CNC-milled 45-degree bevels around the perimeter that catch light on the top and left edges), corner registration marks (L-shaped alignment marks used during manufacturing), and a serial/revision block at the bottom.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 22px |
| Border radius | `--radius-lg` (14px) |
| Corner marks | 14x14px L-shapes |
| Corner mark offset | 10px from edges |
| Title font size | 11px |
| Label font size | 9px |

## CSS Recipe

### Container (`.panel`)
```css
.panel {
  position: relative;
  background: linear-gradient(180deg, var(--bg-surface), var(--bg-panel));
  border: 1px solid var(--border-mid); border-radius: var(--radius-lg);
  padding: 22px;
  box-shadow: 0 2px 0 var(--border-deep), 0 10px 28px rgba(0,0,0,0.3), inset 0 1px 0 var(--border-hi);
  overflow: hidden;
}
```

### Corner registration marks
```css
.panel::before, .panel::after {
  content: ''; position: absolute; width: 14px; height: 14px;
  border: 1px solid var(--border-hi); opacity: 0.35;
}
.panel::before { top: 10px; left: 10px; border-right: none; border-bottom: none; }
.panel::after { right: 10px; bottom: 10px; border-left: none; border-top: none; }
```

### Title (`.panel-title`)
```css
.panel-title {
  font-family: var(--font-display); letter-spacing: 2px;
  font-size: 11px; margin-bottom: 14px; color: var(--text-primary);
}
```

### Label (`.panel-label`)
```css
.panel-label {
  color: var(--text-muted); letter-spacing: 2px;
  font-size: 9px; margin-bottom: 10px; font-family: var(--font-ui); font-weight: 500;
}
```

### Serial block (`.serial`)
```css
.serial { margin-top: 16px; color: var(--text-muted); font-size: 9px; letter-spacing: 2px; display: flex; justify-content: space-between; font-family: var(--font-ui); }
```

## HTML Structure
```html
<div class="panel" style="width:240px">
  <div class="panel-title">CONTROL CLUSTER</div>
  <div class="panel-label">SYSTEM STATUS</div>
  <div class="flex-row" style="gap:8px">
    <button class="push-btn xs active">MODE</button>
    <button class="push-btn xs">SYS</button>
    <button class="push-btn xs">NAV</button>
  </div>
  <div class="serial"><span>REV-B</span><span>UNIT-04</span></div>
</div>
```

## Size Variants
No size variants defined. Width is set by content or parent container.

## Material Variants
No material variants. Uses machined panel surface gradient.

## Theme Behavior
- Background gradient swaps via `--bg-surface` / `--bg-panel` tokens
- Corner marks use `--border-hi` (adapts to theme)
- Shadow stack reduces in light mode (0.3 ambient shadow becomes 0.08)
- Top highlight (`inset 0 1px 0 var(--border-hi)`) adapts automatically

## Constraints
1. MUST use `position: relative` for corner mark positioning
2. MUST include L-shaped corner registration marks via `::before` and `::after`
3. Corner marks MUST be at 35% opacity
4. MUST use Tier 3 (elevated) shadow model: 2px hard edge + 10px ambient + inset highlight
5. MUST use `overflow: hidden` to prevent content from overlapping corners
6. Title MUST use `--font-display` (Michroma) for equipment branding feel
7. Serial/revision block SHOULD appear at the bottom

## Accessibility
- Use `role="region"` with `aria-label` describing the panel's purpose
- Panel title should use appropriate heading level
- Corner marks are decorative (handled by pseudo-elements, inherently hidden from AT)
