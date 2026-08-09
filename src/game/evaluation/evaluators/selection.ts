import type { ResponseEvaluator } from "@/game/evaluation/evaluator";

/** Order-insensitive set comparison against every accepted answer set. */
export const selectionEvaluator: ResponseEvaluator<"selection"> = {
  kind: "selection",
  evaluate(response, _item, rules) {
    if (rules.kind !== "selection") throw new Error("selectionEvaluator received wrong rules");
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