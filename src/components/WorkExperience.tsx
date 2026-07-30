import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlockReveal from './BlockReveal';

const stats = [
  {
    n: '6',
    sup: '+',
    label: 'Years in product',
    desc: 'In HR-tech, health-tech, and dental SaaS — regulated, high-stakes environments where product decisions carry real compliance and human consequences.',
  },
  {
    n: '1',
    sup: null,
    label: 'Year in AI product',
    desc: 'Semantic search, vector retrieval, LLM-powered querying, explainable scoring. The calls that defined it: what to weight, what to exclude on bias grounds, when to choose a worse model for a better user outcome.',
  },
  {
    n: '0→1',
    sup: null,
    label: 'Every time',
    desc: 'No inherited roadmaps. Strategy, model behaviour, compliance edge cases — all set from scratch, from blank doc to live product.',
  },
];

interface Bullet {
  text: string;
  aside?: boolean;
}

interface Role {
  title: string;
  company: string;
  domain: string;
  dates: string;
  active?: boolean;
  bullets: Bullet[];
}

const roles: Role[] = [
  {
    title: 'Building in AI',
    company: 'Deliberate break',
    domain: 'Active re-engagement',
    dates: 'Sep 2024 — Present',
    active: true,
    bullets: [
      {
        text: 'Shipping AI products end-to-end — **multi-agent orchestration, RAG pipelines, and eval-driven LLM workflows** — to rebuild hands-on builder depth alongside the PM judgment.',
      },
    ],
  },
  {
    title: 'Senior Product Manager',
    company: 'Gloroots',
    domain: 'AI Talent Matching & Global HR',
    dates: 'Sep 2023 — Aug 2024',
    bullets: [
      {
        text: 'Led **0→1 of an AI job-discovery platform**: aggregation pipeline (headless scrapers → object storage → Elasticsearch), semantic retrieval with vector embeddings, and a weighted explainable match-scoring model.',
      },
      {
        text: 'Chose an **interpretable model over a black-box ranker** — so candidates could see why a job matched. Made it bias-aware: excluded name, prestige, and graduation year; weighted education low to avoid penalising self-taught engineers.',
      },
      {
        text: 'Designed the v2 cross-encoder reranker and recruiter-feedback flywheel — architected pre-departure, not in production.',
        aside: true,
      },
      {
        text: 'Shipped enterprise **Time-Off across multi-country statutory rules** — 80% adoption in 3 months, 100% enterprise RBAC uptake in 90 days, +10 onboarding NPS.',
      },
    ],
  },
  {
    title: 'Senior Product Manager',
    company: 'Siemens Healthineers',
    domain: 'Healthcare',
    dates: 'Sep 2021 — Jun 2023',
    bullets: [
      {
        text: 'Launched a **cloud vaccine scheduling & inventory platform** for hospitals — modelled dose-interval logic resilient to mid-rollout WHO/CDC guidance changes. $50K in initial contracts.',
      },
      {
        text: 'Built **real-time incident management for CT/MR scanners** on device telemetry and smart parts-dispatch — ~$100K/month in support-cost reduction for enterprise clients.',
      },
      {
        text: 'Owned product end-to-end under **HIPAA, GDPR, and country-specific compliance** requirements.',
      },
    ],
  },
  {
    title: 'Product Manager',
    company: 'Carestack',
    domain: 'Dental SaaS',
    dates: 'Apr 2018 — Aug 2021',
    bullets: [
      {
        text: 'Owned the **clinic-operations suite** — online appointments, drag-and-drop analytics dashboards, and 12+ business-specific reports — for dental practices running on the platform daily.',
      },
      {
        text: 'Shipped **Twilio video consultations at speed during COVID** to protect patient retention when in-person care stopped.',
      },
      {
        text: 'Online-appointment line grew **35% YoY**.',
      },
    ],
  },
];

function parseBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <b key={i} className="text-off-white font-medium">
        {part}
      </b>
    ) : (
      part
    )
  );
}

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.we-stat').forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 14,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });
        gsap.utils.toArray<HTMLElement>('.we-item').forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 14,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });
      });
      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work-experience"
      ref={sectionRef}
      className="w-full bg-bg py-24 md:py-32 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-3xl mx-auto w-full">

        {/* Eyebrow */}
        <span className="font-display text-xs font-semibold tracking-[0.28em] uppercase text-accent-orange mb-5 block">
          Career
        </span>

        {/* Heading */}
        <BlockReveal animateOnScroll blockColor="var(--color-accent-orange)" className="mb-7">
          <h2
            className="font-display font-bold text-off-white leading-[0.95] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Where I&rsquo;ve<br />worked
          </h2>
        </BlockReveal>

        {/* Thesis */}
        <BlockReveal animateOnScroll blockColor="var(--color-accent-orange)" className="mb-16">
          <p
            className="border-l-2 border-accent-orange pl-5 leading-relaxed font-sans"
            style={{ color: 'var(--color-muted)', fontSize: 'clamp(0.9375rem, 1.9vw, 1.125rem)', maxWidth: '38rem' }}
          >
            Give me a real problem and a team that moves —{' '}
            <strong className="text-off-white font-medium">I&rsquo;ll ship</strong>.
            Six years close to the businesses I build for, across HR-tech, health-tech,
            and dental SaaS. The last year, in AI.
          </p>
        </BlockReveal>

        {/* Stat strip */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 mb-20"
          style={{
            borderTop: '1px solid var(--color-surface-border)',
            borderBottom: '1px solid var(--color-surface-border)',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`we-stat py-9 ${i > 0 ? 'sm:border-l sm:border-surface-border sm:pl-10 border-t border-surface-border pt-6 sm:pt-9' : ''}`}
            >
              <span
                className="font-display font-bold text-off-white block mb-2.5 leading-none tracking-[-0.03em]"
                style={{ fontSize: 'clamp(3.25rem, 7vw, 5rem)' }}
              >
                {s.n}
                {s.sup && (
                  <sup className="text-[0.45em] align-super tracking-normal text-accent-orange">
                    {s.sup}
                  </sup>
                )}
              </span>
              <span
                className="block font-sans font-medium uppercase tracking-[0.03em] mb-1.5"
                style={{ fontSize: '0.8125rem', color: 'var(--color-muted-light)' }}
              >
                {s.label}
              </span>
              <span
                className="block font-sans leading-[1.55]"
                style={{ fontSize: '0.875rem', color: 'var(--color-muted)', maxWidth: '15rem' }}
              >
                {s.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div
          className="relative"
          style={{ paddingLeft: '1.75rem' }}
        >
          {/* vertical line */}
          <div
            className="absolute top-2.5 bottom-2.5"
            style={{
              left: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, var(--color-accent-purple) 0%, color-mix(in srgb, var(--color-accent-purple) 30%, transparent) 30%, var(--color-surface-border) 100%)',
            }}
          />

          {roles.map((role) => (
            <div key={`${role.company}-${role.dates}`} className="we-item relative pb-14 last:pb-0">

              {/* dot */}
              <span
                className="absolute top-1.5 rounded-full"
                style={{
                  left: '-2.125rem',
                  width: '13px',
                  height: '13px',
                  background: role.active ? 'var(--color-accent-purple)' : 'var(--color-bg)',
                  border: `2px solid ${role.active ? 'var(--color-accent-purple)' : 'var(--color-muted-light)'}`,
                  boxShadow: role.active
                    ? '0 0 0 4px rgba(127,119,221,0.18), 0 0 20px rgba(127,119,221,0.45)'
                    : undefined,
                }}
              />

              {/* head row */}
              <div className="flex justify-between items-start gap-6 mb-1.5 flex-wrap">
                <h3
                  className="font-display font-semibold text-off-white leading-tight"
                  style={{ fontSize: 'clamp(1.0625rem, 2.2vw, 1.25rem)' }}
                >
                  {role.title}
                </h3>
                <span
                  className="font-sans font-medium tracking-[0.04em] whitespace-nowrap pt-0.5"
                  style={{ fontSize: '0.75rem', color: 'var(--color-muted-light)' }}
                >
                  {role.dates}
                </span>
              </div>

              {/* company line */}
              <p
                className="font-sans font-medium tracking-[0.02em] mb-4"
                style={{ fontSize: '0.8125rem', color: 'var(--color-accent-orange)' }}
              >
                {role.company}
                <span style={{ color: 'var(--color-muted-light)', padding: '0 0.5rem' }}>·</span>
                {role.domain}
              </p>

              {/* bullets */}
              <ul className="flex flex-col gap-2">
                {role.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="relative pl-4 leading-relaxed font-sans"
                    style={{
                      fontSize: '0.90625rem',
                      color: b.aside ? 'var(--color-muted-light)' : 'var(--color-muted)',
                      fontStyle: b.aside ? 'italic' : undefined,
                    }}
                  >
                    <span
                      className="absolute left-0 rounded-full"
                      style={{
                        top: '0.5625rem',
                        width: '5px',
                        height: '5px',
                        background: 'var(--color-accent-purple)',
                        opacity: 0.6,
                      }}
                    />
                    {parseBold(b.text)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Program Director aside */}
        <div
          className="mt-14 pt-7 flex justify-between items-baseline gap-5 flex-wrap"
          style={{ borderTop: '1px solid var(--color-surface-border)' }}
        >
          <div>
            <p
              className="font-display font-semibold"
              style={{ fontSize: '0.9375rem', color: 'var(--color-muted)' }}
            >
              Program Director — Women in Product / The Product Folks
            </p>
            <p
              className="font-sans mt-1"
              style={{ fontSize: '0.8125rem', color: 'var(--color-muted-light)' }}
            >
              Built mentorship programs for 200+ women PMs · 4.8/5 across 4 cohorts
            </p>
          </div>
          <span
            className="font-sans font-medium tracking-[0.03em] whitespace-nowrap"
            style={{ fontSize: '0.75rem', color: 'var(--color-muted-light)' }}
          >
            Mar 2022 — 2024
          </span>
        </div>

      </div>
    </section>
  );
}
