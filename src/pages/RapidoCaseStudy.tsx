import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';

export default function RapidoCaseStudy() {
  return (
    <CaseStudyLayout
      title="The Driver No One Heard"
      company="Rapido"
      domain="Mobility"
      accentColor="#FFD11A"
      readTime="8 min read"
    >
      <CaseStudySection eyebrow="OVERVIEW" heading="About this case study">
        <p>
          This case study explores how ethnographic field research uncovered a
          product problem hiding in plain sight. Full content coming shortly.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
