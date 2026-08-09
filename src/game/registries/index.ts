/**
 * Composition root for the pluggable registries.
 * Adding a new template or evaluator must not require editing gameplay code.
 */
import { registerEvaluator } from "@/game/evaluation/evaluator";
import { orderingEvaluator } from "@/game/evaluation/evaluators/ordering";
import { selectionEvaluator } from "@/game/evaluation/evaluators/selection";
import { PlaceholderOrderTemplate } from "@/game/templates/PlaceholderOrderTemplate";
import type { PuzzleTemplateDefinition } from "@/game/templates/contract";

registerEvaluator(selectionEvaluator);
registerEvaluator(orderingEvaluator);

const templates = new Map<string, PuzzleTemplateDefinition>();

export function registerTemplate(definition: PuzzleTemplateDefinition) {
  templates.set(definition.id, definition);
}

export function getTemplate(id: string): PuzzleTemplateDefinition | undefined {
  return templates.get(id);
}

registerTemplate({
  id: "placeholder-order",
  emits: "ordering",
  placeholder: true,
  component: PlaceholderOrderTemplate,
});