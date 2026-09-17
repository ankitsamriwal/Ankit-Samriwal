import { Article } from './chronicles';

export const articles66: Article[] = [
  {
    title: 'The Week Harness Became a Product',
    date: '2026-09-17',
    week: 'Sep 17, 2026',
    category: 'Agentic AI',
    readTime: '6 min read',
    excerpt: 'A week ago "harness" was a vocabulary question. This week OpenAI, Salesforce, WSO2, Google and a stealth startup all shipped one. So I stopped reading the launch list and ran a pilot on the strangest entry: Jev, a decision model that outputs typed actions instead of chat.',
    tags: ['Agentic AI', 'Harness', 'Jev', 'MCP', 'Industry Shifts'],
    body: [
      'Yesterday’s question was embarrassingly basic: what is an agent harness. This week the industry answered by turning it into a shelf. OpenAI shipped the Agents API, the Codex harness as a managed service. Salesforce pre-announced a Trusted Enterprise AI Harness, general availability February 2027. WSO2 put Agent Manager at GA, the first open-source control plane for agents. Rebuno shipped an MIT-licensed policy and approval runtime. Omni shipped a self-hosted workplace agent with approval gates. Google added agent anomaly detection in preview, Meta put its Muse agent inside WhatsApp, and Salesforce released a reasoning model called Koa. The models kept pace underneath: DeepSeek-V4.1-Flash with MIT open weights, Qwen3.8 Max, GPT-6 Astra.',
      'The pattern matters more than any single launch. Until recently the product was the model. Now every one of these companies sells the layer around the model: orchestration, permissions, audit, approval gates, anomaly detection. Governance is the enterprise wedge, the thing a CIO can actually buy. And a free stack already exists: Omni plus Rebuno plus WSO2 is a governed agent demo at zero license cost. That combination would have been a procurement cycle a year ago.',
      'The strangest entry was not a harness at all. TypeSafe AI came out of stealth with $40 million, founded by a ChatGPT co-inventor, with a model called Jev. Jev does not chat. You give it a decision; it returns typed, programmatic actions: a choice, a score, structured fields with confidence. The claim is a hundred times faster and cheaper than a chat model for decision-shaped work. It is, in a sense, the opposite philosophy of everything else launched this week: no conversation, just structured output you can execute.',
      'I had an invite. So instead of reading about harnesses like everyone else this week, I tested one.',
      'The honest report first: Jev is a decision layer, not a writer. It scores and classifies in parallel and returns typed fields. It cannot draft a paragraph, summarize a document, or price anything. Knowing that, I pointed it at exactly one job in my proposal tool: bid triage. Feed it a requirement, get back typed fields: category, probability it is mandatory, whether it needs clarification, ambiguity, response risk, the section it belongs to, whether a human should review it.',
      'The privacy line came before the pilot. TypeSafe says it does not train on input, but it does collect input. So the pilot ran on thirty to fifty synthetic requirements only. No real RFPs, no client names, no rates, no BOQs touched Jev. Synthetic data is a real constraint: it tells you whether the mechanics work, not whether it survives real procurement language. I want to be precise about that, because most launch coverage this week was written by people who ran nothing.',
      'The results, with no rounding up: classification one hundred percent, mandatory-probability 92.5 percent, section targeting 80 percent. Good enough to make suggestions. Clarification, ambiguity and risk scoring were not calibrated enough to gate anything on, so the feature stays advisory: it proposes, a human disposes. Total cost of the pilot so far is a tenth of a cent, on preview pricing of four cents per million input tokens. The verdict is not "revolutionary." The verdict is: the typed-action bet is real, it fits exactly one job in my stack today, and it earns a synthetic pilot before it earns trust.',
      'That is the week in one sentence. The harness became a product category while everyone was still debating the definition, and the only way to know where any of it fits your work is to run something small and honest against it. Reading the launch list tells you what exists. A thirty-requirement pilot on fake data tells you where it fits. Both are worth doing. Only one of them is publishing material.'
    ],
    takeaways: [
      '"Harness" is now a shelf, not a concept: OpenAI Agents API, Salesforce Trusted Enterprise AI Harness (GA Feb 2027), WSO2 Agent Manager at GA, Rebuno, Omni, Google anomaly detection, Meta Muse - all in one week.',
      'The product moved up a layer: everyone now sells orchestration, permissions and approval gates around the model. Governance is the enterprise wedge.',
      'A free governed stack already exists: Omni + Rebuno + WSO2, zero license cost.',
      'Jev (TypeSafe AI, $40M stealth launch by a ChatGPT co-inventor) bets on typed actions instead of chat. Hands-on pilot: classification 100%, mandatory 92.5%, section 80% - advisory, not authoritative.',
      'Synthetic-only by design: nothing real touched the model until its data handling earns it. Small honest pilots beat launch coverage.'
    ],
    note: 'The week everyone read about harnesses, the useful move was testing one. Synthetic data, real verdicts.'
  }
];
