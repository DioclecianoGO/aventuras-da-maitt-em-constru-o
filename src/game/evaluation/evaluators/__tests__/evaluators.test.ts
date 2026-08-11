/**
 * Evaluators are unit tested WITHOUT rendering any component.
 * This is the proof that the ADR-009 boundary holds.
 */
import { describe, expect, it } from "vitest";

import type { PackItem } from "@/game/domain/schemas";
import { evaluateResponse } from "@/game/evaluation/evaluator";
import "@/game/registries";

const orderingItem: PackItem = {
  id: "item-1",
  prompt: "Ordene",
  representation: "symbolic",
  targets: [],
  parts: [],
  options: [
    { id: "a", label: "1" },
    { id: "b", label: "2" },
    { id: "c", label: "3" },
  ],
  answerRules: {
    kind: "ordering",
    acceptedOrders: [{ id: "asc", orderedIds: ["a", "b", "c"] }],
    allowPartial: true,
  },
};

const selectionItem: PackItem = {
  id: "item-2",
  prompt: "Escolha",
  representation: "symbolic",
  targets: [],
  parts: [],
  options: [
    { id: "x", label: "X" },
    { id: "y", label: "Y" },
  ],
  answerRules: {
    kind: "selection",
    acceptedSets: [
      { id: "first", optionIds: ["x"] },
      { id: "second", optionIds: ["y"] },
    ],
  },
};

describe("ordering evaluator", () => {
  it("marks an exact order correct", () => {
    const result = evaluateResponse(
      { kind: "ordering", orderedIds: ["a", "b", "c"] },
      orderingItem,
      orderingItem.answerRules,
    );
    expect(result.outcome).toBe("correct");
    expect(result.matchedAnswerId).toBe("asc");
  });

  it("marks a partly right order partially-correct", () => {
    const result = evaluateResponse(
      { kind: "ordering", orderedIds: ["a", "c", "b"] },
      orderingItem,
      orderingItem.answerRules,
    );
    expect(result.outcome).toBe("partially-correct");
  });
});

describe("selection evaluator", () => {
  it("accepts any declared valid answer set", () => {
    for (const optionId of ["x", "y"]) {
      const result = evaluateResponse(
        { kind: "selection", optionIds: [optionId] },
        selectionItem,
        selectionItem.answerRules,
      );
      expect(result.outcome).toBe("correct");
    }
  });

  it("rejects a set that is not declared valid", () => {
    const result = evaluateResponse(
      { kind: "selection", optionIds: ["x", "y"] },
      selectionItem,
      selectionItem.answerRules,
    );
    expect(result.outcome).toBe("incorrect");
  });
});

/** Generic constrained multi-selection: structure only, no subject meaning. */
const multiItem: PackItem = {
  ...selectionItem,
  id: "item-3",
  options: [
    { id: "x", label: "X" },
    { id: "y", label: "Y" },
    { id: "z", label: "Z" },
  ],
  answerRules: {
    kind: "selection",
    acceptedSets: [],
    constraints: { allowedOptionIds: ["x", "y", "z"], minDistinct: 2 },
  },
};

describe("constrained multi-selection", () => {
  it("accepts any two distinct admissible options", () => {
    expect(
      evaluateResponse({ kind: "selection", optionIds: ["z", "x"] }, multiItem, multiItem.answerRules)
        .outcome,
    ).toBe("correct");
  });

  it("rejects fewer distinct selections than required", () => {
    const result = evaluateResponse(
      { kind: "selection", optionIds: ["x", "x"] },
      multiItem,
      multiItem.answerRules,
    );
    expect(result.outcome).toBe("incorrect");
    expect(result.diagnosticCode).toBe("selection-below-minimum");
  });

  it("rejects an option outside the authored set", () => {
    const result = evaluateResponse(
      { kind: "selection", optionIds: ["x", "w"] },
      multiItem,
      multiItem.answerRules,
    );
    expect(result.outcome).toBe("incorrect");
    expect(result.diagnosticCode).toBe("selection-not-allowed");
  });
});