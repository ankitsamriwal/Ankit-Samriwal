import { Article } from './chronicles';

export const articles76: Article[] = [
  {
    title: 'One Head Out of Three',
    date: '2026-09-26',
    week: 'Sep 26, 2026',
    category: 'Building With Agents',
    readTime: '6 min read',
    excerpt: 'The experiment track grew up: a prior-art pass before any building, a NO-GO first review, a frozen hash-stamped split, and a preflight before a single training minute. Around it: a FinOps spend view that genuinely recomputes, a triage fine-tune with an honest mixed scorecard, and a privacy pass on the public board.',
    tags: ['Building With Agents', 'EOIG', 'Fine-Tuning', 'Evaluation', 'Ship Log'],
    body: [
      'The morning\u2019s build review was the FinOps agent-routing spend view. PR #1 up, CI green, twelve and a half thousand lines. The page recomputes everything from one fixed fixture ledger - 2,646 calls, $119.82 across seven days - and the 24-hour, 7-day and 30-day windows genuinely recalculate from it rather than swapping screenshots. An invalid window warns and falls back to 7d, forecast assumptions expand in place, and every sample call carries its trace detail with retry links. Reviewed at phone width: one real defect, overlapping labels in the stacked sample-call cards, sent back with a narrow fix prompt covering only that. The verdict stands: a credible computed demo on synthetic data, and it says so on the page.',
      'The evening belonged to the experiment track. A brainstorm arrived claiming novelty for a five-part mechanism on intent classification. Before any building came the prior-art pass, and its verdict: an unproven assembly, not an invention. Every load-bearing piece is published - late interaction, label-aware zero-shot, hierarchical intent work, adapter distillation, conformal pursuit - and two come close to the core combination itself. Novelty now has to be earned by experiment, not claimed on a whiteboard.',
      'The first spec review came back NO-GO. Good skeleton, but the scorecard would have overclaimed: one shared 2,000-example set was fitting temperature, question reliability, beta and the conformal threshold - peeking at the test four different ways. Version 0.2 fixed the design. A frozen Banking77 split, hash-stamped: 7,803 train, 1,100 tuning, 1,100 untouched. An untouched calibration split. Honest latency reporting. Single-T4 memory-safe cells. The teacher set: Haiku as the real teacher, with a free local Qwen3-4B as the independent second reference, so the comparison never leans on one family.',
      'Preflight passed before a single training minute: the EOIG kernel - encode-once with late interaction and conformal scoring - fits one T4 with a 1.0 GiB memory peak and a 0.109-second warm step. Only then did the full bounded build get its go: baselines, ablations, a three-seed bootstrap, free Kaggle hours, a fifteen-hour hard stop, and the scorecard sealed until the run completes.',
      'Meanwhile the triage fine-tune came back from the free GPU queue with a mixed scorecard on a frozen 300-example out-of-distribution test. The department head: base 58%, tuned 83%, against rules at 67% and TF-IDF at 34% - that head earned its place. Urgency and churn did not. One head out of three. The pipeline itself ran clean on free hardware, which was the other thing being proven.',
      'The diagnosis path is already named - label encoding, class imbalance, thresholds - and that is the part worth saying out loud: a model that fails for known reasons is more useful than one that passes for unknown ones. The heads go back for surgery; the department head carries on.',
      'Housekeeping on the public surface: the workboard got a privacy pass. Stale seed content scrubbed, the repo flipped private, and the write endpoint now sits behind a token - verified both ways, 401 without it, 200 with. Public surface area should only hold what is meant to be looked at.',
      'Content kept cadence. A Brunch reel on meetings that could have been one email. Wonderbyte EP22 on MLOps engineers, with four cards: version, rollback, monitoring, update. And two Geetlekha drafts - Ajeeb Dastan Hai Yeh and a Mehdi Hassan piece - both checked line by line against the sung recordings.'
    ],
    takeaways: [
      'FinOps spend view: PR green, and the windows genuinely recompute from a 2,646-call fixture ledger; one phone-width defect found and returned with a narrow fix prompt.',
      'Prior-art first: the five-part mechanism is an unproven assembly, not an invention - novelty must now be earned by experiment.',
      'EOIG v0.2 has an honest design: frozen hash-stamped split (7,803 / 1,100 / 1,100), untouched calibration, single-T4 preflight passed at 1.0 GiB peak.',
      'Triage run: department head 58 to 83% tuned and earned; urgency and churn back for diagnosis. One head out of three.',
      'The workboard write endpoint is token-guarded now - 401 without, 200 with, verified live.'
    ],
    note: 'A scorecard you seal before the run is the only one worth opening after.'
  }
];
