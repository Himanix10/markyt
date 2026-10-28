/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhoWeAre } from './components/WhoWeAre';
import { HowMarkytWorks } from './components/HowMarkytWorks';
import { ServicesSection } from './components/ServicesSection';
import { StepByStepProcess } from './components/StepByStepProcess';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CreativeProductionPage } from './components/CreativeProductionPage';
import { StoryPerspectiveScrollSection } from './components/StoryPerspectiveScrollSection';
import { SocialMediaMgmtSection } from './components/SocialMediaMgmtSection';
import { CreativeArtStylesSection } from './components/CreativeArtStylesSection';
import { WebsiteServicesSection } from './components/WebsiteServicesSection';
import { scrollToSection } from './utils/scrollHelper';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // If there is a lingering hash (like #creatives from earlier), clean it up so the page starts clean at the top
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        // ignore
      }
    }
  }, []);

  const scrollToCreatives = () => {
    scrollToSection('#creatives');
  };

  const scrollToContact = () => {
    scrollToSection('#get-in-touch');
  };


  return (
    <div className="min-h-screen bg-[#F6F3EC] text-slate-900 flex flex-col font-sans selection:bg-[#FF3B14]/20 selection:text-slate-950 overflow-x-hidden w-full max-w-full">
      
      {/* 1. Header Navigation with Dedicated Menu Trigger */}
      <Header 
        onOpenQuestionnaire={scrollToContact}
        isMenuOpen={isMenuOpen}
        onToggleMenu={(open) => setIsMenuOpen(open !== undefined ? open : !isMenuOpen)}
      />

      {/* Top placeholder spacer so initial Hero isn't hidden under fixed header */}
      <div className="h-[54px] sm:h-[58px] w-full shrink-0" aria-hidden="true" />

      <main className="flex-1">
        {/* 2. Hero Section with First-Page Menu Trigger */}
        <Hero 
          onOpenQuestionnaire={scrollToContact} 
          onNavigateToCreatives={scrollToCreatives}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        {/* 3. Who We Are */}
        <WhoWeAre 
          onOpenQuestionnaire={scrollToContact}
          onNavigateToCreatives={scrollToCreatives}
        />

        {/* 5. How Markyt Works */}
        <HowMarkytWorks onOpenQuestionnaire={scrollToContact} />

        {/* 8. Growth Stack & Capabilities */}
        <ServicesSection 
          onNavigateToCreatives={scrollToCreatives} 
          onOpenQuestionnaire={scrollToContact} 
        />


        {/* 9. Our Creatives & High-Converting Video Production */}
        <CreativeProductionPage
          onOpenQuestionnaire={scrollToContact}
        />

        {/* 10. Social Media Management & Organic Growth Engine */}
        <SocialMediaMgmtSection
          onOpenQuestionnaire={scrollToContact}
        />

        {/* 10.5 Story Perspective Scroll: Been my thing since 2016. Now we are a team */}
        <StoryPerspectiveScrollSection />

        {/* 11. If You're Just Here for the Creative - Art Styles Lookbook */}
        <CreativeArtStylesSection
          onOpenQuestionnaire={scrollToContact}
        />

        {/* 11. Bespoke Website Development & High-Converting Storefronts */}
        <WebsiteServicesSection
          onOpenQuestionnaire={scrollToContact}
        />

        {/* 12. Step By Step Sprint Roadmap */}
        <StepByStepProcess onOpenQuestionnaire={scrollToContact} />


        {/* 12. Contact Us (Direct WhatsApp & Instagram Strategy Line) */}
        <ContactSection onOpenQuestionnaire={scrollToContact} />

        {/* 13. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* 15. Footer */}
      <Footer 
        onOpenQuestionnaire={scrollToContact}
        onNavigateToCreatives={scrollToCreatives}
      />
    </div>
  );
}
