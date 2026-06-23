import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';
import CaseStudyMeta from '../components/case-study/CaseStudyMeta';
import PullQuote from '../components/case-study/PullQuote';
import FindingGrid from '../components/case-study/FindingGrid';
import PersonaGrid from '../components/case-study/PersonaGrid';
import InsightCallout from '../components/case-study/InsightCallout';
import CaseStudyTable from '../components/case-study/CaseStudyTable';
import StatRow from '../components/case-study/StatRow';
import CaseStudyNext from '../components/case-study/CaseStudyNext';
import ZoomableFrame from '../components/ZoomableFrame';
import { useTheme } from '../contexts/ThemeContext';

const DARK_ACCENT = '#6C7BF5';
const LIGHT_ACCENT = '#454FC9';

function MarketplaceDiagram() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div
      className="rounded-xl overflow-hidden my-6"
      style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-6 text-center" style={{ borderBottom: '0.5px solid var(--color-surface-border)' }}>
          <div className="text-3xl mb-3">🐾</div>
          <p className="font-display font-semibold text-off-white mb-4" style={{ fontSize: 'var(--step-0)' }}>
            Pet Owners
          </p>
          <ul className="space-y-2">
            {[
              'Discover nearby services',
              'Book & manage appointments',
              'Pet health records',
              'Home service delivery',
              'Trusted, verified providers',
            ].map((item) => (
              <li
                key={item}
                className="text-muted-light rounded-lg px-3 py-2"
                style={{
                  background: 'var(--color-surface)',
                  border: '0.5px solid var(--color-surface-border)',
                  fontSize: 'var(--step--1)',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-col items-center justify-center p-6 gap-4"
          style={{ borderBottom: '0.5px solid var(--color-surface-border)' }}
        >
          <p className="font-mono uppercase tracking-[0.12em] text-muted-light" style={{ fontSize: '9px' }}>
            Demand →
          </p>
          <div
            className="rounded-xl px-5 py-4 text-center w-full"
            style={{
              background: `rgba(108,123,245,0.12)`,
              border: `1px solid ${accent}50`,
              boxShadow: `0 0 28px rgba(108,123,245,0.1)`,
            }}
          >
            <p className="font-display font-bold" style={{ color: accent, fontSize: 'var(--step-1)' }}>
              Pet-Z
            </p>
            <p className="text-muted-light mt-1" style={{ fontSize: '11px' }}>
              The Platform
            </p>
          </div>
          <p className="font-mono uppercase tracking-[0.12em] text-muted-light" style={{ fontSize: '9px' }}>
            ← Supply
          </p>
        </div>

        <div className="p-6 text-center">
          <div className="text-3xl mb-3">🏥</div>
          <p className="font-display font-semibold text-off-white mb-4" style={{ fontSize: 'var(--step-0)' }}>
            Service Providers
          </p>
          <ul className="space-y-2">
            {[
              'Professional digital profile',
              'Scheduling + availability tools',
              'Client acquisition channel',
              'Revenue tracking',
              'Verified trust signals',
            ].map((item) => (
              <li
                key={item}
                className="text-muted-light rounded-lg px-3 py-2"
                style={{
                  background: 'var(--color-surface)',
                  border: '0.5px solid var(--color-surface-border)',
                  fontSize: 'var(--step--1)',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function IframePhone({ src, offset = 0 }: { src: string; offset?: number }) {
  const innerW = 140; // 152px outer - 6px×2 border
  const scale = innerW / 390;
  const innerH = Math.round(844 * scale); // ~303px
  return (
    <div
      style={{
        width: '152px',
        height: `${innerH}px`,
        background: '#1C1C1E',
        borderRadius: '28px',
        border: '6px solid #2C2C2E',
        boxShadow: '0 24px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset',
        overflow: 'hidden',
        flexShrink: 0,
        transform: `translateY(${offset}px)`,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute', top: '6px', left: '50%',
          transform: 'translateX(-50%)',
          width: '48px', height: '14px',
          background: '#1C1C1E', borderRadius: '0 0 10px 10px',
          zIndex: 10,
        }}
      />
      <iframe
        src={src}
        scrolling="no"
        tabIndex={-1}
        style={{
          width: '390px',
          height: '844px',
          border: 'none',
          display: 'block',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function PhoneFrame({ children, offset = 0 }: { children: React.ReactNode; offset?: number }) {
  return (
    <div
      style={{
        width: '152px',
        background: '#1C1C1E',
        borderRadius: '28px',
        border: '6px solid #2C2C2E',
        boxShadow: '0 24px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset',
        overflow: 'hidden',
        flexShrink: 0,
        transform: `translateY(${offset}px)`,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '48px',
          height: '14px',
          background: '#1C1C1E',
          borderRadius: '0 0 10px 10px',
          zIndex: 10,
        }}
      />
      <div style={{ height: '100%', overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

function OwnerHomeScreen() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <PhoneFrame>
      <div style={{ background: '#FAFAFA', padding: '28px 12px 14px', height: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontWeight: 700, fontSize: '9px', color: '#1a1a1a' }}>
          Pet-<span style={{ color: accent }}>Z</span>
        </p>
        <p style={{ fontSize: '7px', color: '#52525B' }}>Home (Flat 120, Kings Tower)</p>
        <p style={{ fontWeight: 700, fontSize: '8px', color: '#1a1a1a' }}>Top Services</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px' }}>
          {[['✂️', 'Grooming'], ['🏥', 'Vet'], ['🛍️', 'Supplies'], ['🎾', 'Training'], ['🏠', 'Boarding'], ['›', 'More']].map(
            ([icon, label], i) => (
              <div
                key={i}
                style={{
                  background: i === 5 ? 'rgba(108,123,245,0.1)' : '#F3F4F6',
                  borderRadius: '5px',
                  padding: '5px 3px',
                  textAlign: 'center',
                  border: i === 5 ? `0.5px solid rgba(108,123,245,0.3)` : 'none',
                }}
              >
                <div style={{ fontSize: '12px' }}>{icon}</div>
                <div style={{ fontSize: '6px', color: i === 5 ? accent : '#52525B' }}>{label}</div>
              </div>
            )
          )}
        </div>
        <p style={{ fontWeight: 700, fontSize: '8px', color: '#1a1a1a' }}>For You</p>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ flex: 1, background: `linear-gradient(135deg, ${accent}, #8B9BFF)`, borderRadius: '6px', padding: '6px' }}>
            <p style={{ fontSize: '7px', fontWeight: 600, color: 'white' }}>Pet adoption nearby</p>
          </div>
          <div style={{ flex: 1, background: 'rgba(108,123,245,0.08)', borderRadius: '6px', padding: '6px', border: `0.5px solid rgba(108,123,245,0.2)` }}>
            <p style={{ fontSize: '7px', color: accent, fontWeight: 600 }}>Pet shelter drives →</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function BookingScreen() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <PhoneFrame offset={20}>
      <div style={{ background: '#FFFFFF', padding: '26px 12px 12px', height: '295px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <p style={{ fontSize: '8px', color: accent, fontWeight: 500 }}>← Grooming</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: `linear-gradient(135deg, #A5B4FC, ${accent})`, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: '8px', fontWeight: 700, color: '#1a1a1a' }}>Squeaky Clean Store</p>
            <p style={{ fontSize: '6.5px', color: '#71717A' }}>JC Road · 3km · ⭐ 4.0</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '3px', overflow: 'hidden' }}>
          {[['NOV 2', 'Mon', true], ['NOV 3', 'Tue', false], ['NOV 4', 'Wed', false]].map(([d, day, active]) => (
            <div key={d as string} style={{ textAlign: 'center', padding: '3px 5px', borderRadius: '5px', fontSize: '6px', background: active ? accent : '#F4F4F5', color: active ? 'white' : '#52525B', flexShrink: 0 }}>
              {d}<br />{day}
            </div>
          ))}
        </div>
        <p style={{ fontSize: '7px', fontWeight: 600, color: '#1a1a1a' }}>Pick your slot</p>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[['9:00 am', true], ['10:00 am', false], ['2:00 pm', false]].map(([t, active]) => (
            <div key={t as string} style={{ padding: '3px 6px', borderRadius: '5px', fontSize: '6.5px', background: active ? 'rgba(108,123,245,0.1)' : '#F4F4F5', color: active ? accent : '#52525B', border: active ? `0.5px solid ${accent}` : 'none' }}>{t}</div>
          ))}
        </div>
        <div style={{ background: '#F8F8FF', borderRadius: '7px', padding: '5px 7px', border: '0.5px solid #E4E4E7' }}>
          <p style={{ fontSize: '7px', fontWeight: 600, color: '#1a1a1a' }}>Basic Grooming</p>
          <p style={{ fontSize: '6px', color: '#71717A' }}>Nail Clip · Ear Clean · Bath</p>
          <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
            <div style={{ background: accent, color: 'white', padding: '2px 5px', borderRadius: '4px', fontSize: '6px', fontWeight: 600 }}>S ₹1300</div>
            <div style={{ background: 'rgba(108,123,245,0.1)', color: accent, padding: '2px 5px', borderRadius: '4px', fontSize: '6px' }}>M ₹1950</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', background: accent, color: 'white', textAlign: 'center', padding: '6px', borderRadius: '7px', fontSize: '7.5px', fontWeight: 600 }}>Book Appointment</div>
      </div>
    </PhoneFrame>
  );
}

function VendorDashboardScreen() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <PhoneFrame>
      <div style={{ background: '#F9F9FB', padding: '26px 12px 12px', height: '320px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <div>
          <p style={{ fontSize: '9px', fontWeight: 700, color: '#1a1a1a' }}>Sam's Vet Clinic</p>
          <p style={{ fontSize: '7px', color: '#71717A' }}>Mumbai · Verified ✓</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          {[['24', 'Bookings/month'], ['4.8', 'Avg rating'], ['₹1.2L', 'Revenue MTD'], ['18', 'Active clients']].map(([num, lbl]) => (
            <div key={lbl} style={{ background: 'white', borderRadius: '7px', padding: '5px 7px', border: '0.5px solid #E4E4E7' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: accent }}>{num}</p>
              <p style={{ fontSize: '6px', color: '#71717A' }}>{lbl}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '7.5px', fontWeight: 600, color: '#1a1a1a' }}>Today's appointments</p>
        {[
          { name: "Emma's Labrador · Bath", time: '9:00 am · Home service', dot: accent },
          { name: "Raghav's Cat · Check-up", time: '11:30 am · On-premise', dot: '#14B8A6' },
        ].map((appt) => (
          <div key={appt.name} style={{ background: 'white', borderRadius: '7px', padding: '5px 7px', border: '0.5px solid #E4E4E7', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: appt.dot, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '7.5px', fontWeight: 600, color: '#1a1a1a' }}>{appt.name}</p>
              <p style={{ fontSize: '6.5px', color: '#71717A' }}>{appt.time}</p>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function AppShowcase() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}>
        <div
          className="px-5 py-4"
          style={{ borderBottom: '0.5px solid var(--color-surface-border)', background: `rgba(108,123,245,0.05)` }}
        >
          <p className="font-mono uppercase tracking-[0.1em]" style={{ fontSize: '10px', color: accent }}>
            Owner App
          </p>
          <p className="font-display font-semibold text-off-white mt-1" style={{ fontSize: 'var(--step-0)' }}>
            Discovery & Booking
          </p>
        </div>
        <div className="flex justify-center gap-3 py-6 px-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <IframePhone src="/assets/petz/home.html" />
          <IframePhone src="/assets/petz/grooming.html" offset={20} />
        </div>
        <div className="px-5 pb-5">
          <p className="text-muted-light mb-3" style={{ fontSize: 'var(--step--1)' }}>
            Location-aware home screen with category navigation and slot-based booking with transparent pricing.
          </p>
          <ul className="space-y-2">
            {[
              'Location-aware discovery across 5 service categories',
              'Filter by distance, rating, and availability',
              'Time-slot booking with pet selection',
              'At-home or on-premise service toggle',
              'Pet health record management (Monthly plan+)',
              'WhatsApp-integrated reminders and confirmations',
            ].map((f) => (
              <li key={f} className="flex gap-2 text-muted-light" style={{ fontSize: 'var(--step--1)' }}>
                <span style={{ color: accent, flexShrink: 0, fontSize: '9px', marginTop: '4px' }}>✦</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)' }}>
        <div
          className="px-5 py-4"
          style={{ borderBottom: '0.5px solid var(--color-surface-border)', background: `rgba(108,123,245,0.05)` }}
        >
          <p className="font-mono uppercase tracking-[0.1em]" style={{ fontSize: '10px', color: accent }}>
            Vendor App
          </p>
          <p className="font-display font-semibold text-off-white mt-1" style={{ fontSize: 'var(--step-0)' }}>
            Dashboard & Growth
          </p>
        </div>
        <div className="flex justify-center py-6 px-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <VendorDashboardScreen />
        </div>
        <div className="px-5 pb-5">
          <p className="text-muted-light mb-3" style={{ fontSize: 'var(--step--1)' }}>
            Vendor dashboard with revenue and booking metrics, profile management, services, pricing, and availability.
          </p>
          <ul className="space-y-2">
            {[
              'Verified registration with KYC and license checks',
              'Profile with services, pricing templates, and availability',
              'Revenue and booking analytics dashboard',
              'Geofencing for home service radius',
              'Multi-location management under one account',
              'Referral and incentive program for vendor acquisition',
            ].map((f) => (
              <li key={f} className="flex gap-2 text-muted-light" style={{ fontSize: 'var(--step--1)' }}>
                <span style={{ color: accent, flexShrink: 0, fontSize: '9px', marginTop: '4px' }}>✦</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function UserFlow() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  const steps = [
    { icon: '📲', text: 'Download', sub: 'Organic / referral', highlight: false },
    { icon: '📍', text: 'Set Location', sub: 'Auto-detect or manual', highlight: false },
    { icon: '🔍', text: 'Browse', sub: 'Category or search', highlight: false },
    { icon: '⚙️', text: 'Filter', sub: 'Distance, price, rating', highlight: false },
    { icon: '🐾', text: 'Select Provider', sub: 'View profile + reviews', highlight: true },
    { icon: '🗓️', text: 'Pick Slot', sub: 'Date + time + pet', highlight: true },
    { icon: '💳', text: 'Pay', sub: 'Saved method or new', highlight: false },
    { icon: '✅', text: 'Confirmed', sub: 'WhatsApp + in-app', highlight: false },
    { icon: '⭐', text: 'Appointment', sub: 'Complete + review', highlight: false },
  ];

  return (
    <div className="overflow-x-auto pb-4 mt-6">
      <div className="flex items-center" style={{ minWidth: 'max-content', gap: 0 }}>
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div
              className="flex flex-col items-center text-center px-3 py-3 rounded-xl"
              style={{
                minWidth: '88px',
                background: step.highlight ? `rgba(108,123,245,0.12)` : 'var(--color-surface-raised)',
                border: `0.5px solid ${step.highlight ? accent + '50' : 'var(--color-surface-border)'}`,
              }}
            >
              <span style={{ fontSize: '18px', marginBottom: '4px' }}>{step.icon}</span>
              <p className="font-display font-semibold text-off-white" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                {step.text}
              </p>
              <p className="text-muted-light" style={{ fontSize: '9px', marginTop: '2px', whiteSpace: 'nowrap' }}>
                {step.sub}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-1.5 opacity-30" aria-hidden="true" style={{ color: '#A1A1AA' }}>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0 4.5h11M7.5 1l4 3.5-4 3.5" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingTiers() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;
  const tiers = [
    {
      name: 'Free Plan',
      tagline: 'Try the experience, earn trust',
      features: [
        'Unlimited free deliveries',
        'Pet-Z Saver promotional offers',
        'Ad-free experience',
        'Same day delivery',
        'Schedule Services',
        'Basic Pet Record Management',
      ],
      rationale:
        "Must be genuinely useful without payment. If the free plan doesn't create a weekly habit, the upgrade path is broken from day one.",
      featured: false,
    },
    {
      name: 'Monthly Plan',
      tagline: "For owners who've found their vet",
      features: [
        '10 free deliveries (<5 km)',
        'Pet Healthcare Record Management',
        'Video Appointments with vets',
        'Pawer Saver offers',
        'Same day delivery',
        'Schedule Service',
        'Ad-free experience',
      ],
      rationale:
        "Healthcare records and video consults are the unlock. When a pet owner has health history in the app, switching cost rises meaningfully.",
      featured: true,
    },
    {
      name: '3-Month Plan',
      tagline: 'For committed pet parents',
      features: [
        'Unlimited free deliveries',
        'All Monthly plan features',
        'Schedule Service (extended)',
        'Priority support',
        'Early access to new services',
      ],
      rationale:
        "The 3-month commitment smooths revenue predictability. Discount incentive over monthly encourages the lock-in that makes LTV calculable.",
      featured: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className="rounded-xl p-6 flex flex-col gap-4 relative"
          style={{
            background: 'var(--color-surface)',
            border: tier.featured ? `1px solid ${accent}55` : '0.5px solid var(--color-surface-border)',
            boxShadow: tier.featured ? `0 0 32px rgba(108,123,245,0.07)` : 'none',
          }}
        >
          {tier.featured && (
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-full text-white"
              style={{ background: accent, fontSize: '9px', whiteSpace: 'nowrap' }}
            >
              Most Popular
            </div>
          )}
          <div>
            <p className="font-display font-bold text-off-white" style={{ fontSize: 'var(--step-0)' }}>
              {tier.name}
            </p>
            <p className="text-muted-light mt-1" style={{ fontSize: 'var(--step--1)' }}>
              {tier.tagline}
            </p>
          </div>
          <ul className="space-y-2 flex-1">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2 text-muted-light" style={{ fontSize: 'var(--step--1)' }}>
                <span style={{ color: accent, flexShrink: 0, fontSize: '10px', marginTop: '3px' }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
          <div
            className="rounded-lg p-3"
            style={{ background: 'var(--color-surface)', borderLeft: `2px solid ${accent}40` }}
          >
            <p className="text-muted-light italic leading-relaxed" style={{ fontSize: '12px' }}>
              {tier.rationale}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const JOURNEY_STAGES = [
  {
    num: '01',
    name: 'Need Arises',
    feel: 'Anxious',
    feelClass: 'low' as const,
    doing: 'Pet falls sick or is overdue for grooming. Something needs to happen, now.',
    pain: 'Urgency with no obvious first step or trusted go-to.',
    opp: 'One-tap category access; nearby services surfaced instantly on the home screen.',
  },
  {
    num: '02',
    name: 'Discovery',
    feel: 'Overwhelmed',
    feelClass: 'low' as const,
    doing: 'Asks friends, searches Google, scrolls Instagram and WhatsApp groups.',
    pain: 'No trusted source. Conflicting advice. The lowest point of the journey.',
    opp: 'Verified, rated providers filtered by distance — discovery becomes a single screen.',
  },
  {
    num: '03',
    name: 'Evaluation',
    feel: 'Cautious',
    feelClass: 'mid' as const,
    doing: "Compares clinics, reads reviews, weighs price against distance.",
    pain: "Can't judge quality or price upfront; everything is opaque.",
    opp: 'Transparent pricing, ratings, and detailed provider profiles side by side.',
  },
  {
    num: '04',
    name: 'Booking',
    feel: 'Hopeful',
    feelClass: 'high' as const,
    doing: 'Picks a slot, selects the pet, and pays — the moment of commitment.',
    pain: '"Will they actually confirm? Will they show up?"',
    opp: 'Instant confirmation plus a WhatsApp receipt turns hope into certainty.',
  },
  {
    num: '05',
    name: 'The Wait',
    feel: 'Uncertain',
    feelClass: 'low' as const,
    doing: 'Waits for appointment day, quietly second-guessing the choice.',
    pain: 'Silence breeds doubt; no reminder, no easy way to adjust plans.',
    opp: 'Timely reminder nudges and a frictionless reschedule keep confidence alive.',
  },
  {
    num: '06',
    name: 'Appointment',
    feel: 'Relieved',
    feelClass: 'high' as const,
    doing: 'Service happens — at home or on premise. The promise is tested.',
    pain: 'A late or cancelled provider collapses all the trust built so far.',
    opp: 'Provider reliability scoring and status tracking protect the peak moment.',
  },
  {
    num: '07',
    name: 'Aftercare',
    feel: 'Loyal',
    feelClass: 'high' as const,
    doing: 'Leaves a review, saves records, and considers the next booking.',
    pain: 'Records lost between visits; every next time starts from scratch.',
    opp: 'Saved health records and one-tap rebook turn a transaction into a habit.',
  },
];

const FEEL_STYLES: Record<'low' | 'mid' | 'high', React.CSSProperties> = {
  low: {
    background: 'rgba(244,114,114,0.1)',
    color: '#F47272',
    border: '1px solid rgba(244,114,114,0.22)',
    borderRadius: '999px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: 600,
    display: 'inline-block',
  },
  mid: {
    background: 'rgba(161,161,170,0.08)',
    color: '#A1A1AA',
    border: '1px solid rgba(161,161,170,0.18)',
    borderRadius: '999px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: 600,
    display: 'inline-block',
  },
  high: {
    background: 'rgba(20,184,166,0.1)',
    color: '#14B8A6',
    border: '1px solid rgba(20,184,166,0.22)',
    borderRadius: '999px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: 600,
    display: 'inline-block',
  },
};

function JourneyMap() {
  const { theme } = useTheme();
  const accent = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;

  return (
    <div className="mt-8">
      {/* Emotion curve */}
      <div
        className="rounded-t-xl overflow-hidden relative"
        style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-surface-border)', borderBottom: 'none', paddingTop: '40px', paddingBottom: '8px' }}
      >
        <span
          className="absolute font-mono uppercase tracking-[0.1em]"
          style={{ top: '14px', left: '20px', fontSize: '10px', color: 'var(--color-muted-light)' }}
        >
          Emotional High → Low across the journey
        </span>
        <svg
          viewBox="0 0 1120 220"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          aria-label="Emotion curve across the owner journey"
          role="img"
        >
          <defs>
            <linearGradient id="petzCurveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* neutral line */}
          <line x1="40" y1="120" x2="1080" y2="120" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 6" />
          <text x="44" y="115" fontSize="10" fontFamily="Inter, sans-serif" style={{ fill: 'var(--color-muted-light)' }}>neutral</text>
          {/* area fill */}
          <path
            d="M80,148 C160,162 160,164 240,166 C320,162 320,134 400,132 C480,124 480,88 560,78 C640,74 640,122 720,123 C800,119 800,56 880,51 C960,48 960,64 1040,69 L1040,200 L80,200 Z"
            fill="url(#petzCurveFill)"
          />
          {/* curve line */}
          <path
            d="M80,148 C160,162 160,164 240,166 C320,162 320,134 400,132 C480,124 480,88 560,78 C640,74 640,122 720,123 C800,119 800,56 880,51 C960,48 960,64 1040,69"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* emotion dots */}
          {[
            { cx: 80,   cy: 148, stroke: '#F47272', emoji: '😰', ey: 132 },
            { cx: 240,  cy: 166, stroke: '#F47272', emoji: '😵', ey: 186 },
            { cx: 400,  cy: 132, stroke: '#A1A1AA', emoji: '🤔', ey: 116 },
            { cx: 560,  cy: 78,  stroke: '#14B8A6', emoji: '🙂', ey: 62  },
            { cx: 720,  cy: 123, stroke: '#F47272', emoji: '😟', ey: 145 },
            { cx: 880,  cy: 51,  stroke: '#14B8A6', emoji: '😊', ey: 35  },
            { cx: 1040, cy: 69,  stroke: '#14B8A6', emoji: '😍', ey: 53  },
          ].map((p) => (
            <g key={p.cx}>
              <circle cx={p.cx} cy={p.cy} r="5" fill="#0D0D0F" stroke={p.stroke} strokeWidth="2" />
              <text x={p.cx} y={p.ey} textAnchor="middle" fontSize="15">{p.emoji}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Stage columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1px',
          background: 'var(--color-surface-border)',
          border: '0.5px solid var(--color-surface-border)',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
        }}
      >
        {JOURNEY_STAGES.map((stage) => (
          <div
            key={stage.num}
            style={{ background: 'var(--color-surface)', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', color: accent, marginBottom: '2px' }}>
                STAGE {stage.num}
              </p>
              <p className="font-display font-bold text-off-white" style={{ fontSize: 'var(--step-0)', lineHeight: 1.2 }}>
                {stage.name}
              </p>
            </div>
            <span style={FEEL_STYLES[stage.feelClass]}>{stage.feel}</span>
            <div>
              <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--color-muted-light)', textTransform: 'uppercase', marginBottom: '3px' }}>
                Doing
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-muted-light)', lineHeight: 1.5 }}>{stage.doing}</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em', color: '#F47272', textTransform: 'uppercase', marginBottom: '3px' }}>
                Pain
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-muted-light)', lineHeight: 1.5 }}>{stage.pain}</p>
            </div>
            <div
              style={{
                background: `rgba(108,123,245,0.07)`,
                borderRadius: '6px',
                padding: '8px 10px',
                borderLeft: `2px solid ${accent}`,
              }}
            >
              <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em', color: accent, textTransform: 'uppercase', marginBottom: '3px' }}>
                Pet-Z opportunity
              </p>
              <p style={{ fontSize: '11.5px', color: 'var(--color-muted-light)', lineHeight: 1.5 }}>{stage.opp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 mt-5" aria-hidden="true">
        {[
          { color: '#F47272', label: 'Trust at risk (low)' },
          { color: '#A1A1AA', label: 'Neutral / cautious' },
          { color: '#14B8A6', label: 'Trust earned (high)' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2" style={{ fontSize: 'var(--step--1)', color: 'var(--color-muted-light)' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: l.color, display: 'inline-block', flexShrink: 0 }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PetzCaseStudy() {
  const { theme } = useTheme();
  const ACCENT = theme === 'light' ? LIGHT_ACCENT : DARK_ACCENT;

  return (
    <CaseStudyLayout
      title="Designing both sides of India's pet care marketplace — Pet-Z"
      company="Pet-Z"
      domain="Pet Care"
      accentColor={DARK_ACCENT}
      lightAccentColor={LIGHT_ACCENT}
      readTime="10 min read"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['0→1 Product', 'Two-sided Marketplace', 'Consumer Mobile', 'India', 'Concept · MVP Design'].map((tag) => (
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
          { label: 'Domain', value: 'Pet Care · Consumer' },
          { label: 'Type', value: 'Concept · MVP Design' },
          { label: 'Market', value: 'India' },
          { label: 'Role', value: 'Sole PM, Research → Spec' },
        ]}
      />

      {/* At a glance */}
      <StatRow
        stats={[
          { value: '59%', label: 'of Indian households owned a pet (2021 study)', isPrimary: true },
          { value: '2-sided', label: 'Owners + Service Providers' },
          { value: '3', label: 'Surfaces — Owner app · Vendor app · Web' },
          { value: '0→1', label: 'Research → Persona → Flow → Spec → GTM' },
        ]}
      />

      {/* Context */}
      <CaseStudySection
        eyebrow="THE CONTEXT"
        heading="Most pet care in India runs on WhatsApp groups."
      >
        <PullQuote>
          "Do you know a good vet near Indiranagar?" — asked in 47 different Facebook groups every
          morning.
        </PullQuote>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div>
            <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
              India's pet care market is fragmented, informal, and growing fast. A 2021 study found 59%
              of surveyed Indian respondents owned a pet — and with pandemic-era adoptions rising sharply,
              a new wave of first-time pet parents entered a market that had no designed experience waiting
              for them.
            </p>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
              Discovery happens through word-of-mouth. Booking happens through phone calls. Payment is cash
              at the door. Vet records live in a shoebox. For a market of this size and trajectory, the
              absence of a reliable, unified platform was a clear gap.
            </p>
          </div>
          <div>
            <p className="text-muted-light leading-relaxed mb-4" style={{ fontSize: 'var(--step-0)' }}>
              Pet-Z was my attempt to design that platform — not just for pet owners, but for the service
              providers who have equally underserved needs: visibility, trust signals, scheduling tools,
              and a professional digital presence.
            </p>
            <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
              This case study covers the full 0→1 arc: market sizing, research, persona development, user
              flows, feature prioritisation, GTM strategy, and the toughest question every marketplace PM
              faces —{' '}
              <em>which side do you build for first?</em>
            </p>
          </div>
        </div>
      </CaseStudySection>

      {/* Problem */}
      <CaseStudySection eyebrow="THE PROBLEM" heading="Three gaps, one opportunity.">
        <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          The problem isn't that Indians don't care for their pets — they do, deeply. The problem is
          that the infrastructure around that care hasn't been designed.
        </p>
        <FindingGrid
          findings={[
            {
              icon: '🗺️',
              title: 'Market Gap',
              body: 'No platform in India unifies pet care the way Zocdoc did for human healthcare. Supertails serves product delivery; PetKonnect is limited in reach. No one owns the service layer — the vet visit, the grooming appointment, the trainer booking — end to end.',
            },
            {
              icon: '😰',
              title: 'Owner Pain',
              body: "First-time pet parents — a rapidly growing segment post-pandemic — have no trusted discovery channel. Finding a vet requires asking neighbours. Booking requires a call. Rescheduling requires another call. Health records live in folders or photos. The friction compounds at every step.",
            },
            {
              icon: '📣',
              title: 'Provider Pain',
              body: "Qualified vets, trainers, and groomers operate on WhatsApp, Instagram DMs, and local referrals. They have no scheduling system, no professional profile, no way to expand beyond their immediate geography, and no digital trust signal to attract new clients — even when the demand is there.",
            },
          ]}
        />
      </CaseStudySection>

      {/* Personas */}
      <CaseStudySection eyebrow="WHO WE'RE DESIGNING FOR" heading="Four people. Two sides.">
        <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          A marketplace lives or dies by how well it serves both its supply and demand. These personas
          represent the full user set — not just the obvious one.
        </p>

        <p
          className="font-mono uppercase tracking-[0.1em] mb-3"
          style={{ fontSize: '10px', color: ACCENT }}
        >
          Demand Side — Pet Owners
        </p>
        <PersonaGrid
          personas={[
            {
              avatar: '👩‍💻',
              name: 'Priya / Emma',
              age: 29,
              meta: ['Software Engineer', 'Bangalore', 'First-time pet parent'],
              bio: "Time-poor working professional who adopted her first dog during the pandemic. Needs reliable, bookable pet care without cold-calling. Panics when the dog falls ill and can't act quickly.",
              painpointsLabel: 'Job to be Done',
              painpoints: [
                '"When my pet needs care, I need to find someone trustworthy, book them in minutes, and know they\'ll actually show up — without spending an hour on the phone."',
                "Wants guidance as a first-time pet parent, not just a directory",
                "Scheduling flexibility is everything",
                "Pet health records scattered across notes and photos",
              ],
            },
            {
              avatar: '👨‍⚕️',
              name: 'Raghav',
              age: 37,
              meta: ['Doctor', 'Delhi', '2 kids · 1 cat · 12 fish'],
              bio: "Busy professional who needs home services — can't take time off for clinic runs. Needs low-friction reordering of pet essentials and a shared pet management tool the family can use.",
              painpointsLabel: 'Job to be Done',
              painpoints: [
                '"When my schedule is full, I need pet care that comes to me — verified, punctual, and manageable from a single app so nothing falls through the cracks."',
                "Grooming goes irregular due to competing priorities",
                "No subscription option for recurring pet essentials",
                "Clinic visits require coordinating with elderly parents at home",
              ],
            },
          ]}
        />

        <p
          className="font-mono uppercase tracking-[0.1em] mb-3 mt-8"
          style={{ fontSize: '10px', color: ACCENT }}
        >
          Supply Side — Service Providers
        </p>
        <PersonaGrid
          personas={[
            {
              avatar: '🩺',
              name: 'Sam',
              age: 35,
              meta: ['Vet Doctor', 'Mumbai', 'Clinic + home visits'],
              bio: "Qualified vet who wants to expand reach via online consultations and home visits. Grows revenue without additional marketing spend but has no way to measure growth — no professional digital presence beyond a Facebook page.",
              painpointsLabel: 'Job to be Done',
              painpoints: [
                '"When I have open slots, I need a channel that sends verified clients my way — so I can spend extra hours doing the work I love and growing my practice meaningfully."',
                "Clients don't understand geriatric pet care needs",
                "Can't measure growth (visits, clients, revenue) easily",
                "No professional presence beyond a Facebook page",
              ],
            },
            {
              avatar: '🐕‍🦺',
              name: 'Akash',
              age: 32,
              meta: ['Pet Trainer', 'Bangalore', '7 yrs experience'],
              bio: "Experienced trainer trying to turn a family business into a legit, discoverable service. Revenue barely covers costs despite strong demand signals. All scheduling is manual via WhatsApp.",
              painpointsLabel: 'Job to be Done',
              painpoints: [
                '"When I have capacity, I need pet owners to find me, trust me, and book me — not through a friend-of-a-friend chain, but through a platform that validates my expertise."',
                "Revenue barely covers costs despite strong demand",
                "No scheduling tool — all coordination is manual via chat",
                "Difficult to extend quality care to a wider audience",
              ],
            },
          ]}
        />
      </CaseStudySection>

      {/* Journey Map */}
      <CaseStudySection eyebrow="THE OWNER'S EXPERIENCE" heading="A journey built on trust — or broken by it.">
        <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          Pet care is fundamentally about trusting a stranger with a family member. Mapping the
          first-time owner's emotional journey shows exactly where that trust is won and where it
          slips away — and which moments the product has to get right.
        </p>
        <div className="overflow-x-auto -mx-6 px-6">
          <div style={{ minWidth: '900px' }}>
            <JourneyMap />
          </div>
        </div>
        <InsightCallout label="The insight that shaped the build">
          The two deepest dips — Discovery and The Wait — are the moments most likely to lose an
          owner, and neither is solved by a better booking screen. They're solved by trust signals
          (verified, reviewed providers) and proactive communication (reminders, status, easy
          reschedule). That's why those features ranked as P0 in prioritisation, even above flashier
          ones. The journey map didn't just describe the experience — it set the build order.
        </InsightCallout>
      </CaseStudySection>

      {/* Marketplace challenge */}
      <CaseStudySection eyebrow="THE CORE TENSION" heading="Who do you build for first?">
        <p className="text-muted-light leading-relaxed mb-2" style={{ fontSize: 'var(--step-0)' }}>
          Every two-sided marketplace faces the same chicken-and-egg problem. Pet-Z is no different.
          Without verified vets and groomers, owners won't download. Without active owners, vendors won't
          onboard. Something has to move first.
        </p>
        <MarketplaceDiagram />
        <InsightCallout label="Strategic Decision — Supply First">
          Pet-Z's launch strategy was supply-side first: recruit and verify a critical mass of service
          providers before opening owner registrations. The rationale: owner trust is the conversion
          bottleneck. A pet owner who opens the app and finds three unverified listings won't return. A
          pet owner who finds 40 verified, reviewed providers in their city will book on the first visit.
          <br />
          <br />
          This meant the vendor onboarding and KYC flow wasn't a "nice to have" — it was the gate. We
          couldn't launch without it, regardless of what the RICE score said.
        </InsightCallout>
      </CaseStudySection>

      {/* Product */}
      <CaseStudySection eyebrow="THE PRODUCT" heading="Two apps. One ecosystem.">
        <p className="text-muted-light leading-relaxed mb-2" style={{ fontSize: 'var(--step-0)' }}>
          Pet-Z needed separate surfaces for each side: an owner app focused on discovery, booking, and
          care management; a vendor app focused on profile, scheduling, and growth.
        </p>
        <AppShowcase />

        {/* Owner app screens */}
        <div className="mt-10">
          <p className="font-mono uppercase tracking-[0.1em] mb-4" style={{ fontSize: '10px', color: ACCENT }}>
            Owner App — Designed Screens
          </p>
          <p className="text-muted-light mb-5" style={{ fontSize: 'var(--step--1)' }}>
            From first open to confirmed booking. Click any screen to zoom.
          </p>
          <div className="overflow-x-auto pb-3 -mx-2 px-2">
            <div className="flex gap-4 items-end" style={{ minWidth: 'max-content' }}>
              {[
                { src: '/assets/petz/welcome.html',          label: 'Welcome' },
                { src: '/assets/petz/slide.html',            label: 'Onboarding' },
                { src: '/assets/petz/login.html',            label: 'Log In' },
                { src: '/assets/petz/home.html',             label: 'Home' },
                { src: '/assets/petz/home2.html',            label: 'Home — Alt' },
                { src: '/assets/petz/grooming.html',         label: 'Find Grooming' },
                { src: '/assets/petz/booking-services.html', label: 'Book Services' },
                { src: '/assets/petz/booking-calendar.html', label: 'Pick a Slot' },
              ].map(({ src, label }) => (
                <ZoomableFrame
                  key={src}
                  src={src}
                  label={label}
                  accent={ACCENT}
                  frameWidth={390}
                  frameHeight={844}
                  thumbWidth={160}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pet management screens */}
        <div className="mt-10">
          <p className="font-mono uppercase tracking-[0.1em] mb-4" style={{ fontSize: '10px', color: ACCENT }}>
            Pet Management — Designed Screens
          </p>
          <p className="text-muted-light mb-5" style={{ fontSize: 'var(--step--1)' }}>
            Pet profiles, health history, and vaccination records — the features that drive Monthly plan upgrades.
          </p>
          <div className="overflow-x-auto pb-3 -mx-2 px-2">
            <div className="flex gap-4 items-end" style={{ minWidth: 'max-content' }}>
              {[
                { src: '/assets/petz/pet-profile.html',   label: 'Add a Pet' },
                { src: '/assets/petz/pet-history.html',   label: 'Pet Profile' },
                { src: '/assets/petz/health-records.html', label: 'Health Records' },
              ].map(({ src, label }) => (
                <ZoomableFrame
                  key={src}
                  src={src}
                  label={label}
                  accent={ACCENT}
                  frameWidth={390}
                  frameHeight={844}
                  thumbWidth={160}
                />
              ))}
            </div>
          </div>
        </div>
      </CaseStudySection>

      {/* Happy path flow */}
      <CaseStudySection eyebrow="OWNER HAPPY PATH" heading="From download to appointment.">
        <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          The core owner journey, optimised for minimal friction from first open to confirmed booking.
          Highlighted steps are the trust-critical moments where the product earns or loses a conversion.
        </p>
        <UserFlow />
      </CaseStudySection>

      {/* RICE table */}
      <CaseStudySection eyebrow="PRIORITISATION" heading="What ships first and why.">
        <p className="text-muted-light leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          RICE scoring helped sequence the backlog. But for a marketplace, raw scores tell an incomplete
          story — dependencies matter as much as impact.
        </p>
        <CaseStudyTable
          columns={[
            { header: 'Feature', key: 'feature' },
            { header: 'Reach / qtr', key: 'reach' },
            { header: 'Impact', key: 'impact' },
            { header: 'Confidence', key: 'confidence' },
            { header: 'Effort', key: 'effort' },
            {
              header: 'RICE Score',
              key: 'score',
              renderCell: (v) => (
                <span className="font-mono font-bold" style={{ color: ACCENT, fontSize: '13px' }}>
                  {v}
                </span>
              ),
            },
            {
              header: 'Priority',
              key: 'priority',
              renderCell: (v) => {
                const bg =
                  v === 'P0'
                    ? `rgba(108,123,245,0.15)`
                    : v === 'P1'
                    ? 'rgba(20,184,166,0.1)'
                    : 'rgba(255,255,255,0.05)';
                const color = v === 'P0' ? ACCENT : v === 'P1' ? '#14B8A6' : '#A1A1AA';
                return (
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 font-mono font-bold"
                    style={{
                      background: bg,
                      color,
                      fontSize: '11px',
                      border: `0.5px solid ${color}50`,
                    }}
                  >
                    {v}
                  </span>
                );
              },
            },
          ]}
          rows={[
            { feature: 'Vendor Onboarding + KYC ⚑', reach: '~800 vendors', impact: 'Massive (3×)', confidence: '80%', effort: '6 weeks', score: '320', priority: 'P0' },
            { feature: 'Core Service Booking Flow', reach: '~5,000 users', impact: 'Massive (3×)', confidence: '80%', effort: '8 weeks', score: '1,500', priority: 'P0' },
            { feature: 'Appointment Reminders (WhatsApp)', reach: '~4,000 users', impact: 'Medium (1×)', confidence: '90%', effort: '1 week', score: '3,600', priority: 'P0' },
            { feature: 'Home Service Scheduling', reach: '~2,500 users', impact: 'High (2×)', confidence: '70%', effort: '5 weeks', score: '700', priority: 'P1' },
            { feature: 'Pet Health Record Management', reach: '~3,000 users', impact: 'Medium (1×)', confidence: '60%', effort: '4 weeks', score: '450', priority: 'P1' },
            { feature: 'Video Consultations', reach: '~1,500 users', impact: 'High (2×)', confidence: '50%', effort: '10 weeks', score: '150', priority: 'P2' },
            { feature: 'Community + Blog', reach: '~1,200 users', impact: 'Low (0.5×)', confidence: '40%', effort: '3 weeks', score: '80', priority: 'P2' },
          ]}
        />
        <div
          className="rounded-lg p-4 mt-4"
          style={{
            background: 'var(--color-surface)',
            border: '0.5px solid var(--color-surface-border)',
            borderLeft: `3px solid ${ACCENT}`,
          }}
        >
          <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
            <strong className="text-off-white">
              ⚑ Vendor Onboarding is P0 despite its lower RICE score because it's a hard dependency
            </strong>{' '}
            — without a critical mass of verified vendors, the owner booking flow has nothing to book. In
            two-sided markets, dependency chains override pure RICE ordering.
          </p>
        </div>
      </CaseStudySection>

      {/* Metrics */}
      <CaseStudySection eyebrow="SUCCESS METRICS" heading="What does 'working' look like?">
        <div
          className="rounded-xl p-8 mt-2 mb-6 relative overflow-hidden"
          style={{ background: 'var(--color-surface)', border: `0.5px solid ${ACCENT}30` }}
        >
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              top: '-60px',
              right: '-60px',
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, rgba(108,123,245,0.07) 0%, transparent 70%)`,
            }}
          />
          <p
            className="font-mono uppercase tracking-[0.1em] mb-3"
            style={{ fontSize: '10px', color: ACCENT }}
          >
            North Star Metric
          </p>
          <p
            className="font-display font-bold text-off-white mb-3 leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
          >
            Monthly Active Pet Owners
            <br />
            completing ≥ 1 booking
          </p>
          <p
            className="text-muted-light leading-relaxed"
            style={{ fontSize: 'var(--step-0)', maxWidth: '520px' }}
          >
            This metric captures product-market fit across both sides. If owners book regularly, vendors
            earn real revenue. If vendors earn, they stay, invest in their profiles, and attract more
            owners. The flywheel spins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Vendor Cancellation Rate',
              target: 'Target: < 5%',
              desc: 'A high provider cancellation rate poisons owner trust faster than any other single factor. If vendors cancel frequently, owners churn before they ever form a habit.',
            },
            {
              title: 'Owner Repeat Booking Rate',
              target: 'Target: > 40% within 60 days',
              desc: 'One booking is a trial. A second booking within 60 days signals the owner has found a service they trust and a habit is forming. This is the retention canary in the coal mine.',
            },
            {
              title: 'Vendor Slot Fill Rate',
              target: 'Target: > 60% of available slots',
              desc: "If vendors are listing availability but slots aren't filling, the demand-side acquisition or the matching algorithm is broken. This metric surfaces supply-demand imbalance quickly.",
            },
          ].map((g) => (
            <div
              key={g.title}
              className="rounded-xl p-5"
              style={{ background: 'var(--color-surface-raised)', border: '0.5px solid var(--color-surface-border)' }}
            >
              <p
                className="font-display font-semibold text-off-white mb-1"
                style={{ fontSize: 'var(--step-0)' }}
              >
                {g.title}
              </p>
              <p className="font-mono mb-3" style={{ fontSize: '11px', color: ACCENT }}>
                {g.target}
              </p>
              <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* Monetisation */}
      <CaseStudySection
        eyebrow="MONETISATION"
        heading="A freemium tier built for habit, not lock-in."
      >
        <p className="text-muted-light leading-relaxed mb-2" style={{ fontSize: 'var(--step-0)' }}>
          The free plan earns the owner's trust. Monthly and 3-Month plans deepen the relationship with
          healthcare tools and delivery perks. The goal: owners upgrade when they feel the gap between
          tiers in their daily pet care routine.
        </p>
        <PricingTiers />
      </CaseStudySection>

      {/* Competitor landscape */}
      <CaseStudySection
        eyebrow="COMPETITIVE LANDSCAPE"
        heading="What's in the market. What's missing."
      >
        <CaseStudyTable
          columns={[
            { header: 'Capability', key: 'capability' },
            {
              header: 'Pet-Z',
              key: 'petz',
              renderCell: (v) => {
                const c = v === '✓'
                  ? (theme === 'light' ? '#15803D' : '#4ADE80')
                  : v === '~'
                  ? (theme === 'light' ? '#B45309' : '#FCD34D')
                  : (theme === 'light' ? '#9CA3AF' : '#52525B');
                return <span style={{ color: c, fontWeight: 600, fontSize: '13px' }}>{v}</span>;
              },
            },
            {
              header: 'Supertails',
              key: 'supertails',
              renderCell: (v) => {
                const c = v === '✓'
                  ? (theme === 'light' ? '#15803D' : '#4ADE80')
                  : v === '~'
                  ? (theme === 'light' ? '#B45309' : '#FCD34D')
                  : (theme === 'light' ? '#9CA3AF' : '#52525B');
                return <span style={{ color: c, fontSize: '13px' }}>{v}</span>;
              },
            },
            {
              header: 'PetKonnect',
              key: 'petkonnect',
              renderCell: (v) => {
                const c = v === '✓'
                  ? (theme === 'light' ? '#15803D' : '#4ADE80')
                  : v === '~'
                  ? (theme === 'light' ? '#B45309' : '#FCD34D')
                  : (theme === 'light' ? '#9CA3AF' : '#52525B');
                return <span style={{ color: c, fontSize: '13px' }}>{v}</span>;
              },
            },
            {
              header: 'HUFT',
              key: 'huft',
              renderCell: (v) => {
                const c = v === '✓'
                  ? (theme === 'light' ? '#15803D' : '#4ADE80')
                  : v === '~'
                  ? (theme === 'light' ? '#B45309' : '#FCD34D')
                  : (theme === 'light' ? '#9CA3AF' : '#52525B');
                return <span style={{ color: c, fontSize: '13px' }}>{v}</span>;
              },
            },
            {
              header: 'Local WhatsApp',
              key: 'whatsapp',
              renderCell: (v) => {
                const c = v === '✓'
                  ? (theme === 'light' ? '#15803D' : '#4ADE80')
                  : v === '~'
                  ? (theme === 'light' ? '#B45309' : '#FCD34D')
                  : (theme === 'light' ? '#9CA3AF' : '#52525B');
                return <span style={{ color: c, fontSize: '13px' }}>{v}</span>;
              },
            },
          ]}
          rows={[
            { capability: 'Service Booking', petz: '✓', supertails: '✓', petkonnect: '✓', huft: '–', whatsapp: '–' },
            { capability: 'Verified Providers', petz: '✓', supertails: '~', petkonnect: '✓', huft: '–', whatsapp: '–' },
            { capability: 'Home Services', petz: '✓', supertails: '✓', petkonnect: '✓', huft: '–', whatsapp: '✓' },
            { capability: 'Pet Health Records', petz: '✓', supertails: '–', petkonnect: '✓', huft: '–', whatsapp: '–' },
            { capability: 'Two-sided Platform', petz: '✓', supertails: '~', petkonnect: '✓', huft: '–', whatsapp: '–' },
            { capability: 'Video Consultations', petz: '✓', supertails: '✓', petkonnect: '✓', huft: '–', whatsapp: '–' },
            { capability: 'Pricing Transparency', petz: '✓', supertails: '✓', petkonnect: '~', huft: '✓', whatsapp: '–' },
            { capability: 'Vendor Growth Tools', petz: '✓', supertails: '–', petkonnect: '~', huft: '–', whatsapp: '–' },
          ]}
        />
        <div
          className="rounded-lg p-5 mt-4"
          style={{
            background: 'var(--color-surface)',
            border: '0.5px solid var(--color-surface-border)',
            borderLeft: `3px solid ${ACCENT}`,
          }}
        >
          <p className="text-muted-light leading-relaxed" style={{ fontSize: 'var(--step--1)' }}>
            <strong className="text-off-white">The white space:</strong> No player in the Indian market
            combines verified provider discovery, end-to-end booking, health records, <em>and</em>{' '}
            dedicated vendor growth tools in a single platform. Supertails and PetKonnect are the closest,
            but neither was designed two-sided from the ground up — their vendor experience is a bolt-on.
            Pet-Z's differentiator is that the vendor is a first-class user, not an afterthought.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudyNext href="/case-studies/push-notifications" title="The Push Notification Playbook" />
    </CaseStudyLayout>
  );
}
