export type TypeDefVariant = 'purple' | 'green' | 'orange' | 'blue';

interface TypeDefinitionProps {
  variant?: TypeDefVariant;
  children: React.ReactNode;
}

const COLORS: Record<TypeDefVariant, string> = {
  purple: '#7F77DD',
  green:  '#22C55E',
  orange: '#F97316',
  blue:   '#A78BFA',
};

export default function TypeDefinition({ variant = 'purple', children }: TypeDefinitionProps) {
  const color = COLORS[variant];
  return (
    <div
      className="rounded-r-xl mb-5"
      style={{
        background: '#141417',
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        borderRight: '0.5px solid rgba(255,255,255,0.08)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        borderLeft: `2px solid ${color}`,
        padding: '18px 22px',
      }}
    >
      <p
        className="font-mono uppercase tracking-[0.1em] mb-2"
        style={{ fontSize: '9px', color }}
      >
        What it is
      </p>
      <div
        className="font-sans text-muted-light leading-relaxed"
        style={{ fontSize: '13px', lineHeight: '1.68' }}
      >
        {children}
      </div>
    </div>
  );
}
