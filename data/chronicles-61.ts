import { Article } from './chronicles';

export const articles61: Article[] = [
  {
    title: 'Five Versions Before Dinner',
    date: '2026-09-12',
    week: 'Sep 12, 2026',
    category: 'Building With Agents',
    readTime: '5 min read',
    excerpt: 'A Saturday run almost entirely from voice notes: a customer-facing RAG proposal through five revisions in an afternoon, a mailbox app connected to real Gmail, and a medicine-reminder app that went from a thought to an installable APK between lunch and dinner.',
    tags: ['Building With Agents', 'Ship Log', 'DawaiYaad', 'Mailstorm', 'Agents 2030'],
    body: [
      'Saturday had a different interface. Most of the day ran on voice notes from my phone, and the loop held: speak a thought walking around, get back a draft, a document, or a running app. The clearest proof was the most professional artifact of the day. A customer letter asking for an air-gapped, on-prem RAG proof of concept became an approach document, and then four voice notes became four revisions: DAEP provisions all infrastructure and licenses while we recommend the bill of quantities, ingestion redesigned as staged controlled-media because a live SharePoint connector breaks the air gap, the security layer spelled out with RBAC and audit trails, and finally Arabic-language support and observability. Five versions, each sharper, none of them typed.',
      'The morning pipelines ran and one of them hit a milestone. Wonderbyte finished its eight-episode Abir-Kashvi arc with AI Safety Researcher, and the answer to "keep it running" is now a nineteen-episode plan through October 1. Geetlekha drafted episodes eight and nine. The Speed Limit Negotiation went live on Substack with four notes riding it, and six X posts went out, but not the seven drafted: I cut the UAE AI campus one twice in two messages, and it did not fire. The kill switch working is part of the system working.',
      'Midday, Mailstorm crossed from demo to real. Gmail connected read-only, the demo banner came off, and the app proved itself in the first hour by catching an Anthropic API key that expires tomorrow. A one-year scan categorized the whole mailbox: seventy percent bulk. Then came the most human exchange of the day, about a promo video: blur the real data, so everything got blurred, which killed the hook, so the final cut blurs only the email address, the key nickname and the appointment details while the counts and verdicts stay readable. Three iterations on what "blur" means. That is taste work, and it does not compress.',
      'The evening build was DawaiYaad. A voice note about chronic patients juggling medicines twice or thrice a day became a PRD, then seven clickable wireframe screens, then a working app where the nag ladder actually fires, then a prescription scan verified against a realistic handwritten Indian prescription (Amlodipine 5mg OD, Metformin 500mg BD, read correctly), then an APK whose native alarms fire with the app fully closed. Idea to installable artifact in one evening, elderly-first design, big type, family view. PillBuzz was taken; DawaiYaad was right anyway.',
      'Quieter work ran underneath. Agents 2030 grew by five industry chapters (travel, manufacturing, retail, FMCG, IT), all held back from publishing on my instruction from earlier this week. A second tracked-download page went up for a Data Engineer quiz PDF with a Bitly link, and the tracker showed real movement by evening. Breakfast got logged, corrected, and corrected again when I remembered the cappuccino. The day closed with a scorecard that said I ate too little, which is a first for this app.',
      'The honest paragraph: the snag worth recording is the X composer mangling approved multi-line text, and the post held rather than ship corrupted. A queue that refuses to publish a broken version of an approved post is doing its job, but it is also a reminder that the last mile of every pipeline is still a manual review with eyes open. The tools are fast now. The judgment is still mine, and today it was exercised on breakfasts, blurs, kill switches and a customer proposal, all before dinner.'
    ],
    takeaways: [
      'A customer-facing air-gapped RAG approach doc went through five revisions driven entirely by voice notes, including a real architecture catch: live connectors break an air gap, so ingestion became staged media.',
      'Mailstorm went live on real Gmail and earned its keep immediately by flagging an API key expiring the next day; the promo video took three passes to learn that selective blur beats total blur.',
      'DawaiYaad went from voice note to PRD to wireframes to working app to prescription scan to APK with native closed-app alarms in a single evening.',
      'Restraint shipped again: a drafted X post was killed twice on instruction, a corrupted composer version was held, and five new Agents 2030 chapters stay unpublished until asked.',
      'Wonderbyte completed its first full arc and is now planned daily through October 1.'
    ],
    note: 'The keyboard was barely involved today. Voice note in, reviewed artifact out, redirect spoken, revision back. The interface disappeared, which is what the interface was supposed to do.'
  }
];
