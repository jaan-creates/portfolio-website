// TODO: Build out project cards with live URLs, tech stack chips, and scroll-triggered reveals

export default function BuilderProjects() {
  return (
    <section
      id="builder-projects"
      className="min-h-screen w-full bg-bg flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
    >
      <div className="max-w-6xl mx-auto w-full">
        <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-accent-green mb-4 block">
          Side Projects
        </span>
        <h2 className="font-display font-semibold text-off-white mb-16"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Things I&rsquo;m building
        </h2>

        {/* Placeholder grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-surface-border bg-surface p-8 flex flex-col gap-4 hover:border-accent-purple/30 transition-colors duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-raised border border-surface-border" />
              <div className="flex-1">
                <div className="h-5 w-32 rounded bg-surface-raised mb-3" />
                <div className="h-3 w-full rounded bg-surface-raised mb-2" />
                <div className="h-3 w-3/4 rounded bg-surface-raised" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-6 w-16 rounded-full bg-surface-raised" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
