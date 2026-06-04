const TILE_COUNT = 18 * 18;

export default function PerspectiveGrid() {
  return (
    <div className="perspective-container absolute inset-0 w-full h-full">
      <div className="grid-inner">
        {Array.from({ length: TILE_COUNT }).map((_, i) => (
          <div key={i} className="grid-tile" />
        ))}
      </div>
      {/* Radial gradient overlay mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 62% 55%, transparent 12%, rgba(13,13,15,0.55) 45%, #0D0D0F 75%)',
        }}
      />
    </div>
  );
}
