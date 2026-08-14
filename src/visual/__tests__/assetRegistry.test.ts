/**
 * Logical asset registry — descriptor migration guard.
 * Spec: docs/design/VISUAL-IMPLEMENTATION.md §"Asset strategy",
 *       docs/design/ASSET-PRODUCTION-PIPELINE.md.
 */
import { describe, expect, it } from "vitest";

import { getAsset, hasAsset } from "@/visual/assetRegistry";

describe("asset registry", () => {
  it("resolves every current entry to a vector-component descriptor", () => {
    const keys = [
      "overworld.color",
      "overworld.ink",
      "overworld.base",
      "board.dunas-douradas.color",
      "board.dunas-douradas.ink",
      "board.praia-das-conchas.color",
      "board.praia-das-conchas.ink",
      "landmark.rock-arch",
      "object.slot",
      "object.folded-map",
      "object.backpack",
      "character.maitte.idle-curious",
      "character.maitte.listen-think",
      "character.maitte.success",
      "character.maitte.retry-thinking",
      "character.maitte.move",
      "character.burpee.idle",
      "character.burpee.speak",
      "character.burpee.watch",
      "character.burpee.success-reaction",
      "character.burpee.retry-reaction",
      "character.pipoca.idle",
      "character.pipoca.speak",
      "character.pipoca.watch",
      "character.pipoca.success-reaction",
      "character.pipoca.retry-reaction",
      "character.companion",
      "stage-skin.desert",
      "stage-skin.coast",
      "stage-skin.default",
    ];
    for (const key of keys) {
      expect(hasAsset(key)).toBe(true);
      const asset = getAsset(key);
      expect(asset.kind).toBe("vector-component");
      if (asset.kind === "vector-component") {
        expect(typeof asset.Component).toBe("function");
      }
    }
  });

  it("degrades an unknown key to a quiet placeholder instead of throwing", () => {
    expect(hasAsset("nonexistent.key")).toBe(false);
    const asset = getAsset("nonexistent.key");
    expect(asset.kind).toBe("vector-component");
  });

  it("returns the SAME missing-asset descriptor for every unknown key", () => {
    expect(getAsset("unknown.a")).toBe(getAsset("unknown.b"));
  });

  it("exposes the three stage skins introduced by the Step 1 registry normalization", () => {
    for (const skin of ["desert", "coast", "default"]) {
      expect(hasAsset(`stage-skin.${skin}`)).toBe(true);
    }
  });

  it("no longer exposes the bare character.maitte key removed by Step 2B-M1", () => {
    expect(hasAsset("character.maitte")).toBe(false);
  });

  it("Step 2B-M2: exposes all five Burpee per-state keys and keeps the generic companion fallback", () => {
    for (const state of ["idle", "speak", "watch", "success-reaction", "retry-reaction"]) {
      expect(hasAsset(`character.burpee.${state}`)).toBe(true);
    }
    // Unlike character.maitte, character.companion is NOT removed: it is
    // still the real fallback for pets without per-state keys yet.
    expect(hasAsset("character.companion")).toBe(true);
  });

  it("Step 2B-M3: exposes all five Pipoca per-state keys and keeps the generic companion fallback", () => {
    for (const state of ["idle", "speak", "watch", "success-reaction", "retry-reaction"]) {
      expect(hasAsset(`character.pipoca.${state}`)).toBe(true);
    }
    // character.companion remains the real fallback for pets without
    // per-state keys yet (Will, Lyra today).
    expect(hasAsset("character.companion")).toBe(true);
    // Burpee's keys are unaffected by Pipoca's addition.
    for (const state of ["idle", "speak", "watch", "success-reaction", "retry-reaction"]) {
      expect(hasAsset(`character.burpee.${state}`)).toBe(true);
    }
  });
});
