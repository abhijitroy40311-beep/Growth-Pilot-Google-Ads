import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../data/faqs';

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenId?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  defaultOpenId,
}) => {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? (items[0]?.id || null)
  );

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#090A0D] p-8 text-center text-sm text-[#A6ADBB]">
        No matching questions found. Try clearing your search filter or{' '}
        <Link to="/contact" className="text-[#18C4A8] underline underline-offset-4">
          ask directly
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        const panelId = `faq-panel-${faq.id}`;
        const buttonId = `faq-button-${faq.id}`;

        return (
          <div key={faq.id} className="py-5 sm:py-6">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(faq.id)}
                className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18C4A8] rounded-sm"
              >
                <div>
                  <span className="block font-mono text-xs uppercase tracking-[0.1em] text-[#18C4A8]">
                    {faq.category}
                  </span>
                  <span className="mt-1.5 block text-base sm:text-lg font-semibold text-[#F4F5F7]">
                    {faq.question}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 bg-[#090A0D] text-[#A6ADBB] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 border-[#18C4A8]/60 text-[#18C4A8]' : ''
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="overflow-hidden"
              >
                <div className="pt-4 pr-2 sm:pr-10 max-w-[68ch] text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
