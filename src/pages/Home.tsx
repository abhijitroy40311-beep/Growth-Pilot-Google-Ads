
import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { LogoScrollJourney } from '../components/animation/LogoScrollJourney';
import { HeroSection } from '../components/sections/HeroSection';
import { ChatStory } from '../components/sections/ChatStory';
import { ServicesSection } from '../components/sections/ServicesSection';
import { WhyGrowthPilot } from '../components/sections/WhyGrowthPilot';
import { HomeFAQSection } from '../components/sections/HomeFAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';

export const Home: React.FC = () => {
  useDocumentMeta({
    title: 'Google Ads Management & Lead Generation | GrowthPilot',
    description:
      'GrowthPilot helps service businesses attract qualified leads through Google Ads management, conversion-focused landing pages, and accurate conversion tracking.',
    path: '/',
  });

  return (
    <main id="home-journey-container" className="relative">
      <LogoScrollJourney
        containerSelector="#home-journey-container"
      />

      <HeroSection />

      <ChatStory />

      <ServicesSection />

      <WhyGrowthPilot />

      <HomeFAQSection />

      <FinalCTASection />
    </main>
  );
};

export default Home;
