# Character Animation Architecture Benchmark — Evidence Workspace

**Status:** GATE A PASS CONDITIONAL — GATE B LAYER-PREPARATION PROOF AWAITING EXPLICIT APPROVAL

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

## Gate A — Rive tool/repository feasibility — COMPLETE

Detailed result:

`GATE-A-RIVE-FEASIBILITY.md`

Disposition:

`PASS CONDITIONAL`

Confirmed:

- raster watercolor images can be imported and mesh-deformed;
- bones/weighting support body articulation;
- State Machines/Data Binding fit the existing semantic character adapter;
- official React/Web runtime exists;
- Rive runtime libraries are MIT/open source;
- production `.riv` export requires a paid plan;
- `.rev` + `.riv` + repository source-layer policy provides a reproducible path;
- current ChatGPT environment has no direct Rive connector/MCP;
- Rive's own in-editor Agent may reduce authoring effort but does not eliminate the need to measure manual rig/mesh work.

Mandatory proof still open:

- named grayscale/color restoration must stay aligned through mesh/bone deformation;
- neutral layered reassembly must preserve the approved watercolor identity;
- underpaint must not introduce visible redesign;
- actual editor authoring effort must be measured.

## Current gate

### Gate B — Maittê layer-preparation proof — AWAITING EXPLICIT APPROVAL

No Rive rig or runtime code is authorized yet.

Gate B must first prove that the approved Maittê can be decomposed into a minimal riggable layer inventory and reassembled at the neutral pose without visible seams or identity drift.

Expected evidence:

- source-layer plan;
- extracted transparent PNG layers;
- neutral underpaint only where articulation needs it;
- corrected glasses-frame layer excluding lens interiors;
- eyelid/blink source strategy;
- neutral re-composition board;
- review-scale and Overworld-scale comparison;
- SHA manifest;
- human approval before mesh/bone rigging.

## Future proof evidence

After explicit authorization:

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
