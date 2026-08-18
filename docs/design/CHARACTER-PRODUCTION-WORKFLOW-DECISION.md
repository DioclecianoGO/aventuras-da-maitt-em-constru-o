# Character Production Workflow Decision

**Status:** DECIDED — generation workflow selected; first Maittê production-preparation/runtime contract validated by Production Proof 01.

## Decision

### Primary character image-generation workflow

**ChatGPT Images — PRIMARY.**

Rationale across Maittê Round 1 and Lyra Round 2:

- strongest continuity with approved Character Masters;
- best preservation of the project's storybook/watercolor language;
- strongest product-review preference on Maittê `listen-think`;
- strongest Round-2 result on Lyra `watch`;
- better correction/refinement stability than Gemini in the tested cases;
- sufficient acting-state variation without promoting the technical SVG scaffold into artistic authority.

### Fallback character image-generation workflow

**Gemini / Nano Banana — FALLBACK.**

It remains viable when a specific asset materially outperforms ChatGPT while respecting the same Character Master and locks.

### Adobe generation role

**Adobe Firefly — REJECTED as primary generative character engine for this production pass.**

Its Maittê Round-1 output diverged materially from the approved identity/style relative to ChatGPT and Gemini.

### Adobe production-preparation role

**Adobe connector — VALIDATED PRIMARY PREPARATION PATH for standard character-production operations.**

Production Proof 01 demonstrated direct chat-driven Adobe/Photoshop-class operations for:

- transparency/background removal;
- region selection;
- grayscale/stolen-color preparation;
- restoration masks;
- selective color preservation/reveal;
- proof composites.

Therefore manual Photoshop operation is not required for the standard path.

**Photoshop/manual precision editing — FALLBACK / precision-finishing environment** when connector outputs require localized cleanup, layer/version management or other fine control.

A PSD may be useful, but is not automatically required and is never a runtime dependency.

## Binding production direction

Current validated direction:

`approved Character Master`
`-> ChatGPT Images primary generation/editing`
`-> human product review`
`-> Adobe connector preparation / transparency / masks / cleanup`
`-> audited production export(s)`
`-> existing character.<id>.<state> logical key`
`-> Actor / Illustration`
`-> isolated runtime review`
`-> product approval`

Engineering/review path:

`Claude Code implementation`
`-> external patch/code audit`
`-> isolated GitHub feature branch`
`-> Lovable isolated runtime preview`
`-> approval before main integration`

The original Lovable project and `main` should not be used as the first visual experiment surface for a risky production conversion when an isolated audit path is available.

## Production Proof 01 outcome

First production proof:

**Maittê — `listen-think`.**

Disposition:

**PASS — RUNTIME COMPOSITION CONTRACT VALIDATED / CONTRACT PROMOTED.**

Binding result:

`references/visual/18-maitte-production-proof-01/PROOF-RESULT.md`

The validated physical/runtime contract is:

1. one transparent full-color raster as authoritative pixel source;
2. stolen/base state derived by grayscale/desaturation of that same source;
3. green heart preserved through an always-on luminance mask;
4. seven independent restoration luminance masks;
5. reveal exact original full-color pixels through active masks;
6. render the untouched full-color source directly when every configured region is restored;
7. preserve stable logical character keys and Actor/Illustration seams;
8. derive restoration from existing gameplay facts/selectors — never persist decorative visual state.

This resolves the former generic `PRODUCTION-ASSET-GAP` for Maittê restoration-raster composition at the architectural level.

## What the proof does NOT declare final

The contract pass does not mean every proof asset/context is fully polished.

Named remaining gaps include:

- Challenge Stage scale/framing tuning;
- `hairStreak` precise mask cleanup and small-scale readability;
- runtime export/payload optimization if needed;
- final character motion/microanimation;
- conversion of the other Maittê states;
- companion production conversion.

See:

`docs/design/CHARACTER-MOTION.md`

## Motion is now an explicit production concern

Character production must account for living presentation, including:

- breathing;
- blinking;
- green-heart pulse;
- subtle hair movement;
- idle posture movement;
- acting-state microexpressions/transitions.

These are presentation behaviors, not gameplay/progression truth, and must support reduced-motion behavior.

## What this decision still does NOT authorize

This decision does not authorize:

- automatic mass-generation of every state for every character;
- replacement of all technical scaffolds in one batch;
- hand-tracing approved illustrations into large JSX/SVG path art;
- changing Character Masters;
- changing acting-state vocabularies without a separate decision;
- changing curriculum/gameplay/domain/evaluation/persistence;
- changing restoration reward order;
- broad Overworld redesign merely because the character runtime contract passed.

## Next production gate

The next task is not another generator benchmark.

The next official front is the **principal Maittê / Overworld presence**:

`references/visual/19-maitte-overworld-main/README.md`

Before implementation, repository/runtime inspection must identify the exact existing keys, components, call sites, restoration derivation, dimensions/anchors and motion hooks.

## Evidence basis

Benchmark Round 1:

`references/visual/17-character-production-benchmark/maitte-listen-think/`

Benchmark Round 2:

`references/visual/17-character-production-benchmark/lyra-watch/`

Production Proof 01:

`references/visual/18-maitte-production-proof-01/`

Consolidated checkpoint:

`references/visual/README-progress.md`

## Governance summary

- Character Masters: **DECIDED identity authority**.
- ChatGPT Images: **DECIDED PRIMARY character generation workflow**.
- Gemini / Nano Banana: **DECIDED FALLBACK workflow**.
- Adobe Firefly: **REJECTED as primary character generator for this production pass**.
- Adobe connector: **VALIDATED PRIMARY standard production-preparation path**.
- Photoshop/manual precision editing: **FALLBACK / precision finishing**.
- Current JSX/SVG character art: **TECHNICAL / CONCEPT RUNTIME SCAFFOLD** unless a key is explicitly promoted.
- Maittê restoration-raster composition contract: **VALIDATED / PROMOTED by Production Proof 01**.
- Current `listen-think` proof asset polish: **PARTIAL — named scale/hairStreak/motion gaps remain**.
- Motion categories: **EXPLICIT PRODUCTION CONCERN; final rig/timing not yet decided**.
- Mass conversion: **NOT AUTHORIZED**.
- Next front: **Maittê main / Overworld inspection and scoped production slice**.