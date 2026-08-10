/**
 * Challenge Stage shell — one common functional shell, world-specific skin.
 * Spec: docs/ux/CHALLENGE-STAGE.md, docs/ux/FEEDBACK.md, docs/design/AUDIO.md
 *
 * Phase 1B: the stage is a place in the desert, not a form on a page. Maittê
 * and the companion are staged inside the scene, the instruction appears on a
 * sand-etched caption plate spoken by the companion, and the way back is the
 * folded map. The shell owns layout, framing, presence, caption and replay. It
 * owns NO evaluation, no curriculum and no progression rule; the skin only
 * changes scenery, and the functional contract is identical across worlds.
 */
import type { ReactNode } from "react";

import { CompanionArt } from "@/assets/game/characters/CompanionArt";
import { CaptionPlateArt, ReplayShellArt } from "@/assets/game/objects/DesertPuzzleArt";
import { FoldedMapArt } from "@/assets/game/objects/NavigationArt";
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import type { NarrationStatus } from "@/audio/narrationService";
import type { CompanionActingState, MaitteActingState } from "@/visual/character/acting";
import { MaitteFigure } from "@/assets/game/characters/MaitteFigure";
import { resolveRestoredRegions } from "@/visual/character/MaitteAvatar";
import { useHydrated } from "@/visual/motion";
import { getStageSkin, getWorldVisual } from "@/visual/world-config";

/** Enriched desert cove: dune walls, distant ridges, scattered stones. */
function DesertSkin() {
  return (
    <svg
      viewBox="0 0 1200 700"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect x="0" y="0" width="1200" height="700" fill="var(--paper)" />
      {/* far ridges */}
      <path
        d="M-20 330 C 160 286, 300 300, 430 332 C 560 364, 700 344, 840 312 C 980 280, 1100 296, 1220 330 L 1220 400 L -20 400 Z"
        fill="var(--paper)"
        stroke={INK_SOFT}
        strokeWidth="2.4"
      />
      <path d="M60 322 q 40 -22 84 -4 M700 318 q 46 -24 92 -2" fill="none" stroke="var(--ink-faint)" strokeWidth="2" />
      {/* mid dune */}
      <path
        d="M-20 430 C 180 372, 420 384, 620 430 C 820 476, 1020 458, 1220 414 L 1220 720 L -20 720 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="3.4"
      />
      {/* near dune shelf the challenge sits on */}
      <path
        d="M-20 556 C 220 490, 520 502, 760 552 C 940 588, 1080 576, 1220 548 L 1220 720 L -20 720 Z"
        fill="var(--paper)"
        stroke={INK}
        strokeWidth="3"
      />
      <path
        d="M-20 604 C 240 552, 540 566, 780 606 M120 646 q 50 -14 100 0 M880 660 q 46 -12 92 0"
        fill="none"
        stroke={INK_SOFT}
        strokeWidth="2.2"
      />
      {/* scattered rocks and dry grass */}
      <path d="M96 520 q 18 -20 38 -2 q 6 12 -6 14 q -22 4 -32 -12 Z" fill={PAPER_DEEP} stroke={INK_SOFT} strokeWidth="2.4" />
      <path d="M1064 500 q 22 -22 44 -2 q 8 12 -6 16 q -26 6 -38 -14 Z" fill={PAPER_DEEP} stroke={INK_SOFT} strokeWidth="2.4" />
      <path
        d="M1010 552 c -4 -22 2 -36 6 -46 M1020 552 c 4 -20 12 -30 22 -38 M1002 552 c -10 -16 -14 -28 -14 -40"
        fill="none"
        stroke={INK_SOFT}
        strokeWidth="2.2"
      />
      {/* drifting sand veils */}
      <g className="sand-drift" opacity="0.5">
        <path d="M-40 470 q 160 -22 320 -4" fill="none" stroke="var(--ink-faint)" strokeWidth="2" />
        <path d="M700 494 q 180 -24 340 -6" fill="none" stroke="var(--ink-faint)" strokeWidth="2" />
      </g>
    </svg>
  );
}

function DefaultSkin() {
  return <div className="absolute inset-0 bg-[var(--paper)]" aria-hidden />;
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
}) {
  const hydrated = useHydrated();
  const skin = getStageSkin(worldId);
  const visual = getWorldVisual(worldId);
  const speaking = narrationStatus === "speaking";

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-[var(--ink)]/35" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="stage-emerge absolute inset-0 overflow-hidden"
      >
        {skin === "desert" ? <DesertSkin /> : <DefaultSkin />}

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

          {/* Caption plate: sand-etched, always present, spoken when audio works. */}
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

          <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-28 sm:px-8 sm:pb-24">
            <div className="w-full max-w-3xl">{children}</div>
          </div>

          {/* Staged presence: companion narrates at left, Maittê watches at right. */}
          <div className="pointer-events-none absolute bottom-2 left-3 flex items-end gap-3 sm:left-8">
            <svg
              viewBox="-120 -170 240 208"
              className="h-28 w-32 sm:h-36 sm:w-40"
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

          <div className="pointer-events-none absolute right-3 bottom-2 sm:right-10">
            <svg viewBox="0 0 130 262" className="h-32 w-16 sm:h-44 sm:w-24" role="img" aria-label="Maittê">
              <MaitteFigure
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