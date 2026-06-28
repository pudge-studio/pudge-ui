---
name: Badges
id: badges
class: .badge
category: indicators
index: 3
materials: [glossy-polycarbonate]
sizes: [default]
interactive: false
requires_js: false
canvas: false
---

# Badges

## Physical Analog
**Reference devices**: Software version labels, notification count badges, iOS-style app icon badges.
**Mechanism**: Small, high-contrast labels. The colored background (blue, green, red, amber) fills the entire pill shape, derived from the colored button caps used on broadcast equipment (red = ON AIR, green = STANDBY, etc.).

## Geometry

| Property | Value |
|----------|-------|
| Padding | 2px 8px |
| Border radius | `--radius-pill` (100px) |
| Font size | 9px |
| Font weight | 600 |
| Letter spacing | 1px |

## CSS Recipe

### Base (`.badge`)
```css
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: var(--radius-pill);
  font-family: var(--font-ui); font-size: 9px; font-weight: 600; letter-spacing: 1px;
}
```

### Color variants
```css
.badge.blue { background: var(--blue-info); color: #fff; }
.badge.green { background: var(--green-on); color: #fff; }
.badge.red { background: var(--red-alert); color: #fff; }
.badge.amber { background: var(--amber); color: #1a1a1a; }
```

## HTML Structure
```html
<span class="badge blue">NEW</span>
<span class="badge green">ONLINE</span>
<span class="badge red">LIVE</span>
<span class="badge amber">PRO</span>
```

## Size Variants
No size variants defined.

## Material Variants

| Variant | Class | Background | Text Color |
|---------|-------|------------|------------|
| Blue | `.badge.blue` | `--blue-info` | White |
| Green | `.badge.green` | `--green-on` | White |
| Red | `.badge.red` | `--red-alert` | White |
| Amber | `.badge.amber` | `--amber` | Dark (#1a1a1a) |

## Theme Behavior
- Badge colors are constant across themes (accent colors don't change)
- Amber badge uses dark text (high contrast against bright amber)
- Other badges use white text

## Constraints
1. MUST use pill border-radius (`--radius-pill`)
2. MUST use filled background (not outlined)
3. Amber badge MUST use dark text (#1a1a1a) for contrast
4. All other badges MUST use white text
5. Font weight MUST be 600 (bold for small size readability)
6. Padding is minimal (2px 8px) -- badges should be compact
7. MUST NOT be interactive (badges are read-only labels)

## Accessibility
- Use `<span>` element (inline, non-interactive)
- If badge conveys status, include `role="status"` or equivalent
- Color alone should not be the only indicator -- include descriptive text
- Ensure sufficient color contrast (all variants meet WCAG AA)
