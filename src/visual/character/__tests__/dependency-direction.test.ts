/**
 * Dependency-direction guard (Step 2B-M2).
 * Spec: docs/design/VISUAL-ASSET-CONTRACT.md.
 *
 * `assetRegistry.tsx` already imports `CompanionArt`. If `CompanionArt` ever
 * imported anything that imports `assetRegistry` (BurpeeActor, CompanionActor,
 * or assetRegistry/Illustration directly), that would form an import cycle.
 * This is a static source-text check rather than a runtime one on purpose:
 * the whole point is to catch the mistake before it can ever execute.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));

function read(relativePath: string): string {
  return readFileSync(resolve(here, relativePath), "utf8");
}

describe("CompanionArt stays asset-layer code (no upward imports)", () => {
  const companionArtSource = read("../../../assets/game/characters/CompanionArt.tsx");

  it.each([
    "@/visual/character/BurpeeActor",
    "@/visual/character/CompanionActor",
    "@/visual/assetRegistry",
    "@/visual/illustration",
  ])("does not import %s", (forbidden) => {
    expect(companionArtSource).not.toContain(forbidden);
  });
});

describe("BurpeeActor stays below CompanionActor (no upward import back to it)", () => {
  const burpeeActorSource = read("../BurpeeActor.tsx");

  it("does not import CompanionActor", () => {
    expect(burpeeActorSource).not.toContain("@/visual/character/CompanionActor");
  });

  it("does not import CompanionArt directly", () => {
    expect(burpeeActorSource).not.toContain("CompanionArt");
  });
});
