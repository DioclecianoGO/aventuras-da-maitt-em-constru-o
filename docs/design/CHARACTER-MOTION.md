# Character Motion / Microanimation

**Status:** PROVISIONAL production contract — motion categories are DECIDED concerns; exact timing/amplitude per character remains to be tuned.

## Purpose

Define how authored character art gains subtle life in runtime without turning animation history into game state and without forcing the production illustration back into hand-drawn JSX/SVG geometry.

This spec applies first to Maittê and may later be generalized to companions.

## Core rule

Motion is **presentation-only derived behavior**.

It must not create an independent progression truth.

Character identity, restoration state and acting state remain controlled by their existing logical contracts. Motion decorates that presentation; it does not decide gameplay outcomes.

## Required Maittê motion concerns

The production pipeline must explicitly evaluate:

- **breathing** — subtle torso/body scale or vertical movement;
- **eye blinking** — natural intermittent blink, not constant mechanical looping;
- **green-heart pulse** — gentle hope-anchor pulse, visually subordinate to gameplay feedback;
- **hair movement** — small secondary motion/sway that preserves the approved silhouette;
- **idle posture motion** — tiny shifts that prevent a frozen-paper-doll feel;
- **microexpressions** — restrained cues compatible with the active acting state;
- **state transitions** — where supported, movement between listen/think/success/retry/move states should settle naturally rather than snap arbitrarily.

## Motion hierarchy

Motion should be layered by importance:

1. acting-state pose/expression;
2. restoration/color state;
3. breathing/idle life;
4. blink;
5. heart pulse;
6. hair/secondary motion;
7. transient success/retry emphasis where explicitly triggered.

Lower-level motion must not obscure higher-level communication.

## Production-asset compatibility

The validated restoration-raster contract must remain usable.

Preferred motion techniques are transforms, opacity/filter changes, clip/mask animation or small overlay elements around the authored raster — not a redraw of the character into vector paths.

Examples of acceptable approaches:

- transform the whole character raster for breathing;
- animate a localized overlay/masked region for heart pulse;
- use a small authored blink/eye overlay or alternate eye frame when needed;
- use restrained segmented/overlay treatment for hair secondary motion if a whole-image transform is insufficient.

Exact technique is implementation-specific and must be proven visually.

## Heart pulse

The green heart is the persistent saturated hope anchor.

Its pulse should:

- remain subtle in ordinary idle presentation;
- never read as an error alarm;
- avoid competing with puzzle success/failure feedback;
- preserve the heart's always-saturated color-restoration rule;
- be suppressible under reduced-motion settings.

The heart pulse is not progression state.

## Blink

Blink behavior should:

- feel irregular/natural rather than metronomic;
- preserve the current acting expression;
- avoid blinking during a moment where an authored expression depends on a specific eye shape unless a compatible blink frame exists;
- degrade safely to a static expression if no production-quality blink representation is available.

## Breathing / idle

Breathing should be subtle enough that watercolor edges remain stable and the character does not appear to stretch unnaturally.

Prefer small transform ranges with an anchor near the feet/body center appropriate to the call site.

Do not encode breathing phase in persisted state.

## Hair motion

Hair movement is secondary motion.

It must preserve:

- overall silhouette;
- lighter hair streak identity;
- face visibility;
- mask/restoration registration where hair/hairStreak are independently restored.

If moving the hair independently would break restoration masks, use a technique where color/reveal and motion share the same transform or authored overlay coordinate system.

## Acting states

Existing acting-state semantics remain authoritative.

Motion may express or soften transitions between states, but it must not invent new gameplay states merely to animate.

For Maittê, audit at least:

- `idle-curious`;
- `listen-think`;
- `success`;
- `retry-thinking`;
- `move`.

The exact production treatment can differ by state.

## Accessibility / reduced motion

All non-essential continuous motion must respect reduced-motion preferences.

Under reduced motion:

- breathing can become static or nearly static;
- hair sway should stop;
- heart pulse should stop or reduce to a non-motion emphasis;
- blink may remain only if considered character legibility rather than decorative motion, but should still be conservative;
- gameplay meaning must remain understandable without animation.

## Performance

Tablet-first web performance is binding.

Avoid animation strategies that require large numbers of independently decoded raster frames or continuous expensive canvas redraws without evidence that they are necessary.

Prefer GPU-friendly transforms/opacity where quality permits.

## Validation matrix

Before motion is promoted for a production character, review:

- full review scale;
- actual Challenge Stage scale if applicable;
- Overworld/main presence scale;
- reduced-motion mode;
- stolen-color state;
- partial restoration state;
- fully restored state;
- at least one low-performance/tablet-target browser path.

Check specifically for:

- raster blur caused by transforms;
- mask/color misregistration during motion;
- foot-anchor drift;
- clipping;
- distracting repetition;
- conflict between heart pulse and gameplay feedback;
- eye/hair artifacts.

## Current known state

Production Proof 01 validated the **static restoration-raster composition contract** for Maittê `listen-think`.

It did not validate final production motion.

Therefore motion remains a named production gap for the next Maittê fronts rather than an implicit future enhancement.

## Governance

- Motion categories above: **DECIDED concerns**.
- Exact timings, amplitudes and easing: **PROVISIONAL / per-context tuning**.
- Animation history as persisted state: **FORBIDDEN**.
- Reduced-motion support: **REQUIRED**.
- Vector redraw solely to obtain motion: **NOT AUTHORIZED**.
- Final production motion rig: **NOT YET DECIDED**.