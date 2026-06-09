interface Stat {
  value: string;
  label: string;
  isPrimary?: boolean;
  color?: string; // explicit hex overrides isPrimary
}

interface StatRowProps {
  stats: Stat[];
}

export default function StatRow({ stats }: StatRowProps) {
  return (
    <div
      className="grid gap-px rounded-xl overflow-hidden mb-10"
      style={{
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        background: 'rgba(255,255,255,0.06)',
      }}
    >
      {stats.map((stat, i) => {
        const valueColor = stat.color
          ? stat.color
          : stat.isPrimary
          ? 'var(--case-accent)'
          : '#FAFAF9';
        return (
          <div key={i} className="bg-surface-raised px-6 py-8 md:px-8 md:py-9 text-center">
            <div
              className="font-mono font-medium leading-none mb-3"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: valueColor }}
            >
              {stat.value}
            </div>
            <div
              className="font-sans text-muted-light leading-snug"
              style={{ fontSize: 'var(--step--1)' }}
            >
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
