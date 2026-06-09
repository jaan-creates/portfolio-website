interface DecisionOption {
  name: string;
  pros: string;
  cons: string;
  chosen?: boolean;
}

interface DecisionBlockProps {
  number: string;
  label: string;
  question: string;
  context: string;
  options: [DecisionOption, DecisionOption];
  chosenLabel?: string;
  gapNote?: string;
  outcome?: {
    title: string;
    body: React.ReactNode;
    isGap?: boolean;
  };
}

export default function DecisionBlock({
  number,
  label,
  question,
  context,
  options,
  chosenLabel,
  gapNote,
  outcome,
}: DecisionBlockProps) {
  return (
    <div
      className="relative bg-surface-raised rounded-r-xl mb-6"
      style={{ borderLeft: '2px solid var(--case-accent)', padding: '32px 32px 32px 40px' }}
    >
      {/* Number badge */}
      <span
        className="absolute font-mono bg-bg rounded px-1 py-0.5"
        style={{
          left: '-1.25rem',
          top: '32px',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'var(--case-accent)',
        }}
      >
        {number}
      </span>

      {/* Label */}
      <span
        className="block font-mono uppercase tracking-[0.12em] mb-3"
        style={{ fontSize: 'var(--step--1)', color: 'var(--case-accent)' }}
      >
        {label}
      </span>

      {/* Question */}
      <h4
        className="font-display font-medium text-off-white mb-4 leading-snug"
        style={{ fontSize: 'var(--step-1)' }}
      >
        {question}
      </h4>

      {/* Context */}
      <p
        className="text-muted-light leading-relaxed mb-6"
        style={{ fontSize: 'var(--step--1)', maxWidth: '600px' }}
      >
        {context}
      </p>

      {/* Options grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {options.map(({ name, pros, cons, chosen }) => (
          <div
            key={name}
            className="rounded-lg p-4"
            style={{
              border: chosen
                ? '0.5px solid rgba(34,197,94,0.4)'
                : '0.5px solid rgba(255,255,255,0.06)',
              background: chosen ? 'rgba(34,197,94,0.05)' : '#232328',
            }}
          >
            <p
              className="font-sans font-semibold uppercase tracking-[0.04em] mb-2"
              style={{
                fontSize: '13px',
                color: chosen ? '#22C55E' : '#A1A1AA',
              }}
            >
              {name}
            </p>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: '13px' }}>
              <strong style={{ color: '#22C55E', fontSize: '12px' }}>Pro: </strong>
              {pros}
            </p>
            <p className="text-muted-light leading-relaxed mt-1" style={{ fontSize: '13px' }}>
              <strong style={{ color: '#F87171', fontSize: '12px' }}>Con: </strong>
              {cons}
            </p>
          </div>
        ))}
      </div>

      {/* Chosen label */}
      {chosenLabel && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded mb-3 font-sans font-medium"
          style={{
            background: 'rgba(34,197,94,0.1)',
            border: '0.5px solid rgba(34,197,94,0.3)',
            color: '#22C55E',
            fontSize: '12px',
          }}
        >
          {chosenLabel}
        </div>
      )}

      {/* Gap note */}
      {gapNote && (
        <p
          className="text-muted-light italic opacity-60 mb-3"
          style={{ fontSize: '14px' }}
        >
          {gapNote}
        </p>
      )}

      {/* Outcome */}
      {outcome && (
        <div
          className="rounded-md mt-4 p-4"
          style={{
            background: '#232328',
            border: '0.5px solid rgba(255,255,255,0.06)',
          }}
        >
          <strong
            className="block font-mono uppercase tracking-[0.1em] text-muted-light mb-2"
            style={{ fontSize: '10px' }}
          >
            {outcome.title}
          </strong>
          <div
            className={`leading-relaxed ${outcome.isGap ? 'text-muted-light italic opacity-60' : 'text-muted-light'}`}
            style={{ fontSize: '14px' }}
          >
            {outcome.body}
          </div>
        </div>
      )}
    </div>
  );
}
