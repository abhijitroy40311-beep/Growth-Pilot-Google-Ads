import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import { siteConfig } from '../data/siteConfig';
import { EditorialEyebrow } from '../components/ui/EditorialPrimitives';

export const PrivacyPolicy: React.FC = () => {
  const meta = getRouteMetaByPath('/privacy-policy')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/privacy-policy',
  });

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <EditorialEyebrow label={`Legal & Governance // ${siteConfig.brandName}`} />
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#F4F5F7]">
          Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-xs text-[#8890A0]">
          Last updated: October 24, 2026
        </p>

        <div className="mt-10 divide-y divide-white/10 border-t border-white/10 text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
          <div className="py-6">
            <p className="max-w-[65ch]">
              GrowthPilot (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy. This Privacy Policy explains how we collect, use, store, and protect personal information when you visit our website or submit a project enquiry.
            </p>
          </div>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">1. Information We Collect</h2>
            <p className="max-w-[65ch]">
              When you submit a project enquiry through GrowthPilot, we may collect the information you provide, including your name, business name, email address, optional phone number, website URL, selected service, budget range, and project goals.
            </p>
            <p className="max-w-[65ch]">
              We may also collect limited technical information about website visits and interactions through analytics tools, where enabled.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">2. How We Use Your Information</h2>
            <p className="max-w-[65ch]">We use the information collected to:</p>
            <ul className="list-disc pl-6 space-y-1.5 max-w-[65ch]">
              <li>Review and respond to project enquiries.</li>
              <li>Discuss our Google Ads, website development, conversion rate optimisation (CRO), and other digital growth services.</li>
              <li>Prepare relevant proposals, audits, and recommendations.</li>
              <li>Maintain enquiry records and protect our website against spam or misuse.</li>
              <li>Meet applicable legal obligations.</li>
            </ul>
            <p className="max-w-[65ch]">
              We do not sell or rent your personal contact details to third parties.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">3. Analytics, Cookies, and Technical Data</h2>
            <p className="max-w-[65ch]">
              Where implemented, we may use Google Analytics 4 (GA4), Google Tag Manager, and related technologies to understand website performance, visitor interactions, traffic sources, and enquiry conversion paths.
            </p>
            <p className="max-w-[65ch]">
              These tools may process technical information such as browser and device details, pages viewed, interactions, and information associated with cookies or similar technologies, depending on their configuration.
            </p>
            <p className="max-w-[65ch]">
              Where required by applicable law, we will obtain consent before using non-essential analytics or tracking technologies. Browser settings may also allow you to manage or block certain cookies.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">4. Sharing of Information</h2>
            <p className="max-w-[65ch]">
              We do not sell your personal contact details. We may share relevant information with trusted service providers that help us operate our website, process enquiries, provide hosting, send communications, protect against spam, or deliver analytics services.
            </p>
            <p className="max-w-[65ch]">
              Such access is limited to what is reasonably necessary for the relevant purpose. We may also disclose information when required by applicable law.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">5. Data Retention and Security</h2>
            <p className="max-w-[65ch]">
              We retain enquiry information only for as long as reasonably necessary to respond to your enquiry, manage an ongoing client relationship, maintain appropriate business records, or meet legal obligations.
            </p>
            <p className="max-w-[65ch]">
              We use reasonable technical and organisational measures to protect information against unauthorised access, loss, misuse, or disclosure. No method of electronic transmission or storage can guarantee absolute security.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">6. Your Privacy Choices and Requests</h2>
            <p className="max-w-[65ch]">
              Subject to applicable law, you may request access to, correction of, or deletion of personal information you have submitted. Where processing relies on consent, you may also request to withdraw that consent.
            </p>
            <p className="max-w-[65ch]">
              To make a privacy-related request, contact us using the details provided below. We may need to verify your request before taking action.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">7. Third-Party Services</h2>
            <p className="max-w-[65ch]">
              Our website may rely on third-party services for analytics, hosting, form processing, or communications. These providers may process information under their own privacy policies and applicable terms.
            </p>
            <p className="max-w-[65ch]">
              We encourage you to review the relevant providers&apos; privacy information when appropriate.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">8. Changes to This Policy</h2>
            <p className="max-w-[65ch]">
              We may update this Privacy Policy when our website, services, data practices, or legal obligations change. The revised version will be published on this page with an updated revision date.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">9. Contact Us About Privacy</h2>
            <p className="max-w-[65ch]">
              For questions, access requests, correction requests, or deletion requests, contact:
            </p>
            <div className="space-y-1.5">
              <p>
                <span className="font-semibold text-[#F4F5F7]">Business:</span> GrowthPilot (Abhijit Roy)
              </p>
              <p>
                <span className="font-semibold text-[#F4F5F7]">Privacy email:</span>{' '}
                <a
                  href="mailto:abhijitroy40311@gmail.com"
                  className="text-[#18C4A8] underline underline-offset-4 hover:text-[#F4F5F7] transition-colors"
                >
                  abhijitroy40311@gmail.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-[#F4F5F7]">Contact page:</span>{' '}
                <Link
                  to="/contact"
                  className="text-[#18C4A8] underline underline-offset-4 hover:text-[#F4F5F7] transition-colors"
                >
                  Contact
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
