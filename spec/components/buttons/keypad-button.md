---
name: Keypad Button
id: keypad-btn
class: .keypad-btn
category: buttons
index: 5
materials: [panel, rubber]
sizes: [md]
interactive: true
requires_js: false
canvas: false
---

# Keypad Button

## Physical Analog
**Reference devices**: Nokia 3210/3310/6600 keypads, Sony Ericsson T610, Motorola RAZR V3.
**Mechanism**: Rubber dome arrays (single silicone sheet with multiple domes) or individual metal domes on PCB, with rigid plastic keycap overlay. Each key has primary number and secondary T9/multi-tap letters.

## Geometry

| Property | Value |
|----------|-------|
| Grid layout | 3 columns x 4 rows |
| Key size | ~10-12mm square (physical) / 48x44px (UI) |
| Spacing | 1-2mm gaps (physical) / 6px gap (UI) |
| Primary digit | Centered, 16px Michroma |
| T9 letters | 7px, positioned absolute at bottom |

## CSS Recipe

### Default State
```css
.keypad-btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 16px; font-weight: 400;
  color: var(--text-primary);
  background: linear-gradient(180deg, var(--bg-surface), var(--bg-panel));
  border: none; border-radius: var(--radius-sm); cursor: pointer;
  width: 48px; height: 44px; position: relative;
  box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 var(--glossy-hi);
  transition: transform 0.05s var(--snap-fast), box-shadow 0.05s var(--snap-fast);
}
```

### Active (Pressed) State
```css
.keypad-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 0 var(--border-deep);
}
```

### T9 Letters Element
```css
.keypad-btn .kbd-letters {
  font-family: var(--font-ui); font-size: 7px; color: var(--text-muted);
  letter-spacing: 1px; position: absolute; bottom: 3px;
}
```

### Special & Call Variants
```css
.keypad-btn.special { background: var(--rubber-bg); font-size: 12px; }
.keypad-btn.call {
  background: linear-gradient(180deg, #228833, #116622);
  color: #fff; font-size: 10px; font-family: var(--font-ui); font-weight: 600;
}
```

### Keypad Grid Container
```css
.keypad {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
  padding: 12px; background: var(--bg-raised);
  border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-deep); max-width: 168px;
}
.keypad .keypad-btn { width: 100%; height: 40px; }
```

## HTML Structure
```html
<!-- Individual keys -->
<button class="keypad-btn">1</button>
<button class="keypad-btn">2<span class="kbd-letters">ABC</span></button>
<button class="keypad-btn">3<span class="kbd-letters">DEF</span></button>

<!-- Call key -->
<button class="keypad-btn call">CALL</button>

<!-- Full keypad grid -->
<div class="keypad">
  <button class="keypad-btn">1</button>
  <button class="keypad-btn">2<span class="kbd-letters">ABC</span></button>
  <button class="keypad-btn">3<span class="kbd-letters">DEF</span></button>
  <!-- ... -->
</div>
```

## Size Variants
No explicit size variants. Fixed at 48x44px (or 100% width inside `.keypad` container).

## Material Variants
- Default: Panel gradient (bg-surface to bg-panel)
- `.special`: Rubber background for * and # keys
- `.call`: Green-dyed keycap plastic

## Theme Behavior
- Surface gradients swap via tokens
- Call button green gradient is fixed (not theme-dependent)
- Rubber background for special keys swaps via `--rubber-bg`

## Constraints
1. Primary digit font MUST be `--font-display` (Michroma) at 16px -- prominent, centered.
2. T9 letters MUST be `--font-ui` at 7px, positioned absolute at bottom -- secondary information hierarchy.
3. Grid MUST be 3 columns when inside `.keypad` container.
4. Green call key gradient is fixed regardless of theme.

## Accessibility
- Uses native `<button>` element
- Keyboard: Enter/Space to activate
- T9 letters are visible but secondary to primary digit
