interface FlowStep {
  icon: string;
  label: string;
}

interface PipelineFlowProps {
  steps: FlowStep[];
}

export default function PipelineFlow({ steps }: PipelineFlowProps) {
  return (
    <div className="flex items-center flex-wrap gap-1 my-6 overflow-x-auto pb-1">
      {steps.map(({ icon, label }, i) => (
        <div key={i} className="flex items-center gap-1">
          {/* Step */}
          <div className="flex flex-col items-center gap-2 min-w-[72px] px-1">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{
                background: 'var(--color-surface-raised)',
                border: '0.5px solid var(--color-surface-border)',
              }}
            >
              {icon}
            </div>
            <p
              className="font-mono uppercase text-center leading-snug text-muted-light"
              style={{ fontSize: 'var(--step--1)', letterSpacing: '0.05em' }}
            >
              {label}
            </p>
          </div>
          {/* Arrow */}
          {i < steps.length - 1 && (
            <span className="text-muted-light opacity-30 font-mono text-sm flex-shrink-0 pb-5">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
