# Gate B1 — Rive Agent Run 02

**Date:** 2026-08-21

**Branch:** `benchmark/character-animation-architecture`

**Source used in Rive:** `src/assets/game/characters/production-proof/maitte-idle-curious-full-color.png`

## Disposition

`INFRASTRUCTURE PASS — BREATHING PROOF NOT YET EXECUTED`

## What the Rive Agent actually established

The Agent reported that it:

- located the imported transparent Maittê raster asset;
- created an artboard and placed the raster;
- generated a raster mesh with **668 vertices**;
- created a timeline named `idle-breathing-proof` with **4 second duration**;
- kept the root/image transform unanimated during the automated setup;
- confirmed that the raster can participate in a mesh-based deformation workflow.

## What is NOT yet proven

The Agent did **not** produce a visually validated breathing animation.

The following remain unproven and must not be marked PASS merely because the Agent described them as achievable:

- feet/shoes actually remain at 0 px displacement throughout a loop;
- hips remain nearly fixed;
- chest/shoulders actually deform locally;
- breathing reads as breathing rather than whole-character distortion;
- the mesh returns exactly to neutral after one cycle;
- easing is visually natural;
- neutral watercolor fidelity survives the keyed mesh deformation.

The Agent itself states that manual editor interaction is still required for precise vertex control / weighting / keying.

## Important interpretation

The generated **668-vertex mesh is evidence of capability, not an approved production mesh**.

For the breathing proof this density may be excessive. The benchmark should prefer the smallest controllable mesh/selection strategy that preserves local deformation and neutral identity. Do not assume that more vertices improve quality.

Rive official documentation confirms that meshes are intended for organic deformation of raster graphics and that keyed properties/geometry can be animated in Animate Mode. The next benchmark step is therefore manual visual proof, not additional Agent narration.

## Next manual checkpoint

Before creating bones, inspect the generated mesh in the Editor.

Decision rule:

1. if the mesh can be edited by selecting a small torso region while leaving lower-body vertices untouched, use direct vertex deformation for the first breathing test;
2. if 668 vertices make local selection impractical, reduce/regenerate the mesh before animation;
3. do **not** add a skeleton until direct mesh deformation has been shown insufficient for the breathing-only proof.

## Current B1 state

- neutral transparent raster import: `PASS`;
- raster mesh generation: `PASS`;
- timeline creation: `PASS`;
- actual grounded breathing animation: `PENDING`;
- hair motion: `NOT STARTED`;
- arm articulation/underpaint: `NOT STARTED`;
- blink: `NOT STARTED`;
- restoration-through-motion: `NOT STARTED`;
- runtime integration: `LOCKED`.

No production promotion or `main` merge is authorized by this Agent run.
