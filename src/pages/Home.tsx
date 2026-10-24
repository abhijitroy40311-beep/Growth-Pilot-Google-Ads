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
    title: 'GrowthPilot — Navigate Growth With Intelligence',
    description:
      'Websites, performance marketing, conversion optimization, and intelligent digital experiences designed to turn attention into meaningful enquiries.',
    path: '/',
  });

  return (
    <div id="home-journey-container" className="relative">
      <LogoScrollJourney containerSelector="#home-journey-container" />
      <HeroSection />
      <ChatStory />
      <ServicesSection />
      {/* <GrowthTimeline /> */}
      <WhyGrowthPilot />
      <HomeFAQSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;
