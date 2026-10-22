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
      <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-8 text-center text-sm text-[#A5AAB4]">
        No matching questions found. Try clearing your search filter or{' '}
        <Link to="/contact" className="text-[#08D9F5] underline underline-offset-4">
          ask us directly
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#0B0D10]">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        const panelId = `faq-panel-${faq.id}`;
        const buttonId = `faq-button-${faq.id}`;

        return (
          <div key={faq.id} className="p-5 sm:p-6">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(faq.id)}
                className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08D9F5] rounded-sm"
              >
                <div>
                  <span className="block font-mono text-[11px] text-[#08D9F5]">
                    {faq.category}
                  </span>
                  <span className="mt-1 block text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#050505] text-[#A5AAB4] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'rotate-180 border-[#08D9F5]/40 text-[#08D9F5]' : ''
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
                <div className="pt-4 pr-4 sm:pr-8 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
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

