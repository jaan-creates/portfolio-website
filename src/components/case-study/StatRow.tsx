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
        background: 'var(--color-surface-border)',
      }}
    >
      {stats.map((stat, i) => {
        const valueColor = stat.color
          ? stat.color
          : stat.isPrimary
          ? 'var(--case-accent)'
          : 'var(--color-off-white)';
        return (
          <div key={i} className="bg-surface-raised px-4 py-7 md:px-6 md:py-8 text-center">
            <div
              className="font-mono font-medium leading-none mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: valueColor, whiteSpace: 'nowrap' }}
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
