/**
 * Derived state. Nothing here is persisted.
 * Spec: docs/technical/STATE.md ("Derived state")
 *
 * Restoration is always recomputed from completion facts, so changing the
 * granularity or weighting later does not require rewriting historical saves.
 */
import type { ActivitySlot, WorldConfig } from "@/game/domain/schemas";
import type { GameFacts } from "@/game/state/types";

export type SlotState = "locked" | "available" | "completed";

export function isSlotCompleted(facts: GameFacts, slotId: string): boolean {
  return Boolean(facts.slots[slotId]?.completedAt);
}

function orderedSlots(world: WorldConfig): ActivitySlot[] {
  return [...world.slots].sort((a, b) => a.order - b.order);
}

/** Local progression is sequential inside a world (docs/gameplay/PROGRESSION.md). */
export function selectSlotState(
  facts: GameFacts,
  world: WorldConfig,
  slotId: string,
): SlotState {
  const slots = orderedSlots(world);
  const index = slots.findIndex((slot) => slot.id === slotId);
  if (index < 0) return "locked";
  if (isSlotCompleted(facts, slotId)) return "completed";
  const previousDone = slots
    .slice(0, index)
    .every((slot) => isSlotCompleted(facts, slot.id));
  return previousDone ? "available" : "locked";
}

export function selectCurrentSlot(facts: GameFacts, world: WorldConfig): ActivitySlot | null {
  const slots = orderedSlots(world);
  const explicitId = facts.currentSlotByWorld[world.id];
  const explicit = slots.find((slot) => slot.id === explicitId);
  if (explicit && !isSlotCompleted(facts, explicit.id)) return explicit;
  return slots.find((slot) => !isSlotCompleted(facts, slot.id)) ?? slots[slots.length - 1] ?? null;
}

/** 0..1 restoration of one board segment, weighted by slot restorationWeight. */
export function selectSegmentRestoration(
  facts: GameFacts,
  world: WorldConfig,
  segmentId: string,
): number {
  const slots = world.slots.filter((slot) => slot.segmentId === segmentId);
  const total = slots.reduce((sum, slot) => sum + slot.restorationWeight, 0);
  if (total === 0) return 0;
  const done = slots.reduce(
    (sum, slot) => (isSlotCompleted(facts, slot.id) ? sum + slot.restorationWeight : sum),
    0,
  );
  return done / total;
}

/** 0..1 restoration of the whole subject world. */
export function selectWorldRestoration(facts: GameFacts, world: WorldConfig): number {
  const total = world.slots.reduce((sum, slot) => sum + slot.restorationWeight, 0);
  if (total === 0) return 0;
  const done = world.slots.reduce(
    (sum, slot) => (isSlotCompleted(facts, slot.id) ? sum + slot.restorationWeight : sum),
    0,
  );
  return done / total;
}

/** Overworld region restoration mirrors its world. */
export function selectRegionRestoration(facts: GameFacts, world: WorldConfig): number {
  return selectWorldRestoration(facts, world);
}

/**
 * Avatar restoration. The green heart (hope) is always coloured, so avatar
 * restoration never reads as zero. Spec: docs/narrative/UNIVERSE.md
 */
export function selectAvatarRestoration(facts: GameFacts, worlds: WorldConfig[]): number {
  if (worlds.length === 0) return 0;
  const sum = worlds.reduce((acc, world) => acc + selectWorldRestoration(facts, world), 0);
  return sum / worlds.length;
}

/**
 * Raw per-skill evidence counters.
 * DECIDED (docs/technical/STATE.md): Phase 0 must not emit a `proficient`
 * determination. No thresholds are applied here, deliberately.
 */
export type SkillEvidenceSummary = {
  skillId: string;
  independentCorrect: number;
  assistedCorrect: number;
  incorrect: number;
  representationsSeen: string[];
};

export function selectSkillEvidence(facts: GameFacts): SkillEvidenceSummary[] {
  const bySkill = new Map<string, SkillEvidenceSummary>();

  for (const record of facts.evidence) {
    const entry = bySkill.get(record.skillId) ?? {
      skillId: record.skillId,
      independentCorrect: 0,
      assistedCorrect: 0,
      incorrect: 0,
      representationsSeen: [],
    };

    if (record.outcome === "correct") {
      // Only unassisted CHALLENGE attempts count as independent evidence.
      if (record.assisted || record.mode !== "challenge") entry.assistedCorrect += 1;
      else entry.independentCorrect += 1;
    } else {
      entry.incorrect += 1;
    }

    if (!entry.representationsSeen.includes(record.representation)) {
      entry.representationsSeen.push(record.representation);
    }
    bySkill.set(record.skillId, entry);
  }

  return [...bySkill.values()];
}