import React, { useMemo, useState } from 'react';

type Article = {
  title: string;
  date: string;
  week: string;
  category: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  body: string[];
  takeaways: string[];
  note: string;
};

const articles: Article[] = [
  {
    title: 'The Week AI Stopped Being Just a Chatbot',
    date: '2024-06-24',
    week: 'Week 01',
    category: 'Agentic AI',
    readTime: '5 min read',
    excerpt: 'For a long time, AI felt like a smarter search box. Then people stopped asking what AI could answer and started asking what AI could do.',
    tags: ['AI Agents', 'Enterprise AI', 'Human + AI'],
    body: [
      'For most of 2023 and early 2024, the public imagination around AI was still tied to chat. We typed something, it replied. Sometimes the answer was brilliant. Sometimes it was confidently wrong. Either way, the relationship was simple: human asks, machine responds.',
      'But around the middle of 2024, the tone changed. Product teams stopped talking only about prompts and started talking about workflows. CIOs were no longer asking whether employees could use AI safely. They were asking whether AI could sit inside a process, call a tool, check an output, and move work forward.',
      'That is when AI started to feel less like a chatbot and more like a junior teammate. Not perfect. Not magical. But a system that could be given a goal, some context, and access to tools.',
      'In enterprise delivery, this distinction matters. A chatbot helps with knowledge. An agent changes operating models. A chatbot drafts an email. An agent checks the CRM, prepares the email, updates the task, triggers a follow-up, and tells you what it could not complete.'
    ],
    takeaways: ['The shift from chatbots to agents is a shift from answering to acting.', 'Enterprise value comes from workflow integration, not impressive demos.', 'Governance becomes more important when AI can take actions.'],
    note: 'If AI is going to act inside the enterprise, accuracy is not enough. We also need auditability, approval, and ownership.'
  },
  {
    title: 'Claude 3.5 and the Return of Software Craft',
    date: '2024-07-01',
    week: 'Week 02',
    category: 'Engineering',
    readTime: '6 min read',
    excerpt: 'Better coding models did not make engineering less important. They made taste, review, architecture, and judgment more visible.',
    tags: ['Coding Agents', 'Software Delivery', 'Engineering Leadership'],
    body: [
      'When stronger coding models arrived, the predictable debate followed: will developers still be needed? It is an easy headline, but a weak management question.',
      'The more interesting change was not that AI could write code. The change was that AI could write more useful code, explain trade-offs, refactor with context, and make a decent first pass at implementation.',
      'Production software lives inside constraints: security, maintainability, performance, integration, compliance, naming conventions, and the quiet knowledge of why something was built a certain way years ago.',
      'This is where human craft returned to the centre. AI can accelerate implementation, but it cannot yet replace the judgment that decides whether a solution belongs in the system.'
    ],
    takeaways: ['AI coding tools increase the value of architecture and review.', 'More code is not automatically more progress.', 'Engineering leaders must define where AI can assist and where human approval is mandatory.'],
    note: 'The future developer is not just a coder. The future developer is a reviewer, architect, product thinker, and AI supervisor.'
  },
  {
    title: 'Context Is the New Currency',
    date: '2024-07-08',
    week: 'Week 03',
    category: 'Enterprise AI',
    readTime: '5 min read',
    excerpt: 'The quality of AI output depends less on clever prompts and more on whether the system has the right business context at the right moment.',
    tags: ['Context Engineering', 'RAG', 'Knowledge Management'],
    body: [
      'Prompt engineering had its moment. People collected magic phrases, shared templates, and treated prompts like secret spells. Some of that was useful. Much of it was theatre.',
      'As AI moved closer to enterprise workflows, it became clear that the real advantage was not clever wording. It was context. Which policy applies? Which customer is this? What happened in the last meeting? What does the contract say?',
      'A model without context is smart but generic. A model with the right context becomes useful. That is why retrieval, knowledge graphs, memory, and connected tools became such an important part of the AI conversation.',
      'For enterprises, this is uncomfortable because most organisations do not have clean context. Documents are scattered. CRM fields are incomplete. Process knowledge lives in people’s heads.'
    ],
    takeaways: ['Prompt quality matters, but enterprise context matters more.', 'AI readiness depends heavily on data and knowledge hygiene.', 'RAG is not a silver bullet if the underlying content is outdated or unowned.'],
    note: 'Before asking why the AI gave a weak answer, ask whether the organisation gave it a weak memory.'
  },
  {
    title: 'Project Managers Will Not Disappear. But the Job Will Change.',
    date: '2024-07-15',
    week: 'Week 04',
    category: 'Delivery Leadership',
    readTime: '6 min read',
    excerpt: 'AI will take over many administrative parts of delivery. That does not kill project management. It forces project managers to move up the value chain.',
    tags: ['PMO', 'Delivery', 'AI in Work'],
    body: [
      'A lot of project work is administrative: meeting notes, status reports, RAID logs, follow-ups, dependency tracking, minutes of meeting, action reminders, and steering committee packs.',
      'AI is already good at many of these tasks, and it will only get better. But confusing project administration with project leadership is a mistake.',
      'The difficult parts of delivery are rarely solved by a prettier status report. They are solved by judgment, negotiation, escalation, trade-offs, stakeholder alignment, and knowing when the plan on paper has stopped matching reality.',
      'The project manager who survives AI is not the person who manually formats slides better than a model. It is the person who uses AI to remove noise and spends more time on leadership.'
    ],
    takeaways: ['AI will automate project administration faster than project leadership.', 'PMs must become stronger at decision-making and stakeholder alignment.', 'The best delivery leaders will use AI as a control tower, not a replacement brain.'],
    note: 'The safest career move is not to compete with AI on status reports. It is to become the person who knows what the status actually means.'
  },
  {
    title: 'Why AI Pilots Look Great and Still Fail in Production',
    date: '2024-07-22',
    week: 'Week 05',
    category: 'Enterprise AI',
    readTime: '7 min read',
    excerpt: 'A demo proves that the model can impress people in a controlled room. Production proves whether the organisation can absorb AI into the way work happens.',
    tags: ['AI Governance', 'Production AI', 'Transformation'],
    body: [
      'AI pilots are easy to love. They are small, controlled, and full of possibility. A team picks a clean use case, prepares a good dataset, designs a polished demo, and suddenly everyone can see the future.',
      'Then production arrives. The data is messier. Users behave unpredictably. Security asks questions. Legal asks better questions. Integration becomes harder than expected. Operations asks who supports it at 2 AM.',
      'This is the production gap. It is not unique to AI, but AI makes it more visible because the demo-to-reality distance can be huge.',
      'The organisations that succeed will treat AI pilots as discovery, not victory. They will ask hard questions early: what data can the model access, what actions can it take, how will errors be handled, and how will value be measured?'
    ],
    takeaways: ['AI pilots fail when governance, integration, and support are afterthoughts.', 'Production AI needs monitoring and clear ownership.', 'A demo is evidence of possibility, not enterprise readiness.'],
    note: 'The real test of an AI solution is not whether executives clap during the demo. It is whether users still trust it three months after go-live.'
  },
  {
    title: 'The Human Edge in an Agentic World',
    date: '2024-07-29',
    week: 'Week 06',
    category: 'Human + AI',
    readTime: '5 min read',
    excerpt: 'As AI takes over more execution, human advantage moves toward judgment, taste, context, empathy, and accountability.',
    tags: ['Human + AI', 'Leadership', 'Future of Work'],
    body: [
      'The fear around agentic AI is understandable. If systems can plan, call tools, produce content, write code, and coordinate tasks, what is left for humans?',
      'A lot, actually. But not necessarily the same things we built our careers around.',
      'Execution is becoming cheaper. Drafting is becoming cheaper. First-pass analysis is becoming cheaper. That does not make people irrelevant. It changes where people create value.',
      'The human edge moves toward judgment: deciding what matters, what is appropriate, what is risky, what is ethical, and what is worth doing in the first place. In enterprise programmes, this has always been the leader’s real work.'
    ],
    takeaways: ['AI reduces the cost of execution but increases the value of judgment.', 'Human skills shift toward context, taste, empathy, and accountability.', 'Leaders must redesign work around human and AI strengths.'],
    note: 'The future is not humans versus agents. It is humans who know how to direct agents versus humans who do not.'
  },
  {
    title: 'Why Every Enterprise Needs an AI Strategy Before Buying AI',
    date: '2024-08-05',
    week: 'Week 07',
    category: 'Enterprise AI Strategy',
    readTime: '6 min read',
    excerpt: 'The organisations quietly succeeding with AI are not always using the most advanced models. They are the ones that understand why they need AI before deciding what to purchase.',
    tags: ['AI Strategy', 'CIO', 'Enterprise AI', 'Governance'],
    body: [
      'Over the last year, I have seen many AI conversations begin with the same question: which AI platform should we buy? It is understandable, but it is the wrong place to start.',
      'When cloud computing became mainstream, many organisations rushed to migrate workloads without redesigning how they operated. Some reduced costs. Many simply moved existing problems into someone else’s data centre. We are seeing the same pattern with AI.',
      'The excitement around copilots and AI agents creates pressure on leadership teams. Boards ask questions. Vendors show impressive demos. Employees experiment with public tools. The temptation is to respond quickly by purchasing a platform.',
      'But platforms rarely solve unclear business problems. An AI strategy should first answer what decisions we want to improve, where enterprise knowledge actually lives, what level of autonomy we are comfortable with, how success will be measured, and who owns AI across the business.',
      'In government and enterprise transformation programmes, I have repeatedly seen the same lesson: technology is rarely the hardest part. Organisational clarity is. Buying AI without strategy is like hiring talented people without defining their roles. Activity increases, but productivity may not.'
    ],
    takeaways: ['Strategy should precede platform selection.', 'AI initiatives must tie to measurable business outcomes.', 'AI ownership belongs across the business, not inside one department.'],
    note: 'The most expensive AI investment is not the software. It is implementing AI without first deciding how the organisation wants to work.'
  },
  {
    title: 'AI Agents vs Copilots: The Difference Most Companies Still Miss',
    date: '2024-08-12',
    week: 'Week 08',
    category: 'Agentic AI',
    readTime: '6 min read',
    excerpt: 'Copilots improve individual productivity. Agents redesign workflows. Confusing the two leads to poor expectations and weak enterprise outcomes.',
    tags: ['Agentic AI', 'Copilot', 'Automation', 'Enterprise Architecture'],
    body: [
      'Over the past few months, almost every AI presentation has included the words copilot and agent. They are often used interchangeably. They should not be.',
      'A copilot sits beside a human and helps them perform work: write emails, summarise meetings, generate presentations, suggest code, and find information. It improves the person’s speed, but it rarely owns the task.',
      'An agent is different. It can own part of a workflow. A service request agent might classify the request, retrieve previous incidents, raise a ticket, notify the right team, schedule a follow-up, and report completion. The user did not instruct every step. The agent was given an objective.',
      'This distinction matters because many organisations buy copilot licences while expecting agent-level productivity gains. Copilots improve individual productivity. Agents improve organisational productivity. One makes employees faster. The other changes operating models.',
      'From a delivery leadership perspective, the governance question arrives immediately. Who approves the action? Which systems can the agent access? What happens if it fails? How do we roll back a wrong update? These are not AI questions. They are enterprise architecture and control questions.'
    ],
    takeaways: ['Copilots support people; agents own parts of workflows.', 'Autonomy requires stronger governance than assistance.', 'Enterprise architecture must define where agents are allowed to act.'],
    note: 'The question is not whether your company will use AI agents. The question is which business processes you are comfortable allowing them to own.'
  },
  {
    title: 'The Rise of Context Engineering',
    date: '2024-08-19',
    week: 'Week 09',
    category: 'Enterprise AI',
    readTime: '7 min read',
    excerpt: 'The teams getting the best AI results are not writing magical prompts. They are giving AI better business context.',
    tags: ['Context Engineering', 'RAG', 'Knowledge Management', 'Enterprise AI'],
    body: [
      'For most of 2024, everyone seemed obsessed with prompt engineering. Prompt libraries appeared everywhere. Courses promised secret techniques. Teams competed to write the perfect prompt.',
      'Yet the organisations getting the best AI results were not writing dramatically better prompts. They were giving AI dramatically better context.',
      'Large language models know a lot, but they know almost nothing about your organisation. They do not know your customers, policies, steering committee decisions, architecture documents, or project history unless you make that knowledge available.',
      'Context includes organisational knowledge, customer history, contracts, documentation, live operational data, workflow states, and governance rules. AI becomes useful when it becomes informed.',
      'In enterprise delivery, this is where old information problems become AI problems. SharePoint folders, Teams conversations, CRM notes, PDFs, and individual laptops all contain fragments of organisational memory. AI cannot reason over information it cannot access or trust.',
      'The model matters. But the context around the model is increasingly where enterprise advantage lives.'
    ],
    takeaways: ['Context is replacing prompts as the competitive advantage.', 'Enterprise knowledge is an AI asset.', 'RAG is only one part of a larger context architecture.'],
    note: 'AI does not become more valuable because it sounds smarter. It becomes more valuable when organisations finally understand what they know.'
  },
  {
    title: 'Why AI Projects Fail (And It Is Not the Model)',
    date: '2024-08-26',
    week: 'Week 10',
    category: 'Enterprise AI',
    readTime: '6 min read',
    excerpt: 'Most enterprise AI projects fail before the model gets a fair chance. They fail in ownership, governance, adoption, and operating model design.',
    tags: ['AI Strategy', 'Digital Transformation', 'Governance', 'Change Management'],
    body: [
      'When an AI initiative underperforms, the first instinct is often to blame the technology. The model is not accurate enough. Hallucinations are too high. We need a better LLM.',
      'In reality, many AI projects fail before the model gets a fair chance. A polished demo is not a working operating model. Production has messy data, unclear ownership, security reviews, support expectations, change resistance, and business stakeholders with different priorities.',
      'Across transformation programmes, I have learned that technology is rarely the primary reason projects struggle. The real challenges are organisational. AI is no different.',
      'Once AI enters the enterprise, people ask different questions. Who owns the output? How do we audit decisions? What happens when confidence is low? Which department is responsible if something goes wrong? How do we measure success?',
      'These are leadership questions. Treating AI as a pure IT initiative is a mistake. It touches operations, legal, compliance, security, finance, HR, customer experience, and executive governance.',
      'The model may be impressive, but if adoption is weak and ownership is unclear, the programme will stall.'
    ],
    takeaways: ['Most AI failures are organisational rather than technical.', 'Business outcomes matter more than benchmark scores.', 'Change management is an AI capability.'],
    note: 'AI does not fail because the model is not clever enough. It fails because organisations have not redesigned how people and technology work together.'
  },
  {
    title: 'From Automation to Autonomous Systems',
    date: '2024-09-02',
    week: 'Week 11',
    category: 'Agentic AI',
    readTime: '7 min read',
    excerpt: 'Traditional automation follows rules. Agentic AI pursues objectives. That is a much bigger shift than most automation roadmaps assume.',
    tags: ['Automation', 'Agentic AI', 'Enterprise Architecture', 'AI Operations'],
    body: [
      'For decades we automated repetitive work. Traditional automation follows rules: if this happens, do that. It works well when the process is predictable.',
      'AI introduces something different. Instead of rigid rules, modern systems can interpret intent, prioritise, reason, decide which tool to use, and adapt to a changing situation.',
      'This is the shift from automation to autonomy. It matters because autonomy introduces uncertainty.',
      'An autonomous procurement assistant might compare suppliers, evaluate historical pricing, check inventory, generate recommendations, prepare approvals, and escalate exceptions. That is impressive. It is also why governance becomes essential.',
      'As autonomy increases, organisations need confidence thresholds. Some actions should remain recommendations. Some should require approval. Only a small subset should execute automatically.',
      'In enterprise architecture, this creates a new design responsibility: not only what the system can do, but what it is allowed to do.'
    ],
    takeaways: ['Automation follows rules; autonomy pursues objectives.', 'Memory and context are prerequisites for autonomous systems.', 'Governance defines acceptable levels of autonomy.'],
    note: 'The biggest leap is not teaching machines to think. It is deciding which decisions we are comfortable allowing them to make.'
  },
  {
    title: 'RAG Is Not Dead. You Are Just Using It Wrong.',
    date: '2024-09-09',
    week: 'Week 12',
    category: 'Enterprise AI',
    readTime: '6 min read',
    excerpt: 'RAG was never meant to make models smarter. It exists to make enterprise answers more grounded and trustworthy.',
    tags: ['RAG', 'Vector Search', 'Knowledge Management', 'Enterprise AI'],
    body: [
      'Every few weeks someone declares that Retrieval-Augmented Generation is obsolete. Usually because a newer model performs better. I think the discussion misses the point.',
      'RAG was never intended to make models smarter. It exists to make enterprise answers trustworthy.',
      'Large language models are extraordinary generalists, but your organisation operates on internal knowledge: policies, contracts, architecture documents, meeting notes, project plans, regulatory guidance, and operational history.',
      'Without access to that information, AI can only infer. Inference is not enough when business decisions are involved.',
      'Many organisations implement RAG poorly. They index every document they can find without governance, metadata, lifecycle management, or ownership. Then they wonder why answers are inconsistent.',
      'The problem is not RAG. The problem is information quality. If your knowledge base contains duplicate documents, outdated policies, and conflicting guidance, retrieval will faithfully return that confusion.'
    ],
    takeaways: ['RAG improves trust, not intelligence.', 'Information governance determines AI quality.', 'Future architectures will combine vector search, APIs, knowledge graphs, and live systems.'],
    note: 'Do not ask whether RAG is dead. Ask whether your organisation truly knows where its knowledge lives.'
  },
  {
    title: 'Building AI Applications That People Actually Trust',
    date: '2024-09-16',
    week: 'Week 13',
    category: 'Responsible AI',
    readTime: '6 min read',
    excerpt: 'The most technically impressive AI application is often not the most successful. The applications people return to every day are the ones that earn trust.',
    tags: ['Responsible AI', 'Trust', 'Governance', 'UX'],
    body: [
      'The most technically impressive AI application is often not the most successful. The applications people return to every day have one thing in common: they earn trust.',
      'When we evaluate enterprise software, we often focus on features. With AI, users judge something more personal: confidence. Can I rely on this answer? Should I approve this recommendation? Can I send this email without checking every sentence?',
      'Adoption follows confidence, not capability. An AI assistant that occasionally says I do not know is often trusted more than one that confidently invents an answer. Humility is a feature.',
      'Explainability also matters. Employees do not need the mathematics behind the model, but they need to understand why a recommendation was made. Showing source documents, confidence levels, or reasoning paths changes how people perceive the output.',
      'Good AI products behave like experienced colleagues. They make recommendations, cite evidence, admit uncertainty, and invite collaboration instead of pretending to replace judgment.'
    ],
    takeaways: ['Trust is a product feature.', 'Transparency improves adoption.', 'Clear governance increases usage.'],
    note: 'People do not trust AI because it is intelligent. They trust AI because it is predictable, transparent, and honest about what it knows.'
  },
  {
    title: 'The New Software Development Lifecycle in the AI Era',
    date: '2024-09-23',
    week: 'Week 14',
    category: 'Engineering Leadership',
    readTime: '7 min read',
    excerpt: 'AI is not just changing coding. It is changing planning, review, testing, documentation, release, and the way engineering leaders measure progress.',
    tags: ['SDLC', 'AI Coding', 'Software Engineering', 'DevOps'],
    body: [
      'Software development is changing faster than most organisations realise. Not because developers are disappearing, but because the nature of development itself is evolving.',
      'For years, delivery followed a familiar rhythm: requirements, design, development, testing, deployment, support. AI blurs these boundaries.',
      'A developer can generate scaffolding in minutes. Unit tests appear automatically. Documentation updates itself. Architecture options are suggested before the first line of production code is written.',
      'The result is not simply faster coding. It is a different development lifecycle. Planning becomes more iterative. Reviews become more valuable. Architecture decisions become more important. Testing shifts toward validation rather than creation.',
      'In AI-assisted teams, success is not measured by how many lines of code are produced. It is measured by how quickly reliable software reaches production. Cycle time, deployment frequency, customer value, security posture, and reliability matter far more.',
      'The engineer becomes reviewer, architect, and decision-maker. AI becomes implementation partner.'
    ],
    takeaways: ['AI changes software delivery, not just coding.', 'Architecture and reviews become more valuable.', 'Outcome metrics replace activity metrics.'],
    note: 'AI is removing friction between ideas and working software. Leadership still decides whether that software is worth building.'
  },
  {
    title: 'Why Prompt Engineering Became a Commodity',
    date: '2024-09-30',
    week: 'Week 15',
    category: 'Generative AI',
    readTime: '5 min read',
    excerpt: 'Prompt engineering still matters, but it is no longer the main differentiator. The real advantage moved to context, workflow design, and AI architecture.',
    tags: ['Prompt Engineering', 'LLMs', 'Context Engineering', 'Enterprise AI'],
    body: [
      'A year ago, prompt engineering was one of the hottest skills in AI. Prompt libraries appeared everywhere. Courses promised secret frameworks. Some even claimed prompting would become a long-term profession.',
      'Prompt engineering solved an early problem: helping humans communicate with language models. But models have become much better at understanding natural language, so the need for elaborate prompt tricks has reduced.',
      'The real competitive advantage has moved elsewhere: enterprise context, workflow design, governance, knowledge architecture, integration, memory, and tool orchestration.',
      'A brilliant prompt cannot compensate for poor enterprise data. It cannot replace missing governance. It cannot integrate disconnected systems.',
      'As agentic AI matures, prompts become one input into a much larger reasoning system. Agents retrieve context, call APIs, use tools, remember previous interactions, evaluate results, and ask follow-up questions.',
      'The prompt is only the conversation starter. Future AI leaders will spend less time perfecting prompts and more time designing systems.'
    ],
    takeaways: ['Prompt engineering still matters, but it is foundational rather than transformational.', 'Enterprise context creates better AI outcomes.', 'AI architecture is replacing prompt optimisation.'],
    note: 'The best prompt in the world cannot rescue poor enterprise architecture. Great AI begins with great systems, not clever wording.'
  },
  {
    title: 'Designing AI-Native Business Processes',
    date: '2024-10-07',
    week: 'Week 16',
    category: 'Enterprise Transformation',
    readTime: '7 min read',
    excerpt: 'Most organisations are adding AI to existing workflows. The real opportunity is redesigning business processes around AI from the ground up.',
    tags: ['Agentic AI', 'Business Process', 'Digital Transformation', 'Operating Model'],
    body: [
      'When electricity first entered factories, manufacturers did not simply replace steam engines with electric motors. They redesigned the factory. AI deserves the same treatment.',
      'Today, most organisations are layering AI onto existing processes. Tomorrow’s leaders will redesign the processes themselves.',
      'Consider a typical customer complaint. A customer submits a request. An employee reviews it. Another employee categorises it. Someone forwards it. Someone else checks history. A supervisor approves next steps. Eventually a response is prepared. Every handoff introduces delay.',
      'Agentic AI changes the journey. A customer submits a complaint. An AI agent validates identity, retrieves history, checks warranty information, evaluates sentiment, drafts a response, identifies the resolution policy, calculates compensation options, flags legal exceptions, and escalates only when confidence drops below a threshold.',
      'The human enters at the moment judgment becomes valuable, not at the beginning of every transaction. This is the difference between AI-assisted work and AI-native work.',
      'Designing AI-native processes still requires discipline. Every autonomous workflow needs clear ownership, audit trails, approval thresholds, explainability, measurable outcomes, and human override. Without those principles, organisations simply create faster versions of poorly governed processes.',
      'The companies that win will not be those with the biggest models. They will be the ones that redesign work intelligently.'
    ],
    takeaways: ['Redesign workflows rather than inserting AI into legacy steps.', 'Human judgment becomes more valuable as AI execution improves.', 'Competitive advantage comes from operating model innovation.'],
    note: 'The biggest opportunity is not replacing people with AI. It is removing the unnecessary work that prevents people from doing what only humans can do.'
  }
];

const heroImages = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200'
];

const AiChronicles: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Article | null>(null);
  const categories = useMemo(() => ['All', ...Array.from(new Set(articles.map((article) => article.category)))], []);
  const filtered = articles.filter((article) => {
    const text = `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(' ')}`.toLowerCase();
    return (category === 'All' || article.category === category) && text.includes(query.toLowerCase());
  });

  return (
    <section id="chronicles" className="py-16 md:py-24">
      <div className="mb-10">
        <div className="mono text-xs uppercase tracking-[0.3em] text-blue-300 mb-5">AI Chronicles</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">The evolution of AI, agents and the human edge.</h2>
            <p className="text-lg text-neutral-400 leading-8 max-w-2xl">A weekly retrospective on how AI moved from chatbots to agentic systems, written from the lens of enterprise delivery and real work.</p>
          </div>
          <div className="glass rounded-[2rem] p-6 border border-white/10 grid grid-cols-3 gap-4 text-center">
            <div><div className="text-3xl font-extrabold">104</div><div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Target weeks</div></div>
            <div><div className="text-3xl font-extrabold">16</div><div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Live now</div></div>
            <div><div className="text-3xl font-extrabold">2024</div><div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Start</div></div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search AI agents, governance, delivery..." className="w-full lg:max-w-md px-5 py-4 rounded-full bg-white/[0.04] border border-white/10 outline-none focus:border-blue-400/50 text-sm text-white placeholder:text-neutral-600" />
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap px-4 py-2 rounded-full mono text-[11px] uppercase tracking-[0.16em] border transition-all ${category === item ? 'bg-white text-black border-white' : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white'}`}>{item}</button>)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((article, index) => (
          <button key={article.title} onClick={() => setSelected(article)} className="group text-left glass rounded-[2rem] overflow-hidden border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.05] transition-all duration-500">
            <div className="h-52 overflow-hidden bg-neutral-900"><img src={heroImages[index % heroImages.length]} alt="" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" /></div>
            <div className="p-6 md:p-8">
              <div className="mono text-[11px] uppercase tracking-[0.22em] text-blue-300 mb-4">{article.week} · {article.date} · {article.category}</div>
              <h3 className="text-2xl font-extrabold tracking-tight leading-tight mb-4 group-hover:text-blue-100 transition-colors">{article.title}</h3>
              <p className="text-neutral-400 leading-7 mb-6">{article.excerpt}</p>
              <div className="flex items-center justify-between gap-4"><span className="mono text-xs text-neutral-500">{article.readTime}</span><span className="text-sm font-semibold text-white">Read article →</span></div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 glass rounded-[2rem] p-6 md:p-8 border border-white/10">
        <div className="mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-5">Publishing roadmap</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-neutral-300 leading-7">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">2024: foundations, copilots and context</div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">2025: agents, tools and enterprise governance</div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">2026: digital workers and human leadership</div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-xl overflow-y-auto">
          <div className="min-h-screen px-4 py-8 md:py-14">
            <article className="max-w-4xl mx-auto rounded-[2rem] glass overflow-hidden border border-white/10 shadow-2xl bg-black/80">
              <div className="p-6 md:p-10 lg:p-12">
                <button onClick={() => setSelected(null)} className="float-right w-10 h-10 rounded-full bg-white text-black font-bold">×</button>
                <div className="mono text-xs uppercase tracking-[0.25em] text-blue-300 mb-4">{selected.week} · {selected.date} · {selected.readTime}</div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">{selected.title}</h2>
                <div className="flex flex-wrap gap-2 mb-8">{selected.tags.map((tag) => <span key={tag} className="mono text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">{tag}</span>)}</div>
                <div className="space-y-6 text-neutral-300 text-lg leading-8">{selected.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                <div className="my-10 p-6 rounded-3xl bg-white/[0.04] border border-white/10"><h3 className="text-xl font-bold mb-4">Key takeaways</h3><ul className="space-y-3 text-neutral-300">{selected.takeaways.map((item) => <li key={item} className="flex gap-3"><span className="text-blue-400">→</span><span>{item}</span></li>)}</ul></div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20"><div className="mono text-xs uppercase tracking-[0.25em] text-blue-300 mb-3">Coffee with Ankit ☕</div><p className="text-xl md:text-2xl font-medium leading-snug text-white">{selected.note}</p></div>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
};

export default AiChronicles;
