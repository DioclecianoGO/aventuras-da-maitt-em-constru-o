# STEP 2C-M1 — Maittê Main / Overworld — Gate 2A Preparation Result

**Status:** PASS FOR NEXT-GATE PROOFING — final runtime promotion still requires binary persistence, motion proof, implementation audit and Lovable review.

## Scope

This record documents Gate 2A for `character.maitte.idle-curious`.

The approved literal source is:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

No new Maittê pose or identity image was generated.

The preparation work was executed through the Adobe connector, without manual Photoshop operation.

## Source

- source dimensions: `1024 × 1536`
- approved source role: identity authority **and** literal pixel source for `idle-curious`
- original source background: cream paper texture / opaque image

## Transparent production cutout

Adobe background removal produced a transparent PNG at the same `1024 × 1536` dimensions.

No downscale was reported.

Visual audit result:

- full body preserved;
- hair silhouette preserved;
- glasses, heart, skirt, socks and shoes preserved;
- no visible crop/clipping;
- transparent cutout is suitable for restoration/motion proofing.

## Measured subject/content bounds

Adobe subject selection returned normalized bounds equivalent to:

- `x = 292`
- `y = 113`
- `width = 461`
- `height = 1314`

within the `1024 × 1536` source canvas.

These bounds must be treated as the current preparation measurement and rechecked against the persisted runtime export before implementation is finalized.

## Restoration-mask preparation

The following restoration regions were prepared and visually audited against the approved source:

- `heart`
- `glasses`
- `hairStreak`
- `hair`
- `shirt`
- `skirt`
- `socks`
- `shoes`

### Heart

PASS.

The green heart is cleanly isolated and works as the always-restored anchor.

A stolen-color proof with only the heart left saturated was produced successfully.

### Glasses

PASS FOR PROOFING, with a precision note.

The reliable guided-selection result covers the full visible eyeglass region, including the transparent lens area rather than only the pink frame pixels.

In the selective-restoration proof, the glasses read correctly and strongly at review scale, but the lens interiors also expose underlying full-color face/eye pixels.

Classification:

`MINOR MASK-PRECISION NOTE — NON-BLOCKING FOR MOTION / RUNTIME PROOF; RECHECK BEFORE FINAL PRODUCTION PROMOTION.`

### HairStreak

PASS FOR PROOFING, with a cleanup/readability note.

The source's narrow colored/beaded hair-accent strand is the most reliable independently addressable `hairStreak` presentation target in this master.

Adobe's accessory parsing also detected lower-body accessory/sock content; additional cleanup operations suppressed that content substantially. A small amount of very low-level residual mask information remains in the raw mask near the lower body, but it was not visibly apparent in the actual selective-restoration composite at review scale.

The resulting selective proof clearly restores the colored hair accent while the rest of Maittê remains desaturated.

Classification:

`MINOR MASK-CLEANUP GAP — NON-BLOCKING FOR MOTION / RUNTIME PROOF; BLOCKING FOR FINAL PRODUCTION-ASSET PROMOTION IF VISIBLE AT TARGET SCALE.`

This replaces the earlier failed interpretation that attempted to treat all lighter/golden hair highlights as one separable region; Adobe selected the full hair mass for that prompt and that candidate was rejected.

### Hair

PASS.

The main hair mass is cleanly separated from the face and body while preserving the approved silhouette.

### Shirt

PASS.

Upper-clothes selection cleanly isolates the shirt body and sleeves.

### Skirt

PASS.

Lower-clothes selection cleanly isolates the skirt.

### Socks

PASS.

The two striped socks are independently isolated as the shared `socks` region.

### Shoes

PASS.

Both high-top shoes are cleanly isolated as the shared `shoes` region.

## Restoration composition proof

Adobe was used to validate the masks as actual restoration controls rather than treating selection success alone as evidence.

The following visual proofs were produced:

1. stolen-color Maittê with only the green heart saturated;
2. heart + glasses restored;
3. heart + hairStreak restored;
4. mixed restoration with heart + glasses + hairStreak + skirt restored;
5. untouched full-color source remains the fully-restored visual authority.

All four selective compositions preserved the same approved painting and used desaturation outside the restored mask union.

## Adobe evidence board

Persistent review board:

`https://firefly.adobe.com/boards/id/urn:aaid:sc:US:f4052c3d-24ba-4778-adb2-38b8344b0877`

Board contents include:

- transparent full-color cutout;
- eight restoration-mask candidates;
- heart-only stolen-color proof;
- hairStreak selective proof;
- mixed restoration proof.

The board is evidence / review storage, not a runtime asset dependency.

## Binary-persistence note

The Adobe connector has produced and retained the preparation evidence in the Firefly Board, but the Photoshop processing outputs are currently exposed as connector output URLs rather than repository-native binary files.

Therefore a stable runtime/export persistence step is still required before the future Claude Code BUILD turn.

Do **not** point runtime code at the Adobe Board or temporary Photoshop output URLs.

This is an asset-transport/persistence concern, not a failure of the visual preparation contract.

## Gate 2A disposition

### Approved

- approved source confirmed;
- background removal / transparent cutout validated;
- content bounds measured;
- all eight restoration concepts represented;
- stolen-color heart behavior validated;
- selective and mixed restoration visually demonstrated;
- no identity regeneration occurred;
- no runtime/code/domain change occurred.

### Still open

- stable repository/runtime persistence of the prepared binary files;
- glasses final precision review;
- hairStreak final cleanup/readability review;
- Gate 2B motion-feasibility proof:
  - breathing;
  - blink;
  - heart pulse;
  - hair secondary motion;
  - idle posture life;
  - reduced-motion behavior.

## Current status

`GATE 2A — PASS FOR NEXT-GATE PROOFING`

`FINAL PRODUCTION ASSET PROMOTION — NOT YET AUTHORIZED`

`RUNTIME BUILD — NOT YET STARTED`

## Next action

Proceed to **Gate 2B — Motion Feasibility Proof** using this same approved master and the prepared restoration contract.

Do not start the Claude Code BUILD until Gate 2B decisions are recorded and a unified construction base plus stable binary-asset persistence path are established.
