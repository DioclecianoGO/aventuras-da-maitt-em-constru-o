# Round 1 — Maittê `listen-think`

**Status:** IN EXECUTION — ChatGPT and Gemini candidate/review rounds completed; Adobe Firefly candidate/review round completed and rejected from Round-1 leader consideration by product review; cross-tool runtime-size scoring and final Round-1 leader record remain pending.

This folder is the controlled evidence workspace for the first Character Production Asset Benchmark round.

Binding operational gate:

`docs/design/MAITTE-PRODUCTION-BENCHMARK-ROUND-1.md`

Binding benchmark protocol:

`docs/design/CHARACTER-PRODUCTION-BENCHMARK.md`

## Identity authority

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

The approved master governs identity. Current runtime SVG/scaffold art may be used only for pose/structure guidance and must not define face, age, texture or illustration quality.

## Target

Produce the **same approved Maittê** in the `listen-think` acting state:

- attentive;
- thoughtful;
- curious;
- supportive/positive;
- never sad, punished or negatively confused.

Identity locks include the approved approximately-8-year-old character model, recognizable face, dark-brown hair/fringe/curl-wave treatment, lighter hair streak, pink glasses, shirt with green heart, skirt, colorful socks, high-top canvas sneakers and the approved original storybook/watercolor illustration language.

## Candidate workflows

Round 1 compares:

1. ChatGPT Images;
2. Gemini / Nano Banana;
3. Adobe Firefly / Photoshop generative workflow.

The benchmark compares **production workflows**, not only isolated image quality. Identity preservation, editability, repeatability, separability and human correction effort all remain part of the evaluation.

## Execution state

### ChatGPT Images

- three initial candidates: **GENERATED + STORED**;
- strongest initial candidate: **C1 — SELECTED BY PRODUCT REVIEW**;
- C1 identifying pose: hand at chin + opposite arm crossed, thoughtful upward gaze;
- localized correction target: **pink-glasses geometry/fidelity**;
- localized correction review: **APPROVED FOR BENCHMARK EVIDENCE + STORED**;
- clean standalone corrected export: **NOT AVAILABLE / NOT STORED**;
- product perception: **CURRENT STRONGEST VISUAL FIDELITY / PROVISIONAL ROUND-1 PREFERENCE**;
- formal weighted scoring: **PENDING**.

C1 selection and correction approval are benchmark-review dispositions only. They do **not** promote C1 to a production asset and do not yet constitute the formal Round-1 winner record.

The correction round exposed a workflow characteristic that must be recorded during scoring: the image tool repeatedly surfaced comparison/review compositions rather than a clean standalone corrected character export. This is relevant to `localized-edit preservation`, `transparency / separability workflow` and `human correction effort`.

### Gemini / Nano Banana

- three initial candidates: **GENERATED**;
- strongest initial candidate: **C3 — SELECTED BY PRODUCT REVIEW**;
- one correction/refinement round over C3: **COMPLETED**;
- correction-review canonical filename: `maitte-listen-think-gemini-correction-review.png`;
- product perception: **VIABLE / STRONG SECONDARY RESULT**;
- formal weighted scoring: **PENDING**.

Product review found Gemini visually strong and substantially faithful to the approved Maittê, but with small divergences from the approved visual language and from the strongest ChatGPT result.

The Gemini round was executed from the approved Character Master plus a controlled benchmark prompt, without direct access to the repository's full spec set. This context difference must be recorded when interpreting cross-tool results; it does not invalidate the round, but it means tool-context parity was not perfect.

### Adobe Firefly

- three initial candidates: **GENERATED**;
- strongest initial candidate: **Candidate 01 — SELECTED FOR CORRECTION TEST**;
- one correction/review round: **COMPLETED**;
- correction-review canonical filename: `maitte-listen-think-adobe-correction-review.png`;
- product disposition: **REJECTED FROM ROUND-1 LEADER CONSIDERATION**;
- reason: **material visual/identity/style divergence from the approved Maittê compared with ChatGPT and Gemini**;
- evidence retention: **REQUIRED**.

Adobe evidence remains useful benchmark data even though the workflow has been discarded for this Round-1 leader decision. Rejection is a workflow/product decision, not a reason to delete evidence.

## Localized correction tests

Each workflow receives exactly one controlled correction/refinement round after its strongest initial candidate is selected.

The correction step is benchmark evidence for:

- localized-edit preservation;
- identity stability;
- repeatability;
- human correction effort;
- production separability practicality.

A correction result is not automatically a production asset.

## Stored ChatGPT evidence — VERIFIED

Upload commit:

`54403ff0a9ef8f1c4b989261661cdb0fa69bbde0`

| Evidence | Blob SHA | Size |
|---|---|---:|
| `maitte-listen-think-chatgpt-candidate-01.png` | `6d684488f9ce541e6459d20cbc645817ad969417` | 2,578,747 bytes |
| `maitte-listen-think-chatgpt-candidate-02.png` | `595a376ebe8635fc2ffe0082b6fe52a3f40a369c` | 2,697,247 bytes |
| `maitte-listen-think-chatgpt-candidate-03.png` | `f244e67a5f76e7800801e4bab5cfe330479756d0` | 2,649,434 bytes |
| `maitte-listen-think-chatgpt-correction-review.png` | `29997f4e4172a4a1311c30b91715de5019238f5d` | 2,121,261 bytes |

All four were verified as PNG evidence on `main`.

## Canonical Gemini evidence names

Store the Gemini evidence flat in this folder using:

- `maitte-listen-think-gemini-candidate-01.png`;
- `maitte-listen-think-gemini-candidate-02.png`;
- `maitte-listen-think-gemini-candidate-03.png`;
- `maitte-listen-think-gemini-correction-review.png`.

## Canonical Adobe evidence names

Store the Adobe evidence flat in this folder using:

- `maitte-listen-think-adobe-candidate-01.png`;
- `maitte-listen-think-adobe-candidate-02.png`;
- `maitte-listen-think-adobe-candidate-03.png`;
- `maitte-listen-think-adobe-correction-review.png`.

**DECIDED:** upload/store Adobe evidence even though Adobe is rejected from Round-1 leader consideration. Benchmark evidence records failures and rejected workflows as well as successful ones.

## Round-1 evidence layout

**DECIDED for this Round 1 workspace:** keep benchmark binaries **flat under `maitte-listen-think/` with the workflow name embedded in the canonical filename**.

Examples:

- `maitte-listen-think-chatgpt-candidate-01.png`;
- `maitte-listen-think-gemini-candidate-01.png`;
- `maitte-listen-think-adobe-candidate-01.png`.

This keeps all Round-1 candidates directly comparable in one evidence directory.

Do not rename binary assets through a text-editor workflow; upload each binary already using its canonical filename.

## What these benchmark images are — and are not

### Current benchmark files

The current ChatGPT/Gemini/Adobe images are:

**BENCHMARK EVIDENCE / NOT PRODUCTION RUNTIME ASSETS.**

They prove or expose:

- identity preservation;
- acting-state quality;
- visual-language consistency;
- edit stability;
- workflow repeatability;
- correction effort;
- separability/transparency practicality.

They must **not** be treated as final game skins merely because they exist in this reference folder.

### Future production direction

The intended production path remains:

`approved Character Master -> selected production workflow -> clean reviewed acting-state variant -> production preparation/separation -> existing character.maitte.<state> logical key -> MaitteActor -> scene`

The final character illustration may be a transparent raster/layered raster asset (for example PNG/WebP or another approved physical format) rendered behind the existing logical key. It is **not** expected to be manually redrawn as a large JSX/SVG tracing of the benchmark image.

The current `MaitteFigure` SVG remains a **TECHNICAL / CONCEPT RUNTIME SCAFFOLD**, not the artistic production target.

For Maittê specifically, the final runtime asset strategy must also preserve the existing independent color-restoration behavior. A single flattened full-color bitmap cannot automatically replace that restoration contract. The eventual production-preparation step may require layers, masks, region assets or another presentation-layer composition strategy. That remains a separate `PRODUCTION-ASSET-GAP` and does not invalidate the image-production benchmark.

## Required evidence per workflow

- 3 initial candidates;
- selection of the strongest candidate;
- 1 localized correction round;
- best corrected result or explicit workflow limitation;
- notes on identity drift, pose fidelity, texture, edit preservation and human effort;
- review at production size and approximate Challenge Stage size.

## Approval rule

Storage is not approval.

No image in this workspace becomes a production variant until explicit product review records its promotion.

Current product perception after visual generation rounds:

1. **ChatGPT Images — provisional visual preference / strongest identity-language match**;
2. **Gemini / Nano Banana — viable and close, with small visual-language divergences**;
3. **Adobe Firefly — rejected from Round-1 leader consideration due material divergence**.

Formal Round-1 closure still requires the planned cross-tool runtime-size review/scoring record. Final primary/fallback workflow selection remains **PROVISIONAL until the required Lyra `watch` Round 2 stress test**.

Step 2C remains **NOT STARTED** during benchmark execution.
