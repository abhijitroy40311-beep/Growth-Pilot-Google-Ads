import React from 'react';
import SEOHead from '../components/SEOHead';
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
  return (
    <div id="home-journey-container" className="relative">
      <SEOHead
        title="Independent Google Ads Specialist for Service Businesses | GrowthPilot"
        description="Independent Google Ads specialist helping HVAC, solar, dental, epoxy flooring, roofing, and plumbing businesses across the US, UK, Australia, Canada, and Ireland generate qualified enquiries."
        path="/"
        schema={buildOrganizationAndWebSiteSchema()}
      />
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
