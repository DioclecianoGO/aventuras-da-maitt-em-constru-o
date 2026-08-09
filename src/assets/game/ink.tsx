/**
 * CONCEPT ASSET — shared ink/paper definitions for the illustrated world.
 * Original artwork authored for this project. Replaceable.
 */
export function InkDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <pattern
        id={`${prefix}-hatch`}
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(38)"
      >
        <line x1="0" y1="0" x2="0" y2="10" stroke="var(--ink-faint)" strokeWidth="1.4" />
      </pattern>
      <pattern
        id={`${prefix}-hatch-dense`}
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-22)"
      >
        <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink-faint)" strokeWidth="1.2" />
      </pattern>
      <pattern id={`${prefix}-grain`} width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="4" r="0.9" fill="var(--paper-shade)" />
        <circle cx="10" cy="9" r="0.7" fill="var(--paper-shade)" />
        <circle cx="7" cy="12" r="0.5" fill="var(--paper-shade)" />
      </pattern>
      <radialGradient id={`${prefix}-vignette`} cx="50%" cy="46%" r="72%">
        <stop offset="60%" stopColor="var(--paper)" stopOpacity="0" />
        <stop offset="100%" stopColor="var(--paper-shade)" stopOpacity="0.85" />
      </radialGradient>
    </defs>
  );
}

export const INK = "var(--ink)";
export const INK_SOFT = "var(--ink-soft)";
export const PAPER_DEEP = "var(--paper-deep)";