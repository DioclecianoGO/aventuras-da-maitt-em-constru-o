/**
 * Restoration technique spike.
 * Spec: docs/design/RESTORATION-OF-COLOR.md, docs/technical/STATE.md
 *
 * Restoration is ALWAYS a derived 0..1 value passed in as a prop. This
 * component never reads or stores progress.
 *
 * Two candidate techniques are implemented so the visual/perf trade-off can be
 * judged on a real tablet before Phase 1 commits to one (see GAP register):
 *  - "mask": greyscale base with a colour layer revealed by a soft wipe mask.
 *  - "opacity": greyscale base cross-faded to a colour layer.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export type RestorationTechnique = "mask" | "opacity";

export function RestorationLayer({
  progress,
  technique = "mask",
  className,
  children,
}: {
  /** Derived value, 0..1. */
  progress: number;
  technique?: RestorationTechnique;
  className?: string;
  children: React.ReactNode;
}) {
  const clamped = Math.min(1, Math.max(0, progress));
  const percent = clamped * 100;

  // Soft-edged wipe: colour is fully revealed below the front, feathered above.
  const maskImage = `linear-gradient(to top, hsl(0 0% 0% / 1) ${Math.max(0, percent - 8)}%, hsl(0 0% 0% / 0) ${Math.min(100, percent + 8)}%)`;

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div className="grayscale-100 contrast-75 saturate-0 transition-[filter] duration-700">
        {children}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 will-change-[opacity,mask-position] motion-safe:transition-all motion-safe:duration-700"
        style={
          technique === "mask"
            ? { maskImage, WebkitMaskImage: maskImage, opacity: clamped > 0 ? 1 : 0 }
            : { opacity: clamped }
        }
      >
        {children}
      </div>
    </div>
  );
}