# Technical Architecture — Phase 0 Foundation

**Status:** DECIDED for MVP foundation, except items explicitly marked PROVISIONAL.

## Purpose

This document records the technical decisions approved after review of the Lovable Plan for Phase 0. It defines the architectural boundaries required before implementation.

## Spatial application model

The application is organized around four product contexts:

1. Overworld
2. Subject World entry
3. World Board
4. Challenge Stage

The World Board must remain the spatial context when entering a Challenge Stage.

**DECIDED:** spatial continuity between World Board and Challenge Stage is a product requirement.

**PROVISIONAL:** a nested/overlay route may be used to satisfy this requirement, provided implementation review confirms it preserves continuity, responsive behavior and maintainability.

## Domain separation

These boundaries are mandatory:

- World / Scenery
- Curriculum / Skill
- Content Pack
- Activity
- Puzzle Template
- Activity Slot

World/scenery must not import educational content. Puzzle Templates must not own skills, answers, mastery rules or world location.

## Response and evaluation boundary

The interaction pipeline is:

`Puzzle Template → UserResponse → Response Evaluator → EvaluationResult → AttemptResult → Evidence`

### Puzzle Template

A Puzzle Template:

- receives renderable item data and interaction configuration;
- captures child interaction;
- emits a structured `UserResponse`;
- emits support/hint usage events;
- renders feedback received from the orchestration layer;
- does not determine correctness;
- does not determine mastery;
- does not import curriculum, skill or evaluator definitions.

### Response Evaluator

A Response Evaluator:

- is selected by response type/contract;
- evaluates a `UserResponse` against the Content Pack answer/evaluation rules;
- returns an `EvaluationResult`;
- is UI-independent and unit-testable;
- may support multiple valid answers, partial outcomes, tolerances and diagnostic codes.

### Attempt orchestration

The Activity/Evaluation layer combines the evaluation outcome with contextual facts such as:

- activity id;
- slot id;
- skill ids;
- learning mode;
- representation;
- whether support was consumed.

This produces an `AttemptResult` consumed by the evidence/mastery layer.

## Location ownership

**DECIDED:** Activity is location-agnostic.

Activity Slot owns the assignment of one or more Activities to a board position. Activity must not carry a `slotId` or other world-location ownership.

A slot may reference distinct Activities for Discover, Practice and Challenge without changing the Activity definition itself.

## Touch interaction integrity

**DECIDED:** when drag precision can cause a false educational error, the implementation must provide a reliable alternative such as tap-to-select / tap-to-place, unless the drag gesture itself is the skill being assessed.

This is an evidence-integrity rule, not only an accessibility enhancement.

## Runtime data approach

**DECIDED:** educational/world configuration is data-driven and validated at load time.

The MVP may use TypeScript configuration modules and Zod validation. Components must consume contracts/registries rather than embed exercise content.

## Game state vs server/query state

**PROVISIONAL implementation direction:** game-progress facts are held in a typed client-side state store. TanStack Query may be used for loading configuration/content but is not the source of truth for mutable gameplay progress.

Exact store library is not fixed by this spec. React reducer/context, Zustand or equivalent may be proposed if the same boundaries are preserved.

## Phase 0 implementation boundary

Phase 0 is authorized to prove architecture only. It must not silently introduce:

- mastery thresholds;
- XP economy;
- production curriculum content;
- final slot counts;
- final landmarks/minions;
- backend accounts;
- final animation timing.

Placeholder content/assets used in Phase 0 must be explicitly marked as placeholders and must not become product decisions by implementation accident.
