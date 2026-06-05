interface CaseStudySectionProps {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}

export default function CaseStudySection({
  eyebrow,
  heading,
  children,
}: CaseStudySectionProps) {
  return (
    <section className="mb-16">
      <p
        className="uppercase text-muted-light tracking-[0.12em] mb-2"
        style={{ fontSize: 'var(--step--1)' }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-display font-bold"
        style={{ fontSize: 'var(--step-2)', color: 'var(--case-accent)' }}
      >
        {heading}
      </h2>
      <div className="w-10 h-[2px] bg-surface-border mt-2 mb-6" />
      <div
        className="text-off-white leading-[1.75]"
        style={{ fontSize: 'var(--step-0)' }}
      >
        {children}
      </div>
    </section>
  );
}
