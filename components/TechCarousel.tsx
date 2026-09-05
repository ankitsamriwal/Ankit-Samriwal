import React from 'react';

const ITEMS = [
  { name: "Dynamics 365", category: "enterprise" },
  { name: "Business Central", category: "enterprise" },
  { name: "Power Platform", category: "enterprise" },
  { name: "Copilot Studio", category: "enterprise" },
  { name: "Azure", category: "enterprise" },
  { name: "Claude", category: "builder" },
  { name: "Cursor", category: "builder" },
  { name: "Vercel", category: "builder" },
  { name: "GitHub", category: "builder" },
];

const TechCarousel: React.FC = () => {
  // Use 4 sets to ensure seamless loop with translateX(-50%)
  // Math: 4 sets total. -50% moves 2 sets. Set 3 starts exactly where Set 1 started.
  const list = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  const getStyles = (category: string) => {
    switch (category) {
      case 'enterprise': return 'bg-blue-500/10 border-blue-500/20 text-blue-300';
      case 'builder': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300';
      default: return 'bg-neutral-500/10 border-neutral-500/20 text-neutral-300';
    }
  };

  return (
    <div className="w-full overflow-hidden relative group py-6">
      <div className="flex justify-center gap-6 mb-2 mono text-[10px] uppercase tracking-[0.25em]">
        <span className="text-blue-300/70">Enterprise stack</span>
        <span className="text-emerald-300/70">Builder stack</span>
      </div>
      {/* Gradients for smooth fade effect on edges - Increased z-index and width */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none"></div>

      {/* Container for the scrolling track */}
      <div className="flex w-max gap-4 animate-scroll group-hover:[animation-play-state:paused]">
        {list.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className={`
              px-6 py-3 rounded-xl border backdrop-blur-md transition-all duration-300
              ${getStyles(item.category)}
              hover:bg-white/10 hover:border-white/30 hover:scale-105 cursor-default
              flex items-center justify-center
            `}
          >
            <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechCarousel;
