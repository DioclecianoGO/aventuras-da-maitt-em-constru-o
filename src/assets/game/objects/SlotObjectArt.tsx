/**
 * CONCEPT ASSET — diegetic trail objects that stand in for activity slots.
 * Spec: docs/gameplay/ACTIVITY-SLOTS.md, docs/ux/BOARDS.md
 *
 * No rectangles, no cards, no percentages. Each object is scenery, anchored at
 * its base (0,0) and drawn upward. `state` only changes ink weight and quiet
 * idle motion; colour comes from the restoration mask above it.
 */
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import type { SlotObjectKind } from "@/visual/world-config/types";

export type SlotObjectState = "locked" | "available" | "completed";

export function SlotObjectArt({
  kind,
  state,
  animated = true,
}: {
  kind: SlotObjectKind;
  state: SlotObjectState;
  animated?: boolean;
}) {
  const stroke = state === "locked" ? INK_SOFT : INK;
  const width = state === "locked" ? 3 : 4;
  const idle = animated && state === "available" ? "slot-breathe" : undefined;

  return (
    <g className={idle} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="0" cy="4" rx="46" ry="12" fill={PAPER_DEEP} stroke={INK_SOFT} strokeWidth="2.2" />
      {kind === "carved-stone" ? (
        <g stroke={stroke} strokeWidth={width}>
          <path d="M-34 2 C -40 -46 -22 -84 2 -84 C 28 -84 42 -50 34 2 Z" fill={PAPER_DEEP} />
          <path d="M-14 -60 q 14 -10 28 0" stroke={INK_SOFT} strokeWidth="2.4" />
          <path d="M-16 -42 h 30 M-16 -26 h 22" stroke={INK_SOFT} strokeWidth="2.4" />
          <path d="M-30 -6 q 30 10 62 -4" stroke={INK_SOFT} strokeWidth="2.2" />
        </g>
      ) : null}
      {kind === "footprints" ? (
        <g stroke={stroke} strokeWidth={width - 0.6}>
          {[
            [-40, -6, -12],
            [-8, -22, 6],
            [26, -40, -8],
          ].map(([x, y, r]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
              <path d="M0 0 c -10 -4 -12 -20 -2 -24 c 10 -4 16 6 12 14 c -2 6 -6 12 -10 10 Z" fill={PAPER_DEEP} />
              <circle cx="8" cy="-26" r="3.4" fill={PAPER_DEEP} />
            </g>
          ))}
        </g>
      ) : null}
      {kind === "weathered-marker" ? (
        <g stroke={stroke} strokeWidth={width}>
          <path d="M-16 2 L -10 -92 L 12 -92 L 18 2 Z" fill={PAPER_DEEP} />
          <path d="M-12 -66 h 24 M-11 -48 h 22 M-10 -30 h 20" stroke={INK_SOFT} strokeWidth="2.4" />
          <path d="M18 -80 q 26 -6 40 8 q -24 10 -40 2 Z" fill={PAPER_DEEP} />
        </g>
      ) : null}
      {kind === "dry-wash" ? (
        <g stroke={stroke} strokeWidth={width - 0.8}>
          <path d="M-56 0 C -30 -18, 10 -18, 54 -2" fill="none" />
          <path d="M-48 -10 C -22 -28, 14 -28, 46 -12" stroke={INK_SOFT} strokeWidth="2.4" />
          <path d="M-20 -6 q 12 -12 24 -2" stroke={INK_SOFT} strokeWidth="2.2" />
        </g>
      ) : null}
      {state === "completed" ? (
        <path
          d="M0 -104 l 5 12 l 12 5 l -12 5 l -5 12 l -5 -12 l -12 -5 l 12 -5 Z"
          fill="var(--hope)"
          stroke="var(--hope-deep)"
          strokeWidth="1.8"
        />
      ) : null}
    </g>
  );
}