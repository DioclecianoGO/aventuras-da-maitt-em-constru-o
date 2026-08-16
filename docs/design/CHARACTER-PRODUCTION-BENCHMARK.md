# Character Production Asset Benchmark

**Status:** COMPLETE FOR WORKFLOW SELECTION — DECIDED. Primary/fallback generation workflows are selected; runtime physical format and restoration-layer contract remain PROVISIONAL and move to Maittê Production Proof 01.

## Purpose

Step 2B established approved Character Masters and stable presentation seams so temporary technical SVG scaffolds can be replaced without changing gameplay/domain contracts.

This benchmark determined which available image-production workflow best preserves approved Character Masters while creating usable acting-state variants in the intended storybook/watercolor language.

The benchmark selected a **production workflow**, not an architecture. Tool choice remains replaceable and cannot redefine approved identity.

## Binding outcome

Detailed closure:

`docs/design/CHARACTER-PRODUCTION-BENCHMARK-CLOSURE.md`

Detailed production decision:

`docs/design/CHARACTER-PRODUCTION-WORKFLOW-DECISION.md`

Current outcome:

1. **ChatGPT Images — PRIMARY character generation/editing workflow**;
2. **Gemini / Nano Banana — FALLBACK workflow**;
3. **Adobe Firefly — REJECTED as primary character generator for the current production pass**;
4. **Adobe Photoshop — PREFERRED finishing / masking / layer-preparation / export environment**.

Character Masters and approved locks remain authoritative regardless of workflow.

## Preconditions — satisfied

1. Maittê, Burpee, Pipoca, Will and Lyra Character Masters are approved and stored;
2. the five character presentation seams/scaffolds are integrated on `main`;
3. `VISUAL-ASSET-CONTRACT.md` and `ASSET-PRODUCTION-PIPELINE.md` remain binding;
4. Step 2C Overworld production composition remained NOT STARTED during benchmark execution.

## Binding identity hierarchy

For production-character variants, authority is:

`approved Character Master -> approved locks/spec -> reviewed production variant -> logical character.<id>.<state> key -> Actor -> scene`

The current technical scaffold may provide pose/structure guidance, but it is **not** an identity or texture authority.

A coding assistant must not recreate approved watercolor/storybook character art by expanding manual JSX/SVG paths and call that final production art.

## Round 1 — Maittê `listen-think`

**Status: COMPLETE.**

Identity authority:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

Evidence workspace:

`references/visual/17-character-production-benchmark/maitte-listen-think/`

Round-1 product dispositions:

- ChatGPT: C1 selected; localized glasses-correction review accepted as evidence; strongest identity/style continuity;
- Gemini: C3 selected; correction/refinement completed; strong/viable but with small visual-language divergences;
- Adobe Firefly: Candidate 01 selected for correction; workflow rejected from leader consideration because identity/style divergence was materially larger.

**Round-1 leader: ChatGPT Images.**

## Round 2 — Lyra `watch`

**Status: COMPLETE.**

Identity authority:

`references/visual/16-lyra-character-master/LYRA_MASTER_APPROVED.png`

Evidence workspace:

`references/visual/17-character-production-benchmark/lyra-watch/`

Round-2 product dispositions:

- ChatGPT: Candidate 01 selected; correction review accepted; strongest preservation of Lyra's asymmetric identity while changing acting pose;
- Gemini: Candidate 02 selected as strongest original; correction review rejected because the edit degraded the selected result.

**Round-2 leader: ChatGPT Images.**

Round 2 completed the required asymmetric animal-identity stress test. Additional generator benchmarking on Burpee, Pipoca and Will is not required before production preparation.

## Controlled benchmark protocol — historical/binding for future reruns

Per tested workflow:

1. generate three initial candidates from the same approved identity target;
2. select the strongest candidate;
3. perform one localized correction/refinement round;
4. retain the corrected result or record the workflow limitation/failure;
5. compare identity, acting readability, texture, correction stability and production effort;
6. keep all evidence non-authoritative until explicit product review.

The benchmark did not authorize mass generation or automatic production promotion.

## Common production constraints — Maittê

Production variants must preserve at minimum:

- same approved Maittê identity;
- approximately 8-year-old proportions;
- recognizable face;
- dark-brown hair/fringe/curl-wave treatment;
- independent lighter hair streak;
- pink glasses;
- shirt with green heart;
- skirt, colorful socks and high-top canvas sneakers;
- warm original 2D storybook/coloring-book watercolor texture and confident ink language;
- positive/supportive acting treatment;
- no photorealism or age drift;
- no arbitrary new accessories or identity redesign.

## Common production constraints — Lyra

Production variants must preserve at minimum:

- same approved Lyra identity;
- adult-cat proportions;
- asymmetric orange/black/white facial distribution;
- individual coat distribution rather than generic calico randomization;
- green/olive eyes;
- pink nose;
- long white whiskers;
- warm storybook/watercolor texture and ink-contour language;
- no photorealism, arbitrary redesign or new accessories.

## Scoring model — retained as review framework

### Maittê

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

### Lyra

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

A strict complete numeric score was not fabricated retrospectively for criteria that required clean transparent/runtime-ready exports. That process deviation is recorded in the benchmark closure. Production-fit criteria now move to Production Proof 01.

## Blocking failures — retained

A workflow/asset cannot be promoted when it materially:

- changes the approved subject identity;
- causes age/species/anatomy drift;
- randomizes locked coat/hair/facial markings;
- loses the approved storybook/watercolor language;
- causes localized correction to regenerate locked unaffected regions uncontrollably;
- requires disproportionate reconstruction to become runtime-usable.

## Recorded deviations

See `CHARACTER-PRODUCTION-BENCHMARK-CLOSURE.md` for full disposition.

Key recorded items:

- ChatGPT Round-1 clean standalone correction export was not obtained;
- Gemini Lyra prompts used a `listen-think` label in part of the experiment although the binding round is `watch`; outputs still tested the intended attentive/observant identity-preservation concern and were accepted as non-blocking evidence;
- some Gemini Lyra evidence filenames were uploaded without extensions;
- strict numeric scoring was incomplete for production-fit criteria that were not yet measurable.

None of these reopen the generator benchmark.

## Post-benchmark production gate

The next gate is:

`docs/design/MAITTE-PRODUCTION-PROOF-01.md`

Target:

**Maittê — `listen-think`.**

The production proof must determine the real preparation/runtime contract for:

- transparency;
- colorless base;
- green-heart always-on behavior;
- independent restoration regions;
- raster masks/layers or approved alternative;
- runtime target-scale quality;
- export/performance tradeoffs.

Do **not** assume symmetry requires five independent full-frame images for every character.

For each later acting state decide whether it should use:

- the same production illustration plus micro-animation;
- localized/layered variants;
- a distinct authored pose;
- another approved presentation-only representation.

## Runtime integration rule

Final production assets replace technical scaffolds **behind existing logical presentation keys** whenever practical.

Example:

`character.maitte.listen-think`

may move from:

`vectorAsset(MaitteFigure)`

to an approved raster/layer-aware production descriptor without changing curriculum, evaluation, persistence or progression semantics.

Likewise `character.lyra.watch` may later replace `vectorAsset(LyraArt)` without changing LyraActor or CompanionActor contracts.

Any necessary renderer/descriptor extension must remain presentation-only and be audited separately.

## Benchmark evidence

Root:

`references/visual/17-character-production-benchmark/`

Round 1:

`maitte-listen-think/`

Round 2:

`lyra-watch/`

Storage alone does not approve a production asset.

## Relationship to Step 2C

**DECIDED sequencing:** the benchmark is complete, but broad Step 2C remains blocked until the first production-character preparation/composition strategy is proven well enough to avoid embedding temporary SVG quality or an untested physical asset contract into the Overworld.

## Governance summary

- Character Masters: **DECIDED identity authority**.
- Current code-drawn character/pet SVGs: **TECHNICAL / CONCEPT SCAFFOLDS**.
- Benchmark execution: **COMPLETE FOR WORKFLOW SELECTION**.
- ChatGPT Images: **DECIDED PRIMARY**.
- Gemini / Nano Banana: **DECIDED FALLBACK**.
- Adobe Firefly: **REJECTED as primary character generator for this pass**.
- Photoshop: **DECIDED preferred finishing/production-preparation environment**.
- Exact final physical file format: **PROVISIONAL**.
- Exact restoration raster/mask contract: **PROVISIONAL / PRODUCTION-ASSET-GAP**.
- Exact per-character production pose inventory: **PROVISIONAL**.
- Step 2C: **NOT STARTED**.