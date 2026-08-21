# B1 Rive Editor Observation 01 — Transparent Rig Source Required

**Date:** 2026-08-21

**Status:** PROCEDURE CORRECTION RECORDED — NO RIG DEFORMATION ACCEPTED YET

## Observation

The first Rive Editor proof imported `references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png` directly.

A human screenshot review showed that this master contains the watercolor paper/background over the full rectangular 1024×1536 canvas. The generated Rive mesh therefore covered the rectangular image area, not only Maittê's visible silhouette.

If this rectangular raster were deformed for breathing, the paper/background pixels around Maittê would deform together with the character. That would invalidate the visual proof because local breathing could become visible as warping of the background.

## Correction

The approved master remains the immutable **identity authority**, but it should not be used directly as the mesh-deformation runtime source.

For B1 mesh experiments, use the already-persisted transparent full-color derivative:

`src/assets/game/characters/production-proof/maitte-idle-curious-full-color.png`

This derivative preserves the approved Maittê artwork while removing the external paper/background from the rig source.

Repository blob SHA at observation time:

`8c2aff01292c7ff0a22d6a046acd3e3340dc78d9`

## Governance distinction

- `MAITTE_MASTER_APPROVED.png` = visual/identity authority and comparison source.
- `maitte-idle-curious-full-color.png` = transparent rig/proof source for local mesh deformation.

The transparent derivative must remain visually traceable to the master; it is not permission to redraw, restyle, recolor or regenerate Maittê.

## Immediate B1 action

1. Do not deform the current rectangular-background mesh.
2. Exit mesh-edit mode.
3. Remove or hide the rectangular master instance from the proof artboard.
4. Import `maitte-idle-curious-full-color.png`.
5. Verify transparency around Maittê before generating/editing a new mesh.
6. Only then resume B1 neutral fidelity + grounded breathing.

No `main` change and no production promotion are authorized by this observation.