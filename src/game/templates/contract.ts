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
import type { ReactNode } from "react";

/**
 * Optional PRESENTATION descriptor supplied by the visual configuration layer.
 *
 * It is deliberately generic and curriculum-neutral: it maps ALREADY AUTHORED
 * ids (option ids, target ids) to illustrations and to touch hotspots over an
 * illustrated scene. It never carries correctness, category or skill data, and
 * a template must behave correctly when it is absent.
 */
export type TemplateScene = {
  /** Scene coordinate space; hotspot geometry is expressed in these units. */
  width: number;
  height: number;
  /** Pure scenery. Draws no option identity and no answer cue. */
  render(): ReactNode;
  /** Generous touch areas mapped to authored option ids. */
  hotspots: {
    optionId: string;
    /** Accessible name for the illustrated object. */
    label: string;
    cx: number;
    cy: number;
    rx: number;
    ry: number;
  }[];
  /** Scene shown as visible evidence only (no hotspots are rendered). */
  interactive?: boolean;
};

export type TemplatePresentation = {
  scene?: TemplateScene;
  /** Illustration per authored option id. */
  optionArt?: Record<string, () => ReactNode>;
  /** Illustration per authored placement target id. */
  targetArt?: Record<string, () => ReactNode>;
};

export type TemplateItemView = {
  /**
   * Stable authored item identity. Templates key their local reset logic from
   * this id, never from the object reference: an orchestration re-render must
   * not look like a new authored item (docs/ux/PHASE-1B-1A-SUCCESS-RETURN-HOTFIX.md).
   */
  id: string;
  prompt: string;
  options: { id: string; label: string; partId?: string | undefined }[];
  /** Placement destinations (groups, categories, matching slots). */
  targets: { id: string; label: string }[];
  /** Authored parts of a multi-part response. Ids carry no domain meaning. */
  parts: { id: string; label: string }[];
};

export type PuzzleTemplateProps = {
  item: TemplateItemView;
  /** Emits the child's response upward. Never a correctness signal. */
  onRespond(response: UserResponse): void;
  /** Notifies the stage that support was used. Feeds AttemptResult.assisted. */
  onSupportUsed?(): void;
  disabled?: boolean;
  /**
   * Presentation-only signal: reports what the child is currently pointing at
   * so the stage can react in character. NEVER a correctness signal and never
   * an attempt.
   */
  onObserve?(optionIds: string[]): void;
  /** Optional illustrated presentation. Templates must work without it. */
  presentation?: TemplatePresentation;
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
