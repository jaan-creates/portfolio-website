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
- Live URL: https://pm-website-six.vercel.app/

## The only real "don'ts"
- Don't ship things *broken* (the robot lesson).
- Don't add decoration with zero intent — but a strong *intentional* signature element has intent, so that's a yes.
- Don't change design tokens (color, type, spacing) **silently** — but absolutely *propose* token changes if they'd make something better.
- Don't install or commit silently. Propose, then act.
