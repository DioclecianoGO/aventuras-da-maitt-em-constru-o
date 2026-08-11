/**
 * GENERIC read-aloud seam for short child-facing text.
 * Spec: docs/ux/EMERGENT-READER-SUPPORT.md ("Read-aloud rule", "Audio ownership"),
 *       docs/design/AUDIO.md
 *
 * It speaks EXACTLY the text that is already visible on screen: an option
 * label, a category/target label, a conclusion/evidence sentence, a scene
 * object name or a short action label.
 *
 * Hard boundaries:
 * - it is subject-neutral: no Science, no Mathematics, no curriculum;
 * - it never evaluates, never submits and never records evidence;
 * - it reuses the single narration stream, so a new label cancels the previous
 *   spoken text instead of stacking voices;
 * - failure is silent: when audio is unavailable the visible label still
 *   carries the meaning and interaction stays usable.
 */
import { narrationPossible, speakNarration, stopNarration } from "@/audio/narrationService";

export type LabelSpeechRequest = {
  /** The literal visible text. Speaking it is accessibility, never a hint. */
  text: string;
  locale?: string;
  /** Optional approved recording for this label, resolved by the registry. */
  audioKey?: string;
};

/** Speaks a visible label, replacing whatever is currently being spoken. */
export function speakLabel(request: LabelSpeechRequest | string): void {
  const normalized = typeof request === "string" ? { text: request } : request;
  const text = normalized.text?.trim();
  if (!text) return;
  speakNarration({
    captionText: text,
    spokenText: text,
    locale: normalized.locale ?? "pt-BR",
    ...(normalized.audioKey ? { audioKey: normalized.audioKey } : {}),
  });
}

/** Stops any spoken stream. Safe to call when nothing is playing. */
export function stopLabel(): void {
  stopNarration();
}

/** False when neither recordings nor speech synthesis can ever play. */
export function labelSpeechAvailable(): boolean {
  return narrationPossible();
}
