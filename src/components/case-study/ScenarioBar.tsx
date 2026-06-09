interface ScenarioBarProps {
  label: string;  // e.g. "Day 1 · Scenario"
  text: string;
}

export default function ScenarioBar({ label, text }: ScenarioBarProps) {
  return (
    <div
      className="mb-4 mt-6 rounded-r-lg"
      style={{
        borderLeft: '2px solid var(--case-accent)',
        padding: '10px 16px',
        background: 'rgba(127,119,221,0.06)',
      }}
    >
      <p
        className="font-mono uppercase tracking-[0.12em] mb-1"
        style={{ fontSize: '9px', color: 'var(--case-accent)' }}
      >
        {label}
      </p>
      <p
        className="font-sans font-medium text-off-white"
        style={{ fontSize: '13px', lineHeight: 1.5 }}
      >
        {text}
      </p>
    </div>
  );
}
