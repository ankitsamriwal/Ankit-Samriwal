import { Article } from './chronicles';

export const articles63: Article[] = [
  {
    title: 'The First User Was Me',
    date: '2026-09-14',
    week: 'Sep 14, 2026',
    category: 'Building With Agents',
    readTime: '5 min read',
    excerpt: 'A caffeine-reduction app that argues you out of onboarding and asks you to leave when you are done, built in a morning, renamed by lunch, and logging its builder’s own four coffees by evening. Dogfooding stopped being a slide and became the day.',
    tags: ['Building With Agents', 'Ship Log', 'Decaf', 'Aaj Kya Khau', 'Back to Life'],
    body: [
      'Monday’s build started as a PRD and ended as a mirror. Decaf, a caffeine-reduction app, went from a blank page to a live product in one morning: an eight-step onboarding that asks what you actually drink (coffee, cola, energy drinks, the lot), screens for blood pressure and diabetes and sleep, and ends with a persona that tells you how far over the guideline you are. Then it got deliberately rebellious on request: first-principles problem statement, a commitment gate that actively discourages onboarding if you are not serious, a twenty-nine-row inventory of hidden caffeine, and a design goal no growth team would sign off: the app encourages you to leave once you have hit your target.',
      'By lunch it had a real name, cafdetox.vercel.app, and by afternoon it had the two things that make it a product instead of a demo: cross-device sync and notifications, running on a Cloudflare backend. And then the day wrote its own punchline. I logged my usual breakfast into the health app, three cappuccinos and an iced latte, and the obvious follow-up landed: coffee should go in the caffeine app. Four coffees, roughly 300mg, logged into a thing I had green-lit that morning. The first user was me, and the first insight the app produced was about me.',
      'The same pattern ran everywhere today. Kitchen Mode in Aaj Kya Khau came out of my own fridge: the notes stuck to it about meals and missing ingredients became a display mode with a meal plan view, fridge-check on ingredients, and, after one voice note, customizable recipes for the staples every household keeps differently. Back to Life got a meal score because I wanted my own plate graded, not just counted. Even the product library moved into a GitHub repo that now updates itself every time something ships, because the manual list had already gone stale once.',
      'The writing continued in parallel. Two essays went live: the Google-became-a-verb piece in the morning (published with the sourced number, eight years, in the title) and What Survives the App Demotion in the afternoon, a buyer-side take on agents preferring APIs over interfaces. The consulting-pyramid piece got the right treatment before it goes anywhere: the PwC claim verified against real sources, then a full Gulf section added after I asked what the Middle East numbers look like, because an industry obituary that ignores the one region still growing at twelve percent is not analysis, it is mood.',
      'Around the edges: Wonderbyte hit episode ten, Geetlekha drafted twelve and thirteen (Lata, then Mehdi Hassan singing Faiz), the job scan produced a GE Vernova pack in the morning and a Honeywell pack from a photographed JD in the afternoon, a competitor review of a reminder app got the brutal read it deserved, a washing-machine sweep across Indian e-commerce found that the model I wanted does not exist at 7 kg anymore, and a question about inference engineering turned into an honest eight-week learning path with the ceiling stated plainly.',
      'The honest paragraph: the best product decisions today came from using the things, not from building them. The commitment gate, the leave-when-done rule, the kitchen screen, the meal score, the coffee logging. None of that was in a spec. It showed up because the builder and the user were the same person on the same day. That is the actual advantage of this way of working, and it does not show up in a launch count.'
    ],
    takeaways: [
      'Decaf went from PRD to live product in a morning: rebellious onboarding with a commitment gate, hidden-caffeine inventory, sync and notifications on Cloudflare, and a builder who became its first user by evening.',
      'Kitchen Mode shipped inside Aaj Kya Khau from a real fridge habit, with customizable recipes added one voice note later.',
      'Two essays published; a third held back until the Middle East data was in, because ignoring the growing region would have made it mood instead of analysis.',
      'The product library now lives in GitHub and self-updates on every ship, rename, or change.',
      'The day’s pattern: every good decision came from dogfooding, not from the spec.'
    ],
    note: 'Four coffees into an app I built to drink fewer. The roadmap writes itself when the first user is honest.'
  }
];
