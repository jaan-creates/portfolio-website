import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { lenis } from './lib/lenis';

import Nav from './components/Nav';
import Hero from './components/Hero';
import ScrollHero from './components/ScrollHero';
import BuilderProjects from './components/BuilderProjects';
import WorkExperience from './components/WorkExperience';
import ExperienceCards3D from './components/ExperienceCards3D';
import CaseStudies from './components/CaseStudies';
import BeyondResume from './components/BeyondResume';
import SpiralGallery from './components/SpiralGallery';
import Contact from './components/Contact';
import RapidoCaseStudy from './pages/RapidoCaseStudy';
import PlumCaseStudy from './pages/PlumCaseStudy';
import PushNotificationsCaseStudy from './pages/PushNotificationsCaseStudy';
import PushNotificationGuidebook from './pages/PushNotificationGuidebook';
import PetzCaseStudy from './pages/PetzCaseStudy';
import SwiggyCaseStudy from './pages/SwiggyCaseStudy';
import DaybreakProject from './pages/DaybreakProject';

// ---------------------------------------------------------------------------
// ScrollManager — fixes two UX bugs:
//   1. Forward navigation → scroll to top immediately (Lenis virtualises scroll,
//      so React Router never resets position on its own).
//   2. Back/Forward (popstate) → restore the saved Lenis scroll position for
//      that URL (window.scrollY is always 0 with Lenis, so native restoration
//      silently fails without this).
// ---------------------------------------------------------------------------
const scrollHistory = new Map<string, number>();

function ScrollManager() {
  const location = useLocation();
  // React Router's navigation type ('POP' for back/forward) — a window popstate
  // listener is unreliable here: React 18 flushes the Router's popstate update
  // synchronously, so this effect can run before any sibling listener fires.
  const navigationType = useNavigationType();
  const prevKeyRef = useRef<string>('');

  useEffect(() => {
    const currentKey = location.pathname + location.search;

    if (navigationType === 'POP' && prevKeyRef.current) {
      scrollHistory.set(prevKeyRef.current, lenis.scroll);
      const saved = scrollHistory.get(currentKey) ?? 0;
      requestAnimationFrame(() => {
        lenis.scrollTo(saved, { immediate: true });
      });
    } else {
      if (prevKeyRef.current) {
        scrollHistory.set(prevKeyRef.current, lenis.scroll);
      }
      lenis.scrollTo(0, { immediate: true });
    }

    prevKeyRef.current = currentKey;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return null;
}

// Build-time hero selector. 'ai' → <HeroAlt />; unset/anything else → <Hero />.
// Read once at module level — build-time only, never sniffs window.location.
const SITE_VARIANT = import.meta.env.VITE_SITE_VARIANT;

const USE_3D_EXPERIENCE = true; // flip to false to revert to <WorkExperience /> instantly

// --- TRIAL: 3D spiral gallery vs. original Beyond the Resume ---
const USE_SPIRAL_GALLERY = true; // flip to false to restore the original

function LandingPage() {
  return (
    <div className="bg-bg text-off-white min-h-screen font-sans">
      <Nav />
      <main>
        {SITE_VARIANT === 'ai' ? <ScrollHero /> : <Hero />}
        <BuilderProjects />
        {USE_3D_EXPERIENCE ? <ExperienceCards3D /> : <WorkExperience />}
        <CaseStudies />
        {USE_SPIRAL_GALLERY ? <SpiralGallery /> : <BeyondResume />}
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollManager />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/case-studies/rapido" element={<RapidoCaseStudy />} />
      <Route path="/case-studies/plum" element={<PlumCaseStudy />} />
      <Route path="/case-studies/push-notifications" element={<PushNotificationsCaseStudy />} />
      <Route path="/case-studies/push-guidebook" element={<PushNotificationGuidebook />} />
      <Route path="/case-studies/petz" element={<PetzCaseStudy />} />
      <Route path="/case-studies/swiggy" element={<SwiggyCaseStudy />} />
      <Route path="/projects/daybreak" element={<DaybreakProject />} />
    </Routes>
    </ThemeProvider>
  );
}
