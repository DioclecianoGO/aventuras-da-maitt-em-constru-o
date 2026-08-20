/**
 * MaitteActor — Step 2C-M1 real passthrough (REAL registry, REAL PNGs). No
 * mocking in this file on purpose: proves `MaitteActor` needs no code
 * change to render `idle-curious` as the new `restoration-raster` +
 * `motion` descriptor — it still just derives `character.maitte.${state}`
 * and forwards `restored`/`animated`/`title` unchanged.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { MaitteActor } from "@/visual/character/MaitteActor";
import { MaitteAvatar } from "@/visual/character/MaitteAvatar";
import { getAsset } from "@/visual/assetRegistry";
import type { CharacterRegionId } from "@/visual/world-config/types";

const ALL_REGIONS: CharacterRegionId[] = [
  "heart",
  "glasses",
  "hairStreak",
  "hair",
  "shirt",
  "skirt",
  "socks",
  "shoes",
];

describe("MaitteActor — idle-curious resolves the real Step 2C-M1 asset", () => {
  it("resolves character.maitte.idle-curious to a restoration-raster descriptor with the documented geometry", () => {
    const asset = getAsset("character.maitte.idle-curious");
    expect(asset.kind).toBe("restoration-raster");
    if (asset.kind === "restoration-raster") {
      expect(asset.sourceContentBox).toEqual({ x: 292, y: 113, width: 461, height: 1314 });
      expect(asset.width).toBe(1024);
      expect(asset.height).toBe(1536);
      expect(asset.renderBox).toEqual({ width: 130, height: 262 });
    }
  });

  it("renders the real full-color source as the stolen-state base image", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={["heart"]} animated={false} />
      </svg>,
    );
    const images = container.querySelectorAll("image");
    expect(images.length).toBeGreaterThan(0);
    for (const image of images) {
      const href = image.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toBe("undefined");
    }
  });

  it("reaches full restoration with no filter/masks when animated=false, regardless of motion config", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={ALL_REGIONS} animated={false} />
      </svg>,
    );
    expect(container.querySelectorAll("image")).toHaveLength(1);
    expect(container.querySelectorAll("mask")).toHaveLength(0);
    expect(container.querySelector("g[style*='grayscale']")).toBeNull();
  });

  it("keeps the static full-restored image untouched even when animated=true (motion overlays are additive, not destructive)", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={ALL_REGIONS} animated={true} />
      </svg>,
    );
    const images = Array.from(container.querySelectorAll("image"));
    const base = images.find((img) => !img.hasAttribute("mask"));
    expect(base?.getAttribute("href")).toBe(
      (getAsset("character.maitte.idle-curious") as { fullColor?: string }).fullColor,
    );
    expect(base?.getAttribute("style") ?? "").not.toContain("grayscale");
  });

  it("applies breathing when animated=true and suppresses it when animated=false", () => {
    const { container: animatedContainer } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={["heart"]} animated={true} />
      </svg>,
    );
    expect(animatedContainer.querySelector("svg > svg")?.getAttribute("class")).toContain(
      "maitte-breathe",
    );

    const { container: staticContainer } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={["heart"]} animated={false} />
      </svg>,
    );
    expect(staticContainer.querySelector("svg > svg")?.getAttribute("class")).toBeNull();
  });

  it("applies a heart-localized pulse, never a whole-character transform", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={["heart"]} animated={true} />
      </svg>,
    );
    expect(container.querySelector("svg > svg")?.classList.contains("heart-pulse")).toBe(false);
    const pulseGroup = container.querySelector("g.heart-pulse");
    expect(pulseGroup).toBeTruthy();
  });

  it("applies the deterministic blink layers only when animated", () => {
    const { container: animatedContainer } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={["heart"]} animated={true} />
      </svg>,
    );
    expect(animatedContainer.querySelector("g.maitte-blink")).toBeTruthy();

    const { container: staticContainer } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={["heart"]} animated={false} />
      </svg>,
    );
    expect(staticContainer.querySelector("g.maitte-blink")).toBeNull();
  });

  it("forwards a custom title as the accessible name", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={["heart"]} title="Maittê à vontade" />
      </svg>,
    );
    expect(container.querySelector("title")?.textContent).toBe("Maittê à vontade");
  });
});

describe("MaitteAvatar — real Overworld/World Board call-site wiring for idle-curious (no call-site changes needed)", () => {
  it("MaitteAvatar's own default state (idle-curious) renders the real raster asset unchanged", () => {
    const { container } = render(
      <svg>
        <MaitteAvatar progress={0} x={0} y={0} animated={false} />
      </svg>,
    );
    // No `state` prop passed — proves the DEFAULT (idle-curious) reaches
    // the raster asset with zero changes to MaitteAvatar, exactly as
    // OverworldScene.tsx and WorldBoardScene.tsx already call it.
    expect(container.querySelector("image")).toBeTruthy();
    expect(container.querySelector("g[transform]")).toBeTruthy();
  });

  it("still derives restored regions from progress at the default state", () => {
    const { container } = render(
      <svg>
        <MaitteAvatar progress={1} x={0} y={0} animated={false} />
      </svg>,
    );
    // Full progress -> every region restored -> the raster's full-restored
    // bypass -> no grayscale filter anywhere.
    expect(container.querySelector("g[style*='grayscale']")).toBeNull();
    expect(container.querySelector("image")).toBeTruthy();
  });
});
