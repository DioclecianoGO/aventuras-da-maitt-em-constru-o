# Science World — Oceano das Descobertas

**Status:** DECIDED subject-world role and content/scenery separation; visual zones and exact landmarks remain PROVISIONAL.

## Purpose

The Science World is the subject container for Grade 2 Science content in **Aventuras da Maittê**. It must receive animal observation, life cycles, environments, adaptation, plant/animal relationships and nature-care content without permanently binding the scenery to one curricular topic.

The current active content delivery is **Science Slice A — Ambientes, Animais & Adaptações**, defined in `docs/pedagogy/SCIENCE-GRADE-2.md`.

## 1. Identity

**DECIDED current world name:** **Oceano das Descobertas**.

The world is an expedition/scientific-discovery setting whose spatial identity moves from coast/surface toward deeper observation spaces.

The ocean identity does **not** mean Science content is restricted to aquatic biology. A terrestrial Brazilian environment, animal characteristic or plant relationship may be studied through expedition devices, specimens, maps, observation windows, field journals, recovered images or other diegetic investigation tools.

Rule:

> The world provides the adventure context; the Content Pack provides the science.

Do not create permanent scenery named after individual curricular objectives merely to justify the content.

## 2. Structural rules

1. Science content remains data-driven and independent from the biome.
2. The same Science World must be able to host all documented Grade 2 Science slices without redesigning its permanent geography.
3. Global subject choice remains open; local progression inside a Science route/Zone may be sequential.
4. Activity Slots are embedded in scenery and may manifest as expedition/science objects, but the object type must not determine the Skill.
5. Spoken/replayable instructions remain required for essential challenge comprehension.
6. Completion/restoration uses the existing facts/selectors architecture; Science must not introduce a separate progression store.
7. Companion assignment remains configurable and may not be hardcoded to Science or a specific Skill.
8. Visual assets remain replaceable through the asset-production/visual-config seam.
9. Science must reuse the existing Challenge Stage/evaluator/persistence architecture rather than create a parallel subject-specific engine.
10. Final production illustration is not a prerequisite for validating the content loop.

## 3. Provisional spatial concept

The following locations are **PROVISIONAL visual/narrative zones**, not curriculum containers:

- **Praia das Conchas** — coast/entry/expedition departure;
- **Recife Encantado** — shallows/reef exploration;
- **Caverna das Bolhas** — cave/hidden-observation transition;
- **Observatório Abissal** — distant/final landmark for deeper discovery.

These names may change after visual review. They must not become permanent mappings such as “Praia = terrestrial/aquatic lesson” or “Recife = adaptation lesson”. Content can move between compatible Activity Slots without changing its scientific meaning.

## 4. Science Slice A presentation strategy

Slice A covers environments, animals and adaptation, including terrestrial Brazilian environments. The Science World should make this coherent through **expedition observation**, not by pretending every studied environment physically exists underwater.

Approved concept classes include:

- a map/table showing distant environments;
- an observation window that reveals a terrestrial scene;
- field-photo/specimen cards brought back by explorers;
- a research table with habitat evidence;
- binocular/periscope/telescope-style observation;
- a projection or illustrated field journal;
- recovered natural-history panels.

The child should feel that Maittê is **investigating nature from an expedition world**, not opening a school dashboard.

## 5. First playable Science Board

**PROVISIONAL:** use the coast/entry side of Oceano das Descobertas as the first Science Board rather than jumping directly to the deepest location.

Visual direction:

- oblique/elevated storybook coastline;
- tide pools, rocks, shells, plants and expedition objects;
- sea visible as a deeper destination;
- a route through local landmarks/Activity Slots;
- environmental detail with clean negative space around active challenges;
- Maittê visibly present on the route;
- one companion may appear organically;
- future deeper zone visible for anticipation;
- line-art/stolen-color treatment compatible with global restoration.

The exact first-zone name, route length, slot count and asset set remain PROVISIONAL and must be proposed in Plan Mode.

## 6. Activity Slot visual language

Science Activity Slots may appear through scenery such as observation stations, specimen tables, shell/rock clusters, field notebook/map stands, magnifying/science kits, periscope-like objects, research lanterns or terrain clues.

These are **presentation manifestations only**.

Do not add `scienceSkill`, `habitatType`, `animalType` or art identifiers to the educational ActivitySlot merely because one visual object suggests them. Visual configuration may map a stable slot id to an object/asset without changing the curriculum model.

## 7. Challenge Stage skin

The universal Challenge Stage structure remains shared across subjects. Science may resolve a world-specific presentation such as an expedition field table, observation frame, tide-pool/rock staging surface, illustrated field card or specimen-viewing area.

The skin must preserve Board spatial/perceptual continuity, companion speech/replay behavior, large tablet touch targets, clean interaction zone, reduced-motion behavior, PuzzleTemplateHost and evaluator boundary.

Do not build a second Science-only modal framework.

## 8. Companion use

Burpee, Pipoca, Will or Lyra may participate. No pet is permanently assigned to Science.

Possible roles include noticing a clue, asking “como sabemos?” through a short spoken prompt, reacting to an observation, giving a non-answer-revealing hint or celebrating a discovery.

A pet must not provide the answer inside the essential instruction. Companion dialogue is presentation configuration, not Skill logic.

## 9. Color-restoration behavior

Science uses the same global metaphor: starting scenery is substantially stolen-color/line-art; challenge completion restores local concrete units/details; route/zone/world progress is derived from existing completion facts; restoration is not stored as a second visual truth.

Science-specific restoration examples may include a coral/plant cluster regaining color, shells/details becoming vivid, an observation instrument recovering paint, local water-life details appearing or a landmark regaining selected color/details.

These are visual examples, not permanent “one challenge = one object” rules.

## 10. Narrative tool direction

The Science World is associated with **watercolor/aquarela** in the broader stolen-color narrative.

**PROVISIONAL / GAP:** exact local creature, personality, visual design and final narrative challenge are not authorized by this spec. They must not block Science Slice A.

## 11. Content boundaries

The world file does **not** define scientific truth. Science curriculum source and Skill definitions live under `docs/pedagogy/`.

Examples:

- a cactus in an observation card does not automatically mean the challenge assesses Caatinga;
- an underwater scene does not automatically mean the challenge assesses aquatic environment;
- an animal image does not automatically define its feeding category;
- a visual clue is evidence only when the Content Pack/evaluator authors it as evidence.

This separation is binding.

## 12. Current implementation boundary

The next approved planning target is Science Slice A only. A Plan may include the minimum functional Science World shell necessary to enter a Science Board and host the approved Slice A challenges.

It must not silently implement all Science slices, all four zones, final Science art, final narrative creature, final audio production, backend/account changes, a new mastery policy, microphone/ASR or a separate Science persistence/evaluation architecture.

## 13. Acceptance direction for the first Science Build

A successful first Science delivery should make it possible to:

1. select/enter Science as a real subject destination from the Overworld;
2. arrive spatially in the Science World/first Board;
3. encounter multiple source-aligned Slice A Activity Slots;
4. hear/replay essential instructions through the existing narration system;
5. use reusable puzzle templates/configuration rather than bespoke quiz pages;
6. complete an Activity and return automatically to the same Science Board;
7. see local Science restoration derived from completion facts;
8. reload and preserve progress;
9. return to the Overworld through diegetic navigation;
10. keep Science content independent from permanent scenery.

A static “Science menu” or a collection of worksheet cards does not satisfy this world specification.
