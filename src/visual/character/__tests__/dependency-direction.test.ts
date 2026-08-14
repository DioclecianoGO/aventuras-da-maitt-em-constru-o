/**
 * Dependency-direction guard (Step 2B-M2, extended Step 2B-M3/M4).
 * Spec: docs/design/VISUAL-ASSET-CONTRACT.md.
 *
 * `assetRegistry.tsx` already imports `CompanionArt`. If `CompanionArt` ever
 * imported anything that imports `assetRegistry` (BurpeeActor, PipocaActor,
 * WillActor, CompanionActor, or assetRegistry/Illustration directly), that
 * would form an import cycle. This is a static source-text check rather than
 * a runtime one on purpose: the whole point is to catch the mistake before
 * it can ever execute.
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
    "@/visual/character/PipocaActor",
    "@/visual/character/WillActor",
    "@/visual/character/CompanionActor",
    "@/visual/character/companionViewport",
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

describe("PipocaActor stays below CompanionActor (no upward import back to it)", () => {
  const pipocaActorSource = read("../PipocaActor.tsx");

  it("does not import CompanionActor", () => {
    expect(pipocaActorSource).not.toContain("@/visual/character/CompanionActor");
  });

  it("does not import CompanionArt directly", () => {
    expect(pipocaActorSource).not.toContain("CompanionArt");
  });
});

describe("WillActor stays below CompanionActor (no upward import back to it)", () => {
  const willActorSource = read("../WillActor.tsx");

  it("does not import CompanionActor", () => {
    expect(willActorSource).not.toContain("@/visual/character/CompanionActor");
  });

  it("does not import CompanionArt directly", () => {
    expect(willActorSource).not.toContain("CompanionArt");
  });
});

describe("companionViewport stays below CompanionActor (no upward import back to it)", () => {
  const companionViewportSource = read("../companionViewport.ts");

  it("does not import CompanionActor", () => {
    expect(companionViewportSource).not.toContain("@/visual/character/CompanionActor");
  });

  it("does not import assetRegistry", () => {
    expect(companionViewportSource).not.toContain("@/visual/assetRegistry");
  });
});
