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
    name: "Hold My Beer",
    tagline: "Breath-hold beer-pour challenge",
    description: "Hold your breath and the beer pours - release, and your fill level at the 60-second cap is your rank, from Below Average up to Superhuman across 8 tiers. Hyper-real glass rendered on canvas, pour-only ASMR audio, and a first-visit safety gate. Testing well with friends; a paid leaderboard tier is on the drawing board.",
    url: "https://breathtakingbeer.vercel.app",
    repoUrl: "https://github.com/ankitsamriwal/breath-hold-beer",
    stack: ["Vanilla JS", "Canvas", "Web Audio API", "Vercel"],
    status: "Live game"
  },
  {
    name: "Divine Hub",
    tagline: "Hindu prayers, aartis and japa counter",
    description: "A one-stop hub for sacred Hindu prayers: aartis, chalisas, stotrams and mantras with Devanagari text, transliteration and full English meaning. Audio narration, a japa mala counter, and an on-device divine guide that answers questions about the prayers - with an optional Gemini upgrade for deeper answers. Fully static, works without a key.",
    url: "https://roadtodivinity.vercel.app",
    repoUrl: "https://github.com/ankitsamriwal/divine-hub",
    stack: ["Static HTML/CSS/JS", "Web Speech API", "Gemini API via Cloudflare Worker", "Vercel"],
    status: "Live"
  },
  {
    name: "Gurgaon Leaderboard",
    tagline: "Pay-to-rank public leaderboard",
    description: "A live pay-to-rank ladder for Gurgaon real estate projects. Bidders pay to top the board: taking #1 means outbidding the leader's cumulative total by just Rs 1. RERA number on every card, daily and overall topper badges, and a ticking leader-since clock. Payments run in mock mode behind an env flag, with Razorpay checkout wired for when it goes live.",
    url: "https://web-production-9eb47.up.railway.app/",
    repoUrl: "https://github.com/ankitsamriwal/gurgaon-leaderboard",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "React", "Razorpay (mock)"],
    status: "Live demo"
  },
  {
    name: "RFP Proposal Pipeline",
    tagline: "Multi-agent RFP response automation",
    description: "A prototype of the pipeline I use to think about presales automation: ingest an RFP, then produce an executive summary, gap analysis, clarification-question log, risk flags, a compliance matrix, and a proposal skeleton - with per-stage audit manifests and human-in-the-loop gates. Pluggable LLM providers with a deterministic mock mode.",
    url: "https://github.com/ankitsamriwal/rfp-proposal-pipeline",
    repoUrl: "https://github.com/ankitsamriwal/rfp-proposal-pipeline",
    stack: ["Python", "CLI", "OpenAI / Anthropic / Ollama", "Mock mode"],
    status: "Open-source prototype"
  },
  {
    name: "Wonderbyte",
    tagline: "AI concepts for kids 6-12",
    description: "Kids teach Bit the robot how AI works instead of getting lectured - train him, watch him fail on one-sided data, fix him, and learn when not to trust him. Playable islands covering classifiers, biased data and AI-in-the-wild, a Brain Book of concept cards, and a parent dashboard. No ads, no streaks, no dark patterns: parents buy, kids learn.",
    url: "https://wonderbyte-pearl.vercel.app",
    stack: ["React", "PWA", "Offline-first", "Vercel"],
    status: "Live"
  },
  {
    name: "Baby Chronicles",
    tagline: "Pregnancy-to-first-birthday keepsake",
    description: "Parents capture notes, photos, scans, reports and milestones; the app turns them into a journey viewed by day, week, month, trimester or year. Cinematic Story So Far film, sealed letters to the baby, a PIN-locked medical vault, 40-week guidance, and a keepsake film for the first birthday. All data stays on-device - zero servers.",
    url: "https://babychronicles.vercel.app",
    stack: ["React", "On-device storage", "PWA + Android APK", "Vercel"],
    status: "Live"
  },
  {
    name: "Aaj Kya Pehnu",
    tagline: "Your closet, styled by the weather",
    description: "Photograph your closet once and the app does the daily thinking: outfit picks styled around live weather, the occasion and the time of day, plus the whole week planned ahead. Wardrobe insights surface what you actually wear - cost per wear, items aging out, and what is just taking up rail space. Bulk add gets a full closet in fast. Everything stays on-device.",
    url: "https://aajkyapehnu.vercel.app",
    stack: ["React", "Live weather styling", "On-device storage", "PWA + Android APK", "Vercel"],
    status: "Live"
  },
  {
    name: "Unsplurge",
    tagline: "Every price, in hours of your life",
    description: "Point it at any price - barcode scan, screenshot OCR, or typed in - and it answers in the only currency that matters: hours of your working life, computed from your own pay. It gives a verdict, logs every pass and every splurge with running totals, and tracks savings goals against real behaviour. 38 currencies, all data on-device.",
    url: "https://unsplurge.vercel.app",
    stack: ["React", "Barcode scan + OCR", "On-device storage", "PWA + Android APK", "Vercel"],
    status: "Live"
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
