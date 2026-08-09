/**
 * State-driven color restoration for SVG scenery.
 * Spec: docs/design/COLOR-RESTORATION.md, docs/technical/STATE.md
 *
 * `progress` is ALWAYS a derived 0..1 value passed in from selectors. This
 * component never reads, stores or infers progress, and never becomes a second
 * source of progression truth.
 *
 * Two techniques, matching the Phase 0 spike:
 *  - "mask"    : the colour layer is revealed by an SVG mask (radial bloom or
 *                a directional wipe along the route);
 *  - "opacity" : the colour layer cross-fades. Used as the graceful fallback.
 */
import * as React from "react";

export type RestoreTechnique = "mask" | "opacity";

type Common = {
  /** Derived 0..1. */
  progress: number;
  technique?: RestoreTechnique;
  /** Unique per scene instance. */
  id: string;
  children: React.ReactNode;
};

type BloomProps = Common & {
  kind: "bloom";
  /** Centre of the colour bloom, in scene units. */
  cx: number;
  cy: number;
  /** Radius at full restoration, in scene units. */
  radius: number;
};

type WipeProps = Common & {
  kind: "wipe";
  /** Horizontal band the colour travels across, in scene units. */
  x: number;
  width: number;
  /** Extra white shapes (e.g. local blooms around completed slots). */
  extra?: React.ReactNode;
};

export type RestoreGroupProps = BloomProps | WipeProps;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function RestoreGroup(props: RestoreGroupProps) {
  const { progress, technique = "mask", id, children } = props;
  const value = clamp(progress);

  if (technique === "opacity") {
    return (
      <g
        opacity={value}
        style={{ transition: "opacity var(--motion-restore) var(--ease-settle)" }}
      >
        {children}
      </g>
    );
  }

  const maskId = `restore-${id}`;

  return (
    <>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {props.kind === "bloom" ? (
            <>
              <radialGradient id={`${maskId}-grad`}>
                <stop offset="0%" stopColor="#fff" />
                <stop offset="72%" stopColor="#fff" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
              <circle
                cx={props.cx}
                cy={props.cy}
                r={Math.max(0.01, props.radius * value)}
                fill={`url(#${maskId}-grad)`}
                style={{ transition: "r var(--motion-restore) var(--ease-settle)" }}
              />
            </>
          ) : (
            <>
              <linearGradient
                id={`${maskId}-grad`}
                gradientUnits="userSpaceOnUse"
                x1={props.x}
                x2={props.x + props.width}
              >
                <stop offset="0%" stopColor="#fff" />
                <stop
                  offset={`${Math.max(0, value * 100 - 6)}%`}
                  stopColor="#fff"
                  style={{ transition: "offset var(--motion-restore) var(--ease-settle)" }}
                />
                <stop offset={`${Math.min(100, value * 100 + 6)}%`} stopColor="#000" />
                <stop offset="100%" stopColor="#000" />
              </linearGradient>
              <rect
                x={props.x}
                y={-4000}
                width={props.width}
                height={8000}
                fill={`url(#${maskId}-grad)`}
                opacity={value > 0 ? 1 : 0}
              />
              {props.extra}
            </>
          )}
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>{children}</g>
    </>
  );
}

/** A local colour bloom used inside a wipe mask, e.g. around a finished slot. */
export function RestoreBloom({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="#fff" opacity={0.95} />;
}