import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import { buildBreadcrumbSchema } from '../lib/seo';
import { faqsData, faqCategories, FAQCategory } from '../data/faqs';
import { filterFAQs } from '../lib/filterLogic';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { EditorialEyebrow } from '../components/ui/EditorialPrimitives';

export const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const meta = getRouteMetaByPath('/faq')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/faq',
    structuredData: [
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'FAQs', path: '/faq' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqsData.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  });

  const filteredFaqs = filterFAQs(faqsData, selectedCategory, searchQuery);

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7]">
      <section className="border-b border-white/10 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-5">
          <EditorialEyebrow label="Knowledge Base // Frequently Asked Questions" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.08]">
            Clear Answers to Help You Plan Ahead.
          </h1>
          <p className="max-w-[60ch] text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
            Straightforward information on how Google Ads campaigns, conversion-focused websites, GA4 measurement, and pricing engagements work.
          </p>

          <div className="pt-4 space-y-4">
            <div className="relative">
              <label htmlFor="faq-search-input" className="sr-only">
                Search frequently asked questions
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8890A0]"
                aria-hidden="true"
              />
              <input
                id="faq-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., Google Ads, timeline, pricing, existing site)..."
                className="w-full min-h-[46px] rounded-md border border-white/15 bg-[#111318] pl-11 pr-4 py-2.5 text-sm text-[#F4F5F7] placeholder-[#8890A0] focus:border-[#18C4A8] focus:outline-none"
              />
            </div>

            <div
              role="group"
              aria-label="Filter FAQs by category"
              className="flex flex-wrap items-center gap-1.5 rounded-md border border-white/12 bg-[#111318] p-1.5"
            >
              {faqCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex min-h-[40px] items-center rounded-sm px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8] ${
                      isActive
                        ? 'bg-[#F4F5F7] text-[#090A0D] font-semibold'
                        : 'text-[#A6ADBB] hover:text-[#F4F5F7]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 font-mono text-xs text-[#8890A0] tabular-nums">
            Showing {filteredFaqs.length} of {faqsData.length} questions
          </div>

          <FAQAccordion items={filteredFaqs} />

          <div className="mt-12 rounded-lg border border-white/12 bg-[#111318] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#F4F5F7]">
                Have a specific question about your account or website?
              </h2>
              <p className="mt-1 text-sm text-[#A6ADBB]">
                Share what you are planning and I will give you a straightforward answer.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#F4F5F7] px-5 py-2.5 text-sm font-semibold text-[#090A0D] hover:bg-[#18C4A8] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Ask Directly</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
