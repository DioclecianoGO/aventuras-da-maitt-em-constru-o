/**
 * companionViewport — per-pet ambient SVG viewBox resolution guard
 * (Step 2B-M4, extended Step 2B-M5). Real, unmocked: proves each pet
 * resolves to its own real scaffold's exported `*_BOX`, and that the value
 * ChallengeStageShell used to hardcode (Burpee's box) is no longer applied
 * to every pet.
 */
import { describe, expect, it } from "vitest";

import { getCompanionViewBox } from "@/visual/character/companionViewport";
import { BURPEE_BOX } from "@/assets/game/characters/pets/BurpeeArt";
import { PIPOCA_BOX } from "@/assets/game/characters/pets/PipocaArt";
import { WILL_BOX } from "@/assets/game/characters/pets/WillArt";
import { LYRA_BOX } from "@/assets/game/characters/pets/LyraArt";
import { FALLBACK_PET_VIEWBOX } from "@/assets/game/characters/CompanionArt";

describe("getCompanionViewBox", () => {
  it("resolves burpee to BURPEE_BOX.viewBox", () => {
    expect(getCompanionViewBox("burpee")).toBe(BURPEE_BOX.viewBox);
  });

  it("resolves pipoca to PIPOCA_BOX.viewBox", () => {
    expect(getCompanionViewBox("pipoca")).toBe(PIPOCA_BOX.viewBox);
  });

  it("resolves will to WILL_BOX.viewBox", () => {
    expect(getCompanionViewBox("will")).toBe(WILL_BOX.viewBox);
  });

  it("resolves lyra to LYRA_BOX.viewBox", () => {
    expect(getCompanionViewBox("lyra")).toBe(LYRA_BOX.viewBox);
  });

  it("resolves a deliberately-unconfigured pet id to the generic fallback viewport", () => {
    expect(getCompanionViewBox("unconfigured-pet")).toBe(FALLBACK_PET_VIEWBOX);
  });

  it("resolves an unknown pet id to the generic fallback viewport", () => {
    expect(getCompanionViewBox("totally-unknown-pet")).toBe(FALLBACK_PET_VIEWBOX);
  });

  it("resolves an absent pet id to the generic fallback viewport", () => {
    expect(getCompanionViewBox(undefined)).toBe(FALLBACK_PET_VIEWBOX);
  });

  it("all four real pet boxes are actually distinct from each other and from the fallback (guards against a stale shared constant)", () => {
    const boxes = new Set([
      BURPEE_BOX.viewBox,
      PIPOCA_BOX.viewBox,
      WILL_BOX.viewBox,
      LYRA_BOX.viewBox,
      FALLBACK_PET_VIEWBOX,
    ]);
    expect(boxes.size).toBe(5);
  });
});
