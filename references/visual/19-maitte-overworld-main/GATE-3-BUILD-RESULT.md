# Maittê `idle-curious` — Gate 3 Build Result

**Status:** GATE 3 IMPLEMENTED — AWAITING EXTERNAL CODE/ASSET AUDIT AND ISOLATED LOVABLE REVIEW

Binding specs:

`docs/design/CHARACTER-MOTION.md`, `docs/design/MAITTE-PRODUCTION-PROOF-01.md`,
`docs/design/COLOR-RESTORATION.md`, `docs/design/CHARACTER-PRODUCTION-WORKFLOW-DECISION.md`,
`PREBUILD-INTEGRATION-GATE.md`, `GATE-2A-PROOF-RESULT.md`, `GATE-2B-MOTION-FEASIBILITY.md`.

## Branch / commit

- Implementation branch: `feat/maitte-idle-curious-prebuild`
- Authorized starting head: `5bd30bafc0220c44051a699738e2dba3a3fddfea`
- Implementation commit: `febc3b2c3742e6e808d71f715ce8e1ce7e9846cc`
- `main`: **NOT modified.**

## Runtime key promoted

Exactly and only:

`character.maitte.idle-curious`

No new logical key was created. `MaitteActor`, `MaitteAvatar`, `ChallengeStageShell` were not modified — the existing Overworld/World Board/Challenge-Stage-default call sites reach the new asset with zero code changes to any of them.

## Restoration-raster reuse

The validated `restoration-raster` `IllustrationAsset` kind (from Production Proof 01 / `listen-think`) is reused unchanged for its color/restoration core: grayscale base + per-region SVG-masked reveal for partial states, direct untouched-source render once every configured region is restored. The 8-region mask map (`heart`, `glasses`, `hairStreak`, `hair`, `shirt`, `skirt`, `socks`, `shoes`) is `satisfies Record<CharacterRegionId, string>`-checked. `sourceContentBox = {x:292, y:113, width:461, height:1314}` and `renderBox = MAITTE_BOX` are used exactly as recorded in `GATE-2A-PROOF-RESULT.md`.

## Motion results

An optional, strictly additive `motion` field was added to the asset type (absent on `listen-think`, present here), gated entirely behind `animated`.

- **Breathing:** PASS. Whole-composite transform reusing the existing `.maitte-breathe` class/keyframe, anchored `center bottom`. No new art.
- **Heart-localized pulse:** PASS. Never a whole-character transform — the pulse wraps only the heart's own masked reveal layer (partial branch) or a small additive heart-only overlay layered on top of the untouched fully-restored image (bypass branch, base image itself never touched). Origin measured from the persisted heart mask's own bounding box.
- **Deterministic blink:** PASS FOR BUILD PROOF. No generative/authored closed-eye art — composes the approved source, the `eyes+pupil` mask, and the blink underlay only, reusing the existing `.maitte-blink` squash keyframe. Grayscale-matched with the base whenever the character is not fully restored, so no colour eye/face pixels leak over an otherwise desaturated figure.
- **Reduced motion:** All three reused classes (`maitte-breathe`, `maitte-blink`, `heart-pulse`) are already covered by the existing `@media (prefers-reduced-motion: reduce)` override in `src/styles.css` — verified by a dedicated structural test, not a new accessibility mechanism.
- **Hair secondary motion:** **NOT implemented.** No hair/hairStreak transform, duplicate layer, or underpaint was added. This remains an explicit, open `MOTION-ASSET-GAP` per `GATE-2B-MOTION-FEASIBILITY.md` — not solved, not faked.

## Static full-restored invariant

Preserved exactly, with the static/animated split required by the binding external-approval correction: `animated=false` (or an asset with no `motion` field) renders the untouched approved source as the single `<image>`, no filter, no masks — byte-identical to `listen-think`'s own guarantee. `animated=true` may add non-destructive heart-pulse/blink overlays on top, verified to leave the base image itself untouched.

## Validation

- **TypeScript:** clean (`tsc --noEmit`, zero errors).
- **Full test suite:** 213/213 passing (34 new tests added this gate; zero regressions).
- **ESLint:** zero new errors, zero new warnings vs. the pre-existing repository baseline.
- **Production build (`npm run build`):** **PASS**, exit 0. Both the client and SSR Vite builds, plus the Nitro/Cloudflare worker packaging step, completed without error. All 20 persisted Maittê PNGs (11 `idle-curious` + 9 `listen-think`) — including the two motion-only files (`maitte-idle-curious-mask-eyes-pupil.png`, `maitte-idle-curious-blink-underlay.png`) — resolved and were correctly hashed/bundled in both the client and SSR asset manifests.
- **Protected-layer diff** (`src/game/domain`, `src/game/evaluation`, `src/game/persistence`, `src/game/state`, `src/game/content` vs. `origin/main`): **0 lines.**

## Known gaps carried forward (not addressed by this gate)

- **Glasses mask precision** (lens interiors expose underlying face/eye pixels at the edge) — per `GATE-2A-PROOF-RESULT.md`, non-blocking for this proof, blocking for final production promotion.
- **`hairStreak` mask cleanup/small-scale readability** — per `GATE-2A-PROOF-RESULT.md`, same classification.
- **Independent hair/hairStreak secondary motion** — per `GATE-2B-MOTION-FEASIBILITY.md`, explicit open `MOTION-ASSET-GAP`.

## Real-scale visual tuning — still pending

Exact blink `scaleY`/cadence/duration and heart-pulse amplitude were reused verbatim from the existing vector scaffold's already-tuned keyframe values, not re-tuned. Real-scale visual verification at Overworld (`scale=0.5`), World Board (`scale=0.66`), and Challenge Stage has **not** been performed in this gate — deferred to the isolated Lovable/external-audit review, consistent with the Gate 3 build authorization's instruction not to tune scale/framing during implementation.

## Production promotion

**NOT authorized by this record.** This is an implementation/validation checkpoint only.

## Disposition

`GATE 3 IMPLEMENTED — AWAITING EXTERNAL CODE/ASSET AUDIT AND ISOLATED LOVABLE REVIEW`
