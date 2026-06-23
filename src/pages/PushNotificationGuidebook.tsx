import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';
import CaseStudyTable from '../components/case-study/CaseStudyTable';
import InsightCallout from '../components/case-study/InsightCallout';
import NotificationCard from '../components/case-study/NotificationCard';
import PipelineFlow from '../components/case-study/PipelineFlow';
import PlatformSplit from '../components/case-study/PlatformSplit';
import TypeDefinition from '../components/case-study/TypeDefinition';
import TypeSubCards from '../components/case-study/TypeSubCards';
import AnatomyBlock from '../components/case-study/AnatomyBlock';

// ─── App icons ──────────────────────────────────────────────────────────────
const I = {
  mmt:        { src: '/assets/push playbook/makemytrip.png' },
  duo:        { src: '/assets/push guide/duolingo.png' },
  airbnb:     { src: '/assets/push guide/airbnb.png' },
  tinder:     { src: '/assets/push guide/tinder.png' },
  phonepe:    { src: '/assets/push guide/phonepe.png' },
  acko:       { src: '/assets/push playbook/acko.png' },
  meesho:     { src: '/assets/push guide/meesho.png' },
  navi:       { src: '/assets/push playbook/navi.png' },
  starbucks:  { src: '/assets/push guide/starbucks.png' },
  motherdairy:{ src: '/assets/push guide/mother dairy.png' },
  gmaps:      { src: '/assets/push guide/google maps.png' },
  cred:       { src: '/assets/push guide/cred.png' },
  jupiter:    { src: '/assets/push guide/jupiter.png' },
  amazon:     { src: '/assets/push guide/amazon.png' },
  paytm:      { src: '/assets/push guide/paytm.png' },
  zomato:     { label: 'Z',   bg: '#CB202D',                                  color: '#fff', fontSize: '10px' },
  healthify:  { src: '/assets/push guide/healthify.png' },
  instagram:  { src: '/assets/push guide/instagram.png' },
  linkedin:   { label: 'in',  bg: '#0077B5',                                  color: '#fff', fontSize: '10px' },
  grapevine:  { src: '/assets/push guide/grapevine.png' },
  netflix:    { src: '/assets/push guide/netflix.png' },
  ytmusic:    { label: '▶',  bg: '#FF0000',                                   color: '#fff', fontSize: '10px' },
  storytel:   { src: '/assets/push guide/storytel.png' },
} as const;

// Reusable 2-col notification grid
function NotifGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">{children}</div>;
}

// Sub-section label (e.g. "a — Lifecycle examples")
function SubLabel({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-mono font-semibold uppercase tracking-[0.1em] my-4"
      style={{
        fontSize: '9px',
        background: `${color}1A`,
        border: `0.5px solid ${color}4D`,
        color,
      }}
    >
      {label}
    </div>
  );
}

// ─── Chip styles by variant ──────────────────────────────────────────────────
const OPEN_RATE_COLOR: Record<string, string> = {
  '16–22%': '#A78BFA', '12–18%': '#A78BFA', '14–20%': '#A78BFA',
  '60–75%': '#22C55E',
  '3–15%':  '#F97316',
  '8–14%':  '#A78BFA',
  '5–12%':  '#6B7280',
  '2–8% resp.': '#6B7280',
};

const TYPE_CHIP: Record<string, { bg: string; color: string; border: string }> = {
  'Lifecycle':    { bg:'rgba(127,119,221,.07)', color:'#A78BFA', border:'rgba(127,119,221,.4)' },
  'Remarketing':  { bg:'rgba(249,115,22,.06)',  color:'#F97316', border:'rgba(249,115,22,.35)' },
  'State Change': { bg:'rgba(34,197,94,.06)',   color:'#22C55E', border:'rgba(34,197,94,.35)' },
  'Transactional':{ bg:'rgba(34,197,94,.06)',   color:'#22C55E', border:'rgba(34,197,94,.35)' },
  'Promotional':  { bg:'rgba(249,115,22,.06)',  color:'#F97316', border:'rgba(249,115,22,.35)' },
  'Educational':  { bg:'rgba(167,139,250,.07)', color:'#A78BFA', border:'rgba(167,139,250,.35)' },
  'Behavioral':   { bg:'rgba(127,119,221,.07)', color:'#A78BFA', border:'rgba(127,119,221,.4)'  },
  'Social':       { bg:'rgba(167,139,250,.08)', color:'#A78BFA', border:'rgba(167,139,250,.4)'  },
  'Rating':       { bg:'rgba(34,197,94,.07)',   color:'#22C55E', border:'rgba(34,197,94,.38)'   },
  'Content Rec':  { bg:'rgba(167,139,250,.07)', color:'#A78BFA', border:'rgba(167,139,250,.35)' },
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PushNotificationGuidebook() {
  return (
    <CaseStudyLayout
      title="Push Notification Guidebook"
      company="Thought Leadership"
      domain="Research"
      accentColor="#7F77DD"
      lightAccentColor="#5E55C4"
      readTime="12 min read"
    >
      {/* Metadata pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[
          { label: '⏱ 12 min read', variant: 'purple' },
          { label: '8 Types Covered' },
          { label: '40+ Real Examples' },
          { label: 'PM Reference', variant: 'orange' },
        ].map(({ label, variant }) => (
          <span key={label} className="font-mono text-xs font-medium px-3 py-1 rounded-full"
            style={{
              border: variant === 'purple' ? '0.5px solid rgba(127,119,221,0.35)' : variant === 'orange' ? '0.5px solid rgba(249,115,22,0.35)' : '0.5px solid var(--color-surface-border)',
              color:  variant === 'purple' ? '#A78BFA' : variant === 'orange' ? '#F97316' : 'var(--color-muted-light)',
              background: variant === 'purple' ? 'rgba(127,119,221,0.08)' : variant === 'orange' ? 'rgba(249,115,22,0.07)' : 'var(--color-surface-raised)',
            }}>
            {label}
          </span>
        ))}
      </div>

      {/* ── 01 WHAT ─────────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="01 — INTRODUCTION" heading="What are push notifications?">
        <p className="text-off-white leading-relaxed mb-3" style={{ fontSize: 'var(--step-0)' }}>
          Clickable, time-sensitive messages delivered directly to a device's lock screen or
          notification tray — without the app being open.
        </p>
        <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
          Every push travels through a 5-step pipeline.{' '}
          <strong className="text-off-white">Understanding this architecture</strong> explains why
          delivery latency kills trust, why opt-in rates differ so sharply by platform, and why the
          window between "push sent" and "user acts" is measured in seconds — not minutes.
        </p>

        <PipelineFlow
          steps={[
            { icon: '⚡', label: 'Event\ntrigger' },
            { icon: '🖥', label: 'App\nserver'  },
            { icon: '📡', label: 'Gateway\nFCM/APNs' },
            { icon: '📱', label: 'User\ndevice'  },
            { icon: '👆', label: 'App\nopened'  },
          ]}
        />

        <PlatformSplit
          platforms={[
            {
              name: 'iOS · APNs', icon: '🍎', iconBg: '#1c1c1e',
              rows: [
                { key: 'Opt-in rate',         value: '~51%',  valueColor: '#F97316' },
                { key: 'Permission required', value: 'Always', valueColor: '#22C55E' },
                { key: 'Avg click-through',   value: '2.09%' },
                { key: 'Time Sensitive type', value: 'Supported', valueColor: '#22C55E' },
              ],
            },
            {
              name: 'Android · FCM', icon: '▲', iconBg: '#3ddc84',
              rows: [
                { key: 'Opt-in rate',          value: '~81%',       valueColor: '#22C55E' },
                { key: 'Permission required',  value: 'Android 13+', valueColor: '#F97316' },
                { key: 'Avg click-through',    value: '2.84%' },
                { key: 'Notification channels', value: 'Supported', valueColor: '#22C55E' },
              ],
            },
          ]}
        />

        <InsightCallout label="Key insight">
          Permission architecture is the most consequential decision in your push strategy.{' '}
          <strong className="text-off-white">
            iOS at 51% vs Android at 81% — that 30-point gap defines your channel reach before you
            write a single word of copy.
          </strong>{' '}
          A denied permission requires the user to visit Settings manually to reverse.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 02 ANATOMY ──────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="02 — STRUCTURE" heading="Anatomy of a push">
        <p className="text-off-white leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          Seven building blocks. Most teams optimise one. The apps with 20% open rates optimise all
          seven — each color-coded below by semantic role.
        </p>
        <AnatomyBlock />
        <InsightCallout label="The 2-line rule">
          <strong className="text-off-white">
            73% of users only read the title and the first line of the body.
          </strong>{' '}
          That's your entire message budget. Write for that 73% — the 27% who read further are
          validating a decision already made.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 03 TRIGGERED ────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="03 — TYPE 1" heading="Triggered messages">
        <p className="text-off-white leading-relaxed mb-2" style={{ fontSize: 'var(--step-0)' }}>
          16–22% open rate vs 3–4% for batch. The difference is context: triggered pushes arrive
          when the user's own behaviour has made them meaningful.
        </p>
        <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step--1)' }}>
          Three sub-types —{' '}
          <strong className="text-off-white">Lifecycle</strong> (journey milestones),{' '}
          <strong className="text-off-white">Remarketing</strong> (incomplete actions), and{' '}
          <strong className="text-off-white">State Change</strong> (external context shifts) — each
          with its own trigger logic and risk profile.
        </p>

        <TypeSubCards cards={[
          { variant:'p', chipLabel:'a. Lifecycle', heading:'Journey milestones', body:'Sent at key moments — welcome, milestone, dormant, or churn-risk.', example:'"Sign-up welcome" · "47 days inactive" · "Streak at risk"' },
          { variant:'o', chipLabel:'b. Remarketing', heading:'Incomplete actions', body:'Abandoned cart, browsed without buying, or started and didn\'t finish.', example:'"One step away" · "Just a few more taps"' },
          { variant:'g', chipLabel:'c. State change', heading:'Context shifts', body:'Location (geo-fence), time-based (expiry), or real-world signal.', example:'"Near your favourite store" · "Points expire in 3 days"' },
        ]} />

        <SubLabel label="a — Lifecycle examples" color="#A78BFA" />
        <NotifGrid>
          <NotificationCard icon={I.mmt} appName="MakeMyTrip" appNameColor="#fbbf24" timestamp="just now" title="A Welcome Offer Just For You!" body="Unlock limitless travel & grab the best offers on flights, hotels, bus & more. Expires in 7 days. Code: WELCOMEMMT" chipLabel="Welcome" chipVariant="cp" />
          <NotificationCard icon={I.duo} appName="Duolingo" appNameColor="#4ade80" timestamp="10:06 AM" title="These reminders don't seem to be working. We'll stop sending them for now." chipLabel="Re-engagement · ✦ Clever" chipVariant="cp" variant="dark" animDelay="-2s" />
          <NotificationCard icon={I.airbnb} appName="Airbnb" appNameColor="rgba(255,255,255,0.75)" timestamp="just now" title="Welcome to Airbnb, Lija!" body="Discover places to stay and things to do all around the world." chipLabel="Welcome" chipVariant="cp" variant="ios" animDelay="-3.5s" />
          <NotificationCard icon={I.tinder} appName="Tinder" appNameColor="#fb7185" timestamp="Sun 6:03 PM" title="Your profile is about to be hidden." body="🔒 Open Tinder to continue to be seen by potential matches." chipLabel="Churn risk" chipVariant="cp" animDelay="-1s" />
          <NotificationCard icon={I.phonepe} appName="PhonePe" appNameColor="#a78bfa" timestamp="9:46 am" title="We haven't seen you in 47 days!" body="Here's what you're missing: Exciting rewards · Instant bill payments · New features" chipLabel="47-day dormant" chipVariant="cp" animDelay="-4s" />
        </NotifGrid>

        <SubLabel label="b — Remarketing examples" color="#F97316" />
        <NotifGrid>
          <NotificationCard icon={I.acko} appName="Acko" appNameColor="#60a5fa" timestamp="Sat 10:31 AM" title="⚠️ ALERT – Incomplete Policy Purchase" body="Hey, you're one step away from protecting your bike! 🏍" chipLabel="Incomplete purchase" chipVariant="co" />
          <NotificationCard icon={I.meesho} appName="Meesho" appNameColor="#f472b6" title="Meesho Dost, just a few more taps 🛍" body="Complete your order & Buy Now ⚡" chipLabel="Cart abandonment" chipVariant="co" animDelay="-2s" />
          <NotificationCard icon={I.navi} appName="Navi" appNameColor="#93c5fd" timestamp="Yesterday 7:14 AM" title="Naya Ghar lijiye befikar" body="Complete kariye apna application process aur paye super-fast Navi Home Loan" chipLabel="Incomplete application" chipVariant="co" animDelay="-3.5s" />
        </NotifGrid>

        <SubLabel label="c — State change examples" color="#22C55E" />
        <NotifGrid>
          <NotificationCard icon={I.starbucks} appName="Starbucks" appNameColor="#4ade80" title="Hi Phil! You're near Starbucks Oxford St." body="Currently 50% off on your favorite drink: Vanilla Latte!" chipLabel="Geo-fence" chipVariant="cg" variant="dark" />
          <NotificationCard icon={I.motherdairy} appName="Mother Dairy" appNameColor="#fca5a5" title="Your sign-up reward expires in only 3 days." body="Avail the reward at a Mother Dairy booth near you and enjoy a free Mishti Doi!" chipLabel="Expiry timer" chipVariant="cg" animDelay="-2s" />
          <NotificationCard icon={I.gmaps} appName="Google Maps" appNameColor="rgba(255,255,255,0.75)" timestamp="3:49 PM" title="Time to Work" body="ETA: 32 min (5 mins more than usual) via Earhart Expy" chipLabel="Commute context" chipVariant="cg" variant="ios" animDelay="-3.5s" />
        </NotifGrid>

        <InsightCallout label="Key insight">
          Triggered sends outperform batch 5–7× because{' '}
          <strong className="text-off-white">context is the entire value proposition.</strong>{' '}
          A triggered push arrives with intrinsic meaning — it's a direct response to what the user
          just did, not an interruption imposed on them.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 04 TRANSACTIONAL ────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="04 — TYPE 2" heading="Transactional notifications">
        <p className="text-off-white leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          69% average open rate. Users don't merely tolerate these — they actively look for them.
          Miss one, and trust erodes faster than any UX bug can repair.
        </p>
        <TypeDefinition variant="green">
          Any notification tied to a{' '}
          <strong className="text-off-white">
            financial event or account action the user initiated
          </strong>{' '}
          — payment confirmations, order updates, refunds, billing changes. The user is already
          waiting. Latency is a trust variable, not a technical one.
        </TypeDefinition>

        {/* 69% pull stat */}
        <div className="flex items-baseline gap-4 py-5 mb-4"
          style={{ borderTop:'0.5px solid var(--color-surface-border)', borderBottom:'0.5px solid var(--color-surface-border)' }}>
          <span className="font-mono font-medium leading-none" style={{ fontSize:'clamp(2.5rem,6vw,3.5rem)', color:'#22C55E' }}>69%</span>
          <p className="font-sans text-muted-light leading-relaxed" style={{ fontSize:'14px', maxWidth:'260px' }}>
            average open rate — the highest of any push notification type by a wide margin
          </p>
        </div>

        <NotifGrid>
          <NotificationCard icon={I.cred} appName="CRED" appNameColor="#c084fc" timestamp="3:53 pm" title="your payment was successful" body="that was fast: payment of ₹46,497.00 on your HDFC Bank credit card XXXX-0588 processed in 2 minutes." buttons={[{ label:'Claim Rewards' }, { label:'Rate CRED' }]} chipLabel="Payment confirmed" chipVariant="cg" variant="dark" />
          <NotificationCard icon={I.jupiter} appName="Jupiter" appNameColor="#818cf8" timestamp="8:56 am" title="Money Credited 🎉" body="You've just received ₹10,000 in your account" chipLabel="Money received" chipVariant="cg" animDelay="-2s" />
          <NotificationCard icon={I.meesho} appName="Meesho" appNameColor="#f472b6" timestamp="6m ago" title="Yay! Your order is confirmed 🎉" body="It'll reach you by 28 May! Click to tell your friends about your newest purchase!" chipLabel="Order confirmed" chipVariant="cg" animDelay="-3.5s" />
          <NotificationCard icon={I.amazon} appName="Amazon" appNameColor="#f59e0b" timestamp="Yesterday 6:57 PM" title="Refund Processed" body="Refund of Rs. 909.00 successfully processed for Turquoise Blue Embroidered Top. ARN: 74332743..." chipLabel="Refund processed" chipVariant="cg" animDelay="-1s" />
          <NotificationCard icon={I.amazon} appName="Amazon Pay" appNameColor="#f59e0b" timestamp="Sat 9:55 PM" title="Transaction Failed" body="Your transaction to am*****ay@apl for INR 260.00 has failed. Money has not been debited." chipLabel="Transaction failed" chipVariant="co" variant="red" animDelay="-4s" />
          <NotificationCard icon={I.paytm} appName="Paytm" appNameColor="#38bdf8" timestamp="2:52 pm" title="IRCTC App UPI has requested ₹301.8" body="Tap to pay" buttons={[{ label:'Pay Now', accentColor:'#3b82f6' }, { label:'Decline' }]} chipLabel="Payment request" chipVariant="cb" animDelay="-2.7s" />
        </NotifGrid>

        <InsightCallout label="Key insight">
          Transactional pushes are the only type where{' '}
          <strong className="text-off-white">
            missing one is worse than sending too many.
          </strong>{' '}
          Reliability is a trust signal, not a feature. Users who get immediate payment confirmation
          are measurably more likely to transact again within 24 hours.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 05 PROMOTIONAL ──────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="05 — TYPE 3" heading="Promotional messages">
        <p className="text-off-white leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          Generic batch sends get 3–6% open rates. Personalised sends matched to behaviour get
          10–15%. The difference is not better copy — it's better targeting.
        </p>
        <TypeDefinition variant="orange">
          Revenue-driving notifications: discounts, limited-time offers, sales, and incentives.{' '}
          <strong className="text-off-white">
            The most commonly sent type. Also the most commonly disabled.
          </strong>{' '}
          The line between "timely offer" and "spam" is personalisation and declared intent.
        </TypeDefinition>
        <NotifGrid>
          <NotificationCard icon={I.mmt} appName="MakeMyTrip" appNameColor="#fbbf24" timestamp="Fri 6:45 AM" title="🚀 Flash Sale: Fly Blr→Bom from ₹1,299!" body="Only 4 seats left at this price. Sale ends in 3 hours." buttons={[{ label:'Book Now', accentColor:'#F97316' }]} chipLabel="Flash deal" chipVariant="co" />
          <NotificationCard icon={I.zomato} appName="Zomato" appNameColor="#f87171" timestamp="12:34 PM" title="🍕 30% off your next order. Today only." body="Use code ZOMATO30. Valid on orders above ₹299 from your saved restaurants." chipLabel="Order incentive" chipVariant="co" animDelay="-2s" />
          <NotificationCard icon={I.amazon} appName="Amazon" appNameColor="#f59e0b" timestamp="10:11 AM" title="Price Drop: Item in your wishlist is 40% off" body="Sony WH-1000XM5 ₹17,990 (was ₹29,990). Only 6 left in stock." chipLabel="Wishlist price drop · ✦ Best practice" chipVariant="co" animDelay="-3.5s" />
        </NotifGrid>
        <InsightCallout label="Key insight">
          The Amazon wishlist price-drop push outperforms the generic sale blast by 8–12× because{' '}
          <strong className="text-off-white">
            the user already told you they want the product.
          </strong>{' '}
          Promotional pushes that leverage declared intent are effectively a different channel.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 06 EDUCATIONAL ──────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="06 — TYPE 4" heading="Educational notifications">
        <p className="text-off-white leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          Most teams skip this entirely. The ones who don't report 40–60% improvement in feature
          adoption within the first 30 days of implementation.
        </p>
        <TypeDefinition variant="blue">
          Notifications that{' '}
          <strong className="text-off-white">
            increase the user's capability or awareness
          </strong>{' '}
          — feature introductions, usage tips, how-to prompts, "did you know" moments. Often
          mistaken for onboarding emails. Push has a 12× higher open rate than email for this
          content type.
        </TypeDefinition>
        <NotifGrid>
          <NotificationCard icon={I.phonepe} appName="PhonePe" appNameColor="#a78bfa" timestamp="2:17 PM" title="💡 New: Pay your electricity bill directly" body="Skip the queue. Pay BESCOM, BSES and 200+ utilities from PhonePe in under 30 seconds." chipLabel="Feature discovery" chipVariant="cb" />
          <NotificationCard icon={I.cred} appName="CRED" appNameColor="#c084fc" timestamp="Thu 11:00 AM" title="Your CRED coins expire in 30 days." body="You have 4,200 coins. Here's 3 ways to use them — travel, cashback, or gift cards." chipLabel="Reward education" chipVariant="cb" animDelay="-2s" />
          <NotificationCard icon={I.healthify} appName="Healthify" appNameColor="#4ade80" timestamp="9:30 AM" title="📊 Log water to unlock your streak report" body="Users who log water daily see 28% better weight loss outcomes. Tap to add your first glass today." chipLabel="Usage tip" chipVariant="cb" animDelay="-3.5s" />
        </NotifGrid>
        <InsightCallout label="Key insight">
          <strong className="text-off-white">
            Educational pushes are permanently underused because they lack a direct revenue metric.
          </strong>{' '}
          The correct metric is feature adoption rate. Products that track this consistently report
          2× the 90-day retention of those that don't.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 07 BEHAVIORAL ───────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="07 — TYPE 5" heading="Behavioral notifications">
        <p className="text-off-white leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          Based entirely on what the user has done — or stopped doing. The most emotionally resonant
          type, because they're about the user, not the product.
        </p>
        <TypeDefinition variant="purple">
          Triggered by in-app behavior patterns:{' '}
          <strong className="text-off-white">
            streak protection, milestone celebration, inactivity nudges, or personalised usage-based
            prompts.
          </strong>{' '}
          The data source is your own event log. The psychological lever is identity — "I'm a person
          who does X."
        </TypeDefinition>
        <NotifGrid>
          <NotificationCard icon={I.duo} appName="Duolingo" appNameColor="#4ade80" timestamp="8:56 PM" title="🔥 Don't lose your 47-day streak!" body="You've been on a roll. Just 1 lesson stands between you and keeping it alive. Less than 5 minutes." chipLabel="Streak protection" chipVariant="cp" variant="dark" />
          <NotificationCard icon={I.healthify} appName="Healthify" appNameColor="#4ade80" timestamp="9:00 AM" title="You've logged meals 5 days in a row! 💪" body="One more day unlocks your weekly nutrition report. You're building something real." chipLabel="Milestone" chipVariant="cp" animDelay="-2s" />
          <NotificationCard icon={I.cred} appName="CRED" appNameColor="#c084fc" timestamp="Fri 10:00 AM" title="2 years. Not a single missed payment. ✨" body="That's rare. Less than 4% of users have your credit track record. We think that deserves something." chipLabel="Achievement" chipVariant="cp" variant="dark" animDelay="-3.5s" />
        </NotifGrid>
        <InsightCallout label="Key insight">
          Duolingo's streak is one of the most studied behavioral push systems.{' '}
          <strong className="text-off-white">
            The push is not the feature — the streak is the feature. The push is just the reminder
            that the feature is at risk.
          </strong>{' '}
          Separating "what the user cares about" from "what triggers the notification" is the core
          design insight.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 08 SOCIAL ───────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="08 — TYPE 6" heading="Social notifications">
        <p className="text-off-white leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          High frequency, high unsubscribe risk. Social pushes depend entirely on graph density —
          the same notification has wildly different relevance for a power user vs a passive one.
        </p>
        <TypeDefinition variant="purple">
          Activity from the user's network:{' '}
          <strong className="text-off-white">
            likes, comments, mentions, follows, profile views, or anonymous social signals.
          </strong>{' '}
          Only valuable when the user cares about the actor — which means you need to know who
          matters to whom before you send.
        </TypeDefinition>
        <NotifGrid>
          <NotificationCard icon={I.instagram} appName="Instagram" appNameColor="#f9a8d4" timestamp="2m ago" title="nithya.design and 2 others liked your photo." chipLabel="Like notification" chipVariant="cs" />
          <NotificationCard icon={I.linkedin} appName="LinkedIn" appNameColor="#60a5fa" timestamp="Yesterday" title="5 people viewed your profile in the last 3 days" body="Including 2 from companies you follow. See who's looking." chipLabel="Profile viewed" chipVariant="cs" animDelay="-2s" />
          <NotificationCard icon={I.grapevine} appName="Grapevine" appNameColor="#c084fc" timestamp="10:23 AM" title="Someone in your company just posted anonymously" body="The post is getting traction. Topic: promotions & politics. 47 reactions already." chipLabel="Anonymous social" chipVariant="cs" animDelay="-3.5s" />
        </NotifGrid>
        <InsightCallout label="Key insight">
          Social pushes are the #1 most-disabled notification category in every user survey. The
          problem:{' '}
          <strong className="text-off-white">aggregation kills signal.</strong>{' '}
          "nithya.design liked your photo" is meaningful. "47 people liked your posts this week" is
          spam. Send for the actor, not the aggregate.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 09 RATING ───────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="09 — TYPE 7" heading="Rating & review prompts">
        <p className="text-off-white leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          Sent at the wrong moment: dismissed and resented. Sent right after a positive peak: 4×
          response rate and 0.8 stars higher average rating.
        </p>
        <TypeDefinition variant="purple">
          Requests for the user to rate the app, a delivery, or a service interaction.{' '}
          <strong className="text-off-white">
            The product decision here is almost entirely about timing
          </strong>{' '}
          — the copy barely matters compared to the emotional state of the user when it arrives.
        </TypeDefinition>
        <NotifGrid>
          <NotificationCard icon={I.zomato} appName="Zomato" appNameColor="#f87171" timestamp="1:48 PM" title="How was your Butter Chicken from Spice Garden?" body="Your rating helps other foodies decide. Takes 10 seconds. ⭐⭐⭐⭐⭐" buttons={[{ label:'Rate Now', accentColor:'#22C55E' }, { label:'Skip' }]} chipLabel="Post-delivery" chipVariant="cr" />
          <NotificationCard icon={I.healthify} appName="Healthify" appNameColor="#4ade80" title="You just hit your 7-day streak goal! 🎯" body="Mind rating Healthify on the App Store? It genuinely helps people find us." buttons={[{ label:'Sure!', accentColor:'#22C55E' }, { label:'Not now' }]} chipLabel="After goal hit · ✦ Best practice" chipVariant="cr" animDelay="-2s" />
        </NotifGrid>
        <InsightCallout label="Key insight">
          Apple's SKStoreReviewRequest API limits iOS apps to 3 prompts per year.{' '}
          <strong className="text-off-white">That constraint is a gift.</strong>{' '}
          It forces teams to pick the 3 highest-signal moments deliberately. Teams that do this
          report 0.6–1.2 star improvements in average rating within 6 months.
        </InsightCallout>
      </CaseStudySection>

      {/* ── 10 CONTENT RECS ─────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="10 — TYPE 8" heading="Content recommendations">
        <p className="text-off-white leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
          Netflix sends 40M+ personalised pushes per day — each different. The content is the hook.
          The algorithm is the entire product strategy.
        </p>
        <TypeDefinition variant="blue">
          Algorithmically matched content surfaced to drive re-engagement: new releases,
          personalised playlists, recommended articles.{' '}
          <strong className="text-off-white">
            The key variable is the "because" — explaining why this recommendation is for this
            specific user.
          </strong>
        </TypeDefinition>
        <NotifGrid>
          <NotificationCard icon={I.netflix} appName="Netflix" appNameColor="#f87171" timestamp="Just now" title="New: Stranger Things S5, E3 is available" body="Because you watched the first 4 episodes. 52 minutes." chipLabel="New episode" chipVariant="cb" variant="dark" />
          <NotificationCard icon={I.ytmusic} appName="YouTube Music" appNameColor="#fca5a5" title="Made for you: Rainy afternoon playlist" body="2 hours of calm, based on what you played last Sunday. Hit play when you're ready." chipLabel="Mood-based playlist" chipVariant="cb" animDelay="-2s" />
          <NotificationCard icon={I.storytel} appName="Storytel" appNameColor="#f472b6" timestamp="Morning" title="Based on Atomic Habits: 'The Power of Habit' is here" body="Charles Duhigg · 7h 32m · Starts where Atomic Habits left off." buttons={[{ label:'Start Listening', accentColor:'#7F77DD' }]} chipLabel="Reading match · ✦ 'Because' copy" chipVariant="cb" animDelay="-3.5s" />
        </NotifGrid>
        <InsightCallout label="Key insight">
          Content rec pushes that include the "because" explanation see{' '}
          <strong className="text-off-white">
            2× the click rate of identical recommendations without it.
          </strong>{' '}
          Transparency about the algorithm is a conversion mechanism — not a legal disclosure.
        </InsightCallout>
      </CaseStudySection>

      {/* ── MATRIX ──────────────────────────────────────────────────────── */}
      <CaseStudySection eyebrow="QUICK REFERENCE" heading="All types at a glance">
        <p className="text-off-white leading-relaxed mb-2" style={{ fontSize: 'var(--step-0)' }}>
          Trigger, expected open rate, best use case, and the most common failure mode for every
          type — one table to bookmark.
        </p>
        <CaseStudyTable
          columns={[
            {
              header: 'Type', key: 'type',
              renderCell: (val) => {
                const style = TYPE_CHIP[val] ?? TYPE_CHIP['Lifecycle'];
                return (
                  <span className="font-mono font-semibold rounded inline-flex"
                    style={{ padding:'2px 8px', fontSize:'8px', letterSpacing:'0.09em', textTransform:'uppercase', ...style }}>
                    {val}
                  </span>
                );
              },
            },
            { header: 'Trigger', key: 'trigger' },
            {
              header: 'Avg open rate', key: 'rate',
              renderCell: (val) => (
                <span className="font-mono" style={{ fontSize:'12px', color: OPEN_RATE_COLOR[val] ?? '#A1A1AA' }}>{val}</span>
              ),
            },
            { header: 'Best for', key: 'bestFor' },
            { header: 'Common failure', key: 'failure' },
          ]}
          rows={[
            { type:'Lifecycle',    trigger:'User state change',      rate:'16–22%',    bestFor:'Retention, reactivation',  failure:'Over-automation w/o personalisation' },
            { type:'Remarketing',  trigger:'Incomplete action',       rate:'12–18%',    bestFor:'Conversion recovery',      failure:'Too many → user feels stalked' },
            { type:'State Change', trigger:'Context shift',           rate:'14–20%',    bestFor:'Relevance + urgency',      failure:'Geo permission silently denied' },
            { type:'Transactional',trigger:'User-initiated action',   rate:'60–75%',    bestFor:'Trust, completion',        failure:'Latency destroys the value' },
            { type:'Promotional',  trigger:'Schedule / segment',      rate:'3–15%',     bestFor:'Revenue uplift',           failure:'Generic batch accelerates opt-out' },
            { type:'Educational',  trigger:'Onboarding / launch',     rate:'8–14%',     bestFor:'Feature adoption',         failure:'Too early in journey → ignored' },
            { type:'Behavioral',   trigger:'In-app pattern',          rate:'12–18%',    bestFor:'Habit formation',          failure:'Streak anxiety can drive churn' },
            { type:'Social',       trigger:'Network activity',        rate:'5–12%',     bestFor:'Re-engagement',            failure:'Aggregated signal = ignored' },
            { type:'Rating',       trigger:'Post-positive event',     rate:'2–8% resp.',bestFor:'App store rating',         failure:'Wrong moment = resentment' },
            { type:'Content Rec',  trigger:'Algorithm match',         rate:'8–14%',     bestFor:'Re-engagement',            failure:'No "because" = generic blast' },
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
