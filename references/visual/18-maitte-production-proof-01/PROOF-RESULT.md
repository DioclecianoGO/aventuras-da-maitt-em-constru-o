# Maittê Production Proof 01 — Result Record

**Status:** PASS — RUNTIME COMPOSITION CONTRACT VALIDATED / CONTRACT PROMOTED

Binding spec:

`docs/design/MAITTE-PRODUCTION-PROOF-01.md`

## Scope

Target:

`character.maitte.listen-think`

This proof validated production preparation and runtime composition only for this acting state. It did not authorize mass conversion of all Maittê states or companions.

## Identity and proof source

Identity authority:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

Proof source:

`references/visual/17-character-production-benchmark/maitte-listen-think/maitte-listen-think-chatgpt-candidate-01.png`

## Adobe production-preparation result

The preparation proof was executed directly through the Adobe/Photoshop connector rather than by manual Photoshop operation.

Validated:

- transparent full-character cutout;
- full-color authored raster preserved;
- grayscale/stolen presentation derived from the same raster;
- always-on green heart;
- independent masks for `glasses`, `hairStreak`, `hair`, `shirt`, `skirt`, `socks`, `shoes`;
- mixed partial-restoration composites;
- preservation of the original watercolor pixels rather than independent recoloring/redrawing.

This established the Adobe connector as a viable standard preparation path. Manual Photoshop remains available for precision cleanup/finishing when necessary.

## Physical contract validated

Canonical proof/runtime asset set:

```text
maitte-listen-think-full-color.png
maitte-listen-think-mask-heart.png
maitte-listen-think-mask-glasses.png
maitte-listen-think-mask-hair-streak.png
maitte-listen-think-mask-hair.png
maitte-listen-think-mask-shirt.png
maitte-listen-think-mask-skirt.png
maitte-listen-think-mask-socks.png
maitte-listen-think-mask-shoes.png
```

Validated presentation contract:

1. use one transparent full-color raster as the authoritative pixel source;
2. derive stolen/base presentation by grayscale/desaturation of that same raster;
3. keep the heart saturated via its always-on mask;
4. reveal exact original full-color pixels through independent luminance masks for active restoration regions;
5. when every configured region is restored, bypass the masks and render the untouched full-color source directly;
6. keep restoration derived from existing facts/selectors — no persisted decorative state.

Classification:

**PASS — CONTRACT PROMOTED.**

## Runtime implementation proof

The audited runtime implementation demonstrated:

- `character.maitte.listen-think` remains the stable logical key;
- `MaitteActor` remains the presentation seam;
- `Illustration` gained a `restoration-raster` representation rather than special-casing Challenge Stage logic;
- SVG-native masks use per-instance IDs;
- mask geometry uses explicit user-space coordinates;
- mask semantics explicitly use luminance;
- source/content bounds are used to frame the authored raster without editing the source PNG;
- fully restored output is the original full-color image by construction;
- other Maittê acting states remain on the existing scaffold;
- Burpee, Pipoca, Will and Lyra are not converted by this proof;
- protected gameplay/domain/evaluation/persistence/state/content layers are unchanged.

The externally audited implementation was reproduced on:

`feat/maitte-production-proof-01-runtime-audit`

Remote audit commit:

`50f18ecb62984241512429219ffc35132a2be87c`

The proof implementation remained isolated from `main` during product review.

## Test/code audit result

External patch audit confirmed the intended narrow scope and architecture.

Final Claude Code validation reported:

- 179/179 tests passing in the audited implementation environment;
- TypeScript clean;
- no new ESLint problems relative to the existing repository baseline;
- protected-layer diff empty.

A complete independent-region screenshot matrix validated:

- stolen / heart-only;
- glasses;
- hairStreak;
- hair;
- shirt;
- skirt;
- socks;
- shoes;
- two mixed combinations;
- fully restored.

## Real Lovable runtime audit

Because the Lovable Variant endpoint was unavailable, an isolated **remix** was used as the product-review environment rather than modifying the original Lovable project.

The remix fetched and applied the exact audited GitHub branch snapshot.

Normal child-facing navigation reached the real Challenge Stage without a temporary route/harness:

`/`
`-> first SEGUIR A TRILHA world`
`-> /mundo/world-placeholder`
`-> pedra esculpida / slot-1`
`-> /mundo/world-placeholder/desafio/slot-1`

At the real Challenge Stage:

- `listen-think` was reached naturally as the initial acting state;
- live DOM rendered nested raster `<image>`/`<mask>` composition rather than `MaitteFigure` vector paths;
- stolen state rendered with the character desaturated and the green heart saturated;
- no clipping was observed;
- no heart-edge halo/seam was observed;
- no page/console error attributable to the proof was observed;
- no 4xx/5xx response occurred on the audited stage route.

## Runtime size/framing finding

The real Challenge Stage audit exposed a product/layout tuning issue that the isolated technical matrix could not answer.

At a 1280 × 1800 audit viewport, Maittê rendered at approximately 96 × 176 px in the lower-right Stage position.

Result:

- technically correct and legible;
- compositionally small relative to the Stage;
- reads more as a corner presence than strong protagonist co-presence.

Classification:

**LAYOUT / SCALE TUNING GAP — NON-BLOCKING FOR CONTRACT PROMOTION.**

Do not solve this by modifying the source character art. Tune presentation scale/framing in a separately scoped product pass.

## `hairStreak` finding

The mask is technically independent and renders through the validated contract.

The known automatic-selection cleanup residual remains, and the region is subtle at Challenge Stage scale.

Classification:

**MASK COMPOSITION PASS / SMALL-SCALE READABILITY + CLEANUP GAP.**

This remains blocking for declaring the current proof export a fully polished final production asset, but it does not block promotion of the composition contract.

## Motion / microanimation finding

The proof validated static authored-raster restoration composition.

It did **not** validate final production motion.

Named next concerns include:

- breathing;
- eye blinking;
- green-heart pulse;
- subtle hair movement;
- idle posture life;
- acting-state transition/microexpression behavior.

Canonical motion spec:

`docs/design/CHARACTER-MOTION.md`

Classification:

**PRODUCTION MOTION GAP — EXPLICIT NEXT-PHASE CONCERN.**

## Performance / optimization

Proof source/full-color dimensions: 1024 × 1536 px.

The proof is intentionally higher-resolution than the current Stage display size. Runtime export downscaling/optimization may be evaluated later if needed, provided watercolor quality and mask registration remain intact.

No optimization decision is required to validate the composition contract.

## Final disposition

**PASS — CONTRACT PROMOTED.**

What is promoted:

- one authored transparent full-color raster;
- runtime stolen/base desaturation of that same source;
- always-on heart luminance mask;
- independent restoration luminance masks;
- direct full-color bypass when all regions are restored;
- stable logical-key / Actor / Illustration presentation architecture;
- derived restoration with no independent persisted visual state.

What is **not** promoted as fully finished by this disposition:

- final Challenge Stage scale/framing;
- final `hairStreak` mask cleanup/small-scale readability;
- final production animation/motion rig;
- all other Maittê acting states;
- companions;
- broad Overworld production replacement.

## Next official front

`references/visual/19-maitte-overworld-main/README.md`

The next task is to inspect and plan the **principal Maittê / Overworld presentation seam** using the now-validated production workflow.

Step 2C is not implicitly authorized by this proof beyond that explicitly scoped character-production inspection.