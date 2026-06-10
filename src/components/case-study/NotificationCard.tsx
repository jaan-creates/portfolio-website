import { useTheme } from '../../contexts/ThemeContext';

interface NotifIcon {
  label: string;
  bg: string;
  color?: string;
  fontSize?: string;
  letterSpacing?: string;
}

interface NotifButton {
  label: string;
  accentColor?: string;
}

export type NotifVariant = 'default' | 'dark' | 'ios' | 'red';
export type ChipVariant = 'cp' | 'co' | 'cg' | 'cb' | 'cs' | 'cr';

interface NotificationCardProps {
  icon: NotifIcon;
  appName: string;
  appNameColor: string;
  timestamp?: string;
  title: string;
  body?: string;
  buttons?: NotifButton[];
  variant?: NotifVariant;
  animDelay?: string;
  chipLabel?: string;
  chipVariant?: ChipVariant;
}

// VARIANT_STYLES is computed inside the component to be theme-aware for the ios variant

const CHIP_STYLES: Record<ChipVariant, React.CSSProperties> = {
  cp: { background: 'rgba(127,119,221,0.07)', color: '#A78BFA', border: '0.5px solid rgba(127,119,221,0.4)' },
  co: { background: 'rgba(249,115,22,0.06)',  color: '#F97316', border: '0.5px solid rgba(249,115,22,0.35)' },
  cg: { background: 'rgba(34,197,94,0.06)',   color: '#22C55E', border: '0.5px solid rgba(34,197,94,0.35)' },
  cb: { background: 'rgba(167,139,250,0.07)', color: '#A78BFA', border: '0.5px solid rgba(167,139,250,0.35)' },
  cs: { background: 'rgba(167,139,250,0.08)', color: '#A78BFA', border: '0.5px solid rgba(167,139,250,0.4)' },
  cr: { background: 'rgba(34,197,94,0.07)',   color: '#22C55E', border: '0.5px solid rgba(34,197,94,0.38)' },
};

export default function NotificationCard({
  icon,
  appName,
  appNameColor,
  timestamp,
  title,
  body,
  buttons,
  variant = 'default',
  animDelay,
  chipLabel,
  chipVariant = 'cp',
}: NotificationCardProps) {
  const { theme } = useTheme();
  const isIos = variant === 'ios';

  const variantStyle: React.CSSProperties = {
    default: { background: '#1C1C21',                             borderColor: 'rgba(255,255,255,0.13)' },
    dark:    { background: '#0d0d12',                             borderColor: 'rgba(255,255,255,0.13)' },
    ios:     { background: theme === 'light' ? '#1C1C21' : 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.13)' },
    red:     { background: 'rgba(239,68,68,0.04)',                borderColor: 'rgba(239,68,68,0.22)' },
  }[variant];

  const titleColor = isIos ? '#fff' : '#FAFAF9';
  const bodyColor  = isIos ? 'rgba(255,255,255,0.55)' : '#9CA3AF';
  const timeColor  = isIos ? 'rgba(255,255,255,0.3)'  : '#6B7280';

  return (
    <div
      className="notif-card-glow rounded-xl"
      style={{
        padding: '12px 14px',
        border: `0.5px solid ${variantStyle.borderColor}`,
        background: variantStyle.background as string,
        animationDelay: animDelay,
      }}
    >
      {/* Optional type chip */}
      {chipLabel && (
        <div className="mb-2">
          <span
            className="font-mono font-medium rounded"
            style={{
              padding: '2px 8px',
              fontSize: '9px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              ...CHIP_STYLES[chipVariant],
            }}
          >
            {chipLabel}
          </span>
        </div>
      )}

      {/* Header row */}
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-md font-bold"
          style={{
            width: '22px',
            height: '22px',
            background: icon.bg,
            color: icon.color ?? '#fff',
            fontSize: icon.fontSize ?? '11px',
            letterSpacing: icon.letterSpacing,
          }}
        >
          {icon.label}
        </div>
        <span
          className="font-sans font-semibold"
          style={{ fontSize: '11px', letterSpacing: '0.02em', color: appNameColor }}
        >
          {appName}
        </span>
        {timestamp && (
          <span className="font-mono ml-auto" style={{ fontSize: '10px', color: timeColor }}>
            {timestamp}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="font-sans font-bold leading-snug mb-1" style={{ fontSize: '13px', color: titleColor }}>
        {title}
      </p>

      {/* Body */}
      {body && (
        <p className="font-sans leading-relaxed" style={{ fontSize: '12px', color: bodyColor }}>
          {body}
        </p>
      )}

      {/* Action buttons */}
      {buttons && buttons.length > 0 && (
        <div className="flex gap-1.5 mt-2">
          {buttons.map((btn, i) => (
            <span
              key={i}
              className="font-sans font-semibold rounded-md px-2.5 py-1"
              style={{
                fontSize: '11px',
                border: btn.accentColor
                  ? `0.5px solid ${btn.accentColor}66`
                  : '0.5px solid rgba(255,255,255,0.14)',
                background: btn.accentColor
                  ? `${btn.accentColor}26`
                  : 'rgba(255,255,255,0.07)',
                color: btn.accentColor ?? '#9CA3AF',
              }}
            >
              {btn.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
