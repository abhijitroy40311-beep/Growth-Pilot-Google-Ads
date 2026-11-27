import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { faqsData } from '../../data/faqs';
import { FAQAccordion } from '../ui/FAQAccordion';
import { EditorialSectionHeader } from '../ui/EditorialPrimitives';

export const HomeFAQSection: React.FC = () => {
  const previewFaqs = faqsData.slice(0, 5);

  return (
    <section
      id="stage-faq"
      aria-labelledby="home-faq-heading"
      className="border-t border-white/10 bg-[#111318] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          headingId="home-faq-heading"
          index="07"
          eyebrow="Common Questions"
          title="Straightforward Answers Before We Begin."
          action={
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18C4A8] hover:text-[#F4F5F7] transition-colors whitespace-nowrap"
            >
              <span>Browse All 10 FAQs</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-10">
          <FAQAccordion items={previewFaqs} />
        </div>
      </div>
    </section>
  );
};
