# Challenge Stage

**Status:** DECIDED lifecycle/child UX; exact world skin and authored instructions PROVISIONAL.

Challenge Stage is the focused interaction state entered from a Board Activity Slot.

## Lifecycle

1. Current board space is selected/activated.
2. Challenge Stage emerges while preserving the Board as spatial context.
3. A companion or contextual scene introduces the mission using short text + spoken instruction and/or visual demonstration.
4. The instruction remains replayable while relevant.
5. Puzzle Template renders the assigned Content Pack/activity.
6. Player acts through touch-first interaction.
7. Immediate formative feedback is shown.
8. Hints/support may escalate according to Support Level.
9. Success closes/resolves the challenge.
10. Return to the same world board context.
11. Color restoration and reward/progress feedback occur.
12. Maittê advances to the next board space.

## Instruction-first child UX

**DECIDED:** essential instructions cannot depend exclusively on reading.

The preferred presentation is:

`companion/context → spoken instruction → short visible caption → visual focus on manipulables`

Text should be short and readable, but narration/visual guidance must carry enough meaning for the child to begin without adult interpretation.

A replay-audio affordance must remain available.

If autoplay is blocked/unavailable, caption remains and the replay control becomes the obvious recovery action.

## Companion staging

A configured companion may:

- already exist in the Board scenery and follow into the stage;
- enter/reveal near the stage edge;
- visually read as the active speaker;
- look/gesture toward the task;
- remain present as observer;
- react to result/hint.

Do not hardcode a specific pet to Mathematics or to a skill.

The companion must not overlap primary touch targets.

## Interaction area

The Challenge Stage should contain functional zones without becoming a corporate card/form:

- context/speaker/instruction area;
- central learning interaction;
- manipulables/choices;
- replay/support affordances;
- feedback response.

These zones may be visually integrated into world-specific scenery rather than boxed separately.

## Completion action

Do not default every Puzzle Template to a generic `Pronto` submit button.

**Preferred:** automatic/self-confirming evaluation when the interaction has an unambiguous completed state and doing so cannot create false educational evidence.

**Allowed:** a diegetic confirmation object/action when the child should intentionally review/submit.

The confirmation treatment should match the world/challenge skin rather than look like a generic web-form CTA.

## Feedback

Feedback follows `docs/ux/FEEDBACK.md`.

Success should use world/object + character + optional audio response before/with restoration.

Retry should be soft, curious and supportive. No punitive red X, harsh buzzer, XP loss or backward movement.

## Child UX constraints

- touch targets must be tablet-friendly;
- instructions must be short and replayable;
- do not depend exclusively on reading;
- avoid modal clutter and conventional form aesthetics;
- retry should feel natural, not punitive;
- companion guidance must not reveal the answer unless the activity is explicitly in Discover mode or authorized support permits it;
- peripheral animation reduces while the puzzle requires attention.

## Audio

Spoken instruction/audio support is MVP direction and follows `docs/design/AUDIO.md`.

Phase 1B must demonstrate one complete narrated placeholder challenge loop.

Final music/voice production is not required.

## Microphone

Microphone-based spoken answers are FUTURE and are not part of Phase 1B. Do not request microphone permission.

## Architecture boundary

The Challenge Stage visual/narration shell wraps the existing PuzzleTemplateHost/evaluation pipeline.

It does not determine correctness or mastery.

Instruction/companion presentation remains configurable and replaceable without changing evaluator logic.

## Phase 1B acceptance

1. Companion/context visibly introduces the current placeholder challenge.
2. Essential instruction can be heard and replayed.
3. Visible caption remains available.
4. Active speaker is visually identifiable.
5. Current example no longer reads primarily as `instruction + circles + generic Pronto button` on an empty screen.
6. Puzzle interaction remains touch-first with the Phase 0 evaluator boundary intact.
7. Success/retry character feedback is visible.
8. World/Board context remains perceptually connected.
9. No microphone permission is requested.
