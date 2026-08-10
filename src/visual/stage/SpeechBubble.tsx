/**
 * Speaker-anchored speech bubble.
 * Spec: docs/design/PHASE-1B-1-VISUAL-POLISH.md (Correction 2),
 *       docs/ux/CHALLENGE-STAGE.md ("Speaker-anchored caption treatment"),
 *       docs/design/CHARACTER-ART.md ("Speaker anchoring")
 *
 * A hand-drawn illustrated bubble with a tail that points at the companion who
 * is speaking. It is the PRIMARY presentation for short companion-authored
 * lines; the large detached caption plate stays available for long copy,
 * narration with no visible speaker and the responsive/accessibility fallback.
 *
 * The bubble owns NO copy: the caption text, the narration status and the
 * replay handler all arrive as props from the stage, which reads them from the
 * narration configuration. It never evaluates or narrates anything itself.
 */
import { ReplayShellArt } from "@/assets/game/objects/DesertPuzzleArt";
import { INK, INK_SOFT } from "@/assets/game/ink";
import type { NarrationStatus } from "@/audio/narrationService";
import { cn } from "@/lib/utils";

export type SpeechBubbleProps = {
  /** The same short sentence the narration speaks. */
  text: string;
  /** Name of the speaker, used for the accessible attribution only. */
  speakerName?: string;
  /** Which side the speaker stands on; the tail points that way. */
  tailSide?: "left" | "right";
  narrationStatus?: NarrationStatus;
  /** True when no audio can be produced at all. */
  audioUnavailable?: boolean;
  onReplay?(): void;
  className?: string;
};

/**
 * Wobbly hand-drawn bubble outline + tail. Drawn in a 320x150 box; the tail
 * occupies the lower corner on `tailSide` so it reads as coming from the pet.
 */
function BubbleShape({ tailSide, speaking }: { tailSide: "left" | "right"; speaking: boolean }) {
  const body =
    "M22 16 C 96 4, 232 2, 300 18 C 314 44, 316 88, 302 114 C 236 128, 92 130, 26 116 C 10 90, 8 44, 22 16 Z";
  const tail =
    tailSide === "left"
      ? "M62 116 C 54 132, 40 142, 18 150 C 40 136, 48 126, 52 112 Z"
      : "M262 116 C 270 132, 284 142, 306 150 C 284 136, 276 126, 272 112 Z";

  return (
    <svg
      viewBox="0 0 324 154"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d={body} fill="var(--paper)" stroke={INK} strokeWidth="3.4" strokeLinejoin="round" />
      <path d={tail} fill="var(--paper)" stroke={INK} strokeWidth="3.4" strokeLinejoin="round" />
      {/* second, slightly offset contour: hand-drawn line variation */}
      <path
        d={body}
        fill="none"
        stroke={INK_SOFT}
        strokeWidth="1.6"
        opacity="0.6"
        transform="translate(2 3) scale(0.988)"
      />
      {speaking ? (
        <g className="bubble-pulse" stroke={INK_SOFT} strokeWidth="2.6" fill="none" opacity="0.8">
          <path d={tailSide === "left" ? "M36 136 q -8 8 -8 16" : "M288 136 q 8 8 8 16"} />
        </g>
      ) : null}
    </svg>
  );
}

export function SpeechBubble({
  text,
  speakerName,
  tailSide = "left",
  narrationStatus = "idle",
  audioUnavailable = false,
  onReplay,
  className,
}: SpeechBubbleProps) {
  const speaking = narrationStatus === "speaking";

  return (
    <div className={cn("bubble-appear relative w-full max-w-md", className)}>
      <BubbleShape tailSide={tailSide} speaking={speaking} />
      <div className="relative flex flex-col items-center gap-1 px-7 pt-5 pb-8">
        <p
          role="status"
          className="text-center text-[clamp(0.9rem,1.7vw,1.2rem)] leading-snug font-medium text-ink"
        >
          {speakerName ? <span className="sr-only">{speakerName} diz: </span> : null}
          {text}
        </p>

        {onReplay ? (
          <div className="pointer-events-auto flex flex-col items-center">
            <button
              type="button"
              onClick={onReplay}
              aria-label="Ouvir de novo"
              className="flex min-h-11 items-center gap-1 rounded-2xl px-2 py-1 text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none"
            >
              <svg viewBox="-44 -44 88 88" className="h-8 w-8" aria-hidden>
                <ReplayShellArt calling={narrationStatus === "blocked"} />
              </svg>
              <span className="text-xs font-semibold">Ouvir de novo</span>
            </button>
            {audioUnavailable ? (
              <span className="text-[0.68rem] text-ink-soft">Sem som — leia o recado.</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
