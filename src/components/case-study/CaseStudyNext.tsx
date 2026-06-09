import { Link } from 'react-router-dom';

interface CaseStudyNextProps {
  href: string;
  title: string;
  label?: string;
}

export default function CaseStudyNext({
  href,
  title,
  label = 'Next case study',
}: CaseStudyNextProps) {
  const isPlaceholder = href === '#' || !href;
  const isGap = title.startsWith('←');

  const inner = (
    <div className="flex items-center justify-between gap-4 p-7 md:p-8 bg-surface-raised border border-surface-border rounded-xl transition-all duration-300 group">
      <div>
        <p
          className="font-mono uppercase tracking-[0.1em] text-muted-light mb-2"
          style={{ fontSize: 'var(--step--1)' }}
        >
          {label}
        </p>
        <p
          className={`font-display font-medium leading-snug transition-colors duration-300 ${
            isGap
              ? 'text-muted-light italic opacity-60'
              : 'text-muted-light group-hover:text-off-white'
          }`}
          style={{ fontSize: 'var(--step-1)' }}
        >
          {title}
        </p>
      </div>
      <span
        className="text-2xl flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: 'var(--case-accent)' }}
        aria-hidden="true"
      >
        →
      </span>
    </div>
  );

  if (isPlaceholder) {
    return <div className="mt-16">{inner}</div>;
  }

  return (
    <Link
      to={href}
      className="block mt-16"
      style={{ textDecoration: 'none' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget.firstElementChild as HTMLElement;
        if (el) el.style.borderColor = 'var(--case-accent)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget.firstElementChild as HTMLElement;
        if (el) el.style.borderColor = '';
      }}
    >
      {inner}
    </Link>
  );
}
