# Round 1 — Maittê `listen-think`

**Status:** IN EXECUTION — ChatGPT initial candidate set stored; C1 selected as strongest initial candidate; localized glasses-correction review approved and stored as benchmark evidence; clean standalone corrected export still unavailable; ChatGPT scoring pending; Gemini and Adobe rounds pending.

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
2. Gemini / Nano Banana image-generation/editing workflow where available;
3. Adobe Firefly / Photoshop generative workflow.

## Execution state

### ChatGPT Images

- three initial candidates: **GENERATED + STORED**;
- strongest initial candidate: **C1 — SELECTED BY PRODUCT REVIEW**;
- C1 identifying pose: hand at chin + opposite arm crossed, thoughtful upward gaze;
- localized correction target: **pink-glasses geometry/fidelity**;
- localized correction review: **APPROVED FOR BENCHMARK EVIDENCE + STORED**;
- clean standalone corrected export: **NOT AVAILABLE / NOT STORED**;
- scoring: **PENDING**.

C1 selection and correction approval are benchmark-review dispositions only. They do **not** promote C1 to a production asset and they do not make ChatGPT the benchmark winner.

The correction round exposed a workflow characteristic that must be recorded during scoring: the image tool repeatedly surfaced comparison/review compositions rather than a clean standalone corrected character export. This does not invalidate the visual correction review, but it is relevant to `localized-edit preservation`, `transparency / separability workflow` and `human correction effort` until a clean corrected export is obtained.

### Gemini / Nano Banana

**PENDING.**

### Adobe Firefly / Photoshop

**PENDING.**

## Localized correction test — ChatGPT C1

The required correction round modifies **one deliberately narrow visual property** while preserving all unaffected regions.

Correction target:

**pink-glasses geometry/fidelity** — refine only the glasses so their frame shape/proportion reads closer to the approved Character Master while preserving C1's face, pose, hands, hair, lighter streak, clothing, body proportions, acting expression, watercolor/storybook texture and framing.

Product review accepted the correction direction as visually appropriate benchmark evidence.

The benchmark distinguishes between:

1. **correction-review evidence** — demonstrates the intended localized visual change and preservation judgment;
2. **clean standalone corrected export** — preferred before any candidate could be considered production-ready.

A broad redraw or identity drift remains a benchmark defect even if the resulting image is attractive.

## Stored ChatGPT evidence — VERIFIED

Upload commit:

`54403ff0a9ef8f1c4b989261661cdb0fa69bbde0`

Current binaries are stored directly in this `maitte-listen-think/` folder:

| Evidence | Blob SHA | Size |
|---|---|---:|
| `maitte-listen-think-chatgpt-candidate-01.png` | `6d684488f9ce541e6459d20cbc645817ad969417` | 2,578,747 bytes |
| `maitte-listen-think-chatgpt-candidate-02.png` | `595a376ebe8635fc2ffe0082b6fe52a3f40a369c` | 2,697,247 bytes |
| `maitte-listen-think-chatgpt-candidate-03.png` | `f244e67a5f76e7800801e4bab5cfe330479756d0` | 2,649,434 bytes |
| `maitte-listen-think-chatgpt-correction-review.png` | `29997f4e4172a4a1311c30b91715de5019238f5d` | 2,121,261 bytes |

All four were verified as PNG evidence on `main`.

## Round-1 evidence layout

**DECIDED for this Round 1 workspace:** keep benchmark binaries **flat under `maitte-listen-think/` with the workflow name embedded in the canonical filename**.

Examples:

- `maitte-listen-think-chatgpt-candidate-01.png`;
- future `maitte-listen-think-gemini-candidate-01.png`;
- future `maitte-listen-think-adobe-candidate-01.png`.

This decision avoids moving already-stored binary history and keeps all Round-1 candidates directly comparable in one evidence directory. Tool-specific subfolders are therefore not required for this Round 1 workspace.

Do not rename binary assets through a text-editor workflow; upload each binary already using its canonical filename.

If a clean standalone corrected C1 export is later obtained, store it separately as:

`maitte-listen-think-chatgpt-selected-c1-corrected.png`

## Required evidence per workflow

- 3 initial candidates;
- selection of the strongest candidate;
- 1 localized correction round;
- best corrected result or explicit workflow limitation if clean export cannot be obtained;
- notes on identity drift, pose fidelity, texture, edit preservation and human effort;
- review at production size and approximate Challenge Stage size.

## Approval rule

Storage is not approval.

No image in this workspace becomes a production variant until explicit review records its disposition.

Round 1 may identify a **ROUND-1 LEADER**, but final primary/fallback workflow selection occurs only after the required Lyra `watch` Round 2 stress test.

Step 2C remains **NOT STARTED** during benchmark execution.
