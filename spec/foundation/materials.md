# Material Recipes

The six canonical physical materials used across all pudge-ui components. Each material maps to a real-world manufacturing process and defines specific CSS treatments for gradients, highlights, borders, and shadows.

---

## Brushed Metal (Anodized Aluminum)
**Physical analog**: iPod back plate, MacBook Pro chassis, Nikon camera body
```css
background: linear-gradient(145deg, #d8d6d0, #b8b6b0);
border: 1px solid #a8a6a0;
box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5);
```
**Characteristics**: Subtle diagonal gradient simulates brushed grain. High-opacity white inset highlight = polished metal catching light. Border matches mid-tone of gradient.
**When to use**: Premium dials, device panels, chassis components.

## Chrome (Polished)
**Physical analog**: Nikon mode dial ring, car stereo trim, iPod clickwheel ring
```css
background: linear-gradient(180deg, #5a5855, #3a3835); /* dark theme */
/* OR */
background: linear-gradient(180deg, #e8e6e0, #c8c6c0, #d0cec8); /* light theme — triple-stop = reflection band */
border: 1px solid #666;
box-shadow: 0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.06);
```
**Characteristics**: Triple-stop gradient creates a reflection band. Both top and bottom inset shadows = dual chamfer typical of chrome trim.
**When to use**: Accent rings, dial variants, premium trim elements.

## Rubber (Soft-Touch Matte)
**Physical analog**: Gameboy buttons, camera grip, headphone ear pads
```css
background: linear-gradient(180deg, var(--rubber-hi), var(--rubber-bg));
border: 1px solid var(--rubber-lo);
box-shadow: 0 2px 0 var(--border-deep), inset 0 1px 0 rgba(255,255,255,0.06);
```
**Characteristics**: Very subtle gradient (nearly flat). Minimal highlight opacity (0.06 vs 0.14 for glossy) = matte surface. Pill-shaped border-radius (100px) feels more organic.
**When to use**: Soft buttons, D-pad arms, Start/Select, grip textures.

## Glossy Polycarbonate (Gel)
**Physical analog**: iPod Nano case, PSP face, early 2000s phone buttons
```css
background: linear-gradient(180deg, var(--clear-glass), transparent 50%),
            linear-gradient(180deg, var(--bg-surface), var(--bg-panel));
border: none;
box-shadow: 0 3px 0 var(--border-deep), inset 0 1px 0 var(--glossy-hi);
```
**Characteristics**: **Two-layer background** is critical — the first layer is a catch-light that fades halfway down. This creates the "gel" dome appearance. `--glossy-hi` (0.14 opacity white) = sharp specular highlight. 3px bottom edge shadow = thicker than rubber (polycarbonate has more depth).
**When to use**: Main action buttons, media player controls, phone buttons.

## Glass (Translucent / Clear Plastic)
**Physical analog**: iMac G3 clear shell, transparent phone cases, frosted diffuser
```css
background: rgba(255,255,255,0.08);
border: 1px solid var(--border-subtle);
backdrop-filter: blur(4px);
```
**Characteristics**: No gradient — flat transparency. `backdrop-filter` creates the frosted glass effect. Very subtle border. No bottom-edge shadow (glass doesn't cast the same hard edge).
**When to use**: Overlay buttons, translucent panels, secondary actions.

## Phosphor Screen (LCD/OLED Display Cavity)
**Physical analog**: Camera viewfinder display, VU meter face, alarm clock display
```css
background: linear-gradient(180deg, #080808, #111);
border: 1px solid #1f1f1f;
box-shadow: inset 0 1px 8px rgba(0,0,0,0.9), inset 0 0 0 1px #181818;
```
**Characteristics**: Nearly black background with slight gradient = depth in the cavity. Heavy inset shadow (0.9 opacity) = deep recess. Double inset (shadow + ring) creates the "sunken screen" look. Text on this surface always has `text-shadow` with the accent glow color = phosphor bleed.
**When to use**: All readout displays, signal displays, histogram/waveform frames, seven-segment displays.
