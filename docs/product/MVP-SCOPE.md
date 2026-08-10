# MVP Scope — Aventuras da Maittê

**Status:** DECIDED with explicit PROVISIONAL items

## MVP objective

Validate that the project works as an educational adventure on the web, especially on tablet, before investing in a native application or a dedicated game engine.

The MVP must prove four things:

1. the player can enter the universe and choose a subject-world;
2. curricular content can be delivered through reusable interactive challenges;
3. completing learning challenges can drive XP/progression and visible restoration of color;
4. the content system can evolve without hardcoding every exercise individually.

## Initial subject

**DECIDED:** Mathematics is the first implemented subject.

The Mathematics MVP is intentionally phased internally:

- **Slice A — Number Sense:** first end-to-end technical vertical slice, proving the architecture and learning loop;
- **Slice B — Addition, Subtraction and Problems:** required useful study path aligned to the teacher's current priorities;
- **Slice C — Plane Geometry:** required useful study path aligned to the teacher's current priorities.

Completing Slice A alone validates the technical loop, but does **not** complete the useful study MVP.

The detailed sequence belongs in `docs/pedagogy/MATHEMATICS-GRADE-2.md` and the world/container rules belong in `docs/worlds/MATHEMATICS-WORLD.md`.

## Current curricular implementation priority

**DECIDED:** Mathematics remains the first implemented subject historically and its specifications remain valid, but **current curriculum expansion is paused while the next active content delivery moves to Science**.

This is a sequencing override, not a deletion of Mathematics scope.

The next active content target is:

- **Science Slice A — Ambientes, Animais & Adaptações**.

Science Slice A may be planned and built before Mathematics Slice B/C are resumed.

The Science source audit and pedagogical sequence live in:

- `docs/pedagogy/SCIENCE-SOURCE-MAP.md`;
- `docs/pedagogy/SCIENCE-GRADE-2.md`;
- `docs/worlds/SCIENCE-WORLD.md`.

## Included in the MVP

- web application;
- tablet-oriented responsive experience;
- shared origin/overworld capable of presenting multiple subject-world destinations;
- Mathematics world as the first implemented/playable subject-world foundation;
- Science World as the next active playable subject-world for the approved Science slice;
- sequential local progression inside a subject-world where required;
- Mathematics Slice A Number Sense architecture/content path preserved for later continuation;
- Mathematics Slice B addition/subtraction/problem-solving path preserved for later continuation;
- Mathematics Slice C plane-geometry path preserved for later continuation;
- **Science Slice A — environments, animals and adaptations — as the current active curricular delivery**;
- challenge-stage framework;
- reusable/parametrizable challenge templates;
- contextual instructions with pet companions;
- **spoken/replayable essential challenge instruction support so the child is not required to read independently to begin a task;**
- concept-quality character acting sufficient for Maittê and a companion to participate in the challenge loop;
- XP/progression foundation;
- color-restoration feedback;
- basic narrative framing around stolen/restored colors;
- ability to save enough state to continue progress, if technically feasible within the selected architecture;
- subtle/gamified navigation rather than a conventional prominent header;
- page-turn-inspired transition for major context changes if it performs adequately.

## Mathematics content represented in the current source material

The source material includes:

- reading and writing numbers up to 500;
- decimal place value, units, tens and hundreds;
- composition and decomposition;
- comparison and ordering;
- numerical sequences, predecessor/successor and number lines;
- addition facts and mental calculation;
- addition algorithm;
- addition with regrouping/exchanges;
- subtraction and mental strategies;
- subtraction algorithm;
- subtraction with regrouping/exchanges;
- resolution and creation of addition/subtraction problems;
- plane geometric figures and their characteristics;
- introductory spatial solids content present in the supplied material.

Spatial solids remain documented supporting/follow-up content and are not required for today's useful MVP unless explicitly promoted.

## Current Science content represented in the supplied source material

The photographed Grade 2 Science sequence supports, among other source-mapped concepts:

- observation/comparison/grouping of animal characteristics;
- animal feeding and body characteristics;
- changes through life, life cycles and metamorphosis;
- relationships/interdependence among living beings;
- natural environments and what composes them;
- six Brazilian environments represented by the school material;
- terrestrial and aquatic environments;
- animals associated with environments;
- adaptation and camouflage;
- plants as food/shelter/oxygen relationships;
- pollination and seed dispersal;
- actions that protect or damage nature.

The complete source/audit boundary is defined in `docs/pedagogy/SCIENCE-SOURCE-MAP.md`; the Claude-produced review packet is secondary evidence and does not supersede the school source.

## Explicitly not required for MVP

- native iOS/Android application;
- dedicated game engine;
- full production animation system;
- every subject fully playable;
- every planned world/region completed;
- final production character illustrations;
- **final voice casting/recording, music or production sound-effects library**;
- advanced cinematic sequences;
- multiplayer/social systems;
- complex administrative platform;
- complete long-term curriculum editor;
- backend account model unless a concrete need is approved;
- spatial-solid activities for the current useful Mathematics MVP, unless their status is explicitly changed;
- all Science slices beyond the currently authorized Slice A unless explicitly promoted.

The exclusion of final audio production does **not** remove the requirement for functional spoken essential instructions. MVP narration may use replaceable concept audio or system/browser speech synthesis fallback as defined in `docs/design/AUDIO.md`.

## Provisional MVP decisions

**PROVISIONAL:** persistence may initially be local/client-side if that is sufficient to validate the experience. A backend account model should not be added only for architectural completeness.

**PROVISIONAL:** richer movement animation is desirable, but not a release blocker beyond the minimum acting/comprehension states defined for Phase 1B.

**PROVISIONAL:** the exact number of Mathematics or Science stages/challenges will be derived from the pedagogical sequence and not fixed in advance.

**PROVISIONAL:** Deserto dos Números / Number Desert is the working visual direction/name for the Mathematics World. Exact landmarks, route length and minion remain to be proposed and reviewed.

**PROVISIONAL:** the exact first Science Zone name, route length, slot count and production art are unresolved; `Oceano das Descobertas` remains the Science subject-world container defined in `docs/worlds/SCIENCE-WORLD.md`.

## Acceptance boundary

The MVP is successful when a child can open the experience on a tablet-sized screen, enter a current playable subject path, understand what to do without adult interpretation for every step, complete multiple curriculum-aligned challenges, receive meaningful feedback, observe progress/color restoration, and return to continue the journey.

For the **current active curriculum delivery**, this must be demonstrable through **Science Slice A** while preserving the Mathematics foundation for later continuation.

**For essential challenge instructions, understanding without adult interpretation must not depend on independent reading alone.**

A visually impressive prototype that does not preserve curricular correctness or reusable content architecture is not considered a successful MVP.
