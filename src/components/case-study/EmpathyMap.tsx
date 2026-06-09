interface EmpathyQuadrant {
  title: string;
  titleColor: string;
  chipBg: string;
  chipColor: string;
  chips: string[];
}

interface EmpathyMapProps {
  subject: string;
  intro?: string;
  quadrants: [EmpathyQuadrant, EmpathyQuadrant, EmpathyQuadrant, EmpathyQuadrant];
}

export default function EmpathyMap({ subject, intro, quadrants }: EmpathyMapProps) {
  return (
    <div className="mt-6">
      {intro && (
        <p
          className="text-muted-light leading-relaxed mb-6"
          style={{ fontSize: 'var(--step-0)' }}
        >
          {intro}
        </p>
      )}

      <div className="bg-surface-raised border border-surface-border rounded-xl overflow-hidden">
        {/* Relative wrapper for center circle overlay */}
        <div className="relative">
          <div
            className="grid grid-cols-2 gap-px"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {quadrants.map(({ title, titleColor, chipBg, chipColor, chips }) => (
              <div key={title} className="bg-surface-raised p-6 min-h-[180px]">
                <p
                  className="font-mono uppercase tracking-[0.12em] mb-4 font-medium"
                  style={{ fontSize: 'var(--step--1)', color: titleColor }}
                >
                  {title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip, i) => (
                    <span
                      key={i}
                      className="rounded px-2.5 py-1 font-sans leading-snug"
                      style={{
                        fontSize: 'var(--step--1)',
                        background: chipBg,
                        color: chipColor,
                        border: `0.5px solid ${chipColor}33`,
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Center circle */}
          <div
            className="absolute rounded-full flex items-center justify-center text-center pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '64px',
              height: '64px',
              background: '#1A1A1F',
              border: '1.5px solid var(--case-accent)',
              zIndex: 10,
            }}
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.08em', color: 'var(--case-accent)' }}
            >
              {subject}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
