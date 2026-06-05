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
    accent: '#5E7D3A',
    href: null,
    status: 'soon',
    readTime: '',
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
      className="font-sans text-xs font-medium px-3 py-1 rounded-full"
      style={{
        backgroundColor: `${accent}26`,
        color: accent,
      }}
    >
      {label}
    </span>
  );
}

function FeaturedCard({ item }: { item: CaseStudyItem }) {
  return (
    <Link
      to={item.href!}
      className="work-card group relative overflow-hidden rounded-2xl flex flex-col justify-end md:col-span-2"
      style={{
        minHeight: '240px',
        backgroundColor: '#1A1A1F',
        borderLeft: '3px solid transparent',
        transition: 'border-color 0.25s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = item.accent;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
      }}
    >
      {/* Giant background chapter number */}
      <span
        aria-hidden="true"
        className="absolute font-display font-bold select-none pointer-events-none"
        style={{
          fontSize: '180px',
          color: item.accent,
          opacity: 0.08,
          lineHeight: 1,
          left: '24px',
          bottom: '-16px',
        }}
      >
        {item.id}
      </span>

      {/* Right gradient base */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-[35%] pointer-events-none"
        style={{
          background: `linear-gradient(to left, ${item.accent}1A, transparent)`,
        }}
      />
      {/* Right gradient hover overlay */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-[35%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to left, ${item.accent}29, transparent)`,
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 p-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <DomainPill label={item.domain} accent={item.accent} />
          {item.readTime && (
            <span className="font-sans text-xs text-muted-light">
              {item.readTime}
            </span>
          )}
        </div>
        <h3 className="font-display font-bold text-off-white text-2xl md:text-3xl leading-tight max-w-lg">
          {item.title}
        </h3>
        <p className="font-sans text-muted-light text-sm max-w-md leading-relaxed">
          {item.hook}
        </p>
        <span
          className="font-sans text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 inline-block"
          style={{ color: item.accent }}
        >
          Read the case →
        </span>
      </div>
    </Link>
  );
}

function GridCard({ item }: { item: CaseStudyItem }) {
  const isLive = item.status === 'live';

  const inner = (
    <div
      className="work-card group h-full flex flex-col gap-4"
      style={{
        backgroundColor: '#1A1A1F',
        borderRadius: '16px',
        padding: '32px',
        borderLeft: '3px solid transparent',
        transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease',
        cursor: isLive ? 'pointer' : 'default',
        position: 'relative',
      }}
      onMouseEnter={
        isLive
          ? (e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-6px)';
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
      {item.status === 'soon' && (
        <span
          className="absolute top-5 right-5 font-sans text-xs px-2.5 py-1 rounded-full"
          style={{ backgroundColor: '#232328', color: '#A1A1AA' }}
        >
          Coming soon
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="font-sans text-xs text-muted-light">{item.id}</span>
        <DomainPill label={item.domain} accent={item.accent} />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="font-display font-bold text-off-white leading-snug"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
        >
          {item.title}
        </h3>
        <p className="font-sans text-muted-light text-sm leading-relaxed">
          {item.hook}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        {item.readTime && (
          <span className="font-sans text-xs text-muted-light">
            {item.readTime}
          </span>
        )}
        {isLive && (
          <span
            className="font-sans text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: item.accent }}
          >
            Read →
          </span>
        )}
      </div>
    </div>
  );

  if (isLive && item.href) {
    return (
      <Link to={item.href} className="block">
        {inner}
      </Link>
    );
  }
  return <div>{inner}</div>;
}

function WideCard({ item }: { item: CaseStudyItem }) {
  return (
    <div
      className="work-card md:col-span-2 rounded-2xl"
      style={{
        backgroundColor: '#1A1A1F',
        padding: '32px',
        borderLeft: '3px solid transparent',
        position: 'relative',
      }}
    >
      <span
        className="absolute top-5 right-5 font-sans text-xs px-2.5 py-1 rounded-full"
        style={{ backgroundColor: '#232328', color: '#A1A1AA' }}
      >
        Coming soon
      </span>
      <div className="flex flex-col gap-3 max-w-xl">
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs text-muted-light">{item.id}</span>
          <DomainPill label={item.domain} accent={item.accent} />
        </div>
        <h3
          className="font-display font-bold text-off-white leading-snug"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
        >
          {item.title}
        </h3>
        <p className="font-sans text-muted-light text-sm leading-relaxed">
          {item.hook}
        </p>
      </div>
    </div>
  );
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
            delay: i * 0.1,
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

  const [featured, ...rest] = caseStudies;
  const gridItems = rest.slice(0, 4);
  const wideItem = rest[4];

  return (
    <section
      id="work"
      className="w-full bg-bg px-8 md:px-16 lg:px-24 py-24"
    >
      <div className="max-w-6xl mx-auto w-full">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeaturedCard item={featured} />
          {gridItems.map((item) => (
            <GridCard key={item.id} item={item} />
          ))}
          <WideCard item={wideItem} />
        </div>
      </div>
    </section>
  );
}
