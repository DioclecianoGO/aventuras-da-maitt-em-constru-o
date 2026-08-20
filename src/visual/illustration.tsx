/**
 * Illustration asset descriptor + renderer.
 * Spec: docs/design/ASSET-PRODUCTION-PIPELINE.md ("stable presentation keys /
 *       registry entries"), docs/design/VISUAL-IMPLEMENTATION.md §5.
 *
 * A registry entry is a DESCRIPTOR, not a hard-coded React component. Today
 * every descriptor still wraps one of the existing hand-authored inline-SVG
 * components ("vector-component" — Phase 1B/1B.1 concept/technical scaffolding,
 * per docs/design/ASSET-PRODUCTION-PIPELINE.md). A future production asset
 * (transparent PNG/WebP, or any other web-suitable format) becomes a "raster"
 * descriptor at the SAME registry key, and the CALLER decides the embedding
 * context via `as` ("svg" inside an ambient <svg>, "html" for a standalone
 * element) — see ChallengeStageShell's stage-skin usage for the "html" case.
 *
 * This one-descriptor-swap promotion path is for STATIC illustration keys
 * only: full-scene backgrounds, ink layers, landmarks, stage skins — a single
 * fixed image with no per-instance state. It does NOT cover parameterized
 * visual renderers that currently take runtime props to pick a variant or an
 * acting state (`character.maitte`, `character.companion`, `object.slot` and
 * similar — see the `kind`/`state`/`petId`-style props their call sites pass
 * today). Those need a richer, still-unapproved variant/identity asset
 * contract (e.g. one descriptor resolving to a SET of raster frames/states)
 * before they can be promoted; designing that contract is explicitly out of
 * scope here and is not implied by this file.
 */
import { useId, type ComponentType, type ReactNode } from "react";

/** Existing hand-authored scaffolding. May be promoted to "raster" later. */
export type VectorComponentIllustrationAsset = {
  kind: "vector-component";
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- registry is intentionally heterogeneous; each component owns its own prop contract. */
  Component: ComponentType<any>;
};

/** An authored production illustration file. Not used by any asset yet. */
export type RasterIllustrationAsset = {
  kind: "raster";
  srcSet: { default: string; "2x"?: string };
  width: number;
  height: number;
  /** Accessible description. Required — a raster asset carries no <title>. */
  alt: string;
};

/**
 * A single transparent full-colour raster plus independent region masks,
 * composited at runtime into stolen/partial/restored presentation states.
 * Spec: docs/design/MAITTE-PRODUCTION-PROOF-01.md, docs/design/COLOR-RESTORATION.md.
 *
 * Kept generic/reusable — `regionMasks` is keyed by plain `string` so this
 * file never needs to import a character-specific region-id type. The
 * concrete asset module for a specific character is responsible for
 * compile-time-checking its own region-mask map (see the Maittê listen-think
 * asset module, which uses `satisfies Record<CharacterRegionId, string>`).
 */
export type RestorationRasterIllustrationAsset = {
  kind: "restoration-raster";
  /** Untouched transparent full-colour source. Also the fully-restored result. */
  fullColor: string;
  /** One binary luminance mask per independently-restorable region. */
  regionMasks: Record<string, string>;
  /**
   * Measured non-transparent (alpha-opaque) bounding box of `fullColor`, in
   * its own native pixel space. Used to crop out empty canvas margin so the
   * character fills the render box instead of the raw export canvas.
   */
  sourceContentBox: { x: number; y: number; width: number; height: number };
  /** Native pixel dimensions of `fullColor` and every mask in `regionMasks`. */
  width: number;
  height: number;
  /**
   * Logical render box this asset is drawn into, in the SAME units the
   * call site's ambient <svg viewBox> (or an ancestor <g transform> built
   * from that same box) already uses. Must match the box every existing
   * caller assumes — e.g. `MAITTE_BOX` for Maittê — so no call site needs
   * to change to accommodate this asset kind.
   */
  renderBox: { width: number; height: number };
  /** Accessible description. */
  alt: string;
};

export type IllustrationAsset =
  VectorComponentIllustrationAsset | RasterIllustrationAsset | RestorationRasterIllustrationAsset;

/** Registry-authoring helper: wrap an existing component as a descriptor. */
export function vectorAsset(
  Component: VectorComponentIllustrationAsset["Component"],
): VectorComponentIllustrationAsset {
  return { kind: "vector-component", Component };
}

type RestorationRasterIllustrationProps = {
  asset: RestorationRasterIllustrationAsset;
  restored?: ReadonlySet<string> | readonly string[];
  className?: string;
  title?: string;
};

/**
 * Renders a `restoration-raster` asset: a grayscale-filtered base with one
 * SVG-masked full-colour reveal layer per restored region, OR — once every
 * configured region is restored — the untouched full-colour source directly
 * with no filter and no masks at all. That direct-source branch is what
 * guarantees "fully restored" is pixel-identical to the source: it renders
 * the exact same bytes, so there is no pixel (skin, face, arms, or any other
 * area no mask covers) it could get wrong.
 *
 * Every <image> in the composition (base, reveal layers, mask content)
 * shares one identical placement — the asset's own native pixel box — so
 * alignment across layers holds by construction. A single nested <svg>,
 * scoped to the asset's measured `sourceContentBox` and sized to the
 * asset's `renderBox`, crops out empty source-canvas margin and preserves
 * the feet/bottom anchor purely as a presentation-layer coordinate
 * transform — no change to any call site's own viewBox.
 *
 * Mask ids are scoped with `useId()` so two simultaneous instances of this
 * component in the same document can never collide.
 */
function RestorationRasterIllustration({
  asset,
  restored,
  className,
  title,
}: RestorationRasterIllustrationProps): ReactNode {
  const uid = useId();
  const restoredSet = restored instanceof Set ? restored : new Set(restored ?? []);
  const regionEntries = Object.entries(asset.regionMasks);
  const allRegionsRestored = regionEntries.every(([region]) => restoredSet.has(region));
  const restoredEntries = regionEntries.filter(([region]) => restoredSet.has(region));

  const layerProps = {
    x: 0,
    y: 0,
    width: asset.width,
    height: asset.height,
    preserveAspectRatio: "xMidYMid meet" as const,
  };

  const { x, y, width, height } = asset.sourceContentBox;

  return (
    <svg
      viewBox={`${x} ${y} ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      x={0}
      y={0}
      width={asset.renderBox.width}
      height={asset.renderBox.height}
      {...(className !== undefined ? { className } : {})}
    >
      <title>{title ?? asset.alt}</title>
      {allRegionsRestored ? (
        <image href={asset.fullColor} {...layerProps} />
      ) : (
        <>
          <g style={{ filter: "grayscale(1)" }}>
            <image href={asset.fullColor} {...layerProps} />
          </g>
          <defs>
            {restoredEntries.map(([region, maskHref]) => (
              <mask
                key={region}
                id={`${uid}-mask-${region}`}
                maskUnits="userSpaceOnUse"
                maskContentUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={asset.width}
                height={asset.height}
                // Explicit, not left to the browser default (which happens to
                // also be "luminance" — but stating it removes any doubt,
                // since two of the eight masks are RGBA-encoded while the
                // rest are grayscale, and both must resolve identically).
                style={{ maskType: "luminance" }}
              >
                <image href={maskHref} {...layerProps} />
              </mask>
            ))}
          </defs>
          {restoredEntries.map(([region]) => (
            <image
              key={region}
              href={asset.fullColor}
              mask={`url(#${uid}-mask-${region})`}
              {...layerProps}
            />
          ))}
        </>
      )}
    </svg>
  );
}

export type IllustrationProps = {
  asset: IllustrationAsset;
  /**
   * Declares the embedding context so a RASTER asset renders the right host
   * element: "svg" (default) for a fragment composed inside an ambient
   * <svg viewBox=...>, "html" for a standalone element with its own box. A
   * "vector-component" asset ignores this — it mounts exactly as it always
   * has, so today's output is unaffected either way.
   */
  as?: "svg" | "html";
  className?: string | undefined;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- forwarded verbatim to whichever component/element the descriptor resolves to. */
  [prop: string]: any;
};

/**
 * Single dispatch point between a registry descriptor and the DOM. This is
 * the ONLY place that needs to learn a new asset representation later.
 */
export function Illustration({
  asset,
  as = "svg",
  className,
  ...rest
}: IllustrationProps): ReactNode {
  if (asset.kind === "vector-component") {
    const { Component } = asset;
    return <Component {...(className !== undefined ? { className } : {})} {...rest} />;
  }

  if (asset.kind === "restoration-raster") {
    // Only `restored`/`title` are meaningful for this asset kind — `state`/
    // `animated` (forwarded unconditionally by e.g. MaitteActor) are not
    // consumed here and must not leak onto the DOM as invalid attributes.
    const { restored, title } = rest as {
      restored?: ReadonlySet<string> | readonly string[];
      title?: string;
    };
    return (
      <RestorationRasterIllustration
        asset={asset}
        {...(restored !== undefined ? { restored } : {})}
        {...(className !== undefined ? { className } : {})}
        {...(title !== undefined ? { title } : {})}
      />
    );
  }

  const { srcSet, width, height, alt } = asset;
  const srcSetAttr = srcSet["2x"] ? `${srcSet.default} 1x, ${srcSet["2x"]} 2x` : undefined;

  if (as === "html") {
    return (
      <img
        src={srcSet.default}
        {...(srcSetAttr !== undefined ? { srcSet: srcSetAttr } : {})}
        width={width}
        height={height}
        alt={alt}
        {...(className !== undefined ? { className } : {})}
        {...rest}
      />
    );
  }

  return (
    <image
      href={srcSet.default}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid slice"
      aria-label={alt}
      {...(className !== undefined ? { className } : {})}
      {...rest}
    />
  );
}
