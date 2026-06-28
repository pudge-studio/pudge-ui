---
name: Text Input
id: text-input
class: .text-input
category: forms
index: 1
materials: [phosphor-screen]
sizes: [sm, default, lg]
interactive: true
requires_js: false
canvas: false
---

# Text Input

## Physical Analog
**Reference devices**: LCD text entry fields on pro audio equipment (Tascam, Zoom), camera file naming dialogs, synthesizer patch naming.
**Mechanism**: Styled as a recessed phosphor display field -- the same cavity used for readout displays, but editable. The text is entered via an external input method. The recessed appearance (inset shadow) communicates that this area accepts input, rather than merely displaying a value. On focus, the border illuminates amber -- simulating an "active channel" indicator LED strip around the input field.

## Geometry

| Property | Value |
|----------|-------|
| Default width | 200px |
| Default height | 36px |
| Padding | 0 12px |
| Border radius | `--radius-md` (8px) |
| Font size | 12px |
| Font family | `--font-mono` |

## CSS Recipe

### Default state
```css
.text-input {
  width: 200px; height: 36px; padding: 0 12px;
  background: var(--bg-inset); border: 1px solid var(--border-mid);
  border-radius: var(--radius-md); color: var(--text-primary);
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.5px;
  box-shadow: var(--shadow-inset); outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
```

### Placeholder
```css
.text-input::placeholder { color: var(--text-muted); }
```

### Focus
```css
.text-input:focus { border-color: var(--amber); box-shadow: var(--shadow-inset), 0 0 0 1px var(--amber-dim); }
```

### Error
```css
.text-input.error { border-color: var(--red-alert); }
```

### Size: Small
```css
.text-input.sm { height: 28px; font-size: 10px; width: 140px; }
```

### Size: Large
```css
.text-input.lg { height: 42px; font-size: 14px; width: 260px; }
```

## HTML Structure
```html
<!-- Standard -->
<input class="text-input" placeholder="Standard input...">

<!-- Small -->
<input class="text-input sm" placeholder="Small input...">

<!-- Large -->
<input class="text-input lg" placeholder="Large input...">

<!-- Error state -->
<input class="text-input error" placeholder="Error state..." value="Invalid">
```

## Size Variants

| Size | Height | Width | Font Size |
|------|--------|-------|-----------|
| `.sm` | 28px | 140px | 10px |
| default | 36px | 200px | 12px |
| `.lg` | 42px | 260px | 14px |

## Material Variants
No material variants. Uses phosphor screen (recessed display cavity) styling.

## Theme Behavior
- Background uses `--bg-inset` (deep recessed cavity)
- Inset shadow: dark mode `rgba(0,0,0,0.6)`, light mode `rgba(0,0,0,0.08)`
- Focus border always amber
- Error border always red

## Constraints
1. MUST use recessed styling (inset shadow + `--bg-inset` background)
2. MUST use monospace font (`--font-mono`) for data entry consistency
3. Focus state MUST illuminate amber border with amber outer ring glow
4. Error state MUST use `--red-alert` border color
5. MUST NOT use outline -- use border-color transition instead
6. Placeholder text MUST use `--text-muted`

## Accessibility
- Use native `<input>` element
- Include associated `<label>` element
- Error state should include `aria-invalid="true"` and `aria-describedby` pointing to error message
- Focus ring is provided by amber border glow (no separate outline needed)
