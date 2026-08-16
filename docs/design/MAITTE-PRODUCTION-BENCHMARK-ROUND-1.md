# Maittê Production Benchmark — Round 1 Gate

**Status:** DECIDED operational gate; ChatGPT initial candidates generated; candidate selection, localized correction, cross-tool comparison and production integration remain pending.

## Purpose

Round 1 validates whether a production image workflow can create a new Maittê acting pose while preserving the approved protagonist identity and storybook/watercolor visual language.

This gate is part of `CHARACTER-PRODUCTION-BENCHMARK.md` and does not reopen Step 2B.

## Critical boundary

The goal is **not** to improve `MaitteFigure.tsx` until it resembles the final illustration.

`MaitteFigure` remains a **TECHNICAL / CONCEPT RUNTIME SCAFFOLD**.

The production direction is:

`MAITTE_MASTER_APPROVED.png -> reviewed listen-think production candidate -> approved production export -> character.maitte.listen-think -> MaitteActor -> scene`

A coding agent may prepare comparison harnesses, evidence manifests, runtime-size previews and later presentation-layer integration. It must not recreate the approved watercolor/storybook Maittê by adding manual JSX/SVG paths and call that production art.

## Identity authority

Canonical source:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

The master is `DECIDED` identity authority.

Locked identity traits include:

- recognizable approved Maittê face model;
- approximately 8-year-old proportions;
- dark-brown hair with fringe and curl/wave treatment;
- independently recognizable lighter hair streak;
- pink glasses;
- shirt with green heart;
- orange skirt;
- colorful striped socks;
- unbranded high-top canvas sneakers;
- original warm storybook/coloring-book watercolor texture with confident ink contours.

## Acting target

Logical state:

`character.maitte.listen-think`

Target acting must read as:

- listening;
- attentive;
- thoughtful;
- curious;
- positive/supportive;
- never sad, punished or negatively confused.

Pose may use a hand near chin/cheek/temple, upward or sideward thoughtful gaze, folded/supporting arm, or another natural child-appropriate listening/thinking gesture, provided identity remains stable.

## Round 1 workflows

Required comparison:

1. ChatGPT Images;
2. Gemini / Nano Banana image-generation/editing workflow where available;
3. Adobe Firefly / Photoshop generative workflow.

The same identity locks, acting target and scoring logic apply to all three as closely as each tool permits.

## Evidence protocol

Per workflow:

1. produce three initial candidates;
2. select one strongest candidate;
3. identify one localized defect/detail for correction;
4. perform exactly one localized correction round before scoring edit preservation;
5. retain the corrected best candidate;
6. review at full/review size and approximate Challenge Stage size;
7. record identity drift, acting readability, texture preservation, edit preservation, separability/transparency practicality and human correction effort.

### ChatGPT execution state

Three initial ChatGPT Maittê `listen-think` candidates have been generated from the approved Character Master in the controlled benchmark conversation.

**Current disposition:** generated / not yet promoted; strongest-candidate selection and localized correction remain pending.

Storage or generation alone does not approve any candidate.

## Runtime-size review

Before a Round-1 result is accepted as a tool leader, the selected corrected output must be evaluated at approximately the size used in `ChallengeStageShell`.

Review must verify that the following remain readable without relying on the full-resolution image:

- face/eyes/glasses;
- hair silhouette and lighter streak;
- green-heart anchor;
- `listen-think` acting signal;
- overall child silhouette;
- no severe edge/transparency artifacts.

A temporary comparison harness is permitted for this review and must not redefine production architecture.

## Scoring

Use the Round-1 weighted model from `CHARACTER-PRODUCTION-BENCHMARK.md`:

- identity / face preservation — 25%;
- age / anatomy / proportions — 10%;
- hair / streak / glasses / clothing identity — 15%;
- watercolor/storybook texture consistency — 15%;
- `listen-think` acting readability — 10%;
- localized-edit preservation — 10%;
- small-scale readability — 5%;
- transparency / separability workflow — 3%;
- repeatability — 4%;
- human correction effort — 3%.

## Blockers

A workflow cannot pass Round 1 if:

- Maittê becomes a different-looking child;
- age drifts materially from the approved child model;
- face, hair model, lighter streak or pink glasses are materially redesigned;
- green-heart/clothing identity is lost;
- storybook/watercolor texture is materially lost;
- pose change or localized correction causes uncontrolled regeneration of unaffected identity regions;
- the output cannot be made runtime-usable without disproportionate reconstruction.

## Claude Code role in this round

Claude Code is authorized only for planning/implementation support around benchmark evidence and presentation validation, including:

- verify current `main` and the stable Maittê presentation seam;
- inspect `MaitteActor`, `MaitteFigure`, `assetRegistry` and `ChallengeStageShell` without changing their contracts;
- determine the exact current runtime display scale/framing relevant to `listen-think`;
- propose a temporary/non-production comparison harness if useful;
- define evidence naming/manifest conventions;
- identify the minimal future presentation-layer change required to replace `vectorAsset(MaitteFigure)` behind `character.maitte.listen-think` after a production asset is explicitly approved.

Claude Code is **not** authorized in this round to:

- redraw Maittê in SVG;
- polish `MaitteFigure` into production art;
- choose the benchmark winner on behalf of product review;
- wire an unapproved generated candidate into runtime;
- change gameplay/domain/evaluation/persistence/content contracts;
- start Step 2C.

## Exit criteria

Round 1 is complete only when:

1. each of ChatGPT, Gemini and Adobe has three initial candidates or an explicit recorded capability limitation;
2. one candidate per workflow is selected;
3. one localized correction round per workflow is completed;
4. all selected corrected candidates are scored;
5. a Round-1 leader is recorded;
6. no candidate is promoted to final primary workflow until the required Lyra `watch` Round 2 stress test is complete.

## Governance

- Maittê Character Master: **DECIDED identity authority**.
- Current Maittê SVG scaffold: **TECHNICAL / CONCEPT SCAFFOLD**.
- ChatGPT initial Round-1 candidates: **BENCHMARK CANDIDATES / NOT APPROVED PRODUCTION ASSETS**.
- Round-1 leader: **PENDING**.
- Final primary workflow: **PROVISIONAL until Round 2**.
- Final `listen-think` production asset: **PRODUCTION-ASSET-GAP until explicitly approved and promoted**.
- Step 2C: **NOT STARTED**.
