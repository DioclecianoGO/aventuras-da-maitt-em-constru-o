# Science Slice A — Literacy Support Amendment

**Status:** DECIDED corrective behavior for the current Science Slice A implementation.

This amendment complements `SCIENCE-SLICE-A-BUILD-GATE.md` and `docs/ux/EMERGENT-READER-SUPPORT.md`. It does not change the approved Science skills, source authority or evaluator boundaries.

## Scope

This amendment addresses the human review of the first Science station (`ponto de observação`) and establishes requirements that also apply when reviewing Slots 2–6.

## Slot 1 learning loop

The intended sequence remains:

**observe → classify what was observed → conclude from visible evidence**.

The three Activities should feel like one investigation rather than three unrelated form screens.

## Stage 1 — Discover: more than one observation

The current scene interaction is improved by direct hotspots, but selecting only one element does not fully establish the idea that an environment contains multiple elements.

For this Activity, require the child to identify **at least two distinct visible elements** before confirmation becomes available.

Approved visible elements remain the source-bounded authored set already present in the Slice A pack (for example plant, bird, rock and water).

After the first valid observation, Burpee should acknowledge the specific object and invite another observation, for example conceptually:

`Você encontrou a água. Ela também faz parte deste ambiente. Consegue achar outra coisa?`

After the minimum number of observations is reached, the child may confirm and continue.

This is Discover guidance, not a mastery threshold.

The generic selection contract must support multiple selected option ids and a minimum-distinct-selection rule without Science-specific evaluator logic.

## Stage 1 — object-specific spoken feedback

When a scene object is touched:

- the object receives a visible observation reaction;
- its short label/name is spoken or otherwise available through read-aloud;
- Burpee may provide the approved object-specific Discover reaction;
- this read-aloud does not submit the Activity automatically.

The spoken content must correspond to the selected authored option id.

## Stage 2 — living / non-living

The authoritative criterion remains:

- `Seres vivos`
- `Não vivos`

Do not reintroduce `natural × construído pelas pessoas`.

The current source-bounded classification remains:

- árvore/planta → ser vivo;
- caranguejo → ser vivo;
- pedra → não vivo;
- água → não vivo.

Every manipulable object label and both category labels must have a read-aloud path under `EMERGENT-READER-SUPPORT.md`.

Pictorial mini-objects should remain primary where available; text is reinforcement.

## Stage 3 — conclusion + evidence

The environment scene must remain visible while the child chooses:

- a conclusion;
- the observation/evidence supporting it.

Because these options contain abstract written statements that cannot be represented purely by a single picture, **each option must be readable aloud on demand or on deliberate selection**.

Selecting an option may speak exactly the text that is already visible. This does not count as a hint and must not submit the AttemptResult by itself.

The final deliberate confirmation remains separate.

## Slots 2–6 review rule

Before Science Slice A is considered UX-ready, every implemented Activity in Slots 2–6 must be audited for the same principle:

**if the child must read a label/sentence to know what an option means, provide a spoken path and, where feasible, an image/object that carries the concept visually first.**

Do not postpone this requirement only because the current TTS voice is temporary.

## Audio behavior

For short option/category read-aloud:

- reuse the existing audio/narration infrastructure or a generic non-evaluative label-speaking adapter;
- only one spoken stream should play at a time;
- a new label cancels/replaces the previous label speech rather than stacking;
- final recorded voices may later replace speech synthesis through the existing audio seam.

Desktop hover may optionally preview a label, but hover is not required and must never be the only way to hear it. Tablet tap/focus activation is authoritative.

## Visual-quality boundary

The current SVG scene is sufficient to validate interaction semantics but remains concept art.

Do not block Science pedagogy on another large round of hand-authored SVG polishing.

The next substantial graphical improvement should use the Asset Production Pipeline with richer illustrated assets, while preserving:

- scene hotspots;
- option ids;
- visual config;
- audio/read-aloud seams;
- evaluator contracts;
- state/persistence.

## Acceptance criteria

1. Slot 1 Discover requires at least two distinct scene observations before confirmation.
2. Each observed object can be heard/read aloud and receives object-specific Discover feedback.
3. Stage 2 uses living/non-living only and its option/category labels are audible.
4. Stage 3 keeps the environment visible and every required text choice can be read aloud.
5. Read-aloud does not count as assistance merely for speaking visible text.
6. Read-aloud does not submit an answer.
7. Slots 2–6 are audited against the same emergent-reader requirement before the Slice is UX-approved.
8. No new Science-specific evaluator or audio engine is introduced.
