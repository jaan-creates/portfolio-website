import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

const links = [
  { label: 'Building', href: '#builder-projects' },
  { label: 'Work', href: '#work-experience' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Beyond', href: '#personality-gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur',
        scrolled
          ? 'bg-bg/80 border-b border-surface-border py-4'
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

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => handleAnchorClick(e, '#contact')}
          className="hidden md:flex items-center gap-2 text-xs font-sans font-medium text-accent-purple border border-accent-purple/30 hover:border-accent-purple/70 hover:bg-accent-purple/10 px-4 py-2 rounded-full transition-all duration-300"
        >
          Available
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
        </a>

        {/* Mobile menu — simple */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className="w-5 h-px bg-off-white/70" />
          <span className="w-4 h-px bg-off-white/70" />
          <span className="w-5 h-px bg-off-white/70" />
        </button>
      </nav>
    </header>
  );
}
