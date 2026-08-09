/**
 * CONCEPT ASSET — companion creature (original artwork).
 * Spec: docs/narrative/PET-COMPANIONS.md — companions are configuration, are
 * not bound to a subject, and never evaluate the child. Purely presentational.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";

export function CompanionArt({ animated = true }: { animated?: boolean }) {
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