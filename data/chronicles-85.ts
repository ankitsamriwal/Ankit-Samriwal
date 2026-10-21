import { Article } from './chronicles';

export const articles85: Article[] = [
  {
    title: 'The Six Weeks the Frontier Got Cheap',
    date: '2026-10-21',
    week: 'Oct 21, 2026',
    category: 'Models',
    readTime: '6 min read',
    excerpt: 'For six weeks the headlines were about new model names. The number that moved was the price. Three labs landed on the same rate card, and an 816-billion-parameter model became downloadable.',
    tags: ['Frontier Models', 'Pricing', 'Open Weights', 'Enterprise AI'],
    body: [
      'If you only read the launch posts, the last six weeks look like a parade of names. Opus 5.5. Sonnet 5.5. Haiku 5.5. GPT-6 Sol and Luna, then GPT-6.1 Sol. Gemini 4 Argon. DeepSeek V4.1-Flash. Muse Spark Open. It is easy to lose count, and easier to ask the usual question: which one is best?',
      'I think that is the wrong question this time. Read the pricing tables instead of the benchmark charts and a different story shows up.',
      'On 22 September, Anthropic released Claude Opus 5.5. The headline was not only capability. Input and output tokens came in at $4 and $20 per million, 20% below Opus 5, and Anthropic said typical workloads would cost 40% less to run. Six days later, Sonnet 5.5 arrived at $2 and $10 per million, with the claim that it needs fewer tokens to do the same job. On 7 October, Haiku 5.5 followed, which Anthropic says costs around 75% less to run than Haiku 4.5.',
      'OpenAI moved the same way. On the GPT-6 Sol and Luna page, it listed Sol falling from $4 and $20 to $2 and $10 per million tokens, and Luna from $0.20 and $1.20 to $0.10 and $0.50. Both are 50% cuts, measured against the GPT-5.6 promotional prices. On 29 September it added GPT-6.1 Sol, pitched as near its top model\'s intelligence at one-fifth of that model\'s API price. On 13 October Google made Gemini 4 Argon generally available at an introductory $2 and $10 per million tokens.',
      'Read that again. Anthropic\'s Sonnet 5.5, OpenAI\'s GPT-6 Sol and Google\'s Argon all list at $2 input and $10 output per million tokens. They are not the same model. They are not even the same kind of strength. But on the rate card, the three largest closed labs are standing in the same place. Argon\'s price is labelled introductory, so that one may not hold.',
      'When prices converge like that, the buying decision changes. Price stops being the tiebreaker, and the questions that matter are the ones that are harder to put in a spreadsheet: how many tokens does a task really burn, how often does the agent need a human to rescue it, and what happens when it acts outside its brief. Anthropic\'s own pitch for Opus 5.5 leans on exactly this. It says the model is less likely to take hard-to-reverse actions or act outside the boundaries it was given. That is a vendor claim, not an independent finding. For anyone running agents in a regulated setting, though, it is the right thing to test.',
      'The second story is on the other side of the fence. On 15 October, Meta released the weights of Muse Spark Open: 816 billion parameters in total, 42 billion active per token, a 1 million token context window, and text, image, video and audio input. Meta says it can run on two Apple M5 Ultra Mac Studios. Whether that setup is practical for real workloads is for teams to test, not for me to assume. DeepSeek, on 10 September and again on 17 October, shipped V4.1-Flash, a 552 billion parameter mixture-of-experts model with a design that keeps the active parameters small. Mistral announced a public preview of Mistral Large 4 on 6 October, at 1 trillion parameters, with weights promised by the end of the month. Weights are promised by the end of the month. When I checked on 21 October I could not find them released, so for now it is a promise.',
      'One caution on the word "open". These are open weights, meaning you can download and run them. Meta\'s release is under its own Muse Model License. Before any enterprise builds on a model like this, someone has to read the licence the way they would read any other contract.',
      'So what actually changed in six weeks? The ceiling did move: Google says Argon ranks first on the Vals Index, and Anthropic and OpenAI each publish their own wins. But those numbers come from the vendors themselves, and some comparisons are awkward. In Anthropic\'s Sonnet 5.5 table, a few of the OpenAI columns are the older GPT-5.6 Sol, because the benchmark owners had no GPT-6 Sol figure to report. The floor moved more, and it moved faster. The cost of a capable agent fell, a capable model became downloadable, and the gap between "what we can afford to pilot" and "what we can afford to run" got a lot narrower.',
      'In the GCC, that matters for a plain reason. Many programmes were stuck not because the models were weak but because the cost per task made scale hard to justify, and because data could not leave the country. Cheaper hosted models help the first problem. Downloadable ones help the second. Neither solves governance, but they remove two excuses.'
    ],
    takeaways: [
      'The biggest shift in the last six weeks was price and efficiency, not a new leaderboard winner.',
      'Three major closed labs now list flagship-tier models at about the same $2 / $10 per million tokens, so choose on task cost and behaviour, not sticker price.',
      'Open weights moved up a tier (Muse Spark Open, DeepSeek V4.1-Flash), but licence terms and real hardware needs still need checking.'
    ],
    note: 'When the price of intelligence stops being the constraint, the constraint becomes the one we kept postponing: who approves, who audits, and who owns the outcome.'
  }
];
