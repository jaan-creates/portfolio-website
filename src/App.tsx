import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Nav from './components/Nav';
import Hero from './components/Hero';
import BuilderProjects from './components/BuilderProjects';
import WorkExperience from './components/WorkExperience';
import CaseStudies from './components/CaseStudies';
import BeyondResume from './components/BeyondResume';
import PersonalityGallery from './components/PersonalityGallery';
import Contact from './components/Contact';
import RapidoCaseStudy from './pages/RapidoCaseStudy';
import PlumCaseStudy from './pages/PlumCaseStudy';
import HealthGlowCaseStudy from './pages/HealthGlowCaseStudy';
import PushNotificationsCaseStudy from './pages/PushNotificationsCaseStudy';
import PushNotificationGuidebook from './pages/PushNotificationGuidebook';
import PetzCaseStudy from './pages/PetzCaseStudy';
import SwiggyCaseStudy from './pages/SwiggyCaseStudy';
import DaybreakProject from './pages/DaybreakProject';

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({ autoRaf: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

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
  const prevKeyRef = useRef<string>('');
  const isPoppingRef = useRef(false);

  useEffect(() => {
    const onPopState = () => { isPoppingRef.current = true; };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const currentKey = location.pathname + location.search;

    if (isPoppingRef.current) {
      isPoppingRef.current = false;
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

function LandingPage() {
  return (
    <div className="bg-bg text-off-white min-h-screen font-sans">
      <Nav />
      <main>
        <Hero />
        <BuilderProjects />
        <WorkExperience />
        <CaseStudies />
        <BeyondResume />
        <PersonalityGallery />
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
      <Route path="/case-studies/health-and-glow" element={<HealthGlowCaseStudy />} />
      <Route path="/case-studies/push-notifications" element={<PushNotificationsCaseStudy />} />
      <Route path="/case-studies/push-guidebook" element={<PushNotificationGuidebook />} />
      <Route path="/case-studies/petz" element={<PetzCaseStudy />} />
      <Route path="/case-studies/swiggy" element={<SwiggyCaseStudy />} />
      <Route path="/projects/daybreak" element={<DaybreakProject />} />
    </Routes>
    </ThemeProvider>
  );
}
