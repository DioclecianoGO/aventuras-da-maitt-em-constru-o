# Animation

**Status:** DECIDED priorities; exact timing/easing PROVISIONAL.

## Purpose
Animation communicates travel, causality and restoration. It must support comprehension rather than become decorative noise.

## Priority levels
### A — essential for the MVP language
- subject-region hover/touch reaction;
- Overworld → subject spatial zoom;
- Challenge Stage opening/closing while preserving Board context;
- responsive Activity Slot interaction;
- color restoration feedback;
- Maittê moving/reacting between slots;
- green-heart/progress reaction;
- reduced-motion fallbacks.

### B — enrichment
- ambient trees/water/dust/cloud movement;
- character idle details;
- companion entrances/reactions;
- particles and richer color-flow effects;
- subtle parallax.

### C — ideal/future cinematic
- advanced camera choreography;
- complex character animation;
- long narrative sequences;
- sophisticated page-turn/cinematic transitions.

Phase 1A must not block on B or C.

## Implementation
Do not add an animation dependency by default. CSS transforms/opacity/keyframes and Web Animations API are sufficient starting points. Any new library requires an explicit proposal with benefit, maintenance/bundle impact and approval.

## State safety
Gameplay/progression state changes cannot depend on animation completion. Animations visualize already-authorized transitions and derived state.

## Attention protection
When a focused challenge begins, reduce irrelevant peripheral motion. Animation around the puzzle must not compete with the learning task.

## Timing
Exact milliseconds/easing are centralized and PROVISIONAL. Tune through tablet preview rather than encoding them as product truth in scattered components.

## Reduced motion
Honor `prefers-reduced-motion`. Replace travel/hops/parallax with short fades or immediate repositioning while preserving causality and orientation.
