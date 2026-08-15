# Character Production Asset Benchmark

**Status:** DECIDED benchmark method and sequencing; winning tool, exact physical formats, pose inventory and production exports remain PROVISIONAL until benchmark review.

## Purpose

Step 2B established approved character identity masters and stable presentation seams so temporary technical SVG scaffolds can be replaced without changing gameplay/domain contracts.

The next visual-production decision is **not** to improve those SVGs until they resemble final illustration. The next decision is to determine which available image-production workflow best preserves the approved Character Masters while producing usable acting-state variants with the intended storybook/watercolor texture.

This benchmark chooses a **production tool/workflow**, not an architecture. Tool choice remains replaceable and cannot redefine approved identity.

## Preconditions

Before benchmark execution:

1. Maittê, Burpee, Pipoca, Will and Lyra Character Masters are explicitly approved and stored under their canonical reference folders;
2. the five character presentation seams/scaffolds are integrated or an integration-only step is explicitly pending;
3. `VISUAL-ASSET-CONTRACT.md` and `ASSET-PRODUCTION-PIPELINE.md` remain binding;
4. Step 2C Overworld production composition remains **NOT STARTED** during this benchmark.

## Binding identity hierarchy

For production-character variants, authority is:

`approved Character Master -> approved locks/spec -> reviewed production variant -> logical character.<id>.<state> key -> Actor -> scene`

The current technical scaffold may provide pose/structure guidance, but it is **not** an identity or texture authority.

A coding assistant must not attempt to recreate the approved watercolor/storybook character by expanding manual JSX/SVG paths and call that final production art.

## Benchmark target

**DECIDED:** use **Lyra — `watch`** as the first benchmark target.

Why Lyra/watch:

- Lyra has the highest identity-drift risk among the current pets because her face and coat markings are strongly asymmetric and individually distributed;
- `watch` requires a meaningful pose/expression change while still preserving recognizability;
- the result must remain clearly distinct from Will despite both being adult domestic cats;
- the state is useful at Challenge Stage scale and therefore tests both identity preservation and small-scale readability.

### Identity input

Primary authority:

`references/visual/16-lyra-character-master/LYRA_MASTER_APPROVED.png`

### Pose/structure input

The rendered `LyraArt` `watch` state may be supplied **only as POSE / STRUCTURE GUIDANCE** after M5 integration.

It must not override:

- Lyra's face model;
- asymmetric tricolor distribution;
- anatomy/proportions;
- approved palette;
- watercolor/storybook texture;
- eye/nose/whisker treatment;
- Character Master identity.

If a tool can accept only one reference, the Character Master has priority over the scaffold render.

## Candidate workflows

The first benchmark compares the same target across the available production-capable workflows:

1. **ChatGPT Images** — image editing / controlled variant generation from the approved Character Master;
2. **Gemini image generation/editing (Nano Banana family where available)** — multi-reference or image-to-image variant workflow;
3. **Adobe Firefly / Photoshop generative workflow** — generation/editing using the approved master, with Photoshop available for reference-image, masking and finishing workflows.

Photoshop is also the preferred neutral finishing environment for masks, transparency, localized cleanup, layer preparation and export comparison regardless of which generative engine wins.

Illustrator may support vector masks, overlays, icons or deliberately simple authored vector assets, but is **not** required merely because the current placeholders are SVG. The approved watercolor/storybook texture has priority over preserving SVG as a physical production format.

Claude, Claude Code, Codex, Copilot and Lovable remain implementation/specification/integration assistants unless a separately approved benchmark explicitly evaluates an image-production capability. They are not identity authorities.

## Controlled benchmark protocol

Each generative candidate receives the same functional brief and equivalent reference material as closely as the tool permits.

Minimum protocol per candidate:

1. generate **3 initial Lyra `watch` candidates** from the same approved identity target;
2. select the strongest candidate from that tool without changing the scoring rules;
3. perform **1 localized correction round** on a deliberately identified defect or detail (for example face marking, eye direction, tail marking or paw anatomy) to test edit preservation;
4. export or capture the best result at production-comparable resolution;
5. evaluate at both review size and approximate Challenge Stage size;
6. do not manually repaint a weak candidate before scoring the generator itself; finishing effort is scored separately.

If a tool cannot support a required capability, record that as a workflow limitation rather than silently changing the benchmark.

## Common production prompt constraints

The benchmark brief must lock at minimum:

- same Lyra as the approved Character Master;
- preserve exact recognizable face/anatomy and adult-cat proportions;
- preserve asymmetric orange/black/white facial distribution;
- preserve individual body coat distribution rather than generic calico randomization;
- preserve green/olive eyes, pink nose and long white whiskers;
- preserve warm storybook/watercolor texture and confident ink-contour language;
- change **only** the acting pose/expression needed for `watch` plus explicitly authorized structural adjustments;
- no photorealism;
- no redesign of identity;
- no new accessories;
- no unrelated environment baked into the character asset;
- target transparent/separable character output when the tool/workflow supports it without material quality loss.

## Scoring model

Score each category from **0 to 10**. Use the weighted score below only after checking blockers.

| Criterion | Weight |
|---|---:|
| Identity / face preservation | 20% |
| Individual coat / marking preservation | 15% |
| Anatomy and proportions | 10% |
| Watercolor/storybook texture consistency | 15% |
| `watch` pose/state readability | 10% |
| Localized-edit preservation | 10% |
| Small-scale readability | 5% |
| Transparency / separability workflow | 5% |
| Repeatability across iterations | 5% |
| Human correction effort | 5% |

Total: **100%**.

For `human correction effort`, a high score means less corrective work is required.

## Blocking failures

A candidate/workflow cannot win even with a high average score if any of the following occurs in the selected result or correction round:

- Lyra becomes a different-looking cat;
- asymmetric facial identity is mirrored, randomized or replaced with generic calico distribution;
- major anatomy failure remains after the allowed localized correction round;
- watercolor/storybook texture is materially lost;
- changing the pose forces full identity regeneration with uncontrolled drift;
- the workflow cannot preserve locked, unaffected regions during ordinary corrections;
- output cannot be made runtime-usable without disproportionate manual reconstruction.

## Decision rule

After scoring:

- highest compliant weighted score becomes **PROVISIONAL PRIMARY CHARACTER PRODUCTION WORKFLOW**;
- second-highest compliant workflow becomes **PROVISIONAL FALLBACK WORKFLOW**;
- neither becomes a source of truth;
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

`character.lyra.watch`

may move from:

`vectorAsset(LyraArt)`

to an approved raster/vector/layer-aware production descriptor without changing:

- LyraActor's state contract;
- CompanionActor dispatch;
- curriculum;
- evaluation;
- persistence;
- mastery/progression semantics.

Any renderer/descriptor change that becomes necessary must be handled as a presentation-layer proposal and audited separately.

## Benchmark evidence folder

Use:

`references/visual/17-character-production-benchmark/`

Recommended contents after execution:

- `README.md` — protocol, versions/settings where available, scores and decision;
- `lyra-watch-chatgpt-*` candidates;
- `lyra-watch-gemini-*` candidates;
- `lyra-watch-firefly-*` candidates;
- localized-correction outputs;
- target-scale comparison sheet;
- final scoring/decision artifact.

Storage alone does not approve an output. The README/review record must explicitly state the selected result/workflow and status.

## Relationship to Step 2C

**DECIDED sequencing:** finish the character-production benchmark and approve the initial character production replacement strategy before beginning broad Step 2C Overworld production composition.

This prevents Step 2C from embedding temporary SVG character quality or committing to a physical asset format before the production workflow has been tested.

Step 2C remains governed by `VISUAL-PRODUCTION-STEP-2-GATE.md` and the approved Overworld north stars.

## Governance summary

- Character Masters: **DECIDED identity authority**.
- Current code-drawn character/pet SVGs: **TECHNICAL / CONCEPT SCAFFOLDS**.
- Benchmark method and Lyra/watch target: **DECIDED**.
- Exact winning tool: **PROVISIONAL until benchmark approval**.
- Exact final physical file format: **PROVISIONAL**.
- Exact per-character production pose inventory: **PROVISIONAL**.
- Missing final production variants: **PRODUCTION-ASSET-GAP**.
- Step 2C: **NOT STARTED** during benchmark.
