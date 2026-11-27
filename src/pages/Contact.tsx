import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Globe, HelpCircle, MessageCircle } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import { siteConfig } from '../data/siteConfig';
import { buildBreadcrumbSchema } from '../lib/seo';
import { trackConversionEvent } from '../lib/analytics';
import { buildWhatsAppContactUrl } from '../lib/validation';
import { ContactForm } from '../components/sections/ContactForm';
import { AnimatedContent } from '../components/animation/AnimatedContent';
import { EditorialEyebrow } from '../components/ui/EditorialPrimitives';

export const Contact: React.FC = () => {
  const meta = getRouteMetaByPath('/contact')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/contact',
    structuredData: buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  });

  const whatsappDirectHref = buildWhatsAppContactUrl(
    siteConfig.contact.whatsapp,
    siteConfig.contact.whatsappMessage
  );

  const sanitizedPhoneHref = siteConfig.contact.phone
    ? `tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`
    : '';

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7]">
      <section className="border-b border-white/10 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8 items-start">
            {/* 1. Short Intro & H1 */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 space-y-4">
              <EditorialEyebrow label={`Direct Specialist Enquiry · ${siteConfig.tagline}`} />
              <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.08]">
                Request a Free Google Ads &amp; Tracking Review.
              </h1>
              <p className="max-w-[56ch] text-sm sm:text-base lg:text-lg text-[#A6ADBB] leading-relaxed">
                Share your service industry, target market, and website URL. I review every setup personally and reply with practical next steps.
              </p>
            </div>

            {/* 2. Contact Inquiry Form */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2">
              <ContactForm />
            </div>

            {/* 3. Direct Expectations & Contact Ledger */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 space-y-6">
              <AnimatedContent delay={0.04} distance={10} duration={360}>
                <div className="rounded-lg border border-white/10 bg-[#111318] p-5 sm:p-6 space-y-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
                  What Happens After You Submit
                </h2>
                <p className="text-xs sm:text-sm text-[#A6ADBB] leading-relaxed">
                  Every enquiry goes directly to Abhijit Roy—never a sales rep, automated queue, or junior account coordinator.
                </p>
                <ul className="space-y-3 text-sm text-[#A6ADBB]">
                  <li className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]"
                      aria-hidden="true"
                    />
                    <span className="text-[#F4F5F7]/90">
                      I inspect your website, target market, Google Ads opportunity, and current GA4 / GTM tracking setup.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]"
                      aria-hidden="true"
                    />
                    <span className="text-[#F4F5F7]/90">
                      I respond ({siteConfig.contact.responseWindow.toLowerCase()}) with focused diagnostic notes or a 15-minute discovery call link.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]"
                      aria-hidden="true"
                    />
                    <span className="text-[#F4F5F7]/90">
                      You receive honest guidance on scope, ad-budget readiness, and tracking—zero lock-in contracts.
                    </span>
                  </li>
                </ul>
              </div>
              </AnimatedContent>

              {/* Direct Contact & Timezones */}
              <AnimatedContent delay={0.08} distance={10} duration={360}>
              <div className="rounded-lg border border-white/10 bg-[#111318] p-5 sm:p-6 space-y-3.5 text-sm text-[#A6ADBB]">
                <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4F5F7]">
                  Direct Contact &amp; International Hours
                </h2>
                <p className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                  <Globe
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]"
                    aria-hidden="true"
                  />
                  <span>
                    Based in Kolkata, India (IST) · Serving service businesses across US, UK, Australia, Canada, Ireland, New Zealand, and India. Live calls available during AU afternoons, UK/IE workdays, and US East mornings (8:00 AM–1:30 PM EST).
                  </span>
                </p>

                {siteConfig.contact.email && (
                  <p>
                    Email:{' '}
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      onClick={() =>
                        trackConversionEvent('email_click', {
                          contact_method: 'email',
                          event_label: 'contact_page_email',
                        })
                      }
                      className="text-[#18C4A8] hover:text-[#F4F5F7] underline underline-offset-4 break-all transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>
                )}

                {siteConfig.contact.phone && (
                  <p>
                    Phone:{' '}
                    <a
                      href={sanitizedPhoneHref}
                      onClick={() =>
                        trackConversionEvent('phone_click', {
                          contact_method: 'phone',
                          event_label: 'contact_page_phone',
                        })
                      }
                      className="text-[#18C4A8] hover:text-[#F4F5F7] underline underline-offset-4 transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                )}

                <div className="pt-1">
                  <a
                    href={whatsappDirectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackConversionEvent('whatsapp_click', {
                        contact_method: 'whatsapp',
                        event_label: 'contact_page_whatsapp',
                      })
                    }
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#25D366]/45 bg-[#25D366]/10 px-3.5 py-2 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Message Abhijit on WhatsApp</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs">
                  <HelpCircle className="h-4 w-4 text-[#18C4A8] shrink-0" aria-hidden="true" />
                  <span>
                    Prefer quick answers first?{' '}
                    <Link
                      to="/faq"
                      className="text-[#18C4A8] underline underline-offset-4 hover:text-[#F4F5F7] transition-colors"
                    >
                      Browse FAQs
                    </Link>
                  </span>
                </div>
              </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
