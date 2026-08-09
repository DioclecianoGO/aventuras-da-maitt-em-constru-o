/**
 * CONCEPT ASSET — diegetic navigation objects.
 * Spec: docs/ux/NAVIGATION.md
 *
 * The FOLDED MAP is the primary way back to the Overworld. The BACKPACK is a
 * separate, secondary object and is NOT the map; it is drawn here only so the
 * distinction is explicit in the concept, and it carries no map affordance.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";

export function FoldedMapArt() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M4 12 L 26 4 L 50 14 L 72 4 L 72 46 L 50 56 L 26 46 L 4 54 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="3.4"
      />
      <path d="M26 4 V 46 M50 14 V 56" stroke={INK} strokeWidth="2.8" />
      <path d="M12 34 q 14 -12 26 -2 q 12 10 26 -6" stroke={INK_SOFT} strokeWidth="2.4" strokeDasharray="2 6" />
      <circle cx="60" cy="26" r="3.4" fill="var(--hope)" stroke="var(--hope-deep)" strokeWidth="1.6" />
    </g>
  );
}

/** Secondary object. Not navigation. Reserved for later phases. */
export function BackpackArt() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M14 54 C 10 26, 18 12, 34 12 C 50 12, 58 26, 54 54 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="3.4"
      />
      <path d="M24 14 q 10 -10 20 0" stroke={INK} strokeWidth="3" />
      <path d="M16 36 h 36" stroke={INK_SOFT} strokeWidth="2.6" />
      <rect x="24" y="40" width="16" height="10" rx="3" stroke={INK_SOFT} strokeWidth="2.4" />
    </g>
  );
}

/** Zone landmark: the wind-carved rock arch of the Dunas Douradas. */
export function RockArchArt() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M-70 0 C -66 -70, -46 -118, 0 -118 C 46 -118, 66 -70, 70 0 L 40 0 C 36 -58, 22 -86, 0 -86 C -22 -86, -36 -58, -40 0 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="4"
      />
      <path d="M-58 -30 q 12 -8 22 -2 M40 -44 q 14 -8 24 0" stroke={INK_SOFT} strokeWidth="2.4" />
      <path d="M-64 -8 h 26 M42 -8 h 26" stroke={INK_SOFT} strokeWidth="2.2" />
      <ellipse cx="0" cy="4" rx="86" ry="12" fill="none" stroke={INK_SOFT} strokeWidth="2.2" />
    </g>
  );
}