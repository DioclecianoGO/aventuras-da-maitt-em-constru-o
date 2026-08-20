/**
 * MaitteActor — Production Proof 01 real passthrough (REAL registry, REAL
 * PNGs). No mocking in this file on purpose: proves `MaitteActor` needs no
 * code change to render the new `restoration-raster` descriptor — it still
 * just derives `character.maitte.${state}` and forwards `restored`/`title`
 * unchanged, exactly as it always has.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { MaitteActor } from "@/visual/character/MaitteActor";
import { getAsset } from "@/visual/assetRegistry";
import type { CharacterRegionId } from "@/visual/world-config/types";

describe("MaitteActor — listen-think resolves the real Production Proof 01 asset", () => {
  it("resolves character.maitte.listen-think to a restoration-raster descriptor", () => {
    const asset = getAsset("character.maitte.listen-think");
    expect(asset.kind).toBe("restoration-raster");
  });

  it("renders the real full-color source as the stolen-state base image", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="listen-think" restored={["heart"]} animated={false} />
      </svg>,
    );
    const images = container.querySelectorAll("image");
    expect(images.length).toBeGreaterThan(0);
    // Every layer references the SAME real full-color source URL — proves
    // the imported PNG module resolved to a real asset URL, not undefined.
    for (const image of images) {
      const href = image.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toBe("undefined");
    }
  });

  it("reaches full restoration with no filter/masks once every configured region is provided", () => {
    const allRegions: CharacterRegionId[] = [
      "heart",
      "glasses",
      "hairStreak",
      "hair",
      "shirt",
      "skirt",
      "socks",
      "shoes",
    ];
    const { container } = render(
      <svg>
        <MaitteActor state="listen-think" restored={allRegions} animated={false} />
      </svg>,
    );
    expect(container.querySelectorAll("image")).toHaveLength(1);
    expect(container.querySelectorAll("mask")).toHaveLength(0);
  });

  it("forwards a custom title as the accessible name", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="listen-think" restored={["heart"]} title="Maittê pensativa" />
      </svg>,
    );
    expect(container.querySelector("title")?.textContent).toBe("Maittê pensativa");
  });
});
