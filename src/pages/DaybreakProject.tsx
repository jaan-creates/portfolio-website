import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { lenis } from '../App';
import { useTheme } from '../contexts/ThemeContext';
import ZoomableImage from '../components/ZoomableImage';

const DARK_ACCENT = '#F97316';
const LIGHT_ACCENT = '#C2410C';

function ImgPlaceholder({
  label,
  caption,
  accent,
  aspect = 'aspect-video',
  src,
  containerClassName = 'w-full rounded-xl overflow-hidden',
}: {
  label: string;
  caption: string;
  accent: string;
  aspect?: string;
  src?: string;
  containerClassName?: string;
}) {
  return (
    <figure className="my-2">
      {src ? (
        <ZoomableImage
          src={src}
          alt={caption || label}
          containerClassName={containerClassName}
          className="w-full h-auto object-contain"
        />
      ) : (
        <div
          className={`w-full ${aspect} rounded-xl flex items-center justify-center bg-surface-raised`}
          style={{ border: `1.5px dashed ${accent}40` }}
        >
          <span className="font-mono text-xs tracking-widest" style={{ color: `${accent}70` }}>
            [ {label} ]
          </span>
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-light italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ZoomableVideo({ src, caption }: { src: string; caption: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <>
      <figure className="my-2">
        <div
          className="relative rounded-xl overflow-hidden cursor-zoom-in"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
        >
          <video
            ref={(el) => {
              if (!el) return;
              const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) el.play(); },
                { threshold: 0.25 }
              );
              obs.observe(el);
            }}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto block"
          />
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            style={{ background: 'rgba(0,0,0,0.18)', opacity: showHint ? 1 : 0 }}
          />
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg pointer-events-none transition-opacity duration-200"
            style={{
              background: 'rgba(13,13,15,0.8)',
              backdropFilter: 'blur(8px)',
              border: '0.5px solid rgba(255,255,255,0.12)',
              opacity: showHint ? 1 : 0,
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>zoom</span>
          </div>
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-light italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video viewer"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-lg z-10"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', lineHeight: 0 }}
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="rounded-xl"
            style={{ maxWidth: '90vw', maxHeight: '88vh' }}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            className="absolute bottom-5 right-5 px-3 py-1.5 rounded-lg text-xs font-mono"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.5)' }}
          >
            Esc to close
          </div>
        </div>
      )}
    </>
  );
}

function PullQ({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <blockquote className="my-8 pl-5 py-1" style={{ borderLeft: `3px solid ${accent}` }}>
      <p className="text-off-white italic leading-relaxed" style={{ fontSize: 'var(--step-1)' }}>
        {children}
      </p>
    </blockquote>
  );
}

function SectionHeading({
  eyebrow,
  heading,
  accent,
}: {
  eyebrow: string;
  heading: string;
  accent: string;
}) {
  return (
    <div className="mb-6">
      <p
        className="font-mono text-xs uppercase tracking-[0.16em] mb-3"
        style={{ color: accent }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-display font-semibold text-off-white"
        style={{ fontSize: 'var(--step-2)' }}
      >
        {heading}
      </h2>
      <div className="mt-3 h-px w-10" style={{ backgroundColor: accent }} />
    </div>
  );
}

export default function DaybreakProject() {
  const { theme } = useTheme();
  const ACCENT = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  const ACCENT_BG = `${ACCENT}1A`;
  const ACCENT_BORDER = `${ACCENT}40`;
  const progressRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const onLenisScroll = ({ scroll }: { scroll: number }) => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scroll / totalHeight : 0;
      if (progressRef.current) progressRef.current.style.width = `${progress * 100}%`;
      setShowBackToTop(scroll > 400);
    };
    lenis.on('scroll', onLenisScroll);
    return () => lenis.off('scroll', onLenisScroll);
  }, []);

  const scrollToTop = () => lenis.scrollTo(0, { duration: prefersReducedMotion ? 0 : 1 });

  const noiseItems = [
    '7 people accepted meeting invite: "Grooming Sprint S21"',
    'Jira: 6 tickets moved to "In QA"',
    'Sprint V23 recording available',
    'Swiggy food delivered',
    'Splitwise — all settled up',
    'Amazon: package out for delivery',
  ];

  const threeTests = [
    { label: 'Action', desc: 'Needs something from me this week' },
    { label: 'Decision', desc: 'Changes what I was planning to do' },
    { label: 'Time-risk', desc: 'Has a cost if I ignore it today' },
  ];

  const bets = [
    {
      title: 'Deterministic where possible, LLM where necessary',
      body: "Weather phrasing is rule-shaped, so it's 80 lines of null-safe JavaScript at zero token cost. The model is spent only on the one thing that needs judgment: triage.",
    },
    {
      title: 'Fail visible, not silent',
      body: 'If the model returns broken JSON, the brief still sends — degraded and flagged. And if any node fails at 9am, an error-alert email fires. A missing morning email is a worse failure than an ugly one.',
    },
    {
      title: 'Cost as a habit, not a report',
      body: 'Token usage is read off every API response and printed in the footer (~$0.04/run, pricing verified and dated). If a design change doubles the cost, the product tells on me the next morning.',
    },
  ];

  const roadmap = [
    {
      label: 'Smarter retrieval',
      body: 'Snippet trimming (300 chars per email, a deliberate cost decision) can misjudge an ask buried deep in a long email. The v2 fix is tiered retrieval — full-body reads only on the flagged few.',
    },
    {
      label: 'WhatsApp as the channel',
      body: "In India the first app opened after the alarm isn't Gmail — email is where the noise lives, WhatsApp is where attention lives. The architecture is pre-set: the brain outputs structured JSON with rendering fully separated, so WhatsApp is a new renderer, not a rewrite. This unlocks what email never could: replying \"done\" to an actionable, tapping for the full story. Where email is a report you read, WhatsApp is a chief of staff you answer.",
    },
    {
      label: 'N=1, deliberately',
      body: "Daybrief today is a product of one. \"Add a user\" isn't \"add a login\" — it's \"add a profile.\" The path is visible in the design: the profile splits into a universal layer (the Three-Test Filter, true for everyone) and a personal layer (known senders, section definitions, identity) that today is hand-written for me. The honest answer to \"when are you adding users?\" is: deliberately later.",
    },
  ];

  const links = [
    {
      emoji: '🧠',
      label: 'The decision log',
      desc: 'Every non-obvious choice, with the alternative rejected',
      href: 'https://github.com/jaan-creates/ai-pm-portfolio/blob/main/startup-track/projects/1-morning-brief/DECISIONS.md',
      slug: 'DECISIONS.md',
    },
    {
      emoji: '🔧',
      label: 'The build',
      desc: 'Prompt, code, and wiring instructions',
      href: 'https://github.com/jaan-creates/ai-pm-portfolio/tree/main/startup-track/projects/1-morning-brief',
      slug: 'project folder',
    },
    {
      emoji: '✍️',
      label: 'The full case study',
      desc: 'Persona, JTBD, and the v1 → v2 story',
      href: 'https://github.com/jaan-creates/ai-pm-portfolio/blob/main/startup-track/projects/1-morning-brief/CASE_STUDY.md',
      slug: 'CASE_STUDY.md',
    },
  ];

  return (
    <div
      className="bg-bg text-off-white min-h-screen font-sans"
      style={{ '--case-accent': ACCENT } as React.CSSProperties}
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
          backgroundColor: ACCENT,
          zIndex: 100,
          transition: prefersReducedMotion ? 'none' : 'width 0.1s linear',
        }}
      />

      {/* Sticky nav */}
      <div
        className="sticky top-0 z-50 border-b border-surface-border nav-blur"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg) 85%, transparent)' }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/#builder-projects"
            className="font-sans text-sm text-muted-light hover:text-off-white transition-colors duration-200 flex items-center gap-1.5"
          >
            ← Side Projects
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="font-sans text-xs font-medium px-3 py-1 rounded-full"
              style={{ backgroundColor: ACCENT_BG, color: ACCENT }}
            >
              Side Project
            </span>
            <span
              className="font-sans text-xs font-medium px-3 py-1 rounded-full"
              style={{ backgroundColor: ACCENT_BG, color: ACCENT }}
            >
              AI / Agents
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-0">
        <p className="font-mono text-xs tracking-[0.16em] uppercase mb-5" style={{ color: ACCENT }}>
          Side Project · 6 min read
        </p>
        <h1
          className="font-display font-bold text-off-white leading-tight"
          style={{ fontSize: 'var(--step-4)' }}
        >
          Daybrief{' '}
          <span
            className="font-normal"
            style={{ fontSize: 'var(--step-1)', color: 'var(--color-muted)' }}
          >
            — To kill my morning app shuffle
          </span>
        </h1>

        <div
          className="mt-10 space-y-4 text-muted-light leading-relaxed"
          style={{ fontSize: 'var(--step-0)' }}
        >
          <p>
            Every morning at 9am, an automation reads my inbox, my calendar, five news feeds I want
            to tune into, and the weather — and throws most of the noise away. What survives is one
            curated email I can read in under 60 seconds. It costs about $0.04 a morning, and I know
            that precisely, because every email prints its own price tag in the footer.
          </p>
          <p>
            It's called Daybrief. This is the story of the one product insight it is built on, the
            bug that taught me the most, and the decisions I'd defend in any product review.
          </p>
        </div>

        <div className="mt-8">
          <ImgPlaceholder
            accent={ACCENT}
            label="hero — Daybrief email screenshot"
            caption="A real Daybrief"
            aspect="aspect-video"
            src="/assets/daybrief/daybrief-email-selection.webp"
            containerClassName="w-full rounded-xl overflow-hidden"
          />
        </div>

        <div className="mt-8">
          <a
            href="https://github.com/jaan-creates/ai-pm-portfolio/tree/main/startup-track/projects/1-morning-brief"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: ACCENT_BG, color: ACCENT, border: `1px solid ${ACCENT_BORDER}` }}
          >
            ↗ Repo: morning-daybrief
          </a>
        </div>

        <hr className="border-surface-border my-10" />
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 pb-28 space-y-16">

        {/* 01 — JTBD */}
        <section>
          <SectionHeading eyebrow="01" heading="Start with the job to be done" accent={ACCENT} />
          <div
            className="space-y-4 text-muted-light leading-relaxed"
            style={{ fontSize: 'var(--step-0)' }}
          >
            <p>
              The user (v1: me — a PM, job-hunting, simulating work communications, attention
              scattered before 10am) has a morning job-to-be-done:{' '}
              <em className="text-off-white">
                "Tell me what changed overnight and what needs me today, without hunting across apps
                — so I can start the day deliberately."
              </em>
            </p>
            <p>
              Notice what the job is <strong className="text-off-white">not</strong>: "summarize my
              inbox." Nobody wakes up wanting a summary. They want a verdict.
            </p>
            <p>
              That reframe carries the whole product: the value of a morning brief lives entirely in
              what it chooses to leave out. A tool that forwards more noise gets muted within a week.
              A tool that rightly judges what goes in and what gets eliminated, gets kept.
            </p>
          </div>
          <PullQ accent={ACCENT}>the job is to have less — but the right kind of less.</PullQ>
        </section>

        {/* 02 — The audit */}
        <section>
          <SectionHeading eyebrow="02" heading="The audit that became the product" accent={ACCENT} />
          <div
            className="space-y-4 text-muted-light leading-relaxed mb-8"
            style={{ fontSize: 'var(--step-0)' }}
          >
            <p>
              My first version made the mistake every AI-digest demo makes: it summarized everything,
              neatly. So I did what a PM should do to their own product — I audited three real
              outputs, line by line.
            </p>
          </div>

          <ImgPlaceholder
            accent={ACCENT}
            label="before / after audit — side-by-side"
            caption=""
            aspect="aspect-[4/3]"
            src="/assets/daybrief/daybrief-before-after-curation.webp"
          />

          <div
            className="mt-8 space-y-4 text-muted-light leading-relaxed"
            style={{ fontSize: 'var(--step-0)' }}
          >
            <p>
              Roughly 40% of the lines were noise. And the tell was in the copy itself — the brief
              kept the noise while writing "no action needed" as a{' '}
              <em>justification for including things:</em>
            </p>
          </div>

          {/* Noise block */}
          <div
            className="my-6 rounded-xl p-5"
            style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT_BORDER}` }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.14em] mb-4"
              style={{ color: `${ACCENT}80` }}
            >
              Lines that shouldn't have been there
            </p>
            <ul className="space-y-2 font-mono text-sm">
              {noiseItems.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span
                    className="shrink-0 mt-px text-xs font-bold"
                    style={{ color: theme === 'light' ? '#DC2626' : '#F87171' }}
                  >
                    ✕
                  </span>
                  <span className="text-muted-light">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-light leading-relaxed">
              6 lines. Zero decisions. If the product has to tell you an item needs nothing from you,
              the item shouldn't be there.
            </p>
          </div>

          {/* Three-test callout */}
          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: `${ACCENT}12`, border: `1px solid ${ACCENT}50` }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.14em] mb-4"
              style={{ color: ACCENT }}
            >
              The three-test filter — an item earns a line only if it:
            </p>
            <div className="space-y-3">
              {threeTests.map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <span
                    className="font-mono text-xs font-semibold px-2 py-0.5 rounded mt-0.5 shrink-0"
                    style={{ backgroundColor: ACCENT_BG, color: ACCENT }}
                  >
                    {label}
                  </span>
                  <span className="text-sm text-muted-light leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-light leading-relaxed">
              Everything else collapses into one grey sentence:{' '}
              <em className="text-off-white">
                "Also: Barry Toms is OOO — nothing pending."
              </em>{' '}
              Same information. Ninety percent less attention spent.
            </p>
          </div>

          <div
            className="space-y-4 text-muted-light leading-relaxed"
            style={{ fontSize: 'var(--step-0)' }}
          >
            <p>And on genuinely quiet days, the brief now says the hardest thing an engagement-driven product can say:</p>
          </div>
          <PullQ accent={ACCENT}>
            "Nothing urgent today." — Counterintuitively, that sentence is the retention mechanic. A
            brief that's allowed to say nothing is a brief you can trust, when it says something.
          </PullQ>
        </section>

        {/* 03 — Where does judgment live? */}
        <section>
          <SectionHeading
            eyebrow="03"
            heading="Where does judgment live? (Not in the code.)"
            accent={ACCENT}
          />
          <div
            className="space-y-4 text-muted-light leading-relaxed mb-8"
            style={{ fontSize: 'var(--step-0)' }}
          >
            <p>
              Here's the architecture question that matters more than any framework choice: when the
              brief misjudges something — say, a bootcamp's "last 2 seats!" email surfaces as urgent
              — what does the fix look like?
            </p>
            <p>In Daybrief, it's one sentence of prose, not a deploy.</p>
          </div>

          <ImgPlaceholder
            accent={ACCENT}
            label="priorities.md — annotated: LAYER 0 Three-Test Filter"
            caption="The brain is a text file. Full version in the repo."
            aspect="aspect-[4/3]"
            src="/assets/daybrief/daybrief-priorities-doc.webp"
          />

          <div
            className="mt-8 space-y-4 text-muted-light leading-relaxed"
            style={{ fontSize: 'var(--step-0)' }}
          >
            <p>
              All judgment lives in a plain-text operator profile, layered like an org chart for
              attention: a universal three-test filter at the top, principles for judging senders it
              has never seen before ("a real human personally waiting on my reply beats everything"),
              explicit shortcuts for known senders learned from real inbox data, and hard caps (max 5
              actionables, verb-first, each with a time estimate; max 3 news items — zero allowed).
            </p>
            <p>
              Everything mechanical — API calls, parsing, rendering — is code. Everything judgmental
              is editable text. That split is also why the unseen-sender principles exist at all: so
              the day something important arrives from a brand-new sender, the principles still catch
              it.
            </p>
          </div>
        </section>

        {/* 04 — The system */}
        <section>
          <SectionHeading eyebrow="04" heading="The system, in one picture" accent={ACCENT} />

          <ZoomableVideo
            src="/assets/daybrief/n8n automation mp4.mp4"
            caption="Fourteen nodes, three jobs: gather, judge, deliver. Wiring instructions in the project README."
          />

          <div
            className="mt-8 mb-4 text-muted-light leading-relaxed"
            style={{ fontSize: 'var(--step-0)' }}
          >
            <p>The pipeline in plain English:</p>
          </div>

          <pre
            className="rounded-xl p-5 overflow-x-auto font-mono text-sm leading-relaxed"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-surface-border)',
              color: 'var(--color-off-white)',
            }}
          >
            <code>{`Schedule (9am IST) → weather / 5× news / email / calendar
  → Assemble (gather + trim + build request)
  → Claude Sonnet (judge → structured JSON)
  → Build Email (parse + price + render)
  → Gmail (send)`}</code>
          </pre>
        </section>

        {/* 05 — Three bets */}
        <section>
          <SectionHeading eyebrow="05" heading="Three engineering bets" accent={ACCENT} />
          <div className="space-y-4">
            {bets.map(({ title, body }) => (
              <div
                key={title}
                className="flex gap-5 rounded-xl p-5"
                style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT_BORDER}` }}
              >
                <div
                  className="w-1 rounded-full shrink-0"
                  style={{ backgroundColor: ACCENT, minHeight: '1.5rem' }}
                />
                <div>
                  <p
                    className="font-display font-semibold text-off-white mb-2"
                    style={{ fontSize: 'var(--step-0)' }}
                  >
                    {title}
                  </p>
                  <p className="text-muted-light leading-relaxed text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ImgPlaceholder
              accent={ACCENT}
              label="cost footer close-up"
              caption="Every brief ships with its own bill."
              aspect="aspect-[3/1]"
              src="/assets/daybrief/daybrief-day-badge.webp"
              containerClassName="block mx-auto max-w-sm rounded-xl overflow-hidden"
            />
          </div>
        </section>

        {/* 06 — Where next */}
        <section>
          <SectionHeading eyebrow="06" heading="Where Daybrief goes next" accent={ACCENT} />
          <ul className="space-y-6">
            {roadmap.map(({ label, body }) => (
              <li key={label} className="grid gap-x-4 gap-y-1.5" style={{ gridTemplateColumns: '9rem 1fr' }}>
                <span
                  className="font-mono text-xs font-semibold px-2 py-0.5 rounded self-start"
                  style={{ backgroundColor: ACCENT_BG, color: ACCENT }}
                >
                  {label}
                </span>
                <p className="text-muted-light leading-relaxed text-sm">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 07 — See it for yourself */}
        <section>
          <SectionHeading eyebrow="07" heading="See it for yourself" accent={ACCENT} />
          <div className="space-y-3">
            {links.map(({ emoji, label, desc, href, slug }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl p-4 transition-colors duration-200 no-underline"
                style={{
                  border: '1px solid var(--color-surface-border)',
                  backgroundColor: 'var(--color-surface)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = ACCENT_BORDER;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '';
                }}
              >
                <span className="text-2xl" aria-hidden="true">
                  {emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-off-white font-medium text-sm">{label}</p>
                  <p className="text-muted-light text-xs mt-0.5">{desc}</p>
                </div>
                <span className="font-mono text-xs shrink-0" style={{ color: ACCENT }}>
                  {slug} ↗
                </span>
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 w-10 h-10 rounded-full bg-surface-raised border border-surface-border text-muted-light flex items-center justify-center hover:text-off-white"
        style={{
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? 'translateY(0)' : 'translateY(8px)',
          pointerEvents: showBackToTop ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
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
