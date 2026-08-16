# Maittê Production Benchmark — Round 1 Gate

**Status:** COMPLETE — benchmark evidence collected across ChatGPT, Gemini and Adobe; ChatGPT selected as Round-1 leader; final cross-round workflow decision completed after Lyra Round 2.

## Purpose

Round 1 validated whether a production image workflow could create a new Maittê acting pose while preserving the approved protagonist identity and storybook/watercolor visual language.

This gate is part of `CHARACTER-PRODUCTION-BENCHMARK.md` and did not reopen Step 2B.

## Critical boundary

The goal was **not** to improve `MaitteFigure.tsx` until it resembled final illustration.

`MaitteFigure` remains a **TECHNICAL / CONCEPT RUNTIME SCAFFOLD**.

Production direction remains:

`MAITTE_MASTER_APPROVED.png -> reviewed acting-state variant -> Photoshop production preparation -> approved production export -> character.maitte.listen-think -> MaitteActor -> scene`

A coding agent must not recreate the approved watercolor/storybook Maittê by adding manual JSX/SVG paths and call that production art.

## Identity authority

Canonical source:

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

Status:

**DECIDED identity authority.**

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

Target acting:

- listening;
- attentive;
- thoughtful;
- curious;
- positive/supportive;
- never sad, punished or negatively confused.

## Workflows tested

1. ChatGPT Images;
2. Gemini / Nano Banana;
3. Adobe Firefly / Photoshop generative workflow.

## Evidence workspace

`references/visual/17-character-production-benchmark/maitte-listen-think/`

The workspace retains all successful and rejected benchmark evidence.

## Product dispositions

### ChatGPT Images

- three initial candidates generated and stored;
- **C1 selected** as strongest initial candidate;
- localized correction target: pink-glasses geometry/fidelity;
- correction review accepted as benchmark evidence;
- clean standalone corrected C1 export was not obtained;
- product perception: strongest identity/style continuity.

### Gemini / Nano Banana

- three candidates generated;
- **C3 selected**;
- one correction/refinement round completed;
- result remained strong and viable;
- product review observed small visual-language/identity divergences versus the strongest ChatGPT result.

### Adobe Firefly

- three candidates generated;
- Candidate 01 selected for correction;
- one correction/review round completed;
- **rejected from Round-1 leader consideration** because visual identity/style divergence was materially larger than ChatGPT/Gemini.

## Round-1 decision

**ROUND-1 LEADER: ChatGPT Images.**

This did not alone authorize a primary workflow. The required Lyra Round 2 stress test was completed afterward and confirmed ChatGPT as the cross-round primary workflow.

Final decision:

`docs/design/CHARACTER-PRODUCTION-WORKFLOW-DECISION.md`

Closure/audit:

`docs/design/CHARACTER-PRODUCTION-BENCHMARK-CLOSURE.md`

## Recorded limitations

### ChatGPT clean-export limitation

The localized-edit exercise produced comparison/review compositions rather than a clean standalone corrected character export.

Classification:

**WORKFLOW-LIMITATION — NON-BLOCKING FOR ROUND-1 LEADER / MUST BE RESOLVED IN PRODUCTION PREPARATION.**

### Runtime-size / transparency scoring

A strict fully numeric score was not fabricated for criteria that required final transparent/runtime-ready production exports.

Classification:

**PROCESS-DEVIATION — ACCEPTED FOR ENGINE SELECTION; PRODUCTION-FIT CRITERIA TRANSFERRED TO PRODUCTION PROOF 01.**

## Scoring framework retained

Round-1 review categories remain available for future reruns:

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

## Blockers retained

A future workflow cannot pass if it materially:

- makes Maittê a different-looking child;
- causes age drift;
- redesigns face/hair/lighter streak/pink glasses;
- loses green-heart/clothing identity;
- loses storybook/watercolor texture;
- causes uncontrolled identity regeneration during pose/edit changes;
- requires disproportionate reconstruction for runtime use.

## Next gate

Round 1 is closed.

The benchmark as a whole is closed for workflow selection.

Proceed to:

`docs/design/MAITTE-PRODUCTION-PROOF-01.md`

The next task is to prove the real production preparation and runtime restoration composition for Maittê `listen-think`, not to generate more benchmark candidates.

## Governance

- Maittê Character Master: **DECIDED identity authority**.
- Current Maittê SVG scaffold: **TECHNICAL / CONCEPT SCAFFOLD**.
- Round 1: **COMPLETE**.
- Round-1 leader: **ChatGPT Images**.
- Final cross-round primary workflow: **ChatGPT Images — DECIDED**.
- Gemini: **FALLBACK — DECIDED**.
- Firefly primary-generator role: **REJECTED for this production pass**.
- Final `listen-think` production asset: **PRODUCTION-ASSET-GAP**.
- Step 2C: **NOT STARTED**.