# Maittê `idle-curious` — Animation Architecture Pivot Checkpoint

**Status:** CURRENT RASTER/CSS IMPLEMENTATION FROZEN FOR COMPARISON — CHARACTER ANIMATION ARCHITECTURE BENCHMARK OPEN

**Date:** 2026-08-21

## Purpose

This checkpoint records exactly where the Maittê `idle-curious` production front stopped before opening a broader character-animation architecture benchmark.

The goal is not to discard the production work already completed. The existing implementation becomes the **control/baseline** against which a rigged-character approach must prove materially better scalability without sacrificing the approved watercolor identity, restoration mechanic, accessibility, or runtime separation.

## Rollback branch

Immutable rollback snapshot created before benchmark documentation/experiments:

` snapshot/maitte-idle-curious-gate5-2026-08-21 `

The animation benchmark branch starts from that snapshot:

` benchmark/character-animation-architecture `

Do not rewrite or reuse the snapshot branch for experiments.

## What is already proven

The current `idle-curious` front has passed the prior production gates:

- approved Maittê master remains identity and literal-pixel authority;
- Adobe-prepared transparent raster + 8 restoration-region masks are persisted in the repository;
- restoration-raster composition works in real runtime;
- partial grayscale/color restoration works;
- full-restored direct-source invariant works;
- heart pulse is localized and visually accepted;
- reduced-motion fallback works;
- Overworld and World Board resolve the production raster through the stable `character.maitte.idle-curious` seam;
- production build, TypeScript, tests, lint-regression check and protected-layer diff passed;
- isolated Lovable runtime review completed.

The completed Gate 3 record remains:

`references/visual/19-maitte-overworld-main/GATE-3-BUILD-RESULT.md`

The Gate 5 runtime review remains:

`references/visual/19-maitte-overworld-main/GATE-5-LOVABLE-RUNTIME-REVIEW.md`

## Product-review findings after Gate 5

The following are **human product-review observations**, not automated test findings.

### Overall quality

The principal Maittê raster reads well overall and the watercolor/reference fidelity remains approved as the direction to preserve.

### Heart pulse

**Accepted.**

The localized green-heart pulse reads correctly and should be treated as a behavior to preserve in any alternative animation architecture.

### Glasses restoration / blink interaction

Observed behavior:

- while the character remains partially restored, restoring the glasses also restores face/eye color through the lens interiors;
- after that restoration step the blink may stop reading/appearing;
- once the character becomes fully restored, blinking becomes visible again.

This strengthens the already-known `mask-glasses` precision gap: the lens interiors are currently part of the restoration selection instead of only the physical frame.

### Partial-state blink quality

The deterministic blink is technically functional but **not production-approved visually**.

Observed issues:

- the partial/grayscale blink can read like the previously produced neutral face/eye underlay — a face area with the eyes removed rather than a natural eyelid closure;
- the eyelid motion appears to close **from bottom to top**, while the desired natural read is primarily the upper eyelid moving downward;
- the fully-restored state reads better than the partial-restoration composition.

Therefore the current blink remains valid as a technical proof but not as the final production motion solution.

### Breathing

The current whole-character transform reads as **floating/bobbing rather than breathing**.

Required future behavior:

- feet remain visually fixed to the ground;
- no perceptible whole-character vertical translation;
- movement should be a subtle body/chest/torso micro-expansion or equivalent deformation;
- the movement must not make nearby scenery/slot objects appear to breathe with the character.

### Parent-scene motion

The World Board currently contains ambient parent-scene movement that can move Maittê and the next-challenge scenery object together.

This must be reviewed separately from character breathing. A character-animation system must not rely on moving the whole scene to create character life.

### Hair secondary motion

No independent production hair/hairStreak motion was implemented in the current Gate 3 slice.

This remains an open `MOTION-ASSET-GAP` and becomes an explicit benchmark requirement rather than something to fake with a duplicated flat hair mask.

## Why the architecture is being reconsidered now

The current raster + SVG-mask + CSS-transform system successfully proved:

1. identity fidelity;
2. restoration semantics;
3. stable runtime seams;
4. production asset preparation;
5. local presentation motion.

However, the next production inventory is expected to require significantly more than one idle pose:

- multiple facial expressions;
- natural blinking;
- head/eye direction;
- arm and hand gestures;
- success/retry reactions;
- walking/move states;
- hair secondary motion;
- companion character motion;
- possibly speech/viseme-like mouth states later.

Continuing to solve each of these as independent flattened raster overlays risks a combinatorial asset and alignment problem.

The benchmark therefore asks whether Maittê should become a **rigged 2D character asset** while the existing React/game architecture remains authoritative for gameplay, progression and state.

## What is frozen during the benchmark

Until the benchmark reaches an explicit decision:

- do not promote the current `idle-curious` front to final production;
- do not spend another polishing round on the current blink;
- do not implement independent hair motion in the flat-raster renderer;
- do not mass-produce the remaining Maittê acting states using the current frame-by-frame/overlay workflow;
- do not convert the other companions to this motion approach merely for consistency;
- do not alter protected game/domain/evaluation/persistence/content layers;
- do not merge benchmark experiments to `main`.

## What must be preserved by any winning architecture

A replacement is acceptable only if it preserves or improves all of the following:

- approved watercolor Maittê identity and texture fidelity;
- stable logical character/state seams;
- region-based grayscale-to-color restoration;
- green heart always-restored semantics;
- full-restored visual fidelity;
- reduced-motion behavior;
- feet anchoring;
- board/world/stage scale support;
- separation of presentation from gameplay state/evaluation/persistence;
- ability to fall back to a static approved representation safely.

## Decision state

The current implementation is **not rejected**.

It is frozen as the baseline/control implementation while the project evaluates whether a rigged animation runtime can deliver substantially better expression/motion scalability at acceptable authoring cost and visual fidelity.

Next governing document:

`docs/design/CHARACTER-ANIMATION-ARCHITECTURE-BENCHMARK.md`
