/**
 * CONCEPT ASSETS — physical objects of the Dunas Douradas challenge.
 * Spec: docs/ux/CHALLENGE-STAGE.md, docs/design/ART-DIRECTION.md
 *
 * Carved stone tablets resting in sand sockets, a sand-etched caption plate, a
 * wind-shell replay object and a hand-print confirmation seal. These are
 * scenery: they carry a label, never an answer, and never decide correctness.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";

const PAPER = "var(--paper)";
const INK_FAINT = "var(--ink-faint)";

/**
 * Shallow hollow in the sand that a tablet rests in. The socket is a PLACE, so
 * unlike the stone it may legitimately be keyed by position.
 */
export function SandSocketArt({ index = 0 }: { index?: number }) {
  const lip = [
    "M-46 12 q 22 -8 44 0",
    "M-38 14 q 26 -9 50 1",
    "M-44 13 q 20 -10 46 1 q -6 6 -20 6",
    "M-40 15 q 24 -11 48 0",
  ][index % 4]!;
  return (
    <g fill="none" strokeLinecap="round">
      <ellipse cx="0" cy="0" rx="52" ry="15" fill={PAPER_DEEP} stroke={INK_SOFT} strokeWidth="2.6" />
      <ellipse cx={index % 2 === 0 ? -2 : 3} cy="-3" rx="40" ry="10" stroke={INK_FAINT} strokeWidth="2" />
      <path d={lip} stroke={INK_FAINT} strokeWidth="2" />
      {/* a few grains kicked out of the hollow */}
      <g stroke="none" fill={INK_FAINT} opacity="0.7">
        <circle cx={index % 2 === 0 ? -54 : 56} cy="8" r="2" />
        <circle cx={index % 2 === 0 ? 50 : -48} cy="12" r="1.6" />
      </g>
    </g>
  );
}

/**
 * Handcrafted silhouettes. Every stone occupies the same bounding envelope and
 * the same visual mass; only the CONTOUR differs (chipped corners, uneven
 * shoulders, irregular tops), so variation never suggests a bigger or smaller
 * value (docs/design/PHASE-1B-1-VISUAL-POLISH.md, "No answer leakage").
 */
const TABLET_SHAPES = [
  // squarish slab with a chipped upper-left corner
  "M-38 8 C -42 -22, -40 -48, -30 -58 L -14 -68 C 6 -72, 26 -64, 34 -46 C 40 -28, 38 -8, 36 8 Z",
  // taller, leaning shoulder, nicked right edge
  "M-35 8 C -43 -18, -38 -52, -16 -66 C 6 -76, 30 -66, 37 -44 L 32 -30 L 38 -16 C 39 -4, 37 4, 36 8 Z",
  // broad boulder with a flat, weathered top
  "M-40 8 C -44 -20, -38 -40, -24 -52 L 6 -60 C 26 -58, 38 -40, 39 -20 C 39 -6, 37 3, 36 8 Z",
  // narrow-shouldered, with a bitten lower-right edge
  "M-36 8 C -45 -16, -41 -46, -20 -62 C 2 -74, 28 -62, 36 -40 C 40 -24, 34 -12, 39 8 L 20 4 Z",
  // rounded river-worn stone, one deep notch on top
  "M-38 8 C -44 -18, -36 -46, -14 -58 L -6 -50 L 4 -62 C 26 -58, 38 -38, 38 -16 C 38 -4, 37 3, 36 8 Z",
  // angular split stone
  "M-37 8 C -42 -20, -34 -44, -22 -56 L 0 -66 L 18 -56 C 32 -46, 40 -26, 37 -6 L 34 8 Z",
];

/** Surface wear. Purely decorative marks; none of them encode order or value. */
const TABLET_DETAILS = [
  "M-22 -50 q 22 -6 42 2 M-26 -14 q 28 9 54 -5",
  "M-18 -46 l 10 16 l -6 12 M18 -40 q 6 14 -2 24",
  "M-24 -20 q 26 8 50 -4 M-8 -54 l -4 12",
  "M-20 -44 q 16 -4 30 4 M6 -18 l 8 14 M-16 -6 l -6 10",
  "M-14 -52 l 8 14 M14 -48 q 8 12 2 22 M-22 -10 q 24 8 46 -4",
  "M-26 -36 q 24 -8 46 2 M-10 -8 l 6 12 M22 -26 l 8 10",
  "M-20 -30 q 18 10 40 2 M-4 -52 l 6 12 M-26 -4 q 16 6 32 0",
];

/** Pecked chisel marks, distributed differently per detail variant. */
const PECKS: [number, number][][] = [
  [[-24, -34], [22, -20]],
  [[18, -52], [-20, -8]],
  [[-28, -40], [26, -36], [0, 0]],
  [[24, -48], [-22, -22]],
  [[-26, -18], [20, -8]],
  [[10, -58], [-30, -12]],
  [[-16, -60], [28, -14]],
];

/**
 * A carved stone tablet. `label` is the neutral option label supplied by item
 * data; the stone itself encodes nothing.
 *
 * `shape`, `detail` and `tilt` are STABLE per option, resolved by the template
 * through `@/visual/puzzle/stoneIdentity`. They must never be derived from the
 * stone's current position, its label or the accepted answer.
 */
export function OrderStoneArt({
  label,
  shape: shapeIndex = 0,
  detail: detailIndex = 0,
  tilt = 0,
  selected = false,
}: {
  label: string;
  shape?: number;
  detail?: number;
  tilt?: number;
  selected?: boolean;
}) {
  const shape = TABLET_SHAPES[shapeIndex % TABLET_SHAPES.length]!;
  const detail = TABLET_DETAILS[detailIndex % TABLET_DETAILS.length]!;
  const pecks = PECKS[detailIndex % PECKS.length]!;

  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* the stone leans as it settled in the sand; the label stays upright */}
      <g transform={`rotate(${tilt} 0 8)`}>
        <path d={shape} fill={PAPER_DEEP} stroke={INK} strokeWidth={selected ? 5 : 4} />
        {/* lit face, offset so the two contours read as hand-drawn */}
        <path d={shape} fill={PAPER} opacity="0.32" transform="translate(-3 -4) scale(0.9)" />
        {/* cracks and edge wear */}
        <path d={detail} stroke={INK_FAINT} strokeWidth="2" />
        <g stroke="none" fill={INK_FAINT} opacity="0.75">
          {pecks.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />
          ))}
        </g>
        {/* ground contact: a little sand banked against the base */}
        <path d="M-40 6 q 20 6 40 2 q 18 -4 36 0" stroke={INK_SOFT} strokeWidth="2.2" />
      </g>

      <text
        x="0"
        y="-22"
        textAnchor="middle"
        fontSize="42"
        fontWeight="700"
        fill={INK}
        stroke="none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {label}
      </text>
      {selected ? (
        <ellipse cx="0" cy="14" rx="46" ry="12" stroke="var(--hope)" strokeWidth="3.4" strokeDasharray="4 8" />
      ) : null}
    </g>
  );
}

/** Wind shell: the diegetic "hear it again" object. */
export function ReplayShellArt({ calling = false }: { calling?: boolean }) {
  return (
    <g className={calling ? "replay-call" : undefined} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="0" cy="30" rx="34" ry="8" fill={PAPER_DEEP} stroke={INK_FAINT} strokeWidth="2" />
      <path
        d="M-30 24 C -40 -6, -20 -34, 6 -34 C 30 -34, 40 -10, 30 22 C 12 30, -12 30, -30 24 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="3.6"
      />
      <path d="M-14 22 C -18 -2, -8 -22, 6 -22 M0 24 C -4 0, 4 -14, 16 -14" stroke={INK_SOFT} strokeWidth="2.6" />
      <path d="M36 -18 q 12 12 0 26 M48 -28 q 20 20 0 44" stroke={INK_SOFT} strokeWidth="3" />
    </g>
  );
}

/** Carved hand-print seal used as the diegetic confirmation object. */
export function ConfirmSealArt({ ready = false }: { ready?: boolean }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="0" r="44" fill={PAPER_DEEP} stroke={ready ? INK : INK_FAINT} strokeWidth={ready ? 4.4 : 3} />
      <circle cx="0" cy="0" r="34" stroke={ready ? INK_SOFT : INK_FAINT} strokeWidth="2.4" strokeDasharray="5 7" />
      <path
        d="M-13 16 C -20 4, -18 -10, -8 -12 L -8 -22 q 5 -4 8 0 v 8 q 5 -5 9 0 v 8 q 6 -3 8 3 c 3 10 -2 22 -12 24 q -12 2 -18 -5 Z"
        fill={ready ? "var(--hope)" : PAPER_DEEP}
        stroke={ready ? "var(--hope-deep)" : INK_SOFT}
        strokeWidth="2.8"
      />
    </g>
  );
}

/** Sand-etched plate the caption is written on. */
export function CaptionPlateArt() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M10 6 C 60 -8, 300 -10, 350 4 C 362 26, 360 62, 348 82 C 292 96, 60 96, 12 82 C -2 60, -2 26, 10 6 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="3.2"
      />
      <path d="M22 16 C 70 6, 292 4, 338 16" stroke={INK_FAINT} strokeWidth="2" />
    </g>
  );
}