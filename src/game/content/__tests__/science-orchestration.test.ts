/**
 * Science Slice A orchestration.
 * Spec: docs/technical/CONTENT-ORCHESTRATION.md §1–§2
 *
 * Guards the generic boundary: worlds resolve by id, a Slot runs its whole
 * authored sequence, and it completes only when every activity is done.
 */
import { describe, expect, it } from "vitest";

import {
  getActivityContent,
  getSlot,
  getWorld,
  isSlotSequenceComplete,
  listWorlds,
  resolveNextActivityId,
  slotSequenceIds,
} from "@/game/content";
import { SCIENCE_WORLD_ID } from "@/game/content/science/slice-a";

describe("multi-world registry", () => {
  it("registers Mathematics and Science side by side", () => {
    const ids = listWorlds().map((world) => world.id);
    expect(ids).toContain("world-placeholder");
    expect(ids).toContain(SCIENCE_WORLD_ID);
  });

  it("exposes six investigation slots for Science Slice A", () => {
    expect(getWorld(SCIENCE_WORLD_ID)?.slots).toHaveLength(6);
  });

  it("resolves activity -> pack -> item generically", () => {
    const resolved = getActivityContent("activity-sci-s1-practice");
    expect(resolved?.pack.id).toBe(resolved?.activity.contentPackId);
    expect(resolved?.item).toBeTruthy();
  });
});

describe("slot sequence", () => {
  const slot = getSlot(SCIENCE_WORLD_ID, "sci-slot-1")!;

  it("orders discover -> practice -> challenge", () => {
    expect(slotSequenceIds(slot)).toEqual([
      "activity-sci-s1-discover",
      "activity-sci-s1-practice",
      "activity-sci-s1-challenge",
    ]);
  });

  it("advances to the next unfinished activity", () => {
    expect(resolveNextActivityId(slot, [])).toBe("activity-sci-s1-discover");
    expect(resolveNextActivityId(slot, ["activity-sci-s1-discover"])).toBe(
      "activity-sci-s1-practice",
    );
  });

  it("completes the slot only when every activity is done", () => {
    expect(
      isSlotSequenceComplete(slot, ["activity-sci-s1-discover", "activity-sci-s1-practice"]),
    ).toBe(false);
    expect(isSlotSequenceComplete(slot, slotSequenceIds(slot))).toBe(true);
  });
});