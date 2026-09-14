import { Essay, Prototype, SocialLink } from './types';

export const SUBSTACK_URL = "https://ankitsamriwal.substack.com";

export const ESSAYS: Essay[] = [
  {
    title: "From Software Developer to Agentic AI Engineer: A 9-Month Roadmap",
    subtitle: "A practical, staged path for working developers who want to build agentic systems rather than just prompt them.",
    url: "https://ankitsamriwal.substack.com/p/from-software-developer-to-agentic",
    readTime: "5 min read"
  },
  {
    title: "The Agent-Native Organization Will Not Look Like Today's Company",
    subtitle: "What happens to org charts, governance, and delivery models when agents do real work inside the enterprise.",
    url: "https://ankitsamriwal.substack.com/p/the-agent-native-organization-will",
    readTime: "4 min read"
  }
];

export const PROTOTYPES: Prototype[] = [
  {
    name: "Decaf",
    tagline: "Reduce, don't quit",
    description: "Caffeine de-addiction without the guilt: track every milligram, follow a taper plan, earn grace days, and graduate when the habit no longer runs the day.",
    image: "/projects/decaf.png",
    url: "https://cafdetox.vercel.app",
    stack: ["mg tracking", "Taper plans", "Cloud sync + nudges"],
    status: "Live"
  },
  {
    name: "Mailstorm",
    tagline: "The agent-first mailbox",
    description: "Your agent reads Gmail first and hands you obligations, not messages - a day shape each morning, the decisions only you can make, and a commitment graph of what you owe and what is owed to you.",
    image: "/projects/mailstorm.png",
    url: "https://mailstorm-v1.vercel.app",
    stack: ["Gmail API", "Agent read", "Web app"],
    status: "Live"
  },
  {
    name: "DawaiYaad",
    tagline: "Medicine reminders that don't give up",
    description: "Dose reminders that buzz again until you tap taken, with snooze on your terms, a family view and a full dose record. PWA plus a signed Android APK on /get.",
    image: "/projects/dawaiyaad.png",
    url: "https://dawaiyaad-lemon.vercel.app",
    stack: ["React", "Persistent reminders", "PWA + Android APK"],
    status: "Live"
  },
  {
    name: "WordByte",
    tagline: "An AI vocabulary galaxy for kids",
    description: "Explore 482 terms across AI, data, coding, agents, safety and careers. An age slicer adapts the dictionary from first concepts at 5-7 to the full AI lexicon at 14+.",
    image: "/projects/wordbyte.png",
    url: "https://wordbyte.vercel.app",
    repoUrl: "https://github.com/ankitsamriwal/wordbyte",
    stack: ["Three.js", "Age-adaptive learning", "PWA"],
    status: "Live"
  },
  {
    name: "Unsplurge",
    tagline: "Price purchases in work-hours",
    description: "See what a purchase costs in hours of your life before you buy. Scan it, pause the impulse, then plan for it - with a Season tab for festive spending.",
    image: "/projects/unsplurge.png",
    url: "https://unsplurge.vercel.app",
    stack: ["React", "On-device storage", "PWA + Android APK"],
    status: "Live"
  },
  {
    name: "Baby Chronicles",
    tagline: "Pregnancy to first birthday",
    description: "Capture notes, photos, scans and milestones from pregnancy through the first year. Private by default, with timelines, medical records and keepsakes kept on-device.",
    image: "/projects/baby-chronicles.png",
    url: "https://babychronicles.vercel.app",
    stack: ["React", "On-device storage", "PWA + Android APK"],
    status: "Live"
  },
  {
    name: "What Should I",
    tagline: "Wear, eat or watch",
    description: "One place for three daily decisions: what to wear, what to eat and what to watch. Each tab keeps its own journey, preferences and picks.",
    image: "/projects/what-should-i.png",
    url: "https://whatshouldi.vercel.app",
    stack: ["React", "Weather + TMDB", "PWA + Android APK"],
    status: "Live"
  },
  {
    name: "Surya Alarm",
    tagline: "An alarm you earn the right to stop",
    description: "The alarm stops only after 12 Surya Namaskars. Camera pose detection counts each round, with a tap fallback when the camera is unavailable.",
    image: "/projects/surya-alarm.png",
    url: "https://surya-alarm.vercel.app",
    stack: ["React", "Camera pose detection", "PWA + Android APK"],
    status: "Live"
  },
  {
    name: "Wonderbyte",
    tagline: "Data and AI for kids",
    description: "Kids learn Data and AI by teaching a robot, testing ideas and fixing mistakes. Includes 95 words, themed packs and Story Corner, without ads or dark patterns.",
    image: "/projects/wonderbyte.png",
    url: "https://wonderbyte-pearl.vercel.app",
    stack: ["React", "Offline-first", "PWA"],
    status: "Live"
  },
  {
    name: "Breathtaking Beer",
    tagline: "Breath-hold beer-pour challenge",
    description: "Hold your breath and the glass fills. Stop, see your rank and try again - a small browser game with a safety gate and no signup.",
    image: "/projects/breathtaking-beer.png",
    url: "https://breathtakingbeer.vercel.app",
    repoUrl: "https://github.com/ankitsamriwal/breath-hold-beer",
    stack: ["Vanilla JS", "Canvas", "Web Audio API"],
    status: "Live game"
  }
];


export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ankitsamriwal",
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
  },
  {
    platform: "X / Twitter",
    url: "https://x.com/ankitsamriwal",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  },
  {
    platform: "GitHub",
    url: "https://github.com/ankitsamriwal",
    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  },
  {
    platform: "Substack",
    url: "https://ankitsamriwal.substack.com/",
    icon: "M3 5h18v2H3V5zm0 4h18v2H3V9zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4 9-5 9 5v2H3v-2z"
  }
];
