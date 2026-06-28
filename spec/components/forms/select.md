---
name: Select / Dropdown
id: select
class: .select-wrap
category: forms
index: 4
materials: [glossy-polycarbonate]
sizes: [default]
interactive: true
requires_js: true
canvas: false
---

# Select / Dropdown

## Physical Analog
**Reference devices**: Camera menu item selectors, audio equipment preset browsers.
**Mechanism**: A mechanical selector switch adapted to digital form. In hardware, this was a rotary switch with labeled positions or a push-button that cycled through options. The UI version shows the currently selected value in a raised trigger element (resembling a button), and reveals all options in a dropdown panel (resembling the iPod menu list G2) when activated. The arrow indicator rotates 180 degrees on open, mimicking the flip direction of a mechanical indicator flag.

## Geometry

| Property | Value |
|----------|-------|
| Width | 180px |
| Trigger height | 36px |
| Trigger padding | 0 12px |
| Dropdown margin-top | 4px |
| Font size | 11px |
| Option padding | 8px 12px |
| Arrow font size | 8px |

## CSS Recipe

### Wrapper (`.select-wrap`)
```css
.select-wrap { position: relative; width: 180px; }
```

### Trigger (`.select-trigger`)
```css
.select-trigger {
  width: 100%; height: 36px; padding: 0 12px; display: flex;
  align-items: center; justify-content: space-between;
  background: var(--bg-surface); border: 1px solid var(--border-mid);
  border-radius: var(--radius-md); cursor: pointer;
  font-family: var(--font-ui); font-size: 11px; font-weight: 500;
  color: var(--text-primary); letter-spacing: 0.5px;
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 var(--glossy-hi);
  transition: border-color 0.15s;
}
```

### Trigger hover
```css
.select-trigger:hover { border-color: var(--border-hi); }
```

### Arrow (`.select-arrow`)
```css
.select-arrow { font-size: 8px; color: var(--text-muted); transition: transform 0.2s; }
```

### Dropdown (`.select-dropdown`)
```css
.select-dropdown {
  position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
  background: var(--bg-raised); border: 1px solid var(--border-mid);
  border-radius: var(--radius-md); overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3); z-index: 10;
  display: none;
}
```

### Open state
```css
.select-wrap.open .select-dropdown { display: block; }
.select-wrap.open .select-arrow { transform: rotate(180deg); }
```

### Option (`.select-option`)
```css
.select-option {
  padding: 8px 12px; cursor: pointer;
  font-family: var(--font-ui); font-size: 11px; font-weight: 500;
  color: var(--text-secondary); transition: background 0.1s;
}
```

### Option hover
```css
.select-option:hover { background: var(--glow-color); color: var(--text-primary); }
```

### Option selected
```css
.select-option.selected { color: var(--amber); background: rgba(245,166,35,0.06); }
```

## HTML Structure
```html
<div class="select-wrap" id="selectDemo">
  <div class="select-trigger" onclick="document.getElementById('selectDemo').classList.toggle('open')">
    <span>JPEG Fine</span>
    <span class="select-arrow">&#9660;</span>
  </div>
  <div class="select-dropdown">
    <div class="select-option selected">JPEG Fine</div>
    <div class="select-option">JPEG Normal</div>
    <div class="select-option">RAW</div>
    <div class="select-option">RAW + JPEG</div>
  </div>
</div>
```

## Size Variants
No size variants defined.

## Material Variants
- Trigger uses raised surface (Tier 2 depth: 2px bottom shadow + glossy highlight)
- Dropdown uses elevated surface (`--bg-raised` + floating shadow)

## Theme Behavior
- Trigger background swaps via `--bg-surface`
- Dropdown background swaps via `--bg-raised`
- Selected option uses amber with amber-tinted background
- Shadow depth reduces in light mode

## Constraints
1. Trigger MUST look like a button (raised shadow, glossy highlight)
2. Arrow MUST rotate 180 degrees when dropdown opens
3. Dropdown MUST appear below trigger with 4px gap
4. Dropdown MUST use z-index: 10 to overlay other content
5. Selected option MUST be amber with subtle amber background
6. MUST toggle via `.open` class on `.select-wrap`
7. Only ONE option can be `.selected` at a time

## Accessibility
- Trigger should have `role="combobox"` or `role="button"` with `aria-haspopup="listbox"`
- Trigger should have `aria-expanded="true/false"`
- Dropdown should have `role="listbox"`
- Options should have `role="option"` with `aria-selected`
- Support Up/Down arrow keys, Enter to select, Escape to close
- Home/End keys should jump to first/last option
