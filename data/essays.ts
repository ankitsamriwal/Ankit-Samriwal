export type EssayBlock = { k: 'h2' | 'p' | 'ul' | 'ol'; t?: string; items?: string[] };
export type EssayPost = { slug: string; title: string; subtitle: string; date: string; readTime: string; intro: string; substackUrl: string; body: EssayBlock[] };

// Newest first.
export const ESSAY_POSTS: EssayPost[] = [
  {
    "slug": "waiting-for-the-last-model",
    "title": "Waiting for the Last Model",
    "subtitle": "Why constant AI upgrades are quietly freezing enterprise decisions, and why the stable state may never come",
    "date": "2026-10-20",
    "readTime": "4 min read",
    "intro": "Enterprise AI adoption is stalling, and the cause is not weak models but constant upgrades that make every decision feel temporary. This piece explains why waiting for the \"final\" model fails, and what an enterprise AI strategy should optimise for instead: reversible architecture, your own evaluation harness, and assets that survive every model generation.",
    "substackUrl": "https://ankitsamriwal.substack.com/p/waiting-for-the-last-model",
    "body": [
      {
        "k": "p",
        "t": "Every few weeks a new model lands. Some are bigger. Some are smaller and faster. Some are fine-tuned for law, finance, code or Arabic. Each launch comes with a benchmark chart that makes last quarter's choice look dated."
      },
      {
        "k": "p",
        "t": "Here is my hypothesis, formed in proposal rooms and steering committees across the GCC. **The pace of model releases is now slowing enterprise AI decisions down, not speeding them up.**"
      },
      {
        "k": "h2",
        "t": "What it looks like on the ground"
      },
      {
        "k": "p",
        "t": "Nobody says \"we're not doing AI.\" The paralysis is politer than that:"
      },
      {
        "k": "ul",
        "items": [
          "\"Let's run one more POC, against the new model.\"",
          "\"Let's revisit after the next release. Pricing might drop.\"",
          "\"Should we wait for the specialised version for our industry?\"",
          "\"If we pick this vendor now, are we locked in when something better ships?\""
        ]
      },
      {
        "k": "p",
        "t": "Each of these sounds prudent on its own. Added up, they produce a portfolio of pilots that never become programmes."
      },
      {
        "k": "p",
        "t": "The numbers say this is not a fringe experience. [Gartner predicted](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025) that at least 30% of generative AI projects would be abandoned after proof of concept by the end of 2025. MIT's NANDA initiative went further: in its [State of AI in Business 2025 report](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/), about 95% of enterprise GenAI pilots delivered no measurable impact on P&L."
      },
      {
        "k": "h2",
        "t": "Why it's happening"
      },
      {
        "k": "p",
        "t": "**Fear of stranded investment.** Leaders remember ERP choices that lasted 15 years. They assume an AI choice carries the same weight, so they want to pick the \"final\" option."
      },
      {
        "k": "p",
        "t": "**Benchmark whiplash.** When the leaderboard reshuffles monthly, any selection feels provisional. A procurement committee wants a decision it can defend for years, and the market won't give it one."
      },
      {
        "k": "p",
        "t": "**Price deflation.** Token costs keep falling. Stanford's [2025 AI Index](https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts) measured the cost of querying a GPT-3.5-level model dropping from $20 per million tokens in November 2022 to $0.07 by October 2024, a 280-fold fall in about 18 months. A CFO looking at that curve reasonably asks why they should commit at today's price."
      },
      {
        "k": "p",
        "t": "**Generic versus specialised.** Every domain-tuned release reopens the question of whether to build on a general model or wait for \"our\" model."
      },
      {
        "k": "h2",
        "t": "The uncomfortable truth"
      },
      {
        "k": "p",
        "t": "The stable state people are waiting for may never arrive at the model layer."
      },
      {
        "k": "p",
        "t": "Waiting for AI to settle is like waiting for smartphones to stop improving before buying one. The people who waited didn't get a better phone. They got years without one."
      },
      {
        "k": "p",
        "t": "The model layer is turning into a utility that keeps upgrading itself. Stability will have to come from somewhere else."
      },
      {
        "k": "h2",
        "t": "Where stability actually lives"
      },
      {
        "k": "p",
        "t": "The organisations moving ahead aren't the ones who picked the right model. They're the ones who made the model choice **reversible**:"
      },
      {
        "k": "ol",
        "items": [
          "**A model-agnostic architecture.** An abstraction layer, so swapping models is a configuration change, not a re-implementation.",
          "**Their own evaluation harness.** A set of tests built from their own documents, cases and edge conditions. When a new model drops, they score it in days, not quarters.",
          "**Investment in assets that don't depreciate.** Clean data, documented processes, governance, access control, audit trails. These carry value through every model generation.",
          "**Contracts that allow switching.** Avoid commercial lock-in to a single model family, even if you standardise on one platform."
        ]
      },
      {
        "k": "p",
        "t": "Once switching is cheap, a new release becomes an upgrade opportunity instead of a threat to the decision you already made."
      },
      {
        "k": "h2",
        "t": "The cost of waiting compounds"
      },
      {
        "k": "p",
        "t": "While one enterprise waits, a competitor is learning. They find out which processes break, which users resist, which data is a mess, and how much an agent actually saves. That knowledge doesn't come with the next model. It only comes from shipping."
      },
      {
        "k": "p",
        "t": "The MIT research points the same way: the main reason pilots failed was not model quality but a \"learning gap\" inside the organisations running them. That gap does not close while you wait. It widens, because everyone else is closing theirs."
      },
      {
        "k": "p",
        "t": "**Model capability is rented. Organisational capability is built.** You can't rent your way out of a two-year learning gap."
      },
      {
        "k": "h2",
        "t": "The decision to make instead"
      },
      {
        "k": "p",
        "t": "Don't ask \"which model should we bet on?\""
      },
      {
        "k": "p",
        "t": "Ask \"how do we build so that we never have to bet on a model again?\""
      },
      {
        "k": "p",
        "t": "That question has a stable answer. And it can be decided this quarter."
      },
      {
        "k": "p",
        "t": "*The waiting game is only one of the games on the board. The next piece maps the other seven: [The Game Behind the Models](https://ankitsamriwal.substack.com/p/the-game-behind-the-models).*"
      },
      {
        "k": "h2",
        "t": "Sources"
      },
      {
        "k": "ul",
        "items": [
          "[Gartner press release, July 2024: 30% of GenAI projects abandoned after proof of concept by end of 2025](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025)",
          "[Fortune on MIT NANDA's \"The GenAI Divide: State of AI in Business 2025\": ~95% of enterprise GenAI pilots fail to deliver measurable P&L impact](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)",
          "[Stanford HAI, AI Index 2025: GPT-3.5-level inference cost fell from $20 to $0.07 per million tokens (Nov 2022 to Oct 2024), a 280-fold drop](https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts)"
        ]
      }
    ]
  }
];
