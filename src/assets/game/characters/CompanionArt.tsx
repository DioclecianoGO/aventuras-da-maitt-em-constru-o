/**
 * Companion RENDERER — resolves a configured pet id to its concept artwork.
 * Spec: docs/narrative/PET-COMPANIONS.md, docs/design/CHARACTER-ART.md
 *
 * Companions are configuration. No subject, skill or evaluation code may name
 * a pet, and a pet id with no finished asset degrades to the neutral concept
 * creature below instead of crashing. Purely presentational.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import { BurpeeArt } from "@/assets/game/characters/pets/BurpeeArt";
import type { CompanionActingState } from "@/visual/character/acting";

export type CompanionArtProps = {
  /** Configured pet id. Unknown ids fall back gracefully. */
  petId?: string;
  state?: CompanionActingState;
  animated?: boolean;
};

/** Neutral stand-in used when a configured pet has no finished asset yet. */
function FallbackCompanionArt({ animated = true }: { animated?: boolean }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="0" cy="46" rx="34" ry="9" fill={PAPER_DEEP} stroke={INK_SOFT} strokeWidth="2" />
      <g className={animated ? "slot-breathe" : undefined}>
        <path
          d="M-26 44 C -34 18, -28 -6, -8 -12 C 10 -18, 30 -4, 32 20 C 33 34, 24 44, 12 44 Z"
          fill={PAPER_DEEP}
          stroke={INK}
          strokeWidth="3.4"
        />
        <path d="M32 20 C 46 12, 52 -8, 44 -22" stroke={INK} strokeWidth="3.2" />
        <path
          d="M-30 -6 C -34 -30, -20 -44, -2 -44 C 16 -44, 28 -30, 26 -10 C 24 6, 10 14, -4 14 C -18 14, -28 6, -30 -6 Z"
          fill={PAPER_DEEP}
          stroke={INK}
          strokeWidth="3.4"
        />
        <path d="M-26 -30 l -8 -22 l 20 8 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="3" />
        <path d="M18 -32 l 12 -20 l 4 22 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="3" />
        <path d="M-14 -14 q 3 -5 6 0 M6 -14 q 3 -5 6 0" stroke={INK} strokeWidth="2.8" />
        <path d="M-4 -4 q 4 5 8 0" stroke={INK_SOFT} strokeWidth="2.4" />
        <path d="M-22 -6 h -10 M20 -6 h 10" stroke={INK_SOFT} strokeWidth="2" />
      </g>
    </g>
  );
}

/**
 * Scene-space viewBox for the fallback creature only. Step 2B-M4 removed the
 * old `PET_VIEWBOX`/`getCompanionViewBox`/`hasCompanionArt` trio that used to
 * live here: it was dead code (unused anywhere in `src/`) and its Burpee
 * entry ("-120 -155 240 200") had drifted from `BurpeeArt`'s real, exported
 * `BURPEE_BOX.viewBox` ("-140 -160 260 205") — a stale duplicate, not a
 * source of truth. Per-pet viewport resolution now lives in
 * `src/visual/character/companionViewport.ts`, which reads each pet's own
 * exported `*_BOX` constant directly (one authoritative geometry path per
 * pet) and falls back to this exact constant for any pet without one.
 */
export const FALLBACK_PET_VIEWBOX = "-56 -60 112 116";

export function CompanionArt({ petId = "", state = "idle", animated = true }: CompanionArtProps) {
  if (petId === "burpee") return <BurpeeArt state={state} animated={animated} />;
  return <FallbackCompanionArt animated={animated} />;
}
