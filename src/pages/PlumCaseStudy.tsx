import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';
import CaseStudyMeta from '../components/case-study/CaseStudyMeta';
import InsightCallout from '../components/case-study/InsightCallout';
import FindingGrid from '../components/case-study/FindingGrid';
import CaseStudyTable from '../components/case-study/CaseStudyTable';
import ZoomableImage from '../components/ZoomableImage';

/* ── Inline sub-components (Plum-only) ─────────────────────────── */

function StatCard({ value, desc }: { value: React.ReactNode; desc: string }) {
  return (
    <div
      className="bg-surface-raised rounded-xl p-6 relative overflow-hidden"
      style={{ border: '1px solid var(--color-surface-border)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'var(--case-accent)' }}
        aria-hidden="true"
      />
      <div
        className="font-display font-bold text-off-white leading-none mb-3"
        style={{ fontSize: 'var(--step-3)' }}
      >
        {value}
      </div>
      <p className="text-muted-light leading-snug" style={{ fontSize: 'var(--step--1)' }}>
        {desc}
      </p>
    </div>
  );
}

function SolutionCard({
  num,
  title,
  isHero,
  heroLabel,
  children,
}: {
  num: string;
  title: string;
  isHero?: boolean;
  heroLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-8 mb-8 relative"
      style={{
        background: isHero
          ? 'linear-gradient(135deg, var(--color-surface-raised) 0%, rgba(232,81,127,0.06) 100%)'
          : 'var(--color-surface-raised)',
        border: isHero ? '1px solid rgba(232,81,127,0.22)' : '1px solid rgba(255,255,255,0.06)',
        borderLeft: '3px solid var(--case-accent)',
      }}
    >
      {isHero && heroLabel && (
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono font-bold uppercase tracking-wider text-white mb-3"
          style={{ fontSize: '11px', background: 'var(--case-accent)' }}
        >
          ⭐ {heroLabel}
        </span>
      )}
      <p
        className="font-mono uppercase tracking-[0.1em] mb-2"
        style={{ fontSize: '11px', color: 'var(--case-accent)' }}
      >
        {num}
      </p>
      <h3
        className="font-display font-bold text-off-white leading-snug mb-4"
        style={{ fontSize: 'var(--step-1)' }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function SolutionSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="list-none mb-6 space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span
            className="flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center font-display font-bold mt-0.5"
            style={{
              fontSize: '11px',
              color: 'var(--case-accent)',
              background: 'rgba(232,81,127,0.1)',
            }}
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Hypothesis({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg p-5 mt-5"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)' }}
    >
      <p
        className="font-mono uppercase tracking-[0.1em] text-muted-light mb-2"
        style={{ fontSize: '10px' }}
      >
        Hypothesis
      </p>
      <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
        {children}
      </p>
    </div>
  );
}

function WindowItem({
  num,
  title,
  desc,
  tag,
  border,
}: {
  num: string;
  title: string;
  desc: string;
  tag: string;
  border?: boolean;
}) {
  return (
    <div
      className="p-7"
      style={border ? { borderRight: '1px solid var(--color-surface-border)' } : {}}
    >
      <div
        className="font-display font-bold leading-none mb-4"
        style={{ fontSize: '2.5rem', color: 'rgba(232,81,127,0.22)' }}
        aria-hidden="true"
      >
        {num}
      </div>
      <h4
        className="font-display font-semibold text-off-white mb-2"
        style={{ fontSize: 'var(--step-0)' }}
      >
        {title}
      </h4>
      <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
        {desc}
      </p>
      <span
        className="inline-block rounded-full px-3 py-1 font-mono font-semibold uppercase tracking-wide"
        style={{
          fontSize: '11px',
          color: 'var(--case-accent)',
          background: 'rgba(232,81,127,0.1)',
        }}
      >
        {tag}
      </span>
    </div>
  );
}

function ReflectionCard({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div
      className="bg-surface-raised rounded-xl p-6"
      style={{ border: '1px solid var(--color-surface-border)' }}
    >
      <h4
        className="font-display font-semibold text-off-white mb-3 leading-snug"
        style={{ fontSize: 'var(--step-0)' }}
      >
        {heading}
      </h4>
      <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
        {children}
      </p>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */

export default function PlumCaseStudy() {
  return (
    <CaseStudyLayout
      title="Reducing Cancellation & No-shows in Telehealth"
      company="Plum Health"
      domain="B2B2C Healthcare"
      accentColor="#E8517F"
      lightAccentColor="#BE2E61"
      readTime="7 min read"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Healthcare', 'Telehealth', 'Product Teardown', 'RICE', 'Journey Map'].map((tag) => (
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
          { label: 'Company', value: 'Plum Health' },
          { label: 'Domain', value: 'B2B2C Healthcare' },
          { label: 'Type', value: 'Product Teardown' },
          { label: 'Framework', value: 'RICE · Journey Map' },
        ]}
      />

      {/* Context */}
      <CaseStudySection eyebrow="CONTEXT" heading="A platform people trust, but don't show up for">
        <p className="text-off-white leading-relaxed mb-5" style={{ fontSize: 'var(--step-0)' }}>
          Plum helps companies care for their employees through group insurance, wellness programs,
          and — the focus of this study — a mobile teleconsultation platform. Employees and their
          dependents can book virtual doctor appointments at no cost through their employer benefit.
        </p>
        <p className="text-off-white leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          The product works. Employees book. Then they don't show up.{' '}
          <strong className="text-off-white">The problem wasn't trust — it was time.</strong>
        </p>

        <InsightCallout label="Problem Statement">
          "Plum's teleconsultation platform has a high rate of no-shows and cancellations for
          booked tele-appointments — eroding doctor utilization, wasting benefit coverage, and
          leaving employees without the care they intended to get."
        </InsightCallout>
      </CaseStudySection>

      {/* Data */}
      <CaseStudySection eyebrow="THE DATA" heading="Four numbers that frame everything">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            value={<><span style={{ color: 'var(--case-accent)' }}>85</span>%</>}
            desc="of appointments are booked on the same day they're needed — impulsive, under stress"
          />
          <StatCard
            value={<><span style={{ color: 'var(--case-accent)' }}>70</span>%</>}
            desc="of bookings are for self — but 1 in 10 are for a sibling, spouse, or parent"
          />
          <StatCard
            value="⅓"
            desc="of cancellations happen because the user no longer needs the consultation"
          />
          <StatCard
            value={<><span style={{ color: 'var(--case-accent)' }}>2</span>%</>}
            desc="of cancellations are doctor-initiated — small number, but entirely avoidable"
          />
        </div>
      </CaseStudySection>

      {/* Root Cause */}
      <CaseStudySection eyebrow="ROOT CAUSE ANALYSIS" heading="What the data actually says">
        <p className="text-off-white leading-relaxed mb-5" style={{ fontSize: 'var(--step-0)' }}>
          85% same-day bookings plus "urgent meeting" as a top cancellation reason tells a very
          specific story:{' '}
          <strong className="text-off-white">
            users book under stress and cancel when the stressor eases.
          </strong>{' '}
          The appointment fills a felt need in the moment — but that need has a short half-life.
        </p>
        <p className="text-off-white leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          This reframes the problem. It's not that users are unreliable — it's that the{' '}
          <strong className="text-off-white">
            gap between intent and execution is too costly to bridge.
          </strong>{' '}
          Finding a new slot, picking a doctor, rescheduling — each step is friction that outweighs
          a free teleconsult.
        </p>
        <FindingGrid
          findings={[
            {
              icon: '⏱',
              title: 'The scheduling friction gap',
              body: 'When life intervenes, rescheduling is harder than cancelling. The cost of doing nothing is zero. The cost of finding a new slot is real effort.',
            },
            {
              icon: '🧠',
              title: 'Decision fatigue at the wrong moment',
              body: 'Choosing among multiple doctors in an already-stressful moment increases cognitive load, raising abandonment. Choice itself becomes friction.',
            },
            {
              icon: '👥',
              title: 'Dependent bookings are uniquely fragile',
              body: 'Booking for a parent or spouse adds a coordination layer. When plans change for either person, the appointment is the first casualty.',
            },
            {
              icon: '🩺',
              title: 'Provider-side cancellations go unaddressed',
              body: '2% of cancellations are doctor-initiated — a number invisible to most PM analyses. No accountability mechanism exists on the supply side.',
            },
          ]}
        />
      </CaseStudySection>

      {/* User Journey */}
      <CaseStudySection eyebrow="USER JOURNEY" heading="Seven stages, three emotional cliffs">
        <p className="text-off-white leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          I mapped the full teleconsultation lifecycle — from first awareness through the no-show
          outcome — tracking thoughts, emotions, actions, pain points, and opportunities at each
          stage.
        </p>

        {/* Journey map image with zoom */}
        <div className="mb-2">
          <ZoomableImage
            src="/assets/plum/plum-user-journey.png"
            alt="User Journey Map across 7 stages: Awareness, Discovery, Finding a matching slot, Filling appointment details & confirmation, Reschedule an appointment, Cancel an appointment, No show to an appointment — showing emotions, actions, pain points and opportunities at each touchpoint"
            containerClassName="rounded-xl overflow-hidden"
          />
        </div>
        <p
          className="text-muted-light text-center italic mb-8"
          style={{ fontSize: 'var(--step--1)' }}
        >
          Journey map across 7 stages — emotions, pain points, and opportunities identified at each
          touchpoint
        </p>

        <InsightCallout label="Key Observation">
          Three stages stood out as moment-of-truth intervention points: at{' '}
          <strong style={{ color: 'var(--case-accent)' }}>booking</strong> (reduce cognitive
          friction), <strong style={{ color: 'var(--case-accent)' }}>the hours before appointment</strong>{' '}
          (reduce forgetting and last-minute conflicts), and{' '}
          <strong style={{ color: 'var(--case-accent)' }}>the act of cancellation</strong> (convert
          intent-to-cancel into a reschedule).
        </InsightCallout>
      </CaseStudySection>

      {/* Opportunity Space */}
      <CaseStudySection eyebrow="OPPORTUNITY SPACE" heading="Three windows to intervene">
        <p className="text-off-white leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          Rather than designing five unrelated features, I mapped solutions onto three natural
          intervention windows in the user lifecycle. Every feature in this study sits inside one of
          these three zones.
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--color-surface-border)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <WindowItem
              num="01"
              title="At booking"
              desc="Reduce friction in finding alternatives. If the right slot isn't available, surface the next best one immediately — don't make the user hunt."
              tag="Smart Reschedule · Priority Waitlist"
              border
            />
            <WindowItem
              num="02"
              title="At approach"
              desc="Surface timely, contextual nudges in-app and via WhatsApp. Personalized reminders for the user and dependents, with a one-tap reschedule CTA."
              tag="Personalized Section"
              border
            />
            <WindowItem
              num="03"
              title="At cancellation"
              desc="Intercept the cancellation intent. Show matching available slots before the cancellation is confirmed — convert abandonment into a reschedule."
              tag="Reschedule Suggestion · Heal Scoreboard"
            />
          </div>
        </div>
      </CaseStudySection>

      {/* Solutions */}
      <CaseStudySection eyebrow="SOLUTIONS" heading="Five features, one system">
        {/* Solution 1 */}
        <SolutionCard num="Solution 01" title="Smart Reschedule">
          <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
            When a user reschedules, the product immediately surfaces the next available slots for
            their current doctor — alongside high-demand slots from doctors in the same specialty. A
            "Book Any" option delegates selection entirely to the algorithm, eliminating the decision
            fatigue that causes most reschedule abandonments.
          </p>
          <SolutionSteps
            steps={[
              'User clicks "Reschedule" on an existing appointment',
              'Smart Reschedule activates — shows next available slots for their doctor, plus high-demand slots for the same specialty (social proof)',
              '"Book Any" option delegates to the algorithm, removing choice friction entirely',
              'User confirms; appointment details update in-app and via WhatsApp',
            ]}
          />
          <Hypothesis>
            By making rescheduling as fast as cancelling, we expect a{' '}
            <strong style={{ color: 'var(--case-accent)' }}>10% reduction in cancellations</strong>{' '}
            and a{' '}
            <strong style={{ color: 'var(--case-accent)' }}>3% reduction in no-shows</strong>{' '}
            within three months of implementation, among users who typically reschedule or cancel
            same-doctor appointments.
          </Hypothesis>

          {/* Smart Reschedule Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {[2, 3, 4].map((num) => (
              <div key={num} className="flex flex-col">
                <ZoomableImage
                  src={`/assets/plum/Smart-reschedule-${num}.png`}
                  alt={`Smart Reschedule screen ${num}`}
                  className="w-full h-auto object-contain"
                  containerClassName="rounded-lg overflow-hidden h-96"
                />
              </div>
            ))}
          </div>
        </SolutionCard>

        {/* Solution 2 */}
        <SolutionCard num="Solution 02" title="Priority Waitlist">
          <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
            Users who can't find the slot they want are offered a Priority Waitlist — a preference
            to be notified if an earlier slot opens due to a cancellation. This turns every
            cancellation into a positive event for someone else, improving overall slot utilization
            without adding operational overhead.
          </p>
          <SolutionSteps
            steps={[
              'User books an appointment but opts in to "Priority Waitlist Alert" for an earlier slot',
              'Another patient cancels — the system instantly notifies all waitlisted users via their preferred channel',
              'First user to confirm gets the slot; appointment auto-updates',
            ]}
          />
          <Hypothesis>
            Priority Waitlist will reduce no-shows and cancellations by increasing appointment
            flexibility. We anticipate a{' '}
            <strong style={{ color: 'var(--case-accent)' }}>10% decrease in cancellations</strong>{' '}
            and a{' '}
            <strong style={{ color: 'var(--case-accent)' }}>5% decrease in no-shows</strong> within
            four months, primarily for same-day and one-day-advance bookings.
          </Hypothesis>

          {/* Priority Waitlist Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col">
                <ZoomableImage
                  src={`/assets/plum/Priority-waitlist-${num}.png`}
                  alt={`Priority Waitlist screen ${num}`}
                  className="w-full h-auto object-contain"
                  containerClassName="rounded-lg overflow-hidden h-96"
                />
              </div>
            ))}
          </div>
        </SolutionCard>

        {/* Solution 3 — RICE #1 */}
        <SolutionCard num="Solution 03 · RICE Priority #1" title="Reschedule Suggestion on Cancellation">
          <p className="text-muted-light leading-relaxed mb-5" style={{ fontSize: 'var(--step-0)' }}>
            When a user taps "Cancel," the system intercepts with a gentle alternative: "We found 25
            matching slots — want to check availability before cancelling?" This inserts a
            low-friction reschedule prompt at the highest-intent moment in the entire lifecycle.
          </p>
          <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
            The key design tradeoff: show actual slots upfront (immediate) vs. show a count of
            matching slots (intrigue that drives exploration). An A/B test would determine which
            approach converts better.
          </p>
          <SolutionSteps
            steps={[
              'User taps "Cancel" on their appointment',
              'Before cancellation confirms, a bottom sheet shows the count of matching available slots',
              'User can review alternatives or proceed with cancellation — no dark patterns',
            ]}
          />
          <Hypothesis>
            Implementing Reschedule Suggestion will lead to a{' '}
            <strong style={{ color: 'var(--case-accent)' }}>15% decrease in cancellations</strong>{' '}
            within three months. This assumes users considering cancellation are still open to a
            convenient alternative — and that removing search friction is the key blocker.
          </Hypothesis>

          {/* Reschedule Suggestion Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-2xl">
            {[1, 2].map((num) => (
              <div key={num} className="flex flex-col">
                <ZoomableImage
                  src={`/assets/plum/Reschedule-suggestion-${num}.png`}
                  alt={`Reschedule Suggestion screen ${num}`}
                  className="w-full h-auto object-contain"
                  containerClassName="rounded-lg overflow-hidden h-96"
                />
              </div>
            ))}
          </div>
        </SolutionCard>

        {/* Solution 4 — Hero */}
        <SolutionCard
          num="Solution 04"
          title="Heal Scoreboard — Designing for the Doctor Too"
          isHero
          heroLabel="The insight most PMs miss"
        >
          <p className="text-muted-light leading-relaxed mb-5" style={{ fontSize: 'var(--step-0)' }}>
            The data showed that 2% of cancellations were provider-initiated. Small number — easy to
            ignore. I didn't. Doctor cancellations break a promise Plum makes to the employer and
            the employee. And without accountability, there's no incentive to reduce them.
          </p>
          <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
            The Heal Scoreboard is a doctor-facing performance dashboard that tracks cancellation
            rate, punctuality, and patient satisfaction. High scores unlock better platform
            visibility and more referrals. Lower scores trigger improvement suggestions — not
            punishment, but structured accountability.
          </p>
          <SolutionSteps
            steps={[
              'Doctor sees their Heal Score on their dashboard — calculated from cancellations, punctuality, and user feedback',
              'Higher score = better platform visibility, more patient referrals, potential financial incentives',
              'Doctors with lower scores see targeted improvement suggestions, not just a number',
              'Roadmap: leaderboard view for comparative motivation',
            ]}
          />
          <Hypothesis>
            Incorporating a Doctor Scoreboard will motivate providers to avoid cancellations and
            improve service quality. We anticipate a{' '}
            <strong style={{ color: 'var(--case-accent)' }}>
              50% reduction in provider-initiated cancellations
            </strong>{' '}
            within six months — impacting the 2% of consultations currently cancelled by doctors.
          </Hypothesis>

          {/* Heal Scoreboard Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col">
                <ZoomableImage
                  src={`/assets/plum/heal-${num}.png`}
                  alt={`Heal Scoreboard screen ${num}`}
                  className="w-full h-auto object-contain"
                  containerClassName="rounded-lg overflow-hidden h-96"
                />
              </div>
            ))}
          </div>
        </SolutionCard>

        {/* Solution 5 */}
        <SolutionCard num="Solution 05" title="Personalized In-line Section">
          <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
            When a user opens the app, a dynamically personalized banner surfaces based on their
            appointment history, recent no-shows, and family member activity. This creates a passive
            nudge loop — the app proactively surfaces the next right action before the user has to
            think about it.
          </p>
          <SolutionSteps
            steps={[
              'App home screen shows a personalized banner: upcoming appointment, missed consultation prompt, or dependent booking suggestion',
              'CTAs allow one-tap reschedule, cancel, or book-for-dependent actions',
              'Outbound channels (WhatsApp, push, email) reinforce the same personalized content',
              'Section updates in real time as appointment status and user behavior change',
            ]}
          />
          <Hypothesis>
            A personalized section with timely reminders and easy rescheduling access will reduce
            cancellations and no-shows among users who respond to in-app nudges.{' '}
            <strong style={{ color: 'var(--case-accent)' }}>
              Noticeable results within the first 4 weeks
            </strong>{' '}
            of implementation, particularly for dependent bookings.
          </Hypothesis>

          {/* Personalized In-line Section Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-2xl">
            {[1, 2].map((num) => (
              <div key={num} className="flex flex-col">
                <ZoomableImage
                  src={`/assets/plum/Personalized-${num}.png`}
                  alt={`Personalized In-line screen ${num}`}
                  className="w-full h-auto object-contain"
                  containerClassName="rounded-lg overflow-hidden h-96"
                />
              </div>
            ))}
          </div>
        </SolutionCard>
      </CaseStudySection>

      {/* RICE Prioritization */}
      <CaseStudySection eyebrow="PRIORITIZATION" heading="RICE: Which to build first">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          All five features have merit — but resources aren't unlimited. RICE scoring surfaced{' '}
          <strong className="text-off-white">Reschedule Suggestion on Cancellation</strong> as the
          clear priority: 100% reach, highest impact, highest confidence, moderate effort. It's also
          the lowest-risk feature to A/B test.
        </p>

        <CaseStudyTable
          columns={[
            { header: 'Feature', key: 'feature' },
            { header: 'Reach', key: 'reach' },
            { header: 'Impact', key: 'impact' },
            { header: 'Confidence', key: 'confidence' },
            { header: 'Effort', key: 'effort' },
            {
              header: 'Priority',
              key: 'priority',
              renderCell: (val) => (
                <span
                  className="font-display font-bold"
                  style={{
                    fontSize: val === '1' ? 'var(--step-1)' : 'var(--step-0)',
                    color: 'var(--case-accent)',
                  }}
                >
                  {val}
                </span>
              ),
            },
          ]}
          rows={[
            {
              feature: 'Reschedule Suggestion in Cancellation',
              reach: '100%',
              impact: '3',
              confidence: '100%',
              effort: '2',
              priority: '1',
            },
            {
              feature: 'Smart Reschedule',
              reach: '95%',
              impact: '2',
              confidence: '95%',
              effort: '2',
              priority: '2',
            },
            {
              feature: 'Priority Waitlist',
              reach: '90%',
              impact: '1',
              confidence: '90%',
              effort: '1',
              priority: '3',
            },
            {
              feature: 'Heal Scoreboard',
              reach: '90%',
              impact: '2',
              confidence: '85%',
              effort: '3',
              priority: '4',
            },
            {
              feature: 'Personalized In-line Section',
              reach: '75%',
              impact: '3',
              confidence: '80%',
              effort: '3',
              priority: '5',
            },
          ]}
        />

        <InsightCallout label="Why Reschedule Suggestion First">
          It intercepts the user at the highest-intent moment in the lifecycle. It requires no new
          booking infrastructure. And it's the most straightforward to A/B test — show the feature
          to 50% of users attempting to cancel, and measure conversion to reschedule versus control.
          Week-one metrics would tell us everything.
        </InsightCallout>
      </CaseStudySection>

      {/* Reflection */}
      <CaseStudySection eyebrow="IF I SHIPPED THIS" heading="What I'd measure. What I'd do differently.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <ReflectionCard heading="Week 1 north star metric">
            Cancellation-to-reschedule conversion rate on the Reschedule Suggestion feature. If
            users shown the feature convert at ≥20%, the friction hypothesis is confirmed. Below
            that, we'd look at the specific stage of abandonment.
          </ReflectionCard>
          <ReflectionCard heading="The A/B test I'd run first">
            Slot count vs. immediate slot display in the cancellation intercept. The PDF noted this
            open question — I'd resolve it in sprint one, before any other optimization, since it
            affects every downstream conversion assumption.
          </ReflectionCard>
          <ReflectionCard heading="The stakeholder I'd talk to next">
            A doctor. The Heal Scoreboard is an assumption-heavy feature — I'd want to validate
            whether accountability actually motivates reduced cancellations, or whether it creates
            resentment that drives doctors off the platform.
          </ReflectionCard>
          <ReflectionCard heading="What I'd add to the research">
            I'd want a 5-minute post-cancellation interview with 20 users. The data says "urgent
            meeting" is a reason — but I want to know: did you intend to rebook? Did you ever? That
            gap is where retention lives.
          </ReflectionCard>
        </div>

        <InsightCallout label="What this case study taught me">
          The most interesting insight wasn't the scheduling friction — it was the 2% doctor
          cancellation number. Easy to dismiss as noise. But it revealed that the platform had no
          accountability loop for its supply side.{' '}
          <strong style={{ color: 'var(--case-accent)' }}>
            Designing for the overlooked stakeholder is always worth the extra question.
          </strong>
        </InsightCallout>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
