/**
 * Attempt orchestration.
 * Combines an EvaluationResult with execution context to produce an
 * AttemptResult, then derives the Evidence records.
 * Spec: docs/technical/ARCHITECTURE.md "Attempt orchestration"
 */
import type { Activity, ActivitySlot, ContentPack, PackItem } from "@/game/domain/schemas";
import type {
  AttemptResult,
  EvidenceRecord,
  UserResponse,
} from "@/game/domain/responses";
import { evaluateResponse } from "@/game/evaluation/evaluator";

let attemptCounter = 0;

function nextAttemptId() {
  attemptCounter += 1;
  return `attempt-${Date.now().toString(36)}-${attemptCounter}`;
}

export function resolveAttempt(input: {
  activity: Activity;
  slot: ActivitySlot;
  pack: ContentPack;
  item: PackItem;
  response: UserResponse;
  /** Derived from support events collected by the stage, never by the template. */
  supportUsed: boolean;
}): AttemptResult {
  const evaluation = evaluateResponse(input.response, input.item, input.item.answerRules);

  return {
    ...evaluation,
    attemptId: nextAttemptId(),
    activityId: input.activity.id,
    slotId: input.slot.id,
    worldId: input.slot.worldId,
    skillIds: input.pack.skillIds,
    mode: input.activity.mode,
    assisted: input.supportUsed,
    representation: input.item.representation,
    at: new Date().toISOString(),
  };
}

export function toEvidence(attempt: AttemptResult): EvidenceRecord[] {
  return attempt.skillIds.map((skillId) => ({
    attemptId: attempt.attemptId,
    skillId,
    activityId: attempt.activityId,
    slotId: attempt.slotId,
    mode: attempt.mode,
    outcome: attempt.outcome,
    assisted: attempt.assisted,
    representation: attempt.representation,
    at: attempt.at,
  }));
}