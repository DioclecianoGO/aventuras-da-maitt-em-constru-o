# Content Registry & Activity Sequence Orchestration

**Status:** DECIDED for the current multi-world MVP architecture; exact module/file names may evolve.

## Purpose

The Phase 0/1 runtime currently imports the Mathematics placeholder fixture directly from world routes. Science cannot coexist cleanly with Mathematics until content/world resolution becomes generic.

This specification defines the minimum architecture required to host more than one subject-world without creating a second engine.

## 1. Content registry

Introduce one generic content-resolution boundary for authored game configuration.

It must be able to resolve, by stable id:

- Subject;
- WorldConfig;
- ActivitySlot;
- Activity;
- ContentPack;
- PackItem through its pack/activity context.

Conceptual operations may resemble:

```text
getWorld(worldId)
getSlot(worldId, slotId)
getActivity(activityId)
getContentPack(packId)
getSubjectByWorld(worldId)
```

Exact function names are implementation details.

### Rules

1. Mathematics remains registered and functional; do not delete or rewrite its existing content merely to add Science.
2. Science is added as another registered world/content set.
3. Routes resolve configuration through the registry rather than importing `placeholder-fixture` directly.
4. This is a local/static configuration registry for the current MVP. It does not authorize backend content delivery, Supabase, accounts or remote CMS behavior.
5. The content registry is distinct from the visual asset/world-scenery registry. Educational config must not own art assets.
6. Invalid ids/configuration fail explicitly in development.

## 2. Activity Slot sequence semantics

The existing conceptual contract is authoritative:

- optional Discover Activity;
- zero or more Practice Activities;
- one or more Challenge Activities.

The runtime must execute this sequence generically rather than always choosing `challenge[0]` and `items[0]`.

### Ordered execution

For a configured slot, the default sequence is:

```text
discover? → practice[0..n] → challenge[0..n]
```

Within each Activity, item sequencing follows the authored Content Pack/activity configuration. Exact multi-item authoring may remain minimal for Slice A, but the route/orchestrator must not hardcode item zero as a permanent rule.

### Resume

Use existing source facts, especially `SlotFacts.completedActivityIds`, to derive the next incomplete Activity.

Do not add a separate persisted `currentActivityIndex` merely for view convenience.

On reload/re-entry:

- completed Activities remain completed;
- orchestration resumes at the first configured incomplete Activity;
- Board current-slot position remains derived from existing world progression facts.

### Success inside a slot

A correct AttemptResult for an intermediate Discover/Practice/Challenge Activity:

1. records evidence through the existing pipeline;
2. records the Activity as completed using the existing fact model;
3. gives bounded feedback;
4. advances to the next incomplete Activity in the SAME Challenge Stage/slot when one remains.

It does **not** mark the whole Activity Slot complete merely because one Activity was answered correctly.

### Slot completion

A Slot becomes complete only when all Activities configured as required by its sequence are complete.

For the current schema, that means:

- Discover, if present;
- every listed Practice Activity;
- every listed Challenge Activity.

Only then:

- dispatch `SLOT_COMPLETED`;
- derive the next Board slot using existing progression logic;
- run the bounded final success reaction;
- automatically return to the same World Board using the already-approved success-return lifecycle.

If future product policy needs optional/non-gating Activities, that requires a separate explicit schema decision; do not invent it in Science Slice A.

### Incorrect / partially-correct

Incorrect or partially-correct outcomes do not advance the Activity sequence unless the authored activity/support policy explicitly allows a guided Discover completion. The default Challenge behavior remains retry in place.

Do not turn `partially-correct` into Slot completion.

## 3. Learning mode and evidence

Activity.mode remains the source of `discover | practice | challenge` in AttemptResult/Evidence.

Do not infer mode from Board position, scenery or template.

Assisted support remains separately recorded and does not become independent Challenge evidence.

## 4. Route responsibility

World/Challenge routes own orchestration, not correctness.

They may:

- resolve current world/slot/activity/item;
- collect support usage;
- call `resolveAttempt` through PuzzleTemplateHost;
- commit Attempt/Evidence facts;
- derive next Activity or Slot;
- control presentation freeze/transition/return.

They must not:

- implement scientific answer rules;
- evaluate UserResponse directly;
- persist visual restoration state;
- import subject-specific correctness logic.

## 5. Success-return compatibility

The Phase 1B.1a fixed lifecycle remains binding at Slot completion:

`final required Activity success → facts committed → solved interaction freezes → bounded success reaction → same World Board → restoration/current position derived`.

Intermediate Activity success uses the same freeze/feedback principles but advances to the next Activity rather than returning to the Board.

The exact animation timing remains PROVISIONAL and must not gate state progression on audio/animation completion.

## 6. Acceptance criteria

This architecture is sufficient when:

1. Mathematics and Science coexist in one local registry.
2. `/mundo/$worldId` resolves either supported world without subject-specific route copies.
3. a Slot can run Discover → Practice → Challenge Activities in order.
4. reload resumes from existing `completedActivityIds` without a new progress source.
5. intermediate correct Activities do not prematurely complete/close the Slot.
6. final required Activity completion returns to the same Board and restores progress.
7. evaluation/domain/persistence boundaries from ADR-009 remain intact.
