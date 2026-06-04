// TODO: Add photo gallery, reading list, interests, or personality-revealing content

export default function PersonalityGallery() {
  return (
    <section
      id="personality-gallery"
      className="min-h-screen w-full bg-bg flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
    >
      <div className="max-w-6xl mx-auto w-full">
        <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-accent-orange mb-4 block">
          The human behind the product
        </span>
        <h2 className="font-display font-semibold text-off-white mb-16"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Beyond the resume
        </h2>

        {/* Masonry-style placeholder grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {[
            'aspect-square',
            'aspect-[3/4]',
            'aspect-[4/3]',
            'aspect-square',
            'aspect-[4/3]',
            'aspect-[3/4]',
            'aspect-square',
            'aspect-[4/3]',
          ].map((aspect, i) => (
            <div
              key={i}
              className={`rounded-xl bg-surface-raised border border-surface-border w-full break-inside-avoid ${aspect}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
