import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { buildOrganizationAndWebSiteSchema } from '../lib/seo';
import { LogoScrollJourney } from '../components/animation/LogoScrollJourney';
import { HeroSection } from '../components/sections/HeroSection';
import { ChatStory } from '../components/sections/ChatStory';
import { ServicesSection } from '../components/sections/ServicesSection';
import { GrowthTimeline } from '../components/sections/GrowthTimeline';
import { WhyGrowthPilot } from '../components/sections/WhyGrowthPilot';
import { HomeFAQSection } from '../components/sections/HomeFAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';

export const Home: React.FC = () => {
  useDocumentMeta({
    title: 'Google Ads Management Services & Lead Generation Agency | GrowthPilot',
    description:
      'GrowthPilot provides Google Ads management services, conversion-focused website design, landing page CRO, and GA4 tracking to help US businesses generate qualified leads.',
    path: '/',
    structuredData: buildOrganizationAndWebSiteSchema(),
  });

  return (
    <div id="home-journey-container" className="relative">
      <LogoScrollJourney containerSelector="#home-journey-container" />
      <HeroSection />
      <ChatStory />
      <ServicesSection />
      <GrowthTimeline />
      <WhyGrowthPilot />
      <HomeFAQSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;
