import type { ResponseEvaluator } from "@/game/evaluation/evaluator";

/**
 * Generic placement evaluator (ADR-010).
 *
 * Compares an item -> target mapping against one or more accepted mappings.
 * It is deliberately subject-neutral: "target" may be a group, a category or a
 * matching slot. No scientific, mathematical or linguistic meaning is encoded.
 */
export const placementEvaluator: ResponseEvaluator<"placement"> = {
  kind: "placement",
  evaluate(response, _item, rules) {
    if (rules.kind !== "placement") throw new Error("placementEvaluator received wrong rules");

    const given = new Map(response.placements.map((p) => [p.itemId, p.targetId]));

    let best: { correctCount: number; total: number; perTarget: Record<string, boolean> } | null =
      null;

    for (const accepted of rules.acceptedMappings) {
      const perTarget: Record<string, boolean> = {};
      let correctCount = 0;

      for (const expected of accepted.mapping) {
        const matches = given.get(expected.itemId) === expected.targetId;
        perTarget[expected.itemId] = matches;
        if (matches) correctCount += 1;
      }

      const complete =
        correctCount === accepted.mapping.length && given.size === accepted.mapping.length;

      if (complete) {
        return { outcome: "correct", matchedAnswerId: accepted.id, perTargetOutcome: perTarget };
      }
      if (!best || correctCount > best.correctCount) {
        best = { correctCount, total: accepted.mapping.length, perTarget };
      }
    }

    const partial = rules.allowPartial && (best?.correctCount ?? 0) > 0;
    return {
      outcome: partial ? "partially-correct" : "incorrect",
      ...(best ? { perTargetOutcome: best.perTarget } : {}),
      diagnosticCode: partial ? "placement-partial" : "placement-mismatch",
    };
  },
};
