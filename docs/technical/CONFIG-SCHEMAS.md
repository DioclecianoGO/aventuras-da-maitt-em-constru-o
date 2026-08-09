# Configuration Schemas — Phase 0

**Status:** DECIDED conceptual contracts; exact TypeScript field names may evolve during implementation without changing the ownership rules below.

## Goal

Configuration must remain data-driven, validated and separable from rendering components.

## Core entities

### Subject
Owns subject identity and reference to its world configuration.

Minimum conceptual fields:
- id
- display name
- world id

### Curriculum
Owns grade/source grouping for skills.

Minimum conceptual fields:
- id
- subject id
- grade label
- optional source metadata

### Skill
Owns pedagogical identity.

Minimum conceptual fields:
- stable skill id
- curriculum id
- group/category
- display name/description

### Learning Objective
Owns an objective statement attached to a skill.

Minimum conceptual fields:
- id
- skill id
- statement

### Content Pack
Owns structured educational content and evaluation rules.

Minimum conceptual fields:
- id
- skill ids
- learning objective ids
- difficulty dimensions
- eligible Puzzle Template ids
- representation metadata
- structured items and/or validated generation constraints
- feedback/hint content
- answer/evaluation rules

A Content Pack must not own world placement.

### Activity
Owns the executable pedagogical assignment.

Minimum conceptual fields:
- id
- content pack id
- puzzle template id
- difficulty
- support level reference
- learning mode (`discover`, `practice`, `challenge`)
- optional guide pet reference
- mastery/evidence behavior reference when applicable

**DECIDED:** Activity is location-agnostic and must not contain `slotId`.

### Activity Slot
Owns board placement and Activity assignment.

Minimum conceptual fields:
- id
- world id
- segment id
- order
- visual anchor/position metadata
- restoration weight or equivalent contribution metadata
- Activity references/sequence

A slot may conceptually reference:
- optional Discover Activity;
- zero or more Practice Activities;
- one or more Challenge Activities.

Final slot count/order remains unresolved until Phase 1 planning.

### Puzzle Template
Owns interaction behavior only.

Minimum conceptual fields:
- template id/type
- compatible representation/response types
- render/interaction contract

A Puzzle Template must not own skill ids, answers, world ids or Activity Slot ids.

## UserResponse contract

The response layer must support typed structured responses. Phase 0 should make the model extensible to at least:

- selection;
- ordering;
- placement;
- composition;
- numeric response;
- text response;
- relation/operation choice.

Audio/spoken response may exist as a future contract but must not become current MVP functionality by virtue of being typed.

## EvaluationResult

Evaluation returns a pedagogical judgment independent of UI.

It must be capable of representing:
- correct;
- partially correct when applicable;
- incorrect;
- optional matched answer/valid-answer metadata;
- optional per-part result detail;
- optional diagnostic code.

## AttemptResult

AttemptResult combines EvaluationResult with execution context, including:
- activity id;
- Activity Slot id;
- skill ids;
- learning mode;
- assisted status;
- representation;
- timestamp/order metadata.

## Response Evaluator

A Response Evaluator:
- is chosen by response kind/contract;
- evaluates a UserResponse against Content Pack evaluation rules;
- is pure and UI-independent;
- is testable without rendering components.

Adding a new response/evaluator family must not require changing world components.

## Validation

**DECIDED:** configuration is validated at load time. Zod is the preferred Phase 0 mechanism because it already exists in the project stack.

Invalid configuration must fail explicitly during development rather than silently producing incorrect educational behavior.

## Import boundaries

Implementation should enforce boundaries where practical, including preventing:
- world/scenery components from importing curriculum/content modules;
- Puzzle Templates from importing evaluators, skills or answer-rule modules;
- content configuration from owning rendered world placement.

Lint rules such as `no-restricted-imports` are an approved Phase 0 enforcement strategy.
