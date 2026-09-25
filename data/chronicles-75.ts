import { Article } from './chronicles';

export const articles75: Article[] = [
  {
    title: 'Six Sessions and a Red Pen',
    date: '2026-09-25',
    week: 'Sep 25, 2026',
    category: 'Building With Agents',
    readTime: '5 min read',
    excerpt: 'The coding-agent work became an assembly line: six paste-ready session prompts across four private repos, each with its own guardrails. Then the harder half - reviewing what the agent actually wrote, with a red pen, at phone width.',
    tags: ['Building With Agents', 'Jev', 'NanoJev', 'Code Review', 'Ship Log'],
    body: [
      'The main build of the day was not code - it was the line that produces code. Six session prompts, written to be pasted one at a time across four private repos: the Jev adaptive harness, a new NanoJev bid scorer, the Jev extension suite, and Subtext. Each prompt opens with the same self-checks - confirm the repo, confirm it is private, confirm the model - and stops cold if anything is off. All training data is synthetic-only by instruction; no real customer text touches any of it.',
      'NanoJev got its own repo and its foundation scoped: the bid/no-bid schema, hard gates, a training and calibration harness, abstain and out-of-domain tests, and a runbook. The interesting design question turned out to be the label: what "yes" means - pursue, submit, or win - decides what the model can ever learn. That one is deliberately still open, because getting it wrong quietly poisons everything downstream.',
      'Then the half that actually matters: review. Session one produced a pull request on the harness, and the review was real - the branch pulled, the tests run locally, not read-and-approved. Eleven of eleven passed and it still was not merge-ready. The regression suite checked that nothing errored, never that the answers were right. And near-duplicate tickets could leak across the train and eval pools, inflating the apparent independence of the result.',
      'The repair prompt went back with four named gaps. The updated PR re-ran clean - seventeen of seventeen - with family-disjoint splits and true correctness checks in. One defect remained, found the same way as always: at phone width, the history table collapses and clips its last column. A narrow fix prompt covers exactly that and nothing else. Scope discipline works on repair prompts too.',
      'The evidence rule held all day: every number in that repo comes from a synthetic stand-in, so "97% validated" does not get quoted anywhere until the harness runs against a live provider. Confidence is earned per layer, and the claim waits for the last one.',
      'Content kept cadence. Bots At Brunch closed out its first script bank with "Friday Deploy" - a 4:55 PM fish-microwaving incident. Wonderbyte EP21 covered AI trainers, with four cards: label, annotation, supervised learning, reward. Geetlekha drafted two more - Zindagi Ka Safar and a Ghulam Ali piece - each with the meaning document attached.'
    ],
    takeaways: [
      'The coding-agent queue is now an assembly line: six paste-ready sessions over four private repos, each self-checking repo, privacy and model before it starts.',
      'NanoJev has its repo and its foundation scoped; the label definition is the load-bearing decision and stays open on purpose.',
      'A green test suite is not a review: 11/11 with no correctness checks and leaky splits was a no; 17/17 with family-disjoint splits was almost a yes.',
      'Phone-width QA found the last defect - a collapsing table - and the fix prompt covers only that.',
      'No validation claim leaves the repo until synthetic evidence becomes live-provider evidence.'
    ],
    note: 'The agent writes. The human signs. That order is the product.'
  }
];
