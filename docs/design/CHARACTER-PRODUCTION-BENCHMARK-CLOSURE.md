# Character Production Benchmark — Closure Record

**Status:** DECIDED — benchmark complete for character-generation workflow selection; production-fit/runtime-format proof remains open and moves to Maittê Production Proof 01.

## Purpose

This record closes the two-round character-production benchmark defined in `CHARACTER-PRODUCTION-BENCHMARK.md` and records the evidence, product decisions, deviations and unresolved production-fit questions before the project begins real character asset preparation.

## Binding outcome

- **ChatGPT Images — PRIMARY character generation/editing workflow.**
- **Gemini / Nano Banana — FALLBACK character generation/editing workflow.**
- **Adobe Firefly — REJECTED as primary character generator for the current production pass.**
- **Adobe Photoshop — PREFERRED finishing / masking / layer-preparation / export environment.**
- Character Masters remain the identity authority regardless of tool.
- Current JSX/SVG characters remain technical/concept scaffolds, not production art.

The detailed workflow decision is recorded in:

`docs/design/CHARACTER-PRODUCTION-WORKFLOW-DECISION.md`

## Evidence

### Round 1 — Maittê `listen-think`

Workspace:

`references/visual/17-character-production-benchmark/maitte-listen-think/`

Product dispositions:

- ChatGPT: C1 selected as strongest initial candidate; localized glasses-correction review accepted as benchmark evidence; strongest overall identity/style continuity.
- Gemini: C3 selected; correction/refinement completed; visually strong and viable but with small identity/style-language divergences versus the strongest ChatGPT result.
- Adobe Firefly: Candidate 01 selected for correction; correction completed; rejected from Round-1 leader consideration because visual identity/style drift was materially larger.

Round-1 leader:

**ChatGPT Images.**

### Round 2 — Lyra `watch` identity-drift stress test

Workspace:

`references/visual/17-character-production-benchmark/lyra-watch/`

Product dispositions:

- ChatGPT: Candidate 01 selected; correction review accepted; strongest preservation of Lyra's approved face/coat identity while changing acting pose.
- Gemini: Candidate 02 selected as strongest original candidate; correction review rejected because the edit degraded the selected result.

Round-2 leader:

**ChatGPT Images.**

Cross-round decision:

**ChatGPT Images becomes the primary workflow; Gemini remains fallback.**

## Recorded deviations / limitations

### ChatGPT Round-1 clean-export limitation

The Maittê localized-edit exercise repeatedly produced comparison/review compositions instead of a clean standalone corrected character export.

Classification:

**WORKFLOW-LIMITATION — NON-BLOCKING FOR ENGINE SELECTION / MUST BE RESOLVED IN PRODUCTION PREPARATION.**

This affects localized-edit practicality, separability and human correction effort.

### Gemini Round-2 prompt-label deviation

During the Gemini Lyra experiment, some prompts used the label `listen-think` although the binding benchmark state is `watch`.

The generated candidates nevertheless tested the intended material concern — attentive/observant pose change under preservation of asymmetric feline identity — and were retained as Round-2 evidence.

Classification:

**PROMPT-LABEL-DEVIATION — ACCEPTED / NON-BLOCKING.**

The repository continues to classify the round and its files under `lyra-watch`.

### Gemini evidence filenames

Some uploaded Gemini Lyra binaries were stored without filename extensions.

Classification:

**FILE-NAMING-DEVIATION — NON-BLOCKING.**

Do not rename binary evidence through a text-editor workflow merely for cleanup.

### Weighted-score completeness

The benchmark specification defined weighted criteria including runtime-scale readability and transparency/separability. Product review was sufficient to establish a clear engine ordering, but a strict fully numeric score was not completed for every criterion because clean transparent production exports and final runtime-format preparation were not yet available.

Classification:

**PROCESS-DEVIATION — ACCEPTED FOR ENGINE SELECTION; PRODUCTION-FIT CRITERIA TRANSFERRED TO PRODUCTION PROOF 01.**

Do not invent retrospective precision for criteria that were not actually measured. Runtime-scale readability, transparency, masks/layers, export effort and final integration fit must be measured in the production proof.

## Why the benchmark can close for workflow selection

The benchmark produced a stable product decision across two materially different identities:

- human protagonist identity and acting change;
- asymmetric tricolor animal identity and acting change.

The same engine led both rounds, while Gemini remained viable and Adobe Firefly materially diverged on the protagonist. Additional generator benchmarking on Burpee, Pipoca or Will is therefore not required before production preparation.

## What remains unresolved

The benchmark did **not** decide the final runtime physical asset contract.

Still open:

- transparent PNG vs WebP vs another web-suitable raster representation;
- one full-color image plus restoration masks vs multiple authored color layers;
- exact mask/export resolution;
- final PSD/source structure;
- how Maittê's independent restoration regions compose at runtime;
- exact production-size performance/quality tradeoff;
- whether all acting states need distinct full-frame illustrations.

These are **PRODUCTION-ASSET-GAP / PRODUCTION-FIT** questions, not reasons to reopen the generator benchmark.

## Next gate

Proceed to:

`docs/design/MAITTE-PRODUCTION-PROOF-01.md`

Target:

**Maittê — `listen-think`**

Purpose:

prove the production preparation, transparency, restoration-mask/layer strategy and runtime composition behind the existing `character.maitte.listen-think` logical key before broad Step 2C Overworld work begins.

## Governance

- Benchmark engine selection: **COMPLETE / DECIDED**.
- ChatGPT primary: **DECIDED**.
- Gemini fallback: **DECIDED**.
- Firefly primary-generator role: **REJECTED**.
- Photoshop finishing environment: **DECIDED**.
- Production physical contract: **PROVISIONAL**.
- Final production Maittê `listen-think` asset: **PRODUCTION-ASSET-GAP**.
- Step 2C: **NOT STARTED**.