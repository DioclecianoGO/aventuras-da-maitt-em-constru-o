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
      "character.maitte",
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
});
