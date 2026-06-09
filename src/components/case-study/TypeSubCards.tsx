export type SubCardVariant = 'p' | 'o' | 'g';

interface TypeSubCard {
  variant: SubCardVariant;
  chipLabel: string;
  heading: string;
  body: string;
  example: string;
}

interface TypeSubCardsProps {
  cards: TypeSubCard[];
}

const TOP_BAR: Record<SubCardVariant, string> = {
  p: 'linear-gradient(90deg,#7F77DD,#A78BFA)',
  o: 'linear-gradient(90deg,#F97316,#f59e0b)',
  g: 'linear-gradient(90deg,#22C55E,#86efac)',
};

const CHIP_STYLE: Record<SubCardVariant, React.CSSProperties> = {
  p: { background: 'rgba(127,119,221,0.07)', color: '#A78BFA', border: '0.5px solid rgba(127,119,221,0.4)' },
  o: { background: 'rgba(249,115,22,0.06)',  color: '#F97316', border: '0.5px solid rgba(249,115,22,0.35)' },
  g: { background: 'rgba(34,197,94,0.06)',   color: '#22C55E', border: '0.5px solid rgba(34,197,94,0.35)' },
};

export default function TypeSubCards({ cards }: TypeSubCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
      {cards.map(({ variant, chipLabel, heading, body, example }) => (
        <div
          key={chipLabel}
          className="rounded-xl p-4 relative overflow-hidden"
          style={{
            background: '#1C1C21',
            border: '0.5px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: TOP_BAR[variant] }}
            aria-hidden="true"
          />
          {/* Chip */}
          <span
            className="inline-flex items-center font-mono font-semibold rounded mb-3"
            style={{
              padding: '2px 8px',
              fontSize: '9px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              ...CHIP_STYLE[variant],
            }}
          >
            {chipLabel}
          </span>
          <h4
            className="font-display font-bold text-off-white mb-2 leading-snug"
            style={{ fontSize: '14px', letterSpacing: '-0.3px' }}
          >
            {heading}
          </h4>
          <p className="font-sans text-muted-light leading-relaxed mb-3" style={{ fontSize: '12px' }}>
            {body}
          </p>
          <p
            className="font-sans italic text-muted-light rounded px-2 py-1.5"
            style={{
              fontSize: '11px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '5px',
            }}
          >
            {example}
          </p>
        </div>
      ))}
    </div>
  );
}
