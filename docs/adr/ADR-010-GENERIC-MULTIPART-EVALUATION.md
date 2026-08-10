# ADR-010 — Generic structured evaluation for placement and multi-part reasoning

**Status:** DECIDED

## Context

Science Slice A requires reusable interactions that can distinguish a conclusion from the observation/evidence supporting it. The current runtime already exposes generic `UserResponse` kinds for `placement` and `composition`, while `AnswerRules` is currently implemented only for `selection` and `ordering`.

The Science plan proposed adding Science-specific `evidence` rules and a `reasoningOutcome` field. That would couple a general evaluation architecture to one subject.

## Decision

Do not create a Science-specific `evidence` response kind or a Science-specific `reasoningOutcome` domain field.

Extend the existing generic response/evaluation model instead.

### Placement

Use the existing `UserResponse.kind = "placement"` contract for reusable interactions such as:

- item → category/group;
- item → target;
- pair matching represented as stable item/target relationships.

Add a generic `placement` AnswerRules variant and pure evaluator. Exact field names may evolve, but the rules must support one or more accepted placement mappings and optional per-target detail.

### Multi-part reasoning

Use the existing `UserResponse.kind = "composition"` contract for an authored multi-part response such as:

- `conclusion` → selected conclusion option;
- `evidence` → selected supporting observation;

or other future cross-subject part/target combinations.

Add a generic `composition` AnswerRules variant and pure evaluator. Part ids are authored content identifiers; the domain does not assign Science semantics to them.

Example conceptual response:

```text
composition:
  conclusion -> option-B
  evidence -> observation-3
```

The evaluator may return:

- `correct` when all required parts are correct;
- `partially-correct` when some required parts are correct;
- `incorrect` when the primary/required relation is incorrect;
- `perTargetOutcome` for part-level detail;
- `diagnosticCode` for authored/general feedback selection.

### Evidence persistence

`AttemptResult` already carries generic `perTargetOutcome` and `diagnosticCode` through `EvaluationResult`.

`EvidenceRecord` must be allowed to preserve optional generic evaluation detail needed for later analysis, specifically:

- optional `perTargetOutcome` (or semantically equivalent generic component-result map);
- optional `diagnosticCode`.

`toEvidence()` copies those fields when present.

Do not add `reasoningOutcome`, `scienceEvidence`, `habitatReasoning` or other subject-specific telemetry fields to the shared evidence contract.

## Consequences

- Science can distinguish "conclusion correct, supporting evidence wrong" without contaminating the domain with Science terminology.
- The same evaluator contracts can support future Portuguese, Mathematics, Geography or History multi-part interactions.
- Puzzle Templates still emit raw `UserResponse` only.
- Evaluators remain pure and UI-independent.
- Mastery thresholds remain unresolved and are not introduced by this ADR.

## Rejected alternatives

1. New response kind `evidence` — rejected because the interaction is structurally multi-part, not uniquely scientific.
2. `reasoningOutcome` on `EvidenceRecord` — rejected because existing generic evaluation detail can represent the distinction.
3. Template deciding whether evidence supports a conclusion — rejected by ADR-009.

## Compatibility

This ADR extends ADR-009 and `docs/technical/CONFIG-SCHEMAS.md`; it does not replace the established pipeline:

`Puzzle Template → UserResponse → ResponseEvaluator → EvaluationResult → AttemptResult → Evidence`.
