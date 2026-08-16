# Character Production Asset Benchmark

**Status:** DECIDED benchmark method and sequencing; winning tool, exact physical formats, pose inventory and production exports remain PROVISIONAL until benchmark review.

## Purpose

Step 2B established approved character identity masters and stable presentation seams so temporary technical SVG scaffolds can be replaced without changing gameplay/domain contracts.

The next visual-production decision is **not** to improve those SVGs until they resemble final illustration. The next decision is to determine which available image-production workflow best preserves the approved Character Masters while producing usable acting-state variants with the intended storybook/watercolor texture.

This benchmark chooses a **production tool/workflow**, not an architecture. Tool choice remains replaceable and cannot redefine approved identity.

## Preconditions

Before benchmark execution:

1. Maittê, Burpee, Pipoca, Will and Lyra Character Masters are explicitly approved and stored under their canonical reference folders;
2. the five character presentation seams/scaffolds are integrated on `main`;
3. `VISUAL-ASSET-CONTRACT.md` and `ASSET-PRODUCTION-PIPELINE.md` remain binding;
4. Step 2C Overworld production composition remains **NOT STARTED** during this benchmark.

## Binding identity hierarchy

For production-character variants, authority is:

`approved Character Master -> approved locks/spec -> reviewed production variant -> logical character.<id>.<state> key -> Actor -> scene`

The current technical scaffold may provide pose/structure guidance, but it is **not** an identity or texture authority.

A coding assistant must not attempt to recreate the approved watercolor/storybook character by expanding manual JSX/SVG paths and call that final production art.

## Benchmark sequence

### Round 1 — Maittê `listen-think`

**DECIDED:** the first benchmark target is **Maittê — `listen-think`**.

Rationale:

- Maittê is the protagonist and therefore the highest-value visual identity in the product;
- the production workflow must prove that it can preserve her exact recognizable identity before it is trusted for supporting characters;
- `listen-think` requires a meaningful acting-state change without being an extreme action pose, making it a strong first test of identity preservation under controlled transformation;
- the state is useful at Challenge Stage scale and tests whether the approved storybook/watercolor language survives at runtime-relevant size;
- the neutral approved master is already close to an idle identity reference, so `listen-think` tests whether the tool can change acting while keeping the same child rather than merely reproducing the master.

#### Identity input

Primary authority:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

#### Pose/structure input

The rendered `MaitteFigure` / `MaitteActor` `listen-think` technical scaffold may be supplied **only as POSE / STRUCTURE GUIDANCE** when useful.

It must not override:

- Maittê's face model and recognizability;
- approximately 8-year-old proportions;
- dark-brown hair, fringe and approved curl/wave treatment;
- independently recognizable lighter hair streak;
- pink glasses;
- approved shirt/skirt/socks/high-top-sneaker identity;
- green heart as the identity/hope anchor;
- approved palette;
- storybook/watercolor texture and ink language.

If a tool can accept only one reference, the Character Master has priority over the scaffold render.

### Round 2 — Lyra `watch`

**DECIDED:** Lyra — `watch` is the second benchmark round and serves as the **identity-drift stress test** before a production workflow is promoted for broader use.

Why Lyra/watch remains required:

- Lyra has unusually strong asymmetric identity evidence in her face and tricolor coat distribution;
- `watch` requires a meaningful pose/expression change while preserving recognizability;
- the result must remain clearly distinct from Will despite both being adult domestic cats;
- this round tests whether the workflow that performs well on the human protagonist also preserves irregular animal markings rather than randomizing them.

Identity authority:

`references/visual/16-lyra-character-master/LYRA_MASTER_APPROVED.png`

The rendered `LyraArt` `watch` state may be supplied only as pose/structure guidance and never as identity, texture or production-quality authority.

## Candidate workflows

The benchmark compares the same target across the available production-capable workflows:

1. **ChatGPT Images** — image editing / controlled variant generation from the approved Character Master;
2. **Gemini image generation/editing (Nano Banana family where available)** — multi-reference or image-to-image variant workflow;
3. **Adobe Firefly / Photoshop generative workflow** — generation/editing using the approved master, with Photoshop available for reference-image, masking and finishing workflows.

Photoshop is also the preferred neutral finishing environment for masks, transparency, localized cleanup, layer preparation and export comparison regardless of which generative engine wins.

Illustrator may support vector masks, overlays, icons or deliberately simple authored vector assets, but is **not** required merely because the current placeholders are SVG. The approved watercolor/storybook texture has priority over preserving SVG as a physical production format.

Claude, Claude Code, Codex, Copilot and Lovable remain implementation/specification/integration assistants unless a separately approved benchmark explicitly evaluates an image-production capability. They are not identity authorities.

## Controlled benchmark protocol

Each generative candidate receives the same functional brief and equivalent reference material as closely as the tool permits.

### Round 1 protocol — Maittê `listen-think`

Minimum protocol per candidate workflow:

1. generate **3 initial Maittê `listen-think` candidates** from the same approved identity target;
2. select the strongest candidate from that tool without changing the scoring rules;
3. perform **1 localized correction round** on a deliberately identified defect or detail — for example hair streak, glasses, hand anatomy, facial expression or clothing detail — to test preservation of unaffected regions;
4. export or capture the best result at production-comparable resolution;
5. evaluate at both review size and approximate Challenge Stage size;
6. do not manually repaint a weak candidate before scoring the generator itself; finishing effort is scored separately.

### Round 2 protocol — Lyra `watch`

Run the same 3-candidate + 1-localized-correction protocol using Lyra's approved master and `watch` target. This second round is required before declaring the primary workflow sufficiently robust for broad character production.

If a tool cannot support a required capability, record that as a workflow limitation rather than silently changing the benchmark.

## Common production prompt constraints — Maittê Round 1

The first benchmark brief must lock at minimum:

- same Maittê as the approved Character Master;
- preserve recognizable face and approximately 8-year-old proportions;
- preserve dark-brown hair, fringe, curl/wave treatment and lighter streak;
- preserve pink glasses;
- preserve shirt with green heart, skirt, colorful socks and unbranded high-top canvas sneakers;
- preserve warm original 2D storybook/coloring-book language with watercolor texture and confident ink contours;
- change **only** the acting pose/expression needed for `listen-think` plus explicitly authorized structural adjustments;
- expression should read attentive, thoughtful and curious, never sad, punished or confused in a negative way;
- no photorealism;
- no age drift toward toddler, teenager or adult;
- no redesign of identity;
- no new accessories unless already part of the approved master identity;
- no unrelated environment baked into the character asset;
- target transparent/separable character output when the tool/workflow supports it without material quality loss.

## Common production prompt constraints — Lyra Round 2

The second stress-test brief must lock at minimum:

- same Lyra as the approved Character Master;
- preserve exact recognizable feline identity and adult-cat proportions;
- preserve asymmetric orange/black/white facial distribution;
- preserve individual body coat distribution rather than generic calico randomization;
- preserve green/olive eyes, pink nose and long white whiskers;
- preserve warm storybook/watercolor texture and confident ink-contour language;
- change only the acting pose/expression required for `watch` plus explicitly authorized structural adjustments;
- no photorealism, identity redesign, new accessories or unrelated environment.

## Scoring model

Score each category from **0 to 10**. Use the weighted score only after checking blockers.

### Round 1 — Maittê

| Criterion | Weight |
|---|---:|
| Identity / face preservation | 25% |
| Age / anatomy / proportions | 10% |
| Hair / streak / glasses / clothing identity preservation | 15% |
| Watercolor/storybook texture consistency | 15% |
| `listen-think` acting-state readability | 10% |
| Localized-edit preservation | 10% |
| Small-scale readability | 5% |
| Transparency / separability workflow | 3% |
| Repeatability across iterations | 4% |
| Human correction effort | 3% |

Total: **100%**.

### Round 2 — Lyra stress test

| Criterion | Weight |
|---|---:|
| Identity / face preservation | 20% |
| Individual coat / marking preservation | 20% |
| Anatomy and proportions | 10% |
| Watercolor/storybook texture consistency | 15% |
| `watch` pose/state readability | 10% |
| Localized-edit preservation | 10% |
| Small-scale readability | 5% |
| Transparency / separability workflow | 3% |
| Repeatability across iterations | 4% |
| Human correction effort | 3% |

Total: **100%**.

For `human correction effort`, a high score means less corrective work is required.

## Blocking failures

### Maittê Round 1 blockers

A candidate/workflow cannot pass Round 1 if any of the following occurs in the selected result or correction round:

- Maittê becomes a different-looking child;
- age visibly drifts outside the approved approximately-8-year-old character model;
- face, hair model, lighter streak or pink glasses are materially redesigned;
- the green-heart/clothing identity is lost or arbitrarily replaced;
- storybook/watercolor texture is materially lost;
- changing the pose forces full identity regeneration with uncontrolled drift;
- ordinary localized correction materially changes locked unaffected regions;
- output cannot be made runtime-usable without disproportionate manual reconstruction.

### Lyra Round 2 blockers

A workflow cannot pass the stress test if:

- Lyra becomes a different-looking cat;
- asymmetric facial identity is mirrored, randomized or replaced with generic calico distribution;
- major anatomy failure remains after the allowed localized correction round;
- storybook/watercolor texture is materially lost;
- pose change or correction causes uncontrolled identity/marking drift.

## Decision rule

After Round 1:

- score all compliant Maittê workflows;
- identify a **ROUND-1 LEADER**, but do **not** yet promote it to the final primary workflow solely from Maittê.

After Round 2:

- compare robustness across Maittê and Lyra;
- highest compliant overall workflow becomes **PROVISIONAL PRIMARY CHARACTER PRODUCTION WORKFLOW**;
- second-highest compliant workflow becomes **PROVISIONAL FALLBACK WORKFLOW**;
- a workflow that fails a blocking condition in either required round cannot become primary;
- Character Masters and approved locks remain authoritative;
- a tool may be replaced later if another tool materially improves preservation/effort without changing architecture.

A benchmark winner is not authorization to mass-produce all character states automatically.

## Post-benchmark production gate

After selecting a workflow, define the actual production inventory per character/state.

Do **not** assume symmetry requires five independent full-frame images for every character.

For each acting state decide whether it should be represented by:

- the same production illustration plus micro-animation;
- localized/layered variants (eyes, mouth, tail, arm/head layer, etc.);
- a distinct authored pose;
- another approved presentation-only representation.

Micro-animation may include breathing, blinking, slight head/body movement, bounce and independently layered tail movement when it preserves illustration quality.

Larger pose/expression changes may use distinct authored variants derived from the same master.

## Runtime integration rule

Final production assets replace technical scaffolds **behind the existing logical presentation keys** whenever practical.

Examples:

`character.maitte.listen-think`

may move from:

`vectorAsset(MaitteFigure)`

to an approved raster/vector/layer-aware production descriptor without changing:

- MaitteActor's state contract;
- curriculum;
- evaluation;
- persistence;
- mastery/progression semantics.

Likewise, later `character.lyra.watch` may move from `vectorAsset(LyraArt)` to the approved production descriptor without changing LyraActor or CompanionActor contracts.

Any renderer/descriptor change that becomes necessary must be handled as a presentation-layer proposal and audited separately.

## Benchmark evidence folder

Use:

`references/visual/17-character-production-benchmark/`

Required first-round workspace:

`references/visual/17-character-production-benchmark/maitte-listen-think/`

Recommended evidence after execution:

- `maitte-listen-think/chatgpt/` candidates and correction output;
- `maitte-listen-think/gemini/` candidates and correction output;
- `maitte-listen-think/adobe/` candidates and correction output;
- Round 1 target-scale comparison sheet;
- Round 1 scoring/review record;
- later `lyra-watch/` evidence using the same benchmark discipline;
- final cross-round workflow decision artifact.

Storage alone does not approve an output. The README/review record must explicitly state the selected result/workflow and status.

## Relationship to Step 2C

**DECIDED sequencing:** finish the two-round character-production benchmark and approve the initial character production replacement strategy before beginning broad Step 2C Overworld production composition.

This prevents Step 2C from embedding temporary SVG character quality or committing to a physical asset format before the production workflow has been tested.

Step 2C remains governed by `VISUAL-PRODUCTION-STEP-2-GATE.md` and the approved Overworld north stars.

## Governance summary

- Character Masters: **DECIDED identity authority**.
- Current code-drawn character/pet SVGs: **TECHNICAL / CONCEPT SCAFFOLDS**.
- Benchmark method: **DECIDED**.
- Round 1 Maittê `listen-think`: **DECIDED / NEXT**.
- Round 2 Lyra `watch`: **DECIDED / REQUIRED STRESS TEST**.
- Exact winning tool: **PROVISIONAL until both rounds are reviewed**.
- Exact final physical file format: **PROVISIONAL**.
- Exact per-character production pose inventory: **PROVISIONAL**.
- Missing final production variants: **PRODUCTION-ASSET-GAP**.
- Step 2C: **NOT STARTED** during benchmark.
