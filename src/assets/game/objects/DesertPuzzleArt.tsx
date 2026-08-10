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

/** Shallow hollow in the sand that a tablet rests in. */
export function SandSocketArt({ index = 0 }: { index?: number }) {
  return (
    <g fill="none" strokeLinecap="round">
      <ellipse cx="0" cy="0" rx="52" ry="15" fill={PAPER_DEEP} stroke={INK_SOFT} strokeWidth="2.6" />
      <ellipse cx="0" cy="-3" rx="40" ry="10" stroke={INK_FAINT} strokeWidth="2" />
      <path
        d={index % 2 === 0 ? "M-46 12 q 22 -8 44 0" : "M-38 14 q 26 -9 50 1"}
        stroke={INK_FAINT}
        strokeWidth="2"
      />
    </g>
  );
}

const TABLET_SHAPES = [
  "M-38 6 C -44 -30, -34 -66, -2 -68 C 30 -70, 42 -34, 36 6 Z",
  "M-36 6 C -46 -26, -30 -70, 0 -70 C 32 -70, 44 -28, 34 6 Z",
  "M-40 6 C -42 -34, -26 -64, 2 -66 C 32 -68, 40 -30, 38 6 Z",
  "M-34 6 C -44 -22, -36 -68, -2 -70 C 28 -72, 44 -32, 34 6 Z",
];

/**
 * A carved stone tablet. `label` is the neutral option label supplied by item
 * data; the stone itself encodes nothing.
 */
export function OrderStoneArt({
  label,
  variant = 0,
  selected = false,
}: {
  label: string;
  variant?: number;
  selected?: boolean;
}) {
  const shape = TABLET_SHAPES[variant % TABLET_SHAPES.length]!;
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={shape} fill={PAPER_DEEP} stroke={INK} strokeWidth={selected ? 5 : 4} />
      <path d={shape} fill={PAPER} opacity="0.35" transform="translate(-3 -4) scale(0.92)" />
      <path d="M-24 -52 q 24 -8 46 2" stroke={INK_FAINT} strokeWidth="2" />
      <path d="M-28 -12 q 30 10 58 -4" stroke={INK_FAINT} strokeWidth="2" />
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