import { useTheme } from '../../contexts/ThemeContext';

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

const MMT_LOGO = '/assets/push playbook/makemytrip.png';

export default function BiasCard({
  biasType,
  variant,
  notifTimestamp,
  notifTitle,
  notifBody,
  explanation,
}: BiasCardProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const chip = CHIP_STYLES[variant];

  // Embedded notification mockup mirrors the OS: white card in light mode, dark in dark mode
  const notifBg     = isLight ? '#FFFFFF' : '#1C1C21';
  const notifBorder = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.13)';
  const titleColor  = isLight ? '#1A1A1F' : '#FAFAF9';
  const bodyColor   = isLight ? '#4B5563' : '#9CA3AF';
  const timeColor   = isLight ? '#9CA3AF' : '#6B7280';
  // Brand amber darkened for contrast on white
  const appNameColor = isLight ? 'color-mix(in srgb, #fbbf24 50%, #1A1A1F)' : '#fbbf24';

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-surface-border)',
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
          background: notifBg,
          border: `0.5px solid ${notifBorder}`,
        }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <img
            src={MMT_LOGO}
            alt="MakeMyTrip logo"
            width={18}
            height={18}
            className="flex-shrink-0 rounded"
            style={{ width: '18px', height: '18px', objectFit: 'cover' }}
          />
          <span className="font-sans font-semibold" style={{ fontSize: '10px', color: appNameColor }}>
            MakeMyTrip
          </span>
          <span className="font-mono ml-auto" style={{ fontSize: '9px', color: timeColor }}>
            {notifTimestamp}
          </span>
        </div>
        <p className="font-sans font-bold leading-snug mb-0.5" style={{ fontSize: '12px', color: titleColor }}>
          {notifTitle}
        </p>
        <p className="font-sans leading-relaxed" style={{ fontSize: '11px', color: bodyColor }}>
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
