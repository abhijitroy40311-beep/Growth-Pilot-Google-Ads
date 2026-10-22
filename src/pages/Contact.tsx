import React from 'react';
import { Link } from 'react-router-dom';
import { Check, HelpCircle } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { siteConfig } from '../data/siteConfig';
import { ContactForm } from '../components/sections/ContactForm';
import { AnimatedHeading } from '../components/animation/AnimatedHeading';

export const Contact: React.FC = () => {
  useDocumentMeta({
    title: "Contact Us — GrowthPilot | Let's Talk About Your Next Move",
    description:
      'Get in touch with GrowthPilot. Tell us about your business and what you want to improve across websites, Google Ads, conversion optimization, or GA4 tracking.',
    path: '/contact',
  });

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 gp-grid-bg opacity-50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs sm:text-sm font-mono text-[#08D9F5]">
                  Project Inquiry · {siteConfig.tagline}
                </p>
                <AnimatedHeading
                  as="h1"
                  text="Let's Talk About Your Next Move."
                  highlightWords={['Next', 'Move']}
                  className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.08]"
                />
                <p className="mt-4 text-base sm:text-lg text-[#A5AAB4] leading-relaxed">
                  Tell us a little about your business and what you want to improve.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-6 space-y-4">
                <h2 className="text-base font-bold text-white">
                  What Happens After You Reach Out
                </h2>
                <ul className="space-y-3 text-sm text-[#A5AAB4]">
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]" aria-hidden="true" />
                    <span>
                      We review your current website, search visibility, or tracking goals carefully.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]" aria-hidden="true" />
                    <span>
                      We respond ({siteConfig.contact.responseWindow}) with practical questions or to schedule an initial discovery call.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]" aria-hidden="true" />
                    <span>
                      You receive a clear recommendation aligned with your business goals—never pressure or generic sales pitches.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Configurable Contact Details & Fallback */}
              <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-6 space-y-3 text-sm text-[#A5AAB4]">
                <h2 className="text-base font-bold text-white">
                  Direct &amp; Fallback Contact Details
                </h2>
                <p>
                  Our primary inquiry channel is the verified form on this page, which logs your project brief directly with our team and issues an immediate reference ID.
                </p>
                {siteConfig.contact.email && (
                  <p>
                    Email:{' '}
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-[#08D9F5] hover:text-white underline underline-offset-4"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>
                )}
                {siteConfig.contact.phone && (
                  <p>
                    Phone:{' '}
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-[#08D9F5] hover:text-white underline underline-offset-4"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                )}
                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs">
                  <HelpCircle className="h-4 w-4 text-[#08D9F5] shrink-0" aria-hidden="true" />
                  <span>
                    Have a quick question first?{' '}
                    <Link
                      to="/faq"
                      className="text-[#08D9F5] underline underline-offset-4 hover:text-white"
                    >
                      Read our FAQs
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
