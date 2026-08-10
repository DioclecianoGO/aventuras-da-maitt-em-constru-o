# Color Restoration

**Status:** DECIDED system; final palettes/mask geometry and unit catalog PROVISIONAL.

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

## Concrete restoration units

**DECIDED:** permanent restoration must be readable through identifiable visual units, not only through a broad gradient/mask wash.

A scene may define presentation-only `restorable visual units` such as:

- tree/foliage clusters;
- plants;
- rocks/object groups;
- route markers;
- landmark details;
- building/window/roof details;
- water/detail clusters;
- local scenery groups surrounding a completed Activity Slot.

The exact implementation name is not binding. The architectural rule is:

`persisted progress fact -> derived selector -> visual restoration config -> one or more concrete scene units`

These visual mappings live outside educational-domain schemas.

Do not persist each unit's visual color state as a second source of truth. Reload must reconstruct the same restored units from persisted facts.

## Overworld
Subject regions visually reflect their own derived progress. A numeric percentage may exist for accessibility/diagnostics but is not the primary child-facing progress expression.

In addition to any regional mask/progress reveal, a subject region should be capable of restoring specific landmarks/details/clusters so the child can identify what changed.

For Mathematics, current progress must be able to restore one or more concrete details inside the desert region rather than expressing progress only as a smooth color gradient.

## World Board
Completion restores local scenery around the completed route/Activity Slot. The child should be able to see how far color has traveled through the route without reading a number.

A completed slot should normally leave behind one or more identifiable restored objects/clusters near that route stretch. Examples include a plant cluster, rock/detail group, route marker or landmark detail.

## Maittê
The green heart remains colored from the beginning. Other independently layerable areas may regain color at milestones (for example glasses, socks, skirt, shoes, shirt regions or hair streak), but **the restoration order is not DECIDED**.

Maittê's independently addressable color regions are the character equivalent of concrete restoration units.

The restoration layers/tier mapping must remain configurable. A demonstration of one partial state must not freeze a permanent reward order.

## Technical direction
Layered line-art + color assets with SVG/CSS masking, clipping or opacity reveal are acceptable. The implementation must preserve the already-proven fallback between mask and opacity techniques. Technique choice is subordinate to tablet performance and replaceable assets.

### Gradient/mask role

A mask, feather or color-flow gradient is valuable as **transition choreography** and may visually connect restored units.

It must not be the sole persistent expression of progress after the transition completes.

Preferred causal sequence:

`success -> color flow/mask animation -> concrete local unit(s) remain restored -> derived state survives reload`

## Non-color cues
Restored vs. stolen states must not rely on hue alone. Additional cues can include texture, local life/motion, clarity, light, completed path treatment or environmental details.

Concrete restored units may gain subtle life/detail in addition to color, provided this remains derived presentation and does not become progression state.

## Animation
Color may visually flow/spread after success, but the final visible result must be reconstructible from persisted facts after reload. Animation history is never state.

## Phase 1B.1 acceptance

The current demonstrated Mathematics flow must prove both levels:

1. **transition:** color visibly flows/spreads after success;
2. **persistent result:** at least one specific Dunas Douradas scenery object/cluster and one specific Mathematics Overworld detail/cluster remain restored from derived persisted progress.

A screenshot after reload should make those restored concrete units visible without requiring the reviewer to infer progress from a gradient alone.