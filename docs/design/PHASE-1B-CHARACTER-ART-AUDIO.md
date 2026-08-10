# Phase 1B — Character, Art, Motion & Audio Foundation

**Status:** DECIDED foundation; final production assets/voices remain PROVISIONAL.

## Purpose

Phase 1A proved the spatial visual architecture: illustrated Overworld, Mathematics as a physical region, a continuous Board, diegetic navigation, state-driven restoration and a Challenge Stage that remains connected to the world.

Phase 1B gives that architecture the personality required for the learning MVP before real Mathematics content is expanded.

The target is not cinematic polish. The target is a child-facing experience that feels inhabited, expressive and understandable without depending on reading alone.

## Core success statement

At the end of Phase 1B, a child should be able to enter the current Mathematics challenge and understand what to do through **character presence + spoken instruction + visual interaction**, with text acting as reinforcement/caption rather than the only source of meaning.

## Visual identity objective

The illustration language must remain original. References discussed during ideation are mood references only; implementation must not reproduce an existing artist, studio, anime or copyrighted character style.

Translate the desired mood into these original design attributes:

- cozy coloring-book/storybook warmth;
- rounded, confident, hand-drawn-feeling line work rather than geometric iconography;
- enclosed, colorable regions where practical;
- richer foreground/midground/background detail;
- small observational details that reward looking around;
- expressive faces, poses and movement;
- light manga/anime influence in eyes, acting, silhouette and motion;
- readable forms at tablet scale;
- environmental richness without visual clutter around the learning task.

A technically valid SVG made primarily of primitive circles/lines is acceptable only as internal scaffolding, not as the visual acceptance target of Phase 1B.

## Phase 1B scope

### Functional

- instruction-audio infrastructure with replay;
- configurable companion-guide presence;
- one fully demonstrated spoken companion instruction path;
- Maittê character acting states required by the current loop;
- one companion concept with speaking/reacting states in runtime;
- base motion vocabulary for character, companion, environment, selection and restoration;
- Challenge Stage presentation that integrates companion narration;
- non-punitive success/retry feedback;
- audio/motion accessibility fallbacks;
- art-density upgrade for the current Overworld and Dunas Douradas concept experience.

### Concept-quality / replaceable

- Maittê art may remain concept-quality but must meet the character direction;
- pet art may remain concept-quality;
- environment art remains replaceable concept art;
- synthetic/system speech may be used as an MVP fallback, but is not the final canonical pet voice.

### Not authorized by Phase 1B

- real Number Sense curriculum expansion;
- addition/subtraction/geometry content;
- microphone answers or speech recognition;
- final music production;
- final sound-effects library;
- final voice casting/recording;
- complex lip-sync;
- skeletal character animation system;
- cinematic cutscenes;
- all four production-ready pet asset sets;
- all six world production-art upgrades.

## Child comprehension rule

**DECIDED:** an essential challenge instruction must not require independent reading.

Every essential instruction in the active learning path must have at least one non-reading comprehension channel, normally spoken narration and/or an obvious visual demonstration.

Text remains valuable as caption/reinforcement, accessibility support, adult review/debugging and emerging-literacy exposure. Text alone is not sufficient for essential instructions.

## Companion-guide rule

A companion guide may introduce the task, repeat it, react to success/retry and provide a hint when authorized by the support model.

The companion component must not own the instructional sentence. Spoken/text instruction is content/configuration-driven. Pet identity, visual state and voice profile are separately configurable.

A pet must never be permanently bound to Mathematics or to one skill in Phase 1B.

## Challenge integration

The Challenge Stage should feel like a small event in the world:

1. selected slot opens into the focused stage;
2. companion appears or is already present;
3. companion addresses Maittê / the player;
4. spoken instruction plays when allowed by the browser/user-gesture context;
5. matching short text caption is visible;
6. interaction begins;
7. replay-audio affordance remains available;
8. success/retry receives character + sound + motion feedback;
9. challenge resolves back into the Board context.

If autoplay is unavailable, the instruction text remains visible and the replay/speaker affordance becomes the obvious next action rather than failing silently.

## Interaction completion

Avoid generic form controls when the game state itself can communicate completion.

**Preferred:** self-confirming/automatic evaluation when an interaction has an unambiguous completed state and automatic submission cannot create false educational evidence.

**Allowed:** a diegetic confirmation action when the child may reasonably need to arrange/review before submitting.

A generic green web-form button labelled `Pronto` should not be the default interaction pattern across templates.

## Art-density requirement

Overworld and Dunas Douradas must gain enough visual information to stop reading as schematic diagrams.

Each primary scene should include:

- foreground, midground and background separation;
- organic silhouette variation;
- texture/value cues that remain readable in stolen-color state;
- multiple small non-interactive environmental details;
- at least one subtle ambient-motion opportunity outside focused challenge mode;
- clear negative space around touch targets and instructions.

Density must be reduced locally around active puzzle targets to protect attention.

## Motion foundation

Phase 1B must demonstrate, with reduced-motion fallbacks:

- Maittê idle life (e.g. blink/breath/weight shift);
- Maittê thinking/listening reaction;
- Maittê success reaction;
- Maittê movement between board positions;
- companion entrance or reveal;
- companion speaking/listening pose change;
- companion success/retry reaction;
- selectable object response;
- color-restoration flow;
- at least one low-priority environmental ambient motion.

State transitions may never depend on animation completion.

## Audio foundation

Phase 1B must implement the rules in `docs/design/AUDIO.md`.

Minimum demonstrable loop:

`challenge opens → companion speaks instruction → player can replay → player interacts → success/retry sound + character response`

No microphone permission is required.

## Visual acceptance bar

Phase 1B fails visual review if any of the following remain true in the primary demonstrated flow:

- Maittê looks like a generic icon or schematic line figure;
- the companion looks like a decorative corner sticker with no acting role;
- essential instruction is understandable only by reading;
- Challenge Stage still reads primarily as a web form;
- the environment remains mostly empty geometry with little storybook detail;
- success/retry is conveyed mainly by conventional UI color/button states;
- adding art required changes to educational-domain/evaluation logic.

## Acceptance criteria

Phase 1B is complete when:

1. Maittê has concept-quality character art with at least idle/listen-think/success/move states.
2. One companion has concept-quality runtime art with at least idle/speaking/reaction states.
3. Essential instruction can be spoken and replayed.
4. Spoken instruction and visible caption come from configurable content, not hardcoded pet JSX.
5. Audio failure/autoplay blocking has a usable fallback.
6. The challenge can be completed with audio muted because text/visual accessibility remains.
7. The current example challenge no longer depends on a generic form-like presentation.
8. The current interaction uses auto-evaluation or a diegetic confirmation pattern appropriate to the mechanic.
9. Overworld and Dunas Douradas have materially richer storybook detail than the Phase 1A schematic concept.
10. Character/environment motion follows the priority/attention rules in `ANIMATION.md`.
11. Reduced-motion mode preserves comprehension and final state.
12. Success and retry use non-punitive audiovisual feedback.
13. Companion assignment remains configurable and not skill/subject-hardcoded.
14. No microphone/speech recognition is added.
15. Phase 0 domain/evaluation/persistence boundaries remain intact.
16. Art/audio/motion assets remain independently replaceable.
17. Existing architecture tests/lint remain passing.

## Review gate

Completion of Phase 1B does not authorize Mathematics curriculum implementation. Screenshots/preview, audio behavior and motion behavior must be reviewed first. The next pedagogical build requires separate authorization.
