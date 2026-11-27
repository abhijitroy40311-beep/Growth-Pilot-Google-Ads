import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import { buildOrganizationAndWebSiteSchema } from '../lib/seo';
import { HeroSection } from '../components/sections/HeroSection';
import { ValuePropositionSection } from '../components/sections/ValuePropositionSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { GrowthTimeline } from '../components/sections/GrowthTimeline';
import { MeasurementSection } from '../components/sections/MeasurementSection';
import { WhyGrowthPilot } from '../components/sections/WhyGrowthPilot';
import { HomeFAQSection } from '../components/sections/HomeFAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';

export const Home: React.FC = () => {
  const meta = getRouteMetaByPath('/')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/',
    structuredData: buildOrganizationAndWebSiteSchema(),
  });

  return (
    <div id="home-journey-container" className="relative bg-[#090A0D]">
      <HeroSection />
      <ValuePropositionSection />
      <div aria-hidden="true" className="border-t border-white/10 bg-[#090A0D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="h-px w-8 bg-[#18C4A8]/75" />
              <span className="h-1 w-1 rounded-full bg-white/25" />
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
        </div>
      </div>
      <ServicesSection />
      <IndustriesSection />
      <GrowthTimeline />
      <MeasurementSection />
      <WhyGrowthPilot />
      <HomeFAQSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;
