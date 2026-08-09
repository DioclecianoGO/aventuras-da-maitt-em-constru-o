# State Model — MVP Foundation

**Status:** DECIDED for Phase 0 foundation, except where marked PROVISIONAL.

## Principle

Persist source facts; derive visual and aggregate state.

The application must not persist color-restoration percentages as source-of-truth values. Visual restoration is computed from persisted gameplay facts so that future changes in granularity or weighting do not require rewriting historical saves.

## Persisted source facts

Phase 0 may persist at least:

- completed Activity Slots;
- milestone recovery facts;
- pedagogical evidence records;
- minimal save metadata such as schema version and save timestamp.

## Derived state

The following are derived selectors, not directly persisted truth:

- segment restoration;
- Mathematics World restoration;
- Overworld Mathematics-region restoration;
- Maittê restoration level/state;
- slot lock/availability where derivable from completion/progression rules.

## Overworld state

The Overworld may expose subject/world entries with:

- subject/world id;
- availability/unlocked status;
- restoration derived from the associated world state;
- optional last-visited metadata.

The exact UI representation is not defined here.

## World Board state

The World Board must be able to represent:

- current Maittê position/current slot;
- Activity Slot completion/progression state;
- segment membership;
- restoration derived from slot completion;
- milestone facts relevant to the world.

Final Activity Slot count and sequence are not decided by this document.

## Challenge Stage state

Challenge-session state is ephemeral unless a later requirement states otherwise. It may contain:

- active slot id;
- active activity id;
- learning mode;
- current attempt index;
- support/hints consumed;
- error count;
- challenge lifecycle phase.

Reloading during an active challenge does not need to restore the exact in-progress drag state in Phase 0.

## Pedagogical evidence

Evidence must preserve enough information to distinguish:

- skill id(s);
- activity id;
- learning mode;
- outcome;
- assisted vs independent attempt;
- representation used;
- timestamp or ordering information.

Raw evidence is authoritative. Mastery labels are derived later.

**DECIDED:** Phase 0 must not emit or persist a `proficient` determination because mastery thresholds are not yet approved.

## Support usage

Once support/hint assistance has been used for an attempt, that attempt is marked assisted for mastery/evidence purposes. The Puzzle Template does not set this status directly; the orchestration layer derives it from support events.

## Restoration events

The state architecture should support at least these semantic events:

- `SLOT_COMPLETED`
- `MILESTONE_RECOVERED`
- evidence/attempt recording events

Exact reducer/action naming is an implementation detail.

## Save schema evolution

Persisted state must include a `schemaVersion` or equivalent so future migrations can be handled deliberately.

A corrupted/unparseable save must fail safely rather than crash the application.
