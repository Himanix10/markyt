import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ArrowUpRight,
  ShoppingBag,
  Calendar,
  Utensils,
  Briefcase,
  Star,
  Check,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  Menu,
  Droplet,
  Sun,
  Award,
  ChevronDown,
  Smartphone,
  Monitor
} from 'lucide-react';

interface WebsiteServicesSectionProps {
  onOpenQuestionnaire?: () => void;
}

interface WebsiteCardItem {
  id: string;
  label: string;
  businessType: string;
  url: string;
  renderDesktop: () => React.ReactNode;
  renderMobile: () => React.ReactNode;
}

export const WebsiteServicesSection: React.FC<WebsiteServicesSectionProps> = ({ 
  onOpenQuestionnaire 
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mobileViewMode, setMobileViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const touchStartX = useRef<number | null>(null);

  // ============================================================================
  // CARD 1: CAFÉ ("The Roasted Bean", Bandra) – warm and editorial
  // Fonts: Fraunces (serif) + clean sans
  // Colors: cream, espresso brown, terracotta
  // Layout: split hero with circular SVG (coffee + croissant), single-column menu
  // board with dotted leaders, hours strip, gallery tiles, map footer
  // Buttons: fully rounded pills (rounded-full)
  // Phone: bottom tab bar (Menu / Order / Reserve / Visit) + sticky Reserve Table button
  // ============================================================================
  const renderCafeDesktop = () => (
    <div className="w-full text-[#24140E] bg-[#FDFBF7] select-none font-sans">
      {/* Centered Logo Nav with Links on Both Sides */}
      <nav className="px-6 py-3 bg-[#FAF6F0] border-b border-[#E8DFC9] flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-[#6A584A] text-[11px] font-medium">
          <span className="hover:text-[#C85A32] cursor-pointer">About Us</span>
          <span className="hover:text-[#C85A32] cursor-pointer">Our Roastery</span>
        </div>
        <div className="text-center">
          <span style={{ fontFamily: "'Fraunces', Georgia, serif" }} className="text-sm font-black tracking-wider text-[#24140E] block">
            THE ROASTED BEAN
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#C85A32] font-semibold block">
            Bandra West · Est. 2018
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#6A584A] text-[11px] font-medium">
          <span className="hover:text-[#C85A32] cursor-pointer">Seasonal Menu</span>
          <span className="px-3 py-1 rounded-full bg-[#C85A32] text-white font-bold text-[10px] hover:bg-[#B34C27] cursor-pointer shadow-xs">
            Reserve Table
          </span>
        </div>
      </nav>

      {/* Split Hero */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-[#FAF6F0] to-[#F5ECE1] border-b border-[#E5DAC4]">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-8">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-[10px] font-mono font-bold tracking-wider mb-2">
              PALI HILL FLAGSHIP · OPEN DAILY 7:30 AM
            </span>
            <h4 style={{ fontFamily: "'Fraunces', Georgia, serif" }} className="text-2xl sm:text-3xl font-black text-[#24140E] leading-tight mb-2">
              Slow Roasted in Bandra, Baked Fresh at Dawn.
            </h4>
            <p className="text-xs sm:text-sm text-[#5C4A3C] leading-relaxed max-w-sm mb-4">
              Single-origin Chikmagalur Arabica, 36-hour wild sourdough loaves, and warm handcrafted viennoiserie baked every morning.
            </p>
            <div className="flex items-center gap-2.5">
              <span className="px-4 py-2 rounded-full bg-[#C85A32] text-white text-xs font-bold shadow-sm hover:bg-[#B34C27] cursor-pointer">
                Book a Table →
              </span>
              <span className="px-4 py-2 rounded-full bg-white border border-[#D5C5AC] text-[#24140E] text-xs font-bold hover:bg-[#FAF6F0] cursor-pointer">
                View Tasting Menu
              </span>
            </div>
          </div>

          {/* Circular SVG Illustration (Coffee Cup + Croissant) */}
          <div className="col-span-4 flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#EFE3D0] to-[#E2D2B9] border-2 border-[#D6C4A7] p-2 flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* Steam */}
                <path d="M42 22 Q40 16 44 12" stroke="#C85A32" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M50 20 Q48 14 52 10" stroke="#C85A32" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                <path d="M58 22 Q56 16 60 12" stroke="#C85A32" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                {/* Coffee Cup */}
                <path d="M34 32 H66 V52 Q66 64 50 64 Q34 64 34 52 Z" fill="#24140E" />
                <path d="M66 38 H73 Q77 38 77 44 Q77 50 73 50 H66" stroke="#24140E" strokeWidth="3" fill="none" strokeLinecap="round" />
                <ellipse cx="50" cy="33" rx="15" ry="3.5" fill="#8C5835" />
                {/* Croissant Silhouette below */}
                <path d="M22 76 Q34 68 50 69 Q66 68 78 76 Q68 86 50 85 Q32 86 22 76 Z" fill="#D48B47" stroke="#A86326" strokeWidth="1.5" />
                <path d="M35 72 Q50 75 65 72" stroke="#8C4B18" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Single-Column Menu Board with Dotted Leaders */}
      <div className="p-6 bg-[#FDFBF7]">
        <div className="text-center mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85A32] font-bold">
            HANDCRAFTED DAILY
          </span>
          <h5 style={{ fontFamily: "'Fraunces', Georgia, serif" }} className="text-lg font-bold text-[#24140E]">
            Today's Specialty Menu
          </h5>
        </div>

        <div className="space-y-2.5 max-w-lg mx-auto">
          {[
            { name: 'Cardamom Spiced Cappuccino', desc: 'Double espresso, steamed almond milk, fresh pod extract', price: '₹240' },
            { name: 'Almond Frangipane Croissant', desc: '36-layer French butter lamination, toasted slivers', price: '₹210' },
            { name: 'Wild Sourdough Tartine with Ricotta', desc: 'Himalayan pink salt, chili crunch, micro-herbs', price: '₹380' },
            { name: 'Cold Brew Yuzu Tonic', desc: '18-hour cold steeped Arabica, yuzu soda, rosemary', price: '₹260' },
            { name: 'Naturally Fermented Sourdough Loaf', desc: 'Whole loaf baked fresh daily at 6:30 AM', price: '₹220' },
          ].map((item, i) => (
            <div key={i} className="flex items-baseline justify-between text-xs py-1 border-b border-[#F0E6D5]/80">
              <div className="pr-2">
                <span className="font-bold text-[#24140E]">{item.name}</span>
                <span className="text-[10px] text-[#7A6757] block">{item.desc}</span>
              </div>
              <div className="grow mx-2 border-b-2 border-dotted border-[#D6C5AC]" />
              <span className="font-mono font-bold text-[#C85A32] shrink-0 text-xs">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Opening-Hours Strip */}
      <div className="px-6 py-3 bg-[#24140E] text-[#F3ECE2] flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>Tue – Sun: 7:30 AM – 10:30 PM (Mondays Closed for Roasting)</span>
        </div>
        <span className="text-[#C85A32] font-bold">Pali Hill, Bandra West</span>
      </div>

      {/* Colorful Gallery Tiles */}
      <div className="p-6 bg-[#FAF6F0] border-t border-[#E8DFC9]">
        <div className="grid grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-[#EFE4D2] border border-[#DECFB8] text-center">
            <div className="text-xl mb-1">☕</div>
            <div className="text-[10px] font-bold text-[#24140E]">Micro-Lot Roast</div>
            <div className="text-[8px] text-[#7A6757]">Chikmagalur, 1200m</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAE7DC] border border-[#D5CFC0] text-center">
            <div className="text-xl mb-1">🍞</div>
            <div className="text-[10px] font-bold text-[#24140E]">Wild Sourdough</div>
            <div className="text-[8px] text-[#7A6757]">100% Organic Wheat</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAD8CA] border border-[#DAC2B0] text-center">
            <div className="text-xl mb-1">🥐</div>
            <div className="text-[10px] font-bold text-[#24140E]">Laminated Bakes</div>
            <div className="text-[8px] text-[#7A6757]">Pure Butter Pastries</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#DFE6DE] border border-[#C5D2C3] text-center">
            <div className="text-xl mb-1">🌿</div>
            <div className="text-[10px] font-bold text-[#24140E]">Courtyard Seating</div>
            <div className="text-[8px] text-[#7A6757]">Pet Friendly Garden</div>
          </div>
        </div>
      </div>

      {/* Footer with Address & Map Pin */}
      <footer className="px-6 py-4 bg-[#1A0E0A] text-[#D8C7B5] text-[10px] flex items-center justify-between font-mono">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>14 Waroda Road, Off Hill Road, Bandra West, Mumbai 400050</span>
        </div>
        <div className="flex items-center gap-3">
          <span>+91 98201 44820</span>
          <span>@roastedbeanbandra</span>
        </div>
      </footer>
    </div>
  );

  const renderCafeMobile = () => (
    <div className="w-full h-full bg-[#FDFBF7] text-[#24140E] flex flex-col justify-between font-sans">
      {/* Top Bar */}
      <div className="px-3.5 py-2 bg-[#24140E] text-white flex items-center justify-between text-[9.5px] font-mono">
        <span style={{ fontFamily: "'Fraunces', Georgia, serif" }} className="font-bold tracking-wider">THE ROASTED BEAN</span>
        <span className="text-[#C85A32] font-semibold">BANDRA</span>
      </div>

      {/* Body Content */}
      <div className="p-3 overflow-hidden">
        <div className="text-[13px] font-black text-[#24140E] leading-tight" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          Slow Roasts & Sourdough
        </div>
        <div className="text-[9.5px] text-[#7A6757] mt-0.5">Fresh daily at 7:30 AM · Bandra West</div>

        <div className="mt-2.5 space-y-1.5">
          <div className="p-1.5 rounded-lg bg-[#FAF6F0] border border-[#E8DFC9] flex justify-between text-[9.5px]">
            <span className="font-bold text-[#24140E]">Cardamom Cappuccino</span>
            <span className="text-[#C85A32] font-mono font-bold">₹240</span>
          </div>
          <div className="p-1.5 rounded-lg bg-[#FAF6F0] border border-[#E8DFC9] flex justify-between text-[9.5px]">
            <span className="font-bold text-[#24140E]">Almond Croissant</span>
            <span className="text-[#C85A32] font-mono font-bold">₹210</span>
          </div>
          <div className="p-1.5 rounded-lg bg-[#FAF6F0] border border-[#E8DFC9] flex justify-between text-[9.5px]">
            <span className="font-bold text-[#24140E]">Sourdough Loaf</span>
            <span className="text-[#C85A32] font-mono font-bold">₹220</span>
          </div>
        </div>

        {/* Sticky CTA inside screen */}
        <div className="mt-3">
          <button className="w-full py-2 rounded-full bg-[#C85A32] text-white text-[9.5px] font-bold shadow-xs">
            Reserve Table
          </button>
        </div>
      </div>

      {/* Bottom Tab Bar (Menu / Order / Reserve / Visit) */}
      <div className="px-2 py-2 bg-[#FAF6F0] border-t border-[#E8DFC9] grid grid-cols-4 gap-1 text-[8.5px] text-center font-bold text-[#6A584A]">
        <span className="text-[#C85A32]">Menu</span>
        <span>Order</span>
        <span>Reserve</span>
        <span>Visit</span>
      </div>
    </div>
  );

  // ============================================================================
  // CARD 2: CLINIC ("Lumina Skin Clinic", Juhu) – calm and trustworthy
  // Fonts: Outfit (soft rounded sans) + Playfair Display italic (doctor accent)
  // Colors: white, sage green (#4A6B5D), soft mint (#EBF4F0), touch of gold (#C5A059)
  // Layout: floating pill navbar, centered hero with arch SVG doctor portrait,
  // trust badges, 3 treatment icon tiles (large radius), interactive booking widget
  // (date chips + time slots), patient testimonials, footer.
  // Buttons: large radius (rounded-2xl)
  // Phone: sticky bottom Book Appointment bar + hamburger menu
  // ============================================================================
  const renderClinicDesktop = () => (
    <div className="w-full text-slate-800 bg-[#FFFFFF] select-none font-sans" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Floating Pill-Shaped Navbar */}
      <div className="pt-3 px-6 bg-gradient-to-b from-[#F2F7F4] to-transparent">
        <nav className="max-w-xl mx-auto px-4 py-2 rounded-full bg-white/95 border border-[#D5E5DC] shadow-sm flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D]" />
            <span className="font-extrabold tracking-tight text-[#234235] text-xs">
              LUMINA SKIN CLINIC
            </span>
          </div>
          <div className="flex items-center gap-3.5 text-[11px] text-[#4F685B] font-medium">
            <span className="hover:text-[#234235] cursor-pointer">Treatments</span>
            <span className="hover:text-[#234235] cursor-pointer">Physicians</span>
            <span className="hover:text-[#234235] cursor-pointer">Results</span>
          </div>
          <span className="px-3 py-1 rounded-2xl bg-[#4A6B5D] text-white text-[10px] font-bold hover:bg-[#3B574A] cursor-pointer shadow-xs">
            Consultation
          </span>
        </nav>
      </div>

      {/* Centered Hero with SVG Doctor Portrait in Arch Frame */}
      <div className="p-6 sm:p-8 text-center bg-gradient-to-b from-[#F2F7F4] via-[#FFFFFF] to-[#FFFFFF] border-b border-[#E1ECE6]">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-[10px] font-bold uppercase tracking-wider mb-2.5">
          <ShieldCheck className="w-3 h-3 text-[#4A6B5D]" />
          <span>JUHU TARA ROAD · BOARD-CERTIFIED CLINIC</span>
        </span>

        <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1E362B] tracking-tight leading-tight max-w-md mx-auto mb-2">
          Evidence-Based Skin Health & Restorative Dermatology.
        </h4>

        {/* Doctor Accent Script */}
        <p className="text-xs text-[#4F685B] mb-4">
          Consultations & treatment plans directed by{' '}
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="italic font-bold text-[#C5A059] text-sm">
            Dr. Maya Sen, MD (Dermatology)
          </span>
        </p>

        {/* Arch Frame Doctor Portrait */}
        <div className="w-24 h-28 mx-auto rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#E2EFE9] to-[#C8DDD3] border-2 border-[#B9D4C7] p-2 flex items-center justify-center shadow-sm mb-4">
          <svg viewBox="0 0 80 100" className="w-full h-full" fill="none">
            {/* Halo / Calm Backdrop */}
            <circle cx="40" cy="45" r="32" fill="#EBF4F0" />
            {/* Shoulders / Doctor Coat */}
            <path d="M12 95 Q40 75 68 95 Z" fill="#FFFFFF" stroke="#4A6B5D" strokeWidth="1.5" />
            {/* Stethoscope */}
            <path d="M28 85 Q40 98 52 85" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
            <circle cx="40" cy="95" r="3" fill="#C5A059" />
            {/* Head & Neck */}
            <path d="M34 68 H46 V78 H34 Z" fill="#F1D6C2" />
            <ellipse cx="40" cy="48" rx="16" ry="20" fill="#F4DEC9" />
            {/* Hair */}
            <path d="M24 45 Q26 28 40 28 Q54 28 56 45 Q50 34 40 34 Q30 34 24 45 Z" fill="#2E241E" />
            {/* Gentle Smile */}
            <path d="M36 57 Q40 60 44 57" stroke="#A66850" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Trust Badges */}
        <div className="inline-flex items-center justify-center gap-4 py-2 px-5 rounded-2xl bg-[#F4F8F6] border border-[#DEEAE3] text-xs font-semibold text-[#2D473B]">
          <span>🌟 12+ Years Clinical Practice</span>
          <span>•</span>
          <span>4.9/5 Rating (1,400+ Patients)</span>
          <span>•</span>
          <span>8,000+ Completed Treatments</span>
        </div>
      </div>

      {/* Treatments: 3 Icon Tiles with Large Radius */}
      <div className="p-6 bg-white">
        <div className="text-center mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A6B5D] font-bold">
            TAILORED CARE
          </span>
          <h5 className="text-lg font-bold text-[#1E362B]">
            Signature Dermatological Treatments
          </h5>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-3xl bg-[#F4F8F6] border border-[#DEEAE3] hover:border-[#4A6B5D]/40 transition-all">
            <div className="w-8 h-8 rounded-2xl bg-[#E2EFE9] flex items-center justify-center text-[#4A6B5D] mb-2 font-bold text-sm">
              💧
            </div>
            <div className="text-xs font-bold text-[#1E362B]">Hydra-Glow Infusion</div>
            <div className="text-[10px] text-[#557364] mt-0.5 leading-snug">
              Antioxidant deep peel, zero downtime.
            </div>
            <div className="mt-2 text-xs font-bold text-[#4A6B5D]">₹3,500 · 50 min</div>
          </div>

          <div className="p-4 rounded-3xl bg-[#F4F8F6] border border-[#DEEAE3] hover:border-[#4A6B5D]/40 transition-all">
            <div className="w-8 h-8 rounded-2xl bg-[#E2EFE9] flex items-center justify-center text-[#4A6B5D] mb-2 font-bold text-sm">
              🛡️
            </div>
            <div className="text-xs font-bold text-[#1E362B]">Acne & Barrier Protocol</div>
            <div className="text-[10px] text-[#557364] mt-0.5 leading-snug">
              Medical extractions + tailored topical Rx.
            </div>
            <div className="mt-2 text-xs font-bold text-[#4A6B5D]">₹1,800 · 40 min</div>
          </div>

          <div className="p-4 rounded-3xl bg-[#F4F8F6] border border-[#DEEAE3] hover:border-[#4A6B5D]/40 transition-all">
            <div className="w-8 h-8 rounded-2xl bg-[#E2EFE9] flex items-center justify-center text-[#4A6B5D] mb-2 font-bold text-sm">
              ✨
            </div>
            <div className="text-xs font-bold text-[#1E362B]">Q-Switch Laser Clarity</div>
            <div className="text-[10px] text-[#557364] mt-0.5 leading-snug">
              Targeted pigmentation & collagen tone.
            </div>
            <div className="mt-2 text-xs font-bold text-[#4A6B5D]">₹4,800 · 45 min</div>
          </div>
        </div>
      </div>

      {/* Interactive Booking Widget */}
      <div className="p-5 mx-6 rounded-3xl bg-[#F4F8F6] border border-[#DEEAE3]">
        <div className="text-xs font-bold text-[#1E362B] mb-2 flex items-center justify-between">
          <span>Select Consultation Date & Slot</span>
          <span className="text-[10px] text-[#4A6B5D] font-mono">Available Today</span>
        </div>

        {/* Date Chips */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="px-3 py-1 rounded-xl bg-[#4A6B5D] text-white text-[11px] font-bold shadow-xs">
            Today 24 Oct
          </span>
          <span className="px-3 py-1 rounded-xl bg-white border border-[#D5E5DC] text-[#334E41] text-[11px] font-medium">
            Tomorrow 25 Oct
          </span>
          <span className="px-3 py-1 rounded-xl bg-white border border-[#D5E5DC] text-[#334E41] text-[11px] font-medium">
            Sat 26 Oct
          </span>
        </div>

        {/* Time Slot Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {['10:30 AM', '02:00 PM (Selected)', '04:30 PM', '06:15 PM'].map((slot, i) => (
            <span
              key={i}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono ${
                i === 1
                  ? 'bg-[#234235] text-white font-bold'
                  : 'bg-white border border-[#D5E5DC] text-[#4F685B]'
              }`}
            >
              {slot}
            </span>
          ))}
          <span className="ml-auto px-4 py-1.5 rounded-2xl bg-[#C5A059] text-white text-[11px] font-bold hover:bg-[#B38F48] cursor-pointer shadow-xs">
            Confirm Slot →
          </span>
        </div>
      </div>

      {/* Patient Testimonials */}
      <div className="p-6 bg-white border-t border-[#E1ECE6] mt-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-[#FAFCFA] border border-[#E1ECE6]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-[#4A6B5D] text-white text-[10px] font-bold flex items-center justify-center">
                AK
              </span>
              <div>
                <span className="text-xs font-bold text-[#1E362B] block leading-none">Ananya Kapoor</span>
                <span className="text-[9px] text-[#C5A059]">★★★★★ Juhu Patient</span>
              </div>
            </div>
            <p className="text-[11px] text-[#557364] leading-snug">
              "Transformed my adult cystic acne in 8 weeks with zero harsh medication. The most caring clinic in Mumbai."
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAFCFA] border border-[#E1ECE6]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-[#C5A059] text-white text-[10px] font-bold flex items-center justify-center">
                RM
              </span>
              <div>
                <span className="text-xs font-bold text-[#1E362B] block leading-none">Rohit Mehra</span>
                <span className="text-[9px] text-[#C5A059]">★★★★★ Bandra Patient</span>
              </div>
            </div>
            <p className="text-[11px] text-[#557364] leading-snug">
              "Hydra glow gave an immediate clear look with zero redness. Dr. Sen explains every single ingredient."
            </p>
          </div>
        </div>
      </div>

      {/* Clinic Footer */}
      <footer className="px-6 py-4 bg-[#1E362B] text-[#DCEAE3] text-[10px] flex items-center justify-between font-mono">
        <span>Lumina Aesthetics · Reg. MH-MUM-DERM-2016</span>
        <span>Juhu Tara Road & Bandra West, Mumbai · Mon–Sat 9:30 AM – 7:30 PM</span>
      </footer>
    </div>
  );

  const renderClinicMobile = () => (
    <div className="w-full h-full bg-[#FFFFFF] text-slate-800 flex flex-col justify-between font-sans" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Top Header with Hamburger */}
      <div className="px-3.5 py-2 bg-[#F4F8F6] border-b border-[#DEEAE3] flex items-center justify-between text-xs">
        <span className="font-extrabold text-[10px] text-[#234235] tracking-wider">LUMINA CLINIC</span>
        <Menu className="w-3.5 h-3.5 text-[#4A6B5D]" />
      </div>

      {/* Screen Body */}
      <div className="p-3 overflow-hidden">
        <div className="text-[12px] font-extrabold text-[#1E362B] leading-tight">
          Evidence-Based Skin Health
        </div>
        <div className="text-[9px] text-[#4F685B] mt-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Directed by Dr. Maya Sen, MD
        </div>

        <div className="mt-2.5 p-2 rounded-xl bg-[#F4F8F6] border border-[#DEEAE3]">
          <div className="text-[9px] font-bold text-[#1E362B] mb-1">Pick Appointment Date</div>
          <div className="flex gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-[#4A6B5D] text-white text-[8px] font-bold">Today</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-[#D5E5DC] text-[8px]">Tomorrow</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-[#D5E5DC] text-[8px]">Saturday</span>
          </div>
        </div>

        <div className="mt-2.5 space-y-1.5">
          <div className="p-1.5 rounded-lg bg-white border border-[#DEEAE3] flex justify-between text-[9px]">
            <span className="font-bold text-[#1E362B]">Hydra-Glow Therapy</span>
            <span className="text-[#4A6B5D] font-bold font-mono">₹3,500</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white border border-[#DEEAE3] flex justify-between text-[9px]">
            <span className="font-bold text-[#1E362B]">Doctor Consultation</span>
            <span className="text-[#4A6B5D] font-bold font-mono">₹1,200</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Book Appointment Bar */}
      <div className="p-2.5 bg-[#1E362B] text-white flex items-center justify-between text-[9px]">
        <div>
          <span className="block font-bold">Next Slot: 2:00 PM</span>
          <span className="text-[7.5px] text-[#C5A059]">Juhu Clinic · Instant Confirm</span>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-[#C5A059] text-white font-bold text-[9px]">
          Book Now
        </button>
      </div>
    </div>
  );

  // ============================================================================
  // CARD 3: BOUTIQUE ("Atelier 96", Colaba) – high-fashion editorial
  // Fonts: Cormorant Garamond (high-contrast serif) + Space Grotesk (spaced uppercase)
  // Colors: off-white (#F8F7F4), deep black (#0A0A0A), warm sand (#E8E3DA), muted rust (#C24E38)
  // Layout: thin announcement bar, minimal nav with bag icon, asymmetric hero with
  // oversized headline overlapping tonal SVG fashion block, 4-column product grid
  // with tall portrait tiles & size chips, lookbook strip, newsletter footer.
  // Buttons: sharp rectangles, NO radius (rounded-none)
  // Phone: 2-column product grid, filter chip row, bag icon in header
  // ============================================================================
  const renderBoutiqueDesktop = () => (
    <div className="w-full text-[#0A0A0A] bg-[#F8F7F4] select-none font-sans">
      {/* Thin Announcement Bar */}
      <div className="px-4 py-1.5 bg-[#0A0A0A] text-[#F8F7F4] text-center text-[9px] font-mono tracking-widest uppercase">
        FREE DOMESTIC SHIPPING ON ORDERS ABOVE ₹2,999 · WORLDWIDE DISPATCH
      </div>

      {/* Minimal Nav with Bag Count */}
      <nav className="px-6 py-3.5 bg-[#F8F7F4] border-b border-[#0A0A0A]/10 flex items-center justify-between">
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-lg font-bold tracking-widest text-[#0A0A0A]">
          ATELIER 96
        </span>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="flex items-center gap-5 text-[10px] tracking-[0.18em] uppercase text-[#6B655B] font-medium">
          <span className="hover:text-[#0A0A0A] cursor-pointer">Collections</span>
          <span className="hover:text-[#0A0A0A] cursor-pointer">Editorial</span>
          <span className="hover:text-[#0A0A0A] cursor-pointer">Archive</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0A] text-white text-[10px] font-mono uppercase tracking-wider">
          <ShoppingBag className="w-3 h-3" />
          <span>Bag (3)</span>
        </div>
      </nav>

      {/* Asymmetric Hero with Tonal SVG Block & Oversized Headline */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-[#F8F7F4] to-[#F0EDE6] border-b border-[#E3DDD1]">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-7">
            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[9px] uppercase tracking-[0.2em] text-[#C24E38] font-bold block mb-2">
              SUMMER CAPSULE 2026 · COLABA
            </span>
            <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] leading-[1.05] tracking-tight mb-3">
              Structured Silhouettes in 100% Organic French Flax Linen.
            </h4>
            <p className="text-xs text-[#57524A] leading-relaxed max-w-sm mb-4">
              Garments tailored for coastal afternoons and timeless evenings. Zero synthetic micro-blends.
            </p>
            <button className="px-5 py-2.5 bg-[#0A0A0A] text-white text-[10px] font-mono uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors rounded-none shadow-xs">
              Shop The Drop →
            </button>
          </div>

          {/* Tonal SVG Fashion Graphic Block */}
          <div className="col-span-5 flex justify-center">
            <div className="w-36 h-48 bg-[#E5DFD4] border border-[#D5CDC0] p-3 flex flex-col justify-between relative shadow-sm">
              <span className="text-[8px] font-mono tracking-widest text-[#7A7367]">04 / 26</span>
              <svg viewBox="0 0 100 120" className="w-full h-28 my-auto" fill="none">
                {/* Draped Linen Trench / Coat Silhouette */}
                <path d="M30 15 L50 25 L70 15 L78 50 L68 115 L32 115 L22 50 Z" fill="#D2C8B8" stroke="#0A0A0A" strokeWidth="1.2" />
                <path d="M50 25 L50 115" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M36 40 L50 60 L64 40" stroke="#0A0A0A" strokeWidth="1.2" />
                <circle cx="50" cy="72" r="2" fill="#0A0A0A" />
                <circle cx="50" cy="86" r="2" fill="#0A0A0A" />
              </svg>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-[10px] italic text-right text-[#0A0A0A]">
                Pure French Flax
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Product Grid with Tall Portrait Tiles */}
      <div className="p-6 bg-[#F8F7F4]">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#0A0A0A]/10">
          <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0A0A0A]">
            Selected Garments & Objects
          </span>
          <span className="text-[10px] font-mono text-[#7A7367]">4 Items Displayed</span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Relaxed Linen Overshirt', price: '₹3,490', sizes: ['XS', 'S', 'M', 'L'] },
            { name: 'Pleated Wide-Leg Trousers', price: '₹3,850', sizes: ['28', '30', '32', '34'] },
            { name: 'Sculptural Linen Midi Dress', price: '₹4,200', sizes: ['S', 'M', 'L'] },
            { name: 'Heavyweight Canvas Day Tote', price: '₹1,850', sizes: ['One Size'] },
          ].map((prod, i) => (
            <div key={i} className="group border border-[#0A0A0A]/10 bg-white p-2.5 flex flex-col justify-between">
              <div className="w-full aspect-[3/4] bg-[#F1ECE3] flex items-center justify-center p-2 mb-2">
                <svg viewBox="0 0 60 80" className="w-12 h-16 opacity-75 group-hover:scale-105 transition-transform" fill="none">
                  <path d="M15 15 L30 22 L45 15 L50 45 L42 75 L18 75 L10 45 Z" fill="#D7CFBE" stroke="#0A0A0A" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-xs font-bold text-[#0A0A0A] truncate">
                  {prod.name}
                </div>
                <div className="text-[10px] font-mono text-[#0A0A0A] font-semibold mt-0.5">
                  {prod.price}
                </div>
                <div className="flex gap-1 mt-1.5">
                  {prod.sizes.map((s, si) => (
                    <span key={si} className="px-1 py-0.2 bg-[#F0EDE6] text-[8px] font-mono text-[#57524A]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button className="w-full mt-2 py-1 bg-[#0A0A0A] text-white text-[9px] font-mono uppercase tracking-widest rounded-none">
                Quick Add +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram Lookbook Strip */}
      <div className="px-6 py-4 bg-[#F0EDE6] border-t border-[#E3DDD1]">
        <div className="grid grid-cols-4 gap-2">
          <div className="aspect-square bg-[#E4DDD0] flex items-center justify-center text-[9px] font-mono text-[#6A6356]">
            Fabric Weave
          </div>
          <div className="aspect-square bg-[#DDD5C5] flex items-center justify-center text-[9px] font-mono text-[#6A6356]">
            Brass Hardware
          </div>
          <div className="aspect-square bg-[#E8E2D7] flex items-center justify-center text-[9px] font-mono text-[#6A6356]">
            Studio Fittings
          </div>
          <div className="aspect-square bg-[#D8D0BF] flex items-center justify-center text-[9px] font-mono text-[#6A6356]">
            Colaba Flagship
          </div>
        </div>
      </div>

      {/* Newsletter Footer */}
      <footer className="px-6 py-4 bg-[#0A0A0A] text-[#F8F7F4] flex items-center justify-between text-[10px] font-mono">
        <div>
          <span className="block font-bold">JOIN THE ATELIER CIRCLE</span>
          <span className="text-[8px] text-[#A39C90]">3B Arthur Bunder Road, Colaba, Mumbai</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value="your@email.com"
            className="px-2 py-1 bg-white/10 text-white text-[9px] rounded-none border border-white/20 w-36"
          />
          <button className="px-3 py-1 bg-white text-[#0A0A0A] text-[9px] font-bold rounded-none uppercase">
            Subscribe
          </button>
        </div>
      </footer>
    </div>
  );

  const renderBoutiqueMobile = () => (
    <div className="w-full h-full bg-[#F8F7F4] text-[#0A0A0A] flex flex-col justify-between font-sans">
      {/* Mobile Header with Bag Icon */}
      <div className="px-3.5 py-2 bg-[#0A0A0A] text-white flex items-center justify-between text-xs font-mono">
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-sm font-bold tracking-wider">ATELIER 96</span>
        <span className="text-[9.5px] font-mono flex items-center gap-1">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>(3)</span>
        </span>
      </div>

      {/* Filter Chip Row */}
      <div className="px-2.5 py-1.5 bg-[#F0EDE6] border-b border-[#0A0A0A]/10 flex gap-1.5 overflow-x-auto text-[8.5px] font-mono uppercase tracking-wider">
        <span className="px-2.5 py-0.5 bg-[#0A0A0A] text-white font-bold">All</span>
        <span className="px-2.5 py-0.5 bg-white border border-black/10">Linen</span>
        <span className="px-2.5 py-0.5 bg-white border border-black/10">Dresses</span>
        <span className="px-2.5 py-0.5 bg-white border border-black/10">Bags</span>
      </div>

      {/* 2-Column Product Grid */}
      <div className="p-2.5 grid grid-cols-2 gap-2 overflow-hidden">
        <div className="p-2 bg-white border border-black/10">
          <div className="w-full aspect-square bg-[#EFECE5] mb-1.5" />
          <div className="text-[9.5px] font-bold truncate">Linen Overshirt</div>
          <div className="text-[8.5px] font-mono font-bold text-[#C24E38]">₹3,490</div>
        </div>
        <div className="p-2 bg-white border border-black/10">
          <div className="w-full aspect-square bg-[#EFECE5] mb-1.5" />
          <div className="text-[9.5px] font-bold truncate">Pleated Trouser</div>
          <div className="text-[8.5px] font-mono font-bold text-[#C24E38]">₹3,850</div>
        </div>
      </div>

      {/* Sticky Bottom Bag Bar */}
      <div className="p-2 bg-[#0A0A0A] text-white flex items-center justify-between text-[9px] font-mono">
        <span>3 Items · ₹9,230</span>
        <button className="px-2.5 py-1 bg-white text-[#0A0A0A] font-bold uppercase rounded-none">
          Checkout →
        </button>
      </div>
    </div>
  );

  // ============================================================================
  // CARD 4: CONSULTANT ("Nexus Strategic Advisory", BKC) – sharp and corporate
  // Fonts: Space Grotesk (geometric/grotesk sans) + JetBrains Mono (data/numbers)
  // Colors: deep navy (#081225), crisp white (#FFFFFF), electric blue (#2563EB)
  // Layout: dark hero + light body contrast, left-aligned hero with inline SVG
  // growth chart graphic, stats row, trusted-by strip, numbered full-width service
  // rows with arrows, pull-quote testimonial, contact form beside office details.
  // Buttons: slightly rounded rectangles (rounded-md / rounded-lg)
  // Phone: hamburger menu, stats card, sticky Schedule Call button
  // ============================================================================
  const renderConsultantDesktop = () => (
    <div className="w-full text-slate-900 bg-[#FFFFFF] select-none font-sans" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Dark Navy Navbar */}
      <nav className="px-6 py-3 bg-[#081225] text-white border-b border-blue-900/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
          <span className="font-bold tracking-tight text-sm text-white">NEXUS STRATEGIC ADVISORY</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span className="hover:text-white cursor-pointer">Capabilities</span>
          <span className="hover:text-white cursor-pointer">Transactions</span>
          <span className="hover:text-white cursor-pointer">Team</span>
        </div>
        <button className="px-3.5 py-1.5 rounded-md bg-[#2563EB] text-white text-[10px] font-mono font-bold hover:bg-blue-600 cursor-pointer shadow-xs">
          Schedule Call
        </button>
      </nav>

      {/* Left-Aligned Dark Hero with Inline SVG Growth Chart */}
      <div className="p-6 sm:p-8 bg-[#081225] text-white border-b border-blue-900/30">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-8">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-950 border border-blue-800 text-blue-400 text-[9px] font-mono font-bold tracking-wider mb-2">
              B2B GROWTH ARCHITECTURE & CAPITAL ADVISORY
            </span>
            <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-2.5">
              Capital Architecture & Fractional CFO Advisory for Scaling SMBs.
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-4 font-normal">
              From working capital cycle compression to private equity diligence and governance for companies doing ₹10Cr to ₹150Cr revenue.
            </p>
            <div className="flex items-center gap-2.5">
              <button className="px-4 py-2 rounded-md bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-600 shadow-md">
                Request Audit →
              </button>
              <button className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/15">
                Explore Portfolio
              </button>
            </div>
          </div>

          {/* Inline SVG Financial Growth Dashboard Graphic */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-[140px] p-2.5 rounded-xl bg-slate-900/90 border border-blue-500/30 shadow-xl">
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 mb-1">
                <span>ARR TRAJECTORY</span>
                <span className="text-emerald-400 font-bold">+42.8%</span>
              </div>
              <svg viewBox="0 0 100 50" className="w-full h-12 my-1" fill="none">
                <path d="M5 45 Q30 35 50 25 T95 8" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                <path d="M5 45 Q30 35 50 25 T95 8 L95 48 L5 48 Z" fill="url(#blueGrad)" opacity="0.25" />
                <circle cx="95" cy="8" r="3" fill="#60A5FA" />
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-[9px] font-mono font-bold text-white">₹42.5Cr Run Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Contrast Stats Row */}
      <div className="px-6 py-4 bg-[#0F1E36] text-white border-b border-blue-900/40">
        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div>
            <div className="text-lg font-black text-blue-400">₹60Cr+</div>
            <div className="text-[8px] uppercase tracking-wider text-slate-400">Capital Advised</div>
          </div>
          <div>
            <div className="text-lg font-black text-white">120+</div>
            <div className="text-[8px] uppercase tracking-wider text-slate-400">Founders Supported</div>
          </div>
          <div>
            <div className="text-lg font-black text-blue-400">9 Yrs</div>
            <div className="text-[8px] uppercase tracking-wider text-slate-400">Partner Experience</div>
          </div>
          <div>
            <div className="text-lg font-black text-white">99.4%</div>
            <div className="text-[8px] uppercase tracking-wider text-slate-400">Audit Compliance</div>
          </div>
        </div>
      </div>

      {/* "Trusted By" Strip */}
      <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500 font-bold">
        <span>TRUSTED BY LEADING FOUNDERS:</span>
        <div className="flex gap-4 text-slate-700">
          <span>FINVERSE</span>
          <span>ZEPHYR LOGISTICS</span>
          <span>INDUS RETAIL</span>
          <span>BLUEPEAK</span>
        </div>
      </div>

      {/* Numbered Full-Width Services Rows with Arrows (Light Body) */}
      <div className="p-6 bg-white">
        <div className="mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#2563EB] font-bold">
            CORE PRACTICE AREAS
          </span>
          <h5 className="text-lg font-bold text-slate-950">
            Strategic Advisory Scope
          </h5>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            { num: '01', title: 'M&A & Private Equity Due Diligence', desc: 'Valuation modeling, cap-table cleanups, and data-room audit.' },
            { num: '02', title: 'Fractional CFO & Working Capital Optimization', desc: 'Runway expansion, vendor credit restructuring, and monthly burn telemetry.' },
            { num: '03', title: 'Corporate Tax & Cross-Border Structuring', desc: 'Direct tax planning, GST audits, and promoter dividend flows.' },
          ].map((srv, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between group hover:bg-slate-50 px-2 rounded-lg transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#2563EB]">{srv.num}</span>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">{srv.title}</div>
                  <div className="text-[10px] text-slate-500">{srv.desc}</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Large Pull-Quote Testimonial */}
      <div className="p-5 mx-6 rounded-2xl bg-blue-50/70 border border-blue-200/80 mb-5">
        <p className="text-xs text-slate-800 italic leading-relaxed mb-2 font-medium">
          "Nexus reduced our working capital conversion cycle from 64 to 28 days and structured our Series A round with zero founder equity leak."
        </p>
        <div className="text-[10px] font-mono text-slate-600">
          <strong className="text-slate-950">Rohan Kulkarni</strong>, Co-Founder & CEO, Finverse Technologies (Mumbai)
        </div>
      </div>

      {/* Contact Form Beside Office Details */}
      <div className="p-6 bg-slate-900 text-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-bold text-white mb-1">Request Strategic Audit</div>
            <div className="text-[10px] text-slate-400 leading-snug mb-3">
              Confidential 30-min partner consultation for qualified founders.
            </div>
            <div className="text-[9px] font-mono text-slate-300 space-y-1">
              <div>📍 One BKC, G-Block, Bandra Kurla Complex, Mumbai 400051</div>
              <div>✉️ contact@nexusadvisory.in</div>
            </div>
          </div>
          <div className="space-y-1.5">
            <input
              type="text"
              readOnly
              value="Founder Name"
              className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[9px] text-slate-300"
            />
            <input
              type="text"
              readOnly
              value="work@company.com"
              className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[9px] text-slate-300"
            />
            <button className="w-full py-1.5 rounded-md bg-[#2563EB] text-white text-[10px] font-bold">
              Submit Inquiry →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsultantMobile = () => (
    <div className="w-full h-full bg-[#081225] text-white flex flex-col justify-between font-sans" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Mobile Header with Hamburger */}
      <div className="px-3.5 py-2 bg-[#081225] border-b border-blue-900/40 flex items-center justify-between text-xs">
        <span className="font-bold text-[10px] text-blue-400 tracking-wider">NEXUS ADVISORY</span>
        <Menu className="w-3.5 h-3.5 text-white" />
      </div>

      {/* Screen Body */}
      <div className="p-3 overflow-hidden">
        <div className="text-[12px] font-black text-white leading-tight">
          CFO & Capital Advisory
        </div>
        <div className="text-[9px] text-slate-400 mt-0.5">Bandra Kurla Complex · Mumbai</div>

        {/* Stats Card */}
        <div className="mt-2.5 p-2 rounded-lg bg-slate-900 border border-blue-500/30 flex justify-between text-center font-mono text-[8px]">
          <div>
            <div className="text-blue-400 font-bold text-[10px]">₹60Cr+</div>
            <div className="text-slate-400">Advised</div>
          </div>
          <div>
            <div className="text-white font-bold text-[10px]">120+</div>
            <div className="text-slate-400">Founders</div>
          </div>
          <div>
            <div className="text-blue-400 font-bold text-[10px]">9 Yrs</div>
            <div className="text-slate-400">Exp</div>
          </div>
        </div>

        <div className="mt-2.5 space-y-1.5">
          <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between text-[8.5px]">
            <span>01 / M&A Due Diligence</span>
            <span className="text-blue-400 font-bold">→</span>
          </div>
          <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between text-[8.5px]">
            <span>02 / Fractional CFO Retainer</span>
            <span className="text-blue-400 font-bold">→</span>
          </div>
        </div>
      </div>

      {/* Sticky Schedule Call Button */}
      <div className="p-2.5 bg-slate-950 border-t border-slate-800">
        <button className="w-full py-2 rounded-md bg-[#2563EB] text-white text-[9px] font-bold shadow-xs">
          Schedule Call
        </button>
      </div>
    </div>
  );

  // 4 Cards Array
  const CARDS: WebsiteCardItem[] = [
    {
      id: 'cafe',
      label: 'Café · Menu and bookings',
      businessType: 'Artisan Bakery & Espresso Bar',
      url: 'roastedbeanbandra.in',
      renderDesktop: renderCafeDesktop,
      renderMobile: renderCafeMobile,
    },
    {
      id: 'clinic',
      label: 'Salon & Clinic · Services and appointments',
      businessType: 'Dermatology & Aesthetic Wellness',
      url: 'luminaskinclinic.in',
      renderDesktop: renderClinicDesktop,
      renderMobile: renderClinicMobile,
    },
    {
      id: 'boutique',
      label: 'Boutique · Products and checkout',
      businessType: 'Modern D2C Apparel & Lifestyle',
      url: 'atelier96.in',
      renderDesktop: renderBoutiqueDesktop,
      renderMobile: renderBoutiqueMobile,
    },
    {
      id: 'consultant',
      label: 'Consultant · Strategy and inquiry',
      businessType: 'SMB Financial & Strategic Advisory',
      url: 'nexusadvisory.in',
      renderDesktop: renderConsultantDesktop,
      renderMobile: renderConsultantMobile,
    },
  ];

  const totalCards = CARDS.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Touch and drag gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="website-services" 
      className="pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-[#DCF4E7] via-[#CEEEDC] to-[#DBF2E4] text-slate-900 relative overflow-hidden border-b border-slate-900/10 scroll-mt-[54px]"
    >
      {/* External Google Fonts for the 4 Distinct Websites & Continuous Seamless Scroll Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,500;1,600&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        /* Continuous seamless scroll: from 0% to -50% because the site content is duplicated */
        @keyframes seamlessInfiniteBrowse {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .animate-site-seamless {
          animation: seamlessInfiniteBrowse 32s linear infinite;
          will-change: transform;
        }

        /* Hover pauses scroll */
        .preview-card:hover .animate-site-seamless {
          animation-play-state: paused !important;
        }

        /* Manual pause button toggles scroll */
        .is-paused .animate-site-seamless {
          animation-play-state: paused !important;
        }

        /* Subtle phone float */
        @keyframes phoneGentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-phone-float {
          animation: phoneGentleFloat 4s ease-in-out infinite;
        }

        /* Lively Doodle Floating Keyframes */
        @keyframes doodleFloatA {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }
        .animate-doodle-float-a {
          animation: doodleFloatA 7s ease-in-out infinite;
        }

        @keyframes doodleFloatB {
          0%, 100% {
            transform: translateY(0px) rotate(3deg);
          }
          50% {
            transform: translateY(8px) rotate(-1deg);
          }
        }
        .animate-doodle-float-b {
          animation: doodleFloatB 8s ease-in-out infinite;
        }

        @keyframes doodleSparklePulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.65;
          }
          50% {
            transform: scale(1.18) rotate(14deg);
            opacity: 1;
          }
        }
        .animate-doodle-sparkle {
          animation: doodleSparklePulse 4s ease-in-out infinite;
        }

        @keyframes doodleWiggle {
          0%, 100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        .animate-doodle-wiggle {
          animation: doodleWiggle 6s ease-in-out infinite;
        }

        /* Accessibility: respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-site-seamless,
          .animate-phone-float,
          .animate-doodle-float-a,
          .animate-doodle-float-b,
          .animate-doodle-sparkle,
          .animate-doodle-wiggle {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Decorative Harmonized Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-300/25 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-green-300/20 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* ========================================================
          LIVELY STUDIO BACKGROUND DOODLES (Non-kiddish, web-relevant design accents)
         ======================================================== */}

      {/* Doodle 1: Top-Left Code Bracket & Wireframe Sketch */}
      <div className="absolute top-6 left-4 sm:left-10 lg:left-16 pointer-events-none z-0 opacity-40 hover:opacity-75 transition-opacity animate-doodle-float-a hidden sm:block">
        <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
          {/* Wireframe Mini Window */}
          <rect x="8" y="10" width="68" height="46" rx="6" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="16" cy="18" r="2" fill="#FF3B14" />
          <circle cx="23" cy="18" r="2" fill="#F59E0B" />
          <circle cx="30" cy="18" r="2" fill="#10B981" />
          <line x1="16" y1="28" x2="62" y2="28" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="36" x2="48" y2="36" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <line x1="16" y1="44" x2="54" y2="44" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          {/* Curly Bracket with Pop */}
          <path d="M82 18 Q86 18 86 28 Q86 36 92 38 Q86 40 86 48 Q86 58 82 58" stroke="#FF3B14" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Handwritten Annotation */}
          <text x="18" y="76" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600" fill="#FF3B14" letterSpacing="0.05em">
            &lt;clean_code /&gt;
          </text>
        </svg>
      </div>

      {/* Doodle 2: Top-Right Sparkles & Cursor Arrow */}
      <div className="absolute top-8 right-6 sm:right-14 lg:right-20 pointer-events-none z-0 opacity-50 hover:opacity-85 transition-opacity animate-doodle-sparkle">
        <svg width="100" height="95" viewBox="0 0 100 95" fill="none">
          {/* 4-Point Editorial Sparkle (Large Gold) */}
          <path d="M50 8 Q50 28 70 28 Q50 28 50 48 Q50 28 30 28 Q50 28 50 8 Z" fill="#F59E0B" />
          {/* Mini Coral Sparkle */}
          <path d="M78 40 Q78 48 86 48 Q78 48 78 56 Q78 48 70 48 Q78 48 78 40 Z" fill="#FF3B14" opacity="0.85" />
          {/* Subtle Dynamic Cursor Arrow */}
          <path d="M22 45 L36 72 L42 60 L54 62 L22 45 Z" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Click Ripple Arc */}
          <path d="M15 40 Q10 48 16 56" stroke="#FF3B14" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Doodle 3: Mid-Left Curved Arrow with "desktop + mobile" Note */}
      <div className="absolute top-1/2 -translate-y-8 left-3 sm:left-8 lg:left-14 pointer-events-none z-0 opacity-40 hover:opacity-75 transition-opacity animate-doodle-float-b hidden lg:block">
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none">
          {/* Hand-Drawn Curved Spiral Arrow */}
          <path d="M25 25 C15 50 20 85 65 95 C78 98 90 94 98 86" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 3" />
          <path d="M92 82 L99 85 L96 93" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Mini Phone Wireframe Sketch */}
          <rect x="24" y="60" width="26" height="44" rx="5" stroke="#0F172A" strokeWidth="1.5" fill="#FFFFFF" fillOpacity="0.8" />
          <line x1="33" y1="64" x2="41" y2="64" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="37" cy="98" r="1.5" fill="#0F172A" />
          {/* Editorial Studio Label */}
          <text x="18" y="120" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="700" fill="#4F46E5" letterSpacing="0.04em">
            dual-viewport ↗
          </text>
        </svg>
      </div>

      {/* Doodle 4: Mid-Right Speed Bolt & Secure SSL Padlock */}
      <div className="absolute top-1/2 -translate-y-12 right-3 sm:right-8 lg:right-14 pointer-events-none z-0 opacity-45 hover:opacity-80 transition-opacity animate-doodle-float-a hidden lg:block">
        <svg width="115" height="120" viewBox="0 0 115 120" fill="none">
          {/* Lightning Speed Bolt with Pop Accent */}
          <path d="M52 14 L30 46 L46 46 L36 78 L68 38 L50 38 L62 14 Z" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.8" strokeLinejoin="round" />
          {/* Mini Modern Padlock */}
          <rect x="64" y="68" width="28" height="22" rx="4" fill="#0F172A" />
          <path d="M71 68 V60 Q71 52 78 52 Q85 52 85 60 V68" stroke="#0F172A" strokeWidth="2" fill="none" />
          <circle cx="78" cy="78" r="2" fill="#FFFFFF" />
          {/* Speed Indicator Pill Text */}
          <text x="18" y="105" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="700" fill="#059669" letterSpacing="0.04em">
            ⚡ &lt;0.8s load
          </text>
        </svg>
      </div>

      {/* Doodle 5: Bottom-Left Blueprint Drafting Crosshairs & Fluid Wave */}
      <div className="absolute bottom-10 left-6 sm:left-14 lg:left-20 pointer-events-none z-0 opacity-35 hover:opacity-65 transition-opacity animate-doodle-wiggle hidden sm:block">
        <svg width="130" height="70" viewBox="0 0 130 70" fill="none">
          {/* Precision Blueprint Crosshairs */}
          <path d="M15 15 H25 M20 10 V20" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M55 15 H65 M60 10 V20" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M95 15 H105 M100 10 V20" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
          {/* Dynamic Organic Squiggle Wave in Red-Orange */}
          <path d="M12 45 Q32 28 52 45 T92 45 T122 38" stroke="#FF3B14" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="122" cy="38" r="2.5" fill="#FF3B14" />
        </svg>
      </div>

      {/* Doodle 6: Bottom-Right Radial Star Burst & Growth Arc */}
      <div className="absolute bottom-12 right-6 sm:right-14 lg:right-20 pointer-events-none z-0 opacity-40 hover:opacity-70 transition-opacity animate-doodle-float-b hidden sm:block">
        <svg width="100" height="85" viewBox="0 0 100 85" fill="none">
          {/* Hand-Drawn Concentric Star Ring */}
          <circle cx="45" cy="42" r="22" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="45" cy="42" r="14" stroke="#F59E0B" strokeWidth="1.2" />
          <path d="M45 35 V49 M38 42 H52" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          {/* Starlet Accents */}
          <path d="M76 22 L79 28 L85 29 L80 34 L82 40 L76 36 L70 40 L72 34 L67 29 L73 28 Z" fill="#FF3B14" opacity="0.75" />
        </svg>
      </div>


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            1. SECTION HEADER
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-slate-950 tracking-tight leading-[1.12] mb-4">
            Every Business Needs a{' '}
            <span className="font-editorial-italic font-normal italic text-[#FF3B14]">
              Home Online
            </span>.
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            If you think your business needs a website, we can build one for you. It's a one-time charge starting at ₹3,000, and we look after it for the first month. After that, if you need more support, we can sort that out separately.
          </p>

        </div>

        {/* ========================================================
            2. SHOWCASE: HORIZONTAL CAROUSEL OF 4 BESPOKE WEBSITES
           ======================================================== */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Industry Category Switcher Pills */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto pb-1 px-1 no-scrollbar">
            {CARDS.map((card, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-heading transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 text-white font-bold shadow-xs'
                      : 'bg-white/85 hover:bg-white text-slate-700 border border-slate-900/10 hover:border-slate-900/25'
                  }`}
                >
                  <span>{card.businessType.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile View Switcher (Visible only on mobile screens < md to prevent cramping) */}
          <div className="flex md:hidden items-center justify-center mb-3">
            <div className="inline-flex p-1 rounded-full bg-white/95 border border-slate-900/10 shadow-xs">
              <button
                type="button"
                onClick={() => setMobileViewMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading transition-all cursor-pointer ${
                  mobileViewMode === 'mobile'
                    ? 'bg-[#FF3B14] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile View</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileViewMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading transition-all cursor-pointer ${
                  mobileViewMode === 'desktop'
                    ? 'bg-[#FF3B14] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop View</span>
              </button>
            </div>
          </div>

          {/* Main Card Viewport */}
          <div 
            className="preview-card relative w-full h-[470px] sm:h-[490px] md:h-[510px] rounded-2xl sm:rounded-3xl border border-slate-900/15 shadow-xl bg-white overflow-hidden select-none cursor-grab active:cursor-grabbing group"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {/* Sliding Track */}
            <div 
              className="flex w-full h-full transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {CARDS.map((card) => (
                <div 
                  key={card.id} 
                  className="w-full h-full shrink-0 p-2.5 sm:p-4 md:p-6 bg-[#D8EFE2] flex flex-col relative overflow-hidden"
                >
                  
                  {/* 1. DESKTOP SCREENS (>= md): The Exact Simultaneous Dual-Viewport Loved on Desktop */}
                  <div className="hidden md:flex w-full h-full relative">
                    {/* Desktop Browser-Frame Mockup */}
                    <div className="w-full h-full rounded-2xl bg-white border border-slate-900/15 shadow-md flex flex-col overflow-hidden relative">
                      
                      {/* Top Bar with Three Dots & URL */}
                      <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200/90 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                        </div>

                        {/* Mini URL Bar */}
                        <div className="px-3 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center gap-1.5 max-w-xs truncate shadow-2xs">
                          <span className="text-emerald-600 font-bold">https://</span>
                          <span className="truncate">{card.url}</span>
                        </div>

                        {/* Active Indicator Dot */}
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" title="Online" />
                      </div>

                      {/* Continuous Vertical Auto-Scroll with Right Padding for Corner Phone */}
                      <div className="w-full flex-1 overflow-hidden relative bg-white">
                        <div className="animate-site-seamless w-full pr-40 md:pr-48">
                          {card.renderDesktop()}
                          {card.renderDesktop()}
                        </div>
                      </div>

                    </div>

                    {/* Overlapping Phone Mockup in Bottom-Right Corner (Desktop only) */}
                    <div className="absolute bottom-5 right-6 z-20 w-[165px] aspect-[9/18.5] rounded-[24px] bg-slate-950 p-1.5 shadow-2xl border-2 border-slate-800/80 ring-1 ring-black/20 animate-phone-float pointer-events-none">
                      <div className="w-full h-full rounded-[20px] bg-white overflow-hidden relative flex flex-col">
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-full z-30" />
                        <div className="w-full h-full pt-3 overflow-hidden relative">
                          <div className="animate-site-seamless w-full">
                            {card.renderMobile()}
                            {card.renderMobile()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. MOBILE SCREENS (< md): Zero Overlap, Spacious & Beautifully Proportioned */}
                  <div className="flex md:hidden w-full h-full relative">
                    {mobileViewMode === 'mobile' ? (
                      /* Centered Smartphone Mockup with Dynamic Island and Seamless Scroll */
                      <div className="w-full h-full flex flex-col items-center justify-center p-1 sm:p-2 relative">
                        <div className="relative w-[230px] xs:w-[250px] sm:w-[270px] aspect-[9/18.5] max-h-[96%] rounded-[32px] sm:rounded-[36px] bg-slate-950 p-2 shadow-2xl border-2 border-slate-800 ring-1 ring-black/20 flex flex-col overflow-hidden">
                          {/* Inner Screen */}
                          <div className="w-full h-full rounded-[24px] sm:rounded-[28px] bg-white overflow-hidden relative flex flex-col">
                            {/* Dynamic Island */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-30" />

                            {/* Mini Mobile Safari Address Bar */}
                            <div className="pt-5 pb-1 px-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-center shrink-0 z-20">
                              <div className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[9px] font-mono text-slate-600 flex items-center gap-1 shadow-2xs">
                                <span className="text-emerald-600 font-bold">🔒</span>
                                <span className="truncate max-w-[140px]">{card.url}</span>
                              </div>
                            </div>

                            {/* Mobile Site Auto-Scrolling Interior */}
                            <div className="w-full flex-1 overflow-hidden relative bg-white">
                              <div className="animate-site-seamless w-full">
                                {card.renderMobile()}
                                {card.renderMobile()}
                              </div>
                            </div>

                            {/* Bottom Home Indicator */}
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/40 rounded-full z-30 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Full-Width Desktop Mockup on Mobile (No Phone Overlap!) */
                      <div className="w-full h-full rounded-xl bg-white border border-slate-900/15 shadow-md flex flex-col overflow-hidden relative">
                        <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                          </div>
                          <div className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-600 flex items-center gap-1 truncate max-w-[180px]">
                            <span className="text-emerald-600 font-bold">https://</span>
                            <span className="truncate">{card.url}</span>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <div className="w-full flex-1 overflow-hidden relative bg-white">
                          <div className="animate-site-seamless w-full">
                            {card.renderDesktop()}
                            {card.renderDesktop()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>

            {/* Desktop Navigation Floating Arrows (Hidden on mobile to never overlap screen content) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="hidden md:flex absolute -left-4 lg:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-30 border border-slate-900/10 hover:shadow-lg"
              aria-label="Previous preview"
            >
              <ChevronLeft className="w-5 h-5 text-slate-800" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="hidden md:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-30 border border-slate-900/10 hover:shadow-lg"
              aria-label="Next preview"
            >
              <ChevronRight className="w-5 h-5 text-slate-800" />
            </button>

          </div>

          {/* Mobile Navigation Bar: Prev / Dots / Next (Clean, spacious, zero overlap below card) */}
          <div className="flex md:hidden items-center justify-between gap-3 mt-4 px-2">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-slate-800 border border-slate-900/10 shadow-xs text-xs font-heading font-bold active:scale-95 transition-transform cursor-pointer"
              aria-label="Previous website"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1.5">
              {CARDS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 h-1.5 bg-[#FF3B14]'
                      : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to preview ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-slate-800 border border-slate-900/10 shadow-xs text-xs font-heading font-bold active:scale-95 transition-transform cursor-pointer"
              aria-label="Next website"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>

          {/* Desktop Carousel Pagination Dots */}
          <div className="hidden md:flex items-center justify-center gap-1.5 mt-4">
            {CARDS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-1.5 bg-[#FF3B14]'
                    : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to website preview ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
