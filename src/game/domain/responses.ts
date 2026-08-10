/**
 * Response / evaluation contracts.
 *
 * Spec: docs/adr/ADR-009-PUZZLE-RESPONSE-EVALUATION-BOUNDARY.md
 *       docs/technical/CONFIG-SCHEMAS.md
 *
 * Pipeline:
 * Puzzle Template -> UserResponse -> ResponseEvaluator -> EvaluationResult
 *   -> AttemptResult -> Evidence
 *
 * Puzzle Templates emit UserResponse only. They never judge correctness.
 */

export type LearningMode = "discover" | "practice" | "challenge";

export type ResponseKind =
  | "selection"
  | "ordering"
  | "placement"
  | "composition"
  | "numeric"
  | "text"
  | "relation"
  | "audio";

/** What the child did. Structured, never judged. */
export type UserResponse =
  | { kind: "selection"; optionIds: string[] }
  | { kind: "ordering"; orderedIds: string[] }
  | {
      kind: "placement";
      placements: { itemId: string; targetId: string; rotation?: number }[];
    }
  | { kind: "composition"; parts: { partId: string; targetId: string }[] }
  | {
      kind: "numeric";
      value: number;
      byColumn?: Partial<Record<"u" | "d" | "c", number>>;
    }
  | { kind: "text"; value: string }
  | { kind: "relation"; relationId: string }
  /** FUTURE contract only. Microphone answers are NOT part of the current MVP. */
  | { kind: "audio"; clipRef: string };

export type Outcome = "correct" | "partially-correct" | "incorrect";

export type EvaluationResult = {
  outcome: Outcome;
  /** Supports content packs that declare more than one valid answer. */
  matchedAnswerId?: string;
  /** Per-part detail for ordering / composition style responses. */
  perTargetOutcome?: Record<string, boolean>;
  /** Optional diagnostic hook for feedback selection. Not a mastery claim. */
  diagnosticCode?: string;
};

export type AttemptResult = EvaluationResult & {
  attemptId: string;
  activityId: string;
  slotId: string;
  worldId: string;
  skillIds: string[];
  mode: LearningMode;
  /** Derived from support events by the orchestration layer, never by a template. */
  assisted: boolean;
  representation: string;
  at: string;
};

/**
 * Raw pedagogical evidence. Authoritative.
 * Mastery labels are derived later; Phase 0 emits no `proficient` claim.
 * Spec: docs/technical/STATE.md
 */
export type EvidenceRecord = {
  attemptId: string;
  skillId: string;
  activityId: string;
  slotId: string;
  mode: LearningMode;
  outcome: Outcome;
  assisted: boolean;
  representation: string;
  at: string;
  /**
   * Optional GENERIC evaluation detail (ADR-010). Preserved for later analysis
   * of multi-part responses. It is not a mastery claim and carries no
   * subject-specific semantics.
   */
  perTargetOutcome?: Record<string, boolean>;
  diagnosticCode?: string;
};

export type SupportEventKind = "hint" | "representation-change" | "worked-example";