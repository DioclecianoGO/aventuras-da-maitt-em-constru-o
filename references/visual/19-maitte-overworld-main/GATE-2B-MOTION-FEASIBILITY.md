# Gate 2B — Maittê `idle-curious` Motion Feasibility

**Disposition:** PASS WITH MOTION-PREPARATION GAPS

**Runtime BUILD remains unauthorized.**

This gate evaluates whether the approved `MAITTE_MASTER_APPROVED.png` / prepared `idle-curious` raster can support the living-motion requirements recorded in `docs/design/CHARACTER-MOTION.md` without replacing the approved identity source or changing restoration/gameplay semantics.

## Evidence

Adobe Firefly Board:

`https://firefly.adobe.com/boards/id/urn:aaid:sc:US:53ef5755-c0c2-4a80-8844-45ea14d55522`

The board contains the prepared full-color cutout, eye-selection proof, blink candidate, heart/hair masks and aligned face crops used during this audit.

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

**Result: CONDITIONAL PASS — `MOTION-PREPARATION-GAP`.**

Adobe produced a visually natural closed-eye blink candidate from the approved cutout. This proves that the intended expression is visually compatible with the Maittê master.

However, the generated candidate is **not approved as a full-frame runtime replacement**.

Observed technical evidence:

- approved prepared source: `1024 × 1536`;
- generative blink output: `1248 × 1888`;
- normalizing/reframing the blink output back to `1024 × 1536` does not restore pixel identity outside the eye area;
- face crops show small changes in glasses/face/hair rendering around the intended eye edit.

Therefore:

**Forbidden:** swap the entire approved source for the generated blink frame during a blink.

**Potentially valid:** use the blink candidate only as source material for a tightly localized eye-zone overlay, masked/clipped so the approved master remains authoritative everywhere else.

The original eye-selection proof is narrow and clean. A production blink still needs one of the following before promotion:

1. a production-quality eye-zone overlay aligned to the approved master; or
2. another locally authored blink representation that changes only the eye zone.

The current full-frame generative blink candidate is **reference/proof material only**.

If no production-quality local blink representation is available, the first runtime slice may safely degrade to static eyes rather than introduce whole-face drift.

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
- blink: may remain only if the final implementation is judged necessary for legibility rather than decorative motion; otherwise static eyes are preferred;
- restoration state remains unchanged regardless of motion preference.

## Gate 2B decision matrix

| Motion | Decision | Additional authored asset? |
|---|---|---|
| Breathing | PASS | No |
| Idle posture / micro-sway | PASS | No |
| Heart pulse | PASS | No — use approved source + heart mask |
| Blink | CONDITIONAL PASS | Yes, local eye-zone production overlay or equivalent |
| Hair secondary motion | OPEN / GAP | Likely yes — layer/underpaint or another proven technique |
| `hairStreak` independent sway | OPEN / GAP | Possibly; restoration mask alone is insufficient |
| Microexpression | Existing acting-state seam remains primary | No for first slice |

## Recommended production scope for the first runtime slice

The first build should be architecturally ready for presentation-only motion but must not fake unresolved motion assets.

Safe first-slice motion scope:

- breathing / idle life;
- heart-localized pulse;
- reduced-motion behavior;
- optional blink hook only if a local production blink asset is prepared before build completion.

Hair secondary motion remains a named follow-up production requirement unless a dedicated motion-preparation pass proves a clean technique before the runtime slice is promoted.

## Remaining pre-BUILD requirements

Before Claude Code BUILD is authorized:

1. establish stable binary persistence for the Gate 2A core prepared assets;
2. establish one unified construction base containing current `main` governance and the audited `restoration-raster` implementation;
3. decide whether blink is required in the first slice or remains a motion follow-up;
4. keep hair secondary motion explicitly tracked as unresolved rather than silently implementing a ghost-prone transform.

## Final status

`GATE 2B MOTION FEASIBILITY — PASS WITH BLINK/HAIR MOTION-PREPARATION GAPS`
