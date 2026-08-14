# Pipoca — Character Master Reference

**Status:** DECIDED — APPROVED CHARACTER IDENTITY MASTER

This folder contains the approved production identity master for **Pipoca** in **Aventuras da Maittê**.

The canonical approved binary is:

`PIPOCA_MASTER_APPROVED.png`

This file is now the **PRIMARY PIPOCA CHARACTER MASTER / IDENTITY NORTH STAR** for future production work.

Its approval records identity and visual direction only. It does **not** make the PNG a runtime sprite and does **not** authorize Step 2C.

## Authority and supporting references

This folder is governed by:

- `docs/design/VISUAL-ASSET-CONTRACT.md`
- `docs/design/VISUAL-PRODUCTION-STEP-2-GATE.md`
- `docs/design/CHARACTER-ART.md`
- `docs/design/ASSET-PRODUCTION-PIPELINE.md`
- `references/visual/08-pipoca-identity/`

The approved master was reviewed against two complementary sources:

1. the strongest preferred illustrated Pipoca representation from the project north-star material — visual/character direction;
2. `08-pipoca-identity/` real-world photographs — anatomy, coat, face and recognizability evidence.

Pipoca is an individual project character, not a generic mascot and not permanently assigned to one school subject.

## IDENTITY_LOCK — approved traits

The approved Pipoca master must remain recognizably **Pipoca**, a small white Maltese-type dog, without relying on a text label.

Lock the following traits:

- small canine proportions appropriate to a Maltese-type dog;
- white coat with soft, slightly wavy/curly texture rather than a smooth short coat;
- compact but clearly canine muzzle;
- dark expressive eyes;
- black nose;
- floppy/drop ears integrated into the white coat silhouette;
- soft feathered coat around face, chest, legs and tail;
- small companion scale distinct from Burpee's athletic Border Collie proportions;
- recognizable face/coat cues supported by the real Pipoca references;
- cheerful, alert and approachable baseline expression.

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

Pipoca's personality direction is **adventurous, energetic and brave/exploratory**, while remaining supportive and child-friendly.

The shared companion acting contract remains:

- `idle`;
- `speak`;
- `watch` / listen;
- `success-reaction`;
- `retry-reaction` / hint support.

Do not create a separate visual identity from scratch for each acting state. All variants must derive from this approved master.

## COLOR_STATE / stolen-color requirement

Pipoca's identity must remain recognizable in the project's initial stolen-color / line-art state.

Because his real coat is already white, recognizability cannot depend on saturation alone. Therefore:

- silhouette, coat texture, ears, face, eyes/nose value structure and body proportions must carry identity;
- line art must preserve the distinction between white coat and empty paper/background through ink/value/detail rather than arbitrary fill color;
- any future restoration treatment remains presentation-derived and must not introduce authoritative persisted visual state.

The exact restoration granularity for Pipoca is **not decided** by this README and remains a separate production/runtime design concern.

## Scale requirement

The approved identity must remain readable at:

- Overworld/home scale;
- World Board scale;
- Challenge Stage/guide scale;
- future profile/icon scale.

Separate optimized exports are allowed when they preserve the same approved model.

## Generative policy

`PIPOCA_MASTER_APPROVED.png` is now under **IDENTITY_LOCK**.

Future generated or edited variants may change only the requested acting/presentation dimension.

The following are `GENERATIVE_FORBIDDEN` from arbitrary redesign:

- species anatomy;
- facial model;
- coat silhouette and texture;
- proportions;
- ears;
- muzzle;
- tail;
- recognizable individual identity cues.

Changing Maittê, environment, world, pose or camera angle does not authorize regenerating Pipoca's identity from scratch.

Prefer localized editing/composition or variants derived from the approved master over full identity regeneration.

## Runtime rule

The physical file `PIPOCA_MASTER_APPROVED.png` must never become a domain/gameplay dependency.

Runtime integration will use stable presentation identity under the logical `character.pipoca.*` namespace through the existing companion presentation seam once separately planned and audited.

Do not use this master PNG directly as a runtime sprite merely because it is approved.

## Approval record

**Approval:** DECIDED / APPROVED

**Approved file:** `PIPOCA_MASTER_APPROVED.png`

**Approved on:** 2026-08-14

**Meaning of approval:**

- Pipoca identity master is now canonical;
- future variants must derive from this identity;
- runtime migration is still a separate Step 2B-M3 engineering task;
- companion restoration/stolen-color behavior remains a `PRODUCTION-ASSET-GAP` until separately designed;
- Step 2C remains locked until all required Character Masters are approved or explicitly dispositioned by the gate.
