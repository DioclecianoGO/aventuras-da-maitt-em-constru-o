# Persistence — MVP

**Status:** DECIDED for current MVP scope; future remote persistence remains FUTURE.

## MVP persistence model

The MVP uses a single local profile stored in the current browser/device.

**DECIDED:** no backend account system, authentication flow, Supabase integration, cloud sync or multi-device synchronization is authorized for Phase 0.

## Adapter boundary

Persistence must be accessed through a `PersistenceAdapter` or equivalent interface so the game/domain layer does not depend directly on localStorage APIs.

Phase 0 requires:

- functional persistence interface;
- functional localStorage implementation;
- load on application startup;
- save after relevant state changes;
- safe parsing;
- schema version metadata;
- graceful handling of missing or corrupted saves.

## Functional status

- `PersistenceAdapter`: Functional MVP infrastructure.
- `LocalStoragePersistence`: Functional MVP implementation.
- remote/backend persistence: FUTURE and not implemented.

## Persisted data

Persist source facts and minimal metadata, including as applicable:

- completed Activity Slots;
- evidence records or evidence aggregates that preserve the approved distinctions;
- milestone recovery facts;
- current progression position when not derivable safely;
- schema version;
- save timestamp.

Do not persist derived visual color percentages as authoritative values.

## Single-profile constraint

Phase 0 assumes one local learner profile per browser storage context.

No profile selector, parent account, child switcher or account registration is required.

This constraint may be revisited later through the adapter without rewriting gameplay logic.

## Reset / corruption

A corrupted save must not crash the application. The persistence layer must detect invalid state and provide a safe recovery path.

A polished parent-facing reset interface is not required for Phase 0. Development/testing may provide an explicit technical reset mechanism if needed, but it must not be mistaken for final child-facing UX.

## Reload acceptance condition

Phase 0 is not accepted unless a completed placeholder Activity Slot and its associated persisted progress survive a normal page reload.
