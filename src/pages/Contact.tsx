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
import { AnimatedHeading } from '../components/animation/AnimatedHeading';

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
    <div className="bg-[#050505] text-white min-h-screen">

      <section className="relative overflow-hidden border-b border-white/10 pt-6 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 gp-grid-bg opacity-50"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8 items-start">
            {/* 1. Short Contact Introduction, Main Heading & Supporting Description */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
              <p className="text-xs sm:text-sm font-mono text-[#08D9F5]">
                Direct Specialist Enquiry · {siteConfig.tagline}
              </p>
              <AnimatedHeading
                as="h1"
                text="Request a Free Google Ads & Tracking Review."
                highlightWords={['Google', 'Ads', 'Tracking']}
                className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.08]"
              />
              <p className="mt-2.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#A5AAB4] leading-relaxed">
                Share your service industry, target market, and website URL. I will review your setup personally and reply with practical next steps.
              </p>
            </div>

            {/* 2. Contact Inquiry Form — Immediately after intro on mobile; Right column on desktop */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2">
              <ContactForm />
            </div>

            {/* 3. What Happens After You Reach Out & Direct Contact Info — Below form on mobile; Left column on desktop */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-5 sm:p-6 space-y-4">
                <h2 className="text-base font-bold text-white">
                  What Happens After You Reach Out
                </h2>
                <p className="text-xs sm:text-sm text-[#A5AAB4] leading-relaxed">
                  Every enquiry goes directly to Abhijit Roy—never a sales rep, automated queue, or junior account manager.
                </p>
                <ul className="space-y-3 text-sm text-[#A5AAB4]">
                  <li className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]"
                      aria-hidden="true"
                    />
                    <span>
                      I review your website, service area, Google Ads opportunity, and current GA4/GTM tracking setup.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]"
                      aria-hidden="true"
                    />
                    <span>
                      I respond ({siteConfig.contact.responseWindow}) with focused questions or a link for a 15-minute discovery call.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]"
                      aria-hidden="true"
                    />
                    <span>
                      You get an honest recommendation on budget, campaign structure, and tracking—with zero lock-in pressure.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Configurable Contact Details & International Availability */}
              <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-5 sm:p-6 space-y-3 text-sm text-[#A5AAB4]">
                <h2 className="text-base font-bold text-white">
                  Direct Contact &amp; International Hours
                </h2>
                <p className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                  <Globe
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#08D9F5]"
                    aria-hidden="true"
                  />
                  <span>
                    Based in Kolkata, India (IST) · Serving service businesses in the US, UK, Australia, Canada, Ireland, and New Zealand. Live calls available during AU mornings, UK/IE afternoons, and US East mornings (8:00 AM–1:30 PM EST).
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
                      className="text-[#08D9F5] hover:text-white underline underline-offset-4 break-all"
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
                      className="text-[#08D9F5] hover:text-white underline underline-offset-4"
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
                    className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 py-2 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Message Abhijit on WhatsApp</span>
                  </a>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs">
                  <HelpCircle className="h-4 w-4 text-[#08D9F5] shrink-0" aria-hidden="true" />
                  <span>
                    Have a quick question first?{' '}
                    <Link
                      to="/faq"
                      className="text-[#08D9F5] underline underline-offset-4 hover:text-white"
                    >
                      Read the FAQs
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;