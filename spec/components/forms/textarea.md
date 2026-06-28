---
name: Textarea
id: textarea
class: .text-area
category: forms
index: 2
materials: [phosphor-screen]
sizes: [default]
interactive: true
requires_js: false
canvas: false
---

# Textarea

## Physical Analog
**Reference devices**: LCD text entry fields on pro audio equipment (Tascam, Zoom), camera file naming dialogs, synthesizer patch naming.
**Mechanism**: Same mechanical principle as the Text Input (H1), but taller to accept multi-line content. Uses the same recessed phosphor screen styling.

## Geometry

| Property | Value |
|----------|-------|
| Width | 240px |
| Height | 80px |
| Padding | 10px 12px |
| Border radius | `--radius-md` (8px) |
| Font size | 12px |
| Font family | `--font-mono` |
| Resize | vertical |

## CSS Recipe

### Default state
```css
.text-area {
  width: 240px; height: 80px; padding: 10px 12px;
  background: var(--bg-inset); border: 1px solid var(--border-mid);
  border-radius: var(--radius-md); color: var(--text-primary);
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.5px;
  box-shadow: var(--shadow-inset); outline: none; resize: vertical;
  transition: border-color 0.15s;
}
```

### Placeholder
```css
.text-area::placeholder { color: var(--text-muted); }
```

### Focus
```css
.text-area:focus { border-color: var(--amber); }
```

## HTML Structure
```html
<textarea class="text-area" placeholder="Multi-line entry..."></textarea>
```

## Size Variants
No size variants defined. Height is adjustable via `resize: vertical`.

## Material Variants
No material variants. Uses phosphor screen (recessed display cavity) styling.

## Theme Behavior
- Background uses `--bg-inset` (deep recessed cavity)
- Inset shadow adapts: strong in dark mode, subtle in light mode
- Focus border always amber
- Text and placeholder colors swap via theme tokens

## Constraints
1. MUST use recessed styling (inset shadow + `--bg-inset` background)
2. MUST use monospace font (`--font-mono`)
3. Focus state MUST illuminate amber border
4. MUST allow vertical resize only (`resize: vertical`)
5. MUST NOT use outline
6. MUST have top padding (10px) for comfortable text entry

## Accessibility
- Use native `<textarea>` element
- Include associated `<label>` element
- Support standard textarea keyboard behavior (Enter for newline, Tab to move focus)
- Focus ring is provided by amber border (no separate outline needed)
