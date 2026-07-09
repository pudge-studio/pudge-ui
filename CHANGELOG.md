# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] — 2026-07-08

### Added

- **6 hardware composition specs** with full assembly rules, component mappings, constraints, and interactivity guidelines: Walkman Deck (Sony WM-D6C), Game Boy (Nintendo DMG-01), DJ Controller Deck (Pioneer DDJ), Synthesizer Panel (Roland SH-101 / Moog Minimoog), Audio Mixer Strip (updated), Camera Viewfinder HUD (updated). All accessible via `get_composition` in the MCP server.
- **Live Preview tab** on all composition pages — self-contained HTML/CSS/JS implementations render each composition directly in the browser with full interactivity (draggable sliders/faders, rotatable knobs, toggle states, animated meters, mode cycling).
- **Changelog page** at `/changelog` with a two-column version-history layout using LCD-style amber readouts.
- **Animated NEW badge** (pixelated VT323 blink) on recently added specs and compositions throughout the docs site.
- **LCD-style version banner** — a dismissible 36px strip at the top of every page that links to the changelog; dismiss state persisted in `localStorage` per version.
- **Copy Spec button** on composition pages — copies the raw markdown spec to clipboard in one click.
- **Compositions** added to the header nav and the sidebar Explore section (with a green `new` badge).

### Removed

- `phone-interface` composition spec — removed from spec library and MCP server.

## [0.2.0] — 2026-06-30

### Added

- **Live, interactive component previews.** Every component on the docs site is now genuinely
  manipulable — knobs and dials turn, sliders and faders drag, toggles switch, gauges sway, and
  meter displays (VU, EQ, oscilloscope) animate. Driven by a single selector-based behavior engine
  (`docs/src/scripts/component-interactivity.js`), so all 93 components are wired with no per-spec
  changes. Motion is gated behind `prefers-reduced-motion`.
- **Affordance hints + live-value badge** on each preview stage ("Drag to turn", "Drag to slide",
  etc.), plus hero staging with directional lighting and a vignette.
- **"Hand it to your agent" panel** on every component page — pick a target stack
  (React, React Native, SwiftUI, Jetpack Compose, Flutter, plain CSS) and copy a tailored prompt or
  the exact `get_component(...)` MCP call, synced to the current variant state.
- **Showcase** (`/showcase`) and **Figma Design System** (`/figma`) pages — interactive
  "coming soon" device panels with a CTA to pudgestudio.com; Showcase notes the docs site is itself
  built with pudge-ui. Added to header nav and a new sidebar "Explore" section.
- **MCP registry + Smithery publishing manifests** — `server.json` (official MCP registry) and
  `packages/mcp-server/smithery.yaml`, plus `mcpName` in the package for registry ownership
  verification.

### Changed

- **Richer MCP tool descriptions** for `list_components`, `search_components`, `get_component`,
  `get_components`, `get_composition`, and `get_foundation` — clearer guidance for agents on when to
  call each. Tool names and signatures are unchanged.
- `repository.url` in `@pudge-ui/mcp-server` normalized to the canonical
  `git+https://github.com/pudge-studio/pudge-ui.git` form so npm renders the repo link correctly.
- `copy-spec` build step hardened to `rm -rf ./spec` before copying, preventing a stale nested
  `spec/spec` from accumulating in the published tarball.

### Fixed

- Refreshed OG image.

## [0.1.0] — 2026-06-22

### Added

- 93 component specifications across 11 categories (buttons, toggles, dials, sliders, readouts, meters, navigation, forms, overlays, indicators, data)
- 9 foundation documents: tokens, materials, depth model, philosophy, naming, layout, theme, canvas, accessibility
- 3 composition examples: audio mixer strip, camera viewfinder, dj controller deck
- MCP server (`@pudge-ui/mcp-server`) with 6 tools for agent integration
- Documentation site built with Astro 5, deployed to ui.pudgestudio.com
- Interactive component previews with variant switching (size, material, state)
- Framework integration guide (React, Vue, Svelte, Web Components)
- 17 keyboard shortcuts including chord navigation
- Enhanced search with fuzzy matching and keyboard navigation
- Dark/light theme with pudge-ui warm-neutral palette
- Nested URL structure: `/components/[category]/[slug]`
- 301 redirects from flat URLs for backwards compatibility
- GitHub Actions CI (typecheck, build) and GitHub Pages deployment
