/**
 * CONCEPT ASSET — Praia das Conchas, opening zone of Oceano das Descobertas.
 * Spec: docs/worlds/SCIENCE-WORLD.md, docs/design/ASSET-PRODUCTION-PIPELINE.md
 *
 * Concept-quality, replaceable illustration: a coastal expedition seen from a
 * low ridge — tide line, wet sand, rock shelves, shells, coastal grasses and
 * the deeper ocean waiting at the horizon. Colour lives in the `Color` layer
 * and is revealed by the restoration mask; ink is drawn on top.
 *
 * Scene space 1600 x 900.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";

const HORIZON = 250;

export function PraiaDasConchasColor() {
  return (
    <g stroke="none">
      {/* sky and deep ocean */}
      <rect x="0" y="0" width="1600" height={HORIZON} fill="var(--world-sky, #cfe6f2)" />
      <path
        d={`M0 ${HORIZON} H1600 V430 C 1200 470, 900 452, 620 476 C 380 496, 180 486, 0 466 Z`}
        fill="var(--world-ocean-deep, #2f7f96)"
        opacity="0.9"
      />
      {/* shallow water */}
      <path
        d="M0 466 C 180 486, 380 496, 620 476 C 900 452, 1200 470, 1600 430 V 560 C 1180 610, 760 596, 380 616 C 240 624, 110 620, 0 606 Z"
        fill="var(--world-ocean, #64b9c9)"
        opacity="0.85"
      />
      {/* wet sand */}
      <path
        d="M0 606 C 110 620, 240 624, 380 616 C 760 596, 1180 610, 1600 560 V 660 C 1150 700, 700 690, 300 704 C 190 708, 90 704, 0 696 Z"
        fill="var(--world-sand-wet, #d8c39a)"
        opacity="0.9"
      />
      {/* dry beach */}
      <path d="M0 696 C 200 712, 700 694, 1600 660 V 900 H 0 Z" fill="var(--world-sand, #ecd9ad)" />
      {/* dune grass band */}
      <path d="M0 838 C 420 812, 980 828, 1600 800 V 900 H 0 Z" fill="var(--world-forest, #6f9c5a)" opacity="0.35" />
    </g>
  );
}

export function PraiaDasConchasInk({ prefix }: { prefix: string }) {
  return (
    <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round" filter={`url(#${prefix}-ink)`}>
      {/* horizon and the deeper destination, visible but not reachable yet */}
      <path d={`M0 ${HORIZON} H1600`} stroke={INK_SOFT} strokeWidth="2.6" />
      <path d="M1250 214 q 40 -26 82 -4 q 34 -22 66 2" stroke={INK_SOFT} strokeWidth="2.2" />
      <path d="M188 196 q 30 -20 62 -2 q 26 -16 52 2" stroke="var(--ink-faint)" strokeWidth="2" />

      {/* distant island: the deeper ocean chapter to come */}
      <path d="M1096 250 c 40 -46, 96 -60, 150 -30 c 34 18, 56 20, 92 30 Z" stroke={INK_SOFT} strokeWidth="3" fill={PAPER_DEEP} />
      <path d="M1160 226 q 22 -16 44 -2" stroke={INK_SOFT} strokeWidth="2.2" />

      {/* surf lines */}
      <path d="M0 466 C 180 486, 380 496, 620 476 C 900 452, 1200 470, 1600 430" strokeWidth="3.2" />
      <path d="M0 606 C 110 620, 240 624, 380 616 C 760 596, 1180 610, 1600 560" strokeWidth="3.4" />
      <g className="sand-drift" opacity="0.7">
        <path d="M120 540 q 120 -18 240 -2" stroke={INK_SOFT} strokeWidth="2.2" />
        <path d="M900 528 q 140 -20 280 -4" stroke={INK_SOFT} strokeWidth="2.2" />
      </g>

      {/* rock shelf with tide pools, left */}
      <path d="M60 690 c 40 -44, 130 -52, 196 -18 c 44 22, 78 20, 110 32 c -110 30, -250 26, -306 -14 Z" strokeWidth="3.4" fill={PAPER_DEEP} />
      <ellipse cx="150" cy="676" rx="34" ry="13" strokeWidth="2.6" stroke={INK_SOFT} />
      <ellipse cx="236" cy="694" rx="22" ry="9" strokeWidth="2.4" stroke={INK_SOFT} />

      {/* rock shelf, right */}
      <path d="M1290 640 c 46 -40, 132 -44, 196 -12 c 40 20, 66 18, 96 28 c -104 28, -240 22, -292 -16 Z" strokeWidth="3.2" fill={PAPER_DEEP} />
      <ellipse cx="1392" cy="632" rx="30" ry="12" strokeWidth="2.4" stroke={INK_SOFT} />

      {/* beach line and scattered shells */}
      <path d="M0 696 C 200 712, 700 694, 1600 660" strokeWidth="3" />
      {[
        [340, 760],
        [520, 792],
        [742, 748],
        [980, 800],
        [1188, 754],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path d="M-14 0 q 2 -18 14 -18 q 12 0 14 18 Z" strokeWidth="2.6" fill={PAPER_DEEP} />
          <path d="M0 -17 v 15 M-7 -13 l 3 12 M7 -13 l -3 12" stroke={INK_SOFT} strokeWidth="1.8" />
        </g>
      ))}

      {/* coastal grasses along the dune band */}
      {[80, 300, 620, 960, 1320, 1520].map((x) => (
        <g key={x} transform={`translate(${x} 852)`} className="sand-drift">
          <path d="M0 0 c -4 -22, -12 -34, -22 -44 M2 0 c 0 -24, 4 -38, 12 -50 M-2 0 c -12 -14, -18 -26, -20 -38" stroke={INK_SOFT} strokeWidth="2.4" />
        </g>
      ))}

      {/* gliding seabirds */}
      <g className="bird-glide" opacity="0.85">
        <path d="M420 300 q 14 -12 26 0 q 12 -12 26 0" stroke={INK_SOFT} strokeWidth="2.4" />
        <path d="M700 260 q 10 -9 19 0 q 9 -9 19 0" stroke={INK_SOFT} strokeWidth="2" />
      </g>
    </g>
  );
}