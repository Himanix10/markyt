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
import { Footer } from './components/Footer';
import { CreativeProductionPage } from './components/CreativeProductionPage';
import { CreativeArtStylesSection } from './components/CreativeArtStylesSection';
import { WebsiteServicesSection } from './components/WebsiteServicesSection';
import { RedTrailCursor } from './components/RedTrailCursor';
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
    const prompt = "Hi Markyt team! I'm interested in starting a ₹5,000 validation sprint for my business.";
    window.open(`https://wa.me/917045602440?text=${encodeURIComponent(prompt)}`, '_blank');
  };


  return (
    <div className="min-h-screen bg-[#F6F3EC] text-slate-900 flex flex-col font-sans selection:bg-[#FF3B14]/20 selection:text-slate-950 overflow-x-hidden w-full max-w-full">
      {/* Global Interactive Orange/Red Trail Cursor across the whole website */}
      <RedTrailCursor />
      
      {/* 1. Header Navigation with Dedicated Menu Trigger */}
      <Header 
        onOpenQuestionnaire={scrollToContact}
        isMenuOpen={isMenuOpen}
        onToggleMenu={(open) => setIsMenuOpen(open !== undefined ? open : !isMenuOpen)}
      />

      {/* Top placeholder spacer so initial Hero isn't hidden under fixed header */}
      <div className="h-[54px] sm:h-[58px] w-full shrink-0 bg-[#ACB7F6] -mb-px" aria-hidden="true" />

      <main className="flex-1 bg-[#B8C1FA]">
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

        {/* 10. If You're Just Here for the Creative - Art Styles Lookbook */}
        <CreativeArtStylesSection
          onOpenQuestionnaire={scrollToContact}
        />

        {/* 11. Bespoke Website Development & High-Converting Storefronts */}
        <WebsiteServicesSection
          onOpenQuestionnaire={scrollToContact}
        />
      </main>

      {/* 15. Footer */}
      <Footer 
        onOpenQuestionnaire={scrollToContact}
        onNavigateToCreatives={scrollToCreatives}
      />
    </div>
  );
}
