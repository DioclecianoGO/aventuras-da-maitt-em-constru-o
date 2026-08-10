/**
 * CONCEPT ASSET — illustrated natural environment used by Science Slot 1.
 * Spec: docs/worlds/SCIENCE-WORLD.md, docs/ux/CHALLENGE-STAGE.md,
 *       docs/design/ASSET-PRODUCTION-PIPELINE.md
 *
 * Concept-quality and replaceable. The scene draws ONLY scenery: it carries no
 * option ids, no correctness and no curriculum. Interaction hotspots live in
 * the presentation configuration and are applied by the generic template.
 *
 * Scene space 800 x 450.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";

export function CoastalEnvironmentScene() {
  return (
    <g>
      {/* sky */}
      <rect x="0" y="0" width="800" height="450" fill="var(--world-sky, #cfe6f2)" />
      <circle cx="678" cy="70" r="34" fill="var(--hope, #f4c95d)" opacity="0.55" />

      {/* sea */}
      <path
        d="M0 150 H800 V262 C 620 282, 420 268, 250 280 C 160 286, 74 282, 0 274 Z"
        fill="var(--world-ocean-deep, #2f7f96)"
        opacity="0.85"
      />
      <path
        d="M0 274 C 74 282, 160 286, 250 280 C 420 268, 620 282, 800 262 V 316 C 560 344, 300 334, 0 344 Z"
        fill="var(--world-ocean, #64b9c9)"
        opacity="0.9"
      />
      {/* wet then dry sand */}
      <path
        d="M0 344 C 300 334, 560 344, 800 316 V 366 C 520 392, 260 384, 0 392 Z"
        fill="var(--world-sand-wet, #d8c39a)"
      />
      <path d="M0 392 C 260 384, 520 392, 800 366 V 450 H0 Z" fill="var(--world-sand, #ecd9ad)" />

      <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 150 H800" stroke={INK_SOFT} strokeWidth="2.2" />
        {/* surf lines */}
        <path d="M0 274 C 74 282, 160 286, 250 280 C 420 268, 620 282, 800 262" strokeWidth="2.8" />
        <path d="M0 344 C 300 334, 560 344, 800 316" strokeWidth="3" />
        <path
          d="M90 300 q 70 -12 140 -2 M470 296 q 80 -14 160 -2"
          stroke={INK_SOFT}
          strokeWidth="2"
        />

        {/* rock, left foreground */}
        <path
          d="M96 400 c 10 -46, 58 -70, 104 -50 c 34 15, 48 34, 54 50 c -46 16, -112 18, -158 0 Z"
          strokeWidth="3.2"
          fill={PAPER_DEEP}
        />
        <path
          d="M136 384 q 24 -18 48 -6 M170 398 q 20 -10 40 -4"
          stroke={INK_SOFT}
          strokeWidth="2"
        />

        {/* plant / coastal bush, right foreground */}
        <g transform="translate(628 402)">
          <path d="M0 0 v -66" strokeWidth="4" />
          <path
            d="M0 -34 c -34 -6, -56 -26, -62 -52 c 34 -4, 58 12, 62 40 M0 -46 c 34 -8, 56 -30, 60 -56 c -34 -2, -56 16, -60 44 M0 -62 c -8 -30, 2 -54, 20 -70 c 14 22, 12 48, -6 66"
            strokeWidth="3"
            fill="var(--world-forest, #6f9c5a)"
            fillOpacity="0.55"
          />
          <path d="M-26 0 q 26 10 52 0" strokeWidth="2.4" stroke={INK_SOFT} />
        </g>

        {/* small grasses */}
        {[210, 330, 470, 760].map((x) => (
          <g key={x} transform={`translate(${x} 424)`}>
            <path
              d="M0 0 c -4 -18, -10 -28, -18 -36 M3 0 c 0 -20, 4 -30, 10 -40"
              stroke={INK_SOFT}
              strokeWidth="2.2"
            />
          </g>
        ))}

        {/* bird in flight */}
        <g className="bird-glide" transform="translate(350 118)">
          <path d="M-30 0 q 16 -22 30 -4 q 14 -18 30 4" strokeWidth="3.4" />
          <path d="M-6 2 q 6 8 12 0" strokeWidth="2.4" stroke={INK_SOFT} />
        </g>

        {/* shells */}
        {[
          [250, 418],
          [520, 408],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <path d="M-11 0 q 1 -14 11 -14 q 10 0 11 14 Z" strokeWidth="2.4" fill={PAPER_DEEP} />
          </g>
        ))}
      </g>
    </g>
  );
}

/* --------------------------------------------------------------------- *
 * Small illustrated objects — reusable manipulable art for placement.    *
 * Drawn in a 64 x 64 box so any template can size them freely.           *
 * --------------------------------------------------------------------- */

function Box({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden>
      <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export function TreeObjectArt() {
  return (
    <Box>
      <path d="M32 56 v -20" />
      <path
        d="M32 38 c -18 -2, -26 -14, -24 -30 c 16 0, 24 12, 24 26 M32 34 c 18 -2, 26 -14, 24 -30 c -16 0, -24 12, -24 26"
        fill="var(--world-forest, #6f9c5a)"
        fillOpacity="0.5"
      />
      <path d="M22 56 q 10 6 20 0" stroke={INK_SOFT} />
    </Box>
  );
}

export function CrabObjectArt() {
  return (
    <Box>
      <ellipse cx="32" cy="34" rx="17" ry="12" fill="var(--joy, #e2795b)" fillOpacity="0.55" />
      <path d="M15 30 l -9 -8 M49 30 l 9 -8 M18 44 l -8 8 M46 44 l 8 8 M26 44 l -4 10 M38 44 l 4 10" />
      <path d="M26 30 v 4 M38 30 v 4" stroke={INK_SOFT} />
    </Box>
  );
}

export function RockObjectArt() {
  return (
    <Box>
      <path
        d="M8 48 c 4 -20, 22 -30, 38 -22 c 12 6, 14 16, 12 22 c -16 8, -34 8, -50 0 Z"
        fill={PAPER_DEEP}
      />
      <path d="M22 40 q 10 -8 20 -2" stroke={INK_SOFT} />
    </Box>
  );
}

export function WaterObjectArt() {
  return (
    <Box>
      <path d="M8 26 q 12 -8 24 0 q 12 8 24 0" stroke={INK_SOFT} />
      <path d="M8 38 q 12 -8 24 0 q 12 8 24 0" />
      <path d="M8 50 q 12 -8 24 0 q 12 8 24 0" stroke={INK_SOFT} />
    </Box>
  );
}

export function LivingZoneArt() {
  return (
    <svg viewBox="0 0 64 40" className="h-8 w-12" aria-hidden>
      <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round">
        <path
          d="M32 36 c -14 -8, -24 -16, -24 -25 c 0 -7, 10 -11, 24 2 c 14 -13, 24 -9, 24 -2 c 0 9, -10 17, -24 25 Z"
          fill="var(--joy, #e2795b)"
          fillOpacity="0.4"
        />
      </g>
    </svg>
  );
}

export function NonLivingZoneArt() {
  return (
    <svg viewBox="0 0 64 40" className="h-8 w-12" aria-hidden>
      <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round">
        <path
          d="M6 34 c 4 -16, 20 -24, 32 -18 c 10 5, 12 13, 10 18 c -14 6, -28 6, -42 0 Z"
          fill={PAPER_DEEP}
        />
        <path d="M44 34 q 8 -10 16 0" stroke={INK_SOFT} />
      </g>
    </svg>
  );
}
