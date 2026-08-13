# Visual Production — Step 2 Gate

**Status:** DECIDED gate and sequencing; production assets remain PROVISIONAL until explicitly approved; mobile packaging remains FUTURE/PROVISIONAL.

## Purpose

Step 1 established the production presentation seam and is merged on `main`.

Step 2 must now convert approved visual direction into a production-ready asset/composition workflow without repeating the Phase 1B failure mode of treating increasingly complex programmatic SVG as final illustration quality.

This gate supersedes any earlier Step 2 plan that assumed a center binding, a flattened north-star image, or immediate implementation before character/environment identity locking.

## 1. Step 2 is not one giant build

Step 2 is deliberately split into three reviewable sub-gates.

### Step 2A — Asset identity and production contract

**DECIDED:** complete before production-character or Overworld replacement work.

Deliverables:

- `VISUAL-ASSET-CONTRACT.md` merged;
- stable logical identity model understood by implementation;
- explicit distinction between static assets and identity/variant assets;
- `PRODUCTION-ASSET-GAP` used when final authored art is missing;
- approved visual locks carried into production prompts/handoffs.

No child-facing visual redesign is required in Step 2A.

### Step 2B — Character Master production

**DECIDED:** create/review approved master identity for Maittê and the four pets before using generated character art as canonical runtime identity.

Required master set:

- Maittê;
- Burpee;
- Pipoca;
- Will;
- Lyra.

The master review must prioritize identity consistency before pose count.

Maittê must preserve `MAITTE.md`/`CHARACTER-ART.md` traits. Each pet must remain species-readable and individually recognizable.

Acting variants may be produced after the base master model is approved. Do not regenerate the full identity from scratch for each pose.

### Step 2C — Overworld production composition

**DECIDED:** only after the required Character Masters are approved or an explicit temporary `PRODUCTION-ASSET-GAP` is accepted for a named layer.

The Overworld is rebuilt at the presentation/composition layer using authored replaceable assets and the approved Step 1 seam.

Step 2C does not change subject availability, routes, progression, curriculum, evaluation or persistence semantics.

## 2. Binding Overworld visual locks

The following are **DECIDED** based on product review of the complementary approved north stars.

### Format and page metaphor

- landscape adventure/coloring-book notebook page;
- spiral binding is on the **LEFT EDGE** of the composition, not in the center;
- do not implement the approved target as a two-page spread with a center binding;
- the page/notebook metaphor belongs to presentation, not to navigation state or domain data.

### Geography

- one continuous connected geography;
- subject regions transition organically into neighboring regions rather than reading as separated islands/cards;
- Base da Esperança remains approximately central;
- all six subject regions remain independently reachable in the global model;
- broad relative placement from `OVERWORLD.md` remains the starting semantic geography, while final scenic geometry may be refined for composition quality.

### Detail language

- high density of small, closed, colorable illustration regions;
- scenic detail must make the page feel authored/inhabited rather than sparse UI-over-background;
- paths, labels and landmarks are diegetic parts of the illustration;
- essential gameplay reading remains legible even if world labels use handwritten/cursive storybook lettering.

### Opening color state

- predominantly black ink line art on white/very-light warm paper;
- Maittê's green heart remains the primary saturated opening anchor;
- do not fake restoration with arbitrary radial tint overlays;
- restored color appears through progression-derived restoration layers/units.

### Characters at the Base

The approved visual direction includes physical presence at/near Base da Esperança for:

- Maittê;
- Burpee;
- Pipoca;
- Will;
- Lyra.

Exact staging may be refined for composition/readability, but the intended home-world identity is the group, not a generic solo avatar pasted over the map.

## 3. Approved complementary north stars

Both files under `references/visual/11-visual-production-slice-01-output/` remain binding complementary references:

- `39bf975d-91a7-442e-bc48-41f7f9fe1a58.png`
- `46f5f1dc-42a0-4098-88a2-8cb5971d3632.png`

Use them together:

- stronger character treatment governs character-quality direction;
- stronger connected black-and-white map governs geography, world continuity, density and colorable-detail structure.

Neither file is a runtime background.

## 4. Runtime composition model

The preferred presentation stack is:

`page/base -> environments -> regions -> landmarks/details -> restoration units -> characters -> foreground -> invisible hit areas`

The exact file count/format is not fixed.

Application code owns:

- responsive positioning/framing;
- asset composition;
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
- no vertical-scroll dashboard as the primary map;
- diegetic world selection/hit areas;
- spatial zoom as the primary world-entry metaphor.

A future page-turn transition may complement narrative/zone changes but is not authorized merely by this gate.

## 6. Production-asset rule

When a required authored layer is not available, classify it as:

**`PRODUCTION-ASSET-GAP`**

Allowed temporary behavior:

- retain existing concept scaffold behind the stable logical key;
- use a clearly identified temporary placeholder whose presence does not redefine the visual target.

Forbidden behavior:

- draw a low-quality replacement in React/SVG and call it production art;
- flatten the approved reference image into one runtime background;
- invent new canonical character identity because a master asset is missing;
- alter gameplay/domain semantics to accommodate an art shortcut.

## 7. Generation-tool policy

Image-generation/editing tools are replaceable production tools.

**DECIDED:** tool choice does not change the approved identity/reference hierarchy.

When benchmarking tools, evaluate:

- identity preservation;
- reference/composition fidelity;
- localized-edit preservation;
- line-art cleanliness;
- character species/age/proportion consistency;
- ability to produce separable/layer-compatible assets;
- iteration cost/time.

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
- native React Native/Expo rewrite;
- Capacitor packaging/release work;
- backend/accounts;
- final production animation rig.

## 9. Acceptance criteria — Step 2A

Step 2A passes when:

1. visual asset identity/variant rules are versioned;
2. approved assets are distinguished from generated drafts;
3. missing art is explicitly `PRODUCTION-ASSET-GAP`;
4. physical filenames are not promoted into gameplay/domain contracts;
5. production prompts can state what is locked vs generative;
6. no child-facing visual behavior changed merely to document the contract.

## 10. Acceptance criteria — Step 2B

Step 2B passes when:

1. Maittê has an approved master identity consistent with specs;
2. each of the four pets has an approved master identity and species readability;
3. masters can support later poses/scales without identity drift;
4. no master is considered approved solely because an image generator produced it;
5. approval status is recorded in the repository/reference system.

## 11. Acceptance criteria — Step 2C

Step 2C passes when:

1. opening Overworld reads as an authored landscape coloring-book adventure page, not a dashboard;
2. spiral binding is visibly on the left edge, not center;
3. all six subject regions form one continuous geography;
4. Base da Esperança is central and Maittê + all four pets read coherently within the world;
5. opening color state is predominantly line art with the green-heart hope anchor;
6. scenic/detail density materially approaches the approved north-star direction;
7. runtime is layered/composable enough for restoration and interaction;
8. no permanent flattened north-star background is used;
9. current routes, domain, evaluator, persistence and progression semantics remain intact;
10. missing final authored layers are reported as `PRODUCTION-ASSET-GAP`, not silently replaced with production-claimed programmatic art.

## 12. Implementation authorization sequence

The next implementation agent must not jump from Step 1 directly to a large Step 2C rewrite.

Sequence:

1. merge Step 2A specifications;
2. inspect both approved north stars and identity references;
3. plan Character Master production/review;
4. explicitly approve the required masters or accepted gaps;
5. Plan Mode proposal for Step 2C against the approved assets/contracts;
6. audit plan;
7. explicit Build authorization;
8. implementation;
9. screenshot/runtime audit before further visual scope.