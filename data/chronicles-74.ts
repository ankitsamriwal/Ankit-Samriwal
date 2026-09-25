import { Article } from './chronicles';

export const articles74: Article[] = [
  {
    title: 'The Status Update Machine',
    date: '2026-09-24',
    week: 'Sep 24, 2026',
    category: 'Building With Agents',
    readTime: '4 min read',
    excerpt: 'Northstar became the tool it was meant to be: paste project status in any shape and get back structure - budget burn, schedule gap, forecast, and a scored red-amber-green per project with the evidence attached. Around it, the content pipeline held its daily cadence.',
    tags: ['Building With Agents', 'Northstar', 'Jev', 'Ship Log'],
    body: [
      'Northstar PMO command is live. Paste status updates in any format - a raw email, bullet fragments, a transcript - and it structures them into a portfolio view: budget burn, schedule gap and forecast per project, with a Jev-scored red-amber-green call on each and the evidence for the call attached. Extraction takes three to thirty-five seconds depending on how messy the paste is. The point of the tool is the input contract: there isn\u2019t one. Status arrives the way people actually write it, and the machine does the tidying.',
      'The honest caveats are part of the build, printed on the page. Jev leans skeptical - it would rather call amber than miss a red - and that bias is stated rather than tuned away. Free models rate-limit under load, so the app names the retry path instead of hanging quietly. A status tool that hides its confidence is worse than one that admits it; a portfolio view is only useful if the reader knows when not to trust it.',
      'QA ran phone-first, the way the tool will actually be read. The command view, the per-project breakdowns and the evidence panels were all checked at handset width - which is where the one real bug was hiding, a date-format fault in the budget line, caught and fixed before the link went out.',
      'Housekeeping worth one line: an old public repo from an earlier Northstar experiment got retired to private. Public surface area should only hold things that are meant to be looked at.',
      'Content kept cadence. Bots At Brunch shipped "npm install: one little package" - the dependency-hell episode. Wonderbyte EP20 explained game developers, with four vocab cards: frame rate, sprite, game engine, multiplayer. And Geetlekha drafted two more lyric videos - Baharon Phool Barsao and Tum Ko Dekha To Ye Khayaal Aaya - each with its stanza-by-stanza meaning document attached.'
    ],
    takeaways: [
      'Northstar PMO command is live: any-format status in, structured portfolio out - budget burn, schedule gap, forecast, and scored RAG calls with evidence.',
      'The skeptic bias and the rate-limit behavior are stated on the page; confidence you cannot see is confidence you cannot trust.',
      'QA ran at phone width first - which is exactly where the one real bug was hiding.',
      'Content held cadence: one Brunch episode, one Wonderbyte with four cards, two Geetlekha drafts.'
    ],
    note: 'A dashboard is a promise. This one shows its working.'
  }
];
