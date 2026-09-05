import { Article } from './chronicles';

export const articles36To40: Article[] = [
  {
    title: 'The Month AI Became Infrastructure',
    date: '2025-03-31',
    week: 'Mar 2025',
    category: 'Industry Shifts',
    readTime: '7 min read',
    excerpt: 'March 2025 was not about one model. Chips, capital, reasoning and image generation all moved at once, and AI started to look like infrastructure rather than software.',
    tags: ['AI Infrastructure', 'NVIDIA', 'OpenAI', 'Gemini 2.5', 'CoreWeave'],
    body: [
      'Most months in AI produce one headline. March 2025 produced four, and together they said more about where the industry is going than any single release could.',
      'On 18 March, Jensen Huang took the stage at GTC and unveiled Blackwell Ultra, the GB300 platform, and the Vera Rubin roadmap that follows it. The language mattered more than the silicon. NVIDIA no longer talks about chips. It talks about AI factories: data centres as production lines that manufacture intelligence the way power plants manufacture electricity.',
      'A week later, on 25 March, Google released Gemini 2.5 Pro, its first model with thinking built in, and it went straight to the top of the public leaderboards. Reasoning stopped being an OpenAI speciality and became table stakes for any serious model.',
      'The same day, OpenAI put native image generation inside GPT-4o and Sora. Within days the internet filled with Studio Ghibli style portraits. The meme was not the story. The story was that image generation stopped being a separate tool and became a capability inside the general model. One model, many media.',
      'On 28 March, CoreWeave listed on Nasdaq at a valuation of about $23 billion. The debut was muted, but the meaning was not: a company whose business is renting GPUs had become one of the largest tech listings in years. And on 31 March, OpenAI closed a $40 billion round led by SoftBank at a $300 billion valuation, the largest private fundraise in technology history.',
      'For enterprise buyers, the lesson is structural. AI is becoming a capital-intensive utility. The strategic question is shifting from which model is smartest to which platform, at what unit cost, under what governance. Procurement, architecture and finance now sit in the same conversation.',
      'When a technology starts attracting utility-scale capital, the winners are decided by distribution and cost curves, not demos. March 2025 was the month that became obvious.'
    ],
    takeaways: ['Reasoning became a standard model feature, not a differentiator.', 'AI infrastructure attracted capital at utility scale.', 'Text and image merged into single general models.', 'Enterprises should plan for AI as infrastructure, not as a tool purchase.'],
    note: 'March 2025 was the month AI stopped looking like software and started looking like power generation.'
  },
  {
    title: 'Reasoning Became the Product',
    date: '2025-04-30',
    week: 'Apr 2025',
    category: 'Model Landscape',
    readTime: '6 min read',
    excerpt: 'April 2025 was model release season, and the pattern was unmistakable: every major lab was selling reasoning and coding, not chat.',
    tags: ['Reasoning Models', 'GPT-4.1', 'o3', 'Llama 4', 'Coding Agents'],
    body: [
      'April 2025 was crowded with model releases, and the pattern was unmistakable. Every major lab was selling the same two things: reasoning and coding.',
      'On 5 April, Meta released Llama 4 Scout and Maverick, natively multimodal and built on a mixture-of-experts architecture. Open weights still mattered, but the reception was mixed, and the benchmark debate that followed was a useful reminder of how carefully leaderboard claims need to be read.',
      'On 14 April, OpenAI launched the GPT-4.1 family, with a million-token context window and a clear focus on coding. Notably, it shipped API-first. The frontier was now aimed at developers building systems, not just at people chatting in a browser tab.',
      'Two days later, on 16 April, came o3 and o4-mini: reasoning models that can think with images and call tools inside their chain of thought. The model no longer just answers. It plans, checks its own work, uses a calculator, a search engine or a code interpreter, and then speaks.',
      'For enterprise delivery, this changes what can be delegated. A model that plans and verifies can own a multi-step task in a way a fast chat model cannot. Preparing a first-pass proposal, reconciling a BOQ against a rate card, checking a compliance matrix: these become delegable in a way they were not six months earlier.',
      'But reasoning is not free. It costs latency and it costs money. So routing becomes an architecture decision: which tasks deserve deep thought, and which need a fast, cheap answer. The organisations that learn to route well will spend a fraction of what the careless ones spend.',
      'April settled the question of whether reasoning was a passing fad. It is the product now.'
    ],
    takeaways: ['Reasoning and coding became the primary axes of model competition.', 'API-first releases signal that builders, not chat users, are the target.', 'Benchmark claims deserve scepticism; test on your own tasks.', 'Model routing is now an architecture and cost decision.'],
    note: 'The useful question is no longer how smart the model is. It is how much thinking a task deserves.'
  },
  {
    title: 'Agents Left the Demo Stage',
    date: '2025-05-31',
    week: 'May 2025',
    category: 'Agentic AI',
    readTime: '7 min read',
    excerpt: 'May 2025 was the month every major platform made the same bet in public: agents are the product, and they are shipping inside the tools enterprises already own.',
    tags: ['AI Agents', 'Microsoft Build', 'Google I/O', 'Claude 4', 'AI Hardware'],
    body: [
      'May 2025 was the month the big platforms all made the same bet in public, within the same week: agents are the product.',
      'On 19 May, Microsoft opened Build with a simple declaration: the age of AI agents. Multi-agent orchestration in Copilot Studio, Copilot Tuning so organisations can train models on their own data, and agents woven through Microsoft 365. For those of us working in the Microsoft ecosystem, this was the moment agentic AI stopped being a roadmap slide and became something with SKUs, admin controls and licensing lines.',
      'On 20 May, Google used I/O to show Veo 3, which generates video with synchronised dialogue and sound, Imagen 4, and AI Mode in Search. Generative media crossed a line in May: video with voices, generated from a paragraph.',
      'On 21 May, OpenAI announced it was acquiring io, Jony Ive’s hardware startup, in a deal valued at roughly $6.4 billion. The designer of the iPhone is now building what OpenAI hopes comes after it. AI hardware became a serious category in a single announcement.',
      'On 22 May, Anthropic released Claude 4, Opus and Sonnet, with long-running agentic coding at the centre of the pitch. Anthropic, by then valued at $61.5 billion, was no longer the safety-focused alternative. It was claiming the engineering crown.',
      'The enterprise implication is easy to miss under the launch noise. The suites your organisation already owns are becoming agentic from the inside. The build-versus-buy question flips: before commissioning a custom agent platform, look hard at what is arriving in the tools your teams already pay for.',
      'May was also a preview of the coordination problem. When every suite ships its own agents, someone has to decide how they share context, permissions and accountability. That someone is usually enterprise architecture.'
    ],
    takeaways: ['Agentic capability is arriving inside existing enterprise suites.', 'Generative video reached usable quality with Veo 3.', 'AI hardware became a real category with the OpenAI and io deal.', 'Agent sprawl will make orchestration and governance an architecture problem.'],
    note: 'May 2025 was the month agents stopped being demos. The next question is who governs them.'
  },
  {
    title: 'Talent Became the Scarce Resource',
    date: '2025-06-30',
    week: 'Jun 2025',
    category: 'Industry Shifts',
    readTime: '6 min read',
    excerpt: 'June 2025 had no blockbuster model. Instead it revealed what the industry believes is actually scarce: the people and the data pipelines that build the models.',
    tags: ['Talent War', 'Meta', 'Scale AI', 'Apple Intelligence', 'Data Strategy'],
    body: [
      'June 2025 produced no blockbuster model release. What it produced instead was a clear signal about what the industry believes is actually scarce: people and data.',
      'On 12 June, Meta confirmed an investment of $14.3 billion for a 49 percent stake in Scale AI, and hired its founder and CEO Alexandr Wang to lead a new superintelligence team. It was one of the largest talent-and-data deals in technology history, and it landed weeks after Llama 4’s lukewarm reception.',
      'Read the deal for what it is. Meta did not primarily buy revenue. It bought data pipelines, evaluation infrastructure, and the people who know how to build them. Reports of enormous offers to individual researchers followed through the month. The market for a few hundred people who can train frontier models started to resemble the market for star athletes.',
      'Meanwhile, on 9 June, Apple used WWDC to open its on-device foundation models to developers through a new Foundation Models framework. Quiet news compared to the Meta deal, but strategically significant: hundreds of millions of devices running capable local models, private by default, with zero inference cost to the developer.',
      'For enterprises, the talent war is a signal worth reading carefully. If the richest companies in the world are buying people rather than just GPUs, then capability, not compute, is the bottleneck. The same logic applies inside your own organisation. The scarce resource is not access to a model. It is people who can redesign work around AI.',
      'The Scale deal carries a second lesson. Training data and evaluation pipelines are strategic assets, valuable enough to anchor a $14 billion transaction. Enterprises should treat their own process data, documents and delivery history with the same seriousness. That is the raw material every future agent will need.',
      'Compute can be rented by the hour. Judgment, proprietary data and the people who understand both cannot.'
    ],
    takeaways: ['The constraint on AI progress shifted from compute toward talent and data.', 'Meta’s Scale AI deal was a capability acquisition, not a financial one.', 'On-device models became a real developer platform at WWDC.', 'Enterprise process data is a strategic asset; treat it like one.'],
    note: 'Compute can be rented. Judgment, data and the people who understand both cannot.'
  },
  {
    title: 'The Month Agents Got Real Jobs',
    date: '2025-07-31',
    week: 'Jul 2025',
    category: 'Agentic AI',
    readTime: '7 min read',
    excerpt: 'July 2025 was when agent stopped being a keynote word and became a product you could delegate work to, and a line in a restructuring memo.',
    tags: ['ChatGPT Agent', 'Grok 4', 'AI Browsers', 'AI Governance', 'Future of Work'],
    body: [
      'July 2025 is when the word agent stopped being a keynote abstraction and became two concrete things: a product you could hand real work to, and a line item in a restructuring memo.',
      'On 9 July, xAI launched Grok 4, with a $300 per month subscription tier and claims of graduate-level reasoning. The launch was immediately overshadowed by Grok’s antisemitic posts on X days earlier, for which xAI issued a public apology. Whatever you think of the model, the episode was a live demonstration that model behaviour is an operational risk, not a communications footnote.',
      'The same day, Perplexity launched Comet, an AI-native browser that can read pages and act on them. The browser, the most entrenched piece of software in the enterprise, officially became contested territory.',
      'On 17 July, OpenAI introduced ChatGPT agent, merging its Operator browser agent and deep research into a single system that browses, uses tools, writes and runs code, and completes multi-step tasks on its own virtual computer. This is the shape of delegated knowledge work: a goal goes in, a finished outcome comes out, with a human supervising the boundaries.',
      'And on 2 July, Microsoft cut roughly 9,000 jobs, about 4 percent of its workforce, while committing tens of billions of dollars to AI infrastructure. Whatever the official reasoning, the market read it plainly: AI investment and workforce restructuring now travel together.',
      'For enterprise leaders, July sharpened two questions. First, governance: when an agent can browse, spend and act, approval paths, audit logs and bounded permissions stop being architecture niceties and become the control plane. Second, workforce: the conversation about which work is delegated to machines is no longer theoretical, and it belongs in the boardroom, not just the IT strategy deck.',
      'The technology is ready to be given real jobs. The harder question is whether our organisations are ready to supervise it.'
    ],
    takeaways: ['Agents became usable products, not demos, with ChatGPT agent and Comet.', 'Model misbehaviour is an operational risk that needs controls, not apologies.', 'AI-driven restructuring is now visible in headline layoffs.', 'Governance and workforce planning are board-level AI topics.'],
    note: 'July 2025 was the month the agent conversation stopped being about capability and started being about accountability.'
  }
];
