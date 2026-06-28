# Token Reference

All design tokens used across the pudge-ui system — colors, typography, spacing, radii, motion, and shadows. These tokens form the shared vocabulary for every component.

---

## Color Tokens — Surface Hierarchy

| Token | Dark Mode | Light Mode | Physical Analog |
|-------|-----------|------------|-----------------|
| `--bg-base` | `#141210` | `#f5f0e8` | Workbench / desk surface |
| `--bg-raised` | `#1c1a18` | `#ffffff` | Device chassis top plate |
| `--bg-surface` | `#2a2826` | `#f0ece4` | Panel face, module front |
| `--bg-inset` | `#0e0c0a` | `#e8e4dc` | Display cavity, recessed area |
| `--bg-panel` | `#22201e` | `#faf6ee` | Button face, control surface |

## Color Tokens — Accents

| Token | Value | Usage |
|-------|-------|-------|
| `--amber` | `#f5a623` | Primary active/selection indicator. The universal "this is selected" signal. |
| `--amber-dim` | `#a06010` | Secondary amber: colon separators, inactive amber elements |
| `--amber-glow` | `rgba(245,166,35,0.35)` | Glow halo behind active amber elements (simulates phosphor bleed) |
| `--green-on` | `#33cc66` | Power-on, connected, success states |
| `--green-hi` | `#66ff66` | High-brightness green: focus lock, peak meter |
| `--green-glow` | `rgba(51,204,102,0.3)` | Green glow halo |
| `--red-alert` | `#cc2200` | REC, error, critical battery, destructive action |
| `--red-glow` | `rgba(204,34,0,0.3)` | Red glow halo |
| `--blue-info` | `#4477cc` | Info states, iPod-era accent, selected items in consumer contexts |
| `--blue-glow` | `rgba(68,119,204,0.3)` | Blue glow halo |
| `--pink-action` | `#ee6688` | Action buttons (Gameboy A), highlights, feminine accent |
| `--gold-warm` | `#ddaa33` | Premium accent, warm EQ bands |

## Color Tokens — Text

| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| `--text-primary` | `#d8d4cc` | `#2a2826` |
| `--text-secondary` | `#9a9690` | `#6a6662` |
| `--text-muted` | `#6a6662` | `#9a9690` |

Note: `--text-secondary` and `--text-muted` swap values between themes.

## Color Tokens — Borders

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--border-deep` | `#0a0908` | `#b8b4ac` | Button bottom edge shadow line |
| `--border-mid` | `#3a3835` | `#c8c4bc` | Panel seams, general borders |
| `--border-subtle` | `#2a2826` | `#d8d4cc` | Dividers, section separators |
| `--border-hi` | `#4a4845` | `#e8e4dc` | Top-edge highlight (light catch) |

## Typography

| Token | Font Family | Role | Usage |
|-------|-------------|------|-------|
| `--font-display` | `Michroma` | Display / Title | Section titles, mode labels, badge letters, dial values. Geometric sans-serif that evokes consumer electronics branding. |
| `--font-mono` | `IBM Plex Mono` | Data / Readout | Numeric readouts, data values, technical labels, text inputs. The workhorse monospace for all data display. |
| `--font-ui` | `Rajdhani` | UI / Body | Body text, descriptions, button labels, spec tables. Semi-rounded geometric with good readability at small sizes. |
| `--font-lcd` | `VT323` | Retro LCD | Optional pixel-font variant for deliberately retro LCD readouts. Used in 7-segment displays and dot-matrix marquees. |

**Font size scale** (commonly used):
- 7px: micro labels (mode keys, tiny annotations)
- 8-9px: chip text, status labels, specs
- 10-11px: button labels, UI labels, body text
- 12-13px: data values, readout values (small)
- 14-16px: medium readout values, keypad numbers
- 20-24px: large readout values
- 28-34px: hero display values, signal display
- 42px: 7-segment display digits

**Letter-spacing conventions**:
- 0.5-1px: body text, data values
- 1-2px: button labels, UI text
- 2-3px: section titles, status labels
- 3-4px: eyebrow text, panel labels

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Chip padding, tight gaps |
| `--space-sm` | `8px` | Button gaps, small component padding |
| `--space-md` | `14px` | Standard padding, component gaps |
| `--space-lg` | `22px` | Panel padding, section gaps |
| `--space-xl` | `36px` | Section spacing |
| `--space-2xl` | `56px` | Page-level spacing |

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Chips, small buttons, tick marks, film frames |
| `--radius-md` | `8px` | Standard buttons, readouts, inputs, tabs |
| `--radius-lg` | `14px` | Panels, cards, device bezels, dialogs |
| `--radius-pill` | `100px` | Pill buttons, toggle tracks, progress bars |
| `--radius-round` | `50%` | Circular dials, LED dots, knobs |

## Motion / Easing

| Token | Value | Physical Analog | Usage |
|-------|-------|-----------------|-------|
| `--snap-fast` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Mechanical detent click — slight overshoot then settle | Button press, toggle snap, segmented control switch |
| `--snap-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` | Drawer slide, damped return | Drawer panels, slide animations |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Meter fill, smooth deceleration | Progress bars, slider fills, meter animations |
| `--spring` | `cubic-bezier(0.34, 1.3, 0.64, 1)` | Spring-loaded mechanism with overshoot | Mode dial rotation, gauge needle |

**Timing conventions**:
- 70-90ms: press/release (instantaneous mechanical feel)
- 120-150ms: state transitions (color change, toggle snap)
- 180-220ms: movement animations (toggle slide, dial rotation)
- 250-350ms: larger movements (drawer open, mode dial spring)

## Shadow Tokens

**Raised element shadow stacks** (3 tiers by prominence):

```css
/* Small — chips, small buttons */
box-shadow: 0 1px 0 var(--border-deep), inset 0 1px 0 var(--glossy-hi);

/* Medium — standard buttons, controls */
box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 var(--border-hi), inset 0 -1px 0 #111;

/* Large — panels, cards */
box-shadow: 0 4px 0 var(--border-deep), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 var(--border-hi);
```

**Recessed element shadow**:
```css
box-shadow: inset 0 1px 4px rgba(0,0,0,0.6);
```

**Press interaction** (applied on `:active`):
```css
transform: translateY(1px); /* or 2px for large buttons */
box-shadow: 0 1px 0 var(--border-deep); /* collapse bottom edge */
```

**Glow effects**:
```css
/* Amber glow (active indicators) */
box-shadow: 0 0 8px rgba(245,166,35,0.35);
text-shadow: 0 0 14px rgba(245,166,35,0.35);

/* Green glow (on-state) */
box-shadow: 0 0 8px rgba(51,204,102,0.3);
```
