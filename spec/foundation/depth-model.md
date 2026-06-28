# Depth Model

How raised, recessed, glowing, and textured elements are constructed using shadow stacks, inset shadows, glow effects, and CSS texture patterns. This model ensures every element feels like part of one continuous physical object.

---

## Raised Elements

Three tiers of prominence:

**Tier 1 — Flush** (chips, pagination buttons):
- Bottom edge: `0 1px 0 border-deep`
- Top highlight: `inset 0 1px 0 glossy-hi`
- Press: `translateY(1px)`, shadow to `none`

**Tier 2 — Standard** (buttons, tabs, controls):
- Bottom edge: `0 2-3px 0 border-deep`
- Top highlight: `inset 0 1px 0 border-hi`
- Bottom chamfer: `inset 0 -1px 0 #111`
- Press: `translateY(1-2px)`, bottom edge collapses to `0 1px 0`

**Tier 3 — Elevated** (panels, cards, dialogs):
- Bottom edge: `0 4px 0 border-deep`
- Ambient shadow: `0 8px 24px rgba(0,0,0,0.5)`
- Top highlight: `inset 0 1px 0 border-hi`
- No press state (panels don't press)

## Recessed Elements

All recessed elements (displays, input fields, toggle tracks, slider tracks) use:
```css
box-shadow: inset 0 1px 4px rgba(0,0,0,0.4-0.9);
```
The opacity varies by depth:
- 0.4: shallow recess (toggle tracks, slider tracks)
- 0.6: standard recess (readouts, text inputs)
- 0.9: deep recess (signal displays, phosphor screens)

Optional inner ring for extra depth:
```css
box-shadow: inset 0 1px 4px rgba(0,0,0,0.6), inset 0 0 0 1px #181818;
```

## Glow Effects

Glow simulates light emission from LEDs, phosphor screens, and active indicators:

```css
/* Element glow (LEDs, active indicators) */
box-shadow: 0 0 6-12px <accent-glow>;

/* Text glow (readout values, display text) */
text-shadow: 0 0 12-16px <accent-glow>;
```

Glow radius by context:
- 6px: small LEDs, indicator dots
- 8px: active chips, checkbox marks
- 12px: readout values, timecode
- 16px: large display values
- 18px: REC button recording glow

## Knurl / Texture Patterns

Knurled grip textures use CSS repeating gradients:

**Vertical grooves** (cylindrical dial side grips):
```css
background: repeating-linear-gradient(to bottom, #252525 0px, #252525 2px, #0d0d0d 2px, #0d0d0d 5px);
```

**Diamond crosshatch** (horizontal command dials):
```css
background-image:
  repeating-linear-gradient(75deg, transparent 0px, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px, transparent 3px, transparent 6px),
  repeating-linear-gradient(-75deg, transparent 0px, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px, transparent 3px, transparent 6px);
```

**Conic knurl ring** (rotary encoder outer edge):
```css
background: repeating-conic-gradient(#202020 0deg 4deg, #0d0d0d 4deg 8deg);
```
