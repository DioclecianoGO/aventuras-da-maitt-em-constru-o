# Maittê Main / Overworld — Production Front

**Status:** GATE 5 PASS WITH TUNING REQUIRED — READY FOR PRODUCT DECISION; final production promotion remains pending known asset-cleanup gaps and product/framing decisions.

## Purpose

Open the next character-production front after Maittê Production Proof 01.

The target is the **principal Maittê presence**, including the version that appears in the Overworld and other central/default contexts.

This is not a new generator benchmark. It applies the production workflow already validated by `listen-think` to the protagonist's main persistent presentation.

## Preconditions already satisfied

- Maittê Character Master exists and remains identity authority;
- `MAITTE_MASTER_APPROVED.png` is explicitly approved as the literal source for `character.maitte.idle-curious`;
- ChatGPT Images remains the primary character-generation workflow when generation is actually needed;
- Adobe connector preparation is validated;
- one-full-color-raster + luminance-mask restoration composition is technically validated;
- Claude Code implementation/audit workflow is validated;
- isolated Lovable runtime preview is validated as a product-review gate.

## Gate 1 — runtime target — COMPLETE

The exact runtime target is confirmed as:

`character.maitte.idle-curious`

Current logical path:

`OverworldScene / WorldBoardScene / ChallengeStageShell`
`-> MaitteAvatar or MaitteActor`
`-> character.maitte.idle-curious`
`-> assetRegistry`

The same state is therefore relevant in three real contexts, but Gate 5 clarified an important distinction:

- Overworld uses `idle-curious`;
- World Board uses `idle-curious`;
- Challenge Stage may contain an `idle-curious` board/background Maittê, but its primary stage actor follows the existing route state machine (`listen-think` before the first attempt, then `success` / `retry-thinking`).

No new `maitte-overworld-default` logical key is authorized.

## Identity authority

Use the already-approved Maittê Character Master as the identity source of truth **and as the literal approved pixel source for `idle-curious`**.

Canonical source:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

Do not regenerate another idle-curious pose.

Do not regenerate identity from the current technical `MaitteFigure` scaffold.

The scaffold may inform:

- state semantics;
- current call-site geometry;
- presentation hooks;
- restoration-region semantics;
- existing animation behavior.

It must not become the artistic source of truth.

## Production direction

Current validated direction:

`MAITTE_MASTER_APPROVED.png`
`-> Adobe connector preparation`
`-> transparent production raster`
`-> restoration masks`
`-> motion feasibility proof`
`-> repository-native asset persistence`
`-> unified restoration-raster construction base`
`-> stable existing logical key / Actor seam`
`-> Overworld + World Board + Challenge Stage regression review`

Do not create separate redrawn partial-restoration versions.

Preserve the restoration vocabulary:

- heart — always saturated;
- glasses;
- hairStreak;
- hair;
- shirt;
- skirt;
- socks;
- shoes.

Restoration order remains outside the asset and must stay configurable.

## Gate 2A — core production preparation — COMPLETE

Detailed result:

`references/visual/19-maitte-overworld-main/GATE-2A-PROOF-RESULT.md`

Completed through the Adobe connector without manual Photoshop operation:

- transparent cutout from the approved master;
- source/content bounds measurement;
- heart mask;
- glasses mask;
- hairStreak mask candidate;
- hair mask;
- shirt mask;
- skirt mask;
- socks mask;
- shoes mask;
- stolen-color heart-only proof;
- selective restoration proofs;
- mixed restoration proof.

Measured preparation bounds inside the `1024 × 1536` canvas:

- x: `292`
- y: `113`
- width: `461`
- height: `1314`

Adobe evidence board:

`https://firefly.adobe.com/boards/id/urn:aaid:sc:US:f4052c3d-24ba-4778-adb2-38b8344b0877`

Known precision notes remain for final promotion:

- glasses selection currently covers the visible lens region as well as frame pixels; visually acceptable for proofing, but final precision must be rechecked;
- hairStreak is mapped to the narrow colored/beaded hair-accent strand; tiny low-level raw-mask residual remains a cleanup concern if it becomes visible at target scale.

These are **not** reasons to regenerate the Maittê source.

### Gate 2A asset persistence — COMPLETE

The prepared binaries are repository-native files on the feature branch.

Detailed provenance and integrity records:

- `references/visual/19-maitte-overworld-main/ASSET-PERSISTENCE.md`
- `references/visual/19-maitte-overworld-main/RUNTIME-ASSET-SHA256.txt`

The Adobe Boards are evidence only and are not runtime dependencies.

## Scale and framing are first-class acceptance concerns

Production Proof 01 showed that an asset can be technically correct while still requiring composition tuning in the real interface.

Gate 5 measured rather than guessed:

- Overworld `idle-curious`: approximately `82.2 × 123.7 CSS px` at the primary `1280 × 1800` audit viewport;
- World Board `idle-curious`: approximately `108–122 × 164–184 CSS px`, varying with the ambient parent-scene animation;
- Challenge Stage primary actor remains the existing state-machine-driven `listen-think`/`success`/`retry-thinking`, not an `idle-curious` resting actor.

A main protagonist presence should read as intentional co-presence, not merely as a technically visible corner asset. Final acceptance of the Overworld/Board scale is therefore a product decision.

## Gate 2B — motion / microanimation feasibility — COMPLETE WITH HAIR GAP

Detailed result:

`references/visual/19-maitte-overworld-main/GATE-2B-MOTION-FEASIBILITY.md`

Adobe evidence board:

`https://firefly.adobe.com/boards/id/urn:aaid:sc:US:53ef5755-c0c2-4a80-8844-45ea14d55522`

Binding motion specification:

`docs/design/CHARACTER-MOTION.md`

Validated decisions:

- breathing / idle life: **PASS**, whole-character presentation transform, no new art;
- green-heart pulse: **PASS**, heart-localized overlay from approved source + heart mask, no whole-character pulse;
- blink: **PASS FOR BUILD PROOF**, using a deterministic approved-source composition rather than a generative closed-eye bitmap;
- hair secondary motion: **MOTION-ASSET-GAP**, because the flat source has no underpaint and moving a duplicated hair layer would risk ghosting/holes/misregistration;
- hairStreak independent sway: not promoted automatically from its restoration mask;
- microexpression: existing acting-state seam remains primary for the first slice;
- reduced-motion behavior is defined for all of the above.

### Blink contract

Full-frame and face-region generative blink candidates were explicitly rejected because they repainted unrelated approved pixels.

The selected blink architecture uses:

1. untouched approved master as the persistent base;
2. an `Eyes + Pupil` mask derived from that same master;
3. a neutral blink underlay exposed only inside that eye mask during the blink window;
4. the original approved eye pixels clipped by the same mask and vertically squashed toward a thin line, then reopened.

At rest, the underlay is invisible and the approved master is seen unchanged.

No generative face pixels are authorized in runtime.

Gate 5 observed the real blink cycle in runtime without a blocking visual defect.

### Full-restored invariant

For `animated=false` / reduced-motion:

- the untouched full-color approved source remains the pixel-identity authority.

For `animated=true`:

- non-destructive presentation overlays may be used only when they preserve restoration semantics and do not replace unrelated approved pixels.

The green-heart pulse must be heart-localized; a whole-character pulse is not authorized.

The blink must remain eye-localized and deterministic; full-frame generative swapping is forbidden.

## Pre-BUILD integration gate — COMPLETE

Detailed checkpoint:

`references/visual/19-maitte-overworld-main/PREBUILD-INTEGRATION-GATE.md`

Completed on isolated branch:

`feat/maitte-idle-curious-prebuild`

The gate closed both prerequisites:

1. stable repository persistence of the `idle-curious` raster/masks/blink inputs;
2. reconciliation of current `main` governance with the externally audited Production Proof 01 `restoration-raster` implementation.

The audited restoration implementation was reconciled from:

`feat/maitte-production-proof-01-runtime-audit`

source audit commit:

`50f18ecb62984241512429219ffc35132a2be87c`

through PR #25, with pre-BUILD merge commit:

`a23b4dc71e2838645239abf6b9afe3ac6f2c264a`

## Gate 3 — implementation — COMPLETE

Detailed result:

`references/visual/19-maitte-overworld-main/GATE-3-BUILD-RESULT.md`

Implemented behind the existing `character.maitte.idle-curious` seam:

- restoration-raster production source and 8-region restoration contract;
- breathing / idle life;
- heart-localized pulse;
- deterministic eye-localized blink;
- reduced-motion behavior.

Hair secondary motion remains an explicit open `MOTION-ASSET-GAP` and was not implemented.

Production build, TypeScript, 213/213 tests, lint-regression check and protected-layer diff all passed.

## Gate 4 — external audit — COMPLETE / PASS

Detailed result:

`references/visual/19-maitte-overworld-main/GATE-4-EXTERNAL-AUDIT.md`

The externally audited implementation patch remains:

`d567de2d67d6938d6c8a76c07e19a5b5460b72437ef314770fc958bbc16fb67f`

No blocking code/architecture defect was found.

## Gate 5 — isolated Lovable runtime review — COMPLETE WITH TUNING REQUIRED

Detailed result:

`references/visual/19-maitte-overworld-main/GATE-5-LOVABLE-RUNTIME-REVIEW.md`

Isolated preview:

`https://id-preview--31fef5b8-b281-4d41-a29b-59473f19f6c6.lovable.app`

Disposition:

`GATE 5 PASS WITH TUNING REQUIRED — READY FOR PRODUCT DECISION`

Validated in the real child-facing runtime:

- `idle-curious` restoration-raster resolution in Overworld and World Board;
- heart-only stolen-color semantics;
- breathing;
- localized heart pulse;
- deterministic blink;
- reduced-motion fallback;
- existing `listen-think` Challenge Stage behavior remains intact.

Gate 5 also identified:

- small breathing foot lift (~1 px) from `translateY(-1.5px)`;
- World Board viewport drift inherited from the ambient parent-scene animation, not the character renderer;
- Challenge Stage primary resting actor is not `idle-curious` under current DECIDED state wiring;
- ~6 px shoe clipping for the existing Challenge Stage actor at `1280 × 1800`, not reproduced at `1440 × 900`;
- a separate `SpeechBubble` hard-load hydration mismatch on the Challenge Stage route.

## Acceptance criteria status

1. identity clearly matches the approved Character Master — **PASS**;
2. real authored raster replaces only the intended technical scaffold seam — **PASS**;
3. existing gameplay/restoration facts remain authoritative — **PASS**;
4. heart/restoration behavior remains correct — **PASS**;
5. scale/framing reads intentionally in all relevant contexts — **PRODUCT DECISION / TUNING PENDING**;
6. no idle-curious clipping, blocking halo, mask drift or asset-loading error — **PASS** for Overworld/Board; separate Challenge Stage/listen-think clipping tracked;
7. breathing, heart pulse and blink coexist with raster production representation — **PASS**;
8. blink uses approved-source pixels/masks plus deterministic presentation treatment — **PASS**;
9. reduced-motion behavior is defined and verified — **PASS**;
10. unresolved hair secondary motion is not silently represented as complete — **PASS**;
11. other Maittê states/companions are unaffected — **PASS**;
12. external audit and isolated Lovable preview — **PASS / PASS WITH TUNING REQUIRED**.

## Out of scope for the first slice

- mass-converting every Maittê acting state;
- replacing every companion;
- redesigning the entire Overworld;
- changing curriculum/progression/domain semantics;
- defining a permanent restoration reward order;
- a broad skeletal/mesh animation rig;
- regenerating another idle-curious identity/pose;
- pretending independent hair sway is solved without compatible underpaint/layer evidence.

## Immediate next step

Make the product/spec decisions identified by Gate 5 before any final production promotion or merge to `main`:

1. accept or tune Overworld/World Board protagonist scale/framing;
2. accept or tune the ~1 px breathing foot lift;
3. correct the Challenge Stage acceptance language to match the existing state machine rather than forcing `idle-curious` into that context;
4. track Challenge Stage/listen-think clipping separately;
5. track the `SpeechBubble` direct-load hydration mismatch separately;
6. keep glasses-mask precision, `hairStreak` cleanup/readability and independent hair motion open until final production promotion.

Do not merge this branch to `main` until the product decision closes the Gate 5 tuning items.
