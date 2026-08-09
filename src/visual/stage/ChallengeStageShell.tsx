/**
 * Challenge Stage shell — one common functional shell, world-specific skin.
 * Spec: docs/ux/CHALLENGE-STAGE.md, docs/ux/FEEDBACK.md
 *
 * The shell owns layout, framing, companion presence and the way back. It owns
 * NO evaluation, no curriculum, and no progression rule. The skin only changes
 * scenery; the functional contract is identical across worlds.
 */
import type { ReactNode } from "react";

import { CompanionArt } from "@/assets/game/characters/CompanionArt";
import { FoldedMapArt } from "@/assets/game/objects/NavigationArt";
import { INK, INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import { useHydrated } from "@/visual/motion";
import { companionVisual, getStageSkin, getWorldVisual } from "@/visual/world-config";

function DesertSkin() {
  return (
    <svg
      viewBox="0 0 1200 700"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect x="0" y="0" width="1200" height="700" fill="var(--paper)" />
      <path
        d="M-20 470 C 180 400, 420 402, 620 452 C 820 502, 1020 486, 1220 440 L 1220 720 L -20 720 Z"
        fill={PAPER_DEEP}
        stroke={INK}
        strokeWidth="3.4"
      />
      <path
        d="M-20 560 C 220 494, 520 506, 760 556 C 940 592, 1080 580, 1220 552"
        fill="none"
        stroke={INK_SOFT}
        strokeWidth="2.6"
      />
      <path d="M120 606 q 50 -14 100 0 M880 620 q 46 -12 92 0" fill="none" stroke={INK_SOFT} strokeWidth="2.2" />
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
}: {
  worldId: string;
  title: string;
  onClose(): void;
  children: ReactNode;
  feedback?: ReactNode;
}) {
  const hydrated = useHydrated();
  const skin = getStageSkin(worldId);
  const visual = getWorldVisual(worldId);

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

          <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-8">
            <div className="w-full max-w-3xl">{children}</div>
          </div>

          <div className="pointer-events-none absolute bottom-3 left-4 flex items-end gap-3 sm:left-8">
            <svg viewBox="-56 -60 112 116" className="h-24 w-24" role="img" aria-label={companionVisual.displayName}>
              <CompanionArt animated={hydrated} />
            </svg>
            {feedback ? (
              <div className="mb-6 max-w-sm rounded-3xl border-2 border-[var(--ink)] bg-[var(--paper-deep)] px-4 py-3 text-sm text-ink">
                {feedback}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}