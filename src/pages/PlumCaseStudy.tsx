import CaseStudyLayout from '../components/CaseStudyLayout';
import CaseStudySection from '../components/CaseStudySection';

export default function PlumCaseStudy() {
  return (
    <CaseStudyLayout
      title="Reducing Cancellations in Telehealth"
      company="Plum Health"
      domain="Healthcare"
      accentColor="#E8517F"
      readTime="7 min read"
    >
      <CaseStudySection eyebrow="OVERVIEW" heading="About this case study">
        <p>
          Telehealth had a trust problem, not a feature gap. This case study
          maps the full patient journey to find where confidence broke down.
          Full content coming shortly.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
