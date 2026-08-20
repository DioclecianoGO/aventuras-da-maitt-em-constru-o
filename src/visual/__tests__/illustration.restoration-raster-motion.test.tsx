/**
 * Illustration — "restoration-raster" optional `motion` descriptor
 * (Step 2C-M1, Maittê `idle-curious`). Spec: docs/design/CHARACTER-MOTION.md.
 *
 * Structural, fixture-driven: no real PNGs, no registry, no MaitteActor —
 * mirrors `illustration.restoration-raster.test.tsx`'s technique, extended
 * with a `motion` config. The real/unmocked passthrough through the real
 * idle-curious asset lives in
 * `src/visual/character/__tests__/MaitteActor.idle-curious-production-proof.test.tsx`.
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
    shirt: "fixture-mask-shirt.png",
  },
  sourceContentBox: { x: 10, y: 20, width: 80, height: 160 },
  width: 100,
  height: 200,
  renderBox: { width: 130, height: 262 },
  alt: "Fixture character",
  motion: {
    breathing: true,
    heartPulse: { originXPercent: 50, originYPercent: 40 },
    blink: {
      eyeMask: "fixture-blink-eye-mask.png",
      underlay: "fixture-blink-underlay.png",
      originXPercent: 51,
      originYPercent: 22,
    },
  },
};

const { motion: _fixtureMotion, ...FIXTURE_ASSET_NO_MOTION_BASE } = FIXTURE_ASSET;
const FIXTURE_ASSET_NO_MOTION: RestorationRasterIllustrationAsset = FIXTURE_ASSET_NO_MOTION_BASE;

function renderAsset(
  restored: string[],
  opts: { animated?: boolean; asset?: RestorationRasterIllustrationAsset } = {},
) {
  const { animated, asset = FIXTURE_ASSET } = opts;
  return render(
    <svg>
      <Illustration
        asset={asset}
        restored={restored}
        {...(animated !== undefined ? { animated } : {})}
      />
    </svg>,
  );
}

describe("Illustration — restoration-raster motion is entirely additive", () => {
  it("an asset with no `motion` field renders with no breathing class/style, regardless of animated", () => {
    for (const animated of [true, false]) {
      const { container, unmount } = renderAsset(["heart"], {
        animated,
        asset: FIXTURE_ASSET_NO_MOTION,
      });
      const svg = container.querySelector("svg > svg")!;
      expect(svg.getAttribute("class")).toBeNull();
      expect(svg.getAttribute("style")).toBeNull();
      expect(container.querySelector("g.heart-pulse")).toBeNull();
      expect(container.querySelector("g.maitte-blink")).toBeNull();
      unmount();
    }
  });
});

describe("Illustration — breathing", () => {
  it("applies the reused .maitte-breathe class + feet-anchored transform-origin only when animated", () => {
    const { container } = renderAsset(["heart"], { animated: true });
    const svg = container.querySelector("svg > svg")!;
    expect(svg.getAttribute("class")).toContain("maitte-breathe");
    expect(svg.getAttribute("style") ?? "").toContain("transform-origin: center bottom");
  });

  it("is absent when animated=false", () => {
    const { container } = renderAsset(["heart"], { animated: false });
    const svg = container.querySelector("svg > svg")!;
    expect(svg.getAttribute("class")).toBeNull();
    expect(svg.getAttribute("style")).toBeNull();
  });
});

describe("Illustration — heart pulse", () => {
  it("wraps ONLY the heart reveal layer (partial branch), never the whole character, at its own measured origin", () => {
    const { container } = renderAsset(["heart", "glasses"], { animated: true });
    const outerSvg = container.querySelector("svg > svg")!;
    expect(outerSvg.classList.contains("heart-pulse")).toBe(false);

    const pulseGroup = container.querySelector("g.heart-pulse")!;
    expect(pulseGroup).toBeTruthy();
    expect(pulseGroup.getAttribute("style") ?? "").toContain("transform-origin: 50% 40%");
    // Exactly one <image> inside the pulse group (the heart reveal), not the whole composition.
    expect(pulseGroup.querySelectorAll("image")).toHaveLength(1);
    expect(pulseGroup.querySelector("image")?.getAttribute("mask")).toContain("mask-heart");

    // The glasses reveal is unaffected — NOT inside any heart-pulse group.
    const glassesImage = Array.from(container.querySelectorAll("image")).find((img) =>
      (img.getAttribute("mask") ?? "").includes("mask-glasses"),
    );
    expect(glassesImage?.closest(".heart-pulse")).toBeNull();
  });

  it("adds a heart-localized overlay in the fully-restored bypass branch WITHOUT touching the base image", () => {
    const { container } = renderAsset(["heart", "glasses", "shirt"], { animated: true });
    // full restoration for this 3-region fixture:
    const images = container.querySelectorAll("image");
    // base (untouched) + heart-pulse overlay's own <image> + that overlay's mask-content <image>
    expect(images.length).toBeGreaterThan(1);
    const baseImage = Array.from(images).find((img) => !img.hasAttribute("mask"));
    expect(baseImage).toBeTruthy();
    expect(baseImage?.getAttribute("href")).toBe("fixture-full-color.png");
    expect(container.querySelector("g.heart-pulse")).toBeTruthy();
  });

  it("is absent (and the bypass stays exactly one <image>) when animated=false, even at full restoration", () => {
    const { container } = renderAsset(["heart", "glasses", "shirt"], { animated: false });
    const images = container.querySelectorAll("image");
    expect(images).toHaveLength(1);
    expect(images[0]?.getAttribute("href")).toBe("fixture-full-color.png");
    expect(container.querySelector("g.heart-pulse")).toBeNull();
    expect(container.querySelector("mask")).toBeNull();
  });
});

describe("Illustration — deterministic blink", () => {
  it("blink underlay + squashing overlay activate only when animated and motion.blink is configured", () => {
    const { container } = renderAsset(["heart"], { animated: true });
    const underlay = Array.from(container.querySelectorAll("image")).find(
      (img) => img.getAttribute("href") === "fixture-blink-underlay.png",
    );
    expect(underlay).toBeTruthy();
    const squash = container.querySelector("g.maitte-blink")!;
    expect(squash).toBeTruthy();
    expect(squash.getAttribute("style") ?? "").toContain("transform-origin: 51% 22%");
    const squashImage = squash.querySelector("image");
    expect(squashImage?.getAttribute("href")).toBe("fixture-full-color.png");
    expect(squashImage?.getAttribute("mask")).toContain("motion-blink-eye");
  });

  it("is absent when animated=false", () => {
    const { container } = renderAsset(["heart"], { animated: false });
    expect(
      Array.from(container.querySelectorAll("image")).some(
        (img) => img.getAttribute("href") === "fixture-blink-underlay.png",
      ),
    ).toBe(false);
    expect(container.querySelector("g.maitte-blink")).toBeNull();
  });

  it("uses ONLY the approved source + the eye mask + the underlay — no additional generative/authored image is referenced", () => {
    const { container } = renderAsset(["heart"], { animated: true });
    const hrefs = new Set(
      Array.from(container.querySelectorAll("image")).map((img) => img.getAttribute("href")),
    );
    for (const href of hrefs) {
      expect([
        "fixture-full-color.png",
        "fixture-mask-heart.png",
        "fixture-blink-eye-mask.png",
        "fixture-blink-underlay.png",
      ]).toContain(href);
    }
  });

  it("grayscale-matches the blink layers when the character is NOT fully restored, so no colour leaks over the desaturated face", () => {
    const { container } = renderAsset(["heart"], { animated: true }); // "glasses" NOT restored -> partial branch
    const grayscaleGroup = container.querySelector("g[style*='grayscale']")!;
    expect(grayscaleGroup).toBeTruthy();
    const underlayInGrayscale = Array.from(grayscaleGroup.querySelectorAll("image")).some(
      (img) => img.getAttribute("href") === "fixture-blink-underlay.png",
    );
    expect(underlayInGrayscale).toBe(true);
    const squashInGrayscale = grayscaleGroup.querySelector("g.maitte-blink");
    expect(squashInGrayscale).toBeTruthy();
  });

  it("renders blink layers full-colour (outside any grayscale filter) once fully restored", () => {
    const { container } = renderAsset(["heart", "glasses", "shirt"], { animated: true }); // full restoration
    expect(container.querySelector("g[style*='grayscale']")).toBeNull();
    const squash = container.querySelector("g.maitte-blink")!;
    expect(squash).toBeTruthy();
    expect(squash.closest("g[style*='grayscale']")).toBeNull();
  });

  it("blink inputs are motion-only — never leak into `regionMasks` (CharacterRegionId territory)", () => {
    expect(Object.keys(FIXTURE_ASSET.regionMasks)).not.toContain("eyes");
    expect(Object.keys(FIXTURE_ASSET.regionMasks)).not.toContain("blink");
    expect(Object.values(FIXTURE_ASSET.regionMasks)).not.toContain(
      FIXTURE_ASSET.motion?.blink?.eyeMask,
    );
  });

  it("never forwards the raw motion config objects as invalid DOM attributes", () => {
    const { container } = renderAsset(["heart"], { animated: true });
    const svg = container.querySelector("svg > svg")!;
    expect(svg.getAttribute("motion")).toBeNull();
    expect(svg.getAttribute("blink")).toBeNull();
    expect(svg.getAttribute("heartpulse")).toBeNull();
  });
});
