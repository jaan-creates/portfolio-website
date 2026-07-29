# CONTEXT.md

For a senior Engineering Manager with ten minutes and no prior exposure to this repo.

## 1. What this is

A single-page personal portfolio site (product manager's case-study showcase) built as a Vite + React SPA, deployed to Vercel.

## 2. Stack

From `package.json` / `package-lock.json` (Node ecosystem, no backend):

- **Build tool:** Vite 5.4
- **Framework:** React 18.3 + TypeScript 5.5 (strict mode)
- **Routing:** react-router-dom 6.30 (client-side, `BrowserRouter`)
- **Styling:** Tailwind CSS 3.4 + PostCSS/Autoprefixer
- **Animation:** GSAP 3.15 (with ScrollTrigger) + Lenis 1.3 (smooth scroll), wired together at module level in `src/App.tsx`
- **3D:** three.js 0.184 (`@types/three`), atropos 2.0 (tilt effect library)
- **Icons:** lucide-react
- **Data client present but unused:** `@supabase/supabase-js` 2.57 — no `createClient` call or import of it anywhere in `src/` (verified by grep). It is a listed dependency with no wiring.
- **Utility:** clsx, tailwind-merge
- **Image tooling (dev-only):** sharp 0.35, used by one-off scripts in `scripts/`, not part of the build
- Linting: ESLint 9 + typescript-eslint 8. No test runner of any kind is configured (no jest/vitest/testing-library in `package.json`, no `*.test.*` / `*.spec.*` files in the repo).

## 3. Architecture

**Plain language:** It's a single React app with one long-scroll landing page (`/`) plus seven fully separate "detail" routes for individual case studies, all client-rendered — there is no server, no API, no database connection despite Supabase being installed. Deployment is static hosting on Vercel with an SPA rewrite so deep links (e.g. `/case-studies/rapido`) resolve to `index.html` and React Router takes over.

**Routing** (`src/App.tsx`, confirmed against actual route table — see §6 for a discrepancy with CLAUDE.md):

| Path | Component | Status |
|---|---|---|
| `/` | `LandingPage` (Nav, Hero/ScrollHero, BuilderProjects, ExperienceCards3D, CaseStudies, SpiralGallery, Contact) | Implemented |
| `/case-studies/rapido` | `RapidoCaseStudy` | Implemented, full content (693 lines) |
| `/case-studies/plum` | `PlumCaseStudy` | Implemented, full content (717 lines) |
| `/case-studies/petz` | `PetzCaseStudy` | Implemented, full content (1375 lines) |
| `/case-studies/push-notifications` | `PushNotificationsCaseStudy` | Implemented, full content (645 lines) |
| `/case-studies/push-guidebook` | `PushNotificationGuidebook` | Implemented, full content (494 lines), **is** linked from the landing-page grid |
| `/case-studies/swiggy` | `SwiggyCaseStudy` | Implemented, full content (919 lines) |
| `/projects/daybreak` | `DaybreakProject` | Implemented, full content (734 lines) |

All six cards on the landing page's case-study grid (`src/components/CaseStudies.tsx`) are marked `status: 'live'` and link to real, content-filled pages. There are no placeholder routes currently wired in — `/case-studies/plum`, `/case-studies/health-and-glow` were placeholders as of the `docs/session-log/2026-06-09.md` note, but that is stale; Plum now has real content and there is no `health-and-glow` route in `App.tsx` at all (superseded by `petz` and `swiggy`).

**Motion architecture:** Lenis smooth-scroll is instantiated and hooked into the GSAP ticker at module scope in `App.tsx` (not inside a `useEffect`) — this is a stated invariant in `CLAUDE.md`. A `ScrollManager` component (inside `Routes`) restores/tracks per-route scroll position across navigation using an in-memory `Map`, since Lenis virtualizes scroll and `window.scrollY` doesn't reflect it.

**Theming:** `ThemeContext` (`src/contexts/ThemeContext.tsx`) is a light/dark toggle backed by `localStorage`, defaulting to dark and applying a `.light` class on `<html>`. `ThemeProvider` wraps the whole app in `App.tsx`.

**Directory map (parts that matter):**
```
src/
  App.tsx                  routes, Lenis+GSAP wiring, ScrollManager
  main.tsx                 entrypoint (BrowserRouter root — not read in full, standard)
  components/               landing-page sections + shared UI
    case-study/              ~20 shared building blocks (PullQuote, FindingGrid, PersonaGrid, DecisionBlock, CaseStudyTable, StatRow, notification/guidebook widgets, etc.)
    SpiralGallery/            3D image gallery component (own subfolder)
    Robot.tsx, RobotPath.tsx  DEAD CODE — not imported by App.tsx or any page (see §6)
  pages/                    one file per case study/project (see table above)
  contexts/ThemeContext.tsx
scripts/                   one-off Node image-optimization scripts (sharp), run manually, not part of build/CI
docs/session-log/          a single stale AI-session summary from 2026-06-09
public/                    ~37MB of static assets (images, spiral gallery frames)
```

## 4. Verified state

**Build:** ✅ Succeeds. `npm run build` (`vite build`) completed in ~52s, 1531 modules transformed, output `dist/assets/index-*.js` = 1.08 MB (313.79 KB gzip), plus a Vite warning that the main JS chunk exceeds the 500 KB guideline (no code-splitting/dynamic imports configured).

**Typecheck:** ❌ Fails. `npm run typecheck` (`tsc --noEmit -p tsconfig.app.json`) reports 8 `noUnusedLocals`/`noUnusedParameters` errors (unused imports/variables in `CaseStudies.tsx`, `RobotPath.tsx`, `SpiralGallery.tsx`, `WorkExperience.tsx`, `PetzCaseStudy.tsx` ×2, `RapidoCaseStudy.tsx`, `SwiggyCaseStudy.tsx`). The `build` script does not run `tsc` first, so these errors do not block `vite build` — they are silently tolerated in production builds.

**Lint:** ❌ Fails. `npm run lint` reports 10 errors (mirroring the typecheck unused-var errors) and 5 warnings (react-refresh fast-refresh warnings in `App.tsx`, `ScrollHero.tsx`, `ThemeContext.tsx`; one unused eslint-disable directive in `App.tsx`).

**Tests:** None. No test framework is installed, no test files exist. Nothing to run.

**Referenced but absent / unwired:**
- `@supabase/supabase-js` is a dependency with zero usage in `src/` — CLAUDE.md itself flags this ("Not yet wired — relevant when Contact form lands").
- `.env` does not exist locally (gitignored). Only `.env.example` (documents `VITE_SITE_VARIANT`) and `.env.ai` (sets `VITE_SITE_VARIANT=ai` for the `dev:ai` script) are present — both untracked in git status at session start.
- `Contact.tsx` has a literal `// TODO: Add real contact form, social links, and availability status` — it currently renders a static `mailto:` link and two social icons, no form, no Supabase.
- `Robot.tsx` and `RobotPath.tsx` exist in `src/components/` but are not imported anywhere in `App.tsx` or any page — confirmed dead code (matches CLAUDE.md's note that an earlier robot element was "cut because it was broken"; the file was apparently never deleted, only unwired). `RobotPath.tsx` also has an unused-variable lint/type error.

**Evidence it has run for real:**
- `.vercel/project.json` exists with a real `projectId`/`orgId`/`projectName: "pm-website"` — the project is linked to an actual Vercel project.
- `vercel.json` contains an SPA rewrite rule, added in commit `85bd52...` ("Add vercel.json SPA rewrite to fix 404s on direct navigation") — a fix for a real production bug, implying the site has been live and hit that bug.
- A `dist/` build output directory exists locally with hashed asset filenames matching the build just run.
- Live URL is documented in `CLAUDE.md` as `https://pm-website-six.vercel.app/` — not independently verified by browsing in this pass (out of scope for a static repo audit), so treat as **designed/claimed**, not verified here.

**Commit activity:** 32 commits total. First commit 2026-06-04 ("Start repository"), most recent 2026-07-28 ("Replace favicon with koi fish artwork"). Activity is a single steady stream on `main`, no branches merged besides one early "Merge remote" resolving a Robot.tsx removal conflict. Shape: initial scaffold → CLAUDE.md + rules → routing/case-study infra → Rapido content → iterative visual polish (icons, headings, spacing) → gallery rename/rebuild (Daybreak→Daybrief) → image optimization pass → SPA rewrite fix → favicon swap. No commits after 2026-07-28 as of this writing (2026-07-29).

**Uncommitted state at session start:** `.claude/launch.json` modified (adds fixed dev ports 5180/5181 for `dev` and a new `ai` config), a nested `.claude/worktrees/agent-aaa01bd971d54e92c` submodule-like directory shows as modified content, and `.env.ai` / `.env.example` are untracked.

## 5. Decisions recoverable from the repo

- **Lenis+GSAP must stay at module level, not in `useEffect`** — stated explicitly in `CLAUDE.md` and enforced in code; reason given: it "breaks site-wide smooth scroll" otherwise (verified: this is architectural fact, not just a rule — moving it would re-run Lenis init per route).
- **Robot component removed** — per `docs/session-log/2026-06-09.md`, the user explicitly asked for `Robot.tsx` to be deleted because it was broken (not because the idea was bad; CLAUDE.md says a future signature element is still wanted). Reason recoverable. Note the file itself was never actually deleted — only unwired from `App.tsx` — a gap between the stated decision and the code.
- **`--case-accent` CSS variable pattern** — chosen to avoid prop-drilling an accent color through every case-study child component; set once on `CaseStudyLayout`'s outer div. Reason recoverable from session log.
- **SPA rewrite added late** (commit `85bd52a`) — direct-navigation 404s on Vercel, a known static-hosting/SPA-router gap; fixed reactively after being hit in production, not designed upfront.
- **Health & Glow case study dropped, Petz and Swiggy added instead** — not documented anywhere as an explicit decision; only inferable by diffing `docs/session-log/2026-06-09.md` (which lists Health & Glow as planned) against current `App.tsx`/`CaseStudies.tsx` (which have no such route, and have Petz/Swiggy instead). **Reason not recoverable from repo — unknown.**
- **Why Supabase was added as a dependency before any usage** — CLAUDE.md states security rules for it ("relevant when Contact form lands") implying it was pre-provisioned for a planned contact-form feature that hasn't been built yet. Reason recoverable (stated intent), implementation is not.

## 6. Risks and fragility

- **CLAUDE.md is stale and contradicts the actual code** in at least three material ways: (a) it lists `/case-studies/health-and-glow` as a route — it does not exist in `App.tsx`; (b) it states Plum and Health-and-Glow pages are "PLACEHOLDER" — Plum is fully built (717 lines), Health-and-Glow doesn't exist, and Petz/Swiggy (not mentioned in CLAUDE.md's routing table at all) are fully built; (c) it states the guidebook page is "not in grid — direct URL only" — it is now in the landing-page grid. Anyone (human or agent) planning work from CLAUDE.md's architecture section alone will misjudge what's left to build.
- **No CI/test safety net.** Lint and typecheck both currently fail (10 lint errors, 8 tsc errors) and neither gates the build script, so broken code (in the strict-mode sense) can and does ship silently. There's no automated check preventing regressions.
- **Single 1.08 MB JS chunk**, no code-splitting. `CLAUDE.md` sets a Lighthouse mobile target of ≥90; a single monolithic bundle at this size (313 KB gzip) directly works against that on slow mobile connections, especially since `three`, `gsap`, and `atropos` are all in the main bundle regardless of which page loads.
- **Dead code left in the tree** (`Robot.tsx`, `RobotPath.tsx`) — harmless today, but it's a lint-error source and a maintenance trap for the next person who assumes an unused-but-present component is intentional.
- **Supabase dependency with zero usage** is an unnecessary attack surface / bundle-size cost sitting idle. If a contact form is never built, this should be removed; if it will be, `.env` handling and RLS need to be designed before any key is wired (per CLAUDE.md's own security section).
- **37 MB of static assets in `public/`**, largely unoptimized-looking single files (`My_image.png` 1.7 MB, another PNG 1.6 MB) alongside an assets folder at 31 MB — no evidence in the build output of image optimization at build time (the `scripts/optimize-*.mjs` scripts are manual, developer-run, not part of `npm run build`), so regressions in image size are easy to introduce silently.
- **Live-site claim is unverified in this pass.** The Vercel project link and the SPA-rewrite fix commit are strong circumstantial evidence the site has been deployed and used, but no live request was made during this audit — treat "it's live" as designed/claimed until checked directly.
- **Uncommitted working-tree changes** (`.claude/launch.json`, a modified nested worktree directory, untracked `.env.ai`/`.env.example`) mean the repo's on-disk state doesn't fully match its last commit — a reviewer diffing `git log` against the filesystem will see drift that isn't explained by any commit message.

## 7. Where a reviewer should start

1. **`src/App.tsx`** — the entire routing table, the Lenis/GSAP module-level wiring, and the `ScrollManager` scroll-restoration logic all live here in ~117 lines. It's the fastest way to get an accurate picture of what's actually built and wired, which is more reliable than `CLAUDE.md`'s routing table (see §6).
2. **`CLAUDE.md`** — not because it's accurate, but because it's the stated contract for how this codebase should be worked on (motion invariants, theming tokens, security rules, "closing the loop" reporting format). A reviewer needs it to judge future changes against the project's own rules, while cross-checking its stale claims against `App.tsx` and `CaseStudies.tsx` as done in this document.
3. **`package.json` + a run of `npm run typecheck` / `npm run lint`** — five minutes here surfaces the two concrete, current defects (8 tsc errors, 10 lint errors) and the one significant unused dependency (`@supabase/supabase-js`), which together are the most actionable findings for someone deciding what to fix first.
