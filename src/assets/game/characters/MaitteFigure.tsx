/**
 * CONCEPT ASSET — Maittê (original character artwork for this project).
 * Spec: docs/narrative/MAITTE.md, docs/design/CHARACTER-ART.md
 *
 * Authored as independently addressable colour regions. The heart is
 * saturated from the opening; every other region is a separate layer whose
 * activation is decided by configuration, never by this component. No
 * restoration ORDER is encoded here.
 *
 * The figure is also authored as transform GROUPS (head, hair, torso, arms,
 * legs) plus swappable face parts, so the five Phase 1B acting states are
 * pose + expression changes rather than an animation rig. This component
 * renders a state; it never decides one.
 *
 * Drawn inside a 130 x 262 box, anchored at the feet (y = 262).
 */
import type { MaitteActingState } from "@/visual/character/acting";
import type { CharacterRegionId } from "@/visual/world-config/types";

const INK = "var(--ink)";
const INK_SOFT = "var(--ink-soft)";
const INK_FAINT = "var(--ink-faint)";
const PAPER = "var(--paper)";

export type MaitteFigureProps = {
  /** Regions currently restored. Always contains the heart. */
  restored: ReadonlySet<CharacterRegionId> | CharacterRegionId[];
  /** Acting state. Presentation only. */
  state?: MaitteActingState;
  /** Idle breathing / blink. Disabled for SSR and reduced motion. */
  animated?: boolean;
  title?: string;
};

type Pose = {
  headRotate: number;
  headShift: number;
  bodyClass?: string;
  eyes: "open" | "happy" | "thinking";
  mouth: "soft" | "smile" | "open" | "think";
  browLift: number;
  armLeft: string;
  armRight: string;
  lookAt: number;
};

const POSES: Record<MaitteActingState, Pose> = {
  "idle-curious": {
    headRotate: -2,
    headShift: 0,
    bodyClass: "maitte-breathe",
    eyes: "open",
    mouth: "soft",
    browLift: 0,
    armLeft: "M32 126 C 20 146 16 166 20 182",
    armRight: "M90 126 C 102 146 106 166 102 182",
    lookAt: 0,
  },
  "listen-think": {
    headRotate: 9,
    headShift: 3,
    eyes: "thinking",
    mouth: "think",
    browLift: -3,
    armLeft: "M32 126 C 22 146 24 164 34 172",
    armRight: "M90 126 C 100 144 96 160 82 106",
    lookAt: 2,
  },
  success: {
    headRotate: -4,
    headShift: -2,
    bodyClass: "maitte-hop",
    eyes: "happy",
    mouth: "open",
    browLift: -4,
    armLeft: "M32 126 C 16 140 8 124 6 108",
    armRight: "M90 126 C 108 140 116 124 118 108",
    lookAt: -1,
  },
  "retry-thinking": {
    headRotate: 7,
    headShift: 2,
    eyes: "thinking",
    mouth: "think",
    browLift: -2,
    armLeft: "M32 126 C 22 148 22 168 30 180",
    armRight: "M90 126 C 98 148 94 166 84 178",
    lookAt: 3,
  },
  move: {
    headRotate: -5,
    headShift: -2,
    bodyClass: "maitte-walk",
    eyes: "open",
    mouth: "smile",
    browLift: 0,
    armLeft: "M32 126 C 18 142 14 158 22 172",
    armRight: "M90 126 C 104 142 108 160 98 174",
    lookAt: -2,
  },
};

function Eyes({ kind, blink }: { kind: Pose["eyes"]; blink: boolean }) {
  if (kind === "happy") {
    return <path d="M44 80 q 5 -7 10 0 M70 80 q 5 -7 10 0" strokeWidth="2.8" />;
  }
  if (kind === "thinking") {
    return (
      <g>
        <path d="M45 82 q 5 -6 10 0 q -5 5 -10 0 Z" fill={INK} strokeWidth="2.2" />
        <path d="M71 80 q 5 -7 10 0 q -5 6 -10 0 Z" fill={INK} strokeWidth="2.2" />
        <circle cx="52" cy="80" r="1.2" fill={PAPER} stroke="none" />
      </g>
    );
  }
  return (
    <g className={blink ? "maitte-blink" : undefined}>
      <ellipse cx="50" cy="81" rx="4.6" ry="5.4" fill={INK} stroke="none" />
      <ellipse cx="76" cy="81" rx="4.6" ry="5.4" fill={INK} stroke="none" />
      <circle cx="51.6" cy="79" r="1.5" fill={PAPER} stroke="none" />
      <circle cx="77.6" cy="79" r="1.5" fill={PAPER} stroke="none" />
    </g>
  );
}

function Mouth({ kind }: { kind: Pose["mouth"] }) {
  if (kind === "open") {
    return <path d="M57 96 q 8 12 16 0 q -8 5 -16 0 Z" fill={INK_SOFT} strokeWidth="2.4" />;
  }
  if (kind === "smile") return <path d="M56 96 q 8 8 16 0" strokeWidth="2.6" />;
  if (kind === "think") return <path d="M58 98 q 8 -4 14 1" strokeWidth="2.6" />;
  return <path d="M58 96 q 7 5 13 0" strokeWidth="2.5" />;
}

export function MaitteFigure({
  restored,
  state = "idle-curious",
  animated = true,
  title,
}: MaitteFigureProps) {
  const set = restored instanceof Set ? restored : new Set(restored);
  const on = (region: CharacterRegionId) => (set.has(region) ? 1 : 0);
  const pose = POSES[state];
  const headTransform = `rotate(${pose.headRotate} 63 96) translate(${pose.headShift + pose.lookAt} 0)`;

  return (
    <g>
      {title ? <title>{title}</title> : null}

      <g
        className={animated ? pose.bodyClass : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
      >
        {/* ---------------- colour regions (beneath the ink) ---------------- */}
        <g opacity={on("hair")}>
          <path
            d="M63 22 C 30 22 15 48 18 80 C 21 114 12 152 21 182 C 36 174 42 142 41 116
               C 58 128 88 128 104 116 C 103 144 110 174 124 182 C 132 150 122 112 125 80
               C 128 46 96 22 63 22 Z"
            fill="oklch(0.36 0.055 48)"
          />
        </g>
        <g opacity={on("hairStreak")}>
          <path
            d="M36 44 C 27 68 26 96 31 120 C 35 126 42 126 45 120 C 40 96 41 68 49 46 Z"
            fill="oklch(0.87 0.1 92)"
          />
        </g>
        <g opacity={on("shirt")}>
          <path d="M41 114 C 30 124 26 146 25 168 C 48 176 78 176 97 168 C 96 146 91 124 81 114 Z" fill="oklch(0.84 0.09 210)" />
        </g>
        <g opacity={on("skirt")}>
          <path d="M26 166 C 48 176 76 176 96 166 C 102 184 106 198 110 210 C 78 218 42 218 12 210 C 17 196 22 182 26 166 Z" fill="oklch(0.6 0.14 322)" />
        </g>
        <g opacity={on("socks")}>
          <path d="M36 210 q 10 4 18 0 v 28 q -9 4 -18 0 Z" fill="oklch(0.78 0.16 45)" />
          <path d="M70 210 q 10 4 18 0 v 28 q -9 4 -18 0 Z" fill="oklch(0.72 0.14 200)" />
        </g>
        <g opacity={on("shoes")}>
          <path d="M34 234 q 12 5 22 0 v 12 q 4 8 -6 10 H 26 q -6 -8 -1 -14 Z" fill="oklch(0.64 0.14 25)" />
          <path d="M68 234 q 12 5 22 0 v 8 q 6 6 1 14 H 66 q -8 -4 -4 -12 Z" fill="oklch(0.64 0.14 25)" />
        </g>
        <g opacity={on("glasses")}>
          <path d="M40 74 q 12 -4 22 0 q 2 16 -11 16 q -13 0 -11 -16 Z" fill="oklch(0.79 0.14 350)" />
          <path d="M66 74 q 12 -4 22 0 q 2 16 -11 16 q -13 0 -11 -16 Z" fill="oklch(0.79 0.14 350)" />
        </g>

        {/* ---------------- ink line work ---------------- */}
        <g fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          {/* hair behind the body, with wave at the tips */}
          <path
            d="M63 22 C 30 22 15 48 18 80 C 21 114 12 152 21 182 C 36 174 42 142 41 116
               M104 116 C 103 144 110 174 124 182 C 132 150 122 112 125 80 C 128 46 96 22 63 22"
            fill={PAPER}
          />
          <path
            d="M21 182 q 8 12 17 4 q -3 10 6 12 M124 182 q -8 12 -17 4 q 3 10 -6 12"
            stroke={INK_SOFT}
            strokeWidth="2.8"
          />
          <path d="M28 140 q 6 22 4 36 M118 140 q -6 22 -4 36" stroke={INK_FAINT} strokeWidth="2" />

          {/* torso, arms, skirt, legs */}
          <path d="M41 114 C 30 124 26 146 25 168 C 48 176 78 176 97 168 C 96 146 91 124 81 114 Z" />
          <path d="M43 116 q 20 12 38 -1" stroke={INK_SOFT} strokeWidth="2.4" />
          <path d={pose.armLeft} style={{ transition: "d 320ms var(--ease-settle)" }} />
          <path d={pose.armRight} style={{ transition: "d 320ms var(--ease-settle)" }} />
          <path d="M26 166 C 48 176 76 176 96 166 C 102 184 106 198 110 210 C 78 218 42 218 12 210 C 17 196 22 182 26 166 Z" />
          <path d="M44 172 l -8 38 M62 175 l -1 38 M80 172 l 8 38" stroke={INK_SOFT} strokeWidth="2.2" />
          <path d="M42 210 q 6 14 3 26 M80 210 q -5 14 -2 26" />
          {/* colourful socks — ribbed */}
          <path d="M36 214 q 10 4 18 0 M36 222 q 10 4 18 0 M70 214 q 10 4 18 0 M70 222 q 10 4 18 0" stroke={INK_SOFT} strokeWidth="2.1" />
          {/* unbranded high-top canvas sneakers */}
          <path d="M34 234 q 12 5 22 0 v 12 q 4 8 -6 10 H 26 q -6 -8 -1 -14 Z" />
          <path d="M68 234 q 12 5 22 0 v 8 q 6 6 1 14 H 66 q -8 -4 -4 -12 Z" />
          <path d="M32 244 q 10 4 20 1 M70 244 q 10 4 20 1" stroke={INK_SOFT} strokeWidth="2" />

          {/* ---------------- head group ---------------- */}
          <g transform={headTransform} style={{ transition: "transform 320ms var(--ease-settle)" }}>
            <path d="M55 108 q 8 6 16 0 l 1 10 q -9 6 -18 0 Z" fill={PAPER} strokeWidth="3" />
            <path
              d="M39 78 C 38 54 48 38 63 38 C 78 38 89 54 88 78 C 87 98 78 112 63 112 C 48 112 40 98 39 78 Z"
              fill={PAPER}
            />
            {/* ears */}
            <path d="M39 80 q -6 -2 -6 6 q 0 8 7 7 M88 80 q 6 -2 6 6 q 0 8 -7 7" strokeWidth="2.8" />
            {/* marked fringe */}
            <path
              d="M34 68 C 36 44 50 32 66 34 C 82 36 92 50 91 68 C 82 58 74 54 62 58 C 52 61 42 62 34 68 Z"
              fill={PAPER}
            />
            <path d="M52 40 q 8 16 4 20 M74 42 q -4 14 -10 16" stroke={INK_SOFT} strokeWidth="2.2" />
            {/* independent light lock */}
            <path d="M36 44 C 27 68 26 96 31 120" stroke={INK_SOFT} strokeWidth="2.6" />
            <path d="M45 46 C 38 70 38 96 42 118" stroke={INK_FAINT} strokeWidth="2" />
            {/* brows */}
            <g transform={`translate(0 ${pose.browLift})`} style={{ transition: "transform 260ms var(--ease-settle)" }}>
              <path d="M44 69 q 6 -4 12 -1 M70 68 q 6 -3 12 1" stroke={INK_SOFT} strokeWidth="2.4" />
            </g>
            {/* pink glasses */}
            <path d="M40 74 q 12 -4 22 0 q 2 16 -11 16 q -13 0 -11 -16 Z" />
            <path d="M66 74 q 12 -4 22 0 q 2 16 -11 16 q -13 0 -11 -16 Z" />
            <path d="M62 76 q 4 -2 6 0" strokeWidth="2.6" />
            <path d="M39 76 q -5 -1 -6 4 M89 76 q 5 -1 6 4" strokeWidth="2.4" stroke={INK_SOFT} />
            <Eyes kind={pose.eyes} blink={animated} />
            <Mouth kind={pose.mouth} />
            <path d="M46 96 q 4 3 8 0 M72 96 q 4 3 8 0" stroke={INK_FAINT} strokeWidth="2" />
          </g>
        </g>

        {/* --- the hope anchor: always saturated --- */}
        <g className={animated ? (state === "success" ? "heart-burst" : "heart-pulse") : undefined}>
          <path
            d="M61 136 C 57 128 45 128 45 139 C 45 148 55 154 61 160 C 67 154 77 148 77 139 C 77 128 65 128 61 136 Z"
            fill="var(--hope)"
            stroke="var(--hope-deep)"
            strokeWidth="2.4"
          />
        </g>
      </g>
    </g>
  );
}

export const MAITTE_BOX = { width: 130, height: 262 } as const;