/**
 * TECHNICAL / CONCEPT RUNTIME SCAFFOLD — Pipoca (Step 2B-M3).
 * NOT final authored production art. This is an interim, hand-authored
 * inline-SVG scaffold — the same status BurpeeArt.tsx already carries
 * ("CONCEPT ASSET") — built only so `character.pipoca.<state>` has a real,
 * identity-bearing component to resolve to, per the Step 2B-M3 build
 * authorization. Final authored Pipoca production art remains a named
 * `PRODUCTION-ASSET-GAP`; see
 * references/visual/14-pipoca-character-master/README.md and
 * docs/design/COLOR-RESTORATION.md for the still-open authored-asset and
 * restoration-treatment tracks this scaffold does not resolve.
 *
 * Spec: docs/narrative/PET-COMPANIONS.md, docs/design/CHARACTER-ART.md,
 *       references/visual/14-pipoca-character-master/README.md,
 *       references/visual/14-pipoca-character-master/PIPOCA_MASTER_APPROVED.png,
 *       references/visual/08-pipoca-identity/.
 *
 * The architectural PATTERN mirrors BurpeeArt.tsx (a POSES table keyed by
 * CompanionActingState, small Eyes/Mouth sub-components, a ground-contact
 * shadow, animated body/tail groups, a head transform group) — but every
 * identity-bearing shape below is Pipoca-specific, drawn from the approved
 * master and the real references, NOT copied-and-recolored Burpee geometry:
 *
 *  - small white Maltese-type canine, compact build, clearly smaller in
 *    scale than Burpee — the box below is deliberately a smaller footprint
 *    than BURPEE_BOX;
 *  - short, compact but clearly canine muzzle (no elongated wedge);
 *  - floppy/drop ears blended into the coat silhouette (no semi-prick fold,
 *    unlike Burpee's earNearFold sub-path — Pipoca's ears have none);
 *  - round, dark, expressive eyes (not Burpee's almond/oblique blue eyes);
 *  - small black nose centered on the compact muzzle;
 *  - dense curl/wave coat texture strokes over body, legs, head and tail —
 *    the coat carries identity through contour + internal texture + value,
 *    not through a saturated fill, matching how the approved master itself
 *    reads a white coat against a light paper background;
 *  - tail carriage follows the INDIVIDUAL identity shown in
 *    PIPOCA_MASTER_APPROVED.png, not a generic "Maltese convention": the
 *    tail is set at hip height, carried outward and slightly upward/
 *    backward as a full fluffy plume, with the tip curling into a soft
 *    rounded hook — explicitly not a flat-over-the-back carriage;
 *  - no merle/patterned patching anywhere (Pipoca is a solid white/cream
 *    coat, unlike Burpee's blue-merle) — the tail feathering technique
 *    (thick ink outline + mid paper-deep fill + wide low-opacity overlay)
 *    is reused from BurpeeArt only as a *rendering technique*, not as
 *    anatomy.
 *
 * Acting flavor: PET-COMPANIONS.md gives Pipoca an adventurous/energetic/
 * quick-to-explore personality, distinct from Burpee's calmer, strategic
 * read — poses below lean bouncier and more alert (e.g. success-reaction
 * reads as an eager upward hop, idle sits slightly more ready-to-move)
 * while using the exact same CompanionActingState five-value contract and
 * never varying identity per pose.
 *
 * The companion NEVER owns the instructional sentence, never evaluates and
 * is never bound to a subject or skill. It renders the state it is given.
 * This scaffold does NOT solve or persist restoration state — there is no
 * `restored` prop and no per-region opacity gating, matching BurpeeArt's
 * current (also region-free) scaffold exactly.
 *
 * Drawn in a box roughly x -70..70, y -100..30, ground line at y = 26 —
 * deliberately smaller than BurpeeArt's box, reflecting Pipoca's smaller
 * scale relative to Burpee.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import type { CompanionActingState } from "@/visual/character/acting";

const PAPER = "var(--paper)";
const INK_FAINT = "var(--ink-faint)";
const EYE_DARK = "oklch(0.28 0.03 40)";

type Pose = {
  /** Head group is rotated about the skull, in head-local coordinates. */
  headRotate: number;
  headX: number;
  headY: number;
  /** Floppy drop ears — no fold sub-path, unlike Burpee's semi-prick ears. */
  earNear: string;
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
    earNear:
      "M-38 -68 C -46 -62, -48 -48, -40 -40 C -34 -42, -30 -52, -32 -62 C -33 -66, -36 -68, -38 -68 Z",
    earFar: "M-22 -74 C -28 -69, -30 -58, -24 -50, -19 -52, -16 -60, -18 -69, -20 -73, -22 -74 Z",
    tail: "M28 -26 C 44 -34, 58 -32, 62 -18 C 65 -6, 58 4, 46 2 C 38 0, 36 -8, 44 -10",
    bodyClass: "pet-breathe",
    eyes: "open",
    mouth: "closed",
    brow: 0,
  },
  speak: {
    headRotate: -7,
    headX: -2,
    headY: -2,
    earNear:
      "M-38 -70 C -47 -65, -49 -50, -41 -41 C -35 -43, -31 -54, -33 -64 C -34 -68, -36 -70, -38 -70 Z",
    earFar: "M-22 -76 C -29 -71, -31 -60, -25 -51, -20 -53, -17 -62, -19 -71, -20 -75, -22 -76 Z",
    tail: "M28 -28 C 46 -37, 61 -35, 66 -20 C 69 -7, 61 5, 48 3 C 40 1, 37 -8, 46 -11",
    bodyClass: "pet-speak",
    eyes: "open",
    mouth: "open",
    brow: -2,
  },
  watch: {
    headRotate: 7,
    headX: 2,
    headY: 1,
    earNear:
      "M-38 -67 C -45 -61, -47 -47, -39 -39 C -33 -41, -29 -51, -31 -61 C -32 -65, -35 -67, -38 -67 Z",
    earFar: "M-22 -73 C -27 -68, -29 -57, -23 -49, -18 -51, -15 -59, -17 -68, -19 -72, -22 -73 Z",
    tail: "M28 -25 C 42 -32, 54 -29, 58 -16 C 61 -5, 54 4, 44 2 C 37 0, 35 -7, 42 -9",
    eyes: "soft",
    mouth: "closed",
    brow: -1,
  },
  "success-reaction": {
    headRotate: -11,
    headX: -2,
    headY: -7,
    earNear:
      "M-38 -71 C -48 -67, -50 -51, -41 -41 C -35 -43, -31 -55, -33 -66 C -34 -70, -36 -71, -38 -71 Z",
    earFar: "M-22 -78 C -30 -73, -32 -61, -25 -51, -20 -53, -17 -63, -19 -73, -20 -77, -22 -78 Z",
    tail: "M28 -30 C 48 -42, 66 -38, 72 -20 C 75 -6, 65 6, 50 4 C 40 2, 38 -8, 48 -12",
    tailClass: "pet-tail-wag",
    bodyClass: "pet-hop",
    eyes: "squint",
    mouth: "smile",
    brow: -4,
  },
  "retry-reaction": {
    headRotate: 14,
    headX: 3,
    headY: 2,
    earNear:
      "M-38 -65 C -44 -60, -46 -47, -38 -39 C -33 -41, -29 -50, -31 -59 C -32 -63, -35 -65, -38 -65 Z",
    earFar: "M-22 -71 C -26 -66, -28 -56, -22 -49, -18 -50, -15 -58, -17 -66, -19 -70, -22 -71 Z",
    tail: "M28 -24 C 40 -30, 50 -27, 54 -15, 56 -5, 50 3, 42 1",
    eyes: "soft",
    mouth: "closed",
    brow: 2,
  },
};

function Eyes({ kind, blink }: { kind: Pose["eyes"]; blink: boolean }) {
  if (kind === "squint") {
    return (
      <path
        d="M-42 -74 q 6 -6 11 0 M-29 -74 q 6 -6 11 0"
        stroke={INK}
        strokeWidth="2.6"
        fill="none"
      />
    );
  }
  const r = kind === "soft" ? 4.2 : 5;
  return (
    <g className={blink ? "pet-blink" : undefined}>
      {/* round, dark, expressive eyes — not Burpee's almond/oblique set */}
      <circle cx="-37" cy="-74" r={r} fill={EYE_DARK} stroke={INK} strokeWidth="2" />
      <circle cx="-24" cy="-74" r={r} fill={EYE_DARK} stroke={INK} strokeWidth="2" />
      <circle cx="-38.5" cy="-76" r="1.3" fill={PAPER} />
      <circle cx="-25.5" cy="-76" r="1.3" fill={PAPER} />
    </g>
  );
}

function Mouth({ kind }: { kind: Pose["mouth"] }) {
  if (kind === "open") {
    return (
      <g>
        <path
          d="M-38 -52 C -34 -44, -24 -43, -19 -49 C -26 -50, -33 -51, -38 -52 Z"
          fill={INK_SOFT}
          stroke={INK}
          strokeWidth="2.2"
        />
        <path d="M-32 -47 q 5 5 10 0 q -5 3 -10 0 Z" fill={PAPER} stroke="none" />
      </g>
    );
  }
  if (kind === "smile") {
    return (
      <path d="M-38 -52 C -32 -45, -24 -45, -20 -50" stroke={INK} strokeWidth="2.4" fill="none" />
    );
  }
  return (
    <path d="M-38 -52 C -33 -47, -25 -47, -21 -50" stroke={INK} strokeWidth="2.2" fill="none" />
  );
}

export function PipocaArt({
  state = "idle",
  animated = true,
}: {
  state?: CompanionActingState;
  animated?: boolean;
}) {
  const pose = POSES[state];

  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* ground contact shadow — smaller than Burpee's, matching Pipoca's compact scale */}
      <ellipse
        cx="6"
        cy="26"
        rx="48"
        ry="7"
        fill={PAPER_DEEP}
        stroke={INK_FAINT}
        strokeWidth="1.8"
      />

      <g
        className={animated ? pose.bodyClass : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
      >
        {/* ---- far-side legs, short and stubby, drawn first (behind body) ---- */}
        <path d="M-6 -8 C -8 2, -8 12, -6 22" stroke={INK_SOFT} strokeWidth="6" fill="none" />
        <path d="M22 -10 C 25 -1, 22 6, 24 22" stroke={INK_SOFT} strokeWidth="6" fill="none" />

        {/* ---- feathered tail: hip-height origin, outward/upward plume, hook tip ---- */}
        <g
          className={animated ? pose.tailClass : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "left top" }}
        >
          <path
            d={pose.tail}
            stroke={INK}
            strokeWidth="9"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />
          <path d={pose.tail} stroke={PAPER_DEEP} strokeWidth="5" />
          <path d={pose.tail} stroke={INK_FAINT} strokeWidth="14" opacity="0.35" />
          {/* curl texture on the plume */}
          <path
            d="M34 -30 q 4 -3 7 0 M42 -34 q 4 -3 7 0 M50 -34 q 4 -2 7 1"
            stroke={INK_FAINT}
            strokeWidth="1.6"
            opacity="0.7"
          />
        </g>

        {/* ---- compact, rounded body — small Maltese-type build, not Burpee's athletic chest ---- */}
        <path
          d="M-24 -42
             C -20 -54, -4 -58, 12 -53
             C 26 -49, 32 -39, 30 -27
             C 28 -15, 18 -8, 4 -8
             C -10 -8, -20 -13, -25 -23
             C -29 -32, -28 -37, -24 -42 Z"
          fill={PAPER_DEEP}
          stroke={INK}
          strokeWidth="3.4"
        />
        {/* chest fluff */}
        <path
          d="M-24 -42 C -34 -36, -36 -22, -28 -12 C -22 -5, -12 -7, -9 -14"
          stroke={INK}
          strokeWidth="3"
          fill={PAPER_DEEP}
        />

        {/* ---- dense curl/wave coat texture over the body ---- */}
        <g stroke={INK_FAINT} strokeWidth="1.6" opacity="0.75">
          <path d="M-16 -40 q 4 -4 8 0 M-6 -46 q 4 -4 8 0 M6 -44 q 4 -4 8 0" />
          <path d="M-14 -28 q 4 -4 8 0 M-2 -32 q 4 -4 8 0 M10 -30 q 4 -4 8 0" />
          <path d="M-8 -16 q 4 -4 8 0 M4 -18 q 4 -4 8 0 M16 -22 q 4 -4 8 0" />
        </g>

        {/* ---- hind leg, short ---- */}
        <path
          d="M22 -22 C 30 -16, 28 -4, 22 0 C 18 2, 19 12, 19 22"
          stroke={INK}
          strokeWidth="3.6"
          fill="none"
        />
        <path d="M12 22 q 12 4 20 0" stroke={INK} strokeWidth="3.2" fill={PAPER_DEEP} />
        <path d="M26 -18 q 8 6 6 16" stroke={INK_FAINT} strokeWidth="2.4" fill="none" />

        {/* ---- near foreleg, short and straight ---- */}
        <path d="M-16 -12 C -17 2, -17 14, -16 22" stroke={INK} strokeWidth="3.8" fill="none" />
        <path d="M-24 22 q 12 4 20 0" stroke={INK} strokeWidth="3.2" fill={PAPER_DEEP} />
        <path
          d="M-20 19 v 3 M-14 19 v 3 M22 19 v 3 M28 19 v 3"
          stroke={INK_SOFT}
          strokeWidth="1.6"
        />
        {/* leg curl texture */}
        <path
          d="M-22 -6 q 3 -3 6 0 M-14 0 q 3 -3 6 0"
          stroke={INK_FAINT}
          strokeWidth="1.4"
          opacity="0.7"
        />

        {/* ---- head group ---- */}
        <g
          transform={`translate(${pose.headX} ${pose.headY}) rotate(${pose.headRotate} -30 -62)`}
          style={{ transition: "transform 300ms var(--ease-settle)" }}
        >
          {/* far ear, behind the skull */}
          <path
            d={pose.earFar}
            fill={INK_FAINT}
            stroke={INK}
            strokeWidth="2.6"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />

          {/* skull: small, rounded braincase */}
          <path
            d="M-30 -70
               C -32 -84, -22 -94, -8 -92
               C 2 -90, 6 -80, 2 -70
               C -2 -62, -14 -58, -24 -62
               C -28 -64, -30 -67, -30 -70 Z"
            fill={PAPER_DEEP}
            stroke={INK}
            strokeWidth="3.4"
          />

          {/* short, compact muzzle — the primary species-differentiator from Burpee's wedge muzzle */}
          <path
            d="M-30 -70
               C -40 -70, -48 -64, -48 -57
               C -48 -51, -42 -47, -35 -48
               C -29 -49, -26 -55, -27 -62
               C -28 -66, -29 -68, -30 -70 Z"
            fill={PAPER}
            stroke={INK}
            strokeWidth="3"
          />

          {/* small black nose, centered on the compact muzzle */}
          <path
            d="M-46 -60 C -50 -60, -52 -56, -50 -53 C -48 -50, -44 -51, -43 -54 C -43 -57, -44 -59, -46 -60 Z"
            fill={INK}
            stroke={INK}
            strokeWidth="1.6"
          />

          {/* curl texture on the head/coat framing the face */}
          <path
            d="M-8 -90 q 4 -4 8 0 M0 -84 q 4 -4 8 0 M-30 -84 q -4 -4 -8 0 M-34 -76 q -4 -3 -7 1"
            stroke={INK_FAINT}
            strokeWidth="1.5"
            opacity="0.75"
          />

          <Mouth kind={pose.mouth} />
          <g
            transform={`translate(0 ${pose.brow})`}
            style={{ transition: "transform 260ms var(--ease-settle)" }}
          >
            <path
              d="M-42 -80 q 6 -4 11 -1 M-29 -80 q 6 -4 11 0"
              stroke={INK_SOFT}
              strokeWidth="2"
            />
          </g>
          <Eyes kind={pose.eyes} blink={animated} />

          {/* near ear, floppy/drop — no fold sub-path, blended into the coat */}
          <path
            d={pose.earNear}
            fill={PAPER_DEEP}
            stroke={INK}
            strokeWidth="2.8"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />
        </g>

        {/* speech cue — reads as "she is talking" with the sound off */}
        {state === "speak" ? (
          <g
            className={animated ? "pet-speech-cue" : undefined}
            stroke={INK_SOFT}
            strokeWidth="2.6"
          >
            <path d="M-56 -76 q -7 7 -7 15" />
            <path d="M-63 -86 q -10 8 -10 20" />
          </g>
        ) : null}
      </g>
    </g>
  );
}

export const PIPOCA_BOX = { viewBox: "-90 -110 170 140" } as const;
