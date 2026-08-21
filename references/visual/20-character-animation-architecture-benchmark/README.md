# Character Animation Architecture Benchmark — Evidence Workspace

**Status:** OPEN — GATE A / TOOL AND REPOSITORY FEASIBILITY NEXT

This workspace contains evidence for the character-animation architecture benchmark governed by:

`docs/design/CHARACTER-ANIMATION-ARCHITECTURE-BENCHMARK.md`

Baseline checkpoint:

`references/visual/19-maitte-overworld-main/ANIMATION-ARCHITECTURE-PIVOT-CHECKPOINT.md`

Rollback snapshot:

`snapshot/maitte-idle-curious-gate5-2026-08-21`

Experiment branch:

`benchmark/character-animation-architecture`

## Why this benchmark exists

The current Maittê raster pipeline has proven identity fidelity, restoration, heart pulse, reduced motion and real runtime integration. Product review also exposed scaling limitations for future character motion: partial-state blink quality, whole-body breathing/bobbing, independent hair movement and future arm/expression articulation.

The benchmark tests whether a dedicated rigged 2D character runtime can solve those concerns without sacrificing the approved watercolor identity or requiring game/domain changes.

## Candidate sequence

1. Rive — primary proof candidate;
2. Spine — compare only if Rive exposes a meaningful limitation;
3. Live2D — optional comparison, especially if face/hair deformation becomes decisive;
4. current raster/CSS implementation — control baseline, never discarded until a replacement wins;
5. pixel-art — separate product/art-direction spike, not part of the initial rigging proof.

## Current gate

### Gate A — tool / repository feasibility

No production rig is authorized yet.

Evidence to add here:

- Rive primary-documentation findings;
- licensing/deployment findings;
- Web/React runtime integration findings;
- watercolor/raster-layer fidelity findings;
- proposed layer-separation inventory;
- proposed `.riv` repository/versioning policy;
- manual-editor/integration constraints;
- Gate-A PASS / FAIL / CONDITIONAL decision.

## Future proof evidence

After explicit authorization:

- layer-separation proof;
- rig screenshot/layout;
- neutral rest;
- grounded breathing;
- top-down blink;
- hair secondary motion;
- arm gesture;
- expression transition;
- partial restoration while moving;
- fully-restored state;
- reduced-motion state;
- runtime adapter proof;
- real-scale Lovable review;
- final scorecard / architecture decision.

## Governance

Nothing in this workspace is production-approved merely because it exists here.

The benchmark branch must not be merged to `main` until a later explicit architecture decision and promotion plan.
