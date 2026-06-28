# Extension Guide — Adding New Components

This guide explains how to create new pudge-ui components that fit the design system.

## The Spec File Template

Every component spec file follows this structure:

```markdown
---
name: Component Name
id: kebab-case-id
class: .css-class-name
category: category-folder
index: N
materials: [default, metal, chrome, glossy, rubber, glass]
sizes: [xs, sm, md, lg, xl]
interactive: true
requires_js: false
canvas: false
---

# Component Name

## Physical Analog
**Reference devices**: Specific 2000s products with model numbers.
**Mechanism**: How the physical mechanism works — the material science,
the forces involved, the geometry.

## Geometry
| Property | Value | Physical Reason |
|----------|-------|-----------------|
| Height | Npx | What real-world dimension this represents |
| Width | Npx | — |
| Border-radius | Npx | Machining tolerance or mold radius |

## CSS Recipe
### Default State
\`\`\`css
.component-name {
  /* Full CSS recipe */
}
\`\`\`
### Hover
\`\`\`css
.component-name:hover { }
\`\`\`
### Active / Pressed
\`\`\`css
.component-name:active { }
\`\`\`
### Disabled
\`\`\`css
.component-name:disabled { }
\`\`\`

## HTML Structure
\`\`\`html
<element class="component-name [variants]">content</element>
\`\`\`

## Size Variants
| Class | Analog | Height | Min-Width |
|-------|--------|--------|-----------|

## Material Variants
| Class | Material | Visual Change |
|-------|----------|---------------|

## Theme Behavior
What changes between dark and light themes.

## Constraints
1. MUST: [rule with physical reasoning]
2. MUST NOT: [rule with physical reasoning]

## Accessibility
- Element type and ARIA role
- Keyboard interaction pattern
- Focus behavior
```

## Step-by-Step Process

### Step 1: Choose a Physical Analog

Every pudge-ui component MUST have a real-world 2000s-era electronics counterpart. This is not optional — it's what makes the system work. Ask yourself:
- What physical device from 2000-2010 had this control?
- How did the mechanism actually work?
- What material was it made from?
- What did it feel like to operate?

Good analogs: Sony Walkman play button, Nokia phone keypad, iPod click wheel, Nikon mode dial, Mackie mixer fader, Roland synthesizer knob.

### Step 2: Select a Material

Choose from the 6 canonical materials defined in `foundation/materials.md`:

| Material | When to use |
|----------|-------------|
| Brushed Metal | Premium controls, device chassis, high-end knobs |
| Chrome | Accent rings, trim, dial rings |
| Rubber | Grip surfaces, soft-touch buttons, D-pad arms |
| Glossy Polycarbonate | Consumer electronics buttons, cases, glossy controls |
| Glass | Translucent overlays, frosted panels |
| Phosphor Screen | All displays and readout cavities |

If your component supports multiple materials, make the most common one the default and add `.variant-*` classes for others.

### Step 3: Apply the Depth Model

Consult `foundation/depth-model.md`:

- **Raised element?** (proud of the surface) → Use the appropriate shadow tier:
  - Tier 1 (flush): chips, pagination buttons — 1px bottom shadow
  - Tier 2 (standard): buttons, controls — 2-3px bottom shadow + chamfer highlights
  - Tier 3 (elevated): panels, cards — 4px bottom shadow + ambient shadow

- **Recessed element?** (inset into the surface) → Use inset shadow:
  - Shallow: `inset 0 1px 4px rgba(0,0,0,0.4)` (toggle tracks)
  - Standard: `inset 0 1px 4px rgba(0,0,0,0.6)` (readouts, inputs)
  - Deep: `inset 0 1px 8px rgba(0,0,0,0.9)` (signal displays)

- **Glowing element?** → Add glow with accent color at 6-16px radius.

### Step 4: Set Typography

| Content type | Font token |
|-------------|-----------|
| Display values, titles, mode labels | `--font-display` (Michroma) |
| Data values, readouts, code | `--font-mono` (IBM Plex Mono) |
| Labels, body text, UI elements | `--font-ui` (Rajdhani) |
| Retro LCD characters | `--font-lcd` (VT323) |

### Step 5: Define States

Every interactive component needs at minimum:
- **Default**: base appearance
- **Hover**: subtle highlight (text brightening or border change)
- **Active / Pressed**: `translateY(1-2px)` + shadow collapse
- **Disabled**: `opacity: 0.35`, `pointer-events: none`

Optional states:
- **Active (selected)**: amber accent color + glow
- **Error**: red accent color
- **Loading**: pulse animation

### Step 6: Support Both Themes

Check your component in both `[data-theme="dark"]` and `[data-theme="light"]`. Most components adapt via token values automatically. Add explicit `[data-theme="light"]` overrides only for:
- Gradients with hardcoded dark colors
- Knurl/texture patterns (reduce opacity in light mode)
- Material-specific shadows

### Step 7: Write the Constraints

The Constraints section is the most important part of the spec. Write in imperative language (MUST, MUST NOT) and always explain WHY with physical reasoning:

**Good constraint**: "Travel MUST be 1-2px maximum. More feels like a keyboard key, not a camera button — real dome switches have only 0.3-0.5mm travel."

**Bad constraint**: "Keep the animation subtle." (too vague, no physical reasoning)

### Step 8: Follow Naming Conventions

- Component class: `kebab-case` noun (e.g., `range-slider`)
- Element class: `component-element` (e.g., `range-slider-thumb`)
- State class: adjective (e.g., `.active`, `.on`, `.error`)
- Size class: `.xs`, `.sm`, `.lg`, `.xl`
- Material class: `.variant-metal`, `.variant-chrome`, etc.

## Checklist

Before submitting a new component:

- [ ] Physical analog documented (specific 2000s device/mechanism)
- [ ] Mechanical principle explained (how the physical thing works)
- [ ] Material recipe applied from `materials.md`
- [ ] Shadow stack follows `depth-model.md` (raised or recessed)
- [ ] CSS Recipe uses exact values (not prose approximations)
- [ ] HTML structure is minimal and semantic
- [ ] All states defined (default, hover, active, disabled)
- [ ] Size variants follow the existing scale (xs/sm/md/lg/xl)
- [ ] Typography uses system font tokens
- [ ] Works in dark theme
- [ ] Works in light theme
- [ ] Constraints use MUST/MUST NOT with physical reasoning
- [ ] Accessibility documented (element type, ARIA, keyboard)
- [ ] Named following conventions
- [ ] Added to `_index.yaml` catalog
