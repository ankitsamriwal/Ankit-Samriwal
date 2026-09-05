import React from 'react';

const ITEMS = [
  { name: "Flutter", icon: "/icons/flutter.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "GitHub Copilot", icon: "/icons/github-copilot.svg" },
  { name: "Azure", icon: "/icons/azure.svg" },
  { name: "AWS S3", icon: "/icons/aws-s3.svg" },
  { name: "AWS Bedrock", icon: "/icons/aws-bedrock.svg" },
  { name: "Azure Fabric", icon: "/icons/azure-fabric.svg" },
];

const TechCarousel: React.FC = () => {
  // 4 sets so translateX(-50%) lands exactly where set 1 began = seamless loop
  const list = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="w-full overflow-hidden relative group py-6">
      {/* Gradients for smooth fade effect on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none"></div>

      <div className="flex w-max gap-4 animate-scroll group-hover:[animation-play-state:paused]">
        {list.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="
              px-6 py-4 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md
              transition-all duration-300
              hover:bg-white/10 hover:border-white/30 hover:scale-105 cursor-default
              flex items-center gap-3
            "
          >
            <img src={item.icon} alt={`${item.name} logo`} className="w-6 h-6" loading="lazy" />
            <span className="text-sm font-semibold tracking-wide whitespace-nowrap text-neutral-200">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechCarousel;
