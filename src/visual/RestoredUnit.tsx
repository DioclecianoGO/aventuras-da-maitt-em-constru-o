/**
 * A concrete restorable scenery unit.
 * Spec: docs/design/COLOR-RESTORATION.md, docs/design/PHASE-1B-1-VISUAL-POLISH.md
 *
 * `restored` is ALWAYS resolved outside this component from derived progress
 * facts. Nothing here reads, stores or infers progress, and no unit persists a
 * colour state of its own — a reload simply re-derives the same booleans and
 * the same objects come back coloured.
 *
 * Restoration is never hue alone: a restored unit also gains detail, clarity
 * and small signs of life (leaves, a flower, a bird, sharper contour), so the
 * change survives colour-blind viewing and stolen-colour comparison.
 */
import type { ReactElement } from "react";

import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import type { RestorableUnit, RestorableUnitKind } from "@/visual/world-config/restoration-units";

const INK_FAINT = "var(--ink-faint)";

type Parts = { restored: boolean };

/** Dry shrubs that leaf out and flower when the colour returns. */
function PlantCluster({ restored }: Parts) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {restored ? (
        <>
          <path
            d="M-30 0 C -34 -22, -22 -38, -6 -40 C 12 -42, 26 -28, 24 -8 C 22 2, 0 6, -30 0 Z"
            fill="var(--world-forest)"
            opacity="0.38"
            stroke="none"
          />
          <ellipse cx="-2" cy="2" rx="38" ry="8" fill="var(--world-desert)" opacity="0.5" stroke="none" />
        </>
      ) : null}

      {/* stems: the drawing is identical in both states */}
      <path
        d="M-18 0 C -20 -14, -16 -26, -8 -34 M-2 0 C -2 -18, 2 -32, 10 -42 M12 0 C 12 -12, 18 -22, 26 -28"
        stroke={INK}
        strokeWidth="3"
      />
      {/* leaves / pads */}
      <path
        d="M-8 -34 q -14 -6 -16 -20 q 16 2 20 16 M10 -42 q 4 -18 20 -22 q -2 18 -16 24 M26 -28 q 12 -8 22 -2 q -8 12 -22 8"
        stroke={restored ? INK : INK_SOFT}
        strokeWidth={restored ? 3 : 2.4}
        fill={restored ? "var(--world-forest)" : "none"}
        opacity={restored ? 0.85 : 1}
      />
      {/* signs of life only after restoration */}
      {restored ? (
        <>
          <circle cx="-24" cy="-50" r="5" fill="var(--hope)" stroke={INK} strokeWidth="2" />
          <circle cx="30" cy="-40" r="3.6" fill="var(--hope)" stroke={INK} strokeWidth="1.8" />
          <path d="M-40 -44 q 8 -6 15 0 q 7 -6 15 0" stroke={INK_SOFT} strokeWidth="2" />
        </>
      ) : (
        <path d="M-30 2 q 28 -8 58 0" stroke={INK_FAINT} strokeWidth="2" />
      )}
    </g>
  );
}

/** A group of stones that regains warm rock colour and lichen speckle. */
function RockCluster({ restored }: Parts) {
  const big = "M-34 2 C -40 -14, -26 -30, -6 -30 C 14 -30, 26 -16, 22 2 Z";
  const small = "M18 2 C 16 -10, 26 -20, 38 -18 C 48 -16, 52 -6, 48 2 Z";
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {restored ? (
        <>
          <path d={big} fill="var(--world-desert-deep)" opacity="0.7" stroke="none" />
          <path d={small} fill="var(--world-desert)" opacity="0.75" stroke="none" />
        </>
      ) : null}
      <path d={big} fill={restored ? "none" : PAPER_DEEP} stroke={INK} strokeWidth="3.4" />
      <path d={small} fill={restored ? "none" : PAPER_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M-24 -12 q 14 -8 28 -2 M22 -8 q 10 -6 20 -2" stroke={INK_SOFT} strokeWidth="2.2" />
      {restored ? (
        <>
          {/* lichen and a small tuft growing in the shade of the stones */}
          <g stroke="none" fill="var(--world-forest)" opacity="0.8">
            <circle cx="-18" cy="-20" r="3.4" />
            <circle cx="4" cy="-24" r="2.6" />
            <circle cx="34" cy="-12" r="2.4" />
          </g>
          <path d="M-40 2 C -42 -10, -38 -16, -34 -20" stroke="var(--world-forest)" strokeWidth="3" />
        </>
      ) : (
        <path d="M-38 4 q 40 -8 90 0" stroke={INK_FAINT} strokeWidth="2" />
      )}
    </g>
  );
}

/** A cairn/route marker: the child can see how far the trail has been reclaimed. */
function TrailMarker({ restored }: Parts) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {restored ? (
        <path
          d="M-20 2 C -22 -14, -14 -26, -10 -40 C -6 -52, 6 -56, 12 -44 C 18 -30, 20 -12, 18 2 Z"
          fill="var(--world-desert-deep)"
          opacity="0.65"
          stroke="none"
        />
      ) : null}
      <path d="M-20 2 q 20 -8 38 0 q -4 -12 -14 -14 q -18 2 -24 14 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="3.2" />
      <path d="M-14 -12 q 16 -8 28 0 q -4 -12 -14 -13 q -12 2 -14 13 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M-8 -25 q 12 -6 20 0 q -4 -11 -11 -11 q -8 2 -9 11 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.8" />
      <path d="M-3 -36 q 8 -4 13 0 q -3 -9 -7 -9 q -6 1 -6 9 Z" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.6" />
      {restored ? (
        <>
          {/* a scrap of cloth tied to the top: the marker is cared for again */}
          <path d="M4 -46 q 16 -6 22 4 q -14 6 -22 2 Z" fill="var(--hope)" stroke={INK} strokeWidth="2.4" />
          <path d="M4 -46 v 10" stroke={INK} strokeWidth="2.4" />
        </>
      ) : (
        <path d="M-24 4 q 24 -6 46 0" stroke={INK_FAINT} strokeWidth="2" />
      )}
    </g>
  );
}

/** Wind-carved arch: the landmark detail used on the Overworld region. */
function ArchDetail({ restored }: Parts) {
  const arch =
    "M-46 2 c -6 -54, 22 -92, 48 -92 c 26 0, 52 38, 46 92 l -18 0 c 4 -42, -14 -68, -28 -68 c -16 0, -32 26, -30 68 Z";
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {restored ? <path d={arch} fill="var(--world-desert)" opacity="0.8" stroke="none" /> : null}
      <path d={arch} fill={restored ? "none" : PAPER_DEEP} stroke={INK} strokeWidth="3.4" />
      <path d="M-34 -44 q 20 -12 38 -4 M18 -40 q 14 -8 26 -2" stroke={INK_SOFT} strokeWidth="2.2" />
      {restored ? (
        <>
          <path d="M-46 2 q 46 -10 94 0" stroke="var(--world-desert-deep)" strokeWidth="4" />
          {/* a bird has come back to the arch */}
          <path d="M2 -104 q 10 -8 19 0 q 9 -8 19 0" stroke={INK} strokeWidth="2.4" />
        </>
      ) : (
        <path d="M-50 4 q 50 -8 100 0" stroke={INK_FAINT} strokeWidth="2" />
      )}
    </g>
  );
}

/** Half-buried carved ruin blocks near the far end of the route. */
function RuinDetail({ restored }: Parts) {
  const a = "M-26 2 l 4 -50 q 18 -8 34 2 l 4 48 q -22 8 -42 0 Z";
  const b = "M22 2 l 3 -32 q 13 -6 24 2 l 3 30 q -16 6 -30 0 Z";
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {restored ? (
        <>
          <path d={a} fill="var(--world-desert-deep)" opacity="0.7" stroke="none" />
          <path d={b} fill="var(--world-desert)" opacity="0.8" stroke="none" />
        </>
      ) : null}
      <path d={a} fill={restored ? "none" : PAPER_DEEP} stroke={INK} strokeWidth="3.2" />
      <path d={b} fill={restored ? "none" : PAPER_DEEP} stroke={INK} strokeWidth="3" />
      <path d="M-18 -26 q 18 -8 32 2 M26 -16 q 10 -6 18 0" stroke={INK_SOFT} strokeWidth="2.2" />
      {restored ? (
        <>
          {/* carvings become legible again and a creeper climbs the block */}
          <path d="M-16 -40 q 16 -6 28 2 M-16 -12 q 16 -6 28 2" stroke={INK} strokeWidth="2.4" />
          <path
            d="M-26 2 C -32 -12, -28 -26, -20 -34"
            stroke="var(--world-forest)"
            strokeWidth="3.2"
          />
          <circle cx="-22" cy="-30" r="3.2" fill="var(--world-forest)" stroke="none" />
        </>
      ) : (
        <path d="M-30 4 q 40 -8 84 0" stroke={INK_FAINT} strokeWidth="2" />
      )}
    </g>
  );
}

const UNIT_ART: Record<RestorableUnitKind, (props: Parts) => ReactElement> = {
  "plant-cluster": PlantCluster,
  "rock-cluster": RockCluster,
  "trail-marker": TrailMarker,
  "arch-detail": ArchDetail,
  "ruin-detail": RuinDetail,
};

export function RestoredUnit({ unit, restored }: { unit: RestorableUnit; restored: boolean }) {
  const Art = UNIT_ART[unit.kind];
  return (
    <g
      transform={`translate(${unit.anchor.x} ${unit.anchor.y}) scale(${unit.scale ?? 1})`}
      data-restored={restored ? "true" : "false"}
      data-unit-id={unit.id}
    >
      <title>{restored ? unit.label : `${unit.label} — ainda sem cor`}</title>
      {/*
        The animation lives on an inner group: a CSS transform on the same
        element would override the SVG transform attribute and tear the unit
        out of its place in the scene.
      */}
      <g className={restored ? "unit-restore" : undefined}>
        <Art restored={restored} />
      </g>
    </g>
  );
}
