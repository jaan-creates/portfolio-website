interface PerspectiveGridProps {
  /** Extra class on the container (e.g. "sh-grid" for a full-bleed variant). */
  className?: string;
  /** Tiles per axis. Default 18 — unchanged from the original Hero grid. */
  cols?: number;
  /**
   * Radial vignette that fades the grid toward the edges. On by default (the
   * Hero composition). Pass false for a full-bleed grid that reaches the
   * viewport edges (the vignette otherwise masks the grid before the page edge).
   */
  edgeFade?: boolean;
}

export default function PerspectiveGrid({
  className = '',
  cols = 18,
  edgeFade = true,
}: PerspectiveGridProps) {
  const tileCount = cols * cols;
  return (
    <div className={`perspective-container absolute inset-0 w-full h-full ${className}`}>
      <div
        className="grid-inner"
        // Inline grid-template is the single source of truth for tile density;
        // default 18 matches the existing CSS, so the main Hero is unaffected.
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${cols}, 1fr)`,
        }}
      >
        {Array.from({ length: tileCount }).map((_, i) => (
          <div key={i} className="grid-tile" />
        ))}
      </div>
      {/* Radial gradient overlay mask — fades the grid into the bg toward the edges */}
      {edgeFade && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 62% 55%, transparent 12%, color-mix(in srgb, var(--color-bg) 55%, transparent) 45%, var(--color-bg) 75%)',
          }}
        />
      )}
    </div>
  );
}
