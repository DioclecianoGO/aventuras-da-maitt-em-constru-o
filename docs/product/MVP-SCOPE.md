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

The initial Mathematics content is based on the study material supplied for:

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

The detailed pedagogical sequence belongs in `docs/pedagogy/MATHEMATICS-GRADE-2.md` and must be validated against the source material before implementation.

## Included in the MVP

- web application;
- tablet-oriented responsive experience;
- shared origin/overworld capable of presenting multiple subject-world destinations;
- Mathematics world as the first playable subject-world;
- sequential local progression inside Mathematics where required;
- challenge-stage framework;
- reusable/parametrizable challenge templates;
- contextual instructions with pet companions;
- XP/progression foundation;
- color-restoration feedback;
- basic narrative framing around stolen/restored colors;
- ability to save enough state to continue progress, if technically feasible within the selected architecture;
- subtle/gamified navigation rather than a conventional prominent header;
- page-turn-inspired transition for major context changes if it performs adequately.

## Explicitly not required for MVP

- native iOS/Android application;
- dedicated game engine;
- full production animation system;
- every subject fully playable;
- every planned world/region completed;
- all final character illustrations;
- all final sound effects/music;
- advanced cinematic sequences;
- multiplayer/social systems;
- complex administrative platform;
- complete long-term curriculum editor.

## Provisional MVP decisions

**PROVISIONAL:** persistence may initially be local/client-side if that is sufficient to validate the experience. A backend account model should not be added only for architectural completeness.

**PROVISIONAL:** richer movement animation is desirable, but not a release blocker.

**PROVISIONAL:** the exact number of Mathematics stages/challenges will be derived from the pedagogical sequence and not fixed in advance.

## Acceptance boundary

The MVP is successful when a child can open the experience on a tablet-sized screen, enter the Mathematics path, understand what to do without adult interpretation for every step, complete multiple curriculum-aligned challenges, receive meaningful feedback, observe progress/color restoration, and return to continue the journey.

A visually impressive prototype that does not preserve curricular correctness or reusable content architecture is not considered a successful MVP.
