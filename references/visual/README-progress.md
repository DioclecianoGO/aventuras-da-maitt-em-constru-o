# Visual Production — Consolidated Checkpoint

**Status:** CURRENT CHECKPOINT — character-production pipeline validated; next front prepared.

## Purpose

This record captures the project state after Maittê Production Proof 01, so later work does not have to reconstruct decisions from chat history, temporary audit branches or screenshots.

## What has been validated

The following end-to-end pipeline has now been demonstrated in the real application:

`approved Character Master`
`-> ChatGPT Images primary character generation/editing`
`-> human product review`
`-> Adobe connector production preparation`
`-> transparent full-color raster + restoration masks`
`-> Claude Code runtime implementation`
`-> external patch/code audit`
`-> isolated GitHub audit branch`
`-> Lovable isolated runtime preview`
`-> real child-facing Challenge Stage`

The proof confirms that authored watercolor character art can replace the technical SVG scaffold behind the existing logical presentation seam without changing gameplay/domain truth.

## Production Proof 01 — result

Target:

`character.maitte.listen-think`

Result:

**PASS — RUNTIME COMPOSITION CONTRACT VALIDATED.**

Validated behavior:

- real transparent Maittê raster renders in the game;
- stolen-color presentation is derived from the same painting;
- the green heart remains saturated from the opening state;
- seven ordinary restoration regions remain independently addressable;
- SVG luminance masks reveal the exact original full-color pixels;
- fully restored presentation bypasses masks and renders the untouched full-color source directly;
- existing restoration facts/selectors remain authoritative;
- `MaitteActor` and `character.maitte.listen-think` remain the stable presentation seam;
- protected gameplay/domain/evaluation/persistence/content layers require no semantic changes;
- isolated Lovable runtime audit reached the real Challenge Stage through normal UI with no clipping, mask seam, halo or page/console error attributable to the proof.

Binding result record:

`references/visual/18-maitte-production-proof-01/PROOF-RESULT.md`

## Important distinction: contract vs final asset polish

The runtime composition contract is validated.

The current `listen-think` proof asset is **not automatically declared final production art in every context**. Remaining asset/layout tuning includes:

- Challenge Stage character scale and framing;
- `hairStreak` small-scale readability and precise mask cleanup before final asset promotion;
- runtime payload/export optimization if needed;
- final motion/microanimation behavior.

These are tuning/production gaps, not failures of the restoration-raster architecture.

## Tool/workflow decision after the proof

### Generation

- ChatGPT Images: **PRIMARY** character generation/editing workflow.
- Gemini / Nano Banana: **FALLBACK**.
- Adobe Firefly: **REJECTED as primary character generator for this production pass**.

### Production preparation

The proof established that manual Photoshop operation is not required for the standard preparation path.

The Adobe connector successfully performed Photoshop-class production operations directly from chat, including:

- background removal/transparency;
- subject/region selection;
- grayscale treatment;
- region masks;
- selective color preservation/reveal;
- proof composites.

Therefore:

- Adobe connector: **VALIDATED PRIMARY PREPARATION PATH for standard operations**;
- Photoshop/manual precision editing: **FALLBACK / precision-finishing path** when connector outputs are insufficient.

### Engineering and preview

- Claude Code: implementation/planning and test execution.
- GitHub: source-of-truth and external audit boundary.
- Lovable: isolated product/runtime preview after audited code is available remotely.

## Runtime proof branch and preview governance

The audited implementation was reproduced on the remote branch:

`feat/maitte-production-proof-01-runtime-audit`

The main branch was intentionally kept unchanged during the proof.

A separate Lovable remix was used for product/runtime inspection, rather than modifying the original Lovable project or merging the proof into `main` before approval.

This isolation pattern is now a proven review technique for risky visual-runtime changes.

## Motion / microanimation — newly explicit production concern

Character quality is not complete when only the static illustration is correct.

The following must be treated as an explicit character-production concern:

- breathing / subtle torso movement;
- eye blinking;
- green-heart pulse;
- subtle hair movement;
- small idle posture shifts;
- microexpression/cue changes appropriate to acting state;
- success/retry/listen/attention reactions where applicable.

These motions are presentation behavior, not independent gameplay state.

Canonical motion notes/spec:

`docs/design/CHARACTER-MOTION.md`

## Next official visual front

The next character-production front is:

**Maittê principal / Overworld presence.**

Workspace:

`references/visual/19-maitte-overworld-main/README.md`

The master already exists; the next phase must first identify the current runtime call sites and presentation semantics before replacing anything.

## Immediate backlog

- [x] close character generator benchmark;
- [x] validate Adobe preparation pipeline;
- [x] validate restoration-raster runtime architecture;
- [x] externally audit code and full 11-state mask matrix;
- [x] validate real Challenge Stage rendering in isolated Lovable preview;
- [ ] tune current `listen-think` scale/framing in Challenge Stage;
- [ ] clean/strengthen `hairStreak` for final small-scale production readability;
- [ ] define/validate production microanimation contract;
- [ ] inspect current Maittê principal/Overworld presentation seam;
- [ ] prepare and integrate Maittê principal using the validated production workflow.

## Governance

Do not reopen the generator benchmark unless a specific asset exposes a real production failure.

Do not mass-convert all states/characters merely because Proof 01 passed.

Advance one audited vertical slice at a time, preserving stable logical keys and deriving all visual restoration from existing source facts.