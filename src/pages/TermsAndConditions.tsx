import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import { siteConfig } from '../data/siteConfig';
import { EditorialEyebrow } from '../components/ui/EditorialPrimitives';

export const TermsAndConditions: React.FC = () => {
  const meta = getRouteMetaByPath('/terms-and-conditions')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/terms-and-conditions',
  });

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <EditorialEyebrow label={`Legal & Governance // ${siteConfig.brandName}`} />
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#F4F5F7]">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 font-mono text-xs text-[#8890A0]">
          Effective Year: {new Date().getFullYear()}
        </p>

        <div className="mt-10 divide-y divide-white/10 border-t border-white/10 text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">1. Website Use &amp; Scope</h2>
            <p className="max-w-[65ch]">
              This website provides information regarding {siteConfig.brandName}&apos;s digital services, process methodology, and clearly labeled demonstration architectures. Submitting an inquiry through this website does not create a binding client service agreement until a formal written scope of work is mutually executed.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">2. Intellectual Property</h2>
            <p className="max-w-[65ch]">
              The {siteConfig.brandName} name, circular growth arrow emblem, wordmark, tagline (&ldquo;{siteConfig.tagline}&rdquo;), and original website content are the property of {siteConfig.brandName} and may not be reproduced or misrepresented without prior written permission.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">3. No Guaranteed Advertising Outcomes</h2>
            <p className="max-w-[65ch]">
              Digital marketing, search advertising, and conversion optimization outcomes depend on market competition, industry demand, budget, and business operations. While we apply disciplined strategy and accurate tracking, {siteConfig.brandName} does not guarantee specific revenue figures, lead volumes, or return on ad spend (ROAS).
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">4. Demonstration &amp; Concept Projects</h2>
            <p className="max-w-[65ch]">
              Projects labeled as &ldquo;Demo Architecture&rdquo;, &ldquo;Concept Showcase&rdquo;, or &ldquo;Reference Blueprint&rdquo; in our gallery are illustrative architectures designed to demonstrate our engineering and measurement methodology.
            </p>
          </section>

          <section className="py-6 space-y-3">
            <h2 className="text-xl font-bold text-[#F4F5F7]">5. Questions</h2>
            <p className="max-w-[65ch]">
              For questions regarding these terms or to discuss a project proposal, please visit our{' '}
              <Link to="/contact" className="text-[#18C4A8] underline underline-offset-4 hover:text-[#F4F5F7] transition-colors">
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
