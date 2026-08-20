# Gate 2B — Maittê `idle-curious` Motion Feasibility

**Disposition:** PASS WITH HAIR MOTION-PREPARATION GAP

**Runtime BUILD remains unauthorized until the pre-BUILD integration gate is closed.**

This gate evaluates whether the approved `MAITTE_MASTER_APPROVED.png` / prepared `idle-curious` raster can support the living-motion requirements recorded in `docs/design/CHARACTER-MOTION.md` without replacing the approved identity source or changing restoration/gameplay semantics.

## Evidence

Adobe Firefly Board:

`https://firefly.adobe.com/boards/id/urn:aaid:sc:US:53ef5755-c0c2-4a80-8844-45ea14d55522`

The board contains the prepared full-color cutout, eye-selection proofs, rejected generative blink attempts, deterministic blink-underlay proof, heart/hair masks and aligned face crops used during this audit.

## Binding principle

`restoration-raster` remains the color/restoration core.

Motion is presentation-only. Motion must not:

- change which restoration regions are restored;
- create persisted motion state;
- replace the approved full-color source as the static pixel authority;
- force a broad character rig when a small overlay/transform is sufficient.

For `animated=false` / reduced motion, fully restored rendering remains the untouched approved full-color source.

## 1. Breathing

**Result: PASS — NO NEW ART REQUIRED.**

Recommended technique:

- subtle transform on the whole composited character;
- feet/bottom anchor remains stable;
- very small vertical/scale amplitude;
- the transform wraps the final composition rather than independently moving restoration layers.

This can preserve the exact same raster and restoration masks.

Reduced motion: breathing stops or becomes effectively static.

## 2. Idle posture life / micro-sway

**Result: PASS — NO NEW ART REQUIRED.**

Treat this as part of the same whole-character ambient transform system used for breathing rather than a separate rig.

Do not add a second competing motion loop merely to create more movement.

## 3. Green-heart pulse

**Result: PASS — NO NEW AUTHORED ART REQUIRED.**

The existing heart mask is sufficient as the spatial authority.

Correct presentation contract:

- the approved full-color source remains the base image;
- the pulse is heart-localized;
- when a separate heart overlay is needed, derive it from the same approved source pixels through the heart mask;
- do not pulse/scale the entire Maittê image;
- do not change restoration semantics.

For partial/stolen states the heart can remain its own always-restored presentation layer.

For fully restored + `animated=true`, a heart-only overlay may be rendered above the direct source image. At its neutral state the overlay must visually collapse into / coincide with the approved source.

Reduced motion: stop the pulse or reduce it to a static emphasis.

## 4. Blink

**Result: PASS FOR BUILD PROOF — DETERMINISTIC COMPOSITING CONTRACT SELECTED.**

### Rejected approach: full-frame generative blink

Adobe produced visually natural closed-eye candidates, proving that the expression itself is compatible with Maittê. However, every generative attempt repainted unrelated pixels, including skin, glasses, hair and/or mouth. Even a single-eye crop drifted outside the eyelid.

Therefore:

**Full-frame or face-region generative blink assets are rejected for runtime.**

They remain evidence/reference material only.

### Accepted approach: approved-source deterministic blink

The selected blink contract uses only the approved prepared source plus a mask derived from that same source.

Adobe produced a clean combined `Eyes + Pupil` mask on the approved `1024 × 1536` source. Its measured normalized bbox is:

- x: `0.4306640625`
- y: `0.20572916666666666`
- width: `0.1455078125`
- height: `0.01953125`

A deterministic neutral eye-underlay was also proven by applying processing only inside this mask. The underlay is **not intended to be displayed alone**; close-up evidence confirms that a flat/neutral eye area is insufficient by itself.

The runtime blink must instead compose:

1. the untouched approved Maittê raster as the persistent base;
2. a blink underlay exposed only inside the eye mask during the blink window;
3. the ORIGINAL approved eye pixels, clipped by the same `Eyes + Pupil` mask, temporarily rendered as an overlay;
4. a vertical `scaleY`/squash of that original-eye overlay toward a thin line around the shared eye-center Y, then reversed.

The compressed approved eye pixels create the visible eyelid/lash line while the underlay prevents the open eyeball in the persistent base from showing through.

### Required invariants

At neutral/rest state:

- the underlay is not visible;
- no replacement eye asset is visible;
- the user sees the untouched approved master exactly.

During blink:

- only the eye-zone presentation changes;
- glasses, face, hair and all other approved pixels remain the master;
- restoration semantics do not change;
- no generative face pixels are used;
- blink duration remains brief and presentation-only.

At full closure:

- the original eye overlay should not collapse to absolute zero if doing so removes the lash/eyelid cue; target a small non-zero `scaleY` determined by runtime visual proof.

Reduced motion:

- blink may be disabled unless retained for legibility/naturalness after accessibility review.

### Status distinction

The **asset/architecture problem is solved**: no authored closed-eye bitmap is required.

The exact `scaleY`, transform origin, duration and cadence remain **runtime visual-tuning parameters** and must be verified in Gate 3/Gate 5 at Overworld, World Board and Challenge Stage sizes.

## 5. Hair secondary motion

**Result: NOT SOLVED BY THE CURRENT FLAT SOURCE — `MOTION-ASSET-GAP`.**

The current hair mask proves that the hair can be selected as a region, but independent movement is not equivalent to restoration masking.

A simple transformed duplicate of the hair pixels would leave the original hair underneath and can create:

- double/ghost edges;
- exposed holes when moving away from the original position;
- misregistration against the face/shoulders;
- mismatch between stolen/grayscale and restored/color states.

The approved flat source does not currently include a clean underpaint behind independently moving hair.

Therefore independent hair sway is **not authorized yet** merely by applying a transform to the existing hair mask.

Production options for a later motion-preparation pass include:

- authored hair layer + compatible underpaint;
- a narrowly segmented motion-only curl/tip treatment with proven no-ghost behavior;
- another presentation technique demonstrated visually before integration.

For the first vertical slice, whole-character breathing/idle life may move the hair together with Maittê, but this is not classified as independent hair secondary motion.

Hair secondary motion remains an explicit production backlog item and must not be silently forgotten.

## 6. `hairStreak` / colored hair accent

**Result: RESTORATION PASS; INDEPENDENT MOTION NOT YET PROMOTED.**

The accent is visually separable and more legible here than in the earlier `listen-think` proof.

However, moving a duplicated accent while the original static accent remains in the base image can also create a doubled/ghosted strand, especially in fully restored state.

Do not treat the existing restoration mask as automatic authorization for motion.

## 7. Microexpression / acting-state transitions

**Result: NO NEW RIG REQUIRED FOR THIS SLICE.**

The existing acting-state seam remains the higher-level expression mechanism.

`idle-curious` motion should not attempt to recreate other acting states through deformation of one raster.

A small transition-settling treatment may be considered later, but no additional authored asset is justified by this gate.

## 8. Reduced-motion contract

Required behavior:

- breathing / idle sway: disabled or near-static;
- heart pulse: disabled or static emphasis;
- hair secondary motion: disabled;
- blink: may remain only if the final implementation is judged necessary for legibility/naturalness; otherwise static eyes are preferred;
- restoration state remains unchanged regardless of motion preference.

## Gate 2B decision matrix

| Motion | Decision | Additional authored asset? |
|---|---|---|
| Breathing | PASS | No |
| Idle posture / micro-sway | PASS | No |
| Heart pulse | PASS | No — use approved source + heart mask |
| Blink | PASS FOR BUILD PROOF | No authored closed-eye art — use master + `Eyes/Pupil` mask + deterministic underlay + original-eye squash |
| Hair secondary motion | OPEN / GAP | Likely yes — layer/underpaint or another proven technique |
| `hairStreak` independent sway | OPEN / GAP | Possibly; restoration mask alone is insufficient |
| Microexpression | Existing acting-state seam remains primary | No for first slice |

## Recommended production scope for the first runtime slice

Safe first-slice motion scope:

- breathing / idle life;
- heart-localized pulse;
- deterministic blink contract described above;
- reduced-motion behavior.

Hair secondary motion remains a named follow-up production requirement unless a dedicated motion-preparation pass proves a clean technique before the runtime slice is promoted.

## Remaining pre-BUILD requirements

Before Claude Code BUILD is authorized:

1. establish stable binary persistence for the Gate 2A core prepared assets and the additional `Eyes + Pupil` blink mask / underlay evidence needed by the selected blink composition;
2. establish one unified construction base containing current `main` governance and the audited `restoration-raster` implementation;
3. keep hair secondary motion explicitly tracked as unresolved rather than silently implementing a ghost-prone transform.

## Final status

`GATE 2B MOTION FEASIBILITY — PASS FOR BREATHING / HEART / BLINK; HAIR SECONDARY MOTION REMAINS OPEN`
