import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';
import CaseStudyMeta from '../components/case-study/CaseStudyMeta';
import PullQuote from '../components/case-study/PullQuote';
import FindingGrid from '../components/case-study/FindingGrid';
import PersonaGrid from '../components/case-study/PersonaGrid';
import EmpathyMap from '../components/case-study/EmpathyMap';
import DecisionBlock from '../components/case-study/DecisionBlock';
import CaseStudyTable from '../components/case-study/CaseStudyTable';
import StatRow from '../components/case-study/StatRow';
import CaseStudyNext from '../components/case-study/CaseStudyNext';

export default function RapidoCaseStudy() {
  return (
    <CaseStudyLayout
      title="An Insight Into The Lives of Bike-Taxi Drivers in India"
      company="Rapido"
      domain="Mobility"
      accentColor="#FFD11A"
      readTime="8 min read"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Research', 'UX', 'Field Study', 'Gig Economy'].map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs font-medium px-2.5 py-1 rounded border border-surface-border bg-surface-raised text-muted-light uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <CaseStudyMeta
        cells={[
          { label: 'My Role', value: '← Add your role', isGap: true },
          { label: 'Timeline', value: '2 weeks · ← Add year', isGap: true },
          { label: 'Context', value: '← Add context', isGap: true },
          { label: 'Outcome', value: '← Add outcome', isGap: true },
        ]}
      />

      {/* Problem statement */}
      <CaseStudySection eyebrow="BACKGROUND" heading="The Zomato t-shirt that started everything">
        <p className="text-off-white leading-relaxed mb-6" style={{ fontSize: 'var(--step-0)' }}>
          I booked a Rapido bike ride and my driver was wearing a Zomato t-shirt. It was a branding
          brain teaser — was this a crossover episode, or had I accidentally booked the wrong app? I
          wanted to understand why.
        </p>

        <PullQuote>
          "I'm not trying to steal anyone's business. I just want to make a living and provide for
          my family."
        </PullQuote>

        <p className="text-off-white leading-relaxed" style={{ fontSize: 'var(--step-0)' }}>
          For two weeks, I used my daily Rapido rides as research sessions — conducting candid
          conversations with the drivers assigned to me. I spoke with drivers ranging from those who
          had been with Rapido since 2017 to others who were on their very first ride. What emerged
          wasn't just a list of product bugs. It was a picture of workers navigating fear, isolation,
          and invisibility inside an app that had no real way to hear them.
        </p>
      </CaseStudySection>

      {/* Findings */}
      <CaseStudySection eyebrow="RESEARCH" heading="What I found">
        <FindingGrid
          findings={[
            {
              icon: '⚡',
              title: 'Freedom and Flexibility',
              body: (
                <>
                  Most drivers valued the <strong className="text-off-white">freedom and flexibility</strong> the job offered and felt
                  motivated by the incentives and extra income — but that goodwill was being eroded
                  by daily friction.
                </>
              ),
            },
            {
              icon: '⚠️',
              title: 'Deliberate Harassment',
              body: (
                <>
                  Many drivers faced <strong className="text-off-white">deliberate harassment</strong> by auto drivers. Auto drivers
                  would intentionally book rides just to confront them — forcing Rapido drivers to
                  disguise themselves in Swiggy or Zomato uniforms.
                </>
              ),
            },
            {
              icon: '🔇',
              title: 'No Grievance Mechanism',
              body: (
                <>
                  The Rapido app had{' '}
                  <strong className="text-off-white">no in-app grievance mechanism</strong>.
                  Complaints had to be escalated to a physical Rapido office — a high barrier for
                  drivers from low-literacy backgrounds.
                </>
              ),
            },
            {
              icon: '🌐',
              title: 'Language Barriers',
              body: (
                <>
                  Drivers from outside Karnataka faced{' '}
                  <strong className="text-off-white">language barriers</strong> that compounded
                  every other problem — from communicating with riders to speaking up for themselves.
                </>
              ),
            },
          ]}
        />
      </CaseStudySection>

      {/* Personas */}
      <CaseStudySection eyebrow="WHO I DESIGNED FOR" heading="Who I was designing for">
        <PersonaGrid
          personas={[
            {
              avatar: '🧑‍💼',
              name: 'Gim',
              age: 33,
              meta: ['Full-time Driver', 'Manipur → Bangalore'],
              bio: "Recently relocated to Bangalore, bought a second-hand bike to drive for Rapido. Low educational qualifications, doesn't speak Kannada, lives in a rented room. Comfortable with technology, but has no local support network.",
              painpointsLabel: 'Core Painpoints',
              painpoints: [
                'Communication difficulties with local-language-only riders',
                'Struggling to make enough to justify the cost of living',
                'Fears confrontation from auto drivers who see him as a threat',
                'Isolated — no community, no colleagues, no one to raise issues with',
              ],
            },
            {
              avatar: '👨‍👩‍👦',
              name: 'Rakesh',
              age: 29,
              meta: ['Part-time Driver', 'Bangalore'],
              bio: "Married with one child. Works at a mall full-time and drives for Rapido to earn extra income. Actively uses mobile apps and is technology-savvy. The gig isn't his identity — it's a financial tool.",
              painpointsLabel: 'Core Painpoints',
              painpoints: [
                'Low earnings after deducting fuel and maintenance costs',
                'Long hours + mall job = exhaustion that bleeds into performance',
                "No clear separation between his 'day job' stress and driving stress",
                'Hostility from traditional taxi drivers who see him as competition',
              ],
            },
          ]}
        />
      </CaseStudySection>

      {/* Empathy map */}
      <CaseStudySection eyebrow="SYNTHESIS" heading="Inside the driver's head">
        <EmpathyMap
          subject="DRIVER"
          intro="The empathy map below is synthesised from conversations across both personas. The most striking gap: between what drivers say (calm, professional) and what they feel (afraid, exhausted, invisible)."
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
                '"I don\'t speak the local language"',
              ],
            },
            {
              title: 'Thinks',
              titleColor: '#F87171',
              chipBg: 'rgba(248,113,113,0.1)',
              chipColor: '#FCA5A5',
              chips: [
                '"Hope I can avoid confrontations today"',
                '"Will I earn enough this month?"',
                '"I wish I could explain myself"',
                '"Traffic is really bad today"',
                '"I need more time to rest"',
              ],
            },
            {
              title: 'Does',
              titleColor: '#4ADE80',
              chipBg: 'rgba(74,222,128,0.1)',
              chipColor: '#86EFAC',
              chips: [
                'Wears Swiggy/Zomato uniform as camouflage',
                'Avoids routes where confrontations are likely',
                'Parks away from designated pickup zones',
                'Makes small talk to build rapport with riders',
              ],
            },
            {
              title: 'Feels',
              titleColor: '#FBBF24',
              chipBg: 'rgba(251,191,36,0.1)',
              chipColor: '#FCD34D',
              chips: [
                'Fearful of hostile encounters',
                'Defenseless',
                'Anxious',
                'Stressed about income',
                'Frustrated by traffic',
                'Tired',
              ],
            },
          ]}
        />
      </CaseStudySection>

      {/* Decisions */}
      <CaseStudySection eyebrow="DECISIONS" heading="The decisions behind the research">
        <DecisionBlock
          number="01"
          label="Research Method"
          question="Should I conduct formal interviews, or use the rides themselves as the research setting?"
          context="I needed candid, honest insight from drivers — not polished answers. The question was whether a formal setup would make drivers more guarded, or whether I could get better signal from an already-existing context of trust."
          options={[
            {
              name: 'Formal Interview',
              pros: 'Structured, consistent across all participants. Easy to compare responses.',
              cons: 'Drivers may feel observed and self-censor. Hard to recruit participants.',
              chosen: false,
            },
            {
              name: 'In-Ride Ethnography ✓',
              pros: 'Natural setting. Drivers are already at work — context is rich. Lower guard.',
              cons: "Can't control for ride length or interruptions. No recording.",
              chosen: true,
            },
          ]}
          chosenLabel="✓ Chose: In-ride ethnography"
          gapNote="← Add one sentence: why you chose this method over a formal setup."
          outcome={{
            title: 'What happened',
            body: 'The conversational setting produced remarkably candid responses. Drivers shared concerns they almost certainly wouldn\'t have raised in a formal context — including the harassment tactic and the uniform disguise, which became two of the most critical findings.',
          }}
        />

        <DecisionBlock
          number="02"
          label="Scope"
          question="Study the rider experience or the driver experience — where was the bigger, more neglected gap?"
          context="Most product research in ride-hailing focuses on riders. The driver app is treated as a back-end operational tool, not a product deserving UX attention. The Zomato t-shirt triggered a specific question: what's happening on the other side?"
          options={[
            {
              name: 'Rider Experience',
              pros: 'Larger user base. More existing research to build on.',
              cons: 'Already well-studied. Unlikely to surface anything novel.',
              chosen: false,
            },
            {
              name: 'Driver Experience ✓',
              pros: 'Severely under-researched. High potential for novel insights. Direct access via daily rides.',
              cons: 'Smaller sample. Risk of over-indexing on individual stories.',
              chosen: true,
            },
          ]}
          chosenLabel="✓ Chose: Driver experience"
          gapNote="← Add one sentence: what made you certain the driver side had a bigger unmet need."
          outcome={{
            title: 'What happened',
            body: 'Every single driver interview surfaced a grievance that had no outlet. The insight about the missing in-app support system — which should have been a day-one product requirement — only emerged because we were asking the right people the right questions.',
          }}
        />

        <DecisionBlock
          number="03"
          label="Solution Framing"
          question="Recommend product fixes (in-app grievance tool), or systemic interventions (community, language support)?"
          context="The research surfaced two distinct layers of problem: things a PM could fix in a sprint (no reporting mechanism in the app) and things that require Rapido to change how it thinks about its driver community. Which recommendation is more actionable? Which is more important?"
          options={[
            {
              name: 'Product / App fixes',
              pros: "Actionable. A PM can scope this into a roadmap sprint today.",
              cons: "Solves the symptom. Doesn't change the underlying driver-platform power dynamic.",
              chosen: false,
            },
            {
              name: 'Systemic interventions',
              pros: "Addresses root causes. Could differentiate Rapido's employer brand.",
              cons: 'Harder to scope. Requires buy-in from ops, not just product.',
              chosen: false,
            },
          ]}
          gapNote="← Add: which recommendation did you lead with, and why? Did you explicitly prioritise one over the other?"
          outcome={{
            title: 'What happened',
            body: '← Add the outcome: Was this shared? Published? Did it reach Rapido? What happened after?',
            isGap: true,
          }}
        />
      </CaseStudySection>

      {/* Solutions */}
      <CaseStudySection eyebrow="SOLUTIONS" heading="Proposed solutions">
        <p
          className="text-muted-light leading-relaxed mb-2"
          style={{ fontSize: 'var(--step-0)' }}
        >
          These emerged directly from driver interviews — ranging from quick in-app fixes to
          structural changes in how Rapido relates to its driver community.
        </p>
        <CaseStudyTable
          columns={[
            { header: 'Solution', key: 'solution' },
            { header: 'Type', key: 'type' },
            { header: 'What it addresses', key: 'addresses' },
            {
              header: 'Effort',
              key: 'effort',
              renderCell: (val) => (
                <span
                  style={{
                    color: val === 'Low–Medium' ? '#22C55E' : '#A1A1AA',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                  }}
                >
                  {val}
                </span>
              ),
            },
          ]}
          rows={[
            {
              solution: 'In-app grievance reporting + voice note support',
              type: 'Product',
              addresses: 'No way to report issues without visiting an office',
              effort: 'Low–Medium',
            },
            {
              solution: 'Multi-language support / translation layer in app',
              type: 'Product',
              addresses: 'Language barriers for non-local drivers',
              effort: 'Medium',
            },
            {
              solution: 'Safety panic button / dedicated safety hotline',
              type: 'Product',
              addresses: 'Harassment and physical threat from competing drivers',
              effort: 'Medium',
            },
            {
              solution: 'Driver advisory council / regular feedback forum',
              type: 'Systemic',
              addresses: 'Voicelessness — no channel to influence the platform',
              effort: 'High',
            },
            {
              solution: 'Regular community events and recognition programs',
              type: 'Systemic',
              addresses: 'Isolation and lack of peer community among drivers',
              effort: 'Medium',
            },
            {
              solution: 'Communication skills + language training workshops',
              type: 'Systemic',
              addresses: 'Confidence deficit in voicing grievances',
              effort: 'Medium',
            },
          ]}
        />
      </CaseStudySection>

      {/* Metrics */}
      <StatRow
        stats={[
          { value: '12+', label: 'Drivers interviewed', isPrimary: true },
          { value: '2wk', label: 'Field research duration' },
          { value: '3', label: 'Core unmet needs identified' },
        ]}
      />

      {/* Reflection */}
      <CaseStudySection eyebrow="REFLECTION" heading="Reflection">
        <div
          className="rounded-xl p-7 md:p-8 relative overflow-hidden"
          style={{
            background: '#141417',
            border: '0.5px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Decorative quote mark */}
          <span
            aria-hidden="true"
            className="absolute font-display select-none pointer-events-none"
            style={{
              top: '-12px',
              left: '24px',
              fontSize: '120px',
              color: 'var(--case-accent)',
              opacity: 0.08,
              lineHeight: 1,
            }}
          >
            "
          </span>
          <p
            className="text-muted-light italic opacity-70 leading-relaxed relative z-10"
            style={{ fontSize: 'var(--step-0)', maxWidth: '640px' }}
          >
            ← Add your reflection here: What would you do differently? What surprised you? What did
            this teach you about research, gig workers, or your own assumptions? (2–3 sentences max)
          </p>
        </div>
      </CaseStudySection>

      {/* Next case study */}
      <CaseStudyNext href="#" title="← Add next case study title" />
    </CaseStudyLayout>
  );
}
