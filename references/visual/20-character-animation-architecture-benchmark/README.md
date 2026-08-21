# Character Animation Architecture Benchmark — Evidence Workspace

**Status:** GATE A PASS CONDITIONAL — GATE B PARTIAL — GATE B1 HYBRID RIVE PREPARATION PROOF ACTIVE

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
- meaningful arm articulation still requires authored underpaint for pixels hidden in the flat master;
- two restricted Adobe Firefly underpaint attempts were rejected before generation, so underpaint automation was not proven and no generated derivative was accepted.

No production Rive rig or runtime code has been started.

## Gate B1 — hybrid Rive preparation proof — ACTIVE

Detailed plan:

`GATE-B1-RIVE-HYBRID-PREPARATION-PROOF.md`

B1 intentionally narrows the artwork-preparation burden before accepting a full paper-doll decomposition.

New working hypothesis:

- grounded breathing can use local mesh deformation on the approved base raster with feet pinned;
- subtle hair secondary motion may also use local mesh deformation without a separate hair PNG;
- blink can remain a very small localized overlay/state element;
- heart remains an independent presentation/restoration element;
- only motions that reveal previously hidden pixels, starting with one arm gesture, require explicit separated artwork + underpaint;
- a duplicate-source/custom-mesh-contour experiment will test whether even the visible arm pixels can be sampled directly from the same approved raster instead of exporting a separate arm PNG.

This is the current proof sequence:

1. neutral source import/fidelity;
2. grounded breathing on the base raster;
3. subtle local hair deformation;
4. duplicate-source/custom-contour arm experiment;
5. one-arm articulation and measurement of the minimum necessary underpaint;
6. localized top-down blink;
7. restoration/motion alignment proof.

The aim is to learn the smallest repeatable rig-authoring package, not to rig every future state now.

## Future proof evidence

After Gate B/B1 are closed and Gate C is explicitly authorized:

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
