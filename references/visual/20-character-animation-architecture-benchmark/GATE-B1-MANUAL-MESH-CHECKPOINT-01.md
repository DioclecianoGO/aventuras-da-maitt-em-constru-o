# Gate B1 — Manual Mesh Checkpoint 01

**Date:** 2026-08-21

**Branch:** `benchmark/character-animation-architecture`

## Status

`PASS FOR FIRST DEFORMATION TEST — 8-POINT SEMANTIC TORSO CAGE`

## Observed editor state

The Rive proof file is using the approved transparent raster asset (`maitte-idle-curious-full-color`). The prior auto-traced ~668-vertex mesh and temporary Chest/Hip bones were removed. The image mesh was reset to the default four-corner contour, then eight manually placed interior vertices were added as four semantic torso pairs:

1. shoulder / neckline pair;
2. mid-torso / chest-side pair;
3. lower-torso / waist-side pair;
4. shirt-hem / skirt-top pair.

No additional vertices, bones, Auto Trace, Generate, or custom contour were used.

## Visual/topology assessment

The current triangulation is acceptable for the first grounded-breathing proof:

- lower shirt/skirt-top pair can remain completely fixed;
- waist pair can remain fixed or nearly fixed;
- only shoulder and chest-side pairs need to move during inhale;
- triangles below the fixed lower torso rows terminate toward fixed bottom-corner vertices, so lower-body motion should be strongly limited;
- feet, shoes, legs and skirt are not directly keyed or given control vertices in this first test;
- no centerline vertices are added yet, to avoid unnecessary mesh complexity before visual validation.

## Decision

Proceed to Animate mode using the existing `idle-breathing-proof` timeline if present.

First deformation test must use direct vertex animation only. Do **not** introduce bones yet.

Target motion:

- shoulders: micro upward/outward displacement;
- chest-side vertices: micro outward displacement;
- waist: fixed or near-fixed;
- shirt hem / skirt top: fixed;
- root/image transform: unchanged;
- feet/shoes: visually stationary.

If the heart, glasses, face, skirt or lower body visibly shear during the first deformation, stop and revise topology before easing/timing refinement.

This checkpoint does not constitute Gate B1 pass or architecture adoption. It only approves the current minimal topology for the first animated deformation test.
