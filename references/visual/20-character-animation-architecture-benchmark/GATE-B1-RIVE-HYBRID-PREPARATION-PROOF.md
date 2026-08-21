# Character Animation Architecture Benchmark — Gate B1 — Hybrid Rive Preparation Proof

**Status:** ACTIVE — SINGLE-SOURCE MESH PROOF DEFINED; EDITOR EXECUTION PENDING

**Date:** 2026-08-21

Governing benchmark:

`docs/design/CHARACTER-ANIMATION-ARCHITECTURE-BENCHMARK.md`

Parent gate:

`references/visual/20-character-animation-architecture-benchmark/GATE-B-MAITTE-LAYER-PREPARATION.md`

Frozen rollback baseline:

`snapshot/maitte-idle-curious-gate5-2026-08-21`

Experiment branch:

`benchmark/character-animation-architecture`

## 1. Why B1 changed after Gate B

Gate B proved that Adobe can identify several useful body/garment regions automatically, but the current connector does not expose a lossless arbitrary `selection mask -> transparent approved-pixel layer` operation.

Before accepting a large manual Photoshop preparation burden, B1 asks a narrower question:

> Can Rive operate directly on the approved raster master with local meshes, requiring separate transparent artwork only for movements that genuinely change the visible silhouette?

This is a materially smaller production model than fully decomposing the character into many PNG layers.

## 2. Rive capability relevant to B1

Official Rive documentation confirms:

- raster images can receive meshes;
- a custom mesh contour can be authored around the graphic;
- mesh vertices can be deformed directly;
- meshes can be controlled by bones and vertex weighting;
- the Rive renderer supports image meshes defined by vertices, texture coordinates and triangle indices;
- hierarchy/transform spaces allow local motion without moving unrelated scene objects.

Primary references:

- https://rive.app/docs/editor/manipulating-shapes/meshes
- https://rive.app/docs/editor/manipulating-shapes/bones
- https://rive.app/blog/intro-to-meshes
- https://rive.app/docs/editor/fundamentals/transform-spaces

## 3. B1 production hypothesis — hybrid rig, not full decomposition

The benchmark now distinguishes three motion classes.

### Class A — deformation that does not expose hidden pixels

Candidate implementation: keep the approved raster source intact and deform local mesh vertices.

Initial targets:

- grounded breathing / torso expansion;
- tiny shoulder/chest settling;
- subtle hair secondary motion where the silhouette can deform without revealing a missing background region.

These should not require separate PNG layers if the mesh can localize deformation while surrounding vertices remain pinned.

### Class B — local overlays that do not require body articulation

Candidate implementation: small independent authored overlay or state element.

Initial targets:

- top-down eyelid/blink representation;
- heart-localized pulse;
- glasses-frame presentation/restoration if needed independently.

These should remain small and should not require a complete face redraw.

### Class C — articulation that reveals pixels hidden in the flat master

Candidate implementation: separated visible part + authored underpaint.

Initial proof target:

- one arm gesture only.

When the arm leaves its neutral position, shirt/torso pixels that do not exist in the flat approved master become visible. No bone or mesh can recover pixels that were never authored. Therefore arm articulation remains the deliberate B1 test for the true underpaint cost.

## 4. Important implication

B1 does **not** assume that every future motion requires a separate raster layer.

Proposed economical character architecture:

```text
APPROVED MASTER / BASE RASTER
├── local torso mesh -> grounded breathing
├── local hair mesh -> subtle secondary motion
├── eye/lid overlay -> blink
├── heart overlay/region -> pulse
├── glasses frame -> independent restoration/presentation
└── articulated arm proof
    ├── arm visible layer
    └── torso underpaint only where the arm uncovers it
```

This architecture should be preferred over a full paper-doll decomposition if the Rive Editor proof confirms it visually.

## 5. Automatic segmentation evidence already available

Adobe Gate B produced coherent full-canvas masks/bounds for:

- hair;
- both arms + hands;
- eyes + pupils;
- upper clothes / torso;
- lower clothes / skirt;
- face.

Automatic glasses selection remains **rejected for production** because it does not reliably isolate only the physical frame.

These masks are evidence/guides, not production-final layers.

## 6. B1 Editor proof sequence

Do not build the full Maittê rig yet.

### B1-A — neutral single-source import

1. Import the approved transparent Maittê source into a fresh Rive proof file.
2. Preserve original aspect ratio and neutral pose.
3. Capture a neutral screenshot before any deformation.
4. Verify that the raster itself is visually identical to the approved source.

Pass criterion:

`neutral Rive render visually preserves the approved watercolor identity.`

### B1-B — grounded breathing from the base raster

1. Add a mesh to the base raster.
2. Keep feet/shoes and lowest leg vertices pinned.
3. Add only enough vertices around torso/shoulders to permit a micro expansion/contraction.
4. Create a breathing test with no global translateY.
5. The feet must remain visually stationary.

Pass criterion:

`reads as breathing, not bobbing/floating; feet remain fixed.`

### B1-C — local hair motion from the base raster

1. Add/select only the minimum hair-region mesh vertices needed for secondary motion.
2. Keep face, glasses and skull-adjacent roots visually stable.
3. Apply very small curl/tip displacement.

Pass criterion:

`hair reads as secondary motion without warping face identity or creating seams.`

### B1-D — custom-contour / duplicate-source experiment

Purpose: test whether an additional instance of the same approved source can use a custom mesh contour as a practical lossless region representation, avoiding a separately exported PNG for the arm.

1. Duplicate/reference the same approved raster asset in the artboard.
2. Add a mesh to the duplicate.
3. Use a custom mesh contour tightly around one arm + hand, guided by the Gate-B arm bbox/mask.
4. Verify whether the rendered mesh instance can visually isolate only that arm region while sampling the original source pixels.

Possible results:

- `PASS`: separate arm PNG extraction may be unnecessary; use the same raster asset with a local mesh representation.
- `FAIL`: B1 must produce one true transparent arm layer outside Rive.

This is a proof question; no assumption is made in advance.

### B1-E — one-arm articulation / underpaint measurement

Only after B1-D:

1. Create a minimal shoulder/elbow chain for the chosen arm.
2. Move the arm enough to demonstrate a visible gesture (small wave or point).
3. Record exactly what previously-hidden torso/shirt area becomes exposed.
4. Author only that missing underpaint area.

Pass criterion:

`one usable arm gesture with no hole, duplicate neutral arm, seam or visible repaint of the approved front-facing artwork.`

## 7. Blink scope in B1

Do not reuse the existing broad face-without-eyes underlay as the target solution.

The accepted product requirement is:

- upper eyelid drives the closure downward;
- lower lid moves minimally, if at all;
- no visible 'face without eyes' state;
- works while the character is grayscale/partially restored and fully restored;
- restoring glasses must not cover or disable blink.

B1 may use a small independent eyelid representation rather than deforming the entire face raster.

## 8. Restoration constraint

The benchmark remains invalid unless color restoration survives motion.

Required later proof:

- grayscale and restored visual states share the same motion coordinate system;
- no drift between restored region and moving underlying art;
- glasses restoration does not recolor face pixels through the lenses;
- full-restored neutral frame remains visually faithful to the approved source.

Do not redesign the restoration vocabulary during B1.

## 9. What is deliberately not being built yet

B1 does not authorize:

- production runtime integration;
- migration of all Maittê states;
- companion rigs;
- full facial phoneme/viseme system;
- multiple arm gestures;
- walk cycle;
- new acting poses;
- merge to `main`.

## 10. Decision after B1

B1 is successful only if the smallest Rive preparation path proves that we can preserve the approved watercolor while reducing future frame-authoring burden.

Possible dispositions:

- `PASS — PROCEED TO GATE C RIG PROOF`;
- `PASS WITH MANUAL UNDERPAINT COST — PROCEED AND MEASURE`;
- `FAIL — RIVE PREPARATION COST/IDENTITY LOSS TOO HIGH; COMPARE SPINE/LIVE2D OR RETAIN CURRENT BASELINE`.

No architecture promotion occurs automatically from B1.