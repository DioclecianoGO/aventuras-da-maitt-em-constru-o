/**
 * CONCEPT ASSET — Overworld illustration (original artwork for this project).
 * Spec: docs/worlds/OVERWORLD.md, docs/design/ART-DIRECTION.md
 *
 * Scene space is 1600x1000. Colour layers sit UNDER the ink layer so the line
 * work always survives the stolen-colour state. Nothing here reads game state.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";

const trees: [number, number, number][] = [
  [170, 330, 1], [232, 268, 0.82], [300, 344, 1.1], [372, 276, 0.9],
  [440, 342, 1], [258, 400, 0.88], [352, 408, 0.95], [196, 240, 0.7],
  [430, 232, 0.76], [500, 300, 0.85], [128, 392, 0.72], [492, 392, 0.8],
];

function Tree({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 v22" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path
        d="M0 -52 C 26 -52 38 -34 34 -18 C 30 -4 14 2 0 2 C -14 2 -30 -4 -34 -18 C -38 -34 -26 -52 0 -52 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="3.4"
      />
      <path d="M-18 -20 q 18 -10 36 0" stroke={INK_SOFT} strokeWidth="2" fill="none" />
    </g>
  );
}

const dunes = [
  "M 80 760 C 170 690, 300 686, 380 742 C 440 784, 520 770, 566 736",
  "M 96 820 C 200 750, 330 748, 420 800 C 476 832, 530 826, 578 800",
  "M 130 876 C 232 818, 350 818, 448 866",
];

export function OverworldColor({ regionId }: { regionId: string }) {
  switch (regionId) {
    case "region-portuguese":
      return (
        <g>
          <path
            d="M120 160 C 300 130, 470 140, 580 200 C 620 280, 590 380, 480 452 C 340 500, 200 486, 120 430 C 74 350, 78 232, 120 160 Z"
            fill="var(--world-valley)"
            opacity="0.5"
          />
          {trees.map(([x, y, s]) => (
            <ellipse
              key={`c-${x}-${y}`}
              cx={x}
              cy={y - 25 * s}
              rx={36 * s}
              ry={28 * s}
              fill="var(--world-forest)"
            />
          ))}
        </g>
      );
    case "region-history":
      return (
        <g>
          <path
            d="M600 300 C 700 160, 800 108, 900 118 C 1010 130, 1090 210, 1116 300 C 1000 372, 720 380, 600 300 Z"
            fill="var(--world-kingdom)"
            opacity="0.45"
          />
          <path d="M742 300 L 830 168 L 918 300 Z" fill="var(--world-kingdom)" opacity="0.7" />
          <rect x="866" y="212" width="120" height="88" fill="var(--world-city)" opacity="0.55" />
        </g>
      );
    case "region-geography":
      return (
        <g>
          <path
            d="M1128 250 C 1250 180, 1420 190, 1526 250 C 1560 330, 1520 430, 1400 480 C 1280 500, 1180 452, 1132 372 Z"
            fill="var(--world-valley)"
            opacity="0.55"
          />
          <path
            d="M1150 400 C 1260 350, 1360 372, 1500 320"
            stroke="var(--world-ocean)"
            strokeWidth="18"
            fill="none"
            opacity="0.7"
          />
        </g>
      );
    case "region-english":
      return (
        <g>
          <path
            d="M1180 570 C 1300 530, 1450 534, 1540 580 C 1560 670, 1512 760, 1390 806 C 1270 812, 1186 754, 1160 660 Z"
            fill="var(--world-city)"
            opacity="0.5"
          />
          <rect x="1246" y="620" width="70" height="110" fill="var(--world-city)" opacity="0.75" />
          <rect x="1340" y="596" width="60" height="134" fill="var(--world-kingdom)" opacity="0.5" />
          <rect x="1424" y="644" width="66" height="86" fill="var(--world-city)" opacity="0.6" />
        </g>
      );
    case "region-mathematics":
      return (
        <g>
          <path
            d="M96 600 C 220 546, 400 542, 552 588 C 596 690, 566 800, 452 878 C 310 916, 168 890, 96 806 C 62 730, 64 660, 96 600 Z"
            fill="var(--world-desert)"
          />
          {dunes.map((d, index) => (
            <path
              key={d}
              d={d}
              stroke="var(--world-desert-deep)"
              strokeWidth={20 - index * 3}
              fill="none"
              opacity="0.55"
              strokeLinecap="round"
            />
          ))}
        </g>
      );
    case "region-science":
      return (
        <g>
          <path
            d="M600 800 C 800 762, 1040 762, 1236 796 C 1250 900, 1200 968, 1100 976 L 700 980 C 620 950, 592 872, 600 800 Z"
            fill="var(--world-ocean)"
            opacity="0.8"
          />
        </g>
      );
    default:
      return null;
  }
}

export function OverworldInk({ prefix }: { prefix: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Landmass silhouette and coast */}
      <path
        d="M70 210 C 120 96, 320 60, 560 78 C 760 40, 1040 52, 1240 104 C 1450 130, 1560 220, 1552 380
           C 1584 500, 1566 640, 1512 760 C 1420 820, 1300 836, 1210 800
           C 1040 750, 820 748, 640 792 C 470 840, 300 924, 176 872
           C 78 812, 44 660, 70 520 C 46 400, 44 290, 70 210 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="4.5"
      />
      <path
        d="M70 210 C 120 96, 320 60, 560 78 C 760 40, 1040 52, 1240 104 C 1450 130, 1560 220, 1552 380
           C 1584 500, 1566 640, 1512 760 C 1420 820, 1300 836, 1210 800
           C 1040 750, 820 748, 640 792 C 470 840, 300 924, 176 872
           C 78 812, 44 660, 70 520 C 46 400, 44 290, 70 210 Z"
        fill={`url(#${prefix}-grain)`}
        opacity="0.7"
      />

      {/* Ocean / south coast — Science */}
      <path
        d="M604 806 C 800 768, 1040 768, 1240 802"
        stroke={INK}
        strokeWidth="4"
      />
      {[850, 890, 930].map((y, index) => (
        <g key={y} className="drift-slow" style={{ animationDelay: `${index * 900}ms` }}>
          <path
            d={`M${660 + index * 26} ${y} q 26 -14 52 0 q 26 14 52 0 q 26 -14 52 0 q 26 14 52 0 q 26 -14 52 0`}
            stroke={INK_SOFT}
            strokeWidth="3"
          />
        </g>
      ))}
      <path d="M1090 812 q 44 -34 92 -6 q -32 40 -92 6 Z" stroke={INK} strokeWidth="3" fill={PAPER_DEEP} />

      {/* Forest — Portuguese */}
      {trees.map(([x, y, s]) => (
        <Tree key={`${x}-${y}`} x={x} y={y} s={s} />
      ))}
      <path d="M120 452 q 90 26 200 10" stroke={INK_SOFT} strokeWidth="2.6" />

      {/* Mountains and kingdom — History */}
      <path
        d="M612 316 L 726 176 L 800 262 L 872 154 L 1000 316 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="4"
      />
      <path d="M726 176 l 26 34 l -22 18 l 30 26" stroke={INK_SOFT} strokeWidth="2.4" />
      <path d="M872 154 l 24 36 l -26 20 l 28 24" stroke={INK_SOFT} strokeWidth="2.4" />
      <g>
        <rect x="960" y="214" width="120" height="102" fill={PAPER_DEEP} stroke={INK} strokeWidth="4" />
        <rect x="944" y="180" width="36" height="136" fill={PAPER_DEEP} stroke={INK} strokeWidth="4" />
        <rect x="1060" y="168" width="40" height="148" fill={PAPER_DEEP} stroke={INK} strokeWidth="4" />
        <path d="M944 180 l 18 -26 l 18 26" stroke={INK} strokeWidth="3.6" />
        <path d="M1060 168 l 20 -28 l 20 28" stroke={INK} strokeWidth="3.6" />
        <path d="M986 262 q 18 -24 36 0 v 54 h -36 Z" stroke={INK} strokeWidth="3.2" />
      </g>
      <path d="M640 330 q 180 34 372 6" stroke={INK_SOFT} strokeWidth="2.6" />

      {/* Valley and river — Geography */}
      {[0, 1, 2, 3].map((index) => (
        <path
          key={index}
          d={`M${1140 + index * 14} ${300 + index * 34} C ${1260 + index * 10} ${248 + index * 30}, ${1400 - index * 8} ${268 + index * 30}, ${1520 - index * 12} ${228 + index * 34}`}
          stroke={index % 2 === 0 ? INK : INK_SOFT}
          strokeWidth={index === 0 ? 4 : 2.6}
        />
      ))}
      <path
        d="M1146 404 C 1258 352, 1358 376, 1504 320"
        stroke={INK}
        strokeWidth="5"
      />
      <path d="M1266 372 l 26 -16 m -10 30 l 26 -16" stroke={INK_SOFT} strokeWidth="2.4" />

      {/* City — English */}
      <g>
        {([
          [1216, 660, 64, 82],
          [1300, 632, 56, 110],
          [1372, 664, 70, 78],
          [1452, 640, 58, 102],
        ] as [number, number, number, number][]).map(([x, y, w, h]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width={w} height={h} fill={PAPER_DEEP} stroke={INK} strokeWidth="3.6" />
            <path d={`M${x - 8} ${y} l ${w / 2 + 8} -26 l ${w / 2 + 8} 26`} stroke={INK} strokeWidth="3.4" fill={PAPER_DEEP} />
            <rect x={x + 12} y={y + 20} width={16} height={20} stroke={INK_SOFT} strokeWidth="2.4" />
            <rect x={x + w - 28} y={y + 20} width={16} height={20} stroke={INK_SOFT} strokeWidth="2.4" />
          </g>
        ))}
        <path d="M1188 742 q 180 22 336 0" stroke={INK_SOFT} strokeWidth="2.8" />
      </g>

      {/* Dunes and ruins — Mathematics */}
      {dunes.map((d, index) => (
        <path key={d} d={d} stroke={INK} strokeWidth={index === 0 ? 4.4 : 3.6} />
      ))}
      <path
        d="M 96 764 C 190 700, 300 696, 380 748 L 380 890 L 110 892 Z"
        fill={`url(#${prefix}-hatch)`}
        opacity="0.75"
      />
      <g>
        <path
          d="M232 700 q 8 -58 56 -58 q 48 0 56 58 l -20 0 q -6 -38 -36 -38 q -30 0 -36 38 Z"
          fill={PAPER_DEEP}
          stroke={INK}
          strokeWidth="3.6"
        />
        <path d="M420 706 l 10 -44 l 16 44 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="3" />
        <path d="M452 712 l 8 -30 l 12 30 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.6" />
      </g>
      <path d="M150 838 q 40 -12 78 0 m 30 12 q 40 -12 78 0" stroke={INK_SOFT} strokeWidth="2.4" />

      {/* Trails from the Base to every region — equal weight, no implied order */}
      <g stroke={INK_SOFT} strokeWidth="3.4" strokeDasharray="2 16">
        <path d="M760 528 C 620 470, 470 420, 372 372" />
        <path d="M804 500 C 810 430, 820 380, 836 322" />
        <path d="M866 512 C 1000 470, 1120 420, 1236 384" />
        <path d="M872 566 C 1010 604, 1140 628, 1268 654" />
        <path d="M762 578 C 640 640, 510 690, 402 726" />
        <path d="M812 600 C 828 690, 862 750, 892 806" />
      </g>
    </g>
  );
}

/**
 * Base da Esperança — approximately central shared origin.
 * Deliberately NOT a campsite and deliberately NOT saturated: no flag, no
 * lantern, no prop competing with the green heart (docs/worlds/OVERWORLD.md).
 */
export function BaseDaEsperancaArt() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="812" cy="580" rx="128" ry="52" fill={PAPER_DEEP} stroke={INK} strokeWidth="3.6" />
      <path d="M742 584 q 24 -12 46 0 m 26 8 q 24 -12 46 0" stroke={INK_SOFT} strokeWidth="2.2" />
      <g>
        <rect x="754" y="512" width="86" height="60" fill={PAPER_DEEP} stroke={INK} strokeWidth="4" />
        <path d="M744 512 l 53 -38 l 53 38 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="4" />
        <rect x="784" y="538" width="26" height="34" stroke={INK} strokeWidth="3" />
        <rect x="762" y="522" width="18" height="16" stroke={INK_SOFT} strokeWidth="2.4" />
        <path d="M826 486 v -18" stroke={INK_SOFT} strokeWidth="2.6" />
      </g>
      <g transform="translate(884 552) scale(0.9)">
        <path d="M0 0 v -26" stroke={INK} strokeWidth="4" />
        <path
          d="M0 -76 C 30 -76 44 -56 40 -38 C 36 -22 16 -20 0 -20 C -16 -20 -36 -22 -40 -38 C -44 -56 -30 -76 0 -76 Z"
          fill={PAPER_DEEP}
          stroke={INK}
          strokeWidth="3.6"
        />
      </g>
      <path d="M700 596 q 60 18 130 16" stroke={INK_SOFT} strokeWidth="2.4" />
    </g>
  );
}