/**
 * Puzzle Template contract.
 * Spec: docs/adr/ADR-009-PUZZLE-RESPONSE-EVALUATION-BOUNDARY.md
 *
 * A Puzzle Template owns interaction ONLY. It:
 *  - receives generic, curriculum-neutral props
 *  - emits a UserResponse
 *  - MUST NOT evaluate correctness, read skills, or import evaluators/state
 */
import type { ResponseKind, UserResponse } from "@/game/domain/responses";

export type TemplateItemView = {
  /**
   * Stable authored item identity. Templates key their local reset logic from
   * this id, never from the object reference: an orchestration re-render must
   * not look like a new authored item (docs/ux/PHASE-1B-1A-SUCCESS-RETURN-HOTFIX.md).
   */
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
};

export type PuzzleTemplateProps = {
  item: TemplateItemView;
  /** Emits the child's response upward. Never a correctness signal. */
  onRespond(response: UserResponse): void;
  /** Notifies the stage that support was used. Feeds AttemptResult.assisted. */
  onSupportUsed?(): void;
  disabled?: boolean;
  /**
   * Child-facing copy for a diegetic confirmation affordance, supplied by the
   * presentation/narration configuration. Presentation only: the template
   * never authors this sentence and never derives meaning from it.
   */
  confirmLabel?: string;
};

export type PuzzleTemplateDefinition = {
  id: string;
  emits: ResponseKind;
  /** TECHNICAL PLACEHOLDER templates are not final gameplay. */
  placeholder: boolean;
  component: React.ComponentType<PuzzleTemplateProps>;
};
