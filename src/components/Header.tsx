import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Sparkles, 
  Flame, 
  Compass, 
  Layers, 
  FileSpreadsheet, 
  HelpCircle, 
  PhoneCall,
  Zap,
  Video,
  Users,
  Instagram,
  Globe
} from 'lucide-react';
import { MARKYT_CONTACT } from '../data/content';
import headerLogo from '../assets/images/markyt_header_logo_trimmed.png';
import { scrollToSection } from '../utils/scrollHelper';

const HEADER_LOGO_URL = 'https://i.ibb.co/fVmGZ7zQ/Picsart-26-09-04-21-21-11-757-1.png';

interface HeaderProps {
  onOpenQuestionnaire: () => void;
  onNavigateToCreatives?: () => void;
  onNavigateToHome?: () => void;
  currentView?: string;
  isMenuOpen?: boolean;
  onToggleMenu?: (isOpen?: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenQuestionnaire,
  isMenuOpen,
  onToggleMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('who-we-are');

  const menuOpen = isMenuOpen !== undefined ? isMenuOpen : internalMenuOpen;
  const setMenuOpen = (open: boolean) => {
    if (onToggleMenu) {
      onToggleMenu(open);
    } else {
      setInternalMenuOpen(open);
    }
  };

  // Nav items: Who We Are, Our Creatives, Social Media Mgmt, Websites, Contact Us, and FAQ
  const navLinks = [
    { 
      name: 'Who We Are', 
      href: '#who-we-are', 
      id: 'who-we-are', 
      icon: Users,
      badge: null,
      desc: 'Our story, live data telemetry & full service capabilities',
    },
    { 
      name: 'Our Creatives', 
      href: '#creatives', 
      id: 'creatives', 
      icon: Video, 
      badge: null,
      desc: 'In-site creative showcase & verified campaigns',
    },
    { 
      name: 'Social Media Mgmt', 
      href: '#social-media-mgmt', 
      id: 'social-media-mgmt', 
      icon: Instagram, 
      badge: null,
      desc: 'Organic Reels, aesthetic feeds, content calendars & community growth',
    },
    { 
      name: 'Websites', 
      href: '#website-services', 
      id: 'website-services', 
      icon: Globe, 
      badge: null,
      desc: 'Bespoke high-converting websites, fast load speeds & seamless mobile experiences',
    },
    { 
      name: 'Contact Us', 
      href: '#get-in-touch', 
      id: 'get-in-touch', 
      icon: PhoneCall, 
      badge: null,
      desc: 'Direct strategy line, WhatsApp intake & validation sprint',
    },
    { 
      name: 'FAQ', 
      href: '#faq', 
      id: 'faq', 
      icon: HelpCircle,
      badge: null,
      desc: 'Straight answers on ₹5,000 budget cap, asset ownership & zero lock-in',
    },
  ];

  // Lock body scroll when navigation drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const getActiveSection = (): string => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 64;
      // Active focal reading line directly below the fixed header
      const focalLine = headerHeight + 50;

      const servicesEl = document.getElementById('services');
      const whoWeAreEl = document.getElementById('who-we-are');
      const creativesEl = document.getElementById('creatives');
      const socialEl = document.getElementById('social-media-mgmt');
      const websiteEl = document.getElementById('website-services');
      const contactEl = document.getElementById('get-in-touch');
      const faqEl = document.getElementById('faq');

      // 1. FAQ Section (checked first from bottom)
      if (faqEl) {
        const rect = faqEl.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          return 'faq';
        }
        if (
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60 &&
          rect.top <= window.innerHeight
        ) {
          return 'faq';
        }
      }

      // 2. Contact Section
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          return 'get-in-touch';
        }
      }

      // 3. Website Services Section
      if (websiteEl) {
        const rect = websiteEl.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          return 'website-services';
        }
      }

      // 4. Social Media Mgmt Section
      if (socialEl) {
        const rect = socialEl.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          return 'social-media-mgmt';
        }
      }

      // 5. Our Creatives Section
      if (creativesEl) {
        const rect = creativesEl.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          return 'creatives';
        }
      }

      // 4. Who We Are Section (extends from top of site through the end of Focused Services #services)
      const endOfWhoWeAreEl = servicesEl || whoWeAreEl;
      if (endOfWhoWeAreEl) {
        const endRect = endOfWhoWeAreEl.getBoundingClientRect();
        if (endRect.bottom > focalLine) {
          return 'who-we-are';
        }
      } else {
        return 'who-we-are';
      }

      return '';
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setActiveSection(getActiveSection());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const wasMenuOpen = menuOpen;
    setMenuOpen(false);

    const targetId = href.replace('#', '');
    if (['who-we-are', 'creatives', 'social-media-mgmt', 'website-services', 'get-in-touch', 'faq'].includes(targetId)) {
      setActiveSection(targetId);
    }

    if (wasMenuOpen) {
      setTimeout(() => {
        scrollToSection(href);
      }, 50);
    } else {
      scrollToSection(href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveSection('who-we-are');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      


      {/* Main Modernized Navbar with iPhone Liquid Glass Aesthetic */}
      <nav
        className={`relative w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-gradient-to-b from-white/95 via-[#FBF9F5]/90 to-slate-200/40 backdrop-blur-2xl backdrop-saturate-150 border-b border-black/[0.08] shadow-[0_6px_28px_rgba(0,0,0,0.06)] py-2 sm:py-2.5'
            : 'bg-gradient-to-b from-white/90 via-[#FBF9F5]/80 to-slate-200/30 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.04] py-2.5 sm:py-3'
        }`}
      >
        {/* Optical Gray-to-White Gradient Beam below navigation for liquid glass refraction & shine */}
        <div 
          aria-hidden="true"
          className="absolute -bottom-5 left-0 right-0 h-5 bg-gradient-to-b from-slate-300/25 via-slate-200/10 to-transparent pointer-events-none"
        />

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 xl:gap-3">
          
          {/* Bold Brand Identity with Transparent PNG Logo */}
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 group shrink-0 select-none py-1"
            aria-label="MARKYT Home"
          >
            <img
              src={headerLogo}
              onError={(e) => {
                e.currentTarget.src = HEADER_LOGO_URL;
              }}
              alt="MARKYT"
              referrerPolicy="no-referrer"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#FF3B14] text-white tracking-wider shadow-xs hidden 2xl:inline-flex">
              AGENCY
            </span>
          </a>

          {/* iPhone Liquid Glass Pill Bar: Floating dynamic island with optical gray-to-white sheen */}
          <div className="relative hidden md:flex items-center shrink min-w-0">
            {/* Ambient specular back-glow behind the pill to make glass caustic shine */}
            <div 
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-slate-200/40 via-white/80 to-slate-200/40 blur-md pointer-events-none -z-10"
            />
            
            <div className="flex items-center gap-0.5 xl:gap-1 bg-gradient-to-b from-white/95 via-white/70 to-slate-100/60 backdrop-blur-2xl px-1.5 xl:px-2 py-1 rounded-full border border-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.04)]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-full text-[11px] xl:text-xs font-semibold transition-all duration-200 group shrink-0 select-none ${
                      isActive 
                        ? 'bg-white text-slate-950 font-bold shadow-[0_2px_10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] border border-black/[0.04]' 
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-colors shrink-0 ${
                      isActive ? 'text-[#FF3B14]' : 'text-slate-400 group-hover:text-slate-700'
                    }`} />
                    <span className="tracking-tight whitespace-nowrap">{link.name}</span>
                    {link.badge && (
                      <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/40 leading-none tracking-tight">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Menu Button (Visible on screens < md where the pill bar collapses) */}
          <button
            id="header-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-slate-300 shadow-xs text-xs font-heading font-bold cursor-pointer shrink-0"
            title="Open Navigation Menu"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4 text-[#FF3B14]" />
            <span>Menu</span>
          </button>
        </div>

        {/* High-End Floating Drawer Menu (Centered, Focused max-w-lg, Never Stretched!) */}
        <AnimatePresence>
          {menuOpen && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md transition-all"
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-[#FAF8F5] border border-black/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
              >
                {/* Menu Drawer Top Header */}
                <div className="p-4 sm:p-5 bg-white border-b border-black/10 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={headerLogo}
                      onError={(e) => {
                        e.currentTarget.src = HEADER_LOGO_URL;
                      }}
                      alt="MARKYT"
                      className="h-7 w-auto object-contain"
                    />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-black/5">
                      Website Navigation
                    </span>
                  </div>

                  <button
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                    <span>Close</span>
                  </button>
                </div>

                {/* Scrollable Navigation List (Exact items from the user's screenshot, perfectly proportioned) */}
                <div className="p-4 sm:p-5 overflow-y-auto space-y-2 flex-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.id;

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-all border ${
                          isActive
                            ? 'bg-white border-[#FF3B14]/40 shadow-sm'
                            : 'bg-white/80 hover:bg-white border-black/5 hover:border-black/15 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-3.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive 
                              ? 'bg-[#FF3B14] text-white shadow-xs' 
                              : 'bg-slate-100 text-slate-700 group-hover:bg-[#FF3B14]/10 group-hover:text-[#FF3B14]'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-heading font-bold text-slate-950 text-sm sm:text-base tracking-tight group-hover:text-[#FF3B14] transition-colors">
                                {link.name}
                              </span>
                              {link.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF3B14] text-white uppercase tracking-wider">
                                  {link.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-500 font-medium block leading-tight mt-0.5">
                              {link.desc}
                            </span>
                          </div>
                        </div>

                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF3B14] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                      </a>
                    );
                  })}
                </div>

                {/* Drawer Bottom Actions (Matching user's screenshot buttons, perfectly styled) */}
                <div className="p-4 sm:p-5 bg-white border-t border-black/10 flex flex-col gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenQuestionnaire();
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#FF3B14] hover:bg-[#E0300D] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Start ₹5,000 Validation Sprint</span>
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={`tel:${MARKYT_CONTACT.phone}`}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold font-mono flex items-center justify-center gap-2 border border-black/5 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Call: {MARKYT_CONTACT.formattedPhone}</span>
                    </a>

                    <a
                      href={MARKYT_CONTACT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold font-mono flex items-center justify-center gap-2 border border-black/5 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#FF3B14]" />
                      <span>Follow {MARKYT_CONTACT.instagramHandle} ↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
