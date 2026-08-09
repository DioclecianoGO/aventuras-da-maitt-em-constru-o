/**
 * CONCEPT ASSET — Maittê (original character artwork for this project).
 * Spec: docs/narrative/MAITTE.md
 *
 * Authored as independently addressable colour regions. The heart is
 * saturated from the opening; every other region is a separate layer whose
 * activation is decided by configuration, never by this component. No
 * restoration ORDER is encoded here.
 *
 * Drawn inside a 120 x 260 box, anchored at the feet (0,260).
 */
import type { CharacterRegionId } from "@/visual/world-config/types";

const INK = "var(--ink)";
const INK_SOFT = "var(--ink-soft)";
const PAPER = "var(--paper)";

export type MaitteFigureProps = {
  /** Regions currently restored. Always contains the heart. */
  restored: ReadonlySet<CharacterRegionId> | CharacterRegionId[];
  /** Idle breathing / hop-ready pose. */
  animated?: boolean;
  title?: string;
};

export function MaitteFigure({ restored, animated = true, title }: MaitteFigureProps) {
  const set = restored instanceof Set ? restored : new Set(restored);
  const on = (region: CharacterRegionId) => (set.has(region) ? 1 : 0);

  return (
    <g>
      {title ? <title>{title}</title> : null}

      {/* --- colour regions (under the ink) --- */}
      <g opacity={on("hair")}>
        <path
          d="M60 26 C 30 26 16 50 18 78 C 20 112 14 150 22 176 C 34 168 40 140 40 118 C 56 128 84 128 100 118 C 100 142 106 168 118 176 C 126 150 120 112 122 78 C 124 50 90 26 60 26 Z"
          fill="oklch(0.38 0.06 52)"
        />
      </g>
      <g opacity={on("hairStreak")}>
        <path d="M38 44 C 30 66 30 92 34 112 L 46 108 C 42 88 42 64 50 46 Z" fill="oklch(0.86 0.09 92)" />
      </g>
      <g opacity={on("shirt")}>
        <path d="M40 116 C 30 124 26 148 26 168 L 94 168 C 94 148 90 124 80 116 Z" fill="oklch(0.84 0.09 210)" />
      </g>
      <g opacity={on("skirt")}>
        <path d="M26 168 L 94 168 L 106 208 L 14 208 Z" fill="oklch(0.62 0.13 320)" />
      </g>
      <g opacity={on("socks")}>
        <rect x="34" y="212" width="18" height="26" rx="6" fill="oklch(0.78 0.16 45)" />
        <rect x="68" y="212" width="18" height="26" rx="6" fill="oklch(0.72 0.14 200)" />
      </g>
      <g opacity={on("shoes")}>
        <path d="M30 238 h 26 v 14 h -32 q -2 -10 6 -14 Z" fill="oklch(0.66 0.14 25)" />
        <path d="M64 238 h 26 q 8 4 6 14 h -32 Z" fill="oklch(0.66 0.14 25)" />
      </g>
      <g opacity={on("glasses")}>
        <rect x="38" y="70" width="20" height="16" rx="7" fill="oklch(0.78 0.14 350)" />
        <rect x="64" y="70" width="20" height="16" rx="7" fill="oklch(0.78 0.14 350)" />
      </g>

      {/* --- ink line work (always visible) --- */}
      <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        {/* hair back */}
        <path
          d="M60 26 C 30 26 16 50 18 78 C 20 112 14 150 22 176 C 34 168 40 140 40 118 M100 118 C 100 142 106 168 118 176 C 126 150 120 112 122 78 C 124 50 90 26 60 26"
          fill={PAPER}
        />
        <path d="M22 176 q 10 10 18 2 M118 176 q -10 10 -18 2" stroke={INK_SOFT} strokeWidth="2.6" />
        {/* face */}
        <path
          d="M40 74 C 40 52 48 40 61 40 C 74 40 82 52 82 74 C 82 96 74 108 61 108 C 48 108 40 96 40 74 Z"
          fill={PAPER}
        />
        {/* fringe */}
        <path d="M36 66 C 42 46 56 38 70 40 C 82 42 88 54 88 66 C 76 58 60 52 36 66 Z" fill={PAPER} />
        {/* light lock */}
        <path d="M38 46 C 30 68 30 92 34 112" stroke={INK_SOFT} strokeWidth="2.4" />
        {/* glasses */}
        <rect x="38" y="70" width="20" height="16" rx="7" />
        <rect x="64" y="70" width="20" height="16" rx="7" />
        <path d="M58 78 h 6" strokeWidth="2.6" />
        {/* eyes + smile */}
        <path d="M46 78 q 3 -4 6 0 M70 78 q 3 -4 6 0" strokeWidth="2.6" />
        <path d="M56 96 q 6 6 12 0" strokeWidth="2.6" />
        {/* body */}
        <path d="M40 116 C 30 124 26 148 26 168 L 94 168 C 94 148 90 124 80 116 Z" fill="none" />
        <path d="M40 116 q 20 12 40 0" strokeWidth="2.6" />
        {/* arms */}
        <path d="M30 128 C 18 146 14 164 18 180 M90 128 C 102 146 106 164 102 180" />
        {/* skirt */}
        <path d="M26 168 L 94 168 L 106 208 L 14 208 Z" />
        <path d="M44 170 l -6 36 M62 170 l 0 36 M80 170 l 6 36" stroke={INK_SOFT} strokeWidth="2.2" />
        {/* legs + socks */}
        <path d="M40 208 v 30 M78 208 v 30" />
        <path d="M34 212 h 18 M68 212 h 18" stroke={INK_SOFT} strokeWidth="2.4" />
        <path d="M34 220 h 18 M68 220 h 18" stroke={INK_SOFT} strokeWidth="2.2" />
        {/* high-top canvas sneakers, unbranded */}
        <path d="M30 238 h 26 v 14 h -32 q -2 -10 6 -14 Z" />
        <path d="M64 238 h 26 q 8 4 6 14 h -32 Z" />
        <path d="M36 244 h 14 M70 244 h 14" stroke={INK_SOFT} strokeWidth="2" />
      </g>

      {/* --- the hope anchor: always saturated --- */}
      <g className={animated ? "heart-pulse" : undefined}>
        <path
          d="M60 138 C 56 130 44 130 44 141 C 44 150 54 156 60 162 C 66 156 76 150 76 141 C 76 130 64 130 60 138 Z"
          fill="var(--hope)"
          stroke="var(--hope-deep)"
          strokeWidth="2.4"
        />
      </g>
    </g>
  );
}

export const MAITTE_BOX = { width: 130, height: 262 } as const;