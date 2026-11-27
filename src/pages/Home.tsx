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
