/**
 * TECHNICAL / CONCEPT RUNTIME SCAFFOLD — Lyra (Step 2B-M5).
 * NOT final authored production art. This is an interim, hand-authored
 * inline-SVG scaffold — the same status BurpeeArt.tsx, PipocaArt.tsx and
 * WillArt.tsx already carry — built only so `character.lyra.<state>` has a
 * real, identity-bearing component to resolve to, per the Step 2B-M5 build
 * authorization. Final authored Lyra production art remains a named
 * `PRODUCTION-ASSET-GAP`; see
 * references/visual/16-lyra-character-master/README.md.
 *
 * Spec: docs/narrative/PET-COMPANIONS.md, docs/design/CHARACTER-ART.md,
 *       references/visual/16-lyra-character-master/README.md,
 *       references/visual/16-lyra-character-master/LYRA_MASTER_APPROVED.png.
 *
 * The architectural PATTERN mirrors WillArt.tsx (a POSES table keyed by
 * CompanionActingState, small Eyes/Mouth sub-components, a ground-contact
 * shadow, animated body/tail groups, a head transform group) — including its
 * corrected tail-decoration technique (a dashed stroke drawn over the SAME
 * `pose.tail` path data, so decoration is mathematically tied to the actual
 * per-state geometry instead of a second, independently-authored coordinate
 * set that can drift out of alignment across poses, as WillArt's original
 * tail-stripe marks once did before that bug was fixed). That is a reused
 * TECHNIQUE, not anatomy — every identity-bearing shape below is Lyra-
 * specific, drawn from the approved master and its README, not copied-and-
 * recolored Will (or any other pet) geometry:
 *
 *  - clearly feline anatomy/silhouette, medium adult-cat proportions —
 *    naturally similar in general build to Will (both adult domestic cats),
 *    which is expected and not an anatomical invention to avoid — identity
 *    differentiation comes from face/coat markings, not from artificially
 *    distinct ear/eye shapes;
 *  - ASYMMETRIC tricolor face — predominantly orange on the (viewer's) left
 *    side, a strong black area over the crown extending down across the
 *    right eye/cheek, and a white blaze running down the center of the face
 *    into the muzzle. This asymmetry is the primary Lyra-specific identity
 *    anchor and is deliberately NOT mirrored/symmetric — a generic
 *    left-right-symmetric "calico" treatment would violate the README's own
 *    explicit "do NOT simplify into a generic calico pattern" lock;
 *  - individually-distributed orange-and-black torso patches (not a
 *    repeating/symmetric pattern) over a white base, continuing the same
 *    "individual distribution, not a generic pattern" discipline to the
 *    body;
 *  - white blaze/muzzle continuing into a broad white chest/bib, and white
 *    paws;
 *  - green/olive-green eyes — grounded in the master, distinct in exact hue
 *    from Will's eyes without inventing an artificial difference;
 *  - pink nose; large upright triangular ears with pink interior;
 *  - long white whiskers;
 *  - a long tricolor tail with individually-distributed orange/black ring
 *    and patch marks (not a uniform tabby-ring convention) — carried up and
 *    curled at the tip, grounded in the approved master rather than a
 *    generic calico-tail convention;
 *  - calm / observant / detail-attentive / precise / quietly analytical
 *    acting flavor per PET-COMPANIONS.md and the README's own "Acting
 *    direction" — poses read as composed and controlled: `idle` calm
 *    attentive presence, `speak` measured/composed, `watch` focused close
 *    observation, `success-reaction` quiet satisfied approval (not
 *    exuberant), `retry-reaction` thoughtful/analytical head-tilt, never
 *    sad/punitive.
 *
 * The companion NEVER owns the instructional sentence, never evaluates and
 * is never bound to a subject or skill. It renders the state it is given.
 * This scaffold does NOT solve or persist restoration state — there is no
 * `restored` prop and no per-region opacity gating, matching the other
 * companion scaffolds' current (also region-free) state exactly.
 *
 * Drawn in a box roughly x -98..100, y -123..35, ground line at y = 30 —
 * the same general "adult cat" scale family as WILL_BOX, deliberately given
 * its own distinct numeric footprint rather than an identical copy.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import type { CompanionActingState } from "@/visual/character/acting";

const PAPER = "var(--paper)";
const INK_FAINT = "var(--ink-faint)";
const EYE_OLIVE = "oklch(0.72 0.13 125)";
const NOSE_PINK = "oklch(0.75 0.09 15)";
const COAT_ORANGE = "oklch(0.72 0.14 55)";
const COAT_BLACK = "oklch(0.28 0.02 40)";

type Pose = {
  headRotate: number;
  headX: number;
  headY: number;
  earNearTip: string;
  earFarTip: string;
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
    earNearTip: "-30 -104",
    earFarTip: "4 -108",
    tail: "M30 -14 C 46 -6, 54 10, 46 24 C 40 34, 26 34, 14 28 C 8 25, 6 20, 10 18",
    bodyClass: "pet-breathe",
    eyes: "open",
    mouth: "closed",
    brow: 0,
  },
  speak: {
    headRotate: -5,
    headX: -1,
    headY: -1,
    earNearTip: "-31 -106",
    earFarTip: "5 -110",
    tail: "M30 -14 C 44 -22, 52 -34, 48 -48 C 46 -55, 39 -58, 34 -53 C 31 -50, 32 -46, 37 -44",
    bodyClass: "pet-speak",
    eyes: "open",
    mouth: "open",
    brow: -1,
  },
  watch: {
    headRotate: 9,
    headX: 3,
    headY: 1,
    earNearTip: "-28 -102",
    earFarTip: "3 -106",
    tail: "M30 -14 C 44 -10, 52 0, 48 12 C 45 20, 35 22, 27 18",
    eyes: "soft",
    mouth: "closed",
    brow: -2,
  },
  "success-reaction": {
    headRotate: -8,
    headX: -1,
    headY: -4,
    earNearTip: "-32 -108",
    earFarTip: "6 -112",
    tail: "M30 -16 C 40 -30, 52 -48, 48 -66 C 46 -74, 38 -78, 32 -72 C 29 -68, 30 -63, 36 -61",
    tailClass: "pet-tail-wag",
    bodyClass: "pet-hop",
    eyes: "squint",
    mouth: "smile",
    brow: -3,
  },
  "retry-reaction": {
    headRotate: 13,
    headX: 4,
    headY: 2,
    earNearTip: "-26 -98",
    earFarTip: "2 -102",
    tail: "M30 -14 C 42 -6, 48 6, 41 16 C 36 22, 27 22, 21 17",
    eyes: "soft",
    mouth: "closed",
    brow: 2,
  },
};

function Eyes({ kind }: { kind: Pose["eyes"] }) {
  if (kind === "squint") {
    return (
      <path
        d="M-24 -74 q 6 -5 11 0 M-11 -74 q 6 -5 11 0"
        stroke={INK}
        strokeWidth="2.4"
        fill="none"
      />
    );
  }
  const ry = kind === "soft" ? 4.4 : 5.4;
  return (
    <g>
      {/* green/olive eyes, grounded in the approved master */}
      <ellipse cx="-19" cy="-74" rx="6.4" ry={ry} fill={EYE_OLIVE} stroke={INK} strokeWidth="1.8" />
      <ellipse cx="-6" cy="-75" rx="6.4" ry={ry} fill={EYE_OLIVE} stroke={INK} strokeWidth="1.8" />
      <ellipse cx="-19" cy="-74" rx="1.4" ry={ry * 0.75} fill={INK} />
      <ellipse cx="-6" cy="-75" rx="1.4" ry={ry * 0.75} fill={INK} />
    </g>
  );
}

function Mouth({ kind }: { kind: Pose["mouth"] }) {
  if (kind === "open") {
    return (
      <ellipse cx="-19" cy="-49" rx="4.2" ry="5.4" fill={INK_SOFT} stroke={INK} strokeWidth="2" />
    );
  }
  if (kind === "smile") {
    return (
      <path d="M-27 -52 q 4 6 8 0 M-19 -52 q 4 6 8 0" stroke={INK} strokeWidth="2.2" fill="none" />
    );
  }
  return (
    <path d="M-27 -52 q 4 4 8 0 M-19 -52 q 4 4 8 0" stroke={INK} strokeWidth="2" fill="none" />
  );
}

export function LyraArt({
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
      <ellipse
        cx="6"
        cy="30"
        rx="56"
        ry="8"
        fill={PAPER_DEEP}
        stroke={INK_FAINT}
        strokeWidth="1.8"
      />

      <g
        className={animated ? pose.bodyClass : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
      >
        {/* ---- far-side legs, slim (leaner cat build) ---- */}
        <path d="M-8 -6 C -10 8, -10 20, -8 30" stroke={INK_SOFT} strokeWidth="5" fill="none" />
        <path d="M20 -8 C 24 2, 22 14, 24 30" stroke={INK_SOFT} strokeWidth="5" fill="none" />

        {/* ---- long tricolor tail: curled at rest, raised when alert ---- */}
        <g
          className={animated ? pose.tailClass : undefined}
          style={{ transformBox: "fill-box", transformOrigin: "left top" }}
        >
          <path
            d={pose.tail}
            stroke={INK}
            strokeWidth="10"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />
          <path d={pose.tail} stroke={COAT_ORANGE} strokeWidth="6.4" />
          <path d={pose.tail} stroke={INK_FAINT} strokeWidth="14" opacity="0.3" />
          {/*
            Tricolor ring/patch marks — a dashed stroke over the SAME
            `pose.tail` path data (not a separately-authored coordinate
            set), so the marks stay attached to the tail for every acting
            state. Irregular dash lengths approximate the individually-
            distributed patch marks visible in the approved master, rather
            than a uniform tabby-ring convention.
          */}
          <path
            d={pose.tail}
            stroke={COAT_BLACK}
            strokeWidth="3"
            strokeDasharray="6 5 3 8"
            strokeDashoffset="2"
            opacity="0.9"
            fill="none"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />
        </g>

        {/* ---- leaner cat torso, white base ---- */}
        <path
          d="M-30 -35
             C -26 -50, -6 -56, 14 -50
             C 30 -45, 38 -32, 34 -16
             C 31 -3, 18 6, 2 6
             C -14 6, -26 -1, -31 -13
             C -35 -23, -34 -30, -30 -35 Z"
          fill={PAPER}
          stroke={INK}
          strokeWidth="3.4"
        />

        {/* individually-distributed orange and black body patches — not a repeating/symmetric pattern */}
        <path
          d="M-6 -48 C 2 -52, 12 -50, 14 -42 C 16 -35, 8 -30, 0 -32 C -6 -34, -9 -43, -6 -48 Z"
          fill={COAT_ORANGE}
          stroke={INK}
          strokeWidth="2.2"
        />
        <path
          d="M10 -20 C 20 -24, 30 -18, 29 -8 C 28 0, 16 3, 9 -3 C 4 -8, 5 -16, 10 -20 Z"
          fill={COAT_BLACK}
          stroke={INK}
          strokeWidth="2.2"
        />
        <path
          d="M-22 -18 C -16 -22, -8 -18, -9 -10 C -10 -3, -19 0, -25 -5 C -29 -9, -27 -15, -22 -18 Z"
          fill={COAT_ORANGE}
          stroke={INK}
          strokeWidth="2"
          opacity="0.9"
        />

        {/* ---- hind leg with white paw ---- */}
        <path
          d="M22 -20 C 32 -14, 32 0, 24 8 C 20 11, 21 20, 21 30"
          stroke={INK}
          strokeWidth="3.6"
          fill="none"
        />
        <path d="M13 28 q 11 5 19 0" stroke={INK} strokeWidth="3.2" fill={PAPER} />

        {/* ---- near foreleg with white paw ---- */}
        <path d="M-18 -10 C -19 4, -19 16, -18 30" stroke={INK} strokeWidth="3.6" fill="none" />
        <path d="M-27 28 q 11 5 19 0" stroke={INK} strokeWidth="3.2" fill={PAPER} />

        {/* ---- head group ---- */}
        <g
          transform={`translate(${pose.headX} ${pose.headY}) rotate(${pose.headRotate} -16 -66)`}
          style={{ transition: "transform 300ms var(--ease-settle)" }}
        >
          {/* far ear — orange base, pink interior */}
          <g style={{ transition: "d 300ms var(--ease-settle)" }}>
            <path
              d={`M2 -84 L ${pose.earFarTip} L 18 -88 Z`}
              fill={COAT_ORANGE}
              stroke={INK}
              strokeWidth="2.6"
            />
            <path
              d={`M5 -85 L ${pose.earFarTip
                .split(" ")
                .map((n, i) => (i === 0 ? Number(n) * 0.7 + 3 : Number(n) * 0.75 - 20))
                .join(" ")} L 13 -87 Z`}
              fill="oklch(0.82 0.06 25)"
              stroke="none"
            />
          </g>

          {/*
            Skull — asymmetric tricolor split, the primary Lyra-specific
            identity anchor. Left (near, orange) half and right (far, black)
            half meet at a white blaze running down the center, deliberately
            NOT mirrored/symmetric.
          */}
          <path
            d="M-28 -66
               C -32 -80, -20 -92, -4 -90
               C 10 -88, 16 -76, 12 -64
               C 9 -55, -4 -50, -16 -53
               C -23 -55, -27 -60, -28 -66 Z"
            fill={PAPER}
            stroke={INK}
            strokeWidth="3.4"
          />
          {/* orange half — near/left side of the face */}
          <path
            d="M-28 -66 C -32 -80, -20 -92, -4 -90 C -8 -82, -12 -70, -14 -58 C -20 -58, -25 -61, -28 -66 Z"
            fill={COAT_ORANGE}
            stroke={INK}
            strokeWidth="2.4"
          />
          {/* black patch — far/right side, crown extending over the eye/cheek */}
          <path
            d="M-4 -90 C 10 -88, 16 -76, 12 -64 C 9 -58, 2 -55, -4 -56 C -3 -68, -3 -80, -4 -90 Z"
            fill={COAT_BLACK}
            stroke={INK}
            strokeWidth="2.4"
          />

          {/* short, rounded muzzle with visible whisker pads — white, part of the central blaze */}
          <path
            d="M-16 -53
               C -24 -50, -30 -43, -27 -37
               C -25 -33, -18 -32, -12 -35
               C -7 -37, -6 -44, -9 -50
               C -11 -52, -13 -53, -16 -53 Z"
            fill={PAPER}
            stroke={INK}
            strokeWidth="2.8"
          />

          {/* small pink nose */}
          <path d="M-22 -46 l -5 4 l 6 4 Z" fill={NOSE_PINK} stroke={INK} strokeWidth="1.2" />

          {/* long white whiskers */}
          <path
            d="M-28 -44 h -15 M-29 -40 h -16 M-28 -36 h -14"
            stroke={INK_SOFT}
            strokeWidth="1.3"
            opacity="0.85"
          />

          <Mouth kind={pose.mouth} />
          <g
            transform={`translate(0 ${pose.brow})`}
            style={{ transition: "transform 260ms var(--ease-settle)" }}
          >
            <path d="M-27 -80 q 5 -3 9 0 M-13 -81 q 5 -3 9 0" stroke={INK_SOFT} strokeWidth="1.8" />
          </g>
          <Eyes kind={pose.eyes} />

          {/* near ear — orange base, pink interior */}
          <g style={{ transition: "d 300ms var(--ease-settle)" }}>
            <path
              d={`M-20 -80 L ${pose.earNearTip} L -8 -90 Z`}
              fill={COAT_ORANGE}
              stroke={INK}
              strokeWidth="2.8"
            />
            <path
              d={`M-18 -82 L ${pose.earNearTip
                .split(" ")
                .map((n, i) => (i === 0 ? Number(n) * 0.75 - 3 : Number(n) * 0.72 - 14))
                .join(" ")} L -11 -87 Z`}
              fill="oklch(0.82 0.06 25)"
              stroke="none"
            />
          </g>
        </g>

        {/* speech cue — reads as "she is talking" with the sound off */}
        {state === "speak" ? (
          <g
            className={animated ? "pet-speech-cue" : undefined}
            stroke={INK_SOFT}
            strokeWidth="2.6"
          >
            <path d="M-44 -84 q -7 7 -7 15" />
            <path d="M-52 -94 q -10 8 -10 20" />
          </g>
        ) : null}
      </g>
    </g>
  );
}

export const LYRA_BOX = { viewBox: "-98 -123 198 158" } as const;
