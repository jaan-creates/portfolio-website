export type BiasVariant = 'rec' | 'sca' | 'unc' | 'los' | 'nov';

interface BiasCardProps {
  biasType: string;
  variant: BiasVariant;
  notifTimestamp: string;
  notifTitle: string;
  notifBody: string;
  explanation: React.ReactNode;
}

const CHIP_STYLES: Record<BiasVariant, { bg: string; color: string; border: string }> = {
  rec: { bg: 'rgba(167,139,250,0.1)', color: '#A78BFA', border: 'rgba(167,139,250,0.35)' },
  sca: { bg: 'rgba(249,115,22,0.1)',  color: '#F97316', border: 'rgba(249,115,22,0.35)'  },
  unc: { bg: 'rgba(127,119,221,0.1)', color: '#7F77DD', border: 'rgba(127,119,221,0.35)' },
  los: { bg: 'rgba(239,68,68,0.1)',   color: '#fca5a5', border: 'rgba(239,68,68,0.3)'    },
  nov: { bg: 'rgba(34,197,94,0.08)',  color: '#22C55E', border: 'rgba(34,197,94,0.3)'    },
};

// Shared MMT icon for all bias cards
const MMT_ICON = { bg: 'linear-gradient(135deg,#b71c1c,#d32f2f)', label: 'my' };

export default function BiasCard({
  biasType,
  variant,
  notifTimestamp,
  notifTitle,
  notifBody,
  explanation,
}: BiasCardProps) {
  const chip = CHIP_STYLES[variant];

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: '#141417',
        border: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Bias type chip */}
      <span
        className="inline-flex items-center font-mono font-semibold rounded mb-3"
        style={{
          padding: '3px 9px',
          fontSize: '9px',
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          background: chip.bg,
          color: chip.color,
          border: `0.5px solid ${chip.border}`,
        }}
      >
        {biasType}
      </span>

      {/* Embedded notification mockup */}
      <div
        className="rounded-lg p-2.5 mb-3"
        style={{
          background: '#1C1C21',
          border: '0.5px solid rgba(255,255,255,0.13)',
        }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <div
            className="flex-shrink-0 flex items-center justify-center rounded font-bold"
            style={{
              width: '18px',
              height: '18px',
              background: MMT_ICON.bg,
              color: '#fff',
              fontSize: '8px',
            }}
          >
            {MMT_ICON.label}
          </div>
          <span className="font-sans font-semibold" style={{ fontSize: '10px', color: '#fbbf24' }}>
            MakeMyTrip
          </span>
          <span className="font-mono ml-auto" style={{ fontSize: '9px', color: '#6B7280' }}>
            {notifTimestamp}
          </span>
        </div>
        <p className="font-sans font-bold leading-snug mb-0.5" style={{ fontSize: '12px' }}>
          {notifTitle}
        </p>
        <p className="font-sans text-muted-light leading-relaxed" style={{ fontSize: '11px' }}>
          {notifBody}
        </p>
      </div>

      {/* Explanation */}
      <p className="font-sans text-muted-light leading-relaxed" style={{ fontSize: '12px' }}>
        {explanation}
      </p>
    </div>
  );
}
