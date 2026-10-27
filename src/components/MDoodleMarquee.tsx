import React from 'react';

// Collection of hand-drawn artistic "M" SVG doodles in different expressive styles
export const MDoodleIcons = {
  brush: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 38V12L24 28L40 12V38" strokeWidth="5.5" />
    </svg>
  ),
  bubble: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill={color}>
      <path d="M10 40C7.8 40 6 38.2 6 36V14C6 11.8 7.8 10 10 10C11.5 10 12.8 10.8 13.5 12L24 25.5L34.5 12C35.2 10.8 36.5 10 38 10C40.2 10 42 11.8 42 14V36C42 38.2 40.2 40 38 40C35.8 40 34 38.2 34 36V22L26 32.5C25.2 33.5 23.8 34 22.5 33.8C21.4 33.5 20.6 32.7 20 31.8L14 22V36C14 38.2 12.2 40 10 40Z" />
    </svg>
  ),
  serif: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="square">
      <path d="M6 38H14M6 10H14M34 38H42M34 10H42M10 10V38M10 10L24 34L38 10M38 10V38" />
    </svg>
  ),
  curly: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 34C8 26 10 14 14 12C17 10 18 20 20 28C22 18 25 10 29 12C33 14 34 26 36 34C37 38 41 38 42 34" />
    </svg>
  ),
  striped: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill={color}>
      <path d="M8 10H12V38H8V10ZM16 14H20V38H16V14ZM24 20H28V38H24V20ZM32 14H36V38H32V14ZM40 10H44V38H40V10Z" />
    </svg>
  ),
  loop: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round">
      <path d="M10 38C8 24 10 10 16 10C22 10 22 36 24 36C26 36 26 10 32 10C38 10 40 24 38 38" />
    </svg>
  ),
  geometric: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="4">
      <path d="M8 38L8 10L24 26L40 10L40 38" />
      <path d="M8 10L40 38" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  ),
  handdrawn: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 36C9 28 11 18 12 12C13 14 18 26 23 30C26 24 31 16 35 12C36 18 38 28 41 36" />
      <path d="M12 14C16 22 20 28 24 30" strokeWidth="2" />
    </svg>
  ),
  stencil: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill={color}>
      <path d="M6 38V12L18 28V38H14V22L8 14V38H6ZM42 38V12L30 28V38H34V22L40 14V38H42ZM22 30L24 33L26 30V38H22V30Z" />
    </svg>
  ),
  ribbon: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round">
      <path d="M10 38C10 20 14 10 18 10C22 10 22 30 24 30C26 30 26 10 30 10C34 10 38 20 38 38" />
      <circle cx="24" cy="36" r="3" fill={color} />
    </svg>
  ),
  butterfly: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 38L24 10L36 38L24 28L12 38Z" />
      <path d="M12 10L36 10" strokeWidth="2" />
    </svg>
  ),
  tripleDrop: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill={color}>
      <path d="M12 14C12 10 15 8 16 12C18 20 18 36 12 36C8 36 8 20 12 14Z" />
      <path d="M24 18C24 14 27 12 28 16C30 24 30 36 24 36C20 36 20 24 24 18Z" />
      <path d="M36 14C36 10 39 8 40 12C42 20 42 36 36 36C32 36 32 20 36 14Z" />
    </svg>
  ),
  wireframe: ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2">
      <path d="M6 38L14 12L24 28L34 12L42 38" />
      <line x1="6" y1="38" x2="42" y2="38" />
      <line x1="14" y1="12" x2="34" y2="12" strokeDasharray="2 2" />
    </svg>
  ),
};

export const MDoodleMarquee: React.FC<{
  bgColor?: string;
  textColor?: string;
  className?: string;
}> = ({
  bgColor = "bg-transparent",
  textColor = "text-black",
  className = "",
}) => {
  const doodleKeys = Object.keys(MDoodleIcons) as Array<keyof typeof MDoodleIcons>;

  return (
    <div className={`w-full overflow-hidden select-none py-3 ${bgColor} ${className}`}>
      <div className="flex items-center gap-10 whitespace-nowrap animate-marquee">
        {[...doodleKeys, ...doodleKeys, ...doodleKeys, ...doodleKeys].map((key, idx) => {
          const Icon = MDoodleIcons[key];
          return (
            <div key={`${key}-${idx}`} className={`inline-flex items-center justify-center ${textColor} opacity-85 hover:opacity-100 hover:scale-125 transition-transform duration-200 cursor-pointer`}>
              <Icon className="w-9 h-9 sm:w-11 sm:h-11" color="currentColor" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
