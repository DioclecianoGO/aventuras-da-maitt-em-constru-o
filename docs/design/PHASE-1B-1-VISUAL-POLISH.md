# Phase 1B.1 — Visual Polish & Restoration Semantics

**Status:** DECIDED corrective scope; final production art/voices remain PROVISIONAL.

## Purpose

Phase 1B proved important experience infrastructure: spoken/replayable guidance, configurable companion presence, character acting states, diegetic confirmation, non-punitive audiovisual feedback and richer scene layers.

Human visual review still found a small set of acceptance defects before Mathematics curriculum expansion should begin.

Phase 1B.1 is a **targeted corrective pass**, not a new architecture phase and not a redesign of the approved Overworld/Board structure.

The goal is to remove the remaining schematic/UI-like cues and make restoration read as concrete changes to the illustrated world.

## Already accepted — preserve

Do not reopen these Phase 1B results:

- narration service + replay infrastructure;
- browser/system speech synthesis as MVP fallback;
- caption remains available when audio is unavailable;
- diegetic confirmation for the current ordering mechanic (`Mostrar para Burpee` concept);
- drag + tap interaction integrity;
- Maittê acting-state architecture;
- configurable companion id / no subject-skill hardbinding;
- non-punitive retry flow;
- Phase 0 domain/evaluation/persistence boundaries;
- Phase 1A Overworld geography, Dunas Douradas route and spatial Challenge Stage continuity.

## Correction 1 — Burpee must read unmistakably as a Border Collie

The current runtime concept proves acting, but visual review found that the silhouette can read as a cat/fox-like animal at Challenge Stage scale.

**DECIDED:** a named real pet asset is not accepted merely because its code/comment says which pet it represents. The visual itself must communicate species identity.

Burpee concept art must preserve:

- clearly canine head/body anatomy;
- Border Collie-like athletic proportions rather than a compact feline seated silhouette;
- recognizable collie ruff/chest fur;
- elongated canine muzzle/nose placement;
- semi-prick/folded-tip ears rather than cat-like triangular ears;
- feathered dog tail with canine attachment/posture;
- blue-merle patch language;
- blue eyes as identity detail where color state allows;
- expressive acting without changing species readability.

Blue-merle identity must remain legible in stolen-color mode through patch/value/pattern structure; it cannot depend only on blue saturation.

### Acceptance test

At Challenge Stage scale, show Burpee without his text label. A reviewer should identify him as a dog/Border Collie-type companion rather than a cat/fox-like creature.

## Correction 2 — Short companion speech should visually come from the companion

The large top caption plate is functional and accessible, but the primary short instruction/retry line still reads too much like detached UI.

For short companion-authored presentation lines, prefer a **hand-drawn speech bubble / illustrated speech shape visually anchored to the active companion**.

Required behavior:

- bubble tail/leader clearly points toward the speaking companion;
- bubble sits near the companion without covering manipulables;
- bubble contains the same short caption that audio speaks;
- replay affordance remains visually associated with the speaker/instruction;
- speaker acting state and bubble appearance agree;
- bubble can reposition for tablet responsiveness;
- when narration ends, the caption may remain readable while the speaker state relaxes;
- retry/support copy may use the same anchored bubble language.

A large detached caption panel remains allowed as a fallback for longer/contextual copy, accessibility layout constraints or future narration that is not attributed to a companion. It is not the preferred default for the current short Burpee instruction.

## Correction 3 — Puzzle objects need stable handcrafted identity

The current carved-stone direction is accepted. Repeating nearly identical, symmetrical stones is not the final Phase 1B.1 visual target.

Each movable stone should feel like a physical illustrated object:

- organic asymmetry;
- different chipped edges/contours;
- small surface marks/cracks;
- slightly different tilt/settling in sand;
- comparable visual mass and touch target;
- consistent legibility of the authored option label.

### Stable identity rule

**DECIDED:** a physical puzzle object's silhouette/variant must remain stable while the child moves it.

Do not assign the art variant from the object's **current position index** if that causes the same labeled stone to morph when reordered.

Use a stable presentation identity keyed by option/item id or another presentation-only stable key.

### No answer leakage

Visual variation must not encode educational meaning unless explicitly authored for that mechanic.

For the current ordering demo:

- stone size must not correlate with numerical value;
- color must not correlate with correct order;
- shape complexity must not imply larger/smaller;
- pedestal/socket style must not reveal destination;
- all touch hit areas remain equivalent enough for fair interaction.

## Correction 4 — Restoration must restore concrete visual units, not only a gradient

Mask/gradient flow remains useful as **transition choreography**, but a smooth color wash cannot be the only permanent child-facing expression of restoration.

**DECIDED:** progress should leave behind identifiable restored things in the environment.

Examples of restorable visual units:

- a plant cluster;
- one rock/object group;
- a route marker;
- a landmark detail;
- a small scenery cluster;
- a building/roof/window detail on the Overworld;
- a tree/foliage cluster;
- a water/detail cluster;
- a local route segment plus its nearby objects.

The exact object catalog is visual configuration, not educational domain.

### Restoration unit model

The visual layer should be able to map persisted/derived progress facts to stable `restorable visual units` (exact implementation name is not binding).

Conceptually:

`completed fact/milestone -> derived selector -> visual restoration config -> one or more concrete scene units`

Rules:

- do not persist visual-unit color state as a second progress truth;
- visual units are keyed/configured outside educational domain schemas;
- reload reconstructs the same restored objects from persisted facts;
- a mask/feathered gradient may animate between states, then the specific restored unit remains visibly restored;
- non-color cues such as detail/life/clarity may accompany restoration;
- Maittê's independently restored regions remain the character equivalent of the same principle.

### Board acceptance example

After completing the current placeholder slot, the child should be able to point to at least one **specific object/cluster** near that route stretch and say, visually, that it gained color/life — not only observe that a broad gradient advanced.

### Overworld acceptance example

Mathematics progress should restore specific details/clusters inside the Mathematics region in addition to any regional mask/overall color progression.

## Correction 5 — Coloring-book/storybook richness, not a literal UI notebook

The desired feeling is a richly illustrated coloring-book/storybook page, not a requirement to draw a literal notebook binding around every screen.

Improve that feeling through:

- more organic hand-drawn contour variation;
- varied line weight;
- enclosed colorable scenery shapes;
- asymmetry and imperfection in repeated natural objects;
- layered foreground/midground/background detail;
- small discoverable scene details;
- richer vegetation/rock/building silhouettes;
- texture/value depth that remains attractive without color;
- fewer repeated primitive/icon-like constructions.

Keep negative space around learning interactions.

Named art references remain mood references only. The implementation must remain original and must not imitate the exact style of any named artist, manga/anime, studio or copyrighted work.

## Correction 6 — Voice production seam

The synthesized voice is accepted as the current **technical fallback**, not as a finished companion voice.

Phase 1B.1 must preserve the asset-key seam so future approved recorded/generated voice files can replace synthesis without changing:

- Challenge Stage layout;
- pet component;
- Puzzle Template;
- evaluator;
- educational domain.

Final voice recording/casting is a separate production task and does not block this corrective visual pass.

## Scope

### Functional corrective work

- redraw/refine Burpee until species identity is unambiguous;
- replace current detached short-instruction presentation with speaker-anchored bubble treatment for the demonstrated Burpee flow;
- make ordering stones visibly handmade/asymmetric with stable physical identity;
- implement concrete restorable scenery units on Dunas Douradas and Mathematics' Overworld region;
- continue art-density refinement where the reviewed scene remains schematic.

### Preserve as-is unless required by the corrections

- narration service;
- TTS fallback;
- SFX infrastructure;
- evaluation pipeline;
- persistence;
- routes;
- current ordering content/answer rules;
- current board route;
- Maittê restoration architecture;
- diegetic confirmation concept.

### Out of scope

- real Number Sense curriculum;
- addition/subtraction/geometry;
- final recorded pet voices;
- all four finished pet assets;
- final music/SFX library;
- redesigning Overworld geography;
- redesigning Dunas Douradas route progression;
- backend/auth;
- microphone/ASR;
- final production illustration pass for all six worlds.

## Acceptance criteria

Phase 1B.1 is complete when:

1. Burpee visibly reads as a Border Collie-type dog at stage scale without relying on a label.
2. The current short spoken instruction is visually anchored to Burpee through a speech-bubble/illustrated speaker treatment rather than a detached top panel as the primary presentation.
3. Replay remains discoverable and accessible.
4. Retry guidance uses the same speaker/context logic and remains non-punitive.
5. The four ordering stones have visibly distinct handcrafted silhouettes/details.
6. A stone keeps the same physical visual identity when moved to another position.
7. Stone variation does not reveal answer/order and touch integrity remains equivalent.
8. Completing the placeholder slot leaves at least one specific Dunas Douradas scenery object/cluster restored.
9. Mathematics' Overworld region exposes at least one specific restorable detail/cluster driven by the same persisted facts.
10. Gradient/mask flow may animate restoration but is not the sole persistent expression of progress.
11. Reload reconstructs the same concrete restored units.
12. Overworld/Dunas art remains architecture-compatible and more storybook/coloring-book-like without literal dashboard/notebook chrome.
13. Phase 0 domain/evaluation/persistence boundaries remain unchanged.
14. TTS remains a replaceable fallback behind the audio-asset seam.
15. Existing tests/lint and reduced-motion behavior remain passing.

## Gate

Do not begin Mathematics curriculum expansion until Phase 1B.1 has been visually reviewed. This is a narrow polish gate; completion does not authorize Slice A.