import { describe, expect, it } from "vitest";

import {
  getBoardRestorationUnits,
  getOverworldRestorationUnits,
  isUnitRestored,
} from "@/visual/world-config/restoration-units";

describe("restoration units", () => {
  it("stays stolen until the driving completion fact exists", () => {
    const [unit] = getBoardRestorationUnits("world-placeholder");
    expect(unit).toBeDefined();
    expect(isUnitRestored(unit!, { completedSlotIds: [], progress: 0 })).toBe(false);
    expect(isUnitRestored(unit!, { completedSlotIds: ["slot-1"], progress: 0.34 })).toBe(true);
  });

  it("never un-restores while the fact is still present (survives reload)", () => {
    const units = getBoardRestorationUnits("world-placeholder");
    const facts = { completedSlotIds: ["slot-1", "slot-2"], progress: 0.66 };
    const first = units.map((unit) => isUnitRestored(unit, facts));
    const afterReload = units.map((unit) => isUnitRestored(unit, facts));
    expect(afterReload).toEqual(first);
    expect(first.filter(Boolean)).toHaveLength(3);
  });

  it("derives overworld details from existing region progress only", () => {
    const units = getOverworldRestorationUnits("region-mathematics");
    expect(units).toHaveLength(2);
    expect(units.map((unit) => isUnitRestored(unit, { completedSlotIds: [], progress: 0 }))).toEqual([
      false,
      false,
    ]);
    expect(
      units.map((unit) => isUnitRestored(unit, { completedSlotIds: [], progress: 0.34 })),
    ).toEqual([true, false]);
    expect(units.map((unit) => isUnitRestored(unit, { completedSlotIds: [], progress: 1 }))).toEqual([
      true,
      true,
    ]);
  });

  it("has no units for unknown scenes", () => {
    expect(getBoardRestorationUnits("world-unknown")).toEqual([]);
    expect(getOverworldRestorationUnits("region-unknown")).toEqual([]);
  });
});
