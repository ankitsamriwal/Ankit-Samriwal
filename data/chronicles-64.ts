import { Article } from './chronicles';

export const articles64: Article[] = [
  {
    title: 'The Bid Desk Got Real',
    date: '2026-09-15',
    week: 'Sep 15, 2026',
    category: 'Building With Agents',
    readTime: '5 min read',
    excerpt: 'Seventeen real proposals and costing sheets went into the proposal tool and it stopped being a demo: rate cards, a costing tab, a Gantt-capable project planner, two-format outputs, and a privacy line drawn in code, not in a policy paragraph.',
    tags: ['Building With Agents', 'Ship Log', 'ProposalForge', 'Privacy', 'Enterprise'],
    body: [
      'Tuesday belonged to one tool. ProposalForge had been a promising shell; today seventeen real artifacts went into it, proposals and costing sheets from actual engagements, DAEP and MOCA and Emaratech among them, and it came out the other side as a working bid desk. Locked must-have blocks mined from the real documents. A rate card grown to twenty-eight roles with placeholders for more and a checkbox for whether a role is billable. A costing tab that pulls the AED day rate for whatever resource and duration you pick. A project plan generator with a live Gantt that pushes into the proposal with one click. An output studio that produces technical and commercial proposals, each in detailed or executive format. And a recommendation engine that reads the ingested requirements and suggests how many weeks the work should take, because that is the question every bid actually turns on.',
      'The most important feature shipped quietly: a privacy line, drawn in code. The rule arrived in plain language, public branding is fine, customer content never goes to an external model, and the implementation matched it. The Gemini SDK was not just bypassed; it was deleted from the codebase and dependencies, verified with an audit showing zero references and every endpoint answering that no external model was used. When rate limits bite, the fallback is free OpenRouter models, and only for generic template content. Customer material stays local and deterministic. Anything paid waits for explicit approval. That is what a data boundary looks like when it is an architecture decision instead of a reassurance.',
      'The desk earned its keep the same day. A fuel-automation clarification sheet went out client-ready: fifty-seven structured questions across infrastructure, protocols, site conditions and coverage, cross-checked against a cement-plant questionnaire so nothing was missed. A consolidated hardware and storage BOQ landed as one sheet with final AED pricing down the right column, no SKU sprawl. This is the loop working as intended: the tool improved by real work in the morning, doing real work by afternoon.',
      'The rest of the day kept its cadence. Two essays went live: the flagship, Your Agent Demo Is Not the RFP, on buyers procuring capability instead of slideware, and a companion short. Wonderbyte shipped episode eleven, Data Scientist, with the vocab cards. Geetlekha drafted fourteen and fifteen, Asha Bhosle then a ghazal. Bots At Brunch ran a double to backfill Monday. Bit’s Data Crew, a doctor’s-kit-style game where kids play different Data and AI roles, went from idea to a verified PWA on its own Vercel link in one request. The portfolio tracker came back after the market holiday, and the job scan found an 88% fit worth a tailored pack.',
      'Worth recording too: a competitor review of an open-source shorts generator got an honest read (real project, daily commits, three genuine gaps), and a standing rule was set for model usage across all builds: free models by default, best available free tier, and nothing routes to paid without a yes.',
      'The honest paragraph: the logging bug that surfaced today is the one that stings, because it failed silently. A save that never confirms is worse than a save that errors loudly; the user trusts the number on screen and the number is wrong. Fixed properly, with the backend checked and the miss owned. Silent failure is the tax on fast shipping, and the only payment is verification that shows its work.'
    ],
    takeaways: [
      'ProposalForge went from shell to bid desk: 17 real proposals mined, 28-role rate card, costing tab, Gantt project planner, dual-format outputs and a duration recommendation engine.',
      'The privacy boundary is code, not prose: Gemini SDK deleted, zero external calls on customer content, free-model fallback for generic content only, paid models gated on approval.',
      'The tool did real work the same day: a 57-question client query sheet and a consolidated AED BOQ.',
      'Cadence held across the catalogue: two essays, Wonderbyte EP11, two Geetlekha drafts, a Bots At Brunch double, and a kids’ data-careers game shipped as a verified PWA.',
      'A silent save bug was the day’s real lesson: fail loudly or verify visibly, because a quiet miss erodes the trust the whole system runs on.'
    ],
    note: 'A bid tool is just forms until you feed it your actual history. Seventeen documents later, it argues back with your own numbers.'
  }
];
