import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import PerspectiveGrid from './PerspectiveGrid';

export default function Hero() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const [glowActive, setGlowActive] = useState(false);

  useEffect(() => {
    // Portrait fade-in and slide-up on load
    if (portraitRef.current) {
      const img = portraitRef.current.querySelector('img');
      if (img) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
          gsap.set(img, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            img,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!portraitRef.current) return;
    const elem = portraitRef.current;
    elem.addEventListener('mouseenter', () => setGlowActive(true));
    elem.addEventListener('mouseleave', () => setGlowActive(false));
    return () => {
      elem.removeEventListener('mouseenter', () => setGlowActive(true));
      elem.removeEventListener('mouseleave', () => setGlowActive(false));
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-bg flex items-start"
    >
      {/* Background perspective grid */}
      <PerspectiveGrid />

      {/* Glow orb behind portrait */}
      <div
        className="absolute bottom-32 right-0 z-10 pointer-events-none select-none transition-opacity duration-400"
        style={{
          width: '500px',
          height: '500px',
          opacity: glowActive ? 1 : 0,
          background: 'radial-gradient(circle, rgba(127,119,221,0.25), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Portrait — anchored bottom-right, bleeds off edge */}
      <div
        ref={portraitRef}
        className="absolute bottom-0 right-0 z-10 pointer-events-none select-none"
        style={{ height: '70%' }}
      >
        <img
          src="/My_image.png"
          alt="Janu portrait"
          className="portrait-mask h-full w-auto object-contain object-bottom translate-x-[8%] animate-float"
          style={{
            maxWidth: 'none',
            background: 'transparent',
            WebkitMask: `
              linear-gradient(to right, transparent 0%, black 25%),
              linear-gradient(to bottom, black 75%, transparent 100%)
            `,
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
        />
      </div>

      {/* Hero text — upper left, above everything */}
      <div className="relative z-20 flex flex-col gap-5 pt-36 px-8 md:px-16 lg:px-24 max-w-xl">
        {/* Eyebrow */}
        <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-accent-purple">
          AI Product Builder
        </span>

        {/* Main heading */}
        <h1 className="font-display font-semibold leading-none text-off-white"
          style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
        >
          Janu<span className="text-accent-green">.</span>
        </h1>

        {/* One-liner */}
        <p className="font-sans text-base md:text-lg text-muted-light leading-relaxed max-w-xs">
          PM who ships AI — from idea to live URL.
        </p>

        {/* CTA */}
        <a
          href="#work"
          className="mt-2 inline-flex items-center gap-2 self-start border border-off-white/20 hover:border-accent-purple/60 text-off-white/80 hover:text-off-white text-sm font-sans font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-accent-purple/10 group"
        >
          View the work
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
