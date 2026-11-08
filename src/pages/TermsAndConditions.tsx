import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { siteConfig } from '../data/siteConfig';

export const TermsAndConditions: React.FC = () => {
  useDocumentMeta({
    title: 'Terms & Conditions — GrowthPilot',
    description:
      'Terms and conditions governing the use of the GrowthPilot website, demonstration architectures, and project inquiries.',
    path: '/terms-and-conditions',
  });

  return (
    <div className="bg-[#050505] text-white min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-mono text-[#08D9F5]">
          Legal &amp; Governance · {siteConfig.brandName}
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-xs font-mono text-[#A5AAB4]">
          Effective Year: {new Date().getFullYear()}
        </p>

        <div className="mt-10 space-y-8 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Website Use &amp; Scope</h2>
            <p>
              This website provides information regarding {siteConfig.brandName}&apos;s digital services, process methodology, and clearly labeled demonstration architectures. Submitting an inquiry through this website does not create a binding client service agreement until a formal written scope of work is mutually executed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Intellectual Property</h2>
            <p>
              The {siteConfig.brandName} name, circular growth arrow emblem, wordmark, tagline (&ldquo;{siteConfig.tagline}&rdquo;), and original website content are the property of {siteConfig.brandName} and may not be reproduced or misrepresented without prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. No Guaranteed Advertising Outcomes</h2>
            <p>
              Digital marketing, search advertising, and conversion optimization outcomes depend on market competition, industry demand, budget, and business operations. While we apply disciplined strategy and accurate tracking, {siteConfig.brandName} does not guarantee specific revenue figures, lead volumes, or return on ad spend (ROAS).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Demonstration &amp; Concept Projects</h2>
            <p>
              Projects labeled as &ldquo;Demo Architecture&rdquo;, &ldquo;Concept Showcase&rdquo;, or &ldquo;Reference Blueprint&rdquo; in our gallery are illustrative architectural examples designed to demonstrate our engineering and measurement methodology.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Questions</h2>
            <p>
              For questions regarding these terms or to discuss a project proposal, please visit our{' '}
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

export default TermsAndConditions;
