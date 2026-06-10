import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { lenis } from '../App';
import { useTheme } from '../contexts/ThemeContext';

const DARK_ACCENT = '#F97316';
const LIGHT_ACCENT = '#C2410C';

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
        <p
          className="font-mono text-xs tracking-[0.16em] uppercase mb-5"
          style={{ color: ACCENT }}
        >
          Side Project · 4 min read
        </p>
        <h1
          className="font-display font-bold text-off-white leading-tight"
          style={{ fontSize: 'var(--step-4)' }}
        >
          Daybreak
        </h1>
        <p
          className="mt-4 leading-relaxed"
          style={{ fontSize: 'var(--step-1)', color: 'var(--color-muted)' }}
        >
          Your morning, briefed before you open a single app
        </p>
        <hr className="border-surface-border my-10" />
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 pb-28 space-y-14">

        {/* What I achieve */}
        <div
          className="rounded-2xl p-6 space-y-3"
          style={{ border: `1px solid ${ACCENT_BORDER}`, backgroundColor: `${ACCENT}0D` }}
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.16em]"
            style={{ color: ACCENT }}
          >
            What I achieve through this
          </p>
          <p className="text-off-white leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
            Demonstrated end-to-end AI PM range: identifying a daily friction, scoping an agentic
            solution across heterogeneous data sources (Gmail, weather, news), orchestrating it
            through Claude connectors, and making a clear-eyed build-vs-constraint decision on the
            delivery layer (WhatsApp via an automation bridge). It's a working artifact that shows
            product judgment, not just prompt skills.
          </p>
        </div>

        {/* Blog */}
        <article className="space-y-12">

          <section>
            <h2
              className="font-display font-semibold text-off-white mb-4"
              style={{ fontSize: 'var(--step-1)' }}
            >
              Killing the morning app-shuffle
            </h2>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
              Every morning starts the same way for knowledge workers: open Gmail, skim it, switch
              to a weather app, switch to a news feed, switch to Slack — five context switches before
              the first real task. Each app demands attention but none of it is decision-ready. The
              information is scattered, unprioritized, and pulls you into reactive mode before you've
              chosen your own agenda.
            </p>
          </section>

          <section>
            <h2
              className="font-display font-semibold text-off-white mb-4"
              style={{ fontSize: 'var(--step-1)' }}
            >
              The user
            </h2>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
              A busy individual contributor or manager who wants situational awareness in 60 seconds,
              not 15 minutes of doom-scrolling. Someone who already lives in WhatsApp and resents
              adding a sixth dashboard to their morning.
            </p>
          </section>

          <section>
            <h2
              className="font-display font-semibold text-off-white mb-4"
              style={{ fontSize: 'var(--step-1)' }}
            >
              The job to be done
            </h2>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
              "When I wake up, I want to know what changed overnight and what needs me today —
              without hunting across apps — so I can start the day deliberately." Notice the JTBD
              isn't "give me more information"; it's "give me less, but the right less."
            </p>
          </section>

          <section>
            <h2
              className="font-display font-semibold text-off-white mb-4"
              style={{ fontSize: 'var(--step-1)' }}
            >
              Market and competition
            </h2>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
              The "daily briefing" space is crowded but oddly unsatisfying — newsletter digests
              (theSkimm, Morning Brew) aren't personalized to your inbox; productivity suites (Notion,
              Sunsama) make you open yet another surface; voice assistants give shallow, un-actionable
              summaries. The reachable audience is large in principle — anyone juggling email plus
              2–3 information streams daily — but the real wedge is narrow: people willing to let an
              agent read across their accounts in exchange for genuine time saved.
            </p>
          </section>

          <section>
            <h2
              className="font-display font-semibold text-off-white mb-4"
              style={{ fontSize: 'var(--step-1)' }}
            >
              Why it's differentiated
            </h2>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
              Two bets. First, delivery to where you already are — WhatsApp, zero new app to check.
              Second, AI summarization that <em>prioritizes</em>, not just aggregates — the agent
              reasons about what's urgent versus noise rather than dumping a feed. The most telling PM
              decision was on the WhatsApp layer: native delivery isn't natively supported, so rather
              than fake a demo, I scoped a bridge (Make/Zapier + Twilio) and treated the constraint as
              an explicit product tradeoff. Knowing what not to build is the differentiator.
            </p>
          </section>

        </article>
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
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = ''; }}
      >
        ↑
      </button>
    </div>
  );
}
