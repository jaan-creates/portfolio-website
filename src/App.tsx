import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Nav from './components/Nav';
import Hero from './components/Hero';
import BuilderProjects from './components/BuilderProjects';
import WorkExperience from './components/WorkExperience';
import CaseStudies from './components/CaseStudies';
import PersonalityGallery from './components/PersonalityGallery';
import Contact from './components/Contact';
import RapidoCaseStudy from './pages/RapidoCaseStudy';
import PlumCaseStudy from './pages/PlumCaseStudy';
import HealthGlowCaseStudy from './pages/HealthGlowCaseStudy';
import PushNotificationsCaseStudy from './pages/PushNotificationsCaseStudy';
import PushNotificationGuidebook from './pages/PushNotificationGuidebook';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ autoRaf: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

function LandingPage() {
  return (
    <div className="bg-bg text-off-white min-h-screen font-sans">
      <Nav />
      <main>
        <Hero />
        <BuilderProjects />
        <WorkExperience />
        <CaseStudies />
        <PersonalityGallery />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/case-studies/rapido" element={<RapidoCaseStudy />} />
      <Route path="/case-studies/plum" element={<PlumCaseStudy />} />
      <Route path="/case-studies/health-and-glow" element={<HealthGlowCaseStudy />} />
      <Route path="/case-studies/push-notifications" element={<PushNotificationsCaseStudy />} />
      <Route path="/case-studies/push-guidebook" element={<PushNotificationGuidebook />} />
    </Routes>
  );
}
