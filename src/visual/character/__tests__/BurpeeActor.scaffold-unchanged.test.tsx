/**
 * BurpeeActor — current vector scaffold passthrough (Step 2B-M2), REAL
 * registry, REAL BurpeeArt. No mocking in this file on purpose: proves
 * BurpeeActor's `state`/`animated` still reach BurpeeArt's own POSES table
 * unchanged.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { BurpeeActor } from "@/visual/character/BurpeeActor";

describe("BurpeeActor scaffold passthrough (unmocked)", () => {
  it("forwards state to the underlying figure so the correct pose renders", () => {
    const { container } = render(
      <svg>
        <BurpeeActor state="speak" animated={false} />
      </svg>,
    );
    // "speak" pose's open-mouth path is unique to that state.
    expect(
      container.querySelector('path[d^="M-92 -70 C -84 -56, -66 -54, -58 -64"]'),
    ).toBeTruthy();
  });

  it("renders a different pose for a different state", () => {
    const { container } = render(
      <svg>
        <BurpeeActor state="idle" animated={false} />
      </svg>,
    );
    // "idle" has a closed mouth — the "speak" open-mouth marker must be absent.
    expect(
      container.querySelector('path[d^="M-92 -70 C -84 -56, -66 -54, -58 -64"]'),
    ).toBeNull();
  });
});
