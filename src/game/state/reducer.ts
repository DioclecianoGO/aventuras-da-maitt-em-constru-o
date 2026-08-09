import type { GameAction, GameFacts } from "@/game/state/types";
import { emptyFacts } from "@/game/state/types";

export function gameReducer(state: GameFacts, action: GameAction): GameFacts {
  switch (action.type) {
    case "HYDRATE":
      return action.facts;

    case "RECORD_ATTEMPT": {
      const slot = state.slots[action.slotId] ?? { completedActivityIds: [] };
      const activityDone =
        action.outcome === "correct" && !slot.completedActivityIds.includes(action.activityId);

      return {
        ...state,
        evidence: [...state.evidence, ...action.evidence],
        slots: {
          ...state.slots,
          [action.slotId]: {
            ...slot,
            completedActivityIds: activityDone
              ? [...slot.completedActivityIds, action.activityId]
              : slot.completedActivityIds,
          },
        },
      };
    }

    case "SLOT_COMPLETED": {
      const slot = state.slots[action.slotId] ?? { completedActivityIds: [] };
      if (slot.completedAt) return state;
      return {
        ...state,
        slots: {
          ...state.slots,
          [action.slotId]: { ...slot, completedAt: new Date().toISOString() },
        },
        currentSlotByWorld: action.nextSlotId
          ? { ...state.currentSlotByWorld, [action.worldId]: action.nextSlotId }
          : state.currentSlotByWorld,
      };
    }

    case "MILESTONE_RECOVERED":
      return {
        ...state,
        milestones: {
          ...state.milestones,
          [action.milestoneId]: { recoveredAt: new Date().toISOString() },
        },
      };

    case "RESET":
      return emptyFacts();

    default:
      return state;
  }
}