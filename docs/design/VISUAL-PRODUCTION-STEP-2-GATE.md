# Visual Production — Step 2 Gate

**Status:** DECIDED gate and sequencing; **Step 2A COMPLETE; Step 2B COMPLETE; character-production benchmark COMPLETE FOR WORKFLOW SELECTION; Maittê Production Proof 01 is NEXT; Step 2C remains NOT STARTED.**

## Purpose

Step 1 established the production presentation seam and is merged on `main`.

Step 2 converts approved visual direction into a production-ready asset/composition workflow without repeating the failure mode of treating increasingly complex programmatic SVG as final illustration quality.

This gate supersedes earlier plans that assumed a center binding, a flattened north-star image, immediate Step 2C implementation before character identity locking, or final art manufactured in React paths.

## 1. Step 2 is not one giant build

Step 2 is split into reviewable sub-gates, with character production proof required before broad Overworld composition.

### Step 2A — Asset identity and production contract

**COMPLETE — DECIDED.**

Deliverables include:

- `VISUAL-ASSET-CONTRACT.md`;
- stable logical identity model;
- explicit static vs identity/variant asset distinction;
- `PRODUCTION-ASSET-GAP` classification;
- visual lock semantics for production prompts/handoffs.

### Step 2B — Character Master + presentation foundation

**COMPLETE — DECIDED.**

Closure:

`STEP-2B-CHARACTER-FOUNDATION-CLOSURE.md`

Approved master set:

- Maittê;
- Burpee;
- Pipoca;
- Will;
- Lyra.

Step 2B also established technical/concept runtime scaffolds and stable presentation seams so final authored assets can replace those scaffolds without gameplay/domain changes.

Current programmatic character drawings remain **TECHNICAL / CONCEPT RUNTIME SCAFFOLDS**, not production art.

### Character Production Asset Benchmark

**COMPLETE FOR WORKFLOW SELECTION — DECIDED.**

Method/history:

`CHARACTER-PRODUCTION-BENCHMARK.md`

Closure:

`CHARACTER-PRODUCTION-BENCHMARK-CLOSURE.md`

Workflow decision:

`CHARACTER-PRODUCTION-WORKFLOW-DECISION.md`

Result:

- ChatGPT Images — **PRIMARY**;
- Gemini / Nano Banana — **FALLBACK**;
- Adobe Firefly — **REJECTED as primary generator for the current production pass**;
- Adobe Photoshop — **PREFERRED finishing / masking / layer-preparation / export environment**.

The benchmark tested Maittê `listen-think` and Lyra `watch`. Additional generator benchmarking on Burpee/Pipoca/Will is not required before production preparation.

### Maittê Production Proof 01 — next gate

**NEXT / DECIDED SCOPE.**

Spec:

`MAITTE-PRODUCTION-PROOF-01.md`

Target:

**Maittê — `listen-think`.**

Purpose:

prove the real production preparation and runtime composition strategy for transparency, colorless/base representation, green-heart always-on behavior, independent restoration regions, masks/layers, target-scale quality and performance.

Current preferred hypothesis under test:

`one aligned full-color painting -> colorless base + independent restoration masks -> runtime reveal from the exact same painting`

This physical contract is **PROVISIONAL** until the proof passes.

### Step 2C — Overworld production composition

**NOT STARTED.**

Step 2C may proceed only after Production Proof 01 establishes a usable initial production-character asset preparation/composition strategy or explicitly records a fallback contract.

Step 2C will rebuild the Overworld at the presentation/composition layer using authored replaceable assets and the approved Step 1 seam.

Step 2C does not change subject availability, routes, progression, curriculum, evaluation or persistence semantics.

## 2. Binding Overworld visual locks

### Format and page metaphor

- landscape adventure/coloring-book notebook page;
- spiral binding on the **LEFT EDGE**, not center;
- do not implement a center-bound two-page spread;
- notebook/page metaphor belongs to presentation, not navigation/domain state.

### Geography

- one continuous connected geography;
- subject regions transition organically rather than separated islands/cards;
- Base da Esperança remains approximately central;
- all six subject regions remain independently reachable;
- relative semantic geography may be refined for composition quality without changing world identity.

### Detail language

- high density of small, closed, colorable illustration regions;
- authored/inhabited scenic density rather than sparse UI over a background;
- paths, labels and landmarks are diegetic;
- essential gameplay text remains readable even when world labels use handwritten/cursive treatment.

### Opening color state

- predominantly black ink line art on white/very-light warm paper;
- Maittê's green heart is the primary saturated opening anchor;
- no arbitrary radial tint overlays masquerading as restoration;
- color returns through progression-derived restoration layers/units.

### Characters at Base

Physical presence at/near Base da Esperança for:

- Maittê;
- Burpee;
- Pipoca;
- Will;
- Lyra.

Exact staging may be refined for composition/readability.

## 3. Approved complementary north stars

Both files under `references/visual/11-visual-production-slice-01-output/` remain binding complementary references:

- `39bf975d-91a7-442e-bc48-41f7f9fe1a58.png`;
- `46f5f1dc-42a0-4098-88a2-8cb5971d3632.png`.

Use them together:

- stronger character treatment governs character-quality direction;
- stronger connected black-and-white map governs geography, continuity, density and colorable-detail structure.

Neither file is a runtime background.

## 4. Runtime composition model

Preferred presentation stack:

`page/base -> environments -> regions -> landmarks/details -> restoration units -> characters -> foreground -> invisible hit areas`

The exact file count/format is not fixed.

Application code owns:

- responsive positioning/framing;
- composition;
- restoration masks/reveals;
- interactions/hit areas;
- transitions;
- accessibility semantics;
- acting-state selection.

Authored production assets own:

- silhouette/anatomy;
- character identity;
- line quality;
- environmental richness;
- scenic composition/detail;
- visual craft that should not be manufactured by large JSX path collections.

## 5. Overworld implementation constraints

Step 2C must preserve:

- current route/world identifiers;
- open-world subject selection semantics;
- Base da Esperança as home, not subject 7;
- derived restoration from existing facts/selectors;
- tablet-first landscape framing;
- desktop support;
- no vertical-scroll dashboard as primary map;
- diegetic world selection/hit areas;
- spatial zoom as primary world-entry metaphor.

A future page-turn transition may complement narrative/zone changes but is not authorized merely by this gate.

## 6. Production-asset rule

When a required authored layer is unavailable, classify it as:

**`PRODUCTION-ASSET-GAP`**

Allowed temporary behavior:

- retain existing concept scaffold behind the stable logical key;
- use a clearly identified temporary placeholder whose presence does not redefine the visual target.

Forbidden behavior:

- draw a low-quality replacement in React/SVG and call it production art;
- flatten an approved reference into one permanent runtime background;
- invent new canonical character identity because an asset is missing;
- alter gameplay/domain semantics to accommodate an art shortcut.

## 7. Generation/finishing-tool policy

Tool choice does not change the approved identity/reference hierarchy.

Current selected workflow:

- ChatGPT Images — primary character generation/editing;
- Gemini — fallback generation/editing;
- Photoshop — finishing/masks/layers/transparency/export;
- Firefly — not primary character generator for this pass.

A future tool may replace a production tool without changing Character Masters or architecture.

Do not select a tool merely because one isolated image looks attractive.

## 8. Immediate non-goals

Step 2 does NOT authorize:

- Science Slot 1 content rewrite;
- curriculum expansion;
- evaluator/persistence/state changes;
- XP/mastery changes;
- all-world gameplay implementation;
- final page-turn system;
- backpack systems;
- React Native/Expo rewrite;
- Capacitor packaging/release work;
- backend/accounts;
- final production animation rig;
- mass conversion of all character states before Proof 01.

## 9. Acceptance — Step 2A

**PASSED / COMPLETE.**

## 10. Acceptance — Step 2B

**PASSED / COMPLETE.**

See `STEP-2B-CHARACTER-FOUNDATION-CLOSURE.md`.

## 11. Acceptance — benchmark

**PASSED FOR WORKFLOW SELECTION.**

See `CHARACTER-PRODUCTION-BENCHMARK-CLOSURE.md`.

Production-fit criteria requiring real transparent/layered exports transfer to Production Proof 01 rather than being retroactively fabricated.

## 12. Acceptance — Maittê Production Proof 01

Proof 01 passes when the project demonstrates, at minimum:

1. clean transparent isolation of the selected Maittê painting;
2. convincing colorless/base representation from the same art;
3. always-saturated green heart;
4. independent restoration for glasses, hairStreak, hair, shirt, skirt, socks and shoes;
5. no visible mask seams/halos at target scale;
6. mixed restoration combinations remain coherent;
7. existing gameplay facts can drive the composition without persisted visual state;
8. stable `character.maitte.listen-think` / `MaitteActor` seam can remain;
9. acceptable tablet-first runtime quality/performance;
10. a clear recommendation for the physical production contract.

Detailed criteria are binding in `MAITTE-PRODUCTION-PROOF-01.md`.

## 13. Acceptance — Step 2C

Step 2C passes when:

1. Overworld reads as authored landscape coloring-book adventure page, not dashboard;
2. spiral binding is on left edge;
3. all six regions form continuous geography;
4. Base is central and Maittê + all four pets read coherently;
5. opening state is predominantly line art with green-heart anchor;
6. detail density materially approaches approved north stars;
7. runtime remains layered/composable for restoration/interaction;
8. no permanent flattened north-star background is used;
9. current routes/domain/evaluator/persistence/progression semantics remain intact;
10. missing authored layers remain explicit `PRODUCTION-ASSET-GAP`s.

**Status: NOT STARTED.**

## 14. Current authorization sequence

The visual-production sequence is now:

1. Step 2A specifications — **COMPLETE**;
2. Step 2B Character Masters + presentation foundation — **COMPLETE**;
3. character-production benchmark — **COMPLETE FOR WORKFLOW SELECTION**;
4. Maittê Production Proof 01 specification — **COMPLETE / NEXT EXECUTION GATE**;
5. Photoshop production preparation for the proof;
6. review proof exports/masks/contact sheet;
7. Claude Code Plan Mode for presentation-only runtime integration;
8. external audit of plan;
9. explicit Build authorization;
10. runtime implementation of the proof only;
11. screenshot/performance audit;
12. promote or reject the tested physical asset contract;
13. only then prepare broad Step 2C Plan Mode proposal.

No implementation agent may use benchmark completion as permission to jump directly into mass character conversion or low-quality Step 2C art replacement.