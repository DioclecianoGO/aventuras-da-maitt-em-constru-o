/**
 * Response Evaluator contract + registry.
 * Spec: docs/adr/ADR-009, docs/technical/ARCHITECTURE.md
 *
 * Evaluators are pure, UI-independent and unit-testable without rendering.
 * Puzzle Templates must never import this module (enforced by lint boundaries).
 */
import type { AnswerRules, PackItem } from "@/game/domain/schemas";
import type { EvaluationResult, ResponseKind, UserResponse } from "@/game/domain/responses";

export interface ResponseEvaluator<K extends ResponseKind = ResponseKind> {
  kind: K;
  evaluate(
    response: Extract<UserResponse, { kind: K }>,
    item: PackItem,
    rules: AnswerRules,
  ): EvaluationResult;
}

/** Union over concrete kinds so a `ResponseEvaluator<"ordering">` is registrable. */
export type AnyResponseEvaluator = {
  [K in ResponseKind]: ResponseEvaluator<K>;
}[ResponseKind];

const registry = new Map<ResponseKind, AnyResponseEvaluator>();

export function registerEvaluator(evaluator: AnyResponseEvaluator) {
  registry.set(evaluator.kind, evaluator);
}

export function getEvaluator(kind: ResponseKind): AnyResponseEvaluator | undefined {
  return registry.get(kind);
}

export function evaluateResponse(
  response: UserResponse,
  item: PackItem,
  rules: AnswerRules,
): EvaluationResult {
  const evaluator = registry.get(response.kind);
  if (!evaluator) {
    throw new Error(
      `No ResponseEvaluator registered for response kind "${response.kind}". ` +
        `Register one in src/game/registries/evaluators.ts.`,
    );
  }
  if (rules.kind !== response.kind) {
    throw new Error(
      `Content Pack answer rules ("${rules.kind}") do not match the response kind ("${response.kind}").`,
    );
  }
  return (evaluator.evaluate as (r: UserResponse, i: PackItem, ru: AnswerRules) => EvaluationResult)(
    response,
    item,
    rules,
  );
}