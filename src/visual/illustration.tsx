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
import type { ComponentType, ReactNode } from "react";

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

export type IllustrationAsset = VectorComponentIllustrationAsset | RasterIllustrationAsset;

/** Registry-authoring helper: wrap an existing component as a descriptor. */
export function vectorAsset(
  Component: VectorComponentIllustrationAsset["Component"],
): VectorComponentIllustrationAsset {
  return { kind: "vector-component", Component };
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
export function Illustration({ asset, as = "svg", className, ...rest }: IllustrationProps): ReactNode {
  if (asset.kind === "vector-component") {
    const { Component } = asset;
    return <Component {...(className !== undefined ? { className } : {})} {...rest} />;
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
