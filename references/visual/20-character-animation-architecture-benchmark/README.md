# Character Animation Architecture Benchmark — Evidence Workspace

**Status:** GATE A PASS CONDITIONAL — GATE B PARTIAL; AUTOMATIC SEGMENTATION PASSED, RIG-READY LAYER EXTRACTION / UNDERPAINT REQUIRES AN EDITOR STEP

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

## Gate B — Maittê layer-preparation proof — PARTIAL

Detailed result:

`GATE-B-MAITTE-LAYER-PREPARATION.md`

Disposition:

`PARTIAL — AUTOMATIC SEGMENTATION PASS; PRODUCTION LAYER EXTRACTION / UNDERPAINT STILL REQUIRES EDITOR WORK`

Confirmed through the Adobe connector:

- transparent benchmark cutout can be derived without altering the approved master;
- hair mask is coherent;
- both arm+hand masks are coherent and individually identifiable;
- eyes+pupils are tightly localized;
- upper-clothes/torso and lower-clothes/skirt masks are coherent;
- face region is identifiable;
- automatic glasses segmentation remains insufficient for production and must be manually refined.

Important authoring finding:

- the current Adobe connector exposes mask generation but not a direct arbitrary `selection -> transparent approved-pixel layer` operation;
- meaningful arm/hair articulation also requires authored underpaint for pixels hidden in the flat master;
- two restricted Adobe Firefly underpaint attempts were rejected before generation, so underpaint automation was not proven and no generated derivative was accepted.

No Rive rig or runtime code has been started.

## Current decision

The benchmark remains on the Rive path, but Gate B is not fully closed.

Recommended next action:

### Gate B1 — minimal editor-assisted preparation

Prepare only the smallest rig-ready package required to prove:

- one grounded torso/breathing deformation;
- one arm gesture;
- one top-down blink;
- one hair secondary-motion region;
- heart independence;
- grayscale/color restoration alignment.

Do not prepare every future pose or every companion.

The goal is to measure the real up-front authoring burden before deciding whether Rive's rig reuse pays back that cost.

## Future proof evidence

After Gate B is fully closed and Gate C is explicitly authorized:

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
