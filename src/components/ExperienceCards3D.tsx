import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RolePoint = {
  lead?: string;  // bolded opener (product name / hook)
  text: string;
};

type Role = {
  period: string;
  company: string;
  title?: string;
  summary: string; // bolded one-line positioning statement
  points: RolePoint[];
};

/* Ordered left → right: latest first */
const roles: Role[] = [
  {
    period: '2024–present',
    company: 'The Deliberate Break',
    summary: "Travel I'd put off for years.",
    points: [
      {
        text: 'Piano, dance, scuba, photography — the parts of me that were crowded out.',
      },
      {
        lead: 'Came back fuller, then went deep:',
        text: 'shipping AI products, not studying them — multi-agent systems, RAG, this site itself.',
      },
    ],
  },
  {
    period: '2023–2024',
    company: 'Gloroots',
    title: 'Senior Product Manager',
    summary: 'Global HR-tech. Built two products.',
    points: [
      {
        lead: 'Recrew:',
        text: 'search that gets intent — embeddings + ElasticSearch, an explainable match score, natural-language queries.',
      },
      {
        lead: 'Global Time Off:',
        text: 'statutory leave engine for 40+ countries — applications, multi-level approvals.',
      },
      {
        text: 'Employee onboarding that cuts activation under 24 hrs.',
      },
    ],
  },
  {
    period: '2021–2023',
    company: 'Siemens Healthineers',
    title: 'Senior Product Manager',
    summary: 'Two 0→1 products in regulated healthcare.',
    points: [
      {
        lead: 'Vaccine scheduling + inventory —',
        text: 'bookings driven by dose-interval logic, slots held against live stock.',
      },
      {
        lead: 'CT/MR incident management —',
        text: 'remote-first resolution, cutting avoidable field visits.',
      },
    ],
  },
  {
    period: '2018–2021',
    company: 'Carestack',
    title: 'Product Manager',
    summary: 'Cloud SaaS for multi-location dental groups.',
    points: [
      {
        lead: 'Owned the demand side:',
        text: 'online appointment booking, email campaigns, a segmentation engine for targeted patient lists.',
      },
      {
        text: 'Drag-and-drop analytics + 12 operational reports for owners.',
      },
    ],
  },
];

/* Preview-tunable constants (same convention as BeyondResume's CONFIG) */
const PIN_VH = 240;                       // pinned scroll distance, in vh
const SPREAD_UNITS = [-3, -1, 1, 3];      // gap multiples from center
const MAX_SPREAD_UNIT = 120;              // px per unit at full width → ±360px
const TILT = [-15, -7, 7, 15];            // initial card tilt (deg)
const STAGGER = 0.05;                     // flip cascade offset per card
const SPREAD_END = 1 / 2.4;               // spread completes within first ~1vh of the 240vh range

const STATIC_QUERY = '(max-width: 767px), (prefers-reduced-motion: reduce)';

/* Ornate card-back pattern (teal/silver on dark), shown before the flip */
function CardBackPattern({ uid }: { uid: number }) {
  const teal = `exp3dTeal${uid}`;
  const silver = `exp3dSilver${uid}`;
  const grid = `exp3dGrid${uid}`;
  const diamondsX = Array.from({ length: 9 }, (_, k) => 36 + k * 21);
  const diamondsY = Array.from({ length: 14 }, (_, k) => 40 + k * 21.5);
  return (
    <svg
      viewBox="0 0 240 360"
      width="240"
      height="360"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, borderRadius: 16 }}
    >
      <defs>
        <linearGradient id={teal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--exp3d-accent-hi)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--exp3d-accent-lo)' }} />
        </linearGradient>
        <linearGradient id={silver} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--exp3d-ink-hi)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--exp3d-ink-lo)' }} />
        </linearGradient>
        <pattern id={grid} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 H10 M5 0 V10" stroke={`url(#${teal})`} strokeWidth="2.5" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="240" height="360" rx="16" fill="var(--color-surface-raised)" />

      {/* frame */}
      <rect x="14" y="14" width="212" height="332" rx="10" fill="none" stroke={`url(#${teal})`} strokeWidth="5" />
      <rect x="23" y="23" width="194" height="314" rx="7" fill="none" stroke={`url(#${silver})`} strokeWidth="1" opacity="0.7" />

      {/* diamond dots along inner frame */}
      {diamondsX.map((x) => (
        <g key={`dx${x}`} fill={`url(#${silver})`} opacity="0.8">
          <rect x={x - 2} y={28} width="4" height="4" transform={`rotate(45 ${x} 30)`} />
          <rect x={x - 2} y={328} width="4" height="4" transform={`rotate(45 ${x} 330)`} />
        </g>
      ))}
      {diamondsY.map((y) => (
        <g key={`dy${y}`} fill={`url(#${silver})`} opacity="0.8">
          <rect x={28} y={y - 2} width="4" height="4" transform={`rotate(45 30 ${y})`} />
          <rect x={208} y={y - 2} width="4" height="4" transform={`rotate(45 210 ${y})`} />
        </g>
      ))}

      {/* corner + axis flourishes, mirrored from one quadrant */}
      <g stroke={`url(#${teal})`} strokeWidth="3" fill="none" strokeLinecap="round">
        {[
          '', 'scale(-1,1) translate(-240,0)',
          'scale(1,-1) translate(0,-360)', 'scale(-1,-1) translate(-240,-360)',
        ].map((t, k) => (
          <g key={k} transform={t}>
            <path d="M38 38 C70 44 80 70 66 92 C58 78 48 70 38 70" />
            <path d="M44 116 C66 110 84 122 88 142" opacity="0.9" />
            <path d="M120 36 C108 56 112 76 120 88" stroke={`url(#${silver})`} strokeWidth="2.5" />
          </g>
        ))}
      </g>
      <g fill={`url(#${silver})`} opacity="0.9">
        <circle cx="120" cy="104" r="4" />
        <circle cx="120" cy="256" r="4" />
        <circle cx="62" cy="180" r="3" />
        <circle cx="178" cy="180" r="3" />
      </g>

      {/* central eight-point star with hatch fill */}
      <g transform="translate(120 180)">
        <path
          d="M0 -62 L14 -34 L44 -44 L34 -14 L62 0 L34 14 L44 44 L14 34 L0 62 L-14 34 L-44 44 L-34 14 L-62 0 L-34 -14 L-44 -44 L-14 -34 Z"
          fill="var(--color-surface-raised)"
          stroke={`url(#${silver})`}
          strokeWidth="4"
        />
        <circle r="34" fill={`url(#${grid})`} />
        <circle r="34" fill="none" stroke={`url(#${teal})`} strokeWidth="2" />
      </g>
    </svg>
  );
}

/* Shared role copy: bold summary hook, then points with bolded leads */
function RoleBody({ role, compact }: { role: Role; compact?: boolean }) {
  const pointSize = compact ? 'text-xs leading-[1.5]' : 'text-base leading-relaxed';
  return (
    <>
      <div
        className={compact ? 'mt-2 mb-1.5' : 'mt-3 mb-2'}
        style={{ borderTop: '1px solid var(--color-surface-border)' }}
      />
      <p className={`${compact ? 'text-sm' : 'text-base'} font-semibold leading-snug text-off-white`}>
        {role.summary}
      </p>
      {role.points.map((pt, k) => (
        <div key={k} className={`flex gap-2 ${compact ? 'mt-2' : 'mt-2.5'}`}>
          <span
            className="mt-[2px] shrink-0 text-[10px] leading-none"
            style={{ color: 'var(--exp3d-accent)' }}
            aria-hidden="true"
          >
            ●
          </span>
          <p className={`${pointSize} text-muted-light`}>
            {pt.lead && <strong className="font-semibold text-off-white">{pt.lead} </strong>}
            {pt.text}
          </p>
        </div>
      ))}
    </>
  );
}

function StaticCards() {
  return (
    <div className="mx-auto mt-12 flex max-w-xl flex-col gap-5 px-6 pb-24">
      {roles.map((role) => (
        <div
          key={role.company}
          className="rounded-2xl border p-6"
          style={{
            background: 'var(--color-surface-raised)',
            borderColor: 'var(--color-surface-border)',
          }}
        >
          <p className="font-mono text-sm tracking-[0.15em] text-muted-light">{role.period}</p>
          <h3 className="font-display mt-2 text-2xl font-bold" style={{ color: 'var(--exp3d-accent)' }}>
            {role.company}
          </h3>
          {role.title && <p className="mt-1 text-base font-medium text-off-white">{role.title}</p>}
          <RoleBody role={role} />
        </div>
      ))}
    </div>
  );
}

export default function ExperienceCards3D() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const innersRef = useRef<HTMLDivElement[]>([]);
  const [isStatic, setIsStatic] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(STATIC_QUERY).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(STATIC_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsStatic(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isStatic) return; // no ScrollTriggers in the static branch

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = cardsRef.current;
      const inners = innersRef.current;
      // shrink the spread on narrow desktops so outer cards stay on-screen
      // (170 ≈ half the bounding box of a 240×360 card tilted 15°, plus breathing room)
      const spreadUnit = () =>
        Math.min(MAX_SPREAD_UNIT, (window.innerWidth / 2 - 170) / 3);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${(PIN_VH * window.innerHeight) / 100}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        // Phase 2 — spread from center (transform only)
        tl.to(
          card,
          {
            x: () => SPREAD_UNITS[i] * spreadUnit(),
            rotation: TILT[i],
            ease: 'power1.inOut',
            duration: SPREAD_END,
          },
          0
        );
        // Phase 3 — staggered flip + un-tilt
        const flipStart = 1 / 3 + i * STAGGER;
        tl.to(
          inners[i],
          { rotationY: -180, ease: 'power1.inOut', duration: 1 / 3 },
          flipStart
        );
        tl.to(
          card,
          { rotation: 0, ease: 'power1.inOut', duration: 1 / 3 },
          flipStart
        );
      });

      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === 'complete') requestAnimationFrame(refresh);
      else window.addEventListener('load', refresh);
      if (document.fonts?.ready) document.fonts.ready.then(refresh);

      return () => {
        window.removeEventListener('load', refresh);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, [isStatic]);

  return (
    <section
      ref={containerRef}
      id="experience"
      aria-label="Work experience"
      className={isStatic ? 'py-20' : 'exp3d'}
    >
      <div className={isStatic ? 'px-6 text-center' : 'exp3d__header'}>
        <span className="font-display mb-4 block text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--exp3d-accent)' }}>
          Career
        </span>
        <h2
          className="font-display font-bold leading-[0.95] tracking-[-0.025em] text-off-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Where I&rsquo;ve built
        </h2>
      </div>

      {isStatic ? (
        <StaticCards />
      ) : (
        roles.map((role, i) => (
          <div
            key={role.company}
            className="exp3d__card"
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
          >
            <div className="exp3d__float" style={{ animationDelay: `${i * 0.2}s` }}>
              <div
                className="exp3d__inner"
                ref={(el) => { if (el) innersRef.current[i] = el; }}
              >
                <div className="exp3d__front">
                  <CardBackPattern uid={i} />
                </div>
                <div className="exp3d__back">
                  <p className="font-mono text-xs tracking-[0.15em] text-muted-light">{role.period}</p>
                  <h3 className="font-display mt-1 text-lg font-bold leading-tight" style={{ color: 'var(--exp3d-accent)' }}>
                    {role.company}
                  </h3>
                  {role.title && <p className="mt-0.5 text-sm font-medium text-off-white">{role.title}</p>}
                  <RoleBody role={role} compact />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
