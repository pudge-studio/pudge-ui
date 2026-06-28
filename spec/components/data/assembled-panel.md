---
name: Assembled Panel
id: assembled-panel
class: .panel
category: data
index: 4
materials: [brushed-metal, rubber, glossy-polycarbonate, phosphor-screen]
sizes: [default]
interactive: true
requires_js: true
canvas: true
---

# Assembled Panel

## Physical Analog
**Reference devices**: Camera Viewfinder HUD, Audio Mixer Strip, complete equipment front panels.
**Mechanism**: An assembled panel is not a single component but a composition of multiple pudge-ui components within a Panel container (I1). This document describes the composition rules and patterns for building complex, multi-component panels that maintain physical plausibility.

## Geometry

| Property | Value |
|----------|-------|
| Container | `.panel` (I1) with `--radius-lg` |
| Padding | 22px (panel standard) |
| Intra-group gap | `--space-md` (14px) |
| Inter-group gap | `--space-lg` (22px) |
| Grid layout | `repeat(auto-fit, minmax(340px, 1fr))` |

## CSS Recipe

Assembled panels use the base `.panel` CSS from I1, combined with layout utilities:

### Panel container
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

### Layout helpers
```css
.flex-row { display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap; }
.flex-col { display: flex; flex-direction: column; gap: 8px; }
```

### Serial / fabrication block
```css
.serial { margin-top: 16px; color: var(--text-muted); font-size: 9px; letter-spacing: 2px; display: flex; justify-content: space-between; font-family: var(--font-ui); }
```

## HTML Structure

### Example: Diagnostic Panel
```html
<div class="panel" style="width:360px">
  <div class="panel-title">SYSTEM DIAGNOSTICS</div>

  <!-- Status bar at top -->
  <div class="status-bar" style="margin-bottom:14px">
    <span class="sb-time">14:32</span>
    <div class="sb-icons">
      <div class="led-dot green"></div>
    </div>
  </div>

  <!-- Mode indicator -->
  <div class="flex-row" style="gap:8px;margin-bottom:14px">
    <div class="mode-badge">
      <span class="mode-letter">M</span>
      <div class="mode-detail"><span class="mode-key">MODE</span><span class="mode-sub">Manual</span></div>
    </div>
    <div class="chip-row">
      <div class="status-chip active">ONLINE</div>
      <div class="status-chip">REMOTE</div>
    </div>
  </div>

  <!-- Data readout -->
  <table class="data-table" style="margin-bottom:14px">
    <thead><tr><th>PARAM</th><th>VALUE</th><th>STATUS</th></tr></thead>
    <tbody>
      <tr><td>CPU</td><td class="val">72C</td><td><div class="led-dot green"></div></td></tr>
      <tr><td>MEM</td><td class="val">8.2G</td><td><div class="led-dot green"></div></td></tr>
    </tbody>
  </table>

  <!-- Controls -->
  <div class="flex-row" style="gap:8px">
    <button class="push-btn xs active">MODE</button>
    <button class="push-btn xs">RESET</button>
    <button class="push-btn xs">CONFIG</button>
  </div>

  <div class="serial"><span>REV-C</span><span>UNIT-07</span></div>
</div>
```

## Size Variants
No size variants defined. Assembled panels scale to content and container.

## Material Variants
Assembled panels can combine multiple materials following the 2-material rule:
- Panel body: brushed metal or glossy polycarbonate
- Controls within: rubber buttons, glossy buttons, phosphor displays
- Maximum 2 materials per panel for physical plausibility

## Theme Behavior
- All sub-components follow their individual theme rules
- Panel container follows I1 Panel theme behavior
- Consistent lighting direction must be maintained (all gradients top-to-bottom)

## Constraints

### Composition Rules (from design.md)
1. **Hierarchy**: The panel container (I1) provides the outer frame. Content is organized in rows/columns within.
2. **Spacing**: Use `--space-md` (14px) for gaps between related components, `--space-lg` (22px) for gaps between groups.
3. **Consistent lighting**: All components in a panel share the same light direction (top-left). MUST NOT mix components with different gradient directions.
4. **Status bar placement**: Status information (status bar, mode badges, battery) goes at the TOP edge. Controls go in the MIDDLE. Metadata (serial numbers, timecodes) goes at the BOTTOM.
5. **Material consistency**: Within a single panel, use at most 2 materials (e.g., brushed metal knobs on a rubber panel surface). Too many materials in one panel breaks physical plausibility.
6. MUST include serial/revision block at the bottom (manufacturing authenticity detail).
7. MUST use `.panel-title` with `--font-display` for the panel name.
8. MUST use `.panel-label` for section dividers within the panel.

## Accessibility
- Assembled panel should use `role="region"` with `aria-label` describing the panel purpose
- Internal sections should use appropriate heading levels
- Tab order within the panel should follow visual top-to-bottom, left-to-right order
- All sub-component accessibility rules apply individually
- Complex panels may benefit from `aria-describedby` pointing to a usage description
