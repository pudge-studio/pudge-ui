---
name: Mode Badge
id: mode-badge
class: .mode-badge
category: indicators
index: 5
materials: [glossy-polycarbonate]
sizes: [default]
interactive: false
requires_js: false
canvas: false
---

# Mode Badge

## Physical Analog
**Reference devices**: Camera top LCD mode indicator (M/A/S/P), Sony picture profile selector.
**Mechanism**: The large mode letter (M, A, S, P) is derived from the markings on the camera mode dial. When displayed as a badge rather than a dial position, it indicates the current setting in a status context.

## Geometry

| Property | Value |
|----------|-------|
| Padding | 6px 14px |
| Border radius | `--radius-md` (8px) |
| Mode letter font size | 28px |
| Mode key font size | 7px |
| Mode sub font size | 10px |
| Element gap | 6px |

## CSS Recipe

### Container (`.mode-badge`)
```css
.mode-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--bg-panel); border: 1px solid var(--border-mid);
  border-radius: var(--radius-md); padding: 6px 14px;
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 var(--border-hi);
}
```

### Mode letter (`.mode-letter`)
```css
.mode-letter { font-family: var(--font-display); font-size: 28px; color: #fff; line-height: 1; }
```

### Detail container (`.mode-detail`)
```css
.mode-detail { display: flex; flex-direction: column; gap: 2px; }
```

### Key label (`.mode-key`)
```css
.mode-key { font-size: 7px; letter-spacing: 2px; color: var(--text-muted); font-family: var(--font-ui); }
```

### Sub label (`.mode-sub`)
```css
.mode-sub { font-size: 10px; color: var(--text-primary); letter-spacing: 1px; font-family: var(--font-ui); font-weight: 500; }
```

## HTML Structure
```html
<div class="mode-badge">
  <span class="mode-letter">M</span>
  <div class="mode-detail">
    <span class="mode-key">MODE</span>
    <span class="mode-sub">Manual</span>
  </div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
No material variants. Uses Tier 2 raised depth model.

## Theme Behavior
- Background swaps via `--bg-panel`
- Mode letter stays white (#fff) in both themes for high contrast
- Key label uses `--text-muted`, sub label uses `--text-primary`
- Shadow stack adapts via tokens

## Constraints
1. Mode letter MUST use `--font-display` (Michroma) at 28px
2. Mode letter MUST be white (#fff) for maximum contrast
3. MUST use Tier 2 shadow model (2px hard edge + inset highlight)
4. Key label MUST be 7px with 2px letter-spacing (micro label convention)
5. Layout MUST be horizontal (letter on left, detail column on right)
6. MUST NOT be interactive (display-only indicator)

## Accessibility
- Use `role="status"` for dynamic mode display
- Include full description: `aria-label="Mode: Manual (M)"`
- Ensure sufficient contrast for the 7px key label text
