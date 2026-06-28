---
name: Status Bar
id: status-bar
class: .status-bar
category: navigation
index: 5
materials: [glossy-polycarbonate]
sizes: [default]
interactive: false
requires_js: false
canvas: false
---

# Status Bar

## Physical Analog
**Reference devices**: Nokia phone top status bar, iPod top bar, camera viewfinder top information strip.
**Mechanism**: The top status strip on every feature phone and camera viewfinder. Displays persistent system information: time, signal strength, battery level, recording status, GPS lock, etc. This bar is always visible regardless of the current app or screen. On physical devices, this data is often rendered by a dedicated display controller, separate from the main application processor.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 4px 10px |
| Min width | 200px |
| Border radius | `--radius-md` (8px) |
| Time font size | 13px |
| Status text font size | 9px |
| Icon gap | 6px |

## CSS Recipe

### Container (`.status-bar`)
```css
.status-bar {
  display: flex; align-items: center; gap: 8px;
  padding: 4px 10px; background: var(--bg-raised);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  min-width: 200px;
}
```

### Sub-elements
```css
.sb-time { font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); letter-spacing: 1px; }
.sb-icons { display: flex; align-items: center; gap: 6px; margin-left: auto; }
.sb-text { font-family: var(--font-ui); font-size: 9px; font-weight: 500; color: var(--text-muted); }
```

### Signal bars (used within status bar)
```css
.signal-bars { display: flex; align-items: flex-end; gap: 3px; height: 24px; }
.signal-strength-bar { width: 4px; border-radius: 1px; background: var(--green-on); transition: opacity 0.2s; }
.signal-strength-bar.off { opacity: 0.15; background: var(--text-muted); }
```

### Battery icon (used within status bar)
```css
.battery-icon { display: inline-flex; align-items: center; gap: 2px; }
.battery-body {
  width: 28px; height: 14px; border: 2px solid var(--border-mid);
  border-radius: 3px; padding: 2px; position: relative;
}
.battery-body::after {
  content: ''; position: absolute; right: -5px; top: 50%; transform: translateY(-50%);
  width: 3px; height: 6px; background: var(--border-mid); border-radius: 0 1px 1px 0;
}
.battery-fill { height: 100%; border-radius: 1px; background: var(--green-on); transition: width 0.3s, background 0.3s; }
.battery-fill.medium { background: var(--amber); }
.battery-fill.low { background: var(--red-alert); }
```

## HTML Structure
```html
<div class="status-bar">
  <span class="sb-time">12:45</span>
  <span class="sb-text">3G</span>
  <div class="sb-icons">
    <div class="signal-bars" style="height:14px">
      <div class="signal-strength-bar" style="height:4px"></div>
      <div class="signal-strength-bar" style="height:7px"></div>
      <div class="signal-strength-bar" style="height:10px"></div>
      <div class="signal-strength-bar off" style="height:13px"></div>
    </div>
    <div class="battery-icon">
      <div class="battery-body" style="width:20px;height:10px">
        <div class="battery-fill" style="width:70%"></div>
      </div>
    </div>
  </div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses standard raised surface.

## Theme Behavior
- Background swaps via `--bg-raised` token
- Text colors swap via theme tokens
- Signal bars and battery use accent colors that remain constant across themes
- Border colors swap via `--border-subtle` and `--border-mid`

## Constraints
1. MUST use monospace font for time display (data readout convention)
2. MUST use `margin-left: auto` on icons container to push icons to the right
3. Signal bars MUST use `.off` class for inactive bars (not hidden)
4. Battery fill color MUST change based on level: green (>50%), amber/`.medium` (20-50%), red/`.low` (<20%)
5. MUST maintain minimum 200px width for readability

## Accessibility
- Use `role="status"` or `aria-live="polite"` for dynamic values
- Signal strength should have `aria-label` describing level (e.g., "3 of 5 bars")
- Battery should have `aria-label` describing percentage
- Time should use `<time>` element when possible
