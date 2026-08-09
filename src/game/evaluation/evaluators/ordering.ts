import type { ResponseEvaluator } from "@/game/evaluation/evaluator";

/**
 * Position-sensitive comparison with optional partial outcome, so ordering
 * content can express "some positions right" without the template knowing it.
 */
export const orderingEvaluator: ResponseEvaluator<"ordering"> = {
  kind: "ordering",
  evaluate(response, _item, rules) {
    if (rules.kind !== "ordering") throw new Error("orderingEvaluator received wrong rules");

    let best: { correctCount: number; perTarget: Record<string, boolean> } | null = null;

    for (const accepted of rules.acceptedOrders) {
      const perTarget: Record<string, boolean> = {};
      let correctCount = 0;
      accepted.orderedIds.forEach((expectedId, index) => {
        const matches = response.orderedIds[index] === expectedId;
        perTarget[`position-${index}`] = matches;
        if (matches) correctCount += 1;
      });

      if (
        correctCount === accepted.orderedIds.length &&
        response.orderedIds.length === accepted.orderedIds.length
      ) {
        return { outcome: "correct", matchedAnswerId: accepted.id, perTargetOutcome: perTarget };
      }
      if (!best || correctCount > best.correctCount) best = { correctCount, perTarget };
    }

    const partial = rules.allowPartial && (best?.correctCount ?? 0) > 0;
    return {
      outcome: partial ? "partially-correct" : "incorrect",
      ...(best ? { perTargetOutcome: best.perTarget } : {}),
      diagnosticCode: partial ? "ordering-partial" : "ordering-mismatch",
    };
  },
};