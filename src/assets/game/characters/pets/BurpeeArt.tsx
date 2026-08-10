/**
 * CONCEPT ASSET — Burpee (original artwork for this project).
 * Spec: docs/narrative/PET-COMPANIONS.md, docs/design/CHARACTER-ART.md
 *
 * Blue-merle Border Collie with blue eyes: long muzzle, folded-tipped prick
 * ears, ruff, feathered tail, merle patching. Authored as transform groups so
 * the five Phase 1B companion states are pose + expression swaps.
 *
 * The companion NEVER owns the instructional sentence, never evaluates and is
 * never bound to a subject or skill. It renders the state it is given.
 *
 * Drawn in a box roughly x -95..95, y -150..40, ground line at y = 34.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import type { CompanionActingState } from "@/visual/character/acting";

const PAPER = "var(--paper)";
const INK_FAINT = "var(--ink-faint)";

type Pose = {
  headRotate: number;
  headX: number;
  headY: number;
  earLeft: string;
  earRight: string;
  tail: string;
  tailClass?: string;
  bodyClass?: string;
  eyes: "open" | "squint" | "soft";
  mouth: "closed" | "smile" | "open";
  brow: number;
};

const POSES: Record<CompanionActingState, Pose> = {
  idle: {
    headRotate: 0,
    headX: 0,
    headY: 0,
    earLeft: "M-34 -104 l -14 -30 l 26 10 Z",
    earRight: "M6 -108 l 16 -28 l 6 28 Z",
    tail: "M50 -6 C 78 -6 92 -26 88 -50",
    bodyClass: "pet-breathe",
    eyes: "open",
    mouth: "closed",
    brow: 0,
  },
  speak: {
    headRotate: -5,
    headX: -4,
    headY: -3,
    earLeft: "M-34 -106 l -10 -34 l 24 14 Z",
    earRight: "M6 -110 l 18 -30 l 4 30 Z",
    tail: "M50 -6 C 78 -8 94 -28 90 -54",
    bodyClass: "pet-speak",
    eyes: "open",
    mouth: "open",
    brow: -2,
  },
  watch: {
    headRotate: 7,
    headX: 5,
    headY: 1,
    earLeft: "M-34 -104 l -16 -26 l 26 8 Z",
    earRight: "M6 -108 l 20 -22 l 2 26 Z",
    tail: "M50 -6 C 74 -2 86 -20 84 -42",
    eyes: "soft",
    mouth: "closed",
    brow: -1,
  },
  "success-reaction": {
    headRotate: -8,
    headX: -2,
    headY: -6,
    earLeft: "M-34 -108 l -12 -34 l 26 14 Z",
    earRight: "M6 -112 l 18 -32 l 4 32 Z",
    tail: "M50 -10 C 80 -18 96 -44 88 -70",
    tailClass: "pet-tail-wag",
    bodyClass: "pet-hop",
    eyes: "squint",
    mouth: "smile",
    brow: -4,
  },
  "retry-reaction": {
    headRotate: 14,
    headX: 6,
    headY: 2,
    earLeft: "M-34 -102 l -20 -20 l 28 4 Z",
    earRight: "M6 -106 l 22 -14 l -2 22 Z",
    tail: "M50 -6 C 72 0 82 -14 80 -34",
    eyes: "soft",
    mouth: "closed",
    brow: 2,
  },
};

function Eyes({ kind, blink }: { kind: Pose["eyes"]; blink: boolean }) {
  if (kind === "squint") {
    return <path d="M-30 -88 q 7 -8 14 0 M-2 -90 q 7 -8 14 0" stroke={INK} strokeWidth="2.8" fill="none" />;
  }
  const ry = kind === "soft" ? 5 : 6;
  return (
    <g className={blink ? "pet-blink" : undefined}>
      <ellipse cx="-23" cy="-88" rx="6" ry={ry} fill="oklch(0.72 0.11 235)" stroke={INK} strokeWidth="2.4" />
      <ellipse cx="5" cy="-90" rx="6" ry={ry} fill="oklch(0.72 0.11 235)" stroke={INK} strokeWidth="2.4" />
      <circle cx="-22" cy="-89" r="2.4" fill={INK} />
      <circle cx="6" cy="-91" r="2.4" fill={INK} />
      <circle cx="-20.4" cy="-91" r="1.2" fill={PAPER} />
      <circle cx="7.6" cy="-93" r="1.2" fill={PAPER} />
    </g>
  );
}

function Mouth({ kind }: { kind: Pose["mouth"] }) {
  if (kind === "open") {
    return (
      <g>
        <path d="M-40 -62 q 14 22 30 6 q -12 -6 -30 -6 Z" fill={INK_SOFT} stroke={INK} strokeWidth="2.6" />
        <path d="M-34 -56 q 8 8 16 2" stroke={PAPER} strokeWidth="2" fill="none" />
      </g>
    );
  }
  if (kind === "smile") {
    return <path d="M-42 -64 q 12 14 26 2" stroke={INK} strokeWidth="2.8" fill="none" />;
  }
  return <path d="M-42 -64 q 12 8 24 0" stroke={INK} strokeWidth="2.6" fill="none" />;
}

export function BurpeeArt({
  state = "idle",
  animated = true,
}: {
  state?: CompanionActingState;
  animated?: boolean;
}) {
  const pose = POSES[state];

  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* ground contact shadow */}
      <ellipse cx="6" cy="34" rx="60" ry="11" fill={PAPER_DEEP} stroke={INK_FAINT} strokeWidth="2" />

      <g
        className={animated ? pose.bodyClass : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
      >
        {/* tail, feathered */}
        <g
          className={animated ? pose.tailClass : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "left bottom" }}
        >
          <path d={pose.tail} stroke={INK} strokeWidth="9" style={{ transition: "d 300ms var(--ease-settle)" }} />
          <path d={pose.tail} stroke={PAPER_DEEP} strokeWidth="5" />
        </g>

        {/* seated body */}
        <path
          d="M-46 30 C -58 4, -54 -34, -34 -54 C -14 -74, 24 -70, 40 -44 C 54 -20, 56 8, 48 30 Z"
          fill={PAPER_DEEP}
          stroke={INK}
          strokeWidth="3.8"
        />
        {/* merle patching — value, not colour */}
        <path d="M-30 -30 q 16 -14 30 -2 q -6 20 -26 16 q -8 -6 -4 -14 Z" fill={INK_FAINT} opacity="0.5" stroke="none" />
        <path d="M22 -18 q 16 6 18 24 q -14 8 -24 -6 q -4 -12 6 -18 Z" fill={INK_FAINT} opacity="0.35" stroke="none" />
        <path d="M-40 6 q 12 -4 18 6 q -10 10 -20 4 Z" fill={INK_FAINT} opacity="0.3" stroke="none" />

        {/* front legs and paws */}
        <path d="M-24 30 C -26 8, -18 -6, -6 -8 C 2 4, 2 20, 0 30" stroke={INK} strokeWidth="3.4" fill={PAPER} />
        <path d="M-30 30 q 12 6 24 0 M2 30 q 12 6 24 0" stroke={INK} strokeWidth="3.4" fill={PAPER_DEEP} />
        <path d="M-24 26 v 4 M-16 26 v 4 M10 26 v 4 M18 26 v 4" stroke={INK_SOFT} strokeWidth="2" />

        {/* white collie ruff */}
        <path d="M-44 -44 C -26 -28, 6 -26, 26 -42 C 20 -18, -18 -14, -44 -44 Z" fill={PAPER} stroke={INK} strokeWidth="3.2" />

        {/* head group */}
        <g
          transform={`translate(${pose.headX} ${pose.headY}) rotate(${pose.headRotate} -14 -80)`}
          style={{ transition: "transform 300ms var(--ease-settle)" }}
        >
          <path d={pose.earLeft} fill={PAPER_DEEP} stroke={INK} strokeWidth="3.2" style={{ transition: "d 300ms var(--ease-settle)" }} />
          <path d={pose.earRight} fill={PAPER_DEEP} stroke={INK} strokeWidth="3.2" style={{ transition: "d 300ms var(--ease-settle)" }} />
          <path
            d="M-52 -80 C -54 -108, -34 -124, -10 -124 C 14 -124, 30 -108, 28 -80 C 26 -58, 8 -46, -12 -46 C -32 -46, -50 -58, -52 -80 Z"
            fill={PAPER_DEEP}
            stroke={INK}
            strokeWidth="3.8"
          />
          {/* blaze */}
          <path d="M-16 -122 C -6 -122, -2 -104, -6 -74 q -10 6 -18 0 C -28 -104, -26 -122, -16 -122 Z" fill={PAPER} stroke={INK_SOFT} strokeWidth="2.4" />
          {/* merle patch over one eye */}
          <path d="M-2 -104 q 22 -6 28 12 q -8 16 -26 10 q -8 -12 -2 -22 Z" fill={INK_FAINT} opacity="0.45" stroke="none" />
          {/* long muzzle */}
          <path d="M-52 -78 C -70 -74, -78 -66, -74 -56 C -68 -44, -44 -44, -30 -52 C -34 -64, -42 -72, -52 -78 Z" fill={PAPER} stroke={INK} strokeWidth="3.4" />
          <path d="M-74 -66 q -8 -2 -10 6 q 6 6 12 2 Z" fill={INK} stroke={INK} strokeWidth="2.4" />
          <path d="M-66 -52 q -4 8 2 10 M-58 -50 q -2 8 4 10" stroke={INK_FAINT} strokeWidth="1.8" />
          <Mouth kind={pose.mouth} />
          <g transform={`translate(0 ${pose.brow})`} style={{ transition: "transform 260ms var(--ease-settle)" }}>
            <path d="M-32 -99 q 8 -5 15 -1 M-3 -101 q 8 -4 15 1" stroke={INK_SOFT} strokeWidth="2.4" />
          </g>
          <Eyes kind={pose.eyes} blink={animated} />
        </g>

        {/* speech cue — reads as "he is talking" with the sound off */}
        {state === "speak" ? (
          <g className={animated ? "pet-speech-cue" : undefined} stroke={INK_SOFT} strokeWidth="3">
            <path d="M-86 -84 q -10 8 -10 20" />
            <path d="M-96 -74 q -14 10 -14 26" />
          </g>
        ) : null}
      </g>
    </g>
  );
}

export const BURPEE_BOX = { viewBox: "-120 -155 240 200" } as const;