import type { ResponseEvaluator } from "@/game/evaluation/evaluator";

/**
 * Two GENERIC selection semantics, both curriculum-neutral:
 *
 * 1. exact mode — order-insensitive comparison against every accepted set
 *    (unchanged legacy behavior);
 * 2. constrained multi-selection mode — the authored rule declares admissible
 *    option ids plus a minimum number of DISTINCT selections and an optional
 *    maximum. The evaluator checks structure only; it never knows what an
 *    option means.
 */
export const selectionEvaluator: ResponseEvaluator<"selection"> = {
  kind: "selection",
  evaluate(response, _item, rules) {
    if (rules.kind !== "selection") throw new Error("selectionEvaluator received wrong rules");

    const constraints = rules.constraints;
    if (constraints) {
      const distinct = [...new Set(response.optionIds)];
      const allowed = new Set(constraints.allowedOptionIds);
      if (distinct.some((id) => !allowed.has(id))) {
        return { outcome: "incorrect", diagnosticCode: "selection-not-allowed" };
      }
      if (distinct.length < constraints.minDistinct) {
        return { outcome: "incorrect", diagnosticCode: "selection-below-minimum" };
      }
      if (constraints.maxSelections !== undefined && distinct.length > constraints.maxSelections) {
        return { outcome: "incorrect", diagnosticCode: "selection-above-maximum" };
      }
      return { outcome: "correct" };
    }

    const given = [...response.optionIds].sort();
    for (const accepted of rules.acceptedSets) {
      const expected = [...accepted.optionIds].sort();
      if (
        expected.length === given.length &&
        expected.every((id, index) => id === given[index])
      ) {
        return { outcome: "correct", matchedAnswerId: accepted.id };
      }
    }
    return { outcome: "incorrect", diagnosticCode: "selection-mismatch" };
  },
};