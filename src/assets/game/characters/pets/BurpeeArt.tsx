/**
 * CONCEPT ASSET — Burpee (original artwork for this project).
 * Spec: docs/narrative/PET-COMPANIONS.md, docs/design/CHARACTER-ART.md,
 *       docs/design/PHASE-1B-1-VISUAL-POLISH.md (Correction 1)
 *
 * Phase 1B.1 redraw. The previous concept read as a compact seated feline
 * silhouette. This one is built from canine anatomy so the SPECIES is carried
 * by the drawing, never by the filename, the caption or the aria-label:
 *
 *  - standing Border Collie profile with an athletic, deeper-than-wide chest;
 *  - long wedge muzzle with a defined forehead stop and the nose at the tip;
 *  - semi-prick ears with folded tips, set on the outer top of the skull;
 *  - pronounced white neck/chest ruff and rear feathering;
 *  - separated fore and hind legs, with a visible hock on the hind leg;
 *  - low-set feathered tail with canine carriage;
 *  - blue-merle patching drawn as irregular torn-edge patches plus speckle, so
 *    merle survives stolen-colour mode through value/pattern, not saturation;
 *  - white blaze and bib; blue eyes as the identity detail.
 *
 * The companion NEVER owns the instructional sentence, never evaluates and is
 * never bound to a subject or skill. It renders the state it is given.
 *
 * Drawn in a box roughly x -105..95, y -150..40, ground line at y = 34.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import type { CompanionActingState } from "@/visual/character/acting";

const PAPER = "var(--paper)";
const INK_FAINT = "var(--ink-faint)";
const EYE_BLUE = "oklch(0.72 0.11 235)";

type Pose = {
  /** Head group is rotated about the skull, in head-local coordinates. */
  headRotate: number;
  headX: number;
  headY: number;
  /** Near (viewer side) and far ear, semi-prick with a folded tip. */
  earNear: string;
  earNearFold: string;
  earFar: string;
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
    earNear: "M-44 -114 C -50 -132, -44 -145, -33 -143 C -28 -132, -31 -121, -34 -111 Z",
    earNearFold: "M-45 -138 C -40 -145, -33 -144, -31 -138",
    earFar: "M-63 -110 C -69 -126, -64 -138, -55 -137 C -51 -127, -53 -117, -55 -108 Z",
    tail: "M56 -44 C 78 -34, 90 -14, 84 8",
    bodyClass: "pet-breathe",
    eyes: "open",
    mouth: "closed",
    brow: 0,
  },
  speak: {
    headRotate: -6,
    headX: -3,
    headY: -3,
    earNear: "M-44 -116 C -51 -136, -43 -149, -32 -147 C -27 -135, -30 -123, -34 -113 Z",
    earNearFold: "M-46 -142 C -40 -150, -32 -148, -30 -142",
    earFar: "M-63 -112 C -70 -130, -64 -142, -55 -141 C -51 -130, -53 -119, -55 -110 Z",
    tail: "M56 -44 C 80 -36, 94 -14, 88 10",
    bodyClass: "pet-speak",
    eyes: "open",
    mouth: "open",
    brow: -2,
  },
  watch: {
    headRotate: 6,
    headX: 3,
    headY: 1,
    earNear: "M-44 -113 C -49 -129, -42 -141, -32 -139 C -28 -129, -31 -119, -34 -110 Z",
    earNearFold: "M-45 -134 C -39 -141, -33 -140, -31 -134",
    earFar: "M-63 -109 C -68 -123, -62 -134, -54 -133 C -50 -124, -52 -115, -55 -107 Z",
    tail: "M56 -44 C 76 -30, 86 -10, 80 10",
    eyes: "soft",
    mouth: "closed",
    brow: -1,
  },
  "success-reaction": {
    headRotate: -10,
    headX: -2,
    headY: -6,
    earNear: "M-44 -118 C -52 -139, -43 -152, -31 -150 C -26 -137, -30 -125, -34 -114 Z",
    earNearFold: "M-46 -145 C -40 -153, -31 -151, -29 -145",
    earFar: "M-63 -114 C -71 -133, -64 -146, -55 -145 C -50 -133, -53 -121, -55 -111 Z",
    tail: "M56 -48 C 84 -50, 100 -30, 96 -4",
    tailClass: "pet-tail-wag",
    bodyClass: "pet-hop",
    eyes: "squint",
    mouth: "smile",
    brow: -4,
  },
  "retry-reaction": {
    headRotate: 13,
    headX: 4,
    headY: 2,
    earNear: "M-44 -111 C -47 -125, -39 -135, -30 -132 C -27 -123, -30 -116, -34 -109 Z",
    earNearFold: "M-44 -128 C -38 -134, -32 -132, -30 -127",
    earFar: "M-63 -107 C -67 -119, -60 -129, -52 -127 C -49 -119, -51 -112, -55 -106 Z",
    tail: "M56 -42 C 74 -26, 82 -8, 76 10",
    eyes: "soft",
    mouth: "closed",
    brow: 2,
  },
};

function Eyes({ kind, blink }: { kind: Pose["eyes"]; blink: boolean }) {
  if (kind === "squint") {
    return (
      <path
        d="M-59 -99 q 7 -7 13 0 M-45 -97 q 6 -7 12 0"
        stroke={INK}
        strokeWidth="2.8"
        fill="none"
      />
    );
  }
  const ry = kind === "soft" ? 4.6 : 5.6;
  return (
    <g className={blink ? "pet-blink" : undefined}>
      {/* almond canine eyes, set obliquely on the skull */}
      <ellipse cx="-53" cy="-99" rx="5.6" ry={ry} fill={EYE_BLUE} stroke={INK} strokeWidth="2.2" />
      <ellipse cx="-38" cy="-96" rx="5.2" ry={ry} fill={EYE_BLUE} stroke={INK} strokeWidth="2.2" />
      <circle cx="-54.4" cy="-100" r="2.2" fill={INK} />
      <circle cx="-39.4" cy="-97" r="2.1" fill={INK} />
      <circle cx="-56" cy="-102" r="1.1" fill={PAPER} />
      <circle cx="-41" cy="-99" r="1.1" fill={PAPER} />
    </g>
  );
}

function Mouth({ kind }: { kind: Pose["mouth"] }) {
  if (kind === "open") {
    return (
      <g>
        <path
          d="M-92 -70 C -84 -56, -66 -54, -58 -64 C -70 -66, -82 -68, -92 -70 Z"
          fill={INK_SOFT}
          stroke={INK}
          strokeWidth="2.4"
        />
        {/* tongue */}
        <path d="M-80 -60 q 8 8 16 0 q -8 4 -16 0 Z" fill={PAPER} stroke="none" />
      </g>
    );
  }
  if (kind === "smile") {
    return <path d="M-92 -70 C -82 -58, -68 -58, -60 -66" stroke={INK} strokeWidth="2.6" fill="none" />;
  }
  return <path d="M-92 -70 C -84 -63, -70 -62, -62 -66" stroke={INK} strokeWidth="2.4" fill="none" />;
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
      <ellipse cx="4" cy="34" rx="72" ry="10" fill={PAPER_DEEP} stroke={INK_FAINT} strokeWidth="2" />

      <g
        className={animated ? pose.bodyClass : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
      >
        {/* ---- far-side legs, drawn first so they read behind the body ---- */}
        <path d="M-8 -14 C -12 4, -12 18, -10 30" stroke={INK_SOFT} strokeWidth="7" fill="none" />
        <path d="M40 -18 C 46 -2, 40 8, 44 30" stroke={INK_SOFT} strokeWidth="7" fill="none" />

        {/* ---- feathered tail, low set off the croup ---- */}
        <g
          className={animated ? pose.tailClass : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "left top" }}
        >
          <path
            d={pose.tail}
            stroke={INK}
            strokeWidth="11"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />
          <path d={pose.tail} stroke={PAPER_DEEP} strokeWidth="6" />
          {/* tail feathering */}
          <path d={pose.tail} stroke={INK_FAINT} strokeWidth="17" opacity="0.35" />
        </g>

        {/* ---- standing collie body: deep narrow chest, tucked loin, sloped croup ---- */}
        <path
          d="M-30 -58
             C -22 -74, 4 -78, 26 -72
             C 44 -68, 56 -62, 58 -46
             C 60 -30, 52 -18, 42 -14
             C 24 -8, 2 -8, -14 -14
             C -28 -20, -36 -40, -30 -58 Z"
          fill={PAPER_DEEP}
          stroke={INK}
          strokeWidth="3.8"
        />
        {/* deep chest / brisket in front of the forelegs */}
        <path
          d="M-30 -58 C -42 -50, -44 -30, -34 -16 C -26 -6, -14 -8, -10 -16"
          stroke={INK}
          strokeWidth="3.6"
          fill={PAPER_DEEP}
        />

        {/* merle patching — irregular torn-edge patches, readable as value */}
        <path
          d="M-2 -72 C 14 -76, 30 -70, 34 -58 C 26 -44, 6 -42, -6 -52 C -10 -60, -8 -68, -2 -72 Z"
          fill={INK_FAINT}
          opacity="0.55"
          stroke="none"
        />
        <path
          d="M40 -56 C 52 -54, 58 -42, 52 -28 C 44 -20, 34 -24, 34 -36 C 34 -46, 36 -52, 40 -56 Z"
          fill={INK_FAINT}
          opacity="0.4"
          stroke="none"
        />
        <path
          d="M-26 -44 C -18 -48, -12 -42, -14 -34 C -20 -28, -28 -32, -26 -44 Z"
          fill={INK_FAINT}
          opacity="0.35"
          stroke="none"
        />
        {/* merle speckle */}
        <g fill={INK_SOFT} opacity="0.55" stroke="none">
          <circle cx="12" cy="-40" r="2" />
          <circle cx="22" cy="-34" r="1.6" />
          <circle cx="30" cy="-46" r="1.5" />
          <circle cx="-16" cy="-58" r="1.7" />
          <circle cx="46" cy="-44" r="1.4" />
        </g>

        {/* ---- hind leg with a visible hock ---- */}
        <path
          d="M44 -30 C 54 -22, 52 -8, 44 -2 C 38 2, 40 14, 40 30"
          stroke={INK}
          strokeWidth="4"
          fill="none"
        />
        <path d="M32 30 q 16 5 26 0" stroke={INK} strokeWidth="3.6" fill={PAPER_DEEP} />
        {/* rear feathering on the thigh */}
        <path d="M50 -24 q 12 8 10 22" stroke={INK_FAINT} strokeWidth="3" fill="none" />

        {/* ---- near foreleg, straight under the chest ---- */}
        <path d="M-22 -18 C -24 0, -24 16, -22 28" stroke={INK} strokeWidth="4.2" fill="none" />
        <path d="M-34 30 q 16 5 26 0" stroke={INK} strokeWidth="3.6" fill={PAPER_DEEP} />
        <path d="M-30 26 v 4 M-22 26 v 4 M44 26 v 4 M52 26 v 4" stroke={INK_SOFT} strokeWidth="1.8" />

        {/* ---- white collie ruff around the neck and chest ---- */}
        <path
          d="M-46 -84
             C -34 -80, -20 -74, -14 -60
             C -10 -44, -16 -26, -28 -18
             C -40 -22, -48 -40, -48 -58
             C -48 -70, -48 -78, -46 -84 Z"
          fill={PAPER}
          stroke={INK}
          strokeWidth="3.4"
        />
        <path d="M-40 -70 q 10 12 8 28 M-32 -62 q 8 12 4 26" stroke={INK_FAINT} strokeWidth="2.2" />

        {/* ---- head group ---- */}
        <g
          transform={`translate(${pose.headX} ${pose.headY}) rotate(${pose.headRotate} -50 -92)`}
          style={{ transition: "transform 300ms var(--ease-settle)" }}
        >
          {/* far ear, behind the skull */}
          <path
            d={pose.earFar}
            fill={INK_FAINT}
            stroke={INK}
            strokeWidth="3"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />

          {/* skull: rounded braincase with a defined stop before the muzzle */}
          <path
            d="M-28 -86
               C -28 -112, -44 -126, -62 -121
               C -76 -116, -82 -102, -76 -90
               C -70 -76, -46 -68, -32 -76
               C -28 -79, -28 -82, -28 -86 Z"
            fill={PAPER_DEEP}
            stroke={INK}
            strokeWidth="3.8"
          />

          {/* long wedge muzzle from the stop, nose at the very tip */}
          <path
            d="M-74 -98
               C -88 -98, -102 -90, -103 -81
               C -104 -73, -95 -67, -84 -68
               C -74 -69, -68 -76, -68 -86
               C -68 -92, -70 -96, -74 -98 Z"
            fill={PAPER}
            stroke={INK}
            strokeWidth="3.4"
          />
          {/* the stop itself — the break between skull and muzzle */}
          <path d="M-74 -98 C -72 -92, -71 -86, -73 -80" stroke={INK_SOFT} strokeWidth="2.4" />
          {/* nose at the tip of the wedge */}
          <path
            d="M-101 -88 C -109 -88, -112 -82, -110 -77 C -107 -72, -100 -73, -98 -78 C -97 -83, -98 -86, -101 -88 Z"
            fill={INK}
            stroke={INK}
            strokeWidth="2"
          />
          <path d="M-104 -73 q -2 6 2 9" stroke={INK_SOFT} strokeWidth="1.8" />
          {/* whisker marks */}
          <path d="M-92 -76 q -3 5 1 8 M-86 -74 q -2 6 2 8" stroke={INK_FAINT} strokeWidth="1.6" />

          {/* white blaze up the centre of the face */}
          <path
            d="M-66 -118 C -58 -119, -54 -108, -56 -86 q -7 4 -12 -1 C -70 -106, -72 -117, -66 -118 Z"
            fill={PAPER}
            stroke={INK_FAINT}
            strokeWidth="2.2"
          />
          {/* merle mask patch over the far side of the face */}
          <path
            d="M-46 -114 C -30 -112, -26 -98, -32 -86 C -42 -82, -50 -90, -50 -102 C -50 -108, -48 -112, -46 -114 Z"
            fill={INK_FAINT}
            opacity="0.5"
            stroke="none"
          />
          <g fill={INK_SOFT} opacity="0.5" stroke="none">
            <circle cx="-36" cy="-106" r="1.5" />
            <circle cx="-42" cy="-96" r="1.3" />
          </g>

          <Mouth kind={pose.mouth} />
          <g transform={`translate(0 ${pose.brow})`} style={{ transition: "transform 260ms var(--ease-settle)" }}>
            <path d="M-60 -108 q 7 -5 13 -2 M-44 -105 q 7 -4 12 0" stroke={INK_SOFT} strokeWidth="2.3" />
          </g>
          <Eyes kind={pose.eyes} blink={animated} />

          {/* near ear, semi-prick with a folded tip */}
          <path
            d={pose.earNear}
            fill={PAPER_DEEP}
            stroke={INK}
            strokeWidth="3.2"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />
          <path
            d={pose.earNearFold}
            stroke={INK}
            strokeWidth="2.6"
            fill="none"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />
        </g>

        {/* speech cue — reads as "he is talking" with the sound off */}
        {state === "speak" ? (
          <g className={animated ? "pet-speech-cue" : undefined} stroke={INK_SOFT} strokeWidth="3">
            <path d="M-112 -100 q -8 8 -8 18" />
            <path d="M-120 -112 q -12 10 -12 24" />
          </g>
        ) : null}
      </g>
    </g>
  );
}

export const BURPEE_BOX = { viewBox: "-140 -160 260 205" } as const;
