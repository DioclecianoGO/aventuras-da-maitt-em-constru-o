# Transitions

**Status:** DECIDED transition language; exact timing/easing PROVISIONAL.

## Transition grammar
Different context changes use different visual metaphors.

### Spatial travel — Overworld ↔ Subject World
**DECIDED:** use spatial zoom/camera travel. The player should feel that the selected region of the Overworld becomes the subject world.

A fake-camera implementation (scale/translate, optional crossfade to a more detailed world asset during movement) is acceptable. Exact technique remains implementation-level provided spatial continuity is preserved.

### Narrative/zone change
**DECIDED direction:** page-turn/book metaphor is reserved for major narrative/zone/chapter transitions when appropriate. It must not be used universally and must not replace spatial zoom.

### World Board ↔ Challenge Stage
**DECIDED:** preserve the Board as spatial/perceptual context. The challenge should emerge from or relate to the selected Activity Slot/world object rather than feel like navigation to an unrelated form.

The exact nested-route/overlay technique remains PROVISIONAL. The product requirement is continuity, not a specific routing mechanism.

## Phase 1A sequencing
The Phase 1A visual foundation should support:
1. Overworld reveal;
2. spatial zoom into Mathematics;
3. landing in the illustrated Board;
4. Challenge Stage emergence from the current slot;
5. Challenge Stage return;
6. local color restoration;
7. Maittê movement to the next slot;
8. zoom-out through the folded-map affordance.

## Timing
Exact durations/easing are PROVISIONAL and should be centralized as visual tokens rather than scattered magic numbers. Suggested values from a plan are test values, not product truth.

## Reduced motion
State changes must never depend on animation completion. With `prefers-reduced-motion`, replace camera travel, scaling, parallax and hops with short fades or immediate state changes that preserve orientation.

## Graceful degradation
If an advanced effect is unreliable on target tablets, degrade in this order:
- simpler transform/opacity sequence;
- crossfade preserving origin/destination context;
- immediate context switch only as last resort, with clear spatial cues.

Do not fall back to dashboard/page-flash navigation.
