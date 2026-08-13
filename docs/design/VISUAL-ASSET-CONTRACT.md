# Visual Asset Contract

**Status:** DECIDED production-asset boundaries and locking semantics; exact physical asset files, export formats and final pose inventory remain PROVISIONAL unless explicitly approved.

## Purpose

This contract sits between authored visual production and runtime composition for **Aventuras da Maittê**.

It extends `ASSET-PRODUCTION-PIPELINE.md` and the Step 1 production presentation seam. The goal is to make approved character/environment identity durable across tools, image-generation iterations and runtime implementations without leaking physical file paths or visual state into educational/domain logic.

The binding flow is:

`approved visual identity/reference -> stable logical asset key -> asset registry -> Illustration/presentation renderer -> scene composition -> derived restoration/acting/hit areas -> gameplay facts`

Educational/domain/evaluation/persistence code must not know which PNG, WebP, SVG, layered export or renderer physically implements a visual identity.

## 1. Logical identity is stable; physical files are replaceable

**DECIDED:** gameplay/presentation configuration references stable logical asset keys, not production filenames.

A physical file may be replaced, re-exported or optimized without changing curriculum, evaluator rules, persistence facts, mastery evidence or routes.

Examples of logical namespaces include:

- `environment.overworld.*`
- `environment.science.*`
- `character.maitte.*`
- `character.burpee.*`
- `character.pipoca.*`
- `character.will.*`
- `character.lyra.*`
- `landmark.*`
- `object.*`
- `stage-skin.*`

The exact final key inventory remains PROVISIONAL. The namespace/identity principle is DECIDED.

## 2. Static assets vs identity/variant assets

### Static illustration assets

A static visual key represents one stable visual output for the current context, for example a stage background, landmark or decorative layer.

A static key may be promoted from a concept vector component to an authored raster/vector asset by changing its registry descriptor while preserving the call site.

### Identity/variant assets

Characters, companions and stateful scenery are not equivalent to one static image.

**DECIDED:** an approved identity must not be collapsed into one raster file when runtime behavior requires distinct acting, scale, restoration or visual states.

Examples include:

- Maittê `idle-curious`, `listen-think`, `success`, `retry-thinking`, `move`;
- companion `idle`, `speak`, `listen/watch`, `success-reaction`, `retry/hint-reaction`;
- slot/object states such as current, future and completed;
- stolen-color vs partially restored character/environment states.

The runtime may resolve variants through separate logical keys, a variant-aware descriptor or another approved presentation-only representation. The domain/evaluator must remain unaware of that choice.

## 3. Character Masters

**DECIDED:** production character work must establish approved Character Masters for:

- `MAITTE_MASTER`
- `BURPEE_MASTER`
- `PIPOCA_MASTER`
- `WILL_MASTER`
- `LYRA_MASTER`

A Character Master is the approved visual model used to preserve identity across poses, expressions, scales and later generated/edited assets. It is not necessarily one single file; it may be a reviewed sheet/set when that better preserves the model.

`MAITTE.md` and `CHARACTER-ART.md` remain authoritative for identity traits and required acting states.

Until a Character Master is explicitly approved, absence of final art is classified as:

**`PRODUCTION-ASSET-GAP`**

It must not be silently filled by treating concept SVG scaffolding or an arbitrary new generation as canonical identity.

## 4. Visual locking semantics

The following labels govern visual-production prompts, reviews and handoffs.

### `IDENTITY_LOCK`

An explicitly approved subject identity must be preserved across new poses/scenes/exports. For a character, this includes proportions, face language, hair/fur pattern, species readability, recurring clothing/accessories and other approved identity traits.

### `STYLE_LOCK`

The project-wide approved visual language must remain coherent: original 2D storybook/coloring-book illustration, warm rounded forms, expressive line work, light manga/anime influence, no photorealism and no direct imitation of a named living artist/studio.

### `COMPOSITION_REFERENCE`

A reference governs spatial organization, framing, density, route readability or scene arrangement. It does **not** automatically replace an approved character identity.

### `ENVIRONMENT_LOCK`

An approved environment/world composition or landmark language must be preserved when generating/editing related production layers, except for explicitly requested localized changes.

### `COLOR_STATE`

Defines whether a production output represents stolen-color line art, partial restoration or restored color. Initial Overworld state remains predominantly black ink on white/light warm paper, with Maittê's green heart as the primary saturated opening anchor.

### `GENERATIVE_ALLOWED`

A generation/edit operation may create or vary the explicitly named unlocked aspect.

### `GENERATIVE_FORBIDDEN`

The operation must not regenerate, reinterpret or replace an approved locked aspect merely because another part of the scene changes.

## 5. Generation/editing policy

**DECIDED:** once an approved asset/master exists, later production work should preserve it rather than regenerate the entire identity from prose.

When changing only one dimension, prefer:

1. localized editing of the affected region/state;
2. composition using the approved master and approved environment layers;
3. a new variant derived from the same approved identity model;
4. full-scene regeneration only when the requested scope genuinely requires it and locked identities can still be preserved.

A request such as “change Maittê's pose” must not implicitly authorize redesigning her face, hair, glasses, clothing model, age/proportions, pets or environment.

A request such as “change the Overworld geography” must not implicitly authorize replacing approved character identities.

## 6. Approved north stars are references, not runtime backgrounds

The two complementary approved visual north stars under:

`references/visual/11-visual-production-slice-01-output/`

must be inspected together.

They govern complementary concerns:

- strongest approved character treatment -> character quality/model direction;
- strongest approved connected black-and-white map -> world continuity, biome transitions, scenic density and colorable-detail language.

**DECIDED:** neither image is a permanent flattened runtime background and neither should be traced into one giant React SVG scene.

Runtime production must remain composable enough for restoration, characters, foreground, hit areas and future asset replacement.

## 7. Scene layer ownership

For visual production, the preferred Overworld/Board composition order is:

1. page/paper base;
2. environment/terrain base;
3. regions/biomes;
4. landmarks and environmental detail;
5. restoration units/layers;
6. characters/companions/lackeys;
7. foreground accents;
8. invisible interaction/hit areas.

This is a presentation model, not a mandatory one-file-per-layer rule.

Persisted gameplay facts remain authoritative. Visual restoration is derived.

## 8. Accessibility role

**DECIDED:** production assets are classified by semantic ownership rather than forcing every visual file to expose independent text.

Use one of these presentation roles:

- `decorative` — meaning is already supplied elsewhere; hidden from assistive semantics;
- `informative` — the asset itself carries meaning that requires an accessible label/description;
- `scene-owned` — semantics belong to the containing scene/interactive region rather than the individual layer.

The exact TypeScript representation of these roles remains PROVISIONAL until implementation requires it.

## 9. Renderer and platform independence

**DECIDED:** logical asset identity must not depend on the current physical renderer.

The current MVP renderer is React/web presentation (`svg`, `image`, `img`, CSS and authored assets). A future platform-specific renderer may map the same logical identity to a different physical implementation without changing domain/evaluation contracts.

Mobile packaging strategy is governed separately and is not part of this visual contract's current build scope.

## 10. Review/approval rule

An asset becomes authoritative only when it is explicitly approved in a specification, an approved reference README/status record, or another review artifact whose approval is unambiguous.

Storage in an output folder alone does not make an image canonical.

For every reviewed production asset, record when relevant:

- logical identity/key;
- approval state;
- source/reference set;
- locks that apply;
- intended runtime scale/context;
- color state;
- accessibility role;
- known variant requirements.

## 11. Acceptance criteria

This contract is satisfied when:

1. approved identities survive pose/scene changes without arbitrary redesign;
2. runtime code refers to logical presentation identity rather than physical file paths across gameplay/domain layers;
3. static authored assets can replace concept scaffolding without evaluator/persistence changes;
4. stateful/character assets use an explicit variant/identity model rather than one flattened replacement image;
5. missing production art is surfaced as `PRODUCTION-ASSET-GAP`;
6. restoration continues to derive from gameplay facts;
7. generation tools are treated as replaceable production tools, not as architecture or source of truth;
8. approved north-star imagery guides production without becoming a permanent flattened runtime scene.