/**
 * ChallengeStageShell — Maittê rendering still flows correctly through
 * MaitteActor (Step 2B-M1). Real, unmocked registry — proves the migration
 * away from a direct <MaitteFigure> render preserved this call site's own
 * pre-existing state-selection logic (the `speaking` override) and the
 * restored-region pipeline.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { ChallengeStageShell } from "@/visual/stage/ChallengeStageShell";

describe("ChallengeStageShell Maittê rendering (MaitteActor migration)", () => {
  it("renders the maitteState pose when narration is not speaking", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        maitteState="retry-thinking"
        narrationStatus="idle"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    // "retry-thinking" pose's thinking-eyes glyph is distinct from idle/success.
    expect(container.querySelector('path[d="M45 82 q 5 -6 10 0 q -5 5 -10 0 Z"]')).toBeTruthy();
  });

  it("still overrides to listen-think while narration is speaking, regardless of maitteState", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        maitteState="success"
        narrationStatus="speaking"
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    // listen-think shares the same thinking-eyes glyph as retry-thinking —
    // and specifically NOT the "success" open-mouth path, proving the
    // speaking override still wins over the passed maitteState prop.
    expect(container.querySelector('path[d="M45 82 q 5 -6 10 0 q -5 5 -10 0 Z"]')).toBeTruthy();
    expect(container.querySelector('path[d^="M57 96 q 8 12 16 0"]')).toBeNull();
  });

  it("still derives restored regions from avatarProgress", () => {
    const { container } = render(
      <ChallengeStageShell
        worldId="world-unknown-for-test"
        title="Desafio"
        onClose={() => {}}
        avatarProgress={1}
      >
        <p>conteúdo</p>
      </ChallengeStageShell>,
    );
    const glassesLayer = Array.from(container.querySelectorAll("g")).find(
      (g) => g.getAttribute("opacity") === "1" && g.querySelector('path[d^="M40 74 q 12 -4 22 0"]'),
    );
    expect(glassesLayer).toBeTruthy();
  });
});
