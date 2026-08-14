# Burpee — Character Master Reference

**Status:** PROVISIONAL — AWAITING EXPLICIT CHARACTER MASTER APPROVAL

This folder is reserved for the production identity master for **Burpee** in **Aventuras da Maittê**.

No image stored here becomes canonical merely by being uploaded. Burpee's master becomes authoritative only after explicit product review records it as `APPROVED` / `DECIDED`.

## Canonical approved filename

When a master is explicitly approved, store the approved binary as:

`BURPEE_MASTER_APPROVED.png`

Until that approved binary exists, classify the missing final master as:

**`PRODUCTION-ASSET-GAP`**

Do not substitute current SVG scaffolding, a generic dog illustration, or an arbitrary generation as canonical identity.

## Authority and supporting references

This folder is governed by:

- `docs/design/VISUAL-ASSET-CONTRACT.md`
- `docs/design/VISUAL-PRODUCTION-STEP-2-GATE.md`
- `docs/design/CHARACTER-ART.md`
- `docs/design/ASSET-PRODUCTION-PIPELINE.md`
- `references/visual/07-burpee-identity/`

The real-world references under `07-burpee-identity/` are the primary identity/anatomy evidence until an approved generated master is recorded here.

Burpee is an individual project character, not a generic mascot and not permanently assigned to one school subject.

## IDENTITY_LOCK — required traits

The approved Burpee master must read visually as a **blue-merle Border Collie-type dog** without relying on a text label.

Preserve the combined identity cues defined by `CHARACTER-ART.md`:

- canine head/body anatomy;
- athletic collie-like proportions;
- elongated canine muzzle and correct dog nose placement;
- recognizable collie ruff/chest fur;
- semi-prick or folded-tip canine ears rather than feline/fox-like ears;
- feathered canine tail with plausible attachment/posture;
- blue-merle patch/value structure;
- blue eyes where the current color state allows;
- recognizable markings derived from Burpee's real-world identity references.

At Challenge Stage scale, Burpee must not plausibly read as a cat, fox or generic small animal.

## STYLE_LOCK

Preserve the same original project-wide character language used by Maittê:

- original 2D storybook / coloring-book illustration;
- warm rounded forms;
- expressive, confident line work;
- clear silhouette at tablet scale;
- light manga/anime influence only in expression and acting;
- enough closed/detail regions to coexist with the project's color-restoration language;
- no photorealism;
- no direct imitation of a named artist, studio or copyrighted character design.

Burpee must feel like he belongs in the same illustrated universe as the approved Maittê master.

## Acting identity

Burpee's personality direction is strategic, intelligent and observant, but acting must remain supportive and child-friendly rather than stern.

The shared companion acting contract remains:

- `idle`;
- `speak`;
- `listen/watch`;
- `success-reaction`;
- `retry/hint-reaction`.

Optional future enrichments such as curiosity/look-at-object, entrance/exit, tail/ear motion or blink/breath require no new domain semantics.

Do not create a separate visual identity from scratch for each acting state. Variants must derive from the same approved Burpee master.

## COLOR_STATE / stolen-color requirement

Burpee's blue-merle identity must remain recognizable even when saturation is absent or reduced.

Therefore:

- merle pattern/value structure must survive line-art/stolen-color treatment;
- species readability must not depend only on blue/gray coloration;
- blue eyes may appear where the approved restoration/color state allows, but eye color alone cannot carry identity;
- future restoration implementation remains presentation-derived and must not introduce authoritative persisted visual state.

The exact restoration granularity for Burpee is not decided by this README.

## Scale requirement

The approved identity must remain readable at:

- Overworld/home scale;
- World Board scale;
- Challenge Stage/guide scale;
- future profile/icon scale.

Separate optimized exports are allowed when they preserve the same approved model.

## Generative policy

Before approval, generated candidates are `DRAFT` or `REVIEW` only.

After `BURPEE_MASTER_APPROVED.png` is explicitly approved:

- `IDENTITY_LOCK` applies to Burpee;
- pose/expression changes may vary only the requested acting dimension;
- species anatomy, facial model, fur pattern, proportions, ears, muzzle, ruff, tail and recognizable markings are `GENERATIVE_FORBIDDEN` from arbitrary redesign;
- changing Maittê, environment or pose does not authorize regenerating Burpee's identity;
- prefer localized editing/composition or variants derived from the approved master over full identity regeneration.

## Runtime rule

The physical file `BURPEE_MASTER_APPROVED.png` must never become a domain/gameplay dependency.

Runtime integration will use stable presentation identity under the logical `character.burpee.*` namespace (or another later-approved presentation-only variant contract) through the asset registry/presentation seam.

Do not implement Burpee runtime migration merely because a candidate master image exists. Production integration requires a separately audited construction step.

## Approval record

Current state:

**No Burpee generated Character Master is approved yet.**

Expected review sequence:

1. inspect real Burpee identity references;
2. produce one neutral/base master candidate with `IDENTITY_LOCK` + `STYLE_LOCK`;
3. review species readability and individual recognizability;
4. record explicit approval or rejection;
5. only after approval, derive acting variants and plan runtime integration.
