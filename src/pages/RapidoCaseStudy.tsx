import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';
import PullQuote from '../components/case-study/PullQuote';
import FindingGrid from '../components/case-study/FindingGrid';
import PersonaGrid from '../components/case-study/PersonaGrid';
import EmpathyMap from '../components/case-study/EmpathyMap';
import DecisionBlock from '../components/case-study/DecisionBlock';
import StatRow from '../components/case-study/StatRow';
import CaseStudyNext from '../components/case-study/CaseStudyNext';

export default function RapidoCaseStudy() {
  return (
    <CaseStudyLayout
      title="Inside the Ride"
      company="Rapido"
      domain="Gig Economy"
      accentColor="#7F77DD"
      readTime="12 min read"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Field Research', 'UX Research', 'Gig Economy', 'India'].map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs font-medium px-2.5 py-1 rounded border border-surface-border bg-surface-raised text-muted-light uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* THE HOOK */}
      <CaseStudySection eyebrow="FIELD RESEARCH" heading="The observation that changed everything">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          I booked a Rapido bike ride and my driver was wearing a Zomato t-shirt. It was a small, strange thing — and I couldn't let it go. Brand crossover? Accidental booking? I asked him why.
        </p>

        <PullQuote>
          "If I wear the Rapido jacket, the auto drivers know what I am. They'll harass me. This way, I look like a delivery guy."
        </PullQuote>

        <figure className="my-10">
          <div className="rounded-lg overflow-hidden border border-surface-border">
            <img
              src="/assets/rapido/cover.jpeg"
              alt="POV from passenger seat of Rapido driver on the road, wearing red Zomato jacket"
              width={900}
              height={400}
              loading="eager"
              className="w-full h-auto"
            />
          </div>
          <figcaption className="text-center text-xs text-muted-light mt-3 italic">
            Photo taken during my Rapido ride. The Zomato t-shirt was deliberate.
          </figcaption>
        </figure>

        <p className="text-off-white leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          That answer changed what I thought I was looking at. This wasn't a branding oddity. It was a coping mechanism — improvised by a driver working on a platform that had built him no tools to protect himself. For two weeks, I used every assigned Rapido ride as a research session. What follows is what I found, what it means for the product, and what I'd build first.
        </p>
      </CaseStudySection>

      {/* BUSINESS FRAMING */}
      <CaseStudySection eyebrow="WHY IT MATTERS" heading="Business framing: Why drivers are the product">
        <p className="text-muted-light leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          A research report that doesn't connect to business stakes doesn't drive product decisions. Here's the frame.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-border rounded-lg overflow-hidden mb-10">
          {[
            {
              icon: '⛓',
              title: 'Drivers are the product',
              body: 'Rapido\'s supply of drivers is what riders buy when they open the app. A stressed, voiceless driver is a lower-rated ride and a longer ETA. The rider experience is built entirely on top of the driver experience — but the two apps aren\'t designed that way.',
            },
            {
              icon: '🔁',
              title: 'Churn is a compounding loss',
              body: 'Acquiring a new driver requires onboarding, documentation, and weeks of low-earnings ramp-up. Retaining an experienced driver — especially one who\'s been on the platform for years — costs a fraction of that. Unheard grievances are a direct churn trigger.',
            },
            {
              icon: '📣',
              title: 'Zero voice infrastructure',
              body: 'At the time of research, Rapido had no in-app support mechanism for drivers. Issues were reported at a physical office. For a workforce that\'s time-poor, geographically distributed, and from low-literacy backgrounds, this is not a support system — it\'s a closed door.',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-surface-raised p-6"
              style={{ borderBottom: '1px solid var(--color-surface-border)' }}
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h4 className="font-display font-semibold text-off-white mb-2">{card.title}</h4>
              <p className="text-muted-light text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* RESEARCH DESIGN - Decision 01 */}
      <CaseStudySection eyebrow="METHODOLOGY" heading="Research design: The deliberate method">
        <p className="text-muted-light leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          The method was a deliberate choice, not an accident. And like every research method, it had real tradeoffs I have to own.
        </p>

        <DecisionBlock
          number="01"
          label="Research Method"
          question="Formal interviews in a controlled setting, or ethnographic conversations during actual rides?"
          context="I needed honest signal from a group with strong reasons to self-censor: drivers who might fear being assessed by their employer, or who'd feel intimidated articulating complaints to a stranger with a notebook."
          options={[
            {
              name: 'Formal Interviews',
              pros: 'Structured, consistent, comparable across participants.',
              cons: 'High social desirability bias. Hard to recruit without manufacturing power dynamics. Drivers would show up to perform, not share.',
              chosen: false,
            },
            {
              name: 'In-Ride Ethnography ✓',
              pros: 'Driver is already at work, already in context. The conversation starts naturally.',
              cons: 'No notes during the ride, but field notes immediately after. The Zomato t-shirt story emerged this way — it wouldn\'t have come out in a formal setting.',
              chosen: true,
            },
          ]}
          chosenLabel="✓ Chose: In-ride ethnography"
          gapNote="Removing the formality removes the filter. A driver in a formal interview gives polished, cautious answers. A driver asked a friendly question during his workday tells you about the uniform he wears to avoid being attacked."
          outcome={{
            title: 'What happened',
            body: 'Every driver surfaced a grievance with no formal outlet. None of this would have appeared in a rider study. The Zomato t-shirt finding — a worker improvising his own safety mechanism — is invisible from the rider side of the platform.',
          }}
        />

        <div
          className="p-4 rounded-lg border mt-8"
          style={{
            borderColor: 'rgba(249, 115, 22, 0.22)',
            backgroundColor: 'rgba(249, 115, 22, 0.04)',
          }}
        >
          <div className="font-mono text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#F97316' }}>
            Methodological Limitations — Owned
          </div>
          <ul className="space-y-2 text-xs text-muted-light">
            <li>• Sample is small (~10 drivers over 2 weeks). These findings are directional, not statistically significant.</li>
            <li>• Conversations were in English — this over-represents drivers comfortable with English, who likely have fewer language-barrier problems than those who couldn't engage. The group with the most acute pain was harder to reach.</li>
            <li>• All research was conducted in Bangalore. Driver experience in Tier 2/3 cities may differ materially.</li>
            <li>• No quantitative baseline to triangulate against — Rapido's actual churn rate, grievance volume, and support ticket data were unavailable.</li>
          </ul>
        </div>
      </CaseStudySection>

      {/* FINDINGS */}
      <CaseStudySection eyebrow="RESEARCH" heading="What I found — and what it means for the product">

        <div className="space-y-6">
          <FindingGrid
            findings={[
              {
                icon: '📌',
                title: 'Flexibility is the retention hook — but it\'s being eroded',
                body: (
                  <>
                    Drivers consistently named flexible hours and income supplementation as what keeps them on the platform. Not brand loyalty. But every daily friction — harassment, low earnings clarity, no support — chips away at the goodwill that flexibility earns.
                  </>
                ),
              },
              {
                icon: '⚠️',
                title: 'Harassment is systematic, not isolated',
                body: (
                  <>
                    Auto drivers deliberately book rides to confront and intimidate Rapido drivers. This is coordinated. The workaround: wear a Swiggy or Zomato uniform so you aren\'t identifiable as a bike-taxi driver.
                  </>
                ),
              },
              {
                icon: '🔇',
                title: 'The grievance system requires a physical office visit',
                body: (
                  <>
                    No in-app support for drivers. Every complaint must be reported at a physical Rapido office. For a gig worker earning per ride, losing half a day to report a problem isn\'t a viable option — so problems go unreported.
                  </>
                ),
              },
              {
                icon: '🌐',
                title: 'Language barriers compound every other problem',
                body: (
                  <>
                    Migrant drivers who don\'t speak Kannada face communication difficulties with riders, navigation friction, and — critically — an inability to self-advocate when things go wrong. Every other problem is harder without a shared language.
                  </>
                ),
              },
            ]}
          />

          {/* Implications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Don\'t over-engineer loyalty programs. Protect schedule flexibility and make earnings transparent in the app.',
              'This is a safety emergency. In-app incident reporting and a panic mechanism are P0 features, not backlog items.',
              'The absence of this feature means Rapido is blind to how bad the problem is. Every unreported incident is an invisible data point.',
              'Multi-language support in the driver app is a foundational accessibility requirement. It should have shipped at launch.',
            ].map((implication, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg text-xs"
                style={{
                  backgroundColor: 'rgba(127, 119, 221, 0.06)',
                  borderLeft: '2px solid var(--case-accent)',
                  borderColor: '#7F77DD',
                }}
              >
                <strong style={{ color: '#7F77DD' }}>→ PM: </strong>
                <span className="text-muted-light">{implication}</span>
              </div>
            ))}
          </div>
        </div>
      </CaseStudySection>

      {/* PERSONAS */}
      <CaseStudySection eyebrow="WHO I WAS DESIGNING FOR" heading="Two driver archetypes with overlapping pain">

        <PersonaGrid
          personas={[
            {
              avatar: '🧑‍💼',
              name: 'Gim',
              age: 33,
              meta: ['Full-time Driver', 'Manipur → Bangalore'],
              bio: 'Relocated to Bangalore, bought a second-hand bike to drive full-time for Rapido. Doesn\'t speak Kannada. Lives alone, no local support network. Technology-comfortable but educational background is limited. Rapido is his primary income — not a supplement.',
              painpointsLabel: 'Painpoints',
              painpoints: [
                'Language barrier with riders and the city itself',
                'Constant threat of confrontation with auto drivers',
                'No one to raise problems with — isolated by design',
                'Reporting a grievance means losing a day\'s earnings',
              ],
            },
            {
              avatar: '👨‍👩‍👦',
              name: 'Rakesh',
              age: 29,
              meta: ['Part-time Driver', 'Bangalore'],
              bio: 'Married with one child. Works at a mall by day, drives for Rapido in the evenings for supplemental income. Tech-savvy. For Rakesh, the app is a financial tool — not an identity. But the economics are tighter than they first appeared after factoring in fuel and maintenance.',
              painpointsLabel: 'Painpoints',
              painpoints: [
                'Earnings thinner than expected after costs',
                'Double-shift exhaustion bleeds into performance at both jobs',
                'Hostility from traditional taxi drivers',
                'No visibility into earnings-per-hour, not just per-ride',
              ],
            },
          ]}
        />
      </CaseStudySection>

      {/* EMPATHY MAP */}
      <CaseStudySection eyebrow="SYNTHESIS" heading="Inside the driver's head">

        <EmpathyMap
          subject="DRIVER"
          quadrants={[
            {
              title: 'Says',
              titleColor: '#60A5FA',
              chipBg: 'rgba(96,165,250,0.1)',
              chipColor: '#93C5FD',
              chips: [
                '"I just want to provide for my family"',
                '"I\'m not stealing anyone\'s business"',
                '"I like the flexible schedule"',
                '"Traffic is manageable today"',
              ],
            },
            {
              title: 'Thinks',
              titleColor: '#F87171',
              chipBg: 'rgba(248,113,113,0.1)',
              chipColor: '#FCA5A5',
              chips: [
                '"Hope I avoid confrontations today"',
                '"Will I earn enough this month?"',
                '"I wish I could explain myself better"',
                '"I need to rest"',
              ],
            },
            {
              title: 'Does',
              titleColor: '#4ADE80',
              chipBg: 'rgba(74,222,128,0.1)',
              chipColor: '#86EFAC',
              chips: [
                'Wears Swiggy/Zomato uniform as camouflage',
                'Avoids routes near auto stands',
                'Parks away from designated pickup zones',
                'Makes small talk to build rider trust',
              ],
            },
            {
              title: 'Feels',
              titleColor: '#FBBF24',
              chipBg: 'rgba(251,191,36,0.1)',
              chipColor: '#FCD34D',
              chips: [
                'Fearful of encounters',
                'Defenseless',
                'Anxious',
                'Stressed about money',
                'Tired',
                'Isolated',
              ],
            },
          ]}
        />
      </CaseStudySection>

      {/* JOURNEY MAP */}
      <CaseStudySection eyebrow="EXPERIENCE MAP" heading="Where the experience breaks down">
        <p className="text-muted-light leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          An empathy map shows a cross-section. A journey map shows where on the timeline the platform fails its drivers. Phases 4 and 6 are complete product gaps.
        </p>

        <div className="overflow-x-auto mb-8">
          <div className="grid grid-cols-6 gap-px bg-surface-border rounded-lg overflow-hidden min-w-fit">
            {[
              {
                step: 'Phase 01',
                name: 'Sign Up',
                desc: 'Registers on Rapido, submits documents, gets onboarding. Motivated, optimistic about earnings.',
                status: 'optimistic',
                statusLabel: 'Optimistic',
                pain: null,
              },
              {
                step: 'Phase 02',
                name: 'Waiting for Rides',
                desc: 'Idles near a zone. Mentally mapping which areas to avoid. Alert but calm.',
                status: 'neutral',
                statusLabel: 'Calculating',
                pain: null,
              },
              {
                step: 'Phase 03',
                name: 'During Ride',
                desc: 'Navigates and makes small talk. Mostly positive but language barriers create friction.',
                status: 'neutral',
                statusLabel: 'Professional',
                pain: null,
              },
              {
                step: 'Phase 04',
                name: 'Confrontation',
                desc: 'An auto driver books a fake ride or physically confronts. No protection, no in-app emergency option.',
                status: 'critical',
                statusLabel: 'Fearful · Alone',
                pain: 'Platform failure — zero safety infrastructure',
              },
              {
                step: 'Phase 05',
                name: 'Post-Ride',
                desc: 'Checks earnings. Takes a break. Exhaustion is high. Earnings don\'t clearly reflect effort after costs.',
                status: 'warning',
                statusLabel: 'Tired · Uncertain',
                pain: null,
              },
              {
                step: 'Phase 06',
                name: 'Incident Reporting',
                desc: 'Tries to report the confrontation. Discovers there\'s no in-app option. Must visit a physical office.',
                status: 'critical',
                statusLabel: 'Defeated · Voiceless',
                pain: 'Platform failure — problem goes unheard',
              },
            ].map((phase, idx) => (
              <div key={idx} className="bg-surface-raised p-4 min-w-[160px]">
                <div className="font-mono text-xs uppercase text-muted-light mb-2">{phase.step}</div>
                <div className="font-semibold text-sm text-off-white mb-3">{phase.name}</div>
                <p className="text-xs text-muted-light mb-3 leading-relaxed">{phase.desc}</p>
                <div
                  className="text-xs px-2 py-1 rounded inline-block mb-2"
                  style={{
                    backgroundColor:
                      phase.status === 'optimistic'
                        ? 'rgba(34, 197, 94, 0.1)'
                        : phase.status === 'critical'
                          ? 'rgba(248, 113, 113, 0.1)'
                          : phase.status === 'warning'
                            ? 'rgba(249, 115, 22, 0.1)'
                            : 'rgba(107, 114, 128, 0.1)',
                    color:
                      phase.status === 'optimistic'
                        ? '#4ADE80'
                        : phase.status === 'critical'
                          ? '#FCA5A5'
                          : phase.status === 'warning'
                            ? '#FB923C'
                            : '#9CA3AF',
                  }}
                >
                  {phase.statusLabel}
                </div>
                {phase.pain && <div className="text-xs text-red-400 italic mt-2">⚠ {phase.pain}</div>}
              </div>
            ))}
          </div>
        </div>
      </CaseStudySection>

      {/* OPPORTUNITY SOLUTION TREE */}
      <CaseStudySection eyebrow="IDEATION" heading="From research to product opportunity">
        <p className="text-muted-light leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          Findings organised as an opportunity tree. The ★ marks what I'd ship first — and the reasoning follows in the next section.
        </p>

        <div
          className="rounded-lg p-8 mb-8"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '0.5px solid var(--color-surface-border)',
          }}
        >
          <div className="text-center mb-8">
            <div
              className="inline-block px-6 py-3 rounded-lg border"
              style={{
                borderColor: 'rgba(127, 119, 221, 0.45)',
                backgroundColor: 'rgba(127, 119, 221, 0.07)',
              }}
            >
              <div className="font-display font-semibold text-off-white text-sm">
                How might we reduce driver churn through better platform support?
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              {
                branch: 'Safety & Security',
                leaves: ['Panic button', 'Fake-booking detection', 'Route safety alerts'],
              },
              {
                branch: 'Voice & Grievance',
                leaves: ['In-app grievance tool ★', 'Voice note support ★', 'Quarterly driver survey'],
              },
              {
                branch: 'Language & Comms',
                leaves: ['Multi-language driver app', 'Ride comms assist', 'Regional onboarding'],
              },
              {
                branch: 'Community',
                leaves: ['Driver advisory council', 'Regional meetups', 'Skills workshops'],
              },
            ].map((branch, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="px-3 py-2 rounded border text-sm font-semibold text-muted-light mb-4 bg-surface-2"
                  style={{ borderColor: 'var(--color-surface-border)' }}
                >
                  {branch.branch}
                </div>
                <div className="space-y-2">
                  {branch.leaves.map((leaf, lidx) => (
                    <div
                      key={lidx}
                      className={`text-xs px-2 py-1.5 rounded ${
                        leaf.includes('★')
                          ? 'bg-green-950 text-green-300 border border-green-700 font-semibold'
                          : 'bg-surface-2 text-muted-light border border-surface-border'
                      }`}
                    >
                      {leaf}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-xs text-muted-light">
            ★ Ship first · All other nodes = prioritised backlog
          </div>
        </div>
      </CaseStudySection>

      {/* DECISIONS 2 & 3 */}
      <CaseStudySection eyebrow="DECISIONS" heading="The critical prioritisation decisions">
        <DecisionBlock
          number="02"
          label="Scope"
          question="Study rider experience, or driver experience — where was the bigger unaddressed gap?"
          context="Most product research in ride-hailing is rider-focused. The rider app is polished, A/B tested, and iterated constantly. The driver app gets the table scraps of the roadmap."
          options={[
            {
              name: 'Rider Experience',
              pros: 'Large audience. Clear benchmarks. Lots of existing research to build on.',
              cons: 'Already well-studied. Low probability of novel insight. Crowded research space.',
              chosen: false,
            },
            {
              name: 'Driver Experience ✓',
              pros: 'Under-researched. High insight potential. Direct access through daily commutes.',
              cons: 'Platform\'s supply chain. Problems here become rider problems one step downstream.',
              chosen: true,
            },
          ]}
          chosenLabel="✓ Chose: Driver experience"
          gapNote="The driver experience is the rider experience, one step removed. And the most interesting product problems tend to live in the places nobody's looking. The driver-side was an open field."
          outcome={{
            title: 'What happened',
            body: 'Every driver surfaced a grievance with no formal outlet. The Zomato t-shirt finding — a worker improvising his own safety mechanism — is invisible from the rider side of the platform.',
          }}
        />

        <DecisionBlock
          number="03"
          label="Prioritisation"
          question="Safety features first, or a grievance mechanism first — which addresses the most urgent driver need?"
          context="Safety felt like the most emotionally urgent problem. But a grievance mechanism is what enables Rapido to discover all future problems — including safety incidents. There's a sequencing argument here that changes everything."
          options={[
            {
              name: 'Safety Features First',
              pros: 'Addresses the most visceral, immediate fear. High emotional resonance for drivers.',
              cons: 'Complex to build. Requires ops coordination. Longer time-to-ship.',
              chosen: false,
            },
            {
              name: 'Grievance Tool First ✓',
              pros: 'Fastest to ship. Addresses the widest, most universal pain across all driver types.',
              cons: 'The data it generates will surface every other problem — including safety incidents — automatically. It\'s a force multiplier.',
              chosen: true,
            },
          ]}
          chosenLabel="✓ Chose: Grievance tool first"
          gapNote="A grievance tool isn't just a feature — it's feedback infrastructure. Ship this first and every subsequent decision about what to build next becomes data-backed, not assumption-backed."
          outcome={{
            title: 'The leverage argument',
            body: 'Rapido currently has near-zero signal on driver experience quality. The grievance tool turns that from a blind spot into a feedback loop — which is arguably more valuable than any single feature it could surface.',
          }}
        />
      </CaseStudySection>

      {/* PRIORITISATION MATRIX */}
      <CaseStudySection eyebrow="PRIORITISATION" heading="Solution prioritisation matrix">
        <p className="text-muted-light leading-relaxed mb-8" style={{ fontSize: 'var(--step-0)' }}>
          Solutions plotted by impact on driver retention vs. engineering effort. Upper-left quadrant ships first.
        </p>

        <div className="grid grid-cols-2 gap-px bg-surface-border rounded-lg overflow-hidden mb-8">
          {[
            {
              label: '✓ Ship first',
              bg: 'rgba(34, 197, 94, 0.025)',
              labelColor: '#22C55E',
              items: ['In-app grievance tool', 'Voice note support', 'Earnings transparency view'],
            },
            {
              label: 'Plan next',
              bg: 'transparent',
              labelColor: 'var(--color-text-muted)',
              items: ['Safety hotline / panic button', 'Multi-language driver app', 'Fake-booking detection'],
            },
            {
              label: 'Fill in',
              bg: 'transparent',
              labelColor: 'var(--color-text-muted)',
              items: ['Driver recognition program', 'In-app quarterly survey'],
            },
            {
              label: 'Deprioritise',
              bg: 'transparent',
              labelColor: '#F87171',
              items: ['Driver social platform', 'Full driver marketplace'],
            },
          ].map((quad, idx) => (
            <div
              key={idx}
              className="p-6"
              style={{ backgroundColor: quad.bg, borderColor: 'var(--color-surface-border)' }}
            >
              <div
                className="font-mono text-xs font-semibold uppercase mb-4"
                style={{ color: quad.labelColor }}
              >
                {quad.label}
              </div>
              <div className="space-y-2">
                {quad.items.map((item, iidx) => (
                  <div
                    key={iidx}
                    className="text-xs px-2 py-1 rounded border border-surface-border bg-surface-2 text-muted-light"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-muted-light mb-8">
          Low effort → | ← High effort | Low impact ↓ | ↓ High impact
        </div>
      </CaseStudySection>

      {/* RECOMMENDATION */}
      <CaseStudySection eyebrow="RECOMMENDATION" heading="What to build first">
        <div
          className="rounded-lg p-8 relative overflow-hidden border"
          style={{
            borderColor: 'rgba(127, 119, 221, 0.2)',
            backgroundColor: 'rgba(127, 119, 221, 0.035)',
          }}
        >
          <div className="font-mono text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#7F77DD' }}>
            The first feature
          </div>
          <h3 className="font-display font-bold text-xl text-off-white mb-4">
            In-app Grievance Tool + Voice Note Support
          </h3>
          <p className="text-muted-light text-sm leading-relaxed mb-6 max-w-lg">
            A categorised, in-app reporting mechanism that lets drivers flag issues immediately — without leaving the app, without visiting a physical office, without needing to write in a language they're not fluent in. Voice notes are the accessibility layer: not every driver can type confidently, but every driver can speak.
          </p>

          <div className="space-y-3">
            {[
              'Category-tagged reports: Safety / Income dispute / Harassment / Technical',
              'Voice note option (≤90 sec) — removes the literacy and language barrier entirely',
              'Status tracking — "Under review" / "Resolved" — gives the driver closure, not silence',
              'Ops dashboard — every report routed to support with SLA targets attached',
              'Aggregated signal piped to PM team — patterns surface the next feature automatically',
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 text-sm text-muted-light">
                <span style={{ color: '#22C55E' }} className="flex-shrink-0">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </CaseStudySection>

      {/* METRICS */}
      <StatRow
        stats={[
          { value: '0', label: 'In-app driver support channels found at research time', isPrimary: true },
          { value: '10+', label: 'Drivers interviewed across 2 weeks' },
          { value: '4', label: 'Core product gaps identified' },
        ]}
      />

      {/* KPI TARGETS */}
      <CaseStudySection eyebrow="MEASUREMENT" heading="How we'd know if it worked">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'North Star',
              value: '90-day Retention',
              desc: '% of drivers still active 90 days post-onboarding. If drivers feel heard, they stay. This is the metric that matters most upstream.',
            },
            {
              name: 'Leading Indicator',
              value: '< 48h Resolution',
              desc: 'Target: every grievance acknowledged within 48 hours. Baseline is "visit the office" — effectively infinite. Rapid acknowledgement alone changes driver trust.',
            },
            {
              name: 'Adoption Signal',
              value: 'In-app Utilisation',
              desc: '% of drivers who use the grievance tool in first 30 days. Low utilisation = not discoverable. High = validation that the need is real.',
            },
          ].map((kpi, idx) => (
            <div
              key={idx}
              className="bg-surface-raised rounded-lg p-6 border border-surface-border"
            >
              <div className="font-mono text-xs uppercase text-muted-light mb-2">{kpi.name}</div>
              <div className="font-display font-bold text-off-white mb-3">{kpi.value}</div>
              <p className="text-sm text-muted-light leading-relaxed">{kpi.desc}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* Next case study */}
      <CaseStudyNext href="/case-studies/push-notifications" title="Push Notifications at Scale →" />
    </CaseStudyLayout>
  );
}
