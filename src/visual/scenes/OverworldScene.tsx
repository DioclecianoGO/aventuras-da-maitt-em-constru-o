/**
 * Overworld scene — the illustrated map of the stolen-colour world.
 * Spec: docs/worlds/OVERWORLD.md, docs/ux/NAVIGATION.md, docs/design/ART-DIRECTION.md
 *
 * Presentation only. Progress arrives already derived; this scene never reads
 * or writes game state and never contains curriculum.
 */
import { Link } from "@tanstack/react-router";

import overworldMap from "@/assets/overworld-map.png.asset.json";
import { OVERWORLD_SCENE, baseVisual, overworldRegions } from "@/visual/world-config";

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

/** Presentation-only tint per region; no domain meaning. */
const regionTint: Record<string, string> = {
  "region-portuguese": "140 55% 55%",
  "region-history": "265 45% 60%",
  "region-geography": "30 70% 58%",
  "region-english": "205 60% 58%",
  "region-mathematics": "42 80% 58%",
  "region-science": "195 65% 52%",
};

export function OverworldScene({
  regionProgress,
  avatarProgress,
  focusRegionId = null,
}: OverworldSceneProps) {
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
        {/* Base line-art map: the stolen-colour world as a drawn page. */}
        <img
          src={overworldMap.url}
          alt="Mapa ilustrado do mundo sem cor: Floresta das Letras, Reino do Tempo, Vale dos Exploradores, Cidade das Vozes, Deserto dos Números, Oceano das Descobertas e a Base da Esperança ao centro"
          className="world-reveal absolute inset-0 h-full w-full object-contain"
          draggable={false}
        />

        {/* Colour returns region by region, driven by derived restoration. */}
        {overworldRegions.map((region) => {
          const progress = bloomEase(regionProgress[region.id] ?? 0);
          if (progress <= 0) return null;
          const radiusX = (region.bloomRadius / OVERWORLD_SCENE.width) * 100;
          const radiusY = (region.bloomRadius / OVERWORLD_SCENE.height) * 100;
          return (
            <div
              key={region.id}
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-multiply"
              style={{
                opacity: progress,
                transition: "opacity var(--motion-travel) var(--ease-travel)",
                background: `radial-gradient(${radiusX}% ${radiusY}% at ${pct(region.centroid.x, OVERWORLD_SCENE.width)} ${pct(region.centroid.y, OVERWORLD_SCENE.height)}, hsl(${regionTint[region.id] ?? "40 60% 60%"} / 0.85) 0%, hsl(${regionTint[region.id] ?? "40 60% 60%"} / 0.45) 55%, transparent 78%)`,
              }}
            />
          );
        })}

        {/* Maittê's heart: the surviving colour, saturated from the opening. */}
        <div
          aria-hidden
          className="pointer-events-none absolute mix-blend-multiply"
          style={{
            left: pct(baseVisual.centroid.x - 26, OVERWORLD_SCENE.width),
            top: pct(baseVisual.centroid.y - 12, OVERWORLD_SCENE.height),
            width: pct(52, OVERWORLD_SCENE.width),
            height: pct(52, OVERWORLD_SCENE.height),
            background:
              "radial-gradient(circle, hsl(var(--hope-h, 140) 65% 55% / 0.9) 0%, transparent 70%)",
            opacity: 0.55 + 0.45 * avatarProgress,
          }}
        />
      </div>

      {/* Interaction lives in HTML for focus and hit size; the map draws the names. */}
      <div className="pointer-events-none absolute inset-0">
        {overworldRegions.map((region) => {
          const style = {
            left: pct(region.label.x, OVERWORLD_SCENE.width),
            top: pct(region.label.y, OVERWORLD_SCENE.height),
          };

          if (!region.worldId) {
            return (
              <span
                key={region.id}
                aria-disabled="true"
                className="absolute flex -translate-x-1/2 flex-col items-center text-ink-soft/70"
                style={style}
              >
                <span className="sr-only">{region.displayName}</span>
                <span className="mt-[3.2vh] text-[clamp(0.55rem,0.85vw,0.75rem)] tracking-[0.2em] uppercase">
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
              className="pointer-events-auto absolute flex -translate-x-1/2 flex-col items-center rounded-full px-3 py-1 text-ink transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none"
              style={style}
              aria-label={`Entrar em ${region.displayName}`}
            >
              <span className="sr-only">{region.displayName}</span>
              <span className="mt-[3.2vh] flex items-center gap-2 rounded-full bg-[var(--paper)]/80 px-3 py-1 text-[clamp(0.55rem,0.85vw,0.75rem)] tracking-[0.2em] uppercase backdrop-blur-[1px]">
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