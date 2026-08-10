/**
 * Phase 1B.1a regression coverage.
 * Spec: docs/ux/PHASE-1B-1A-SUCCESS-RETURN-HOTFIX.md
 */
import * as React from "react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import { findActivity, findSlot, placeholderPack } from "@/game/content/placeholder-fixture";
import type { AttemptResult } from "@/game/domain/responses";
import { PuzzleTemplateHost } from "@/game/stage/PuzzleTemplateHost";
import { SUCCESS_REACTION_MS, useSuccessReturn } from "@/game/stage/useSuccessReturn";

vi.mock("@/audio/sfx", () => ({ playSfx: () => {} }));

const slot = findSlot("slot-1")!;
const activity = findActivity("activity-placeholder-challenge")!;
const item = placeholderPack.items[0]!;

/** Minimal orchestration harness: mirrors what the Challenge Stage route does. */
function Harness({ onAttempt }: { onAttempt?: (a: AttemptResult) => void }) {
  const [last, setLast] = React.useState<AttemptResult | null>(null);
  const [tick, setTick] = React.useState(0);
  const handle = (attempt: AttemptResult) => {
    setLast(attempt);
    onAttempt?.(attempt);
  };
  return (
    <div>
      <button type="button" onClick={() => setTick((t) => t + 1)}>
        re-render parent {tick}
      </button>
      <span data-testid="outcome">{last?.outcome ?? "none"}</span>
      <PuzzleTemplateHost
        activity={activity}
        slot={slot}
        pack={placeholderPack}
        item={item}
        confirmLabel="Mostrar para Burpee"
        disabled={last?.outcome === "correct"}
        onAttempt={handle}
      />
    </div>
  );
}

function visibleOrder(): string[] {
  return [...document.querySelectorAll("li button[aria-label^='Pedra']")].map((node) =>
    node.getAttribute("aria-label")!.split(" ")[1]!.replace(",", ""),
  );
}

/** Tap-to-place: authored 3 1 4 2 -> ascending 1 2 3 4. */
function solveAscending() {
  const tap = (label: string) =>
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`^Pedra ${label},`) }));
  // move "1" onto position of "3"
  tap("1");
  tap("3");
  // now 1 3 4 2 -> move "2" before "3"
  tap("2");
  tap("3");
}

beforeEach(() => vi.useRealTimers());
afterEach(() => cleanup());

describe("Test A — solved arrangement survives orchestration re-render", () => {
  it("keeps the solved order after the attempt and after extra parent renders", () => {
    render(<Harness />);
    expect(visibleOrder()).toEqual(["3", "1", "4", "2"]);

    solveAscending();
    expect(visibleOrder()).toEqual(["1", "2", "3", "4"]);

    fireEvent.click(screen.getByRole("button", { name: "Mostrar para Burpee" }));
    expect(screen.getByTestId("outcome").textContent).toBe("correct");
    expect(visibleOrder()).toEqual(["1", "2", "3", "4"]);

    fireEvent.click(screen.getByText(/re-render parent/));
    expect(visibleOrder()).toEqual(["1", "2", "3", "4"]);
  });
});

describe("Test B — interaction freezes after a correct result", () => {
  it("blocks reordering and a second attempt", () => {
    const attempts: AttemptResult[] = [];
    render(<Harness onAttempt={(a) => attempts.push(a)} />);
    solveAscending();
    fireEvent.click(screen.getByRole("button", { name: "Mostrar para Burpee" }));
    expect(attempts).toHaveLength(1);

    // stones no longer respond
    fireEvent.click(screen.getByRole("button", { name: /^Pedra 4,/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Pedra 1,/ }));
    expect(visibleOrder()).toEqual(["1", "2", "3", "4"]);

    // confirmation cannot emit another response
    fireEvent.click(screen.getByRole("button", { name: "Mostrar para Burpee" }));
    expect(attempts).toHaveLength(1);
  });
});

describe("Test F — incorrect result stays in the Challenge Stage", () => {
  it("does not freeze and does not schedule a return", () => {
    const attempts: AttemptResult[] = [];
    render(<Harness onAttempt={(a) => attempts.push(a)} />);
    fireEvent.click(screen.getByRole("button", { name: /^Pedra 3,/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Pedra 1,/ }));
    fireEvent.click(screen.getByRole("button", { name: "Mostrar para Burpee" }));

    expect(attempts).toHaveLength(1);
    expect(attempts[0]!.outcome).not.toBe("correct");

    // still interactive, still able to retry
    const before = visibleOrder();
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`^Pedra ${before[0]},`) }));
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`^Pedra ${before[1]},`) }));
    expect(visibleOrder()).not.toEqual(before);
    fireEvent.click(screen.getByRole("button", { name: "Mostrar para Burpee" }));
    expect(attempts).toHaveLength(2);
  });
});

describe("Test C — successful challenge returns to the same Board", () => {
  function ReturnHarness({ outcome }: { outcome: "correct" | "incorrect" | null }) {
    const navigate = navigateSpy;
    const onReturn = React.useCallback(() => navigate("/mundo/world-placeholder"), [navigate]);
    const { frozen } = useSuccessReturn(outcome, onReturn);
    return <span data-testid="frozen">{String(frozen)}</span>;
  }
  const navigateSpy = vi.fn();

  beforeEach(() => {
    navigateSpy.mockClear();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it("navigates to the same world board after the bounded reaction", () => {
    render(<ReturnHarness outcome="correct" />);
    expect(navigateSpy).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(SUCCESS_REACTION_MS);
    });
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith("/mundo/world-placeholder");
  });

  it("never auto-navigates for an incorrect outcome", () => {
    render(<ReturnHarness outcome="incorrect" />);
    act(() => {
      vi.advanceTimersByTime(SUCCESS_REACTION_MS * 5);
    });
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
