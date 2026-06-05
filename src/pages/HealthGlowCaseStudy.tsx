import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';

export default function HealthGlowCaseStudy() {
  return (
    <CaseStudyLayout
      title="Leafy Luxe"
      company="Health & Glow"
      domain="Beauty-Tech"
      accentColor="#F07A1E"
      readTime="6 min read"
    >
      <CaseStudySection eyebrow="OVERVIEW" heading="About this case study">
        <p>
          Before "AI features" were a mandate, this case study covers designing
          one that actually knew your skin. Full content coming shortly.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
