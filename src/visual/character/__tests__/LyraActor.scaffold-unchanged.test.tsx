/**
 * LyraActor — current vector scaffold passthrough (Step 2B-M5), REAL
 * registry, REAL LyraArt. No mocking in this file on purpose: proves
 * LyraActor's `state`/`animated` still reach LyraArt's own POSES table
 * unchanged.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { LyraActor } from "@/visual/character/LyraActor";

describe("LyraActor scaffold passthrough (unmocked)", () => {
  it("forwards state to the underlying figure so the correct pose renders", () => {
    const { container } = render(
      <svg>
        <LyraActor state="speak" animated={false} />
      </svg>,
    );
    // "speak" pose's open-mouth ellipse is unique to that state (only
    // "speak" uses mouth kind "open").
    expect(container.querySelector('ellipse[cx="-19"][cy="-49"]')).toBeTruthy();
  });

  it("renders a different pose for a different state", () => {
    const { container } = render(
      <svg>
        <LyraActor state="idle" animated={false} />
      </svg>,
    );
    // "idle" has a closed mouth — the "speak" open-mouth marker must be absent.
    expect(container.querySelector('ellipse[cx="-19"][cy="-49"]')).toBeNull();
  });
});
