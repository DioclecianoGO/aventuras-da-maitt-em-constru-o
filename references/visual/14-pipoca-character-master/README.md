# Pipoca — Character Master Reference

**Status:** PROVISIONAL — AWAITING EXPLICIT CHARACTER MASTER APPROVAL

This folder is reserved for the production identity master for **Pipoca** in **Aventuras da Maittê**.

No image stored here becomes canonical merely by being uploaded. Pipoca's master becomes authoritative only after explicit product review records it as `APPROVED` / `DECIDED`.

## Canonical approved filename

When a master is explicitly approved, store the approved binary exactly as:

`PIPOCA_MASTER_APPROVED.png`

Until that approved binary exists, classify the missing final master as:

**`PRODUCTION-ASSET-GAP`**

Do not substitute the neutral companion fallback, a generic white small-dog illustration, or an arbitrary generation as canonical identity.

## Authority and supporting references

This folder is governed by:

- `docs/design/VISUAL-ASSET-CONTRACT.md`
- `docs/design/VISUAL-PRODUCTION-STEP-2-GATE.md`
- `docs/design/CHARACTER-ART.md`
- `docs/design/ASSET-PRODUCTION-PIPELINE.md`
- `references/visual/08-pipoca-identity/`

Before approval, candidate production should combine two complementary sources:

1. the strongest previously approved illustrated Pipoca representation from the project north-star material — visual/character direction;
2. `08-pipoca-identity/` real-world photographs — anatomy, coat, face and recognizability evidence.

Neither source alone authorizes a new canonical master without explicit product approval.

Pipoca is an individual project character, not a generic mascot and not permanently assigned to one school subject.

## IDENTITY_LOCK — required traits

The approved Pipoca master must read visually as **Pipoca**, a small white Maltese-type dog, without relying on a text label.

Preserve:

- small canine proportions appropriate to a Maltese-type dog;
- white coat with soft, slightly wavy/curly texture rather than a smooth short coat;
- compact but clearly canine muzzle;
- dark expressive eyes;
- black nose;
- floppy/drop ears integrated into the white coat silhouette;
- soft feathered coat around face, chest, legs and tail;
- small companion scale distinct from Burpee's athletic Border Collie proportions;
- recognizable face/coat cues supported by the real Pipoca references.

At Challenge Stage scale, Pipoca must not plausibly read as a cat, fox, Westie, poodle, generic spitz or generic white plush animal.

## STYLE_LOCK

Preserve the same original project-wide character language used by the approved Maittê and Burpee masters:

- original 2D storybook / coloring-book illustration;
- warm rounded forms;
- expressive, confident line work;
- clear silhouette at tablet scale;
- light manga/anime influence only in expression and acting;
- enough closed/detail regions to coexist with the project's color-restoration language;
- no photorealism;
- no direct imitation of a named artist, studio or copyrighted character design.

Pipoca must feel like he belongs in the same illustrated universe as Maittê and Burpee.

## Acting identity

Pipoca's personality direction is adventurous, energetic and brave/exploratory, while remaining supportive and child-friendly.

The shared companion acting contract remains:

- `idle`;
- `speak`;
- `watch` / listen;
- `success-reaction`;
- `retry-reaction` / hint support.

Do not create a separate visual identity from scratch for each acting state. Variants must derive from the same approved Pipoca master.

## COLOR_STATE / stolen-color requirement

Pipoca's identity must remain recognizable in the project's initial stolen-color / line-art state.

Because his real coat is already white, recognizability cannot depend on saturation alone. Therefore:

- silhouette, coat texture, ears, face, eyes/nose value structure and body proportions must carry identity;
- line art must preserve the distinction between white coat and empty paper/background through ink/value/detail rather than arbitrary fill color;
- any future restoration treatment remains presentation-derived and must not introduce authoritative persisted visual state.

The exact restoration granularity for Pipoca is not decided by this README.

## Scale requirement

The approved identity must remain readable at:

- Overworld/home scale;
- World Board scale;
- Challenge Stage/guide scale;
- future profile/icon scale.

Separate optimized exports are allowed when they preserve the same approved model.

## Generative policy

Before approval, generated candidates are `DRAFT` or `REVIEW` only.

After `PIPOCA_MASTER_APPROVED.png` is explicitly approved:

- `IDENTITY_LOCK` applies to Pipoca;
- pose/expression changes may vary only the requested acting dimension;
- species anatomy, facial model, coat silhouette/texture, proportions, ears, muzzle, tail and recognizable identity cues are `GENERATIVE_FORBIDDEN` from arbitrary redesign;
- changing Maittê, environment or pose does not authorize regenerating Pipoca's identity;
- prefer localized editing/composition or variants derived from the approved master over full identity regeneration.

## Runtime rule

The physical file `PIPOCA_MASTER_APPROVED.png` must never become a domain/gameplay dependency.

Runtime integration will use stable presentation identity under the logical `character.pipoca.*` namespace through the existing companion presentation seam once separately planned and audited.

Do not implement Pipoca runtime migration merely because a candidate master image exists.

## Approval record

Current state:

**No Pipoca generated Character Master is approved yet.**

Expected review sequence:

1. inspect the preferred illustrated Pipoca reference plus real Pipoca identity references;
2. produce one neutral/base master candidate with `IDENTITY_LOCK` + `STYLE_LOCK`;
3. review species readability, scale and individual recognizability;
4. record explicit approval or rejection;
5. only after approval, derive acting variants and plan runtime integration.
