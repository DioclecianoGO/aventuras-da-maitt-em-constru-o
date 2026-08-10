/**
 * Narration service.
 * Spec: docs/design/AUDIO.md
 *
 * A single module-level controller so only ONE spoken narration can be primary
 * at a time. Replaying always cancels the previous playback, so repeated taps
 * cannot stack audio.
 *
 * Source order: approved audio asset (by logical key) → system speech
 * synthesis fallback → caption-only, reported as `unsupported`.
 *
 * This service NEVER evaluates a response, reads game state or influences
 * progression. It reports playback status; nothing more.
 */
import { resolveAudioUrl } from "@/audio/audioRegistry";

export type NarrationRequest = {
  /** Short visible caption. Always rendered, independent of audio. */
  captionText: string;
  /** Sentence handed to the speech fallback. */
  spokenText: string;
  /** Optional approved recording, resolved through the audio registry. */
  audioKey?: string;
  locale?: string;
  /** Reserved for future per-companion voice profiles. */
  voiceProfileKey?: string;
};

export type NarrationStatus = "idle" | "speaking" | "blocked" | "unsupported";

type Listener = (status: NarrationStatus) => void;

const BLOCKED_TIMEOUT_MS = 900;

let status: NarrationStatus = "idle";
const listeners = new Set<Listener>();
let element: HTMLAudioElement | null = null;
let utterance: SpeechSynthesisUtterance | null = null;
let startTimer: ReturnType<typeof setTimeout> | null = null;

function setStatus(next: NarrationStatus) {
  if (status === next) return;
  status = next;
  for (const listener of listeners) listener(status);
}

export function getNarrationStatus(): NarrationStatus {
  return status;
}

export function subscribeNarration(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function clearTimer() {
  if (startTimer !== null) {
    clearTimeout(startTimer);
    startTimer = null;
  }
}

/** Cancels any playback and clears the speaking state. Safe to call twice. */
export function stopNarration() {
  clearTimer();
  if (element) {
    element.pause();
    element.src = "";
    element = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  utterance = null;
  setStatus("idle");
}

function speechAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance === "function"
  );
}

function speakWithSynthesis(request: NarrationRequest) {
  if (!speechAvailable()) {
    setStatus("unsupported");
    return;
  }
  try {
    const next = new window.SpeechSynthesisUtterance(request.spokenText);
    next.lang = request.locale ?? "pt-BR";
    next.rate = 0.95;
    next.pitch = 1.05;
    next.onstart = () => {
      clearTimer();
      setStatus("speaking");
    };
    next.onend = () => {
      clearTimer();
      if (utterance === next) {
        utterance = null;
        setStatus("idle");
      }
    };
    next.onerror = () => {
      clearTimer();
      if (utterance === next) {
        utterance = null;
        setStatus("blocked");
      }
    };
    utterance = next;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(next);
    clearTimer();
    startTimer = setTimeout(() => {
      // No `start` event: autoplay/user-gesture policy or a silent engine.
      if (utterance === next && status !== "speaking") setStatus("blocked");
    }, BLOCKED_TIMEOUT_MS);
  } catch {
    setStatus("unsupported");
  }
}

/**
 * Plays a narration request, cancelling anything already playing.
 * Never throws: every failure resolves into a visible status instead.
 */
export function speakNarration(request: NarrationRequest) {
  if (typeof window === "undefined") return;
  stopNarration();

  const url = resolveAudioUrl(request.audioKey);
  if (url) {
    const audio = new Audio(url);
    element = audio;
    audio.onplaying = () => {
      clearTimer();
      setStatus("speaking");
    };
    audio.onended = () => {
      if (element === audio) {
        element = null;
        setStatus("idle");
      }
    };
    audio.onerror = () => {
      // Asset failed to load — fall back to speech synthesis.
      if (element === audio) element = null;
      speakWithSynthesis(request);
    };
    audio.play().catch(() => {
      if (element === audio) element = null;
      speakWithSynthesis(request);
    });
    return;
  }

  speakWithSynthesis(request);
}

/** True when neither a recording nor speech synthesis can ever play. */
export function narrationPossible(): boolean {
  return typeof window !== "undefined" && speechAvailable();
}