import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { buildWhatsAppContactUrl } from '../../lib/validation';
import { trackConversionEvent } from '../../lib/analytics';
import { EditorialEyebrow } from '../ui/EditorialPrimitives';
import { Magnet } from '../animation/Magnet';
import { SplitText } from '../animation/SplitText';

export const FinalCTASection: React.FC = () => {
  const whatsappDirectHref = buildWhatsAppContactUrl(
    siteConfig.contact.whatsapp,
    siteConfig.contact.whatsappMessage
  );

  return (
    <section
      id="stage-contact"
      aria-labelledby="final-cta-heading"
      className="border-t border-white/10 bg-[#090A0D] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-white/12 bg-[#111318] p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-5">
              <EditorialEyebrow index="08" label="Next Step" />
              <SplitText
                id="final-cta-heading"
                as="h2"
                text="Ready for a Direct Google Ads & Conversion Review?"
                className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-[-0.025em] text-[#F4F5F7] leading-[1.12]"
              />
              <p className="max-w-[58ch] text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
                Share your trade, target service area, and current website URL. I will inspect your setup personally and respond within {siteConfig.contact.responseWindow.toLowerCase()} with clear next steps.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Magnet>
                  <Link
                    to="/contact"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-md bg-[#F4F5F7] px-6 py-3 text-sm sm:text-base font-semibold text-[#090A0D] transition-colors duration-150 hover:bg-[#18C4A8] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
                  >
                    <span>Start Your Enquiry</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Magnet>
                <a
                  href={whatsappDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent('whatsapp_click', {
                      contact_method: 'whatsapp',
                      event_label: 'final_cta_whatsapp',
                    })
                  }
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-5 py-3 text-sm sm:text-base font-medium text-[#F4F5F7] hover:border-white/45 hover:bg-white/[0.04] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
                >
                  <MessageCircle className="h-4 w-4 text-[#18C4A8]" aria-hidden="true" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-10 lg:pt-0 space-y-4">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#8890A0]">
                Direct Specialist Channel
              </div>
              <div className="text-base font-semibold text-[#F4F5F7]">
                Abhijit Roy — GrowthPilot
              </div>
              <p className="text-sm text-[#A6ADBB] leading-relaxed">
                Serving HVAC, solar, dental, roofing, epoxy flooring, and plumbing businesses across the US, UK, Australia, Canada, Ireland, New Zealand, and India.
              </p>
              {siteConfig.contact.email && (
                <div className="pt-2">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    onClick={() =>
                      trackConversionEvent('email_click', {
                        contact_method: 'email',
                        event_label: 'final_cta_email',
                      })
                    }
                    className="inline-flex items-center gap-2 text-sm text-[#18C4A8] underline underline-offset-4 hover:text-[#F4F5F7] break-all transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
