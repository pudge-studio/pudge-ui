# Philosophy

Core design principles that govern every visual decision in the pudge-ui design system. Every CSS property maps to a real material or manufacturing process from 2000s consumer electronics.

---

### Physical Analog Commitment
Every CSS property in this system has a physical-world justification. A `box-shadow` is not decoration — it is the shadow cast by a raised button onto the panel surface beneath it. A `border-radius` is the machining tolerance of a milled edge. An `inset` shadow is light being blocked by the lip of a recessed display cavity.

### Warm Neutral Palette
All grays carry a slight amber/brown warmth (`#1c1a18` not `#1c1c1c`). Pure grays read as "digital" — warm grays read as "physical material under warm tungsten workbench lighting." This is the main visual distinction from generic dark UIs.

### Three-Plane Depth Model
Every raised element (buttons, panels, cards) exists in a three-layer shadow stack:
1. **Bottom edge** — the shadow cast onto the surface below
2. **Inner top highlight** — light catching the top chamfer
3. **Inner bottom shadow** — shadow on the bottom chamfer

Recessed elements (displays, inputs) invert this model. This consistency is what makes the entire system feel like one physical object.

### Inversion Symmetry
Raised and recessed elements use the same shadow logic, inverted:
- Raised: dark below, bright above
- Recessed: dark above (lip shadow), bright below (light hitting the bottom edge of the recess)

### Material Honesty
Components declare which physical material they simulate. A rubber button behaves differently from a glossy polycarbonate button — different gradients, different highlight sharpness, different border treatment. The system defines six canonical materials.
