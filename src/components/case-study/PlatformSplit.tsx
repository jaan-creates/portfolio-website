interface PlatformRow {
  key: string;
  value: string;
  valueColor?: string;
}

interface Platform {
  name: string;
  icon: string;
  iconBg: string;
  rows: PlatformRow[];
}

interface PlatformSplitProps {
  platforms: [Platform, Platform];
}

export default function PlatformSplit({ platforms }: PlatformSplitProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-xl overflow-hidden my-5"
      style={{ background: 'var(--color-surface-border)' }}
    >
      {platforms.map(({ name, icon, iconBg, rows }) => (
        <div key={name} className="bg-surface-raised p-5">
          {/* Platform header */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: iconBg }}
            >
              {icon}
            </div>
            <span className="font-display font-bold text-off-white" style={{ fontSize: 'var(--step-0)', letterSpacing: '-0.2px' }}>
              {name}
            </span>
          </div>
          {/* Key-value rows */}
          <div className="flex flex-col gap-0">
            {rows.map(({ key, value, valueColor }, i) => (
              <div
                key={key}
                className="flex items-center justify-between py-1.5"
                style={{
                  borderBottom: i < rows.length - 1 ? '0.5px solid var(--color-surface-border)' : 'none',
                }}
              >
                <span className="font-sans text-muted-light" style={{ fontSize: 'var(--step--1)' }}>{key}</span>
                <span
                  className="font-mono font-medium"
                  style={{ fontSize: 'var(--step--1)', color: valueColor ?? 'var(--color-off-white)' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
