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
};

export type PuzzleTemplateDefinition = {
  id: string;
  emits: ResponseKind;
  /** TECHNICAL PLACEHOLDER templates are not final gameplay. */
  placeholder: boolean;
  component: React.ComponentType<PuzzleTemplateProps>;
};