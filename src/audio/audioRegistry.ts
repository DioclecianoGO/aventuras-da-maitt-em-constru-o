/**
 * Logical audio registry.
 * Spec: docs/design/AUDIO.md ("Asset isolation")
 *
 * Audio is referenced by LOGICAL KEY, never by file path, so approved voice
 * recordings and a final SFX library can replace concept placeholders without
 * touching narration config, the stage, templates or any game logic.
 *
 * Phase 1B ships with no approved recording: every narration key is absent, so
 * the narration service falls through to system speech synthesis, which is an
 * implementation fallback and NOT the canonical voice of any companion.
 */

const audioSources: Record<string, string> = {
  // e.g. "vo.pt-BR.burpee.slot-1.instruction": "/audio/....mp3"
};

export function resolveAudioUrl(key: string | undefined): string | null {
  if (!key) return null;
  return audioSources[key] ?? null;
}

export function hasAudioAsset(key: string): boolean {
  return key in audioSources;
}