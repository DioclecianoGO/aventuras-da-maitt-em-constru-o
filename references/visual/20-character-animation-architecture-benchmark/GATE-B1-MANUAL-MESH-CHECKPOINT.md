# Gate B1 — Manual Minimal Mesh Checkpoint

**Date:** 2026-08-21

**Branch:** `benchmark/character-animation-architecture`

## Current Rive state

The Rive AI Agent run on the transparent approved Maittê raster established that:

- the transparent raster imports correctly;
- the Agent can generate an image mesh;
- Auto Trace produced an excessively dense mesh (~668 vertices) following much of the character silhouette;
- the Agent also left experimental `Chest Bone` and `Hip Bone` objects, but did not complete a valid breathing deformation;
- the breathing proof itself therefore remains **not yet executed**.

The dense Auto Trace mesh was rejected for B1 breathing because it creates unnecessary editing/maintenance cost and increases the chance of unintended deformation of face, hair, skirt, legs and shoes.

## Reset checkpoint

Manual cleanup was executed in Rive:

- `Chest Bone` removed;
- `Hip Bone` removed;
- Maittê image mesh reset;
- Auto Trace no longer used;
- mesh returned to the default 4-corner contour with basic triangulation;
- approved transparent source remains visually unchanged at neutral.

This is the approved starting point for the next B1 step.

## Next mesh strategy

Use a **minimal semantic mesh** rather than silhouette tracing.

The first manual breathing proof will add only a small set of interior vertices around the torso so that chest/shoulder expansion can be keyed while the lower body remains effectively stationary.

Initial target: approximately 8–12 interior control vertices, focused on:

- neck/shoulder base;
- left/right upper chest;
- left/right lower chest / armpit area;
- left/right waist;
- left/right hip / top-of-skirt anchor.

No bones are required for this first breathing proof.

No Auto Trace, Generate, hair animation, blink, arm articulation, restoration work or runtime integration is authorized at this checkpoint.

## Acceptance condition for next step

Before any vertex is animated, visually inspect the minimal mesh topology and confirm that:

- torso has enough local control for micro-deformation;
- lower body remains connected through stable triangles;
- no unnecessary high-density vertices exist;
- neutral raster remains visually identical to the approved source.

Only after this topology review should the `idle-breathing-proof` timeline receive mesh-deformation keyframes.
