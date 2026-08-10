# Animation

**Status:** DECIDED priorities/behavior; exact timing/easing PROVISIONAL.

## Purpose

Animation communicates travel, attention, causality, character life and restoration. It must support comprehension rather than become decorative noise.

## Priority levels

### A — essential for the MVP language

- subject-region hover/touch reaction;
- Overworld → subject spatial zoom;
- Challenge Stage opening/closing while preserving Board context;
- responsive Activity Slot interaction;
- color restoration feedback;
- Maittê moving/reacting between slots;
- green-heart/progress reaction;
- spoken-guide acting state change;
- success/retry feedback;
- reduced-motion fallbacks.

### B — Phase 1B character/environment enrichment

- Maittê blink/breath/weight shift idle;
- Maittê listen/think reaction;
- companion entrance/reveal;
- companion speaking/listening/reaction states;
- small object squash/settle on touch/place;
- ambient dune sand, leaves, water, clouds or equivalent biome motion;
- subtle parallax where performance allows;
- richer color-flow effects.

### C — ideal/future cinematic

- advanced camera choreography;
- complex character rigs;
- detailed lip-sync;
- long narrative sequences;
- sophisticated page-turn/cinematic transitions.

The useful MVP must not depend on C.

## Character acting vocabulary

Animation should make characters appear to think and respond rather than merely bounce.

Maittê minimum Phase 1B states:

- idle-curious;
- listen-think;
- success;
- retry-thinking;
- move.

Companion minimum Phase 1B states:

- idle;
- speak;
- watch/listen;
- success-reaction;
- retry/hint-reaction.

These may be implemented using transform groups, short frame swaps, opacity, squash/stretch or lightweight SVG/CSS animation. A skeletal animation system is not required.

## Speaking animation

Complex lip-sync is not required.

When narration is active, the companion should still read visually as the speaker through one or more of:

- head/body gesture;
- small mouth-shape alternation;
- ear/tail response;
- speech-specific pose;
- subtle speech cue integrated with the character.

The speaking visual state must stop when narration is cancelled/exits.

## Interaction motion

Touch-first manipulation should have immediate, small feedback:

- selection: lift/scale/outline response;
- drag/tap-place: object follows or moves decisively;
- valid placement: settle/snap;
- retry: gentle return/think response;
- success: object response before large scene transition.

Motion must not turn touch imprecision into pedagogical evidence.

## Environmental motion

Ambient motion should make the world feel alive but remain low-priority.

Examples:

- sand drift;
- grass/leaf sway;
- water shimmer;
- cloud drift;
- tiny creature movement.

During a focused challenge, reduce or pause peripheral ambient motion so it does not compete with the task or spoken instruction.

## Restoration motion

Color restoration should communicate cause/effect:

`challenge success → local object/area responds → color propagates → character notices/moves`

Restoration state is already derived from persisted facts; animation visualizes the state change and never becomes the source of truth.

## Implementation

Do not add an animation dependency by default. CSS transforms/opacity/keyframes and Web Animations API are sufficient starting points.

Any new animation library requires an explicit proposal covering:

- problem existing tools cannot solve cleanly;
- bundle/maintenance impact;
- migration/replaceability;
- reduced-motion behavior.

## State safety

Gameplay/progression state changes cannot depend on animation completion. Animations visualize already-authorized transitions and derived state.

If animation is skipped/interrupted, final state must still be correct.

## Timing tokens

Exact milliseconds/easing are centralized and PROVISIONAL. Tune through tablet preview rather than scattering hardcoded values.

Recommended semantic tokens may include:

- `motion.quick` — touch feedback;
- `motion.character` — acting/entrance;
- `motion.travel` — spatial transition;
- `motion.restoration` — color flow.

Names/values are implementation-level and may differ.

## Reduced motion

Honor `prefers-reduced-motion`.

Replace travel/hops/parallax with short fades or immediate repositioning while preserving causality and orientation.

Character expression may still change without animated movement.

## Phase 1B acceptance

1. Maittê visibly has idle, listen/think, success, retry-thinking and move treatments.
2. One companion visibly has idle, speak and reaction treatments.
3. At least one ambient world motion exists outside focused challenge mode.
4. Active Challenge Stage suppresses irrelevant peripheral motion.
5. Selection/placement has immediate non-punitive motion feedback.
6. Restoration visibly follows success.
7. Reduced-motion mode reaches the same final state.
8. No state mutation depends on animation-end events.
