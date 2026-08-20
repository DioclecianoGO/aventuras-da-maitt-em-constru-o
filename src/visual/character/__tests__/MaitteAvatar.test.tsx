/**
 * MaitteAvatar — behavior contract unchanged by the Step 2B-M1 migration to
 * MaitteActor. Spec: docs/narrative/MAITTE.md, docs/design/COLOR-RESTORATION.md.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { MaitteAvatar, resolveRestoredRegions } from "@/visual/character/MaitteAvatar";
import { MAITTE_BOX } from "@/assets/game/characters/MaitteFigure";

describe("resolveRestoredRegions (unchanged selector)", () => {
  it("always contains the heart, even at zero progress", () => {
    expect(resolveRestoredRegions(0).has("heart")).toBe(true);
  });

  it("restores strictly more regions as progress increases (never fewer)", () => {
    const low = resolveRestoredRegions(0.2);
    const high = resolveRestoredRegions(0.9);
    for (const region of low) expect(high.has(region)).toBe(true);
  });
});

describe("MaitteAvatar", () => {
  it("positions Maittê by her feet using MAITTE_BOX and the given scale, unchanged math", () => {
    const x = 400;
    const y = 300;
    const scale = 0.66;
    const { container } = render(
      <svg>
        <MaitteAvatar progress={0} x={x} y={y} scale={scale} animated={false} />
      </svg>,
    );
    const group = container.querySelector("g[transform]");
    const expectedX = x - (MAITTE_BOX.width / 2) * scale;
    const expectedY = y - MAITTE_BOX.height * scale;
    expect(group?.getAttribute("transform")).toBe(
      `translate(${expectedX} ${expectedY}) scale(${scale})`,
    );
  });

  it("forwards the requested acting state through to the rendered pose", () => {
    const { container } = render(
      <svg>
        <MaitteAvatar progress={0} x={0} y={0} state="success" animated={false} />
      </svg>,
    );
    // "success" pose's unique open-mouth path, same as the MaitteActor scaffold test.
    expect(container.querySelector('path[d^="M57 96 q 8 12 16 0"]')).toBeTruthy();
  });

  it("derives restored regions from progress via the unchanged selector", () => {
    // Step 2C-M1: "success" here, not the default "idle-curious" — that
    // state was promoted to a restoration-raster descriptor and no longer
    // renders MaitteFigure's vector `g[opacity]` DOM. The selector wiring
    // this test exercises (`resolveRestoredRegions` -> `restored` prop) is
    // itself state-agnostic and unchanged by that promotion; see
    // `MaitteAvatar.idle-curious-production-proof.test.tsx` for the same
    // wiring proven against the real idle-curious raster asset.
    const { container } = render(
      <svg>
        <MaitteAvatar progress={1} x={0} y={0} state="success" animated={false} />
      </svg>,
    );
    // At full progress every region in provisionalSequence is restored,
    // including glasses — its colour layer should be fully opaque.
    const glassesLayer = Array.from(container.querySelectorAll("g")).find(
      (g) => g.getAttribute("opacity") === "1" && g.querySelector('path[d^="M40 74 q 12 -4 22 0"]'),
    );
    expect(glassesLayer).toBeTruthy();
  });
});
