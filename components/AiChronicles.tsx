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
    excerpt: 'For a long time, AI felt like a smarter search box. Then the conversation changed: people stopped asking what AI could answer and started asking what AI could do.',
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
      'But production software lives inside constraints: security, maintainability, performance, integration, compliance, naming conventions, and the quiet knowledge of why something was built a certain way years ago.',
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
    date: '2024-09-09',
    week: 'Week 12',
    category: 'Human + AI',
    readTime: '5 min read',
    excerpt: 'As AI takes over more execution, human advantage moves toward judgment, taste, context, empathy, and accountability.',
    tags: ['Human + AI', 'Leadership', 'Future of Work'],
    body: [
      'The fear around agentic AI is understandable. If systems can plan, call tools, produce content, write code, and coordinate tasks, what is left for humans?',
      'A lot, actually. But not necessarily the same things we built our careers around.',
      'Execution is becoming cheaper. Drafting is becoming cheaper. First-pass analysis is becoming cheaper. That does not make people irrelevant. It changes where people create value.',
      'The human edge moves toward judgment: deciding what matters, what is appropriate, what is risky, what is ethical, and what is worth doing in the first place.'
    ],
    takeaways: ['AI reduces the cost of execution but increases the value of judgment.', 'Human skills shift toward context, taste, empathy, and accountability.', 'Leaders must redesign work around human and AI strengths.'],
    note: 'The future is not humans versus agents. It is humans who know how to direct agents versus humans who do not.'
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
            <div><div className="text-3xl font-extrabold">6</div><div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Live now</div></div>
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
