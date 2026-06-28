# Using pudge-ui with Coding Agents

This guide explains how to feed pudge-ui design specs to any LLM or coding agent to generate 2000s-inspired UI components in any framework.

## Core Principle

pudge-ui is not code — it is **context**. You feed the spec to your coding agent, describe what you want, and the agent generates components in your framework (React Native, SwiftUI, Jetpack Compose, Flutter, web CSS, etc.).

## What to provide

Every request to your agent needs two layers of context:

### 1. Foundation (always include)

The foundation establishes the design system's rules. Without it, the agent will make incorrect visual decisions. Include these files:

| File | What it provides | Size |
|------|-----------------|------|
| `philosophy.md` | Core design principles (physical analog, warm neutrals, 3-plane depth) | ~1.5KB |
| `tokens.md` | All color, spacing, typography, radius, motion, shadow values | ~6KB |
| `materials.md` | 6 material recipes with full CSS | ~4KB |
| `depth-model.md` | Shadow stack rules, press interaction, glow effects | ~4KB |
| `naming.md` | Class naming conventions | ~1KB |

**Total foundation**: ~17KB. This fits easily within any LLM's context window.

### 2. Component specs (include only what you need)

Each component has its own spec file (~2-5KB each). Include only the components you're building. Each file contains:
- The physical analog (what real hardware it mimics)
- Exact CSS recipe (copy-paste ready)
- HTML structure
- Size/material/state variants
- Constraints (rules that prevent "close but wrong" implementations)

## How to prompt

### Pattern 1: Generate a single component

```
Here is the pudge-ui design system foundation:
[paste foundation files]

Here is the component spec:
[paste component spec file]

Generate this component in [React Native / SwiftUI / Jetpack Compose / Flutter].
Follow the CSS recipe exactly — translate each CSS property to the framework equivalent.
Follow the Constraints section strictly.
```

### Pattern 2: Build a screen with multiple components

```
Here is the pudge-ui design system foundation:
[paste foundation files]

Here are the component specs I need:
[paste 3-5 component spec files]

Build a [music player / camera viewfinder / settings screen] using these components.
Arrange them according to the composition rules in the foundation.
```

### Pattern 3: Create a new component (not in the spec)

```
Here is the pudge-ui design system foundation:
[paste foundation files]

Here is an example component spec for reference:
[paste one component spec as an example]

Here is the extension guide:
[paste extension.md]

Create a new component: [describe what you need].
Follow the extension guide's checklist. Choose a physical 2000s-era analog.
Use the foundation's material recipes and depth model.
```

## Using the MCP server

If your agent supports MCP (Claude Code, Cursor, etc.), install the pudge-ui MCP server for automatic context delivery:

```json
{
  "mcpServers": {
    "pudge-ui": {
      "command": "npx",
      "args": ["@pudge-ui/mcp-server"]
    }
  }
}
```

The agent can then call:
- `get_component("push-button")` — returns foundation + component spec
- `get_components(["push-button", "toggle-switch"])` — returns foundation + multiple specs
- `list_components()` — browse the catalog
- `search_components("dial")` — fuzzy search

## Framework translation guide

When translating CSS to native frameworks, map these properties:

| CSS Property | React Native | SwiftUI | Jetpack Compose |
|-------------|-------------|---------|-----------------|
| `background: linear-gradient(...)` | `LinearGradient` component | `LinearGradient` | `Brush.linearGradient(...)` |
| `box-shadow: 0 2px 0 #color` | `elevation` + `shadowColor/Offset/Radius` | `.shadow(color:radius:x:y:)` | `Modifier.shadow(elevation, color)` |
| `box-shadow: inset ...` | Inner `View` with gradient overlay | `overlay` with gradient | `drawBehind` with gradient |
| `border-radius` | `borderRadius` | `.cornerRadius()` | `shape = RoundedCornerShape()` |
| `transform: translateY(1px)` | `Animated.Value` | `.offset(y:)` with animation | `Modifier.offset(y = 1.dp)` |
| `transition: 70ms ease` | `Animated.timing({ duration: 70 })` | `.animation(.easeOut(duration: 0.07))` | `animateFloatAsState(animationSpec = tween(70))` |
| `backdrop-filter: blur(4px)` | `BlurView` library | `.ultraThinMaterial` | Not natively supported — use `RenderEffect.createBlurEffect` |

## Critical rules for agents

1. **Always include foundation context.** A component spec without the foundation will produce incorrect shadows, wrong colors, and missing materials.

2. **Follow the Constraints section literally.** The constraints exist for physical accuracy. "Travel MUST be 1-2px" means exactly that — not 3px, not 5px.

3. **Use warm grays, not pure grays.** The token `#1c1a18` is NOT `#1c1c1c`. The warmth is the difference between "generic dark UI" and "physical hardware under tungsten lighting."

4. **The 3-plane shadow model is non-negotiable.** Every raised element needs: bottom edge shadow + inner top highlight + inner bottom shadow. Omitting any layer breaks the physical illusion.

5. **Glow effects simulate light emission.** LEDs glow, phosphor screens glow, active indicators glow. Use `box-shadow` with the accent glow color, not just a color change.

6. **Materials are recipes, not suggestions.** Each material (rubber, glossy, metal, etc.) has a specific gradient, border, and shadow recipe. Don't mix properties between materials.
