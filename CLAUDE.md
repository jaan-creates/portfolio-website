# Claude Code Rules — Janu's Portfolio

> Read this before touching any file. These are quality standards and a creative invitation — not limits.
> The goal: an exceptional, award-worthy portfolio. Ambition is the point. These rules exist to make bold ideas *land*.

## The prime directive
Build work that makes a hiring Director of Product think "this person has rare taste and substance." Reach for distinctive, memorable, beautifully-executed ideas. Nothing creative is off-limits. Everything below is about *executing ambition well* — never about avoiding it.

## You are a creative partner, not just an executor
- Brainstorm. Riff. Push back. If you see a stronger idea than what was asked, say so before building.
- When a section could go several ways, **present 2–3 distinct creative directions** (different feel, not just different color) and let Janu pick. Don't default to one safe answer.
- Inspiration is welcome: reference the feel of sites like Linear, Rauno Freiberg, Vercel, Awwwards winners, or anything that fits — describe the vibe you're reaching for.
- Treat looking at the live site together as a brainstorming surface. "Here's what I'd try next" is always a valid contribution.

## Iteration is the process, not a failure
- Great UI is *found*, not specced perfectly on the first try. Expect loops: "good — now slower / calmer / bolder / more contrast."
- "Good enough" is never the bar. If something could be more refined, say so and offer the better version.
- Polish passes are real work, not afterthoughts. Budget for them.

## Creative tech — explicitly encouraged
- Three.js, WebGL, GLSL shaders, particle systems, scroll-driven 3D, canvas experiments, interactive mascots, experimental layouts — all welcome where they create a genuinely memorable moment.
- When adding a new library, mention its rough bundle size as a *practical heads-up* (so we keep mobile fast) — this is a quick FYI for a shared decision, **not** a hurdle to clear. Cool ideas are the default-yes; we just stay aware of cost.
- The earlier robot was cut because it was *broken*, not because the idea was bad. A well-executed signature element is exactly what this site should have.

## Experiments & prototyping
- Spiking a throwaway experiment (a motion study, a WebGL test, a layout spike) is encouraged. Keep these clearly separate from production code (e.g. a `/sandbox` route or scratch file).
- The production quality gates below apply when an experiment *graduates* to the real site — not while you're exploring. Explore freely; harden before shipping.

## Quality bar (what "high standard" means when something ships)
Meeting these is what separates award-winning from amateur — they enable great work, they don't restrict it:
- **Performance:** Prefer animating `transform` and `opacity`. `filter`, `clip-path`, and other GPU-friendly properties are fine when an effect needs them. Avoid animating `width`/`height`/`top`/`margin` directly unless there's no alternative — flag it if so. Target Lighthouse ≥ 90 on mobile; if an ambitious feature risks dropping below, say so and we decide together whether it's worth it (sometimes it will be).
- **Accessibility (part of craft):** Every animation has a `prefers-reduced-motion` fallback. Interactive elements are keyboard-navigable with a visible focus ring. Text contrast ≥ 4.5:1. Meaningful images get descriptive alt text.
- **Cleanliness:** All GSAP ScrollTrigger instances killed in useEffect cleanup (prevents leaks and jank). No leftover console.logs. No dead imports.

## Code quality
- TypeScript strict mode. Avoid `any`; if unavoidable, comment why.
- Functional React components with typed props. One component per file in `src/components/` (experiments excepted).
- Tailwind for styling; `index.css` for global tokens and keyframes only.
- Lenis is wired into the GSAP ticker in App.tsx — keep that wiring intact unless a change is intentional and explained.

## Security (genuinely non-negotiable)
- Supabase keys live in `.env` as `import.meta.env.VITE_*`. Never hardcode secrets.
- `.gitignore` must include `.env`. Confirm before any Supabase work.
- Validate form inputs client-side; rely on Supabase RLS server-side.
- No third-party script without saying what data it collects.

## Performance hygiene
- New images: explicit `width`/`height`, `loading="lazy"` below the fold.
- State a new package's rough size before installing — as info for a shared call, not a refusal.
- Run `npm run build` after significant changes; report any new warnings.

## Deployment
- Local preview: `npm run dev`
- Deploy to production: `vercel --prod` from project root
- Live URL: https://janu-balachandran.vercel.app/

## Closing the loop (end of every working session)
When we finish a meaningful chunk of work, produce a BUILD REPORT I can paste
back into my planning chat, in this format:

BUILT: what shipped
CHANGED FROM THE BRIEF: what differed and why
DECISIONS MADE: technical decisions worth recording
NEW/REMOVED: components, files, dependencies (with rough sizes)
AFFECTS DESIGN/STRATEGY: anything the planning side should know
STATUS: live / local only / needs review

Keep it short and factual.

## The only real "don'ts"
- Don't ship things *broken* (the robot lesson).
- Don't add decoration with zero intent — but a strong *intentional* signature element has intent, so that's a yes.
- Don't change design tokens (color, type, spacing) **silently** — but absolutely *propose* token changes if they'd make something better.
- Don't install or commit silently. Propose, then act.

## Architecture & invariants (do NOT break)

### Routing — react-router-dom v6 (BrowserRouter in main.tsx, routes in App.tsx)
/                                  → LandingPage
/case-studies/rapido               → RapidoCaseStudy (built, in grid)
/case-studies/plum                 → PlumCaseStudy (built, in grid)
/case-studies/petz                 → PetzCaseStudy (built, in grid)
/case-studies/push-notifications   → PushNotificationsCaseStudy (built, in grid)
/case-studies/swiggy               → SwiggyCaseStudy (built, in grid)
/case-studies/push-guidebook       → PushNotificationGuidebook (built, in grid)
/projects/daybreak                 → DaybreakProject (built)

### Motion invariants
- Lenis + GSAP ticker is wired at MODULE LEVEL in App.tsx. Never move it into a useEffect — breaks site-wide smooth scroll.
- Every GSAP ScrollTrigger uses gsap.matchMedia() + mm.revert() cleanup and is prefers-reduced-motion safe. Match this for any new scroll animation.
- Animate transform/opacity only.

### Theming
- Tailwind tokens: bg #0D0D0F · surface-raised #1A1A1F · surface-border rgba(255,255,255,0.06)
  · accent (global teal) #14B8A6 · accent-purple #7F77DD · accent-green #22C55E · accent-orange #F97316
- Per-study accent: passed to CaseStudyLayout as `accentColor`, exposed as `--case-accent` on the layout's outer div. Children read var(--case-accent) — no prop drilling. Set ONCE at page level.
- Fonts: Space Grotesk (display) · Inter (body) · JetBrains Mono (font-mono: stats, timestamps, mono labels)
- Fluid type scale --step--1 … --step-4 (clamp) in index.css

### Layout
- Case-study detail pages: max-w-3xl mx-auto px-6. Never px-16.

### Security
- Supabase keys in .env as VITE_*. Never hardcode. (Not yet wired — relevant when Contact form lands.)

## Component map — src/components/case-study/
Layout: CaseStudyLayout (progress bar, sticky nav, --case-accent), CaseStudySection
Rapido: CaseStudyMeta, PullQuote, FindingGrid, PersonaGrid, EmpathyMap (own quadrant colors, NOT --case-accent), DecisionBlock, CaseStudyTable, StatRow, CaseStudyNext
Push: NotificationCard, InsightCallout, ScenarioBar, AssessmentGrid, AppHeader, BiasCard, NotificationTimeline, BarChart
Guidebook: PipelineFlow, PlatformSplit, TypeDefinition, TypeSubCards, AnatomyBlock

## Open TODOs (next session)
- Rapido content gaps: Role/Timeline/Context/Outcome meta; Decision 1&2 "why" sentences; Decision 3 chosen recommendation + outcome; confirm "12+" driver count; reflection paragraph.
- Link guidebook from Push Notifications page (CaseStudyNext → /case-studies/push-guidebook).
- CI now runs typecheck + lint + build on every push/PR to `main` via `.github/workflows/ci.yml`.
