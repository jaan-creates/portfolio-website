import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { lenis } from '../App';
import { useTheme } from '../contexts/ThemeContext';

interface CaseStudyLayoutProps {
  title: string;
  company: string;
  domain: string;
  accentColor: string;
  lightAccentColor?: string;
  lightAccentLargeTextOnly?: boolean;
  readTime: string;
  children: React.ReactNode;
}

export default function CaseStudyLayout({
  title,
  company,
  domain,
  accentColor,
  lightAccentColor,
  lightAccentLargeTextOnly = false,
  readTime,
  children,
}: CaseStudyLayoutProps) {
  const { theme } = useTheme();
  const progressRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const resolvedAccent =
    theme === 'light' && lightAccentColor ? lightAccentColor : accentColor;
  const accentBg = `${resolvedAccent}26`;
  // Badge text: if light and the accent is large-text-only, fall back to body text color
  const badgeTextColor =
    theme === 'light' && lightAccentLargeTextOnly
      ? 'var(--color-off-white)'
      : resolvedAccent;

  useEffect(() => {
    const onLenisScroll = ({ scroll }: { scroll: number }) => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scroll / totalHeight : 0;

      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }
      setShowBackToTop(scroll > 400);
    };

    lenis.on('scroll', onLenisScroll);
    return () => lenis.off('scroll', onLenisScroll);
  }, []);

  const scrollToTop = () => {
    lenis.scrollTo(0, { duration: prefersReducedMotion ? 0 : 1 });
  };

  return (
    <div
      className="bg-bg text-off-white min-h-screen font-sans"
      style={{ '--case-accent': resolvedAccent } as React.CSSProperties}
    >
      {/* Reading progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: '0%',
          backgroundColor: resolvedAccent,
          zIndex: 100,
          transition: prefersReducedMotion ? 'none' : 'width 0.1s linear',
        }}
      />

      {/* Sticky top bar */}
      <div
        className="sticky top-0 z-50 border-b border-surface-border nav-blur"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg) 85%, transparent)' }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/#work"
            className="font-sans text-sm text-muted-light hover:text-off-white transition-colors duration-200 flex items-center gap-1.5"
          >
            ← The Work
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="font-sans text-xs font-medium px-3 py-1 rounded-full"
              style={{ backgroundColor: accentBg, color: badgeTextColor }}
            >
              {company}
            </span>
            <span
              className="font-sans text-xs font-medium px-3 py-1 rounded-full"
              style={{ backgroundColor: accentBg, color: badgeTextColor }}
            >
              {domain}
            </span>
          </div>
        </div>
      </div>

      {/* Page hero */}
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-0">
        <h1
          className="font-display font-bold text-off-white leading-tight"
          style={{ fontSize: 'var(--step-4)' }}
        >
          {title}
        </h1>
        <p className="text-muted-light mt-3" style={{ fontSize: 'var(--step--1)' }}>
          {readTime}
        </p>
        <hr className="border-surface-border my-10" />
      </div>

      {/* Body content */}
      <div className="max-w-3xl mx-auto px-6 pb-28">
        {children}
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 w-10 h-10 rounded-full bg-surface-raised border border-surface-border text-muted-light flex items-center justify-center hover:text-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        style={{
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? 'translateY(0)' : 'translateY(8px)',
          pointerEvents: showBackToTop ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = resolvedAccent;
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
