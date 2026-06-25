export interface ChronicleArticle {
  id: number;
  slug: string;
  title: string;
  date: string;
  week: string;
  category: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  hero: string;
  body: string[];
  takeaways: string[];
  coffeeNote: string;
}

export const chronicleArticles: ChronicleArticle[] = [
  {
    id: 1,
    slug: 'when-ai-stopped-being-a-chatbot',
    title: 'The Week AI Stopped Being Just a Chatbot',
    date: '2024-06-24',
    week: 'Week 01',
    category: 'Agentic AI',
    readTime: '5 min read',
    excerpt: 'For a long time, AI felt like a smarter search box. Then the conversation changed: people stopped asking what AI could answer and started asking what AI could do.',
    tags: ['AI Agents', 'Enterprise AI', 'Human + AI'],
    hero: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    body: [
      'For most of 2023 and early 2024, the public imagination around AI was still tied to chat. We typed something, it replied. Sometimes the answer was brilliant. Sometimes it was confidently wrong. Either way, the relationship was simple: human asks, machine responds.',
      'But somewhere around the middle of 2024, the tone changed. Developers were no longer talking only about prompts. Product teams were talking about workflows. CIOs were no longer asking whether employees could use ChatGPT safely. They were asking whether AI could sit inside a process, call a tool, check an output, and move work forward without someone babysitting every click.',
      'That is the moment AI started to feel less like a chatbot and more like a junior teammate. Not a perfect teammate. Not a magical one. But a system that could be given a goal, some context, and access to tools — and then attempt a sequence of actions.',
      'In enterprise delivery, this distinction matters. A chatbot helps with knowledge. An agent changes operating models. A chatbot drafts an email. An agent checks the CRM, prepares the email, updates the task, triggers a follow-up, and tells you what it could not complete.',
      'The risk, of course, is that people get carried away by the word agent. Many so-called agents are still fragile workflows wearing a fashionable jacket. But the direction is clear. Software is becoming less passive. Applications are no longer just waiting for humans to click buttons. Increasingly, they are being asked to reason, act, and report back.',
      'For leaders, the question is not whether agents are perfect today. They are not. The better question is whether your organisation is ready for software that behaves less like a screen and more like a worker.'
    ],
    takeaways: [
      'The shift from chatbots to agents is a shift from answering to acting.',
      'Enterprise value will come from workflow integration, not impressive demos.',
      'Governance becomes more important when AI can take actions, not just produce text.'
    ],
    coffeeNote: 'If AI is going to act inside the enterprise, the old question of accuracy is not enough. We also need to ask: who approved the action, who can audit it, and who owns the outcome?'
  },
  {
    id: 2,
    slug: 'claude-35-and-the-return-of-craft',
    title: 'Claude 3.5 and the Return of Software Craft',
    date: '2024-07-01',
    week: 'Week 02',
    category: 'Engineering',
    readTime: '6 min read',
    excerpt: 'Better coding models did not make engineering less important. They made taste, review, architecture, and judgment more visible.',
    tags: ['Coding Agents', 'Software Delivery', 'Engineering Leadership'],
    hero: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    body: [
      'When stronger coding models arrived, a predictable debate followed: will developers still be needed? It is an easy headline, but a poor management question.',
      'The more interesting change was not that AI could write code. We had already seen that. The change was that AI could write more useful code, explain trade-offs, refactor with context, and make a half-decent first pass at implementation. Suddenly, the blank page became less intimidating.',
      'But anyone who has delivered real systems knows that writing code is not the whole job. Production software lives inside constraints: security, maintainability, performance, integration, compliance, naming conventions, deployment pipelines, and the quiet knowledge of why something was built a certain way three years ago.',
      'This is where human craft returned to the centre. AI can accelerate implementation, but it cannot yet replace the judgment that decides whether a solution belongs in the system. The best engineers become faster. The weakest engineering practices become more dangerous.',
      'In a delivery environment, this means leaders need to rethink reviews. Code review is no longer only about catching human mistakes. It is also about catching plausible machine output that looks correct but ignores architecture, observability, edge cases, or ownership.',
      'The winners will not be teams that blindly generate more code. The winners will be teams that combine AI speed with engineering discipline.'
    ],
    takeaways: [
      'AI coding tools increase the value of architecture and review.',
      'More code is not automatically more progress.',
      'Engineering leaders must define where AI can assist and where human approval is mandatory.'
    ],
    coffeeNote: 'The future developer is not just a coder. The future developer is a reviewer, architect, product thinker, and AI supervisor rolled into one.'
  },
  {
    id: 3,
    slug: 'context-is-the-new-currency',
    title: 'Context Is the New Currency',
    date: '2024-07-08',
    week: 'Week 03',
    category: 'Enterprise AI',
    readTime: '5 min read',
    excerpt: 'The quality of AI output increasingly depends less on clever prompts and more on whether the system has the right business context at the right moment.',
    tags: ['Context Engineering', 'RAG', 'Knowledge Management'],
    hero: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    body: [
      'Prompt engineering had its moment. People collected magic phrases, shared templates, and treated prompts like secret spells. Some of that was useful. Much of it was theatre.',
      'As AI moved closer to enterprise workflows, it became clear that the real advantage was not clever wording. It was context. Which policy applies? Which customer is this? What happened in the last meeting? What does the contract say? Which system is the source of truth?',
      'A model without context is smart but generic. A model with the right context becomes useful. That is why retrieval, knowledge graphs, memory, and connected tools became such an important part of the AI conversation.',
      'For enterprises, this is uncomfortable because most organisations do not have clean context. Documents are scattered. SharePoint is messy. CRM fields are incomplete. Process knowledge lives in people’s heads. Data ownership is unclear. Then everyone wonders why the AI pilot feels impressive in a demo and disappointing in production.',
      'The lesson is simple: AI exposes the health of your information architecture. If your knowledge is fragmented, your AI will be fragmented. If your processes are ambiguous, your agent will be ambiguous.',
      'The next wave of AI transformation is not only about models. It is about cleaning the organisational memory those models depend on.'
    ],
    takeaways: [
      'Prompt quality matters, but enterprise context matters more.',
      'AI readiness depends heavily on data and knowledge hygiene.',
      'RAG is not a silver bullet if the underlying content is outdated or unowned.'
    ],
    coffeeNote: 'Before asking why the AI gave a weak answer, ask whether your organisation gave it a weak memory.'
  },
  {
    id: 4,
    slug: 'project-managers-will-not-disappear',
    title: 'Project Managers Will Not Disappear. But the Job Will Change.',
    date: '2024-07-15',
    week: 'Week 04',
    category: 'Delivery Leadership',
    readTime: '6 min read',
    excerpt: 'AI will take over many administrative parts of delivery. That does not kill project management. It forces project managers to move up the value chain.',
    tags: ['PMO', 'Delivery', 'AI in Work'],
    hero: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    body: [
      'Every technology wave produces the same anxiety: which jobs disappear? With AI, project management quickly became part of that conversation.',
      'It is easy to see why. A lot of project work is administrative: meeting notes, status reports, RAID logs, follow-ups, dependency tracking, minutes of meeting, action reminders, steering committee packs. AI is already good at many of these tasks, and it will only get better.',
      'But confusing project administration with project leadership is a mistake. The difficult parts of delivery are rarely solved by a prettier status report. They are solved by judgment, negotiation, escalation, trade-offs, stakeholder alignment, and knowing when the plan on paper has stopped matching reality.',
      'AI can help a project manager see patterns faster. It can summarise risks, compare plans, draft updates, and identify slipping commitments. That is valuable. But it still does not replace the human work of walking into a difficult conversation and getting people to agree on a path forward.',
      'The project manager who survives AI is not the person who manually formats slides better than a model. It is the person who uses AI to remove noise and spends more time on leadership.',
      'So no, I do not think project managers disappear. I think low-value project administration gets automated, and the role becomes more demanding, not less.'
    ],
    takeaways: [
      'AI will automate project administration faster than project leadership.',
      'PMs must become stronger at decision-making, stakeholder alignment, and governance.',
      'The best delivery leaders will use AI as a control tower, not a replacement brain.'
    ],
    coffeeNote: 'The safest career move is not to compete with AI on status reports. It is to become the person who knows what the status actually means.'
  },
  {
    id: 5,
    slug: 'ai-pilots-and-the-production-gap',
    title: 'Why AI Pilots Look Great and Still Fail in Production',
    date: '2024-07-22',
    week: 'Week 05',
    category: 'Enterprise AI',
    readTime: '7 min read',
    excerpt: 'A demo only proves that the model can impress people in a controlled room. Production proves whether the organisation can absorb AI into the way work actually happens.',
    tags: ['AI Governance', 'Production AI', 'Transformation'],
    hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    body: [
      'AI pilots are easy to love. They are small, controlled, and full of possibility. A team picks a clean use case, prepares a good dataset, designs a polished demo, and suddenly everyone can see the future.',
      'Then production arrives. The data is messier. Users behave unpredictably. Security asks questions. Legal asks better questions. Integration becomes harder than expected. The business asks who owns the output. Operations asks who supports it at 2 AM. Finance asks where the measurable value is.',
      'This is the production gap. It is not unique to AI, but AI makes it more visible because the demo-to-reality distance can be huge.',
      'In traditional software delivery, requirements may be incomplete, but behaviour is usually deterministic. With AI, output can vary. That means acceptance criteria, testing, monitoring, and support models need to evolve. You cannot manage AI like a normal form or workflow screen.',
      'The organisations that succeed will treat AI pilots as discovery, not victory. They will ask hard questions early: what data can the model access, what actions can it take, how will errors be handled, how will humans override it, and how will value be measured?',
      'The point is not to slow innovation. The point is to stop confusing a good demonstration with a working capability.'
    ],
    takeaways: [
      'AI pilots fail when governance, integration, and support are treated as afterthoughts.',
      'Production AI needs monitoring, escalation paths, and clear ownership.',
      'A demo is evidence of possibility, not evidence of enterprise readiness.'
    ],
    coffeeNote: 'The real test of an AI solution is not whether executives clap during the demo. It is whether users still trust it three months after go-live.'
  },
  {
    id: 6,
    slug: 'copilots-vs-agents',
    title: 'Copilots Help You Work. Agents Start to Work for You.',
    date: '2024-07-29',
    week: 'Week 06',
    category: 'Agentic AI',
    readTime: '5 min read',
    excerpt: 'The difference between copilots and agents is not branding. It is the difference between assistance and delegated execution.',
    tags: ['Copilots', 'Agents', 'Workflow Automation'],
    hero: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    body: [
      'Copilot became one of the defining words of the AI wave. It is a useful metaphor: the human is still the pilot, while AI sits beside them, helping with suggestions, drafts, summaries, and navigation.',
      'Agents change the metaphor. They are not simply beside you. They are given work. They may plan steps, call tools, check results, and come back with progress or blockers.',
      'This difference matters because it changes responsibility. With a copilot, the human usually reviews and performs the final action. With an agent, the system may perform parts of the action itself. That raises new questions around permissions, audit trails, approvals, and trust.',
      'In enterprise settings, I expect copilots and agents to coexist. Copilots will remain valuable for knowledge work, drafting, summarising, and decision support. Agents will emerge where tasks are repeatable, tool-based, and governed enough to delegate safely.',
      'The mistake would be to force every AI use case into the agent bucket. Some work should remain assistive. Some work can become semi-autonomous. A small amount may become fully autonomous over time.',
      'The leadership challenge is deciding which is which.'
    ],
    takeaways: [
      'Copilots assist; agents execute delegated steps.',
      'Agentic workflows need stronger controls than assistive AI.',
      'Not every AI use case should become autonomous.'
    ],
    coffeeNote: 'The question is not whether agents are powerful. The question is where autonomy actually makes sense.'
  },
  {
    id: 7,
    slug: 'shadow-ai-is-the-new-shadow-it',
    title: 'Shadow AI Is the New Shadow IT',
    date: '2024-08-05',
    week: 'Week 07',
    category: 'Governance',
    readTime: '6 min read',
    excerpt: 'Employees will not wait for perfect AI policy. They will use whatever helps them move faster. Leaders can either govern that reality or pretend it is not happening.',
    tags: ['Governance', 'Risk', 'Workplace AI'],
    hero: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    body: [
      'Shadow IT happened because business teams needed speed and central IT could not always keep up. Shadow AI is happening for the same reason, only faster.',
      'An employee needs to summarise a document, rewrite an email, analyse a spreadsheet, prepare interview questions, or understand a contract. The approved enterprise AI tool is not available yet. Policy is unclear. Training is pending. So they open whatever tool works and get on with the job.',
      'From a productivity angle, this is understandable. From a governance angle, it is dangerous. Sensitive data can leave controlled environments. Outputs can be copied without review. Decisions may be influenced by tools the organisation has not assessed.',
      'The answer is not simply to ban everything. Bans often push behaviour further underground. The better answer is to provide safe, useful, approved alternatives and make the right path easier than the risky path.',
      'Organisations need practical AI policies, not 60-page documents nobody reads. Employees need clear examples: what can be used, what cannot be uploaded, what requires approval, and when human review is mandatory.',
      'Shadow AI is not a future risk. It is already inside most organisations. The only question is whether leadership has visibility.'
    ],
    takeaways: [
      'Employees adopt AI faster than governance teams can react.',
      'Practical guardrails work better than blanket bans.',
      'Approved AI tools must be useful enough to compete with public alternatives.'
    ],
    coffeeNote: 'If the official route is slow and the unofficial route is useful, people will choose useful. Governance has to respect that reality.'
  },
  {
    id: 8,
    slug: 'ai-and-recruitment-no-more-keyword-matching',
    title: 'AI in Recruitment: Beyond Keyword Matching',
    date: '2024-08-12',
    week: 'Week 08',
    category: 'Future of Work',
    readTime: '6 min read',
    excerpt: 'The best recruiters will not be replaced by AI. But recruiters who only match keywords may be replaced by recruiters who use AI properly.',
    tags: ['Recruitment', 'Talent', 'AI Screening'],
    hero: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
    body: [
      'Recruitment has always had a signal problem. A CV is a compressed version of a career. A job description is often a wishlist. Somewhere between the two, recruiters have to judge fit, potential, timing, communication, motivation, and context.',
      'AI can help. It can summarise profiles, compare experience against role requirements, identify missing evidence, draft outreach, and prepare interview questions. Used well, it can reduce manual screening and give recruiters more time for human judgment.',
      'Used badly, it becomes keyword matching with better grammar. That is not transformation. That is automation of old habits.',
      'The real opportunity is deeper. AI can help recruiters understand adjacent skills, career transitions, project complexity, domain relevance, and leadership signals that may not be obvious from a quick scan. It can also help candidates present their experience more clearly.',
      'But recruitment is a high-trust function. Bias, explainability, consent, and human review matter. A rejected candidate should not disappear into a black box because an algorithm disliked their formatting.',
      'The future recruiter is not replaced by AI. The future recruiter becomes better at asking sharper questions, reading between the lines, and using AI to see patterns faster.'
    ],
    takeaways: [
      'AI can improve recruitment only if it goes beyond keyword matching.',
      'Human judgment remains essential for fit, motivation, and leadership potential.',
      'Responsible AI in hiring requires explainability and review.'
    ],
    coffeeNote: 'The best hiring decisions are still human decisions. AI should help us prepare better, not outsource accountability.'
  },
  {
    id: 9,
    slug: 'enterprise-memory-problem',
    title: 'Every Enterprise Has a Memory Problem',
    date: '2024-08-19',
    week: 'Week 09',
    category: 'Enterprise AI',
    readTime: '5 min read',
    excerpt: 'AI forces organisations to confront a problem they have ignored for years: most enterprise knowledge is scattered, stale, and hard to trust.',
    tags: ['Knowledge Management', 'RAG', 'Enterprise Architecture'],
    hero: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
    body: [
      'Ask an enterprise where its knowledge lives and you will usually get a long answer. SharePoint, Teams, email, Confluence, Jira, file shares, CRM notes, old PDFs, local folders, and the minds of people who have been around long enough to remember why things are the way they are.',
      'This was always inefficient. AI makes it strategic.',
      'When organisations build AI assistants or agents, they quickly realise the model is only as useful as the knowledge it can access. If policies are outdated, process maps are inconsistent, and project documents contradict each other, AI will not magically fix the problem. It will surface it.',
      'That is why enterprise memory will become a serious boardroom topic. Not because knowledge management suddenly became fashionable, but because AI needs reliable organisational context to be useful.',
      'This is also where digital transformation programmes should pay attention. Data migration, document governance, metadata, ownership, retention, and access control are no longer back-office hygiene topics. They directly affect AI performance.',
      'Before building an enterprise agent, ask a simple question: would a new employee be able to find the right answer using the same knowledge base? If the answer is no, the AI will struggle too.'
    ],
    takeaways: [
      'AI performance depends heavily on knowledge quality.',
      'Enterprise memory must have owners, freshness, and access controls.',
      'AI projects expose old information architecture problems.'
    ],
    coffeeNote: 'AI does not remove the need for organisational discipline. It rewards the companies that already have it.'
  },
  {
    id: 10,
    slug: 'human-in-the-loop-is-not-a-checkbox',
    title: 'Human-in-the-Loop Is Not a Checkbox',
    date: '2024-08-26',
    week: 'Week 10',
    category: 'Governance',
    readTime: '6 min read',
    excerpt: 'Adding a human approval step sounds responsible. But unless the human has context, time, authority, and accountability, it is just theatre.',
    tags: ['Responsible AI', 'Governance', 'Risk Management'],
    hero: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
    body: [
      'Human-in-the-loop is one of those phrases everyone agrees with until you ask what it actually means.',
      'In many designs, it means the AI produces something and a human clicks approve. That sounds safe. But approval only matters if the human understands the decision, has enough time to review it, can see the evidence, and has the authority to reject it.',
      'Otherwise, the human becomes a rubber stamp. The process looks governed, but accountability is blurred. If something goes wrong, people say the human approved it. The human says the system recommended it. Nobody owns the failure.',
      'Real human-in-the-loop design requires clarity. What exactly is the human reviewing? What evidence is shown? What level of risk requires escalation? Are approvals sampled or universal? Are reviewers trained? Is there auditability?',
      'This matters more as AI moves from content generation to action. Approving a draft is one thing. Approving a payment, eligibility decision, compliance response, or customer action is something else entirely.',
      'The goal should not be to insert humans everywhere. That kills speed. The goal is to place human judgment where it actually reduces risk.'
    ],
    takeaways: [
      'Human review must be meaningful, not symbolic.',
      'Reviewers need context, authority, and audit trails.',
      'Risk-based approval design is better than blanket approval steps.'
    ],
    coffeeNote: 'A human in the loop is useful only if the loop is designed for real judgment.'
  },
  {
    id: 11,
    slug: 'from-saas-to-service-as-agent',
    title: 'From SaaS to Service-as-Agent',
    date: '2024-09-02',
    week: 'Week 11',
    category: 'Strategy',
    readTime: '6 min read',
    excerpt: 'For years, software gave us dashboards. The next wave may give us digital workers that operate across those dashboards.',
    tags: ['SaaS', 'AI Strategy', 'Digital Workers'],
    hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    body: [
      'SaaS changed enterprise technology by making software easier to buy, deploy, and scale. But it also created a new kind of complexity: too many tools, too many dashboards, too many tabs, and too much human glue between systems.',
      'A typical business process does not live inside one application. It crosses CRM, ERP, email, spreadsheets, ticketing tools, document stores, and approval systems. Humans spend a lot of time moving information from one place to another.',
      'Agentic AI points to a different model. Instead of asking humans to operate every screen, agents may operate across tools on behalf of humans. That is why the phrase digital worker is becoming more interesting than chatbot.',
      'This does not mean SaaS disappears. It means the user experience may shift upward. People may interact less with individual applications and more with goal-based agents that coordinate actions across them.',
      'For software vendors, this is both an opportunity and a threat. If your product is only a database with a UI, agents may reduce the time users spend inside it. If your product exposes strong APIs, permissions, and workflow logic, it can become part of the agent economy.',
      'The enterprise stack is not going away. But the way people touch it may change dramatically.'
    ],
    takeaways: [
      'Agents may become orchestration layers across SaaS tools.',
      'APIs, permissions, and auditability become strategic product features.',
      'The future UI may be less screen-based and more goal-based.'
    ],
    coffeeNote: 'The next software battle may not be who owns the dashboard. It may be who owns the agent that works across dashboards.'
  },
  {
    id: 12,
    slug: 'the-human-edge-in-an-agentic-world',
    title: 'The Human Edge in an Agentic World',
    date: '2024-09-09',
    week: 'Week 12',
    category: 'Human + AI',
    readTime: '5 min read',
    excerpt: 'As AI takes over more execution, human advantage moves toward judgment, taste, context, empathy, and accountability.',
    tags: ['Human + AI', 'Leadership', 'Future of Work'],
    hero: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
    body: [
      'The fear around agentic AI is understandable. If systems can plan, call tools, produce content, write code, and coordinate tasks, what is left for humans?',
      'A lot, actually. But not necessarily the same things we built our careers around.',
      'Execution is becoming cheaper. Drafting is becoming cheaper. First-pass analysis is becoming cheaper. That does not make people irrelevant. It changes where people create value.',
      'The human edge moves toward judgment: deciding what matters, what is appropriate, what is risky, what is ethical, and what is worth doing in the first place. It moves toward taste: knowing the difference between output that is technically correct and output that is actually good. It moves toward empathy: understanding people, politics, timing, and trust.',
      'In enterprise leadership, this is familiar territory. The hardest decisions are rarely solved by more information alone. They require context and accountability.',
      'AI may become very good at doing tasks. Humans must become better at choosing the right tasks, setting direction, and owning consequences.'
    ],
    takeaways: [
      'AI reduces the cost of execution but increases the value of judgment.',
      'Human skills shift toward context, taste, empathy, and accountability.',
      'Leaders must redesign work around human + AI strengths.'
    ],
    coffeeNote: 'The future is not humans versus agents. It is humans who know how to direct agents versus humans who do not.'
  }
];
