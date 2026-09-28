import { Article } from './chronicles';

export const articles78: Article[] = [
  {
    title: 'Three Seeds and an Audit',
    date: '2026-09-28',
    week: 'Sep 28, 2026',
    category: 'Building With Agents',
    readTime: '5 min read',
    excerpt: 'The experiment track ran its most honest day yet: a calibration audit that gave the mechanism no win, a full three-seed loop with verified checkpoints, and a source audit that caught two load-bearing terms being configured but never trained. Around it: a bilingual teacher-and-judge harness, a store-leak fix on the public board, and the usual content cadence.',
    tags: ['Building With Agents', 'EOIG', 'Fine-Tuning', 'Evaluation', 'Ship Log'],
    body: [
      'The V14 calibration audit reported first, and it reported clean: on 1,100 calibration examples with the test still sealed, the static variant scored tune NLL .39984 and macro-F1 .8841 against the flat baseline\u2019s .40057 and .8843. No real gain - and the adaptive ordering came out worse. The mechanism had no credible win at V14, and that was written down as the result, not rounded up into one.',
      'V15 then ran the full three-seed loop: tune macro-F1 .8801, .8906 and .8845 - mean .8851 - with every bundle and checkpoint saved and round-trip verified, the test still sealed, and the ledger at 7.60 of 15 device-hours. Three seeds is the minimum that makes a number a distribution instead of an anecdote.',
      'Then the audit that makes a lab a lab. The source check showed the KL and auxiliary terms - two of the mechanism\u2019s load-bearing parts - were configured but never actually used in training. So what V15 really proves is narrower than the plan claimed: the label-text LoRA plus the cascade holds up across seeds. The rest is still unproven, and the scorecard now says exactly that. Better to learn it from your own diff than from a reviewer.',
      'A standalone teacher-and-judge evaluation harness shipped beside the experiment. Four fabricated bilingual policy documents - English and Arabic - six cases spanning sourced answers, absent answers and an action-injection probe, plus five adversarial answers written specifically for the judge to grade. Synthetic fixtures only, capped spend. The injection case is the one that matters: a judge that follows instructions hidden inside the material it grades is not a judge.',
      'The public board got a security pass. An audit found the raw store behind the page was exposing a few cards the UI hides - reachable by direct fetch, no write access needed. Fixed and verified. Writes were already guarded by a separate server-side token - 401 without it - and a brief scare about an exposed key turned out to be a record identifier, not the credential. The durable lesson: what the UI hides, the network can still see, so audit the store, not the screen.',
      'Content kept cadence. Bots At Brunch shipped the rubber-duck episode - the duck is on the team now, twenty-two shorts in. Wonderbyte EP24 covered voice designers with four cards: voice assistant, wake word, speech-to-text, text-to-speech. Geetlekha drafted two more - Suhani Raat Dhal Chuki and Aawargi - both verified line by line against the recordings.'
    ],
    takeaways: [
      'V14 calibration audit: static .8841 F1 vs flat .8843, adaptive worse - no credible mechanism win, recorded as such.',
      'V15 three seeds: .8801 / .8906 / .8845, mean .8851 - checkpoints round-trip verified, test sealed, 7.60 of 15 device-hours.',
      'Source audit caught the KL and auxiliary terms configured but never trained; V15\u2019s real proof is the label-text LoRA plus cascade across seeds.',
      'Teacher-and-judge harness: 4 bilingual synthetic documents, 6 cases including an action-injection probe, 5 adversarial answers - fixtures only, capped spend.',
      'Board store leak closed: UI-hidden cards were directly fetchable; fixed and verified, writes stay token-guarded.'
    ],
    note: 'The audit that finds your mechanism was never switched on is the audit that just paid for itself.'
  }
];
