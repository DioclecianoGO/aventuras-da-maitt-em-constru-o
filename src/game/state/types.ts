/**
 * Game state — SOURCE FACTS ONLY.
 * Spec: docs/technical/STATE.md ("Persist source facts; derive visual state")
 *
 * Restoration percentages are NEVER stored here. See src/game/state/selectors.ts.
 */
import type { EvidenceRecord, LearningMode, Outcome } from "@/game/domain/responses";

export const SAVE_SCHEMA_VERSION = 1;

export type SlotFacts = {
  completedActivityIds: string[];
  completedAt?: string;
};

export type GameFacts = {
  /** slotId -> facts. Completion is a fact; restoration is derived from it. */
  slots: Record<string, SlotFacts>;
  /** milestoneId -> recovery fact. Catalogue is empty in Phase 0 (GAP). */
  milestones: Record<string, { recoveredAt: string }>;
  /** Raw pedagogical evidence. Authoritative. No mastery label is stored. */
  evidence: EvidenceRecord[];
  /** worldId -> current slot id. */
  currentSlotByWorld: Record<string, string>;
};

export type PersistedSave = {
  schemaVersion: number;
  savedAt: string;
  facts: GameFacts;
};

export type GameAction =
  | { type: "HYDRATE"; facts: GameFacts }
  | {
      type: "RECORD_ATTEMPT";
      evidence: EvidenceRecord[];
      slotId: string;
      activityId: string;
      outcome: Outcome;
      mode: LearningMode;
    }
  | { type: "SLOT_COMPLETED"; slotId: string; worldId: string; nextSlotId?: string }
  | { type: "MILESTONE_RECOVERED"; milestoneId: string }
  | { type: "RESET" };

export function emptyFacts(): GameFacts {
  return { slots: {}, milestones: {}, evidence: [], currentSlotByWorld: {} };
}