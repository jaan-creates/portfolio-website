// TODO: Populate with real work history — company name, role, dates, key achievements

export default function WorkExperience() {
  return (
    <section
      id="work-experience"
      className="min-h-screen w-full bg-bg flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-accent-orange mb-4 block">
          Career
        </span>
        <h2 className="font-display font-semibold text-off-white mb-16"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Where I&rsquo;ve worked
        </h2>

        {/* Timeline placeholder */}
        <div className="relative border-l border-surface-border pl-8 flex flex-col gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[2.35rem] top-1.5 w-3 h-3 rounded-full border-2 border-accent-purple bg-bg" />
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="h-5 w-48 rounded bg-surface-raised mb-2" />
                    <div className="h-4 w-32 rounded bg-surface-raised" />
                  </div>
                  <div className="h-4 w-24 rounded bg-surface-raised flex-shrink-0" />
                </div>
                <div className="flex flex-col gap-1.5">
                  {[1, 2].map((j) => (
                    <div key={j} className="h-3 w-full rounded bg-surface-raised" />
                  ))}
                  <div className="h-3 w-2/3 rounded bg-surface-raised" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
