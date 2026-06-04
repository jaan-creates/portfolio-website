// TODO: Add full case study cards with cover images, problem/solution summaries, and outcome metrics

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="min-h-screen w-full bg-bg flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
    >
      <div className="max-w-6xl mx-auto w-full">
        <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-accent-purple mb-4 block">
          Portfolio
        </span>
        <h2 className="font-display font-semibold text-off-white mb-16"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Selected work
        </h2>

        {/* Featured case study placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large featured card */}
          <div className="lg:row-span-2 rounded-2xl border border-surface-border bg-surface overflow-hidden group cursor-pointer hover:border-accent-purple/40 transition-colors duration-300">
            <div className="aspect-video bg-surface-raised w-full" />
            <div className="p-8 flex flex-col gap-4">
              <div className="h-4 w-20 rounded-full bg-accent-purple/20 border border-accent-purple/30" />
              <div>
                <div className="h-6 w-3/4 rounded bg-surface-raised mb-2" />
                <div className="h-4 w-full rounded bg-surface-raised mb-1.5" />
                <div className="h-4 w-2/3 rounded bg-surface-raised" />
              </div>
            </div>
          </div>

          {/* Two smaller cards */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-surface-border bg-surface overflow-hidden group cursor-pointer hover:border-accent-green/40 transition-colors duration-300"
            >
              <div className="aspect-[3/1] bg-surface-raised w-full" />
              <div className="p-6 flex flex-col gap-3">
                <div className="h-4 w-16 rounded-full bg-accent-green/20 border border-accent-green/30" />
                <div>
                  <div className="h-5 w-2/3 rounded bg-surface-raised mb-2" />
                  <div className="h-3 w-full rounded bg-surface-raised" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
