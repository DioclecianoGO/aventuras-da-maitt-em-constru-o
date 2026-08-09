/**
 * CONCEPT ASSET — "Dunas Douradas", opening zone of the Deserto dos Números.
 * Spec: docs/worlds/MATHEMATICS-WORLD.md, docs/design/ART-DIRECTION.md
 *
 * Scene space 1600x900. Read from the SAME shapes the Overworld uses for the
 * Mathematics region so the two views feel continuous. State-free.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";

const duneBands = [
  { d: "M-40 610 C 220 512, 470 508, 700 566 C 940 626, 1200 610, 1640 528 L 1640 900 L -40 900 Z", opacity: 0.55 },
  { d: "M-40 700 C 240 604, 520 610, 760 668 C 1000 726, 1300 700, 1640 640 L 1640 900 L -40 900 Z", opacity: 0.75 },
  { d: "M-40 800 C 280 706, 600 716, 860 774 C 1100 826, 1360 800, 1640 754 L 1640 900 L -40 900 Z", opacity: 1 },
];

export function DunasDouradasColor() {
  return (
    <g>
      <rect x="-40" y="-40" width="1680" height="640" fill="var(--world-desert)" opacity="0.35" />
      {duneBands.map((band) => (
        <path key={band.d} d={band.d} fill="var(--world-desert)" opacity={band.opacity} />
      ))}
      <path
        d={duneBands[2]!.d}
        fill="var(--world-desert-deep)"
        opacity="0.35"
        transform="translate(0 46)"
      />
      <circle cx="1300" cy="180" r="66" fill="var(--world-desert)" opacity="0.8" />
      <g opacity="0.5">
        <ellipse cx="1500" cy="560" rx="120" ry="26" fill="var(--world-valley)" />
      </g>
    </g>
  );
}

export function DunasDouradasInk({ prefix }: { prefix: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* sun disc, low contrast */}
      <circle cx="1300" cy="180" r="66" stroke={INK_SOFT} strokeWidth="3" />
      <path d="M1180 214 q 60 -18 120 0 M1206 246 q 70 -16 150 4" stroke={INK_SOFT} strokeWidth="2.2" />

      {/* dune silhouettes */}
      {duneBands.map((band, index) => (
        <path
          key={band.d}
          d={band.d}
          fill={index === 2 ? PAPER_DEEP : "none"}
          stroke={INK}
          strokeWidth={3.2 + index * 0.6}
        />
      ))}
      <path d={duneBands[1]!.d} fill={`url(#${prefix}-hatch)`} opacity="0.5" />
      <path d={duneBands[2]!.d} fill={`url(#${prefix}-hatch-dense)`} opacity="0.35" />

      {/* wind ripples */}
      <g stroke={INK_SOFT} strokeWidth="2.2">
        <path d="M120 726 q 60 -16 120 0 q 60 16 120 0" />
        <path d="M420 776 q 54 -14 108 0 q 54 14 108 0" />
        <path d="M900 800 q 60 -14 120 0 q 60 14 120 0" />
        <path d="M1180 736 q 50 -12 100 0" />
      </g>

      {/* scattered stones and dry grass */}
      <g stroke={INK} strokeWidth="3">
        <path d="M250 686 q 18 -22 38 -2 q -18 12 -38 2 Z" fill={PAPER_DEEP} />
        <path d="M1046 764 q 22 -26 46 -2 q -22 14 -46 2 Z" fill={PAPER_DEEP} />
        <path d="M640 620 l 6 -30 l 10 30 Z" fill={PAPER_DEEP} />
      </g>
      <g stroke={INK_SOFT} strokeWidth="2.4">
        <path d="M360 700 l -8 -26 m 8 26 l 2 -30 m -2 30 l 10 -24" />
        <path d="M1240 792 l -8 -24 m 8 24 l 2 -28 m -2 28 l 10 -22" />
      </g>

      {/* distant next-zone promise: an oasis on the far horizon */}
      <g opacity="0.45" stroke={INK_SOFT} strokeWidth="2.6">
        <path d="M1470 560 v -46 M1470 514 q -26 -12 -40 4 M1470 514 q 26 -12 40 4 M1470 514 q -10 -22 6 -30" />
        <path d="M1526 562 v -34 M1526 528 q -20 -10 -30 2 M1526 528 q 20 -10 30 2" />
        <path d="M1420 566 q 100 12 180 0" />
      </g>
    </g>
  );
}