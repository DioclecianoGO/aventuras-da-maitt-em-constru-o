/**
 * Overworld scene — the illustrated map of the stolen-colour world.
 * Spec: docs/worlds/OVERWORLD.md, docs/ux/NAVIGATION.md, docs/design/ART-DIRECTION.md
 *
 * Presentation only. Progress arrives already derived; this scene never reads
 * or writes game state and never contains curriculum.
 */
import { Link } from "@tanstack/react-router";

import { InkDefs } from "@/assets/game/ink";
import {
  BaseDaEsperancaArt,
  OverworldColor,
  OverworldInk,
} from "@/assets/game/overworld/OverworldArt";
import { RestoreGroup } from "@/visual/RestoreGroup";
import { RestoredUnit } from "@/visual/RestoredUnit";
import { MaitteAvatar } from "@/visual/character/MaitteAvatar";
import { useHydrated } from "@/visual/motion";
import { OVERWORLD_SCENE, baseVisual, overworldRegions } from "@/visual/world-config";
import {
  getOverworldRestorationUnits,
  isUnitRestored,
} from "@/visual/world-config/restoration-units";

export type OverworldSceneProps = {
  /** Derived 0..1 restoration per region id. Missing = 0. */
  regionProgress: Record<string, number>;
  /** Derived 0..1 restoration of Maittê herself. */
  avatarProgress: number;
  /** Set while the map is zooming into a region. */
  focusRegionId?: string | null;
};

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Presentation easing only: the first restored slot must read as a visible
 * bloom on a map-scale region. It never changes the derived value itself.
 */
const bloomEase = (progress: number) => (progress <= 0 ? 0 : 0.45 + 0.55 * progress);

export function OverworldScene({
  regionProgress,
  avatarProgress,
  focusRegionId = null,
}: OverworldSceneProps) {
  const hydrated = useHydrated();
  const focus = overworldRegions.find((region) => region.id === focusRegionId) ?? null;

  const zoom = focus
    ? `scale(2.1) translate(${(OVERWORLD_SCENE.width / 2 - focus.centroid.x) / 2.1}px, ${(OVERWORLD_SCENE.height / 2 - focus.centroid.y) / 2.1}px)`
    : "none";

  return (
    <div className="world-surface flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className="relative isolate"
        style={{
          aspectRatio: `${OVERWORLD_SCENE.width} / ${OVERWORLD_SCENE.height}`,
          width: "100%",
          height: "100%",
          maxWidth: `calc(100dvh * ${OVERWORLD_SCENE.width / OVERWORLD_SCENE.height})`,
          maxHeight: `calc(100dvw * ${OVERWORLD_SCENE.height / OVERWORLD_SCENE.width})`,
        }}
      >
      <div
        className="absolute inset-0 origin-center"
        style={{
          transform: zoom,
          transition: "transform var(--motion-travel) var(--ease-travel)",
          opacity: focus ? 0.2 : 1,
        }}
      >
        <svg
          viewBox={`0 0 ${OVERWORLD_SCENE.width} ${OVERWORLD_SCENE.height}`}
          className="world-reveal h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Mapa do mundo sem cor, com seis regiões e a Base da Esperança ao centro"
        >
          <InkDefs prefix="ow" />
          <rect x="0" y="0" width={OVERWORLD_SCENE.width} height={OVERWORLD_SCENE.height} fill="var(--paper)" />

          {/* Colour lives UNDER the ink and is revealed by derived restoration. */}
          {overworldRegions.map((region) => (
            <RestoreGroup
              key={region.id}
              id={region.id}
              kind="bloom"
              cx={region.centroid.x}
              cy={region.centroid.y}
              radius={region.bloomRadius}
              progress={bloomEase(regionProgress[region.id] ?? 0)}
            >
              <OverworldColor regionId={region.id} />
            </RestoreGroup>
          ))}

          <OverworldInk prefix="ow" />

          {/*
            Region details that stay restored. Driven by the SAME derived
            progress the region mask uses — no new milestone concept, no second
            source of truth. Drawn above the ink so the restored object is the
            thing the child can point at.
          */}
          {overworldRegions.flatMap((region) =>
            getOverworldRestorationUnits(region.id).map((unit) => (
              <RestoredUnit
                key={unit.id}
                unit={unit}
                restored={isUnitRestored(unit, {
                  completedSlotIds: [],
                  progress: regionProgress[region.id] ?? 0,
                })}
              />
            )),
          )}

          <BaseDaEsperancaArt />

          {/* Maittê waits at the Base — her heart is the only saturated point. */}
          <MaitteAvatar
            progress={avatarProgress}
            x={baseVisual.centroid.x + 128}
            y={baseVisual.centroid.y + 52}
            scale={0.5}
            animated={hydrated}
            title="Maittê na Base da Esperança"
          />

          <rect
            x="0"
            y="0"
            width={OVERWORLD_SCENE.width}
            height={OVERWORLD_SCENE.height}
            fill="url(#ow-vignette)"
            pointerEvents="none"
          />
        </svg>
      </div>

      {/* Interaction and labels live in HTML for focus, hit size and typography. */}
      <div className="pointer-events-none absolute inset-0">
        <span
          className="absolute -translate-x-1/2 text-[clamp(0.7rem,1.1vw,0.95rem)] font-medium tracking-[0.22em] text-ink-soft uppercase"
          style={{
            left: pct(baseVisual.centroid.x, OVERWORLD_SCENE.width),
            top: pct(baseVisual.centroid.y + 112, OVERWORLD_SCENE.height),
          }}
        >
          {baseVisual.displayName}
        </span>

        {overworldRegions.map((region) => {
          const style = {
            left: pct(region.label.x, OVERWORLD_SCENE.width),
            top: pct(region.label.y, OVERWORLD_SCENE.height),
          };
          const label = (
            <span className="text-[clamp(0.85rem,1.5vw,1.35rem)] leading-none font-semibold">
              {region.displayName}
            </span>
          );

          if (!region.worldId) {
            return (
              <span
                key={region.id}
                aria-disabled="true"
                className="absolute flex -translate-x-1/2 flex-col items-center gap-1 text-ink-soft/80"
                style={style}
              >
                {label}
                <span className="text-[0.7rem] tracking-[0.2em] uppercase opacity-70">
                  adormecida
                </span>
              </span>
            );
          }

          return (
            <Link
              key={region.id}
              to="/mundo/$worldId"
              params={{ worldId: region.worldId }}
              className="pointer-events-auto absolute flex -translate-x-1/2 flex-col items-center gap-1 rounded-full px-4 py-2 text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none"
              style={style}
              aria-label={`Entrar em ${region.displayName}`}
            >
              {label}
              <span className="flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--hope)]" aria-hidden />
                seguir a trilha
              </span>
            </Link>
          );
        })}
      </div>
      </div>
    </div>
  );
}