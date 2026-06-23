import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { useTheme } from '../contexts/ThemeContext';

const links = [
  { label: 'Building', href: '#builder-projects' },
  { label: 'Work', href: '#work-experience' },
  { label: 'Case Studies', href: '#work' },
  { label: 'Beyond', href: '#personality-gallery' },
  { label: 'Contact', href: '#contact' },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotionRef = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const iconTransition = prefersReducedMotionRef.current
    ? 'none'
    : 'transform 0.3s ease';

  // AI variant (janu-portfolio) drops the scrolled border line so it doesn't
  // cut across the scroll-driven hero. Main site nav is unchanged.
  const isAi = import.meta.env.VITE_SITE_VARIANT === 'ai';

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur',
        scrolled
          ? isAi
            ? 'bg-bg/80 py-4'
            : 'bg-bg/80 border-b border-surface-border py-4'
          : 'bg-transparent py-6'
      )}
    >
      <nav className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleAnchorClick(e, '#hero')}
          className="font-display font-semibold text-off-white text-xl tracking-tight hover:text-accent-purple transition-colors duration-300"
        >
          Janu<span className="text-accent-green">.</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="font-sans text-sm text-muted-light hover:text-off-white transition-colors duration-300 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-purple group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className={clsx(
            'hidden md:flex items-center gap-2 text-xs font-sans font-medium px-4 py-2 rounded-full transition-all duration-300',
            'border border-surface-border hover:border-accent-purple/40 hover:bg-surface-raised',
            'text-muted-light hover:text-off-white',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
          )}
        >
          <span
            style={{
              display: 'block',
              transition: iconTransition,
              transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </span>
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-full border border-surface-border text-muted-light transition-all duration-300 hover:border-accent-purple/40 hover:text-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span
              style={{
                display: 'block',
                transition: iconTransition,
                transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>
          <button
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="w-5 h-px bg-off-white/70" />
            <span className="w-4 h-px bg-off-white/70" />
            <span className="w-5 h-px bg-off-white/70" />
          </button>
        </div>
      </nav>
    </header>
  );
}
