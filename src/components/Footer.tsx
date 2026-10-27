import React from 'react';
import { MARKYT_CONTACT } from '../data/content';
import { Mail, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import headerLogo from '../assets/images/markyt_header_logo_trimmed.png';
import { scrollToSection } from '../utils/scrollHelper';

const FOOTER_LOGO_URL = 'https://i.ibb.co/fVmGZ7zQ/Picsart-26-09-04-21-21-11-757-1.png';

interface FooterProps {
  onOpenQuestionnaire?: () => void;
  onNavigateToCreatives?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToCreatives }) => {
  return (
    <footer className="bg-[#FAFAFB] text-slate-900 border-t border-slate-200 relative overflow-hidden">

      {/* Main Footer Links */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 text-xs text-slate-600">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src={headerLogo}
                onError={(e) => {
                  e.currentTarget.src = FOOTER_LOGO_URL;
                }}
                alt="MARKYT"
                referrerPolicy="no-referrer"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="leading-relaxed text-slate-600 font-medium">
              Your all-in-one growth partner. From high-converting digital marketing campaigns and cinematic video ads to sleek website development, we build everything your business needs to stand out and scale up.
            </p>
          </div>

          {/* Header Navigation Tabs */}
          <div>
            <h4 className="font-heading text-slate-900 font-extrabold uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-medium text-xs">
              <li>
                <a 
                  href="#who-we-are" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#who-we-are');
                  }}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Who We Are
                </a>
              </li>
              <li>
                <a 
                  href="#creatives" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToCreatives) {
                      onNavigateToCreatives();
                    } else {
                      scrollToSection('#creatives');
                    }
                  }}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Our Creatives
                </a>
              </li>
              <li>
                <a 
                  href="#social-media-mgmt" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#social-media-mgmt');
                  }}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Social Media Mgmt
                </a>
              </li>
              <li>
                <a 
                  href="#website-services" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#website-services');
                  }}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Websites
                </a>
              </li>
              <li>
                <a 
                  href="#get-in-touch" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#get-in-touch');
                  }}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#faq');
                  }}
                  className="hover:text-emerald-700 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="font-heading text-slate-900 font-extrabold uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <a
                  href={`mailto:${MARKYT_CONTACT.email}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>{MARKYT_CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Transparency */}
          <div>
            <h4 className="font-heading text-slate-900 font-extrabold uppercase tracking-wider mb-4">
              Channels & Insights
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <a 
                href={MARKYT_CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-slate-950 group transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#FF3B14] group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{MARKYT_CONTACT.instagramHandle} (Instagram)</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-slate-950 transition-colors" />
              </a>
              <a 
                href={MARKYT_CONTACT.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-slate-950 group transition-colors"
                title="Watch MARKYT on YouTube"
              >
                <Youtube className="w-4 h-4 text-[#FF0000] group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{MARKYT_CONTACT.youtubeHandle} (YouTube)</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-slate-950 transition-colors" />
              </a>
              <div className="pt-2 text-xs text-slate-500">
                Operating with 5+ years experience per practitioner.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 font-medium">
          <div>
            © {new Date().getFullYear()} MARKYT. All rights reserved. Precision Performance Marketing.
          </div>
          <div className="text-slate-600 font-semibold">
            ₹5,000 Validation Model • Zero Lock-in Contracts
          </div>
        </div>

      </div>
    </footer>
  );
};
