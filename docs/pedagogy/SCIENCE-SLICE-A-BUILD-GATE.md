# Science Slice A — Build Gate

**Status:** DECIDED Build-gate corrections; first-zone name/visual treatment and exact final item count remain PROVISIONAL.

## Purpose

This document reconciles the Lovable Science Slice A Plan with the approved Grade 2 Science sources and the current runtime architecture before Build authorization.

It resolves the plan's declared blockers and corrects source-traceability errors that must not reach implementation.

## 1. Plan disposition

The Lovable plan is approved in direction, subject to this document and the linked technical/ADR decisions.

Approved directions include:

- Science Slice A only;
- Oceano das Descobertas as Science world container;
- coast/entry first Board;
- reusable sort/match/scene/multi-part interactions;
- observation → relationship → evidence;
- spoken/replayable instructions;
- no free-response AI grading;
- existing persistence/restoration/success-return architecture;
- concept assets now, production assets later.

The following parts of the returned plan are superseded by this Build Gate where they conflict.

---

# 2. Source-traceability correction

The returned plan used several page ranges that were too broad or shifted. Slice A item authoring must use these verified anchors.

## p.94–98 — environment observation/composition

Use for the opening investigation of what an environment contains and observation of natural environments.

Do not transform this into a pure vocabulary quiz.

## p.99 — Floresta Amazônica and Mata Atlântica

Source-supported anchors include:

- Floresta Amazônica: large/humid forest; frequent rain; diverse trees; boto-vermelho / boto-cor-de-rosa shown as an animal of the region;
- Mata Atlântica: rainy forest nearer the coast; source mentions varied plants and animals.

Exact photographic/animal choices used by an item must remain source-backed.

## p.100 — Caatinga and Cerrado

Source-supported anchors include:

- Caatinga: hot/dry; little rain; plants with thorns/thick stems such as mandacaru/xique-xique; asa-branca shown;
- Cerrado: dry/rainy seasons; trees adapted with twisted/thick trunks; lobo-guará shown.

## p.101 — Pampa and Pantanal

Source-supported anchors include:

- Pampa: colder climate; fields/low vegetation; gato-dos-pampas shown;
- Pantanal: large plain that floods in the rainy season; aquatic and other plants; jacaré-de-papo-amarelo shown.

Therefore the six named Brazilian environments are primarily introduced across **pp.99–101**, with later practice/review on pp.106–108.

## p.102–103 — terrestrial/aquatic environments and adaptation

These pages explicitly support terrestrial/aquatic examples and body/behavior characteristics that help animals live where they live.

Source-supported examples include, among others:

- macaco-prego: strong arms/legs and fingers helping movement/climbing;
- onça-pintada: spots helping camouflage in forest light/shadow;
- calango: can spend substantial time without drinking water;
- tatu: burrows/holes used for protection from heat;
- tamanduá-bandeira: long tongue helps capture ants/termites;
- veado-campeiro: good vision helps perceive predators and flee;
- fish: gills obtain oxygen from water and fins help movement;
- sea turtles: paddle-shaped limbs help swimming;
- boto-vermelho is explicitly described as a mammal that rises to the surface to breathe.

These facts are suitable for adaptation/habitat reasoning when reproduced at Grade 2 level and source-bounded.

## p.104 — camouflage

This is the primary explicit camouflage source page.

Source-supported examples:

- bicho-pau resembles a twig and blends with plant branches;
- onça-pintada spots blend with light/shadow in the forest;
- borboleta-folha can resemble a dry leaf when wings are closed.

The source explicitly connects camouflage with making detection by predators/prey more difficult.

## p.105 — aquatic × terrestrial classification practice

The school activity explicitly groups illustrated animals as aquatic or terrestrial.

The page includes aquatic examples such as orca, seal, octopus and jellyfish, and terrestrial examples such as toucan, ema, armadillo, cow and lion.

This page is a strong source for `SCI-ENV-LANDWATER-01` classification practice.

## p.106 — environment clues + camouflage comparison

The page asks the learner to identify natural environments from clues. Source-supported clue cases include:

- lobo-guará / natural fires that do not harm adapted plants → Cerrado;
- rainy/hot environment + boto-cor-de-rosa → Floresta Amazônica;
- hot/rainy forest + mico-leão-dourado → Mata Atlântica.

The page also compares bicho-pau and camaleão and identifies camouflage as the shared characteristic.

## p.107 — animal ↔ Brazilian environment review

Use as a review anchor for relating source-presented animals to the named Brazilian environments.

Exact animals must be copied from the source image/approved pack, not invented by the implementation agent.

## p.108 — Amazon-animal review/crossword

This is review material and may supply source-backed animal examples, but the game must not copy the crossword as its interaction model.

## p.118–119 — synthesis / learning goals

Use only as integrated source anchors:

- environment diversity;
- adaptation;
- interdependence;
- camouflage;
- source learning goals.

Page 117 remains `SOURCE-GAP` and is not authorized.

---

# 3. First Board scope

The returned plan's first Board scope is approved as PROVISIONAL for this Build:

- world: **Oceano das Descobertas**;
- first-zone working name: **Praia das Conchas**;
- **6 meaningful Activity Slots**;
- coast/expedition visual context;
- future deeper destination visible but not playable;
- no dashboard/cards.

Six Slots are approved because they correspond to six coherent Science investigation stations, not because six is a permanent world rule.

The world must remain able to add/reorder future Slots/Zones.

---

# 4. Six investigation stations

The six Board Slots are curriculum placements, but each Slot executes its own configured Activity sequence. Do not implement the returned plan as one single Activity per Slot.

The binding orchestration is defined in `docs/technical/CONTENT-ORCHESTRATION.md`.

## Slot 1 — Environment investigation

Core Skills:

- `SCI-ENV-COMP-01`;
- supporting `SCI-OBS-CHAR-01`.

Sequence should include, at minimum:

- Discover: inspect a natural environment and notice multiple elements;
- Practice: classify/select living/non-living observations using an explicit criterion;
- Challenge: make a conclusion and select the observation that supports it.

Primary source: pp.94–98.

## Slot 2 — Brazilian environments

Core Skill:

- `SCI-ENV-BRAZIL-01`.

Sequence:

- Discover: guided visual/spoken introduction of the six source environments;
- Practice: match/identify environments using more than one observable cue;
- Challenge: identify an environment from a new source-bounded clue/image without a long reading passage.

Primary source: pp.99–101; practice/review support pp.106–107.

## Slot 3 — Animal and environment

Core Skill:

- `SCI-ENV-HABITAT-01`;
- supporting `SCI-OBS-CHAR-01`.

Sequence:

- Discover: observe source examples of animals and where they live;
- Practice: organism ↔ environment matching;
- Challenge: choose an environment and then select supporting evidence/clue.

Strong source cases may include the p.106 lobo-guará/Cerrado, boto/Amazon and mico-leão-dourado/Mata Atlântica clues, plus validated p.107 review examples.

## Slot 4 — Water or land is a habitat criterion

Core Skill:

- `SCI-ENV-LANDWATER-01`.

Sequence:

- Discover: explicitly establish terrestrial versus aquatic environment as the criterion;
- Practice: classify source-presented animals from p.105;
- Challenge: conceptual contrast showing that "lives in water" does not by itself imply "is a fish".

The boto-vermelho source on p.102 is approved for this contrast because the book explicitly describes it as a mammal that surfaces to breathe.

Do not introduce advanced taxonomy beyond the source.

## Slot 5 — Adaptation: characteristic → function

Core Skill:

- `SCI-ENV-ADAPT-01`.

Sequence:

- Discover: observe a source characteristic and what it helps the animal do;
- Practice: generic matching of characteristic ↔ function;
- Challenge: multi-part response requiring characteristic/function evidence in a source-supported context.

Primary source: pp.102–103, with camouflage kept conceptually distinct for Slot 6.

## Slot 6 — Camouflage and integrated investigation

Core Skill:

- `SCI-ENV-CAMOUFLAGE-01`;
- integrates appropriate prior Slice A Skills without introducing later slices.

Sequence:

- Discover: source examples of camouflage;
- Practice: scene investigation with large hit areas;
- Challenge: find/identify the organism or camouflage cue **and** choose why the camouflage makes detection harder; the final item may also integrate environment/adaptation evidence.

Primary source: p.104 and p.106; synthesis support p.118.

Hidden-object speed alone is not full Skill evidence.

---

# 5. Reusable interaction decisions

Approved reusable template needs:

1. generic group sorting (`placement` response);
2. generic pair/target matching (`placement` response);
3. generic multi-part conclusion/evidence interaction (`composition` response);
4. generic illustrated scene investigation (`selection` response).

Do not create a new shared response kind called `evidence`.

Evaluation follows ADR-010.

A Science-specific template name such as `PuzzleAmazonia`, `PuzzleBoto`, `PuzzleCamuflagem` is prohibited.

---

# 6. Evaluation semantics

For a multi-part conclusion/evidence Challenge:

- conclusion correct + evidence correct → `correct`;
- conclusion correct + evidence incorrect → `partially-correct` with generic per-part detail and diagnostic code;
- conclusion incorrect → `incorrect`;
- assisted success remains `assisted: true` and is not equivalent to autonomous Challenge evidence.

`partially-correct` does not complete a Challenge Activity by default.

No mastery threshold is introduced.

---

# 7. Approved source-bounded item seeds

These are **authoring seeds**, not a complete item bank and not mandatory wording. They exist so Build does not invent scientific facts.

## Brazilian environment recognition

Source-backed cue sets may use:

- Floresta Amazônica: humid/rainy forest + boto-cor-de-rosa source context;
- Caatinga: hot/dry + thorny/thick-stem plants such as mandacaru/xique-xique;
- Cerrado: dry/rainy seasons + twisted/thick-trunk vegetation + lobo-guará;
- Pampa: colder climate + low field vegetation + gato-dos-pampas;
- Pantanal: floodplain/rainy-season flooding + jacaré-de-papo-amarelo;
- Mata Atlântica: rainy forest nearer coast; p.106 provides mico-leão-dourado as a practice clue.

Do not reduce an environment to one mascot/object. Use more than one cue across item variants.

## Terrestrial/aquatic sorting

Approved source examples from p.105 include:

- aquatic: orca, seal, octopus, jellyfish;
- terrestrial: toucan, ema, armadillo, cow, lion.

Use only clear, non-ambiguous source images/labels in this pack.

## Habitat/concept case

Approved p.106 clues:

- lobo-guará → Cerrado;
- boto-cor-de-rosa → Floresta Amazônica;
- mico-leão-dourado → Mata Atlântica.

Approved p.102 conceptual contrast:

- boto-vermelho lives in water and is a mammal that surfaces to breathe.

The expected lesson is that habitat and animal-group identity are different dimensions; do not require naming mammalian anatomy beyond the source.

## Adaptation

Approved source relationships include:

- tamanduá-bandeira long tongue → capture ants/termites;
- fish gills → obtain oxygen from water;
- fish fins → movement in water;
- sea turtle paddle-shaped limbs → swimming;
- veado-campeiro good vision → detect predators/flee;
- tatu burrow behavior → protection from heat;
- macaco-prego arms/legs/fingers → climb/move in trees.

Distractors must remain plausible but must not assert unsupported biology.

## Camouflage

Approved p.104 examples:

- bicho-pau ↔ branch/twig resemblance;
- onça-pintada ↔ spots blending with forest light/shadow;
- borboleta-folha ↔ dry-leaf resemblance.

Approved p.106 comparison:

- bicho-pau and camaleão share camouflage as the relevant property in the source exercise.

---

# 8. Content Pack authoring gate

The returned plan stated that final items would be authored during Build and validated item-by-item against photographed sources.

That is only acceptable under these constraints:

1. Build may instantiate items only from the source anchors and approved seeds in this repository or other source facts explicitly added to an approved Spec.
2. The implementation agent must not invent a new animal/environment/adaptation fact from general knowledge.
3. If an item needs a fact not represented in the repository Specs, stop that item and report `SOURCE-GAP` rather than authoring it.
4. Content Pack validation should store source metadata sufficient to trace each item/cluster to the approved page/range.
5. p.117 is prohibited until supplied.

The initial Build should create a **small reviewed item set sufficient to run the six stations**, not a large generated bank.

---

# 9. Companion correction

The returned plan proposed Pipoca because it described him as "curious and observant". That rationale does not match the canonical pet specification.

Canonical traits remain:

- Pipoca: adventurous, energetic, brave, quick to explore;
- Will: curious/investigative;
- Lyra: calm, observant, attentive to detail;
- Burpee: intelligent, rational, strategic.

For the first Science Build, **reuse Burpee as the default functional companion** because his runtime asset/acting/audio seam already exists and his thoughtful/observant direction is compatible with evidence prompts.

This is a technical/demo configuration, not a permanent Science assignment.

Do not create another complex hand-authored SVG pet merely to demonstrate configurability. A future Pipoca/Will/Lyra production asset can replace the configured pet through the existing companion/asset seam.

If a reviewed production/concept asset for another pet is supplied before Build, the pet id may be changed without a pedagogy/architecture change.

---

# 10. Resolved Lovable blockers

## Blocker 1 — placement/evidence schemas

**RESOLVED by ADR-010.**

- add generic placement AnswerRules/evaluator;
- use generic composition for conclusion + evidence;
- preserve generic per-part/diagnostic detail in EvidenceRecord;
- do not add Science-specific `evidence` response kind or `reasoningOutcome`.

## Blocker 2 — content registry and sequence orchestration

**RESOLVED by `docs/technical/CONTENT-ORCHESTRATION.md`.**

- generic multi-world content registry;
- routes stop hardcoding the placeholder fixture;
- sequence runner uses existing ActivitySlot `discover/practice/challenge` references;
- `completedActivityIds` drives resume;
- only final Slot completion returns to Board.

## Blocker 3 — first Board scope

**RESOLVED for current Build as PROVISIONAL.**

- Praia das Conchas;
- six meaningful Slots;
- route/visual labels remain replaceable;
- no permanent six-slot rule.

---

# 11. Build readiness conditions after plan reconciliation

The next Lovable Plan reconciliation must confirm:

1. corrected source pages in Section 2;
2. six Slots each execute an Activity sequence rather than a single mode-only Activity;
3. ADR-010 generic evaluation approach;
4. content registry/sequence orchestration from the technical Spec;
5. source-bounded item authoring only;
6. Burpee as the current technical/demo companion unless another reviewed asset is supplied;
7. no Science-specific state/evaluator engine;
8. no later Science slices or Mathematics content.

If those are reflected, Science Slice A may move to Build authorization.
