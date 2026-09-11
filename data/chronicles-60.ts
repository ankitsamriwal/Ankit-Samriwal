import { Article } from './chronicles';

export const articles60: Article[] = [
  {
    title: 'The Attack Did Not Change. The Economics Did.',
    date: '2026-09-11',
    week: 'Sep 11, 2026',
    category: 'AI Security',
    readTime: '4 min read',
    excerpt: "Anthropic's latest threat report shows where agentic AI is heading: the same old attacks, now running faster, in parallel, and with fewer people. Guardrails have to move from policy documents into the system itself.",
    tags: ['AI Security', 'Anthropic', 'Agentic AI', 'Guardrails', 'Threat Intelligence'],
    body: [
      'Anthropic published Detecting and countering misuse of AI: September 2026 on 10 September. It documents malicious activity the company says it identified and disrupted between December 2025 and August 2026.',
      'The report is careful about its scope. These are the most notable and novel cases Anthropic found, not a claim that misuse is typical. But the direction is hard to miss. The technology that lets one person build and operate more is also available to people trying to steal, deceive, surveil or attack.',
      '## The attacks were familiar',
      'The report covers seven areas: cyber operations, influence operations, surveillance, scams and fraud, biological misuse, conventional weapons development, and model distillation.',
      'The cyber cases did not depend on a new class of vulnerability. They used stolen credentials, exposed services, unpatched systems, phishing and SQL injection. What changed was the amount of labour that could be delegated.',
      'Anthropic describes models being used for reconnaissance, malware and phishing-kit development, command execution, credential harvesting and processing stolen data. In some cases a human made each targeting decision. In others, multi-agent systems worked across several victims in parallel for hours or days with little supervision.',
      'One compromise moved from a stolen developer token to full control of a cloud environment in roughly three hours. Another operation used scheduled jobs to renew stolen access and keep collecting data. This is the trajectory: the attacker does not need a magical new technique when the old techniques can be run at machine speed.',
      '## Capability is spreading faster than expertise',
      'For years, the distinction between a state-backed group and a small criminal crew was partly resources. Advanced campaigns needed people, infrastructure and time.',
      "Anthropic's evidence suggests that gap is narrowing. A lone operator or small group can now automate work that once needed a team: scan many targets, adapt tools, test paths, maintain campaign memory and sort through large volumes of stolen material.",
      'That does not make every attacker sophisticated. It makes sophistication cheaper to imitate. Intent becomes the larger difference because capability is increasingly rented through an API or assembled from widely available models and tools.',
      "This is why the industry's safety debate cannot stay at the level of whether a model refuses one bad prompt. Real attackers split work across requests, steal legitimate credentials, build wrappers around models and keep changing their behaviour when controls catch them.",
      '## Guardrails must exist at every layer',
      'A refusal inside the model is useful, but it is one control. A serious system needs several.',
      'The provider has to detect patterns across accounts, requests and tools, not just judge one prompt in isolation. Accounts linked to abuse need to be stopped quickly. New tactics found during investigations need to flow back into detection. Anthropic says it banned accounts, strengthened safeguards from what it learned, and shared intelligence with authorities and industry partners where appropriate.',
      'The customer has work to do as well. API keys and session tokens must be treated like production credentials. Agent tools should have the narrowest permissions they need. Execution should be sandboxed. Sensitive or irreversible actions should require approval. Logs should show which model called which tool, with what access, and what happened next. Rate limits and anomaly detection should look for machine-speed behaviour that no normal operator would produce.',
      'The industry layer matters because attackers move between providers and steal access from customers. Threat indicators, abuse patterns and mitigations have to travel across model companies, cloud platforms, security vendors and public agencies faster than the actors can reuse them.',
      '## Security is part of the product',
      "The most important part of Anthropic's report is not that misuse happened. Any useful general-purpose technology will attract misuse. The important part is that the misuse was observed, disclosed and converted into stronger controls.",
      'That loop must become standard: detect, stop, investigate, learn, share, harden. Not once, and not after a public incident. Continuously.',
      'Enterprises deploying agents should use the same loop internally. Before an agent gets a browser, terminal, mailbox, database or payment rail, the security questions should already be answered: what can it access, what requires a person, what is logged, what behaviour triggers a shutdown, and how quickly can its credentials be revoked?',
      'The technology is moving from answering questions to taking actions. Bad actors are making the same move. Guardrails are no longer a layer added after the product works. They are part of whether the product works at all.',
      'Source: https://www.anthropic.com/threat-intelligence-report-september-2026'
    ],
    takeaways: [],
    note: ''
  }
];
