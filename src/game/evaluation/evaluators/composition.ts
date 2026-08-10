import type { ResponseEvaluator } from "@/game/evaluation/evaluator";

/**
 * Generic multi-part evaluator (ADR-010).
 *
 * A response is a set of authored parts (`partId` -> `targetId`). Part ids are
 * content identifiers such as "conclusion" or "evidence"; the domain assigns
 * them no meaning at all. Outcome rules:
 *
 *  - every required part correct                    -> correct
 *  - a primary part wrong                           -> incorrect
 *  - primary correct, another required part wrong   -> partially-correct
 */
export const compositionEvaluator: ResponseEvaluator<"composition"> = {
  kind: "composition",
  evaluate(response, _item, rules) {
    if (rules.kind !== "composition") throw new Error("compositionEvaluator received wrong rules");

    const given = new Map(response.parts.map((part) => [part.partId, part.targetId]));
    const perTargetOutcome: Record<string, boolean> = {};

    let primaryWrong = false;
    let requiredWrong = false;

    for (const part of rules.parts) {
      const answered = given.get(part.partId);
      const matches = answered !== undefined && part.acceptedTargetIds.includes(answered);
      perTargetOutcome[part.partId] = matches;
      if (matches) continue;
      if (part.primary) primaryWrong = true;
      if (part.required) requiredWrong = true;
    }

    if (primaryWrong) {
      return {
        outcome: "incorrect",
        perTargetOutcome,
        diagnosticCode: rules.diagnostics?.incorrect ?? "composition-primary-incorrect",
      };
    }

    if (requiredWrong) {
      return {
        outcome: "partially-correct",
        perTargetOutcome,
        diagnosticCode: rules.diagnostics?.partial ?? "composition-required-part-incorrect",
      };
    }

    return { outcome: "correct", perTargetOutcome };
  },
};