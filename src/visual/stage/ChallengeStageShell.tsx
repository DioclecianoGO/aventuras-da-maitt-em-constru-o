/**
 * Challenge Stage shell — one common functional shell, world-specific skin.
 * Spec: docs/ux/CHALLENGE-STAGE.md, docs/ux/FEEDBACK.md, docs/design/AUDIO.md
 *
 * Phase 1B: the stage is a place in the desert, not a form on a page. Maittê
 * and the companion are staged inside the scene and the way back is the folded
 * map. The shell owns layout, framing, presence, caption and replay. It owns NO
 * evaluation, no curriculum and no progression rule; the skin only changes
 * scenery, and the functional contract is identical across worlds.
 *
 * Phase 1B.1 (Correction 2): a short line attributed to a visible companion is
 * presented in a speech bubble anchored to that companion. The large sand plate
 * remains for long copy, for narration with no visible speaker and as the
 * fallback. Exactly ONE placement decision is made per render, so the same
 * sentence is never shown twice.
 *
 * Step 1 (production presentation seam): the background skin is resolved
 * through the asset registry (`stage-skin.<id>`) instead of a local ternary
 * over inline components, so a future authored background can replace one
 * skin without touching this file.
 */
import type { ReactNode } from "react";

import { CompanionArt } from "@/assets/game/characters/CompanionArt";
import { CaptionPlateArt, ReplayShellArt } from "@/assets/game/objects/DesertPuzzleArt";
import { FoldedMapArt } from "@/assets/game/objects/NavigationArt";
import type { NarrationStatus } from "@/audio/narrationService";
import type { CompanionActingState, MaitteActingState } from "@/visual/character/acting";
import { MaitteActor } from "@/visual/character/MaitteActor";
import { SpeechBubble } from "@/visual/stage/SpeechBubble";
import { resolveRestoredRegions } from "@/visual/character/MaitteAvatar";
import { getAsset } from "@/visual/assetRegistry";
import { Illustration } from "@/visual/illustration";
import { useHydrated } from "@/visual/motion";
import { getStageSkin, getWorldVisual } from "@/visual/world-config";

/**
 * One placement decision. A short line spoken by a companion who is actually
 * on stage belongs in his bubble; anything longer, or with no visible speaker,
 * falls back to the detached plate.
 */
const BUBBLE_MAX_CHARS = 110;

function resolveCaptionPlacement({
  caption,
  speakerVisible,
}: {
  caption?: string;
  speakerVisible: boolean;
}): "bubble" | "plate" | "none" {
  if (!caption) return "none";
  if (speakerVisible && caption.length <= BUBBLE_MAX_CHARS) return "bubble";
  return "plate";
}

export function ChallengeStageShell({
  worldId,
  title,
  onClose,
  children,
  feedback,
  caption,
  narrationStatus = "idle",
  audioUnavailable = false,
  onReplay,
  petId,
  petDisplayName,
  companionState = "idle",
  maitteState = "idle-curious",
  avatarProgress = 0,
  /** Set false for narration that is not authored by the staged companion. */
  captionFromCompanion = true,
}: {
  worldId: string;
  title: string;
  onClose(): void;
  children: ReactNode;
  feedback?: ReactNode;
  /** Visible instruction/reaction text. Always rendered, audio or not. */
  caption?: string;
  narrationStatus?: NarrationStatus;
  /** True when no audio can play at all; the caption carries the meaning. */
  audioUnavailable?: boolean;
  onReplay?(): void;
  petId?: string;
  petDisplayName?: string;
  companionState?: CompanionActingState;
  maitteState?: MaitteActingState;
  avatarProgress?: number;
  captionFromCompanion?: boolean;
}) {
  const hydrated = useHydrated();
  const skin = getStageSkin(worldId);
  const visual = getWorldVisual(worldId);
  const speaking = narrationStatus === "speaking";
  const placement = resolveCaptionPlacement({
    ...(caption !== undefined ? { caption } : {}),
    speakerVisible: captionFromCompanion,
  });

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-[var(--ink)]/35" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="stage-emerge absolute inset-0 overflow-hidden"
      >
        {/*
          This background sits directly in an HTML container (the dialog
          div above), never inside an ambient <svg>. `as="html"` is
          load-bearing: today every stage-skin descriptor is still
          vector-component and ignores it, but the moment one is promoted to
          a raster asset, this is what makes it mount as an <img> instead of
          an SVG <image> (which would be invalid/inert outside an <svg>).
        */}
        <Illustration
          asset={getAsset(`stage-skin.${skin}`)}
          as="html"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative flex h-full flex-col">
          <header className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-8">
            <div>
              <p className="text-[0.7rem] tracking-[0.28em] text-ink-soft uppercase">
                {visual.zoneName}
              </p>
              <h1 className="text-[clamp(1.2rem,2.4vw,1.8rem)] font-semibold text-ink">{title}</h1>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Voltar à trilha"
              className="flex min-h-11 items-center gap-2 rounded-2xl px-3 py-2 text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none"
            >
              <svg viewBox="0 0 76 60" className="h-9 w-11" aria-hidden>
                <FoldedMapArt />
              </svg>
              <span className="text-sm font-semibold">Trilha</span>
            </button>
          </header>

          {/*
            Fallback placement: sand-etched plate. Used for long copy, for
            narration without a visible speaker, and whenever the bubble is not
            the chosen placement.
          */}
          {placement === "plate" ? (
            <div className="relative mx-auto mt-2 w-full max-w-2xl px-4">
              <div className="relative">
                <svg viewBox="0 0 360 100" className="h-auto w-full" aria-hidden>
                  <CaptionPlateArt />
                </svg>
                <p
                  role="status"
                  className="absolute inset-0 flex items-center justify-center px-10 text-center text-[clamp(0.95rem,2vw,1.35rem)] font-medium text-ink"
                >
                  {caption}
                </p>
              </div>
              {onReplay ? (
                <div className="mt-1 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={onReplay}
                    aria-label="Ouvir de novo"
                    className="flex min-h-11 items-center gap-2 rounded-2xl px-3 py-1 text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none"
                  >
                    <svg viewBox="-44 -44 88 88" className="h-10 w-10" aria-hidden>
                      <ReplayShellArt calling={narrationStatus === "blocked"} />
                    </svg>
                    <span className="text-sm font-semibold">Ouvir de novo</span>
                  </button>
                  {audioUnavailable ? (
                    <span className="text-xs text-ink-soft">Sem som — leia o recado na pedra.</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex min-h-0 flex-1 items-center justify-center px-4 pt-2 pb-28 sm:px-8 sm:pb-24">
            <div className="w-full max-w-3xl">{children}</div>
          </div>

          {/* Staged presence: companion speaks at left, Maittê watches at right. */}
          <div className="pointer-events-none absolute bottom-2 left-3 flex max-w-[min(30rem,60vw)] flex-col items-start gap-1 sm:left-8">
            {placement === "bubble" && caption ? (
              <SpeechBubble
                text={caption}
                tailSide="left"
                narrationStatus={narrationStatus}
                audioUnavailable={audioUnavailable}
                className="ml-6 sm:ml-10"
                {...(petDisplayName ? { speakerName: petDisplayName } : {})}
                {...(onReplay ? { onReplay } : {})}
              />
            ) : null}
            <div className="flex items-end gap-3">
              <svg
                viewBox="-140 -160 260 205"
                className="h-28 w-36 sm:h-36 sm:w-48"
                role="img"
                aria-label={petDisplayName ?? "Companheiro"}
              >
                <CompanionArt
                  animated={hydrated}
                  state={speaking ? "speak" : companionState}
                  {...(petId ? { petId } : {})}
                />
              </svg>
              {feedback ? (
                <div className="mb-8 max-w-sm rounded-3xl border-2 border-[var(--ink)] bg-[var(--paper-deep)] px-4 py-3 text-sm text-ink">
                  {feedback}
                </div>
              ) : null}
            </div>
          </div>

          <div className="pointer-events-none absolute right-3 bottom-2 sm:right-10">
            <svg viewBox="0 0 130 262" className="h-32 w-16 sm:h-44 sm:w-24" role="img" aria-label="Maittê">
              <MaitteActor
                restored={resolveRestoredRegions(avatarProgress)}
                state={speaking ? "listen-think" : maitteState}
                animated={hydrated}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
