/**
 * Composition root for the pluggable registries.
 * Adding a new template or evaluator must not require editing gameplay code.
 */
import { registerEvaluator } from "@/game/evaluation/evaluator";
import { compositionEvaluator } from "@/game/evaluation/evaluators/composition";
import { orderingEvaluator } from "@/game/evaluation/evaluators/ordering";
import { placementEvaluator } from "@/game/evaluation/evaluators/placement";
import { selectionEvaluator } from "@/game/evaluation/evaluators/selection";
import { PlaceholderOrderTemplate } from "@/game/templates/PlaceholderOrderTemplate";
import { CompositionTemplate } from "@/game/templates/CompositionTemplate";
import { GroupSortTemplate, PairMatchTemplate } from "@/game/templates/PlacementTemplate";
import { SceneInvestigateTemplate } from "@/game/templates/SceneInvestigateTemplate";
import type { PuzzleTemplateDefinition } from "@/game/templates/contract";

registerEvaluator(selectionEvaluator);
registerEvaluator(orderingEvaluator);
registerEvaluator(placementEvaluator);
registerEvaluator(compositionEvaluator);

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

/**
 * Generic reusable interaction families. None of them is bound to a subject:
 * the same four templates serve Science, Mathematics and future subjects.
 */
registerTemplate({
  id: "group-sort",
  emits: "placement",
  placeholder: false,
  component: GroupSortTemplate,
});

registerTemplate({
  id: "pair-match",
  emits: "placement",
  placeholder: false,
  component: PairMatchTemplate,
});

registerTemplate({
  id: "conclusion-evidence",
  emits: "composition",
  placeholder: false,
  component: CompositionTemplate,
});

registerTemplate({
  id: "scene-investigate",
  emits: "selection",
  placeholder: false,
  component: SceneInvestigateTemplate,
});