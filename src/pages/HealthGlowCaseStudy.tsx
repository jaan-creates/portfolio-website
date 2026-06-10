import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';
import CaseStudyMeta from '../components/case-study/CaseStudyMeta';
import StatRow from '../components/case-study/StatRow';
import PullQuote from '../components/case-study/PullQuote';
import PersonaGrid from '../components/case-study/PersonaGrid';
import InsightCallout from '../components/case-study/InsightCallout';
import CaseStudyTable from '../components/case-study/CaseStudyTable';
import CaseStudyNext from '../components/case-study/CaseStudyNext';
import { useTheme } from '../contexts/ThemeContext';

const DARK_ACCENT = '#F07A1E';
const LIGHT_ACCENT = '#C4560F';

function BriefBlock({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-r-xl my-6 p-6"
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-surface-border)',
        borderLeft: `3px solid ${accent}`,
      }}
    >
      {children}
    </div>
  );
}

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-xl my-6 p-5"
      style={{
        background: 'rgba(240,122,30,0.06)',
        border: '0.5px solid rgba(240,122,30,0.2)',
      }}
    >
      <p
        className="font-mono uppercase tracking-[0.1em] mb-2"
        style={{ fontSize: '9px', color: accent }}
      >
        {label}
      </p>
      <p className="text-off-white italic leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
        {children}
      </p>
    </div>
  );
}

function Hypothesis({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-r-xl mb-5 p-4"
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-surface-border)',
        borderLeft: '2px solid var(--color-muted-dark)',
      }}
    >
      <p
        className="font-mono uppercase tracking-[0.1em] mb-2"
        style={{ fontSize: '9px', color: 'var(--color-muted-light)' }}
      >
        Hypothesis
      </p>
      <p className="text-muted-light italic leading-relaxed" style={{ fontSize: '13px' }}>
        {children}
      </p>
    </div>
  );
}

function SolutionCard({
  num,
  title,
  tagline,
  hypothesis,
  children,
}: {
  num: string;
  title: string;
  tagline: string;
  hypothesis: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-xl overflow-hidden mb-6"
      style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
    >
      <div
        className="flex items-start gap-4 p-5"
        style={{ borderBottom: '0.5px solid var(--color-surface-border)' }}
      >
        <div
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm"
          style={{ background: 'rgba(240,122,30,0.15)', color: accent }}
        >
          {num}
        </div>
        <div>
          <p className="font-display font-semibold text-off-white" style={{ fontSize: 'var(--step-0)' }}>
            {title}
          </p>
          <p className="text-muted-light" style={{ fontSize: 'var(--step--1)' }}>
            {tagline}
          </p>
        </div>
      </div>
      <div className="p-5">
        <Hypothesis>{hypothesis}</Hypothesis>
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: { label: string; body: string }[] }) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <ul className="space-y-2 mb-5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-muted-light" style={{ fontSize: 'var(--step--1)' }}>
          <span style={{ color: accent, flexShrink: 0 }}>→</span>
          <span>
            <strong className="text-off-white">{item.label}</strong> — {item.body}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ReflectionList({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <ul className="mt-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-5 py-5"
          style={{ borderBottom: i < items.length - 1 ? '0.5px solid var(--color-surface-border)' : 'none' }}
        >
          <span
            className="font-mono font-bold flex-shrink-0 opacity-40"
            style={{ fontSize: '11px', color: accent, paddingTop: '2px', width: '1.5em' }}
          >
            0{i + 1}
          </span>
          <div>
            <p className="font-display font-semibold text-off-white mb-1" style={{ fontSize: 'var(--step-0)' }}>
              {item.title}
            </p>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function OSTDiagram() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-xl p-6 my-4 overflow-x-auto"
      style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
    >
      <div style={{ minWidth: '540px' }}>
        {/* Root */}
        <div className="flex justify-center mb-4">
          <div
            className="rounded-lg px-4 py-2 font-display font-semibold text-center text-off-white"
            style={{
              background: 'rgba(240,122,30,0.15)',
              border: '0.5px solid rgba(240,122,30,0.35)',
              fontSize: '13px',
            }}
          >
            Business Outcome<br />
            <span style={{ color: accent }}>Increase Revenue</span>
          </div>
        </div>
        {/* Connector */}
        <div className="text-center text-muted-light mb-4" aria-hidden="true">↓</div>
        {/* Product outcomes */}
        <div className="flex justify-center gap-4 mb-4">
          {['No. of Transactions', 'Average Order Value'].map((o) => (
            <div
              key={o}
              className="rounded-lg px-4 py-2 text-center text-off-white font-medium flex-1"
              style={{
                background: 'var(--color-surface-raised)',
                border: '0.5px solid rgba(240,122,30,0.25)',
                fontSize: '12px',
                maxWidth: '200px',
              }}
            >
              Product Outcome<br />{o}
            </div>
          ))}
        </div>
        {/* Connector */}
        <div className="text-center text-muted-light mb-4" aria-hidden="true">↓</div>
        {/* Opportunities */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {[
            'Purchase frequency',
            'No. of active users',
            'Availability of items matching personal needs',
            'No. of items per order',
            'Avg value of items in order',
          ].map((o) => (
            <div
              key={o}
              className="rounded-lg px-3 py-2 text-center text-muted-light"
              style={{
                background: 'var(--color-surface-raised)',
                border: '0.5px solid var(--color-surface-border)',
                fontSize: '11px',
                flex: '1 1 120px',
                maxWidth: '160px',
              }}
            >
              {o}
            </div>
          ))}
        </div>
        {/* Connector */}
        <div className="text-center text-muted-light mb-4" aria-hidden="true">↓</div>
        {/* Solutions */}
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            'Solution 1\nIncentivised signup',
            'Solution 2\nPersonalised search',
            'Solution 3\nUpsell & cross-sell',
            'Solution 4\nLeafy Luxe AI chat',
          ].map((s, i) => {
            const [label, name] = s.split('\n');
            return (
              <div
                key={i}
                className="rounded-lg px-3 py-2 text-center"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '0.5px solid rgba(240,122,30,0.25)',
                  fontSize: '11px',
                  flex: '1 1 110px',
                  maxWidth: '160px',
                }}
              >
                <span className="text-muted-light block">{label}</span>
                <span className="text-off-white font-medium">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HealthGlowCaseStudy() {
  const { theme } = useTheme();
  const ACCENT = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;

  return (
    <CaseStudyLayout
      title="When every shopper is a stranger"
      company="Health & Glow"
      domain="Beauty-Tech"
      accentColor={DARK_ACCENT}
      lightAccentColor={LIGHT_ACCENT}
      lightAccentLargeTextOnly
      readTime="10 min read"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Personalization Strategy', 'Product Teardown', 'E-commerce', 'AI-UX Concept', '2022–23'].map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs font-medium px-2.5 py-1 rounded border border-surface-border bg-surface-raised text-muted-light uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <CaseStudyMeta
        cells={[
          { label: 'My Role', value: 'Independent PM Study' },
          { label: 'Timeline', value: '2022–23' },
          { label: 'Context', value: 'Beauty & personal care e-commerce' },
          { label: 'Outcome', value: '4-part personalization system + AI concept' },
        ]}
      />

      {/* Scope disclaimer */}
      <div
        className="flex gap-3 rounded-xl px-4 py-3 mb-10"
        style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
      >
        <svg className="flex-shrink-0 mt-0.5 opacity-40" width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 8v5M9 6h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
          This is an independent product teardown and concept study. I was not employed by or contracted to Health &amp; Glow. All research is based on publicly available app and web data, user reviews, and secondary market sources.
        </p>
      </div>

      {/* Brief */}
      <CaseStudySection eyebrow="THE BRIEF" heading="Three things, thirty seconds">
        <BriefBlock>
          <p className="text-off-white leading-relaxed mb-3" style={{ fontSize: 'var(--step--1)' }}>
            <strong style={{ color: ACCENT }}>The problem:</strong> Health &amp; Glow has 175+ stores, a growing online presence, and a beauty market that grew 143% in order volume in a single year — but it ranks 7th on Google for beauty product searches and serves every user the same generic homepage.
          </p>
          <p className="text-off-white leading-relaxed mb-3" style={{ fontSize: 'var(--step--1)' }}>
            <strong style={{ color: ACCENT }}>The approach:</strong> Map where anonymity kills conversion. Build a four-part personalization system that progressively turns strangers into known customers — from incentivised signup to an AI skincare consultant built before AI was a product category.
          </p>
          <p className="text-off-white leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
            <strong style={{ color: ACCENT }}>The thesis:</strong> Personalisation isn't a feature set. It's a trust infrastructure. Users who feel seen buy more. Users who feel like strangers leave — and Nykaa is one click away.
          </p>
        </BriefBlock>
      </CaseStudySection>

      {/* Context */}
      <CaseStudySection eyebrow="CONTEXT" heading="The market is running; H&G is walking">
        <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          Founded in 1997, Health &amp; Glow operates one of India's largest networks of beauty and wellness stores — 175+ locations across Bengaluru, Chennai, Hyderabad, Cochin, Mumbai, and more. The offline business is solid. The digital experience is not keeping pace.
        </p>
        <StatRow
          stats={[
            { value: '143%', label: 'Growth in order volumes, beauty & personal care, 2022 vs 2021', isPrimary: true },
            { value: '132%', label: 'Growth in order value in the same period' },
            { value: '7th', label: "H&G's Google ranking for beauty product searches", color: '#F87171' },
            { value: '175+', label: 'Physical stores — trust asset not reflected online' },
          ]}
        />
        <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          Consumers want hyper-personalised products — a specific shade, finish, or scent matched to their unique skin tone or hair type. The demand signal is there. The experience is not.
        </p>
      </CaseStudySection>

      {/* Problem Statement */}
      <CaseStudySection eyebrow="PROBLEM STATEMENT" heading="What we're actually solving">
        <Callout label="Core Problem">
          Health &amp; Glow delivers a generic, one-size-fits-all digital experience to a diverse user base with demonstrably different needs — driving low conversion rates, weak average order value, and churn to better-personalised competitors like Nykaa, even among users who already trust the H&amp;G brand from physical stores.
        </Callout>
        <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          The SEO finding (position 7) matters here, but not for the reason you'd first think. H&amp;G won't win a search marketing war against Amazon and Nykaa overnight. The better lever is retention: improve the experience for the users who <em>do</em> find H&amp;G so that they stay, spend more, and return. Personalisation is the mechanism.
        </p>
      </CaseStudySection>

      {/* Research */}
      <CaseStudySection eyebrow="RESEARCH & DISCOVERY" heading="What the evidence says">
        <h3 className="font-display font-semibold text-off-white mb-3 mt-2" style={{ fontSize: 'var(--step-0)' }}>
          Review synthesis — what users are actually saying
        </h3>
        <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          Analysing app store and platform reviews surfaced two distinct clusters:
        </p>

        <PullQuote>
          "I tried out the Skin Expert option and it gave me pretty accurate results. I've also consulted a dermat before and the results aligned with my doctor's recommendations. Highly recommended for everyone."
          <br />
          <cite style={{ display: 'block', fontSize: '12px', color: 'var(--color-muted-light)', fontStyle: 'normal', marginTop: '8px' }}>— App Store review, June 2022</cite>
        </PullQuote>

        <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          <strong className="text-off-white">Pattern in positive reviews:</strong> The Skin Expert consultation tool is mentioned explicitly in nearly every positive review. This is the key signal. Users who access consultation features — who feel advised rather than just browsed — convert and return. The feature exists; it's just not surfaced effectively.
        </p>
        <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          <strong className="text-off-white">Pattern in negative reviews:</strong> Criticism clusters around price versus competitors and app performance — not product range. H&amp;G has the products. The experience doesn't justify a price premium versus Nykaa or Amazon when the browsing feels identical to a generic catalogue.
        </p>

        <InsightCallout label="Key Insight">
          The Skin Expert already works. Users who find it, love it. The personalization problem is partly a discovery problem: the best feature H&amp;G has is buried for most users.
        </InsightCallout>

        <h3 className="font-display font-semibold text-off-white mb-3 mt-8" style={{ fontSize: 'var(--step-0)' }}>
          Competitive capability analysis
        </h3>
        <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          Not all three competitors are the same threat. Nykaa is the personalization benchmark. Amazon is the recommendation-engine threat. Myntra is a cross-category acquisition risk. Each requires a different response.
        </p>

        <CaseStudyTable
          columns={[
            { header: 'Capability', key: 'capability' },
            {
              header: 'H&G',
              key: 'hg',
              renderCell: (v) => <span style={{ color: v.startsWith('Partial') ? '#FDE68A' : v === 'Weak' || v.startsWith('Generic') || v.startsWith('Basic') || v.startsWith('Limited') || v.startsWith('Minimal') ? '#F87171' : '#A7F3D0', fontSize: '12px' }}>{v}</span>,
            },
            {
              header: 'Nykaa',
              key: 'nykaa',
              renderCell: (v) => <span style={{ color: v.startsWith('Strong') || v.startsWith('Personalised') ? '#A7F3D0' : '#F87171', fontSize: '12px' }}>{v}</span>,
            },
            {
              header: 'Myntra',
              key: 'myntra',
              renderCell: (v) => <span style={{ color: v === 'None' ? '#F87171' : v.startsWith('Partial') ? '#FDE68A' : '#A7F3D0', fontSize: '12px' }}>{v}</span>,
            },
            {
              header: 'Amazon',
              key: 'amazon',
              renderCell: (v) => <span style={{ color: '#A7F3D0', fontSize: '12px' }}>{v}</span>,
            },
          ]}
          rows={[
            { capability: 'Skin consultation / expert tool', hg: 'Partial — app only, hard to find', nykaa: 'Strong', myntra: 'None', amazon: 'None' },
            { capability: 'Personalised home feed', hg: 'Generic — same for all users', nykaa: 'Strong', myntra: 'Strong', amazon: 'Very strong' },
            { capability: 'Search personalisation', hg: 'Basic keyword only', nykaa: 'Personalised by history', myntra: 'Strong', amazon: 'Most advanced' },
            { capability: "Men's grooming section", hg: 'Limited, not prominent', nykaa: 'Strong — dedicated store', myntra: 'Strong', amazon: 'Full range' },
            { capability: 'Loyalty / rewards programme', hg: 'Partial — low visibility', nykaa: 'Strong — Nykaa Pink Club', myntra: 'Partial', amazon: 'Strong — Prime' },
            { capability: 'Cross-sell / recommendations', hg: 'Minimal', nykaa: 'Strong', myntra: 'Strong', amazon: 'Industry benchmark' },
            { capability: 'SEO / organic discoverability', hg: 'Weak — position 7', nykaa: 'Strong — position 1–3', myntra: 'Strong', amazon: 'Very strong' },
          ]}
        />
      </CaseStudySection>

      {/* Personas */}
      <CaseStudySection eyebrow="USER PERSONAS" heading="Who we're designing for">
        <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          H&amp;G's users are not a monolith. Two personas — both real, both underserved — anchor every design decision in this case study.
        </p>
        <PersonaGrid
          personas={[
            {
              avatar: '👩‍💻',
              name: 'Rakhi',
              age: 35,
              meta: ['IT Professional', 'Bangalore', 'Married, 1 child'],
              bio: 'Health-conscious working professional, managing family and career. Household income ~₹1L/month. Values trusted brands and expert advice; limited time to browse.',
              painpointsLabel: 'Goals & Pain Points',
              painpoints: [
                'Wants high-quality personal care from trusted brands in one place',
                'Needs expert advice without store visits',
                'Limited time — needs the right product fast',
                'Worried about ingredients; needs confident, verified recommendations',
                'Price-conscious; generic "deals" feel irrelevant to her specific needs',
              ],
            },
            {
              avatar: '👨‍🏫',
              name: 'Rakesh',
              age: 29,
              meta: ['College Tutor', 'Kochi', 'Grooming-focused'],
              bio: 'Values personal grooming and staying current. Lives with his mother. Interested in a specific range of personal care products — but finds few platforms that serve him without making him feel like an afterthought.',
              painpointsLabel: 'Goals & Pain Points',
              painpoints: [
                'Wants products matched to his specific grooming needs',
                'Needs a low-friction, judgement-free shopping experience',
                'Must use multiple apps to find what he needs — no single destination',
                'Trouble finding products for his skin type',
                'Due to societal norms, uncomfortable buying beauty products in-store',
              ],
            },
          ]}
        />

        <InsightCallout label="Key Strategic Insight">
          Rakesh's discomfort in physical stores is not a niche edge case — it is the strongest strategic argument for why a personalised, private digital experience has value beyond convenience. A man who won't ask a store clerk for moisturiser recommendations will tell an app.
        </InsightCallout>
      </CaseStudySection>

      {/* OST Framework */}
      <CaseStudySection eyebrow="FRAMEWORK" heading="Outcome–Opportunity–Solution Tree">
        <p className="text-muted-light leading-relaxed mb-2" style={{ fontSize: 'var(--step-0)' }}>
          Starting from the business outcome of increasing revenue, the OST breaks down into two product-level levers — grow the number of transactions, and grow the average value of each — and maps the opportunity spaces each solution addresses.
        </p>
        <OSTDiagram />
      </CaseStudySection>

      {/* Solutions */}
      <CaseStudySection eyebrow="SOLUTIONS" heading="Four ways to make strangers feel known">
        <SolutionCard
          num="01"
          title="Incentivised New User Journey"
          tagline="Converting anonymous traffic into known customers"
          hypothesis="We believe an incentivised sign-up flow will increase the share of anonymous sessions converting to identified user profiles — because first-time visitors have no reason to create an account unless the value exchange is immediate, tangible, and relevant to them personally."
        >
          <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
            New users arriving on the H&amp;G platform are currently invisible — the experience can't differentiate a first-time beauty enthusiast from a price hunter from Rakesh. An incentivised onboarding loop changes this:
          </p>
          <BulletList items={[
            { label: 'Spin-to-win landing modal', body: 'Unlocks a discount on first purchase; makes the value exchange playful and immediate.' },
            { label: 'Personalised push nudge', body: 'Once a profile exists, nudge users to complete their preferences survey for better recommendations and a free-delivery reward.' },
            { label: 'Named, personalised SMS/push', body: 'Replace generic "Welcome to H&G" with "Hey [Name], here\'s 30% off your first order" to signal the app knows who they are.' },
          ]} />
        </SolutionCard>

        <SolutionCard
          num="02"
          title="Personalised Search & Brand Discovery"
          tagline="Making the search bar a concierge, not a catalogue"
          hypothesis="We believe personalising the search experience with history-based suggestions and curated brand discovery will increase search-to-cart conversion — because users who see their own past behaviour reflected back to them have lower decision friction and higher confidence in the platform."
        >
          <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
            Based on purchase history, search data, favourites, and social media signal, H&amp;G can curate a search page that works for each user:
          </p>
          <BulletList items={[
            { label: 'Recent search persistence', body: 'Surface the last session\'s searches so users can continue browsing before typing again.' },
            { label: 'Brand shortcuts', body: '"Shop Your Favourite Brands" built from purchase and browse history, reducing time-to-product for repeat users.' },
            { label: 'Previously viewed items', body: 'Allow wishlist add and cart add without re-navigating, removing friction at the last metre.' },
            { label: 'Personalised deal catalogue', body: 'For price-sensitive users, surface deals in products and categories they\'ve already shown interest in, not generic promotions.' },
          ]} />
        </SolutionCard>

        <SolutionCard
          num="03"
          title="Upsell & Cross-sell Across Touchpoints"
          tagline="Personalisation at every moment from home to checkout"
          hypothesis="We believe personalising the home feed, product detail page, and cart with context-aware recommendations will increase average order value — because users presented with relevant adjacent products at the moment of highest intent are more likely to add them than to return and search separately."
        >
          <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
            Three screens, three levers for AOV:
          </p>
          <BulletList items={[
            { label: 'Product Detail Page — H&G Expert Suggestion', body: 'When a user views a product, surface an in-line recommendation: skin-type-appropriate alternatives, "Know Why" explanations, and frequently bought-together items using demographic and preference signals.' },
            { label: 'Cart — "We Think You May Also Like"', body: 'Final-stage cross-sell at highest purchase intent; items curated from history, skin type, and similar-user signals.' },
            { label: 'Home — Personalised banner and inline sections', body: 'Promotions relevant to the user\'s gender, purchase history, and wishlist; reactivation messaging for churned users; continuity section for saved searches up to 6 months old.' },
          ]} />
        </SolutionCard>
      </CaseStudySection>

      {/* Leafy Luxe */}
      <CaseStudySection eyebrow="SOLUTION 04 — THE AI FEATURE" heading="Leafy Luxe">
        <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          This is the part of the case study that deserves the most attention. In 2022–23, before AI assistants became a product category, before "AI-PM" was a job title, I designed a conversational skincare recommendation system for H&amp;G.
        </p>

        <div
          className="rounded-xl overflow-hidden mb-6 relative"
          style={{
            background: 'linear-gradient(145deg, rgba(240,122,30,0.06) 0%, transparent 50%), #141417',
            border: '0.5px solid rgba(240,122,30,0.25)',
          }}
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              top: '-60px', right: '-60px',
              width: '200px', height: '200px',
              background: 'radial-gradient(circle, rgba(240,122,30,0.1) 0%, transparent 65%)',
            }}
          />
          <div className="p-6 relative">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono font-bold uppercase tracking-wider mb-4"
              style={{ background: 'rgba(240,122,30,0.15)', border: '0.5px solid rgba(240,122,30,0.4)', color: ACCENT, fontSize: '10px' }}
            >
              ⚡ AI-UX Concept · 2022–23
            </div>
            <h3 className="font-display font-bold text-off-white mb-1" style={{ fontSize: 'var(--step-1)' }}>
              Leafy Luxe — your skincare genie
            </h3>
            <p className="text-muted-light mb-6" style={{ fontSize: 'var(--step--1)' }}>
              A chat-based AI recommendation persona with a Glow Score, skin analysis, and skin-type-personalised product discovery.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                { title: 'Glow Score', body: 'A gamified skin health metric — tracks completion of skin analysis, product routines, and consultation history. Gives users a goal to progress toward and a reason to return.' },
                { title: 'Skin Analysis', body: 'A guided test that identifies skin type, concerns, and goals. Unlocks type-specific recommendations and powers every subsequent suggestion Leafy makes.' },
                { title: 'Conversational Discovery', body: 'Users describe what they need in natural language. Leafy surfaces relevant products, explains why they match, and lets users pick a category to explore.' },
                { title: 'Always-on Access', body: 'Available at any point in the app journey — not just onboarding. Users can ask mid-browse, mid-cart, or return days later for an updated recommendation.' },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-lg p-4"
                  style={{ background: 'color-mix(in srgb, var(--color-bg) 60%, transparent)', border: '0.5px solid var(--color-surface-border)' }}
                >
                  <p className="font-display font-semibold text-off-white mb-1" style={{ fontSize: '13px' }}>{f.title}</p>
                  <p className="text-muted-light leading-relaxed" style={{ fontSize: '12px' }}>{f.body}</p>
                </div>
              ))}
            </div>
            <div
              className="rounded-lg p-4"
              style={{ background: 'rgba(240,122,30,0.08)', border: '0.5px solid rgba(240,122,30,0.25)' }}
            >
              <p className="text-off-white italic leading-relaxed" style={{ fontSize: '13px' }}>
                <strong style={{ color: ACCENT, fontStyle: 'normal' }}>Why this matters for AI-PM positioning:</strong> Leafy Luxe was designed in 2022–23, when most "AI in e-commerce" meant basic recommendation engines. The design anticipated conversational product discovery, a Glow Score engagement loop (now standard in wellness apps), and personalisation grounded in user-declared preferences rather than inferred signals alone. The concept predates the LLM-era playbook for AI-native features by roughly two years.
              </p>
            </div>
          </div>
        </div>

        <Hypothesis>
          We believe Leafy Luxe will increase return visit rates and recommendation-driven conversion — because users who receive a personalised, educational consultation experience are more likely to trust the platform's product suggestions, return for repeat advice, and build the kind of brand relationship that resists price comparison shopping.
        </Hypothesis>
      </CaseStudySection>

      {/* Prioritisation */}
      <CaseStudySection eyebrow="PRIORITISATION" heading="RICE — how we sequenced the work">
        <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          RICE scoring keeps prioritisation honest. The formula is: <strong className="text-off-white">Score = (Reach × Impact × Confidence) / Effort</strong>. A high-effort feature can still rank first if impact and confidence are high enough — but only if the numbers justify it, not intuition.
        </p>
        <CaseStudyTable
          columns={[
            { header: 'Feature', key: 'feature' },
            { header: 'Reach', key: 'reach' },
            { header: 'Impact', key: 'impact' },
            { header: 'Confidence', key: 'confidence' },
            { header: 'Effort', key: 'effort' },
            {
              header: 'RICE Score',
              key: 'score',
              renderCell: (v) => (
                <span
                  className="inline-flex rounded-full px-2.5 py-0.5 font-mono font-bold"
                  style={{ background: 'rgba(240,122,30,0.15)', color: ACCENT, fontSize: '12px', border: '0.5px solid rgba(240,122,30,0.3)' }}
                >
                  {v}
                </span>
              ),
            },
            {
              header: 'Priority',
              key: 'priority',
              renderCell: (v) => (
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full font-display font-bold"
                  style={{ background: 'rgba(240,122,30,0.15)', color: ACCENT, fontSize: '11px', border: '0.5px solid rgba(240,122,30,0.3)' }}
                >
                  {v}
                </span>
              ),
            },
          ]}
          rows={[
            { feature: 'Upsell & cross-sell personalisation', reach: '100%', impact: '3', confidence: '95%', effort: '3', score: '95', priority: '1' },
            { feature: 'Search & brand discovery', reach: '100%', impact: '2', confidence: '90%', effort: '2', score: '90', priority: '2' },
            { feature: 'Incentivised new user journey', reach: '100%', impact: '1', confidence: '85%', effort: '1', score: '85', priority: '3' },
            { feature: 'Leafy Luxe chatbot', reach: '90%', impact: '3', confidence: '90%', effort: '3', score: '81', priority: '4' },
          ]}
        />
        <div
          className="rounded-lg p-4 mt-4"
          style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)', fontSize: 'var(--step--1)' }}
        >
          <p className="text-muted-light leading-relaxed">
            <strong className="text-off-white">Reading the scores:</strong> Upsell/cross-sell (95) and Search/discovery (90) edge each other out because their Impact-to-Effort ratios are equal — Confidence breaks the tie. The incentivised onboarding scores 85 despite low effort because its Impact is also the lowest of the four. Leafy Luxe ranks last not because it's less valuable, but because lower reach and high build complexity suppress the score. It is the right feature for phase two — after the data infrastructure from solutions 1–3 exists to power it.
          </p>
        </div>
      </CaseStudySection>

      {/* Measurement */}
      <CaseStudySection eyebrow="MEASUREMENT" heading="How we'd know it's working">
        <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          Each solution has a primary metric that validates the hypothesis. These aren't generic KPIs — they're the specific numbers that would confirm or deny the assumption embedded in each feature.
        </p>
        <div className="space-y-3">
          {[
            {
              label: 'Solution 1 — Incentivised Onboarding',
              metrics: [
                '% of sessions converting to identified user profile (anonymous → known)',
                'Personalisation survey completion rate',
                'First-order conversion rate for incentivised vs. control users',
              ],
            },
            {
              label: 'Solution 2 — Search & Discovery',
              metrics: [
                'Search-to-cart conversion rate (personalised vs. generic search page)',
                'Click-through rate on brand discovery section',
                'Return visit rate for users who used "Items Viewed" shortcuts',
              ],
            },
            {
              label: 'Solution 3 — Upsell / Cross-sell',
              metrics: [
                'Average Order Value from "You May Also Like" cart additions',
                'No. of times H&G Expert Suggestion was interacted with per session',
                'Value of items added from personalised homepage sections',
              ],
            },
            {
              label: 'Solution 4 — Leafy Luxe',
              metrics: [
                'Glow Score test completion rate',
                'Recommendation click-through rate from chatbot',
                '30-day return visit rate for chatbot users vs. non-chatbot users',
              ],
            },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
              style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
            >
              <p
                className="font-mono font-semibold leading-snug"
                style={{ fontSize: '11px', color: ACCENT }}
              >
                {row.label}
              </p>
              <ul className="sm:col-span-2 space-y-1">
                {row.metrics.map((m, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-muted-light"
                    style={{ fontSize: 'var(--step--1)' }}
                  >
                    <span style={{ color: ACCENT, flexShrink: 0 }}>→</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* Reflection */}
      <CaseStudySection eyebrow="REFLECTION" heading="What I'd do differently">
        <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          The honest read on this case study — what the work taught me, what I missed, and what I'd scope differently if I returned to it today.
        </p>
        <ReflectionList
          items={[
            {
              title: "Leafy Luxe needs a data strategy I didn't scope",
              body: "Skin-type-based recommendations are only as good as the product taxonomy underneath them. H&G would need every product tagged by skin type, concern, and ingredient profile before Leafy Luxe can make meaningful suggestions. That tagging work is significant — probably a quarter's worth of data infrastructure. I presented the user-facing concept without scoping the backend dependency. In a real engagement, that would have been the first conversation with engineering.",
            },
            {
              title: "Rakesh's insight needed a research study of its own",
              body: "Rakesh's discomfort buying beauty products in-store is the most compelling human insight in this case study — and it's based on inference, not interviews. I built a persona around a societal pattern that I believe to be real, but I didn't validate it. A short qualitative study — even 5 interviews with male grooming enthusiasts in tier-1 and tier-2 cities — would have either confirmed the design direction or surfaced something I hadn't anticipated. Assumptions that strong deserve to be tested.",
            },
            {
              title: 'All four solutions together would require phased ML maturity',
              body: "Building solutions 1 through 4 in parallel would require ML infrastructure — collaborative filtering, preference models, skin-type classifiers — that H&G may not have. A realistic implementation roadmap would start with explicit signals (search history, favourites, declared preferences) in phase one, move to inferred signals (purchase clustering, similar-user models) in phase two, and only then build Leafy Luxe when the data foundation is proven. I presented them as a suite; I should have sequenced them as a maturity curve.",
            },
            {
              title: 'I would have loved to run a competitor usability test',
              body: "The competitive analysis is secondary research — what each platform offers, not how real users experience them. A usability study with 6 users across Nykaa and H&G, exploring the same task (find a serum for oily skin), would have surfaced friction points and delight moments that the capability table can't capture. That kind of comparative insight is what separates a strategy recommendation from a product design brief.",
            },
          ]}
        />
      </CaseStudySection>

      {/* Next */}
      <CaseStudyNext href="/case-studies/rapido" title="Rapido — The Driver No One Heard" />
    </CaseStudyLayout>
  );
}
