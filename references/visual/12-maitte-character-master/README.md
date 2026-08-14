# Maittê — Approved Character Master Reference

**Status:** DECIDED — APPROVED CHARACTER IDENTITY MASTER DIRECTION

This folder stores the approved visual identity reference for Maittê used by the production-asset workflow for **Aventuras da Maittê**.

## Canonical file

Upload the approved generated character image to this folder using the filename:

`MAITTE_MASTER_APPROVED.png`

Until that binary is physically present in this folder, treat the missing file only as a temporary `PRODUCTION-ASSET-GAP`. Do not substitute another generated image as canonical identity.

## Authority and role

This folder is governed by:

- `docs/design/VISUAL-ASSET-CONTRACT.md`
- `docs/design/CHARACTER-ART.md`
- `docs/narrative/MAITTE.md`
- `docs/design/ASSET-PRODUCTION-PIPELINE.md`

The approved image in this folder is the primary visual north star for Maittê's production identity. Real-world reference photos under `references/visual/02-maitte-identity/` remain supporting identity evidence, especially for face, age, hair and recognizability.

The image is an **identity master/reference**, not permission to flatten Maittê into one static runtime image for every context.

## IDENTITY_LOCK — non-negotiable traits

Future Maittê production assets must preserve:

- approximately eight-year-old child proportions;
- recognizable facial identity derived from the approved master and identity references;
- dark-brown hair slightly below the shoulders;
- visible fringe/bangs;
- soft waves/curls, especially toward the tips;
- independently controllable subtle lighter hair streak;
- pink glasses as the current canonical MVP direction;
- warm, curious and friendly child expression language;
- skirt as the recurring outfit direction;
- colorful socks;
- unbranded high-top canvas sneakers;
- green heart on the shirt as Maittê's signature hope symbol.

Do not redesign her into baby/chibi proportions, an older/adult-looking character, a generic anime child, or a photorealistic portrait.

## STYLE_LOCK

Preserve the project-wide original visual language:

- 2D storybook / coloring-book illustration;
- handcrafted expressive line work;
- warm rounded shapes;
- enough enclosed regions to support color-restoration behavior;
- light manga/anime influence only in expression and acting;
- no direct imitation of a named artist, studio or copyrighted character design.

The approved master defines Maittê's identity. It does not supersede the broader art-direction specs.

## COLOR_STATE

The production system must support Maittê's stolen-color/restoration arc.

At opening:

- most character regions may appear in stolen-color/line-art treatment;
- the green heart remains saturated and is the primary visual hope anchor.

The following regions must remain independently addressable when production assets are prepared:

- glasses;
- hair streak;
- hair;
- shirt;
- skirt;
- socks;
- shoes.

No permanent restoration order is established by this reference.

## Variant requirement

`MAITTE_MASTER_APPROVED.png` defines the base identity model, not the final complete acting inventory.

Future variants must derive from the same approved identity rather than regenerating Maittê from scratch.

Minimum runtime acting states remain governed by `CHARACTER-ART.md` / `MAITTE.md`, including:

- `idle-curious`;
- `listen-think`;
- `success`;
- `retry-thinking`;
- `move`.

Additional poses such as pointing, surprise, determination, greeting and celebration may be produced later when explicitly approved.

## Scale requirement

The identity must remain recognizable at:

- hero/cutscene scale;
- Challenge Stage scale;
- World Board scale;
- Overworld/home scale;
- future profile/icon scale.

Separate optimized exports are allowed if they preserve the same approved character model.

## Generative policy

Once `MAITTE_MASTER_APPROVED.png` is present and approved here:

- `IDENTITY_LOCK` applies to Maittê;
- pose/expression changes are `GENERATIVE_ALLOWED` only for the requested state;
- face, age, hair model, glasses, clothing model and signature heart are `GENERATIVE_FORBIDDEN` from arbitrary redesign;
- changing the environment or pose does not authorize regenerating Maittê's identity;
- prefer localized editing, compositing, or variants derived from the approved master over full identity regeneration.

## Runtime rule

Gameplay/domain/evaluation/persistence code must not reference this physical filename directly.

Runtime integration must use stable logical presentation identity through the asset registry / presentation seam established in Step 1 and governed by `VISUAL-ASSET-CONTRACT.md`.

The physical file may later be replaced, optimized or split into variants without changing curriculum, evaluator, persistence or progression contracts.

## Approval record

The image to be uploaded as `MAITTE_MASTER_APPROVED.png` was explicitly accepted in product review as the current Maittê master direction.

Storing another image in this folder does **not** automatically approve it. Additional files must be marked `DRAFT`, `REVIEW` or explicitly recorded as `APPROVED` before becoming authoritative.
