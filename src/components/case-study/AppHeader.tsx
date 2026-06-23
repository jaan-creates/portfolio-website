interface AppHeaderProps {
  icon: {
    src?: string;
    label?: string;
    bg?: string;
    color?: string;
    fontSize?: string;
    letterSpacing?: string;
  };
  name: string;
  subtitle: string;
}

export default function AppHeader({ icon, name, subtitle }: AppHeaderProps) {
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-xl mb-5"
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-surface-border)',
      }}
    >
      {icon.src ? (
        <img
          src={icon.src}
          alt={`${name} logo`}
          width={44}
          height={44}
          className="flex-shrink-0 rounded-xl"
          style={{ width: '44px', height: '44px', objectFit: 'cover' }}
        />
      ) : (
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-xl font-bold"
          style={{
            width: '44px',
            height: '44px',
            background: icon.bg,
            color: icon.color ?? '#fff',
            fontSize: icon.fontSize ?? '14px',
            letterSpacing: icon.letterSpacing,
          }}
        >
          {icon.label}
        </div>
      )}
      <div>
        <p
          className="font-display font-bold text-off-white"
          style={{ fontSize: '22px', letterSpacing: '-0.5px', lineHeight: 1 }}
        >
          {name}
        </p>
        <p className="font-sans text-muted-light mt-0.5" style={{ fontSize: '13px' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
