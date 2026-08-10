/**
 * Activity Slot sequence semantics.
 * Spec: docs/technical/CONTENT-ORCHESTRATION.md §2
 *
 * Pure functions over authored configuration and the EXISTING completion fact
 * `SlotFacts.completedActivityIds`. No new persisted progress source is
 * introduced: resume is always derived.
 */
import type { ActivitySlot } from "@/game/domain/schemas";

/** discover? -> practice[0..n] -> challenge[0..n] */
export function slotSequenceIds(slot: ActivitySlot): string[] {
  return [
    ...(slot.sequence.discover ? [slot.sequence.discover] : []),
    ...slot.sequence.practice,
    ...slot.sequence.challenge,
  ];
}

/** First configured Activity that is not yet completed, or null when done. */
export function resolveNextActivityId(
  slot: ActivitySlot,
  completedActivityIds: readonly string[],
): string | null {
  return slotSequenceIds(slot).find((id) => !completedActivityIds.includes(id)) ?? null;
}

/** A Slot completes only when every required Activity in its sequence is done. */
export function isSlotSequenceComplete(
  slot: ActivitySlot,
  completedActivityIds: readonly string[],
): boolean {
  return slotSequenceIds(slot).every((id) => completedActivityIds.includes(id));
}

export function sequencePosition(
  slot: ActivitySlot,
  activityId: string,
): { index: number; total: number } {
  const ids = slotSequenceIds(slot);
  return { index: ids.indexOf(activityId), total: ids.length };
}