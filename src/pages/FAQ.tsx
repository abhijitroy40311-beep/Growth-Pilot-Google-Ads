import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { faqsData, faqCategories, FAQCategory } from '../data/faqs';
import { filterFAQs } from '../lib/filterLogic';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { AnimatedHeading } from '../components/animation/AnimatedHeading';

export const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useDocumentMeta({
    title: 'Frequently Asked Questions — GrowthPilot | Services, Process & Pricing',
    description:
      'Find straightforward answers to common questions about GrowthPilot’s website development, Google Ads management, conversion tracking, timelines, and project workflow.',
    path: '/faq',
  });

  const filteredFaqs = filterFAQs(faqsData, selectedCategory, searchQuery);

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <section className="relative border-b border-white/10 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 gp-grid-bg opacity-50" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm font-mono text-[#08D9F5]">
            Knowledge Base · Frequently Asked Questions
          </p>
          <AnimatedHeading
            as="h1"
            text="Clear Answers to Help You Plan Ahead."
            highlightWords={['Clear', 'Answers']}
            className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white"
          />
          <p className="mt-4 text-base sm:text-lg text-[#A5AAB4]">
            Honest, practical information on how we build websites, manage Google Ads, measure conversions, and structure client engagements.
          </p>

          {/* Search & Category Filter Controls */}
          <div className="mt-8 space-y-4">
            <div className="relative">
              <label htmlFor="faq-search-input" className="sr-only">
                Search frequently asked questions
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A5AAB4]"
                aria-hidden="true"
              />
              <input
                id="faq-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., Google Ads, timeline, existing website, pricing)..."
                className="w-full rounded-xl border border-white/15 bg-[#0B0D10] pl-11 pr-4 py-3 text-sm text-white placeholder-[#A5AAB4]/60 focus:border-[#08D9F5] focus:outline-none"
              />
            </div>

            <div
              role="group"
              aria-label="Filter FAQs by category"
              className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#0B0D10] p-1.5"
            >
              {faqCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'gp-gradient-bg text-[#050505] font-semibold'
                        : 'text-[#A5AAB4] hover:text-white'
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
          <div className="mb-4 text-xs font-mono text-[#A5AAB4] tabular-nums">
            Showing {filteredFaqs.length} of {faqsData.length} questions
          </div>

          <FAQAccordion items={filteredFaqs} />

          <div className="mt-12 rounded-2xl border border-white/10 bg-[#0B0D10] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Have a specific question about your project?
              </h2>
              <p className="mt-1 text-sm text-[#A5AAB4]">
                Tell us what you are planning and we will give you a straightforward answer.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl gp-gradient-bg px-5 py-3 text-sm font-semibold text-[#050505] whitespace-nowrap shrink-0"
            >
              <span>Ask Us Directly</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
