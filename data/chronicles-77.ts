import { Article } from './chronicles';

export const articles77: Article[] = [
  {
    title: 'The Scorecard Iterates',
    date: '2026-09-27',
    week: 'Sep 27, 2026',
    category: 'Building With Agents',
    readTime: '5 min read',
    excerpt: 'A full day on the experiment track: the first EOIG epoch came back honestly under baseline, the fault was located in the head and repaired, a masking flaw was caught by diagnostic and confirmed fixed, and the mechanism\u2019s claims got written falsifiers. Free hardware, a strict budget ledger, and a sealed test throughout.',
    tags: ['Building With Agents', 'EOIG', 'Fine-Tuning', 'Evaluation', 'Ship Log'],
    body: [
      'The EOIG experiment spent the day on free T4s under a strict device-hour ledger, the test set sealed the whole time. The first full epoch - 707 seconds, 0.51 of the 15-hour budget - came back with a tune macro-F1 of .685, below the TF-IDF baseline\u2019s .867. That is a negative selection signal, and it was logged as one: the mechanism had earned nothing yet.',
      'The repair sequence started by locating the fault. A plain ModernBERT linear head, run as a baseline, landed at .9101 tune macro-F1 - ahead of both EOIG\u2019s .685 and TF-IDF\u2019s .867. That said the problem was the head, not the idea. The repaired EOIG head now reads .8746: past TF-IDF, still under the linear head. All tune-split figures - the sealed test opens once, at the end, and not before.',
      'The diagnostic pass caught something worth the budget on its own: a masking flaw in the setup. The repair was verified on the CLINC transfer check, which recovered to .786 macro-F1 from a broken .350. Alongside it, a consistency diagnostic started - checkpoints must reload to identical predictions, because any number trusted later has to be reproducible first.',
      'Then the part that makes the claim testable: the mechanism\u2019s stress plan is now written as falsifiers. Near-duplicates, singleton classes, unseen-domain probes, calibration under pressure. Adaptive ordering must beat flat and static at equal cost or the hypothesis fails outright; the beta-zero ablation carries its own pass condition. A claim with a pre-registered way to die is the only kind worth testing.',
      'The discipline is the point of the day. Every number quoted is tune-split. The ledger shows 0.51 device-hours on the epoch, diagnostics after, 14.49 left. Free hardware throughout. Honest negatives recorded with the same care as wins, because a scorecard that only reports progress is marketing.',
      'Content kept cadence. Bots At Brunch opened the fresh dialogue set with "Standup: Blocker" - the ticket cannot move, and naming the blocker is a second blocker. Wonderbyte EP23 covered AI ethics officers with four cards: bias, fairness, deepfake, consent. Geetlekha drafted two more - Yeh Hai Reshmi Zulfon Ka Andhera and Woh Kagaz Ki Kashti - both checked line by line against the recordings.'
    ],
    takeaways: [
      'First EOIG epoch: tune macro-F1 .685 vs TF-IDF .867 - a logged negative, test still sealed.',
      'The linear-head baseline at .9101 located the fault in the head; the repaired EOIG head reads .8746 - past TF-IDF, still chasing the baseline.',
      'A masking flaw was caught by diagnostic and confirmed fixed on the CLINC transfer check (.786, up from a broken .350).',
      'The stress plan is written as falsifiers: adaptive ordering must beat flat and static at equal cost, or the hypothesis fails outright.',
      'Budget ledger: 0.51 of 15 device-hours on the epoch, free tier throughout; a reproducibility diagnostic runs before any number gets trusted.'
    ],
    note: 'A mechanism earns its claims one repaired number at a time.'
  }
];
