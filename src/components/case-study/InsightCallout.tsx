interface InsightCalloutProps {
  label: string;
  children: React.ReactNode;
}

export default function InsightCallout({ label, children }: InsightCalloutProps) {
  return (
    <div
      className="mt-7 mb-2 rounded-r-xl"
      style={{
        borderLeft: '2px solid var(--case-accent)',
        background: 'rgba(127,119,221,0.05)',
        padding: '18px 22px',
      }}
    >
      <p
        className="font-mono uppercase tracking-[0.12em] mb-2"
        style={{ fontSize: '9px', color: 'var(--case-accent)' }}
      >
        {label}
      </p>
      <div
        className="font-sans text-muted-light leading-relaxed"
        style={{ fontSize: '14px', lineHeight: '1.72' }}
      >
        {children}
      </div>
    </div>
  );
}
