# ADR-009 — Puzzle Response / Evaluation Boundary

**Status:** DECIDED

## Context

Puzzle Templates are intended to be reusable interaction components across skills and future subjects. If a template determines whether a response is correct, the interaction layer becomes coupled to pedagogical answer logic and cannot remain reliably reusable.

Future interactions may include ordering, multiple valid answers, compositions, typed responses and spoken responses, so equality checks inside components are not an adequate architectural boundary.

## Decision

Puzzle Templates capture interaction and emit a structured `UserResponse`. They do not determine correctness.

Evaluation occurs outside the Puzzle Template through a Response Evaluator using Content Pack answer/evaluation rules.

The canonical pipeline is:

`Puzzle Template → UserResponse → Response Evaluator → EvaluationResult → AttemptResult → Evidence`

The Activity/Evaluation orchestration layer is responsible for combining evaluation with contextual facts such as learning mode and support usage.

## Consequences

Positive:
- Puzzle Templates remain reusable across compatible educational content.
- Evaluation can support multiple valid answers and partial/diagnostic results.
- Evaluation logic is unit-testable without UI rendering.
- Mastery rules remain outside interaction components.
- New response families can be added without coupling them to worlds.

Costs:
- requires explicit response and evaluator contracts;
- creates an additional orchestration layer;
- Content Packs must provide structured evaluation rules.

## Rejected alternative

`Puzzle Template → { correct: boolean }`

Rejected because the template boundary would already contain or depend on correctness logic, violating the content/interaction separation.

## Related specifications

- `docs/technical/ARCHITECTURE.md`
- `docs/technical/CONFIG-SCHEMAS.md`
- `docs/pedagogy/LEARNING-MODEL.md`
- `docs/gameplay/PUZZLE-SYSTEM.md`
