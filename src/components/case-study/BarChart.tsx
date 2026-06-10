import { useEffect, useRef, useState } from 'react';

export type BarColorVariant = 'ec' | 'md' | 'bf' | 'sw' | 'ot';

interface BarRow {
  label: string;
  percentage: number;  // 0-100 for bar width
  displayValue: string;
  colorVariant: BarColorVariant;
}

interface BarChartProps {
  title: string;
  rows: BarRow[];
}

const BAR_GRADIENT: Record<BarColorVariant, string> = {
  ec: 'linear-gradient(90deg,#F97316,#f59e0b)',
  md: 'linear-gradient(90deg,#7F77DD,#A78BFA)',
  bf: 'linear-gradient(90deg,#3b82f6,#60a5fa)',
  sw: 'rgba(127,119,221,0.6)',
  ot: '#252530',
};

export default function BarChart({ title, rows }: BarChartProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-xl p-5 my-5"
      style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
    >
      <p
        className="font-mono uppercase tracking-[0.1em] text-muted-light mb-4"
        style={{ fontSize: '10px' }}
      >
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {rows.map(({ label, percentage, displayValue, colorVariant }) => (
          <div key={label} className="flex items-center gap-3">
            <span
              className="font-sans text-muted-light text-right flex-shrink-0"
              style={{ fontSize: '11px', width: '160px', minWidth: '120px' }}
            >
              {label}
            </span>
            <div
              className="flex-1 rounded-full overflow-hidden"
              style={{ height: '6px', background: 'var(--color-surface-raised)' }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: '3px',
                  background: BAR_GRADIENT[colorVariant],
                  width: visible ? `${percentage}%` : '0%',
                  transition: visible ? 'width 0.8s ease' : 'none',
                }}
              />
            </div>
            <span
              className="font-mono flex-shrink-0"
              style={{ fontSize: '10px', color: 'var(--color-muted)', width: '40px' }}
            >
              {displayValue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
