import { Link } from 'react-router-dom';
import BlockReveal from './BlockReveal';
import { useTheme } from '../contexts/ThemeContext';

const STAGES = ['Discovery', 'Build', 'Test', 'Launch'];
const CURRENT_STAGE_INDEX = 1; // Build

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

          {/* Daybrief — live, shipped */}
          <Link
            to="/projects/daybreak"
            className="group relative overflow-hidden rounded-2xl p-8 flex flex-col gap-5 bg-surface no-underline"
            style={{
              border: `1px solid ${DAYBREAK_ACCENT}80`,
              transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-5px)';
              el.style.borderColor = DAYBREAK_ACCENT;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = `${DAYBREAK_ACCENT}80`;
            }}
          >
            {/* Accent glow — brightens on hover */}
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(to left, ${DAYBREAK_ACCENT}1F, transparent)` }}
            />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-[0.06em] text-accent-green">
                LIVE &middot; SHIPPED
              </span>
            </div>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ backgroundColor: `${DAYBREAK_ACCENT}20` }}
              aria-hidden="true"
            >
              ☀️
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-off-white mb-3" style={{ fontSize: 'var(--step-0)' }}>
                Daybrief
              </h3>
              <p className="text-muted-light text-sm leading-relaxed">
                Every morning at 9am, an automation reads my inbox, calendar, five news feeds, and
                weather — and throws most of the noise away. One curated email, 60 seconds, $0.04.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['AI Agent', 'Claude', 'n8n'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${DAYBREAK_ACCENT}18`, color: DAYBREAK_ACCENT }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="font-mono text-xs font-bold text-off-white inline-flex items-center gap-1.5">
              Read more
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>

          {/* Job Copilot — in progress */}
          <div className="rounded-2xl border border-surface-border p-8 flex flex-col gap-5 bg-surface">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-amber animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-[0.06em] text-accent-amber">
                IN PROGRESS
              </span>
            </div>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-surface-raised"
              aria-hidden="true"
            >
              💼
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-off-white mb-3" style={{ fontSize: 'var(--step-0)' }}>
                Job Copilot
              </h3>
              <p className="text-muted-light text-sm leading-relaxed">
                An AI-powered job search portal that brings everything into one place — one profile
                to manage matches, applications, resumes, and tracking, seamlessly.
              </p>
            </div>

            <div>
              <div className="flex gap-1.5 mb-2.5">
                {STAGES.map((stage, i) => (
                  <div key={stage} className="flex-1 h-1 rounded-full overflow-hidden bg-surface-border">
                    <div
                      className="h-full bg-accent-amber rounded-full"
                      style={{
                        width:
                          i < CURRENT_STAGE_INDEX ? '100%' : i === CURRENT_STAGE_INDEX ? '50%' : '0%',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {STAGES.map((stage, i) => (
                  <span
                    key={stage}
                    className={`font-mono text-[11px] font-semibold ${i === CURRENT_STAGE_INDEX ? 'text-accent-amber' : 'text-muted'}`}
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {['AI Agent', 'Automation'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-full bg-surface-raised text-muted-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* More on the way */}
          <div className="rounded-2xl border border-dashed border-surface-border p-8 flex flex-col items-center justify-center gap-3.5 text-center">
            <div
              className="w-11 h-11 rounded-xl border border-dashed border-surface-border flex items-center justify-center text-xl text-muted-light"
              aria-hidden="true"
            >
              +
            </div>
            <div className="font-display font-semibold text-muted-light" style={{ fontSize: 'var(--step-0)' }}>
              More on the way
            </div>
            <div className="text-muted-light text-sm max-w-[220px]">
              New builds get added here as they take shape.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
