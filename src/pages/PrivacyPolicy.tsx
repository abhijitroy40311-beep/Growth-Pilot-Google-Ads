import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { siteConfig } from '../data/siteConfig';

export const PrivacyPolicy: React.FC = () => {
  useDocumentMeta({
    title: 'Privacy Policy — GrowthPilot',
    description:
      'Learn how GrowthPilot collects, uses, and safeguards information submitted through our website and project inquiry forms.',
    path: '/privacy-policy',
  });

  return (
    <div className="bg-[#050505] text-white min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-mono text-[#08D9F5]">
          Legal &amp; Governance · {siteConfig.brandName}
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="mt-3 text-xs font-mono text-[#A5AAB4]">
          Effective Year: {new Date().getFullYear()}
        </p>

        <div className="mt-10 space-y-8 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
            <p>
              When you submit a project inquiry through {siteConfig.brandName}, we collect the information you voluntarily provide: your name, business name, email address, optional phone number, optional website URL, selected service of interest, optional budget range, and project goals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
            <p>
              We use the information submitted solely to evaluate your project inquiry, communicate with you regarding our digital growth services, and prepare relevant proposals or recommendations. We do not sell or rent your contact details to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Analytics &amp; Technical Data</h2>
            <p>
              Our website may use standard analytics and tag management tools (such as Google Analytics 4) to understand aggregate visitor behavior, page performance, and enquiry conversion paths. You can control cookie preferences through your browser settings at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Data Retention &amp; Security</h2>
            <p>
              We apply server-side input validation, rate limiting, and spam filtering to protect inquiry submissions. Inquiry records are retained only as long as reasonably necessary to respond to your request or maintain an active client relationship.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Contacting Us About Privacy</h2>
            <p>
              If you wish to request access to, correction of, or deletion of an inquiry you submitted, please reach out via our{' '}
              <Link to="/contact" className="text-[#08D9F5] underline underline-offset-4 hover:text-white">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
