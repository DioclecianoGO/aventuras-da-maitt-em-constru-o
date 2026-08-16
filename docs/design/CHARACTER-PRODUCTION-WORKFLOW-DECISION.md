# Character Production Workflow Decision

**Status:** DECIDED — initial production workflow selected after Maittê Round 1 and Lyra Round 2 benchmark review.

## Decision

### Primary character image-generation workflow

**ChatGPT Images — PRIMARY.**

Rationale across both required benchmark targets:

- strongest continuity with the approved Character Masters;
- best overall preservation of the project's storybook/watercolor visual language;
- strongest product-review preference on Maittê `listen-think`;
- strongest Round-2 result on Lyra `watch`;
- better stability after the allowed correction/refinement round than Gemini;
- sufficient acting-state variation without promoting the technical SVG scaffold into an artistic source of truth.

### Fallback character image-generation workflow

**Gemini / Nano Banana — FALLBACK.**

Rationale:

- produced strong and viable results on both human and animal identities;
- remained close enough to the Character Masters to be useful as a second engine;
- showed more small visual-language divergence than ChatGPT in Round 1;
- Lyra correction/refinement degraded the selected result, reducing confidence in localized-edit stability and repeatability.

### Adobe role

**Adobe Firefly — REJECTED as primary generative character engine for this production pass.**

Firefly evidence from Maittê Round 1 diverged materially from the approved character identity/style relative to ChatGPT and Gemini.

**Adobe Photoshop — PREFERRED FINISHING / PRODUCTION-PREPARATION ENVIRONMENT.**

Photoshop remains part of the production pipeline for:

- background removal and transparency;
- layer masks;
- edge cleanup;
- localized repair when useful;
- preparation of restoration regions/layers;
- export optimization;
- production comparison and finishing.

Firefly's rejection as the primary generator does not reduce Photoshop's value as the finishing environment.

## Binding production direction

For final character production:

`approved Character Master`
`-> ChatGPT Images primary generation/editing`
`-> human product review`
`-> Photoshop preparation / masks / layers / transparency / cleanup`
`-> approved production export(s)`
`-> existing character.<id>.<state> logical key`
`-> Actor / Illustration`
`-> scene`

Gemini may replace or supplement ChatGPT on a specific asset when it materially produces a better result while still respecting the same Character Master and locks.

## What this decision does NOT authorize

This decision does not authorize:

- automatic mass-generation of every state for every character;
- replacement of all technical scaffolds in one batch;
- hand-tracing the approved illustrations into large JSX/SVG path art;
- changing Character Masters;
- changing acting-state vocabularies;
- changing curriculum/gameplay/domain/evaluation/persistence;
- beginning broad Step 2C Overworld production composition before the first production-character asset strategy is proven.

## Post-benchmark production gate

The next task is not another generator benchmark.

The next task is to define and prove the **production asset preparation and runtime composition strategy** on a small vertical slice.

Recommended first production proof:

**Maittê — `listen-think`.**

Why:

- Maittê is the protagonist;
- an approved benchmark direction already exists;
- her color-restoration mechanic is the hardest character-production constraint;
- proving her production layering/masking strategy gives a stronger architectural answer than starting with an easier flattened pet asset.

The proof should determine:

- whether the final state is one transparent raster plus restoration masks;
- multiple authored raster layers;
- a base line-art/value layer plus independent color-region layers;
- or another presentation-only composition that preserves the approved illustration and the existing restoration behavior.

Exact physical format remains **PROVISIONAL** until this production proof is completed.

## Evidence basis

Round 1:

`references/visual/17-character-production-benchmark/maitte-listen-think/`

Round 2:

`references/visual/17-character-production-benchmark/lyra-watch/`

## Governance summary

- Character Masters: **DECIDED identity authority**.
- ChatGPT Images: **DECIDED PRIMARY character generation workflow**.
- Gemini / Nano Banana: **DECIDED FALLBACK workflow**.
- Adobe Firefly: **REJECTED as primary character generator for this production pass**.
- Photoshop: **DECIDED preferred finishing/production-preparation environment**.
- Current JSX/SVG character art: **TECHNICAL / CONCEPT RUNTIME SCAFFOLD**.
- Exact raster/layer/mask contract: **PROVISIONAL / PRODUCTION-ASSET-GAP**.
- Step 2C: **NOT STARTED** until the first production-character proof resolves the asset preparation/composition strategy.