import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export const PrivacyPolicy: React.FC = () => {
  useDocumentMeta({
    title: 'Privacy Policy — GrowthPilot',
    description:
      'Learn how GrowthPilot collects, uses, stores, and protects personal information when you visit our website or submit a project enquiry.',
    path: '/privacy-policy',
  });

  return (
    <div className="bg-[#050505] text-white min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm font-semibold text-white">
          Last updated: October 24, 2026
        </p>

        <div className="mt-8 space-y-8 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
          <p>
            GrowthPilot (“we,” “our,” or “us”) respects your privacy. This Privacy Policy explains how we collect, use, store, and protect personal information when you visit our website or submit a project enquiry.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
            <p>
              When you submit a project enquiry through GrowthPilot, we may collect the information you provide, including your name, business name, email address, optional phone number, website URL, selected service, budget range, and project goals.
            </p>
            <p>
              We may also collect limited technical information about website visits and interactions through analytics tools, where enabled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
            <p>We use the information collected to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Review and respond to project enquiries.</li>
              <li>Discuss our Google Ads, website development, conversion rate optimisation (CRO), and other digital growth services.</li>
              <li>Prepare relevant proposals, audits, and recommendations.</li>
              <li>Maintain enquiry records and protect our website against spam or misuse.</li>
              <li>Meet applicable legal obligations.</li>
            </ul>
            <p>
              We do not sell or rent your personal contact details to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Analytics, Cookies, and Technical Data</h2>
            <p>
              Where implemented, we may use Google Analytics 4 (GA4), Google Tag Manager, and related technologies to understand website performance, visitor interactions, traffic sources, and enquiry conversion paths.
            </p>
            <p>
              These tools may process technical information such as browser and device details, pages viewed, interactions, and information associated with cookies or similar technologies, depending on their configuration.
            </p>
            <p>
              Where required by applicable law, we will obtain consent before using non-essential analytics or tracking technologies. Browser settings may also allow you to manage or block certain cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Sharing of Information</h2>
            <p>
              We do not sell your personal contact details. We may share relevant information with trusted service providers that help us operate our website, process enquiries, provide hosting, send communications, protect against spam, or deliver analytics services.
            </p>
            <p>
              Such access is limited to what is reasonably necessary for the relevant purpose. We may also disclose information when required by applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Data Retention and Security</h2>
            <p>
              We retain enquiry information only for as long as reasonably necessary to respond to your enquiry, manage an ongoing client relationship, maintain appropriate business records, or meet legal obligations.
            </p>
            <p>
              We use reasonable technical and organisational measures to protect information against unauthorised access, loss, misuse, or disclosure. No method of electronic transmission or storage can guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Your Privacy Choices and Requests</h2>
            <p>
              Subject to applicable law, you may request access to, correction of, or deletion of personal information you have submitted. Where processing relies on consent, you may also request to withdraw that consent.
            </p>
            <p>
              To make a privacy-related request, contact us using the details provided below. We may need to verify your request before taking action.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">7. Third-Party Services</h2>
            <p>
              Our website may rely on third-party services for analytics, hosting, form processing, or communications. These providers may process information under their own privacy policies and applicable terms.
            </p>
            <p>
              We encourage you to review the relevant providers&apos; privacy information when appropriate.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy when our website, services, data practices, or legal obligations change. The revised version will be published on this page with an updated revision date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">9. Contact Us About Privacy</h2>
            <p>
              For questions, access requests, correction requests, or deletion requests, contact:
            </p>
            <div className="space-y-1">
              <p>
                <span className="font-semibold text-white">Business:</span> GrowthPilot
              </p>
              <p>
                <span className="font-semibold text-white">Privacy email:</span>{' '}
                <a
                  href="mailto:abhijitroy40311@gamil.com"
                  className="text-[#08D9F5] underline underline-offset-4 hover:text-white transition-colors"
                >
                  abhijitroy40311@gamil.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Contact page:</span>{' '}
                <a
                  href="https://growthpilot.agancy.workers.dev/contact"
                  className="text-[#08D9F5] underline underline-offset-4 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

