/**
 * WillActor — current vector scaffold passthrough (Step 2B-M4), REAL
 * registry, REAL WillArt. No mocking in this file on purpose: proves
 * WillActor's `state`/`animated` still reach WillArt's own POSES table
 * unchanged.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { WillActor } from "@/visual/character/WillActor";

describe("WillActor scaffold passthrough (unmocked)", () => {
  it("forwards state to the underlying figure so the correct pose renders", () => {
    const { container } = render(
      <svg>
        <WillActor state="speak" animated={false} />
      </svg>,
    );
    // "speak" pose's open-mouth ellipse is unique to that state (only
    // "speak" uses mouth kind "open").
    expect(container.querySelector('ellipse[cx="-19"][cy="-49"]')).toBeTruthy();
  });

  it("renders a different pose for a different state", () => {
    const { container } = render(
      <svg>
        <WillActor state="idle" animated={false} />
      </svg>,
    );
    // "idle" has a closed mouth — the "speak" open-mouth marker must be absent.
    expect(container.querySelector('ellipse[cx="-19"][cy="-49"]')).toBeNull();
  });
});
