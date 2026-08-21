# Character Animation Architecture Benchmark — Gate B — Maittê Layer Preparation

**Status:** PARTIAL — AUTOMATIC SEGMENTATION PASS; PRODUCTION LAYER EXTRACTION / UNDERPAINT STILL REQUIRES EDITOR WORK

**Date:** 2026-08-21

Governing benchmark:

`docs/design/CHARACTER-ANIMATION-ARCHITECTURE-BENCHMARK.md`

Frozen baseline:

`snapshot/maitte-idle-curious-gate5-2026-08-21`

Experiment branch:

`benchmark/character-animation-architecture`

## 1. Purpose

Gate B tests whether the approved `MAITTE_MASTER_APPROVED.png` can be decomposed into a minimum rig-ready layer inventory without redesigning Maittê or losing the approved watercolor identity.

This gate does **not** rig or animate the character yet.

The intended minimum proof inventory is driven by the later P1-P8 benchmark behaviors:

- hair;
- left arm + hand;
- right arm + hand;
- eyes / pupils;
- glasses;
- face / head region;
- upper clothes / torso;
- lower clothes / skirt;
- anchored legs / feet base;
- green heart as an independent presentation element;
- underpaint behind any layer expected to reveal previously hidden pixels when articulated.

## 2. Source authority

The approved master remains immutable and is the identity authority.

Adobe source asset used in this gate:

`MAITTE_MASTER_APPROVED.png`

Source dimensions:

`1024 × 1536`

A new transparent derivative was created only for benchmark selection work. The master itself was not altered.

## 3. Automatic segmentation findings

Adobe subject/body-part parsing produced useful full-canvas masks for several rig-relevant regions.

Normalized bounding boxes below use `(x, y, w, h)` in source-image coordinates.

| Region | Result | Normalized bbox | Gate-B observation |
|---|---|---|---|
| Hair | PASS | `(0.295898, 0.074870, 0.438477, 0.302083)` | Strong silhouette coverage including curls; suitable as a starting segmentation mask. |
| Subject-left arm + hand (viewer-right) | PASS | `(0.619141, 0.417969, 0.107422, 0.234375)` | Clean isolated limb silhouette; promising for an arm-articulation layer. |
| Subject-right arm + hand (viewer-left) | PASS | `(0.287109, 0.417969, 0.105469, 0.223307)` | Clean isolated limb silhouette; promising for an arm-articulation layer. |
| Eyes + pupils | PASS | `(0.430664, 0.205729, 0.145508, 0.019531)` | Clean compact eye region; useful for future blink/gaze layer preparation. |
| Upper clothes | PASS | `(0.315430, 0.320313, 0.388672, 0.221354)` | Clean shirt/torso silhouette; good basis for torso breathing deformation and restoration alignment. |
| Lower clothes | PASS | `(0.309570, 0.528646, 0.377930, 0.157552)` | Clean skirt silhouette; useful for torso/hip separation. |
| Face | PASS | `(0.377930, 0.146484, 0.252930, 0.154948)` | Usable face region; may be further decomposed only if the eventual rig needs brows/mouth independence. |
| Glasses | FAIL FOR PRODUCTION | `(0.377930, 0.173177, 0.250977, 0.063151)` | Automatic selection does not cleanly capture the full physical frame. It reproduces the same weakness already seen in the restoration pipeline and is not production-ready. |

### Visual mask review

The mask previews confirm:

- hair is broad and coherent;
- both arm masks isolate the limb cleanly enough to justify a rigging proof;
- shirt and skirt masks are coherent;
- eyes/pupils are tightly localized;
- glasses are not reliable enough to become an authored rig/restoration layer without manual refinement.

## 4. Important production finding — segmentation is not the same as a rig-ready layer

The Adobe connector can currently create good region masks, but it does not expose a direct operation equivalent to:

`selection mask -> copy selected approved pixels to a new transparent PNG layer`

for arbitrary body-part masks.

That means the benchmark can automate **detection/mask preparation**, but not yet the complete lossless layer extraction step through the connector alone.

This is a real authoring-workflow cost and must be included in the architecture decision.

## 5. Underpaint proof

Moving an arm or front hair layer requires previously hidden pixels to exist underneath it. A flat source painting does not contain those hidden pixels.

An Adobe Firefly attempt was made to create a benchmark underpaint by omitting one arm layer and reconstructing only the hidden shirt/torso area.

Both carefully restricted prompts were rejected by the current Adobe safety layer before generation. No underpaint was produced.

Therefore:

- underpaint is **not proven automated** through the current ChatGPT/Adobe connector;
- no generated underpaint was accepted or persisted;
- no production art was changed.

The remaining practical options for Gate B completion are:

1. a small manual Photoshop/Rive-authoring step to construct underpaint and extract transparent layers;
2. a future Adobe connector capability that exposes selection-to-layer / layer compositing directly;
3. another controlled production tool that can perform lossless mask-to-alpha extraction and manual underpaint without regenerating the visible approved art.

## 6. Rive-specific implication

Rive supports raster meshes, custom mesh contours, bones and deformation. Official documentation confirms that raster images can be mesh-deformed and weighted to bones.

However, meaningful articulation such as raising an arm still needs a valid visual solution for the area exposed behind the moving limb.

A rig cannot eliminate the underpaint requirement simply by adding bones.

The current proof therefore supports this distinction:

- **deforming a visible raster region:** technically plausible in Rive;
- **revealing pixels that never existed behind that region:** requires authored underpaint / separated art.

## 7. Minimum layer-preparation plan after this gate

Do **not** create dozens of layers.

The next layer-preparation pass should remain minimal:

### Stable/root group

- legs + feet / grounding base;
- torso base / hidden underpaint;
- skirt/hips as needed by the rig.

### Articulated layers

- viewer-left arm + hand;
- viewer-right arm + hand;
- head/face;
- hair back;
- hair front / fringe or one secondary-motion hair region;
- eye/lid region;
- glasses frame only;
- heart.

### Restoration representation

The existing named restoration vocabulary remains authoritative:

- heart;
- glasses;
- hairStreak;
- hair;
- shirt;
- skirt;
- socks;
- shoes.

The proof must later demonstrate that restoration and deformation use one shared coordinate/rig system rather than independently drifting layers.

## 8. Gate-B disposition

`PARTIAL — AUTOMATIC SEGMENTATION PASS; PRODUCTION LAYER EXTRACTION / UNDERPAINT STILL REQUIRES EDITOR WORK`

This is **not a Rive failure** and it is **not a reason to return to the flat-raster architecture yet**.

It is a production-workflow finding: a rigged character shifts work away from producing many full-body frames, but introduces an up-front layer/underpaint authoring step.

That tradeoff is exactly what this benchmark is intended to measure.

## 9. Next decision

Before Gate C rigging begins, choose one narrow completion path for Gate B:

### Path B1 — minimal manual Rive/Photoshop preparation

Prepare only the minimum articulated layers and underpaint required for one arm gesture + breathing + blink + hair proof, then import them into Rive.

### Path B2 — pause Rive and compare authoring workflow against Spine/Live2D

Use only if the manual layer-preparation burden itself is judged unacceptable before any rig proof.

Recommended path:

`B1 — continue the Rive proof with the smallest possible manually prepared layer set.`

No production adoption, no `main` merge, and no mass character conversion are authorized by this result.