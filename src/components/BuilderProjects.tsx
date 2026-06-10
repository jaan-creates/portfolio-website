import { Link } from 'react-router-dom';
import BlockReveal from './BlockReveal';
import { useTheme } from '../contexts/ThemeContext';

export default function BuilderProjects() {
  const { theme } = useTheme();
  const DAYBREAK_ACCENT = theme === 'light' ? '#C2410C' : '#F97316';

  return (
    <section
      id="builder-projects"
      className="min-h-screen w-full bg-bg flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
    >
      <div className="max-w-6xl mx-auto w-full">
        <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-accent-green mb-4 block">
          Side Projects
        </span>
        <BlockReveal animateOnScroll className="mb-16">
          <h2
            className="font-display font-semibold text-off-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Things I&rsquo;m building
          </h2>
        </BlockReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Daybreak */}
          <Link
            to="/projects/daybreak"
            className="rounded-2xl border border-surface-border bg-surface p-8 flex flex-col gap-5 transition-colors duration-300 group cursor-pointer no-underline"
            style={{ ['--hover-border' as string]: `${DAYBREAK_ACCENT}50` }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = `${DAYBREAK_ACCENT}50`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = '';
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ backgroundColor: `${DAYBREAK_ACCENT}20` }}
              aria-hidden="true"
            >
              ☀
            </div>
            <div className="flex-1">
              <h3
                className="font-display font-semibold text-off-white mb-2 transition-colors duration-200"
                style={{ fontSize: 'var(--step-0)' }}
              >
                Daybreak
              </h3>
              <p className="text-muted-light text-sm leading-relaxed">
                An AI agent that reads my inbox, weather, and news every morning and delivers one
                clean brief to WhatsApp — so the day starts with a summary, not a scroll.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['AI Agent', 'Claude', 'WhatsApp'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${DAYBREAK_ACCENT}18`,
                    color: DAYBREAK_ACCENT,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className="font-mono text-xs text-muted-light transition-colors duration-200"
              style={{ color: 'var(--hover-read-more)' }}
              onMouseEnter={() => {/* inherits from parent hover */}}
            >
              Read more →
            </span>
          </Link>

          {/* Placeholder 2 */}
          <div className="rounded-2xl border border-surface-border bg-surface p-8 flex flex-col gap-4 opacity-40">
            <div className="w-10 h-10 rounded-xl bg-surface-raised border border-surface-border" />
            <div className="flex-1">
              <div className="h-5 w-32 rounded bg-surface-raised mb-3" />
              <div className="h-3 w-full rounded bg-surface-raised mb-2" />
              <div className="h-3 w-3/4 rounded bg-surface-raised" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-6 w-16 rounded-full bg-surface-raised" />
              ))}
            </div>
          </div>

          {/* Placeholder 3 */}
          <div className="rounded-2xl border border-surface-border bg-surface p-8 flex flex-col gap-4 opacity-40">
            <div className="w-10 h-10 rounded-xl bg-surface-raised border border-surface-border" />
            <div className="flex-1">
              <div className="h-5 w-32 rounded bg-surface-raised mb-3" />
              <div className="h-3 w-full rounded bg-surface-raised mb-2" />
              <div className="h-3 w-3/4 rounded bg-surface-raised" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-6 w-16 rounded-full bg-surface-raised" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
