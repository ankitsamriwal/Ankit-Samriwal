import { Article } from './chronicles';

export const articles46To50: Article[] = [
  {
    title: 'The Open-Weight Counterattack',
    date: '2026-01-31',
    week: 'Jan 2026',
    category: 'Model Landscape',
    readTime: '6 min read',
    excerpt: 'January 2026 belonged to the outsiders: a Chinese lab and a tiny startup shipped open models that embarrassed the giants, while Google opened a world model to consumers.',
    tags: ['Open Weights', 'Kimi K2.5', 'Arcee AI', 'World Models', 'Physical AI'],
    body: [
      'January 2026 opened the year with a reminder that the frontier is not a private club.',
      'On 27 January, Moonshot AI released Kimi K2.5, an open-weight model with vision and agentic capabilities, alongside a coding agent. A day later, Arcee AI, a startup small enough to fit in one office, revealed it had trained a 400-billion-parameter open model from scratch that outperformed Meta’s Llama on key benchmarks. The assumption that only a handful of billion-dollar labs can train frontier models took visible damage in the space of 48 hours.',
      'On 29 January, Google made Project Genie, its world model, available to Ultra subscribers in the US. World models, systems that learn how environments behave rather than just how text reads, moved from research papers into a consumer product.',
      'The money followed the physical. Skild AI raised $1.4 billion for robotic foundation models at a $14 billion valuation, and Waabi raised $1 billion for autonomous driving. Investors are now funding the thesis that the next model frontier is not language but the physical world.',
      'For enterprises, January carried a practical message. Open-weight models are now good enough to anchor serious workloads, which changes the economics of deployment: sensitive data can stay on your own infrastructure, per-token costs can fall to near zero, and vendor leverage weakens.',
      'The year began with the moat looking narrower than the incumbents would like.'
    ],
    takeaways: ['Open-weight models from smaller labs reached the frontier in January 2026.', 'World models became a consumer product with Project Genie.', 'Physical AI attracted billion-dollar rounds.', 'Open weights change enterprise deployment economics and negotiating leverage.'],
    note: 'January 2026 proved the frontier can be trained, not just rented.'
  },
  {
    title: 'The Mega-Round Month',
    date: '2026-02-28',
    week: 'Feb 2026',
    category: 'Industry Shifts',
    readTime: '7 min read',
    excerpt: 'February 2026 set records that may stand for years: Anthropic raised $30 billion, OpenAI raised $110 billion, and three companies absorbed most of the world’s venture capital.',
    tags: ['AI Funding', 'Anthropic', 'OpenAI', 'Venture Capital', 'Market Concentration'],
    body: [
      'February 2026 was the month the capital markets made their AI bet official, and at a scale that is hard to absorb.',
      'On 12 February, Anthropic closed a $30 billion Series G led by GIC at a $380 billion post-money valuation, the second-largest venture deal ever at the time. Fifteen days later, on 27 February, OpenAI announced a $110 billion round backed by Amazon, NVIDIA and SoftBank at an $840 billion valuation, the largest private funding round in history.',
      'The aggregate numbers are stranger than the headlines. Analysis of February’s venture data showed roughly $189 billion invested globally in one month, with three AI companies absorbing about 83 percent of it. Venture capital, an asset class built on diversification, concentrated itself into a handful of model labs.',
      'Beneath the financing noise, the product drumbeat continued. Anthropic shipped Claude Sonnet 4.6 on 17 February. Google released Gemini 3.1 Pro on 19 February and Nano Banana 2, its faster image model, on 26 February. China’s Ant Group open-sourced trillion-parameter Ling and Ring models the same week.',
      'For enterprise leaders, the concentration cuts both ways. The labs are now capitalised well enough to guarantee years of model improvement and infrastructure build-out, which reduces platform risk. But it also means the industry’s direction is set by very few companies, and your roadmap depends on their incentives.',
      'February also settled a question from 2025: whether AI valuations were a bubble about to correct. The market’s answer, for now, was to double the bet.'
    ],
    takeaways: ['OpenAI’s $110B round at $840B became the largest private raise in history.', 'Anthropic’s $30B Series G valued it at $380B.', 'Three AI companies absorbed roughly 83% of February’s global venture capital.', 'Capital concentration reduces platform risk but increases dependency on a few labs.'],
    note: 'February 2026 was the month venture capital stopped diversifying and picked its horses.'
  },
  {
    title: 'GTC and the Agentic Factory',
    date: '2026-03-31',
    week: 'Mar 2026',
    category: 'AI Infrastructure',
    readTime: '6 min read',
    excerpt: 'March 2026 was NVIDIA’s stage: the Vera Rubin platform launched at GTC with a trillion-dollar order book in sight, while OpenAI’s record round grew to $122 billion.',
    tags: ['NVIDIA', 'Vera Rubin', 'GTC 2026', 'OpenAI', 'AI Infrastructure'],
    body: [
      'March 2026 belonged to NVIDIA. At GTC on 16 March, Jensen Huang unveiled Vera Rubin, the successor to Blackwell, framed explicitly as the platform for the agentic AI era: racks designed not for chatbots answering questions but for agents running continuously. NVIDIA signalled visibility toward a trillion dollars in orders through 2027.',
      'Alongside the hardware, NVIDIA expanded its open model families, including the Nemotron 3 series, hybrid Mamba-Transformer models built for agentic reasoning. The company that sells the picks and shovels is now publishing the maps too: open models optimised to run best on its own silicon.',
      'The month’s other headline was financial. OpenAI announced on 31 March that its latest raise had grown to $122 billion, up from the $110 billion announced in February, to fund what it called the next phase of AI. The infrastructure commitments behind these numbers, data centres measured in gigawatts, are now larger than the historical build-outs of most utilities.',
      'Google closed the month with Gemini 3.1 Flash Live, a native audio model for real-time conversation, and Meta shipped SAM 3.1 for video segmentation. Useful, but footnotes to the infrastructure story.',
      'For enterprises, GTC’s message deserves decoding. When the dominant infrastructure vendor designs its next platform around agents that run all day, the expected shape of AI workloads is changing: always-on processes, not occasional queries. Capacity planning, cost models and governance frameworks built for chat will not fit.',
      'March made the bet visible in silicon: the industry is building factories for agents, whether or not the agents have fully arrived.'
    ],
    takeaways: ['NVIDIA’s Vera Rubin platform is designed for continuous agentic workloads.', 'NVIDIA now ships open models tuned for its own hardware.', 'OpenAI’s record round grew to $122B by end of March.', 'Enterprise AI planning should assume always-on agents, not occasional queries.'],
    note: 'The smartest signal at GTC was not a chip. It was what the chip assumed about how AI will be used.'
  },
  {
    title: 'Safety Became a Product Feature',
    date: '2026-04-30',
    week: 'Apr 2026',
    category: 'Model Landscape',
    readTime: '7 min read',
    excerpt: 'April 2026 gave us GPT-5.5 and Claude Opus 4.7, but the real story was what Anthropic chose not to release: a more powerful model held back over its own capabilities.',
    tags: ['Claude Opus 4.7', 'GPT-5.5', 'AI Safety', 'Gemma 4', 'Responsible AI'],
    body: [
      'April 2026 had the usual flagship releases, and one decision that mattered more than any of them.',
      'On 16 April, Anthropic released Claude Opus 4.7, with better vision, memory and instruction-following. The release was notable for what sat behind it: Anthropic acknowledged it had built a substantially more capable model, Claude Mythos Preview, and decided not to make it generally available. The stated reason was its cybersecurity capability, strong enough to be useful for both defending and attacking software infrastructure. Instead, access went to a limited group of partners for defensive security work, under a programme called Project Glasswing.',
      'Sit with that for a moment. For the first time, a major lab looked at a finished frontier model and concluded that releasing it was the irresponsible option. Whatever you think of the judgment, it sets a precedent: capability now has a gate, and the gate is the lab’s own risk framework.',
      'On 23 April, OpenAI released GPT-5.5, positioned as a step toward a super app: one product combining chat, search, agents, commerce and media. The platform strategy from October’s DevDay kept consolidating.',
      'Google opened the month with Gemma 4, its most capable open model family, keeping the open-weight pressure on. IBM shipped Granite 4.1 for enterprises, and Tencent previewed Hy3 with agent capabilities. The middle of the market stayed busy while the top made headlines.',
      'For enterprise buyers, April’s lesson is twofold. First, model cards and safety posture are now procurement inputs, not marketing pages: ask what a lab chose not to ship and why. Second, the super-app direction means more of your workflows will concentrate inside fewer AI products, which makes exit planning a real architecture concern.',
      'April’s defining image: a lab holding back its own model. That has never happened before at this scale.'
    ],
    takeaways: ['Anthropic withheld its most capable model, Claude Mythos Preview, over cybersecurity risk.', 'Claude Opus 4.7 shipped as the deliberately safer flagship.', 'GPT-5.5 pushed OpenAI further toward a super-app strategy.', 'Safety posture is now a real enterprise procurement criterion.'],
    note: 'April 2026 was the month not shipping became a headline.'
  },
  {
    title: 'Models That Act',
    date: '2026-05-31',
    week: 'May 2026',
    category: 'Agentic AI',
    readTime: '6 min read',
    excerpt: 'May 2026 made the year’s direction explicit: Google launched Gemini 3.5 around action, Anthropic answered with Opus 4.8, and sovereignty entered the enterprise vocabulary.',
    tags: ['Gemini 3.5', 'Gemini Omni', 'Claude Opus 4.8', 'AI Sovereignty', 'Physical AI'],
    body: [
      'May 2026 is when the industry stopped implying and started saying it: models are built to act now, not to chat.',
      'On 19 May, Google launched Gemini 3.5 under the banner of frontier intelligence with action, alongside Gemini Omni, its natively multimodal model. The framing matters. Two years earlier, launches led with reasoning benchmarks. Now the headline claim is what the model can do: operate tools, complete workflows, move through systems.',
      'On 28 May, Anthropic answered with Claude Opus 4.8, continuing the fastest flagship cadence it has ever run: Opus 4.5 in November, 4.7 in April, 4.8 in May. The major labs are now shipping meaningful upgrades monthly, and the evaluation treadmill enterprises were warned about in 2025 is simply the weather now.',
      'A quieter launch may prove the most consequential for regulated markets. On 20 May, Cohere released Command A+, aimed explicitly at agentic AI sovereignty: capable models that enterprises and governments can run under their own control. Sovereignty, keeping models, data and compute inside your jurisdiction or your walls, moved from policy paper to product line.',
      'NVIDIA closed the month with Cosmos 3, an open foundation model for physical AI, feeding the robotics wave that January’s funding rounds anticipated.',
      'For enterprise leaders, May crystallised the 2026 agenda. Action-native models mean the pilot phase is over: agents that read and write inside your systems are the default product now. And sovereignty is no longer a compliance afterthought; it is a category vendors compete on.',
      'The question has fully inverted. It is no longer what can AI do. It is what have you decided AI is allowed to do.'
    ],
    takeaways: ['Gemini 3.5 and Omni made action the headline capability of frontier models.', 'Flagship release cadence compressed to roughly monthly.', 'AI sovereignty became a commercial product category with Command A+.', 'Physical AI kept advancing with NVIDIA’s open Cosmos 3.'],
    note: 'May 2026 inverted the enterprise question: not what AI can do, but what you will let it do.'
  }
];
