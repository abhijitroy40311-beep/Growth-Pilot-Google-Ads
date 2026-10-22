import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { siteConfig } from '../data/siteConfig';
import { AnimatedHeading } from '../components/animation/AnimatedHeading';
import { ScrollReveal } from '../components/animation/ScrollReveal';

const philosophyPhases = [
  {
    step: '01',
    title: 'Understand',
    detail:
      'Clarify your business model, buyer intent, competitive landscape, and what constitutes a valuable customer enquiry.',
  },
  {
    step: '02',
    title: 'Plan',
    detail:
      'Define the information architecture, campaign structure, conversion actions, and realistic milestones.',
  },
  {
    step: '03',
    title: 'Build',
    detail:
      'Develop responsive websites, high-clarity landing pages, search campaigns, and clean analytics configurations.',
  },
  {
    step: '04',
    title: 'Measure',
    detail:
      'Verify form submissions, phone clicks, and user behavior through GA4 and Google Tag Manager.',
  },
  {
    step: '05',
    title: 'Improve',
    detail:
      'Refine copy, layouts, keyword targeting, and enquiry flows based on observed visitor interaction.',
  },
];

const coreValues = [
  {
    title: 'Clarity Over Complexity',
    description:
      'We avoid jargon and unnecessary technical bloat. Every page, campaign, and report is built to be understood quickly.',
  },
  {
    title: 'Purposeful Design',
    description:
      'Visual craft and smooth motion should guide attention toward your message and call to action—never distract from them.',
  },
  {
    title: 'Honest Measurement',
    description:
      'We distinguish between raw traffic and genuine enquiries, configuring analytics so you know what is happening on your site.',
  },
  {
    title: 'Practical Collaboration',
    description:
      'We work as a focused partner, respecting your time and aligning our recommendations with your operational capacity.',
  },
];

export const About: React.FC = () => {
  useDocumentMeta({
    title: 'About Us — GrowthPilot | Intelligent Digital Progress',
    description:
      'Learn about GrowthPilot’s mission, approach, core values, and our Understand → Plan → Build → Measure → Improve philosophy.',
    path: '/about',
  });

  return (
    <div className="bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 gp-grid-bg opacity-50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-xs sm:text-sm font-mono text-[#08D9F5]">
                About GrowthPilot · {siteConfig.tagline}
              </p>
              <AnimatedHeading
                as="h1"
                text="Intelligent Thinking. Meaningful Digital Progress."
                highlightWords={['Intelligent', 'Meaningful', 'Progress']}
                className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
              />
              <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#A5AAB4] leading-relaxed">
                GrowthPilot is a digital growth agency focused on website development, performance marketing, conversion optimization, and practical measurement solutions designed to help businesses turn online attention into real enquiries.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="rounded-2xl border border-white/15 bg-[#0B0D10] p-8 text-center shadow-2xl">
                <img
                  src={siteConfig.assets.emblemSvg}
                  alt="GrowthPilot Emblem"
                  width={112}
                  height={112}
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="mx-auto h-28 w-28 object-contain"
                />
                <div className="mt-4 font-bold text-xl">
                  <span className="text-white">Growth</span>
                  <span className="gp-gradient-text">Pilot</span>
                </div>
                <p className="mt-1 text-xs font-mono text-[#A5AAB4]">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are & Our Mission */}
      <section className="py-20 sm:py-24 border-b border-white/10 bg-[#0B0D10]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <ScrollReveal className="rounded-2xl border border-white/10 bg-[#050505] p-8 sm:p-10">
              <div className="text-xs font-mono text-[#08D9F5]">01 · Who We Are</div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                Built for Businesses That Value Clarity and Action
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                Many businesses invest in websites or digital ads that look busy on the surface but fail to explain the offer clearly or guide visitors toward making contact. GrowthPilot was created to bridge the gap between design, advertising, and measurable conversion paths.
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                We combine clean frontend engineering, structured search marketing, and reliable analytics tracking so every part of your digital presence works toward a single goal: helping qualified prospects understand what you do and reach out with confidence.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="rounded-2xl border border-white/10 bg-[#050505] p-8 sm:p-10">
              <div className="text-xs font-mono text-[#00E6A8]">02 · Our Mission &amp; Approach</div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                Connecting Strategy, Execution, and Measurement
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                Our mission is to replace guesswork with structured digital execution. Whether we are building a new business website, designing a dedicated Google Ads landing page, or setting up Google Analytics 4 and Tag Manager, we start by asking what action you need visitors to take.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/90">
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]" aria-hidden="true" />
                  <span>Websites structured around customer questions and clear calls to action</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]" aria-hidden="true" />
                  <span>Search campaigns aligned with landing page relevance and intent</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]" aria-hidden="true" />
                  <span>Transparent event tracking for forms, calls, and key interactions</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Visual Philosophy Timeline: Understand → Plan → Build → Measure → Improve */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-[#08D9F5]">
              03 · Working Philosophy
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Understand → Plan → Build → Measure → Improve
            </h2>
            <p className="mt-3 text-base text-[#A5AAB4]">
              A connected cycle that keeps every project grounded in real commercial priorities.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {philosophyPhases.map((phase, idx) => (
              <ScrollReveal key={phase.step} delay={idx * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-2xl gp-card-surface p-6">
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-[#08D9F5]">
                      <span>Phase {phase.step}</span>
                      <img
                        src={siteConfig.assets.arrowSvg}
                        alt=""
                        aria-hidden="true"
                        width={14}
                        height={14}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-3.5 w-3.5 object-contain"
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {phase.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#A5AAB4] leading-relaxed">
                      {phase.detail}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes GrowthPilot Different & Core Values */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-[#0B0D10]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-xs font-mono text-[#08D9F5]">
                04 · What Makes GrowthPilot Different
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
                How We Work With Clients
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                We do not separate website design from how visitors find you or how enquiries are tracked. By considering traffic, landing experience, and analytics together, we avoid common handoff gaps.
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                Throughout an engagement, you receive clear updates on what is being built, why specific layout or campaign decisions were made, and how performance will be monitored after launch.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {coreValues.map((val, idx) => (
                <ScrollReveal key={val.title} delay={idx * 0.05}>
                  <div className="h-full rounded-2xl border border-white/10 bg-[#050505] p-6">
                    <h3 className="text-lg font-bold text-white">{val.title}</h3>
                    <p className="mt-2.5 text-sm text-[#A5AAB4] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 sm:py-24 bg-[#050505]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Discuss Your Digital Priorities?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#A5AAB4]">
            Share where your business stands today and what you want to improve next.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 rounded-xl gp-gradient-bg px-7 py-4 text-sm sm:text-base font-semibold text-[#050505] shadow-lg transition-transform duration-150 hover:scale-[1.02]"
            >
              <span>Let&apos;s Talk About Your Business.</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
