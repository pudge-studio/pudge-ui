# Naming Conventions

CSS class naming rules for all pudge-ui components, ensuring consistent and predictable class names across the system.

---

## BEM-lite Pattern

`component-element` (no `__` or `--`, use `-` throughout):
- `.push-btn` (component)
- `.readout-value` (element within readout)
- `.dial-center-bar` (element within dial)

## State Classes

Added to the component root:
- `.active` — selected / on state
- `.on` — power-on / enabled (for toggles)
- `.pressed` — currently being pressed
- `.disabled` or `[disabled]` — unavailable
- `.error` — error state
- `.recording` — REC active

## Material Variant Classes

- `.variant-metal` — brushed aluminum
- `.variant-silver` — silver anodized
- `.variant-chrome` — polished chrome
- `.variant-glossy` — polycarbonate gel

## Size Classes

`.xs`, `.sm`, (default = md), `.lg`, `.xl`
