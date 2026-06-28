---
name: DIP Switch
id: dip-switch
class: .dip-switch
category: toggles
index: 5
materials: [panel, chrome]
sizes: [md]
interactive: true
requires_js: true
canvas: false
---

# DIP Switch

## Physical Analog
**Reference devices**: PCB DIP switch banks on synthesizers (Roland TB-303, Korg MS-20), audio equipment, and network hardware.
**Mechanism**: Dual In-line Package switches -- tiny SPST slide switches arrayed in a plastic housing at 2.54mm pitch. Each switch has a detented two-position action. Lever slides vertically (up = ON, down = OFF). Tiny leaf spring provides detent and contact force.

## Geometry

| Property | Value |
|----------|-------|
| Individual switch | 18x30px |
| Lever | 12px tall, slides vertically |
| Array | 4, 8, or 12 switches in a row at 4px gap |
| Housing | Black molded nylon (bg-inset) |
| Lever material | Polished metal (metallic gradient) |

## CSS Recipe

### Row Container (PCB Housing)
```css
.dip-row { display: flex; gap: 4px; padding: 6px 8px; background: var(--bg-inset); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); }
```

### Individual Switch Housing
```css
.dip-switch {
  width: 18px; height: 30px; border-radius: 3px;
  background: var(--bg-surface); border: 1px solid var(--border-mid);
  position: relative; cursor: pointer;
  box-shadow: inset 0 1px 0 var(--glossy-hi);
}
```

### Lever
```css
.dip-lever {
  position: absolute; left: 3px; right: 3px; height: 12px;
  border-radius: 2px; background: linear-gradient(180deg, #888, #555);
  transition: top 0.12s var(--snap-fast); top: 14px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3);
}
```

### ON State
```css
.dip-switch.on .dip-lever { top: 3px; background: linear-gradient(180deg, var(--green-hi), var(--green-on)); }
```

## HTML Structure
```html
<div class="dip-row">
  <div class="dip-switch on" data-dip><div class="dip-lever"></div></div>
  <div class="dip-switch" data-dip><div class="dip-lever"></div></div>
  <div class="dip-switch on" data-dip><div class="dip-lever"></div></div>
  <div class="dip-switch" data-dip><div class="dip-lever"></div></div>
  <div class="dip-switch on" data-dip><div class="dip-lever"></div></div>
  <div class="dip-switch" data-dip><div class="dip-lever"></div></div>
  <div class="dip-switch" data-dip><div class="dip-lever"></div></div>
  <div class="dip-switch on" data-dip><div class="dip-lever"></div></div>
</div>
```

## Size Variants
No explicit size variants. Fixed dimensions replicate real DIP switch proportions.

## Material Variants
- Housing: Panel surface
- Lever OFF: Metallic gradient (`#888` to `#555`)
- Lever ON: Green gradient (green-hi to green-on)
- Row container: PCB board (bg-inset)

## Theme Behavior
- Surface colors swap via tokens for housing and container
- Metallic lever gradient is fixed (metal is metal)
- Green ON state is fixed

## Constraints
1. Lever MUST slide vertically: `top: 14px` (OFF/down) to `top: 3px` (ON/up).
2. Lever transition MUST use `--snap-fast` at 0.12s for detent snap feel.
3. Each switch operates independently (NOT mutually exclusive like segmented control).
4. Row container MUST use `bg-inset` to represent the PCB mounting board.
5. Lever MUST have metallic gradient to represent polished metal contact.

## Accessibility
- Add `tabindex="0"` and `role="switch"` with `aria-checked` on each `.dip-switch`
- Keyboard: Space to toggle individual switch
- Requires JS to toggle `.on` class on each switch independently
