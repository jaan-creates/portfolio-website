import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';
import StatRow from '../components/case-study/StatRow';
import BarChart from '../components/case-study/BarChart';
import AppHeader from '../components/case-study/AppHeader';
import ScenarioBar from '../components/case-study/ScenarioBar';
import NotificationCard from '../components/case-study/NotificationCard';
import AssessmentGrid from '../components/case-study/AssessmentGrid';
import InsightCallout from '../components/case-study/InsightCallout';
import BiasCard from '../components/case-study/BiasCard';
import NotificationTimeline from '../components/case-study/NotificationTimeline';
import CaseStudyNext from '../components/case-study/CaseStudyNext';

// ─── App icon definitions — real brand logos ─────────────────────────────────
const MMT_ICON  = { src: '/assets/push playbook/makemytrip.png' };
const NAVI_ICON = { src: '/assets/push playbook/navi.png' };
const ACKO_ICON = { src: '/assets/push playbook/acko.png' };

// ─── Notification grids ──────────────────────────────────────────────────────
const MMT_DAY1 = [
  {
    variant: 'default' as const,
    title: 'A Welcome Offer Just For You!',
    body: 'Unlock limitless travel possibilities & grab the best offers across flights, hotels, bus & more. Use Code: WELCOMEMMT',
    timestamp: '1m ago',
  },
  {
    variant: 'dark' as const,
    title: '🏕 ATTN: SUPER-SAVER MARCH SALE',
    body: 'IS LIVE NOW! Grab up to 35% OFF on flights, holidays, cabs & buses. Valid on Citi Credit & Debit Cards till 19th March ONLY.',
    timestamp: '1m ago',
  },
  {
    variant: 'default' as const,
    title: 'download complete ✓',
    body: 'This BIGGG offer is ready to be grabbed: FLAT 15% OFF on stays in India. Use code: MMTFEDERAL.',
    timestamp: '1h ago',
  },
  {
    variant: 'dark' as const,
    title: 'Our SUPER-SAVER MARCH SALE',
    body: '…brings you FLAT 10% OFF on outstation cabs 😊 Use Citi Credit & Debit Cards (code: MMTCITIFEST).',
    timestamp: '3h ago',
  },
  {
    variant: 'default' as const,
    title: '🤩 Happiness is…',
    body: '…booking domestic flights @ ₹1 & paying the due amt. later with our Book Now Pay Later feature!',
    timestamp: '2m ago',
  },
];

const MMT_DAY2 = [
  {
    variant: 'default' as const,
    title: '"I\'m too Busy to Take a Trip"',
    body: 'Said no one ever! Grab FLAT 10% OFF on domestic flights, valid on SBI Credit Cards (Code: MMTSBI).',
    timestamp: '56m ago',
  },
  {
    variant: 'dark' as const,
    title: '✈️ Flights to Bengaluru',
    body: 'NOW @ FLAT 12% OFF! Offer valid on your 1st booking with us. Use code: WELCOMEMMT to grab this offer.',
    timestamp: '1h ago',
  },
  {
    variant: 'default' as const,
    title: '🚌 Chalo Shuru Karein?',
    body: "Travel bookings? 'Coz here's a deal for your 1st booking ONLY: FLAT 12% OFF on domestic flights.",
    timestamp: '41m ago',
  },
  {
    variant: 'dark' as const,
    title: 'Vo Din Bhi Door Nahi..',
    body: 'Jab aap ek amazing trip par jaoge, with this deal. Get 25% OFF on your 1st hotel booking, only for you.',
    timestamp: '2h ago',
  },
  {
    variant: 'default' as const,
    title: 'ZERO',
    body: 'Yes, now you can book hotels with NO Payment, and pay the full amount later. Tap to explore. T&Cs apply.',
    timestamp: '1h ago',
  },
];

const NAVI_DAY1 = [
  { variant: 'default' as const, title: 'You + Navi Gold = 🌟', body: 'Shuru karo gold mein investment abhi ✨ Start Now' },
  { variant: 'dark' as const,    title: '#MaytheforcebewithYOU ⚡', body: '…and your investments with US! Invest Now' },
  { variant: 'default' as const, title: 'Want CASH upto ₹250 credited..', body: '…in your bank A/C? Complete mutual fund KYC now' },
  { variant: 'dark' as const,    title: 'GOLD SPOT 🌟', body: 'Invest karo 24K Digital Gold mein sirf ₹1 se. Invest Now' },
];

const NAVI_INSURANCE = [
  { variant: 'default' as const, title: '😰 Unexpected hospital bills…', body: '…can cut deep into your pockets!' },
  { variant: 'dark' as const,    title: '30% Indians Suffer from High BP!', body: "Don't let diseases affect your financial goals" },
  { variant: 'default' as const, title: 'Hospital Bill: Rs.0/- 😯?', body: 'Well with Navi it is possible!' },
  { variant: 'dark' as const,    title: '🚀 Rising healthcare cost…', body: '…is a real concern' },
];

const ACKO_DAY4 = [
  {
    variant: 'red' as const,
    title: '⚠️ ALERT – Incomplete Policy Purchase',
    body: "Hey, you're one step away from protecting your bike! 🏍",
    timestamp: 'Sat, 10:31 AM',
  },
  {
    variant: 'ios' as const,
    title: 'It\'s About Time .. 🕐',
    body: '… to care for your bike and insure it! 🙂',
    timestamp: 'Yesterday, 10:32 AM',
  },
];

// ─── Notification grid wrapper ────────────────────────────────────────────────
const GLOW_DELAYS = ['', '-2s', '-3.5s', '-1s', '-4s', '-2.7s'];

function NotifGrid({
  cards,
  icon,
  appName,
  appNameColor,
}: {
  cards: Array<{ variant: 'default' | 'dark' | 'ios' | 'red'; title: string; body: string; timestamp?: string }>;
  icon: typeof MMT_ICON;
  appName: string;
  appNameColor: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
      {cards.map((card, i) => (
        <NotificationCard
          key={i}
          icon={icon}
          appName={appName}
          appNameColor={appNameColor}
          timestamp={card.timestamp}
          title={card.title}
          body={card.body}
          variant={card.variant}
          animDelay={GLOW_DELAYS[i]}
        />
      ))}
    </div>
  );
}

// ─── Cross-app finding cards ──────────────────────────────────────────────────
const CROSS_FINDINGS = [
  {
    num: '01',
    label: 'Frequency',
    color: '#F97316',
    title: 'Volume kills what context builds',
    body: "MakeMyTrip (6/day) and Navi (8/day in the home loan window) exceeded the 5/day unsubscribe threshold. Acko's restraint is a model — but without the recovery sequence to back it up.",
  },
  {
    num: '02',
    label: 'Personalisation',
    color: '#A78BFA',
    title: '400% uplift, 0% adoption',
    body: 'Personalisation improves reaction rates by 400% — yet none of the three apps meaningfully personalised their pushes beyond the triggered topic. No names, no specific products referenced, no behavioural context used in copy.',
  },
  {
    num: '03',
    label: 'Psychology',
    color: '#22C55E',
    title: "MakeMyTrip's bias stack is the benchmark",
    body: '5 distinct cognitive biases identified — Reciprocity, Uncertainty, Scarcity, Loss Aversion, and Novelty. Navi and Acko primarily used emotional appeal and urgency framing but didn\'t architect bias sequences with the same intentionality.',
  },
  {
    num: '04',
    label: 'Language',
    color: '#7F77DD',
    title: 'Hindi is not a default',
    body: "Both MakeMyTrip and Navi sent Hindi-language pushes without language preference signals from the user. For fintech (Navi) in particular, confusion from mismatched language directly erodes trust — the highest-stakes variable in the category.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PushNotificationsCaseStudy() {
  return (
    <CaseStudyLayout
      title="Analysing Push Notifications in Apps"
      company="Thought Leadership"
      domain="Research"
      accentColor="#7F77DD"
      lightAccentColor="#5E55C4"
      readTime="15 min read"
    >
      {/* App badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { icon: MMT_ICON,  name: 'MakeMyTrip' },
          { icon: NAVI_ICON, name: 'Navi' },
          { icon: ACKO_ICON, name: 'Acko' },
        ].map(({ icon, name }) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)' }}
          >
            <img
              src={icon.src}
              alt={`${name} logo`}
              width={22}
              height={22}
              className="flex-shrink-0 rounded-md"
              style={{ width: '22px', height: '22px', objectFit: 'cover' }}
            />
            <span className="font-sans font-medium text-muted-light" style={{ fontSize: '11px' }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* Metadata pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[
          { label: '⏱ 15 min read', variant: 'purple' },
          { label: '3 Apps' },
          { label: '10+ Days Observed' },
          { label: 'Field Research', variant: 'green' },
        ].map(({ label, variant }) => (
          <span
            key={label}
            className="font-mono text-xs font-medium px-3 py-1 rounded-full"
            style={{
              border: variant === 'purple'
                ? '0.5px solid rgba(127,119,221,0.35)'
                : variant === 'green'
                ? '0.5px solid rgba(34,197,94,0.35)'
                : '0.5px solid var(--color-surface-border)',
              color: variant === 'purple' ? '#A78BFA' : variant === 'green' ? '#22C55E' : 'var(--color-muted-light)',
              background: variant === 'purple'
                ? 'rgba(127,119,221,0.08)'
                : variant === 'green'
                ? 'rgba(34,197,94,0.07)'
                : 'var(--color-surface-raised)',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* ── 01 CONTEXT ───────────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="01 — CONTEXT" heading="Why push notifications matter">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          Before looking at individual apps, here's the landscape. Push notifications are one of the
          highest-ROI channels in mobile — when used correctly.
        </p>
        <StatRow
          stats={[
            { value: '46',   label: 'avg push notifications a US smartphone user receives per day', color: '#F97316' },
            { value: '71%',  label: 'boost in 2-month retention from a single well-timed first-week push', color: '#22C55E' },
            { value: '400%', label: 'improvement in reaction rates from personalised vs generic pushes', color: '#A78BFA' },
            { value: '7×',   label: 'higher click rate than email marketing — same message, different channel' },
          ]}
        />
        <BarChart
          title="Push notification volume by industry (% share)"
          rows={[
            { label: 'eCommerce',          percentage: 88, displayValue: '22.03%', colorVariant: 'ec' },
            { label: 'Media & Publishing',  percentage: 75, displayValue: '18.79%', colorVariant: 'md' },
            { label: 'BFSI',               percentage: 33, displayValue: '8.35%',  colorVariant: 'bf' },
            { label: 'Software & SaaS',    percentage: 30, displayValue: '7.62%',  colorVariant: 'sw' },
            { label: 'Education',          percentage: 25, displayValue: '6.37%',  colorVariant: 'ot' },
            { label: 'Healthcare',         percentage: 20, displayValue: '5.01%',  colorVariant: 'ot' },
            { label: 'Travel & Hospitality', percentage: 10, displayValue: '2.61%', colorVariant: 'ot' },
          ]}
        />
        <p className="text-muted-light leading-relaxed mt-4" style={{ fontSize: 'var(--step--1)' }}>
          Two additional numbers that shape this study:{' '}
          <strong className="text-off-white">Unsubscribes stay under 1% if you send ≤5 pushes/day.</strong>{' '}
          Cross that threshold and churn accelerates sharply. Also,{' '}
          <strong className="text-off-white">emojis alone improve reaction rates by 20%</strong> — a
          low-effort, high-impact lever almost all three apps use.
        </p>
      </CaseStudySection>

      {/* ── 02 MAKEMYTRIP ───────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="02 — APP ANALYSIS" heading="MakeMyTrip">
        <AppHeader
          icon={MMT_ICON}
          name="MakeMyTrip"
          subtitle="Travel booking · Observed across Days 1 & 2 as new user"
        />

        <ScenarioBar
          label="Day 1 · Scenario"
          text="New App Installed, User Logged In — No other action taken. 6 notifications received."
        />
        <NotifGrid cards={MMT_DAY1} icon={MMT_ICON} appName="MakeMyTrip" appNameColor="#fbbf24" />
        <AssessmentGrid
          done={[
            { key: 'Timely Offers', description: 'The welcome offer is a good move — it engages users immediately after login, creating incentive on the day when user engagement is at its peak.' },
            { key: 'Rich Media', description: 'Using rich media in push notifications makes them visually engaging and more effective at capturing attention.' },
            { key: 'Feature Highlighting', description: '"Book Now, Pay Later" highlights a useful feature that new users might not be aware of — good educational push embedded in promotional.' },
          ]}
          improve={[
            { key: 'Notification Count', description: '6 notifications on day one after login may cause users to disable all app notifications immediately — exceeding the safe threshold of 5/day.' },
            { key: 'Untailored Content', description: "Offers tied to Citi Bank and Federal Bank won't resonate with all users, potentially lowering engagement across segments." },
            { key: 'Missing Explicit CTAs', description: 'Explicit CTAs like "Book Now" or "Grab This Deal" are more persuasive and drive better conversion than passive notification copy.' },
          ]}
        />

        <ScenarioBar
          label="Day 2 · Scenario"
          text="User opened app, selected flight bookings, searched COK → BLR for a future date, then dropped off. 6 notifications sent."
        />
        <NotifGrid cards={MMT_DAY2} icon={MMT_ICON} appName="MakeMyTrip" appNameColor="#fbbf24" />
        <AssessmentGrid
          done={[
            { key: 'Recognising user activity', description: 'The "Flights to Bengaluru" notification directly acknowledges the user\'s recent search — contextual relevance at its best. This is the one notification that would have the highest open rate of the batch.' },
          ]}
          improve={[
            { key: 'Lack of personalisation', description: "No personalised greetings. The one contextual notification (Bengaluru flights) could have led with the user's name or search date." },
            { key: 'Irrelevant language', description: 'Hindi copy ("Vo Din Bhi Door Nahi", "Chalo Shuru Karein") alienates non-Hindi speakers. Preferred language should be inferred from device settings.' },
            { key: 'Volume fatigue', description: 'Six notifications in one day after a single search session reads as spam. Only the flight deal was contextual — the rest were generic batch sends.' },
          ]}
        />
      </CaseStudySection>

      {/* ── 03 BIASES ───────────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="03 — PSYCHOLOGICAL BIASES" heading="MakeMyTrip's cognitive playbook">
        <p className="text-off-white leading-relaxed mb-2" style={{ fontSize: 'var(--step-0)' }}>
          Beyond the standard promotional cadence, MakeMyTrip deliberately exploits cognitive biases
          to create urgency, reduce risk perception, and drive booking completions.
        </p>
        <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step--1)' }}>
          Five distinct biases were identified across their notification history. This is one of the
          most sophisticated bias stacks observed in Indian travel apps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BiasCard
            biasType="Reciprocity Bias"
            variant="rec"
            notifTimestamp="27/4/2023"
            notifTitle="Your FREE Gift.. 🎁"
            notifBody="This super awesome deal: Up to ₹5000 OFF on relaxing stays in India. Tap to book."
            explanation={<>Framing a discount as a "free gift" triggers <strong className="text-off-white">reciprocity</strong> — users feel inclined to give back when they receive something, making them more likely to complete a booking.</>}
          />
          <BiasCard
            biasType="Uncertainty Bias"
            variant="unc"
            notifTimestamp="Mon, 1:43 PM"
            notifTitle="Unsure of Your Bengaluru Plan?"
            notifBody="Avail our Date Change benefit while booking. Change travel dates easily — pay as low as Rs. 115."
            explanation={<>Acknowledges user anxiety about travel flexibility and <strong className="text-off-white">provides the solution in the same breath</strong> — reducing the perceived risk of booking and lowering commitment friction.</>}
          />
          <BiasCard
            biasType="Scarcity Bias"
            variant="sca"
            notifTimestamp="Fri, 10:02 AM"
            notifTitle="🏕 PRICE DROP ALERT:"
            notifBody="From 11 AM ⏰ TO 2 PM ⏰ Grab up to 20% OFF on domestic flights, using code: FLASHMMT."
            explanation={<>A time-bound price drop creates <strong className="text-off-white">artificial scarcity</strong> (3-hour window) that compresses the user's decision timeline, encouraging immediate action over deliberation.</>}
          />
          <BiasCard
            biasType="Scarcity + FOMO"
            variant="sca"
            notifTimestamp="Sat, 9:29 AM"
            notifTitle="🚨 LIVE FOR TODAY ONLY:"
            notifBody="Blink N Miss Holiday Deals! Grab AMAZING Saturday-only deals on holiday packages. Tap here to explore NOW."
            explanation={<>"Today only" + "Blink N Miss" combines <strong className="text-off-white">temporal scarcity with fear of missing out</strong> — a double-trigger that creates urgency without requiring a specific offer amount.</>}
          />
          <BiasCard
            biasType="Loss Aversion + Anchoring"
            variant="los"
            notifTimestamp="Sat, 11:36 PM"
            notifTitle="Avail Full Refund"
            notifBody="…for your cancelled train tickets with our FREE Cancellation benefit. Book & enjoy 'ZERO' penalty on sudden travel plan changes."
            explanation={<>Promotes cancellation insurance by evoking <strong className="text-off-white">loss aversion</strong> ("avoid losing money") while <strong className="text-off-white">anchoring</strong> on the small upfront cost vs. potential large loss — a classic framing effect.</>}
          />
          <BiasCard
            biasType="Novelty Bias"
            variant="nov"
            notifTimestamp="1:52 PM"
            notifTitle="📢 BOOKINGS OPEN"
            notifBody="…for Kasaragod-Thiruvananthapuram Vande Bharat Express 😊 Tap here to book your train ticket & secure your seat NOW!"
            explanation={<>Timed to a newly inaugurated train, this leverages <strong className="text-off-white">novelty bias</strong> — people pay more attention to new things. Staying current with trending topics amplifies engagement significantly.</>}
          />
        </div>

        <InsightCallout label="Observation">
          MakeMyTrip is the most psychologically sophisticated sender of the three.{' '}
          <strong className="text-off-white">
            Five distinct cognitive levers in a single app's notification history is unusual and
            deliberate.
          </strong>{' '}
          The weakness is volume — the biases work better with restraint. A well-timed Scarcity push
          lands hard. Ten pushes in two days blunts the effect of each one.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 04 NAVI ─────────────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="04 — APP ANALYSIS" heading="Navi">
        <AppHeader
          icon={NAVI_ICON}
          name="Navi"
          subtitle="Fintech — Loans, Insurance, Investments · Observed across Days 1–10+"
        />

        <ScenarioBar
          label="Day 1 · Scenario"
          text="User registers but makes no actions on the app — no KYC, no investment, no loan application."
        />
        <NotifGrid cards={NAVI_DAY1} icon={NAVI_ICON} appName="Navi" appNameColor="#4ade80" />
        <AssessmentGrid
          done={[
            { key: 'Incentivisation', description: "Cash reward for KYC completion is smart — it turns a compliance task into an attractive action. KYC unlocks the entire app, so incentivising it early is good product thinking." },
            { key: 'Communication tone', description: 'Language is direct, actionable, and confident. CTAs like "Complete mutual fund KYC now" and "Invest Now" are clear and don\'t leave the user guessing.' },
          ]}
          improve={[
            { key: 'Personalisation gap', description: "All four notifications are generic. No name, no reference to what the user looked at. A user who just registered needs a reason to trust Navi — not just a push to invest." },
            { key: 'Language preference', description: 'Hindi copy ("Shuru karo gold mein investment") may confuse non-Hindi speakers — a particularly avoidable issue for a fintech where clarity directly affects trust.' },
          ]}
        />
      </CaseStudySection>

      {/* ── 05 NAVI INSURANCE ───────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="05 — NAVI · INSURANCE" heading="Health insurance drop-off">
        <ScenarioBar
          label="Day 4 · Scenario"
          text="Registered user starts checking for health insurance, views policy options — then drops off without purchasing."
        />
        <p className="text-muted-light leading-relaxed my-3" style={{ fontSize: 'var(--step--1)' }}>
          Navi's push strategy here is adaptive and contextually aware — the notifications pivot to
          insurance-related content after the user's explicit intent signal. However, the execution
          has room for more persuasive nudges given the high-intent behaviour observed.
        </p>
        <NotifGrid cards={NAVI_INSURANCE} icon={NAVI_ICON} appName="Navi" appNameColor="#4ade80" />
        <AssessmentGrid
          done={[
            { key: 'Contextual targeting', description: "Pivoting to insurance content immediately after the user browsed insurance shows good behavioural signal capture." },
            { key: 'Emotional appeal', description: 'Evoking concern over hospital bills is a valid approach — financial anxiety is a legitimate purchase motivator for health insurance.' },
            { key: 'Informational approach', description: '"30% Indians suffer from High BP" adds educational value — building awareness rather than just pushing to convert.' },
          ]}
          improve={[
            { key: 'Direct CTA missing', description: '"Rising healthcare cost is a real concern" ends without action. A high-intent user who just viewed insurance options needs "Complete your insurance application" — not a vague observation.' },
            { key: 'No urgency techniques', description: 'With explicit high-intent shown, adding scarcity ("only X plans available at this rate") or social proof ("2,400 people bought this policy this week") would nudge completion significantly.' },
            { key: 'Clarity of messaging', description: "Vague lines like \"Rising healthcare cost is a real concern\" assume the user will make the connection. Be explicit about what Navi specifically solves for them." },
          ]}
        />
      </CaseStudySection>

      {/* ── 06 NAVI HOME LOAN ───────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="06 — NAVI · HOME LOAN" heading="The notification flood">
        <ScenarioBar
          label="Day 10 · Scenario"
          text="User starts applying for a home loan and drops off the application mid-way. Navi sends 8 notifications within a single day — some during sleeping hours."
        />

        {/* Pull stat */}
        <div
          className="flex items-baseline gap-4 py-6 my-4"
          style={{
            borderTop: '0.5px solid var(--color-surface-border)',
            borderBottom: '0.5px solid var(--color-surface-border)',
          }}
        >
          <span
            className="font-mono font-medium leading-none"
            style={{ fontSize: 'clamp(2.5rem,6vw,3.5rem)', color: '#F97316' }}
          >
            8
          </span>
          <p className="font-sans text-muted-light leading-relaxed" style={{ fontSize: '14px', maxWidth: '260px' }}>
            notifications in a single day — including pushes at 4:17 AM. The safe threshold is
            5/day.
          </p>
        </div>

        <NotificationTimeline
          title="Notification timeline — one day"
          warningLabel="⚠ Exceeds threshold"
          entries={[
            { time: '4:17 AM',  message: "You're this close to your dream 🏠 — Apply for a Navi Home Loan", type: 'odd',      tag: 'Odd hour'  },
            { time: '9:09 AM',  message: 'The best 🏠 loan deal is here! Apply now',                         type: 'normal'                    },
            { time: '11:50 AM', message: 'Naya Ghar lijiye befikar — Complete apna application',              type: 'normal'                    },
            { time: '2:17 PM',  message: "You're this close to your dream 🏠 — Apply for a Navi Home Loan", type: 'repeated',  tag: 'Repeated'  },
            { time: '5:32 PM',  message: 'GOLD Reward Alert 🔔 — Get ₹250 on Navi Gold. Claim Now',         type: 'normal'                    },
            { time: '7:09 PM',  message: 'The best 🏠 loan deal is here! Apply now',                         type: 'repeated',  tag: 'Repeated'  },
            { time: '8:00 PM',  message: '🌟 GOLD Promise! — 24K Navi Gold starts @₹1. Buy Now',            type: 'normal'                    },
            { time: '8:26 PM',  message: 'Stay prepared for… unexpected medical emergencies',                 type: 'normal'                    },
          ]}
        />

        <AssessmentGrid
          done={[
            { key: 'Cross-selling breadth', description: 'Navi correctly identifies the ≤14 day window as high-intent, using it to cross-sell gold, mutual funds, and insurance alongside the primary home loan nudge.' },
            { key: 'Behavioural responsiveness', description: 'The pivot to home loan-specific content immediately after the drop-off shows good event-triggered logic in place.' },
          ]}
          improve={[
            { key: 'Frequency & timing', description: "8 pushes in one day — two of which are exact duplicates — is excessive. A 4:17 AM notification on a non-Time Sensitive channel is a trust-breaker. Timing must reflect user's past active hours." },
            { key: 'Repetitive content', description: '"You\'re this close to your dream" and "The best loan deal is here" each appear twice word-for-word. Repetition accelerates fatigue and trains users to ignore the notification entirely.' },
            { key: 'CTA clarity', description: 'Most notifications lack a specific next step. A high-intent user who started an application needs "Resume your home loan application" — not a generic "Apply Now".' },
          ]}
        />

        <InsightCallout label="Critical finding">
          The same message sent twice in one day tells us Navi likely doesn't deduplicate its
          notification queue.{' '}
          <strong className="text-off-white">
            This is a systems problem, not just a content problem.
          </strong>{' '}
          A user who sees the exact same push twice will treat all future pushes as automated noise
          — undoing the entire contextual targeting investment.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 07 ACKO ─────────────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="07 — APP ANALYSIS" heading="Acko">
        <AppHeader
          icon={ACKO_ICON}
          name="Acko"
          subtitle="Insurance — Bike, Health, Travel · Observed across Days 1 & 4"
        />

        <ScenarioBar
          label="Day 1 · Scenario"
          text="User registers, checks fuel prices section, drops off. Zero notifications sent."
        />
        <div
          className="my-3 p-4 rounded-lg font-sans text-sm"
          style={{
            background: 'var(--color-surface)',
            border: '0.5px solid var(--color-surface-border)',
            borderLeft: '2px solid var(--color-muted)',
          }}
        >
          🤫{' '}
          <strong className="text-off-white">No notifications on Day 1.</strong>{' '}
          This is both the right call (no action taken, no context to push on) and a missed
          opportunity (a low-pressure welcome message could have primed the user for future
          engagement).
        </div>

        <ScenarioBar
          label="Day 4 · Scenario"
          text="User proceeds to check bike insurance, views multiple plans — then drops off without purchasing."
        />
        <NotifGrid cards={ACKO_DAY4} icon={ACKO_ICON} appName="Acko" appNameColor="#60a5fa" />
        <AssessmentGrid
          done={[
            { key: 'Recency & relevance', description: "Both notifications are directly tied to the user's most recent action — viewing bike insurance. No generic blasts, no irrelevant cross-sells. Pure intent-based targeting." },
            { key: 'Message positioning', description: '"One step away from protecting your bike" frames the incomplete action as something the user wants to do, not something they abandoned — a subtly more effective frame than "you left something behind".' },
          ]}
          improve={[
            { key: 'Low frequency', description: 'Only 2 notifications over several days for a high-intent drop-off leaves significant recovery opportunity on the table. A 3–5 message sequence with diversified angles would perform better.' },
            { key: 'Zero personalisation', description: 'Acko could reference the specific bike model or insurance plan the user was viewing — "Your Royal Enfield Thunderbird 350 is still uninsured" would outperform the generic "protect your bike".' },
            { key: 'No offers or social proof', description: 'Neither notification mentions a price, discount, or how many people chose this plan. A single trust signal ("4 lakh bike owners chose Acko this month") could significantly raise conversion.' },
          ]}
        />

        <InsightCallout label="Observation">
          Acko is the most restrained of the three — and consequently the least fatiguing.{' '}
          <strong className="text-off-white">
            The quality-to-quantity ratio is the best in this study.
          </strong>{' '}
          The opportunity cost is a higher recovery rate from drop-offs, which a slightly more
          aggressive (but still targeted) sequence would address without undermining trust.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 08 SYNTHESIS ────────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="08 — SYNTHESIS" heading="Cross-app findings">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          Three apps, three different approaches — but the same gaps show up across all of them.
          Here are the four observations that cut across the full study.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CROSS_FINDINGS.map(({ num, label, color, title, body }) => (
            <div
              key={num}
              className="rounded-xl p-5 relative overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-surface-border)',
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: color }}
                aria-hidden="true"
              />
              {/* Faded background number */}
              <span
                aria-hidden="true"
                className="absolute font-mono font-medium select-none pointer-events-none"
                style={{
                  fontSize: '48px',
                  color: color,
                  opacity: 0.12,
                  top: '10px',
                  right: '14px',
                  lineHeight: 1,
                }}
              >
                {num}
              </span>
              <p
                className="font-mono uppercase tracking-[0.1em] mb-2"
                style={{ fontSize: '9px', color }}
              >
                {label}
              </p>
              <h4
                className="font-display font-bold text-off-white mb-2 leading-snug"
                style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)' }}
              >
                {title}
              </h4>
              <p className="font-sans text-muted-light leading-relaxed" style={{ fontSize: '13px' }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <InsightCallout label="The summary verdict">
          All three apps have functional notification infrastructure. The gap is{' '}
          <strong className="text-off-white">
            not in the trigger logic — it's in the content and the cadence.
          </strong>{' '}
          The biggest single intervention that would move the needle for all three: a personalisation
          layer on top of their existing triggered sends, combined with frequency caps and
          deduplication. That alone, applied to Navi's home loan sequence, would likely recover a
          measurable percentage of high-intent drop-offs.
        </InsightCallout>
      </CaseStudySection>

      <CaseStudyNext
        href="/case-studies/push-guidebook"
        label="Companion reference"
        title="The Push Notification Guidebook — all 8 types, anatomy, and the full matrix"
      />
    </CaseStudyLayout>
  );
}
