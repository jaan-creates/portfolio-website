import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';
import CaseStudyMeta from '../components/case-study/CaseStudyMeta';
import InsightCallout from '../components/case-study/InsightCallout';
import CaseStudyTable from '../components/case-study/CaseStudyTable';
import CaseStudyNext from '../components/case-study/CaseStudyNext';
import ZoomableImage from '../components/ZoomableImage';
import { useTheme } from '../contexts/ThemeContext';

const DARK_ACCENT = '#FC8019';
const LIGHT_ACCENT = '#C2410C';

/* ── Inline sub-components (Swiggy-only) ───────────────────────── */

function StatCard({ value, label }: { value: string; label: string }) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="bg-surface-raised rounded-xl p-6 relative overflow-hidden"
      style={{ border: '1px solid var(--color-surface-border)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <div
        className="font-display font-bold leading-none mb-3"
        style={{ fontSize: 'var(--step-3)', color: accent }}
      >
        {value}
      </div>
      <p className="text-muted-light leading-snug" style={{ fontSize: 'var(--step--1)' }}>
        {label}
      </p>
    </div>
  );
}

function PullQuote({ quote, source }: { quote: string; source: string }) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-r-xl py-3 px-5 mb-5"
      style={{ borderLeft: `2px solid ${accent}` }}
    >
      <p
        className="text-muted-light leading-relaxed italic"
        style={{ fontSize: 'var(--step-0)' }}
      >
        "{quote}"
      </p>
      <p
        className="font-mono uppercase tracking-[0.08em] mt-2"
        style={{ fontSize: '10px', color: 'var(--color-muted-light)' }}
      >
        {source}
      </p>
    </div>
  );
}

function Callout({ label, children }: { label?: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-xl p-5 my-5"
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-surface-border)',
        borderLeft: `3px solid ${accent}`,
      }}
    >
      {label && (
        <p
          className="font-mono uppercase tracking-[0.1em] mb-2"
          style={{ fontSize: '10px', color: accent }}
        >
          {label}
        </p>
      )}
      <div
        className="text-off-white leading-relaxed"
        style={{ fontSize: 'var(--step--1)' }}
      >
        {children}
      </div>
    </div>
  );
}

function PersonaCard({
  role,
  name,
  bio,
  jtbd,
}: {
  role: string;
  name: string;
  bio: string;
  jtbd: string;
}) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)' }}
    >
      <div
        className="px-6 pt-6 pb-4"
        style={{ borderBottom: '0.5px solid var(--color-surface-border)' }}
      >
        <p
          className="font-mono uppercase tracking-[0.1em] mb-1"
          style={{ fontSize: '10px', color: accent }}
        >
          {role}
        </p>
        <p
          className="font-display font-semibold text-off-white"
          style={{ fontSize: 'var(--step-1)' }}
        >
          {name}
        </p>
      </div>
      <div className="px-6 py-5">
        <p className="text-muted-light leading-relaxed mb-5" style={{ fontSize: 'var(--step--1)' }}>
          {bio}
        </p>
        <div
          className="rounded-lg p-4"
          style={{
            background: 'rgba(252,128,25,0.05)',
            border: '1px dashed rgba(252,128,25,0.2)',
          }}
        >
          <p
            className="font-mono uppercase tracking-[0.1em] mb-2"
            style={{ fontSize: '9px', color: accent }}
          >
            Job to be done
          </p>
          <p
            className="text-muted-light italic leading-relaxed"
            style={{ fontSize: 'var(--step--1)' }}
          >
            {jtbd}
          </p>
        </div>
      </div>
    </div>
  );
}

function CapabilityCard({
  title,
  body,
  isAccent,
}: {
  title: string;
  body: string;
  isAccent?: boolean;
}) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: 'var(--color-surface-raised)',
        border: isAccent
          ? `0.5px solid rgba(252,128,25,0.3)`
          : '0.5px solid var(--color-surface-border)',
        borderTop: isAccent ? `2px solid ${accent}` : undefined,
      }}
    >
      <h4
        className="font-display font-semibold mb-2 leading-snug"
        style={{
          fontSize: 'var(--step-0)',
          color: isAccent ? accent : 'var(--off-white)',
        }}
      >
        {title}
      </h4>
      <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
        {body}
      </p>
    </div>
  );
}

function SolutionCard({
  num,
  title,
  hypothesis,
  metric,
  metricLabel,
  children,
}: {
  num: string;
  title: string;
  hypothesis: string;
  metric: string;
  metricLabel: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-xl overflow-hidden mb-6"
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-surface-border)',
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <div
        className="px-6 pt-5 pb-4"
        style={{ borderBottom: '0.5px solid var(--color-surface-border)' }}
      >
        <p
          className="font-mono uppercase tracking-[0.14em] mb-1"
          style={{ fontSize: '10px', color: accent }}
        >
          {num}
        </p>
        <h3
          className="font-display font-bold text-off-white leading-snug"
          style={{ fontSize: 'var(--step-1)' }}
        >
          {title}
        </h3>
      </div>
      <div className="px-6 py-5">
        <div
          className="rounded-lg p-4 mb-5"
          style={{
            background: 'rgba(252,128,25,0.05)',
            border: '0.5px solid rgba(252,128,25,0.15)',
          }}
        >
          <p
            className="font-mono uppercase tracking-[0.1em] mb-2"
            style={{ fontSize: '9px', color: accent }}
          >
            Hypothesis
          </p>
          <p
            className="text-off-white leading-relaxed"
            style={{ fontSize: 'var(--step--1)' }}
          >
            {hypothesis}
          </p>
        </div>
        {children}
        <div className="mt-4 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-2 font-mono rounded-full px-4 py-1.5"
            style={{
              fontSize: 'var(--step--1)',
              color: 'var(--color-muted)',
              background: 'var(--color-surface-raised)',
              border: '0.5px solid var(--color-surface-border)',
            }}
          >
            <strong style={{ color: 'var(--color-off-white)', fontWeight: 500 }}>{metricLabel}:</strong>&nbsp;{metric}
          </span>
        </div>
      </div>
    </div>
  );
}


function DemandStatCell({ value, label }: { value: string; label: string }) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="bg-surface-raised p-5"
      style={{ border: '0px' }}
    >
      <div
        className="font-display font-bold leading-none mb-2"
        style={{ fontSize: 'var(--step-3)', color: accent }}
      >
        {value}
      </div>
      <p className="text-muted-light leading-snug" style={{ fontSize: 'var(--step--1)' }}>
        {label}
      </p>
    </div>
  );
}

function ReflectionItem({
  index,
  title,
  body,
  isLast,
}: {
  index: string;
  title: string;
  body: string;
  isLast?: boolean;
}) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <li
      className="flex gap-5 py-5"
      style={{
        borderBottom: isLast ? 'none' : '0.5px solid var(--color-surface-border)',
      }}
    >
      <span
        className="font-mono font-bold flex-shrink-0 opacity-40 mt-0.5"
        style={{ fontSize: '11px', color: accent, width: '1.5em' }}
      >
        {index}
      </span>
      <div>
        <p
          className="font-display font-semibold text-off-white mb-1"
          style={{ fontSize: 'var(--step-0)' }}
        >
          {title}
        </p>
        <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
          {body}
        </p>
      </div>
    </li>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */

export default function SwiggyCaseStudy() {
  const { theme } = useTheme();
  const ACCENT = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;

  return (
    <CaseStudyLayout
      title="Solving the Paradox of Choice"
      company="Swiggy"
      domain="Consumer · Food-tech"
      accentColor={DARK_ACCENT}
      lightAccentColor={LIGHT_ACCENT}
      readTime="8 min read"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Consumer', 'Food-tech', 'Self-directed', 'RICE', 'Landing-page test', 'Behavioural Design'].map(
          (tag) => (
            <span
              key={tag}
              className="font-mono text-xs font-medium px-2.5 py-1 rounded border border-surface-border bg-surface-raised text-muted-light uppercase tracking-wider"
            >
              {tag}
            </span>
          )
        )}
      </div>

      {/* Meta */}
      <CaseStudyMeta
        cells={[
          { label: 'My Role', value: 'Product (end-to-end)' },
          { label: 'Scope', value: 'Research → solution → live demand test' },
          { label: 'Method', value: 'Surveys · reviews · RICE · landing-page test' },
          { label: 'Headline Result', value: '~36% of visitors asked for early access' },
        ]}
      />

      {/* Scope note */}
      <div
        className="flex gap-3 rounded-xl px-4 py-3 mb-10"
        style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
      >
        <svg
          className="flex-shrink-0 mt-0.5 opacity-40"
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 8v5M9 6h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
          This is a self-directed product exercise validated with a real landing-page demand test —
          not a shipped feature. The thinking and the test are the deliverable, and I'd rather be
          precise about that than oversell it.
        </p>
      </div>

      {/* PROBLEM */}
      <CaseStudySection eyebrow="THE PROBLEM" heading="Choosing is the work. Eating is the easy part.">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          Food-delivery apps solved supply — thousands of restaurants, fast delivery, every cuisine.
          But they handed the user a new job:{' '}
          <strong className="text-off-white">decide.</strong> Endless near-identical options, no
          help narrowing them, and the cost of a wrong choice (₹ and time) all add up to decision
          fatigue. Behavioural economics has a name for it: the{' '}
          <strong className="text-off-white">paradox of choice</strong> — more options, less ability
          to choose.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div>
            <PullQuote
              quote="It takes so long to decide what to order. Instead of one long list, give me a short list of things I'd actually eat, quickly."
              source="Play Store review, Jul 2022"
            />
            <PullQuote
              quote="By the day it's getting cluttered and hectic to find what you want. One has to scroll endlessly — tedious."
              source="Play Store review, May 2022"
            />
          </div>
          <Callout label="Why this is worth solving">
            <p>
              When deciding is painful, three things happen: orders stall (lost conversion), people
              default to the same safe order (no discovery, flat AOV), and frustrated users churn to
              Zomato.{' '}
              <strong className="text-off-white">
                Fix the decision and you move all three at once.
              </strong>
            </p>
          </Callout>
        </div>
      </CaseStudySection>

      {/* VALIDATION */}
      <CaseStudySection eyebrow="VALIDATION" heading="I didn't assume the problem. I went and checked.">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          A user survey (81 responses) plus a read of public app-store reviews. The signal was loud
          and specific:
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            value="71.6%"
            label='named "finding what to order" the hardest step in the journey'
          />
          <StatCard
            value="45.6%"
            label="use food apps more than 3× a week — high frequency, repeated pain"
          />
          <StatCard
            value="10–20m"
            label="85.7% spend this just placing a single order"
          />
          <StatCard
            value="70.6%"
            label="want to try something new — led by recommendations from friends"
          />
        </div>
        <p className="text-off-white leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          Two more findings shaped the design:{' '}
          <strong className="text-off-white">53.5%</strong> said price &amp; offers are the biggest
          decision driver, and only <strong className="text-off-white">31%</strong> open the app
          with no dish in mind — most have some intent but can't act on it fast. The job isn't
          "show me everything." It's{' '}
          <strong className="text-off-white">"help me commit."</strong>
        </p>
      </CaseStudySection>

      {/* WHO */}
      <CaseStudySection eyebrow="WHO I DESIGNED FOR" heading="From a demographic to a decision.">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          The survey describes a segment; a persona describes a person with a job to be done. Two
          emerged clearly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <PersonaCard
            role="The time-starved regular"
            name="Meera, 29 · works full-time"
            bio="Orders 3–4× a week between meetings. Has rough intent ('something light, not too pricey') but no time to browse. Defaults to repeat orders out of decision fatigue, not loyalty."
            jtbd="When I'm hungry and short on time, I want to land on a good-value meal I'll enjoy in under two minutes, so I can stop deciding and get back to my day."
          />
          <PersonaCard
            role="The budget explorer"
            name="Arjun, 23 · student"
            bio="Price-led and curious. Wants to try new places but won't risk money on an unknown. Trusts friends' picks far more than ratings. Will scroll for deals until he gives up."
            jtbd="When I want to try something new without wasting money, I want a trusted, low-risk way to discover it, so I can order with confidence instead of regret."
          />
        </div>
      </CaseStudySection>

      {/* COMPETITIVE GAP */}
      <CaseStudySection eyebrow="THE COMPETITIVE GAP" heading="Everyone helps you search. Nobody helps you decide.">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          Swiggy and Zomato both invest in{' '}
          <strong className="text-off-white">discovery</strong> and{' '}
          <strong className="text-off-white">deals</strong>. But discovery assumes you know what
          you want, and deals are scattered — finding the right one is itself more scrolling. Neither
          closes the loop between <em>"I'm hungry and budget-conscious"</em> and{' '}
          <em>"here's the one good-value meal to commit to right now."</em>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CapabilityCard
            title="Discovery"
            body="Powerful but effort-heavy. Rewards users who already have intent; abandons the ones who don't."
          />
          <CapabilityCard
            title="Deals & coupons"
            body="Plentiful but unstructured. The deal hunt adds decisions instead of removing them."
          />
          <CapabilityCard
            title="The open wedge"
            body="Curated, deal-led, decision-ready picks matched to taste and budget. That's where Deal Store plays."
            isAccent
          />
        </div>
      </CaseStudySection>

      {/* THE BET — Solutions */}
      <CaseStudySection eyebrow="THE BET" heading="Three solutions, framed as testable hypotheses.">
        <p className="text-off-white leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          Rather than a feature wishlist, each solution is a bet: a belief about behaviour, and the
          one metric that would prove me right or wrong. They stack — from <em>commit fast</em>, to{' '}
          <em>decide with confidence</em>, to <em>discover with trust</em>.
        </p>

        {/* S01 */}
        <SolutionCard
          num="Solution 01 · The Signature"
          title="Deal Store — a short, curated list of good-value meals"
          hypothesis="If we replace the infinite catalogue with 5 personalised, deal-led picks based on light inputs (cuisine, veg/non-veg, budget), budget-conscious regulars will commit faster and abandon less."
          metricLabel="Proof metric"
          metric="time-to-order via Deal Store vs. normal flow"
        >
          <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
            A single clear entry point opens a short preference step (all optional). Swiggy returns
            the day's <strong className="text-off-white">top 5 deals</strong> matched to that taste
            and price band. Pick one, add to cart, check out. Fewer, better options — not more.
          </p>
          <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
            The result is a <strong className="text-off-white">5-item shortlist</strong>, each with
            its deal attached. Users get up to 6 refreshes a day — enough to explore, capped so the
            picks feel curated, not infinite. A null result never dead-ends: it always offers{' '}
            <em>"Unlock other deals."</em>
          </p>
          <p className="text-muted-light leading-relaxed mb-5" style={{ fontSize: 'var(--step--1)' }}>
            Behind it, a two-sided design: restaurants self-serve daily deals by meal-time
            (breakfast / lunch / dinner), set discount rules, and run promotions — so the supply of
            deals is real and fresh, not subsidised by Swiggy alone.
          </p>

          {/* Screenshots — 3-col equal-height strip */}
          <figure className="my-0 mb-2">
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: '/assets/swiggy/Group%2053.svg', alt: 'Deal Store preference screen — select cuisine, meal type, and restaurant type' },
                { src: '/assets/swiggy/Frame%2049%201.svg', alt: 'Deal Store curated shortlist — top 5 matching deals' },
                { src: '/assets/swiggy/Frame%2011.svg', alt: 'Restaurant-side deal setup — review promotion details and start promotion' },
              ].map(({ src, alt }) => (
                <ZoomableImage
                  key={src}
                  src={src}
                  alt={alt}
                  containerClassName="rounded-xl overflow-hidden"
                  containerStyle={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)', height: '320px' }}
                  imgStyle={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
                />
              ))}
            </div>
            <p className="text-center mt-2 text-muted-light italic" style={{ fontSize: 'var(--step--1)' }}>
              Left: preference screen · Centre: curated shortlist · Right: restaurant deal setup
            </p>
          </figure>

          {/* Persuasion note */}
          <div
            className="rounded-xl p-5 mt-4"
            style={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)' }}
          >
            <h4
              className="font-display font-semibold text-off-white mb-2"
              style={{ fontSize: 'var(--step-0)' }}
            >
              Persuasion, responsibly
            </h4>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
              Deal Store deliberately uses behavioural nudges —{' '}
              <strong className="text-off-white">scarcity</strong> (a capped number of daily picks),{' '}
              <strong className="text-off-white">social proof</strong> (what's trending), and{' '}
              <strong className="text-off-white">loss aversion</strong> (genuine deal expiry). But
              aimed at budget-conscious people, the same levers can tip into dark patterns. My
              guardrails: <strong className="text-off-white">only real expiry</strong> (no fake
              countdowns), <strong className="text-off-white">honest scarcity</strong> (the cap
              reflects curation, not manufactured pressure), and{' '}
              <strong className="text-off-white">capped nudging</strong>. A nudge should reduce
              regret, never engineer it.
            </p>
          </div>

          <div
            className="mt-4 inline-flex items-center gap-2 font-mono rounded-full px-4 py-1.5"
            style={{
              fontSize: 'var(--step--1)',
              color: 'var(--color-muted)',
              background: 'var(--color-surface-raised)',
              border: '0.5px solid var(--color-surface-border)',
            }}
          >
            <strong style={{ color: 'var(--color-off-white)', fontWeight: 500 }}>Guardrail metric:</strong>&nbsp;null-deal searches (6 tries, no order)
          </div>
        </SolutionCard>

        {/* S02 */}
        <SolutionCard
          num="Solution 02"
          title="Reviews & ratings — decide with confidence"
          hypothesis="If users can see dish- and restaurant-level reviews at the point of choosing, they'll commit to unfamiliar options with less hesitation — widening what they're willing to order."
          metricLabel="Proof metric"
          metric="order-rate on items with a review surfaced"
        >
          <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
            A review signal on the listing tile, full reviews on the restaurant page, and a
            post-order prompt to keep the corpus fresh. Text first, with image/video and anonymous
            options layered in later.
          </p>
          <figure className="my-0">
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: '/assets/swiggy/image%2035.svg', alt: 'Restaurant listing tile showing review metrics — Good Food 91%, Right Order 87%, On-time 92%' },
                { src: '/assets/swiggy/Frame%2020%201.svg', alt: 'Full restaurant reviews page with user comments and review highlights' },
                { src: '/assets/swiggy/Group%2057.svg', alt: 'Post-order review submission form — rate, tag, and post anonymously' },
              ].map(({ src, alt }) => (
                <ZoomableImage
                  key={src}
                  src={src}
                  alt={alt}
                  containerClassName="rounded-xl overflow-hidden"
                  containerStyle={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)', height: '280px' }}
                  imgStyle={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
                />
              ))}
            </div>
            <p className="text-center mt-2 text-muted-light italic" style={{ fontSize: 'var(--step--1)' }}>
              Left: review signal on listing · Centre: full reviews page · Right: post-order prompt keeps the corpus fresh
            </p>
          </figure>
        </SolutionCard>

        {/* S03 */}
        <SolutionCard
          num="Solution 03"
          title="Recommendations from friends — discover with trust"
          hypothesis="Since 70.6% try new things on a friend's word, a location-aware feed of friends' picks will drive trial of new restaurants better than algorithmic suggestions alone."
          metricLabel="Proof metric"
          metric="new-restaurant trial rate from the mentions feed"
        >
          <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
            A categorised list of top mentions from friends, filtered to the user's serviceable
            area. Users can recommend back, and a referral loop invites friends who aren't on Swiggy
            yet — turning discovery into low-risk, social trial.
          </p>
          <figure className="my-0">
            <div className="grid grid-cols-3 gap-3">
              {/* Main feed — 2/3 width */}
              <ZoomableImage
                src="/assets/swiggy/image%2037.svg"
                alt="Top Mentions feed — restaurant cards with friend mention counts and Mark as tried option"
                containerClassName="col-span-2 rounded-xl overflow-hidden"
                containerStyle={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)', height: '240px' }}
                imgStyle={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
              />
              {/* Account entry point — 1/3 width */}
              <ZoomableImage
                src="/assets/swiggy/image%2039.svg"
                alt="Account menu showing Recommendations as a top-level entry point"
                containerClassName="rounded-xl overflow-hidden"
                containerStyle={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)', height: '240px' }}
                imgStyle={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>
            <p className="text-center mt-2 text-muted-light italic" style={{ fontSize: 'var(--step--1)' }}>
              Left: friends' Top Mentions feed · Right: Recommendations entry in the account menu
            </p>
          </figure>
        </SolutionCard>
      </CaseStudySection>

      {/* PRIORITIZATION */}
      <CaseStudySection eyebrow="PRIORITISATION" heading="Why Deal Store goes first — even though it's the most work.">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          I scored each bet with RICE.{' '}
          <strong className="text-off-white">How to read it:</strong> Reach = % of target users
          touched · Impact = effect on the decision problem (1–3) · Confidence = certainty from
          evidence (%) · Effort = relative build cost (1–3). Deal Store carries the highest effort,
          yet ranks first — because it reaches{' '}
          <strong className="text-off-white">every</strong> target user with the strongest impact
          and confidence. Reach × impact beats cheapness.
        </p>
        <CaseStudyTable
          columns={[
            { header: 'Bet', key: 'bet' },
            { header: 'Reach', key: 'reach' },
            { header: 'Impact', key: 'impact' },
            { header: 'Confidence', key: 'confidence' },
            { header: 'Effort', key: 'effort' },
            {
              header: 'Score',
              key: 'score',
              renderCell: (v) => (
                <span
                  className="inline-flex rounded-full px-2.5 py-0.5 font-mono font-bold"
                  style={{
                    background: 'rgba(252,128,25,0.15)',
                    color: ACCENT,
                    fontSize: '12px',
                    border: '0.5px solid rgba(252,128,25,0.3)',
                  }}
                >
                  {v}
                </span>
              ),
            },
            { header: 'Read', key: 'read' },
          ]}
          rows={[
            {
              bet: 'Deal Store',
              reach: '100%',
              impact: '3',
              confidence: '100%',
              effort: '3',
              score: '100',
              read: '#1 — all target users, highest impact & confidence despite top effort.',
            },
            {
              bet: 'Recommendations',
              reach: '90%',
              impact: '2',
              confidence: '90%',
              effort: '2',
              score: '81',
              read: '#2 — strong reach & trust effect; depends on social density per location.',
            },
            {
              bet: 'Reviews & ratings',
              reach: '80%',
              impact: '2',
              confidence: '70%',
              effort: '1',
              score: '63',
              read: '#3 — cheapest and useful, but improves context rather than removing overload.',
            },
          ]}
        />
        <InsightCallout label="Reading the scores">
          Deal Store wins not because it's cheapest, but because it's the only feature that
          eliminates the decision problem for every target user. Reviews improve context.
          Recommendations improve trust. Deal Store removes the decision entirely — which is exactly
          what the survey said users need.
        </InsightCallout>
      </CaseStudySection>

      {/* DEMAND TEST */}
      <CaseStudySection eyebrow="I TESTED THIS — FOR REAL" heading="Before building, I checked that anyone actually wanted it.">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          I built a live landing page explaining Deal Store and drove real traffic to it, with a
          single ask: <em>"Get Early Access."</em> It's the cheapest way to test demand before a
          single feature gets built — and the results were the most useful thing I produced.
        </p>

        {/* Landing page — 2×2 grid */}
        <figure className="my-0 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {[
              { src: '/assets/swiggy/Group%2060.svg', alt: 'Landing page hero — Still deciding what to order? Get Early Access' },
              { src: '/assets/swiggy/Group%2061.svg', alt: 'Landing page match-making section' },
              { src: '/assets/swiggy/Group%2062.svg', alt: 'Landing page how it works — Select Preference to Match-Making flow' },
              { src: '/assets/swiggy/Group%2063.svg', alt: 'Landing page testimonials and FAQ' },
            ].map(({ src, alt }) => (
              <ZoomableImage
                key={src}
                src={src}
                alt={alt}
                containerClassName="rounded-xl overflow-hidden"
                containerStyle={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)', height: '340px' }}
                imgStyle={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
              />
            ))}
          </div>
          <p className="text-center mt-2 text-muted-light italic" style={{ fontSize: 'var(--step--1)' }}>
            The actual landing page — hero, match-making, how it works, and testimonials.
          </p>
        </figure>

        {/* Stats — 4-across row */}
        <div
          className="rounded-xl overflow-hidden grid grid-cols-2 sm:grid-cols-4 gap-px mb-8"
          style={{ background: 'var(--color-surface-border)' }}
        >
          <DemandStatCell
            value="~36%"
            label={'of unique visitors hit "Get Early Access" (37 of 103)'}
          />
          <DemandStatCell value="4.5" label="average rating from visitors who responded" />
          <DemandStatCell value="162" label="page views · 103 unique visitors" />
          <DemandStatCell value="22%" label="bounce rate — people stayed and read" />
        </div>

        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          A roughly one-in-three sign-up rate on a cold landing page is a strong demand signal for a
          concept that didn't exist yet. It told me the bet was worth building — and gave me a
          baseline to beat.
        </p>

        <figure className="my-0">
          <ZoomableImage
            src="/assets/swiggy/Group%2064.svg"
            alt="Google Analytics dashboard — users 73, new users 73, bounce rate 22%, pages per session 1.19"
            containerClassName="rounded-xl overflow-hidden"
            containerStyle={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)' }}
            className="w-full h-auto block"
          />
          <p className="text-center mt-3 text-muted-light italic" style={{ fontSize: 'var(--step--1)' }}>
            The actual analytics from the test — receipts, not assumptions.
          </p>
        </figure>
      </CaseStudySection>

      {/* FAIRNESS */}
      <CaseStudySection eyebrow="A PRINCIPLE, NOT A FOOTNOTE" heading="Personalisation has a fairness problem. I designed for it on purpose.">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          The uncomfortable truth about recommending on past behaviour: it concentrates orders on
          already-popular restaurants and starves new or niche ones. Left unchecked, Deal Store
          would quietly make the rich richer and shrink real discovery — bad for partners, and
          eventually for users.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CapabilityCard
            title="The risk"
            body="A self-reinforcing loop: popular places get surfaced, get more orders, get surfaced more. Newer partners never get a fair shot to make business."
          />
          <CapabilityCard
            title="The design choice"
            body='Give untried restaurants a weighted boost in ranking, and tag them "New in town" / "Never tried" — turning fairness into a discovery feature users actually want.'
            isAccent
          />
        </div>
      </CaseStudySection>

      {/* MEASUREMENT */}
      <CaseStudySection eyebrow="HOW I'D MEASURE SUCCESS" heading="Every bet gets a north star and a guardrail.">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          Not a wall of metrics — one number that proves the bet worked, and one that warns if it's
          working the wrong way.
        </p>
        <div className="space-y-3 mb-6">
          {[
            {
              feature: 'Deal Store',
              northStar: 'time-to-order via Deal Store vs. normal flow',
              guardrail: 'null-deal searches (6 tries, no order)',
            },
            {
              feature: 'Recommendations',
              northStar: 'new-restaurant trial rate from mentions feed',
              guardrail: 'order concentration across partners (fairness)',
            },
            {
              feature: 'Reviews & ratings',
              northStar: 'order-rate on items with a review surfaced',
              guardrail: 'review coverage & freshness',
            },
          ].map((row) => (
            <div
              key={row.feature}
              className="rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
              style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
            >
              <p
                className="font-mono font-semibold leading-snug"
                style={{ fontSize: '11px', color: ACCENT }}
              >
                {row.feature}
              </p>
              <div className="sm:col-span-2 space-y-1">
                <p className="flex gap-2 text-muted-light" style={{ fontSize: 'var(--step--1)' }}>
                  <span style={{ color: ACCENT, flexShrink: 0 }}>→</span>
                  <span>
                    <strong className="text-off-white">North star:</strong> {row.northStar}
                  </span>
                </p>
                <p className="flex gap-2 text-muted-light" style={{ fontSize: 'var(--step--1)' }}>
                  <span style={{ color: 'var(--color-muted-light)', flexShrink: 0 }}>→</span>
                  <span>
                    <strong className="text-off-white">Guardrail:</strong> {row.guardrail}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <InsightCallout label="Business case">
          The bet is that <strong style={{ color: ACCENT }}>quick choices lift order frequency and
          conversion</strong> even as AOV dips with discounts — net revenue up. Restaurant-side:
          deals-claimed-per-day, drop-off during deal setup, and the partner-equity guardrail
          above.
        </InsightCallout>
      </CaseStudySection>

      {/* Next */}
      <CaseStudyNext href="/case-studies/push-notifications" title="The Push Notification Playbook →" />
    </CaseStudyLayout>
  );
}
