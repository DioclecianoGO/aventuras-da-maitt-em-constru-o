# Burpee — Approved Character Master

**Status:** DECIDED — APPROVED CHARACTER IDENTITY MASTER DIRECTION

This folder contains the approved production identity master for **Burpee** in **Aventuras da Maittê**.

The approved master was explicitly accepted in product review on **2026-08-14** after comparison against:

- the preferred illustrated Burpee representation previously approved as the strongest character reference;
- real-world Burpee photographs used as anatomy, markings and recognizability support;
- the project-wide visual language already locked for Maittê and the world.

## Canonical approved filename

Store the approved binary exactly as:

`BURPEE_MASTER_APPROVED.png`

Once that binary is present under this exact path, it is the primary production identity reference for Burpee:

`references/visual/13-burpee-character-master/BURPEE_MASTER_APPROVED.png`

Do not rename it casually. Runtime code must not depend on this physical filename directly.

## Authority and supporting references

This folder is governed by:

- `docs/design/VISUAL-ASSET-CONTRACT.md`
- `docs/design/VISUAL-PRODUCTION-STEP-2-GATE.md`
- `docs/design/CHARACTER-ART.md`
- `docs/design/ASSET-PRODUCTION-PIPELINE.md`
- `references/visual/07-burpee-identity/`

Authority for Burpee visual production is:

1. `BURPEE_MASTER_APPROVED.png` — primary Character Master / identity north star;
2. preferred approved illustrated Burpee reference — style/character support;
3. `07-burpee-identity/` real-world photographs — anatomy, fur pattern and recognizability evidence;
4. written character/design specs — behavioral and production constraints.

If prose and the approved master differ on a purely visual question already resolved by the approved master, do not silently redesign the character from prose.

Burpee is an individual project character, not a generic mascot and not permanently assigned to one school subject.

## IDENTITY_LOCK — DECIDED

Future Burpee production assets must preserve the approved model rather than regenerating his identity independently for every pose.

Locked traits include:

- blue-merle Border Collie identity;
- athletic collie-like canine proportions;
- elongated canine muzzle and correct dog nose placement;
- strong white chest/ruff;
- semi-prick / folded-tip collie ears;
- feathered canine tail;
- recognizable blue-merle patch/value structure;
- bright blue eyes;
- black/gray/white facial markings consistent with the approved master and real references;
- friendly, alert and intelligent facial model;
- clear canine silhouette at small/tablet scale.

At Challenge Stage scale, Burpee must never plausibly read as a cat, fox or generic small animal.

The approved master intentionally keeps Burpee expressive and approachable while retaining enough individual detail to remain recognizable.

## STYLE_LOCK — DECIDED

Preserve the same original project-wide character language used by the approved Maittê master:

- original 2D storybook / coloring-book illustration;
- warm, hand-authored feel;
- rounded but anatomically readable forms;
- expressive confident line work;
- subtle paper/paint texture where appropriate;
- clear silhouette at tablet scale;
- light manga/anime influence only in expression and acting;
- enough closed/detail regions to coexist with the color-restoration language;
- no photorealism;
- no direct imitation of a named artist, studio or copyrighted character design.

Burpee must feel like he belongs in the same illustrated universe as Maittê.

## Approved base acting read

The approved master establishes Burpee's neutral/default personality read as:

- friendly;
- alert;
- intelligent;
- curious;
- energetic without looking uncontrolled;
- supportive and child-friendly.

His default master pose is a neutral seated pose suitable for identity inspection. It is not a requirement that every runtime variant remain seated.

## Acting variants

The shared companion acting contract remains:

- `idle`;
- `speak`;
- `listen/watch`;
- `success-reaction`;
- `retry/hint-reaction`.

Optional later enrichments may include look-at-object, entrance/exit, tail motion, ear motion, blink or breathing when presentation needs justify them.

**Rule:** acting variants must derive from this same approved identity. A new pose is not authorization to redesign the face, merle pattern, muzzle, ears, body proportions or species read.

## COLOR_STATE / stolen-color requirement

Burpee's identity must survive the project's stolen-color opening state.

Therefore:

- merle pattern/value structure must remain readable in line-art or reduced-saturation treatment;
- species and identity cannot depend only on blue/gray coloration;
- blue eyes are an important identity feature, but eye color alone cannot carry recognizability;
- any future restoration state remains presentation-derived and must not introduce authoritative persisted visual state.

The exact restoration granularity for Burpee remains outside this master-identity decision.

## Scale requirement

The approved model must remain recognizable at:

- Overworld/home scale;
- World Board scale;
- Challenge Stage/guide scale;
- future profile/icon scale.

Separate optimized exports are allowed when they preserve the same approved identity model.

## Generative policy

`BURPEE_MASTER_APPROVED.png` is now the identity anchor.

For future generated or edited variants:

### GENERATIVE_ALLOWED

- requested pose changes;
- requested expression/acting changes;
- localized ear/tail/body movement consistent with the pose;
- scale/export optimization;
- color-restoration variants;
- scene lighting and environmental integration when identity remains unchanged.

### GENERATIVE_FORBIDDEN without explicit re-approval

- changing Burpee's species read;
- replacing the blue-merle pattern with a substantially different identity pattern;
- changing the facial model or muzzle proportions arbitrarily;
- changing eye color away from the approved identity when color is visible;
- changing ear construction into feline/fox-like ears;
- changing the body into a chibi puppy or generic mascot form;
- independently regenerating Burpee from scratch for each scene;
- treating a newly generated variant as a new canonical identity without review.

Prefer localized editing/composition or variants derived from the approved master over full identity regeneration.

## Runtime rule

The physical file `BURPEE_MASTER_APPROVED.png` is a production/reference asset, not a gameplay/domain dependency.

Runtime integration must resolve Burpee through stable logical presentation keys under the `character.burpee.*` namespace (or another explicitly approved presentation-only contract) through the asset registry/presentation seam.

Gameplay, curriculum, evaluator, persistence and progression code must never know this physical filename.

Do not implement Burpee runtime migration merely because the approved master exists. Runtime integration requires a separately audited **Step 2B-M2** construction plan/seam.

## Approval record

**2026-08-14 — APPROVED / DECIDED**

The generated Burpee Character Master was explicitly accepted as the production identity direction.

Production state after binary upload:

**`BURPEE_MASTER_APPROVED.png` = PRIMARY BURPEE CHARACTER MASTER / IDENTITY NORTH STAR**

Next authorized planning target after the binary is present and verified:

**STEP 2B-M2 — BURPEE PRESENTATION / VARIANT INTEGRATION PLAN**
