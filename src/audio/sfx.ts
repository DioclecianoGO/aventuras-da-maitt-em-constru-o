/**
 * CONCEPT SFX — short, replaceable interaction cues.
 * Spec: docs/design/AUDIO.md ("Interaction feedback", "Feedback sounds")
 *
 * Phase 1B has no approved sound library, so these are synthesized tones
 * generated on demand. They are deliberately quiet, short and subordinate to
 * spoken guidance, and they never determine correctness or progression.
 * Replacing them with approved files means adding keys to the audio registry.
 */
import { getNarrationStatus } from "@/audio/narrationService";

export type SfxName = "select" | "place" | "success" | "retry" | "restore";

type Tone = { freq: number; to: number; duration: number; gain: number; type: OscillatorType };

const TONES: Record<SfxName, Tone[]> = {
  select: [{ freq: 520, to: 620, duration: 0.09, gain: 0.05, type: "sine" }],
  place: [{ freq: 300, to: 220, duration: 0.13, gain: 0.06, type: "triangle" }],
  success: [
    { freq: 523, to: 523, duration: 0.14, gain: 0.06, type: "sine" },
    { freq: 784, to: 784, duration: 0.22, gain: 0.055, type: "sine" },
  ],
  retry: [{ freq: 340, to: 300, duration: 0.22, gain: 0.045, type: "sine" }],
  restore: [
    { freq: 440, to: 660, duration: 0.5, gain: 0.04, type: "sine" },
  ],
};

type WindowWithAudio = Window & { webkitAudioContext?: typeof AudioContext };

let context: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const win = window as WindowWithAudio;
  const Ctor = window.AudioContext ?? win.webkitAudioContext;
  if (!Ctor) return null;
  try {
    context ??= new Ctor();
    if (context.state === "suspended") void context.resume();
    return context;
  } catch {
    return null;
  }
}

/**
 * Plays a short cue. Silent failure is acceptable HERE and only here: an SFX
 * carries no essential information, so an unavailable audio context must never
 * interrupt the child. Essential meaning always lives in caption + visuals.
 */
export function playSfx(name: SfxName) {
  const ctx = getContext();
  if (!ctx) return;
  // Speech has precedence: duck cues while narration is speaking.
  const ducking = getNarrationStatus() === "speaking" ? 0.35 : 1;

  TONES[name].forEach((tone, index) => {
    const start = ctx.currentTime + index * 0.11;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = tone.type;
    osc.frequency.setValueAtTime(tone.freq, start);
    osc.frequency.linearRampToValueAtTime(tone.to, start + tone.duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(tone.gain * ducking, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + tone.duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + tone.duration + 0.05);
  });
}