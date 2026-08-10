/**
 * Success-return choreography for the Challenge Stage.
 * Spec: docs/ux/PHASE-1B-1A-SUCCESS-RETURN-HOTFIX.md
 *
 * Presentation/orchestration only. It reacts to an ALREADY COMMITTED attempt
 * outcome; it never decides correctness and never touches persistence.
 * The delay is bounded and never waits for narration, SFX or animation.
 */
import * as React from "react";

import type { AttemptOutcome } from "@/game/domain/responses";

/** PROVISIONAL choreography: perceivable success without breaking flow. */
export const SUCCESS_REACTION_MS = 1600;

export function useSuccessReturn(
  outcome: AttemptOutcome | null,
  onReturn: () => void,
  delayMs: number = SUCCESS_REACTION_MS,
): { frozen: boolean } {
  const frozen = outcome === "correct";

  React.useEffect(() => {
    if (!frozen) return;
    const timer = setTimeout(onReturn, delayMs);
    return () => clearTimeout(timer);
  }, [frozen, onReturn, delayMs]);

  return { frozen };
}