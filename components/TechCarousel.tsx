
import React from 'react';

const ITEMS = [
  { name: "TypeScript", category: "tech" },
  { name: "React", category: "tech" },
  { name: "Flutter", category: "tech" },
  { name: "Node.js", category: "tech" },
  { name: "Replit", category: "platform" },
  { name: "Vercel", category: "platform" },
  { name: "Google AI Studio", category: "platform" },
  { name: "Claude", category: "tool" },
  { name: "Cursor", category: "tool" },
  { name: "OpenAI", category: "model" },
  { name: "Google Gemini", category: "model" },
];

const TechCarousel: React.FC = () => {
  // Use 4 sets to ensure seamless loop with translateX(-50%)
  // Math: 4 sets total. -50% moves 2 sets. Set 3 starts exactly where Set 1 started.
  const list = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  const getStyles = (category: string) => {
    switch (category) {
      case 'tech': return 'bg-blue-500/10 border-blue-500/20 text-blue-300';
      case 'platform': return 'bg-purple-500/10 border-purple-500/20 text-purple-300';
      case 'tool': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300';
      case 'model': return 'bg-amber-500/10 border-amber-500/20 text-amber-300';
      default: return 'bg-neutral-500/10 border-neutral-500/20 text-neutral-300';
    }
  };

  return (
    <div className="w-full overflow-hidden relative group py-6">
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
