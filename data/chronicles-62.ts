import { Article } from './chronicles';

export const articles62: Article[] = [
  {
    title: 'Ninety-Three Green Lights',
    date: '2026-09-13',
    week: 'Sep 13, 2026',
    category: 'Building With Agents',
    readTime: '5 min read',
    excerpt: 'Sunday turned quality from a promise into a number: a twenty-tests-per-function ultimatum for the mail app, ninety-three iterations later a green matrix, and three essays published while the test load ran.',
    tags: ['Building With Agents', 'Ship Log', 'Mailstorm', 'Agents 2030', 'Testing'],
    body: [
      'Sunday was the day quality stopped being an intention and became a count. The bar, set out loud: the mail app does not get touched again until every function survives twenty distinct test iterations, or the product gets scrapped. That is the healthiest thing anyone has said to a side project. Ninety-three iterations later, across five functional areas, the matrix was green, and the testing earned its keep the way testing is supposed to: it caught a crash that only fired on real installs, on a light mail day, on exactly the kind of question a user asks first. Fixed, retested, sixteen for sixteen.',
      'The app that survived the gauntlet is meaningfully better than the one that entered it. Sync no longer asks me to babysit a progress bar; it runs on the server every thirty minutes and the phone just shows the finished state, which is what it should have been from the start. The install is now a proper Chrome-backed shell, because Google does not allow sign-in inside plain WebViews, a wall every Android wrapper hits sooner or later. And when the free model quota caps for the day, the app says so and keeps answering from the mailbox state it has, template-shaped but honest, instead of pretending nothing changed.',
      'The writing kept pace while the test load ran. Three pieces went live on Substack: Agents 2030 Part 1, One Technology, Five Lives, with its three exhibits; The Speed Limit Pact, on what it means that rival labs agreed to slow down in the same week; and Agentic AI Has Four Markets, Not One, a landscape essay with fourteen sources that also lives on this site now. The Agents 2030 series finally started publishing after two days of structure-first drafting, and the order showed in the product.',
      'Distribution groundwork went in around the edges. The GitHub profile page is live: dark, card-based, twelve products linked, real numbers only, built off a reference I liked. Product Hunt is set up and in verification, with the Mailstorm launch aimed at Tuesday, and the launch kits for Product Hunt and Reddit are drafted, including the honest version of the journey post: a dozen voice notes to a dozen live products in three days. One ordinary hurdle worth recording for anyone building distribution pipelines: Reddit flatly distrusts datacenter browsers, so the posting path runs from my own phone. Some doors only open from a human hand.',
      'The pipelines held their cadence through all of it. Wonderbyte opened its second run with episode nine, UX Researcher, the first of nineteen planned through October 1. Geetlekha drafted episodes ten and eleven, Kishore then Ghulam Ali. Bots At Brunch gave the barber a voice and he landed the joke. The job scan surfaced an EY match with a tailored pack. And the day closed with a scorecard honest enough to say the Thai curry blew the sodium budget, plainly, with the number attached.',
      'The honest paragraph: the ultimatum worked because it was measurable. "Make it good" produces vibes; "twenty iterations per function or it gets scrapped" produces a matrix. I am keeping the habit. Every product in the catalogue gets a number it has to beat, in writing, before the next feature lands on it.'
    ],
    takeaways: [
      'A 20-iterations-per-function ultimatum produced a 93-test gauntlet across five areas, and the testing caught a live-install crash that demos never showed.',
      'Sync moved server-side on a thirty-minute schedule after fair criticism that babysitting a progress bar is poor design.',
      'Three Substack pieces published in one day, including the Agents 2030 series opener and a sourced landscape essay mirrored on this site.',
      'Distribution infrastructure is real now: GitHub profile live, Product Hunt verified with a Tuesday launch target, launch kits drafted.',
      'Ordinary platform walls are build notes, not drama: Google blocks WebView OAuth, Reddit distrusts datacenter browsers, and both have clean workarounds.'
    ],
    note: 'The catalogue has twelve products and, as of today, one standard: a number to beat, in writing, before anything new ships.'
  }
];
