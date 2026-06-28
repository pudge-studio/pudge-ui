# Prompt Templates

Pre-built prompts for common pudge-ui tasks. Copy these, fill in the blanks, and paste into your LLM along with the relevant spec files.

---

## Generate a single component

```
I'm using the pudge-ui design system. Here is the foundation context and
component specification.

[paste foundation files: philosophy.md, tokens.md, materials.md, depth-model.md, naming.md]

[paste the component spec file]

Generate this component in [React Native / SwiftUI / Jetpack Compose / Flutter / Vue / Svelte].

Requirements:
- Translate every CSS property to the framework's equivalent
- Follow the Constraints section strictly — these prevent "close but wrong" implementations
- Include all size variants listed in the spec
- Include all state transitions (default, hover, active, disabled)
- Use the exact color tokens from the foundation
- The 3-plane shadow model (bottom edge + top highlight + bottom chamfer) is mandatory
```

---

## Build a multi-component screen

```
I'm using the pudge-ui design system. Here is the foundation context and
the component specifications I need for this screen.

[paste foundation files]

[paste 3-8 component spec files]

Build a [describe the screen: "music player with EQ controls", "camera settings panel",
"device diagnostic dashboard", etc.] using these components.

Layout requirements:
- [describe layout: "two columns", "top status bar + main content + bottom controls", etc.]
- Use the foundation's spacing scale for gaps between components
- All components should share the same light direction (top-left)
- Use at most 2 material types in the same panel

The screen should be a complete, functional view — not just individual components
placed side by side.
```

---

## Create a new component not in the spec

```
I'm using the pudge-ui design system. Here is the foundation context
and an example component spec to show the pattern.

[paste foundation files]

[paste one component spec as a reference example — choose one similar to what you need]

[paste extension.md guide]

I need a new component: [describe it — e.g., "a circular progress ring like
a countdown timer on a microwave oven display"].

Create this component following the pudge-ui design system:
1. Identify a real 2000s-era device that had this control
2. Describe how the physical mechanism worked
3. Apply the appropriate material recipe from the foundation
4. Use the depth model for shadows
5. Write the full CSS recipe
6. Write 3-5 constraints with physical reasoning
7. Output as a complete spec file following the template format
```

---

## Translate an existing UI to pudge-ui style

```
I'm using the pudge-ui design system. Here is the foundation context.

[paste foundation files]

I have an existing [React Native / SwiftUI / etc.] screen with standard
flat UI components. I want to restyle it using the pudge-ui aesthetic.

Here is my current code:
[paste your existing component/screen code]

Restyle this using pudge-ui's design system:
- Replace flat backgrounds with the appropriate material recipes (gradient + shadow)
- Add the 3-plane shadow model to all raised elements
- Add inset shadows to all recessed elements (inputs, displays)
- Replace solid colors with the warm token palette
- Add physical-accurate press interactions (translateY + shadow collapse)
- Use the pudge-ui typography tokens
```

---

## Build a composition (assembled multi-component panel)

```
I'm using the pudge-ui design system.

[paste foundation files]

[paste the composition spec file — e.g., camera-viewfinder.md or audio-mixer-strip.md]

[paste all component spec files referenced in the composition]

Build this composition in [framework]. Follow the composition's Layout section
for positioning, and the Assembly Rules for component configuration. Each
component must follow its individual spec exactly — the composition just
arranges them.
```

---

## Quick restyling (minimal context)

For simple restyling tasks where you don't need full spec files, use this minimal prompt:

```
Restyle this [button/input/card/etc.] using a 2000s consumer electronics aesthetic:

- Warm gray palette (NOT pure gray — use slight amber/brown warmth: #1c1a18 not #1c1c1c)
- 3-plane shadow model for raised elements:
  1. Bottom edge: 0 2px 0 #0a0908
  2. Inner top highlight: inset 0 1px 0 rgba(255,255,255,0.14)
  3. Inner bottom shadow: inset 0 -1px 0 #111
- On press: translateY(1px) + bottom shadow collapses to 0 1px 0
- Inset shadow for recessed elements: inset 0 1px 4px rgba(0,0,0,0.6)
- Active indicators glow amber: box-shadow 0 0 8px rgba(245,166,35,0.35)
- Fonts: geometric sans-serif for labels, monospace for data values

[paste your existing component code]
```
