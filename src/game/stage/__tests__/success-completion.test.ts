/**
 * Phase 1B.1a — Tests D and E.
 * Completion must be committed BEFORE the Board resumes, and restoration must
 * stay derived from those same facts across a reload.
 * Spec: docs/ux/PHASE-1B-1A-SUCCESS-RETURN-HOTFIX.md
 */
import { describe, expect, it } from "vitest";

// Registers the approved evaluators/templates; the route does this via imports.
import "@/game/registries";

import {
  findActivity,
  findSlot,
  placeholderPack,
  placeholderWorld,
} from "@/game/content/placeholder-fixture";
import { resolveAttempt, toEvidence } from "@/game/evaluation/orchestrator";
import { gameReducer } from "@/game/state/reducer";
import { createLocalStoragePersistence } from "@/game/persistence/local-storage";
import { SAVE_SCHEMA_VERSION, emptyFacts, type GameFacts } from "@/game/state/types";
import {
  selectCurrentSlot,
  selectSlotState,
  selectWorldRestoration,
} from "@/game/state/selectors";
import {
  getBoardRestorationUnits,
  isUnitRestored,
} from "@/visual/world-config/restoration-units";

const slot = findSlot("slot-1")!;
const activity = findActivity("activity-placeholder-challenge")!;
const item = placeholderPack.items[0]!;

/** Mirrors exactly what the Challenge Stage route commits on a correct attempt. */
function commitCorrectAttempt(start: GameFacts): GameFacts {
  const attempt = resolveAttempt({
    activity,
    slot,
    pack: placeholderPack,
    item,
    response: { kind: "ordering", orderedIds: ["opt-1", "opt-2", "opt-3", "opt-4"] },
    supportUsed: false,
  });
  expect(attempt.outcome).toBe("correct");

  const slots = [...placeholderWorld.slots].sort((a, b) => a.order - b.order);
  const nextSlot = slots[slots.findIndex((entry) => entry.id === attempt.slotId) + 1];

  let facts = gameReducer(start, {
    type: "RECORD_ATTEMPT",
    evidence: toEvidence(attempt),
    slotId: attempt.slotId,
    activityId: attempt.activityId,
    outcome: attempt.outcome,
    mode: attempt.mode,
  });
  facts = gameReducer(facts, {
    type: "SLOT_COMPLETED",
    slotId: attempt.slotId,
    worldId: attempt.worldId,
    ...(nextSlot ? { nextSlotId: nextSlot.id } : {}),
  });
  return facts;
}

describe("Test D — completion exists before the Board resumes", () => {
  it("commits the slot completion and advances the current slot synchronously", () => {
    const facts = commitCorrectAttempt(emptyFacts());
    expect(facts.slots["slot-1"]?.completedAt).toBeTruthy();
    expect(selectSlotState(facts, placeholderWorld, "slot-1")).toBe("completed");
    // Maittê position comes from the existing progression selector, not a new field.
    expect(selectCurrentSlot(facts, placeholderWorld)?.id).toBe("slot-2");
    expect(facts.currentSlotByWorld[placeholderWorld.id]).toBe("slot-2");
  });
});

describe("Test E — restoration derives from the completion fact and survives reload", () => {
  it("restores the slot-1 board units and rebuilds them after reload", () => {
    const facts = commitCorrectAttempt(emptyFacts());
    const completedSlotIds = Object.entries(facts.slots)
      .filter(([, value]) => value?.completedAt)
      .map(([id]) => id);
    const progress = selectWorldRestoration(facts, placeholderWorld);
    expect(progress).toBeGreaterThan(0);

    const units = getBoardRestorationUnits(placeholderWorld.id);
    const slotOneUnits = units.filter((unit) => unit.requiresCompletedSlotId === "slot-1");
    expect(slotOneUnits.length).toBeGreaterThan(0);
    for (const unit of slotOneUnits) {
      expect(isUnitRestored(unit, { completedSlotIds, progress })).toBe(true);
    }

    // Reload through the real persistence adapter — no visual field is stored.
    const persistence = createLocalStoragePersistence("adm.test.save");
    persistence.save({
      schemaVersion: SAVE_SCHEMA_VERSION,
      savedAt: new Date().toISOString(),
      facts,
    });
    const reloaded = persistence.load()!.facts;
    expect(JSON.stringify(reloaded)).not.toMatch(
      /challengeSolvedVisual|showRestoredScene|successAnimationCompleted/,
    );

    const reloadedCompleted = Object.entries(reloaded.slots)
      .filter(([, value]) => value?.completedAt)
      .map(([id]) => id);
    const reloadedProgress = selectWorldRestoration(reloaded, placeholderWorld);
    for (const unit of slotOneUnits) {
      expect(
        isUnitRestored(unit, {
          completedSlotIds: reloadedCompleted,
          progress: reloadedProgress,
        }),
      ).toBe(true);
    }
    expect(selectCurrentSlot(reloaded, placeholderWorld)?.id).toBe("slot-2");
    persistence.clear();
  });
});
