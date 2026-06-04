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
import Robot from './components/Robot';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ autoRaf: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

export default function App() {
  return (
    <div className="bg-bg text-off-white min-h-screen font-sans">
      <Nav />
      <Robot />
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
