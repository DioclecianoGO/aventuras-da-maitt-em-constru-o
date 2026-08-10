# Science — Grade 2

**Status:** DECIDED current content direction; detailed item authoring remains PROVISIONAL until source-by-source Content Packs are approved.

## Purpose

This document defines the pedagogical structure of Grade 2 Science for the next playable content delivery of **Aventuras da Maittê**.

It is not a transcription of the textbook and it is not a transcription of the Claude-produced `Expedição Natureza` packet.

The source audit lives in `SCIENCE-SOURCE-MAP.md` and governs what may be treated as curriculum evidence.

---

# 1. Current delivery decision

**DECIDED:** Science is the current active curricular implementation priority.

Mathematics remains preserved in the repository and will be resumed later. This is a sequencing change, not deletion or invalidation of the Mathematics specifications.

The first useful Science content slice is:

**Science Slice A — Ambientes, Animais & Adaptações.**

It should be planned and implemented before resuming Mathematics content expansion.

---

# 2. Source authority

For every Science item distinguish:

- **Didactic source:** what the photographed school material explicitly teaches/asks.
- **Observed exercise evidence:** the type of discrimination, classification, sequencing or explanation the learner is asked to perform.
- **Pedagogical inference:** a possible misconception or underlying reasoning skill.
- **Product decision:** how the game teaches/practices/collects evidence.

Never collapse those categories.

The Claude review packet is a secondary activity-design reference only.

---

# 3. Science learning principles

1. Science tasks should reward **observation + relationship + evidence**, not isolated vocabulary recall only.
2. When possible, ask or represent **“como você sabe?”** through choices, evidence cards, images or follow-up reasoning — without requiring unsupported automated assessment of free speech/text.
3. Classification must make the criterion clear. Correctly placing an animal for the wrong reason is weaker evidence than choosing the relevant characteristic.
4. Do not confuse distinct dimensions such as **where an animal lives**, **what it eats**, **how it moves**, and **what covers its body**.
5. Appearance alone must not become the implicit classifier when the source concept depends on another property; e.g. living in water is not sufficient evidence that an animal is a fish.
6. Life-cycle sequencing and metamorphosis are related but not identical concepts.
7. Discover, guided practice and independent Challenge remain separate evidence contexts.
8. Assisted success is not equivalent to independent evidence.
9. Visual richness must not leak the answer; habitat, color, size or placement should not accidentally encode correctness.
10. Essential instructions remain spoken/replayable and must not require independent reading to begin.
11. Content must remain independent from world scenery. The Science biome does not own the curriculum.
12. A single correct answer is not mastery.

---

# 4. Initial Grade 2 Science skill taxonomy

Skill IDs are stable internal identifiers. Grouping can be refined, but implementations must not casually rename IDs once evidence has been persisted against them.

## OBS — Observation, comparison and classification

- `SCI-OBS-CHAR-01` — observe and compare relevant characteristics of animals/living beings such as body form, covering, size, color or other source-supported features.
- `SCI-OBS-GROUP-01` — group/classify animals or living beings using an explicit criterion and distinguish one criterion from another.

These skills restore content that is source-supported in the chapter opening and comparison/grouping activities but underrepresented in the secondary review packet.

## ANIMAL — Animal characteristics and feeding

- `SCI-ANIMAL-FOOD-01` — distinguish source-supported feeding categories/examples such as herbivore, carnivore and omnivore.
- `SCI-ANIMAL-MOUTH-01` — relate source-supported mouth/beak/dentition characteristics to feeding function.
- `SCI-ANIMAL-COVER-01` — identify/compare body coverings represented in the source, such as hair/fur, feathers, scales, carapace and uncovered/naked skin terminology used by the school material.
- `SCI-ANIMAL-MOVE-01` — recognize source-supported movement/locomotion characteristics when used as an observation/grouping criterion.

Exact animal examples belong in Content Packs, not in the Skill definition.

## LIFE — Changes and life cycles

- `SCI-LIFE-CHANGE-01` — recognize that living beings change, grow and develop through life.
- `SCI-LIFE-CYCLE-01` — order/relate source-supported stages in a life cycle.
- `SCI-LIFE-META-01` — recognize metamorphosis as a sequence of substantial body-form changes in source-supported examples and distinguish it from gradual growth.

## ENV — Environments, Brazilian environments and adaptation

- `SCI-ENV-COMP-01` — observe what composes a natural environment and distinguish relevant living/non-living elements when supported by the source activity.
- `SCI-ENV-BRAZIL-01` — recognize and differentiate the six named Brazilian environments represented in the school source: Floresta Amazônica, Mata Atlântica, Caatinga, Cerrado, Pantanal and Pampa.
- `SCI-ENV-HABITAT-01` — relate source-supported animals/living beings to the environment/place where they live.
- `SCI-ENV-LANDWATER-01` — distinguish terrestrial and aquatic environments/examples.
- `SCI-ENV-ADAPT-01` — relate a characteristic/behavior of a living being to what it helps the organism do in its environment.
- `SCI-ENV-CAMOUFLAGE-01` — recognize camouflage as a characteristic/strategy that can make detection by predators/prey more difficult in an environment.

## REL — Relationships/interdependence among living beings

- `SCI-REL-INTERDEP-01` — understand source-supported examples of living beings depending on/helping one another in nature.
- `SCI-REL-POLLINATION-01` — recognize pollination in source-supported animal-plant relationships.
- `SCI-REL-DISPERSAL-01` — recognize source-supported seed-dispersal relationships.
- `SCI-REL-PLANT-ROLE-01` — relate plants to source-supported roles such as food, shelter/abrigo and oxygen for living beings.

## CARE — Nature care

- `SCI-CARE-ACTION-01` — distinguish actions that care for/protect natural environments from actions that damage them.
- `SCI-CARE-PROPOSE-01` — propose or choose reasonable source-aligned actions to help protect a natural environment.

`SCI-CARE-PROPOSE-01` may require constrained-choice or adult-mediated evidence in the current MVP; do not invent automated scoring for unrestricted free-form proposals.

---

# 5. Misconception/evidence patterns worth preserving

These are diagnostic patterns, not student diagnoses.

## Appearance versus defining evidence

Example pattern: “lives in water → therefore fish”.

Desired evidence: child distinguishes habitat from characteristics such as breathing/body-group properties used by the authored item.

## Habitat versus feeding

The child may know that an animal lives in a forest but still confuse that fact with what it eats.

Game implication: keep `environment` and `feeding` as separate data dimensions and sometimes contrast them explicitly.

## Metamorphosis versus ordinary growth

The child may overgeneralize that every animal undergoes metamorphosis, or that no animal does.

Game implication: use contrasting examples and sequence evidence, not a single memorized definition.

## Adaptation as purpose-looking decoration

The child may match a visually striking feature to any attractive outcome.

Game implication: require a plausible characteristic → function → environment relationship.

## Correct after assistance

This is useful learning evidence but not the same as autonomous Challenge evidence.

The exact mastery threshold remains outside this document.

---

# 6. Reusable Science challenge families

These are pedagogical interaction families, not bespoke screen names.

## CH-SCI-SORT — Classify by an explicit criterion

**Possible skills:** OBS-GROUP, ANIMAL-FOOD, ANIMAL-COVER, ENV-LANDWATER.

Possible interactions:

- drag/tap animals or observations into labeled visual groups;
- first hear/see the criterion, then classify;
- optionally ask a second evidence choice for one item.

The grouping criterion must be authored; the template must not infer it from scenery.

## CH-SCI-MATCH — Connect characteristic, organism, environment or function

**Possible skills:** ANIMAL-MOUTH, ENV-HABITAT, ENV-ADAPT, REL-POLLINATION, REL-DISPERSAL, REL-PLANT-ROLE.

Possible interactions:

- organism ↔ environment;
- body characteristic ↔ function;
- animal/plant relationship ↔ effect.

Avoid layout that makes pairs obvious by proximity or visual symmetry.

## CH-SCI-EVIDENCE — Choose the observation that supports the conclusion

**Possible skills:** ENV-ADAPT, ENV-HABITAT, OBS-CHAR, LIFE-META.

Two-stage pattern:

1. choose/classify a conclusion;
2. choose the relevant observation/evidence.

This family is important for “como você sabe?” without requiring automated free-text grading.

## CH-SCI-SEQUENCE — Put a natural process in order

**Possible skills:** LIFE-CYCLE, LIFE-META.

Reuse the proven ordering interaction where appropriate, with stable item identity and deliberate confirmation when intermediate arrangements could create false evidence.

## CH-SCI-SCENE — Investigate an illustrated environment

**Possible skills:** ENV-COMP, ENV-CAMOUFLAGE, OBS-CHAR.

Possible interactions:

- find/select living versus non-living elements;
- locate a camouflaged animal;
- inspect a detail, then answer an evidence question.

A “hidden object” success alone is not enough evidence of scientific understanding when the skill requires explaining why camouflage works; pair it with a concept/evidence step.

## CH-SCI-CASE — Small scientific situation / misconception check

**Possible skills:** ENV-LANDWATER, ENV-ADAPT, LIFE-META, REL-INTERDEP.

Example structure:

- companion presents a short visual situation;
- child decides between plausible explanations;
- a follow-up evidence choice distinguishes conceptual understanding from guessing.

---

# 7. Discover → Practice → Challenge

Every implemented Science skill should support the same learning-mode separation already used by the product.

## Discover

Purpose: observe and build the relationship.

- companion/audio introduces what to notice;
- visual scene/object can be explored;
- source-supported characteristic/function is demonstrated;
- worked/guided response does not count as independent mastery evidence.

## Practice

Purpose: vary examples and strengthen discrimination.

- immediate non-punitive feedback;
- optional replay/hint;
- after error, focus attention on the relevant property rather than reveal the answer instantly;
- vary organism/image/representation while keeping the same Skill.

## Challenge

Purpose: collect autonomous evidence.

- new but source-bounded examples/representations;
- no answer-revealing help before the first attempt;
- where important, pair classification with evidence/reasoning;
- log assistance/retry separately.

---

# 8. Science Slice A — Ambientes, Animais & Adaptações

**Status:** DECIDED as the next active content slice.

## Purpose

Deliver the first real Science study path using source-strong content that supports image-first, spoken, reusable interactions.

This slice is grounded primarily in textbook pp.94–108 and reinforced by the pp.118–119 synthesis/auto-assessment.

## Required core skills

1. `SCI-ENV-COMP-01`
2. `SCI-ENV-BRAZIL-01`
3. `SCI-ENV-HABITAT-01`
4. `SCI-ENV-LANDWATER-01`
5. `SCI-ENV-ADAPT-01`
6. `SCI-ENV-CAMOUFLAGE-01`

Supporting observation skill:

7. `SCI-OBS-CHAR-01`

## Required challenge-family coverage

At minimum the approved implementation plan must use compatible reusable forms of:

- `CH-SCI-SORT`;
- `CH-SCI-MATCH`;
- `CH-SCI-EVIDENCE`;
- `CH-SCI-SCENE` or an equivalent investigation interaction.

`CH-SCI-CASE` is strongly recommended for conceptual contrasts such as aquatic habitat versus animal classification.

## Minimal learning progression

### A. Discover environments

- observe that natural environments contain multiple elements;
- distinguish living/non-living observations where the authored source item supports it;
- introduce the idea that different environments have different conditions/living beings.

### B. Recognize Brazilian environments

- visually distinguish source-supported characteristics of the six named environments;
- do not require reading long biome descriptions as the primary interaction;
- use spoken narration + images + short labels.

### C. Relate animals to environments

- match/classify source-supported animals to environments;
- vary the interaction so success is not only memorizing a single fixed pair layout.

### D. Terrestrial × aquatic

- classify examples;
- include at least one case that prevents “lives in water = fish” reasoning from becoming an implicit rule.

### E. Adaptation

- connect characteristic → function → environment;
- examples must remain within the validated source/content pack.

### F. Camouflage / investigation

- inspect a scene and identify camouflage;
- follow with a concept/evidence question so the challenge measures more than visual search speed.

### G. Integrated Challenge

A final Slice A challenge should combine at least two dimensions without turning into a reading test, e.g.:

- identify a likely environment from visual evidence;
- select an animal/characteristic compatible with it;
- choose why the characteristic helps.

Exact item count, order and source examples remain Content Pack decisions and must be reviewed in Plan Mode before Build.

---

# 9. Later Science slices

These are documented to preserve the curriculum but are not authorized for the immediate Slice A Build unless explicitly included later.

## Slice B — Animals, characteristics and feeding

Candidate skills:

- OBS-CHAR;
- OBS-GROUP;
- ANIMAL-FOOD;
- ANIMAL-MOUTH;
- ANIMAL-COVER;
- ANIMAL-MOVE.

## Slice C — Life changes and metamorphosis

Candidate skills:

- LIFE-CHANGE;
- LIFE-CYCLE;
- LIFE-META.

## Slice D — Interdependence, plants and care

Candidate skills:

- REL-INTERDEP;
- REL-POLLINATION;
- REL-DISPERSAL;
- REL-PLANT-ROLE;
- CARE-ACTION;
- CARE-PROPOSE.

The sequencing B/C/D is `PROVISIONAL`; current implementation authorization is Slice A only.

---

# 10. Content authoring constraints

1. Do not copy workbook pages directly into the game.
2. Do not copy the Claude packet mission screens directly into the game.
3. Long text must be transformed into child-appropriate spoken/visual presentation without changing the scientific objective.
4. Exact animal/environment facts used in an item must be validated against the source pack before shipping.
5. Distractors must be plausible enough to measure the concept but must not introduce unsupported factual claims.
6. Visual assets must not encode the correct answer through size, brightness, position or decorative salience.
7. A pet may introduce, hint and react, but pet identity must not become a permanent Skill/subject rule.
8. The evaluator must use authored answer/evidence rules; visual components never decide scientific correctness.
9. Free-form “explain why” is not automatically machine-scored in the current no-ASR MVP. Prefer constrained evidence interactions or adult-mediated/offline discussion when open explanation is desired.
10. Page 117 remains a `SOURCE-GAP` until supplied; no Content Pack may cite it as known source content.

---

# 11. Evidence and mastery boundary

Maintain per-Skill evidence compatible with the existing product model:

- independent correct attempts;
- incorrect attempts;
- assisted correct attempts;
- retries/hints;
- representation/challenge family;
- relevant reasoning/evidence step where implemented.

Do not promote a Skill to mastery from one correct response.

The Claude packet's suggestion that a topic is mastered after autonomous explanation on two separate days is **not** a binding engine threshold.

Exact mastery policy remains a separate GAP until explicitly specified.

---

# 12. Slice A acceptance boundary

Science Slice A is useful only if the child can, with spoken/replayable instructions and without adult interpretation for every step:

- enter the Science World;
- complete multiple environment/animal/adaptation challenges;
- distinguish at least more than one classification criterion rather than using a single superficial cue;
- receive supportive feedback/hints;
- return to the Science Board after success;
- observe progress/restoration derived from existing facts;
- resume after reload;
- produce evidence through reusable templates rather than one-off hardcoded quiz screens.

A visually attractive animal-matching demo without source fidelity or reasoning/evidence separation is not sufficient.
