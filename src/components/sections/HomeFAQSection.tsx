import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { faqsData } from '../../data/faqs';
import { FAQAccordion } from '../ui/FAQAccordion';
import { AnimatedHeading } from '../animation/AnimatedHeading';

export const HomeFAQSection: React.FC = () => {
  const previewFaqs = faqsData.slice(0, 5);

  return (
    <section
      id="stage-faq"
      aria-labelledby="home-faq-heading"
      className="relative border-t border-white/10 bg-[#0B0D10] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-mono text-[#08D9F5]">
              05 · Common Questions
            </div>
            <AnimatedHeading
              id="home-faq-heading"
              as="h2"
              text="Straightforward Answers Before We Begin."
              highlightWords={['Straightforward', 'Answers']}
              className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white"
            />
          </div>

          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#08D9F5] hover:text-[#00E6A8] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Browse All 10 FAQs</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10">
          <FAQAccordion items={previewFaqs} />
        </div>
      </div>
    </section>
  );
};
