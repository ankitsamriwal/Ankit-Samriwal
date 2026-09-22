import { Article } from './chronicles';

export const articles72: Article[] = [
  {
    title: 'Our Own Weights',
    date: '2026-09-22',
    week: 'Sep 22, 2026',
    category: 'Building With Agents',
    readTime: '6 min read',
    excerpt: 'The decision layer stopped renting and started owning: a 421M typed-decision model fine-tuned on 6,000 decision items, evaluated on 2,000 held-out decisions, and published with its benchmark. Around it: four Jev Chrome extensions, a micronutrient schema upgrade, and a Tetris arena to pit the new model against its teacher.',
    tags: ['Building With Agents', 'Laya', 'Fine-Tuning', 'Jev', 'Ship Log'],
    body: [
      'The headline build of the day is a model with our name on it. Laya-typed-decisions is a fine-tune of convaiinnovations/laya - a ModernBERT-large encoder, 421M parameters, Apache-2.0, from NandhaKishorM\u2019s GitHub repo - trained on 6,000 typed-decision items. The run: Kaggle\u2019s dual T4s under distributed data parallel, four epochs, average loss from 0.91 in epoch one down to 0.76. This is not a chat model. It takes state, a question, and fixed candidates, and returns calibrated probability distributions over the choices. Decisions as a primitive, not prose.',
      'The eval is the part that matters, and it held. Four hundred unseen cases, two thousand held-out decisions, the official split: the fine-tune scored 0.769 accuracy against the Jev 1.13.0 baseline\u2019s 0.727 on the same cases. The model is published with its evidence - 1.69 GB of real weights plus the benchmark JSON on the model card, which leads with the credit line to the base model and its author. A shadow A/B is still running to decide which production tasks it actually earns; the principle from last week stands: a model wins its job, it is not given the job.',
      'What it changes is the shape of the cascade. Bounded typed decisions - shortlist this, score that, yes or no with a confidence - can now run on our own weights: fast, local, effectively free per call. Jev keeps the heavy reasoning where judgment quality matters. The first homes are the ones already mapped: bid and no-bid scoring, requirement extraction, the watchlist consolidator, the news shadow pipeline. Open weights at the small end eating last year\u2019s frontier is not a thesis anymore; it is a repo.',
      'Four Chrome extensions shipped, each a thin shell around a Jev-typed call, each passing twenty of twenty live calls before it counted as done. A LinkedIn comment drafter: post text in, three voice-matched comment drafts out, each with a different angle. A JD match scorer: paste a job description, get a fit breakdown with the gaps named in plain words. A cross-post formatter: a long-form piece in, a restructured version out, reflowed for a second platform\u2019s conventions. A Reddit slot scout: a post in, the right subreddits and posting windows out. The pattern is the same in all four - the extension owns the page, Jev owns the decision, and the output is typed so nothing freestyles.',
      'Back to Life got its deepest schema upgrade yet. Every logged meal now carries a full A-to-Z micronutrient panel - vitamins, minerals, the works - calibrated against USDA and IFCT references, with running totals against recommended daily allowances. Alongside it, a contract bug worth naming because of its shape: the updateMeal endpoint accepted updates in exactly one JSON shape and silently reported success on every other. A fake success is worse than a loud failure - the data looks saved and is not. The fix makes the contract strict and every write is now verified on read-back; the day\u2019s entries were re-run through the fixed path and confirmed in the store.',
      'Threadline\u2019s live rebuild continued: paste real project signals and a deadline, and a live model returns delivery confidence broken into schedule, scope and execution, with the evidence for each call attached. The standard set yesterday held - no mockups, real computation or nothing.',
      'And the evening\u2019s build is the test bed for the whole thesis: a Tetris arena, Jev versus Laya, side by side. One shared engine, the same fixed piece sequence dealt to both models, a 10x20 board, and a live scoreboard tracking lines, pieces and level - so the only variable is the brain. Light theme, per the house call. The engine is built and tested; the model endpoints wire in next, with the fine-tune headed for a scale-to-zero host that fits its footprint.',
      'Small builds rounded out the day: a working RAG visual - three synthetic proposal chunks embedded with BGE-small, stored the way pgvector would hold them, retrieval you can watch - and a verse pack for the Divine Hub with full transliteration and meaning.'
    ],
    takeaways: [
      'Laya-typed-decisions is published on Hugging Face: a 421M ModernBERT-large fine-tune (base: convaiinnovations/laya, Apache-2.0), 6,000 decision items, 4 epochs on dual T4s, loss 0.91 to 0.76, with benchmark JSON on the card.',
      'The held-out eval is the story: 0.769 on 2,000 unseen decisions against the teacher baseline\u2019s 0.727 - and a shadow A/B still decides what it earns in production.',
      'The cascade now has three tiers: our own weights for bounded typed decisions, Jev for heavy reasoning, and everything free-first.',
      'Four Jev Chrome extensions shipped - comment drafter, JD match scorer, cross-post formatter, Reddit slot scout - each verified on 20/20 live typed calls.',
      'Back to Life logs now carry a full A-to-Z micronutrient panel, and the updateMeal fake-success contract bug is fixed with read-back verification on every write.'
    ],
    note: 'Renting decisions was phase one. Owning the weights is phase two.'
  }
];
