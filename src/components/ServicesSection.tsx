import React from 'react';
import { motion } from 'motion/react';
import { 
  X,
  Heart,
  Bookmark,
  MessageSquare,
  MessageCircle,
  UserPlus,
  Share2,
  Bell,
  Star,
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigateToCreatives?: () => void;
  onOpenQuestionnaire?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = () => {
  return (
    <section 
      id="creatives" 
      className="py-14 sm:py-20 md:py-24 bg-gradient-to-b from-[#FFF5EC] via-[#FDF0F6] to-[#EEFAF7] text-slate-900 relative overflow-hidden border-t border-slate-900/10 scroll-mt-[54px] select-none cursor-default"
    >
      {/* Anchor for backward-compatible #services links */}
      <div id="services" className="absolute -top-[54px] left-0 pointer-events-none" />
      {/* Dynamic Multi-Color Ambient Luxury Glow Blobs (Creative Section Welcome Wash) */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden -z-0">
        {/* Top-Left Sunset Radiant Coral/Peach Glow */}
        <div className="absolute -top-12 -left-16 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-[#FF6B4A]/35 via-[#FFA07A]/28 to-transparent blur-3xl pointer-events-none transform-gpu" />
        
        {/* Top Center-Right Warm Golden Sunlight Glow */}
        <div className="absolute -top-10 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-b from-[#FBBF24]/32 via-[#FCD34D]/20 to-transparent blur-3xl pointer-events-none transform-gpu" />

        {/* Right Tropical Emerald / Mint Glow */}
        <div className="absolute top-1/4 -right-16 w-[580px] h-[580px] rounded-full bg-gradient-to-bl from-[#00D2B4]/32 via-[#2DD4BF]/24 to-transparent blur-3xl pointer-events-none transform-gpu" />
        
        {/* Bottom Center Creative Lavender / Violet Glow */}
        <div className="absolute -bottom-16 left-1/4 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#A855F7]/25 via-[#EC4899]/20 to-transparent blur-3xl pointer-events-none transform-gpu" />

        {/* Bottom-Right Soft Rose Petal Glow */}
        <div className="absolute -bottom-10 -right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-[#FB7185]/24 via-[#FDA4AF]/18 to-transparent blur-3xl pointer-events-none transform-gpu" />

        {/* Tactile Designer Radial Dot Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.42]"
          style={{
            backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.12) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* ================= Decorative Creative Accents ================= */}
        {/* Top-Left Coral Sparkle Star */}
        <div className="absolute top-8 sm:top-12 left-8 sm:left-14 text-[#FF6B4A] opacity-80 pointer-events-none">
          <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        {/* Top-Left Orange Plus Symbol */}
        <div className="absolute top-6 sm:top-8 left-24 sm:left-36 text-[#FF5722] font-black text-xl font-mono opacity-70 pointer-events-none">
          +
        </div>

        {/* Top-Left Peach Squiggle Ribbon */}
        <svg className="absolute top-22 sm:top-24 left-10 sm:left-16 w-16 sm:w-20 h-5 text-[#F97316] opacity-60 pointer-events-none" viewBox="0 0 100 25" fill="none">
          <path d="M5,15 Q25,0 45,15 T85,15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Top-Right Golden Amber Sparkle Star */}
        <div className="absolute top-10 sm:top-14 right-10 sm:right-16 text-[#F59E0B] opacity-85 pointer-events-none">
          <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        {/* Top-Right Teal Plus Symbol */}
        <div className="absolute top-14 sm:top-18 right-28 sm:right-40 text-[#00A887] font-black text-xl font-mono opacity-75 pointer-events-none">
          +
        </div>

        {/* Top-Right Mint Wavy Ribbon */}
        <svg className="absolute top-20 sm:top-24 right-8 sm:right-14 w-18 sm:w-24 h-5 text-[#00B48C] opacity-60 pointer-events-none" viewBox="0 0 100 25" fill="none">
          <path d="M5,15 Q25,0 45,15 T85,15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Bottom-Left Radiant Cyan Dot Cluster */}
        <div 
          className="absolute bottom-8 left-8 w-16 h-16 opacity-35 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#06B6D4 1.5px, transparent 1.5px)',
            backgroundSize: '10px 10px',
          }}
        />

        {/* Bottom-Right Violet Sparkle Star */}
        <div className="absolute bottom-10 right-12 text-[#A855F7] opacity-75 pointer-events-none">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-2 sm:py-4">
        
        {/* Viewfinder Crop Marks in the Section Corners */}
        <div className="absolute -top-2 left-4 sm:left-6 w-5 h-5 border-t-2 border-l-2 border-slate-300/80 pointer-events-none" />
        <div className="absolute -top-2 right-4 sm:right-6 w-5 h-5 border-t-2 border-r-2 border-slate-300/80 pointer-events-none" />
        <div className="absolute -bottom-2 left-4 sm:left-6 w-5 h-5 border-b-2 border-l-2 border-slate-300/80 pointer-events-none" />
        <div className="absolute -bottom-2 right-4 sm:right-6 w-5 h-5 border-b-2 border-r-2 border-slate-300/80 pointer-events-none" />

        {/* ========================================================
            SECTION HEADING
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-heading font-black tracking-tight text-slate-950 leading-[1.14]">
            <span>Creative That Captures. </span>
            <span className="font-editorial-italic font-normal italic text-[#D44A32] relative inline-block whitespace-nowrap mt-1 sm:mt-0">
              Marketing That Converts.
              {/* Subtle hand-drawn curved swoosh underline */}
              <svg 
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#D44A32]/40 pointer-events-none" 
                viewBox="0 0 280 18" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M4,10 Q 70,2 140,10 T 276,10" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </span>
          </h2>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-[16.5px] text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
            From studio-quality video production to creator-led campaigns, we bring your entire growth journey under one roof.
          </p>
        </div>

        {/* ========================================================
            HERO COMPOSITION: 3 COLUMNS SYMMETRICALLY ALIGNED
            Left: In-house Production
            Center: Venn Discs + Realistic iPhone Slideshow + Social Badges
            Right: Influencer Marketing
           ======================================================== */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">
          
          {/* ======================================================
              LEFT COLUMN: IN-HOUSE PRODUCTION
             ====================================================== */}
          <div className="w-full lg:w-[320px] xl:w-[340px] flex flex-col justify-between h-auto lg:h-[480px] order-2 lg:order-1 select-none">
            <div>
              {/* Pill Tag (Aligned horizontally with Right Column Tag) */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#FFD9C7] text-[#C4461B] text-[11px] font-mono font-medium tracking-wide shadow-2xs mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                <span>In-house studio</span>
              </div>

              {/* Heading */}
              <h3 className="text-2xl sm:text-3xl md:text-[31px] font-heading font-extrabold text-slate-950 tracking-tight leading-[1.18]">
                <span>In-house production, </span>
                <span className="font-editorial-italic font-normal italic text-[#D44A32] block mt-0.5">
                  at a fraction of the cost
                </span>
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed mt-3.5 sm:mt-4 font-normal max-w-sm">
                We script, shoot, and edit high-retention videos built from a performance marketing perspective, because we know what actually works. Production stays in-house, so you can test different messaging without burning your budget.
              </p>
            </div>

            {/* Spacer to maintain perfect vertical column symmetry with Right column */}
            <div className="hidden lg:block h-14" />
          </div>

          {/* ======================================================
              CENTER COLUMN: VENN DIAGRAM + REALISTIC IPHONE SLIDESHOW
             ====================================================== */}
          <div className="relative w-full max-w-[500px] lg:w-[500px] xl:w-[520px] h-[500px] sm:h-[530px] flex items-center justify-center order-1 lg:order-2 shrink-0 my-2 lg:my-0 select-none">
            
            {/* --- 1. Pastel Venn-Diagram Intersecting Discs --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              
              {/* Large Outer Dotted Orbit Ellipse */}
              <div className="absolute w-[410px] sm:w-[460px] md:w-[480px] h-[410px] sm:h-[460px] md:h-[480px] rounded-full border border-dashed border-slate-300/80" />

              {/* Left Pastel Peach Circle (Vibrant Gradient Tint) */}
              <div className="absolute -translate-x-14 sm:-translate-x-18 w-[270px] sm:w-[310px] md:w-[330px] h-[270px] sm:h-[310px] md:h-[330px] rounded-full bg-gradient-to-br from-[#FFE8DC] via-[#FCD7C6] to-[#FFC2A8] opacity-95 shadow-[0_18px_40px_rgba(255,107,74,0.20)] flex items-center justify-center">
                <div className="w-[88%] h-[88%] rounded-full border border-dashed border-[#F0A98F]/60" />
              </div>

              {/* Right Pastel Mint Circle (Vibrant Gradient Tint) */}
              <div className="absolute translate-x-14 sm:translate-x-18 w-[270px] sm:w-[310px] md:w-[330px] h-[270px] sm:h-[310px] md:h-[330px] rounded-full bg-gradient-to-br from-[#DAF5EE] via-[#C8EFE7] to-[#A7E8D8] opacity-95 shadow-[0_18px_40px_rgba(16,185,129,0.18)] flex items-center justify-center">
                <div className="w-[88%] h-[88%] rounded-full border border-dashed border-[#78CBB7]/60" />
              </div>
            </div>

            {/* --- 2. 3D HORSESHOE MAGNET WITH FLOATING ENGAGEMENT BADGES --- */}
            <div className="relative z-20 w-[300px] sm:w-[340px] md:w-[360px] h-[300px] sm:h-[340px] md:h-[360px] flex items-center justify-center pointer-events-none select-none">
              
              {/* Concentric Dashed Magnetic Orbit Rings inside Venn Lens Intersection */}
              <div className="absolute w-[210px] sm:w-[240px] h-[210px] sm:h-[240px] rounded-full border border-dashed border-[#00A887]/35 pointer-events-none" />
              <div className="absolute w-[270px] sm:w-[305px] h-[270px] sm:h-[305px] rounded-full border border-dashed border-[#FF7A50]/25 pointer-events-none" />

              {/* Orbit Accent Particles */}
              <div className="absolute top-12 left-22 w-2 h-2 rounded-full bg-[#FF7A50]/65" />
              <div className="absolute top-14 right-20 w-2 h-2 rounded-full bg-[#00A887]/65" />
              <div className="absolute bottom-18 left-20 w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/65" />
              <div className="absolute bottom-16 right-22 w-2 h-2 rounded-full bg-[#F59E0B]/65" />

              {/* 3D Dual-Tone Horseshoe Magnet with Soft Hover Float */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-8, -6, -8] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative select-none filter drop-shadow-[0_24px_38px_rgba(15,23,42,0.22)]"
              >
                <svg className="w-[185px] sm:w-[215px] md:w-[230px] h-[185px] sm:h-[215px] md:h-[230px]" viewBox="0 0 240 240" fill="none">
                  <defs>
                    {/* Coral/Orange Arm Gradient */}
                    <linearGradient id="coral-arm-grad" x1="45" y1="50" x2="120" y2="185" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF6E4A" />
                      <stop offset="45%" stopColor="#FF5722" />
                      <stop offset="100%" stopColor="#E64A19" />
                    </linearGradient>

                    {/* Teal/Emerald Arm Gradient */}
                    <linearGradient id="teal-arm-grad" x1="195" y1="50" x2="120" y2="185" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#00D2B4" />
                      <stop offset="45%" stopColor="#00A887" />
                      <stop offset="100%" stopColor="#00897B" />
                    </linearGradient>

                    {/* Metallic Silver Pole Cap Gradient */}
                    <linearGradient id="silver-pole-cap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="35%" stopColor="#F8FAFC" />
                      <stop offset="70%" stopColor="#CBD5E1" />
                      <stop offset="100%" stopColor="#94A3B8" />
                    </linearGradient>

                    {/* Ground Soft Glow Filter */}
                    <filter id="shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" />
                    </filter>
                  </defs>

                  {/* Ground Shadow Ellipse */}
                  <ellipse cx="120" cy="204" rx="68" ry="11" fill="rgba(0, 168, 135, 0.22)" filter="url(#shadow-blur)" />

                  {/* Left Arm: Coral / Orange */}
                  <path 
                    d="M 44,50 L 44,120 C 44,158 75,185 120,185 L 120,147 C 94,147 80,134 80,118 L 80,50 Z" 
                    fill="url(#coral-arm-grad)" 
                  />

                  {/* Right Arm: Teal / Emerald */}
                  <path 
                    d="M 196,50 L 196,120 C 196,158 165,185 120,185 L 120,147 C 146,147 160,134 160,118 L 160,50 Z" 
                    fill="url(#teal-arm-grad)" 
                  />

                  {/* Center Joint Seam */}
                  <line x1="120" y1="147" x2="120" y2="185" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />

                  {/* Left Pole Cap (Silver) */}
                  <g transform="translate(43, 24)">
                    <rect x="0" y="0" width="38" height="27" rx="5" fill="url(#silver-pole-cap)" stroke="#94A3B8" strokeWidth="0.8" />
                    <line x1="0" y1="26" x2="38" y2="26" stroke="#64748B" strokeWidth="1.2" />
                    {/* Specular Glare Highlight */}
                    <rect x="3" y="2" width="8" height="22" rx="2" fill="#FFFFFF" fillOpacity="0.75" />
                  </g>

                  {/* Right Pole Cap (Silver) */}
                  <g transform="translate(159, 24)">
                    <rect x="0" y="0" width="38" height="27" rx="5" fill="url(#silver-pole-cap)" stroke="#94A3B8" strokeWidth="0.8" />
                    <line x1="0" y1="26" x2="38" y2="26" stroke="#64748B" strokeWidth="1.2" />
                    {/* Specular Glare Highlight */}
                    <rect x="3" y="2" width="8" height="22" rx="2" fill="#FFFFFF" fillOpacity="0.75" />
                  </g>

                  {/* 3D Tubular Plastic Specular Edge Highlights */}
                  {/* Outer Left Curve Highlight */}
                  <path 
                    d="M 48,52 L 48,118 C 48,150 76,177 116,180" 
                    stroke="#FFFFFF" 
                    strokeWidth="2.8" 
                    strokeLinecap="round" 
                    strokeOpacity="0.52" 
                    fill="none" 
                  />
                  {/* Outer Right Curve Highlight */}
                  <path 
                    d="M 192,52 L 192,118 C 192,150 164,177 124,180" 
                    stroke="#FFFFFF" 
                    strokeWidth="2.8" 
                    strokeLinecap="round" 
                    strokeOpacity="0.42" 
                    fill="none" 
                  />
                  {/* Inner Left Curve Highlight */}
                  <path 
                    d="M 76,52 L 76,116 C 76,132 94,144 116,145" 
                    stroke="#FFFFFF" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeOpacity="0.32" 
                    fill="none" 
                  />
                </svg>
              </motion.div>

              {/* --- 9 Floating Engagement Badges (Matching Reference) --- */}
              {/* 1. Top-Left: Red Heart */}
              <motion.div 
                animate={{ y: [0, -3.5, 0] }} 
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute top-6 left-11 sm:left-14 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-rose-500 pointer-events-none"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-500" />
              </motion.div>

              {/* 2. Top-Center: Orange Bookmark */}
              <motion.div 
                animate={{ y: [0, -4.5, 0] }} 
                transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#FF5722] pointer-events-none"
              >
                <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FF5722]" />
              </motion.div>

              {/* 3. Top-Right: Teal Chat Bubble */}
              <motion.div 
                animate={{ y: [0, 3.5, 0] }} 
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute top-8 right-11 sm:right-14 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#00A887] pointer-events-none"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#00A887]" />
              </motion.div>

              {/* 4. Mid-Left: Rose Heart */}
              <motion.div 
                animate={{ y: [0, -3, 0] }} 
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute top-26 left-3 sm:left-6 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.10)] border border-slate-100 flex items-center justify-center text-rose-400 pointer-events-none"
              >
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-400" />
              </motion.div>

              {/* 5. Mid-Right: Purple Chat Bubble */}
              <motion.div 
                animate={{ y: [0, -3.5, 0] }} 
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute top-28 right-3 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-purple-600 pointer-events-none"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-purple-600" />
              </motion.div>

              {/* 6. Lower-Left: Emerald User+ */}
              <motion.div 
                animate={{ y: [0, 2.5, 0] }} 
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute bottom-14 left-7 sm:left-9 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#00A887] pointer-events-none"
              >
                <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              </motion.div>

              {/* 7. Lower-Right: Indigo Share */}
              <motion.div 
                animate={{ y: [0, -2.5, 0] }} 
                transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute bottom-16 right-7 sm:right-9 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-indigo-600 pointer-events-none"
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              </motion.div>

              {/* 8. Bottom-Center: Amber Bell */}
              <motion.div 
                animate={{ y: [0, 3, 0] }} 
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute bottom-1 left-1/2 -translate-x-6 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-amber-500 pointer-events-none"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500" />
              </motion.div>

              {/* 9. Bottom-Right: Amber Star */}
              <motion.div 
                animate={{ y: [0, -2.5, 0] }} 
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute bottom-3 right-16 sm:right-20 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.10)] border border-slate-100 flex items-center justify-center text-amber-400 pointer-events-none"
              >
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
              </motion.div>

            </div>

            {/* --- 3. Clean Platform Badges Around Phone --- */}
            {/* Top-Left: "✖" Dark Circle */}
            <motion.div 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-2 left-20 sm:left-24 z-30 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg border border-slate-700/60"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.div>

            {/* Top-Left: "Budget-friendly" Pill */}
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-14 left-8 sm:left-12 z-30 px-3 py-1 rounded-full bg-[#FDE08B] text-[#7A5300] text-[10px] sm:text-[11px] font-bold shadow-md border border-[#F5D065]"
            >
              Budget-friendly
            </motion.div>

            {/* Top-Right: YouTube Icon Badge */}
            <motion.div 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 right-20 sm:right-24 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg text-white"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </motion.div>

            {/* Mid-Right: Snapchat Icon Badge */}
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-36 right-3 sm:right-6 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFFC00] border border-amber-300 flex items-center justify-center shadow-lg"
              title="Snapchat"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white stroke-black stroke-[1.1] drop-shadow-xs">
                <path d="M12 2.5c-3.1 0-5.1 2.3-5.1 5.2 0 .5.1 1.2.3 1.7-.5.1-1.2.3-1.4.9-.2.4-.1.8.2 1.1.4.4 1 .5 1.5.5.2.6.5 1.1.9 1.5-1.1.3-2.6.9-2.9 2.2-.1.5.2 1.1.7 1.4.7.4 1.6.1 2.4.1.6 0 1.1-.1 1.7-.1.3 0 .6.1.9.2.4.2.8.7 1.4.7s1-.5 1.4-.7c.3-.1.6-.2.9-.2.6 0 1.1.1 1.7.1.8 0 1.7.3 2.4-.1.5-.3.8-.9.7-1.4-.3-1.3-1.8-1.9-2.9-2.2.4-.4.7-.9.9-1.5.5 0 1.1-.1 1.5-.5.3-.3.4-.7.2-1.1-.2-.6-.9-.8-1.4-.9.2-.5.3-1.2.3-1.7 0-2.9-2-5.2-5.1-5.2z" />
              </svg>
            </motion.div>

            {/* Lower-Right: Instagram Icon Badge */}
            <motion.div 
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-24 sm:bottom-28 right-5 sm:right-8 z-30 w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] flex items-center justify-center shadow-lg text-white"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.div>

            {/* Bottom-Right: Facebook Icon Badge */}
            <motion.div 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-6 right-16 sm:right-20 z-30 w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center shadow-lg text-white"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.div>

            {/* Direct Bottom: LinkedIn Icon Badge (Centered right under phone) */}
            <motion.div 
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 3.7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-7 h-7 rounded-lg bg-[#0A66C2] flex items-center justify-center shadow-lg text-white"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </motion.div>

          </div>

          {/* ======================================================
              RIGHT COLUMN: INFLUENCER MARKETING
             ====================================================== */}
          <div className="w-full lg:w-[320px] xl:w-[340px] flex flex-col justify-between h-auto lg:h-[480px] order-3 select-none">
            <div>
              {/* Pill Tag (Aligned horizontally with Left Column Tag) */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F3] border border-[#BCE8DE] text-[#0D6D5F] text-[11px] font-mono font-medium tracking-wide shadow-2xs mb-4">
                <span className="w-2 h-2 rounded-full bg-[#00A887]" />
                <span>Creator network</span>
              </div>

              {/* Heading */}
              <h3 className="text-2xl sm:text-3xl md:text-[31px] font-heading font-extrabold text-slate-950 tracking-tight leading-[1.18]">
                <span>Influencer </span>
                <span className="font-editorial-italic font-normal italic text-[#137A6D] block mt-0.5">
                  Marketing
                </span>
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed mt-3.5 sm:mt-4 font-normal max-w-sm">
                A familiar face helps your audience connect with your brand and trust it faster. We match you with influencers who fit your brand and genuinely resonate with your audience.
              </p>
            </div>

            {/* Spacer to maintain perfect vertical column symmetry with Left column */}
            <div className="hidden lg:block h-14" />
          </div>

        </div>

      </div>
    </section>
  );
};
