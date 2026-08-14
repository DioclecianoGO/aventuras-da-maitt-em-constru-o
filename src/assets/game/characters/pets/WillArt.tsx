/**
 * TECHNICAL / CONCEPT RUNTIME SCAFFOLD — Will (Step 2B-M4).
 * NOT final authored production art. This is an interim, hand-authored
 * inline-SVG scaffold — the same status BurpeeArt.tsx and PipocaArt.tsx
 * already carry ("CONCEPT ASSET" / "TECHNICAL / CONCEPT RUNTIME SCAFFOLD") —
 * built only so `character.will.<state>` has a real, identity-bearing
 * component to resolve to, per the Step 2B-M4 build authorization. Final
 * authored Will production art remains a named `PRODUCTION-ASSET-GAP`; see
 * references/visual/15-will-character-master/README.md.
 *
 * Spec: docs/narrative/PET-COMPANIONS.md, docs/design/CHARACTER-ART.md,
 *       references/visual/15-will-character-master/README.md,
 *       references/visual/15-will-character-master/WILL_MASTER_APPROVED.png.
 *
 * The architectural PATTERN mirrors BurpeeArt.tsx/PipocaArt.tsx (a POSES
 * table keyed by CompanionActingState, small Eyes/Mouth sub-components, a
 * ground-contact shadow, animated body/tail groups, a head transform group,
 * the same 3-layer ink/paper-deep/faint stroke technique used for feathering
 * — reused here as a rendering TECHNIQUE only) — but every identity-bearing
 * shape below is Will-specific, drawn from the approved master and its
 * README, NOT copied-and-recolored Burpee or Pipoca geometry:
 *
 *  - clearly FELINE anatomy and silhouette — a leaner torso, longer tail
 *    relative to body, and a triangular wedge head, structurally distinct
 *    from both Burpee's and Pipoca's canine builds;
 *  - medium-to-large adult-cat proportions — a box between Pipoca's small-
 *    dog footprint and Burpee's larger athletic-dog footprint, but neither;
 *  - large, upright, triangular ears with a visible pink interior — not
 *    Burpee's semi-prick folded-tip ears, not Pipoca's floppy drop ears;
 *  - almond-shaped green eyes with a vertical pupil — not Burpee's almond
 *    blue eyes, not Pipoca's round dark eyes;
 *  - a small pink nose (not black — an explicit Will identity trait);
 *  - long whisker strokes from the muzzle — a trait neither Burpee nor
 *    Pipoca's scaffold has at all;
 *  - visible orange tabby striping (a forehead "M" mark, cheek stripes,
 *    body/tail ring stripes) over a warm orange base — an identity-bearing
 *    pattern, not decoration, distinct from Burpee's blue-merle patching and
 *    from Pipoca's solid white coat;
 *  - a white chest/bib patch and white paws, painted as a distinct light
 *    shape over the orange base — analogous in role to Burpee's white
 *    ruff/blaze but Will-specific in placement and shape;
 *  - a long, tabby-ringed tail carried curled around the body at rest and
 *    raised with a soft curled tip when alert/playful — distinct from both
 *    Burpee's low feathered tail and Pipoca's outward-plume tail;
 *  - curious / investigative / playful / slightly mischievous acting flavor
 *    per PET-COMPANIONS.md — poses lean toward alert head-tilts and a
 *    slightly knowing expression, distinct from Burpee's calm-strategic read
 *    and Pipoca's bouncy-adventurous read.
 *
 * The companion NEVER owns the instructional sentence, never evaluates and
 * is never bound to a subject or skill. It renders the state it is given.
 * This scaffold does NOT solve or persist restoration state — there is no
 * `restored` prop and no per-region opacity gating, matching Burpee's and
 * Pipoca's current (also region-free) scaffolds exactly.
 *
 * Drawn in a box roughly x -100..100, y -125..35, ground line at y = 30.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import type { CompanionActingState } from "@/visual/character/acting";

const PAPER = "var(--paper)";
const INK_FAINT = "var(--ink-faint)";
const EYE_GREEN = "oklch(0.74 0.16 135)";
const NOSE_PINK = "oklch(0.75 0.09 15)";
const COAT_ORANGE = "oklch(0.72 0.14 55)";

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
    headRotate: -6,
    headX: -2,
    headY: -2,
    earNearTip: "-32 -108",
    earFarTip: "6 -112",
    tail: "M30 -14 C 44 -28, 54 -44, 48 -60 C 45 -68, 38 -71, 33 -66 C 30 -63, 31 -58, 36 -56",
    bodyClass: "pet-speak",
    eyes: "open",
    mouth: "open",
    brow: -2,
  },
  watch: {
    headRotate: 8,
    headX: 3,
    headY: 1,
    earNearTip: "-28 -102",
    earFarTip: "3 -106",
    tail: "M30 -14 C 46 -8, 56 4, 50 18 C 46 26, 34 28, 24 22",
    tailClass: "pet-tail-wag",
    eyes: "soft",
    mouth: "closed",
    brow: -1,
  },
  "success-reaction": {
    headRotate: -10,
    headX: -2,
    headY: -6,
    earNearTip: "-34 -110",
    earFarTip: "7 -114",
    tail: "M30 -14 C 42 -34, 56 -58, 52 -80 C 50 -90, 41 -95, 34 -89 C 30 -85, 31 -79, 37 -77",
    tailClass: "pet-tail-wag",
    bodyClass: "pet-hop",
    eyes: "squint",
    mouth: "smile",
    brow: -4,
  },
  "retry-reaction": {
    headRotate: 15,
    headX: 4,
    headY: 2,
    earNearTip: "-26 -98",
    earFarTip: "2 -102",
    tail: "M30 -14 C 44 -4, 50 10, 42 20 C 37 26, 27 26, 20 20",
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
      {/* almond-shaped green eyes with a vertical pupil — clearly feline */}
      <ellipse cx="-19" cy="-74" rx="6.4" ry={ry} fill={EYE_GREEN} stroke={INK} strokeWidth="1.8" />
      <ellipse cx="-6" cy="-75" rx="6.4" ry={ry} fill={EYE_GREEN} stroke={INK} strokeWidth="1.8" />
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

export function WillArt({
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
        {/* ---- far-side legs, slim (leaner cat build vs. dog legs) ---- */}
        <path d="M-8 -6 C -10 8, -10 20, -8 30" stroke={INK_SOFT} strokeWidth="5" fill="none" />
        <path d="M20 -8 C 24 2, 22 14, 24 30" stroke={INK_SOFT} strokeWidth="5" fill="none" />

        {/* ---- long tabby-ringed tail: curled at rest, raised when alert/playful ---- */}
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
            Tabby ring marks — drawn as a dashed stroke over the SAME
            `pose.tail` path (not a separately-authored coordinate set), so
            the marks are mathematically guaranteed to sit on the tail for
            every acting state, including states not yet imagined. This
            replaces an earlier fixed-coordinate version that only lined up
            with one pose and floated free of the tail in every other state.
          */}
          <path
            d={pose.tail}
            stroke={INK_SOFT}
            strokeWidth="2.4"
            strokeDasharray="3 9"
            strokeDashoffset="4"
            opacity="0.85"
            fill="none"
            style={{ transition: "d 300ms var(--ease-settle)" }}
          />
        </g>

        {/* ---- leaner cat torso ---- */}
        <path
          d="M-30 -35
             C -26 -50, -6 -56, 14 -50
             C 30 -45, 38 -32, 34 -16
             C 31 -3, 18 6, 2 6
             C -14 6, -26 -1, -31 -13
             C -35 -23, -34 -30, -30 -35 Z"
          fill={COAT_ORANGE}
          stroke={INK}
          strokeWidth="3.4"
        />

        {/* white chest/bib patch — identity trait, not decoration */}
        <path
          d="M-30 -35 C -40 -26, -42 -10, -34 2 C -28 9, -16 8, -12 0 C -16 -8, -22 -20, -30 -35 Z"
          fill={PAPER}
          stroke={INK}
          strokeWidth="2.6"
        />

        {/* orange tabby stripes over the back/flank */}
        <path
          d="M-4 -50 q 4 6 2 12 M8 -49 q 4 7 1 13 M18 -42 q 4 6 1 12"
          stroke={INK_SOFT}
          strokeWidth="2.2"
          opacity="0.85"
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
          {/* far ear — large, upright, triangular, pink interior */}
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

          {/* skull: triangular wedge, wide cheeks — clearly feline, not canine */}
          <path
            d="M-28 -66
               C -32 -80, -20 -92, -4 -90
               C 10 -88, 16 -76, 12 -64
               C 9 -55, -4 -50, -16 -53
               C -23 -55, -27 -60, -28 -66 Z"
            fill={COAT_ORANGE}
            stroke={INK}
            strokeWidth="3.4"
          />

          {/* tabby "M" forehead mark — identity-bearing tabby cue */}
          <path
            d="M-14 -82 q 4 -6 8 0 M-4 -84 q 4 -6 8 0"
            stroke={INK_SOFT}
            strokeWidth="2"
            opacity="0.85"
          />

          {/* short, rounded muzzle with visible whisker pads */}
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

          {/* small pink nose — an explicit, non-black identity trait */}
          <path d="M-22 -46 l -5 4 l 6 4 Z" fill={NOSE_PINK} stroke={INK} strokeWidth="1.2" />

          {/* long whiskers — a trait unique to Will among the current companions */}
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

          {/* near ear — large, upright, triangular, pink interior */}
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

        {/* speech cue — reads as "he is talking" with the sound off */}
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

export const WILL_BOX = { viewBox: "-100 -125 200 160" } as const;
