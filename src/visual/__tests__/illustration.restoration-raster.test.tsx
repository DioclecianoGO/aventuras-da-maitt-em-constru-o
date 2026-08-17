/**
 * Illustration — "restoration-raster" descriptor kind (Production Proof 01).
 * Spec: docs/design/MAITTE-PRODUCTION-PROOF-01.md, docs/design/COLOR-RESTORATION.md.
 *
 * Structural, fixture-driven: no real PNGs, no registry, no MaitteActor —
 * this file exercises `Illustration` directly against a small fixture
 * descriptor with three regions, which is enough to prove the compositing
 * rules without depending on the real Maittê asset module. The real/unmocked
 * passthrough through the real registry + real PNGs lives in the sibling
 * file `illustration.restoration-raster.real.test.tsx`.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { Illustration, type RestorationRasterIllustrationAsset } from "@/visual/illustration";

const FIXTURE_ASSET: RestorationRasterIllustrationAsset = {
  kind: "restoration-raster",
  fullColor: "fixture-full-color.png",
  regionMasks: {
    heart: "fixture-mask-heart.png",
    glasses: "fixture-mask-glasses.png",
    hair: "fixture-mask-hair.png",
    shirt: "fixture-mask-shirt.png",
  },
  sourceContentBox: { x: 10, y: 20, width: 80, height: 160 },
  width: 100,
  height: 200,
  renderBox: { width: 130, height: 262 },
  alt: "Fixture character",
};

function renderAsset(restored: string[]) {
  return render(
    <svg>
      <Illustration asset={FIXTURE_ASSET} restored={restored} state="listen-think" animated />
    </svg>,
  );
}

describe("Illustration — restoration-raster stolen/base state", () => {
  it("renders exactly one grayscale-filtered base image and no masks when nothing is restored", () => {
    const { container } = renderAsset([]);
    const images = container.querySelectorAll("image");
    expect(images).toHaveLength(1);
    expect(images[0]?.getAttribute("href")).toBe("fixture-full-color.png");
    expect(container.querySelectorAll("mask")).toHaveLength(0);

    const filteredGroup = container.querySelector("g[style*='grayscale']");
    expect(filteredGroup).toBeTruthy();
    expect(filteredGroup?.contains(images[0]!)).toBe(true);
  });
});

describe("Illustration — restoration-raster single-region restoration", () => {
  it.each(["heart", "glasses", "hair"])(
    "reveals exactly one region (%s) via one mask",
    (region) => {
      const { container } = renderAsset([region]);
      // One base image (grayscale) + one reveal image = 2 <image> elements,
      // plus one <image> INSIDE the mask's own content = 3 total.
      expect(container.querySelectorAll("image")).toHaveLength(3);
      expect(container.querySelectorAll("mask")).toHaveLength(1);

      const reveal = container.querySelector(`image[href="fixture-full-color.png"][mask]`);
      expect(reveal).toBeTruthy();
      const maskUrl = reveal!.getAttribute("mask")!;
      const maskId = maskUrl.replace(/^url\(#/, "").replace(/\)$/, "");
      expect(container.querySelector(`mask#${CSS.escape(maskId)}`)).toBeTruthy();
      expect(maskId).toContain(region);
    },
  );

  it("never renders a reveal layer for a region absent from `restored`", () => {
    const { container } = renderAsset(["heart"]);
    expect(container.querySelector('mask[id*="glasses"]')).toBeNull();
    expect(container.querySelector('mask[id*="hair"]:not([id*="hairStreak"])')).toBeNull();
  });
});

describe("Illustration — restoration-raster mixed combinations", () => {
  it("heart + glasses: two reveal layers, two masks, grayscale base still present", () => {
    const { container } = renderAsset(["heart", "glasses"]);
    expect(container.querySelectorAll("mask")).toHaveLength(2);
    expect(container.querySelector("g[style*='grayscale']")).toBeTruthy();
    expect(container.querySelector(`image[href="fixture-full-color.png"][mask]`)).toBeTruthy();
  });

  it("heart + glasses + hair (3 of 4 fixture regions): three reveal layers, three masks, grayscale base still present", () => {
    const { container } = renderAsset(["heart", "glasses", "hair"]);
    expect(container.querySelectorAll("mask")).toHaveLength(3);
    expect(container.querySelector("g[style*='grayscale']")).toBeTruthy();
  });
});

describe("Illustration — restoration-raster full-restored invariant", () => {
  it("renders the untouched source directly, with no filter and no masks, once every region is restored", () => {
    const { container } = renderAsset(["heart", "glasses", "hair", "shirt"]);
    // All FOUR fixture regions restored — the bypass threshold.
    const images = container.querySelectorAll("image");
    expect(images).toHaveLength(1);
    expect(images[0]?.getAttribute("href")).toBe("fixture-full-color.png");
    expect(container.querySelectorAll("mask")).toHaveLength(0);
    expect(container.querySelector("g[style*='grayscale']")).toBeNull();
    expect(images[0]?.getAttribute("style") ?? "").not.toContain("grayscale");
  });

  it("does NOT bypass when one configured region is still missing (boundary case)", () => {
    const { container } = renderAsset(["heart", "glasses", "hair"]); // "shirt" missing
    expect(container.querySelectorAll("mask")).toHaveLength(3);
    expect(container.querySelector("g[style*='grayscale']")).toBeTruthy();
    expect(container.querySelectorAll("image")).toHaveLength(7); // 1 base + 3 reveals + 3 mask-content images
  });
});

describe("Illustration — restoration-raster mask id collisions", () => {
  it("two simultaneous instances never share a mask id, and each image references its OWN instance's mask", () => {
    const { container } = render(
      <div>
        <svg data-testid="a">
          <Illustration asset={FIXTURE_ASSET} restored={["heart"]} />
        </svg>
        <svg data-testid="b">
          <Illustration asset={FIXTURE_ASSET} restored={["heart"]} />
        </svg>
      </div>,
    );

    const allMaskIds = Array.from(container.querySelectorAll("mask")).map((m) => m.id);
    expect(allMaskIds).toHaveLength(2);
    expect(new Set(allMaskIds).size).toBe(2); // no duplicates

    for (const svgTestId of ["a", "b"]) {
      const svg = container.querySelector(`[data-testid="${svgTestId}"]`)!;
      const reveal = svg.querySelector("image[mask]")!;
      const maskUrl = reveal.getAttribute("mask")!;
      const maskId = maskUrl.replace(/^url\(#/, "").replace(/\)$/, "");
      // The referenced mask exists WITHIN THIS SAME instance's subtree.
      expect(svg.querySelector(`mask#${CSS.escape(maskId)}`)).toBeTruthy();
    }
  });
});

describe("Illustration — restoration-raster placement-attribute consistency", () => {
  it("every <image> layer (base, reveal, mask content) shares identical x/y/width/height/preserveAspectRatio", () => {
    const { container } = renderAsset(["heart", "glasses"]);
    const images = Array.from(container.querySelectorAll("image"));
    expect(images.length).toBeGreaterThan(1);

    const signatures = images.map((img) => ({
      x: img.getAttribute("x"),
      y: img.getAttribute("y"),
      width: img.getAttribute("width"),
      height: img.getAttribute("height"),
      preserveAspectRatio: img.getAttribute("preserveAspectRatio"),
    }));

    const first = signatures[0];
    for (const signature of signatures) {
      expect(signature).toEqual(first);
    }
    expect(first).toEqual({
      x: "0",
      y: "0",
      width: String(FIXTURE_ASSET.width),
      height: String(FIXTURE_ASSET.height),
      preserveAspectRatio: "xMidYMid meet",
    });
  });

  it("every mask declares explicit userSpaceOnUse units, not the implicit objectBoundingBox default", () => {
    const { container } = renderAsset(["heart"]);
    const mask = container.querySelector("mask")!;
    expect(mask.getAttribute("maskUnits")).toBe("userSpaceOnUse");
    expect(mask.getAttribute("maskContentUnits")).toBe("userSpaceOnUse");
  });

  it("every mask explicitly declares luminance semantics, not just the browser default", () => {
    // Two of Maittê's eight real masks (socks/shoes) are RGBA-encoded while
    // the rest are grayscale-encoded (see maitteListenThinkProductionProof.ts).
    // Both must resolve identically, so this is stated rather than implied.
    const { container } = renderAsset(["heart", "glasses", "hair"]);
    const masks = container.querySelectorAll("mask");
    expect(masks.length).toBeGreaterThan(0);
    for (const mask of masks) {
      expect(mask.getAttribute("style") ?? "").toContain("mask-type: luminance");
    }
  });

  it("crops to the measured source content box via the nested svg's own viewBox, sized to renderBox", () => {
    const { container } = renderAsset([]);
    const nestedSvg = container.querySelector("svg > svg")!;
    const { x, y, width, height } = FIXTURE_ASSET.sourceContentBox;
    expect(nestedSvg.getAttribute("viewBox")).toBe(`${x} ${y} ${width} ${height}`);
    expect(nestedSvg.getAttribute("width")).toBe(String(FIXTURE_ASSET.renderBox.width));
    expect(nestedSvg.getAttribute("height")).toBe(String(FIXTURE_ASSET.renderBox.height));
  });
});
