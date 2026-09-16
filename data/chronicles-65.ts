import { Article } from './chronicles';

export const articles65: Article[] = [
  {
    title: 'The Homework Shipped',
    date: '2026-09-16',
    week: 'Sep 16, 2026',
    category: 'Building With Agents',
    readTime: '5 min read',
    excerpt: 'The afternoon started with "what is an agent harness" and ended with three live MCP servers, a passcode-gated setup page, and configs merged into a real Claude Desktop file. Learning by building, with the ladder written down first.',
    tags: ['Building With Agents', 'Ship Log', 'MCP', 'Agents', 'Infrastructure'],
    body: [
      'Wednesday had the best shape a learning day can take: question first, ladder second, working infrastructure by evening. The question was basic and honest: what is an agent harness, anyway. Then what is an agent access gateway. Then, the turn that matters: give me an easy use case for an MCP server, what to create and how. The answer was not a tutorial. It was a server over the health app’s real API, two tools, live endpoint, tested against actual data the same hour.',
      'Then the ladder wrote itself and got climbed in order: one server for the health log, one for the caffeine tracker, one for the portfolio, read-only where the data is money. Three MCP servers, three live endpoints, each tested against real state. A setup page behind a passcode holding ready-to-paste configs for Cline and Claude Desktop, and when the existing Claude config turned out to be a full file with real settings, the right move was not "replace it" but a merged file, existing settings intact, new servers added. The gateway goes on top next, one front door for any agent, which was the concept that started the whole conversation.',
      'The writing kept its cadence. Two essays went live: Agents 2030 Part 2 on healthcare (the doctor will not be replaced; the waiting will) and a short on assistants that never say no. Wonderbyte shipped episode twelve, Prompt Engineer, plus a Data Pipeline card on request. Geetlekha drafted sixteen and seventeen, Rafi then Ghulam Ali. Bots At Brunch investigated where the bug was in five stages. The job scan surfaced a 94% match, a Program Director for Agentic AI, with a tailored pack.',
      'The thinking work was enterprise-shaped today. A brainstorm on Dataverse exposed as MCP with an agent-native lean CRM on top became a one-page concept note, anchored in what is actually GA versus preview, aimed at education and hospitals first, with the positioning sharpened to selling a governed supervision layer on the customer’s own data rather than another CRM. A competitor teardown of an AI stylist app turned into a cold-outreach draft to its founder, product catalogue as the hook, employer kept off, waiting on my send. A four-day-old open-source project got an honest skip with a sourced score instead of a polite maybe.',
      'Two infrastructure chores are worth their own line. The tracked-link system grew up: a real Bitly account now shortens the inline PDF view, and the counter showed sixteen views by afternoon. And the meeting recorder got built the careful way: audio never leaves the phone except straight to the transcriber, nothing stored in a public bucket, which is exactly why it is not live yet. It waits for a private storage path tomorrow rather than shipping a privacy hole tonight.',
      'The honest paragraph: the recorder sitting unfinished at day’s end is the right kind of unfinished. Every instinct said ship it; the storage options said the recordings would sit somewhere public; so it waits. A week of velocity makes "not yet" feel like failure. It is not. It is the same discipline as the tests and the privacy line, applied to a deadline I set myself.'
    ],
    takeaways: [
      'From "what is an agent harness" to three tested MCP servers (health, caffeine, portfolio) in one afternoon, with a passcode-gated setup page and merged client configs.',
      'The ladder method worked: concept questions first, a written expansion path second, then building in order, gateway next.',
      'Enterprise thinking advanced on facts: Dataverse MCP GA-versus-preview grounded a lean-CRM concept note aimed at education and hospitals.',
      'Cadence held: two essays, Wonderbyte EP12, two Geetlekha drafts, a 94% job match, and a real Bitly-backed tracker already counting views.',
      'The meeting recorder deliberately did not ship: no private storage path, no launch. "Not yet" is a shipping decision too.'
    ],
    note: 'The ladder is the point. Ask the basic question out loud, write the rungs down, climb them in order, and by dinner the homework is infrastructure.'
  }
];
