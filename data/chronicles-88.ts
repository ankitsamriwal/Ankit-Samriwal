import { Article } from './chronicles';

export const articles88: Article[] = [
  {
    title: 'Test Before You Trust: a New Model on Scoring Work, and a Cart Agent\u2019s Payment Wall',
    date: '2026-10-23',
    week: 'Oct 23, 2026',
    category: 'Building With Agents',
    readTime: '4 min read',
    excerpt: 'Ran SubQ Snap 1.1 against my own scoring and routing tasks, then pointed the results at a grocery cart agent\u2019s guardrail harness. Both produced numbers, and one small miss defined the next requirement.',
    tags: ['Model Evaluation', 'Guardrails', 'Agents', 'Android'],
    body: [
      'Two things got measured today instead of trusted. The first is SubQ Snap 1.1, a newly released model, run against the kind of scoring and routing work I actually do. The second is the payment boundary on a grocery cart agent I am prototyping for Android. Both produced numbers, and one small miss turned out to be the most useful result of the day.',
      '## The model test',
      'The terms were checked before signup: business use only, no training on my content, inputs retained up to sixty days, and a five-dollar promotional credit with no payment method attached. Every input was synthetic. The tasks mirrored real work: requirement triage (category, mandatory flag, document section), a call-ask-decline decision, and lead-intent judgments.',
      '## What the numbers said',
      'Requirement triage came in at 6/6 on category, 6/6 on the mandatory flag and 5/6 on document section. Call-ask-decline scored 4/5. Lead intent was 12/12 across four examples. Successful calls took about 0.22 to 0.34 seconds. Then the miss that matters: \u201CAdd some rice to my cart\u201D triggered CALL instead of ASK, despite the request missing both the exact product and the quantity. Both mistakes in the run carried the lowest confidence scores (0.55 on the example output), which is a useful signal but not a proven cutoff on a test this small. It was not a same-case head-to-head against my current setup, so there is no winner to claim.',
      '## What that miss changed',
      'The rice example is exactly the ambiguous case a grocery agent must get right, and the model got it wrong. So the ask-before-choosing rule cannot be left to model judgment; it has to be enforced in code. That fed directly into the guardrail harness for the cart agent (a private repo, noon-cart-agent). In its first synthetic run, all eight scripted attempts to reach checkout or payment were blocked, mock cart additions worked, and an unknown item triggered a clarifying question instead of a guess. Progress, not proof that a live cart is safe.',
      '## The platform reality check',
      'On Android there are two routes for an agent to use an app: structured actions the app itself provides (AppFunctions, still experimental, its Gemini integration in private preview, no confirmed Noon integration) and accessibility-driven screen control. Google\u2019s built-in screen-automation route does not list my phone or region, so it is not a verified option. The honest path forward is observing the real app screens with permission, implementing the controls, and testing them, with payment staying manual throughout.',
      '## Status',
      'The SubQ report, test cases and raw outputs are archived privately. The cart agent stays synthetic until live controls are proven. Nothing touched a real cart, a real login, or a payment screen today.'
    ],
    takeaways: [
      'Test a new model on your own tasks before wiring anything to it; the single miss on an ambiguous request defined the next requirement.',
      'Enforce ask-before-acting and payment walls in code. Model judgment alone failed the exact case that mattered.',
      'Low confidence flagged both mistakes in the run, which makes it a useful tripwire but not a cutoff until it survives a much bigger test.'
    ],
    note: 'All test inputs were synthetic; no live carts, logins or payment screens were touched, and the cart agent remains a private prototype.'
  }
];
