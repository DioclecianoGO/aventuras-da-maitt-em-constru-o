/**
 * Illustration descriptor/renderer contract.
 * Spec: docs/design/ASSET-PRODUCTION-PIPELINE.md, docs/design/VISUAL-IMPLEMENTATION.md §5.
 *
 * The whole point of this seam is that call sites never learn which kind of
 * asset they received. These tests exercise both descriptor kinds through the
 * SAME <Illustration> entry point.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

import { Illustration, vectorAsset, type RasterIllustrationAsset } from "@/visual/illustration";

function Stub({ label = "stub" }: { label?: string }) {
  return <g data-testid="vector-stub">{label}</g>;
}

const RASTER: RasterIllustrationAsset = {
  kind: "raster",
  srcSet: { default: "/art/example.webp", "2x": "/art/example@2x.webp" },
  width: 240,
  height: 180,
  alt: "Exemplo de ilustração autoral",
};

describe("Illustration", () => {
  it("mounts a vector-component asset exactly as its own component would render", () => {
    const asset = vectorAsset(Stub);
    const { container } = render(
      <svg>
        <Illustration asset={asset} label="olá" />
      </svg>,
    );
    const stub = container.querySelector('[data-testid="vector-stub"]');
    expect(stub).toBeTruthy();
    expect(stub?.textContent).toBe("olá");
  });

  it("forwards arbitrary presentation props to the underlying component", () => {
    const asset = vectorAsset(Stub);
    const { container } = render(
      <svg>
        <Illustration asset={asset} />
      </svg>,
    );
    // Component's own default prop applies — Illustration adds nothing extra.
    expect(container.querySelector('[data-testid="vector-stub"]')?.textContent).toBe("stub");
  });

  it("renders a raster asset as an <image> when embedded in an SVG fragment", () => {
    const { container } = render(
      <svg>
        <Illustration asset={RASTER} />
      </svg>,
    );
    const image = container.querySelector("image");
    expect(image).toBeTruthy();
    expect(image?.getAttribute("href")).toBe("/art/example.webp");
    expect(image?.getAttribute("width")).toBe("240");
    expect(image?.getAttribute("aria-label")).toBe("Exemplo de ilustração autoral");
  });

  it("renders a raster asset as a standalone <img> when as='html'", () => {
    const { container } = render(<Illustration asset={RASTER} as="html" />);
    const img = container.querySelector("img");
    expect(img).toBeTruthy();
    expect(img?.getAttribute("src")).toBe("/art/example.webp");
    expect(img?.getAttribute("srcset")).toBe(
      "/art/example.webp 1x, /art/example@2x.webp 2x",
    );
    expect(img?.getAttribute("alt")).toBe("Exemplo de ilustração autoral");
  });

  it("degrades a raster asset without a 2x source without adding an empty srcset", () => {
    const single: RasterIllustrationAsset = {
      kind: "raster",
      srcSet: { default: "/art/single.webp" },
      width: 100,
      height: 100,
      alt: "Recurso único",
    };
    const { container } = render(<Illustration asset={single} as="html" />);
    expect(container.querySelector("img")?.hasAttribute("srcset")).toBe(false);
  });
});
