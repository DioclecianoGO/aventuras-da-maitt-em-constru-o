/**
 * React seam over the narration service.
 * Spec: docs/design/AUDIO.md
 *
 * Owns nothing but playback status and cleanup. The sentence itself always
 * comes from narration CONFIGURATION supplied by the caller; no component,
 * pet or template hardcodes it.
 */
import * as React from "react";

import {
  getNarrationStatus,
  narrationPossible,
  speakNarration,
  stopNarration,
  subscribeNarration,
  type NarrationRequest,
  type NarrationStatus,
} from "@/audio/narrationService";

export type UseNarration = {
  status: NarrationStatus;
  isSpeaking: boolean;
  /** True when audio cannot be produced at all; caption carries the meaning. */
  audioUnavailable: boolean;
  /** Attempted once on open, then on every replay tap. */
  play(): void;
  stop(): void;
};

export function useNarration(
  request: NarrationRequest | null,
  { autoPlay = false }: { autoPlay?: boolean } = {},
): UseNarration {
  const [status, setStatus] = React.useState<NarrationStatus>("idle");
  const requestRef = React.useRef(request);
  requestRef.current = request;

  React.useEffect(() => {
    setStatus(getNarrationStatus());
    return subscribeNarration(setStatus);
  }, []);

  const play = React.useCallback(() => {
    const current = requestRef.current;
    if (current) speakNarration(current);
  }, []);

  const stop = React.useCallback(() => stopNarration(), []);

  // Attempt narration once when the challenge opens. This follows the child's
  // tap on the slot, so it is usually allowed; if it is not, the status becomes
  // "blocked" and the replay affordance takes over.
  const key = request ? `${request.audioKey ?? ""}|${request.spokenText}` : null;
  React.useEffect(() => {
    if (!autoPlay || !key) return;
    play();
    return () => stopNarration();
  }, [autoPlay, key, play]);

  // Route change / unmount always cancels speech and clears speaking state.
  React.useEffect(() => () => stopNarration(), []);

  return {
    status,
    isSpeaking: status === "speaking",
    audioUnavailable: status === "unsupported" || (status !== "speaking" && !narrationPossible()),
    play,
    stop,
  };
}