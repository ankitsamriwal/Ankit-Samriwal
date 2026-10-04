import { Article } from './chronicles';

export const articles80: Article[] = [
  {
    title: 'This Week in AI: Decision Models and Governed Runtimes',
    date: '2026-10-04',
    week: 'Oct 4, 2026',
    category: 'AI Infrastructure',
    readTime: '3 min read',
    excerpt: 'Between Sep 27 and Oct 4, agent plumbing got more specific: small decision models that return scored choices instead of prose, and runtimes that enforce policy outside the model.',
    tags: ['Agentic AI', 'Decision Models', 'AI Infrastructure', 'Weekly Update'],
    body: [
      'The pattern this week was not a bigger chatbot. Vendors shipped narrower parts for agents: models that only choose between options, and runtimes that decide what an agent is allowed to do. Both attack the same problem, which is that a full LLM is slow, costly and open-ended for the many small decisions inside a workflow.',
      '## Decision models arrive',
      'A decision model takes a state and a schema of questions, then returns typed answers with probabilities. No free text. On Oct 1, Cloudflare released Clef and Clef-flash on Workers AI, with Apache 2.0 weights on Hugging Face. Its post says Clef is built on a frozen Qwen3.8-27B backbone (Clef-flash on Qwen3.5-9B) with a routing head and rank-256 low-rank adapters, trained with label-smoothed cross-entropy plus a Brier loss for calibration. Inference is one prefill pass that scores every valid schema choice in parallel, so nothing is generated token by token.',
      'The reported numbers are Cloudflare\u2019s own. Median latency was 209 ms for Clef and 39 ms for Clef-flash, against 524 ms for TypeSafe\u2019s Jev in the same table. Clef also takes image input and a 64k context. It does not win everywhere: Jev scored higher on When2Call and BRIGHT in that table. The API is Jev-compatible, so swapping models is mostly a config change.',
      'The same day, AWS\u2019s Strands Labs published Strands Decider 2B. It takes a Qwen3.5-2B torso, removes the language-model head and adds a pointer head of roughly a million parameters that scores each offered option. The release is open source, with a reported median of about 115 ms on an RTX 3090. Strands says plainly that it is weaker than reasoning models on complex problems and cannot write text, so it suits gating and routing, not coding or summaries. Perplexity also published pplx-decider-v1-27b, fine-tuned from Qwen3.8-27B. On its own table of 11 benchmarks it averages 85.71% against 84.51% for Jev, though it trails Jev on several rows.',
      'For agent design, the useful part is the confidence score. A step can route, escalate or defer to a human based on a number, and one call can ask several questions about the same input.',
      '## Runtimes that enforce policy',
      'Nvidia announced its Open Agent Safety Platform on Sep 28. OpenShell is an open-source runtime that sandboxes agents with kernel-level isolation and enforces policy as they run. Sentry is a reference design that runs an out-of-band watchdog on BlueField-4 DPUs, which Nvidia says can quarantine an agent that leaves its boundaries within milliseconds. The design principle is that enforcement sits on the path to the model, outside anything the agent controls.',
      'Oracle took a similar line for business software on Sep 29 with Fusion Claw, an execution runtime for 25 new agentic applications. It pairs model reasoning with deterministic computation and wraps each run in an Enterprise Operating Envelope covering policies, permissions, decision rights and escalation boundaries, enforced by what Oracle calls an Outcome Trust Harness. These are vendor descriptions of shipped or announced products, not independent test results.',
      'My read: the agent stack is splitting into layers. A cheap decider picks the next step, a larger model does the open-ended work, and a runtime outside the model holds the limits. I want the confidence scores and the policy checks logged in the same trace.'
    ].concat([
      'Source: https://blog.cloudflare.com/clef-decision-models/',
      'Source: https://strandsagents.com/blog/introducing-strands-decider/',
      'Source: https://techcrunch.com/2026/10/01/amazon-releases-its-own-jev-clone-as-decision-models-flood-the-web/',
      'Source: https://huggingface.co/perplexity-ai/pplx-decider-v1-27b',
      'Source: https://nvidianews.nvidia.com/news/open-agent-safety-platform',
      'Source: https://developer.nvidia.com/blog/nvidia-open-agent-safety-platform-a-reference-for-continuous-in-silicon-agent-monitoring/',
      'Source: https://www.prnewswire.com/news-releases/oracle-extends-fusion-agentic-applications-with-introduction-of-fusion-claw-302892817.html'
    ]),
    takeaways: [
      'Decision models return typed, scored choices in one parallel pass, which makes routing and gating steps cheaper and easier to audit than LLM calls.',
      'Their benchmarks are vendor-reported and mixed: no model wins every row, and none replaces a reasoning model.',
      'Runtime enforcement is moving outside the model, into sandboxes, hardware watchdogs and policy envelopes.'
    ],
    note: 'Let a small model decide the next step, let a big model do the work, and keep the limits somewhere the agent cannot edit.'
  }
];
