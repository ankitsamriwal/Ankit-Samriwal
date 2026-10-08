import { Article } from './chronicles';

export const articles81: Article[] = [
  {
    title: 'Agent 2030: A Learning Loop Where You Own the Memory',
    date: '2026-10-08',
    week: 'Oct 8, 2026',
    category: 'Building With Agents',
    readTime: '3 min read',
    excerpt: 'A deterministic learning-loop lab: experience becomes a proposed skill, nothing activates until I approve it, and memory stays in the browser.',
    tags: ['Agentic AI', 'Agent Memory', 'Skills', 'Prototype'],
    body: [
      'I built a small lab to make one idea concrete: an agent whose skill library and user model compound across sessions instead of resetting, with the user owning every byte. It runs as a route on my site at /agent2030. It is a design demo, not a product.',
      '## The loop',
      'Six steps: experience, skill proposal, human approve or reject, simulated reuse, correction, new version. A lesson I supply is structured into a skill proposal. The proposal is inert until I review it. Approval activates a version for simulated reuse only. If a reuse fails, I write a correction, and that drafts the next version. An approved skill is never silently overwritten.',
      '## Memory and boundaries',
      'A second store holds a synthetic user model: preferences, goals and boundaries. Each item can be edited or forgotten. Nothing is inferred from untrusted content. Memory carries across sessions and survives a server restart in the local build. In the public deployment it lives in the visitor\u2019s browser only: not uploaded, not synced across devices, erased when site data is cleared. A typed confirmation (RESET SYNTHETIC LAB) wipes it.',
      '## What it does not do',
      'This is deterministic. The skill proposal is a structured transform of the lesson I provide, not model-generated learning. There are no model calls and no real data, and reuse logs a simulated result without running any tools. A free Gemma 4 26B config is wired but disabled until an adapter phase that needs its own key handling and tests.',
      '## Testing',
      'Domain logic: 264 of 264 cases, 24 per function across 11 functions. UI integration on the deployed route: 242 of 242 checks. Six full flows repeated 20 times each at 390px and at desktop width, plus export and browser persistence on reload. The local build also covered rejection of unauthorized writes and restart persistence. I have not yet run it on a physical phone.',
      '## The 2030 view',
      'The last page is the thesis: now, learn one useful thing with its provenance; next, carry it into another session; by 2030, a portable skill library and user-owned memory that keep their boundaries visible as the relationship grows. That is a design direction, not a claim about future capability.',
      'My takeaway: the interesting part of agent learning is not generating skills. It is the gate between a proposal and an active skill, and who holds the memory.',
      'Source: https://ankit-samriwal.vercel.app/agent2030/'
    ],
    takeaways: [
      'Skill proposals stay inert until a human approves, and corrections create new versions instead of overwriting.',
      'Memory is user-owned: editable, forgettable, browser-local in the public demo.',
      'This lab is deterministic with no model calls; live-model proposals are a separate, later build.'
    ],
    note: 'Live demo with synthetic data only: ankit-samriwal.vercel.app/agent2030.'
  }
];
