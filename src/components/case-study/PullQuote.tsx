interface PullQuoteProps {
  children: React.ReactNode;
}

export default function PullQuote({ children }: PullQuoteProps) {
  return (
    <div className="my-10 text-center max-w-2xl mx-auto px-4">
      <div
        aria-hidden="true"
        className="font-display leading-none select-none mb-2"
        style={{
          fontSize: '6rem',
          color: 'var(--case-accent)',
          lineHeight: 0.7,
          opacity: 0.6,
        }}
      >
        "
      </div>
      <blockquote
        className="font-display font-medium text-off-white italic leading-snug"
        style={{ fontSize: 'var(--step-2)' }}
      >
        {children}
      </blockquote>
    </div>
  );
}
