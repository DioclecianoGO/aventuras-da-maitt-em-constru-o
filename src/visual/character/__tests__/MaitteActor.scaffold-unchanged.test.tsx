/**
 * MaitteActor — current vector scaffold passthrough (Step 2B-M1), REAL
 * registry, REAL MaitteFigure. No mocking in this file on purpose: proves
 * the migration from a direct <MaitteFigure> render to <MaitteActor> did not
 * change what the child sees — state still picks a pose, restored regions
 * still reach the colour layers, the heart is still unconditional.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { MaitteActor } from "@/visual/character/MaitteActor";

describe("MaitteActor scaffold passthrough (unmocked)", () => {
  it("forwards state to the underlying figure so the correct pose renders", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="success" restored={new Set(["heart", "glasses"])} animated={false} />
      </svg>,
    );
    // "success" pose draws an open-mouth path unique to that state.
    expect(container.querySelector('path[d^="M57 96 q 8 12 16 0"]')).toBeTruthy();
  });

  it("forwards restored regions unchanged — a restored region's colour layer is fully opaque", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={new Set(["heart", "glasses"])} animated={false} />
      </svg>,
    );
    const glassesLayer = Array.from(container.querySelectorAll("g")).find(
      (g) => g.getAttribute("opacity") === "1" && g.querySelector('path[d^="M40 74 q 12 -4 22 0"]'),
    );
    expect(glassesLayer).toBeTruthy();
  });

  it("leaves an unrestored region's colour layer transparent", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={new Set(["heart"])} animated={false} />
      </svg>,
    );
    // Only the region-gated <g> declares an explicit opacity attribute at
    // all (ancestor wrapper <g>s that also happen to contain this same path
    // deeper in their subtree do not), so filtering on hasAttribute first
    // is what actually narrows to the right element.
    const glassesLayer = Array.from(container.querySelectorAll("g")).find(
      (g) => g.hasAttribute("opacity") && g.querySelector('path[d^="M40 74 q 12 -4 22 0"]'),
    );
    expect(glassesLayer?.getAttribute("opacity")).toBe("0");
  });

  it("keeps the heart saturated regardless of which regions are restored", () => {
    const { container } = render(
      <svg>
        <MaitteActor state="idle-curious" restored={new Set(["heart"])} animated={false} />
      </svg>,
    );
    // The heart path is drawn unconditionally by MaitteFigure — not gated by
    // any opacity toggle — for every acting state and restoration set.
    expect(container.querySelector('path[fill="var(--hope)"]')).toBeTruthy();
  });
});
