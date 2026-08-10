# Phase 1B.1a — Success Return Hotfix

**Status:** DECIDED for lifecycle and regression behavior; exact transition timing remains PROVISIONAL.

## Purpose

Phase 1B.1a is a narrowly scoped corrective pass after the Phase 1B.1 visual-polish implementation.

It exists to fix two regressions observed in the current ordering challenge:

1. after a correct answer is confirmed, the visible stones reset to the authored starting order before the challenge closes;
2. after a correct answer, the Challenge Stage remains open instead of returning to the same World Board context.

This phase does not authorize new curriculum, a new puzzle family, a new progression economy or another broad visual-polish pass.

## Binding child-experience lifecycle

The successful challenge flow is:

`correct arrangement -> intentional confirm -> response evaluation -> attempt recorded -> solved arrangement freezes -> short success reaction -> challenge closes -> same World Board returns -> restoration is visible -> Maittê is positioned at the next/current board space`

The successful arrangement must remain visibly solved during the success reaction. It must not re-randomize, reset to authored order or otherwise visually contradict the result that was just accepted.

## Stable template state across parent re-renders

**DECIDED:** a parent render caused by attempt state, narration state, progression facts, avatar restoration or other presentation state must not reset a Puzzle Template's local response state when the authored item itself has not changed.

Implementation may satisfy this by preserving the authored item object identity, memoizing the template input, keying local reset logic from stable authored item identity, or another equivalent approach.

The implementation must not rely on a newly allocated wrapper object as evidence that a new authored item has arrived.

Resetting the Puzzle Template is valid only when the actual authored item/activity instance changes or when an explicit restart action is invoked.

## Success lock

Once an attempt is evaluated as correct:

- the current manipulables become non-interactive for the remainder of the success reaction;
- the diegetic confirmation action becomes non-interactive;
- another attempt cannot be emitted;
- the solved arrangement remains visible;
- Maittê and the configured companion may enter their success acting states;
- success/restoration audio may play if available.

This lock is presentation/orchestration state only. It does not change evaluator ownership or create a new persisted educational fact.

## Completion and persistence

The accepted attempt and slot-completion facts must be committed using the existing state/evidence pipeline.

No new progress source of truth is introduced.

Restoration on the World Board and Overworld continues to derive from the already persisted completion/progress facts.

Reload after completion must still reconstruct the same completed slot and restored scenery.

## Return to the same World Board

**DECIDED:** a successful challenge closes automatically after a short, bounded success reaction and navigates back to the same world route from which the slot was entered.

For the current Mathematics placeholder this means returning to Dunas Douradas, not to the Overworld and not remaining indefinitely on the Challenge Stage.

The exact delay is PROVISIONAL implementation choreography. It should be long enough for the child to perceive success but short enough to preserve flow. Navigation must not depend on narration finishing successfully, because audio may be blocked or unavailable.

## Board state after return

On return, the Board must derive its presentation from existing facts:

- the completed slot is visibly completed;
- concrete restoration units driven by that completion remain restored;
- the next/current slot state is derived normally;
- Maittê appears at the appropriate current/next board position according to the existing progression selector;
- no duplicate restoration fact or visual-only persistence field is created.

## Retry behavior

Incorrect or partially correct attempts remain retryable and must not trigger the automatic close lifecycle.

Retry continues to follow the supportive feedback rules in `docs/ux/FEEDBACK.md`.

## Architecture boundaries

Phase 1B.1a must preserve the existing separation:

`Puzzle Template -> UserResponse -> ResponseEvaluator -> EvaluationResult -> Activity orchestration -> AttemptResult -> Evidence/progression`

The hotfix must not move correctness into the template, must not let visual components mutate mastery, and must not introduce backend/auth/remote persistence.

## Required regression coverage

Automated coverage must demonstrate at minimum:

1. a correct ordering remains in the solved order after the parent/orchestration state re-renders;
2. a correct result disables further interaction/confirmation during the success reaction;
3. a successful challenge navigates back to the same World Board after the bounded reaction;
4. the completion fact is present before/when the Board is shown again;
5. restored Board units remain derived from the completion fact after return/reload;
6. an incorrect attempt does not auto-close the Challenge Stage.

## Acceptance gate

Phase 1B.1a is complete only when all of the following are true:

- the solved stones no longer jump back to the starting permutation after success;
- the success state cannot emit a duplicate attempt;
- the Challenge Stage closes automatically after the success reaction;
- the child returns to the same Dunas Douradas board context;
- restoration already earned is visible on that Board;
- the next/current Maittê board position is correct;
- reload preserves completion/restoration;
- typecheck/tests remain clean;
- no unrelated visual redesign or curriculum implementation is bundled into the hotfix.

## Explicit non-goals

**OUT_OF_SCOPE for Phase 1B.1a:**

- Slice A / Number Sense curriculum implementation;
- new mastery thresholds;
- XP economy;
- backend, authentication or Supabase;
- final production illustration assets;
- another attempt to achieve final world/character art quality by adding large amounts of JSX/SVG path drawing.
