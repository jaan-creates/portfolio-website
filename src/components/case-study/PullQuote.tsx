interface PullQuoteProps {
  children: React.ReactNode;
}

export default function PullQuote({ children }: PullQuoteProps) {
  return (
    <div
      className="my-10 relative rounded-xl px-8 py-7"
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-surface-border)',
        borderLeft: '3px solid var(--case-accent)',
      }}
    >
      <span
        aria-hidden="true"
        className="font-display leading-none select-none absolute"
        style={{
          top: '12px',
          left: '20px',
          fontSize: '3rem',
          color: 'var(--case-accent)',
          lineHeight: 1,
          opacity: 0.35,
        }}
      >
        "
      </span>
      <blockquote
        className="font-display font-medium text-off-white italic leading-snug pl-4"
        style={{ fontSize: 'var(--step-1)' }}
      >
        {children}
      </blockquote>
    </div>
  );
}
