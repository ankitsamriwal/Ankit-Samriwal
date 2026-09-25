import { Article } from './chronicles';

export const articles73: Article[] = [
  {
    title: 'A Tie With the Teacher',
    date: '2026-09-23',
    week: 'Sep 23, 2026',
    category: 'Building With Agents',
    readTime: '6 min read',
    excerpt: 'The owned model went live as an API and faced its teacher twice: a 2,000-decision shadow A/B that ended in a statistical tie, and a three-way Tetris arena that showed exactly where fine-tunes do not transfer. Around it: two more Jev apps shipped, and a five-app suite completed.',
    tags: ['Building With Agents', 'Laya', 'Jev', 'Evaluation', 'Ship Log'],
    body: [
      'Laya-typed-decisions is now a live API. The 421M fine-tune sits behind an HTTP endpoint on a scale-to-zero host, answering POST calls: state in, question in, fixed candidates in, calibrated probability distribution out. Verified deterministic - same input, same answer, every time. A warm call takes about 3.5 seconds on CPU (the 116-millisecond number from training day was GPU), and a cold start runs about 25 seconds. The decision layer is no longer a notebook artifact; it is callable by anything that can POST.',
      'Then the number the whole experiment was waiting for. The shadow A/B completed: 400 held-out cases, 2,000 typed decisions, identical inputs for every arm. Laya scored 71.5% against Jev\u2019s 72.4% - a statistical tie. The splits are where it gets interesting: Laya wins choice-type decisions 74.7 to 72.6 and yes/no calls 84.5 to 79.2, while Jev keeps graded scores 67.0 to 59.4. On agent-trace observability, Laya wins 65.8 to 60.6. Reliability went the owned model\u2019s way too - zero failures in 400 calls, where the API arm had four upstream 520s. The honest cost: about 3.3 seconds a call on CPU against the API\u2019s 0.23. A model this small tying the frontier on bounded decisions, at zero marginal cost, is the whole thesis working.',
      'The second exam was humbler and just as useful. The Tetris arena went three-way: Jev versus base Laya versus the fine-tune, one shared engine, the same fixed 140-piece sequence dealt to all three boards, raw picks with no harness. QA results: Jev cleared all 140 pieces and 55 lines at 197 milliseconds a move, confidence up to 99%. Base Laya topped out at 27 pieces and zero lines. The fine-tune managed 28. Both Layas played flat, confidence pinned near zero - neither has ever seen a block fall.',
      'That is the finding worth keeping: no catastrophic forgetting, and no transfer either. Six thousand business decisions did not damage the base model\u2019s play and did not teach it anything about Tetris. And raw Jev at 55 lines sits above the heuristic teacher\u2019s 48 - which moved the bar for the planned Tetris fine-tune. Beating the teacher is now table stakes; catching Jev is the headline.',
      'The fix is already staged. A teacher dataset of 5,681 synthetic placements - deterministic, in a private Hugging Face repo - is ready, and the fine-tune runs on free Kaggle T4s; the paid GPU host wanted a card on file and the thirty-to-seventy-cent run was skipped on principle. The eval holds out 4 of 41 game seeds and reports base-versus-tuned accuracy, so the rematch numbers will be honest. A regression pass back through business decisions will measure what the new skill costs.',
      'Two more Jev apps shipped. Subtext: paste a chat, an email thread, a meeting transcript or a lead reply, and it returns what the other side actually meant - intent bars, tone, how much they care, and the best next move. One typed Jev call, about 0.4 seconds. When the free writer model is rate-limited, it falls back to a standard per-type reading and says so on the page - honest degradation instead of a spinner. It launched on the model host in the morning and moved to Vercel the same day: private repo, git-connected, 22 of 22 live tests passing on the new URL.',
      'The second is the adaptive harness. It watches Jev answer a stream of bounded decisions, and once a decision shape repeats enough to be provably safe, it compiles that shape into plain code - a 97% agreement target, with 15% of decisions still routed to Jev for audit. It was exercised on 700 real support tickets from the public BANKING77 set with live calls: every answer tagged code, Jev or audited, cost per batch visible, and the generated decision table readable on the page. The cost thesis made literal - the expensive model teaches, the cheap artifact runs.',
      'And the suite is complete. Signal House was the fifth of five: paste a lead with its cross-channel history - emails, calls, messages, meetings - and it reads the deal: buying intent, relationship trust, engagement velocity, behavior pattern. All five apps now run live Jev calls on real pasted input and return typed scores with confidence. No mockups anywhere in the set.'
    ],
    takeaways: [
      'The owned 421M model is a live deterministic API: ~3.5s warm on CPU, ~25s cold start, zero cost per call.',
      'Shadow A/B on 2,000 held-out decisions: Laya 71.5% vs Jev 72.4% - a statistical tie, with Laya taking choices and yes/no calls and Jev keeping graded scores.',
      'The three-way arena settled the transfer question: neither Laya plays Tetris, and the fine-tune did not damage the base - no forgetting, just no transfer.',
      'The Tetris teacher set is staged: 5,681 synthetic placements, private, with an eval holding out 4 of 41 game seeds.',
      'Subtext and the adaptive harness shipped, completing a five-app Jev suite - all typed live calls, no mockups.'
    ],
    note: 'Yesterday we owned the weights. Today they clocked in.'
  }
];
