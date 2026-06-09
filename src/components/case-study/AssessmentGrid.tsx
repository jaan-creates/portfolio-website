interface AssessmentItem {
  key: string;
  description: string;
}

interface AssessmentGridProps {
  done: AssessmentItem[];
  improve: AssessmentItem[];
}

export default function AssessmentGrid({ done, improve }: AssessmentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 mb-2">
      {/* Done right — green */}
      <div
        className="rounded-lg p-5"
        style={{
          background: 'rgba(34,197,94,0.05)',
          border: '0.5px solid rgba(34,197,94,0.2)',
          borderLeft: '2px solid #22C55E',
        }}
      >
        <p
          className="font-mono uppercase tracking-[0.1em] font-medium mb-4 flex items-center gap-2"
          style={{ fontSize: '10px', color: '#22C55E' }}
        >
          <span>✓</span> Done right
        </p>
        <div className="flex flex-col gap-3">
          {done.map(({ key, description }) => (
            <div key={key} className="flex gap-2 items-start">
              <span
                className="flex-shrink-0 mt-1.5 rounded-full"
                style={{ width: '5px', height: '5px', background: '#22C55E', minWidth: '5px' }}
                aria-hidden="true"
              />
              <div>
                <p className="font-sans font-medium mb-0.5" style={{ fontSize: '12px', color: '#22C55E' }}>
                  {key}
                </p>
                <p className="font-sans text-muted-light leading-relaxed" style={{ fontSize: '12px' }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room to improve — orange */}
      <div
        className="rounded-lg p-5"
        style={{
          background: 'rgba(249,115,22,0.05)',
          border: '0.5px solid rgba(249,115,22,0.2)',
          borderLeft: '2px solid #F97316',
        }}
      >
        <p
          className="font-mono uppercase tracking-[0.1em] font-medium mb-4 flex items-center gap-2"
          style={{ fontSize: '10px', color: '#F97316' }}
        >
          <span>↑</span> Room to improve
        </p>
        <div className="flex flex-col gap-3">
          {improve.map(({ key, description }) => (
            <div key={key} className="flex gap-2 items-start">
              <span
                className="flex-shrink-0 mt-1.5 rounded-full"
                style={{ width: '5px', height: '5px', background: '#F97316', minWidth: '5px' }}
                aria-hidden="true"
              />
              <div>
                <p className="font-sans font-medium mb-0.5" style={{ fontSize: '12px', color: '#F97316' }}>
                  {key}
                </p>
                <p className="font-sans text-muted-light leading-relaxed" style={{ fontSize: '12px' }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
