# Character Art & Acting System

**Status:** DECIDED character-system constraints; final sheets/poses remain PROVISIONAL.

## Purpose

Maittê and the pet companions must read as characters inhabiting the world, not as UI decorations. This document defines the minimum visual/acting system needed for the MVP without requiring a full animation rig.

## Shared character language

Characters use an original 2D storybook/coloring-book language with light manga/anime influence in expression and acting.

Required qualities:

- clear silhouette at tablet scale;
- warm, rounded forms;
- varied, confident line weight;
- expressive eyes/eyebrows/mouth;
- readable head/body gesture;
- enough enclosed regions to support color restoration where applicable;
- avoid generic icon/stick-figure construction in the reviewed player experience;
- avoid photorealism, baby/chibi proportions and adult-looking treatment for Maittê.

Named visual references discussed during ideation remain mood references only. Final assets must be original and must not imitate a specific artist/studio style.

## Maittê — minimum acting set

Phase 1B must support at least:

1. `idle-curious` — relaxed, alert, alive;
2. `listen-think` — attention toward companion/task, thoughtful expression;
3. `success` — clear joy/pride without excessive reward spectacle;
4. `retry-thinking` — mild puzzlement/consideration, never shame/sadness;
5. `move` — board travel treatment, which may be a small walk/hop/translate rather than full frame animation.

Recommended additional reusable states:

- surprise;
- determination;
- pointing/looking toward an object;
- celebration;
- greeting.

## Maittê — visual identity

`MAITTE.md` remains authoritative. Character art must preserve:

- approximately eight-year-old proportions;
- dark-brown hair slightly below shoulders;
- light waves/curls at tips;
- marked fringe;
- independent light/bleached lock;
- pink glasses current MVP direction;
- skirt;
- colorful socks;
- unbranded high-top canvas sneakers;
- green heart on shirt.

## Maittê — color layering

The green heart remains saturated from opening.

Other regions must be independently addressable, including at minimum:

- glasses;
- hairStreak;
- hair;
- shirt;
- skirt;
- socks;
- shoes.

No fixed restoration order is encoded into the asset.

## Companion — minimum acting set

A concept pet used at runtime in Phase 1B must support at least:

1. `idle`;
2. `speak` — visibly reads as the current speaker;
3. `listen/watch` — attention on Maittê or puzzle;
4. `success-reaction`;
5. `retry/hint-reaction` — supportive, not disappointed.

Optional enrichment:

- entrance;
- curiosity/look-at-object;
- tail/ear motion;
- blink/breath;
- exit.

Complex lip-sync is not required. A speaking state may use head/ear/body movement, mouth-shape alternation or a subtle speech cue synchronized loosely with narration.

## Companion identity

The pets must remain recognizably distinct:

- Burpee: blue-merle Border Collie, blue eyes;
- Pipoca: white slightly curly Maltese;
- Will: orange mixed-breed cat;
- Lyra: tricolor mixed-breed cat.

The art direction should emphasize their personalities without turning them into caricatures that alter species identity.

## Scale system

Character assets must remain recognizable at:

- Overworld scale;
- World Board scale;
- Challenge Stage/guide scale;
- future profile/icon scale.

A single master vector/layered source is preferred when practical, but separate optimized exports are acceptable if they share the same character model.

## Gaze and staging

Characters should help direct attention.

Examples:

- companion looks at the object being discussed;
- Maittê turns toward the active slot;
- success reaction follows the restored scenery;
- retry-thinking reaction looks back to manipulables rather than away from the task.

Character staging should support comprehension instead of adding motion everywhere.

## Motion economy

Avoid requiring skeletal animation. Phase 1B may use:

- layered SVG groups;
- CSS transforms;
- small frame swaps;
- subtle squash/stretch;
- simple path translation;
- opacity/scale entrances.

The system should make later replacement with richer assets possible without changing challenge/domain code.

## Asset architecture

Character visual assets/configuration belong under the visual/assets layer, not educational domain/evaluation/persistence.

The pet id can be selected by challenge/presentation configuration. The character renderer resolves the matching visual asset and acting state.

The instruction sentence itself must not live inside the character asset/component.

## Acceptance criteria — Phase 1B

1. Maittê no longer reads as a schematic/simple icon in the reviewed flow.
2. Maittê exposes the required five acting states.
3. One pet exposes the required companion acting states.
4. The active speaker is visually understandable even with audio muted.
5. Retry acting is supportive/thoughtful, not sad/punitive.
6. Maittê's heart and restoration regions remain independently controllable.
7. Character art works at board and challenge scales.
8. Swapping character art does not require changes to evaluator/domain logic.
