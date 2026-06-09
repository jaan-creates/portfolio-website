interface MetaCell {
  label: string;
  value: string;
  isGap?: boolean;
}

interface CaseStudyMetaProps {
  cells: MetaCell[];
}

export default function CaseStudyMeta({ cells }: CaseStudyMetaProps) {
  return (
    <div
      className="grid gap-px rounded-xl overflow-hidden mb-14"
      style={{
        gridTemplateColumns: `repeat(${Math.min(cells.length, 4)}, 1fr)`,
        background: 'rgba(255,255,255,0.06)',
      }}
    >
      {cells.map(({ label, value, isGap }) => (
        <div key={label} className="bg-surface-raised px-6 py-5 md:px-8 md:py-6">
          <span
            className="block uppercase tracking-[0.1em] text-muted-light mb-2 font-mono"
            style={{ fontSize: 'var(--step--1)' }}
          >
            {label}
          </span>
          <span
            className={`font-display font-medium block leading-snug ${
              isGap ? 'text-muted-light italic opacity-60' : 'text-off-white'
            }`}
            style={{ fontSize: 'var(--step-0)' }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
