interface Finding {
  icon: string;
  title: string;
  body: React.ReactNode;
}

interface FindingGridProps {
  findings: Finding[];
}

export default function FindingGrid({ findings }: FindingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      {findings.map(({ icon, title, body }, i) => (
        <div
          key={i}
          className="bg-surface-raised rounded-xl p-6"
          style={{ borderLeft: '2px solid var(--case-accent)' }}
        >
          <div className="text-2xl mb-3" aria-hidden="true">
            {icon}
          </div>
          <h4
            className="font-display font-semibold text-off-white mb-2 leading-snug"
            style={{ fontSize: 'var(--step-0)' }}
          >
            {title}
          </h4>
          <p
            className="text-muted-light leading-relaxed"
            style={{ fontSize: 'var(--step--1)' }}
          >
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}
