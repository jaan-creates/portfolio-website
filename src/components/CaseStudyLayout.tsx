import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface CaseStudyLayoutProps {
  title: string;
  company: string;
  domain: string;
  accentColor: string;
  readTime: string;
  children: React.ReactNode;
}

export default function CaseStudyLayout({
  title,
  company,
  domain,
  accentColor,
  readTime,
  children,
}: CaseStudyLayoutProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;

      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }
      setShowBackToTop(scrollY > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 15% opacity hex suffix
  const accentBg = `${accentColor}26`;

  return (
    <div
      className="bg-bg text-off-white min-h-screen font-sans"
      style={{ '--case-accent': accentColor } as React.CSSProperties}
    >
      {/* Reading progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: '0%',
          backgroundColor: accentColor,
          zIndex: 100,
          transition: prefersReducedMotion ? 'none' : 'width 0.1s linear',
        }}
        ref={progressRef}
        aria-hidden="true"
      />

      {/* Sticky top bar */}
      <div
        className="sticky top-0 z-50 border-b border-surface-border nav-blur"
        style={{ backgroundColor: 'rgba(13,13,15,0.8)' }}
      >
        <div className="max-w-[720px] mx-auto px-8 md:px-16 py-4 flex items-center justify-between">
          <Link
            to="/#work"
            className="font-sans text-sm text-muted-light hover:text-off-white transition-colors duration-200 flex items-center gap-1.5"
          >
            ← The Work
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="font-sans text-xs font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: accentBg,
                color: accentColor,
                fontSize: 'var(--step--1)',
              }}
            >
              {company}
            </span>
            <span
              className="font-sans text-xs font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: accentBg,
                color: accentColor,
                fontSize: 'var(--step--1)',
              }}
            >
              {domain}
            </span>
          </div>
        </div>
      </div>

      {/* Page hero */}
      <div className="max-w-[720px] mx-auto px-8 md:px-16 pt-24 pb-0">
        <h1
          className="font-display font-bold text-off-white leading-tight"
          style={{ fontSize: 'var(--step-4)' }}
        >
          {title}
        </h1>
        <p
          className="text-muted-light mt-3"
          style={{ fontSize: 'var(--step--1)' }}
        >
          {readTime}
        </p>
        <hr className="border-surface-border my-12" />
      </div>

      {/* Body content */}
      <div className="max-w-[720px] mx-auto px-8 md:px-16 pb-24">
        {children}
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 w-10 h-10 rounded-full bg-surface-raised border border-surface-border text-muted-light flex items-center justify-center transition-all duration-200 hover:text-off-white"
        style={{
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? 'translateY(0)' : 'translateY(8px)',
          pointerEvents: showBackToTop ? 'auto' : 'none',
          borderColor: showBackToTop ? undefined : undefined,
          transition: 'opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '';
        }}
      >
        ↑
      </button>
    </div>
  );
}
