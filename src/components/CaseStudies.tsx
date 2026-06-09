import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface CaseStudyItem {
  id: string;
  title: string;
  company: string;
  domain: string;
  hook: string;
  accent: string;
  href: string | null;
  status: 'live' | 'soon';
  readTime: string;
}

const caseStudies: CaseStudyItem[] = [
  {
    id: '01',
    title: 'The Driver No One Heard',
    company: 'Rapido',
    domain: 'Mobility',
    hook: 'I rode with drivers for two weeks and found a product problem hiding in plain sight.',
    accent: '#FFD11A',
    href: '/case-studies/rapido',
    status: 'live',
    readTime: '8 min',
  },
  {
    id: '02',
    title: 'Reducing Cancellations in Telehealth',
    company: 'Plum Health',
    domain: 'Healthcare',
    hook: 'Telehealth had a trust problem, not a feature gap. I mapped the whole journey to find it.',
    accent: '#E8517F',
    href: '/case-studies/plum',
    status: 'live',
    readTime: '7 min',
  },
  {
    id: '03',
    title: 'Leafy Luxe',
    company: 'Health & Glow',
    domain: 'Beauty-Tech',
    hook: 'Before "AI features" were a mandate, I designed one that actually knew your skin.',
    accent: '#F07A1E',
    href: '/case-studies/health-and-glow',
    status: 'live',
    readTime: '6 min',
  },
  {
    id: '04',
    title: 'Pet-Z: Zero to One',
    company: 'Pet-Z',
    domain: 'Pet Care',
    hook: 'Market sizing, personas, two-sided marketplace. The full 0→1 playbook.',
    accent: '#6C7BF5',
    href: null,
    status: 'soon',
    readTime: '',
  },
  {
    id: '05',
    title: 'The Push Notification Playbook',
    company: 'Thought Leadership',
    domain: 'Research',
    hook: "A teardown of how India's biggest apps use psychology to get you to tap.",
    accent: '#7F77DD',
    href: '/case-studies/push-notifications',
    status: 'live',
    readTime: '15 min',
  },
  {
    id: '06',
    title: 'Paradox of Choice',
    company: 'Swiggy',
    domain: 'Food-Tech',
    hook: "When every option is a good option, that's the product problem.",
    accent: '#FF6B35',
    href: null,
    status: 'soon',
    readTime: '',
  },
];

function DomainPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="font-sans text-xs font-medium px-3 py-1 rounded-full inline-block"
      style={{ backgroundColor: `${accent}26`, color: accent }}
    >
      {label}
    </span>
  );
}

function WorkCard({ item }: { item: CaseStudyItem }) {
  const isLive = item.status === 'live';

  const inner = (
    <div
      className="work-card group relative overflow-hidden rounded-2xl flex flex-col h-full"
      style={{
        backgroundColor: '#1A1A1F',
        borderLeft: '3px solid transparent',
        padding: '28px',
        minHeight: '260px',
        transition: isLive
          ? 'transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease'
          : 'none',
        cursor: isLive ? 'pointer' : 'default',
      }}
      onMouseEnter={
        isLive
          ? (e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-5px)';
              el.style.borderColor = item.accent;
            }
          : undefined
      }
      onMouseLeave={
        isLive
          ? (e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = 'transparent';
            }
          : undefined
      }
    >
      {/* Background chapter number — bottom right */}
      <span
        aria-hidden="true"
        className="absolute font-display font-bold select-none pointer-events-none"
        style={{
          fontSize: '110px',
          color: item.accent,
          opacity: 0.07,
          lineHeight: 1,
          right: '12px',
          bottom: '-6px',
        }}
      >
        {item.id}
      </span>

      {/* Right accent gradient — base layer (live only) */}
      {isLive && (
        <>
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${item.accent}14, transparent)`,
            }}
          />
          {/* Hover overlay — deepens on hover */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to left, ${item.accent}28, transparent)`,
            }}
          />
        </>
      )}

      {/* Soon pill */}
      {item.status === 'soon' && (
        <span
          className="absolute top-5 right-5 font-sans text-xs px-2.5 py-1 rounded-full z-10"
          style={{ backgroundColor: '#232328', color: '#A1A1AA' }}
        >
          Coming soon
        </span>
      )}

      {/* Card content */}
      <div className="relative z-10 flex flex-col gap-3 flex-1">
        {/* Top: chapter + company name */}
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs"
            style={{ color: isLive ? item.accent : '#4B5563', opacity: 0.8 }}
          >
            {item.id}
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: isLive ? item.accent : '#4B5563', opacity: 0.5 }}
            aria-hidden="true"
          >
            ·
          </span>
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: isLive ? item.accent : '#4B5563' }}
          >
            {item.company}
          </span>
        </div>

        {/* Domain pill */}
        <div>
          <DomainPill label={item.domain} accent={item.accent} />
        </div>

        {/* Title + hook — grows to fill space */}
        <div className="flex flex-col gap-2 flex-1">
          <h3
            className="font-display font-bold text-off-white leading-snug"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
          >
            {item.title}
          </h3>
          <p className="font-sans text-muted-light text-sm leading-relaxed">
            {item.hook}
          </p>
        </div>

        {/* Bottom: readTime + hover CTA */}
        <div className="flex items-center justify-between pt-3 mt-auto">
          {item.readTime ? (
            <span className="font-mono text-xs text-muted-light">{item.readTime}</span>
          ) : (
            <span />
          )}
          {isLive && (
            <span
              className="font-sans text-sm font-medium opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 inline-block"
              style={{ color: item.accent }}
            >
              Read the case →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isLive && item.href) {
    return (
      <Link to={item.href} className="block h-full" style={{ textDecoration: 'none' }}>
        {inner}
      </Link>
    );
  }

  return <div className="h-full">{inner}</div>;
}

export default function CaseStudies() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.work-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="w-full bg-bg px-8 md:px-16 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-muted-light mb-4 block">
          THE WORK
        </span>
        <h2
          className="font-display font-semibold text-off-white mb-4"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Six products. Six different worlds.
        </h2>
        <p
          className="font-sans text-muted-light mb-16 max-w-[640px] leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
        >
          Every one started by asking the person no one else thought to ask.
        </p>

        {/* Uniform 2-col grid — all 6 cards equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">
          {caseStudies.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
