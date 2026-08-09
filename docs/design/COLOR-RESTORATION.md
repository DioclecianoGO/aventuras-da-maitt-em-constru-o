# Color Restoration

**Status:** DECIDED system; final palettes/mask geometry PROVISIONAL.

## Narrative rule
At the opening, the world and Maittê are largely in a stolen-color / coloring-book state.

**DECIDED:** the green heart on Maittê's shirt is the primary saturated color anchor at the beginning. The Base da Esperança must not introduce unrelated fully saturated props (for example a colored pennant or lantern) that compete with this narrative rule unless explicitly approved later.

## State rule
Persist source facts, not visual percentages. Restoration is derived from completed slots, milestones and other approved progress facts through selectors.

No component may maintain an independent decorative progress truth.

## Visual levels
Every restorable region must support at least:
- `stolen`: line art/value/texture with little or no saturation;
- `partial`: some local areas/layers restored according to derived progress;
- `restored_current`: fully restored for all progress currently available in that region.

The composition, outlines, hit areas and semantics remain stable across these states.

## Overworld
Subject regions visually reflect their own derived progress. A numeric percentage may exist for accessibility/diagnostics but is not the primary child-facing progress expression.

## World Board
Completion restores local scenery around the completed route/Activity Slot. The child should be able to see how far color has traveled through the route without reading a number.

## Maittê
The green heart remains colored from the beginning. Other independently layerable areas may regain color at milestones (for example glasses, socks, skirt, shoes, shirt regions or hair streak), but **the restoration order is not DECIDED**.

Phase 1A must keep restoration layers/tier mapping configurable. A demonstration of one partial state is sufficient; it must not freeze a permanent reward order.

## Technical direction
Layered line-art + color assets with SVG/CSS masking, clipping or opacity reveal are acceptable. The implementation must preserve the already-proven fallback between mask and opacity techniques. Technique choice is subordinate to tablet performance and replaceable assets.

## Non-color cues
Restored vs. stolen states must not rely on hue alone. Additional cues can include texture, local life/motion, clarity, light, completed path treatment or environmental details.

## Animation
Color may visually flow/spread after success, but the final visible result must be reconstructible from persisted facts after reload. Animation history is never state.
